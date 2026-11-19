import type { ImageKey } from "./images";

/**
 * The shop collections. Products live in content/products (src/data/catalog.ts); only verified,
 * Amazon-monetisable products are ever shown. There are no generic "search Amazon" substitutes.
 */

export type CollectionSlug =
  | "pottery-era"
  | "creative-girl"
  | "sporty-girl"
  | "girls-night-in"
  | "bookish-girl"
  | "little-adventures"
  | "journaling-era"
  | "cozy-after-hours";

export type Collection = {
  slug: CollectionSlug;
  name: string;
  dek: string;
  intro: string;
  image: ImageKey;
  tone: "butter" | "strawberry" | "matcha" | "sunday" | "cream";
  /** Hobby slugs this collection supports, main ones first. Drives the "hobby guides" and what-to-start lists. */
  hobbies: string[];
  /**
   * Starter kits (src/data/kits.ts) that belong on this collection's page, hobby-appropriate only.
   * A collection never borrows another collection's kit under its own heading. A kit's "home"
   * collection is the first one that lists it.
   */
  kitIds?: string[];
};

export const collections: Collection[] = [
  {
    slug: "pottery-era",
    hobbies: ["air-dry-clay", "craft-nights", "paint-by-numbers", "pottery-painting"],
    name: "The Pottery Era",
    dek: "Clay, paint and very lovable lumpy bowls",
    image: "shopPottery",
    tone: "butter",
    intro:
      "Pottery-class energy at your kitchen table. No kiln, no wheel, just clay, paint and a few hours of lovably lumpy.",
    kitIds: ["air-dry-clay"],
  },
  {
    slug: "creative-girl",
    hobbies: [
      "outdoor-sketching",
      "junk-journaling",
      "scrapbooking",
      "flower-arranging",
      "watercolor-painting",
      "collage-art",
      "crochet",
      "knitting",
      "craft-nights",
      "embroidery",
      "creative-writing",
      "paint-by-numbers",
    ],
    name: "The Creative Girl",
    dek: "Paper, paint and thread for quiet evenings",
    image: "watercolor",
    tone: "strawberry",
    intro:
      "Watercolor, a journal, a hoop and thread: starter supplies small enough to put away after.",
    kitIds: ["watercolor", "junk-journaling"],
  },
  {
    slug: "sporty-girl",
    hobbies: [
      "tennis",
      "hiking",
      "pickleball",
      "picnicking",
      "birdwatching",
      "nature-photography",
      "running",
      "roller-skating",
      "yoga-for-beginners",
    ],
    name: "The Sporty Girl",
    dek: "For golden-hour rallies and Saturday trails",
    image: "shopSporty",
    tone: "matcha",
    intro:
      "Gear for your first rally, game or trail. You don't need the pro version, and you can often borrow or rent first.",
    kitIds: ["racquet-sports"],
  },
  {
    slug: "girls-night-in",
    hobbies: [
      "craft-nights",
      "mahjong",
      "friendship-bracelets",
      "jewelry-making",
      "book-clubs",
      "paint-by-numbers",
      "baking",
      "jigsaw-puzzles",
      "picnicking",
    ],
    name: "Girls' Night In",
    dek: "Host a night everyone talks about after",
    image: "shopGirlsNight",
    tone: "strawberry",
    intro:
      "Turn 'we should hang out' into a date in the group chat: a mahjong night or a paint night at home, with what to grab to make it easy.",
    kitIds: ["mahjong-night", "pottery-paint-night"],
  },
  {
    slug: "bookish-girl",
    hobbies: ["reading", "book-clubs"],
    name: "The Bookish Girl",
    dek: "For one-more-chapter people",
    image: "hobbyReading",
    tone: "sunday",
    intro:
      "Little upgrades that make reading feel like an event: in bed, on the train or at your favorite café.",
    kitIds: ["reading-book-club"],
  },
  {
    slug: "little-adventures",
    hobbies: [
      "picnicking",
      "birdwatching",
      "film-photography",
      "outdoor-sketching",
      "hiking",
      "nature-photography",
      "creative-writing",
      "museum-exploring",
      "thrifting",
      "watercolor-painting",
    ],
    name: "Little Adventures",
    dek: "Pack for a picnic, a market or a wander",
    image: "shopAdventures",
    tone: "butter",
    intro: "Small, portable things that make it easier to say yes to a spontaneous afternoon out.",
    kitIds: ["picnic"],
  },
  {
    slug: "journaling-era",
    hobbies: [
      "junk-journaling",
      "scrapbooking",
      "calligraphy",
      "film-photography",
      "creative-writing",
      "collage-art",
      "reading",
      "book-clubs",
      "birdwatching",
      "outdoor-sketching",
      "museum-exploring",
    ],
    name: "The Journaling Era",
    dek: "Pages, tape and a pen that makes you want to write",
    image: "junkJournal",
    tone: "sunday",
    intro:
      "A journal that can take glue, tape you'll love and the scraps already in your bag. Start with one notebook.",
    kitIds: ["junk-journaling"],
  },
  {
    slug: "cozy-after-hours",
    hobbies: [
      "reading",
      "jigsaw-puzzles",
      "board-games",
      "book-clubs",
      "craft-nights",
      "indoor-gardening",
    ],
    name: "Cozy After Hours",
    dek: "Low-effort comforts for the evening you actually have",
    image: "cozyCorner",
    tone: "cream",
    intro:
      "Small things that turn a weeknight at home into a plan: better light, a game on the table, something quiet to make.",
    kitIds: [],
  },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

/** Kits shown on a collection page: only the ones listed for it, never another collection's. */
export const collectionKitIds = (slug: string): string[] => getCollection(slug)?.kitIds ?? [];

/** The collection a kit belongs to: the first one that lists it. Used for "More in ..." links. */
export const kitHomeCollection = (kitId: string): Collection | undefined =>
  collections.find((c) => c.kitIds?.includes(kitId));
