/**
 * "This season": a small, deterministic pick of hobbies for the current month, derived only from the
 * existing hobby tags and categories. No backend, no randomness (the order rotates monthly through a
 * stable hash). Seasons follow the northern hemisphere calendar.
 */
import { hobbies as allHobbies, type Hobby } from "@/data/hobbies";

export type Season = "winter" | "spring" | "summer" | "autumn";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function seasonOfMonth(month: number): Season {
  const m = ((Math.trunc(month) % 12) + 12) % 12; // 0 = January
  if (m === 11 || m <= 1) return "winter";
  if (m <= 4) return "spring";
  if (m <= 7) return "summer";
  return "autumn";
}

export const seasonOf = (d: Date): Season => seasonOfMonth(d.getMonth());

export const SEASON_COPY: Record<Season, { label: string; line: string }> = {
  winter: { label: "winter", line: "Long evenings, warm lamps. Hobbies that live indoors." },
  spring: { label: "spring", line: "The light is back. Time to get outside after work." },
  summer: { label: "summer", line: "Long light and weekends outdoors. Take it with friends." },
  autumn: { label: "autumn", line: "Earlier dark, cosier plans. Make something, curl up." },
};

/** Points per matching tag or category. Only tags and categories that exist in src/data/hobbies.ts. */
const WEIGHTS: Record<
  Season,
  { tags: Record<string, number>; categories: Record<string, number> }
> = {
  winter: {
    tags: { "at-home": 3, "low-energy": 2, creative: 2, "low-cost": 0.5 },
    categories: { cozy: 3, bookish: 2, creative: 1 },
  },
  spring: {
    tags: { outdoors: 3, active: 2, weekend: 1, social: 1 },
    categories: { outdoors: 3, active: 1 },
  },
  summer: {
    tags: { outdoors: 3, social: 2, active: 2, weekend: 1 },
    categories: { outdoors: 3, social: 2, active: 1 },
  },
  autumn: {
    tags: { "at-home": 2, creative: 2, "after-work": 1, social: 1 },
    categories: { cozy: 3, bookish: 2, creative: 1 },
  },
};

/** Small stable string hash (FNV-1a) so the rotation is the same for everyone in a given month. */
export function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967296; // [0, 1)
}

export function seasonScore(h: Pick<Hobby, "tags" | "category">, season: Season): number {
  const w = WEIGHTS[season];
  let s = w.categories[h.category] ?? 0;
  for (const t of h.tags) s += w.tags[t] ?? 0;
  return s;
}

/**
 * Up to `count` hobbies for the date's season. Scores by tag and category, adds a small monthly
 * rotation, and avoids three of the same category in a row so the strip stays varied.
 */
export function seasonalHobbies(date: Date, list: Hobby[] = allHobbies, count = 4): Hobby[] {
  const season = seasonOf(date);
  const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
  const scored = list
    .map((h) => ({ h, score: seasonScore(h, season) + hashString(`${h.slug}:${monthKey}`) * 1.5 }))
    .filter((x) => seasonScore(x.h, season) > 0)
    .sort((a, b) => b.score - a.score || a.h.slug.localeCompare(b.h.slug));
  const picked: Hobby[] = [];
  const perCategory: Record<string, number> = {};
  for (const { h } of scored) {
    if (picked.length >= count) break;
    if ((perCategory[h.category] ?? 0) >= 2) continue;
    perCategory[h.category] = (perCategory[h.category] ?? 0) + 1;
    picked.push(h);
  }
  return picked;
}
