import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { OUTBOUND_BUY_REL, commissionStatement, isMonetized } from "@/config/affiliate";
import { site } from "@/config/site";
import { restoreAffiliate, setAffiliateState, snapshotAffiliate } from "./affiliate-state";
import { verifiedCatalog } from "@/data/catalog";
import { ProductCard } from "@/components/commerce/ProductCard";
import { StarterKit } from "@/components/commerce/StarterKit";
import { QuizStep } from "@/components/quiz/QuizStep";
import { ShareButtons } from "@/components/editorial/ShareButtons";
import { allArticlesIncludingDrafts } from "@/content/draft-registry";
import { articles } from "@/content";
import { images } from "@/data/images";
import { canonicalUrl } from "@/lib/share";
import { savedShareText } from "@/lib/saved-share";
import { makePlan, planFromIds, planHref, planText, type PlanInput } from "@/lib/planner";
import { tonightIdeas, tonightPlanSearch, tonightSaveItem } from "@/lib/tonight";
import { parsePlanSearch } from "@/lib/planner";
import { hobbies } from "@/data/hobbies";
import { catalog, getCatalogProduct } from "@/data/catalog";

const root = path.resolve(__dirname, "../..");
const Wrap = ({ children }: { children: ReactNode }) => {
  const r = createRootRoute({ component: () => <>{children}</> });
  const router = createRouter({
    routeTree: r,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  return <RouterProvider router={router} />;
};
const show = async (ui: ReactNode) => {
  const r = render(<Wrap>{ui}</Wrap>);
  await act(async () => {});
  return r;
};
beforeEach(() => window.localStorage.clear());
afterEach(cleanup);

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((n) => {
    const p = path.join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

describe("1. outbound buy links carry rel sponsored noopener noreferrer", () => {
  it("the constant has all three tokens", () => {
    expect(OUTBOUND_BUY_REL.split(" ").sort()).toEqual(["noopener", "noreferrer", "sponsored"]);
  });

  it("every file that renders a resolved product link uses the one constant, never a literal rel", () => {
    const files = walk(path.join(root, "src")).filter(
      (f) =>
        /\.tsx$/.test(f) &&
        !f.includes("/test/") &&
        readFileSync(f, "utf8").includes("resolveProductLink"),
    );
    expect(files.length).toBeGreaterThanOrEqual(4);
    for (const f of files) {
      const src = readFileSync(f, "utf8");
      const rels = [...src.matchAll(/rel=(\{[^}]*\}|"[^"]*")/g)].map((m) => m[1]);
      for (const r of rels) expect(r, f).toContain("OUTBOUND_BUY_REL");
      expect(src.includes('target="_blank"') ? rels.length : 1, f).toBeGreaterThan(0);
    }
  });

  it("every rendered Amazon anchor (product card, kit) has the full rel", async () => {
    const p = verifiedCatalog[0]!;
    const { container } = await show(
      <>
        <ProductCard product={p} placement="test" />
        <StarterKit kit="junk-journaling" />
        <StarterKit kit="watercolor" />
      </>,
    );
    const anchors = [...container.querySelectorAll<HTMLAnchorElement>("a[href*='amazon.com']")];
    expect(anchors.length).toBeGreaterThan(0);
    for (const a of anchors) {
      expect(a.getAttribute("rel"), a.href).toBe(OUTBOUND_BUY_REL);
      expect(a.getAttribute("target")).toBe("_blank");
    }
  });

  it("any link with target=_blank in src has noopener and noreferrer", () => {
    for (const f of walk(path.join(root, "src")).filter((f) => /\.tsx$/.test(f))) {
      const src = readFileSync(f, "utf8");
      for (const m of src.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gs)) {
        expect(m[0], f).toMatch(/noopener|OUTBOUND_BUY_REL/);
      }
    }
  });
});

describe("2. one commission wording across Terms, Privacy and Affiliate Disclosure", () => {
  const read = (n: string) => readFileSync(path.join(root, "src/routes", n), "utf8");
  it("all three pages are driven by commissionStatement()", () => {
    for (const n of ["terms.tsx", "privacy.tsx", "affiliate-disclosure.tsx"])
      expect(read(n), n).toContain("commissionStatement()");
    expect(read("terms.tsx")).not.toMatch(/may earn a commission on some purchases/);
    expect(read("privacy.tsx")).not.toMatch(/so we can earn a small/);
  });
  it("says we do not earn today, and 'may earn a commission' only once an entry is live", () => {
    const snap = snapshotAffiliate();
    try {
      setAffiliateState("inactive");
      expect(isMonetized()).toBe(false);
      expect(commissionStatement().live).toBe(false);
      expect(commissionStatement().long).toMatch(/don't currently earn/);
      setAffiliateState("active");
      expect(isMonetized()).toBe(true);
      expect(commissionStatement().live).toBe(true);
      expect(commissionStatement().long).toMatch(/may earn a commission/);
    } finally {
      restoreAffiliate(snap);
    }
  });
});

describe("3. link text before 'has more ...' agrees with the verb", () => {
  it("no plural-looking bare link text is the subject of has/is", () => {
    const bad: string[] = [];
    for (const a of allArticlesIncludingDrafts)
      for (const b of a.body) {
        const t = "text" in b && typeof b.text === "string" ? b.text : "";
        for (const m of t.matchAll(/(^|[.!?] |, )\[([^\]]+)\]\([^)]*\) (has|is) /g)) {
          // a bare plural subject: "low-energy hobbies has", "things to do ... has"
          if (/\b(hobbies|ideas|things|plans|dates|picks)\b/i.test(m[2]!))
            bad.push(`${a.slug}: ${m[0]}`);
        }
      }
    expect(bad).toEqual([]);
  });
  it("the reported sentence is fixed", () => {
    const text = JSON.stringify(allArticlesIncludingDrafts.map((a) => a.body));
    expect(text).toContain(
      "our guide to [low-energy hobbies](/journal/low-energy-hobbies) has more",
    );
  });
});

describe("4. Tonight: home entry, save, carry into the planner", () => {
  it("the home page has the three journeys (one primary) and no separate Tonight link or tile", () => {
    const src = readFileSync(path.join(root, "src/routes/index.tsx"), "utf8");
    expect(src).not.toContain("/tools/tonight");
    expect(src).not.toContain("home-tonight");
    const tiles = src.match(/const startTiles[\s\S]*?\n\];/)![0];
    expect(tiles.match(/to: "/g)).toHaveLength(3);
    expect(tiles.match(/primary: true/g)).toHaveLength(1);
    for (const to of ["/hobby-finder", "/make-plans", "/shop"]) expect(tiles).toContain(to);
  });

  const input = {
    minutes: 120,
    energy: "medium",
    budget: "under25",
    company: "solo",
    setting: "either",
  } as const;
  it("every idea can be saved, and a hobby saves as a hobby", () => {
    for (const s of tonightIdeas(input).suggestions) {
      const item = tonightSaveItem(s, input, 0);
      expect(item.title).toBe(s.title);
      expect(item.href.startsWith("/")).toBe(true);
      if (s.kind === "hobby") expect(item.key).toBe(`hobby:${s.hobbySlug}`);
    }
  });
  it("'Make it a whole plan' carries the chosen idea into the planner", () => {
    let checked = 0;
    for (const s of tonightIdeas(input).suggestions) {
      const search = tonightPlanSearch(input, s);
      expect(search["from"]).toBe("tonight");
      if (!search["with"]) continue;
      const parsed = parsePlanSearch(search);
      expect(parsed.pin).toBe(search["with"]);
      const plan = makePlan(parsed.input, parsed.seed, parsed.pin);
      expect(plan.ids, s.title).toContain(search["with"]);
      checked++;
    }
    expect(checked).toBeGreaterThan(0);
  });
  it("an unknown 'with' id is ignored", () => {
    expect(parsePlanSearch({ with: "not-a-real-idea" }).pin).toBeNull();
  });
  it("the Tonight mode of Make Plans saves through My Plans and links with search params", () => {
    const src = readFileSync(path.join(root, "src/components/planner/TonightMode.tsx"), "utf8");
    expect(src).toContain("<SaveButton");
    expect(src).toContain("tonightPlanSearch(input, s)");
  });
});

describe("6. /saved copy text equals the planner's copy text", () => {
  const input: PlanInput = {
    when: "saturday",
    length: "few-hours",
    vibe: "social",
    who: "friend",
    budget: "under25",
    atHome: false,
    setting: "any",
    energy: "any",
  };
  it("a saved plan copies exactly planText, with times and cost", () => {
    const plan = makePlan(input, 0);
    const href = planHref(plan.input, plan.seed, plan.ids);
    const out = savedShareText({
      key: `plan:${href}`,
      kind: "plan",
      title: plan.title,
      href,
      plan: { input: plan.input, seed: plan.seed, ids: plan.ids },
      savedAt: "2026-01-01T00:00:00.000Z",
    });
    expect(out.text).toBe(planText(plan, canonicalUrl(href)));
    expect(out.text).toMatch(/\d{1,2}:\d{2} (AM|PM)/);
    expect(out.text).toMatch(/Total: /);
    expect(out.url).toBeUndefined();
    expect(planFromIds(plan.input, plan.seed, plan.ids)).not.toBeNull();
  });
  it("a saved hobby copies the title and a canonical link", () => {
    const out = savedShareText({
      key: "hobby:tennis",
      kind: "hobby",
      title: "Tennis",
      href: "/hobbies/tennis",
      savedAt: "2026-01-01T00:00:00.000Z",
    });
    expect(out.url).toBe(`${site.url}/hobbies/tennis`);
  });
});

describe("7. share uses one canonical URL", () => {
  it("canonicalUrl is always site.url", () => {
    expect(canonicalUrl("/journal/x")).toBe(`${site.url}/journal/x`);
    expect(canonicalUrl("/make-plans?when=saturday")).toBe(`${site.url}/make-plans?when=saturday`);
  });
  it("no share or copy code reads window.location.origin", () => {
    for (const f of walk(path.join(root, "src")).filter(
      (f) => /\.tsx?$/.test(f) && !f.includes("/test/"),
    ))
      expect(readFileSync(f, "utf8"), f).not.toMatch(/location\.origin|location\.href/);
  });
  it("article Copy link copies the same URL that Send to the group chat sends", async () => {
    const copied: string[] = [];
    const shared: { url?: string }[] = [];
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async (t: string) => void copied.push(t) },
    });
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: async (d: { url?: string }) => void shared.push(d),
    });
    await show(<ShareButtons title="A story" path="/journal/a-story" />);
    await act(async () => {
      fireEvent.click(screen.getByText(/Copy link/));
    });
    await act(async () => {
      fireEvent.click(screen.getByText(/Send to the group chat/));
    });
    expect(copied[0]).toBe(`${site.url}/journal/a-story`);
    expect(shared[0]?.url).toBe(copied[0]);
    Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
  });
});

