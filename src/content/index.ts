import type { Article, Block } from "./types";
import { articleThingsToDoOnTheWeekend } from "./article-things-to-do-on-the-weekend";
import { articleSoloDateIdeas } from "./article-solo-date-ideas";
import { articlePickleballForBeginners } from "./article-pickleball-for-beginners";
import { articleLowEnergyHobbies } from "./article-low-energy-hobbies";
import { articleJunkJournalingSuppliesForBeginners } from "./article-junk-journaling-supplies-for-beginners";
import { articleHowToTakeYourselfOnASoloCoffeeShopDate } from "./article-how-to-take-yourself-on-a-solo-coffee-shop-date";
import { articleHowToStartPlayingTennisAsAnAdult } from "./article-how-to-start-playing-tennis-as-an-adult";
import { articleHowToStartAReadingJournal } from "./article-how-to-start-a-reading-journal";
import { articleHowToStartABookClub } from "./article-how-to-start-a-book-club";
import { articleHowToPlanASoloSaturday } from "./article-how-to-plan-a-solo-saturday";
import { articleHowToPlanAPerfectPicnic } from "./article-how-to-plan-a-perfect-picnic";
import { articleHowToHostAPaintNightAtHome } from "./article-how-to-host-a-paint-night-at-home";
import { articleHowToHostAMahjongNight } from "./article-how-to-host-a-mahjong-night";
import { articleHowToHostACraftNight } from "./article-how-to-host-a-craft-night";
import { articleHowToGetIntoRecreationalCyclingAsAnAdult } from "./article-how-to-get-into-recreational-cycling-as-an-adult";
import { articleHowToFindAHobbyAsAnAdult } from "./article-how-to-find-a-hobby-as-an-adult";
import { articleGirlsNightIdeasThatArentDrinks } from "./article-girls-night-ideas-that-arent-drinks";
import { articleFlowerArrangingAsAHobby } from "./article-flower-arranging-as-a-hobby";
import { articleCreativeHobbyStarterKitsWorthConsidering } from "./article-creative-hobby-starter-kits-worth-considering";
import { articleCozySoloDatesAtHome } from "./article-cozy-solo-dates-at-home";
import { articleCheapWeekendAdventures } from "./article-cheap-weekend-adventures";
import { articleAtHomeCreativeWeekend } from "./article-at-home-creative-weekend";
import { articleActiveHobbiesForWomenWhoDontLoveTheGym } from "./article-active-hobbies-for-women-who-dont-love-the-gym";
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
  articleActiveHobbiesForWomenWhoDontLoveTheGym,
  articleAtHomeCreativeWeekend,
  articleCheapWeekendAdventures,
  articleCozySoloDatesAtHome,
  articleCreativeHobbyStarterKitsWorthConsidering,
  articleFlowerArrangingAsAHobby,
  articleGirlsNightIdeasThatArentDrinks,
  articleHowToFindAHobbyAsAnAdult,
  articleHowToGetIntoRecreationalCyclingAsAnAdult,
  articleHowToHostACraftNight,
  articleHowToHostAMahjongNight,
  articleHowToHostAPaintNightAtHome,
  articleHowToPlanAPerfectPicnic,
  articleHowToPlanASoloSaturday,
  articleHowToStartABookClub,
  articleHowToStartAReadingJournal,
  articleHowToStartPlayingTennisAsAnAdult,
  articleHowToTakeYourselfOnASoloCoffeeShopDate,
  articleJunkJournalingSuppliesForBeginners,
  articleLowEnergyHobbies,
  articlePickleballForBeginners,
  articleSoloDateIdeas,
  articleThingsToDoOnTheWeekend,
];

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
