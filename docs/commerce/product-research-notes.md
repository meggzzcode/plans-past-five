# Product research notes (C3, partial) - read 2026-11-18

Method: each ASIN below was opened on its own amazon.com detail page in the owner's Chrome (title, brand, bullets, availability, seller read as a person would). No prices, ratings or review counts recorded. No SiteStripe/affiliate links used. Manufacturer pages were NOT opened (the web-fetch permission prompt went unanswered), so every row is `status: candidate`, `manufacturerUrl` blank.

## Coverage
| Kit | Rows | Slots filled | Slots not yet researched |
|---|---|---|---|
| junk-journaling | 7 | journal, washi-tape (x2), adhesive (x2), paper, pens | scissors (probably own, skipped on purpose) |
| air-dry-clay | 4 | clay, paint, sealer | tools, brushes (candidates seen, not opened: B0DFH9Z3BC UHAPEER kit, B0B45TMWTX LINPHCEY tools) |
| mahjong-night | 4 | set (x2), card, mat | snack-bowls (probably own) |
Total 14 candidate rows (target was about 26 for the three flagships and about 60 overall).

## Seen in Amazon search but not opened (ASIN from search result data attribute; NOT validated)
B08FXQ315R Knaid Grid washi 14 rolls; B0BXJT2NT8 Mr. Pen 10 rolls; B0CHTZD63Q Secopad tape 4-pack; B0DJBKT452 / B0BXKS3HBR vintage paper packs; B081VK1CM1 Stationery Island journal; B0B45TMWTX, B0DFH9Z3BC clay tools/kit; B076CP6F36 Apple Barrel paints; B0FM7P49H7 MUTEX set with wooden racks; B09CTRNP73 felt game table cover 36 in; B0FRSSG8FZ protective sleeves for 2025-2026 cards; B0GRCCTYJ5 NMJL standard-size cards.

## Rejected
B000J0AZS8 Crayola 25 lb bucket: bulk, wrong size for a beginner.

## Clay safety evidence (secondary sources only, re-check on crayola.com)
- A 2014 Crayola SDS (via a school-supply site) says the product is certified non-toxic by the Art & Creative Materials Institute and conforms to ASTM D-4236. https://cdn.schoolspecialty.com/6def59d9-1456-402d-8d0b-b0f10093639f/1280534_2015-04-07_Original%20file.pdf
- Retail packaging text (Safeway) says "ACMI - AP ... Conforms to ASTM D 4236", drying generally 2-3 days, and not suitable for children under 36 months (choking hazard from small parts). https://www.safeway.com/shop/product-details.960182844.3132.html
- Do NOT claim anything beyond: "non-toxic" is not "edible"; do not describe finished clay as food-safe.
- Mod Podge listing itself advises a fitted respirator and safety eyewear when spraying (amazon.com/dp/B003VYD9DM, read 2026-11-18).

## Needs a decision or approval
1. Approve WebFetch of: crayola.com, mahjongg.com (NMJL release timing for the next card), sakuraofamerica.com, 3m.com/scotch, paperage.com, knaid, mrpen, shuttleart, modpodgerocks.com.
2. Importer: `bun run import:products <csv>` writes src/data/catalog.generated.ts; run only after owner review (I reverted my test run).

## Round 3 (2026-11-18): 13 more rows (total 27), all `candidate`
Each ASIN was opened on its own amazon.com page in the owner's Chrome and title, bullets, seller and stock text were read. No prices, ratings or review counts recorded. Added: UHAPEER clay kit, LINPHCEY clay tools, Apple Barrel 16-pack, MUTEX mahjong set, Knaid grid washi, Mr. Pen 10-roll washi, Secopad tape runners, two vintage paper packs, Stationery Island journal, Plusvivo table cover, mahjong card sleeves, NMJL standard-size cards.
New kit slots introduced: `air-dry-clay/kit`, `mahjong-night/card-sleeve` (importer/site must accept them or map to an existing slot: check before running the importer).
Manufacturer pages: only Sakura (Pigma Micron) was read; the Pigma row now has manufacturerUrl and notes. Crayola and 3M/Scotch fetches failed at the sites (client error); mahjongg.com and modpodgerocks.com redirected and were not followed. So 26 rows still have no manufacturer URL and none can be promoted to `verified`.
Target of about 60 NOT reached (27). Remaining slots not researched: clay brushes, mahjong snack bowls, paper scissors.