describe("8. watercolor kit is consistent", () => {
  it("the kit and article say pick one small set, and the pick is not framed as a 48-colour essential plus essential brushes", () => {
    const kit = readFileSync(path.join(root, "src/data/kits.ts"), "utf8");
    expect(kit).toMatch(/pick one/i);
    const art = readFileSync(
      path.join(root, "content/articles/watercolor-painting-for-beginners.json"),
      "utf8",
    );
    expect(art).toMatch(/Pick one small set/);
    const brushes = getCatalogProduct("transon-8-round-watercolor-brushes");
    expect(brushes?.isEssential).toBe(false);
  });
});

describe("9. filler picks are held, not deleted", () => {
  it("the 200-piece ephemera pack and the white-tile mahjong duplicate are on hold in the product source", () => {
    const held = (id: string) => {
      const o = JSON.parse(
        readFileSync(path.resolve(__dirname, `../../content/products/${id}.json`), "utf8"),
      );
      return o.status === "held" ? o.statusReason : undefined;
    };
    expect(held("knaid-200-piece-vintage-ephemera-cottagecore")).toBeTruthy();
    expect(held("jongyance-american-mahjong-set-white-tiles")).toBeTruthy();
    // held products are not even shipped to the browser
    expect(catalog.some((p) => p.id === "knaid-200-piece-vintage-ephemera-cottagecore")).toBe(
      false,
    );
    expect(
      verifiedCatalog.some((p) => p.id === "knaid-200-piece-vintage-ephemera-cottagecore"),
    ).toBe(false);
    expect(verifiedCatalog.filter((p) => p.id.includes("mahjong-set")).length).toBeLessThanOrEqual(
      2,
    );
  });
});

