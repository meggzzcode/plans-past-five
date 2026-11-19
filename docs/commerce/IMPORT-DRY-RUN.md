# Product import: dry run and review guide

The shoppable system ships with an EMPTY verified catalog. Before the researched products arrive, the whole pipeline was exercised with a temporary set of obviously fake products, then removed. This page records what was tested, what broke and was fixed, exactly what happens to a researched CSV, and the checklist for reviewing imported products before any article is published.

No fixture product, fixture screenshot or fixture CSV is in the repository. `src/data/catalog.generated.ts` is `[]`, and `src/test/catalog-import.test.ts` fails if that changes.

## What was tested (Nov 19 2026)

A 12-row fixture CSV was kept outside the repo. It had ids like `fixture-jj-journal` and ASINs like `B0FIXTUR01` (an ASIN is exactly 10 characters; `B0FIXTURE01` is 11 and is correctly rejected). Rows covered the junk journaling, air-dry clay and mahjong kits and the pottery-era, creative-girl, journaling-era and girls-night-in collections. One row was a `candidate` that must stay hidden, one had a very long unbroken product name.

Because the importer refuses `fixture-` ids (by design), the fixture went through a throwaway script that calls the same exported functions (`parseCsv`, `rowToProduct`, `validateCatalogProduct`, `catalogReferenceProblems`) and wrote a temporary `catalog.generated.ts`. The shipped importer needed no bypass flag. A temporary `shopTheArticle` block was added to the junk journaling article for the run. Both files were restored afterwards and checked with `git diff --stat`.

Real pages were rendered in Chromium at 390x844 and 1280x900 (device scale 1):

| Page                                                                    | What was checked                                                                |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `/journal/how-to-start-junk-journaling`                                 | `shopTheArticle` block: numbered essentials, optional upgrades, collection link |
| `/hobbies/junk-journaling`, `/hobbies/air-dry-clay`, `/hobbies/mahjong` | `ShopMyHobby` checklist, essentials vs optional, read-next                      |
| `/shop/pottery-era`, `/shop/creative-girl`                              | Collection checklist plus starter-kit sections with slot labels                 |
| `/hobby-finder` (quiz result)                                           | `ShopMyHobby` for the top matches                                               |
| `/make-plans?...&ids=clay,bake` (planner)                               | `ShopMyHobby` under the itinerary                                               |

### Results

- Cards: name, brand, "Essential/Optional" kicker, reason, "best for", first limitation, "Sold by Amazon", "Details checked <date>". No price, rating, photo or badge anywhere. The `candidate` row never rendered.
- Links: every href was exactly `https://www.amazon.com/dp/<ASIN>`, `target="_blank"`, `rel="noopener"`, no query string. With a temporary approved and active Amazon entry (unit test, `shop.test.tsx`) the href gains only `?tag=...`, `rel` becomes `sponsored noopener`, and the Associate sentence appears on cards, copied text and the print view.
- Disclosure: "Links go to ordinary Amazon product pages. We don't currently earn from them..." appears under every block, with a link to the disclosure page.
- Controls: "I need this" and "I already own this" checkboxes, "Save for later" toggle (`aria-pressed`), "Tick all essentials", "Clear". A product has one status at a time. State survives reload (`ppf:shop-list:v1`).
- Keyboard: Tab order is need, own, save for later, next card; Space toggles checkboxes, Enter toggles save for later; focus ring is a 2px solid outline. Copy and Print are disabled until something is ticked.
- Copy list (clipboard text, verified by reading the clipboard):

  ```
  Junk Journaling shopping list (Plans Past Five)
  Made 2026-11-19. Prices and availability are set by the retailer, so check each listing.

  [ ] FIXTURE Washi tape variety set (Fixture Co)
      Amazon: https://www.amazon.com/dp/B0FIXTUR02

  Already own: FIXTURE Tape runner

  Saved for later: FIXTURE Glue-friendly junk journal, thick pages
  ```

- Print: with `emulateMedia({media:'print'})` and `page.pdf`, only the plain list prints (title, date, ticked items with URLs, saved-for-later line).
- Layout: no horizontal overflow at 390px or 1280px on any page after the fix below.
- Console: no page errors or console errors on any page.

Fixture screenshots were saved to a scratch folder outside the repo and are not committed.

### Defects found and fixed

