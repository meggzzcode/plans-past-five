# A5: Buyer independence audit

Date: 2026-11-19. Auditor stance: a buyer with no coding experience, no knowledge of the build history, no access to earlier Claude/Cowork conversations, using only `docs/buyer/*`, `README.md`, `docs/marketplace/*`, `.pages.yml` and `netlify.toml` (plus `docs/marketplace/final-inspection/BUYER-TAKEOVER.md`, which START-HERE points to). Read-only audit of the repo. Every experiment ran in `/tmp/a5-copy` (a `git archive HEAD` export with `node_modules` symlinked). Nothing was committed, nothing in the repo was changed except this report (and the empty `audit/` folder that holds it). The importer was only ever run with `--check`.

Minutes are ESTIMATES of a first-time buyer unless marked "measured". "Measured" means timed in the /tmp copy on this sandbox.

## 0. Headline

A non-coder can, on paper, do only one family of tasks alone: edit existing articles and pictures in Pages CMS and press Netlify's deploy button. Even that is not proven: no real login test has ever been run (`CMS-TEST-PLAN.md`, 16 rows, all blank), and the Pages CMS form (`.pages.yml`) was "written from the published documentation" and never opened in the live app (`.pages.yml` header). Every other task (products, kits, hobbies, affiliate switch, site name/email/analytics, link repair, first deploy, tests) needs a terminal or a code edit, and several of them also force edits to automated tests. The docs say this honestly in places (START-HERE "What we do not claim", BUYER-TAKEOVER section 1) but contradict it in others (see section 4).

## 1. Task-by-task walk-through

Rating key: NO-CODE OK / NEEDS TERMINAL / NEEDS CODE EDIT / NEEDS AI OR DEVELOPER.

### (1) Publish a new article
- Steps (no-code route, per `CMS-SETUP.md`): Pages CMS > Articles > Add an entry; fill slug, title, summary, section, Status; add blocks; add one or more sources (https), "Facts last checked on", "First published on", resolve every "Facts still waiting to be checked" line (must start with RESOLVED plus a date); set Status Published; Save; then Netlify Deploys > Trigger deploy > Deploy site.
- Tools: browser, GitHub login, Pages CMS login (via GitHub), Netlify login.
- Verified in /tmp copy: copying an article and publishing it through `scripts/build-content.mjs` works (33 published); a source URL without https and a hero picture name that does not exist are each refused with a plain-English message naming file and field (measured, 0.1 s). A new valid article did not break any automated test (only timeouts, see 15).
- Gaps: (a) never tested with a real login. (b) The form has about 20 fields plus 25 block types (`.pages.yml` lines 28-256); the docs list the fields but there is no worked example article and no explanation of block types such as `saveSplurge`, `girlsNight`, `first30`, `shopTheArticle`. (c) `searchIntent`, `angle`, `coworkChecks` are internal-process fields with no explanation in buyer docs. (d) The fact-check is the buyer's job (`docs/SOP-publish-article.md`, not in the buyer folder), and the build only checks fields exist. (e) Whether "Trigger deploy" honours the `[deploy]` skip rule is unknown (`netlify.toml` comment says so); the fallback is editing `RELEASES.md` on GitHub with a commit message ending `[deploy]`, which is a second, different, obscure procedure. (f) New article is not in the Pinterest pins CSV/plan; pins are a separate manual workflow (`docs/pinterest-pins.csv`, `design/pins`, Playwright to regenerate).
- Time (estimate): 2-4 hours to write and verify a 1,000-word article; 15 minutes of mechanics; first time add 60-90 minutes to learn the form and Netlify.
- Rating: NO-CODE OK on paper; unproven. Treat as "NO-CODE OK (unverified)".

