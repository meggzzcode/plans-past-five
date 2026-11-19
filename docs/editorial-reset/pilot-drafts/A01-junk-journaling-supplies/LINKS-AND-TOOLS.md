# A01 internal links and tool handoffs

Slugs below were checked against the repository on 2026-11-19 where noted. Paths marked PROPOSED do not exist yet.

## Internal links (by slug)

| From | To | Path | Status | Anchor wording |
|---|---|---|---|---|
| A01 end matter / dek context | A02 How to Start Junk Journaling | `/journal/how-to-start-junk-journaling` | EXISTS as old article; being rebuilt (E1 keep slug) | "How to build your first spread in one evening" |
| A01 scrapbooking section | Hobby page: Junk journaling | `/hobbies/junk-journaling` | exists in `src/data/hobbies.ts` | "the junk journaling hobby guide" |
| A01 scrapbooking section | Hobby page: Scrapbooking | `/hobbies/scrapbooking` | exists in `src/data/hobbies.ts` | "Scrapbooking" |
| A01 scrapbooking section | Hobby page: Collage art | `/hobbies/collage-art` | exists in `src/data/hobbies.ts` | "Collage art" |
| A01 footer (optional) | A24 reading-journal spread | PROPOSED `/journal/<A24 slug>`; old `how-to-start-a-reading-journal` exists | E1 names A24 as a link target; slug not fixed | "a reading-journal spread" |
| A01 footer | The Paper Edit collection | PROPOSED; no `paper-edit` slug found. `/shop/$category` currently validates only the six legacy category slugs (after-hours, weekends, solo-dates, better-together, creative-corner, movement) and old collection tags such as `journaling-era` still exist | UNRESOLVED (see ISSUES.md) | "More from The Paper Edit" |

## Tool handoffs (exact wording, to be placed after the closing and before related articles)

1. **Make Plans** (`/make-plans`)
   - Wording: "Got an evening free? Plan it around this: [Make an evening plan for a creative night in](/make-plans?when=weeknight&length=evening&vibe=creative&home=1)"
   - Query values are taken from `WHENS`, `LENGTHS`, `VIBES` in `src/lib/planner.ts` (weeknight, evening, creative confirmed to exist; `home=1` accepted by `parsePlanSearch`). VERIFY that the resulting plan actually surfaces junk journaling; that was not run. `who` is omitted because `alone` is the valid solo value and was not tested.
2. **Hobby quiz** (`/hobby-finder`)
   - Wording: "Not sure junk journaling is your thing? [Take the 2-minute hobby quiz](/hobby-finder)." (The quiz length is NOT verified; do not state "2-minute" until checked. Safer wording: "Not sure junk journaling is your thing? [Try the hobby quiz](/hobby-finder).")
   - E1 intends the quiz to route "paper and craft" answers here; that mapping was not checked in `src/lib/finder.ts`.
3. **Hobby page** (`/hobbies/junk-journaling`)
   - Wording: "New to it? Start with the [junk journaling hobby guide](/hobbies/junk-journaling), or save it to My Plans."
   - Save is the existing heart-save on the hobby page (E1). Not tested here.
4. **The Paper Edit collection** (PROPOSED path)
   - Wording: "More pens, papers and tape, picked the same way: [The Paper Edit](PATH-PENDING)."
   - Do not publish until a collection path exists and its products pass the same Amazon gate.

## Product-id wiring (renderer, informational)

Per E2, a `productEdit` block should reference product ids, one disclosure under the block. None of A01's products exist as product records yet; ids are not invented here. A developer creates them from PRODUCTS.md after Cowork verification.
