# Final scorecard: Plans Past Five (release candidate)

Date: 2026-11-19. Release candidate commit `2e13370` ("Release candidate: security patch (audit 0)..."). `HEAD` is `aefbdb1`, which adds only two docs files (`docs/cowork/OWNER-ACTIONS.md`, `docs/cowork/TRACKER-UPDATE-PACKET.md`); no code changed after `2e13370`.

Rules for this file: no revenue or traffic claims (there are none; the site is pre-revenue and not live). Simulated reviewer sentiment is labelled SIMULATED everywhere it appears; it is not customer research, marketplace demand or an offer. Lab data is labelled lab data. Work that depends on an outside check (live Amazon pages, live licence terms, the real CMS login, a live deploy) is NOT counted as verified complete.

## 0. Evidence I ran myself today (read-only; no build, no importer)

| Check | Result | Command |
|---|---|---|
| Test suite | **50 files, 735 tests, all passed** (23 s) | `bunx vitest run` |
| Typecheck | exit 0, no errors | `bunx tsc --noEmit` |
| Lint | **0 errors, 17 warnings** (react-refresh and one unused directive) | `bunx eslint .` |
| Dependency audit | **No vulnerabilities found (542 packages)** | `bun audit` |
| Commit | `2e13370` release candidate, `aefbdb1` docs-only on top | `git log` |
| Article files | 32 published, 2 draft (matches `docs/buyer/INVENTORY.md`) | read of `content/articles/*.json` |
| Buyer package | 842 files, 32.7 MB; excludes `.git`, `.lovable`, `.output`, `.netlify`, `dist`, `node_modules`, `docs/cowork`, `docs/launch`, `HANDLING-LOG.md`, `RESUME.md`, 143 working reports under `docs/marketplace` | `node scripts/make-buyer-package.mjs --list` (dry run, wrote nothing) |
| Secret-pattern grep over shipped trees | no tokens or private keys; the seller's Git handle appears only in excluded `docs/cowork` and `docs/marketplace` files and not in `src`, `docs/buyer`, `README.md`, `package.json`, `netlify.toml` | `grep -rIlE` |

Not re-run by me (instructions): production build, importer. Build evidence is from `TECHNICAL-QA.md` (default and Netlify-preset builds in a temp copy, exit 0), `SECURITY-RISK-REGISTER.md` (both builds after the patch), and the release commit message ("gates green"). `docs/buyer/INVENTORY.md` was generated at `bfc4fa0` and its test line says "not run"; my run above supplies the 50 / 735 figure. Re-run `node scripts/inventory.mjs` at listing time.

---

## A. Website business score (standard)

Each 1 to 10. This is the score of the site as a business today, not of how well it is packaged. A pre-revenue site that is not live scores low on Traffic and Revenue and that is correct. Nothing is given for potential.

| Dimension | Score | Evidence |
|---|---|---|
| Traffic | **1** | Not live. The domain `planspastfive.com` is registered but not connected to hosting (`docs/cowork/OWNER-ACTIONS.md`, `docs/buyer/DOMAIN-AND-EMAIL.md`). No analytics ID (`analytics.ga4MeasurementId` is empty, `GA4-VERIFICATION.md`), no Search Console, no indexing, no backlinks, no Pinterest account. There are no visitors to measure. 1 is the floor. |
| Revenue | **1** | Zero revenue. Affiliate tracking is off by design; there is no Amazon Associates tag for this site and the account is not transferable (`src/config/affiliate.ts`, `docs/buyer/AFFILIATE-ACTIVATION.md`). No ads, no products sold, no email list. |
| Content | **6** | 32 published articles, about 31,100 words, 2 outline drafts that return 404 (`INVENTORY.md`, `TECHNICAL-QA.md`). Build gate requires sources, a `verifiedAt` date and resolved checks (`scripts/content-lib.mjs`, `WAVE-B-TOOLING.md`). Commercial audit judged articles 7 to 9 for usefulness (judgment, `COMMERCIAL-AUDIT.md`). Held back: AI-assisted drafting, source checks were desk reviews, weaker claims are still listed for Cowork (`docs/content/verification-final/OPEN-CLAIMS-FOR-COWORK.md`), no keyword or demand data, anonymous byline by decision, repeated phrases noted in the audit. |
| Operational stability and low risk | **5** | Good: no database, accounts or secrets; `bun audit` 0; 735 tests; running cost about $1 to $17 a month (`OPERATING-COSTS-VERIFIED.md`). Not good: never run live so there is no stability record; Nitro is pre-release (`3.0.260603-beta`); the build depends on one vendor config package; Netlify free plan has a 300-credit cap; monetization depends on one non-transferable programme (Amazon); AI-image transfer terms unverified; legal pages are starter text. |
| **Average** | **3.3** (13 / 4 = 3.25) | |

