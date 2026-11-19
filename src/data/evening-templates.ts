/**
 * Curated two-stop evenings, built only from ideas that already exist in `activities.ts` (ids below).
 * No venues, prices or opening hours of our own: every name, cost and time comes from the activity.
 *
 * The planner offers these first for a weeknight or evening with two stops. A template is used only
 * when every idea in it fits the person's choices (company, budget, setting, energy, keep-it-at-home)
 * and the two ideas fit the evening's time windows. Otherwise the planner builds a plan the usual way.
 * Edit here to add or change an evening.
 *
 * Energy: `low` templates hold only low-effort ideas; `medium` templates hold nothing above medium and
 * at least one medium idea; `high` templates hold only medium or high ideas and at least one high idea;
 * `any` templates mix efforts (livelier first, then a gentle finish) for people with no energy preference.
 */

export type EveningKind = "home" | "out" | "social";
export type EveningEnergy = "low" | "medium" | "high" | "any";

export type EveningTemplate = {
  id: string;
  energy: EveningEnergy;
  kind: EveningKind;
  /** Short name for the evening. */
  title: string;
  /** Two activity ids, in order. */
  ids: [string, string];
};

export const EVENING_TEMPLATES: readonly EveningTemplate[] = [
  // Low-key
  { id: "low-home", energy: "low", kind: "home", title: "Paint, then a record", ids: ["watercolor", "vinyl"] },
  { id: "low-out", energy: "low", kind: "out", title: "Golden hour, then stars", ids: ["park-walk", "stargaze"] },
  { id: "low-social-a", energy: "low", kind: "social", title: "Puzzle, then a make-it hour", ids: ["puzzle", "bracelets"] },
  { id: "low-social-b", energy: "low", kind: "social", title: "Look up, then talk books", ids: ["stargaze", "book-club"] },
  // Medium
  { id: "medium-home", energy: "medium", kind: "home", title: "Bake, then write a letter", ids: ["bake", "letter"] },
  { id: "medium-out", energy: "medium", kind: "out", title: "Bookstore, then a drop-in class", ids: ["bookstore", "drop-in"] },
  { id: "medium-social", energy: "medium", kind: "social", title: "Kitchen dance, then clay", ids: ["kitchen-dance", "clay"] },
  // High energy
  { id: "high-out", energy: "high", kind: "out", title: "Rally, then call-walk", ids: ["pickleball", "call-walk"] },
  { id: "high-out-b", energy: "high", kind: "out", title: "Court, then kitchen dance", ids: ["pickleball", "kitchen-dance"] },
  { id: "high-social-a", energy: "high", kind: "social", title: "Dance warm-up, then skate", ids: ["kitchen-dance", "skate"] },
  { id: "high-social-b", energy: "high", kind: "social", title: "Tennis, then a drop-in class", ids: ["tennis", "drop-in"] },
  // No energy preference: a livelier start and a gentle finish
  { id: "any-out", energy: "any", kind: "out", title: "Play, then wind down to a record", ids: ["pickleball", "vinyl"] },
  { id: "any-home", energy: "any", kind: "home", title: "Make something, then look up", ids: ["clay", "vinyl"] },
  { id: "any-social", energy: "any", kind: "social", title: "Bake, then stargaze", ids: ["bake", "stargaze"] },
];
