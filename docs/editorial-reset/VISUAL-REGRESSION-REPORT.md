# Stage 1 visual and behavioural regression report

Date: 2026-11-19. Read-only verification; nothing was committed and no repo file other than this report was touched.

**Verdict: PASS. No customer-visible regression was found.** All 80 full-page screenshot pairs are byte-identical between the pre-reset baseline and the Stage 1 build. Journeys, console output, keyboard focus and accessibility results are identical too.

## Method

| Item | Value |
|---|---|
| Before | `b376648` (pre-reset baseline, branch `claude/vibrant-dirac-amdf7r`), `git archive` into `/tmp/vr/before`, port 5981 |
| After | `editorial-reset` at `101e08b`, `git archive` into `/tmp/vr/after`, port 5982 |
| Note | The branch tip moved to `2e0219b` while this ran (other agents). "After" is the `101e08b` snapshot; the later commits are docs/drafts under `docs/editorial-reset/` |
| Build and serve | `bun install`, `bun run build` (default Nitro output), then each copy's own `scripts/serve-built.mjs <port>` |
| Browser | Playwright 1.63 Chromium, 1280x900 and 390x844 (mobile with touch), deviceScaleFactor 1, `reducedMotion: reduce`, wait for network idle, scroll the whole page to trigger lazy images, scroll back to top |
| Diff | Python PIL (ImageMagick `convert`/`compare` also present). Exact byte comparison plus a per-pixel diff with threshold 16 |
| Artifacts | Screenshots `/tmp/vr/shots/`, scripts `/tmp/vr/scripts/`, raw data `/tmp/vr/capture.json`, `/tmp/vr/journeys.json`, `/tmp/vr/diff.json`, vitest JSON `/tmp/vr/vt/` |

Size check: client CSS is 107,104 B before (`styles-DzotUMBp.css`) and 58,811 B after (`styles-CfY-xPKL.css`), a 45% cut, matching the 107 KB to 59 KB claim.

## 1. Screenshot pixel diff

40 pages x 2 viewports = 80 pairs: **80 of 80 byte-identical, 0.00% difference everywhere, identical page heights.** Pages:

- Core: home, `/hobby-finder`, quiz result (`/hobby-finder?q=7&a=cr.lo.so.ho.sh.fr`), `/hobbies`, hobby pages junk-journaling, mahjong and hiking.
- Planner and tools: `/make-plans`, `/tools/tonight`, `/tools/hobby-budget`.
- Category landers: `/after-hours`, `/weekends`, `/solo-dates`, `/better-together`, `/movement`, `/creative-corner`.
- Journal: `/journal` and 5 articles (junk-journaling: image + starterKit + girlsNight; picnic: makePlan + starterKit; after-work: noSpend + first30; hobbies-to-try: quote + girlsNight; book-club: quote + list).
- Shop: `/shop` and creative-girl, cozy-after-hours, pottery-era.
- Utility: `/saved`, `/search`, `/search?q=clay`, `/about`, `/contact`, `/start-here`, 404.
- Policy: `/privacy`, `/terms`, `/editorial-policy`, `/affiliate-disclosure`, `/changelog`, `/methodology`, `/corrections`.

Because every pair is identical there is no "most different pair" to inspect. I read the home (desktop), quiz result (mobile) and mobile-menu captures to confirm the pages render fully (not blank or unstyled).

Why identical, and a check that it is not a false negative:
- The two servers serve different bundles (different CSS hash in the HTML).
- The server-rendered HTML is identical apart from asset hashes. I diffed `/`, `/about`, `/hobbies/mahjong`, `/journal/how-to-start-a-book-club`, `/shop/creative-girl` and `/saved`; only the 4 hashed asset URLs and the router manifest differ. `sitemap.xml` and `robots.txt` are identical.
- A selector diff of the two stylesheets shows 473 class selectors removed. A word-boundary search of `src/` outside `components/ui/` for the 29 that looked possibly used found no class-token use. The hits were substrings of prose such as "after dark". Removed keyframes: `pulse`, `enter`, `exit`, `accordion-down`, `accordion-up`, `caret-blink`. All came from `tw-animate-css` or `components/ui`, and nothing outside `components/ui` referenced them.
- No source file outside `src/components/ui/` imported `components/ui/*` in the baseline. No `animate-in`, `fade-in`, `slide-in`, `zoom-in`, `data-[state=...]` or `accordion` classes were used in non-ui source.

