import { hobbies, type Cost, type Energy, type Hobby } from "@/data/hobbies";
import { activities, type Activity } from "@/data/activities";
import { articlesForHobby } from "@/content";

/**
 * A guide link only when the guide is mainly about that hobby (the hobby is the article's first
 * listed hobby). Otherwise no link, so "Read the guide" never points at an unrelated article.
 */
export function guideFor(hobbySlug: string): string | undefined {
  return articlesForHobby(hobbySlug).find((a) => a.hobbies[0] === hobbySlug)?.slug;
}

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
  under25: { max: 25, label: "Under $25" },
  under50: { max: 50, label: "Under $50" },
  flexible: { max: Infinity, label: "Varies, can start small" },
};

const costRank: Record<Cost, number> = { free: 0, under25: 1, under50: 2, flexible: 3 };
const energyRank: Record<Energy, number> = { low: 0, medium: 1, high: 2 };

/**
 * Hobbies that need daylight or opening hours, so they do not belong on a "tonight" list
 * (typed data: edit here). Hiking at 6pm in November is not a plan.
 */
export const daytimeOnlyHobbies: readonly string[] = [
  "hiking",
  "picnicking",
  "birdwatching",
  "nature-photography",
  "outdoor-sketching",
  "film-photography",
  "thrifting",
  "museum-exploring",
  "volunteering",
];

/** Wording that ties an idea to another day or part of the day, which is wrong for "tonight". */
export const notTonightWording =
  /\b(mon|tues|wednes|thurs|fri|satur|sun)day\b|\bweekends?\b|\btomorrow\b|\bnext week\b|\b(this |in the )?(morning|afternoon)\b|\bgolden[- ]hour\b|\bsunrise\b|\bbreakfast\b|\bbrunch\b|\bfarmers?[ -]market\b/i;

/** Wording that needs another person. Used to keep "Just me" free of ideas that need a friend. */
export const needsOthersWording =
  /\bwith (a |your |two |three |some )?(friends?|partner|group|someone)\b|\binvite\b|\btogether\b|\bcall a friend\b|\bdoubles\b|\bsign up a friend\b/i;

/** True when a candidate is a sensible thing to do this evening. */
export function tonightOk(c: {
  hobbySlug?: string | undefined;
  kind: "hobby" | "idea";
  parts?: readonly string[];
  title: string;
  firstStep: string;
}): boolean {
  if (c.kind === "hobby" && c.hobbySlug && daytimeOnlyHobbies.includes(c.hobbySlug)) return false;
  if (c.kind === "idea" && c.parts && !c.parts.includes("evening")) return false;
  return !notTonightWording.test(`${c.title} ${c.firstStep}`);
}

type Candidate = Suggestion & {
  cost: Cost;
  energy: Energy;
  outdoor: boolean;
  social: boolean;
  solo: boolean;
  /** Passes the tonight rule (right time of day, no other-day wording). */
  tonight: boolean;
  /** The wording needs another person. */
  needsOthers: boolean;
};

