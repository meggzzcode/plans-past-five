# Stage 3a: navigation and customer-journey simplification

Branch `worktree-agent-ad9b6c010f8bafa38`, based on `editorial-reset` at `101e08b`. Nothing pushed, deployed or activated (affiliate tracking untouched; `src/config/affiliate.ts` not modified).

Restore any batch with `git revert <sha>` (each commit is independent enough to revert in reverse order). Restore a single file with `git checkout 101e08b -- <path>`.

## Commits

| Batch | SHA | What |
|---|---|---|
| 1 | `bb92292` | Four-destination header, heart for My Plans, seven-link footer |
| 2 | `182bd88` | Tonight folded into Make Plans; 301s; hide postcode box, backup panel, Hobby Budget |
| 3 | `68919dc` | Homepage reduced to hero, three journeys, one editorial row |
| 4 | `69b73ab` | One shopping-links line per shop page; trim repeated copy |
| fixes | `4a6d457`, `62423c9` | /tools/tonight redirects in one hop and keeps saved answers; Tonight answers stay numeric on /make-plans |

## Navigation: before and after

| | Before | After |
|---|---|---|
| Desktop header interactive items | 14 (wordmark, 4 links, search, bookmark, "Find Your Thing" button, 6 mood links) | 7 (wordmark, Find a Hobby, Make Plans, The Shop, The Journal, search, heart) |
| Mobile header | 4 (wordmark, search, bookmark, menu) | 4 (wordmark, search, heart, menu) |
| Mobile menu | 20 items (1 CTA, 4 start, 6 moods, 4 more, 5 fine print) | 8 (4 destinations plus About, Contact, Affiliate Disclosure, Editorial Standards) |
| Footer links | 25 | 7 (Privacy, Terms, Affiliate Disclosure, Editorial Standards, About, Contact, Sitemap) |
| Homepage links in `<main>` | 31 | 7 (3 journeys, 3 articles, "More ideas") |
| Homepage sections | 8 | 3 (hero, three journeys, curated editorial row) |

Measured in a production build with Playwright at 1280 and 390 (screenshots in `/tmp/s3a-shots`, not committed).

Files: `src/components/layout/nav.ts` (new `primaryNav`, `footerNav`, `isFindAHobbyPath`; `NAMES` now Find a Hobby / Make Plans / The Shop), `Header.tsx`, `Footer.tsx`.
- "Find a Hobby" is `/hobbies` and is highlighted on `/hobbies/*` and `/hobby-finder` (the quiz); the hobbies page already leads with the quiz button.
- The six mood pages leave the header, menu and footer and are reached from a "Browse by mood" chip row on `/journal` (`src/routes/journal.index.tsx`). They stay as pages (phase two will turn them into Journal topics).
- Methodology, Corrections and the editorial policy were NOT merged: the pages cover different things (a methodology and a corrections log); merging was not clean. They are only unlinked from the footer and menu. `trustLinks` in `src/config/trust-links.ts` is unchanged and still used where those pages are linked in context.
- Heart: lucide `Heart`, `aria-label="My Plans"`, the count badge is kept (verified on mobile after saving one hobby).
- The sticky red "Professionally off duty." banner is unchanged (A1 suggests removing it; not in the approved scope).
- Restore: `git revert bb92292`.

## Tonight into Make Plans

- New `src/components/planner/TonightMode.tsx` is the old Tonight page body, moved unchanged (same `src/lib/tonight.ts` engine, same save/share/shuffle). `src/routes/make-plans.tsx` now has a two-link switch ("Tonight" | "Plan ahead", real links, no scripts needed) and renders `TonightMode` or the original planner.
- Mode rule (`makePlansMode`): `?mode=tonight` or `?mode=plan` is explicit; with no mode, any planner answer (`when`, `ids`, `from`, quiz hand-off, saved plan) means the planner; a bare `/make-plans` opens Tonight (results show straight away).
- `tonightHref` now returns `/make-plans?mode=tonight&t=..&e=..&b=..&c=..&w=..&s=..`.
- Old saved Tonight items that point at `/tools/tonight?...` still work through the redirect, answers preserved.
- Scripts `first-tap-check.mjs`, `click-audit.mjs`, `capture-screenshots.mjs` updated to the new URLs.
- Restore: `git revert 182bd88` (also restores the old routes; the redirect infrastructure goes with it).

