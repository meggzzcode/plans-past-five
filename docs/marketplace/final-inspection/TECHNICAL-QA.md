# Technical QA: final inspection

Date: 2026-11-19. Scope frozen (no features added; four small fixes made, each with a test or a verified rebuild).
Method: Playwright (Chromium) at 320, 390 and 1280 px against the production build served by `scripts/serve-built.mjs`
(first the 17:48 build in `.output` for the first pass, then a fresh `bun run build` of the current tree in a temp copy
for the final pass, because other agents were publishing drafts and rebuilding `.output` at the same time).
Evidence files live in the scratchpad (`/tmp/claude-0/qa/*.json`, `*.log`); scripts are listed under "Commands run".

## Result in one line

0 critical, 0 high, 2 medium, 2 low defects found and all 4 fixed; 8 low or informational issues remain (none blocks a sale);
production audit has 0 critical and 9 high advisories, all in build-time or unused packages.

## Snapshot caveat

During this inspection the owner's remediation agents published 5 of the 7 draft articles (27 published became 32) and
edited `scripts/import-products.mjs`, `catalog-import.test.ts` and `shop.test.tsx` in the working tree. My clean full-suite run
(46 files, 659 tests) was taken before those edits; a late re-run showed 4 failures in the two files other agents were still
editing (plus two throwaway `scripts/tmp-sim*.ts` files that fail eslint). None of those files are mine; re-run the suite
when the remediation agents finish.

## Pages and journeys

Legend: PASS / FAIL / NOT TESTED. "3 vp" = 320, 390 and 1280 px. Every PASS row also had: HTTP 200, one h1, no uncaught
JS errors, no failed requests, no horizontal scroll, unless stated.