How to read it: 3.3 describes an unproven asset. It does not say the work is poor; section B and F show the build quality is high. It says there is no business yet.

---

## B. Turnkey readiness (nine weighted categories)

Method, same as `docs/marketplace/TURNKEY-READINESS.md`: 1 = done and evidenced, 0.5 = partly done or awaiting external verification, 0 = not done. Category % = points / criteria. Weighted points = % x weight.

Classes: **VC** Verified complete; **AEV** Completed but awaiting external verification; **INC** Incomplete; **BLK** Blocked (needs an outside dependency); **N/A** Not applicable. AEV scores 0.5 and is never counted as verified complete.

Removed on purpose and NOT penalised and not scored: printables, digital products, premium kits, calendar export, newsletter, accounts, database (owner decisions, `docs/HANDLING-LOG.md` section 2; `src/test/no-printables.test.ts`). No criterion below tests for them.

### Branding and presentation (weight 10): 4.5 / 6 = 75.0% -> 7.50

| Criterion | Class | Score | Evidence |
|---|---|---|---|
| Logo set | VC | 1 | 12 SVG logos in `design/brand/logos` (INVENTORY) |
| Palette and type tokens, OFL fonts | VC | 1 | `design/brand/palette`, 11 font files with OFL texts |
| Favicon, OG image, social and board-cover exports | VC | 1 | `design/brand/exports`, `public/favicon.*`; OG tags verified on 98 pages (TECHNICAL-QA) |
| Brand guide and voice docs | VC | 1 | `docs/BRAND-GUIDE.md`, `docs/content/BRAND-VOICE.md`, `docs/buyer/BRAND-GUIDELINES.md` |
| Domain, contact email set | AEV | 0.5 | Domain bought (owner receipt $12.28) and `site.url` set, but not connected; mailbox bought ($14.88) and untested; `contactEmail` is empty in `src/config/site.ts` |
| Publisher name and jurisdiction set | INC | 0 | Blank by owner decision so the buyer sets it (`PUBLISHER-SETUP.md`); scored 0 as in the earlier method, not a defect |

### Website functionality and UX (weight 15): 5.5 / 7 = 78.6% -> 11.79

| Criterion | Class | Score | Evidence |
|---|---|---|---|
| All routes implemented | VC | 1 | 31 route files, 98 sitemap pages, all crawled at 3 widths, 0 broken internal links (TECHNICAL-QA) |
| Tests, typecheck and lint pass | VC | 1 | My runs above: 735 / 735, tsc 0, eslint 0 errors |
| Browser QA of the current build, desktop and mobile | VC | 1 | Playwright at 320, 390, 1280 on the production build, keyboard-only, 200% and 400% zoom, corrupted storage, hostile input (TECHNICAL-QA). Lab, Chromium only; no real devices or screen readers |
| Production build succeeds | VC | 1 | Default and Netlify-preset builds exit 0 (TECHNICAL-QA, SECURITY-RISK-REGISTER). One earlier test deploy on the seller's own Netlify built and served the main routes (`docs/cowork/NETLIFY-FIRST-DEPLOY-LOG.md`) |
| CI workflow defined | AEV | 0.5 | `.github/workflows/ci.yml` (content, tests, tsc, build). No GitHub Actions run result seen; CI runs `vite build` only |
| Live production site functioning | BLK | 0 | Not deployed on the domain |

### Editorial content and research (weight 15): 4.5 / 6 = 75.0% -> 11.25

| Criterion | Class | Score | Evidence |
|---|---|---|---|
| Roadmap and research briefs | VC | 1 | `docs/content/ARTICLE-ROADMAP.md`, `briefs/` |
| Published articles against the 30 target | VC | 1 | 32 published (capped at 1) |
| Articles verified against sources | AEV | 0.5 | Every published article has sources and `verifiedAt` (publish gate), five new ones independently desk-checked (`FIVE-NEW-ARTICLES-REVIEW.md`); weaker claims and safety statements still go to Cowork (`OPEN-CLAIMS-FOR-COWORK.md`). Not counted as fully verified |
| Editorial process docs | VC | 1 | `ARTICLE-QUALITY-CHECKLIST.md`, `docs/SOP-publish-article.md`, `docs/SOP-corrections.md` |
| Trust pages | VC | 1 | Editorial policy, methodology, corrections, affiliate disclosure render (TECHNICAL-QA) |
| Keyword and competitor demand evidence | INC | 0 | No search-volume or SERP data exists anywhere in the repo |

