import { activities, type Activity, type Part, type Vibe, type Who } from "@/data/activities";
import type { Cost } from "@/data/hobbies";

export type PlanInput = {
  when: "after-work" | "saturday" | "sunday";
  length: "evening" | "few-hours" | "half-day" | "full-day";
  vibe: Vibe;
  who: Who;
  budget: Cost;
  atHome: boolean;
};

export type PlanSlot = { label: string; activity: Activity };
export type Plan = { title: string; slots: PlanSlot[]; totalMinutes: number; input: PlanInput; seed: number };

const HOME = new Set(["slow-breakfast", "watercolor", "clay", "collage", "journal", "bracelets", "bake", "puzzle", "read-bath", "dinner-for-one", "cook-together", "game-night", "letter", "flowers", "vinyl", "embroidery", "plan-weekend"]);
const costRank: Record<Cost, number> = { free: 0, under25: 1, under50: 2, flexible: 3 };
const actCost = (c: Cost) => (c === "flexible" ? 2 : costRank[c]);

export function slotsFor(input: PlanInput): { label: string; part: Part; maxMinutes: number }[] {
  if (input.when === "after-work" || input.length === "evening")
    return input.length === "few-hours" || input.length === "half-day" || input.length === "full-day"
      ? [{ label: "First", part: "evening", maxMinutes: 90 }, { label: "Then", part: "evening", maxMinutes: 90 }]
      : [{ label: "Tonight", part: "evening", maxMinutes: 90 }];
  if (input.length === "few-hours") return [{ label: "First", part: "afternoon", maxMinutes: 120 }, { label: "Then", part: "afternoon", maxMinutes: 90 }];
  if (input.length === "half-day") return [{ label: "Morning", part: "morning", maxMinutes: 180 }, { label: "Afternoon", part: "afternoon", maxMinutes: 150 }];
  return [
    { label: "Morning", part: "morning", maxMinutes: 180 },
    { label: "Afternoon", part: "afternoon", maxMinutes: 180 },
    { label: "Evening", part: "evening", maxMinutes: 150 },
  ];
}

export function candidates(input: PlanInput, part: Part, maxMinutes: number, used: Set<string>) {
  return activities
    .filter((a) => !used.has(a.id))
    .filter((a) => a.parts.includes(part))
    .filter((a) => a.who.includes(input.who))
    .filter((a) => actCost(a.cost) <= costRank[input.budget])
    .filter((a) => a.minutes <= maxMinutes)
    .filter((a) => !input.atHome || HOME.has(a.id))
    .map((a) => ({ a, score: (a.vibes.includes(input.vibe) ? 3 : 0) + (a.vibes[0] === input.vibe ? 1 : 0) }))
    .filter((r) => r.score > 0)
    .sort((x, y) => y.score - x.score || x.a.id.localeCompare(y.a.id));
}

const dayWord = { "after-work": "evening", saturday: "Saturday", sunday: "Sunday" } as const;
const vibeWord: Record<Vibe, string> = { cozy: "cozy", creative: "creative", outdoorsy: "outdoorsy", social: "social", adventurous: "adventurous" };

export function makePlan(input: PlanInput, seed = 0): Plan | null {
  const used = new Set<string>();
  const slots: PlanSlot[] = [];
  slotsFor(input).forEach((s, i) => {
    const c = candidates(input, s.part, s.maxMinutes, used);
    if (!c.length) return;
    const pool = c.slice(0, Math.min(4, c.length));
    const pick = pool[(seed + i) % pool.length].a;
    used.add(pick.id);
    slots.push({ label: s.label, activity: pick });
  });
  if (!slots.length) return null;
  const who = input.who === "alone" ? " for one" : input.who === "group" ? " with the group" : "";
  return {
    title: `Your little ${vibeWord[input.vibe]} ${dayWord[input.when]}${who}`,
    slots,
    totalMinutes: slots.reduce((t, s) => t + s.activity.minutes, 0),
    input,
    seed,
  };
}