| Page or journey | Result | Evidence |
|---|---|---|
| Homepage `/` | PASS | 3 vp; CLS 0.003 (4x CPU, slow 3G-like); 0 images without dimensions |
| Desktop navigation | PASS | 1280: header nav links present; keyboard Tab shows skip link first, 40/40 tab stops have a visible focus ring |
| Mobile menu (320, 390) | PASS | opens (20 links, aria-expanded true), closes on Escape |
| Editorial category pages x7 (after-hours, weekends, solo-dates, better-together, creative-corner, movement, + journal index) | PASS | 3 vp each, in sitemap, canonical OK |
| Article pages, first pass 27 published | PASS | 3 vp each; JSON-LD parses (Organization, Article, BreadcrumbList); unique title, description, canonical, og and twitter tags |
| Article pages, final pass 32 published (5 newly published) | PASS | same checks on the rebuilt tree; sitemap lists exactly the 32 published; 2 remaining drafts return 404 and are not in the sitemap |
| Draft articles (7 at first pass) | PASS | `/journal/<draft>` returns 404, absent from sitemap, only product records reference draft slugs in the JS bundle (no draft text) |
| Product cards and shopping collections x8 (`/shop`, 8 collections) | PASS | 12 outbound links on `/shop/pottery-era`, all `rel` contain sponsored and noopener; save buttons toggle `aria-pressed`, persist after reload |
| Shop collection heading order | FAIL (low) | h1 followed directly by h3 on 6 collection pages, see R1 |
| Hobby directory `/hobbies` | PASS | 53 filter chips, two filters combined without error, 3 vp |
| Hobby profiles x43 (31 indexable at first pass, 34 at final pass once 5 drafts were published; 9 noindex) | PASS | indexable ones in sitemap; profiles with no guide serve `noindex, follow` and are absent from the sitemap (by design, `sitemap.ts`); all internal links to them return 200 |
| Hobby quiz, every step | PASS | clicked through 9 steps at 3 vp; result "The Creative Girl" with hobby links |
| Quiz back, forward, refresh | PASS | refresh keeps result; back returns to the previous step (URL changes), forward returns |
| Quiz keyboard only | PASS | 9 answers by Tab and Enter at 3 vp, result reached |
| Quiz invalid params (`q=99`, `q=-3&a=zzzz`, `q=abc&a=<5000 chars>`, `q=7&a=bogus`) | PASS | all 200, corrected in place to step 1, no errors |
| Activity planner, many combinations | PASS | 7 URL variants incl. garbage values (`when=bogus`, `budget=-5`, `seed=99999999999999999999`, 5000-char value) all render, no overflow; unit matrix of 7,616 + 1,344 + 363 planner scenarios passes |
| Planner honours answers | PASS | matrix test asserts: solo never gets social-only ideas, weeknight/evening never weekend wording and stops start after 5 pm, budget cap checked against shown maximum, "free" returns only $0 ideas, indoor/outdoor and at-home honoured, plans restore from ids |
| Planner first tap before hydration, 4x CPU | PASS | `scripts/first-tap-check.mjs`: all checks pass on both builds |
| Planner weekend group plan at 6x CPU | PASS | plan appears in 637 to 989 ms |
| Tonight tool `/tools/tonight` | PASS | 4 URL variants incl. `minutes=abc`, `energy=zzz`, `setting=%00`, `minutes=999999999`; solo, free, 60 min result has no friend or weekend wording and shows Free; 288 x 3 seeds matrix passes |
| Hobby budget tool `/tools/hobby-budget` | PASS | 4 variants incl. unknown hobby and 3000-char value |
| Shopping lists and saved products | PASS | product saved on a hobby page appears on `/saved`, copy-list works; storage blocked (getter throws) does not throw anywhere |
| Saved collections: save and restore | PASS | plan saved, listed, restore link reopens the Saturday itinerary |
| Saved: export | PASS | download gives JSON (`app, v, exportedAt, saved, shop`); copy backup code works |
| Saved: import valid backup | PASS | "Found N saved items", "Add to this device" merges without duplicating |
| Saved: invalid imports | PASS | garbage, truncated JSON, wrong app, future version, bad code, 400k-char code, 600k-char file, `javascript:` href payload, `__proto__` payload: each gives a plain message, nothing imported, prototype not polluted, no `javascript:` hrefs rendered |
| Corrupted localStorage | PASS | 8 corrupt values for `ppf:my-plans:v1` and `ppf:shop-list:v1` (non-JSON, wrong shapes, malformed plan, 2 MB string) x 6 pages x 2 vp: no error, every page renders |
| Search, normal and phrases | PASS after fix | see D2 |
| Search, zero results | PASS | suggestions and quiz, directory, planner links shown |
| Search, hostile input | PASS after fix | `<script>` text, quotes, `%`, 8,000 chars all fine; 20,000 chars returns 431 from the server (header limit, expected); 5,000 unbroken characters overflowed the page, see D3 |
| Sharing buttons | PASS | copy link copies the canonical `https://planspastfive.com/...` URL; share links carry noopener |
| Changelog, About, Start here, Privacy, Terms, Affiliate disclosure, Editorial policy, Methodology, Corrections | PASS | 3 vp, one h1, no overflow, no errors |
| Contact | PASS (by design) | no form and no mailto: the page says the public inbox is not open yet. Flag for the buyer, not a defect |
| 404 (`/nonexistent`, `/journal/nope`, `/hobbies/nope`, `/shop/nope`) | PASS | real 404 status, helpful page with links; see R3 for title |
| Printable downloads and digital product files | PASS: removed by decision | no `/printables` route, no `.pdf .zip .docx .xlsx` in `public/` or `.output/public`, 0 `a[download]` or pdf links on the crawled pages, not in sitemap or search; `no-printables.test.ts` passes. The only download is the user's own backup JSON on `/saved` |
| Invalid query params, huge input | PASS | see quiz, planner, tonight, budget, search rows |
| No JS first tap | PASS | planner and Tonight load a plan from the URL with JS disabled; Shuffle disabled until hydration; every tested page still shows its h1 and links without JS |
| Slow CPU (4x and 6x) | PASS | see planner rows; CLS at 4x CPU: home 0.003, junk-journal article 0.079, planner 0.043, hobby profile at 320 0.001 (all under 0.1) |
| Reduced motion | PASS after fix | no infinite animations on `/`; smooth scrolling was still on, see D4 |
| High zoom (200 percent = 640 px, 400 percent = 320 px wide) | PASS | 12 key pages, no horizontal page scroll; the only controls past the edge are inside the intentional swipe carousel on articles |
| Keyboard-only | PASS | skip link first, visible focus on all 40 stops on home, quiz completed, planner and menus operable |
| Contrast | PASS | existing `contrast.test.ts` passes (not re-measured in the browser) |

