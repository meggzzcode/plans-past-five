import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
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
  // photos uploaded through the CMS live in public/uploads (the folder may be empty or missing)
  mkdirSync(path.join(root, "public/uploads"), { recursive: true });
  if (existsSync(path.join(repo, "public/uploads")))
    cpSync(path.join(repo, "public/uploads"), path.join(root, "public/uploads"), {
      recursive: true,
    });
  // site files the integrity gate reads (pins, page-title overrides, corrections log)
  for (const f of ["src/data/pins.ts", "src/lib/seo.ts", "src/content/corrections.ts"]) {
    mkdirSync(path.dirname(path.join(root, f)), { recursive: true });
    cpSync(path.join(repo, f), path.join(root, f));
  }
  return root;
}
/** The file that holds an article, found by its slug (Pages CMS may name files after the title). */
const articleFile = (root: string, slug: string) => {
  const dir = path.join(root, "content/articles");
  const f = readdirSync(dir).find(
    (n) => n.endsWith(".json") && JSON.parse(readFileSync(path.join(dir, n), "utf8")).slug === slug,
  );
  if (!f) throw new Error(`no article file for ${slug}`);
  return path.join(dir, f);
};
const articlePath = articleFile;
const edit = (root: string, slug: string, fn: (a: Record<string, unknown>) => void) => {
  const p = articlePath(root, slug);
  const a = JSON.parse(readFileSync(p, "utf8"));
  fn(a);
  writeFileSync(p, JSON.stringify(a, null, 2));
};
const problems = (root: string) => lib.validateContent(root).problems as string[];
const SLUG = "pickleball-for-beginners";
const allBodies = (root: string) =>
  readdirSync(path.join(root, "content/articles")).map((n) =>
    readFileSync(path.join(root, "content/articles", n), "utf8"),
  );
