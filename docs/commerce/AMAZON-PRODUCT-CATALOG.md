# Amazon product catalog (human register)

This is the human-readable register of specific, verified Amazon products. The machine-readable catalog is `src/data/catalog.generated.ts`, produced from a researched CSV by `bun run import:products` (script `scripts/import-products.mjs`, wired in `package.json` as `import:products`). Keep this register and the generated file in agreement.

Status at 2026-11-19: **44 records: 37 `verified`, 7 `candidate`** (counted from `src/data/catalog.generated.ts`; review notes in `docs/commerce/IMPORT-REVIEW.md`). Only `verified` records render publicly; candidates are in the file but never shown. "Verified" means Cowork opened the Amazon listing on 2026-11-18 and the record was reviewed against the product-selection methodology. It means the listing facts were checked, not that anyone on this project has bought or tested the product. Most promoted rows still say "Manufacturer page not yet checked" in their limitations. All links are ordinary non-affiliate `https://www.amazon.com/dp/<ASIN>` links; Amazon Associates is the only affiliate program, nothing has been applied for and nothing is active. The site is pre-revenue and not deployed. The product-type records in `src/data/products.ts` are still product TYPES that link to an ordinary Amazon search ("Browse options on Amazon"). The code keeps an empty-catalog fallback (kits and slots render nothing when no verified product fills them), which is unchanged.

## Register

