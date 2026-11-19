# The Plans Past Five Hobby Era Kit

STATUS: PREPARED, NOT FOR SALE. No checkout, no payment link, no payment provider chosen. Nothing here is linked from the public site.

**Tagline:** Find your hobby, test it cheaply, budget for it and make it a habit.

## Product description (draft listing copy)
A 75-page printable kit in nine PDFs. Instant PDF download, US Letter, print as often as you like for yourself. Original designs in the Plans Past Five style (cherry red, butter yellow, strawberry pink and garden green, with a handwritten touch). No account, no subscription, no brands, no affiliate links inside. Fonts are embedded, so the PDFs look the same on every printer.

## What's in the package
| File | Pages | Contents |
|---|---|---|
| 01 Hobby Discovery Workbook | 10 | Free-time audit, energy map, cravings, 36-idea scored menu, six experiment plans, trial scorecard, hobby era plan. |
| 02 Interest Worksheets | 7 | Hobby profile, try-it log, curiosity map, stick-with-it scorecard, compare two hobbies, skill ladder. |
| 03 Hobby Budget Planner | 6 | Monthly cap, purchase tracker, cost per use, wishlist with a wait rule, year at a glance. |
| 04 30-Day Challenge Journal | 6 | Set-up, 30 daily prompts with minutes and mood logging, weekly check-ins, wrap-up. |
| 05 Monthly Hobby Calendar | 14 | Year overview and twelve themed undated month pages. |
| 06 Creative Project Planner | 7 | Brief, materials and budget, step plan, timeline, progress log, finish line. |
| 07 Reflection Journal | 14 | Twelve themed prompt pages plus a how-to page. |
| 08 Printable Activity Cards | 5 | 24 cut-out hobby session cards. |
| 09 Starter Supply Checklists | 6 | Twelve hobby starter lists (types of supplies, no brands or prices) and your own list. |

Package: `dist/*.zip` contains the nine PDFs, `START-HERE.txt` and `USAGE-TERMS.txt`.

## Listing images
- previews/cover.png (product cover, 1600x1200)
- previews/preview-1.png (workbook cover)
- previews/preview-2.png (hobby menu)
- previews/preview-3.png (activity cards)
- previews/preview-4.png (monthly calendar)

Copies of these PNGs are in `public/downloads/kit-previews/` for marketing use only (they show sample pages, not the files).

## Customer usage terms
See `USAGE-TERMS.md` (also shipped as `USAGE-TERMS.txt`). **Plain-language draft, not legal advice. Needs owner review** (add business name, contact, refund policy) before any sale.

## Suggested introductory pricing (RECOMMENDATION, not a live price)
Intro range $12 to $19; later $19 to $27. Recommendation only, not a live price.
Reasoning, and what must be verified first, is in `docs/buyer/DIGITAL-PRODUCTS.md`. Storefront fees are not assumed here; Cowork must verify them.

## Buyer activation checklist
1. Read `docs/buyer/DIGITAL-PRODUCTS.md` and pick a storefront type (nothing is connected yet).
2. Have the owner review and finalize `USAGE-TERMS.md`; add a refund and support policy.
3. Verify storefront fees and tax handling, then set a price using the recommendation as a starting point.
4. Create the product listing: paste the description, upload `previews/cover.png` and the preview images, upload the zip from `dist/`.
5. Place a test order yourself. Open the zip, open every PDF, print one page and one card page.
6. Only then add a link from the site (a future task; `src/test/printables.test.ts` currently forbids referencing kit files in public code and must be updated deliberately).
7. To change content: edit `src/*.html` or the generator in `design/kits/_generator/`, then run `node scripts/build-printables.mjs --kits`.
