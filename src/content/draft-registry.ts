import type { Article } from "./types";
import { articles } from "./index";
import { drafts } from "./drafts";
import { articleAffordableHobbiesUnder25 } from "./article-affordable-hobbies-under-25";
import { articleHowToStartAirDryClay } from "./article-how-to-start-air-dry-clay";
import { articleHowToStartCrocheting } from "./article-how-to-start-crocheting";
import { articleHowToStartEmbroidery } from "./article-how-to-start-embroidery";
import { articleWatercolorPaintingForBeginners } from "./article-watercolor-painting-for-beginners";

/**
 * Draft articles. Imported ONLY by tests and maintenance scripts, never by site code, so draft text
 * is not bundled into the public site. See the note in ./index.ts for how to publish a draft.
 */
export const draftArticles: Article[] = [
  articleAffordableHobbiesUnder25,
  articleHowToStartAirDryClay,
  articleHowToStartCrocheting,
  articleHowToStartEmbroidery,
  articleWatercolorPaintingForBeginners,
  ...drafts,
];

export const allArticlesIncludingDrafts: Article[] = [...articles, ...draftArticles];