### (2) Fix a typo in a live article
- Steps: CMS > Articles > open > edit text > Save > Trigger deploy. Set "Last updated on".
- Gaps: factual corrections also require `docs/SOP-corrections.md` and an entry in `src/content/corrections.ts` (a TypeScript file) "if the process says so" (`CONTENT-MANAGEMENT.md`). That step is a code edit with no CMS form. A pure typo does not need it, but the docs do not say which edits count as corrections.
- Experiment: editing one title character in the JSON with no rebuild makes `build-content.test.ts` "is byte-stable" fail (it reads the compiled bundle and compares to the file). Running `node scripts/build-content.mjs` first fixes it (measured). CI runs `content:build` before the tests, so CI is unaffected. Re-saving an unchanged article with a different indent (4 spaces) also fails that test, so if Pages CMS writes JSON in any format other than the project's canonical one, CI turns red after every CMS save. Nobody has checked what Pages CMS writes (CMS-TEST-PLAN row 6 is blank). The Netlify build itself does not run tests, so the site would still publish.
- Time (estimate): 5-10 minutes plus a 2-5 minute deploy wait (the 2-5 min is the docs' figure, not measured).
- Rating: NO-CODE OK (unverified), with a hidden CI-red risk.

### (3) Change an article's image
- Steps: CMS > Images > Add an entry (key, upload, alt text of 20+ characters, credit/source/licence) > Save; open article > "Top picture" > pick it > Save > deploy.
- Experiment: a CMS-style image entry (`file: "/uploads/x.jpg"`, no `w`/`h`) builds and compiles. But the first real photo in `public/uploads/` makes 3 tests in `build-content.test.ts` fail, because the test's scratch copy copies `src/assets` but not `public/uploads` ("the photo ... does not exist", measured). So the first CMS image upload turns CI red even though the site builds. Not documented anywhere.
- Contradictions: `CONTENT-MANAGEMENT.md` "Upload an image" says put the file in `src/assets/`, record it in `docs/IMAGE-LICENSES.md`; `CMS-SETUP.md` says use the Images form (files go to `public/uploads`); `HANDS-ON-RECIPES.md` gives a third route (ingest script, Pillow/sharp/ImageMagick, ledger row, `prettier --write src/data/images.extra.ts`, `embed-ai-metadata.mjs`). A buyer cannot tell which is current. The existing 39 images are in `src/assets` with a licence ledger the tests enforce (`image-ledger.test.ts`); CMS uploads bypass the ledger, so the repo's licence record silently drifts.
- Also: all existing images are AI-generated with unverified commercial terms (`IMAGE-AND-ASSET-RIGHTS.md`); a buyer replacing them needs a source they can legally use and must record it by hand.
- Time (estimate): 10-20 minutes (finding a lawful photo is the real cost).
- Rating: NO-CODE OK for a new upload via CMS (unverified, CI red afterwards); NEEDS TERMINAL via the documented script route.

### (4) Replace a discontinued product
- Steps: open `docs/commerce/product-research.csv` in a spreadsheet; set that row's `availability` to `unavailable` (or delete the row), add the replacement row (35 columns, pipe-delimited multi-values, `kitSlots` as `kit/slot`, ASIN of 10 characters); save as CSV; in a terminal run `bun run import:products docs/commerce/product-research.csv --check`, then without `--check`; `bunx vitest run`; `bun run build`; commit; deploy; edit any article text that names the old product (CMS); update `docs/commerce/AMAZON-PRODUCT-CATALOG.md`.
- Measured: `--check` on the full file: OK, 66 products, 0.06 s. Marking a verified product unavailable: still prints a single "OK" line, with no report of which kit slot, collection or article it empties. A deliberately bad ASIN is caught with a line number (good).
- Dangerous gap, measured: `--check` does NOT run the shrink guard. A 40-row CSV (39% smaller than the current 66) passed `--check` with "OK". The guard only fires on the real write (`scripts/import-products.mjs` lines 507-512). `START-HERE.md`, `PRODUCT-MANAGEMENT.md` and `BUYER-TAKEOVER.md` all say "run `--check` first", which gives false reassurance. I did not run the real write (instructed).
- Other gaps: two product layers (types in `src/data/products.ts` as search links; verified catalog) with different edit routes; article JSON contains `productIds` that refer to product types, not catalog IDs, so "which articles show this product" is not discoverable; opening a 35-column CSV in Excel can corrupt quoting/ASINs (no warning in docs); Amazon link-checking skips amazon.com entirely (`site-health.mjs` SKIP_HOSTS), so a discontinued product is found only by the buyer re-opening each listing manually (`MONTHLY-MAINTENANCE.md` step 1 says "re-verify").
- Time (estimate): 30-60 minutes if the terminal is already installed; 3-5 hours the first time including installing Bun/Node and learning git.
- Rating: NEEDS TERMINAL (and git). A non-coder alone: no (the docs themselves say "No, not today", `PRODUCT-MANAGEMENT.md`).

### (5) Add a new product
- As (4), plus the product must be researched from the live listing; "verified" means the listing was opened, not tested; no prices, ratings or stock may be stated (validators enforce).
- Gaps: the column template is `docs/commerce/PRODUCT-RESEARCH-TEMPLATE.md/.csv` (outside buyer folder); to appear on a shop page the row needs correct `hobbies`, `collections` and `kitSlots` values that match slugs in TypeScript files (`hobbies.ts`, `kits.ts`, `products.ts`). A wrong slug is caught by the importer only when cross-checks can load (it prints "skipping hobby/collection/kit cross-checks" on failure, line 445, which a buyer could miss).
- Time (estimate): 20-30 minutes per product of research plus 10 minutes mechanics, once the terminal works.
- Rating: NEEDS TERMINAL.

### (6) Update a shopping collection/kit
- Swap which products fill a kit slot: CSV `kitSlots` column (NEEDS TERMINAL, as 4/5). Change what a kit asks for (slots, essentials), add a kit, or add/rename a collection: edit `src/data/kits.ts` (272 lines) and `src/data/products.ts` (`CollectionSlug` union plus `collections` list) and the six-per-collection rule in `src/test/rules.test.ts` (`CONTENT-MANAGEMENT.md`). Tests assert counts: I measured two that hard-code the hobby count (see 7), and `rules.test.ts` also hard-codes 8 collections.
- Why a kit looks "incomplete" is not explained to a buyer: a kit renders as complete only with 4+ verified picks and every essential filled; 6 of 8 kits are incomplete today (`INVENTORY.md`), which shows on the live page as "awaiting ... verification" text (`StarterKit.tsx`).
- Time (estimate): slot swap 30 minutes; new kit/collection 2-4 hours of code and test edits.
- Rating: slot swap NEEDS TERMINAL; new kit/collection NEEDS CODE EDIT.

### (7) Add or edit a hobby
- Steps per docs (`CONTENT-MANAGEMENT.md` "Add a hobby"): edit `src/data/hobbies.ts` (1,861 lines) and "follow an existing one".
- Measured: I added one hobby. It needs two separate edits in the same file (a seed object near the top and a positional-argument `e("Easy", 0, 25, "...", ...)` enrichment entry about 800 lines lower, using internal constants such as `G_JUNK`, `comm`, `lib`), the enrichment entry is not mentioned in the docs (the docs list only the seed fields), productIds must match legacy product-type ids, and `relatedHobbies` slugs must exist. TypeScript compiled; then `hobbies.test.ts` ("keeps 43 unique hobbies") and `rules.test.ts` ("has 43 hobbies ...") both failed on the count, so the buyer must also edit two tests. The hobby page stays `noindex` until a published article lists it (documented).
- Time (estimate): 45-90 minutes for a developer; not doable by a non-coder.
- Rating: NEEDS CODE EDIT (and test edits). With an AI assistant it is feasible, which is the route `EDITING-WITHOUT-CODE.md` names.

### (8) Turn affiliate tracking on with the buyer's own Associates ID, including the disclosure
- Steps (`AFFILIATE-ACTIVATION.md`): own Amazon Associates approval (site must be live; 3 qualified sales in 180 days; tax interview; payment method); edit `src/config/affiliate.ts` (replace the `blank(...)` Amazon entry with a spread plus 6 fields: tracking id, `approvalStatus`, `active`, `lastVerified`, `approvedPromotionMethods`, `accountOwnershipNote`); run tests; update `site.legal.lastUpdated`; deploy; click a live product link to check `?tag=`.
- Measured: I made exactly that edit with a fake tag (`testsite-20`). All 754 tests passed and `tsc --noEmit` was clean. The disclosure wording is generated from the registry (`notEarning`, `AMAZON_ASSOCIATE_STATEMENT`), so the disclosure does switch by itself (`editorial-policy.tsx`, `methodology.tsx`, `affiliate-disclosure.tsx` all read the registry).
- Contradictions: `HANDS-ON-RECIPES.md` says "expect about 9 existing tests to fail ... update those expectations"; `BUYER-TAKEOVER.md` says "several tests ... fail by design"; `AMAZON-ASSOCIATES-PATH.md` says tests asserting "don't currently earn" must be updated. `AFFILIATE-ACTIVATION.md` says the suite is green as is. My run agrees with the last: 0 failures. A buyer reading the first three will "fix" tests that are not broken, or will panic.
- Other gaps: Amazon's own rules (disclosure placement, no Special Links in exports, link and price rules) are "re-read live"; `AFFILIATE-SETUP.md` asks for a lawyer review; the site-health link checker cannot verify that tags are present on the live site (it skips Amazon). `scripts/amazon-links-inventory.mjs` can (needs a built, served site). No on-site proof is offered beyond clicking one link.
- Time (estimate): 20 minutes of code edit once approved (the approval itself takes weeks and needs live traffic); 1-2 hours first time because of terminal and git.
- Rating: NEEDS CODE EDIT (a TypeScript object edit, 8 lines). Smallest possible, but still code.

### (9) Change site name, contact email or analytics ID
- Where: `src/config/site.ts` (`name`, `contactEmail`, `analytics.ga4MeasurementId`; also `legal.*`, `publisher*`, `integrations.*`).
- Measured: I changed all three in one copy. Seven tests failed:
  - GA4 ID set: `analytics.test.ts` (3 tests, including "is empty by default"), `shop.test.tsx` "tracking is a no-op by default";
  - email set to a non-default: `publisher-trust-links.test.tsx` warning test;
  - name change: `manifest.test.ts`;
  - `affiliate-config-independence.test.ts` also failed in the combined run (it re-runs the suite; not isolated further).
  The docs mention the analytics and publisher tests ("update them if you ship with an ID") but not the manifest test for a name change.
- Site name is not a single setting. "Plans Past Five" is hard-coded in 16 source files outside tests (about 19 occurrences: `Wordmark.tsx`, `about.tsx`, `terms.tsx`, `privacy.tsx`, `contact.tsx`, `methodology.tsx`, `editorial-policy.tsx`, `corrections.tsx`, `saved.tsx`, `ShareButtons.tsx`, `kits.ts`, `shoplist.ts`, `export-links.ts`, `saved-transfer.ts`, `affiliate-programs.ts`), in `public/manifest.webmanifest`, `public/robots.txt`, the logo SVGs/PNGs, 88 pin images and `design/` sources. `docs/buyer/BRAND-GUIDELINES.md` is the only guide and the pin images cannot be regenerated without Playwright (undeclared in `package.json`). Domain: `planspastfive.com` appears in `site.ts` and `public/robots.txt` (two places to keep in sync by hand).
- Contradiction: `DOMAIN-AND-EMAIL.md`, `ACCOUNT-DEPENDENCIES.md`, `TROUBLESHOOTING.md` ("Contact page has no email. Intended") and `README.md` say `contactEmail` is empty; `src/config/site.ts` now ships `contactEmail: "hello@planspastfive.com"` with the comment "owner confirmed 2026-11-19; mailbox round-trip test is Cowork workstream F". So the live site will show a mailbox whose existence the repo cannot confirm, and a buyer who does not get that mailbox in the sale ships a dead contact address unless they change it (and fix a test).
- Time (estimate): email or GA4 ID: 15-30 minutes with terminal, plus test edits; rename: 1-2 days with a designer or tool.
- Rating: email and analytics ID NEEDS CODE EDIT (plus test edits); rename NEEDS AI OR DEVELOPER.

### (10) Deploy a release and roll back a bad one
- Deploy: Netlify Deploys > Trigger deploy > Deploy site, or a commit message ending `[deploy]` (README gives git commands; CMS-SETUP gives the GitHub "edit RELEASES.md" route). Build: `bun install --frozen-lockfile && bun run build`, `NITRO_PRESET=netlify` set in `netlify.toml`.
- Measured: `bash scripts/check-netlify-ignore.sh` passes all 6 rules; `bun run build` completed in 5.5 s (default Cloudflare-style `.output`); a built copy served and answered 200. A Netlify-preset build was not rerun.
- Rollback: Netlify Deploys > earlier deploy > Publish deploy, then switch Auto publish back on; or revert on GitHub (commit > ... > Revert > Create pull request > Merge > deploy).
- Gaps: (a) Not tested on a real Netlify account by anyone except one seller-owned test deploy, which is not transferred; the skip rule, Trigger deploy behaviour, the real domain and headers are "unverified" (`HOSTING-AND-DEPLOYMENT.md`). (b) Credits (300/month, 15 per deploy, 8 deploys/month recommended) are second-hand ("re-read live"; no saved copy) and a buyer who exceeds them pauses the site. (c) The first deploy needs a developer or "patient assistant for a few hours" per BUYER-TAKEOVER; the repo has three ways to publish and two ways to roll back with different risks. (d) Rollback by "Publish deploy" restores a build but not the repo; the next deploy rebuilds the bad commit unless the commit is also reverted. The docs mention the git route as "permanent" but do not warn about this. (e) Lovable's connection ("Never force-push") is explained only as a warning; a buyer without Lovable has no reason to avoid force-push yet is told to.
- Time (estimate): publish 5 minutes plus 2-5 minute wait; rollback 5 minutes; initial hosting setup 3-6 hours for a non-developer.
- Rating: publish via button NO-CODE OK (unverified); first setup NEEDS AI OR DEVELOPER; git revert route NEEDS TERMINAL-level comfort (it can be done in the GitHub web UI).

### (11) Renew domain and email
- Docs (`DOMAIN-AND-EMAIL.md`) give no renewal steps at all. They say the domain was registered at Namecheap with a Private Email mailbox, "not connected to hosting and the mailbox untested", that the repo "cannot show ownership, expiry or renewal price", and that inclusion in the sale is an owner decision. There is no calendar/reminder guidance, no renewal price, no auto-renew advice, no WHOIS/privacy advice, and no statement of who the registrant is.
- A buyer needs: registrar login (transfer or account push), auto-renew switched on, payment card, an expiry-date reminder. Email SPF/DKIM/DMARC "as the provider instructs".
- Time (estimate): 10 minutes a year if auto-renew is on and the account is theirs; transfer 1-7 days (registrar rules vary; "re-read live").
- Rating: NO-CODE OK, but undocumented. Expiry of the domain is a total-loss risk that no doc addresses.

### (12) Fix a broken outbound link found by a link check
- Run: build, `node scripts/serve-built.mjs 3000`, `bun scripts/site-health.mjs links --base http://localhost:3000` (or the Monday GitHub Action that opens an issue).
- Measured (build and serve in /tmp, 5.5 s build): the check took 99 s and reported "98 sitemap URLs, 112 internal links, 196 external links" and 17 external problems (403 x11, 405, timeouts x2, a TLS failure). It reports the URL only: not which article contains it. 403/405 are usually bot-blocking and the doc says to treat them as advisory, so the buyer has no way to tell real breakage from blocking without opening each in a browser. Amazon, Pinterest and others are skipped entirely.
- Fix: find the URL in an article's `sources` or body (the CMS has no search across articles; GitHub's search or a grep is needed), edit it in the CMS, deploy. Correcting a source's claim also triggers the corrections SOP.
- Time (estimate): 10-20 minutes per link plus detective time to locate it; the weekly checklist is 30 minutes by the doc's own estimate (not measured here).
- Rating: reading the GitHub issue: NO-CODE OK; running locally: NEEDS TERMINAL; fixing: NO-CODE OK once located; locating: NEEDS TERMINAL or GitHub code search.