### Monetization infrastructure (weight 15): 5.5 / 7 = 78.6% -> 11.79

| Criterion | Class | Score | Evidence |
|---|---|---|---|
| Central affiliate registry and resolver, tested inactive and active | VC | 1 | `src/config/affiliate.ts`; `affiliate.test.ts`, `affiliate-activation-safety.test.ts`, `affiliate-config-independence.test.ts`; both states with a fake ID (`AFFILIATE-ACTIVATION-TEST.md`) |
| Ordinary fallback links | VC | 1 | Registry resolution order; shop tests |
| Disclosure page and notes | VC | 1 | Disclosure derived from affiliate state |
| Shoppable article and kit system | VC | 1 | Unverified never render, kits complete only with 4+ verified picks and essentials (`shop.test.tsx`, `WAVE-B-SHOP.md`); export lists avoid affiliate URLs (`export-links.test.tsx`) |
| Verified product catalog | AEV | 0.5 | 66 records, 37 "verified", 29 shown, 2 of 8 kits complete. "Verified" means a desk check of the listing; none is live-verified by Cowork yet (`PRODUCT-VERIFICATION-QUEUE.csv`) |
| Approved, tested affiliate account | BLK | 0 | None exists; the buyer applies under their own account |
| Amazon programme research | VC | 1 | `docs/commerce/affiliate-research.md` (rules to be re-read live by Cowork) |

### SEO and performance (weight 10): 4.5 / 8 = 56.2% -> 5.62

| Criterion | Class | Score | Evidence |
|---|---|---|---|
| Sitemap and robots | VC | 1 | 98 URLs, robots disallows `/saved` and `/search` (TECHNICAL-QA) |
| Per-page metadata and canonicals | VC | 1 | Unique titles and canonicals on all pages; 70 titles over 65 characters is a known low item (R2) |
| Structured data | VC | 1 | Organization, Article, BreadcrumbList parse on every page |
| Thin pages noindexed | VC | 1 | Guideless hobby profiles `noindex, follow` |
| Keyword and demand evidence | INC | 0 | None |
| Search Console and Bing | BLK | 0 | Need a live domain |
| Lighthouse or PageSpeed run | AEV | 0.5 | Lab runs only, local server (`PERFORMANCE-RESULTS.md`): home mobile 98 and LCP 2.2 s after the image change, article mobile 88, `/hobby-finder` mobile weak (lab 72). Not run on production |
| Domain connected | BLK | 0 | Not connected |

### Original tools (weight 10): 5.5 / 6 = 91.7% -> 9.17

| Criterion | Class | Score | Evidence |
|---|---|---|---|
| Hobby finder quiz | VC | 1 | `quiz-flow.test.ts`; keyboard-only run in TECHNICAL-QA |
| Make Some Plans planner | VC | 1 | 7,616 + 1,344 + 363 scenario matrix; `wave-b-tools.test.tsx` |
| Hobby budget tool | VC | 1 | Variants and hostile input tested |
| Tonight tool | VC | 1 | 288 x 3 seeds matrix |
| Shopping checklist and saved items | VC | 1 | Export, import, corrupted-storage and hostile-payload tests |
| Image and font licence records | AEV | 0.5 | Ledger and records complete (`image-ledger.test.ts`), but commercial-use and transfer terms of the AI images are unverified (`RIGHTS-AND-TRANSFERABILITY.md`) |

Tools are scored as built and lab-tested; whether they work on a live host is covered under functionality.

### Marketing package (weight 10): 5.5 / 8 = 68.8% -> 6.88

| Criterion | Class | Score | Evidence |
|---|---|---|---|
| 88 pin images | VC | 1 | `public/pins` (88) |
| Pins CSV | VC | 1 | `docs/pinterest-pins.csv`, 88 rows |
| 90-day schedule | VC | 1 | `docs/PINTEREST-90-DAY-SCHEDULE.md` (start date is a placeholder) |
| Pinterest and distribution strategy docs | VC | 1 | `docs/buyer/PINTEREST-SETUP.md`, `MARKETING-ROADMAP.md` |
| Pins point at published content | VC | 1 | All 88 rows `published-article`; every destination checked by `pins.test.tsx` (Wave B audit) |
| Pinterest account and website claim | BLK | 0 | No account |
| Buyer presentation | AEV | 0.5 | 17-slide deck and PDF exist, built from the local dev server at an earlier state and marked historical; screenshots and video to be redone by Cowork; no video recorded |
| "Verify before posting" items cleared | INC | 0 | All 88 rows still carry the check (a posting-time step) |

