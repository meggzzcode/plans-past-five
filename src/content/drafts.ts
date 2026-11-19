import type { Article } from "./types";

/**
 * Unpublished drafts for Claude Code. status: "draft" keeps them out of every
 * public list, search, sitemap and route. Each has search intent, angle, links
 * and an outline; write the body, then flip status to "published".
 */
const d = (
  a: Omit<Article, "status" | "publishedAt" | "body"> & { outline: string[] },
): Article => ({
  ...a,
  status: "draft",
  publishedAt: "",
  body: a.outline.map((text) => ({ type: "h2" as const, text })),
});

export const drafts: Article[] = [
  d({
    slug: "make-friends-as-an-adult-through-hobbies",
    title: "How to Make Friends as an Adult Through Hobbies",
    dek: "It's easier when there's something to do with your hands.",
    category: "better-together",
    hero: "girlsNight",
    searchIntent: "how to make friends as an adult",
    angle: "Recurring activities, classes, clubs; scripts for following up",
    hobbies: ["book-clubs", "craft-nights", "pickleball", "volunteering", "mahjong"],
    productIds: ["conversation-cards", "mahjong-sets"],
    outline: [
      "Why hobbies work",
      "Where to find groups",
      "How to go back a second time",
      "Turning acquaintances into friends",
      "Starting your own group",
    ],
  }),
  d({
    slug: "cute-weekend-plans-that-arent-brunch",
    title: "25 Cute Weekend Plans That Aren't Just Brunch",
    dek: "Let's give Saturday a storyline.",
    category: "weekends",
    hero: "picnic",
    searchIntent: "weekend plans ideas",
    angle: "Solo, friends and date options; budget tiers; no invented local events",
    hobbies: ["picnicking", "thrifting", "hiking", "pottery-painting", "museum-exploring"],
    productIds: ["picnic-blankets", "market-totes", "film-cameras"],
    outline: ["Saturday mornings", "Afternoon plans", "Rainy-day plans", "Sunday resets"],
  }),
];
