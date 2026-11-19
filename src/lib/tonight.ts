import { hobbies, type Cost, type Energy, type Hobby } from "@/data/hobbies";
import { activities, type Activity } from "@/data/activities";
import { articlesForHobby } from "@/content";

/** What Should I Do Tonight? Pure, deterministic logic. No network, no personal data. */

export type TonightInput = {
  minutes: number; // time available
  energy: Energy;
  budget: Cost;
  company: "solo" | "social";
  setting: "indoor" | "outdoor" | "either";
};

export type Suggestion = {
  id: string;
  kind: "hobby" | "idea";
  title: string;
  minutes: number;
  /** Approximate cost range label, from costRanges below. */
  costLabel: string;
  firstStep: string;
  hobbySlug?: string | undefined;
  guideSlug?: string | undefined;
  note?: string | undefined;
};

export const timeOptions = [
  { v: 30, label: "About 30 minutes" },
  { v: 60, label: "An hour" },
  { v: 120, label: "A couple of hours" },
  { v: 180, label: "The whole evening" },
];

/** Approximate assumptions, labelled as estimates on the page. Edit here. */
export const costRanges: Record<Cost, { max: number; label: string }> = {
  free: { max: 0, label: "Free" },
  under25: { max: 25, label: "About $0–$25" },
  under50: { max: 50, label: "About $25–$50" },
  flexible: { max: Infinity, label: "Varies, can start small" },
};

const costRank: Record<Cost, number> = { free: 0, under25: 1, under50: 2, flexible: 3 };
const energyRank: Record<Energy, number> = { low: 0, medium: 1, high: 2 };

type Candidate = Suggestion & {
  cost: Cost;
  energy: Energy;
  outdoor: boolean;
  social: boolean;
  solo: boolean;
};

const fmtMin = (m: number) =>
  m < 60 ? `${m} min` : `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}m` : ""}`;
export const formatMinutes = fmtMin;

function fromHobby(h: Hobby): Candidate {
  return {
    id: `hobby:${h.slug}`,
    kind: "hobby",
    title: h.name,
    minutes: h.minutes,
    costLabel: costRanges[h.cost].label,
    firstStep: h.firstActivity,
    hobbySlug: h.slug,
    guideSlug: articlesForHobby(h.slug)[0]?.slug,
    cost: h.cost,
    energy: h.energy,
    outdoor: h.settings.includes("outdoors"),
    // "indoor" = at home or somewhere new indoors (studio, café, venue)
    social: h.company.includes("social"),
    solo: h.company.includes("solo"),
  };
}

/** Activities have no energy/setting fields, so infer them from vibes (documented, deterministic). */
function fromActivity(a: Activity): Candidate {
  const outdoor = a.vibes.includes("outdoorsy");
  const energy: Energy = a.vibes.includes("adventurous") ? "medium" : outdoor ? "medium" : "low";
  const h = a.hobby ? hobbies.find((x) => x.slug === a.hobby) : undefined;
  return {
    id: `idea:${a.id}`,
    kind: "idea",
    title: a.text,
    minutes: a.minutes,
    costLabel: costRanges[a.cost].label,
    firstStep: a.lowCost
      ? `Lower-cost version: ${a.lowCost}`
      : "Start with the first small step, then see where it goes.",
    ...(h ? { hobbySlug: h.slug, guideSlug: articlesForHobby(h.slug)[0]?.slug } : {}),
    cost: a.cost,
    energy,
    outdoor,
    social: a.who.some((w) => w !== "alone"),
    solo: a.who.includes("alone"),
  };
}

const pool = (): Candidate[] => [...hobbies.map(fromHobby), ...activities.map(fromActivity)];

type Constraint = "time" | "energy" | "budget" | "company" | "setting";

function fits(c: Candidate, i: TonightInput, skip?: Constraint): boolean {
  if (skip !== "time" && c.minutes > i.minutes) return false;
  if (skip !== "energy" && energyRank[c.energy] > energyRank[i.energy]) return false;
  if (skip !== "budget" && costRank[c.cost] > costRank[i.budget]) return false;
  if (skip !== "company" && !(i.company === "solo" ? c.solo : c.social)) return false;
  if (skip !== "setting") {
    if (i.setting === "outdoor" && !c.outdoor) return false;
    if (i.setting === "indoor" && c.outdoor && c.kind === "idea") return false;
    if (i.setting === "indoor" && c.outdoor && c.kind === "hobby") {
      // hobbies that can also be done indoors stay in
      const h = hobbies.find((x) => `hobby:${x.slug}` === c.id);
      if (!h || h.settings.every((s) => s === "outdoors")) return false;
    }
  }
  return true;
}

/** Higher = better fit: uses the time well, matches energy and budget closely. */
function score(c: Candidate, i: TonightInput): number {
  let s = 0;
  s += energyRank[c.energy] === energyRank[i.energy] ? 2 : 0;
  s += costRank[c.cost] === costRank[i.budget] ? 1 : 0;
  s += c.minutes >= i.minutes * 0.5 ? 2 : 0;
  if (c.kind === "hobby") s += 0.5; // hobbies have richer guides
  return s;
}

/** Small deterministic PRNG (mulberry32). */
export function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type TonightResult = {
  suggestions: Suggestion[];
  matched: number;
  /** Set when fewer than 3 matched: the one constraint that would help most. */
  loosen?: { constraint: Constraint; message: string };
};

const loosenCopy: Record<Constraint, string> = {
  time: "Try giving yourself a bit more time.",
  energy: "Try a little more energy: a gentler idea may be on the other side of a cuppa.",
  budget: "Try a slightly bigger budget.",
  company: "Try switching between solo and social.",
  setting: "Try 'either' for indoor or outdoor.",
};

const clean = ({
  cost: _c,
  energy: _e,
  outdoor: _o,
  social: _s,
  solo: _so,
  ...s
}: Candidate): Suggestion => s;

/** Same input + same seed always gives the same three suggestions. Seed 0 = best fits first. */
export function tonightIdeas(input: TonightInput, seed = 0): TonightResult {
  const all = pool();
  const matches = all
    .filter((c) => fits(c, input))
    .sort((a, b) => score(b, input) - score(a, input) || a.id.localeCompare(b.id));
  let loosen: TonightResult["loosen"];
  if (matches.length < 3) {
    const cons: Constraint[] = ["time", "energy", "budget", "company", "setting"];
    let best: Constraint | undefined;
    let bestN = matches.length;
    for (const k of cons) {
      const n = all.filter((c) => fits(c, input, k)).length;
      if (n > bestN) {
        bestN = n;
        best = k;
      }
    }
    if (best) loosen = { constraint: best, message: loosenCopy[best] };
  }
  const top = matches.slice(0, Math.max(6, 3));
  let chosen: Candidate[];
  if (seed === 0 || top.length <= 3) chosen = top.slice(0, 3);
  else {
    const rnd = seeded(seed * 7919 + top.length);
    const order = [...top];
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [order[i], order[j]] = [order[j]!, order[i]!];
    }
    chosen = order.slice(0, 3);
  }
  return { suggestions: chosen.map(clean), matched: matches.length, ...(loosen ? { loosen } : {}) };
}
