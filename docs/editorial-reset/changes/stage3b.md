# Stage 3b: shop collections, quiz-to-product journey, disclosure, doc counts

Branch `worktree-agent-a13abdad3c1de28ae`, fast-forwarded to `editorial-reset` at `7bdec63`, then four commits. Nothing pushed or deployed. Affiliate tracking, `src/config/affiliate.ts`, tracking settings, product status and ASINs untouched (only each product's `collections` tags changed).

Restore a batch with `git revert <sha>` (newest first), or a file with `git checkout 7bdec63 -- <path>`.

| Batch | SHA (message start) | What |
|---|---|---|
| 1 | `20de562` | Doc count fixes (34 files = 32 published + 2 drafts) |
| 2 | `f6ef37a` | Six collections, automatic hiding, 301s |
| 3 | `dd169c8` | One disclosure line per shopping block |
| 4 | `ad6ba4d` | Quiz 6 to 4 questions, one product on the result |

## 1. Six collections

| Old slug | New | Redirect |
|---|---|---|
| journaling-era | `paper` The Paper Edit (journaling, scrapbooking, stationery) | 301 `/shop/journaling-era` -> `/shop/paper` |
| pottery-era | `creative` The Creative Edit (painting, clay, embroidery, crochet) | 301 -> `/shop/creative` |
| creative-girl | `creative` (its journaling products went to Paper) | 301 -> `/shop/creative` |
| bookish-girl | `cozy` The Cozy Edit (reading, puzzles, slow evenings) | 301 -> `/shop/cozy` |
| cozy-after-hours | `cozy` | 301 -> `/shop/cozy` |
| girls-night-in | `hosting` The Hosting Edit (mahjong, craft and paint nights, gatherings) | 301 -> `/shop/hosting` |
| sporty-girl | `sporty` The Sporty Edit (tennis, pickleball, easy movement) | 301 -> `/shop/sporty` |
| little-adventures | `little-adventures` The Little Adventures Edit (picnics, afternoons out) | none: address kept, name changed |

Redirect mechanism: `src/config/redirects.ts` (list + `redirectFor`), `public/_redirects` (same order, `301!`), route layer (`beforeLoad` in `src/routes/shop.$category.tsx`), `src/test/redirects.test.ts` (exact list, no chains, each destination is a current collection and serves the old page's main hobby, route layer returns 301, `_redirects` equals the list, sitemap excludes them). Verified on the built server with curl: each retired slug returns 301 in one hop.

Deviation to decide: three destinations (`cozy`, `sporty`; `cozy` twice) are not live today, so those 301s land on the noindex coming-soon note rather than a live collection. No live collection is genuinely relevant to them. Pointing them at `/shop` instead is a one-line change per entry in the three places above. The old pages were empty of products anyway.

Other changes: product `collections` tags in `content/products/*.json` (rule: kit home collection, else the first hobby's collection; journaling-era rows keep Paper only), `src/data/products.ts` (names plus a plain-words `label` shown beside each name), `equipment.ts` (59 links remapped by hobby), `finder.ts` persona collections, `CategoryPage.tsx` section map, `.pages.yml` dropdown, `creative-hobby-starter-kits-worth-considering` (links and one stale sentence), capture/click-audit scripts. The planner's "Supplies to browse" (`guidesFor`) now offers only live collections. The CSV importer maps old collection names (with a warning) so in-flight research sheets keep working (`LEGACY_COLLECTION_SLUGS` in `catalog-rules.ts`).

## 2. Live versus hidden, automatically

Rule (`src/data/collection-status.ts`): a collection is live when it has at least `MIN_SHOWN_PRODUCTS` (1) shown product tagged to it, or a complete kit. Live: shown on `/shop`, search, sitemap, "More in ..." links, planner links, section pages. Not live: omitted from all of those; its URL renders a short "Coming soon" note, `noindex`. Adding a verified product (or finishing a kit) makes it appear on the next build; nothing to toggle. Raise the constant to demand more.

Today: **live** Paper (7 products, junk-journal kit), Creative (14, two kits), Hosting (9, mahjong kit). **Hidden** Cozy, Sporty, Little Adventures: zero shown products (only candidates awaiting Amazon verification). Tests cover both states with fixtures (`src/test/collection-status.test.tsx`).

## 3. Quiz

Questions: craving, energy, company, budget (dropped Where and How long). The finder runs with where/time open. Over all 216 four-answer combinations 85% give three or more exact matches (old: 68% of 3,456). Old six-answer share links still decode. Result: one product (the hobby's "if you only buy one thing" pick via `selectProducts`) for the first of the three matched hobbies that has one, short disclosure beside it, free "Tonight, try" step below; none on weak results or when none qualifies. The long starter list at the foot of the result was replaced by a link to the hobby page's list. Plan handoff sizes the day by energy when no time was given.

Taps (Playwright, 390 px, `scripts/quiz-taps.mjs`, five simulated visitors):

| | Before | After |
|---|---|---|
| Home to result | 7 (6 for a friendship craving) | 5 (4) |
| Home to Amazon button, when a product is shown | 9 (via "Get my starter list") | 6 |
| Visitors who got a product | 1 of 5 | 2 of 5 |
| Product button position on result page | 3438 px of 5828 | about 1090 px of about 3900 |

## 4. Disclosure

`ShopMyHobby` and `ShopTheArticle` lose their second, long paragraph; each shopping block (hobby, article, kit, quiz result) has one short line beside the pick, still carrying the setting-driven Amazon statement (`affiliate.ts` untouched). Tests: `disclosure-once.test.tsx` (both affiliate states), `disclaimer-reduction.test.ts`.

## 5. Doc counts

Fixed the current-state wording listed in the visual regression report section 5 and `src/test/images.test.ts` comment; audit reports untouched.

## Verification

`tsc` clean, `eslint --quiet` clean, vitest 65 files / 901 tests pass, `build-content` OK, `check-affiliate-config` PASS inactive and active, default and netlify builds succeed (`dist/_redirects` has 18 lines). Screenshots at 1280 and 390 in `/tmp/s3b-shots` (not committed): shop, Creative, Paper, Sporty (coming soon), quiz result with and without product; no console errors, no horizontal overflow.

## Deferred

- The six Pinterest shop pins (design and manifest) still carry old names and URLs; they redirect. Re-make them.
- `reading-book-club` kit is not split (now Cozy's kit; book-club slots could move to Hosting).
- `docs/commerce` research CSVs and product-type docs still use old slugs (history).
- Per-collection WHO_FOR copy is first-draft.
- `MIN_SHOWN_PRODUCTS` is 1 per instruction; the audit suggested 4.
