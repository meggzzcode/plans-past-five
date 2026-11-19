import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { render, screen, fireEvent } from "@testing-library/react";
import { pinFiles } from "@/data/pins";
import { articles } from "@/content";
import { hobbies, isHobbyIndexable } from "@/data/hobbies";
import { pinFor, pinForHobby, pinImageFor } from "@/lib/pins";
import { seo } from "@/lib/seo";
import { site } from "@/config/site";
import { Route as JournalRoute } from "@/routes/journal.$slug";
import { Route as HobbyRoute } from "@/routes/hobbies.$slug";
import { ShareButtons } from "@/components/editorial/ShareButtons";

const root = path.resolve(__dirname, "../..");
const manifest = JSON.parse(readFileSync(path.join(root, "design/pins/manifest.json"), "utf8")) as {
  file: string;
  destination: string;
}[];

function size(file: string): [number, number] {
  const b = readFileSync(file);
  if (b.subarray(1, 4).toString() === "PNG") return [b.readUInt32BE(16), b.readUInt32BE(20)];
  let i = 2; // JPEG: walk the segments to the first SOF marker
  while (i < b.length) {
    const m = b[i + 1]!;
    const len = b.readUInt16BE(i + 2);
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc)
      return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
    i += 2 + len;
  }
  throw new Error("no SOF");
}

describe("pin data", () => {
  it("matches design/pins/manifest.json exactly, in order", () => {
    const expected: Record<string, string[]> = {};
    for (const p of manifest) (expected[p.destination] ??= []).push(p.file);
    expect(pinFiles).toEqual(expected);
  });
  it("every pin file exists in public/pins and is 1000 x 1500 (2:3)", () => {
    for (const files of Object.values(pinFiles))
      for (const f of files) {
        const p = path.join(root, "public/pins", f);
        expect(existsSync(p), f).toBe(true);
        expect(size(p), f).toEqual([1000, 1500]);
      }
  });
  it("every pin destination is an article, tool or shop page, and published articles resolve to real files", () => {
    for (const dest of Object.keys(pinFiles))
      expect(dest).toMatch(/^\/(journal|tools|shop)\/|^\/(hobby-finder|make-plans)$/);
    for (const a of articles) {
      const p = pinFor(`/journal/${a.slug}`);
      if (p) expect(existsSync(path.join(root, "public", p))).toBe(true);
    }
  });
  it("the Pinterest CSV lists the same files and destinations", () => {
    const csv = readFileSync(path.join(root, "docs/pinterest-pins.csv"), "utf8");
    for (const p of manifest) {
      expect(csv).toContain(`public/pins/${p.file}`);
      expect(csv).toContain(`{SITE_URL}${p.destination}`);
    }
  });
});

describe("pin lookup", () => {
  it("uses the page's own pin, a hobby's guide pin, then the hero fallback", () => {
    expect(pinFor("/journal/low-energy-hobbies")).toBe("/pins/05-low-energy-1-headline.png");
    expect(pinImageFor("/journal/low-energy-hobbies", "/hero.jpg")).toBe(
      "/pins/05-low-energy-1-headline.png",
    );
    expect(pinImageFor("/journal/no-such-page", "/hero.jpg")).toBe("/hero.jpg");
    expect(pinImageFor("/journal/no-such-page")).toBeUndefined();
    expect(pinImageFor("/hobbies/no-such-hobby", "/hero.jpg")).toBe("/hero.jpg");
  });
  it("a hobby with a published guide that has a pin borrows that pin", () => {
    const withPin = hobbies.filter((h) => pinForHobby(h.slug));
    expect(withPin.length).toBeGreaterThan(0);
    for (const h of withPin) expect(pinForHobby(h.slug)!).toMatch(/^\/pins\/.+\.(png|jpg)$/);
  });
});

describe("per-route preview metadata", () => {
  type Meta = { property?: string; name?: string; content?: string };
  const metaOf = (route: unknown, slug: string) => {
    const r = route as {
      options: { head: (c: { loaderData: { slug: string } }) => { meta: Meta[] } };
    };
    return r.options.head({ loaderData: { slug } }).meta;
  };
  const og = (meta: Meta[], prop: string) =>
    meta.filter((m) => m.property === prop).map((m) => m.content);

  it("every article route sets og:type=article and its own hero as og:image", () => {
    for (const a of articles) {
      const meta = metaOf(JournalRoute, a.slug);
      expect(og(meta, "og:type"), a.slug).toEqual(["article"]);
      const [img] = og(meta, "og:image");
      expect(img, a.slug).toMatch(new RegExp(`^${site.url}/`));
      expect(
        meta.some((m) => m["name"] === "robots"),
        a.slug,
      ).toBe(false);
    }
  });
  it("indexable hobby pages carry their own image; noindex hobby pages carry no og:image", () => {
    for (const h of hobbies) {
      const meta = metaOf(HobbyRoute, h.slug);
      if (isHobbyIndexable(h.slug)) {
        expect(og(meta, "og:type")).toEqual(["website"]);
        expect(og(meta, "og:image")).toHaveLength(1);
        expect(meta.some((m) => m["name"] === "robots")).toBe(false);
      } else {
        expect(og(meta, "og:image"), h.slug).toEqual([]);
        expect(meta.some((m) => m["name"] === "twitter:image")).toBe(false);
        expect(meta).toContainEqual({ name: "robots", content: "noindex, follow" });
      }
    }
  });
  it("seo() never adds an image to a noindex page", () => {
    const { meta } = seo({ title: "T", description: "D", path: "/saved", noindex: true });
    expect(og(meta, "og:image")).toEqual([]);
  });
  it("the root head never sets an image", () => {
    const rootSrc = readFileSync(path.join(root, "src/routes/__root.tsx"), "utf8");
    expect(rootSrc).not.toMatch(/property: "og:image"|name: "twitter:image"/);
  });
});

describe("Pin button", () => {
  it("opens Pinterest with the mapped 2:3 pin, not the hero", () => {
    const open = (window.open = (() => null) as unknown as typeof window.open);
    let url = "";
    window.open = ((u: string) => ((url = u), null)) as unknown as typeof window.open;
    render(
      <ShareButtons
        title="Low energy"
        path="/journal/low-energy-hobbies"
        image="/assets/hero.jpg"
        description="Desc"
      />,
    );
    fireEvent.click(screen.getByLabelText("Save to Pinterest"));
    const u = new URL(url);
    expect(u.searchParams.get("media")).toBe(`${site.url}/pins/05-low-energy-1-headline.png`);
    expect(u.searchParams.get("description")).toBe("Desc");
    window.open = open;
  });
  it("falls back to the hero when the page has no pin", () => {
    let url = "";
    window.open = ((u: string) => ((url = u), null)) as unknown as typeof window.open;
    render(<ShareButtons title="X" path="/journal/no-pin" image="/assets/hero.jpg" />);
    fireEvent.click(screen.getAllByLabelText("Save to Pinterest").at(-1)!);
    expect(new URL(url).searchParams.get("media")).toBe(`${site.url}/assets/hero.jpg`);
  });
});
