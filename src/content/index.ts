import type { Article, Block } from "./types";

export type { Article, Block };

/**
 * PUBLISHED articles only. Articles are data files in content/articles/*.json (edited in Pages CMS);
 * scripts/build-content.mjs validates them before every build and writes only the ones with
 * status "published" to ./generated/published.json. Draft text is written to a different file
 * (./generated/drafts.json) that only ./draft-registry.ts (tests and scripts) imports, so drafts
 * never enter the public bundle. src/test/content-registry.test.ts enforces this.
 */
import published from "./generated/published.json";

const all = published as unknown as Article[];

/** Public articles only. */
export const articles: Article[] = all.filter((a) => a.status === "published");

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

const strip = (t: string) =>
  t
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\{\{product:[a-z0-9-]+\|([^}]+)\}\}/g, "$1")
    .replace(/\*\*/g, "");

/**
 * Plain text a reader actually reads for one block (markup removed). Covers every block type;
 * shop blocks are product data, not prose, and count as 0 words. Hobby names in `ifYouLoved` are
 * counted from their slugs (this module cannot import the hobby data without a cycle).
 */
export function blockText(b: Block): string {
  switch (b.type) {
    case "p":
    case "h2":
    case "h3":
    case "quote":
    case "tryThisWeekend":
    case "girlsNight":
    case "noSpend":
    case "makePlan":
      return strip(b.text);
    case "list":
      return strip(b.items.join(" "));
    case "item":
      return strip([b.title, b.note, b.time, b.cost, b.company, b.first].filter(Boolean).join(" "));
    case "first30":
      return strip(b.steps.join(" "));
    case "whatYoullNeed":
      return strip([...b.essentials, ...(b.optional ?? [])].join(" "));
    case "saveSplurge":
      return strip(`${b.save} ${b.splurge}`);
    case "image":
      return b.caption ?? "";
    case "ifYouLoved":
      return b.hobbies.map((h) => h.replace(/-/g, " ")).join(" ");
    case "starterKit":
    case "shopHobby":
    case "shopTheArticle":
    case "shopMyHobby":
      return "";
  }
}

const WORDS_PER_MINUTE = 200;

export function articleWordCount(a: Pick<Article, "dek" | "body">) {
  return [a.dek, ...a.body.map(blockText)].join(" ").split(/\s+/).filter(Boolean).length;
}

export function readingMinutes(a: Pick<Article, "dek" | "body">) {
  return Math.max(1, Math.round(articleWordCount(a) / WORDS_PER_MINUTE));
}

export const articlesForCategory = (slug: string) => articles.filter((a) => a.category === slug);

export const articlesForHobby = (hobbySlug: string) =>
  articles.filter((a) => a.hobbies.includes(hobbySlug));

/**
 * Contextual related reading: slugs the article declares in `related` (published only) first, in
 * order, then computed matches by shared hobbies and category. De-duplicated; limit applies overall.
 */
export function relatedArticles(
  a: Pick<Article, "slug" | "hobbies" | "category"> & { related?: string[] | undefined },
  limit = 3,
) {
  const declared = (a.related ?? [])
    .map((slug) => getArticle(slug))
    .filter((x): x is Article => !!x && x.slug !== a.slug);
  const computed = articles
    .filter((x) => x.slug !== a.slug)
    .map((x) => ({
      x,
      score:
        x.hobbies.filter((h) => a.hobbies.includes(h)).length * 2 +
        (x.category === a.category ? 1 : 0),
    }))
    .filter((r) => r.score > 0)
    .sort((p, q) => q.score - p.score)
    .map((r) => r.x);
  return [...new Map([...declared, ...computed].map((x) => [x.slug, x])).values()].slice(0, limit);
}

export const toc = (a: Article) =>
  a.body.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2" && !!b.id);
