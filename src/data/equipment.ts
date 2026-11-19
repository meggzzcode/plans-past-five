import type { CollectionSlug } from "@/data/products";

/**
 * Equipment and cost assumptions per hobby. This file is the SINGLE SOURCE OF TRUTH for
 * hobby start-up cost: the directory card bucket, the profile range (startupBudget) and the
 * Hobby Starter Budget tool all derive from the numbers below (see startupRange()).
 *
 * EVERY NUMBER IS AN APPROXIMATE ASSUMPTION, not a live price. Whole US dollars, typical
 * beginner option, no brands. It lives in src/data so hobbies.ts can import it without a cycle.
 */

export type EquipmentKind = "essential" | "optional";
export type EquipmentCategory = "materials" | "tools" | "gear" | "learning" | "extras";

export const categoryLabels: Record<EquipmentCategory, string> = {
  materials: "Materials",
  tools: "Tools",
  gear: "Gear & wearables",
  learning: "Learning & access",
  extras: "Nice extras",
};

export const categoryOrder: EquipmentCategory[] = [
  "materials",
  "tools",
  "gear",
  "learning",
  "extras",
];

export type EquipmentItem = {
  id: string;
  label: string;
  kind: EquipmentKind;
  category: EquipmentCategory;
  /** Approximate low and high cost in whole dollars for a beginner option. 0/0 = usually free. */
  low: number;
  high: number;
  /** Existing /shop collection slug to browse, if one fits. Never a specific product. */
  collection?: CollectionSlug;
};

const e = (
  id: string,
  label: string,
  kind: EquipmentKind,
  category: EquipmentCategory,
  low: number,
  high: number,
  collection?: CollectionSlug,
): EquipmentItem => ({
  id,
  label,
  kind,
  category,
  low,
  high,
  ...(collection ? { collection } : {}),
});

const ess = "essential" as const;
const opt = "optional" as const;

