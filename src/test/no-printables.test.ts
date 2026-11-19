import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { allArticlesIncludingDrafts } from "@/content/draft-registry";
import { search } from "@/lib/search";
import { sitemapPaths } from "@/lib/sitemap";

const srcDir = join(__dirname, "..");
const root = join(srcDir, "..");

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

describe("no printables", () => {
  it("has no printables route files", () => {
    const routes = readdirSync(join(srcDir, "routes"));
    expect(routes.filter((f) => f.startsWith("printables"))).toEqual([]);
  });

  it("has no printables paths in the sitemap or search", () => {
    expect(sitemapPaths().filter((p) => p.startsWith("/printables"))).toEqual([]);
    expect(search("printable").filter((h) => h.to.startsWith("/printables"))).toEqual([]);
    expect(search("bucket list").filter((h) => h.to.startsWith("/printables"))).toEqual([]);
  });

  it("has no printable field on any article", () => {
    expect(allArticlesIncludingDrafts.filter((a) => "printable" in a)).toEqual([]);
  });

  it("has no files under public/downloads", () => {
    expect(existsSync(join(root, "public", "downloads"))).toBe(false);
  });

  it("references no /printables or digital-products in src", () => {
    const self = __filename;
    const bad = walk(srcDir)
      .filter((f) => /\.(tsx?|css)$/.test(f) && f !== self && !f.endsWith("routeTree.gen.ts"))
      .filter((f) => /\/printables|digital-products/.test(readFileSync(f, "utf8")));
    expect(bad).toEqual([]);
  });
});