const fmtMin = (m: number) =>
  m < 60 ? `${m} min` : `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}m` : ""}`;
export const formatMinutes = fmtMin;

function fromHobby(h: Hobby): Candidate {
  const base = {
    kind: "hobby" as const,
    hobbySlug: h.slug,
    title: h.name,
    firstStep: h.firstActivity,
  };
  return {
    id: `hobby:${h.slug}`,
    kind: "hobby",
    title: h.name,
    minutes: h.minutes,
    costLabel: costRanges[h.cost].label,
    firstStep: h.firstActivity,
    hobbySlug: h.slug,
    guideSlug: guideFor(h.slug),
    cost: h.cost,
    energy: h.energy,
    outdoor: h.settings.includes("outdoors"),
    // "indoor" = at home or somewhere new indoors (studio, café, venue)
    social: h.company.includes("social"),
    solo: h.company.includes("solo"),
    tonight: tonightOk(base),
    needsOthers: needsOthersWording.test(h.firstActivity),
  };
}

/** Activities carry their own energy level; the outdoor flag still comes from the vibes. */
function fromActivity(a: Activity): Candidate {
  const outdoor = a.vibes.includes("outdoorsy");
  const energy: Energy = a.energy;
  const h = a.hobby ? hobbies.find((x) => x.slug === a.hobby) : undefined;
  // The idea's own "how to start" line (always present), so the card never says "start small".
  const firstStep = a.prep;
  return {
    id: `idea:${a.id}`,
    kind: "idea",
    title: a.text,
    minutes: a.minutes,
    costLabel: costRanges[a.cost].label,
    firstStep,
    ...(h ? { hobbySlug: h.slug, guideSlug: guideFor(h.slug) } : {}),
    cost: a.cost,
    energy,
    outdoor,
    social: a.who.some((w) => w !== "alone"),
    solo: a.who.includes("alone"),
    tonight: !a.advance && tonightOk({ kind: "idea", parts: a.parts, title: a.text, firstStep }),
    needsOthers: needsOthersWording.test(`${a.text} ${firstStep}`),
  };
}

const pool = (): Candidate[] => [...hobbies.map(fromHobby), ...activities.map(fromActivity)];

type Constraint = "time" | "energy" | "budget" | "company" | "setting";

function fits(c: Candidate, i: TonightInput, skip?: Constraint): boolean {
  // Always on: ideas must make sense this evening, and "Just me" must not need a friend.
  if (!c.tonight) return false;
  if (i.company === "solo" && c.needsOthers) return false;
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

export type TonightRelax = {
  constraint: Constraint;
  /** Button text, naming the answer that would change. */
  label: string;
  /** The answers to apply if the button is tapped. */
  patch: Partial<TonightInput>;
  /** How many ideas fit once the patch is applied. */
  matched: number;
};

export type TonightResult = {
  suggestions: Suggestion[];
  matched: number;
  /** Set when fewer than 3 matched: the one change that would help most (also first in `relax`). */
  loosen?: { constraint: Constraint; message: string };
  /** Every single-answer change that would open up more ideas, best first. Empty when 3+ fit. */
  relax: TonightRelax[];
};

const loosenCopy: Record<Constraint, string> = {
  time: "Try giving yourself a bit more time.",
  energy: "Try a little more energy: a gentler idea may be on the other side of a cuppa.",
  budget: "Try a slightly bigger budget.",
  company: "Try switching between solo and social.",
  setting: "Try 'either' for indoor or outdoor.",
};

const timeLadder = timeOptions.map((t) => t.v);
const energyLadder: Energy[] = ["low", "medium", "high"];
const budgetLadder: Cost[] = ["free", "under25", "under50", "flexible"];

/** The one-step change for a constraint, or null when it is already as loose as it gets. */
export function relaxPatch(c: Constraint, i: TonightInput): TonightRelax | null {
  const label = (t: string) => ({ constraint: c, label: t, matched: 0 });
  switch (c) {
    case "time": {
      const next = timeLadder.find((t) => t > i.minutes);
      const opt = timeOptions.find((t) => t.v === next);
      return next && opt
        ? { ...label(`Give it ${opt.label.toLowerCase()}`), patch: { minutes: next } }
        : null;
    }
    case "energy": {
      const next = energyLadder[energyLadder.indexOf(i.energy) + 1];
      return next
        ? {
            ...label(next === "medium" ? "Say you're okay, not on fumes" : "Say you're bursting"),
            patch: { energy: next },
          }
        : null;
    }
    case "budget": {
      const next = budgetLadder[budgetLadder.indexOf(i.budget) + 1];
      return next
        ? { ...label(`Allow ${costRanges[next].label.toLowerCase()}`), patch: { budget: next } }
        : null;
    }
    case "company": {
      const next = i.company === "solo" ? "social" : "solo";
      return {
        ...label(next === "solo" ? "Do it on my own" : "Bring someone"),
        patch: { company: next },
      };
    }
    case "setting":
      return i.setting === "either"
        ? null
        : { ...label("Indoors or outdoors, either is fine"), patch: { setting: "either" } };
  }
}

const clean = ({
  cost: _c,
  energy: _e,
  outdoor: _o,
  social: _s,
  solo: _so,
  tonight: _t,
  needsOthers: _n,
  ...s
}: Candidate): Suggestion => s;

/** Same input + same seed always gives the same three suggestions. Seed 0 = best fits first. */
export function tonightIdeas(input: TonightInput, seed = 0): TonightResult {
  const all = pool();
  const matches = all
    .filter((c) => fits(c, input))
    .sort((a, b) => score(b, input) - score(a, input) || a.id.localeCompare(b.id));
  let relax: TonightRelax[] = [];
  let loosen: TonightResult["loosen"];
  if (matches.length < 3) {
    const cons: Constraint[] = ["time", "energy", "budget", "company", "setting"];
    relax = cons
      .map((k) => {
        const r = relaxPatch(k, input);
        if (!r) return null;
        return { ...r, matched: all.filter((c) => fits(c, { ...input, ...r.patch })).length };
      })
      .filter((r): r is TonightRelax => !!r && r.matched > matches.length)
      .sort((a, b) => b.matched - a.matched);
    const best = relax[0];
    if (best) loosen = { constraint: best.constraint, message: loosenCopy[best.constraint] };
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
  return {
    suggestions: chosen.map(clean),
    matched: matches.length,
    relax,
    ...(loosen ? { loosen } : {}),
  };
}

/* ---------- URL state and sharing ---------- */

export type TonightSearch = Partial<{
  t: string;
  e: string;
  b: string;
  c: string;
  w: string;
  s: string;
}>;

export const DEFAULT_TONIGHT: TonightInput = {
  minutes: 60,
  energy: "low",
  budget: "free",
  company: "solo",
  setting: "either",
};

const oneOf = <T extends string | number>(v: unknown, allowed: readonly T[]): T | undefined =>
  allowed.find((a) => String(a) === String(v));

/** Reads answers and shuffle seed from the URL. Unknown values fall back to the defaults. */
export function parseTonightSearch(s: Record<string, unknown>): {
  input: TonightInput;
  seed: number;
  fromUrl: boolean;
} {
  const minutes = oneOf(
    s["t"],
    timeOptions.map((t) => t.v),
  );
  const energy = oneOf(s["e"], energyLadder);
  const budget = oneOf(s["b"], budgetLadder);
  const company = oneOf(s["c"], ["solo", "social"] as const);
  const setting = oneOf(s["w"], ["indoor", "outdoor", "either"] as const);
  const n = Number(s["s"]);
  return {
    input: {
      minutes: minutes ?? DEFAULT_TONIGHT.minutes,
      energy: energy ?? DEFAULT_TONIGHT.energy,
      budget: budget ?? DEFAULT_TONIGHT.budget,
      company: company ?? DEFAULT_TONIGHT.company,
      setting: setting ?? DEFAULT_TONIGHT.setting,
    },
    seed: Number.isInteger(n) && n >= 0 && n < 1000 ? n : 0,
    fromUrl: !!(minutes || energy || budget || company || setting),
  };
}

export const tonightSearch = (i: TonightInput, seed: number): Record<string, string> => ({
  t: String(i.minutes),
  e: i.energy,
  b: i.budget,
  c: i.company,
  w: i.setting,
  s: String(seed),
});

export const tonightHref = (i: TonightInput, seed: number) =>
  `/tools/tonight?${new URLSearchParams(tonightSearch(i, seed)).toString()}`;

/** What My Plans stores for a Tonight idea: a hobby saves as a hobby, anything else as a small idea note. */
export function tonightSaveItem(s: Suggestion, i: TonightInput, seed: number) {
  if (s.kind === "hobby" && s.hobbySlug)
    return {
      key: `hobby:${s.hobbySlug}`,
      kind: "hobby" as const,
      title: s.title,
      href: `/hobbies/${s.hobbySlug}`,
    };
  return {
    key: s.id,
    kind: "solo-date" as const,
    title: s.title,
    href: tonightHref(i, seed),
    note: `First step: ${s.firstStep}`,
  };
}

/**
 * Planner search params that carry a Tonight idea into /make-plans: the same time, energy, budget,
 * company and setting, plus `with` (the planner activity to build around) when the idea maps to one.
 * One stop when the idea is long, otherwise two.
 */
export function tonightPlanSearch(i: TonightInput, s: Suggestion): Record<string, string> {
  const activity = s.id.startsWith("idea:")
    ? activities.find((a) => a.id === s.id.slice(5))
    : s.hobbySlug
      ? activities.find((a) => a.hobby === s.hobbySlug && !a.advance)
      : undefined;
  const long = (activity?.minutes ?? s.minutes) > 90;
  return {
    when: "weeknight",
    length: long ? "evening" : "few-hours",
    vibe: activity?.vibes[0] ?? "cozy",
    who: i.company === "solo" ? "alone" : "friend",
    budget: i.budget,
    home: "0",
    setting: i.setting === "either" ? "any" : i.setting,
    energy: i.energy,
    from: "tonight",
    ...(activity ? { with: activity.id } : {}),
  };
}

const energyWords: Record<Energy, string> = {
  low: "running on fumes",
  medium: "okay",
  high: "bursting",
};

/** One line that echoes the answers, so the result never looks like it ignored the questions. */
export function tonightEcho(i: TonightInput): string {
  const t = timeOptions.find((x) => x.v === i.minutes)?.label.toLowerCase() ?? `${i.minutes} min`;
  const where =
    i.setting === "either" ? "indoors or out" : i.setting === "indoor" ? "indoors" : "outdoors";
  return `${t}, ${energyWords[i.energy]}, ${costRanges[i.budget].label.toLowerCase()}, ${i.company === "solo" ? "just me" : "with someone"}, ${where}`;
}

/** Plain-text version of the results with the restorable link. Only the answers: no personal data. */
export function tonightText(i: TonightInput, ideas: Suggestion[], url: string): string {
  const lines = ["Ideas for tonight", `(${tonightEcho(i)})`, ""];
  ideas.forEach((s, n) =>
    lines.push(
      `${n + 1}. ${s.title} (about ${fmtMin(s.minutes)}, ${s.costLabel.toLowerCase()}, estimate)`,
      `   First step: ${s.firstStep}`,
    ),
  );
  lines.push("", `Open the same ideas: ${url}`);
  return lines.join("\n");
}
