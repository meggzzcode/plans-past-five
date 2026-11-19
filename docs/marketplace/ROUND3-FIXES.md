# Round 3 fixes (from the blind simulated reviews in `reviews3/`)

The reviews are simulated opinions, not real customer data. Tests: `src/test/round3-fixes.test.tsx` and the new planner block in `src/test/tool-scenarios.test.ts`.

## Fixed

1. **rel on buy links.** Every product/Amazon outbound link (ProductCard, kit rows, saved list, inline `{{product:}}` links, Amazon markdown links) now uses one constant, `OUTBOUND_BUY_REL = "sponsored noopener noreferrer"` (`src/config/affiliate.ts`). A test scans the source and checks rendered cards and kits.
2. **Commission wording.** Terms, Privacy and Affiliate Disclosure all read from `commissionStatement()`. Today: "We don't currently earn from these links..."; once an Amazon entry is live: "We may earn a commission on qualifying purchases at no extra cost to you." Privacy no longer says "so we can earn a small commission".
3. **Grammar.** "low-energy hobbies has more gentle ideas" is now "our guide to low-energy hobbies has more gentle ideas"; same fix for "things to do after work... has more ideas" in the low-energy article. A test blocks plural link text before has/is.
4. **Tonight.** A quiet text link under the three home journeys (not a fourth tile). Each idea card has Save to My Plans (hobbies save as hobbies, other ideas as a note with the first step). "Make it a whole plan" opens the planner with the same time/energy/budget/company/setting and a `with=<activity>` param; the plan is built around that idea (falls back to a normal plan if it cannot be placed).
5. **Planner.** High energy is now a floor (medium or high only), Low and Medium stay ceilings. When a strict vibe leaves the plan under 75% of the chosen length, vibe becomes a preference (matching ideas still rank first) while who, budget, setting and energy stay hard, so "half a day" is no longer one 30-minute item. Ideas flagged `advance` (volunteer shift) are left out of everything except a whole-weekend plan, and out of Tonight. No two ideas of the same family (cooking, walking, painting, paper craft, reading, ball sports, wheels, self-care) on one day. Tonight now uses each idea's real energy field and excludes ideas whose start window never reaches the evening (photo walk).
6. **/saved copy.** A saved plan copies exactly what the planner copies (invite line, times, per-stop cost, total, link) via `src/lib/saved-share.ts`.
7. **Share URL.** Article Copy link, Send to the group chat, planner, Tonight, quiz result and /saved all use `canonicalUrl()` (`site.url`), never `window.location.origin/href`. Native share with copy fallback is unchanged. A test copies and shares from an article and compares the two.
8. **Watercolor.** No smaller set exists in `product-research.csv`, so copy was aligned: the kit says "One small pan or tube set (pick one)", the box brushes are enough, and the 48-colour pick's benefit line says to use three colours at first. The Transon brush set moved to a "nice-to-have" extra, and the article tells readers to pick one small set and start with three colours. No product facts were added.
9. **Filler picks.** `hold` set (rows kept) on the 200-piece ephemera pack and the white-tile duplicate mahjong set.
10. **Heroes.** Four hero reassignments using existing keys. Published articles: max 2 per image and no two neighbouring Journal cards share an image. Across all 34 files the max is 3 (`images.test.ts` limit tightened from 4 to 3).
11. **Quiz tiles.** Image-less options are a compact icon-chip row instead of a tall flat yellow block.
12. **Hygiene.** `.output`, `.wrangler`, `.netlify` and `dist` were already gitignored and untracked; a test now enforces it.

## Partly

- **Hero repeats:** 14 images cannot cover 34 articles at 2 each; the full set stays at 3 per image until more images are ingested. Grid neighbours (vertical) in the three-column Journal grid are not checked.
- **Planner depth:** advance sign-up exclusion is by one flag (`volunteer`); other "check if you need to book" ideas (paint-your-own pottery) are not excluded.

## Not done

- Real product photos, named authors, prices and ratings (business rules forbid inventing them; need real sourcing).
- Contact address (needs the owner's mailbox).
