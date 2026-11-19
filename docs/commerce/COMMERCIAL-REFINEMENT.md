# Commercial refinement (2026-11-19)

Why: three independent persona reviews (`docs/marketplace/reviews/REVIEW-2-ARTICLES-TRUST-BUYING.md`, section SHOPPING) scored product desirability 3/10 and willingness to buy 3/10: text-only cards, unknown brands, caveats that cancel the recommendation, six "Another option" cards per slot, generic "Browse options" tiles, a busy checkbox row, no "if you only buy one thing" pick, and pages that contradicted each other about brands and links.

## What changed

**Cards** (`src/components/commerce/ProductCard.tsx`)

- Picture on top: a product photo only when rights are documented (see Photos), otherwise a brand-tinted typographic label (category kicker plus brand) that looks designed.
- Role label ("Essential" or "Optional extra"), short title, brand, one benefit line, one "View on Amazon" button (an ordinary link from `resolveProductLink`; `rel` still follows the registry).
- Removed: "best for", "Worth knowing" limitations, seller wording ("Available on Amazon", third-party notes), "Details checked", the "I need this / I already own this / Save for later" row. One list icon remains ("Add to my shopping list"); it is a different icon from the planner's bookmark so the two are not confused.
- Still never shown: prices, ratings, review counts, discounts, stock, unsupported claims. Validation rejects them in any card text field.

**Blocks** (`ShopSections`, `ShopTheArticle`, `ShopMyHobby`, `StarterKit`)

- "If you only buy one thing" comes first (flagged `onlyOne`, else the first complete kit, else the first essential), then "Start with these", then "Optional extras".
- Alternatives are no longer cards: at most two per slot, as compact "Also consider" lines under the pick, each with a one-line `compare` (`MAX_ALTERNATIVES`). Primary choice: `lead`, then `researched-pick`, then list order; an essential is never displaced by a nice-to-have.
- One short honest note per kit (`Kit.note` in `src/data/kits.ts`) replaces per-card disclaimers (mahjong: American 166-tile sets and a yearly card; pickleball: a tennis racket will not work; and so on).
- "Shop my ... list" is now "Shop your ... kit" (kicker "Shop your hobby").

**Collection pages** (`src/routes/shop*.tsx`): with named picks on the page, the generic "what to look for" search cards fold into "Or browse by product type". `/shop` no longer says "product types, not specific listings" or "no brand claims".

**One wording** (`src/config/affiliate.ts`: `SHOP_LINK_FACTS`, `shopDisclosureSentences`)

- Used by `ShopDisclosure` (under every product block), `AffiliateNote` (mixed pages), `/methodology` and `/affiliate-disclosure`. It says: named products open their own Amazon page, "Browse options" opens a search, no prices, Amazon or the seller sets price, shipping and returns. "We don't currently earn from these links." until an entry is live; then "As an Amazon Associate I earn from qualifying purchases." plus "It never changes what we recommend." The Associates statement is rendered only beside links (the product blocks and `AffiliateNote`), not on `/shop`, `/methodology` or `/affiliate-disclosure` (the last states that it is shown beside links). Activation is still only `affiliateRegistry` in `src/config/affiliate.ts`.
- `/methodology` now describes the two link kinds, the no-brand-claim contradiction is gone, and it has a Photos section.

**Photos** (`src/data/catalog.ts`): optional `imageUrl`, `imageCredit` (and existing `imageRights`, `imageSource`). Validated: needs `imageRights` other than `none`, an `imageCredit` and an `imageSource`, must be https or site-relative, and may not point at Amazon image hosts. `photoFor()` returns a photo only when all of that holds; the card falls back to the typographic label otherwise. No AI images for real branded products. Cowork C12 supplies the permissions.

**Catalog schema and importer**: new optional columns `shortName`, `benefit`, `compare`, `lead`, `onlyOne`, `hold`, `imageUrl`, `imageCredit` (`scripts/import-products.mjs`, `PRODUCT-RESEARCH-TEMPLATE.csv`, `docs/buyer/PRODUCT-CATALOG.md`). `hold` keeps a verified product off the site without touching `status`, so candidates are never styled as verified and nothing is "verified" that was only held.

**Catalog content** (`docs/commerce/product-research.csv`, regenerated into `catalog.generated.ts`): the generated file had gone stale against the CSV (it lacked the 2026-11-19 research and 18 candidate rows). Regenerated: 62 products, 37 verified, 25 candidates; 31 are displayed after 6 holds. Every displayed product now has a short name and a benefit line. Details and what could not be decided without live research: `DESIRABILITY-AUDIT.md`.

## Tests

`src/test/shop.test.tsx` and `catalog-import.test.ts` updated for the new cards, photos, holds, pick and alternatives; new tests cover photo rights, held products, benefit lines on every displayed product, the two-alternative cap and `lead`/`onlyOne`.

## Open items

1. Cowork C12 (live listing check, better or prettier alternatives, photo permissions). Fill `imageUrl`/`imageCredit`/`imageRights`/`imageSource` in the CSV and re-import.
2. Outside the commerce files, wording still says "Shop the hobby" / "Shop the starter pieces" / "Shop the pieces": `src/components/editorial/ArticleBody.tsx` (lines about 153 and 472), `src/components/quiz/ResultsView.tsx` (~317), `src/routes/hobbies.$slug.tsx` (Divider "Shop the hobby"), `title: "Shop the hobby"` in about nine `article-*.ts` files, and the nav label for `/shop`. For the journey "Find a hobby / Make some plans / Shop your hobby" these should read "Shop your hobby". `src/lib/shoplist.ts` still writes "Prices and availability are set by the retailer" in the copied list.
3. Kits with no displayed products (reading journal, craft night, book club, picnic, flower arranging, pickleball, tennis, cozy night in): all rows are candidates or missing.
4. Rows with no photo show the typographic label until rights are documented.
5. `ArticleBody` legacy product-type blocks still use the older generic type cards and `AffiliateNote` wording is now the "general" variant there; pages with named products use the product wording.
6. The reviewers asked for price ranges. By decision this site shows none; if that changes, the validation rules and the methodology wording must change together.
