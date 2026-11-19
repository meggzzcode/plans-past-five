import { hobbies, type Hobby, type Craving, type Cost, type Energy } from "@/data/hobbies";

export type FinderAnswers = {
  craving: Craving;
  where: "home" | "outdoors" | "out" | "anywhere";
  time: "short" | "couple" | "halfday" | "any"; // ≤45 min, ≤2h, ≤4h, no limit
  budget: Cost;
  company: "solo" | "social" | "either";
  energy: Energy;
};

export type Theme = { key: string; name: string; line: string };

export const themes: Record<Hobby["category"], Theme> = {
  creative: {
    key: "creative",
    name: "The Creative Girl",
    line: "You want to end the day with something you made. Paint on your fingers, glue on the table, a little pride on the fridge.",
  },
  cozy: {
    key: "cozy",
    name: "The Cozy Girl",
    line: "Your ideal evening is soft lighting, something warm to drink and a hobby that asks nothing of you but your attention.",
  },
  outdoors: {
    key: "adventure",
    name: "The Adventure Girl",
    line: "You need fresh air, new streets and the feeling of finding something. Little adventures are your love language.",
  },
  social: {
    key: "social",
    name: "The Social Butterfly",
    line: "Hobbies are better with people. You want plans that fill the group chat and friendships that grow around a shared table.",
  },
  bookish: {
    key: "bookish",
    name: "The Bookish Girl",
    line: "One more chapter, always. You want quiet, thoughtful hobbies and maybe a café window seat.",
  },
  active: {
    key: "sporty",
    name: "The Sporty Girl",
    line: "You want to move for the joy of it: golden-hour rallies, trails and that pleasantly tired feeling.",
  },
};

const costRank: Record<Cost, number> = { free: 0, under25: 1, under50: 2, flexible: 3 };
const hobbyCostRank = (c: Cost) => (c === "flexible" ? 2 : costRank[c]); // flexible hobbies can start around $25–50
const maxMinutes = { short: 45, couple: 120, halfday: 240, any: Infinity } as const;
const energyRank: Record<Energy, number> = { low: 0, medium: 1, high: 2 };

type Constraint = "where" | "time" | "budget" | "company" | "energy";
const constraintLabels: Record<Constraint, string> = {
  where: "location",
  time: "time",
  budget: "budget",
  company: "solo/social preference",
  energy: "energy level",
};

function passes(h: Hobby, a: FinderAnswers, skip?: Constraint) {
  if (skip !== "where" && a.where !== "anywhere" && !h.settings.includes(a.where)) return false;
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
        : a.where === "outdoors"
          ? "gets you outside"
          : "takes you somewhere new",
    );
  if (a.time !== "any") r.push(`a first session takes ${h.timeLabel.toLowerCase()}`);
  if (h.cost === "free") r.push("costs nothing to start");
  else if (costRank[a.budget] < 3) r.push("fits your budget");
  if (h.energy === a.energy) r.push(`matches a ${a.energy}-energy day`);
  if (h.beginner === 1) r.push("is beginner-friendly");
  return r;
}

export function findHobbies(a: FinderAnswers) {
  const scored = hobbies
    .filter((h) => passes(h, a))
    .map((h) => {
      let s = 0;
      if (h.cravings.includes(a.craving)) s += 4;
      if (h.energy === a.energy) s += 2;
      if (h.beginner === 1) s += 1;
      if (a.company !== "either" && h.company[0] === a.company) s += 1;
      if (a.where !== "anywhere" && h.settings[0] === a.where) s += 1;
      return { hobby: h, score: s, why: reasons(h, a) };
    })
    .filter((r) => r.score >= 3 || r.hobby.cravings.includes(a.craving))
    .sort((x, y) => y.score - x.score || x.hobby.name.localeCompare(y.hobby.name))
    .slice(0, 5);

  const counts: Record<string, number> = {};
  for (const r of scored)
    counts[r.hobby.category] =
      (counts[r.hobby.category] ?? 0) + (r.hobby.cravings.includes(a.craving) ? 2 : 1);
  const top = (Object.entries(counts).sort((x, y) => y[1] - x[1])[0]?.[0] ??
    "cozy") as Hobby["category"];

  let suggestions: { constraint: string; extra: number }[] = [];
  if (scored.length < 3) {
    suggestions = (Object.keys(constraintLabels) as Constraint[])
      .map((c) => ({
        constraint: constraintLabels[c],
        extra: hobbies.filter((h) => passes(h, a, c) && h.cravings.includes(a.craving)).length,
      }))
      .filter((s) => s.extra > scored.length)
      .sort((x, y) => y.extra - x.extra);
  }
  return { results: scored, theme: themes[top], tooFew: scored.length < 3, suggestions };
}
