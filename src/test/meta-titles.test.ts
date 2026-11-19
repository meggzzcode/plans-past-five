import { describe, expect, it } from "vitest";
import { ARTICLE_META_TITLES, articleMetaTitle, seo } from "@/lib/seo";
import { articles } from "@/content";
import { site } from "@/config/site";

const titleOf = (t: string) =>
  (
    seo({ title: t, description: "d", path: "/x" }).meta.find((m) => "title" in m) as {
      title: string;
    }
  ).title;

describe("meta titles", () => {
  it("every override belongs to a real article and keeps the page title within about 65", () => {
    const slugs = new Set(articles.map((a) => a.slug));
    for (const [slug, t] of Object.entries(ARTICLE_META_TITLES)) {
      expect(slugs.has(slug), slug).toBe(true);
      expect(titleOf(t).length, t).toBeLessThanOrEqual(66);
    }
  });
  it("article titles stay unique, and the on-page headline is never replaced", () => {
    const all = articles.map((a) => titleOf(articleMetaTitle(a.slug, a.title)));
    expect(new Set(all).size).toBe(all.length);
    expect(articleMetaTitle("no-override-here", "Headline")).toBe("Headline");
  });
  it("brand suffix is added once", () => {
    expect(titleOf("Short")).toBe(`Short | ${site.name}`);
  });
});