### Security and maintenance (weight 5): 6.5 / 8 = 81.2% -> 4.06

| Criterion | Class | Score | Evidence |
|---|---|---|---|
| CI workflow present | VC | 1 | `ci.yml` |
| Dependabot configured | VC | 1 | `.github/dependabot.yml` per SECURITY-RISK-REGISTER section 6.3 |
| Site-health and monthly-digest workflows | VC | 1 | `site-health.yml`, `monthly-digest.yml` |
| Security headers | VC | 1 | `nosniff`, Referrer-Policy, Permissions-Policy on HTML and now on sitemap and robots (RC commit); CSP, HSTS, X-Frame-Options not set, documented |
| Secrets scan | AEV | 0.5 | Pattern scans of the tree (mine, today) and of 18 commits (SECURITY-AUDIT); `gitleaks` never run; history is now 146 commits |
| Dependency audit | VC | 1 | `bun audit` 0 findings (mine, today) |
| HTTPS and host configured | BLK | 0 | No production host on the domain |
| Security and backup docs | VC | 1 | `SECURITY-AND-BACKUPS.md` (rollback and `git bundle` restore tested in the takeover rehearsal) |

### Documentation and transferability (weight 10): 5.5 / 8 = 68.8% -> 6.88

| Criterion | Class | Score | Evidence |
|---|---|---|---|
| Buyer doc set | VC | 1 | 37 files in `docs/buyer` |
| 20-step transfer checklist | VC | 1 | `TRANSFER-CHECKLIST.md`; clean-room rehearsal in `BUYER-TAKEOVER.md` |
| Account dependency doc | VC | 1 | `ACCOUNT-DEPENDENCIES.md` |
| Operating-cost doc with unknowns marked | VC | 1 | `OPERATING-COSTS-VERIFIED.md` (secondary-sourced prices are tagged) |
| Image and licence records | AEV | 0.5 | Records exist; live Lovable and Canva terms not read (Canva returned 403) |
| Marketplace package | AEV | 0.5 | Final listing draft, FAQ, positioning, pricing sensitivity exist; price undecided, fees unverified, nothing published |
| Buyer presentation | AEV | 0.5 | See marketing package |
| Legal pages professionally reviewed | INC | 0 | Starter text only |

### Weighted total

| Category | Weight | Points | % | Weighted |
|---|---|---|---|---|
| Branding and presentation | 10 | 4.5 / 6 | 75.0 | 7.50 |
| Functionality and UX | 15 | 5.5 / 7 | 78.6 | 11.79 |
| Editorial | 15 | 4.5 / 6 | 75.0 | 11.25 |
| Monetization | 15 | 5.5 / 7 | 78.6 | 11.79 |
| SEO and performance | 10 | 4.5 / 8 | 56.2 | 5.62 |
| Original tools | 10 | 5.5 / 6 | 91.7 | 9.17 |
| Marketing package | 10 | 5.5 / 8 | 68.8 | 6.88 |
| Security and maintenance | 5 | 6.5 / 8 | 81.2 | 4.06 |
| Documentation and transferability | 10 | 5.5 / 8 | 68.8 | 6.88 |
| **Total** | 100 | | | **74.9 / 100** |

(Sums to 74.93; the previous score was 72.42 on an older repo state. The criteria lists are unchanged except that the functionality rows are the original seven and the tools and docs rows are re-judged more strictly for unverified rights.)

Classification count (64 criteria): **42 Verified complete, 11 Completed but awaiting external verification, 5 Incomplete, 6 Blocked, 0 Not applicable.**

Strict view, AEV counted as 0 (only verified complete counts): **66.4 / 100**. The honest range for "how much of the turnkey package is verified done today" is 66 to 75. The 11 AEV and 6 BLK items are almost all closed by Cowork or owner steps, not by code.

This total is a checklist tally. It is not a sale gate and not a business score; the pass or fail gates are in section I.

---

## C. Customer experience (SIMULATED)

Five AI personas drove the production build with Playwright (`final-inspection/reviews/C1` to `C5`). **SIMULATED SENTIMENT, not real customer research.** The reviews ran on the production build before the last remediation (27 published articles, 629 tests at the time); several things they reported were fixed afterwards (planner company and day-length defects, budget-tool wording, reading mode, product mismatches, silent defaults, saved-card detail) and were not re-reviewed. Treat the numbers as a snapshot.