/** Approximate equipment costs keyed by hobby slug. Edit freely. */
export const equipmentByHobby: Record<string, EquipmentItem[]> = {
  "junk-journaling": [
    e("notebook", "A notebook or old book", ess, "materials", 0, 8, "creative-girl"),
    e("glue", "Glue stick", ess, "tools", 1, 4),
    e("scissors", "Scissors", ess, "tools", 0, 8),
    e("scraps", "Paper scraps you already have", ess, "materials", 0, 0),
    e("washi", "Washi tape", opt, "extras", 3, 10, "creative-girl"),
    e("stickers", "Stickers", opt, "extras", 3, 8, "creative-girl"),
    e("pens", "Fineliner pens", opt, "extras", 3, 10),
  ],
  scrapbooking: [
    e("album", "Scrapbook album", ess, "materials", 6, 15, "creative-girl"),
    e("prints", "Printed photos", ess, "materials", 3, 10),
    e("adhesive", "Adhesive", ess, "tools", 3, 8),
    e("scissors", "Scissors", ess, "tools", 0, 8),
    e("paper", "Patterned paper", opt, "extras", 5, 12, "creative-girl"),
    e("stickers", "Stickers", opt, "extras", 3, 8, "creative-girl"),
    e("punch", "Corner punch", opt, "extras", 4, 10),
  ],
  "watercolor-painting": [
    e("paints", "Student watercolor set", ess, "materials", 6, 15, "creative-girl"),
    e("paper", "Watercolor paper or pad", ess, "materials", 5, 10, "creative-girl"),
    e("brushes", "A couple of round brushes", ess, "tools", 3, 8),
    e("tape", "Masking tape", opt, "extras", 2, 6),
    e("travel", "Travel palette", opt, "extras", 8, 18, "creative-girl"),
    e("gel", "White gel pen", opt, "extras", 2, 6),
  ],
  embroidery: [
    e(
      "kit",
      "Beginner embroidery kit (hoop, fabric, floss, needle)",
      ess,
      "materials",
      8,
      20,
      "creative-girl",
    ),
    e("pen", "Water-soluble pen", opt, "extras", 3, 8),
    e("snips", "Small sharp scissors", opt, "tools", 3, 9),
  ],
  crochet: [
    e("hook", "A 5mm hook", ess, "tools", 2, 6),
    e("yarn", "One skein of medium-weight yarn", ess, "materials", 3, 9),
    e("scissors", "Scissors", ess, "tools", 0, 8),
    e("markers", "Stitch markers", opt, "extras", 2, 6),
    e("kit", "Beginner kit with video lessons", opt, "learning", 10, 25),
  ],
  knitting: [
    e("needles", "Medium needles (US 8)", ess, "tools", 4, 12),
    e("yarn", "Chunky or medium yarn", ess, "materials", 4, 12),
    e("counter", "Row counter", opt, "extras", 2, 6),
    e("darning", "Darning needle", opt, "tools", 2, 5),
  ],
  "jewelry-making": [
    e("kit", "Beading kit with wire, clasps and beads", ess, "materials", 12, 30, "creative-girl"),
    e("pliers", "Flat-nose pliers", ess, "tools", 5, 14),
    e("tray", "Bead tray", opt, "extras", 3, 8),
    e("charms", "Charms", opt, "extras", 4, 12),
  ],
  "friendship-bracelets": [
    e("kit", "Bead kit with elastic cord", ess, "materials", 8, 18, "girls-night-in"),
    e("floss", "Embroidery floss for knotted styles", opt, "materials", 4, 10),
    e("mat", "Bead mat", opt, "extras", 3, 8),
  ],
  "air-dry-clay": [
    e("clay", "Air-dry clay", ess, "materials", 6, 15, "pottery-era"),
    e("pin", "A rolling pin or glass", ess, "tools", 0, 6),
    e("paint", "Acrylic paint", ess, "materials", 6, 16, "pottery-era"),
    e("tools", "Sculpting tools", opt, "extras", 4, 12, "pottery-era"),
    e("mat", "Clay work mat", opt, "extras", 5, 12, "pottery-era"),
    e("varnish", "Gloss varnish", opt, "extras", 5, 12),
  ],
  "pottery-painting": [
    e("visit", "A studio visit or a ceramic painting kit", ess, "learning", 15, 40, "pottery-era"),
    e("brushes", "Detail brushes", opt, "extras", 4, 10, "pottery-era"),
  ],
  "paint-by-numbers": [
    e("kit", "Paint-by-number kit", ess, "materials", 10, 25, "girls-night-in"),
    e("brush", "Small detail brush", opt, "extras", 3, 8),
    e("lamp", "Desk lamp", opt, "extras", 8, 20),
  ],
  "flower-arranging": [
    e("flowers", "A bunch of flowers", ess, "materials", 6, 18),
    e("scissors", "Scissors", ess, "tools", 0, 8),
    e("vase", "Any vase or jar", ess, "gear", 0, 8),
    e("frog", "Floral frog", opt, "extras", 5, 12),
    e("snips", "Flower snips", opt, "tools", 6, 15),
  ],
  "collage-art": [
    e("magazines", "Old magazines", ess, "materials", 0, 0),
    e("glue", "Glue stick or any paste you own", ess, "tools", 0, 0),
    e("scissors", "Scissors you own", ess, "tools", 0, 0),
    e("card", "Card or scrap paper", ess, "materials", 0, 0),
    e("newglue", "A fresh glue stick", opt, "tools", 1, 4),
    e("washi", "Washi tape", opt, "extras", 3, 10, "creative-girl"),
    e("frame", "Frame", opt, "extras", 3, 12),
  ],
  calligraphy: [
    e("pens", "Brush pens", ess, "tools", 6, 16, "creative-girl"),
    e("pad", "Practice pad or smooth paper", ess, "materials", 3, 9),
    e("sheets", "Practice sheets", opt, "learning", 0, 5),
    e("dip", "Dip pen and ink", opt, "extras", 10, 22),
  ],
  "film-photography": [
    e("camera", "Reusable film camera", ess, "gear", 20, 60, "little-adventures"),
    e("film", "A roll of 35mm film", ess, "materials", 8, 18),
    e("dev", "Developing and scanning", ess, "learning", 10, 25),
    e("strap", "Camera strap", opt, "extras", 5, 15),
    e("notebook", "Small notebook to log shots", opt, "extras", 2, 8, "little-adventures"),
  ],
  reading: [
    e("card", "A library card", ess, "materials", 0, 0),
    e("book", "Buying a book instead of borrowing", opt, "materials", 8, 15, "bookish-girl"),
    e("light", "Book light", opt, "extras", 6, 15, "bookish-girl"),
    e("journal", "Reading journal", opt, "extras", 6, 15, "bookish-girl"),
    e("sleeve", "Book sleeve", opt, "extras", 8, 20, "bookish-girl"),
  ],
  "jigsaw-puzzles": [
    e("puzzle", "A 500 or 1000-piece puzzle", ess, "materials", 8, 22, "girls-night-in"),
    e("mat", "Puzzle mat", opt, "extras", 8, 20),
    e("trays", "Sorting trays", opt, "extras", 5, 14),
  ],
  "crossword-puzzles": [
    e("pencil", "A pencil and a free printed or newspaper crossword", ess, "materials", 0, 0),
    e("book", "A crossword book", opt, "extras", 5, 12),
  ],
  baking: [
    e("ingredients", "Basic pantry ingredients", ess, "materials", 6, 16),
    e("sheet", "A baking sheet", ess, "tools", 0, 14),
    e("bowl", "A mixing bowl", ess, "tools", 0, 10),
    e("scale", "Kitchen scale", opt, "extras", 8, 18),
    e("deco", "Cookie decorating kit", opt, "extras", 8, 20, "girls-night-in"),
  ],
  "indoor-gardening": [
    e("plant", "One easy plant (pothos or basil)", ess, "materials", 4, 12),
    e("pot", "A pot with drainage", ess, "gear", 3, 12),
    e("jars", "Propagation jars", opt, "extras", 0, 8),
    e("can", "Watering can", opt, "tools", 4, 12),
  ],
  mahjong: [
    e("set", "A mahjong set (or a borrowed one)", ess, "gear", 0, 60, "girls-night-in"),
    e("card", "A rules card", ess, "learning", 0, 8),
    e("score", "Scoring card", opt, "extras", 3, 10),
    e("racks", "Tile racks", opt, "extras", 8, 20),
  ],
  "vinyl-collecting": [
    e("turntable", "A turntable (secondhand is fine)", ess, "gear", 40, 150),
    e("record", "One record", ess, "materials", 5, 25),
    e("crate", "Record storage crate", opt, "extras", 10, 30),
  ],
  "creative-writing": [
    e("notebook", "A notebook and pen you own, or a notes app", ess, "materials", 0, 0),
    e("newbook", "A nicer notebook", opt, "extras", 5, 12, "bookish-girl"),
    e("prompts", "Writing prompt deck", opt, "extras", 8, 18),
    e("coffee", "A café window seat", opt, "extras", 4, 8),
  ],
  "yoga-for-beginners": [
    e("mat", "A mat (or a towel on carpet)", ess, "gear", 0, 25),
    e("blocks", "Two blocks or a firm cushion", opt, "extras", 8, 20),
    e("class", "A drop-in beginner class", opt, "learning", 10, 25),
  ],
  "dance-classes": [
    e("class", "A drop-in beginner class", ess, "learning", 10, 25),
    e("shoes", "Dance-friendly shoes (you may own a pair)", opt, "gear", 0, 40),
    e("water", "Water bottle", opt, "extras", 0, 15),
  ],
  running: [
    e("shoes", "Trainers you can run in (you may already own a pair)", ess, "gear", 0, 50),
    e("clothes", "Clothes you can move in", opt, "gear", 0, 40),
    e("watch", "A watch or free timer app", opt, "extras", 0, 30),
  ],
  climbing: [
    e("pass", "A gym day pass", ess, "learning", 15, 30),
    e("rental", "Rental climbing shoes", ess, "gear", 3, 8),
    e("chalk", "Chalk", opt, "extras", 5, 12),
    e("ownshoes", "Your own climbing shoes", opt, "gear", 60, 120),
  ],
  "board-games": [
    e("game", "One easy game (borrowed, library or secondhand)", ess, "materials", 0, 25),
    e("snacks", "Snacks for the table", opt, "extras", 5, 15),
    e("cafe", "A café that lends games", opt, "extras", 0, 12),
  ],
  "cooking-classes": [
    e("class", "A single drop-in beginner class", ess, "learning", 20, 50),
    e("apron", "An apron, if one is not provided", opt, "gear", 0, 20),
    e("container", "A container for leftovers", opt, "extras", 0, 8),
  ],
  "language-learning": [
    e("app", "An app, library course or podcast", ess, "learning", 0, 0),
    e("notebook", "A notebook", ess, "materials", 0, 8),
    e("workbook", "A beginner workbook", opt, "extras", 8, 20),
    e("group", "A conversation group or language partner", opt, "learning", 0, 15),
  ],
  tennis: [
    e("racket", "A beginner racket (borrowed or secondhand)", ess, "gear", 15, 40, "sporty-girl"),
    e("balls", "A can of balls", ess, "gear", 3, 7, "sporty-girl"),
    e("shoes", "Court-ready sneakers (you may already own)", opt, "gear", 0, 40),
    e("water", "Water bottle", opt, "gear", 0, 15, "sporty-girl"),
    e("tote", "Sports tote", opt, "extras", 8, 20, "sporty-girl"),
    e("lesson", "Beginner group lesson", opt, "learning", 15, 40),
  ],
  pickleball: [
    e("paddles", "A paddle set (often comes with balls)", ess, "gear", 20, 45, "sporty-girl"),
    e("shoes", "Court-ready sneakers (you may already own)", opt, "gear", 0, 40),
    e("water", "Water bottle", opt, "extras", 0, 15, "sporty-girl"),
    e("tote", "Tote bag", opt, "extras", 8, 20, "sporty-girl"),
  ],
  hiking: [
    e("shoes", "Comfortable shoes you already own", ess, "gear", 0, 0),
    e("water", "Water (refill a bottle you own)", ess, "gear", 0, 5, "little-adventures"),
    e("snack", "A snack", ess, "materials", 1, 5),
    e("map", "A trail map or app", ess, "learning", 0, 0),
    e("newshoes", "Proper walking shoes", opt, "gear", 30, 60),
    e("pack", "Daypack", opt, "extras", 15, 45, "little-adventures"),
    e("binos", "Binoculars", opt, "extras", 20, 50, "little-adventures"),
  ],
  "roller-skating": [
    e("rental", "Rental skates at a rink", ess, "learning", 5, 20),
    e("pads", "Wrist guards and knee pads", opt, "gear", 12, 30, "sporty-girl"),
    e("skates", "Your own skates", opt, "gear", 40, 100, "sporty-girl"),
  ],
  birdwatching: [
    e("app", "A bird ID app or field guide", ess, "learning", 0, 0),
    e("park", "Your local park", ess, "learning", 0, 0),
    e("binos", "Compact binoculars", opt, "extras", 20, 50, "little-adventures"),
    e("notebook", "Pocket notebook", opt, "extras", 2, 8, "little-adventures"),
  ],
  "nature-photography": [
    e("phone", "Your phone camera", ess, "gear", 0, 0),
    e("film", "A film camera", opt, "extras", 20, 60, "little-adventures"),
    e("macro", "Clip-on macro lens", opt, "extras", 8, 20),
  ],
  "outdoor-sketching": [
    e("sketchbook", "A small sketchbook", ess, "materials", 4, 12, "little-adventures"),
    e("pen", "A pen", ess, "tools", 1, 5),
    e("watercolor", "Portable watercolor set", opt, "extras", 8, 20, "little-adventures"),
    e("brush", "Water brush", opt, "extras", 3, 8),
  ],
  "book-clubs": [
    e("book", "A library copy of the book", ess, "materials", 0, 0),
    e("buy", "Buying the book", opt, "materials", 8, 15, "bookish-girl"),
    e("group", "A group or a library listing", ess, "learning", 0, 0),
    e("cards", "Conversation cards", opt, "extras", 8, 18, "bookish-girl"),
    e("journal", "Reading journal", opt, "extras", 6, 15, "bookish-girl"),
  ],
  "craft-nights": [
    e("craft", "One group-friendly craft", ess, "materials", 10, 30, "girls-night-in"),
    e("snacks", "Snacks", ess, "materials", 5, 20),
    e("table", "A table", ess, "gear", 0, 0),
    e("paintkit", "Group painting kit", opt, "extras", 12, 30, "girls-night-in"),
    e("beads", "Bead kit", opt, "extras", 8, 18, "girls-night-in"),
  ],
  volunteering: [
    e("listing", "A local listing", ess, "learning", 0, 0),
    e("hours", "A few free hours", ess, "learning", 0, 0),
  ],
  thrifting: [
    e("tote", "A tote bag", ess, "gear", 0, 12, "little-adventures"),
    e("budget", "A small spending budget", ess, "materials", 10, 30),
    e("wishlist", "A wishlist on your phone", opt, "extras", 0, 0),
  ],
  "museum-exploring": [
    e("ticket", "A ticket or a free entry day", ess, "learning", 0, 25),
    e("sketchbook", "Pocket sketchbook", opt, "extras", 3, 10, "little-adventures"),
  ],
  picnicking: [
    e("blanket", "A blanket", ess, "gear", 0, 15, "little-adventures"),
    e("snacks", "Snacks", ess, "materials", 6, 20),
    e("park", "A park", ess, "learning", 0, 0),
    e(
      "backed",
      "Picnic blanket with waterproof backing",
      opt,
      "extras",
      12,
      30,
      "little-adventures",
    ),
    e("tote", "Market tote", opt, "extras", 6, 15, "little-adventures"),
  ],
};

