import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
// @ts-expect-error plain .mjs helper without type declarations
import * as lib from "../../scripts/content-lib.mjs";
import { blockText, readingMinutes } from "@/content";
import { allArticlesIncludingDrafts } from "@/content/draft-registry";
import type { Article } from "@/content/types";

const repo = path.resolve(__dirname, "../..");
const tmpRoots: string[] = [];

/** A scratch copy of the real content plus the files the validator reads, so tests never touch the repo. */
function scratch() {
  const root = mkdtempSync(path.join(tmpdir(), "content-"));
  tmpRoots.push(root);
  cpSync(path.join(repo, "content"), path.join(root, "content"), { recursive: true });
  mkdirSync(path.join(root, "src/data"), { recursive: true });
  cpSync(path.join(repo, "src/data/categories.ts"), path.join(root, "src/data/categories.ts"));
  for (const f of ["images.ts", "images.extra.ts"])
    cpSync(path.join(repo, "src/data", f), path.join(root, "src/data", f));
  cpSync(path.join(repo, "src/assets"), path.join(root, "src/assets"), { recursive: true });
  return root;
}
const articlePath = (root: string, slug: string) =>
  path.join(root, "content/articles", `${slug}.json`);
const edit = (root: string, slug: string, fn: (a: Record<string, unknown>) => void) => {
  const p = articlePath(root, slug);
  const a = JSON.parse(readFileSync(p, "utf8"));
  fn(a);
  writeFileSync(p, JSON.stringify(a, null, 2));
};
const problems = (root: string) => lib.validateContent(root).problems as string[];
const SLUG = "pickleball-for-beginners";

afterAll(() => tmpRoots.forEach((r) => rmSync(r, { recursive: true, force: true })));