| Dimension (1 to 10) | C1 tired 9-to-5 | C2 creative | C3 friends | C4 budget | C5 supplies | Average |
|---|---|---|---|---|---|---|
| First impression | 7 | 8 | 8 | 8 | 7 | 7.6 |
| Aesthetic appeal | 8 | 8 | 8 | 8 | 7 | 7.8 |
| Navigation | 7 | 8 | 7 | 7 | 7 | 7.2 |
| Editorial authenticity | 6 | 7 | 6 | 7 | 7 | 6.6 |
| Usefulness | 8 | 8 | 7 | 7 | 6 | 7.2 |
| Trust | 5 | 7 | 7 | 8 | 7 | 6.8 |
| Product desirability | 4 | 5 | 6 | 5 | 4 | 4.8 |
| Willingness to buy supplies | 3 | 6 | 5 | 5 | 5 | 4.8 |
| Willingness to return | 5 | 7 | 7 | 7 | 6 | 6.4 |
| Willingness to share | 6 | 7 | 6 | 7 | 6 | 6.4 |
| Business credibility | 3 | 7 | 6 | 7 | 6 | 5.8 |
| **Persona average** | 5.6 | 7.1 | 6.6 | 6.9 | 6.2 | **6.5 / 10** |

What the personas liked: warm hero and clear promise, the Tonight tool and quiz, copy-to-group-chat plans, honest disclosures, one pick per kit with a reason. What held them back: no product photos, no prices (by design), thin shop pages for six of eight collections, no contact address, an anonymous byline, AI imagery. Customer experience is the strongest simulated score and the product side the weakest.

---

## D. Commercial desirability (shop): **4 / 10**

Judgment, built from facts and the simulated product scores (C-table: product desirability 4.8, willingness to buy 4.8).

