import type { Article, Block } from "./types";
import { article35Hobbies } from "./article-35-hobbies";
import { articleAfterWork } from "./article-after-work";
import { articleCreativeHome } from "./article-creative-home";
import { articleJunkJournaling } from "./article-junk-journaling";
import { drafts } from "./drafts";
import { articleActiveHobbiesForWomenWhoDontLoveTheGym } from "./article-active-hobbies-for-women-who-dont-love-the-gym";
import { articleAffordableHobbiesUnder25 } from "./article-affordable-hobbies-under-25";
import { articleAtHomeCreativeWeekend } from "./article-at-home-creative-weekend";
import { articleCheapWeekendAdventures } from "./article-cheap-weekend-adventures";
import { articleCozySoloDatesAtHome } from "./article-cozy-solo-dates-at-home";
import { articleCreativeHobbyStarterKitsWorthConsidering } from "./article-creative-hobby-starter-kits-worth-considering";
import { articleFlowerArrangingAsAHobby } from "./article-flower-arranging-as-a-hobby";
import { articleGirlsNightIdeasThatArentDrinks } from "./article-girls-night-ideas-that-arent-drinks";
import { articleHowToFindAHobbyAsAnAdult } from "./article-how-to-find-a-hobby-as-an-adult";
import { articleHowToGetIntoRecreationalCyclingAsAnAdult } from "./article-how-to-get-into-recreational-cycling-as-an-adult";
import { articleHowToHostACraftNight } from "./article-how-to-host-a-craft-night";
import { articleHowToHostAMahjongNight } from "./article-how-to-host-a-mahjong-night";
import { articleHowToHostAPaintNightAtHome } from "./article-how-to-host-a-paint-night-at-home";
import { articleHowToPlanAPerfectPicnic } from "./article-how-to-plan-a-perfect-picnic";
import { articleHowToPlanASoloSaturday } from "./article-how-to-plan-a-solo-saturday";
import { articleHowToStartABookClub } from "./article-how-to-start-a-book-club";
import { articleHowToStartAReadingJournal } from "./article-how-to-start-a-reading-journal";
import { articleHowToStartAirDryClay } from "./article-how-to-start-air-dry-clay";
import { articleHowToStartCrocheting } from "./article-how-to-start-crocheting";
import { articleHowToStartEmbroidery } from "./article-how-to-start-embroidery";
import { articleHowToStartPlayingTennisAsAnAdult } from "./article-how-to-start-playing-tennis-as-an-adult";
import { articleHowToTakeYourselfOnASoloCoffeeShopDate } from "./article-how-to-take-yourself-on-a-solo-coffee-shop-date";
import { articleJunkJournalingSuppliesForBeginners } from "./article-junk-journaling-supplies-for-beginners";
import { articleLowEnergyHobbies } from "./article-low-energy-hobbies";
import { articlePickleballForBeginners } from "./article-pickleball-for-beginners";
import { articleSoloDateIdeas } from "./article-solo-date-ideas";
import { articleThingsToDoOnTheWeekend } from "./article-things-to-do-on-the-weekend";
import { articleWatercolorPaintingForBeginners } from "./article-watercolor-painting-for-beginners";

export type { Article, Block };

const all: Article[] = [
  article35Hobbies,
  articleAfterWork,
  articleCreativeHome,
  articleJunkJournaling,
  // New drafts: stay status "draft" until every coworkChecks item is verified.
  articleActiveHobbiesForWomenWhoDontLoveTheGym,
  articleAffordableHobbiesUnder25,
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
  articleHowToStartAirDryClay,
  articleHowToStartCrocheting,
  articleHowToStartEmbroidery,
  articleHowToStartPlayingTennisAsAnAdult,
  articleHowToTakeYourselfOnASoloCoffeeShopDate,
  articleJunkJournalingSuppliesForBeginners,
  articleLowEnergyHobbies,
  articlePickleballForBeginners,
  articleSoloDateIdeas,
  articleThingsToDoOnTheWeekend,
  articleWatercolorPaintingForBeginners,
  ...drafts,
];

/** Public articles only. Drafts never leave this module through these helpers. */
export const articles: Article[] = all.filter((a) => a.status === "published");
export const allArticlesIncludingDrafts = all;

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
