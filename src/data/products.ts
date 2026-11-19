import type { ImageKey } from "./images";

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
  /**
   * Existing product types (by id) from OTHER collections that also belong here. Each product keeps
   * exactly one home collection (`Product.collection`); this only cross-references, it never
   * creates or duplicates a product.
   */
  extraProductIds?: string[];
};

/**
 * A product TYPE recommendation, not a specific listing.
 * - amazonQuery drives an ordinary Amazon search link (see src/config/affiliate.ts).
 * - Set exactUrl only after verifying an exact listing; the button label changes to "View on Amazon".
 * No prices, ratings, brands or ASINs are stored on purpose.
 */
export type Product = {
  id: string;
  name: string;
  collection: CollectionSlug;
  blurb: string;
  lookFor: string;
  noSpend?: string | undefined;
  amazonQuery: string;
  exactUrl?: string;
  hobbySlugs: string[];
  /**
   * OPTIONAL verified-research fields. Leave all unset unless verified from a source.
   * If brand, manufacturer, specs, retailerUrl or exactUrl are set, `sourceUrl` and
   * `lastVerified` are required (enforced by validateProduct and tests).
   */
  brand?: string;
  manufacturer?: string;
  /** Official page (manufacturer or retailer listing) the facts were checked against. */
  sourceUrl?: string;
  /** Ordinary retailer listing URL (any retailer). Verified only. */
  retailerUrl?: string;
  /** Photo rights; photo-less cards remain the default. */
  imageRights?: ImageRights;
  /** ISO date YYYY-MM-DD the facts above were last checked. */
  lastVerified?: string;
  audience?: string;
  advantages?: string[];
  limitations?: string[];
  specs?: ProductSpec[];
};

export type ImageRights = "none" | "owned" | "licensed" | "retailer-permission";
export type ProductSpec = { label: string; value: string };

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const isHttps = (u: string) => {
  try {
    return new URL(u).protocol === "https:";
  } catch {
    return false;
  }
};

/** Returns a list of problems; empty means the record is valid. */
export function validateProduct(p: Product): string[] {
  const out: string[] = [];
  const claims: string[] = [];
  if (p.brand) claims.push("brand");
  if (p.manufacturer) claims.push("manufacturer");
  if (p.specs && p.specs.length > 0) claims.push("specs");
  if (p.retailerUrl) claims.push("retailerUrl");
  if (p.exactUrl) claims.push("exactUrl");
  if (claims.length > 0) {
    if (!p.sourceUrl) out.push(`${p.id}: ${claims.join(", ")} set without sourceUrl`);
    if (!p.lastVerified) out.push(`${p.id}: ${claims.join(", ")} set without lastVerified`);
  }
  if (p.sourceUrl && !isHttps(p.sourceUrl)) out.push(`${p.id}: sourceUrl must be https`);
  if (p.retailerUrl && !isHttps(p.retailerUrl)) out.push(`${p.id}: retailerUrl must be https`);
  if (p.exactUrl && !isHttps(p.exactUrl)) out.push(`${p.id}: exactUrl must be https`);
  if (p.lastVerified && !ISO_DATE.test(p.lastVerified))
    out.push(`${p.id}: lastVerified must be YYYY-MM-DD`);
  return out;
}

/** True when the record carries verified research that may be displayed. */
export const hasVerifiedResearch = (p: Product) =>
  validateProduct(p).length === 0 && Boolean(p.sourceUrl && p.lastVerified);

