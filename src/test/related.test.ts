import { describe, expect, it } from "vitest";
import { articles, getArticle, relatedArticles } from "@/content";

const base = {
  slug: "not-a-real-article",
  hobbies: [] as string[],
  category: articles[0]!.category,
};

describe("relatedArticles", () => {
  it("puts declared related slugs first, in order, published only", () => {
    const [x, y] = articles;
    const out = relatedArticles({ ...base, related: [y!.slug, "no-such-slug", x!.slug] }, 5);
    expect(out.map((a) => a.slug).slice(0, 2)).toEqual([y!.slug, x!.slug]);
    expect(out.every((a) => !!getArticle(a.slug))).toBe(true);
  });
  it("de-duplicates computed matches against declared ones and respects the limit", () => {
    const a = articles.find((x) => x.hobbies.length > 0)!;
    const declared = articles.filter((x) => x.slug !== a.slug)[0]!;
    const out = relatedArticles({ ...a, related: [declared.slug] }, 3);
    expect(out[0]!.slug).toBe(declared.slug);
    expect(out).toHaveLength(3);
    expect(new Set(out.map((x) => x.slug)).size).toBe(out.length);
    expect(out.some((x) => x.slug === a.slug)).toBe(false);
  });
  it("behaves as before when nothing is declared", () => {
    const a = articles[0]!;
    expect(relatedArticles(a).length).toBeLessThanOrEqual(3);
    expect(relatedArticles({ slug: a.slug, hobbies: a.hobbies, category: a.category })).toEqual(
      relatedArticles({ ...a, related: [] }),
    );
  });
  it("never includes the article itself even if it declares itself", () => {
    const a = articles[0]!;
    expect(relatedArticles({ ...a, related: [a.slug] }).some((x) => x.slug === a.slug)).toBe(false);
  });
});
