# Planner redesign (/make-plans)

Answers the planner findings in REVIEW-3-TOOLS.md. Kept deliberately simple.

## What changed

- **Time windows.** Every activity has start windows (`at` in `src/data/activities.ts`), derived from its time-of-day parts and tightened for named ones (golden-hour walk 4 to 7 PM, sunset, stargazing after dark, breakfast, dinner). The scheduler only places an activity where its start is inside a window.
- **Chosen length.** Stops follow each other (30 min break) inside per-length windows. A day is aimed at 3h (few hours), 4.5h (half a day) or 8h (full day). If the plan covers under 75% of that, a one-line note says what fit and which single change would help.
- **Who.** Title reads "for one / with a friend / with your partner / with the group"; ideas are filtered by company; the invite line (used in Copy and Share) is worded per choice.
- **Share.** Copy plan (plain text: title, invite line, times, costs, total, link), Share (navigator.share when available), and the address bar always holds the exact plan (choices, seed, activity ids; no personal data), so a friend opens the same plan. Old links with retired ids still open.
- **Saving.** "Saved on this device. No account." appears right where you save.
- **Layout.** One card per stop: photo (existing images, never repeated in a plan) or a brand tint with a doodle, time, short title, cost and duration chips, one "Start:" line, a small Swap button. One summary line at the top (total time and cost range). Shuffle, Save, Print kept.

## Files

`src/lib/planner.ts`, `src/data/activities.ts`, `src/components/planner/{PlanResult.tsx,planImage.ts}`, `src/routes/make-plans.tsx`, tests in `src/test/planner-flow.test.ts` (new) and updated cases in `planner-quiz.test.ts`.

## Notes for later

- Activities under 30 minutes are no longer stops (removes "Plan the next weekend" filler).
- `ids` now lists activities in order, days separated by an empty entry. Older saved plans that no longer fit rebuild from their choices instead.
- Images come from the 14 existing files; unmatched ideas use a tint. Adding photos later only needs entries in `planImage.ts`.
