/**
 * Starter kits as SLOTS, not products. A kit says "a beginner needs a journal, washi tape, an
 * adhesive...". A slot only appears publicly when a verified catalog product fills it
 * (`product.kitSlots: [{ kit, slot }]`). A kit with no filled slots renders nothing.
 *
 * Kits are editorially curated shopping lists. They are not bundles sold by Plans Past Five.
 */
import { MAX_ALTERNATIVES, choosePrimary, type CatalogProduct, type ProductRole } from "./catalog";

export type SlotNeed = "essential" | "optional" | "probably-own";

export type KitSlot = {
  id: string;
  label: string;
  need: SlotNeed;
  /** The kind of product this slot wants (a hint for researchers; fillers may differ in role). */
  wantedRole: ProductRole;
};

export type Kit = {
  id: string;
  name: string;
  /** Benefit-led title shown on the kit block. Falls back to `name`. */
  headline?: string;
  dek: string;
  /** Hobby slug from src/data/hobbies.ts, when one matches. */
  hobby?: string;
  /** Further hobby slugs the kit also serves (merged collection kits). */
  alsoHobbies?: string[];
  /**
   * One short, honest note for the whole kit (what to check, who it suits). Replaces per-product
   * disclaimers. Plain sentences, no prices, no editor-speak.
   */
  note?: string;
  slots: KitSlot[];
};

export const KIT_DISCLAIMER =
  "A list we put together, not a bundle we sell. Each item links to its own Amazon page.";

const s = (
  id: string,
  label: string,
  need: SlotNeed,
  wantedRole: ProductRole = "essential",
): KitSlot => ({
  id,
  label,
  need,
  wantedRole,
});
const E = "essential" as const;
const O = "optional" as const;
const P = "probably-own" as const;

export const kits: Kit[] = [
  {
    id: "junk-journaling",
    name: "Junk journaling starter kit",
    headline: "Everything for your first junk journal",
    dek: "A journal, something sticky and a pile of paper scraps.",
    hobby: "junk-journaling",
    note: "Two things make this list work: a journal with thick pages, and a glue you like. Everything else is a bonus, and scraps from your recycling bin work as well as bought paper.",
    slots: [
      s("journal", "A journal that can take glue", E),
      s("washi-tape", "Washi tape", O, "affordable"),
      s("adhesive", "Glue stick or tape runner", E),
      s("scissors", "Small scissors", P),
      s("paper", "Ephemera and patterned paper", O, "nice-to-have"),
      s("pens", "Fine-tip pens", O),
    ],
  },
  {
    id: "watercolor",
    name: "Watercolor starter kit",
    headline: "Paint something tonight",
    dek: "Paint, a brush or two and paper that won't buckle.",
    hobby: "watercolor-painting",
    note: "Pick one small set of paints and heavy paper. A boxed set may come with far more colors than you need: start with three, and use the brushes in the box until you want better ones.",
    slots: [
      s("paints", "One small pan or tube set (pick one)", E),
      s("brushes", "A better round brush, once the box brushes feel limiting", O),
      s("paper", "Watercolor paper or pad", E),
      s("palette", "Palette or mixing tray", O, "affordable"),
      s("masking-tape", "Masking tape", P),
      s("water-jar", "A jar for water", P),
    ],
  },
  {
    id: "air-dry-clay",
    name: "Air-dry clay starter kit",
    headline: "Shape it tonight, paint it tomorrow",
    dek: "No kiln, no wheel: clay, a few tools and paint.",
    hobby: "air-dry-clay",
    note: "Air-dry clay is for decor and trinket dishes. Painted pieces are not food-safe, so skip mugs and bowls you'd eat from.",
    slots: [
      s("clay", "Air-dry clay", E),
      s("tools", "Sculpting tools", O, "affordable"),
      s("paint", "Acrylic paint", E),
      s("brushes", "Detail brushes", O),
      s("sealer", "Sealer or varnish", O, "nice-to-have"),
      s("work-surface", "Mat or baking paper", P),
    ],
  },
  {
    id: "mahjong-night",
    name: "Mahjong night kit",
    headline: "Everything for your first game night",
    dek: "A set, the card, and a mat that quiets the tiles.",
    hobby: "mahjong",
    note: "These sets are for American mahjong (166 tiles with jokers). Playing another version? The tile count differs, so check before you buy. The league card changes every year, and the 2026 card is the current one.",
    slots: [
      s("set", "A mahjong set", E),
      s("mat", "Playing mat", O),
      s("card", "Scoring card or rules reference", E),
      s("snack-bowls", "Snack bowls", P),
    ],
  },
  {
    id: "picnic",
    name: "Picnic kit",
    headline: "Pack for a picnic",
    dek: "A blanket, a bag and an afternoon.",
    hobby: "picnicking",
    note: "A blanket with a waterproof backing keeps damp grass off.",
    slots: [
      s("blanket", "A picnic blanket", E),
      s("carrier", "Bag or basket", O),
      s("cooler", "Insulated bag", O),
      s("tableware", "Reusable plates and cups", P),
    ],
  },
  {
    id: "reading-book-club",
    name: "Reading and book club kit",
    headline: "A cozy reading night, or a book club that feels like a ritual",
    dek: "A notebook and pens for the books that stuck, plus little things for a book club or a cozy night in.",
    hobby: "reading",
    alsoHobbies: ["book-clubs"],
    note: "Choose a journal layout you would actually fill in: look at the sections before you buy. The cozy night-in items (throw, candle, tea, puzzle, mug) are optional and you may already own them.",
    slots: [
      s("journal", "A reading journal or notebook", E),
      s("pens", "A pen you like", E),
      s("bookmark", "Bookmark or page flags", O),
      s("highlighters", "Highlighters or tabs", O),
      s("reading-light", "Book light", O, "nice-to-have"),
      s("discussion-guide", "Discussion prompts for a book club", O),
      s("club-notebook", "Notebook for club notes", O),
      s("snack-bowls", "Snack bowls or a board", P),
      s("blanket", "A soft throw", O),
      s("candle", "A candle", O),
      s("tea", "Tea or cocoa", O),
      s("puzzle", "A jigsaw puzzle", O),
      s("mug", "A favorite mug", P),
    ],
  },
  {
    id: "pottery-paint-night",
    name: "Pottery and paint night kit",
    headline: "A canvas or a mug each, nobody has to be good",
    dek: "Canvases or a ceramic piece each, a table of brushes, and a group chat that finally has a date.",
    hobby: "pottery-painting",
    alsoHobbies: ["craft-nights"],
    note: "Plan one canvas or piece per guest, plus a spare or two. For a girls' craft night, pick one easy project and share the scissors and glue.",
    slots: [
      s("canvas", "Canvases or panels", E),
      s("paint", "Acrylic paint", E),
      s("brushes", "Brushes", E),
      s("palette", "Palettes", O),
      s("aprons", "Aprons or old shirts", P),
      s("easel", "Tabletop easel", O, "nice-to-have"),
      s("main-project", "The main project supplies", E, "complete-kit"),
      s("shared-tools", "Shared scissors and glue", E),
      s("table-cover", "Table protection", O),
      s("extra-supplies", "Extras for people who finish early", O, "nice-to-have"),
    ],
  },
  {
    id: "racquet-sports",
    name: "Pickleball and tennis kit",
    headline: "Your first game, pickleball or tennis",
    dek: "Paddles or a racquet, a ball and a standing weekend slot. Borrow first if you can.",
    hobby: "pickleball",
    alsoHobbies: ["tennis"],
    note: "Many courts and clubs lend paddles or rent racquets, so try one first. A racquet from another sport will not work for pickleball.",
    slots: [
      s("paddles", "Pickleball paddles", E),
      s("pickleballs", "Pickleballs", E),
      s("pickleball-bag", "Pickleball bag", O),
      s("racquet", "Beginner tennis racquet", E),
      s("tennis-balls", "Tennis balls", E),
      s("racquet-bag", "Racquet bag", O),
      s("court-shoes", "Court shoes", O, "later-upgrade"),
    ],
  },
];

