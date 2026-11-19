# A3 audit: code, dependencies, features, tests (READ-ONLY)

Branch `editorial-reset`, 2026-11-19. Every number below was measured in /tmp copies (`git archive HEAD`); nothing in the repo was edited, built or served. Judgements are marked JUDGEMENT; everything else is a measurement.
Copies: `/tmp/a3-copy` (baseline, symlinked node_modules), `/tmp/a3-exp` (fresh `bun install` after removals), `/tmp/a3-cms` (content-edit test).

## 0. Headline findings

1. **`src/components/ui/` (46 shadcn files, 4,361 lines) is 100% dead.** Zero files outside `ui/` import any of it (grep of `components/ui`, `../ui`, `./ui`). Its only consumers are other `ui/` files. `src/hooks/use-mobile.tsx` and `components.json` serve only that folder.
2. **39 of 52 dependencies are removable with no source change** (27 Radix, cmdk, embla, input-otp, react-day-picker, react-hook-form, @hookform/resolvers, react-resizable-panels, recharts, sonner, vaul, date-fns, class-variance-authority, tw-animate-css). A 40th (`@tanstack/react-query`) needs a 3-file edit. A 41st (`@tanstack/router-plugin`) is a redundant direct pin.
3. Removal cuts **client CSS 107.1 kB to 58.8 kB raw (-45%)**, client JS only -6.9 kB gzip (-1.7%) because the bundler already tree-shakes the dead UI. Install size 424 MB to 329 MB. The real win is buyer comprehension, audit surface and `bun audit`/Dependabot noise, not page speed.
4. **Only one third-party request is made by pages at load: Google Fonts** (fonts.googleapis.com stylesheet + fonts.gstatic.com). GA4 is off (empty ID). No third-party scripts, no third-party images. Amazon appears only as outbound links.
5. **Only one route needs a server at runtime: `sitemap.xml`** (`server:` handler). Every other page is deterministic from build-time content, yet the site ships as an SSR Netlify function (2.3 MB function bundle). Pre-rendering is a potential large simplification (NOT tested here).
6. The test suite is healthy (754/754 pass) but has **timeout flakiness**: 3 tests take 4.4 to 6.7 s against vitest's 5 s default. In 3 full runs (baseline, exp1, content-edit copy) a different one of these failed under parallel load; they pass in isolation.

## 1. Dependencies

Method: grep of every `from "x"` / `import("x")` in `src/` split into `components/ui/` vs everything else, plus config/scripts. Proof: in `/tmp/a3-exp` I deleted the packages from package.json, removed `src/components/ui`, `use-mobile.tsx`, `components.json` and the `tw-animate-css` import, ran a real `bun install` (versions identical to the repo copy: react-dom 19.2.8, tailwindcss 4.3.3, vite 8.1.7), then tsc / content build / vite build / vitest.

### 1a. Removal results (measured)

| Step | tsc | vite build (NITRO_PRESET=netlify) | vitest | client JS raw / gzip | client CSS raw / gzip | server fn bundle |
|---|---|---|---|---|---|---|
| Baseline | pass | pass | 753/754 (1 timeout flake; 754/754 in a second run) | 1,250,069 / 407,111 B | 107,104 / 18,154 B | 2,312,399 B |
| Exp 1: remove ui/ + 38 deps + tw-animate-css | pass | pass | 753/754 (1 different timeout flake) | 1,250,069 / 407,112 B (identical) | **58,811 / 11,085 B** | 2,305,519 B |
| Exp 2: also remove react-query (edit router.tsx, __root.tsx, app-routing.test.tsx; `createRootRoute({...})`) | pass | pass | **754/754** | **1,225,406 / 400,230 B (-24.7 kB raw, -6.9 kB gzip)** | same | 2,254,102 B (-58 kB) |
| Exp 3: also drop @tanstack/router-plugin | pass | pass | not rerun | same | same | same |
| Exp 3b: also drop eslint-config-prettier | n/a | n/a | n/a | n/a | n/a | **eslint FAILS** (eslint-plugin-prettier/recommended requires it). Keep it. |

