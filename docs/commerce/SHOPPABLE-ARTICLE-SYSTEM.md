# Shoppable article system

Readers get a curated list of specific, verified products with honest reasons, can tick what they need, mark what they already own, then copy, print or save the list and open ordinary Amazon product pages. Frontend-only: localStorage, no accounts, no cart. There is no add-to-cart button, because Amazon cart integration has not been verified. The checklist plus per-product links is the honest version.

## How it fits together

| Piece                                                         | File                                                                                  |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Catalog types, validator, `verifiedCatalog`, `selectProducts` | `src/data/catalog.ts`                                                                 |
| Researched rows (generated, EMPTY at launch)                  | `src/data/catalog.generated.ts`                                                       |
| 15 starter kits as slots, `fillKit`                           | `src/data/kits.ts`                                                                    |
| Product-TYPE recommendations (older, search links)            | `src/data/products.ts`                                                                |
| Link building, disclosure, affiliate switch                   | `src/config/affiliate.ts` (`resolveProductLink`)                                      |
| Card, disclosure                                              | `src/components/commerce/ProductCard.tsx`                                             |
| Article/hobby/collection block                                | `src/components/commerce/ShopTheArticle.tsx`                                          |
| Reusable checklist (copy, print, restore)                     | `src/components/commerce/ShopMyHobby.tsx`                                             |
| Starter kit block                                             | `src/components/commerce/StarterKit.tsx`                                              |
| Checklist storage (`ppf:shop-list:v1`), copy text             | `src/lib/shoplist.ts`                                                                 |
| Analytics vocabulary (no-op by default)                       | `src/lib/track.ts`                                                                    |
| CSV importer                                                  | `scripts/import-products.mjs`, template `docs/commerce/PRODUCT-RESEARCH-TEMPLATE.csv` |
| Tests                                                         | `src/test/shop.test.tsx`                                                              |

Rules enforced in code: only `status: "verified"` records that pass `validateCatalogProduct` and are not `unavailable` ever render. No prices, ratings, review counts, discounts or stock claims (the validator rejects those fields and price-like text). `amazonUrl` must be exactly `https://www.amazon.com/dp/<ASIN>` with no tracking parameters. Cards are photo-less. Components call `resolveProductLink`, so `rel="sponsored"`, tagged URLs and the disclosure sentence switch on automatically when the Amazon entry is activated in `src/config/affiliate.ts`; no component edit is needed.

## Add a verified product

1. Research it (official page, Amazon listing). Fill one row of `docs/commerce/PRODUCT-RESEARCH-TEMPLATE.csv` (arrays use `|`, specs are `label:value`, kit slots are `kit/slot`, dates `YYYY-MM-DD`). Set `status` to `verified` only after checking; use `candidate` to keep it hidden.
2. Run `bun run import:products path/to/file.csv`. It prints precise errors and writes nothing if any row fails; otherwise it regenerates `src/data/catalog.generated.ts`. Rows with ids starting `example-` are rejected.
3. Commit the regenerated file. The build re-validates; invalid records are silently excluded from public pages and fail the tests' reference checks.

## Use it

- Hobby page, quiz/planner result, collection or any page: `<ShopMyHobby hobby="watercolor-painting" />` (or `collection="creative-girl"`). It renders nothing when no verified product matches. For a display-only block use `<ShopTheArticle article="slug" hobbies={[...]} />`; for pure logic call `selectProducts(ctx)`.
- Article body blocks: `{ type: "shopTheArticle", articleSlug: "how-to-start-junk-journaling", hobbies: ["junk-journaling"] }` and `{ type: "shopMyHobby", hobby: "junk-journaling" }`. Tag products with the article slug in the CSV `articles` column to feature them.
- Existing `shopHobby` and `starterKit` blocks use the verified catalog automatically when it has products for the same hobbies (based on the first hobby of each listed product); otherwise they render exactly as before.
- Inline mention: `{{product:catalog-id|link text}}` becomes a link only if that product is verified; otherwise plain text.
- Starter kits: `<StarterKit kit="junk-journaling" />`. A slot appears only when a verified product lists it in `kitSlots`. Kits state they are curated shopping lists, not bundles sold by Plans Past Five.

Selection order: products tagged for the article, then matching hobbies, then the collection; de-duplicated by id and ASIN; essentials (`isEssential`) first, optional upgrades after.

## Tracking

`track(event, params)` does nothing until `site.integrations.googleAnalyticsId` is set AND a `gtag` function exists on the page; it never loads a script. Events: `product_impression`, `product_click`, `retailer_outbound_click`, `affiliate_outbound_click`, `shop_article_interaction`, `kit_interaction`, `shoplist_save`, `quiz_complete`, `planner_use`. Only allow-listed id/slug params are sent (see `TRACK_PARAM_KEYS`); never personal data. Update the privacy page and add consent before enabling analytics. `quiz_complete` and `planner_use` are defined for those pages' owners to call; the commerce components do not fire them.

## Still to do (owner / Cowork)

Supply verified research rows (the CSV). Confirm current Amazon Associates wording before activating affiliate links. Update `docs/buyer/AFFILIATE-ACTIVATION.md` if the flow changes.