export const getKit = (id: string) => kits.find((k) => k.id === id);

/** Every hobby slug a kit speaks to (its main hobby first). */
export const kitHobbies = (k: Kit): string[] => [
  ...(k.hobby ? [k.hobby] : []),
  ...(k.alsoHobbies ?? []),
];

/** `{ kitId: [slotIds] }` for cross-reference validation. */
export const kitSlotIndex = (): Record<string, string[]> =>
  Object.fromEntries(kits.map((k) => [k.id, k.slots.map((x) => x.id)]));

export type FilledSlot = {
  slot: KitSlot;
  product: CatalogProduct;
  /** Other verified products for the same slot, at most MAX_ALTERNATIVES, best first. */
  alternatives: CatalogProduct[];
};

/**
 * Slots that a verified product fills. A product fills at most one slot per kit. Each slot shows one
 * primary product (see `choosePrimary`) and up to two alternatives. Empty slots and empty kits are
 * simply absent.
 */
export function fillKit(kit: Kit, list: CatalogProduct[]): FilledSlot[] {
  const used = new Set<string>();
  const out: FilledSlot[] = [];
  for (const slot of kit.slots) {
    const hits = list.filter(
      (p) => !used.has(p.id) && p.kitSlots.some((k) => k.kit === kit.id && k.slot === slot.id),
    );
    if (hits.length === 0) continue;
    const product = choosePrimary(hits, list);
    const alternatives = hits.filter((p) => p.id !== product.id).slice(0, MAX_ALTERNATIVES);
    used.add(product.id);
    for (const a of alternatives) used.add(a.id);
    out.push({ slot, product, alternatives });
  }
  return out;
}

/** A kit needs at least this many named, verified picks (filled slots) to render as a kit. */
export const MIN_KIT_PICKS = 4;

/**
 * The render rule: a full kit has at least MIN_KIT_PICKS named verified picks, one of them an
 * essential. Anything smaller is shown as one "Where to start" card, never padded with filler.
 */
export const isFullKit = (filled: FilledSlot[]): boolean =>
  filled.length >= MIN_KIT_PICKS && filled.some((f) => f.slot.need === "essential");
