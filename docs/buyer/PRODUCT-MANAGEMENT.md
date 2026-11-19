# Product management

> **Can a non-technical buyer manage products alone? No, not today.** The CSV importer (`bun run import:products file.csv`) needs a command line, Bun and git, and affiliate settings live in `src/config/affiliate.ts`. Pages CMS does not cover them (and should not: a wrong affiliate value breaks tracking). No new infrastructure was built. Lowest-effort options:
>
> 1. **Lovable chat / an AI assistant** on the connected project. Prompts that fit: "In src/data/catalog.ts add a verified product with ASIN B0XXXXXXXX, name ..., role ..., for hobby ... following the existing records and rules in docs/buyer/PRODUCT-MANAGEMENT.md; do not add prices or ratings; run the tests." and "In src/config/affiliate.ts set the Amazon tag to YOURTAG-20 and nothing else; run the tests." Then check the diff Lovable shows, and publish in Netlify (Deploys > Trigger deploy > Deploy site). Verify afterwards that a product link opens the right Amazon page.
> 2. **A developer for about 30 minutes** per batch of new products or for an affiliate switch: hand them the filled CSV (`docs/commerce/PRODUCT-RESEARCH-TEMPLATE.csv`) and this file.
>
> Researching the product (checking the listing) is still your job in either case. Publishing uses the same one-button workflow as articles (`docs/buyer/NETLIFY-CREDITS-AND-RELEASES.md`).

Two product layers exist. Know which one you are editing.

| Layer | File | What it is | Public behavior |
|---|---|---|---|
| Product TYPES | `src/data/products.ts` | "A beginner watercolor set": 36 records across 8 collections (pottery-era, creative-girl, sporty-girl, girls-night-in, bookish-girl, little-adventures, journaling-era, cozy-after-hours) | Cards link to an ordinary Amazon search ("Browse options on Amazon") |
| Verified catalog | `src/data/catalog.ts` + generated `src/data/catalog.generated.ts` | Specific, researched products with ASIN and ordinary URL | 62 records on 2026-11-19: 37 `verified` (29 shown, 8 on editorial hold), 25 `candidate` (never shown). Only `status: "verified"` records that pass validation ever render. Verified means the Amazon listing was checked, not that the product was tested; links are ordinary non-affiliate Amazon links. An empty catalog still falls back to rendering nothing |
| Kits | `src/data/kits.ts` | 15 kits as slots filled by verified products | A kit renders only when a verified product fills a slot; 7 of 15 kits have at least one (`docs/commerce/STARTER-KITS.md`) |

Counts checked 2026-11-19.

## Rules you must keep

- No prices, ratings, review counts, discounts or stock claims anywhere (validators reject them).
- No ASIN unless verified. No fabricated links. Ordinary Amazon links are exactly `https://www.amazon.com/dp/<ASIN>`.
- Affiliate tags are added only by `src/config/affiliate.ts`, never typed into records.
- Photo-less cards unless image rights are documented (`docs/IMAGE-LICENSES.md`).
- Buttons say what the destination is. Do not add a cart button (`docs/commerce/AMAZON-CART-RESEARCH.md`).
- Role labels describe function; internal scoring is never shown (`docs/commerce/PRODUCT-SELECTION-METHODOLOGY.md`).

## Edit a product type

Edit its record in `src/data/products.ts`. Keep six per collection unless you also update the test in `src/test/rules.test.ts`. Run `bunx vitest run`.

## Add a verified product

Full process: `docs/commerce/PRODUCT-RESEARCH.md`. Short version: fill a row of `docs/commerce/PRODUCT-RESEARCH-TEMPLATE.csv` from the live listing and manufacturer page, run `bun run import:products path/to/your.csv`, run tests, then record it in `docs/commerce/AMAZON-PRODUCT-CATALOG.md`.

## Remove or retire a product

Set `availability: "unavailable"` (it then hides) or delete the CSV row and re-import, then update any article text that names it. Record the change in the human register.

## Re-verify

Keep `lastVerified` current. Recheck listings before updating an article and during the monthly routine (`docs/buyer/MONTHLY-MAINTENANCE.md`); check that links still go where their buttons say (`docs/SOP-affiliate-link-check.md`).

## Starter kits

`docs/commerce/STARTER-KITS.md`. Add a slot by editing `src/data/kits.ts`; map a product to it with `kitSlots` (`kit/slot`) in the CSV.

## Switching affiliate programs

`docs/buyer/AFFILIATE-ACTIVATION.md`. Products need no edits; links follow the registry.

## Not included

Prices, stock and ratings are never stored. If you want them shown, you must read the program's current terms first (re-read live) and change the validators knowingly. This is not recommended.
