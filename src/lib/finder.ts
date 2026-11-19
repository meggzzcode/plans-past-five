import {
  hobbies,
  getHobby,
  type Hobby,
  type Craving,
  type Cost,
  type Energy,
} from "@/data/hobbies";
import type { CollectionSlug } from "@/data/products";
import type { Vibe } from "@/data/activities";
import type { PlanSearch } from "@/lib/planner";
import { site } from "@/config/site";

export type FinderAnswers = {
  craving: Craving;
  /** "indoors" means home or somewhere out, but not outside. */
  where: "home" | "indoors" | "outdoors" | "out" | "anywhere";
  time: "short" | "couple" | "halfday" | "any"; // ≤45 min, ≤2h, ≤4h, no limit
  budget: Cost;
  company: "solo" | "social" | "either";
  energy: Energy;
  /** How much of a learning curve is welcome. Optional: missing means "any". */
  level?: "easy" | "some" | "any";
};

export type PersonaKey =
  | "creative"
  | "cozy"
  | "sporty"
  | "bookish"
  | "little-adventurer"
  | "social-butterfly"
  | "slow-living"
  | "curious-beginner";

export type Persona = {
  key: PersonaKey;
  name: string;
  /** One or two sentences of playful description. */
  line: string;
  /** Hobby slugs that suit this persona (all exist in src/data/hobbies.ts). */
  hobbies: string[];
  /** Default beginner pick when the quiz answers leave no matching hobby. */
  beginnerPick: string;
  /** Published article slugs to read next. */
  guides: string[];
  /** Existing /shop collection for supplies. */
  collection: CollectionSlug;
  /** Vibe to prefill in the planner. */
  plannerVibe: Vibe;
};

export type Theme = Persona;

const guideA = "how-to-start-junk-journaling";
const guideB = "creative-hobbies-you-can-start-at-home";
const guideC = "things-to-do-after-work-instead-of-scrolling";
const guideD = "hobbies-to-try-when-life-feels-like-work-sleep-repeat";

export const personas: Record<PersonaKey, Persona> = {
  creative: {
    key: "creative",
    name: "The Creative Girl",
    line: "You want to end the day with something you made. Paint on your fingers, glue on the table, a little pride on the fridge.",
    hobbies: ["junk-journaling", "watercolor-painting", "air-dry-clay", "embroidery"],
    beginnerPick: "junk-journaling",
    guides: [guideA, guideB],
    collection: "creative-girl",
    plannerVibe: "creative",
  },
  cozy: {
    key: "cozy",
    name: "The Cozy Girl",
    line: "Your ideal evening is soft lighting, something warm to drink and a hobby that asks nothing of you but your attention.",
    hobbies: ["jigsaw-puzzles", "baking", "indoor-gardening", "crossword-puzzles"],
    beginnerPick: "jigsaw-puzzles",
    guides: [guideC, guideD],
    collection: "girls-night-in",
    plannerVibe: "cozy",
  },
  sporty: {
    key: "sporty",
    name: "The Sporty Girl",
    line: "You want to move for the joy of it: golden-hour rallies, trails and that pleasantly tired feeling.",
    hobbies: ["pickleball", "tennis", "hiking", "roller-skating"],
    beginnerPick: "pickleball",
    guides: [guideD, guideC],
    collection: "sporty-girl",
    plannerVibe: "active",
  },
  bookish: {
    key: "bookish",
    name: "The Bookish Girl",
    line: "One more chapter, always. You want quiet, thoughtful hobbies and maybe a café window seat.",
    hobbies: ["reading", "book-clubs", "creative-writing", "crossword-puzzles"],
    beginnerPick: "reading",
    guides: [guideC, guideD],
    collection: "bookish-girl",
    plannerVibe: "relaxing",
  },
  "little-adventurer": {
    key: "little-adventurer",
    name: "The Little Adventurer",
    line: "You need fresh air, new streets and the feeling of finding something. Little adventures are your love language.",
    hobbies: ["hiking", "birdwatching", "thrifting", "film-photography", "museum-exploring"],
    beginnerPick: "birdwatching",
    guides: [guideD, guideC],
    collection: "little-adventures",
    plannerVibe: "adventurous",
  },
  "social-butterfly": {
    key: "social-butterfly",
    name: "The Social Butterfly",
    line: "Hobbies are better with people. You want plans that fill the group chat and friendships that grow around a shared table.",
    hobbies: ["craft-nights", "friendship-bracelets", "mahjong", "book-clubs"],
    beginnerPick: "craft-nights",
    guides: [guideB, guideD],
    collection: "girls-night-in",
    plannerVibe: "social",
  },
  "slow-living": {
    key: "slow-living",
    name: "The Slow Living Girl",
    line: "You are done rushing. You want gentle, unhurried hobbies that make an ordinary evening feel like a small ceremony.",
    hobbies: ["indoor-gardening", "picnicking", "flower-arranging", "vinyl-collecting"],
    beginnerPick: "flower-arranging",
    guides: [guideC, guideB],
    collection: "little-adventures",
    plannerVibe: "relaxing",
  },
  "curious-beginner": {
    key: "curious-beginner",
    name: "The Curious Beginner",
    line: "You are not sure what your thing is yet, and that is the fun part. You want low-stakes ways to try something new.",
    hobbies: ["collage-art", "crossword-puzzles", "volunteering", "museum-exploring", "mahjong"],
    beginnerPick: "collage-art",
    guides: [guideD, guideC],
    collection: "creative-girl",
    plannerVibe: "adventurous",
  },
};

