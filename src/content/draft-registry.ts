import type { Article } from "./types";
import { articles } from "./index";
import drafts from "./generated/drafts.json";

/**
 * Draft articles (content/articles/*.json with status "draft"). Imported ONLY by tests and
 * maintenance scripts, never by site code, so draft text is not bundled into the public site.
 * To publish a draft: in Pages CMS set Status to Published and fill in the dates (see
 * docs/buyer/CMS-SETUP.md).
 */
export const draftArticles: Article[] = drafts as unknown as Article[];

export const allArticlesIncludingDrafts: Article[] = [...articles, ...draftArticles];
