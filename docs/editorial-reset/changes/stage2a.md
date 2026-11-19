# Stage 2a change record: centralised product management

Branch `worktree-agent-a12e064723b57e1d8` (from `editorial-reset`, merged with it at the end, including Stage 1, Stage 2b and the settings file). Nothing pushed, nothing deployed, no ASIN/price/rating invented, affiliate tracking untouched (OFF, tag only in `content/settings.json`). Original data stays in git: base commit `9792eb0` holds every removed file. Restore a single batch with `git revert <sha>`; restore a single removed file with `git checkout 9792eb0 -- <path>`.

Commits (oldest first): `351d100` dead mentions to plain wording; `244d699` one product source + gates; `2563a9e` link-type and tag tests (link type later removed); `99d3cb4` search-term list (later removed); `cc034e8` CMS products form + docs; `4b69e96` Amazon-first override: search cards retired, picture record.

## 1. Added / changed
| What | Path | Why | Restore |
|---|---|---|---|
| ONE product source: a JSON file per product, 66 records migrated 1:1 from the CSV (statuses unchanged: 29 shown, 8 held, 29 candidates; hold reasons kept as `statusReason`; `order` preserves the old list order so kit primaries are unchanged) | `content/products/*.json` | owner can edit in Pages CMS; no importer step | `git revert 244d699` |
| Pure rules (types, validation, replacedBy resolution, cycle detection) | `src/data/catalog-rules.ts` (new, no imports so plain node loads it); `src/data/catalog.ts` now re-exports and keeps selection logic | build script needs the same rules the site uses | same |
| Build gate (fails with file, block, field and id): missing/held/discontinued/candidate ids in `{{product:id\|label}}` unless a `replacedBy` chain reaches a shown product; cycles; dead ends; duplicate ids/ASINs; unknown hobby/collection/kit slot/article; malformed mentions; shop-block hobbies; stored tags/affiliate URLs; cleared picture with no file or incomplete record | `scripts/content-lib.mjs` (`readProducts`, `articleReferenceProblems`, `knownRefsFromSource`), `scripts/build-content.mjs` | requirement 3 and 4 | same |
| Generated catalog now holds ONLY shown products plus the retired-id to replacement map; candidates, held products, hold reasons and internal notes no longer ship in client JS (verified in a production build) | `src/data/catalog.generated.ts` (generated), `eslint.config.js` and `.prettierignore` skip it | safe filtering | same |
| Amazon address derived from the ASIN (`amazonUrl` no longer stored); `affiliateUrl` refused outright | `catalog-rules.ts`, product files | tag only ever applied centrally | same |
| Per-product picture record (file under /uploads, alt, source, licence, attribution, rights, private note); shown on cards whenever rights = cleared regardless of tracking state; build requires the file and full record, never ships other rights, never a web address | `catalog-rules.ts`, `content-lib.mjs`, `src/components/commerce/ProductCard.tsx`, `.pages.yml` | owner override (images independent of affiliate state) | `git revert 4b69e96` (also reverts the Amazon-first removals below) |
| Pages CMS `products` collection (status, statusReason, replacedBy, order, ASIN, collections, hobbies, kit slots, picture record ...) | `.pages.yml`; `src/test/product-source.test.ts` checks the form matches the code | edit surface for a nontechnical owner | same |
| CSV importer is now a developer bulk-load tool: writes NEW `content/products/<id>.json` files, never overwrites without `--update`, never deletes, refuses picture columns; removed from owner workflows | `scripts/import-products.mjs`, `.d.mts`, `docs/buyer/PRODUCT-MANAGEMENT.md`, START-HERE, HANDS-ON-RECIPES, PRODUCT-CATALOG, WEBSITE-ARCHITECTURE, README, CLAUDE-HANDOFF | requirement 5 | same |
| `netlify.toml`: `NODE_VERSION = "22"` (build script loads a TypeScript rules file with plain node) | `netlify.toml` | needed for node type stripping | revert the line |