/** Kept for older imports: persona by hobby category. */
export const themes: Record<Hobby["category"], Persona> = {
  creative: personas.creative,
  cozy: personas.cozy,
  outdoors: personas["little-adventurer"],
  social: personas["social-butterfly"],
  bookish: personas.bookish,
  active: personas.sporty,
};

const costRank: Record<Cost, number> = { free: 0, under25: 1, under50: 2, flexible: 3 };
const hobbyCostRank = (c: Cost) => (c === "flexible" ? 2 : costRank[c]); // flexible hobbies can start around $25–50
const maxMinutes = { short: 45, couple: 120, halfday: 240, any: Infinity } as const;
const energyRank: Record<Energy, number> = { low: 0, medium: 1, high: 2 };

export type Constraint = "craving" | "where" | "time" | "budget" | "company" | "energy" | "level";
const constraintLabels: Record<Constraint, string> = {
  craving: "main craving",
  where: "location",
  time: "time",
  budget: "budget",
  company: "solo/social preference",
  energy: "energy level",
  level: "difficulty",
};

function passes(h: Hobby, a: FinderAnswers, skip?: Constraint) {
  if (skip !== "where" && a.where !== "anywhere") {
    if (a.where === "indoors") {
      if (!h.settings.some((x) => x !== "outdoors")) return false;
    } else if (!h.settings.includes(a.where)) return false;
  }
  if (skip !== "level" && a.level === "easy" && h.beginner > 1) return false;
  if (skip !== "level" && a.level === "some" && h.beginner > 2) return false;
  if (skip !== "time" && h.minutes > maxMinutes[a.time]) return false;
  if (skip !== "budget" && hobbyCostRank(h.cost) > costRank[a.budget]) return false;
  if (skip !== "company" && a.company !== "either" && !h.company.includes(a.company)) return false;
  if (skip !== "energy" && energyRank[h.energy] > energyRank[a.energy] + 1) return false;
  return true;
}

function reasons(h: Hobby, a: FinderAnswers): string[] {
  const r: string[] = [];
  if (h.cravings.includes(a.craving))
    r.push(
      `gives you more ${a.craving === "friendship" ? "connection" : a.craving === "different" ? "novelty" : a.craving}`,
    );
  if (a.where !== "anywhere")
    r.push(
      a.where === "home"
        ? "works at home"
        : a.where === "indoors"
          ? "stays indoors"
          : a.where === "outdoors"
            ? "gets you outside"
            : "takes you somewhere new",
    );
  if (a.time !== "any") r.push(`a first session takes ${h.timeLabel.toLowerCase()}`);
  if (h.cost === "free") r.push("costs nothing to start");
  else if (costRank[a.budget] < 3) r.push("fits your budget");
  if (h.energy === a.energy) r.push(`matches a ${a.energy}-energy day`);
  if (h.beginner === 1) r.push("is beginner-friendly");
  else if (a.level === "some") r.push("needs only a little learning");
  return r;
}

/** The constraints a hobby can fail one at a time (used for the nearest-match list). */
function fails(h: Hobby, a: FinderAnswers, c: Constraint) {
  if (c === "craving") return !h.cravings.includes(a.craving);
  const only: FinderAnswers = {
    craving: a.craving,
    where: "anywhere",
    time: "any",
    budget: "flexible",
    company: "either",
    energy: "high",
    level: "any",
  };
  (only as Record<string, unknown>)[c] = a[c];
  return !passes(h, only);
}

