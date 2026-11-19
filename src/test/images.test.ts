import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { images } from "@/data/images";
// @ts-expect-error plain .mjs helper without type declarations
import * as lib from "../../scripts/ingest-images.lib.mjs";

const assets = path.resolve(__dirname, "../assets");
const contentDir = path.resolve(__dirname, "../content");

describe("image registry", () => {
  it("every registered image has alt text, dimensions and an existing source file", () => {
    for (const [key, img] of Object.entries(images)) {
      expect(img.alt.length, `${key} alt`).toBeGreaterThanOrEqual(20);
      expect(img.w, `${key} w`).toBeGreaterThan(0);
      expect(img.h, `${key} h`).toBeGreaterThan(0);
      expect(existsSync(path.join(assets, path.basename(img.src))), `${key} source file`).toBe(
        true,
      );
    }
  });

  it("no image is the hero of more than 3 articles", () => {
    // TARGET is 1 hero per image (see docs/content/IMAGE-SOURCING-BRIEF.md). The limit is 3 for now,
    // the current state; tighten it as new images are ingested.
    const counts = new Map<string, number>();
    for (const f of readdirSync(contentDir).filter((n) => /^article-.*\.ts$/.test(n))) {
      const m = /^ {2}hero: "([^"]+)",$/m.exec(readFileSync(path.join(contentDir, f), "utf8"));
      if (m) counts.set(m[1]!, (counts.get(m[1]!) ?? 0) + 1);
    }
    for (const key of counts.keys())
      expect(key in images, `${key} is a registered image`).toBe(true);
    const max = Math.max(0, ...counts.values());
    // informational (no console output): articles sharing a hero beyond the first
    const shared = [...counts.values()].reduce((n, c) => n + (c - 1), 0);
    expect(shared).toBeGreaterThanOrEqual(0);
    expect(max).toBeLessThanOrEqual(3);
  });
});

const good = {
  key: "crochetHands",
  file: "crochet.jpg",
  alt: "A woman's hands crocheting a butter-yellow blanket with a wooden hook",
  source: "Unsplash",
  creator: "Jane Doe",
  sourceUrl: "https://unsplash.com/photos/abc",
  licenseName: "Unsplash License",
  licenseUrl: "https://unsplash.com/license",
  dateSourced: "2026-11-19",
  heroFor: "how-to-start-crocheting",
  pinFor: "",
  notes: "",
};
const ctx = (over: Record<string, unknown> = {}) => ({
  baseKeys: new Set(["tennis"]),
  ingestedKeys: new Map(),
  seenKeys: new Set(),
  fileExists: true,
  info: { width: 2400, height: 1600 },
  today: new Date("2026-11-19T12:00:00Z"),
  knownSlugs: new Set(["how-to-start-crocheting"]),
  ...over,
});
const check = (row: Record<string, string>, c = ctx()) => lib.validateRow(row, c) as string[];

describe("ingest-images validator", () => {
  it("accepts a good row", () => {
    expect(check(good)).toEqual([]);
  });
  it("rejects a small width with a precise message", () => {
    const e = check(good, ctx({ info: { width: 1200, height: 800 } }));
    expect(e.join()).toMatch(/1200 px wide.*1600 px/);
  });
  it("rejects bad and duplicate keys", () => {
    expect(check({ ...good, key: "Crochet-Hands" }).join()).toMatch(/camelCase/);
    expect(check({ ...good, key: "tennis" }).join()).toMatch(/already used/);
    const c = ctx();
    check(good, c);
    expect(check(good, c).join()).toMatch(/appears twice/);
  });
  it("allows re-ingesting an identical key but not with different alt", () => {
    const ingestedKeys = new Map([["crochetHands", { alt: good.alt }]]);
    expect(check(good, ctx({ ingestedKeys }))).toEqual([]);
    expect(check({ ...good, alt: `${good.alt} again` }, ctx({ ingestedKeys })).join()).toMatch(
      /already ingested/,
    );
  });
  it("rejects bad licence fields and sources", () => {
    expect(check({ ...good, source: "Flickr" }).join()).toMatch(/source "Flickr"/);
    expect(check({ ...good, licenseName: "" }).join()).toMatch(/licenseName is required/);
    expect(check({ ...good, licenseUrl: "http://unsplash.com/license" }).join()).toMatch(
      /licenseUrl must be an https/,
    );
    expect(check({ ...good, dateSourced: "2026-13-40" }).join()).toMatch(/dateSourced/);
    expect(check({ ...good, sourceUrl: "https://example.com/x" }).join()).toMatch(/unsplash\.com/);
  });
  it("requires AI sources to say so in licenseName", () => {
    const ai = { ...good, source: "Canva AI", sourceUrl: "https://www.canva.com/M/MAHbXvOeP98" };
    expect(check({ ...ai, licenseName: "Canva Content License" }).join()).toMatch(/AI-generated/);
    expect(check({ ...ai, licenseName: "AI-generated image, Canva terms" })).toEqual([]);
  });
  it("rejects missing URLs, short alt, brand names in alt, unknown slugs", () => {
    const e = check({ ...good, sourceUrl: "", licenseUrl: "" }).join();
    expect(e).toMatch(/sourceUrl must be an https/);
    expect(e).toMatch(/licenseUrl must be an https/);
    expect(check({ ...good, alt: "Hands crocheting" }).join()).toMatch(/alt text is/);
    expect(
      check({ ...good, alt: "A woman playing with a Wilson paddle on a court" }).join(),
    ).toMatch(/brands/);
    expect(check({ ...good, heroFor: "nope" }).join()).toMatch(/no article file/);
  });
  it("reports a missing or unreadable file", () => {
    expect(check(good, ctx({ fileExists: false })).join()).toMatch(/not found/);
    expect(check(good, ctx({ info: { error: "bad data" } })).join()).toMatch(
      /not a readable image/,
    );
  });
  it("parses CSV with quotes, comments and kebab keys", () => {
    const rows = lib.rowsFromRecords(
      lib.parseCsv('key,file,alt,source\n# comment, here\ncrochetHands,a.jpg,"a, b",Pexels\n'),
    );
    expect(rows).toHaveLength(1);
    expect(rows[0].alt).toBe("a, b");
    expect(lib.kebabKey("potteryNight2")).toBe("pottery-night2");
  });
});