### Content differences between the commits (not CSS), and whether they show up
- `content/settings.json` is new. `src/config/site.ts` now reads `siteName`, `tagline`, `siteUrl` and `contactEmail` from it. The values are identical to the strings that were hard-coded: "Plans Past Five", "Making a life, not just a living.", `https://planspastfive.com`, `hello@planspastfive.com`. Rendered title, header, footer and copied URLs match. The only other place the name is interpolated is `ShareButtons.tsx`, `shoplist.ts` and `saved-transfer.ts` (`${site.name}`), and the copied text is the same. Not CSS-caused and not user-visible.
- `src/config/affiliate.ts` now carries `amazonTrackingId: planspastfive-20` with `amazonTrackingEnabled: false`. Product links on `/shop/creative-girl` are the same `https://www.amazon.com/dp/...` hrefs in both builds (no tag appended while tracking is off). If tracking is enabled, link hrefs will change by design.
- Other changed files (`scripts/content-lib.mjs`, `build-content.mjs`, tests, `.pages.yml`, `netlify.toml`, docs) do not touch rendered output.

## 2. Console errors (every captured page, both builds, both viewports)

Identical in both builds. The only console message on any page is `Failed to load resource: 404`, from the 404 page itself, which is expected. There were no page errors, no hydration warnings, no failed requests and no HTTP 4xx/5xx on the other 39 pages. All pages returned 200, and `/no-such-page-xyz` returned 404.

## 3. Interactive journeys (before == after for every item)

| Journey | Result in both builds |
|---|---|
| Mobile menu (390px) | `aria-expanded` false, then true on open. 20 links. Escape closes it. The Menu button also closes it. Choosing a link navigates to `/hobby-finder` and closes the menu. Open-state screenshot identical |
| Save/unsave | "Save to My Plans: Mahjong" becomes "Saved to My Plans: Mahjong". `localStorage` key `ppf:my-plans:v1` is written. Header badge shows 1. `/saved` lists it with "Remove Mahjong"; removing works. Only the `savedAt` timestamp differs between runs |
| Share | "Copy link" puts `https://planspastfive.com/hobbies/mahjong` on the clipboard. The `role=status` live region says "Copied." |
| Shopping list | "Add the starters to my list" and per-product add work. Buttons change to "On my shopping list: ...". "Copy my list" copies `Mahjong shopping list (Plans Past Five)` / `Made 2026-11-19...`, and status reads "Copied." and "2 on your list". `/shop/creative-girl` per-item add works. "Print my list" is present but was not exercised |
| Quiz | 6 steps, Back works, browser Back works, results page, "Copy link" ok. "Send to the group chat" and "Save as image" ("Image saved.") raise no errors. "Take it again" works |
| Search | `?q=clay` returns 21 results with Hobbies (2) first. `zzzzqq` returns the empty state with suggestions. The header search icon goes to `/search` |
| Planner | `/tools/tonight` Shuffle changes ideas. `/make-plans` "Plan my weekend" renders the plan |
| Dialog, sheet, popover, toast | None exists in the product. Feedback uses a custom `role=status` live region, not the removed `components/ui` toast/dialog. Nothing was lost |
| Skip link | First Tab focuses "Skip to content", visible. Enter moves to `#main` (same in both) |
| Focus order and rings | 22 Tab stops on home, hobby page and article: identical element sequence and identical computed outline (2px solid) in both builds |
| Motion | With `reduce`: 0 running animations. With `no-preference`: 0 running animations on home after 1.5 s, and screenshot identical. The only stylesheet difference is that the unused `tw-animate-css` keyframes are gone |

