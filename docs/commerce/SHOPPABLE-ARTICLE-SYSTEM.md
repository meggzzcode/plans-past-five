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
| Tests                                                         | `src/test/shop.test.tsx`, `src/test/catalog-import.test.ts`                           |

Rules enforced in code: only `status: "verified"` records that pass `validateCatalogProduct` and are not `unavailable` ever render. No prices, ratings, review counts, discounts or stock claims (the validator rejects those fields and price-like text). `amazonUrl` must be exactly `https://www.amazon.com/dp/<ASIN>` with no tracking parameters. Cards are photo-less. Components call `resolveProductLink`, so `rel="sponsored"`, tagged URLs and the disclosure sentence switch on automatically when the Amazon entry is activated in `src/config/affiliate.ts`; no component edit is needed.

## Add a verified product

1. Research it (official page, Amazon listing) and add one row to `docs/commerce/product-research.csv`. Canonical product source: `docs/commerce/product-research.csv`. Validate with `bun run import:products docs/commerce/product-research.csv --check`; import with `bun run import:products docs/commerce/product-research.csv`. Column guide: `docs/commerce/PRODUCT-RESEARCH-TEMPLATE.md`. Set `status` to `verified` only after checking; `candidate` keeps it hidden.
2. `--check` validates and writes nothing; every problem is printed with its line number and nothing is written if any row fails. A write that would shrink the catalog by more than 30% is refused unless `--force` is given.
3. Commit the regenerated file. The build re-validates; invalid records are silently excluded from public pages and fail the tests' reference checks.

## Use it

- Hobby page, quiz/planner result, collection or any page: `<ShopMyHobby hobby="watercolor-painting" />` (or `collection="creative-girl"`). It renders nothing when no verified product matches. For a display-only block use `<ShopTheArticle article="slug" hobbies={[...]} />`; for pure logic call `selectProducts(ctx)`.
- Article body blocks: `{ type: "shopTheArticle", articleSlug: "how-to-start-junk-journaling", hobbies: ["junk-journaling"] }` and `{ type: "shopMyHobby", hobby: "junk-journaling" }`. Tag products with the article slug in the CSV `articles` column to feature them.
- Existing `shopHobby` and `starterKit` blocks use the verified catalog automatically when it has products for the same hobbies (based on the first hobby of each listed product); otherwise they render exactly as before.
- Inline mention: `{{product:catalog-id|link text}}` becomes a link only if that product is verified; otherwise plain text.
- Starter kits: `<StarterKit kit="junk-journaling" />`. A slot appears only when a verified product lists it in `kitSlots`. Kits state they are curated shopping lists, not bundles sold by Plans Past Five.

Printing: "Print list" portals a plain list to `<body>` and hides every other body child while printing (one clean page, no blank sheets). "Copy list" and the print view include ticked items, a "Saved for later" line and, only when affiliate links are live, the required disclosure sentence.

Avoid showing the same products twice on one page: `/shop/<collection>` renders both `ShopMyHobby` and `StarterKit`, and a kit slot and a collection tag may select the same product. The ticks stay in sync, but prefer tagging so the two blocks differ, or drop one block on that page. A `shopTheArticle` block with a `collection` also pulls in every product tagged to that collection, so use `collection` only when the whole collection fits the article.

Selection order: products tagged for the article, then matching hobbies, then the collection; de-duplicated by id and ASIN; essentials (`isEssential`) first, optional upgrades after.

## Tracking

`track(event, params)` does nothing until `site.integrations.googleAnalyticsId` is set AND a `gtag` function exists on the page; it never loads a script. Events: `product_impression`, `product_click`, `retailer_outbound_click`, `affiliate_outbound_click`, `shop_article_interaction`, `kit_interaction`, `shoplist_save`, `quiz_complete`, `planner_use`. Only allow-listed id/slug params are sent (see `TRACK_PARAM_KEYS`); never personal data. Update the privacy page and add consent before enabling analytics. `quiz_complete` and `planner_use` are defined for those pages' owners to call; the commerce components do not fire them.

## Still to do (owner / Cowork)

Supply verified research rows (the CSV). Confirm current Amazon Associates wording before activating affiliate links. Update `docs/buyer/AFFILIATE-ACTIVATION.md` if the flow changes.

## Fixes 2026-11-19

- Seller wording: cards say "Available on Amazon", or "Sold by a third-party seller on Amazon: check the listing" for `check-listing` products. Never "Sold by Amazon".
- Alternatives: where several selected products fill one kit slot, one is the primary (the `researched-pick`, else the first in list order; essentials are preferred so an essential slot is never demoted). The rest are alternatives, labelled "Another option for this slot" and listed under "Other options". `selectProducts` returns `alternatives` separately; "Tick all essentials" ticks only primaries. Products with no kit slot keep their own `isEssential`.
- Legacy `shopHobby` / `starterKit` blocks use the catalog only when products are tagged to this article slug, or when the block's product types map to catalog hobbies and at most 4 products result. Otherwise the original product-type cards render. A legacy block never repeats products already shown by an earlier catalog block on the page. `ArticleBody` finds the article slug by body identity (or an `articleSlug` prop).
- `relatedArticles()` now puts declared `related` slugs (published only) first, then computed matches, de-duplicated, same limit.
- Amazon links and the "I need this" / "I already own this" labels are at least 44px tall.

## Commercial refinement 2026-11-19

See `COMMERCIAL-REFINEMENT.md`. Superseded details above: cards no longer show seller wording, "Worth knowing" caveats or "Details checked"; the "I need this / I already own this / Save for later" row is one list icon (the saved items feed the copy and print list); alternatives are no longer separate cards but at most two compact "Also consider" lines under the pick; every block opens with "If you only buy one thing"; "Tick all essentials" is "Add all essentials".
