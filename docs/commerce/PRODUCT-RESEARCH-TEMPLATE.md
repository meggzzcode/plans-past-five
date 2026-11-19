# Product research template: column guide

Header and one example row: `PRODUCT-RESEARCH-TEMPLATE.csv` (copy the header; the example row is a `#` comment the importer ignores, and ids starting `example-`, `fixture-`, `test-`, `demo-` or `sample-` are always rejected). The header is exactly the importer's `COLUMNS` list in `scripts/import-products.mjs`; a test fails if they drift.

Canonical product file: `docs/commerce/product-research.csv`. Validate: `bun run import:products docs/commerce/product-research.csv --check` (writes nothing). Import: `bun run import:products docs/commerce/product-research.csv`. Cowork's work queue (same columns): `docs/cowork/PRODUCT-VERIFICATION-QUEUE.csv`.

File format: comma-separated, UTF-8 (Excel "CSV UTF-8"). Format `asin` and `lastVerified` as plain text so the spreadsheet does not change them. Lists use `|`. Quote any cell that contains a comma.

## Columns

Required = the column must exist in the header; a row may still need a value (see "Needs a value").

| Column | Needs a value | Allowed values / format |
|---|---|---|
| id | yes | kebab-case, unique, e.g. `mr-pen-washi-tape-21-rolls` |
| name | yes | The exact listing title, so the Amazon page can be matched |
| brand | yes | Maker name |
| category | yes | Plain product type, e.g. `Washi tape` |
| description | yes | One neutral factual sentence |
| asin | yes | 10 uppercase letters or digits. Never guessed; placeholders fail |
| amazonUrl | optional | Leave blank: it is derived as `https://www.amazon.com/dp/<ASIN>`. If typed it must equal that, no `?tag=`, `ref=`, `utm_*` |
| manufacturerUrl | optional | https page, no tracking parameters |
| altRetailerUrl | optional | https page, no tracking parameters |
| specs | yes (may be empty list) | `label:value\|label:value`, e.g. `Width:15 mm\|Rolls:10` |
| hobbies | yes | `\|`-list of hobby slugs from `src/data/hobbies.ts` |
| articles | yes (may be empty) | `\|`-list of article slugs; an unknown slug only warns |
| collections | yes (may be empty) | `\|`-list of collection slugs from `src/data/products.ts` |
| kitSlots | yes (may be empty) | `kit/slot\|kit/slot`, must exist in `src/data/kits.ts` |
| role | yes | essential, complete-kit, researched-pick, affordable, aesthetic-upgrade, nice-to-have, later-upgrade |
| isEssential | yes | `TRUE` or `FALSE`. Cannot be TRUE for nice-to-have or later-upgrade |
| audience | yes | Who it suits |
| whySelected | yes | One honest sentence on why this one |
| limitations | yes | `\|`-list, at least one real downside |
| shortName | optional | Card title, 70 characters max |
| benefit | optional | One practical line, 140 characters max |
| compare | optional | For alternatives: how it differs, 140 characters max |
| lead | optional | `TRUE`, `FALSE` or empty: preferred pick for its slot |
| onlyOne | optional | `TRUE`, `FALSE` or empty: the "if you only buy one thing" pick |
| hold | optional | A reason. Keeps a verified product off the site |
| imageUrl | optional | https or site path; never an Amazon image. Needs imageRights, imageSource and imageCredit |
| imageCredit | optional | Required with imageUrl |
| imageSource | optional | Where the permission is recorded. Required when imageRights is not `none` |
| imageRights | optional | none, owned, licensed, retailer-permission |
| researchSources | yes | `\|`-list of https pages the facts were checked against, at least one, no tracking parameters |
| lastVerified | yes | Real date `YYYY-MM-DD`, not in the future |
| availability | optional | available, check-listing, unavailable (default check-listing; unavailable hides the product) |
| affiliateNetwork | optional | Leave empty (no affiliate program is active) |
| affiliateStatus | optional | not-activated, pending, active (default not-activated) |
| status | optional | `candidate` (default, never shown) or `verified` (shown only if valid and not on hold) |
| notes | optional | Internal working notes for researchers. Read by the importer but never stored or published |

## Forbidden content

- No columns for price, rating, stars, review count, discount, coupon, deal, stock, sale or scarcity: the importer rejects the column even when empty.
- No price, discount, "limited time", "only N left" or "best seller" claims inside any text cell.
- No affiliate or tracking parameters in any URL (`tag`, `ref`, `utm_*`, `psc`, `gclid` and similar).
- No unknown columns. Keep side notes in `notes` or a separate sheet.
- Do not mark `status` verified without `lastVerified` and at least one research source; the importer refuses it.

## Importer safety

Nothing is written unless the whole file validates, and the write is atomic. An empty file, the blank template or a header-only file never overwrites the catalog. A write that would leave more than 30% fewer products than the current `src/data/catalog.generated.ts` is refused unless you add `--force`. `--check` is the dry run.
