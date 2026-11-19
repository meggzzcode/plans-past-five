import type { Activity } from "@/data/activities";
import { images, type ImageKey } from "@/data/images";

/** Best existing photo for an idea, by what it is. Only strong matches: otherwise a tint is used. */
const byActivity: Record<string, ImageKey> = {
  trail: "hiking",
  picnic: "picnic",
  tennis: "tennis",
  pickleball: "tennis",
  watercolor: "watercolor",
  "cafe-sketch": "soloCafe",
  "crossword-cafe": "soloCafe",
  bookstore: "shopBookish",
  "read-bath": "shopBookish",
  "book-club": "shopBookish",
  clay: "shopPottery",
  "pottery-studio": "potteryNight",
  "paint-night": "potteryNight",
  bracelets: "girlsNight",
  "game-night": "shopGirlsNight",
  bake: "shopGirlsNight",
  journal: "junkJournal",
  collage: "junkJournal",
  zine: "shopCreative",
  embroidery: "shopCreative",
  market: "shopAdventures",
  "film-roll": "shopAdventures",
  "photo-walk": "shopAdventures",
};

/** Picks a photo for each activity, never repeating one within a plan (null means: use the tint). */
export function pickImages(list: (Activity | null)[]): (ImageKey | null)[] {
  const used = new Set<ImageKey>();
  const out = list.map((a) => {
    const own = a ? byActivity[a.id] : undefined;
    if (!own || used.has(own)) return null;
    used.add(own);
    return own;
  });
  // Creative ideas without a photo of their own borrow the craft flat-lay, once.
  return out.map((k, i) => {
    const a = list[i];
    if (k || !a || a.vibes[0] !== "creative" || used.has("shopCreative")) return k;
    used.add("shopCreative");
    return "shopCreative";
  });
}

export const imageSrc = (k: ImageKey) => images[k].src;

export type Tint = { bg: string; fg: string };
/** Brand tint and doodle colour for the no-photo card, by vibe. */
export const tintFor = (a: Activity): Tint => {
  switch (a.vibes[0]) {
    case "creative":
      return { bg: "bg-strawberry", fg: "text-cherry" };
    case "social":
      return { bg: "bg-butter", fg: "text-cherry" };
    case "outdoorsy":
    case "active":
      return { bg: "bg-matcha/60", fg: "text-garden" };
    case "adventurous":
      return { bg: "bg-sunday", fg: "text-garden" };
    default:
      return { bg: "bg-butter/60", fg: "text-cherry" };
  }
};