| Defect                                                                                                                                        | Where                               | Fix                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| A long unbroken product name pushed the page 80-136px wider than a phone (grid children could not shrink)                                     | `ProductCard.tsx`, `StarterKit.tsx` | `min-w-0` and `overflow-wrap:anywhere` on the card and kit cell                                                  |
| Printing produced the list on page 1 plus 5 blank pages (`visibility:hidden` keeps the page's height)                                         | `ShopMyHobby.tsx`                   | Print list is portalled to `<body>`; while printing every other body child is `display:none`. Now exactly 1 page |
| "Saved for later" items were missing from copied and printed lists                                                                            | `shoplist.ts`, `ShopMyHobby.tsx`    | Added a "Saved for later:" line; print view also carries the disclosure when links are live                      |
| A UTF-8 BOM (every Excel "CSV UTF-8" file) corrupted the first header, so every row failed with confusing "id" errors                         | `import-products.mjs`               | BOM stripped; UTF-16 "Unicode Text" decoded; `.xlsx` refused with instructions                                   |
| Semicolon or tab exports gave dozens of field errors                                                                                          | `import-products.mjs`               | One clear "not comma-separated" message                                                                          |
| Unknown columns (for example `notes`) with values were written into the shipped catalog file; price-like columns were only caught when filled | `import-products.mjs`               | Unknown columns are an error; price, rating, review, discount and stock columns are rejected even when empty     |
| Error numbers were row indexes, wrong after comment lines or multi-line cells                                                                 | `import-products.mjs`               | `line N` is the real file line                                                                                   |
| Rows wider than the header (unquoted comma) silently dropped cells                                                                            | `import-products.mjs`               | Error that explains quoting                                                                                      |
| `lastVerified` such as `2026-02-31` passed validation                                                                                         | `catalog.ts`                        | Date must round-trip to the same calendar day                                                                    |
| Duplicate id or ASIN messages named the first row, not the offending one                                                                      | `import-products.mjs`               | Message names both lines                                                                                         |
| A typo in `articles` was never checked                                                                                                        | `import-products.mjs`               | Warning (not blocking, so articles not yet written are allowed)                                                  |
| Fake ids could be imported                                                                                                                    | `import-products.mjs`               | `example-`, `fixture-`, `test-`, `demo-`, `sample-` ids refused                                                  |

### Observed but not changed (outside this scope)

- `/shop/<collection>` renders both `ShopMyHobby` and the starter kits, so the same products can appear twice on a page (ticks stay in sync). The route file is not owned by the commerce work; see the note in `SHOPPABLE-ARTICLE-SYSTEM.md`.
- An article that has both a `shopTheArticle` block and an older `shopHobby` block shows the same products twice. Use one or the other per article.
- Not verified in a real browser: the affiliate-active rendering (covered by the jsdom test only, because activating needs an edit to `src/config/affiliate.ts`), printing on physical paper, Safari clipboard behaviour.

## What happens to Cowork's CSV

1. Export. Google Sheets: File, Download, Comma Separated Values (.csv). Excel: Save As, "CSV UTF-8 (Comma delimited)". Keep the header row from `PRODUCT-RESEARCH-TEMPLATE.csv`. Format `asin` and `lastVerified` as plain text before typing so the spreadsheet does not change them.
2. Validate (writes nothing): `bun run import:products path/to/products.csv --check`. Prints `OK: N products (V verified, C candidates)` or every problem with its line number.
3. Import: `bun run import:products path/to/products.csv`. Same checks; on success regenerates `src/data/catalog.generated.ts` (all rows, candidates included; only `verified` rows render).
4. Review: use the checklist below, with `bun run dev` open on every page that should show products.
5. Publish: commit the regenerated file, then run `bun run lint && bun run typecheck && bun run test && bun run build`. Only then set an article's `status` to published (or add its `shopTheArticle` block). Public pages never show candidates, unavailable items or records that fail validation.

Handled automatically: BOM, CRLF, quoted commas and newlines, doubled quotes, empty trailing rows and columns, `TRUE`/`FALSE`, header names in any letter case, `|` inside free-text columns (only list columns split on `|`), `#` comment lines, UTF-16 files.

## Failure messages and fixes

| Message (abridged)                                                               | Meaning and fix                                                                                                                  |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `this is a spreadsheet file (.xlsx)`                                             | Export as CSV first (see step 1).                                                                                                |
| `not comma-separated`                                                            | Excel saved with semicolons or tabs. Re-export as "CSV UTF-8 (Comma delimited)".                                                 |
| `unknown column "notes"`                                                         | Delete the column or keep it in another sheet. Allowed columns are listed in the message.                                        |
| `column "price" is not allowed`                                                  | Prices, ratings, review counts, discounts and stock are never stored. Delete the column.                                         |
| `missing required column(s): ...`                                                | The header was changed or a column deleted. Copy the header from the template.                                                   |
| `column "id" appears twice`                                                      | A column was duplicated. Delete one.                                                                                             |
| `has N cells but the header has 27 columns`                                      | A cell contains a comma and was not quoted (hand-edited CSV). Open and re-export from the spreadsheet.                           |
| `a quoted cell is never closed`                                                  | A stray `"` in the text. Remove it or double it (`""`).                                                                          |
| `invalid or placeholder ASIN "..."`                                              | ASINs are 10 uppercase letters or digits, copied from the product page URL (`/dp/ASIN`). Placeholder-looking values are refused. |
| `asin ... a spreadsheet probably dropped a leading zero`                         | Digit-only ASIN lost its zero. Format the column as text and retype.                                                             |
| `contains invisible or non-ASCII characters`                                     | Copy-paste brought in a zero-width or smart character. Retype the cell.                                                          |
| `amazonUrl has tracking parameters (tag)`                                        | Remove everything after the ASIN, or leave `amazonUrl` blank; it is derived.                                                     |
| `amazonUrl must equal https://www.amazon.com/dp/ASIN`                            | URL does not match the ASIN (short links like amzn.to are not accepted). Leave it blank.                                         |
| `researchSources needs at least one https url`                                   | Add the pages the facts came from, separated by `                                                                                | `. Must be https, no tracking params. |
| `lastVerified is in the future` or `must be a real YYYY-MM-DD date`              | Use the day it was actually checked. For `11/5/2026`-style values, format the column as text.                                    |
| `id "x" is already used on line N` / `ASIN ... already used`                     | One row per product, unique ids and ASINs.                                                                                       |
| `unknown hobby / collection / kit / kit slot`                                    | Typo. Slugs come from `src/data/hobbies.ts`, `src/data/products.ts` and `src/data/kits.ts`; kit slots are written `kit/slot`.    |
| `specs entry "..." needs the form label:value` / `kitSlots entry ... kit/slot`   | Fix the separator. Entries are separated by `                                                                                    | `.                                    |
| `isEssential must be true or false`; `isEssential cannot be true for role ...`   | Use TRUE or FALSE; optional roles cannot be essential.                                                                           |
| `limitations needs at least one honest note`                                     | Every product needs at least one real downside.                                                                                  |
| `text mentions a price, discount or scarcity claim`                              | Rewrite the sentence without prices, percentages, "limited time", "best seller".                                                 |
| `id "..." starts with "fixture-"` (also `example-`, `test-`, `demo-`, `sample-`) | That row is a placeholder. Delete it or use a real id.                                                                           |
| `(warning) article "..." does not exist yet`                                     | Not blocking. Check the slug is spelled as in `src/content/article-*.ts`, or ignore it if the article is still to be written.    |

## Review checklist before publishing

For each imported product, on a real page at phone and desktop width:

- [ ] The ASIN on the card's link opens the same product the row describes (name, brand, variant). Spot-check at least every `essential`.
- [ ] The link is `https://www.amazon.com/dp/ASIN` with no query string; `rel="noopener"` (or `sponsored noopener` only once affiliate links are live and approved).
- [ ] No price, rating, review count, "best seller", discount or stock wording anywhere on the card, copied list or printout.
- [ ] `whySelected` and `limitations` are specific and honest, not marketing copy; at least one real downside per product.
- [ ] `researchSources` open, support the facts, and `lastVerified` is the actual check date. Listing still available.
- [ ] `isEssential` is true only for things a beginner truly needs; upgrades are optional.
- [ ] Each kit has the essentials slots filled by sensible products; slots that nobody fills simply do not show (confirm that is acceptable).
- [ ] Tagged `hobbies`, `articles` and `collections` put the product where a reader expects it; no unrelated product appears in an article via a broad `collection`.
- [ ] Nothing appears twice on one page (a collection page shows both a checklist and starter kits).
- [ ] Tick, own, save for later, copy and print work; copied text and printout contain only ordinary URLs.
- [ ] The disclosure line is visible under each block and matches the affiliate status.
- [ ] `candidate` rows stay invisible. Flip a row to `verified` only after this checklist.
- [ ] `git diff` shows only `src/data/catalog.generated.ts` changed by the import; lint, typecheck, tests and build pass.