### (13) Understand why the site shows a "not yet tested" or "draft" state
- What a buyer can actually see:
  - Docs: a banner "NOT YET TESTED WITH A REAL LOGIN" copied into 4 buyer docs (`CONTENT-MANAGEMENT`, `EDITING-WITHOUT-CODE`, `CMS-SETUP`, `CMS-TEST-PLAN`, `NETLIFY-CREDITS-AND-RELEASES`) with no date-stamp of when it is cleared and no checklist saying who clears it. It refers to a Cowork test (`docs/cowork`) that a buyer with no Claude access cannot run as written.
  - Site: articles with Status Draft do not appear (2 drafts); product records with status `candidate` never show (29); verified products on "editorial hold" never show (8); kits show "awaiting external verification" text for unfilled essentials (6 of 8 kits). "Hobby pages are `noindex` until a published article lists the hobby."
  - None of this is explained in one place in plain English. "Verified", "candidate", "hold", "complete kit", "draft", "published but not live" are defined in four different docs and in code comments (`catalog.ts` line 84). The "hold" reason is a free-text field only visible in the CSV.
  - The word "published" has three meanings in the docs: Status Published in the CMS (on the branch), built into the compiled bundle, and live on a deployed site. START-HERE tries to explain this ("Saved is not Published") but the CMS form option itself says "Published (live after you press Publish in Netlify)".
