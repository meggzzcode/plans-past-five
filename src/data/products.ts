import type { ImageKey } from "./images";

/**
 * The shop collections. Products live in content/products (src/data/catalog.ts); only verified,
 * Amazon-monetisable products are ever shown. There are no generic "search Amazon" substitutes.
 */

export type CollectionSlug =
  "paper" | "creative" | "cozy" | "hosting" | "sporty" | "little-adventures";

export type Collection = {
  slug: CollectionSlug;
  /** The aspirational name ("The Paper Edit"). Always shown with `label` beside it. */
  name: string;
  /** What is actually inside, in plain words ("Journaling, scrapbooking and stationery"). */
  label: string;
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

/**
 * Six collections (Stage 3b), replacing the earlier eight. A collection is SHOWN (shop index,
 * search, sitemap, links) only while it has at least one shown product or a complete kit; see
 * src/data/collection-status.ts. Nobody toggles that: add a verified product tagged with the
 * collection slug and it appears by itself. Old slugs 301 to these (src/config/redirects.ts).
 */
export const collections: Collection[] = [
  {
    slug: "paper",
    hobbies: ["junk-journaling", "scrapbooking", "collage-art", "calligraphy", "creative-writing"],
    name: "The Paper Edit",
    label: "Journaling, scrapbooking and stationery",
    dek: "Pages, tape and a pen that makes you want to write",
    image: "junkJournal",
    tone: "sunday",
    intro:
      "A journal that can take glue, tape you'll love and the scraps already in your bag. Start with one notebook.",
    kitIds: ["junk-journaling"],
  },
  {
    slug: "creative",
    hobbies: [
      "watercolor-painting",
      "air-dry-clay",
      "pottery-painting",
      "embroidery",
      "crochet",
      "knitting",
      "paint-by-numbers",
      "flower-arranging",
      "outdoor-sketching",
      "jewelry-making",
    ],
    name: "The Creative Edit",
    label: "Painting, clay, embroidery and crochet",
    dek: "Paint, clay and thread for quiet evenings",
    image: "shopCreative",
    tone: "strawberry",
    intro:
      "Watercolor, a lump of clay, a hoop and thread: starter supplies small enough to put away after. No kiln, no wheel, lovably lumpy is the point.",
    kitIds: ["watercolor", "air-dry-clay"],
  },
  {
    slug: "cozy",
    hobbies: [
      "reading",
      "jigsaw-puzzles",
      "crossword-puzzles",
      "indoor-gardening",
      "baking",
      "vinyl-collecting",
    ],
    name: "The Cozy Edit",
    label: "Reading, puzzles and slow evenings",
    dek: "Low-effort comforts for the evening you actually have",
    image: "cozyCorner",
    tone: "cream",
    intro:
      "Small things that turn a weeknight at home into a plan: better light, a puzzle on the table, a book you can't put down.",
    kitIds: ["reading-book-club"],
  },
  {
    slug: "hosting",
    hobbies: ["mahjong", "craft-nights", "book-clubs", "board-games", "friendship-bracelets"],
    name: "The Hosting Edit",
    label: "Mahjong, craft and paint nights, gatherings",
    dek: "Host a night everyone talks about after",
    image: "shopGirlsNight",
    tone: "strawberry",
    intro:
      "Turn 'we should hang out' into a date in the group chat: a mahjong night or a paint night at home, with what to grab to make it easy.",
    kitIds: ["mahjong-night", "pottery-paint-night"],
  },
  {
    slug: "sporty",
    hobbies: [
      "tennis",
      "pickleball",
      "yoga-for-beginners",
      "dance-classes",
      "roller-skating",
      "running",
      "climbing",
    ],
    name: "The Sporty Edit",
    label: "Tennis, pickleball and easy movement",
    dek: "For golden-hour rallies and a standing Saturday game",
    image: "shopSporty",
    tone: "matcha",
    intro:
      "Gear for your first rally or game. You don't need the pro version, and you can often borrow or rent first.",
    kitIds: ["racquet-sports"],
  },
  {
    slug: "little-adventures",
    hobbies: [
      "picnicking",
      "hiking",
      "thrifting",
      "museum-exploring",
      "birdwatching",
      "nature-photography",
      "film-photography",
      "cooking-classes",
    ],
    name: "The Little Adventures Edit",
    label: "Picnics and afternoons out",
    dek: "Pack for a picnic, a market or a wander",
    image: "shopAdventures",
    tone: "butter",
    intro: "Small, portable things that make it easier to say yes to a spontaneous afternoon out.",
    kitIds: ["picnic"],
  },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

/** Kits shown on a collection page: only the ones listed for it, never another collection's. */
export const collectionKitIds = (slug: string): string[] => getCollection(slug)?.kitIds ?? [];

/** The collection a kit belongs to: the first one that lists it. Used for "More in ..." links. */
export const kitHomeCollection = (kitId: string): Collection | undefined =>
  collections.find((c) => c.kitIds?.includes(kitId));
