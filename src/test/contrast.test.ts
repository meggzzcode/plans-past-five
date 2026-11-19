import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Cheap static guards for the class of bug where text becomes invisible because a global or
 * ancestor style overrides a component's own colours (for example `.prose-editorial a` turning
 * a cherry button label cherry-on-cherry). The full rendered check lives in
 * docs/marketplace/CONTRAST-SWEEP.md; these tests keep the findings from regressing.
 */
const css = readFileSync(join(__dirname, "../styles.css"), "utf8");

type RGB = [number, number, number];

/** Reads `--name: oklch(L C H)` from :root in styles.css and converts it to sRGB (0-255). */
function token(name: string): RGB {
  const m = css.match(
    new RegExp(`--${name}:\\s*oklch\\(\\s*([\\d.]+)\\s+([\\d.]+)\\s+([\\d.]+)\\s*\\)`),
  );
  if (!m) throw new Error(`token --${name} is not a plain oklch() value in styles.css`);
  return oklchToSrgb(Number(m[1]), Number(m[2]), Number(m[3]));
}

function oklchToSrgb(L: number, C: number, hDeg: number): RGB {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  return lin.map((v) => {
    const c = Math.min(1, Math.max(0, v));
    const g = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
    return g * 255;
  }) as RGB;
}

const luminance = ([r, g, b]: RGB) => {
  const f = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

const contrast = (fg: RGB, bg: RGB) => {
  const a = luminance(fg);
  const b = luminance(bg);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};

/** Composite a colour with the given alpha over an opaque background (for text-cream/80 etc.). */
const over = (fg: RGB, alpha: number, bg: RGB): RGB =>
  fg.map((v, i) => v * alpha + bg[i]! * (1 - alpha)) as RGB;

describe("global rules cannot override component colours inside .not-prose", () => {
  const prose = css.slice(css.indexOf("@utility prose-editorial"), css.indexOf("@media print"));

  it("link colour rule excludes .not-prose and its descendants", () => {
    expect(prose).toMatch(
      /& a:not\(:where\(\.not-prose, \.not-prose \*\)\)\s*\{[^}]*color:\s*var\(--cherry\)/,
    );
    // no bare `a { color }` rule left in the prose utility
    const bare = [...prose.matchAll(/&\s+a\s*\{[^}]*color:/g)];
    expect(bare).toHaveLength(0);
  });

  it("the :not(:where()) selector really skips .not-prose descendants (jsdom)", () => {
    document.body.innerHTML = `
      <div class="prose-editorial"><a id="plain" href="#">text</a>
        <aside class="not-prose"><a id="btn" href="#">label</a><div><a id="deep" href="#">deep</a></div></aside>
      </div>`;
    const sel = ".prose-editorial a:not(:where(.not-prose, .not-prose *))";
    const hits = [...document.querySelectorAll(sel)].map((e) => e.id);
    expect(hits).toEqual(["plain"]);
  });

  it("other prose-editorial rules only colour things that are never text on a coloured fill", () => {
    // `strong` is the only descendant text colour besides links; it must stay dark ink and
    // prose blocks must not set colour on p/li/em/span (they would beat parent utilities).
    const colourRules = [...prose.matchAll(/&\s+([^{]+)\{[^}]*\bcolor:/g)].map((m) => m[1]!.trim());
    expect(colourRules).toEqual([
      "a:not(:where(.not-prose, .not-prose *))",
      "ul:not(:where(.not-prose, .not-prose *)) li::before",
      "strong:not(:where(.not-prose, .not-prose *))",
    ]);
    // every colour-setting descendant rule must carry the not-prose exclusion
    for (const sel of colourRules) expect(sel).toContain(":not(:where(.not-prose, .not-prose *))");
  });

  it("unlayered selector overrides stay limited to the matcha kicker exception", () => {
    const tail = css.slice(css.indexOf("@media print"));
    const unlayered = [...tail.matchAll(/^([^\s@}/][^{]*)\{/gm)].map((m) => m[1]!.trim());
    expect(unlayered).toEqual(['[class*="bg-matcha"] .kicker.text-cherry']);
  });
});

describe("token pairs used for text meet WCAG AA (4.5:1)", () => {
  const T = {
    cherry: token("cherry"),
    cream: token("cream"),
    garden: token("garden"),
    espresso: token("espresso"),
    butter: token("butter"),
    strawberry: token("strawberry"),
    matcha: token("matcha"),
    sunday: token("sunday"),
    warmWhite: token("warm-white"),
    ink: token("ink"),
    muted: token("muted"),
    mutedFg: token("muted-foreground"),
    destructive: token("destructive"),
  };

  // [label, text colour, background]
  const pairs: [string, RGB, RGB][] = [
    ["cherry on cream", T.cherry, T.cream],
    ["cherry on warm-white", T.cherry, T.warmWhite],
    ["cherry on butter", T.cherry, T.butter],
    ["cherry on strawberry", T.cherry, T.strawberry],
    ["cherry on sunday", T.cherry, T.sunday],
    ["cherry on muted", T.cherry, T.muted],
    ["cream on cherry (buttons, makePlan)", T.cream, T.cherry],
    ["butter on cherry (makePlan kicker)", T.butter, T.cherry],
    ["cream on garden (footer)", T.cream, T.garden],
    ["butter on garden (footer headings)", T.butter, T.garden],
    ["cream/90 on garden (footer links)", over(T.cream, 0.9, T.garden), T.garden],
    ["cream/80 on garden (footer mission)", over(T.cream, 0.8, T.garden), T.garden],
    ["cream/70 on garden (footer legal)", over(T.cream, 0.7, T.garden), T.garden],
    ["cream on ink", T.cream, T.ink],
    ["ink on cream", T.ink, T.cream],
    ["ink on butter", T.ink, T.butter],
    ["ink on strawberry (accent)", T.ink, T.strawberry],
    ["ink on matcha", T.ink, T.matcha],
    ["ink on sunday", T.ink, T.sunday],
    ["espresso on cream", T.espresso, T.cream],
    ["espresso on warm-white", T.espresso, T.warmWhite],
    ["espresso on butter", T.espresso, T.butter],
    ["espresso on strawberry", T.espresso, T.strawberry],
    ["garden on cream", T.garden, T.cream],
    ["garden on matcha (kicker override)", T.garden, T.matcha],
    ["muted-foreground on cream", T.mutedFg, T.cream],
    ["muted-foreground on warm-white", T.mutedFg, T.warmWhite],
    ["muted-foreground on muted", T.mutedFg, T.muted],
    ["destructive on cream", T.destructive, T.cream],
    ["cream on destructive", T.cream, T.destructive],
  ];

  it.each(pairs)("%s", (_label, fg, bg) => {
    expect(contrast(fg, bg)).toBeGreaterThanOrEqual(4.5);
  });

  it("cherry text on matcha still fails, which is why the matcha kicker override exists", () => {
    expect(contrast(T.cherry, T.matcha)).toBeLessThan(4.5);
    expect(css).toContain('[class*="bg-matcha"] .kicker.text-cherry');
  });

  it("cherry on cherry would be invisible (sanity check of the helper)", () => {
    expect(contrast(T.cherry, T.cherry)).toBeCloseTo(1, 5);
  });
});
