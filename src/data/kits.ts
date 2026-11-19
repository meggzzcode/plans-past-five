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
  dek: string;
  /** Hobby slug from src/data/hobbies.ts, when one matches. */
  hobby?: string;
  /**
   * One short, honest note for the whole kit (what to check, who it suits). Replaces per-product
   * disclaimers. Plain sentences, no prices, no editor-speak.
   */
  note?: string;
  slots: KitSlot[];
};

export const KIT_DISCLAIMER =
  "A shopping list we put together, not a bundle we sell. Each item links to its own Amazon page.";

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
    dek: "Paint, a brush or two and paper that won't buckle.",
    hobby: "watercolor-painting",
    note: "Start with the paint, a round brush and heavy paper. The rest can wait.",
    slots: [
      s("paints", "A small pan or tube set", E),
      s("brushes", "Round brushes", E),
      s("paper", "Watercolor paper or pad", E),
      s("palette", "Palette or mixing tray", O, "affordable"),
      s("masking-tape", "Masking tape", P),
      s("water-jar", "A jar for water", P),
    ],
  },
  {
    id: "air-dry-clay",
    name: "Air-dry clay starter kit",
    dek: "No kiln needed: clay, a few tools and paint.",
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
    id: "embroidery",
    name: "Embroidery starter kit",
    dek: "Hoop, floss, needles and fabric to practice on.",
    hobby: "embroidery",
    note: "A beginner kit with a guide is the quickest way in. Buy extra floss once you know which colors you reach for.",
    slots: [
      s("hoop", "Embroidery hoop", E),
      s("floss", "Embroidery floss", O, "affordable"),
      s("needles", "Embroidery needles", E),
      s("fabric", "Cotton or linen fabric", E),
      s("scissors", "Small sharp scissors", O),
      s("pattern", "A beginner pattern", O, "complete-kit"),
    ],
  },
  {
    id: "crochet",
    name: "Crochet starter kit",
    dek: "A hook, easy yarn and something to finish.",
    hobby: "crochet",
    note: "Pick a smooth, light yarn and a mid-size hook (5 to 6 mm) so you can see every stitch.",
    slots: [
      s("hooks", "Crochet hooks", E),
      s("yarn", "Smooth, light-colored beginner yarn", E),
      s("stitch-markers", "Stitch markers", O),
      s("scissors", "Scissors", P),
      s("tapestry-needle", "Tapestry needle", O),
    ],
  },
  {
    id: "reading-journal",
    name: "Reading journal kit",
    dek: "A notebook and pens for the books that stuck with you.",
    hobby: "reading",
    note: "Choose a layout you would actually fill in: look at the sections before you buy.",
    slots: [
      s("journal", "A reading journal or notebook", E),
      s("pens", "A pen you like", E),
      s("bookmark", "Bookmark or page flags", O),
      s("highlighters", "Highlighters or tabs", O),
      s("reading-light", "Book light", O, "nice-to-have"),
    ],
  },
  {
    id: "girls-craft-night",
    name: "Girls' craft night kit",
    dek: "One easy project that suits a group.",
    hobby: "craft-nights",
    slots: [
      s("main-project", "The main project supplies", E, "complete-kit"),
      s("shared-tools", "Shared scissors and glue", E),
      s("table-cover", "Table protection", O),
      s("extra-supplies", "Extras for people who finish early", O, "nice-to-have"),
    ],
  },
  {
    id: "mahjong-night",
    name: "Mahjong night kit",
    dek: "A set you can play on and something to play on top of.",
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
    id: "book-club",
    name: "Book club kit",
    dek: "Small things that make the meeting easier.",
    hobby: "book-clubs",
    slots: [
      s("discussion-guide", "Discussion prompts", O),
      s("notebook", "Notebook for notes", O),
      s("bookmarks", "Bookmarks or page flags", O),
      s("snack-bowls", "Snack bowls or a board", P),
    ],
  },
  {
    id: "paint-night",
    name: "Paint night kit",
    dek: "Canvas, paint and brushes for a table of beginners.",
    note: "Plan one canvas per guest, plus a spare or two.",
    slots: [
      s("canvas", "Canvases or panels", E),
      s("paint", "Acrylic paint", E),
      s("brushes", "Brushes", E),
      s("palette", "Palettes", O),
      s("aprons", "Aprons or old shirts", P),
      s("easel", "Tabletop easel", O, "nice-to-have"),
    ],
  },
  {
    id: "picnic-adventure",
    name: "Picnic kit",
    dek: "A blanket, something to carry and something to sit on.",
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
    id: "flower-arranging",
    name: "Flower arranging kit",
    dek: "Snips, a vase and the little things that make stems stay put.",
    hobby: "flower-arranging",
    slots: [
      s("snips", "Floral snips", E),
      s("vase", "A vase", E),
      s("frog", "Flower frog or floral tape", O),
      s("water-jar", "A jug for water", P),
    ],
  },
  {
    id: "pickleball",
    name: "Pickleball starter kit",
    dek: "Paddles and balls. Rent or borrow first if you'd like to try it.",
    hobby: "pickleball",
    note: "Paddles and balls are all you need to start. A racket from another sport will not work here, and many courts and clubs lend paddles.",
    slots: [
      s("paddles", "Pickleball paddles", E),
      s("balls", "Pickleballs", E),
      s("bag", "Bag", O),
      s("court-shoes", "Court shoes", O, "later-upgrade"),
    ],
  },
  {
    id: "tennis",
    name: "Tennis starter kit",
    dek: "A racquet and balls. Many courts and clubs rent racquets.",
    hobby: "tennis",
    note: "Many courts and clubs rent rackets, so try one first if you are not sure you will keep playing.",
    slots: [
      s("racquet", "Beginner racquet", E),
      s("balls", "Tennis balls", E),
      s("bag", "Racquet bag", O),
      s("court-shoes", "Court shoes", O, "later-upgrade"),
    ],
  },
  {
    id: "cozy-night-in",
    name: "Cozy night in kit",
    dek: "Candle-and-blanket energy, nothing you have to buy.",
    slots: [
      s("blanket", "A soft throw", O),
      s("candle", "A candle", O),
      s("tea", "Tea or cocoa", O),
      s("puzzle", "A jigsaw puzzle", O),
      s("mug", "A favorite mug", P),
    ],
  },
];

export const getKit = (id: string) => kits.find((k) => k.id === id);

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