describe("10. hero images", () => {
  it("no hero is used by more than 2 published articles, and none by more than 3 overall", () => {
    const pub = new Map<string, number>();
    for (const a of articles) pub.set(a.hero, (pub.get(a.hero) ?? 0) + 1);
    expect(Math.max(...pub.values())).toBeLessThanOrEqual(2);
    const all = new Map<string, number>();
    for (const a of allArticlesIncludingDrafts) all.set(a.hero, (all.get(a.hero) ?? 0) + 1);
    expect(Math.max(...all.values())).toBeLessThanOrEqual(3);
    for (const k of all.keys()) expect(k in images).toBe(true);
  });
  it("no two neighbouring Journal cards share an image", () => {
    const bad = articles
      .map((a, i) => (i > 0 && articles[i - 1]!.hero === a.hero ? a.slug : null))
      .filter(Boolean);
    expect(bad).toEqual([]);
  });
});

describe("11. image-less quiz tiles are compact and icon-led", () => {
  it("renders a small icon chip row, not a tall flat block", async () => {
    const q = {
      key: "energy",
      q: "How is your energy?",
      options: [
        { v: "low", label: "Running on fumes" },
        { v: "high", label: "Bursting" },
      ],
    } as unknown as Parameters<typeof QuizStep>[0]["question"];
    const { container } = await show(
      <QuizStep
        question={q}
        offered={["low", "high"]}
        selected={undefined}
        position={1}
        total={5}
        onPick={() => {}}
        onBack={null}
      />,
    );
    const tiles = container.querySelectorAll('[data-testid="quiz-icon-tile"]');
    expect(tiles.length).toBe(2);
    expect(container.innerHTML).not.toMatch(/aspect-\[4\/3\][^"]*bg-butter/);
  });
});

describe("12. build output is not tracked", () => {
  it("gitignores and does not track .output, .wrangler, .netlify and dist", () => {
    const ignore = readFileSync(path.join(root, ".gitignore"), "utf8")
      .split("\n")
      .map((l) => l.trim());
    for (const d of [".output", ".wrangler/", ".netlify", "dist"])
      expect(
        ignore.some((l) => l === d || l === d.replace(/\/$/, "")),
        d,
      ).toBe(true);
    let tracked = "";
    try {
      tracked = execSync("git ls-files", { cwd: root, encoding: "utf8" });
    } catch {
      return; // not a git checkout (e.g. an export): nothing to check
    }
    expect(
      tracked.split("\n").filter((f) => /^(\.output|\.wrangler|\.netlify|dist)\//.test(f)),
    ).toEqual([]);
  });
});

void hobbies;