### Accessibility (axe-core 4.10.2 injected via Playwright; 4 desktop pages and 2 mobile pages)
Results are identical before and after. This is not a regression and nothing new was introduced.
- Home (desktop and mobile): 0 violations. This includes colour contrast.
- Hobby page: `landmark-complementary-is-top-level` x1 (`#supplies`).
- Article: `landmark-complementary-is-top-level` x3.
- Shop category: `landmark-complementary-is-top-level` x2 and `landmark-unique` x1 (starter-kit `aside`).
- Quiz result (mobile): `heading-order` x1 (an h3 under an h1).

These are moderate, pre-existing issues. They are worth fixing in a later stage (nested `aside` landmarks in starter kits, and the result-card heading level), but they are out of scope for Stage 1.

### Not covered
- Root `ErrorComponent` (the Lovable error reporter was removed from it). It cannot be triggered from normal navigation, so it is untested visually. The reporter removal only dropped a `useEffect` side effect, so there is no rendering change.
- Print stylesheet output and a real-device share sheet.

## 4. Vitest reliability (`/tmp/vr/after`, 772 tests)

11 full runs: 5 sequential in one directory, and 3 rounds of two runs in parallel (the second in a copy, `after2`, because `global-setup` rewrites generated files and two runs in one directory would race).

**0 failures in 11 of 11 runs, 772 of 772 passing each time. No flaky test was observed.**

| Run set | Wall time |
|---|---|
| Sequential 1-5 | 55.1, 50.4, 26.6, 25.2, 24.9 s |
| Parallel pairs 1-3 | 49.8, 80.5, 76.9 s (both runs of each pair finish within about 1 s of each other) |

Sequential runs 1-2 were about twice as slow as 3-5. The machine is shared with other agents, so this is load, not a regression.

Tests over 5 s (the Vitest default timeout, which only the per-file `setConfig({ testTimeout: 60_000 })` prevents from failing):

| Test (file) | Seq range | Parallel range |
|---|---|---|
| `affiliate-config-independence` "forced inactive and forced active" (spawns nested vitest runs; 240 s own limit) | 6.7 to 13.1 s | 13.4 to 26.6 s |
| `wave-b-tools` defect 1 "every stop suits the chosen company" | 5.3 to 9.1 (seq 3 and 5 under 5 s) | 7.8 to 19.9 s |
| `tool-scenarios` "day/time x company x budget x energy x vibe" | 5.5, 7.3 (seq 1-2 only) | 7.5 to 15.3 s |
| `tool-scenarios` "setting x home x company x budget x vibe" | 7.6 (seq 2) | 7.6 to 14.5 s |
| `wave-b-tools` defect 2 "waking-hours window" | 6.0, 6.2 | 5.2 to 10.8 s |
| `tool-scenarios` "every empty day explains..." | 5.2 (seq 2) | 5.5 to 7.6 s |
| `planner-quiz` "TOTAL itinerary inside the budget" | none | 5.0 s (once) |

Slowest 10 tests by mean over 11 runs (ms; max and min in parentheses):
1. affiliate-config-independence forced inactive/active: 16,011 (26,630 / 6,683)
2. wave-b-tools defect 1 company hard constraint: 10,050 (19,909 / 3,882)
3. tool-scenarios day/time matrix: 8,667 (15,288 / 3,815)
4. tool-scenarios setting x home matrix: 8,089 (14,509 / 3,614)
5. wave-b-tools defect 2 waking-hours: 6,390 (10,833 / 2,593)
6. tool-scenarios empty-day relax: 4,676 (7,571 / 2,308)
7. planner-quiz TOTAL itinerary inside budget: 2,648 (5,016 / 1,217)
8. planner-quiz non-overlapping time slots: 2,060 (3,476 / 1,099)
9. wave-b-tools defect 3 same-day, no ahead-of-time steps: 1,964 (3,137 / 865)
10. planner-quiz budget-as-blocker explanation: 1,737 (3,598 / 1,003)

Slowest files (mean wall): `tool-scenarios` 24.6 s (11.8 to 38.2), `wave-b-tools` 18.5 s (7.8 to 30.2), `affiliate-config-independence` 16.0 s, `planner-quiz` 9.2 s, `planner-flow` 5.1 s.