export const collections: Collection[] = [
  {
    slug: "pottery-era",
    name: "The Pottery Era",
    dek: "Clay, paint and very lovable lumpy bowls",
    image: "shopPottery",
    tone: "butter",
    intro:
      "Pottery-class energy at your kitchen table. No kiln, no wheel, just clay, paint and a few hours of lovably lumpy.",
  },
  {
    slug: "creative-girl",
    name: "The Creative Girl",
    dek: "Paper, paint and thread for quiet evenings",
    image: "shopCreative",
    tone: "strawberry",
    intro:
      "Watercolor, a journal, a hoop and thread: starter supplies small enough to put away after.",
  },
  {
    slug: "sporty-girl",
    name: "The Sporty Girl",
    dek: "For golden-hour rallies and Saturday trails",
    image: "shopSporty",
    tone: "matcha",
    intro:
      "Gear for your first rally, game or trail. You don't need the pro version, and you can often borrow or rent first.",
  },
  {
    slug: "girls-night-in",
    name: "Girls' Night In",
    dek: "Host a night everyone talks about after",
    image: "shopGirlsNight",
    tone: "strawberry",
    intro:
      "Turn 'we should hang out' into a date in the group chat: a mahjong night or a paint-and-sip table, with exactly what to buy.",
  },
  {
    slug: "bookish-girl",
    name: "The Bookish Girl",
    dek: "For one-more-chapter people",
    image: "shopBookish",
    tone: "sunday",
    intro:
      "Little upgrades that make reading feel like an event: in bed, on the train or at your favorite café.",
  },
  {
    slug: "little-adventures",
    name: "Little Adventures",
    dek: "Pack for a picnic, a market or a wander",
    image: "shopAdventures",
    tone: "butter",
    intro: "Small, portable things that make it easier to say yes to a spontaneous afternoon out.",
  },
  {
    slug: "journaling-era",
    name: "The Journaling Era",
    dek: "Pages, tape and a pen that makes you want to write",
    image: "shopCreative",
    tone: "sunday",
    intro:
      "A journal that can take glue, tape you'll love and the scraps already in your bag. Start with one notebook.",
    extraProductIds: [
      "junk-journals",
      "washi-tape",
      "sticker-sets",
      "reading-journals",
      "pocket-notebooks",
    ],
  },
  {
    slug: "cozy-after-hours",
    name: "Cozy After Hours",
    dek: "Low-effort comforts for the evening you actually have",
    image: "shopBookish",
    tone: "cream",
    intro:
      "Small things that turn a weeknight at home into a plan: better light, a game on the table, something quiet to make.",
    extraProductIds: [
      "book-lights",
      "reading-stands",
      "book-nook-kits",
      "board-games",
      "conversation-cards",
    ],
  },
];

const p = (
  id: string,
  collection: CollectionSlug,
  name: string,
  blurb: string,
  lookFor: string,
  amazonQuery: string,
  hobbySlugs: string[],
  noSpend?: string,
): Product => ({ id, collection, name, blurb, lookFor, amazonQuery, hobbySlugs, noSpend });

