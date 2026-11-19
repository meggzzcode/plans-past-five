import { hobbies, getHobby } from "@/data/hobbies";
import type { CollectionSlug } from "@/data/products";

/**
 * Hobby Starter Budget Calculator: pure logic + editable assumptions.
 *
 * EVERY NUMBER IN THIS FILE IS AN APPROXIMATE ASSUMPTION, not a live price.
 * Ranges are whole US dollars for a typical beginner-friendly option, no brands.
 * A buyer can change any figure below (or the multipliers) in this one file.
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
    e("album", "Scrapbook album", ess, "materials", 8, 20, "creative-girl"),
    e("prints", "Printed photos", ess, "materials", 5, 15),
    e("adhesive", "Adhesive", ess, "tools", 3, 8),
    e("scissors", "Scissors", ess, "tools", 0, 8),
    e("paper", "Patterned paper", opt, "extras", 5, 12, "creative-girl"),
    e("stickers", "Stickers", opt, "extras", 3, 8, "creative-girl"),
    e("punch", "Corner punch", opt, "extras", 4, 10),
  ],
  "watercolor-painting": [
    e("paints", "Beginner watercolor set", ess, "materials", 8, 20, "creative-girl"),
    e("paper", "Watercolor paper or pad", ess, "materials", 6, 15, "creative-girl"),
    e("brushes", "A couple of round brushes", ess, "tools", 4, 12),
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
    e("glue", "Glue stick", ess, "tools", 1, 4),
    e("scissors", "Scissors", ess, "tools", 0, 8),
    e("card", "Card or paper", ess, "materials", 0, 6),
    e("washi", "Washi tape", opt, "extras", 3, 10, "creative-girl"),
    e("frame", "Frame", opt, "extras", 3, 12),
  ],
  calligraphy: [
    e("pens", "Brush pens", ess, "tools", 6, 16, "creative-girl"),
    e("pad", "Practice pad or smooth paper", ess, "materials", 3, 9),
    e("sheets", "Printable practice sheets", opt, "learning", 0, 5),
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
    e("book", "A library card or one book", ess, "materials", 0, 15, "bookish-girl"),
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
    e("pencil", "A pencil and a printed crossword", ess, "materials", 0, 3),
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
    e("notebook", "A notebook and pen", ess, "materials", 2, 12, "bookish-girl"),
    e("prompts", "Writing prompt deck", opt, "extras", 8, 18),
    e("coffee", "A café window seat", opt, "extras", 4, 8),
  ],
  tennis: [
    e("racket", "A beginner racket", ess, "gear", 20, 50, "sporty-girl"),
    e("balls", "A can of balls", ess, "gear", 3, 7, "sporty-girl"),
    e("shoes", "Sneakers", ess, "gear", 0, 40),
    e("water", "Water bottle", ess, "gear", 0, 15, "sporty-girl"),
    e("tote", "Sports tote", opt, "extras", 8, 20, "sporty-girl"),
    e("lesson", "Beginner group lesson", opt, "learning", 15, 40),
  ],
  pickleball: [
    e("paddles", "A paddle set (often comes with balls)", ess, "gear", 25, 55, "sporty-girl"),
    e("shoes", "Sneakers", ess, "gear", 0, 40),
    e("water", "Water bottle", opt, "extras", 0, 15, "sporty-girl"),
    e("tote", "Tote bag", opt, "extras", 8, 20, "sporty-girl"),
  ],
  hiking: [
    e("shoes", "Comfortable shoes", ess, "gear", 0, 60),
    e("water", "Water", ess, "gear", 0, 15, "little-adventures"),
    e("snack", "A snack", ess, "materials", 1, 5),
    e("map", "A trail map or app", ess, "learning", 0, 10),
    e("pack", "Daypack", opt, "extras", 15, 45, "little-adventures"),
    e("binos", "Binoculars", opt, "extras", 20, 50, "little-adventures"),
  ],
  "roller-skating": [
    e("rental", "Rental skates at a rink", ess, "learning", 5, 20),
    e("pads", "Wrist guards and knee pads", opt, "gear", 12, 30, "sporty-girl"),
    e("skates", "Your own skates", opt, "gear", 40, 100, "sporty-girl"),
  ],
  birdwatching: [
    e("app", "A free bird ID app", ess, "learning", 0, 0),
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
    e("book", "A book", ess, "materials", 0, 15, "bookish-girl"),
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

export type Level = "brand-new" | "dabbled" | "returning";
export type BudgetPref = "lean" | "balanced" | "treat";

export const levelOptions: { v: Level; label: string; hint: string }[] = [
  { v: "brand-new", label: "Brand new", hint: "Never tried it" },
  { v: "dabbled", label: "Dabbled", hint: "A few attempts" },
  { v: "returning", label: "Returning", hint: "Used to do it, starting again" },
];

export const budgetOptions: { v: BudgetPref; label: string; hint: string }[] = [
  { v: "lean", label: "Keep it lean", hint: "Cheapest sensible versions" },
  { v: "balanced", label: "Balanced", hint: "A fair middle" },
  { v: "treat", label: "Treat myself", hint: "Nicer versions" },
];

/**
 * Multipliers applied to each item's low/high assumption. Edit here.
 * Level: people who have dabbled tend to buy a step up; returners often own a bit already.
 * Budget: lean aims at the low end, treat at the high end.
 */