Reliability reading: the planner suites are correct and deterministic (`makePlan(input, 0)` is pure), but they are load-sensitive. Under parallel load their durations roughly double (up to 3.5x). They only avoid the 5 s default timeout because of `vi.setConfig({ testTimeout: 60_000 })` in 3 files. The 60 s margin held in all 11 runs (worst single test 26.6 s, nested-vitest test), so a timeout is not an imminent risk. The longer-term risk is a slower CI machine, because `tool-scenarios` took up to 38 s per file.

### Why the two heavy suites are slow (measured, not guessed)
- `makePlan` costs about 0.22 ms per call (15,680 calls took 3.4 s). A second identical pass took the same time, so there is no internal cache.
- Input counts: `tool-scenarios` `planInputs()` is 17 when/length pairs x 4 who x 5 budget x 4 energy x 7 vibe = **9,520 plans**. The same generator is walked **twice** (the day/time matrix and the empty-day test), plus 1,680 plans for the setting matrix. `wave-b-tools` `inputs()` is 7 x 4 x 4 x 7 x 3 x 4 = **9,408 plans**. It is walked **three times** (defects 1, 2 and 3). `planner-quiz` adds 2,380.
- In total there are about 51,000 `makePlan` calls (about 11 s of pure CPU) for roughly 24,000 distinct inputs (planInputs 9,520 + inputs 9,408 partly overlapping + settings 1,680 + quiz 2,380, before overlap).
- Vitest parallelises across files, not within a file, so the longest file sets the wall time. `tool-scenarios` and `wave-b-tools` hold 6 or more heavy tests that run back to back in one worker.

### Proposals that lose no coverage (in order of preference)
1. **Memoise plans per file.** Add a tiny helper, for example `src/test/plan-cache.ts`: `const cache = new Map<string, Plan>(); export const planFor = (i: PlanInput) => cache.get(JSON.stringify(i)) ?? ...`, and use it where tests call `makePlan(input, 0)` over the full matrices. Every plan assertion stays, since they only read the plan. Expected saving: `wave-b-tools` computes 9,408 plans once instead of 3 times (about 4 s of 6 s CPU), and `tool-scenarios` computes 9,520 once instead of twice (about 2 s). Roughly 25% of total planner CPU. Caveat: the cache must hold a frozen or never-mutated plan. `checkPlan` and the relax test only read it. `planFromIds` receives the ids, not the plan object.
2. **Split the heavy files so workers share the load.** Move each of the 3 planner matrices in `tool-scenarios` (plus the 3 in `wave-b-tools`) into their own `*.test.ts` file, for example `planner-matrix-daytime.test.ts`. The assertions are unchanged. With 4 CPUs the longest file drops from about 25 s to about 8 s, and the parallel-load doubling shrinks, because files then interleave on idle cores. This was the biggest wall-time win without any change in what is checked.
3. **Share one precomputed grid across files.** A `globalSetup` or a vitest `provide()` that builds the union grid once and hands plain data to workers. This is more complex than 1 and 2 and brings less once 1 and 2 are done; keep it as an option only.
4. **If you want cheaper default runs: tiered sampling.** Keep the exhaustive matrices behind `FULL_MATRIX=1` (CI release gate, nightly) and run a deterministic stratified sample by default. For example every 4th combination by index plus all `energy=any, budget=free` and `who=group` rows, which is about 2,400 plans, or a pairwise covering array for the 6 dimensions (about 150 to 250 cases). This does lose coverage of high-order interactions, so I would only adopt it with the full run kept on CI.
5. **Keep the timeout headroom** as is (60 s). The affiliate nested-vitest test is the real outlier (6.7 to 26.6 s, it runs the suite twice in a child process); consider `--quick` running only the affiliate-sensitive test files rather than the full suite. I did not verify what `--quick` selects.

Recommended path: 1 plus 2 (lossless). I estimate a sequential run would drop from about 25 s to about 18 s and a parallel run from about 77 s to about 45 s. That is an estimate from the measured `makePlan` cost, not a trial.

## 5. Article count reconciliation

