import { site } from "@/config/site";
import { articles, articlesForHobby } from "@/content";
import { categories } from "@/data/categories";
import { collections } from "@/data/products";
import { printables } from "@/data/printables";
import { hobbies } from "@/data/hobbies";

/**
 * Public, indexable paths only. Excluded on purpose: /saved and /search (personal/utility pages),
 * drafts (never exposed by `articles`) and hobby profiles without a published guide (noindexed).
 */
export function sitemapPaths(): string[] {
  return [
    "/",
    "/start-here",
    "/hobbies",
    "/journal",
    "/shop",
    "/hobby-finder",
    "/make-plans",
    "/printables",
    "/tools/hobby-budget",
    "/tools/tonight",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/affiliate-disclosure",
    "/editorial-policy",
    "/methodology",
    "/corrections",
    ...categories.map((c) => `/${c.slug}`),
    ...articles.map((a) => `/journal/${a.slug}`),
    ...collections.map((c) => `/shop/${c.slug}`),
    ...printables.map((p) => `/printables/${p.slug}`),
    ...hobbies.filter((h) => articlesForHobby(h.slug).length > 0).map((h) => `/hobbies/${h.slug}`),
  ];
}

export function sitemapXml(): string {
  const urls = sitemapPaths()
    .map((p) => `  <url><loc>${site.url}${p}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}
