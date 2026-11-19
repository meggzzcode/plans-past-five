import type { Article } from "./types";

/**
 * Unpublished drafts for Claude Code. status: "draft" keeps them out of every
 * public list, search, sitemap and route. Each has search intent, angle, links
 * and an outline; write the body, then flip status to "published".
 */
const d = (a: Omit<Article, "status" | "publishedAt" | "body"> & { outline: string[] }): Article => ({
  ...a, status: "draft", publishedAt: "", body: a.outline.map((text) => ({ type: "h2" as const, text })),
});

export const drafts: Article[] = [
  d({ slug: "solo-date-ideas", title: "30 Solo Date Ideas You'll Actually Look Forward To", dek: "Table for one, and honestly? Great table.", category: "solo-dates", hero: "soloCafe",
    searchIntent: "solo date ideas", angle: "Grouped by budget and how outgoing you feel; tips for eating alone comfortably",
    hobbies: ["reading", "museum-exploring", "film-photography", "outdoor-sketching", "picnicking"], productIds: ["pocket-notebooks", "picnic-blankets", "portable-watercolor", "book-sleeves", "film-cameras"],
    outline: ["Why solo dates feel weird (and why that fades)", "Free solo dates", "Under $25", "Creative solo dates", "Outdoor solo dates", "Solo dates for introverts", "How to eat alone and enjoy it"] }),
  d({ slug: "affordable-hobbies-under-30", title: "20 Affordable Hobbies You Can Start for Under $30", dek: "A real life outside work shouldn't require a big budget.", category: "after-hours", hero: "junkJournal",
    searchIntent: "cheap hobbies / hobbies under $30", angle: "Itemized starter costs (verify before publishing; no invented prices)",
    hobbies: ["junk-journaling", "watercolor-painting", "crochet", "reading", "birdwatching", "indoor-gardening"], productIds: ["junk-journals", "watercolor-sets", "board-games"],
    outline: ["Free hobbies", "Under $15", "Under $30", "How to try before you buy"] }),
  d({ slug: "how-to-host-a-craft-night", title: "How to Host a Cute Craft Night With Your Friends", dek: "Easier than a dinner party. More fun, too.", category: "better-together", hero: "girlsNight",
    searchIntent: "craft night ideas for adults", angle: "Hosting checklist, five craft menus, budget per guest",
    hobbies: ["craft-nights", "friendship-bracelets", "air-dry-clay", "pottery-painting"], productIds: ["friendship-bracelet-kits", "group-painting-kits", "acrylic-paints", "cookie-decorating-kits"],
    outline: ["Choosing a craft", "Invitations and timing", "Setup checklist", "Snack ideas", "Five craft night menus"] }),
  d({ slug: "getting-into-tennis-as-a-beginner", title: "Your Guide to Getting Into Tennis as a Complete Beginner", dek: "No country club required.", category: "movement", hero: "tennis",
    searchIntent: "how to start playing tennis as an adult beginner", angle: "Public courts, cheap lessons, what to wear, first drills",
    hobbies: ["tennis", "pickleball"], productIds: ["tennis-rackets", "tennis-balls", "water-bottles", "sports-totes"],
    outline: ["Finding a court", "Gear you need", "Lessons vs. YouTube", "Your first five sessions", "Finding people to play with"] }),
  d({ slug: "how-to-start-watercolor-painting", title: "How to Start Watercolor Painting at Home", dek: "Twenty minutes and a little paint set.", category: "creative-corner", hero: "watercolor",
    searchIntent: "watercolor for beginners at home", angle: "Supplies, five beginner exercises, common mistakes",
    hobbies: ["watercolor-painting", "outdoor-sketching"], productIds: ["watercolor-sets", "watercolor-sketchbooks", "portable-watercolor"],
    outline: ["Supplies", "Wet-on-wet vs. wet-on-dry", "Five first exercises", "Common mistakes", "Painting outdoors"] }),
  d({ slug: "low-energy-hobbies", title: "15 Low-Energy Hobbies for When Work Has Worn You Out", dek: "For the days you closed the laptop and felt your brain leave.", category: "after-hours", hero: "watercolor",
    searchIntent: "low energy hobbies", angle: "Couch-friendly, minimal setup, gentle on screen-tired eyes; no health claims",
    hobbies: ["paint-by-numbers", "jigsaw-puzzles", "embroidery", "reading"], productIds: ["group-painting-kits", "board-games", "book-lights", "embroidery-kits"],
    outline: ["Couch hobbies", "Ten-minute hobbies", "Hobbies to do with a show on"] }),
  d({ slug: "make-friends-as-an-adult-through-hobbies", title: "How to Make Friends as an Adult Through Hobbies", dek: "It's easier when there's something to do with your hands.", category: "better-together", hero: "girlsNight",
    searchIntent: "how to make friends as an adult", angle: "Recurring activities, classes, clubs; scripts for following up",
    hobbies: ["book-clubs", "craft-nights", "pickleball", "volunteering", "mahjong"], productIds: ["conversation-cards", "mahjong-sets"],
    outline: ["Why hobbies work", "Where to find groups", "How to go back a second time", "Turning acquaintances into friends", "Starting your own group"] }),
  d({ slug: "cute-weekend-plans-that-arent-brunch", title: "25 Cute Weekend Plans That Aren't Just Brunch", dek: "Let's give Saturday a storyline.", category: "weekends", hero: "picnic",
    searchIntent: "weekend plans ideas", angle: "Solo, friends and date options; budget tiers; no invented local events",
    hobbies: ["picnicking", "thrifting", "hiking", "pottery-painting", "museum-exploring"], productIds: ["picnic-blankets", "market-totes", "film-cameras"],
    outline: ["Saturday mornings", "Afternoon plans", "Rainy-day plans", "Sunday resets"] }),
];