- Rating: NEEDS AI OR DEVELOPER for the product/kit states (explanation is only in code), NO-CODE OK for article drafts.

### (14) Move hosting/accounts to the buyer's own (GitHub, Netlify, Namecheap, Pages CMS, GA4, Search Console, Pinterest, Amazon Associates)
- Docs: `ACCOUNT-DEPENDENCIES.md`, `TRANSFER-CHECKLIST.md` (20 steps), `HOSTING-AND-DEPLOYMENT.md`.
- Findings: the checklist is written seller-and-buyer in escrow terms; there is no buyer-only, ordered "first week" list in the buyer folder (it is in `docs/marketplace/final-inspection/NEW-OWNER-QUICKSTART.md`, which an unaware buyer must find via START-HERE). Steps that need a developer: creating the Netlify site from the GitHub copy with Bun lockfile build, setting the production branch, DNS records, editing `site.url` and `public/robots.txt`, Search Console/Pinterest verification codes in `src/config/site.ts`, headers verification with `curl -I`. Pages CMS: sign in with GitHub, add project, choose branch main (3 clicks), but the repo access must be granted per repository and nothing says what to do when the GitHub account owning the repo is an organisation. Netlify's seller test project, Pages CMS connection, GA4, Search Console and Pinterest are not transferable or do not exist yet; the buyer creates all of them new.
- Open items: Node and Bun versions are not pinned (no `.nvmrc`/`engines`); the Vite/TanStack/Nitro setup depends on `@lovable.dev/vite-tanstack-config`, a third-party npm package from Lovable (BUYER-TAKEOVER section 4) with no pinned fallback; `.lovable/`, `.wrangler`, `.tanstack` and `.output` directories exist in the working folder and are build residue (`.output/server/wrangler.json` carries a seller-derived name per TRANSFER-CHECKLIST step 4).
- Time (estimate): 4-8 hours for a developer; 1-2 days of elapsed time for a non-coder with an assistant.
- Rating: NEEDS AI OR DEVELOPER.