## SEO

| Check | Result | Evidence |
|---|---|---|
| Unique titles and descriptions | PASS | across all 98 sitemap pages plus extras the only duplicates are `/search` and `/search?q=...` (noindex, same page) |
| Canonical URLs | PASS | every sitemap page canonical equals `https://planspastfive.com<path>`; 404 pages have none |
| OG and Twitter tags | PASS | og:title, description, type, url, site_name, absolute https og:image, `summary_large_image` on all indexable pages. `/search` and `/saved` have no og:image (noindex pages) |
| JSON-LD validity | PASS | every block parses on every page (1 to 3 blocks); Article has headline, image, dates, author, publisher |
| sitemap.xml | PASS | 98 URLs at final pass (93 at first pass): static pages, 7 category pages, 32 published articles, 8 collections, 34 hobbies with a guide (31 at first pass). No `/saved`, `/search`, draft or noindex page; every URL returns 200 and none is noindex |
| robots.txt | PASS | allows all, disallows `/saved` and `/search`, points to the sitemap |
| noindex rules | PASS | `/search`, `/saved` and guideless hobby profiles `noindex, follow` |
| Internal links | PASS | all hrefs from all 98 pages crawled; the only ones outside the page set (9 hobby profiles with no guide) return 200; 0 broken |
| Title and description length | FAIL (low) | see R2 |

## Security

| Check | Result | Evidence |
|---|---|---|
| HTML response headers | PASS | `nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` on 200 and 404 HTML |
| Asset headers | PASS (config) | `public/_headers` (`/*` rule) is copied to `dist/_headers` in the Netlify build. The local test server does not apply `_headers`, so asset headers could not be observed live |
| Non-HTML SSR responses | FAIL (low) | `sitemap.xml` and `robots.txt` carry no `nosniff`, see R4 |
| CSP, HSTS, X-Frame-Options | NOT SET by design | documented in `security-headers.ts` and `_headers` (Lovable editor iframe, host not chosen) |
| Secrets in repo | PASS | regex scan (AWS, Stripe, GitHub, Slack, Google keys, JWTs, private keys, `key=` literals) over the tree excluding node_modules, build output, lockfiles: 0 hits; no `.env` tracked |
| gitleaks | NOT TESTED | not installed and not installable in this sandbox (an npm package of that name is not the Go binary; I removed it again) |
| Dependency audit (`bun audit`) | 20 advisories: 0 critical, 9 high, 10 moderate, 1 low | see table below |
| Malformed URL handling | PASS after fix | see D1; the app itself returns 400 for `/%E0%A4%A` |
| Import hardening | PASS | see saved-import row |

High advisories and production relevance:

| Package | Advisory | Production-relevant? |
|---|---|---|
| brace-expansion (7 advisories, via minimatch, eslint, typescript-eslint) | DoS via brace expansion | No: dev tooling only |
| vite / launch-editor (GHSA-587h-7wmj-h5pm) | Windows `existsSync` bypass | No: dev server only, Windows only |
| zod 3.25.76 and 4.6.7 (GHSA-mrhx-c7xc-m3w5) | memory exhaustion on oversized collections | No: nothing under `src/` imports zod; it is used by build plugins and `@hookform/resolvers`. Candidate to drop as a direct dependency |
| seroval 1.6.8 (2 moderate: typed array constructor injection, RegExp source injection) | code or script injection when serializing | Yes in principle (TanStack SSR serializer), but it needs attacker-controlled data to be serialized; the site has no user-submitted server data. Moderate, upgrade when TanStack ships the bump |