**Authoritative current state (measured):** `content/articles/` holds **34** JSON files, **32 `status: "published"` plus 2 `status: "draft"`**. The drafts are `cute-weekend-plans-that-arent-brunch.json` and `make-friends-as-an-adult-through-hobbies.json` (heading-only outlines). `src/content/generated/published.json` holds 32 records and `/journal` and `sitemap.xml` list 32 article pages. `git ls-files content/articles` is 34. The only valid wordings are "32 published articles, 2 outline drafts" or "34 article files (32 published, 2 draft)". Content-build message: "32 published, 2 draft".

### Correct (no action)
`docs/buyer/INVENTORY.md:9` (32; generated by `scripts/inventory.mjs:138`), `docs/marketplace/BUYER-FAQ.md:27`, `docs/marketplace/LISTING-DRAFT.md:48,94`, `docs/marketplace/final-inspection/LISTING-DRAFT-FINAL.md:16`, `docs/marketplace/final-inspection/FINAL-SCORECARD.md:32`, `docs/marketplace/final-inspection/SECURITY-RISK-REGISTER.md:66`, `docs/marketplace/final-inspection/TECHNICAL-QA.md:18,82`, `docs/cowork/COWORK-FINAL-PACK.md:25`, `docs/cowork/TRACKER-UPDATE-PACKET.md:9`, `docs/commerce/MONETISATION-PLAN.md:9`, `docs/content/verification-final/EDITORIAL-CLEANUP.md:3`, `docs/content/IMAGE-AUDIT.md:6`, `docs/content/IMAGE-SOURCING-BRIEF.md:3`, `docs/editorial-reset/backup/README.md:2`, `docs/editorial-reset/audit/A3-CODE-DEPS-FEATURES.md:163`, `A1-CUSTOMER-NAV.md:49,126`, `A2-COMMERCIAL-DATA.md:35` ("34 rendered article pages" in the baseline build is loose, since drafts are not rendered; the rendered pages are 32), `docs/editorial-reset/changes/stage2a.md:29` ("all 34 articles" is correct for files).

### Stale or wrong, to fix (do not fix here)
Current-state docs that a reader or buyer would take as today's truth:
- `docs/marketplace/presentation/README.md:42`: "27 published articles; 5 draft article files; 2 outline-only stubs". Should say 32 published and 2 outline drafts (34 files).
- `docs/marketplace/ASSET-INVENTORY.md:14`: "Published articles (27 `status: "published"`)". Should be 32, and the `src/content/article-*.ts` path is itself stale (now `content/articles/*.json`).
- `docs/marketplace/TURNKEY-READINESS.md:65`: "27 of 30". Should be 32 of 30 (target exceeded) or the target restated, since the original 30-article target has been passed.
- `docs/buyer/FRESH-CLONE-LOG.md:18`: "27 published and 7 draft articles" (quoted build output). Now "32 published and 2 draft", and 14 images remains true.
- `docs/RESUME.md:12` ("now 27 published, 5 drafts") and `:21` ("the other 23 published articles"; "5 drafts left NOT READY"): stale resume notes.
- `docs/marketplace/final-inspection/MAINTENANCE-MEASURED.md:15` ("Content OK: 27 published and 7 draft") and `:26` ("28 published and 6 draft"): measured snapshots, now 32 and 2.
- `docs/marketplace/final-inspection/MARKETPLACE-POSITIONING.md:77`: "commission 27 articles' worth" (should be 32).
- `docs/content/INTERNAL-LINKING-REPORT.md:5`: "the 27 published articles" and `docs/content/ARTICLE-FIXES.md:7`: "across all 27" (point-in-time reports; add a dated note or leave as history).
- `docs/editorial-reset/audit/A4-DOCS-HANDOVER-WORKLOAD.md:86` cites `BUYER-FAQ.md:29`, which does not exist at `docs/buyer/`. The file is `docs/marketplace/BUYER-FAQ.md` and the count sits on line 27. The same line cites "27 + 5-7 drafts" correctly as the stale disagreeing source.
- `docs/editorial-reset/audit/A1-CUSTOMER-NAV.md:197`: "about 28 to 32" is a forecast after consolidation (not a count), but make it match PLAN.md when decided.