Not retested: lint on exp copy (baseline lint: 0 errors, 17 warnings). Caveat: the CSS drop is the combined effect of deleting `ui/` (Tailwind `@source "../src"` scanned its classes) and `tw-animate-css`; I did not separate them. No non-ui file uses `animate-in/out`, `fade-in-`, `zoom-in`, `slide-in-from` (grep), so no visible style should change, but a before/after screenshot pass is needed before approving (visual diff not run).

### 1b. Per-package table

| Package | Used by (src, excluding ui/) | Removable? | Measured effect |
|---|---|---|---|
| 27 x `@radix-ui/*` | only `components/ui/*` | **Yes** (proven) | JS 0; install size |
| cmdk, embla-carousel-react, input-otp, react-day-picker, react-hook-form, @hookform/resolvers, react-resizable-panels, recharts, sonner, vaul | only `components/ui/*` (1 file each) | **Yes** (proven) | JS 0 (tree-shaken); node_modules -95 MB (all of exp1) |
| date-fns | nothing (peer of react-day-picker) | **Yes** (proven) | 0 |
| class-variance-authority | only ui/ (9 files) | **Yes** (proven) | 0 |
| tw-animate-css | `styles.css` import; no non-ui animate classes | **Yes** (proven, combined) | part of CSS -48 kB raw |
| @tanstack/react-query | `router.tsx`, `__root.tsx` plumbing only; **no `useQuery`/`useMutation` anywhere** | **Yes** (proven, 3 small edits) | JS -24.7 kB raw / -6.9 kB gzip; server -58 kB |
| @tanstack/router-plugin | not imported (pulled in by react-start) | Yes, redundant direct pin (proven) | 0 |
| zod | `scripts/content-lib.mjs` (content validation, runs in prebuild) | **No** | n/a |
| clsx, tailwind-merge | `src/lib/utils.ts` `cn()` used by ~15 components | No | tailwind-merge is 88 kB in server bundle; could be replaced by `clsx` only (JUDGEMENT, S) |
| lucide-react | 21 non-ui files | No | per-icon tree-shaking works |
| react, react-dom, @tanstack/react-router, react-start | core | No | |
| @tailwindcss/vite, vite-tsconfig-paths | no direct import, but `@lovable.dev/vite-tanstack-config` dynamically imports both (index.js:1568,1570) | No | |
| tailwindcss | styles.css | No | |
| @lovable.dev/vite-tanstack-config | `vite.config.ts`, `bunfig.toml` | Not without writing a plain vite.config (M, would also drop its dependence on a vendor package and the Cloudflare-default Nitro target that `netlify.toml` overrides by env var) | JUDGEMENT: highest-value dependency simplification after the ui/ purge |
| nitro | peer of the Lovable config; builds the server | No | |
| vite, vitest, @vitejs/plugin-react, jsdom, @testing-library/react, @testing-library/jest-dom, typescript, @types/*, eslint + 6 plugins/configs, prettier | build/test/lint | No (eslint-config-prettier proven required) | |

`@lovable.dev/*` entries in `bunfig.toml` `minimumReleaseAgeExcludes` (7 names, only 1 is actually installed) are Lovable-only leftovers.

## 2. Unused exports, files, lib modules, scripts, Lovable remnants

### 2a. Dead code (measured by cross-reference grep; production = non-test)
- **Whole dead area:** `src/components/ui/*` (4,361 lines), `src/hooks/use-mobile.tsx` (only sidebar.tsx uses it), `components.json`.
- **Exported functions with no production use, no test use, no internal use (10):** `productLinkLabel` (config/affiliate.ts), `changelogDates` (content/changelog.ts), `alternativeIds` (data/catalog.ts), `hasVerifiedResearch` (data/products.ts), `themes` (lib/finder.ts), `hasPin`, `pinsFor` (lib/pins.ts), `savedItemText` (lib/share.ts), type `TonightSearch`, `useIsMobile`. Trivial, S; low value on their own.
- **Many more exports are used only by tests** (e.g. 54 in `lib/planner.ts`, 23 in `lib/tonight.ts`, 9 in `saved-transfer.ts`): exported to be testable, not dead. Not a defect.
- **Modules with no production importer:** `src/content/draft-registry.ts` (13 lines, tests/`content/index.ts` only), `src/data/affiliate-programs.ts` (112 lines; "candidates only, unverified"; used by tests and `scripts/site-health.mjs` per grep; no runtime use). JUDGEMENT: affiliate-programs is research data that does not belong in `src/data`; move to docs or delete (S).
- **Lovable-specific code:**
  - `src/lib/lovable-error-reporting.ts` (70 lines): calls `window.__lovableEvents` / `__lovableReportRuntimeError`, which only exist inside the Lovable editor preview. On Netlify it is a silent no-op. Imported only by `__root.tsx:14,28`. **Not needed. Remove (S).**
  - `.lovable/` dir (20 K), `vite.config.ts` + `bunfig.toml` (still required, see 1b), comment in `src/start.ts` about Lovable Cloud, `public/_headers` and `lib/security-headers.ts` comments: "X-Frame-Options not set because the Lovable editor previews in an iframe". If Lovable is dropped, X-Frame-Options/CSP frame-ancestors can be set (small security gain). `AGENTS.md` and buyer docs describe the Lovable connection.
- `src/lib/error-capture.ts` (81) + `error-page.ts` (30) + `server.ts` (67) + `start.ts` (35): server-side 500 wrapper that preserves stack traces and renders a friendly error page. It was designed for the Lovable log pipeline; on Netlify it only writes to function logs. No tests cover `error-capture.ts`. JUDGEMENT: keep `error-page.ts` (friendly 500), simplify server.ts/error-capture (M) or remove if pre-rendering is adopted.
- Pre-render note: if the site were fully static, `server.ts`, `start.ts`, `error-capture.ts`, `error-page.ts`, the Netlify function and `health:serve` (see below) all become unnecessary.

### 2b. scripts/ (21 files, 4,411 lines; reference counts from package.json / docs/buyer / tests / other scripts)

| Script | Lines | Referenced by | Buyer need |
|---|---|---|---|
| build-content.mjs + content-lib.mjs | 32 + 485 | prebuild, CI, 2 tests, buyer docs | **Essential** (content validation = what protects CMS edits) |
| format-article.mjs | 33 | package.json | Keep (canonical JSON formatting; never prettier on articles) |
| import-products.mjs (+ .d.mts) | 538 + 18 | package.json, buyer docs, 1 test | Essential if catalog is CSV-driven; **simplify candidate** (538 lines for 66 records) |
| site-health.mjs, serve-built.mjs | 184 + 70 | package.json, weekly GitHub Action, buyer docs | Keep health; **`serve-built.mjs` serves `.output`, which a Netlify-preset build does not create** (I confirmed `.output` absent after `NITRO_PRESET=netlify`); works only with the default-preset build. Document or fix (S) |
| inventory.mjs | 193 | package.json, buyer docs | Seller/buyer doc generator; optional |
| check-netlify-ignore.sh | 24 | buyer docs | Keep (tests the deploy-skip rule) |
| check-affiliate-config.mjs | 83 | 2 tests, buyer docs | Keep (affiliate safety guard) |
| ingest-images.mjs + .lib.mjs | 376 + 317 | 1 test (lib), buyer docs | Buyer-useful only if they add photos via script; CMS upload covers the common case. Keep, low priority |
| make-buyer-package.mjs | 276 | buyer docs | **Seller-only** (builds the sanitised transfer zip); exclude from buyer package |
| third-party-notices.mjs | 110 | buyer docs | Seller/legal housekeeping; generates THIRD-PARTY-NOTICES.md (will shrink after dep purge) |
| build-pins.mjs | 346 | buyer docs | Pinterest asset renderer (needs Playwright, not in package.json). Optional/marketing; **fragile for a nontechnical buyer** |
| click-audit.mjs, first-tap-check.mjs, capture-screenshots.mjs | 692 + 132 + 185 | none | **Private QA tooling (need Playwright, not declared). Archive** out of the buyer package |
| amazon-links-inventory.mjs | 121 | none | Private audit; archive |
| convert-articles-to-data.mjs | 86 | none | **One-time migration, already run. Remove/archive** |
| embed-ai-metadata.mjs | 75 | buyer docs | One-off provenance step; archive |
| slice-sheet.py | 35 | none | Unreferenced, Python, off-stack. **Remove** |

Net: buyer needs about 8 scripts (~1,500 lines); about 1,500 lines are private/archival.

## 3. External services and dependencies

Built-output inspection: static page HTML for `/`, `/journal`, `/hobby-finder`, `/make-plans`, `/tools/tonight`, `/saved`, `/shop`, `/hobbies` and one article, served from a default-preset build in /tmp. External hosts in `<link>/<script>/<img>` tags: **only `fonts.googleapis.com` (render-blocking CSS) and `fonts.gstatic.com`**, plus the site's own canonical URL and (on /shop) 5 `www.amazon.com` outbound anchors. 1 script tag per page. In the whole built JS/CSS the only non-link hosts are fonts and `www.googletagmanager.com` string (inert: GA ID empty). Sitemap lists 98 URLs. Dist is 25 MB, of which `public/pins` is 17 MB (88 Pinterest images served from the site).

| Service | Role | Cost (from repo only; I did not read any account) | If it disappears | Buyer comfort (JUDGEMENT) |
|---|---|---|---|---|
| Netlify | Hosts static files + SSR function (`NITRO_PRESET=netlify`) | `netlify.toml` states free plan = 300 credits/month, a production deploy = 15 credits, deploys only on commit marker `[deploy]` or manual Trigger deploy (unverified by me; docs/buyer says hosting UNCONFIRMED) | Site offline until re-hosted; the SSR function makes it harder to move to a pure static host | Medium: the SSR requirement and the deploy-marker trick are non-obvious. Pre-render would make this a commodity static site |
| GitHub | Code, content commits (CMS writes here), Actions CI, weekly health check + monthly digest | Free tier assumed | No source of truth/CMS write path | Comfortable; needed |
| Pages CMS (`.pages.yml`, 294 lines) | Nontechnical editing of `content/` | Free service per its docs (not verified) | Editing falls back to GitHub web UI; docs/buyer/CMS-TEST-PLAN.md says the live CMS test is still pending (the file header says "NOT yet opened in the live Pages CMS app") | Medium: untested end to end |
| Google Fonts | Fraunces, DM Sans, Caveat | Free | Falls back to system fonts, layout shifts | Easy; could self-host (S) to remove the only third-party request and a GDPR-style concern |
| Lovable | Original editor/sync, `vite.config`, error reporting hook | Subscription if used (UNCONFIRMED) | Build still works (config is an npm package); editor sync lost | Low-medium: vendor-named package in the build chain |
| Namecheap / domain registrar | Domain `planspastfive.com` | Only found in `docs/cowork`, `docs/marketplace` (ownership unconfirmed; code has just the placeholder) | No public URL | Standard |
| Amazon Associates | Affiliate income; tracking OFF in `src/config/affiliate.ts` | Free; not transferable, buyer must apply | No revenue; site still works as editorial | Primary commercial risk, not technical |
| Pinterest | Distribution; pins are generated PNGs; `social.pinterest` empty | Free | Lose a traffic channel | Optional |
| GA4 | Optional, ID blank, loads nothing until set | Free | Nothing | Easy |
| Search Console / Bing | Optional | Free | Nothing | Easy |

## 4. Feature removal test

Question per feature: building from scratch today, knowing what we know, would we build it? LOC = route + lib + components (+ data it owns); "Shared data" is not double counted. Test counts are lines of test files that reference the feature (shared files noted). All verdicts are JUDGEMENT.

| Feature | LOC (measured) | Data dependencies | Tests | Maintenance load | Customer value | Build again? | Action |
|---|---|---|---|---|---|---|---|
| Hobby finder quiz (`/hobby-finder`) | 146 route + 422 finder + 212 quiz-flow + 69 quiz-steps + 717 components/quiz = **1,566** | hobbies (43), products, near-terms | quiz-flow 206 lines/21 tests, quiz-results-save, interactions; shares planner tests | Medium: 3 libs + 4 components for 5 to 6 questions | High: the signature "find your hobby" funnel, saves to My Plans | Yes, but smaller | **Simplify** (collapse quiz-flow/quiz-steps/finder into one module; same behaviour) |
| Make Plans planner (`/make-plans`) | 502 route + **1,272 planner.ts** + 483 components + 131 evening-templates = **2,388** | activities (52), hobbies, equipment, products | planner-flow 255, planner-quiz 654, planner-realism 190, wave-b 303, tool-scenarios 713 (~2,100 lines, ~25 s of the 41 s test time) | **Highest.** Combinatorial rules (company x budget x energy x vibe x setting x day) with exhaustive scenario tests | High: the core differentiator, shareable plans | Yes, in a leaner form | **Simplify** (keep UX, reduce option matrix, pre-compute from curated templates) |
| Tonight (`/tools/tonight`) | 342 + **469** + 19 = 830 | activities, hobbies, articles | tonight 77 + part of tool-scenarios, wave-b | High: a second scheduling engine parallel to planner.ts (no shared code; imports only data) | Medium-high: "what do I do now" is a good hook | Not as a separate tool | **Merge** into Make Plans as a "tonight" mode (plan 2b already proposes this); redirect `/tools/tonight` (301, keeps SEO) |
| Hobby budget tool (`/tools/hobby-budget`) | 298 + 161 = 459 | equipment.ts (395), hobbies | costs 133 + tools | Low-medium | Medium; unique, useful, linkable | Probably, small | **Keep / Merge** under Find a Hobby or Shop; Improve only if analytics show use |
| After-hours, Solo-dates, Weekends, Movement, Creative-corner, Better-together (category landers) | 6 x 11 = 66 route lines + CategoryPage 185 + categories.ts 142 = 393 | categories, articles | via a11y/seo tests | Low (templated) | Medium: thin hubs unless article-rich | Reduce | **Merge/Hide:** 6 hubs for 32 articles is quantity; fold into Journal category filters (Journal already exists). 301s needed; **approval required** |
| Hobby directory (`/hobbies`, `/hobbies/$slug`) | 100 + 283 + hobbies.ts **1,861** | 43 hobbies | hobbies 77, rules | **High data weight** (1,861 lines hand-maintained) | High for SEO long tail, but plan keeps 12 signature + 31 light | Yes, but tiered | **Simplify** (12 deep pages, rest light; data tiering) |
| Search (`/search`) | 156 + 398 = 554 | hobbies, articles, products | search 112/12 tests, many cross-refs | Medium | Medium on a ~100-page site; header search is expected | A basic version | **Simplify** (398 lines of concept/stopword logic for a small corpus) |
| Saved / My Plans (`/saved`) | 305 + 103 saved + 258 saved-transfer + 27 + 198 shoplist + 212 components/saved + 37 = **1,140** | localStorage only | saved-transfer 184/13, export-links 156, share-surfaces | Medium (import/export code, shopping list) | High, and approved to stay (heart icon) | Yes, but "export/import code" is exotic | **Simplify** (keep save + shopping list; **Hide/Remove import-export bundle code, 258 lines**: nontechnical users won't use it) |
| Share / export / copy shopping list | share.ts 87 + export-links 33 + ShareActions 126 + ShareButtons + near/TonightExtras ≈ 300 | none | share 42, export-links 156, share-surfaces 187 | Low-medium | Medium-high (viral, practical) | Yes | **Keep** (merge duplicate share components, S) |
| Near-me links (`near.ts`, `Near.tsx`, `near-terms.ts`) | 81 + 100 + 32 = 213 | near-terms (32) | near 71 | Low; privacy-sensitive wording, localStorage | Low-medium | No (Google Maps search link by activity could be a static link) | **Hide or Remove** (JUDGEMENT; low usage likely, adds privacy copy and storage) |
| Season strip / seasonal hobbies | 158 + 100 = 258 | hobbies | season 123 | Low | Medium (homepage freshness without editing) | Yes | **Keep** |
| Pinterest pins (data + build + assets) | pins.ts 48 + 145 + build-pins 346 + design/ 6.5 MB + **public/pins 17 MB** (68% of dist) | pins, hobbies | pins.test 156, wave-b | Medium-high (Playwright, CSV) | Commercial potential, marketing-only | Yes, as marketing assets, not as site code | **Simplify:** move pin images out of `public/` (served to every visitor, 17 MB) into the marketing folder, serve only pins that a page actually shows; **approval** |
| Collection guides (`collection-guide.ts`) | 53 | products | wiring | Low | Medium | Yes | **Keep** |
| Kits (StarterKit + kits.ts) | 171 + 272 = 443; 8 kits | products, hobbies | shop.test (830 lines, 58 tests) | Medium: second product source | High (curated starter kits = luxury-through-curation) | Yes | **Keep / Improve** (the product catalog audit planned must unify kits/products/catalog) |
| Shop (`/shop`, `/shop/$category`, ProductCard etc.) | 155 + 309 + 1,103 commerce + 860 products + 505 catalog + 3,369 catalog.generated = **6,301** | 66 product types, 66 catalog records (37 verified), kits | shop 830, catalog-import 580, affiliate 215 + 3 more | **Highest data liability**: three overlapping product sources | Core commercial surface | Yes, one source | **Improve/Merge** (one authoritative product source; already in plan) |
| Changelog (`/changelog`) | 64 + 40 = 104 | changelog.ts | changelog 47 | Low-medium: a page the owner must keep updating | Low for customers, some trust value | No | **Hide** from nav/footer, or **Remove** (301 to /about); JUDGEMENT |
| Corrections page | 61 + 13 = 74 | corrections.ts | trust-format, seo-trust | Low | Trust/E-E-A-T value | Yes | **Keep** |
| Methodology / Editorial policy / Editorial standards | 99 + 84 + 25 = 208 | none | seo-trust | Low | Trust value, overlap | Merge | **Merge** the three into one "How we work" page (S) |
| Affiliate disclosure / Privacy / Terms / About / Contact / Start-here | 82 + 88 + 59 + 92 + 20 + 150 = 491 | site config | trust tests | Low | Legally needed or trust | Yes | **Keep**; Start-here overlaps homepage (**Merge**, JUDGEMENT) |
| Analytics / track | 85 + 29 = 114 | site config | analytics 96/9 tests | Low (off) | None until buyer sets GA4 | Yes, but minimal | **Keep** (zero cost while off) |
| Error capture + error page | 81 + 30 + (server.ts 67, start.ts 35) = 213 | none | 0 | Low but opaque | None directly | Lean version | **Simplify/Remove** `error-capture.ts`; keep friendly error page |
| Lovable error reporting | 70 | none | 0 | Dead on Netlify | None | No | **Remove** |
| Sitemap + robots | 10 + 43 | articles, hobbies | seo-trust, no-printables | Low | High SEO | Yes | **Keep** (only server route; static-file generation at build would remove the need for SSR) |
| Hero/LCP image machinery (`public/lcp`, images.ts 3 files + generated) | images.ts + extra 182 + generated 104 + 680 kB lcp | images | images, image-ledger | Medium (3 image registries) | Performance | Yes, one registry | **Simplify** (3 image data modules to one) |

## 5. Test suite (55 files, 754 tests, ~8,750 lines incl. setup)

Runtime: full run 47 s wall (77.8 s CPU in tests); `tsc` 8.7 s; eslint 7.3 s. 8 tests exceed 1 s; the 3 slowest (4.4, 4.8, 6.7 s) are exhaustive combinatorial/spawn tests.

**Buyer-critical (keep):** `build-content` (content validation), `content-registry`, `affiliate*` (4 files: guard rails so activating Amazon does not break the site), `amazon-only-promotion`, `no-unsupported-claims`, `no-printables`, `links`, `seo-trust`, `meta-titles`, `manifest`, `a11y`, `contrast`, `wiring` (route 404s), `catalog-import`, `images`, `saved-transfer`, `trust-format`, `publisher-trust-links`, `buyer-docs`.
**Behaviour, keep but slim:** planner/quiz/tonight suites (`planner-flow`, `planner-quiz`, `planner-realism`, `wave-b-tools`, `tool-scenarios`, `tools`, `tonight`, `quiz-flow`): ~2,900 lines. They are over-specific to a planner that is itself recommended for simplification; when the planner is simplified, rewrite as a few invariants (no plan outside waking hours; no unsupported combos), run once, not as 5 overlapping exhaustive files.
**Over-specific / fragile:** `rules.test.ts` hard-codes 43 hobbies, 36 products, 66 product types (also `hobbies.test.ts` 43); `shop.test.tsx` has 33 hard-coded slugs; `trust-format.test.tsx` asserts an exact word count (400); `junk-journaling-consistency`, `round3-fixes`, `wave-b-tools` ("defect N") are historical regression tests named after past fix rounds, not behaviours.
**Slow/flaky:** `tool-scenarios` 12.3 s, `wave-b-tools` 8.2 s, `affiliate-config-independence` 6.7 s (spawns the suite twice). Three tests sit at or above the default 5 s timeout and failed in 3 of 5 full runs under parallel load (a different one each time; all pass alone). Fix: raise per-test timeout or reduce the scenario grid (S).

**What breaks when content is edited in the CMS** (experiment in `/tmp/a3-cms`: long superlative title, "Guaranteed" in dek, one product removed, 5 body blocks removed, a second article switched to draft; `build-content` accepted all of it: "31 published and 3 draft"):
- 5 tests failed: `no-unsupported-claims` (caught "Guaranteed", intended guardrail), `links` + `meta-titles` + `wave-b-tools` pin-destination test (all because the article switched to draft; a pin/meta override/internal link still points to it, i.e. a real broken link the build would have deployed), and one timeout flake.
- Removing a product or body blocks broke nothing.
- Crucial gap: **Netlify's build runs only `build-content` (schema), not vitest or tsc.** The link/meta/pin protections run only in GitHub CI on push to `main` or when a person runs `bun run test`. A CMS-only owner who unpublishes an article ships the broken pin/link silently. Recommendation: add a small "content integrity" check (every internal link/pin/meta override resolves to a published article) to `build-content.mjs` so it fails the deploy in plain English (M).

## 6. Largest maintenance liabilities (measured LOC)

| Area | LOC | Note |
|---|---|---|
| `src/components/ui/` (dead) | 4,361 | zero use |
| `src/test/` | 8,750 | 55 files |
| `src/data/*` | 5,868 (of which `catalog.generated.ts` 3,369, hobbies 1,861, activities 1,191, products 860) | three overlapping product sources |
| `src/lib/` | 4,692 (planner 1,272; tonight 469; finder 422; search 398; saved-transfer 258) | two scheduling engines |
| `src/routes/` | 4,402 (make-plans 502, index 389, tonight 342, journal slug 318, shop category 309, saved 305, hobby-budget 298, hobby slug 283) | |
| `scripts/` | 4,411 | ~1,500 private/archival |
| `src/components/` (non-ui) | 5,211 (commerce 1,103; editorial 1,195; quiz 717) | |
| `content/` | 572 KB, 34 articles JSON (32 published, 2 draft) | |
| `public/pins` | 17 MB, 88 files (of 25 MB dist) | |
| `docs/` | 424 files; docs/marketplace 23 MB, docs/content 15 MB | seller material; most is excluded from buyer package by design |
| Prod TS/TSX source total (incl. ui/ and tests) | 38,251 lines | without ui/ and tests ≈ 25,100 |

## 7. Ranked recommendations

Effort S < 1 day, M 1 to 3 days, L > 3 days. "Approval/backup": B = backup/branch tag required, A = owner approval required (URL or customer-visible change).

| # | Item | Action | Customer experience | Commercial | SEO | Buyer workload | Effort | Approval / backup |
|---|---|---|---|---|---|---|---|---|
| 1 | Delete `src/components/ui/`, `use-mobile.tsx`, `components.json`, 39 unused deps, `tw-animate-css` | **Remove** | none (CSS -45%, faster first paint) | neutral | tiny positive (lighter CSS) | much simpler repo, fewer advisories | S | B; run visual diff first (proven build/tests pass) |
| 2 | Drop react-query plumbing (+ router-plugin pin) | **Remove** | none | neutral | none | simpler mental model | S | B |
| 3 | Delete `lovable-error-reporting.ts`; plan Lovable decoupling (own `vite.config.ts`, drop `.lovable/`, `bunfig` excludes, set X-Frame-Options) | **Remove / Improve** | none | neutral | none | removes vendor name from build chain | S (reporting) / M (config) | B; config swap needs a full build+test pass |
| 4 | Add content-integrity check to `build-content` (links/pins/meta resolve) and stop tests being the only guard | **Improve** | prevents broken pages | protects revenue pages | protects | big (the CMS owner is protected) | M | none |
| 5 | Merge Tonight into Make Plans, retire second engine | **Merge** | simpler nav (plan 2b), one flow | neutral | keep URL via 301 | -830 lines, -1 tool | M | **A** (301 for `/tools/tonight`) |
| 6 | Simplify planner (1,272 lines + 5 test files) | **Simplify** | same UX | neutral | none | removes the biggest liability | L | B |
| 7 | One authoritative product source (products/catalog/kits/equipment) | **Merge** | consistent shop | high (affiliate accuracy) | neutral | high | L | B (already planned) |
| 8 | Fold 6 category landers into Journal categories | **Merge** | clearer IA | neutral | 301s keep equity; risk if hubs rank | -400 lines | M | **A** (URLs) |
| 9 | Move `public/pins` (17 MB) out of the deployed site; serve only displayed pins | **Simplify** | faster, lighter deploys | pins keep for marketing | neutral | smaller deploys/credits | S | **A**, B (pins used on hobby pages) |
| 10 | Remove saved import/export bundle code; keep save + shopping list | **Hide/Remove** | none for typical users | neutral | none | -258 lines | S | A |
| 11 | Hide/Remove changelog; merge methodology + editorial policy + standards; fold Start-here into home | **Hide / Merge** | less nav clutter | trust preserved | 301s | fewer pages to keep true | S | **A** |
| 12 | Near-me feature | **Hide** | negligible | none | none | -213 lines, privacy copy | S | A |
| 13 | Self-host Google Fonts | **Improve** | no third-party request, no layout shift | neutral | LCP slightly better | removes the only external call | S | none |
| 14 | Consider pre-rendering all pages; drop SSR function | **Improve (evaluate)** | faster | neutral | neutral | easier hosting and moves (any static host) | L | B; needs a trial in a copy |
| 15 | Archive private QA/script tooling (click-audit, first-tap, capture-screenshots, amazon inventory, convert-articles, slice-sheet, make-buyer-package, embed-ai-metadata); fix `serve-built.mjs` for Netlify build | **Remove/Hide** | none | none | none | clearer buyer toolbox | S | B (move to seller archive) |
| 16 | Test suite: fix 5 s timeout flakes, rewrite historical "defect N" tests as invariants, drop hard-coded counts | **Improve** | none | none | none | trustworthy CI | M | none |
| 17 | Simplify hobby-finder (3 libs to 1), search (398 lines), image registries (3 to 1) | **Simplify** | none | none | none | -600 lines approx | M | B |
| 18 | Hobby directory tiering (12 deep / 31 light) | **Simplify** | stronger flagship pages | high | positive | less data to maintain | M | Plan A/B already approved |

## Five-line summary
1. `src/components/ui/` (4,361 lines) and 39 of 52 dependencies are provably dead: removal passes tsc, build and 754/754 tests, shrinks client CSS 45% (107 to 59 kB) and install size 424 to 329 MB; react-query removal also saves 6.9 kB gzip JS.
2. The page makes exactly one third-party request (Google Fonts); GA4 is off, Amazon is links only; only `sitemap.xml` needs a server, so pre-rendering to a plain static host is a credible big simplification.
3. Lovable remains in the build (`vite.config.ts`, `bunfig.toml`, `.lovable/`) and in `lovable-error-reporting.ts` (70 lines, a no-op on Netlify): remove the file now, replace the config later.
4. The biggest liabilities are the 1,272-line planner plus a separate 469-line Tonight engine and their exhaustive tests, and three overlapping product data sources (6,301 shop lines); merge Tonight into Make Plans and unify products.
5. The test suite is strong but only guards CMS edits in CI, not in Netlify's build (unpublishing an article ships broken pin/link/meta references); move those checks into `build-content`, and fix 3 tests that exceed vitest's 5 s timeout.