## Images

| Check | Result | Evidence |
|---|---|---|
| Sizes | PASS | 18 hashed JPEGs in `assets/`, largest 427 KB (`cycling-lane`), typical 200 to 360 KB; hero also has a 960 px LCP variant in `public/lcp` |
| Formats | PASS (info) | all JPEG, no WebP or AVIF, see R5 |
| Lazy loading | PASS | 470 of 523 images on the 98 pages are `loading=lazy`; the rest are above-the-fold |
| Dimensions | PASS | 0 images without width and height (or aspect box) across all pages |
| CLS | PASS | all measured pages under 0.08 with 4x CPU and slow network |
| Alt text | PASS | 0 `img` without an `alt` attribute on any page |

## Accessibility basics

Headings: one h1 on every page except 404 (h1 "404", fine); heading skips only on the 6 shop collections (R1).
Labels: 0 unlabeled form controls and 0 unnamed buttons or links on all pages. Landmarks: one `main` per page. `lang="en"`.
Focus order and visibility: see keyboard rows. Alt text and contrast: see above.

## Deployment readiness

| Check | Result | Evidence |
|---|---|---|
| `NITRO_PRESET=netlify bun run build` in a temp copy | PASS | exit 0; `dist/` 23 MB with `_headers`, assets, robots, manifest; function in `.netlify/functions-internal/server` with `path: "/*"`, `preferStatic: true`, excludes `/.netlify/*` |
| `dist/_redirects` | PASS (info) | generated empty; routing is done by the function config, not redirects |
| `netlify.toml` ignore rule in a scratch git repo | PASS | rule `! git log -1 --pretty=%B HEAD \| grep -q '\[deploy\]'` (Netlify: exit 0 = skip, exit 1 = build). "Fix typo" skips; "Release: x [deploy]" builds; multi-line message with `[deploy]` in the body builds; `[Deploy]` (capital D), "deploy" without brackets and `[deploy-skip]` all skip. The marker is case-sensitive |
| Default `bun run build` | PASS | exit 0 (one Rolldown "inlineDynamicImports ignored" warning and a chunk-size notice, both harmless) |
| Real Netlify deploy | NOT TESTED | no account or network access |

## Defects found and fixed (log of every change)

| ID | Severity | Defect | Fix | Test or proof |
|---|---|---|---|---|
| D1 | Medium (local tooling; the app itself was fine) | `scripts/serve-built.mjs` crashed the whole server process on a malformed percent-encoded path such as `/%E0%A4%A` (unhandled URIError). It took the local server down mid-inspection | `decodeURIComponent` wrapped in try/catch, whole request handler wrapped so one bad request returns 500 instead of exiting | `curl /%E0%A4%A` now returns 400 from the app and the server stays up |
| D2 | Medium | Search for natural phrases containing "hobby" returned almost nothing: "cheap solo hobby at home" gave 1 guide and no hobbies, "free hobby alone" 1, "hobby at home" 1, while "solo at home" gave 27. The word "hobby" was demanded as literal text in each profile | `src/lib/search.ts`: generic words (hobby, hobbies, activity, activities, pastime) are dropped when a known concept is also in the sentence; alone they still search | new test in `src/test/search.test.ts`; "cheap solo hobby at home" now returns 14 hobby profiles in the built site; tool-scenarios matrix still passes |
| D3 | Low | A long unbroken search string (5,000 characters) made the results block 62,600 px wide, so the page scrolled sideways | `src/routes/search.tsx`: `[overflow-wrap:anywhere]` on the results block | test in `src/test/reduced-motion.test.ts`; rebuilt site overflow 0 at 320 px |
| D4 | Low | `html { scroll-behavior: smooth }` stayed on for visitors who asked for reduced motion | `src/styles.css`: `@media (prefers-reduced-motion: reduce)` resets it to `auto` | new `src/test/reduced-motion.test.ts`; computed value is `auto` under reduced motion on the rebuilt site |