// ---------------------------------------------------------------------------
// Derived, shared cost numbers. Everything that shows a hobby's start-up cost uses these.
// ---------------------------------------------------------------------------

/** Headline ranges are rounded outward to this step (also used by the budget tool). */
export const ROUND_TO = 5;

/** Cost buckets used on cards and filters. */
export type CostBucket = "free" | "under25" | "under50" | "flexible";

/**
 * Honest card labels for each bucket. "Under $N" means the typical beginner total, rounded up,
 * is at most N. These are estimates; the page and card always call them estimates or "to start".
 */
export const costBucketLabels: Record<CostBucket, string> = {
  free: "Free",
  under25: "Under $25 to start",
  under50: "Under $50 to start",
  flexible: "Varies, can start small",
};

/** Upper bound of each bucket in whole dollars. */
export const costBucketMax: Record<CostBucket, number> = {
  free: 0,
  under25: 25,
  under50: 50,
  flexible: Infinity,
};

export const bucketForHigh = (high: number): CostBucket =>
  high <= 0 ? "free" : high <= 25 ? "under25" : high <= 50 ? "under50" : "flexible";

const down = (n: number) => Math.floor(n / ROUND_TO) * ROUND_TO;
const up = (n: number) => Math.ceil(n / ROUND_TO) * ROUND_TO;

/**
 * The typical beginner range for a hobby: essential items only, brand new, balanced.
 * This is exactly what the budget tool shows by default (its multipliers are 1 for that
 * setting), and it is what the hobby profile shows as the rough start-up budget.
 * Returns null when a hobby has no equipment list.
 */
export function startupRange(slug: string): { low: number; high: number } | null {
  const items = equipmentByHobby[slug];
  if (!items) return null;
  const ess_ = items.filter((i) => i.kind === "essential");
  const low = ess_.reduce((s, i) => s + i.low, 0);
  const high = ess_.reduce((s, i) => s + i.high, 0);
  return high === 0 ? { low: 0, high: 0 } : { low: down(low), high: up(high) };
}
