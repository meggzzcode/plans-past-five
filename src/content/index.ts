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
