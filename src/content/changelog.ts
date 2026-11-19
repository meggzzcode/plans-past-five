/**
 * "What changed" log. REAL entries only, newest first, plain English, no commit hashes.
 * Rules: one entry per user-visible change, dated the day it actually happened (see git history).
 * Never backdate, never invent a change, never list an earlier date than the site really had.
 */
export type ChangeDay = {
  /** YYYY-MM-DD */
  date: string;
  changes: string[];
};

/** The month the site launched. Shown on the changelog page as the launch note. */
export const LAUNCH_NOTE = "Launched November 2026";

export const changelog: ChangeDay[] = [
  {
    date: "2026-11-19",
    changes: [
      "Starter kits now show as a kit only when we have at least four named, checked picks for it. With fewer, you see a single “Where to start” card instead. The fifteen small kits were merged into eight collection kits.",
      "Added this What changed page.",
      "Trust pages: Editorial Standards now explains how we make the site, stories show their sources and when facts were last checked, and several confident claims were softened.",
      "23 more stories were published after their facts were checked against sources.",
      "The Shop lists starter picks with ordinary Amazon links. Every pick was checked against its listing before it appeared; picks that did not pass are not shown.",
      "Reworked the hobby quiz, the weekend planner and the home page.",
      "Improved saving and sharing: saved items stay in your own browser, and a plan can be shared as a link.",
      "Removed all printables and digital products. The site does not sell anything.",
      "Fixed button text that could not be read inside story callouts, and improved colour contrast.",
    ],
  },
  {
    date: "2026-11-18",
    changes: ["The first four stories were published, after research and source checks."],
  },
];

export const changelogDates = () => changelog.map((d) => d.date);
/** Newest entry date (the page's real modified date). */
export const lastChanged = () => changelog[0]!.date;
/** Oldest entry date (the page's real published date). */
export const firstChanged = () => changelog[changelog.length - 1]!.date;