| id | name | brand | ASIN | ordinary URL | status |
|---|---|---|---|---|---|
| mr-pen-washi-tape-21-rolls | Washi Tape Set, 21 Rolls, Assorted Sizes, Floral | Mr. Pen | B08L5PB8N6 | https://www.amazon.com/dp/B08L5PB8N6 | verified |
| knaid-slim-washi-tape-40-rolls-minimalist | Slim Washi Tape Gift Box Set, 40 Rolls, 10 mm (Minimalist) | Knaid | B0881M69D4 | https://www.amazon.com/dp/B0881M69D4 | verified |
| paperage-blank-journal-160-pages | Blank Journal Notebook, 160 Pages, Medium 5.6 x 8 in (Blush) | PAPERAGE | B08FC38BJ4 | https://www.amazon.com/dp/B08FC38BJ4 | verified |
| scotch-glue-stick-photo-safe-4-pack | Glue Stick, Photo-Safe Adhesive, 1.41 oz, 4-Pack | Scotch | B07BVQFKM8 | https://www.amazon.com/dp/B07BVQFKM8 | verified |
| scotch-6061-tape-runner-3-pack | 6061 Double Sided Adhesive Roller Tape Runner, 0.27 in x 26 ft, Pack of 3 | Scotch | B0FP6NW64R | https://www.amazon.com/dp/B0FP6NW64R | verified |
| knaid-200-piece-vintage-ephemera-cottagecore | 200 Piece Vintage Ephemera Bundle, Cottagecore (Pastel/Earthy Tones) | Knaid | B09TB69V48 | https://www.amazon.com/dp/B09TB69V48 | verified |
| sakura-pigma-micron-8-pack-black | Pigma Micron Fineliner Pens, Black, Assorted Points, 8 Pack | Sakura | B004QHI43S | https://www.amazon.com/dp/B004QHI43S | verified |
| crayola-air-dry-clay-5-lb-bucket | Air Dry Clay, 5 lb | Crayola | B089T7PX27 | https://www.amazon.com/dp/B089T7PX27 | verified |
| shuttle-art-acrylic-paint-15-tubes | Acrylic Paint Set, 15 x 12 ml Tubes | Shuttle Art | B083X67QFX | https://www.amazon.com/dp/B083X67QFX | verified |
| mod-podge-acrylic-sealer-spray-gloss-12-oz | Spray Acrylic Sealer, 12 oz, Gloss | Mod Podge | B003VYD9DM | https://www.amazon.com/dp/B003VYD9DM | verified |
| jongyance-american-mahjong-set-white-tiles | American Mahjong Set with Blue Carrying Bag, 166 White Tiles, 4 All-in-One Racks/Pushers | Jongyance | B0D2TVXS2W | https://www.amazon.com/dp/B0D2TVXS2W | verified |
| tiasusan-american-mahjong-set-blue-tiles | American Mahjong Tile Set, 166 Blue Tiles, Bag and Accessories, 4 All-in-One Racks/Pushers | TIASUSAN | B0F6SDSQGF | https://www.amazon.com/dp/B0F6SDSQGF | verified |
| nmjl-2026-large-size-cards-four-pack | 2026 Mahjong Large Size Cards, Four-Pack Bundle | National Mah Jongg League | B0GRCBQ3Y2 | https://www.amazon.com/dp/B0GRCBQ3Y2 | verified |
| gustaria-large-mahjong-mat-blue-31-5 | Large Mahjong Mat with Black Carrying Bag (Blue, 31.5 in) | GUSTARIA | B0CXJ4PLBY | https://www.amazon.com/dp/B0CXJ4PLBY | verified |
| uhapeer-air-dry-clay-kit-3-lb | Air Dry Clay Kit for Adults, Pottery Set for Beginners | UHAPEER | B0DFH9Z3BC | https://www.amazon.com/dp/B0DFH9Z3BC | verified |
| linphcey-clay-tools-kids-8-plus | Air Dry Clay Tools, Pottery Clay Tool Kit (Ages 8+) | LINPHCEY | B0B45TMWTX | https://www.amazon.com/dp/B0B45TMWTX | verified |
| apple-barrel-16-acrylic-craft-paints-2oz | Vibrant Spectrum Acrylic Craft Paint, 16 Assorted Matte Colors, 2 fl oz | Apple Barrel | B076CP6F36 | https://www.amazon.com/dp/B076CP6F36 | verified |
| mutex-american-mahjong-set-166-walnut-racks | American Mahjong Set, 166 Tiles, 4 Walnut Wooden Racks, Blue Bag | MUTEX | B0FM7P49H7 | https://www.amazon.com/dp/B0FM7P49H7 | verified |
| knaid-grid-washi-tape-14-rolls-15mm | Grid Washi Tape Set, 14 Rolls, 15 mm | Knaid | B08FXQ315R | https://www.amazon.com/dp/B08FXQ315R | verified |
| mr-pen-washi-tape-10-rolls-four-seasons | Washi Tape Set, 10 Rolls, 5.5 Yards/Roll, Four Seasons | Mr. Pen | B0BXJT2NT8 | https://www.amazon.com/dp/B0BXJT2NT8 | verified |
| secopad-glue-tape-runner-4-pack | Scrapbook Tape, Glue Tape for Crafts, 4 Pack, 0.3 in x 26 ft | Secopad | B0CHTZD63Q | https://www.amazon.com/dp/B0CHTZD63Q | verified |
| generic-460-sheet-vintage-scrapbook-paper | 460 Sheets Vintage Scrapbook Paper Kit | not stated on listing | B0DJBKT452 | https://www.amazon.com/dp/B0DJBKT452 | candidate |
| generic-200-sheet-vintage-scrapbook-paper | 200 Sheets Vintage Scrapbook Paper, Journaling Supplies | not stated on listing | B0BXKS3HBR | https://www.amazon.com/dp/B0BXKS3HBR | candidate |
| stationery-island-a5-blank-journal-180-pages | A5 Hardcover Blank Notebook, 120gsm, 180 Pages, Black | Stationery Island | B081VK1CM1 | https://www.amazon.com/dp/B081VK1CM1 | verified |
| plusvivo-felt-game-table-cover-36-blue | Felt Game Table Cover, 36 x 36 in, Blue | Plusvivo | B09CTRNP73 | https://www.amazon.com/dp/B09CTRNP73 | verified |
| protective-sleeve-large-mahjong-card-4-pack | Protective Sleeve for 2025-2026 Mahjong Cards, Large Size, 4 Pack | not stated (listing says not affiliated with any brand) | B0FRSSG8FZ | https://www.amazon.com/dp/B0FRSSG8FZ | candidate |
| nmjl-2026-standard-size-cards-four-pack | 2026 Mahjong Standard Size Cards, Four-Pack Bundle | National Mah Jongg League | B0GRCCTYJ5 | https://www.amazon.com/dp/B0GRCCTYJ5 | verified |
| artecho-48-color-watercolor-set-3-brushes | 48 Colors Watercolor Paint Set, 3 Brushes | Artecho | B0BWRCKFDH | https://www.amazon.com/dp/B0BWRCKFDH | verified |
| transon-8-round-watercolor-brushes | 8pc Round Watercolor Brush Set, Goat Hair | Transon | B06XTMNKVF | https://www.amazon.com/dp/B06XTMNKVF | verified |
| fenorkey-12-round-watercolor-brushes | 12pc Round Watercolor Brushes (Nylon) | FENORKEY | B07WH8T6LH | https://www.amazon.com/dp/B07WH8T6LH | verified |
| arches-watercolor-pad-140lb-cold-press-9x12 | Watercolor Paper Pad, 140 lb, Cold Press, 9 x 12 in | Arches | B01EQHJH10 | https://www.amazon.com/dp/B01EQHJH10 | verified |
| hapikalor-watercolor-pad-140lb-9x12 | Watercolor Paper Pad, 9 x 12 in, 140 lb/300 gsm, 20 Sheets | Hapikalor | B0D5R7JRKZ | https://www.amazon.com/dp/B0D5R7JRKZ | verified |
| bradove-classic-embroidery-kit | Classic Embroidery Learning Kit for Adults and Kids | Bradove | B0B762JW55 | https://www.amazon.com/dp/B0B762JW55 | verified |
| inscraft-304-piece-embroidery-starter-kit | 304 Pack Embroidery Kit, 200 Colors, 5 Bamboo Hoops, 2 Aida Cloth | INSCRAFT | B087RB2K2B | https://www.amazon.com/dp/B087RB2K2B | verified |
| aqueenly-stork-embroidery-scissors-2-pack | Embroidery Scissors, Stork, 2 Pcs, 3.6 in, Gold | AQUEENLY | B07KZPRBQT | https://www.amazon.com/dp/B07KZPRBQT | verified |
| 3-swords-germany-stork-embroidery-scissors | Embroidery Scissors, Stork Scissors, with Synthetic Leather Case | 3 Swords Germany | B0D1Y66RQZ | https://www.amazon.com/dp/B0D1Y66RQZ | candidate |
| crochet-hooks-12-sizes-51-pack-ming-shun | Crochet Hooks 12 Sizes Set, 51 Pack, 2.0-8.0 mm | not stated on listing | B0C33QM3KR | https://www.amazon.com/dp/B0C33QM3KR | candidate |
| crochet-hooks-12-sizes-44-pcs-ergonomic-rp-tech | Crochet Hooks Set, 12 Sizes, 44 Pcs, Ergonomic Rubber Handles | not stated on listing | B09F9B2XTD | https://www.amazon.com/dp/B09F9B2XTD | candidate |
| red-heart-super-saver-white-worsted | Super Saver Yarn, White, Single Skein | Red Heart | B000XZY8Q4 | https://www.amazon.com/dp/B000XZY8Q4 | verified |
| caron-simply-soft-feathered-gray-3-pack | Simply Soft Yarn, Feathered Gray, 3-Pack | Caron | B0BBY2QVV4 | https://www.amazon.com/dp/B0BBY2QVV4 | verified |
| benicci-12-piece-artist-paint-brush-set | Professional Artist Paint Brush Set of 12, Acrylic and Watercolor | Benicci | B0868QQ1X6 | https://www.amazon.com/dp/B0868QQ1X6 | verified |
| auhoahsil-12-round-acrylic-paint-brushes | Acrylic Paint Brushes Set, 12pcs Round-Pointed Tip | not stated on listing | B087W3PT95 | https://www.amazon.com/dp/B087W3PT95 | candidate |
| esrich-8x10-stretched-canvas-10-pack | Stretched Canvases for Painting, 8 x 10 in, 10 Pack | ESRICH | B0CH3K5F62 | https://www.amazon.com/dp/B0CH3K5F62 | verified |
| esrich-8x10-stretched-canvas-5-pack | Stretched Canvas for Painting, 8 x 10 in, 5 Pack | ESRICH | B0D3TWT3TX | https://www.amazon.com/dp/B0D3TWT3TX | verified |