| Fact | Value | Source |
|---|---|---|
| Complete kits | **2 of 8** (junk journaling, air-dry clay); the other 6 render one "Where to start" card | `INVENTORY.md`, `WAVE-B-SHOP.md` |
| Products shown on the site | **29** (of 66 records, 37 "verified", 8 on editorial hold, 29 candidates never shown) | `INVENTORY.md` |
| Verified listings checked live by Cowork | **0 of 37** (queue prepared: 29 shown + 17 kit candidates) | `docs/cowork/PRODUCT-VERIFICATION-QUEUE.csv` |
| Product photos | **none**; illustrated tiles only. Amazon images are never stored; photo permission not obtained | `RIGHTS-AND-TRANSFERABILITY.md` |
| Prices shown | none, by policy | `WAVE-B-SHOP.md` |
| Affiliate account | none; links are ordinary Amazon `/dp/` links | `AFFILIATE-ACTIVATION-TEST.md` |
| Commercial-audit judgment of the strongest pages | junk-journaling supplies 9, mahjong night 8, junk-journaling start 8 (author's judgment, not data) | `COMMERCIAL-AUDIT.md` |

Why 4: the shop is honest, consistent and structurally sound (no unverified product renders, no incomplete kit is shown as complete). It is also thin: low-ticket, Amazon-only, unphotographed, mostly unverified live. It is a demonstration of a shop, not a shop a visitor would find compelling. The simulated affiliate-investor persona scored monetization readiness 3 and Amazon dependency 2.

---

## E. Buyer appeal and buyer confidence (SIMULATED, subjective): **5.0 / 10**

Three AI buyer personas (B1 first-time buyer, B2 affiliate investor, B3 lifestyle creator) reviewed the site, the buyer docs and the rights, costs and positioning documents. **SIMULATED. Their "willingness to purchase" is not marketplace demand, not an offer and not a valuation.** They ran before the last fixes (they saw 27 published articles, a missing secrets scan, doc count disagreements and an overwriting importer incident; since then counts were reconciled, importer safeguards and an audit-0 patch landed, and a takeover rehearsal was done).

| Persona | Mean of numeric dimensions | Willingness to purchase | Their stated ceiling |
|---|---|---|---|
| B1 first-time buyer | 4.5 | 3 / 10 | low hundreds to about $1,000, with hands-on help |
| B2 affiliate investor | 4.8 | 3 / 10 | a starter-site price; would rise to 5 to 6 with a live indexed domain and 8+ weeks of Search Console data |
| B3 lifestyle creator | 5.6 | 4 / 10 | a low-cost offer for the brand system and pins, not for "the business" |
| Mean | **5.0** | **3.3** | |

Consistent high points: website quality 7 to 7.5, brand 6 to 7, operating cost 6 to 8, honest disclosure. Consistent lows: monetization readiness 3 to 4, Amazon non-transferability 2, image rights 3, maintenance complexity 3 to 5 for a non-developer, differentiation 4 to 5.5. Takeover evidence (`BUYER-TAKEOVER.md`): a non-technical buyer can read the docs and, once the CMS is proven, edit articles in a browser; everything else (first deploy, products, affiliate switch-on, contact details, branding) needs a developer or an AI coding tool for a few hours.

---

## F. Technical quality: **7.5 / 10** (lab data labelled)

| Evidence | Result |
|---|---|
| Tests | 50 files, 735 passed (my run) |
| Typecheck | clean (my run) |
| Lint | 0 errors, 17 warnings (my run) |
| Dependency audit | 0 findings (my run); was 20 (9 high) before `security-update.patch`, applied in the RC |
| Build | default and Netlify-preset builds pass (agents' runs; not repeated by me) |
| Technical QA defects | 0 critical, 0 high, 2 medium, 2 low found and fixed; 8 low or info remain (R1 shop heading order, R2 long titles, R3 404 title, R5 JPEG only, R6 backup note, R7 unused zod, cleared by the security patch, R8 contact page, R9 431 on huge URLs); R4 (sitemap nosniff) fixed in the RC (`TECHNICAL-QA.md`) |
| Security | no critical or exploitable issue; no CSP, HSTS or X-Frame-Options by design; Nitro pre-release and vendor config package are the real residual risks (`SECURITY-RISK-REGISTER.md`) |
| Performance, **lab data, simulated throttling, local server, not field data** | home mobile 98 and LCP 2.2 s, home desktop 99, article mobile 88 (LCP 3.8 s), shop 100, `/hobby-finder` mobile about 72 with a lazy 1152 px image as LCP. Entry chunk 780 KB (226 KB brotli) carries all article text; a code split is the recommended next step (`PERFORMANCE-RESULTS.md`) |
| Accessibility basics | one h1 per page, 0 unlabeled controls, 0 images without alt, visible focus on 40 of 40 tab stops, reduced motion honoured, no horizontal scroll at 400% zoom |

Held back from 8 or higher: nothing has run on a live host; no real-device or screen-reader testing; pre-release Nitro; the entry-chunk size; fonts loaded from Google Fonts at runtime.

---

## G. Turnkey completion

**Repo-side work is complete; the unfinished items are external.** Of 64 turnkey criteria: 42 verified complete (66%), 11 complete but awaiting an outside check (17%), 5 incomplete (8%), 6 blocked (9%). Weighted: **74.9 counting awaiting-external at half, 66.4 counting it at zero.**

Incomplete: publisher fields (deliberate), keyword research, legal-page review, pin "verify before posting", and demand evidence. Blocked: live site, host and HTTPS, domain connection, Search Console and Bing, affiliate account, Pinterest account. Awaiting external: domain and mailbox use, CI run, source verification of weaker claims, live product verification, Lighthouse on production, image terms (twice), secrets scanner, marketplace package, presentation refresh.

## H. Transfer readiness: **6 / 10**

| What is ready | Evidence |
|---|---|
| 20-step checklist, account dependency table (nothing transfers from the seller; every account is the buyer's own) | `TRANSFER-CHECKLIST.md`, `ACCOUNT-DEPENDENCIES.md` |
| Clean-room rehearsal from an export with no credentials; install 3.3 s warm; `bun run dev` fixed for no-IPv6 | `BUYER-TAKEOVER.md` |
| Sanitised package script with secret and other-business checks | `scripts/make-buyer-package.mjs`, `BUYER-PACKAGE-CONTENTS.md` |
| Rights position stated identically in three documents | `RIGHTS-AND-TRANSFERABILITY.md` |
| Rollback and backup restore | `SECURITY-AND-BACKUPS.md` |
| 5-hour, 30-day support proposal (owner approval pending) | `POST-SALE-SUPPORT-PROPOSAL.md` |

| What is not ready | Why |
|---|---|
| Buyer cannot run it alone beyond articles | A first deploy, products, affiliate switch-on, contact details and images need a developer for hours (`BUYER-TAKEOVER.md` section 1) |
| CMS never opened with a real login | `CMS-TEST-PLAN.md` |
| AI-image transfer terms unverified; Lovable agreement not assignable | `RIGHTS-AND-TRANSFERABILITY.md` |
| Domain and mailbox inclusion undecided; repo privacy undecided; the seller's Netlify test project exists | `OWNER-ACTIONS.md` |
| Node and Bun versions not pinned; Playwright and `fonttools` undeclared; image script writes no ledger row | `BUYER-TAKEOVER.md` section 5 |
| Shipped docs point at 14 files the package excludes (for example `docs/marketplace/SECURITY-AUDIT.md`, `docs/cowork/*`) | `make-buyer-package.mjs --list` |

The score is 6 because the paperwork is thorough but a real handover has not been exercised on a live domain, and a non-developer buyer still depends on help.

---

## I. Release decisions (two separate decisions)

### I.1 CODE COMPLETE: READY FOR COWORK -> **YES** (release commit `2e13370`; `aefbdb1` adds docs only)

Every mandatory code release gate. PASS means done and evidenced in the repo; EXTERNAL means the code side is done and the remaining check needs a live site, an account or a person. No gate is FAIL.

| # | Gate | Status | Evidence | Still external |
|---|---|---|---|---|
| 1 | Production build | PASS | Default and Netlify-preset builds exit 0 (TECHNICAL-QA, SECURITY-RISK-REGISTER); RC commit "gates green". Not rebuilt by me (brief) | Hosted build of the RC on the owner's Netlify |
| 2 | Full tests | PASS | 50 files, 735 passed (my run) | none |
| 3 | Typecheck | PASS | exit 0 (my run) | none |
| 4 | Lint | PASS | 0 errors, 17 warnings (my run) | none |
| 5 | Critical journeys | PASS | Quiz, planner, tonight, budget, saved, search, shop, export and import journeys on the production build at 3 widths, plus scenario matrices (TECHNICAL-QA) | Re-run on the live URL (Cowork H, K) |
| 6 | Product mismatches resolved | PASS | The two ESRICH canvas records are now tagged only to `how-to-host-a-paint-night-at-home` (`catalog.generated.ts`); logged in `HANDLING-LOG.md`; paint-night block wording fixed (`EDITORIAL-CLEANUP.md`) | Live check that each ASIN is the named product (Cowork A) |
| 7 | No internal notes rendered | PASS | `coworkChecks` count 0 in `src/content/generated/*.json`; hold reasons reduced to `hold: "held"`; test scans rendered cards for internal phrases | Low residual: catalog `limitations` strings ("Manufacturer page not yet checked") remain in `catalog.generated.ts` and no component renders them; strip or reword later |
| 8 | Unverified products not promoted | PASS | `shop.test.tsx` "unverified products never render"; 29 of 66 records shown, 29 candidates never shown, 8 held | none |
| 9 | Incomplete kits not shown as complete | PASS | `isFullKit` needs 4+ verified picks and every essential verified; 2 of 8 complete (`WAVE-B-SHOP.md`, INVENTORY) | none |
| 10 | Affiliate architecture tested | PASS | `affiliate.test.ts`, `affiliate-activation-safety.test.ts`, `affiliate-config-independence.test.ts`, `scripts/check-affiliate-config.mjs` runs the full suite in both states with a fake ID (`AFFILIATE-ACTIVATION-TEST.md`). I ran the shipped (inactive) state | A real tracked link needs the buyer's own Associates account |
| 11 | Exported lists avoid affiliate URLs | PASS | Separate export resolver; `export-links.test.tsx` in enabled and disabled modes (note: a C5 review on an earlier build saw plain Amazon URLs in copied text; the RC policy removes Amazon URLs from exports, `EXPORT-LINK-POLICY.md`) | none |
| 12 | Importer safeguards | PASS | Refuses no file, empty, malformed and unverified input; 30% shrink guard; temp-file write; `catalog-import.test.ts` runs on temp copies. I did not run the importer | none |
| 13 | No critical exploitable security issue | PASS | `SECURITY-RISK-REGISTER.md`; `bun audit` 0 (my run); no secrets found | Live header check on the static host |
| 14 | Responsive layouts | PASS | 98 pages at 320, 390, 1280; 12 key pages at 200% and 400% zoom, no horizontal page scroll (TECHNICAL-QA) | Real devices |
| 15 | Keyboard interactions | PASS | Skip link first, visible focus on 40 of 40 stops, quiz completed by keyboard, Escape closes the menu | Screen-reader pass |
| 16 | Deployment instructions match config | PASS | `HOSTING-AND-DEPLOYMENT.md` rewritten to `netlify.toml`; `[deploy]` marker rule tested in a scratch repo (case-sensitive); preset and `dist/` layout documented | Trigger-deploy button versus skip rule; live headers |
| 17 | CMS instructions match implementation | PASS | `.pages.yml` header and `CMS-SETUP.md` both say a CMS save is "Saved" and publishing is a separate deploy; publish gate enforced in `content-lib.mjs` | Real CMS login test (`CMS-TEST-PLAN.md`, Cowork G) |
| 18 | Clean install | PASS | Clean-room rehearsal; cold install 4.2 s, 520 packages (`BUYER-TAKEOVER.md`, `MAINTENANCE-MEASURED.md`) | Node and Bun versions are not pinned (open, not a failure) |
| 19 | Backup and rollback documented | PASS | `SECURITY-AND-BACKUPS.md`, `NETLIFY-CREDITS-AND-RELEASES.md`; `git bundle` restore tested | Netlify rollback exercise (CMS plan step 15) |
| 20 | Removed features not advertised | PASS | `no-printables.test.ts`; my grep: only the changelog line saying printables and digital products were removed, a disabled `newsletter` config stub in `site.ts`, and the privacy sentence that a newsletter could be added later with the policy updated first | none |
| 21 | Inventory counts accurate | PASS | Mine: 32 published and 2 draft, 88 pins, 39 images, 33 route files (31 routes), 50 test files / 735 tests all match INVENTORY and the docs; INVENTORY's own test line says "not run" | Regenerate at listing time |
| 22 | External tasks assigned | PASS | `COWORK-FINAL-PACK.md` (workstreams A to O), `OWNER-ACTIONS.md`, `TRACKER-UPDATE-PACKET.md`, `PRODUCT-VERIFICATION-QUEUE.csv`, `CMS-TEST-PLAN.md` | none |
| 23 | No personal credentials in the buyer package | PASS | `make-buyer-package.mjs --list`: 842 files, secret-pattern block active, `docs/cowork`, `docs/launch`, `HANDLING-LOG.md`, `RESUME.md` excluded; my grep found no tokens or keys in shipped trees. Emails in shipped files are three non-seller addresses: an upstream package author (`THIRD-PARTY-NOTICES.md`), a public Udemy affiliate address (`docs/commerce/affiliate-research.md`) and the fixture `a@b.com` | Build the real zip, unpack it, scan it again before handover |

Two housekeeping items to close before Cowork starts (neither is a code fault): (1) `COWORK-FINAL-PACK.md` points at `docs/marketplace/final-inspection/RELEASE-HANDOVER.md` as the place that names the release commit, and that file does not exist; create it naming `2e13370` (and `aefbdb1`). (2) Regenerate `docs/buyer/INVENTORY.md` so its test line shows 50 / 735. `AGENTS.md` still says "Frontend-only", which is stale.

### I.2 BUSINESS COMPLETE: READY TO LIST -> **NOT YET**

Gate count from `TURNKEY-READINESS.md` (22 gates) re-assessed at the RC: **12 PASS** (5, 7, 10, 11, 13, 15, 16, 17, 18, 19, 21, 22), **6 BLOCKED** (1, 2, 3, 8, 9, 20), **1 NEEDS OWNER** (4), **2 EXTERNAL** (6, 14), **1 N/A** (12). 21 gates apply; 12 pass.

Exact mandatory sale blockers (each must be closed before the owner lists):

| # | Blocker | Who | Gate(s) |
|---|---|---|---|
| 1 | Live deploy on `planspastfive.com`: connect DNS, HTTPS, one release deploy, make public, check headers with `curl -I` | Owner logins, Cowork, Claude Code | 1, 2, 3, 9 |
| 2 | Working mailbox: `hello@` send and receive test, then set `contactEmail` (tests that expect it empty must be updated) so the contact page has an inbox | Owner, Cowork | 4 |
| 3 | Cowork live verification of the 29 shown products (and the kit candidates the owner wants), then a data-only import by Claude Code | Cowork, Claude Code | 6 |
| 4 | Cowork source results for the open article claims, safety statements first | Cowork | 6 |
| 5 | Real Pages CMS login test and the publish and rollback steps | Owner present, Cowork | 17 gate follow-up |
| 6 | Licence terms read live (Lovable, Canva) and the three rights documents updated together | Cowork | 8 |
| 7 | Repo privacy decision, then set private only after the buyer package is final; build and scan the real package | Owner | 19 |
| 8 | Owner decisions: domain and mailbox in the sale or not, keep or delete the seller's Netlify test project, price, support terms, publisher details policy | Owner | 4, 14 |
| 9 | Live fee and comparable check on the marketplace; re-read `LISTING-DRAFT-FINAL.md` against the repo and the live site, then the owner publishes it personally | Cowork, owner | 20 |
| 10 | Re-run INVENTORY, this scorecard and the gate table on the final commit | Claude Code | all |

Strongly recommended but not gating: refresh the buyer presentation with real screenshots, Search Console and Pinterest setup, a professional look at the Privacy and Terms starter text, the optional 30-day activation plan (needs written owner authorisation per step).