const siteMentions = (root: string, slug: string) =>
  ["src/data/pins.ts", "src/lib/seo.ts", "src/content/corrections.ts"].some((f) =>
    readFileSync(path.join(root, f), "utf8").includes(slug),
  );

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
  it("accepts the first photo uploaded through the CMS (public/uploads) and uses it as a hero", () => {
    const png = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
      "base64",
    );
    writeFileSync(path.join(root, "public/uploads/cms-photo.png"), png);
    writeFileSync(
      path.join(root, "content/images/cmsPhoto.json"),
      JSON.stringify({
        key: "cmsPhoto",
        file: "/uploads/cms-photo.png",
        alt: "A small test picture uploaded through the CMS",
      }),
    );
    edit(root, SLUG, (a) => {
      a["hero"] = "cmsPhoto";
    });
    // an upload with no source and licence is refused, so the rights record cannot drift
    expect(problems(root).join("\n")).toMatch(/needs "Where it came from".*"Licence"/);
    writeFileSync(
      path.join(root, "content/images/cmsPhoto.json"),
      JSON.stringify({
        key: "cmsPhoto",
        file: "/uploads/cms-photo.png",
        alt: "A small test picture uploaded through the CMS",
        source: "my own photo",
        license: "my own photo",
      }),
    );
    expect(problems(root)).toEqual([]);
  });
  describe("integrity gate (nothing live may point at an unpublished article)", () => {
    const toDraft = (r: string, slug: string) =>
      edit(r, slug, (a) => {
        a["status"] = "draft";
        a["publishedAt"] = "";
        a["sources"] = [];
        delete a["verifiedAt"];
        a["coworkChecks"] = [];
      });
    it("passes when an article nobody refers to becomes a draft", () => {
      const refs = (lib.validateContent(root).articles as Article[]).flatMap((a) => [
        ...(a.related ?? []),
      ]);
      const loner = (lib.validateContent(root).articles as Article[]).find(
        (a) =>
          a.status === "published" &&
          !refs.includes(a.slug) &&
          !JSON.stringify(allBodies(root)).includes(`/journal/${a.slug}`) &&
          !siteMentions(root, a.slug),
      );
      if (!loner) return; // every article is referred to somewhere: nothing to prove here
      toDraft(root, loner.slug);
      expect(problems(root)).toEqual([]);
    });
    it("fails, in plain English, when a drafted article still has a pin", () => {
      const pinned = /"\/journal\/([a-z0-9-]+)"/.exec(
        readFileSync(path.join(root, "src/data/pins.ts"), "utf8"),
      )![1]!;
      toDraft(root, pinned);
      expect(problems(root).join("\n")).toMatch(
        new RegExp(
          `src/data/pins\\.ts: a Pinterest pin refers to "${pinned}" but "${pinned}" is a draft`,
        ),
      );
    });
    it("fails when a drafted article is still linked from another article's text or related list", () => {
      const all = lib.validateContent(root).articles as Article[];
      const target = all.find((a) => a.related?.length)!;
      const victim = target.related![0]!;
      toDraft(root, victim);
      expect(problems(root).join("\n")).toMatch(
        new RegExp(`${target.slug}\\.json, field "related": "${victim}" is a draft`),
      );
    });
    it("fails when a slug is changed but links still use the old one", () => {
      const all = lib.validateContent(root).articles as Article[];
      const target = all.find((a) => a.related?.length)!;
      const old = target.related![0]!;
      edit(root, old, (a) => {
        a["slug"] = "renamed-article-slug";
      });
      const p = problems(root).join("\n");
      expect(p).toMatch(new RegExp(`there is no article "${old}" \\(it was renamed or deleted\\)`));
    });
  });
  describe("publish gate", () => {
    const OTHER = "how-to-start-crocheting";
    it("fails a published article with no sources", () => {
      edit(root, OTHER, (a) => {
        a["sources"] = [];
      });
      expect(problems(root).join("\n")).toMatch(
        /field "sources": a published article needs at least one/,
      );
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
      // (this article is linked from others; the integrity gate has its own tests above)
      expect(lib.validateContent(root, { integrity: false }).problems).toEqual([]);
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
  it("the compiled bundle matches the article files, whatever their formatting", () => {
    // Compares meaning (parsed data), not bytes, so a valid save from Pages CMS never fails here.
    const strip = (x: unknown) => {
      const { coworkChecks: _c, ...rest } = x as Record<string, unknown>;
      return rest;
    };
    const fromFiles = lib.validateContent(repo).articles as Article[];
    expect(fromFiles.length).toBe(allArticlesIncludingDrafts.length);
    for (const a of allArticlesIncludingDrafts) {
      const f = fromFiles.find((x) => x.slug === a.slug);
      expect(f, a.slug).toBeDefined();
      expect(strip(f)).toEqual(strip(a));
    }
  });
  it("the canonical layout is stable: writing an article twice gives the same text", () => {
    for (const a of lib.validateContent(repo).articles as Article[]) {
      const text = lib.articleToJson(a);
      expect(lib.articleToJson(JSON.parse(text))).toBe(text);
    }
  });
  it("accepts a Pages CMS style save (4-space indent, no final newline, other key order, blank optional values) and tidies it", () => {
    const root = scratch();
    const f = articleFile(root, SLUG);
    const original = readFileSync(f, "utf8");
    const a = JSON.parse(original);
    const shuffled = Object.fromEntries(
      [...Object.entries(a)]
        .reverse()
        .concat(a["updatedAt"] === undefined ? [["updatedAt", ""]] : []),
    );
    writeFileSync(f, JSON.stringify(shuffled, null, 4));
    expect(problems(root)).toEqual([]);
    const r = lib.buildContent(root, { write: true });
    expect(r.reformatted.length).toBe(1);
    expect(readFileSync(f, "utf8")).toBe(original);
  });
  it("a typo fix in an article file is picked up by the build and is not a test failure", () => {
    const root = scratch();
    edit(root, SLUG, (a) => {
      a["dek"] = `${String(a["dek"])} (edited)`;
    });
    const r = lib.buildContent(root, { write: false });
    const pub = JSON.parse(r.outputs["src/content/generated/published.json"]);
    expect(pub.find((x: Article) => x.slug === SLUG).dek).toMatch(/\(edited\)$/);
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
      starterKit: { type: "starterKit", hobbies: ["a"], title: "t" },
      shopHobby: { type: "shopHobby", hobbies: ["a"], title: "t", dek: "d" },
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