How the pieces fit together: `docs/commerce/SHOPPABLE-ARTICLE-SYSTEM.md`. Columns match the catalog fields in `src/data/catalog.ts`. `status` is `candidate` (found, not yet double-checked, never shown) or `verified` (checked, shown if available). Do not add prices, ratings, review counts, discounts or stock notes to this table.

## Verification procedure (before a row may say "verified")

1. A researcher opens the live Amazon listing and the manufacturer page and records: name, brand, ASIN, what is included, sizes and materials as stated, and every URL used.
2. The ordinary URL is exactly `https://www.amazon.com/dp/<ASIN>` with no tracking or referral parameters.
3. The researcher confirms the listing is available (or marks `check-listing` / `unavailable`).
4. They fill `whySelected`, `audience`, at least one real `limitations` entry and the role (`docs/commerce/PRODUCT-SELECTION-METHODOLOGY.md`).
5. A second check by another person (or the lead on another day) before the status becomes `verified`.
6. `lastVerified` is set to the date of the check.
7. Run `bunx vitest run`; `validateCatalogProduct`, `catalogReferenceProblems` and `filterVerified` in `src/data/catalog.ts` must report no problems.

## CSV workflow

1. Copy the header from `docs/commerce/PRODUCT-RESEARCH-TEMPLATE.csv` (ids beginning `example-` are template rows and are rejected on import).
2. One row per product. Researchers (Cowork) fill rows from the live pages. Leave a cell empty rather than guess.
3. Run `bun run import:products path/to/your.csv`. It validates and regenerates `src/data/catalog.generated.ts` (never hand-edit that file; its header says so).
4. Fix any reported problems and re-run until clean.
5. Update the register table above with id, name, brand, ASIN, ordinary URL and status for every row.
6. Run tests and typecheck, then review the pages that now show the product.

## Rules

- No fabricated ASINs or links. A placeholder ASIN fails validation.
- No affiliate links in this register or in the catalog records. Affiliate tags are added at render time only when an entry is live in `src/config/affiliate.ts` (`docs/buyer/AFFILIATE-ACTIVATION.md`).
- Products that become unavailable are marked `unavailable`, which hides them, and the register row gets a note.
- Photos stay off unless rights are documented (`docs/IMAGE-LICENSES.md`).

## PENDING COWORK

1. Continue C3 toward about 60 products (44 rows now). Open gaps are listed under "Open follow-ups for Cowork" in `docs/commerce/IMPORT-REVIEW.md`: crochet hooks with a named brand, stitch markers and tapestry needle, embroidery needles/fabric/pattern, watercolor palette, paint-night paint, and the 8 kits with no product yet (reading-journal, girls-craft-night, book-club, picnic-adventure, flower-arranging, pickleball, tennis, cozy-night-in).
2. Manufacturer pages are still unchecked for most promoted rows (UNCONFIRMED against maker sources).
3. Re-confirm availability before listing: the 2026-11-18 listing checks will age.
