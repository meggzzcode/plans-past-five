# The Weekend Edit & Girls' Night Kit

STATUS: PREPARED, NOT FOR SALE. No checkout, no payment link, no payment provider chosen. Nothing here is linked from the public site.

**Tagline:** Plan better weekends, solo dates and nights in with friends.

## Product description (draft listing copy)
A 55-page printable kit in nine PDFs. Instant PDF download, US Letter, print as often as you like for yourself. Original designs in the Plans Past Five style (cherry red, butter yellow, strawberry pink and garden green, with a handwritten touch). No account, no subscription, no brands, no affiliate links inside. Fonts are embedded, so the PDFs look the same on every printer.

## What's in the package
| File | Pages | Contents |
|---|---|---|
| 01 Weekend Planner | 10 | How to plan plus eight weekend spreads. |
| 02 Solo Date Cards | 5 | 24 cut-out solo date cards (a different set from the free deck). |
| 03 Girls' Night Activity Cards | 5 | 24 cut-out cards: hosting, craft, games, cozy, active. |
| 04 Craft Night Planner | 5 | Plan on a page, supplies and stations, run of show, twelve project ideas. |
| 05 Book Club Planner | 7 | Club set-up, season reading list, two meeting-notes pages, hosting, ratings. |
| 06 Hosting Checklists | 6 | Seven-day countdown, hosting basics, cozy dinner, game or movie night, after-party reset. |
| 07 Activity Budget Sheets | 5 | Monthly fun budget, per-event budget, split-costs tracker, year summary. |
| 08 Seasonal Bucket Lists | 5 | Spring, summer, autumn and winter lists of 15 ideas each. |
| 09 Planning Templates | 7 | Weekly plan, priority to-do, plan with friends, invitation, monthly social calendar, dotted notes. |

Package: `dist/*.zip` contains the nine PDFs, `START-HERE.txt` and `USAGE-TERMS.txt`.

## Listing images
- previews/cover.png (product cover, 1600x1200)
- previews/preview-1.png (planner cover)
- previews/preview-2.png (weekend spread)
- previews/preview-3.png (girls' night cards)
- previews/preview-4.png (hosting basics)

Copies of these PNGs are in `public/downloads/kit-previews/` for marketing use only (they show sample pages, not the files).

## Customer usage terms
See `USAGE-TERMS.md` (also shipped as `USAGE-TERMS.txt`). **Plain-language draft, not legal advice. Needs owner review** (add business name, contact, refund policy) before any sale.

## Suggested introductory pricing (RECOMMENDATION, not a live price)
Intro range $9 to $15; later $15 to $22. Recommendation only, not a live price.
Reasoning, and what must be verified first, is in `docs/buyer/DIGITAL-PRODUCTS.md`. Storefront fees are not assumed here; Cowork must verify them.

## Buyer activation checklist
1. Read `docs/buyer/DIGITAL-PRODUCTS.md` and pick a storefront type (nothing is connected yet).
2. Have the owner review and finalize `USAGE-TERMS.md`; add a refund and support policy.
3. Verify storefront fees and tax handling, then set a price using the recommendation as a starting point.
4. Create the product listing: paste the description, upload `previews/cover.png` and the preview images, upload the zip from `dist/`.
5. Place a test order yourself. Open the zip, open every PDF, print one page and one card page.
6. Only then add a link from the site (a future task; `src/test/printables.test.ts` currently forbids referencing kit files in public code and must be updated deliberately).
7. To change content: edit `src/*.html` or the generator in `design/kits/_generator/`, then run `node scripts/build-printables.mjs --kits`.