## Redirects (all 301, each validated)

| From | To | Why it is the right place | Mechanisms |
|---|---|---|---|
| `/start-here` | `/` | Start Here was a longer copy of the homepage; the three journeys are now on home | route (`src/routes/start-here.tsx`), `public/_redirects`, list |
| `/tools/tonight` (query kept: t, e, b, c, w, s) | `/make-plans?mode=tonight` | Tonight is the first mode of Make Plans, same questions and ideas | route (`src/routes/tools.tonight.tsx`), `public/_redirects`, list |
| `/editorial-standards` (existing) | `/editorial-policy` | Older name for the same page | route (existing), `public/_redirects`, list |

- Single source list: `src/config/redirects.ts`. `public/_redirects` mirrors it (forced `301!` so a static file cannot shadow it). Both are asserted by `src/test/redirects.test.ts`, which lists every redirect with its destination, checks no chain/loop, that destinations exist and are not redirected, that the route layer throws a 301 with the right target, that saved Tonight answers survive, that `_redirects` equals the list, and that the sitemap excludes every redirected path.
- Verified against the built Nitro server (`NITRO_PRESET=node-server`, curl): `/start-here` 301 `/`; `/tools/tonight` 301 `/make-plans?mode=tonight`; `/tools/tonight?t=60&e=low&b=free&c=solo&w=indoor&s=2` 301 `/make-plans?mode=tonight&t=60&e=low&b=free&c=solo&w=indoor&s=2` then 200 (one hop); `/editorial-standards` 301 `/editorial-policy`. Playwright followed each to the expected page (Tonight tab current).
- Netlify note: the `_redirects` rule for `/tools/tonight` depends on Netlify merging the visitor's query string with the fixed `?mode=tonight` (documented Netlify behaviour; cannot be run locally). The route-layer redirect covers it regardless when the server function handles the request.
- Pre-existing quirk, not changed: the planner's `?seed=3`-style links get one 307 from TanStack's search canonicalisation (it quotes numeric strings). Tonight answers were made numeric-safe to avoid it for Tonight links.
- Not redirected (deferred, see below): mood pages, methodology, corrections, hobby-budget, changelog, shop collections.
- Sitemap (`src/lib/sitemap.ts`): `/start-here`, `/tools/tonight` and `/tools/hobby-budget` removed; filter also excludes any path in `redirectedPaths`. Sitemap went from 98 to 95 entries.
- Restore the old pages: `git checkout 101e08b -- src/routes/start-here.tsx src/routes/tools.tonight.tsx src/lib/sitemap.ts`, delete `public/_redirects` and the redirect test.
- `src/data/pins.ts` still keys a Pinterest asset to `/tools/tonight` (pins are not deployed; the pins test accepts it). Left for a later pass.

## Homepage

`src/routes/index.tsx`: hero (single H1 and photo, no buttons), "hi, you clocked out. start here:" with the three journeys (Find a Hobby is the highlighted one, Make Plans mentions tonight and the weekend, The Shop), then the curated "Ideas worth stealing" row (the three featured articles, falling back to the newest published ones). Removed: hero buttons and micro-line, the Tonight text link, season strip, shop teaser (with its Amazon line), six mood tiles, closing CTA. "Find your thing" repetition is gone (no copy of it left; "Find a Hobby" appears in the header and the first tile only). `SeasonStrip` and its tests are untouched (component unused on home now; the file stays).
- `/start-here` content is on home; the route redirects.
- Restore: `git revert 68919dc`.

## Disclaimers

