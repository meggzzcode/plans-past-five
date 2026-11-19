import type { Article, Block } from "./types";
import { article35Hobbies } from "./article-35-hobbies";
import { articleAfterWork } from "./article-after-work";
import { articleCreativeHome } from "./article-creative-home";
import { articleJunkJournaling } from "./article-junk-journaling";

export type { Article, Block };

/**
 * PUBLISHED articles only. This module is bundled into the public site, so draft articles must
 * NOT be imported here (their text would ship in the client and server bundles).
 * To publish a draft: set status "published", set publishedAt, verifiedAt and sources, then move its
 * import from ./draft-registry.ts to this file. src/test/rules.test.ts fails if a file is registered
 * in the wrong place.
 */
const all: Article[] = [
  article35Hobbies,
  articleAfterWork,
  articleCreativeHome,
  articleJunkJournaling,
];

/** Public articles only. */
export const articles: Article[] = all.filter((a) => a.status === "published");

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

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
      return b.text;
    case "list":
      return b.items.join(" ");
    case "item":
      return `${b.title} ${b.note} ${b.first ?? ""}`;
    case "first30":
      return b.steps.join(" ");
    case "whatYoullNeed":
      return [...b.essentials, ...(b.optional ?? [])].join(" ");
    case "saveSplurge":
      return `${b.save} ${b.splurge}`;
    default:
      return "";
  }
}

export function readingMinutes(a: Article) {
  const words =
    a.body.map(blockText).join(" ").split(/\s+/).filter(Boolean).length + a.dek.split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export const articlesForCategory = (slug: string) => articles.filter((a) => a.category === slug);

export const articlesForHobby = (hobbySlug: string) =>
  articles.filter((a) => a.hobbies.includes(hobbySlug));

/** Contextual related reading: score by shared hobbies, then shared category. */
export function relatedArticles(a: Pick<Article, "slug" | "hobbies" | "category">, limit = 3) {
  return articles
    .filter((x) => x.slug !== a.slug)
    .map((x) => ({
      x,
      score:
        x.hobbies.filter((h) => a.hobbies.includes(h)).length * 2 +
        (x.category === a.category ? 1 : 0),
    }))
    .filter((r) => r.score > 0)
    .sort((p, q) => q.score - p.score)
    .slice(0, limit)
    .map((r) => r.x);
}

export const toc = (a: Article) =>
  a.body.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2" && !!b.id);
