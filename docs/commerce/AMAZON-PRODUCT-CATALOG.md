# Amazon product catalog (human register)

This is the human-readable register of specific, verified Amazon products. The machine-readable catalog is `src/data/catalog.generated.ts`, produced from a researched CSV by `bun run import:products` (script `scripts/import-products.mjs`, wired in `package.json` as `import:products`). Keep this register and the generated file in agreement.

Status at 2026-11-19: **EMPTY.** The site is pre-revenue and not yet public. No specific product has been verified, so no ASIN, brand or listing URL appears anywhere. The cards and product-type records in `src/data/products.ts` are product TYPES that link to an ordinary Amazon search ("Browse options on Amazon").

## Register

| id | name | brand | ASIN | ordinary URL | status |
|---|---|---|---|---|---|
| (none yet) | | | | | |

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

1. Populate the first candidates for the flagship articles: junk-journaling-supplies-for-beginners, how-to-start-air-dry-clay, how-to-host-a-mahjong-night. Per slot in `docs/commerce/STARTER-KITS.md`, find listings and record ASIN, listing URL and manufacturer URL.
2. Confirm that an `https://www.amazon.com/dp/<ASIN>` link opens the intended product in the US store for each candidate.
