# Product catalog guide

Products live in `src/data/products.ts`. A product is a product TYPE recommendation ("a beginner watercolor set"), not a listing, until you verify a specific one. Cards are photo-less by default.

## Data model

Required: `id`, `name`, `collection`, `blurb`, `lookFor`, `amazonQuery`, `hobbySlugs`; optional `noSpend`.
Optional verified-research fields:

| Field                                       | Meaning                                            |
| ------------------------------------------- | -------------------------------------------------- |
| `brand`, `manufacturer`                     | As stated on the source page                       |
| `sourceUrl`                                 | https page the facts were checked against          |
| `retailerUrl`                               | Ordinary retailer listing (any retailer)           |
| `exactUrl`                                  | Verified Amazon listing                            |
| `lastVerified`                              | `YYYY-MM-DD` of the check                          |
| `imageRights`                               | `none`, `owned`, `licensed`, `retailer-permission` |
| `audience`, `advantages[]`, `limitations[]` | Editorial notes grounded in the source             |
| `specs[]`                                   | `{label, value}` pairs copied from the source      |

## Rules

- No prices, ratings, review counts or ASINs unless verified, and then with `sourceUrl` and `lastVerified`.
- If `brand`, `manufacturer`, `specs`, `retailerUrl` or `exactUrl` is set, `sourceUrl` and `lastVerified` are mandatory. `validateProduct()` enforces it and `src/test/affiliate.test.ts` fails otherwise.
- Never fabricate links. Leave link fields unset if unsure; the card falls back to an Amazon search.
- Do not show product photos unless `imageRights` is not `none` and the license is recorded in `docs/IMAGE-LICENSES.md`.
- Buttons describe the real destination (search vs listing). Do not write affiliate URLs into records; links are built only by `src/config/affiliate.ts`.
- Keep six products per collection unless you also update the test in `src/test/rules.test.ts`.

## Add a verified product

1. Open the manufacturer or retailer page. Note brand, key specs, and the URL.
2. Add a record (or extend one) with the fields above, `sourceUrl`, and today's `lastVerified`.
3. Put the listing in `retailerUrl` (or `exactUrl` for Amazon).
4. Run `bunx vitest run` and `bunx tsc --noEmit`.
5. Re-verify periodically; stale `lastVerified` values are a signal to recheck.

## The named-product catalog (cards, kits, shopping lists)

Specific products live in `content/products/<id>.json` (one file per product, edited in Pages CMS; owner steps in `docs/buyer/PRODUCT-MANAGEMENT.md`). The build writes `src/data/catalog.generated.ts` (shown products only; never hand-edit it). `docs/commerce/product-research.csv` is the frozen snapshot the 66 records were migrated from.

Card fields you edit in the CSV (all optional except where noted):

| Column                    | What it does                                                                                                                                                   |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `shortName`               | Card title ("Floral washi tape, 21 rolls"). `name` stays the exact Amazon listing title. Max 70 characters.                                                    |
| `benefit`                 | One practical sentence on the card. No prices, ratings or claims you cannot support. Max 140 characters.                                                       |
| `compare`                 | For an alternative: one line on how it differs from the pick. Shown under the pick as "Also consider".                                                         |
| `lead`                    | TRUE makes it the pick for its kit slot (otherwise the "researched-pick", then list order). Max two alternatives per slot are shown.                           |
| `onlyOne`                 | TRUE makes it the "If you only buy one thing" product for its kit, hobby or collection (otherwise the first complete kit, then first essential).               |
| `hold`                    | A reason. The product stays in the catalog but is not shown (poor audience fit, kid-marketed, duplicate). It never changes `status`.                           |
| `imageUrl`, `imageCredit` | A photo. Shown only with `imageRights` owned / licensed / retailer-permission, an `imageSource` recording the permission, and a credit. Never an Amazon image. |

Without a photo the card shows a brand-tinted typographic label. Cards never show prices, ratings, review counts or per-card disclaimers; one short honest note per kit lives in `src/data/kits.ts` (`note`), and the shared disclosure wording lives in `src/config/affiliate.ts` (`SHOP_LINK_FACTS`).