## Round 4 (2026-11-18): verify and extend
Maker pages (read as search snippets; WebFetch of crayola.com and 3m.com failed): Crayola 5 lb bucket page and Plaid (Mod Podge) gloss 12 oz page matched their rows, so those two are now `verified`. Apple Barrel (Plaid brand pages) matched at brand level only; the exact 16-colour set was not found, so it stays `candidate`. Scotch: the 1.41 oz glue stick page contradicts itself on "photo safe"; the 6061 runner page was not found. NMJL: no card page found. Pigma: see Round 3.
Added 17 more rows (total 44): watercolor paints/brushes/paper, two embroidery kits, two embroidery scissors, two crochet hook sets, two yarns, three acrylic brush sets (one fills air-dry-clay/brushes and paint-night/brushes), two canvas packs. Each ASIN opened on its own amazon.com page; title, bullets, stock and (where shown) seller read. No prices, ratings or review counts. Winsor & Newton Cotman set (B00004THXI) loaded with no readable text, so it was skipped.
Slot fixes: `air-dry-clay/kit` replaced by `air-dry-clay/clay`; mahjong card sleeves have no slot and are left unassigned (importer must not be given a slot id that kits.ts lacks).
Kits still with NO product: reading-journal, girls-craft-night, book-club, picnic-adventure, flower-arranging, pickleball, tennis, cozy-night-in. Target of about 60 not reached (44).

## Round 5 (2026-11-19)
- Maker-page checks: NMJL store (nationalmahjonggleague.org/store.aspx) confirms 2026 card sizes (standard 5 1/8 x 4 in $14; large 6 1/8 x 4 3/4 in $15, the League's own prices, not Amazon's). Sakura Pigma page confirms archival/waterproof/ACMI claims but lists no sets. Plaid sells a 16 x 2 oz Apple Barrel set with a different colour list than the Amazon set. Scotch pages could not be read (site blocked fetch); search snippets show Scotch double-sided runners but no 6061 page.
- Still not confirmed (stay candidate): Scotch 6061 runner, Scotch glue stick (photo-safe conflict), NMJL four-packs, Pigma 8-pack, Apple Barrel Amazon set.
- 18 rows added, one Amazon page read per ASIN, filling reading-journal, book-club, picnic-adventure, flower-arranging, pickleball, tennis, cozy-night-in (plus mahjong snack-bowls). girls-craft-night still has no row: its slots are generic (main project, shared tools, table cover) and need a decision on which project.
- CSV now 62 rows. All candidate except the 2 maker-verified. No prices, ratings or review counts recorded.

## C12 review (2026-11-19)
See PRODUCT-DESIRABILITY-REVIEW.csv (62 rows: recommendation per product) and product-photo-permissions.md. The review is qualitative; no listing was read live. Counts are in the CSV.

## Round 6 (2026-11-19)
- Girls' craft night kit now has two candidates: PAXCOO 488-piece friendship bracelet kit (main-project) and iBayam 8 in scissors 3-pack (shared-tools); project chosen: friendship bracelets, the easiest of the article's five. Table-cover and extras slots stay empty. CSV now 64 rows.
- Retries: Scotch glue stick RESOLVED (3M pages say acid free, photo safe). Scotch 6061 exists on 3M's page but acid-free/photo-safe conflicts between retailers: do not claim it. NMJL four-packs not on the League site. Pigma 8-pack contents confirmed by retailers, but one distributor says Sakura products may not be sold on Amazon. Apple Barrel: model number matches, colour names differ.
