import type { Article } from "./types";
import { articles } from "./index";
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

/**
 * Draft articles. Imported ONLY by tests and maintenance scripts, never by site code, so draft text
 * is not bundled into the public site. See the note in ./index.ts for how to publish a draft.
 */
export const draftArticles: Article[] = [
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

export const allArticlesIncludingDrafts: Article[] = [...articles, ...draftArticles];