- `/shop`: one `ShopDisclosure kind="short"` in the hero (was: hero copy "Ordinary Amazon links, no prices", a second line, one under first buys, one long paragraph at the page bottom). Meta description left as is.
- `/shop/<collection>`: removed the hero disclosure; the kit block keeps its own (commerce component) and the type-level section keeps its one `general` line (mutually exclusive branches).
- Tonight: removed "Nothing is sent anywhere; anything you save stays on this device" and per-idea "(estimate)"; the one approximate-costs footer line stays. Make Plans: "Starting choice, not yours yet" (x3) replaced by one line under the first group; intro shortened.
- My Plans: the "Export to move devices" sentence removed (the panel is hidden).
- Not touched: `src/config/affiliate.ts` (setting-driven Associates statement), the Affiliate Disclosure page, `ShopDisclosure`/`AffiliateNote` components, hobby pages and articles' shop blocks. Test `src/test/disclaimer-reduction.test.ts` locks this. `node scripts/check-affiliate-config.mjs`: PASS inactive and PASS active.
- Restore: `git revert 69b73ab`.

## Hidden (unlinked / switched off, code kept)

| Feature | How hidden | Restore |
|---|---|---|
| Hobby Budget `/tools/hobby-budget` | unlinked from footer, removed from sitemap, page now `noindex` (route and code intact) | revert `182bd88` hunk in `tools.hobby-budget.tsx` and `sitemap.ts` |
| Postcode "Find it near you" box | `SHOW_NEAR_BOX = false` in `src/components/share/Near.tsx` (Tonight, plan result, My Plans call sites gated) | set the flag to `true` |
| My Plans export/import UI | `SHOW_TRANSFER = false` in `src/components/saved/Transfer.tsx` | set the flag to `true` |
| Public changelog `/changelog` | footer link removed; page and sitemap entry intact | re-add to `footerNav` in `nav.ts` |

## Deferred and why

1. Quiz from 6 to 4 questions and the product on the quiz result: the product part needs Stage 2a's product source; cutting questions touches the adaptive flow (`quiz-flow.ts`, `QUIZ_ORDER`, `quiz-meta`, about 5 test suites) and is better done together with the result page change. Recorded for the next stage (A1: drop "Where" and "How long").
2. Mood pages to Journal topics and their six redirects (phase two, per instruction). Until then they are reachable only from the Journal index chips.
3. Merging Methodology and Corrections into Editorial Standards (not a clean merge; pages kept, unlinked from footer).
4. Disclosure repetition inside hobby pages and article shop blocks (`ShopMyHobby`, `StarterKit`, `ShopTheArticle`, `ProductCard.ShopDisclosure` live in `src/components/commerce`, owned by Stage 2a). Recommended there: one line per block.
5. Shop collections (8 to 6), shop index product lists, hobby directory restructure (signature hobbies first, fewer filters), share-bar reduction, sticky banner: not in this scope.
6. `docs/buyer/*` still describe the old nav and Tonight URL (Stage 2c owns those docs); `src/data/pins.ts` key for `/tools/tonight`.

## Verification

`bunx tsc --noEmit` clean; `bunx eslint . --quiet` clean; `bunx vitest run` 59 files, 800 tests pass (baseline 56 files, 772); `node scripts/build-content.mjs` OK (no generated-file changes); `node scripts/check-affiliate-config.mjs` PASS inactive and active; production builds in a /tmp copy for both `netlify` (`dist/_redirects` present with 3 rules) and `node-server` presets succeed. Tests updated rather than deleted: `homepage.test.tsx` (nav), `publisher-trust-links.test.tsx` (footer link), `round3-fixes.test.tsx` (home/Tonight), `seo-trust.test.ts` (sitemap), `share-surfaces.test.tsx`, `a11y.test.ts` (redirect-only routes have no H1). New: `redirects.test.ts`, `make-plans-modes.test.ts`, `disclaimer-reduction.test.ts`.