Files changed by me: `scripts/serve-built.mjs`, `src/lib/search.ts`, `src/routes/search.tsx`, `src/styles.css`,
`src/test/search.test.ts`, new `src/test/reduced-motion.test.ts`. Nothing under `content/articles/` was touched.
I briefly tried a heading-level change for the shop pages and reverted it (see R1).

## Remaining issues (none blocks a sale)

| ID | Severity | Issue | Suggested handling |
|---|---|---|---|
| R1 | Low | Shop collection pages go h1 to h3, and inside every shopping block the "group" heading is an h4 above product h3s. Fixing it touches `StarterKit`, `ShopSections`, `ProductCard`, `ShopMyHobby` and `ShopTheArticle` together, which is more than a minor fix | Add a heading-level prop through the shop components in a later pass |
| R2 | Low | 70 of 98 sitemap pages have titles over 65 characters (the brand suffix counts; 100 characters for `how-to-find-a-hobby-as-an-adult`, 89 for several), and 15 descriptions are over 160 characters (5 over 180, longest 206 on `/shop`). Search engines may truncate them | Shorten in the article and hobby data; titles go through `content-lib` for articles |
| R3 | Low | The 404 page uses the site-default title and description rather than "Page not found". Status is correctly 404 | Optional `head` on the not-found route |
| R4 | Low | `sitemap.xml` and `robots.txt` responses have no `X-Content-Type-Options` (headers are applied to HTML only; `_headers` covers static files only) | Extend `withSecurityHeaders` to xml and text types, update its test |
| R5 | Info | All images are JPEG; WebP or AVIF would cut weight | Optional |
| R6 | Info | After "Download backup", the status line keeps saying "Backup downloaded." while an import preview card is shown | Clear the note when a preview opens |
| R7 | Info | `zod` is a direct dependency with no use in `src/`; seroval has 2 moderate advisories | Drop zod, bump TanStack when available |
| R8 | Info | The contact page has no inbox or form yet (intentional copy) | Buyer to add address in `src/config/site.ts` |
| R9 | Info | 20,000-character query strings get HTTP 431 from Node (header size limit); a production host will behave similarly | None |

## Not tested

gitleaks binary; real-device and screen-reader testing; browsers other than Chromium; live Netlify or Cloudflare deploy and
live response headers on static assets; Lighthouse scores; a full re-run of the unit suite after the remediation agents finish
(see caveat); `bun run build` into the shared `.output` (run in a temp copy instead so the other agents' server and builds
were not disturbed).

## Commands run

```
bunx vitest run            # 46 files, 659 tests passed (clean run, 17 s); late re-run 4 failures in files edited by other agents
bunx tsc --noEmit          # clean (rc 0) before the others' edits; late re-run errors only in catalog-import.test.ts
bunx eslint .              # 0 errors, 15 warnings (clean run); late re-run 2 errors in scripts/tmp-sim*.ts (not mine)
bun run build              # temp copy of the tree, exit 0, twice (before and after my fixes)
NITRO_PRESET=netlify bun run build   # temp copy, exit 0; inspected dist/ and .netlify/functions-internal
bun audit                  # 20 advisories (9 high); classified above
node scripts/first-tap-check.mjs http://127.0.0.1:5990 and :5991   # all pass
node scripts/serve-built.mjs 5990 / 5991 (from temp copies)
Playwright scripts (scratchpad /tmp/claude-0/qa/w): crawl.mjs (all pages x 3 vp: status, meta, JSON-LD, headings, alt, dims, overflow, console),
  journeys.mjs, j2.mjs, j3.mjs, imp.mjs, corrupt.mjs, env.mjs (CLS at 4x CPU, reduced motion, zoom, no-JS)
curl -sI for headers; regex secret scan with grep -rnE; scratch git repo for the netlify.toml ignore rule
```