describe("content validator", () => {
  let root: string;
  beforeEach(() => {
    root = scratch();
  });

  it("accepts the real content", () => {
    expect(problems(root)).toEqual([]);
  });
  it("rejects a bad source URL and names the file and field", () => {
    edit(root, SLUG, (a) => {
      a["sources"] = [{ title: "A source", url: "www.example.com/page" }];
    });
    const p = problems(root).join("\n");
    expect(p).toContain(`content/articles/${SLUG}.json`);
    expect(p).toMatch(/sources > #1 > url.*starting with https/);
  });
  it("rejects an image with missing alt text", () => {
    const f = path.join(root, "content/images/tennis.json");
    const img = JSON.parse(readFileSync(f, "utf8"));
    delete img.alt;
    writeFileSync(f, JSON.stringify(img));
    expect(problems(root).join("\n")).toMatch(/content\/images\/tennis\.json, field "alt"/);
    img.alt = "short";
    writeFileSync(f, JSON.stringify(img));
    expect(problems(root).join("\n")).toMatch(/alt text is required/);
  });
  it("rejects an unknown block type and lists the allowed ones", () => {
    edit(root, SLUG, (a) => {
      (a["body"] as unknown[]).push({ type: "banner", text: "Hi" });
    });
    expect(problems(root).join("\n")).toMatch(/block #\d+: unknown block type "banner"/);
  });
  describe("publish gate", () => {
    const OTHER = "how-to-start-crocheting";
    it("fails a published article with no sources", () => {
      edit(root, OTHER, (a) => {
        a["sources"] = [];
      });
      expect(problems(root).join("\n")).toMatch(/field "sources": a published article needs at least one/);
    });
    it("fails a published article with no verifiedAt date", () => {
      edit(root, OTHER, (a) => {
        delete a["verifiedAt"];
      });
      expect(problems(root).join("\n")).toMatch(/field "verifiedAt": a published article needs/);
    });
    it("fails a published article with an unresolved coworkCheck", () => {
      edit(root, OTHER, (a) => {
        a["coworkChecks"] = ["Confirm the yarn weight claim"];
      });
      expect(problems(root).join("\n")).toMatch(/field "coworkChecks": 1 unresolved check/);
    });
    it("passes resolved checks and exempts drafts", () => {
      edit(root, OTHER, (a) => {
        a["coworkChecks"] = ["RESOLVED 2026-11-19: yarn weight claim removed"];
      });
      expect(problems(root)).toEqual([]);
      edit(root, OTHER, (a) => {
        a["status"] = "draft";
        a["publishedAt"] = "";
        a["sources"] = [];
        delete a["verifiedAt"];
        a["coworkChecks"] = ["Confirm the yarn weight claim"];
      });
      expect(problems(root)).toEqual([]);
    });
    it("keeps the source exemption list to the two known articles", () => {
      expect([...lib.SOURCELESS_ALLOWED].sort()).toEqual([
        "how-to-start-a-reading-journal",
        "low-energy-hobbies",
      ]);
    });
  });
  it("rejects a bad status", () => {
    edit(root, SLUG, (a) => {
      a["status"] = "live";
    });
    expect(problems(root).join("\n")).toMatch(/field "status": must be "draft" or "published"/);
  });
  it("rejects duplicate slugs", () => {
    // a copy of an article under another file name, as Pages CMS could create it
    const copy = JSON.parse(readFileSync(articlePath(root, SLUG), "utf8"));
    writeFileSync(path.join(root, "content/articles/copy-of-it.json"), JSON.stringify(copy));
    const p = problems(root).join("\n");
    expect(p).toMatch(/the slug "pickleball-for-beginners" is already used by /);
  });
  it("rejects an unknown hero picture, a missing block field and a published article with no date", () => {
    edit(root, SLUG, (a) => {
      delete a["publishedAt"];
      (a["body"] as { type: string; text?: string }[])[0] = { type: "p" };
    });
    const p = problems(root).join("\n");
    expect(p).toMatch(/field "publishedAt"/);
    expect(p).toMatch(/block #1 \(p\), field "text"/);
    const root2 = scratch();
    edit(root2, SLUG, (a) => {
      a["hero"] = "noSuchPicture";
    });
    expect(problems(root2).join("\n")).toMatch(/no picture called "noSuchPicture"/);
  });
  it("treats blank CMS values as missing and fails the build function with every problem", () => {
    edit(root, SLUG, (a) => {
      a["status"] = "nope";
      a["title"] = "";
    });
    expect(() => lib.buildContent(root, { write: false })).toThrow(/title|status/);
  });
  it("writes only published articles to the public bundle", () => {
    const r = lib.buildContent(root, { write: false });
    const pub = JSON.parse(r.outputs["src/content/generated/published.json"]);
    const dr = JSON.parse(r.outputs["src/content/generated/drafts.json"]);
    expect(pub.every((a: Article) => a.status === "published")).toBe(true);
    expect(dr.every((a: Article) => a.status === "draft")).toBe(true);
    expect(pub.length + dr.length).toBe(r.articles.length);
  });
});

describe("converted data renders identically", () => {
  it("is byte-stable: converting an article again gives the same text", () => {
    for (const a of allArticlesIncludingDrafts) {
      const onDisk = readFileSync(articlePath(repo, a.slug), "utf8");
      // The public bundle leaves out internal coworkChecks, so put them back from the file to compare.
      const full = { ...a, coworkChecks: JSON.parse(onDisk).coworkChecks } as Article;
      const text = lib.articleToJson(full);
      expect(lib.articleToJson(JSON.parse(text))).toBe(text);
      expect(onDisk).toBe(text);
    }
  });
  it("round-trips every article: same object, same block text, same reading time", () => {
    for (const a of allArticlesIncludingDrafts) {
      const back = JSON.parse(lib.articleToJson(a)) as Article;
      expect(back).toEqual(a);
      expect(back.body.map(blockText)).toEqual(a.body.map(blockText));
      expect(readingMinutes(back)).toBe(readingMinutes(a));
    }
  });
  it("covers every block type with a valid example", () => {
    const examples: Record<string, unknown> = {
      p: { type: "p", text: "x" },
      h2: { type: "h2", text: "x", id: "x" },
      h3: { type: "h3", text: "x" },
      list: { type: "list", items: ["a"] },
      quote: { type: "quote", text: "x" },
      image: { type: "image", image: "tennis", caption: "c" },
      item: {
        type: "item",
        n: 1,
        title: "t",
        note: "n",
        time: "1",
        cost: "2",
        company: "c",
        first: "f",
        hobby: "h",
      },
      whatYoullNeed: { type: "whatYoullNeed", essentials: ["a"], optional: ["b"] },
      starterKit: { type: "starterKit", productIds: ["a"], title: "t" },
      shopHobby: { type: "shopHobby", productIds: ["a"], title: "t", dek: "d" },
      shopTheArticle: {
        type: "shopTheArticle",
        articleSlug: "a",
        hobbies: ["h"],
        collection: "c",
        title: "t",
        dek: "d",
      },
      shopMyHobby: { type: "shopMyHobby", hobby: "h", title: "t", dek: "d" },
      saveSplurge: { type: "saveSplurge", save: "a", splurge: "b" },
      tryThisWeekend: { type: "tryThisWeekend", text: "x" },
      girlsNight: { type: "girlsNight", text: "x" },
      first30: { type: "first30", steps: ["a"] },
      noSpend: { type: "noSpend", text: "x" },
      makePlan: { type: "makePlan", text: "x" },
      ifYouLoved: { type: "ifYouLoved", hobbies: ["h"] },
    };
    expect(Object.keys(examples).sort()).toEqual([...lib.BLOCK_TYPES].sort());
    for (const [t, ex] of Object.entries(examples))
      expect(lib.blockSchemas[t].parse(ex), t).toEqual(ex);
  });
});

describe("generated images", () => {
  it("every content/images file becomes a registered image", async () => {
    const { images } = await import("@/data/images");
    const r = lib.validateContent(repo);
    for (const img of r.images as { key: string }[]) expect(images).toHaveProperty(img.key);
  });
});
