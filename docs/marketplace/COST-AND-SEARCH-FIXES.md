# Cost, filter, search and Tonight fixes

Responds to REVIEW-3 (tools) and the cost notes in REVIEW-2. All numbers remain rough estimates, never prices.

## 1. One source of truth for start-up cost

New file `src/data/equipment.ts` holds every hobby's equipment list (moved out of `src/lib/budget.ts`, which re-exports it) plus the shared helpers `startupRange()`, `bucketForHigh()`, `costBucketLabels`, `costBucketMax`. It has no dependency on `hobbies.ts`, so there is no import cycle.

Rule: the typical beginner range = essential items only, brand new, "balanced", rounded outward to $5. That one range is used everywhere:

- Hobby profile `startupBudget.low/high` = that range (derived in `hobbies.ts`; the hand-typed numbers are gone).
- Card bucket `cost` and `costLabel` = bucket of that range's top (free = 0, under $25, under $50, otherwise "Varies, can start small").
- Budget tool default result (brand new, balanced) = the same numbers. "Keep it lean" is 0.7x on the top, so it can never exceed the profile's top.
- Tonight's cost labels now say "Under $25" / "Under $50" (were "About $0-$25" / "About $25-$50").

| Hobby | Before: card / profile / tool | After: card / profile / tool (default) | Lean |
|---|---|---|---|
| Watercolor | Under $25 / $10-$35 / $15-$50 | Under $50 to start / $15-$50 / $15-$50 | up to $35 |
| Tennis | $25-$50 / $40-$150 / $20-$115 (lean $20-$79) | Under $50 to start / $15-$50 / $15-$50 | up to $35 |

How tennis got there: racket is a borrowed or secondhand one, and shoes, water bottle and lessons are optional extras rather than essentials. Other tuned lists: hiking (shoes you own, free map; now under $25), reading, crossword, creative writing, book clubs and collage (library, free puzzles, items you own are free; buying is optional, so these stay "Free"), watercolor and scrapbooking (cheaper student-grade essentials).

Bucket changes as a side effect: hiking (free to under $25), museum exploring (flexible to under $25), roller skating (flexible to under $25), and a few "under $25" hobbies to "under $50" (watercolor, air-dry clay, flower arranging, baking) because their honest top is above $25. The quiz and planner still pass.

Test: `src/test/costs.test.ts` checks for every hobby that lean <= typical <= full, the profile range equals the tool's typical range, the bucket contains lean and typical, lean top <= profile top, plus tennis/watercolor specifics and that the estimate disclaimer is intact.

## 2. Filters and hobbies

`company` re-tagged honestly. Solo only 17, social only 12, both 9 (filter counts: Solo 26 of 38, Social 21 of 38; before 31 and 30 of 36). Social is a little under the 14 target because I would not call more of these "best with others".

Added two honest active hobbies, each with full enrichment, equipment, and no new products (empty `productIds`):

- Yoga for Beginners (slug `yoga-for-beginners`, at home or a class)
- Dance Classes (slug `dance-classes`, drop-in beginner class)

Active went from 4 to 6. Hobby count is now 38: `rules.test.ts` and `hobbies.test.ts` updated deliberately, with comments.

## 3. Search (`src/lib/search.ts`)

Typed data: `searchConcepts` (phrases to hobby features and title words), `unsupportedSearchTerms`, `searchStopwords`. A hobby's features are its tags plus category, cost bucket and energy. Concepts: cheap, free, social ("with friends", "date"), solo ("alone"), after work, weekend, at home ("rainy day"), outdoors, active, creative, low energy.

Ranking: title matches first, then concept-matched hobbies, then body matches. Hobbies beat articles on ties.

Results now: "yoga" (Yoga for Beginners), "cheap date" (14 low-cost hobbies good with others), "something to do with friends after work" (17), "rainy day", "free" (free hobbies only, not ones that merely say "free"), "alone", "weekend" (weekend articles first), "kids" (nothing, with an honest message).

Empty state: `emptySearchSuggestions(q?)` returns `{ message, suggestedQueries: {label, query}[], links: {label, to}[] }` with links to `/hobby-finder`, `/hobbies`, `/make-plans`; every suggested query is tested to return results. Also new `searchDetailed(q)` returns `{ hits, understood, empty? }` (`understood` is e.g. "better with others", "after work", for a "Showing hobbies that are..." line). `search()` still returns `SearchHit[]` with the same shape.

## 4. Tonight

`src/lib/tonight.ts`: new `tonightOk` rule always applies. Ideas must include the evening in their allowed parts; daylight/opening-hour hobbies (`daytimeOnlyHobbies`: hiking, picnicking, birdwatching, nature photography, outdoor sketching, film photography, thrifting, museums, volunteering) are out; anything whose wording names a weekday, "weekend", "tomorrow" or morning/afternoon is out. "Just me" drops anything whose wording needs another person (`needsOthersWording`). First-step wording in `hobbies.ts` was neutralized (hiking, picnicking, jigsaw, crossword, indoor gardening, air-dry clay, scrapbooking). Tests: `src/test/tonight.test.ts`.

## Not done / follow-ups for the UI worker

- Copy that still says 36: `hobbies.index.tsx` (title, description, "Thirty-six ways..."), `index.tsx` ("Browse all 36 hobbies"), and the 35-hobbies article text. Now 38.
- `search.tsx` should call `searchDetailed(q)`; when `hits` is empty render `emptySearchSuggestions(q)` (tappable queries and links). The 320px overflow on search is a layout issue and not touched.
- The profile page shows `startupBudget` as before; the budget tool pages could link to a prefilled hobby. Not done.
- Hobby `assumptions` prose was not rewritten to mention the new essentials (it still reads correctly but is less precise for hiking and tennis).
- Directory filter state in the URL and Outdoors tag accuracy (e.g. Reading) were not changed.
- `src/test/contrast.test.ts` (not mine) has prettier and TypeScript errors that fail `eslint .` and `tsc`.