## 2. Removed, merged or retired
| Removed | Reason | Restore |
|---|---|---|
| `src/data/products.ts` product TYPES and `articleProducts` (66 records: blurb, lookFor, amazonQuery, hobbySlugs), `Product` type, `validateProduct`, `getProduct`, `productsFor`, `collectionProducts`. The file keeps the 8 collection definitions, now with a `hobbies` list each (computed from the old type data, same ordering) and no `extraProductIds` | Owner override: no generic Amazon search stand-ins; only verified Amazon products shown | `git checkout 9792eb0 -- src/data/products.ts` |
| Product-type search cards everywhere (`ProductCard` in `src/components/cards/Cards.tsx` used by ArticleBody fallback, hobby pages, collection pages "What to look for / More ideas by product type") | same | `git checkout 9792eb0 -- src/components/cards/Cards.tsx` and the three consumers |
| Site-search entries for the 36 collection types ("Shop pick") | they were the type cards | `git checkout 9792eb0 -- src/lib/search.ts` |
| Hobby `productIds` field (41 seeds + type) | referenced the retired types | `git checkout 9792eb0 -- src/data/hobbies.ts` (the image-ingest tool no longer anchors on it: `scripts/ingest-images.lib.mjs`, `src/test/images.test.ts`) |
| Collection `extraProductIds` | same | with products.ts |
| `collectionGuide().products` and `budget` (no-spend text existed for zero types) | no data behind them | `git checkout 9792eb0 -- src/lib/collection-guide.ts` |
| Article top-level `productIds` (dead: nothing read it) in all 34 articles, in the schema (`scripts/content-lib.mjs`), `src/content/types.ts` and the CMS form | trap field | `git revert` of `99d3cb4` (article files rewritten with `articleToJson`, never prettier) |
| `linkType` / editorial-pick and `imageEmbed` (added then withdrawn the same day) | owner override | only ever existed in commits `2563a9e`, `cc034e8` |
| `docs/commerce/product-research.csv` is now a frozen snapshot (kept, not deleted) | migrated | n/a |

## 3. Article edits (content only, written with `articleToJson`)
- 15 dead inline mentions became plain wording. They pointed at held products and already rendered as plain text, so nothing changes on screen; the new gate refuses unresolved mentions. File | id | label: `affordable-hobbies-under-25` (clay, small acrylic craft paints), `at-home-creative-weekend` (clay bucket, small bottles of acrylic craft paint), `cozy-solo-dates-at-home` (clay), `creative-hobbies-you-can-start-at-home` (paints, clay), `creative-hobby-starter-kits-worth-considering` (clay, paints), `hobbies-to-try-when-life-feels-like-work-sleep-repeat` (clay), `how-to-host-a-craft-night` (paints, clay), `things-to-do-after-work-instead-of-scrolling` (clay, American mahjong set), `things-to-do-on-the-weekend` (clay). Ids: `crayola-air-dry-clay-5-lb-bucket` x9, `apple-barrel-16-acrylic-craft-paints-2oz` x5, `jongyance-american-mahjong-set-white-tiles` x1. Restore: `git revert 351d100`.
- 64 `shopHobby`/`starterKit` blocks: `productIds` (type ids) replaced by `hobbies` (the first hobby of each type, same logic the renderer used). 63 render exactly as before when a verified product exists. One block, in `how-to-get-into-recreational-cycling-as-an-adult` (#14, bike helmets, lights, bells), had only type cards and no hobby; it is dropped (a product that is not verified is not shown). The safety prose in that article is untouched.

## 4. Behaviour changes a reviewer should know
- Blocks and pages that previously fell back to "Find ... on Amazon" cards now render nothing when no verified product exists. 4 of 8 collection pages and about 35 hobby pages lose their search cards (the hobby/collection guide text, kits and verified picks stay). Stage 3 decides how thin collections are presented.
- Planner/Tonight "Supplies to browse" now links to the first collection whose hobby list contains the hobby (14 of 42 hobbies map to a different collection than the old first-type rule; a review of those is a Stage 3 task).
- Product ids are stable; `replacedBy` is followed in `getCatalogProduct` (so saved lists and inline mentions keep working). The render-time fallback for an unknown id (plain text) still exists defensively but cannot occur after the build gate.
- Needs Node 22.18+ for `node scripts/build-content.mjs` (Netlify pinned to 22).

## 5. Open items
- `researchSources` of a replaced product may still cite the old listing; owners update them (documented).
- Kits and collections are still defined in code (`src/data/kits.ts`, `src/data/products.ts`); a kit slot name misspelled in the CMS is caught by the gate, not offered as a dropdown.
- Picture workflow is data-ready but no picture exists yet; authorised photography is Cowork/owner work. Documented in `docs/buyer/PRODUCT-MANAGEMENT.md`.
- Pages CMS has still never been opened against this repo; the products form is written from the documented syntax and checked by a test against the code's enums, not in the live app.
- `src/test/wave-b-tools.test.tsx` planner tests can exceed the 5 s default timeout when the suite runs in parallel (pre-existing; Stage 1 owns reliability). They pass alone.