export const assumptions = {
  level: {
    "brand-new": { low: 1, high: 1 },
    dabbled: { low: 1, high: 1.15 },
    returning: { low: 0.8, high: 1.1 },
  } satisfies Record<Level, { low: number; high: number }>,
  budget: {
    lean: { low: 0.8, high: 0.7 },
    balanced: { low: 1, high: 1 },
    treat: { low: 1.3, high: 1.4 },
  } satisfies Record<BudgetPref, { low: number; high: number }>,
  /** Estimates are rounded to the nearest dollar, then to this step in the headline range. */
  roundTo: 5,
  disclaimer:
    "Costs are approximate planning assumptions for a typical beginner option, not live prices. Real prices change by place and season, so check before you buy. Secondhand, borrowed and library options can cost far less.",
};

export type BudgetInput = {
  hobby: string;
  level: Level;
  budget: BudgetPref;
  /** Optional item ids the person wants to include. Essentials are always included. */
  optionalIds: string[];
  /** Item ids (essential or optional) they already own. */
  ownedIds: string[];
};

export type PricedItem = EquipmentItem & { estLow: number; estHigh: number };

export type BudgetResult = {
  hobbySlug: string;
  hobbyName: string;
  low: number;
  high: number;
  /** Rounded for headline display. */
  displayLow: number;
  displayHigh: number;
  free: boolean;
  items: PricedItem[]; // counted in the total
  owned: PricedItem[]; // skipped because they already own it
  skippedOptional: PricedItem[]; // optional, not selected
  checklist: { category: EquipmentCategory; label: string; items: PricedItem[] }[];
  collections: CollectionSlug[];
};

export const hasBudgetFor = (slug: string) => !!equipmentByHobby[slug];

export function itemsFor(slug: string): EquipmentItem[] {
  return equipmentByHobby[slug] ?? [];
}

const priceItem = (it: EquipmentItem, level: Level, pref: BudgetPref): PricedItem => {
  const l = assumptions.level[level];
  const b = assumptions.budget[pref];
  const estLow = Math.round(it.low * l.low * b.low);
  const estHigh = Math.max(estLow, Math.round(it.high * l.high * b.high));
  return { ...it, estLow, estHigh };
};

const roundStep = (n: number, dir: "down" | "up") =>
  dir === "down"
    ? Math.floor(n / assumptions.roundTo) * assumptions.roundTo
    : Math.ceil(n / assumptions.roundTo) * assumptions.roundTo;

/** Returns null for an unknown hobby slug. */
export function calculateBudget(input: BudgetInput): BudgetResult | null {
  const hobby = getHobby(input.hobby);
  const list = itemsFor(input.hobby);
  if (!hobby || list.length === 0) return null;
  const owned = new Set(input.ownedIds);
  const wanted = new Set(input.optionalIds);
  const items: PricedItem[] = [];
  const ownedItems: PricedItem[] = [];
  const skippedOptional: PricedItem[] = [];
  for (const it of list) {
    const priced = priceItem(it, input.level, input.budget);
    if (owned.has(it.id)) ownedItems.push(priced);
    else if (it.kind === "optional" && !wanted.has(it.id)) skippedOptional.push(priced);
    else items.push(priced);
  }
  const low = items.reduce((s, i) => s + i.estLow, 0);
  const high = items.reduce((s, i) => s + i.estHigh, 0);
  const free = high === 0;
  const checklist = categoryOrder
    .map((category) => ({
      category,
      label: categoryLabels[category],
      items: items.filter((i) => i.category === category),
    }))
    .filter((g) => g.items.length > 0);
  const collections = [
    ...new Set(items.map((i) => i.collection).filter((c): c is CollectionSlug => !!c)),
  ];
  return {
    hobbySlug: hobby.slug,
    hobbyName: hobby.name,
    low,
    high,
    displayLow: free ? 0 : roundStep(low, "down"),
    displayHigh: free ? 0 : roundStep(high, "up"),
    free,
    items,
    owned: ownedItems,
    skippedOptional,
    checklist,
    collections,
  };
}

export const formatRange = (low: number, high: number) =>
  high === 0 ? "Free" : low === high ? `about $${low}` : `about $${low}–$${high}`;

export const budgetHobbies = () =>
  hobbies.filter((h) => hasBudgetFor(h.slug)).map((h) => ({ slug: h.slug, name: h.name }));
