# Starter kits

Kits are editorially curated shopping lists. They are NOT bundles sold by Plans Past Five and nothing is packaged, fulfilled or priced by the site. Each item points to its own listing. The code constant `KIT_DISCLAIMER` in `src/data/kits.ts` says so on the page: "An editorially curated shopping list, not a bundle sold by Plans Past Five. Each item links to its own listing."

Source of truth: `src/data/kits.ts` (15 kits, checked 2026-11-19). A slot appears publicly only when a verified catalog product fills it (`kitSlots` on the product, `fillKit()` in `src/data/kits.ts`); a kit with no filled slots renders nothing. The catalog now holds 37 verified products (`docs/commerce/AMAZON-PRODUCT-CATALOG.md`), so **7 of the 15 kits render with at least one filled slot** (junk-journaling, watercolor, air-dry-clay, embroidery, crochet, mahjong-night, paint-night) once the site is deployed; the other 8 have no verified product and render nothing. "Verified" means the Amazon listing was opened by Cowork and reviewed, not that we tested the item; all links are ordinary non-affiliate Amazon links. Coverage comes from `docs/commerce/IMPORT-REVIEW.md` and was re-computed from `src/data/catalog.generated.ts`.

Slot needs: **essential** (without it the hobby does not start), **optional** (nice, not needed), **probably own** (most people already have it; do not push a purchase). The `wanted role` is a hint for researchers and maps to the role labels in `docs/commerce/PRODUCT-SELECTION-METHODOLOGY.md`.

Status key: NOT STARTED, PARTIAL (some slots filled by verified products), VERIFIED (all essential slots filled), LIVE (renders on a deployed site; nothing is deployed, so none is LIVE).

| # | Kit id | Kit name | Related article slug (roadmap) | Status |
|---|---|---|---|---|
| 1 | junk-journaling | Junk journaling starter kit | junk-journaling-supplies-for-beginners; how-to-start-junk-journaling | PARTIAL: 5 of 6 slots filled (scissors "probably own" on purpose); all essentials filled |
| 2 | watercolor | Watercolor starter kit | watercolor-painting-for-beginners | PARTIAL: 3 of 6 (paints, brushes, paper filled; palette not researched) |
| 3 | air-dry-clay | Air-dry clay starter kit | how-to-start-air-dry-clay | PARTIAL: 5 of 6 (work-surface "probably own"); all essentials filled |
| 4 | embroidery | Embroidery starter kit | how-to-start-embroidery | PARTIAL: 3 of 6 (hoop, floss, scissors filled; needles, fabric, pattern missing) |
| 5 | crochet | Crochet starter kit | how-to-start-crocheting | PARTIAL: 1 of 5 (yarn only; hooks missing, both hook sets are candidates with no brand stated) |
| 6 | reading-journal | Reading journal kit | how-to-start-a-reading-journal | NOT STARTED |
| 7 | girls-craft-night | Girls' craft night kit | how-to-host-a-craft-night | NOT STARTED |
| 8 | mahjong-night | Mahjong night kit | how-to-host-a-mahjong-night | PARTIAL: 3 of 4 (set, mat, card filled; snack-bowls "probably own") |
| 9 | book-club | Book club kit | how-to-start-a-book-club | NOT STARTED |
| 10 | paint-night | Paint night kit | how-to-host-a-paint-night-at-home | PARTIAL: 2 of 6 (canvas, brushes filled; paint missing) |
| 11 | picnic-adventure | Picnic kit | how-to-plan-a-perfect-picnic | NOT STARTED |
| 12 | flower-arranging | Flower arranging kit | flower-arranging-as-a-hobby | NOT STARTED |
| 13 | pickleball | Pickleball starter kit | pickleball-for-beginners | NOT STARTED |
| 14 | tennis | Tennis starter kit | how-to-start-playing-tennis-as-an-adult | NOT STARTED |
| 15 | cozy-night-in | Cozy night in kit | cozy-solo-dates-at-home (loosely) | NOT STARTED |

## Slots per kit

Format: slot id (need; wanted role).

1. **junk-journaling**: journal (essential; essentials), washi-tape (essential; affordable), adhesive (essential; essentials), scissors (probably own), paper (optional; nice-to-have), pens (optional).
2. **watercolor**: paints (essential), brushes (essential), paper (essential), palette (optional; affordable), masking-tape (probably own), water-jar (probably own).
3. **air-dry-clay**: clay (essential), tools (optional; affordable), paint (essential), brushes (optional), sealer (optional; nice-to-have), work-surface (probably own).
4. **embroidery**: hoop (essential), floss (essential; affordable), needles (essential), fabric (essential), scissors (optional), pattern (optional; complete-kit).
5. **crochet**: hooks (essential), yarn (essential), stitch-markers (optional), scissors (probably own), tapestry-needle (optional).
6. **reading-journal**: journal (essential), pens (essential), bookmark (optional), highlighters (optional), reading-light (optional; nice-to-have).
7. **girls-craft-night**: main-project (essential; complete-kit), shared-tools (essential), table-cover (optional), extra-supplies (optional; nice-to-have).
8. **mahjong-night**: set (essential), mat (optional), card (essential), snack-bowls (probably own).
9. **book-club**: discussion-guide (optional), notebook (optional), bookmarks (optional), snack-bowls (probably own). No essential slot: a book club needs no purchase, which the article should say.
10. **paint-night**: canvas (essential), paint (essential), brushes (essential), palette (optional), aprons (probably own), easel (optional; nice-to-have).
11. **picnic-adventure**: blanket (essential), carrier (optional), cooler (optional), tableware (probably own).
12. **flower-arranging**: snips (essential), vase (essential), frog (optional), water-jar (probably own).
13. **pickleball**: paddles (essential), balls (essential), bag (optional), court-shoes (optional; later-upgrade). The kit dek reminds readers to rent or borrow first.
14. **tennis**: racquet (essential), balls (essential), bag (optional), court-shoes (optional; later-upgrade). The kit dek notes many courts and clubs rent racquets (needs a source before it is stated as fact beyond the dek; PENDING COWORK).
15. **cozy-night-in**: blanket (optional), candle (optional), tea (optional), puzzle (optional), mug (probably own). Everything optional by design: "nothing you have to buy". Check candle and heat safety wording before any product fills the candle slot.

## Editorial rules for kits

- Say plainly what is skippable and what readers probably own. A kit page that says "you may already have most of this" is a good kit page.
- Kits use slots, not fixed products, so a product can be swapped without rewriting an article.
- A product fills at most one slot per kit and each slot shows one product (`fillKit`).
- Never call a kit a bundle, a box we sell, or "our kit". A complete third-party kit listing may fill a `complete-kit` role but is described as that seller's kit.
- The reader-facing role labels are described in `docs/commerce/PRODUCT-SELECTION-METHODOLOGY.md`.

## Analytics

`kit_interaction` is an allow-listed event in `src/lib/track.ts` with `kit` and `slot` parameters. Nothing fires until an analytics ID is configured (`docs/buyer/ANALYTICS-SETUP.md`).

## PENDING COWORK

1. For the 8 kits with no verified product and the open slots listed above, which 1 to 3 listings fill each essential slot? (Procedure: `docs/commerce/PRODUCT-RESEARCH.md`; open items in `docs/commerce/IMPORT-REVIEW.md`.) Optional owner decision: add a `mahjong-night/card-sleeve` slot to `src/data/kits.ts`.
2. Are any slots missing for a true beginner, or any marked essential that most beginners can skip? Answer from source guidance, not from memory.