### (15) Run the tests and know when something is broken
- Steps: install Bun and Node 22 (not pinned), `bun install --frozen-lockfile`, `bunx vitest run`, `bunx tsc --noEmit`, `bun run build`; or read the green/red tick on GitHub Actions (`ci.yml` runs content:build, vitest, tsc, vite build on every push and PR).
- Measured: `bunx vitest run` = 754 tests in 55 files, about 48 s on this sandbox. Two-three tests (`wave-b-tools.test.tsx`, `planner-quiz.test.ts`) hit the default 5 s timeout under parallel load in 2 of 3 full runs and pass when run alone (22 passed in 9 s). A buyer will see red and not know it is noise. No `testTimeout` in `vitest.config.ts`.
- Counts disagree between docs: `INVENTORY.md` says 737 passed in 51 files; `BUYER-FAQ.md` says 735 in 50 files; HEAD actually runs 754 in 55. START-HERE states "no other document should repeat a number" yet the FAQ and takeover files do.
- Reading results: the output is for developers (stack traces). The only documented plain-English layer is the content build and the CI summary. A red CI email goes to the GitHub account owner, with no explanation of what to do.
- Time (estimate): reading the green tick 1 minute; running locally 30-60 minutes first time (BUYER-TAKEOVER), 1 minute after.
- Rating: checking CI status NO-CODE OK; running locally NEEDS TERMINAL; diagnosing a failure NEEDS AI OR DEVELOPER.

## 2. Everything that currently requires technical knowledge

### 2.1 Source code changes
1. Affiliate switch (`src/config/affiliate.ts`).
2. Site name, contact email, analytics ID, legal/publisher fields, Search Console/Pinterest verification codes, domain, social URLs (`src/config/site.ts`), plus `public/robots.txt` Sitemap line and `public/manifest.webmanifest`.
3. Hobbies (`src/data/hobbies.ts`, two coordinated entries).
4. Kits, kit slots, collections (`src/data/kits.ts`, `src/data/products.ts`).
5. Homepage features (`src/routes/index.tsx`), page layout and design, brand colours (`src/styles.css`).
6. Corrections log (`src/content/corrections.ts`) and the changelog page (`src/content/changelog.ts`, "What changed").
7. Renaming the site (16 source files, logos, 88 pins).
8. Hosting change (a different Nitro preset or config).

### 2.2 Terminal commands
`bun install`, `bun run dev`, `bun run build`, `bunx vitest run`, `bunx tsc --noEmit`, `bun run content:build`, `bun run content:format`, `bun run import:products [--check|--force]`, `bun run health:*`, `node scripts/serve-built.mjs`, `git commit --allow-empty -m "... [deploy]"`, `git bundle create`, `zip -r`, `node scripts/ingest-images.mjs`, `node scripts/embed-ai-metadata.mjs`, `bunx prettier --write src/data/images.extra.ts` (and, which the instructions for this audit forbid on article JSON, a buyer running `bun run format` or `prettier --write .` would reformat `content/articles/*.json`; nothing in `package.json` or `.prettierignore` was checked for that, and I did not test it).

### 2.3 Manual deployment
The Netlify button; the `[deploy]` commit marker; `RELEASES.md` edit; turning Auto publish back on after a rollback; Netlify credit watching (monthly).

### 2.4 AI assistance (stated in the docs as the route)
Hobbies, products, config edits, layout ("Lovable chat or an AI assistant", `EDITING-WITHOUT-CODE.md`, `PRODUCT-MANAGEMENT.md`). Docs recommend the Lovable chat but the Lovable project is the seller's and not transferable (`ACCOUNT-DEPENDENCIES.md`); a buyer without it must pay for some other AI/dev help, with no hand-off prompt for a non-Lovable assistant except two example prompts in `PRODUCT-MANAGEMENT.md`.

### 2.5 Developer intervention
First deploy; DNS and domain connection; headers verification; Pinterest/pin image regeneration (Playwright, Chromium, fonttools, Pillow: all undeclared); fixing a red build; dependency updates ("merge green Dependabot PRs" is a weekly task and is itself a decision about code); the `@lovable.dev/vite-tanstack-config` dependency risk.

### 2.6 Multiple external accounts
See section 5 (up to 11 separate logins).