export type Loosen = { constraint: Constraint; label: string };

const scoreFor = (h: Hobby, a: FinderAnswers) => {
  let s = 0;
  if (h.cravings.includes(a.craving)) s += 4;
  if (h.energy === a.energy) s += 2;
  if (h.beginner === 1) s += 1;
  if (a.company !== "either" && h.company[0] === a.company) s += 1;
  if (a.where !== "anywhere" && a.where !== "indoors" && h.settings[0] === a.where) s += 1;
  return s;
};

/** Every hobby that fits all the answers, best first (not capped). */
export function exactMatches(a: FinderAnswers) {
  return hobbies
    .filter((h) => passes(h, a))
    .map((h) => ({ hobby: h, score: scoreFor(h, a), why: reasons(h, a) }))
    .filter((r) => r.score >= 3 || r.hobby.cravings.includes(a.craving))
    .sort((x, y) => y.score - x.score || x.hobby.name.localeCompare(y.hobby.name));
}

export function findHobbies(a: FinderAnswers) {
  const scored = exactMatches(a).slice(0, 5);

  const counts: Record<string, number> = {};
  for (const r of scored)
    counts[r.hobby.category] =
      (counts[r.hobby.category] ?? 0) + (r.hobby.cravings.includes(a.craving) ? 2 : 1);
  const top = Object.entries(counts).sort((x, y) => y[1] - x[1])[0]?.[0] as
    Hobby["category"] | undefined;
  const persona = personaFor(a, top);

  const tooFew = scored.length < 3;
  let suggestions: { constraint: string; extra: number }[] = [];
  let nearest: { hobby: Hobby; breaks: Constraint[] }[] = [];
  let loosen: Loosen | null = null;
  if (tooFew) {
    suggestions = (Object.keys(constraintLabels) as Constraint[])
      .map((c) => ({
        constraint: constraintLabels[c],
        extra:
          c === "craving"
            ? hobbies.filter((h) => passes(h, a)).length
            : hobbies.filter((h) => passes(h, a, c) && h.cravings.includes(a.craving)).length,
      }))
      .filter((s) => s.extra > scored.length)
      .sort((x, y) => y.extra - x.extra);
    // Nearest matches: the hobbies that break the fewest answers (craving first), never ones
    // already shown as exact matches.
    const shown = new Set(scored.map((r) => r.hobby.slug));
    const checks = Object.keys(constraintLabels) as Constraint[];
    nearest = hobbies
      .filter((h) => !shown.has(h.slug))
      .map((h) => ({
        hobby: h,
        breaks: checks.filter((c) => fails(h, a, c)),
        craves: h.cravings.includes(a.craving),
      }))
      .sort(
        (x, y) =>
          x.breaks.length - y.breaks.length ||
          Number(y.craves) - Number(x.craves) ||
          scoreFor(y.hobby, a) - scoreFor(x.hobby, a) ||
          x.hobby.name.localeCompare(y.hobby.name),
      )
      .slice(0, Math.max(0, 3 - scored.length))
      .map(({ hobby, breaks }) => ({ hobby, breaks }));
    // The one answer to loosen: whichever the nearest matches break most often.
    const tally = new Map<Constraint, number>();
    for (const n of nearest) for (const c of n.breaks) tally.set(c, (tally.get(c) ?? 0) + 1);
    const worst = [...tally.entries()].sort((x, y) => y[1] - x[1])[0]?.[0];
    if (worst) loosen = { constraint: worst, label: constraintLabels[worst] };
  }

  // Beginner pick: the easiest matching hobby, else the persona's default.
  const matched = scored.map((r) => r.hobby);
  const beginnerPick =
    matched.find((h) => h.beginner === 1) ?? matched[0] ?? getHobby(persona.beginnerPick);
  return {
    results: scored,
    theme: persona,
    persona,
    beginnerPick,
    tooFew,
    /** "strong" = three or more hobbies fit every answer. Anything else is honest about it. */
    strength: (tooFew ? "weak" : "strong") as "strong" | "weak",
    suggestions,
    nearest,
    loosen,
  };
}

/**
 * Which persona the answers point to. Uses the craving AND company AND energy (and where), with
 * the top hobby category only to tell bookish from the rest. Deterministic.
 */
