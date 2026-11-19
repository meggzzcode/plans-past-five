import { site } from "@/config/site";
import { articles, articlesForHobby } from "@/content";
import { categories } from "@/data/categories";
import { collections } from "@/data/products";
import { hobbies } from "@/data/hobbies";
import { redirectedPaths } from "@/config/redirects";

/**
 * Public, indexable paths only. Excluded on purpose: /saved and /search (personal/utility pages),
 * drafts (never exposed by `articles`), hobby profiles without a published guide (noindexed), every
 * path that redirects (src/config/redirects.ts) and the unlinked Hobby Budget utility (noindexed).
 */
export function sitemapPaths(): string[] {
  const paths = [
    "/",
    "/hobbies",
    "/journal",
    "/shop",
    "/hobby-finder",
    "/make-plans",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/affiliate-disclosure",
    "/editorial-policy",
    "/methodology",
    "/corrections",
    "/changelog",
    ...categories.map((c) => `/${c.slug}`),
    ...articles.map((a) => `/journal/${a.slug}`),
    ...collections.map((c) => `/shop/${c.slug}`),
    ...hobbies.filter((h) => articlesForHobby(h.slug).length > 0).map((h) => `/hobbies/${h.slug}`),
  ];
  return paths.filter((p) => !redirectedPaths.includes(p));
}

export function sitemapXml(): string {
  const urls = sitemapPaths()
    .map((p) => `  <url><loc>${site.url}${p}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}