### 2.7 Editing duplicated data
1. Domain: `src/config/site.ts` `domain` and `url`, `public/robots.txt`, canonical tags follow `site.url`; GA4 ID has two fields in `site.ts` (`integrations.googleAnalyticsId` "follows" the real one).
2. Product facts: `docs/commerce/product-research.csv` (source), `src/data/catalog.generated.ts` (compiled), `docs/commerce/AMAZON-PRODUCT-CATALOG.md` (hand-maintained register), the legacy `src/data/products.ts` (separate list of product types), article prose that names products, and `docs/IMAGE-LICENSES.md` + `docs/content/IMAGE-LICENCE-LEDGER.md` for images (two licence files).
3. Image records: `content/images/*.json`, `src/data/images.generated.ts`, `src/data/images.extra.ts`, `src/assets`, `public/uploads`, the ledger, and `docs/IMAGE-LICENSES.md`.
4. Site name: 16 files plus public assets.
5. Counts: tests hard-code 43 hobbies, 8 collections, six products per collection.
6. Generated files (`src/content/generated/*`, `src/data/images.generated.ts`) are committed copies that lag any CMS save until a build; README says to commit them, `CMS-SETUP.md` says the lag is fine.
7. Pins: `docs/pinterest-pins.csv`, `public/pins`, `design/pins` sources, `src/data/pins.ts`, each new article needs three pins made by hand.

### 2.8 Undocumented or hard-to-find technical relationships
- Test suite as a hidden second rulebook: 7 tests fail on three ordinary config edits; one hobby edit fails 2; the first CMS image upload fails 3 (measured).
- `--check` skips the shrink guard (measured).
- Two product layers (types vs verified catalog), and `productIds` in articles refer to types.
- Hobby enrichment entry is positional and lives 800 lines from the seed.
- "Published" vs "built" vs "live".
- Kit completeness rule (4 verified + every essential) and why 6 of 8 kits are incomplete.
- Editorial hold reasons live only in the CSV.
- The Netlify skip rule vs the manual Trigger deploy (unknown).
- The Nitro preset: `bun run build` makes `.output` (Cloudflare), Netlify's build makes `dist` (`HANDS-ON-RECIPES.md` explains; `SECURITY-AND-BACKUPS.md` says deploy `.output`, which the recipes file calls wrong).
- `bunx vite build` (used in CI and 5 buyer docs) skips the content build that `bun run build` runs first.
- CI byte-stable test on article JSON formatting vs whatever Pages CMS writes.

## 3. Documentation problems found (missing, contradictory, wrong)

| # | Where | Problem | Severity |
|---|---|---|---|
| D1 | `BUYER-FAQ.md` | Says "There is no CMS; content changes are file edits" and "735 passed in 50 files"; the CMS exists and HEAD runs 754 in 55 | Med (listing-facing doc) |
| D2 | `DOMAIN-AND-EMAIL.md`, `ACCOUNT-DEPENDENCIES.md`, `TROUBLESHOOTING.md`, `README.md` | `contactEmail` described as empty; `site.ts` ships `hello@planspastfive.com` | High (live dead address risk) |
| D3 | `HANDS-ON-RECIPES.md`, `BUYER-TAKEOVER.md`, `AMAZON-ASSOCIATES-PATH.md` vs `AFFILIATE-ACTIVATION.md` | "about 9 tests fail" vs "suite stays green"; measured: zero fail | Med |
| D4 | `CONTENT-MANAGEMENT.md` vs `CMS-SETUP.md` vs `HANDS-ON-RECIPES.md` | Three different image procedures | High |
| D5 | `PRODUCT-MANAGEMENT.md`, `START-HERE.md` | "run --check first; a guard refuses shrinks": `--check` does not run the guard | High |
| D6 | `START-HERE.md` day-one vs `docs/marketplace/final-inspection/NEW-OWNER-QUICKSTART.md` | Two first-week lists; neither is a no-code path | Med |
| D7 | `SECURITY-AND-BACKUPS.md` vs `HANDS-ON-RECIPES.md` | "deploy `.output`" vs Netlify `dist` | Med |
| D8 | 5 buyer docs | `bunx vite build` suggested; it skips the content step | Low |
| D9 | `INVENTORY.md` | Says generated from commit 61c8e8a; 737 tests vs 754 measured | Low |
| D10 | `DOMAIN-AND-EMAIL.md` | No renewal, expiry, auto-renew or registrant guidance at all | High |
| D11 | all | No document answers "why is a kit/product/hobby hidden" in plain English | Med |
| D12 | `CMS-SETUP.md` | Pages CMS never opened live; `.pages.yml` "written from the published documentation" | High |
| D13 | `WEEKLY-MAINTENANCE.md` | Steps 2 (merge Dependabot) and 5 (run tests) assume terminal and code judgement | Med |
| D14 | `README.md` "Content workflow" | "Commit both the JSON and the generated files" vs `CMS-SETUP.md` | Low |

## 4. Recommendations (smallest change first), with CMS form / spreadsheet / button / disappear

Principle: every number or word a buyer might change should live in one data file that a form or spreadsheet edits, and no edit to it should need a test to be edited.