export function personaFor(a: FinderAnswers, topCategory?: Hobby["category"]): Persona {
  const social = a.company === "social";
  const lowKey = a.energy === "low";
  const out = a.where === "outdoors" || a.where === "out";
  switch (a.craving) {
    case "different":
      return personas["curious-beginner"];
    case "friendship":
      return personas["social-butterfly"];
    case "relaxation":
      if (social) return personas[lowKey ? "cozy" : "social-butterfly"];
      if (topCategory === "bookish") return personas.bookish;
      return personas[lowKey ? "slow-living" : "cozy"];
    case "creativity":
      if (social && topCategory === "social") return personas["social-butterfly"];
      if (topCategory === "bookish") return personas.bookish;
      return personas.creative;
    case "movement":
      return personas[out && a.energy !== "high" ? "little-adventurer" : "sporty"];
    case "adventure":
      return personas[social && a.energy === "high" ? "social-butterfly" : "little-adventurer"];
  }
}

/**
 * Preferences to carry into /make-plans as URL search params. Contains only quiz choices
 * (no personal data), and only the ones that map cleanly onto planner options.
 */
export function plannerSearch(a: FinderAnswers, persona: Persona): PlanSearch {
  const out: PlanSearch = { vibe: persona.plannerVibe, budget: a.budget, energy: a.energy };
  if (a.company === "solo") out.who = "alone";
  if (a.company === "social") out.who = "friend";
  if (a.where === "home") out.home = "1";
  if (a.where === "indoors") out.setting = "indoor";
  if (a.where === "outdoors") out.setting = "outdoor";
  if (a.time === "short") {
    out.when = "weeknight";
    out.length = "evening";
  } else if (a.time === "couple") {
    out.when = "weeknight";
    out.length = "few-hours";
  } else if (a.time === "halfday") {
    out.when = "saturday";
    out.length = "half-day";
  } else {
    out.when = "saturday";
    out.length = "full-day";
  }
  out.from = persona.key;
  return out;
}

/* ---------- Shareable result card (client-side only, no personal data) ---------- */

const esc = (t: string) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function wrapText(text: string, max: number): string[] {
  const lines: string[] = [];
  let cur = "";
  for (const w of text.split(/\s+/).filter(Boolean)) {
    if (cur && (cur + " " + w).length > max) {
      lines.push(cur);
      cur = w;
    } else cur = cur ? `${cur} ${w}` : w;
  }
  if (cur) lines.push(cur);
  return lines;
}

export function shareText(persona: Persona, pickName?: string) {
  return [
    `My hobby era: ${persona.name}.`,
    persona.line,
    pickName ? `A good first hobby to try: ${pickName}.` : "",
    `Find yours at ${site.domain}/hobby-finder`,
  ]
    .filter(Boolean)
    .join("\n");
}

/** A simple SVG card. Safe to show in an <img> via a data URI or download as a file. */
export function personaCardSvg(persona: Persona, pickName?: string) {
  const lines = wrapText(persona.line, 34).slice(0, 6);
  const text = lines
    .map(
      (l, i) =>
        `<text x="300" y="${330 + i * 30}" text-anchor="middle" font-size="21" fill="#2a1f1d">${esc(l)}</text>`,
    )
    .join("");
  const pick = pickName
    ? `<text x="300" y="${330 + lines.length * 30 + 50}" text-anchor="middle" font-size="19" fill="#b83f43" font-weight="bold">First hobby to try: ${esc(pickName)}</text>`
    : "";
  const nameLines = wrapText(persona.name, 20);
  const name = nameLines
    .map(
      (l, i) =>
        `<text x="300" y="${190 + i * 56}" text-anchor="middle" font-size="48" font-style="italic" fill="#b83f43">${esc(l)}</text>`,
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="600" height="750" font-family="Georgia, 'Times New Roman', serif" role="img" aria-label="${esc(`My hobby era: ${persona.name}`)}"><rect width="600" height="750" fill="#fbf5ea"/><rect x="24" y="24" width="552" height="702" fill="none" stroke="#b83f43" stroke-width="3"/><text x="300" y="90" text-anchor="middle" font-size="16" letter-spacing="4" fill="#2a1f1d">MY HOBBY ERA</text><text x="300" y="130" text-anchor="middle" font-size="28" fill="#b83f43">&#9733;</text>${name}${text}${pick}<text x="300" y="690" text-anchor="middle" font-size="16" fill="#2a1f1d">${esc(site.name)} · ${esc(site.domain)}</text></svg>`;
}
