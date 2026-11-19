import { readingMinutes, type Block } from "@/content";

/** Callouts, most useful first. Only the first MAX_HEAVY of these in an article get a tinted panel. */
const CALLOUT_PRIORITY: Block["type"][] = [
  "first30",
  "whatYoullNeed",
  "noSpend",
  "tryThisWeekend",
  "makePlan",
  "saveSplurge",
  "girlsNight",
];
export const MAX_HEAVY_CALLOUTS = 3;

/** Indexes of the blocks that render as a full tinted panel; every other callout is a plain bordered line. */
export function heavyCallouts(blocks: Block[]): Set<number> {
  const ranked = blocks
    .map((b, i) => ({ i, rank: CALLOUT_PRIORITY.indexOf(b.type) }))
    .filter((x) => x.rank >= 0)
    .sort((p, q) => p.rank - q.rank || p.i - q.i)
    .slice(0, MAX_HEAVY_CALLOUTS);
  return new Set(ranked.map((x) => x.i));
}

export type ShortItem = { key: string; label: string; value: string; href?: string };

/**
 * "The short version": up to three facts, built only from the article's own data (reading time, block
 * counts). Nothing is claimed that the article body does not contain. Returns [] when there is nothing to say.
 */
export function shortVersion(a: { dek: string; body: Block[] }): ShortItem[] {
  const out: ShortItem[] = [];
  const first30 = a.body.find((b) => b.type === "first30");
  const need = a.body.find((b) => b.type === "whatYoullNeed");
  const noSpend = a.body.some((b) => b.type === "noSpend");
  const items = a.body.filter((b) => b.type === "item").length;
  const mins = readingMinutes(a);
  if (a.body.length > 0) out.push({ key: "read", label: "Read", value: `${mins} min` });
  if (first30 && first30.type === "first30")
    out.push({
      key: "do",
      label: "Do",
      value: `A ${first30.steps.length}-step first 30 minutes`,
      href: "#first-30",
    });
  else if (items >= 3) out.push({ key: "do", label: "Pick from", value: `${items} ideas` });
  if (need && need.type === "whatYoullNeed")
    out.push({
      key: "need",
      label: "Need",
      value: `${need.essentials.length} essentials${
        need.optional?.length ? `, ${need.optional.length} nice-to-haves` : ""
      }`,
      href: "#what-youll-need",
    });
  if (noSpend)
    out.push({
      key: "free",
      label: "Free way in",
      value: "No-spend version included",
      href: "#no-spend",
    });
  return out.slice(0, 3);
}