1. Make tests not depend on content or config values (S-M). Replace hard-coded counts (43 hobbies, 8 collections, empty `ga4MeasurementId`, empty publisher fields, manifest name equals "Plans Past Five") with relationships (unique slugs, each hobby has enrichment, manifest name equals `site.name`). Add `public/uploads` to the scratch copy in `build-content.test.ts`. Set `testTimeout` higher. This alone removes 7+2+3 spurious reds measured here. Also drop the byte-stable formatting assertion from CI or make CI re-format first, until the CMS output is known. Disappear: the whole "update the tests" class of docs.
2. Move owner-editable settings into a data file that is not code (M): a `content/settings.json` for name, tagline, contact email, GA4 ID, verification codes, Pinterest/Instagram URLs, publisher, legal owner/jurisdiction; Pages CMS form "Site settings" (already anticipated and deliberately refused in `.pages.yml`; I would reverse that: validate formats in `build-content.mjs`, which already validates GA4 format and https for sources, so a wrong value fails the build and the live site stays). Becomes a CMS form.
3. Affiliate tag as the same kind of setting (S once 2 exists): `content/settings.json` fields `amazonTrackingId` and a single "I am approved" checkbox (`active`). Keep the registry code as the guard; the form only fills `websiteTrackingId`, `approvalStatus`, `active`, `lastVerified`. The disclosure already follows the registry. Becomes a CMS form (two fields and a checkbox).
4. One source for the site name in public files (S-M): generate `manifest.webmanifest` and the `Sitemap:` line in `robots.txt` from `site.ts` in `build-content.mjs`; replace the 16 hard-coded names with `site.name`. Wordmark stays an asset. Disappear: duplicated names and domain.
5. Fix `import:products --check` to run the shrink guard and to print a diff ("1 product hidden, kit junk-journaling/washi-tape now empty") (S). Add an "ADD / CHANGE / REMOVE" summary.
6. Products as a spreadsheet, end to end (M-L): publish the CSV as a Google Sheet or Excel template with data validation (dropdowns for status, availability, collections, kit slots; ASIN length check) and a "Download as CSV" step; add a `.github/workflows` action "Import products" that a buyer triggers from the GitHub web UI (workflow_dispatch with a CSV file path), runs the importer with `--check`, commits `catalog.generated.ts`, and posts the result as a comment. That makes products NO-CODE with a button. Also make the CSV `availability` flip a one-cell edit with the check output as the confirmation.
7. A "Publish" button without Netlify's credit model uncertainty (S-M): add a GitHub Actions `workflow_dispatch` that pushes an empty commit with `[deploy]` (or call a Netlify build hook), so there is one documented publish procedure instead of three. Test it on a real account before handover; if Trigger deploy honours the skip rule, drop the marker rule altogether and keep the two-button flow.
8. Hobbies in a CMS form (L): move the seeds and enrichments into `content/hobbies/*.json` (one file per hobby, one merged schema; the `e()` positional call becomes named fields), generate `hobbies.ts` data in the content build, form in `.pages.yml`. Delete the positional enrichment constants. Until then, document the two-place edit.
9. Kits: keep as code but add a read-only "why is this kit incomplete" report to the content build output and the monthly digest (S). Collections become a short list in the same settings file (M).
10. Images: pick one route and remove the others (S): CMS Images form only; make `build-content.mjs` write the ledger row for uploaded images, or have the ledger generated from `content/images/*.json`. Delete the ingest script, Pillow, `embed-ai-metadata` and the hand-kept `IMAGE-LICENSES.md` from the buyer docs. Disappear: three image procedures and two licence files.
11. Link repair (S-M): make `site-health links` print the page(s) that contain each URL and split "likely bot-blocked (403/405)" from "404/DNS fail"; surface the weekly result as a GitHub issue that already exists. Add an inline "link replaced" note field to articles. Amazon links: run `amazon-links-inventory` in the weekly workflow and list ASINs whose listing page returns 404 (note: Amazon may block bots; treat as advisory).
12. One page, "Why is it hidden?" (S, writing): explain draft, candidate, hold, incomplete kit, noindex hobby, "saved/built/live" in plain language, linked from START-HERE. Include a labelled list of what "NOT YET TESTED" means and delete the banner after the real login test.
13. Run the real CMS login test (S-M) before sale. Nothing else in the "articles are no-code" claim is credible until `CMS-TEST-PLAN.md` rows are filled and committed. If it fails, remove the claim from the listing.
14. Domain/email renewal sheet (S): a one-page doc: registrar, registrant, expiry date, renewal price, auto-renew on, who gets the reminder; MX/SPF/DKIM state; add `DOMAIN-RENEWAL.md` and a calendar-ready field in the transfer checklist.
15. Pin the toolchain (S): add `.nvmrc`, `engines`, `packageManager` so Netlify and local match; `bun.lock` already exists.
16. A "Run checks" button (S): the existing `ci.yml` already runs on each push; add a plain-English summary (the content-build lines plus "tests: 754 passed") to the job summary, and tell the buyer that a green tick on GitHub is the whole test routine.
17. Retire the wrong guidance (S): fix D1-D9 from the table; decide one numbers-only home (INVENTORY) and make the generator also write the FAQ line.

## 5. Accounts the buyer must hold

Full set mentioned in the docs (each one a separate login/payment relationship):
1. GitHub (repo, CI, Pages CMS sign-in, Dependabot).
2. Netlify (hosting, deploys, credits).
3. Domain registrar (Namecheap today, if the domain transfers) with DNS.
4. Mailbox (Namecheap Private Email today, may be the same account as 3).
5. Google account for Google Analytics 4.
6. Google Search Console (same Google account as 5, separate property).
7. Pinterest business account.
8. Amazon Associates (plus tax interview and payment method; not transferable).
9. Pages CMS (no separate account, signs in with GitHub per the docs).
10. An AI assistant or developer (Lovable project is not transferable and not needed to run; the docs still steer non-coders to "Lovable chat").
11. Optional: Bing Webmaster, Instagram, TikTok, Canva (not needed), password manager, legal reviewer.

Minimum viable set to own, edit and publish: GitHub + Netlify + domain registrar (with its mailbox). That is three logins and a card. Pages CMS rides on GitHub. Everything else is a growth step: Google (one login for GA4 and Search Console) before Pinterest, Amazon Associates only once the site is live with real content (Amazon requires a reviewable site), which means the monetisation prerequisite is the domain plus a working deploy.

Reduction options: use one Google account for GA4 and Search Console; keep mailbox with the registrar; move DNS to Netlify only if the registrar is kept for renewal; consider deferring Pinterest (the 88 pin images exist, but posting them is a manual workflow).

## 6. Honest sale-risk of each remaining dependency

