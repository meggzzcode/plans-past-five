import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { articles } from "@/content";
import { draftArticles } from "@/content/draft-registry";
import published from "@/content/generated/published.json";
import drafts from "@/content/generated/drafts.json";

const contentDir = path.resolve(__dirname, "../content");
const articlesDir = path.resolve(__dirname, "../../content/articles");
const files = readdirSync(articlesDir).filter((f) => f.endsWith(".json"));

describe("article registries (drafts must not ship in the public bundle)", () => {
  it("the generated public bundle contains no drafts", () => {
    expect(published.length).toBeGreaterThan(0);
    expect((published as { status: string }[]).every((a) => a.status === "published")).toBe(true);
    expect(JSON.stringify(published)).not.toMatch(/"status":\s*"draft"/);
    for (const d of drafts as { slug: string; title: string }[])
      expect(JSON.stringify(published), `draft ${d.slug} leaked`).not.toContain(d.title);
  });
  it("index.ts (public bundle) imports only the published bundle, never drafts", () => {
    const src = readFileSync(path.join(contentDir, "index.ts"), "utf8").replace(
      /\/\*[\s\S]*?\*\//g,
      "",
    );
    expect(src).not.toMatch(/draft-registry|generated\/drafts/);
    expect(src).toMatch(/generated\/published\.json/);
  });
  it("every content/articles file is in the registry that matches its status", () => {
    const pub = new Set(articles.map((a) => a.slug));
    const dr = new Set(draftArticles.map((a) => a.slug));
    for (const f of files) {
      const data = JSON.parse(readFileSync(path.join(articlesDir, f), "utf8")) as {
        slug: string;
        status: string;
      };
      expect(data.status === "published" ? pub.has(data.slug) : dr.has(data.slug), f).toBe(true);
      expect(pub.has(data.slug) && dr.has(data.slug), `${f} registered twice`).toBe(false);
    }
    expect(pub.size + dr.size).toBe(files.length);
  });
  it("public articles are all published and drafts are all drafts", () => {
    expect(articles.every((a) => a.status === "published")).toBe(true);
    expect(draftArticles.every((a) => a.status === "draft")).toBe(true);
  });
});