Point-in-time review and audit records (written when 27 was true; best left as history, or given a one-line "superseded, now 32" banner): `docs/marketplace/final-inspection/BUYER-REVIEW-SUMMARY.md:71`, `COMMERCIAL-AUDIT.md:5`, `reviews/B1-FIRST-TIME-BUYER.md:22`, `reviews/B2-AFFILIATE-INVESTOR.md:14,40,53`, `docs/marketplace/marketing/M3-ARTICLES-1.md:5` ("27 published; 7 draft"), `docs/marketplace/reviews2/R2-4-AFFILIATE-PROGRAM-MANAGER.md:9,28`, `R2-5-TURNKEY-SITE-BUYER.md:13` ("33 article JSON files; 27 claimed published"), `docs/marketplace/reviews3/R3-5-TURNKEY-SITE-BUYER.md:10,23,25,106` ("34 files (27 published, 7 draft)"), `R3-4-AFFILIATE-PROGRAM-MANAGER.md:6,43` ("30 journal stories"), `docs/marketplace/path-to-8/P2-TRUST-CREDIBILITY.md:58`.

Code: **no source or script hard-codes an article count.** The only numeric mention is the comment at `src/test/images.test.ts:26` ("14 images cover 34 articles"). It should read "32 published articles" (the 2 drafts have no hero). `scripts/inventory.mjs:138-139` computes counts, so it is correct.

Not article counts (deliberately left): "30 articles" as a target or plan in `docs/TURNKEY-PLAN.md:30`, `docs/content/EDITORIAL-STRATEGY.md:27,29`, `docs/marketing/CONTENT-DISTRIBUTION.md:43` and `docs/editorial-reset/new-library/E1-EDITORIAL-CALENDAR.md:9,116,209,1070` (30 new articles commissioned). "30 article-only product types" and "30-minute method" are unrelated.

## 6. Regressions

None found. No removed file or dependency (`src/components/ui/*`, `tw-animate-css`, `@tanstack/react-query` wiring, `lovable-error-reporting.ts`, `use-mobile.tsx`, the 39 packages) has any observable customer effect. Items worth noting that are not regressions: pre-existing axe landmark/heading findings (section 3), and the root error boundary, which is untested.

## Summary (6 lines)
1. PASS: 80 of 80 full-page screenshot pairs (40 pages x desktop and mobile) are byte-identical, 0.00% difference. SSR HTML, sitemap and robots differ only in asset hashes. CSS shrank 107,104 B to 58,811 B, and every removed selector was unused.
2. Content differences (`content/settings.json`, `site.name` interpolation, `affiliate.ts` tag off) produce identical rendered text and links, so none is customer-visible.
3. Interactive journeys (mobile menu, save/unsave, share/copy, shopping list, quiz, search, planner, skip link, 22-stop focus order, reduced motion) and axe results are identical before and after. Console has no errors except the expected 404 resource line on the 404 page. The pre-existing axe items (nested `aside` landmarks, one heading-order case) are not Stage 1's.
4. Vitest: 11 of 11 runs (5 sequential, 3 pairs in parallel), 772 of 772 passing, no flake. 7 tests exceed 5 s and survive only on the 60 s per-file timeout. The heaviest are the nested-vitest affiliate test (up to 26.6 s) and the `tool-scenarios` and `wave-b-tools` matrices (up to 15 to 20 s under parallel load).
5. Planner speed-up without losing coverage: memoise `makePlan(input, 0)` per file (the same 9.4 to 9.5k-plan grid is walked 2 to 3 times, about 0.22 ms each) and split the 6 matrix tests into separate files so workers share them. Both are lossless. Sampling is an optional tier with the full run kept on CI.
6. Article count: 34 files = 32 published + 2 drafts (`cute-weekend-plans-that-arent-brunch`, `make-friends-as-an-adult-through-hobbies`). Stale "27 / 5 or 7 drafts" statements are listed with file:line in section 5 (`docs/marketplace/presentation/README.md:42`, `ASSET-INVENTORY.md:14`, `TURNKEY-READINESS.md:65`, `docs/buyer/FRESH-CLONE-LOG.md:18`, `docs/RESUME.md:12,21`, `MAINTENANCE-MEASURED.md:15,26`, `MARKETPLACE-POSITIONING.md:77`), plus the `src/test/images.test.ts:26` comment ("34 articles").