export const products: Product[] = [
  // The Pottery Era
  p(
    "air-dry-clay",
    "pottery-era",
    "Air-dry clay",
    "The no-kiln way into pottery. Shape trinket dishes and ring holders, let them dry, then paint them (check your clay's label for drying time).",
    "A white or terracotta block of at least 2 lb so you can make mistakes freely.",
    "air dry clay white",
    ["air-dry-clay", "craft-nights"],
  ),
  p(
    "clay-tools",
    "pottery-era",
    "Clay sculpting tools",
    "Loop, ribbon and wooden tools help you carve, smooth and add details your fingers can't.",
    "A small mixed set with wooden handles; you'll use three tools constantly.",
    "clay sculpting tools set beginner",
    ["air-dry-clay"],
    "A butter knife, toothpick and old credit card do most of the same jobs.",
  ),
  p(
    "acrylic-paints",
    "pottery-era",
    "Acrylic paint set",
    "For painting dried clay, canvases and thrifted frames. A small set covers most projects.",
    "Tubes in a dozen colors including a true white; matte or satin both work.",
    "acrylic paint set 12 colors",
    ["air-dry-clay", "craft-nights", "paint-by-numbers"],
  ),
  p(
    "detail-brushes",
    "pottery-era",
    "Detail paintbrushes",
    "Fine-tipped brushes for cherries, tiny stripes, polka dots and initials.",
    "A pack with a few very fine rounds and one flat brush.",
    "fine detail paint brush set",
    ["air-dry-clay", "pottery-painting", "paint-by-numbers"],
  ),
  p(
    "ceramic-painting-kits",
    "pottery-era",
    "Ceramic painting kit",
    "Blank mugs or plates with paints, so you can recreate a pottery-painting studio at home.",
    "Kits that say food-safe once baked, and include clear curing instructions.",
    "paint your own ceramic mug kit",
    ["pottery-painting", "craft-nights"],
  ),
  p(
    "clay-mats",
    "pottery-era",
    "Clay craft work mat",
    "Protects your table, stops clay sticking, and makes clean-up a two-minute job.",
    "A large silicone or canvas mat that wipes clean.",
    "silicone craft mat large",
    ["air-dry-clay"],
    "A cut-open paper bag or old canvas tote taped to the table.",
  ),
  // The Creative Girl
  p(
    "watercolor-sets",
    "creative-girl",
    "Watercolor starter set",
    "A pan set with a dozen or two colors is all you need to start painting loose florals.",
    "Student-grade pans in a compact case, ideally with a mixing lid.",
    "watercolor paint set beginner pans",
    ["watercolor-painting", "outdoor-sketching"],
  ),
  p(
    "watercolor-sketchbooks",
    "creative-girl",
    "Watercolor sketchbook",
    "Thick paper that won't buckle when wet, bound so your practice pages stay together.",
    "Paper marked 300 gsm (140 lb) or cold-press; A5 is a friendly size.",
    "watercolor sketchbook 300gsm",
    ["watercolor-painting", "outdoor-sketching"],
  ),
  p(
    "junk-journals",
    "creative-girl",
    "Junk journal or blank notebook",
    "A sturdy notebook to glue, tape and layer things into. Thick pages handle the glue.",
    "Kraft or mixed-paper pages and a lay-flat binding.",
    "junk journal blank notebook kraft",
    ["junk-journaling", "scrapbooking"],
    "An old hardback book from a thrift store makes a charming base.",
  ),
  p(
    "washi-tape",
    "creative-girl",
    "Washi tape collection",
    "Decorative paper tape that sticks, peels and repositions. The easiest way to make a page look intentional.",
    "A mixed set with a few solid colors alongside the patterns.",
    "washi tape set",
    ["junk-journaling", "scrapbooking", "collage-art"],
  ),
  p(
    "sticker-sets",
    "creative-girl",
    "Decorative sticker sets",
    "Florals, labels and little icons for journals, planners and letters to friends.",
    "Matte stickers in a style you'd actually use more than once.",
    "vintage journal sticker set",
    ["junk-journaling", "scrapbooking"],
  ),
  p(
    "embroidery-kits",
    "creative-girl",
    "Embroidery starter kit",
    "A hoop, pre-printed fabric, floss and needles, with instructions for the basic stitches.",
    "A small floral design with a stitch guide; 6-inch hoops are easiest.",
    "embroidery kit beginner floral",
    ["embroidery"],
  ),
  // The Sporty Girl
  p(
    "tennis-rackets",
    "sporty-girl",
    "Beginner tennis racket",
    "A lighter, larger-head racket forgives off-center hits while you learn.",
    "Labeled 'beginner' or 'recreational', pre-strung, with a larger head size.",
    "beginner tennis racket adult",
    ["tennis"],
  ),
  p(
    "tennis-balls",
    "sporty-girl",
    "Tennis balls",
    "Fresh balls bounce predictably, which makes learning easier.",
    "A multi-can pack of all-court balls.",
    "tennis balls all court",
    ["tennis"],
  ),
  p(
    "pickleball-sets",
    "sporty-girl",
    "Pickleball paddle set",
    "Two or four paddles plus balls, so you can bring a friend along.",
    "A set with balls and a carry bag.",
    "pickleball paddle set of 2",
    ["pickleball"],
  ),
  p(
    "water-bottles",
    "sporty-girl",
    "Insulated water bottle",
    "Keeps water cold through a match, a trail or an afternoon in the park.",
    "A leak-proof lid that fits your bag's side pocket.",
    "insulated water bottle 24 oz",
    ["tennis", "pickleball", "hiking", "picnicking"],
    "Any bottle you already own works fine.",
  ),
  p(
    "sports-totes",
    "sporty-girl",
    "Sports tote bag",
    "Fits your paddle or racket, a change of shoes and a book for after.",
    "A canvas tote with an outer pocket or a sleeve for your paddle or racket.",
    "tennis tote bag women canvas",
    ["tennis", "pickleball"],
  ),
  p(
    "daypacks",
    "sporty-girl",
    "Outdoor activity daypack",
    "A light backpack for water, snacks and a layer on hikes and long walks.",
    "Around 15–20 liters, padded straps and a bottle pocket.",
    "lightweight hiking daypack 20l",
    ["hiking"],
  ),
  // Girls' Night In
  p(
    "mahjong-sets",
    "girls-night-in",
    "Mahjong starter set",
    "The tiles, racks and scoring card for a standing weekly game night.",
    "A set that matches the style you'll play (e.g. American with jokers) and includes a rules card.",
    "american mahjong set",
    ["mahjong"],
  ),
  p(
    "friendship-bracelet-kits",
    "girls-night-in",
    "Friendship bracelet kit",
    "Letter beads, seed beads and stretchy cord for an instant group activity.",
    "A divided case with plenty of letter beads (vowels go fast).",
    "friendship bracelet bead kit letter beads",
    ["friendship-bracelets", "jewelry-making", "craft-nights"],
  ),
  p(
    "conversation-cards",
    "girls-night-in",
    "Conversation card game",
    "Question decks that skip the small talk and get everyone laughing.",
    "Decks designed for friends, not just couples.",
    "conversation cards for friends",
    ["craft-nights", "book-clubs"],
  ),
  p(
    "group-painting-kits",
    "girls-night-in",
    "Group painting kit",
    "Mini canvases, easels and paints for a sip-and-paint night at home.",
    "Kits with enough canvases for your whole group.",
    "paint party kit canvas adults",
    ["craft-nights", "paint-by-numbers"],
  ),
  p(
    "cookie-decorating-kits",
    "girls-night-in",
    "Cookie decorating kit",
    "Piping bags, tips and cutters for an edible craft night.",
    "Reusable piping bags and a few simple cutters.",
    "cookie decorating kit piping bags",
    ["baking", "craft-nights"],
  ),
  p(
    "board-games",
    "girls-night-in",
    "Board games & puzzles",
    "Cooperative games and puzzles for a low-key evening with friends.",
    "Games playable in under an hour, or a 500-piece puzzle.",
    "board games for adults party",
    ["jigsaw-puzzles", "craft-nights"],
  ),
  // The Bookish Girl
  p(
    "reading-journals",
    "bookish-girl",
    "Reading journal",
    "Log books, quotes and ratings, and finally remember what you read last spring.",
    "Prompted pages plus some blank space for doodles.",
    "reading journal book log",
    ["reading", "book-clubs"],
  ),
  p(
    "book-lights",
    "bookish-girl",
    "Rechargeable book light",
    "Read in bed without the overhead light, or the phone screen.",
    "USB-rechargeable with warm-light settings.",
    "rechargeable book light warm",
    ["reading"],
  ),
  p(
    "magnetic-bookmarks",
    "bookish-girl",
    "Magnetic bookmarks",
    "Clip over the page so they never fall out on the train.",
    "A small mixed set in a design you love.",
    "magnetic bookmarks set",
    ["reading"],
    "A train ticket or receipt works just as well.",
  ),
  p(
    "book-sleeves",
    "bookish-girl",
    "Book sleeve",
    "A padded fabric sleeve to protect paperbacks in your tote bag.",
    "Soft padding and a closure; floral prints are optional but encouraged.",
    "book sleeve padded floral",
    ["reading"],
  ),
  p(
    "book-nook-kits",
    "bookish-girl",
    "Miniature book nook kit",
    "A tiny diorama that slots between your books. A long, absorbing build.",
    "Kits marked with build time and difficulty; start with an easier one.",
    "book nook kit diy",
    ["reading"],
  ),
  p(
    "reading-stands",
    "bookish-girl",
    "Reading stand",
    "Holds books (or cookbooks) open, hands-free, at a comfortable angle.",
    "Adjustable angle and page clips.",
    "book stand for reading adjustable",
    ["reading"],
  ),
  // Little Adventures
  p(
    "picnic-blankets",
    "little-adventures",
    "Picnic blanket",
    "A waterproof-backed blanket that folds small and makes any park a plan.",
    "Water-resistant backing and a carry strap.",
    "picnic blanket waterproof gingham",
    ["picnicking"],
  ),
  p(
    "film-cameras",
    "little-adventures",
    "Reusable film camera",
    "A simple point-and-shoot 35mm camera that makes everyday walks feel like memories.",
    "Reusable 35mm point-and-shoots for beginners; film is sold separately.",
    "reusable 35mm film camera",
    ["film-photography", "nature-photography"],
  ),
  p(
    "pocket-notebooks",
    "little-adventures",
    "Pocket notebook",
    "For lists, sketches, bird logs and lines you want to remember.",
    "Small enough for a jacket pocket, with sturdy covers.",
    "pocket notebook pack",
    [
      "creative-writing",
      "birdwatching",
      "outdoor-sketching",
      "museum-exploring",
      "film-photography",
    ],
  ),
  p(
    "market-totes",
    "little-adventures",
    "Reusable market tote",
    "Strong enough for flowers, produce and the thrift find you didn't plan on.",
    "Canvas or string bags with long handles.",
    "canvas market tote bag",
    ["picnicking", "thrifting"],
  ),
  p(
    "portable-watercolor",
    "little-adventures",
    "Portable watercolor set",
    "A pocket-sized palette with a water brush for painting on the go.",
    "A small tin with a built-in mixing area and a water brush.",
    "pocket watercolor set travel water brush",
    ["watercolor-painting", "outdoor-sketching"],
  ),
  p(
    "binoculars",
    "little-adventures",
    "Compact binoculars",
    "Light enough for a daypack, ideal for birds, views and people-watching from a hill.",
    "Compact 8x magnification is a good starting point.",
    "compact binoculars 8x",
    ["birdwatching", "hiking"],
  ),
];

/** Product types in a collection: its own, plus cross-referenced ones (`extraProductIds`). */
export function collectionProducts(slug: string): Product[] {
  const c = collections.find((x) => x.slug === slug);
  const own = products.filter((x) => x.collection === slug);
  const extra = productsFor(c?.extraProductIds ?? []).filter((x) => x.collection !== slug);
  return [...own, ...extra];
}

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);
export const getProduct = (id: string) => products.find((x) => x.id === id);
export const productsFor = (ids: string[]) => ids.map(getProduct).filter((x): x is Product => !!x);
