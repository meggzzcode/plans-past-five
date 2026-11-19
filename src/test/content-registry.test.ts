import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { articles } from "@/content";
import { draftArticles } from "@/content/draft-registry";

const dir = path.resolve(__dirname, "../content");
const files = readdirSync(dir).filter((f) => /^article-.*\.ts$/.test(f));

describe("article registries (drafts must not ship in the public bundle)", () => {
  it("index.ts (public bundle) imports no draft files and not drafts.ts", () => {
    const src = readFileSync(path.join(dir, "index.ts"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    expect(src).not.toMatch(/draft-registry|from "\.\/drafts"/);
    const imported = [...src.matchAll(/from "\.\/(article-[^"]+)"/g)].map((m) => m[1]);
    for (const f of imported) {
      const text = readFileSync(path.join(dir, `${f}.ts`), "utf8");
      expect(text, `${f} is imported by the public index but is not published`).toMatch(
        /status:\s*"published"/,
      );
    }
  });
  it("every article file is registered exactly once, in the registry that matches its status", () => {
    const published = new Set(articles.map((a) => a.slug));
    const drafts = new Set(draftArticles.map((a) => a.slug));
    for (const f of files) {
      const text = readFileSync(path.join(dir, f), "utf8");
      const slug = /slug:\s*"([^"]+)"/.exec(text)![1]!;
      const isPublished = /status:\s*"published"/.test(text);
      expect(
        isPublished ? published.has(slug) : drafts.has(slug),
        `${f} registered in the wrong place`,
      ).toBe(true);
      expect(published.has(slug) && drafts.has(slug), `${f} registered twice`).toBe(false);
    }
  });
  it("public articles are all published and drafts are all drafts", () => {
    expect(articles.every((a) => a.status === "published")).toBe(true);
    expect(draftArticles.every((a) => a.status === "draft")).toBe(true);
  });
});