| Dependency | Why it matters to a buyer or reviewer | Sale risk |
|---|---|---|
| CMS never tested with a real login | The listing's no-code claim rests on it; if it fails, the "articles in a browser" promise is false and the whole site is developer-only | High |
| Products need terminal/CSV; hobbies need code | Two of the three main growth levers (shop, hobbies) are not buyer-operable; honestly stated in the docs, but a reviewer will price it as "needs a developer on retainer" | High |
| Tests as hidden rulebook | A non-developer changing three settings sees 7 red tests; a developer buyer sees it as a bad sign | Med-High |
| First deploy only done on the seller's test account; skip rule and Trigger deploy untested | "Not live" plus "publishing untested" invites a heavy discount | High |
| Netlify free-plan credit model (300, 15 per deploy) copied from memory, no saved copy | If wrong, a buyer over-spends or the site pauses | Med |
| Mailbox in `site.ts` that may not transfer | Buyer ships a dead contact address; legal pages show it | Med-High |
| Domain/mailbox ownership unconfirmed and no renewal procedure | Domain expiry is a total loss | High |
| Image rights unverified (AI-generated), ledger bypassed by CMS uploads | Commercial-use and transfer terms open; adds legal doubt | High |
| Dependency on `@lovable.dev/vite-tanstack-config` and an unpinned toolchain | Build break risk later with no non-coder remedy | Med |
| Amazon approval (3 sales in 180 days, live site) | The monetisation path starts only after traffic exists; docs say so | Med (expectation) |
| Pins are manual and tool-heavy | Distribution depends on Pinterest effort | Med |
| Drift between docs and code (D1-D9) | A buyer who finds contradictions doubts the rest | Med |

## 7. Independent view where it differs from decisions already made

1. Reverse "site settings deliberately not in the CMS" (`.pages.yml` last comment, `EDITING-WITHOUT-CODE.md`). The reason given (a wrong value breaks tracking) is already covered by validation in the build; keeping these in TypeScript is what forces test edits and developer help for three of the five most common owner tasks.
2. Do not market "no-code" for anything but articles and pictures until the live test passes; today's listing wording already says that, keep it.
3. Reconsider the "Saved is not Published" model. It protects a free-plan credit budget that has not been verified live. The cost is a three-way publish procedure and a button a buyer can forget. If credits are in fact generous or the buyer pays a few dollars, deploy-on-save removes the whole concept.
4. Drop Lovable as the recommended assistant in buyer docs. It is not transferable, so for a buyer it is a dead route; replace with a neutral written brief ("hand this file to any developer or AI tool") and the two example prompts.
5. Remove the ingest script route and the ledger duplication from buyer-facing docs; one image path.

## 8. Ranked findings

Severity: Critical / High / Med / Low. Workload: buyer hours per occurrence of the affected job or per month. Effort: S (under a day), M (1-3 days), L (more).

| Rank | Finding | Severity | Buyer-workload impact | Effort |
|---|---|---|---|---|
| 1 | CMS and Trigger-deploy workflow never tested with a real login; no-code claim unproven | Critical | Decides whether anything is no-code | S-M |
| 2 | Site settings (name, email, GA4, affiliate tag) are TypeScript and each edit fails tests | High | 1-3 h per change and developer help | M |
| 3 | `import:products --check` omits the shrink guard; products need CSV, terminal, tests, deploy | High | 30-60 min per product after terminal setup; data-loss risk | S (guard), M-L (spreadsheet + action) |
| 4 | Hobbies need two coordinated code edits and two test edits | High | 45-90 min per hobby; blocks non-coders | L (CMS form) or S (document) |
| 5 | Three conflicting image procedures; CMS uploads bypass ledger and break 3 tests | High | 20+ min per image and red CI | S |
| 6 | Domain/email renewal and ownership undocumented | High | Annual; total-loss risk | S |
| 7 | `contactEmail` ships a mailbox the docs say is empty; docs contradict code | High | 15-30 min plus dead address risk | S |
| 8 | First deploy, DNS, accounts migration need a developer | High | 4-8 h developer or 1-2 days elapsed | M |
| 9 | Site name hard-coded in 16 files, manifest, robots, pins | Med | 1-2 days if renamed | M |
| 10 | Link check reports URLs without article and mixes bot-blocks with real breaks; skips Amazon | Med | 10-20 min per link plus search | S-M |
| 11 | Flaky 5 s test timeouts and conflicting test counts; no plain-English check summary | Med | Confuses "is it broken?" | S |
| 12 | Kit/product hidden states not explained anywhere in plain English | Med | Support questions | S |
| 13 | Affiliate docs say 9 tests fail; measured 0 | Med | Needless test edits | S |
| 14 | Toolchain unpinned; Lovable-owned build config dependency | Med | Future build break | S-M |
| 15 | Up to 11 separate accounts; minimum is 3 | Med | Setup effort | S (documentation of minimum) |

## 9. Summary (5 lines)

1. A non-coder can, on paper, edit articles and pictures in a browser and press one Netlify button, but that path has never been tested with a real login, so even it is unproven.
2. Products, kits, hobbies, site name, contact email, analytics ID, affiliate tag, first deploy and link repair all need a terminal, a code edit or an assistant, and in my /tmp copy ordinary edits to settings, a hobby or an image upload made 7, 2 and 3 tests fail.
3. Docs contradict the code in places (contact email, tests failing on affiliate switch, image procedure, "no CMS"), and the importer's `--check` hides its shrink guard, which is the most dangerous gap I found.
4. Minimum viable ownership is three accounts (GitHub, Netlify, registrar with mailbox); the full set is up to eleven.
5. Smallest fixes with the biggest effect: decouple tests from content, move settings and the affiliate tag into one CMS form, run the real CMS test, one image path, one publish path, and a domain-renewal page.
