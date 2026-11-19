# Maintenance time, measured (2026-11-19)

Rule: only machine time I actually measured, in a scratch copy of the repo (rsync-style copy without node_modules, .git or build output), never the real repo. Wall-clock seconds from a shell timer on a shared Linux sandbox with other jobs running, so treat as indicative, within about 2x. Human time (reading, writing, deciding) was NOT measured and is listed in section 4. Bun 1.4.4, Node 22.23.5.

## 1. Measured commands

| Workflow the docs promise | Command | Wall-clock | Result |
|---|---|---|---|
| Clean install, cold cache | `BUN_INSTALL_CACHE_DIR=<empty> bun install --frozen-lockfile` | 4.2 s (0.1 s with warm cache) | 520 packages, OK |
| Default build | `bun run build` (runs `scripts/build-content.mjs` first) | 4.1 s to 8.7 s over runs | OK |
| Netlify build | `NITRO_PRESET=netlify bun run build` | 5.1 s to 5.8 s | OK, `dist/` 23 MB plus function |
| Vercel build | `NITRO_PRESET=vercel bun run build` | 5.9 s | OK (not deployed) |
| Content validation | `bun run content:build` | 0.1 to 0.5 s | "Content OK: 27 published and 7 draft articles" |
| Tests | `bunx vitest run` | 16.5 to 28.7 s | 644 passed |
| Typecheck | `bunx tsc --noEmit` | 6.9 to 16.5 s | OK |
| CI equivalent (content, tests, tsc, build) | sum of the above | about 35 to 60 s | OK. GitHub's runners may be slower or faster: NOT measured there. |
| Health: internal links and sitemap | build, serve with `scripts/serve-built.mjs`, then `bun scripts/site-health.mjs links --base http://localhost:PORT` | 55.2 s | Exit 0; external sites mayoclinic.org and archivalmethods.com returned 403 (advisory only, as the docs say) |
| Health: freshness | `bun scripts/site-health.mjs freshness` | 0.2 s | "All clear" |
| Health: digest | `bun scripts/site-health.mjs digest` | under 0.1 s | counts printed (36 products in 8 collections; 4 published articles with no verifiedAt) |
| Dependency update | `bun update` then tests, typecheck, build | 4.8 s update, then 20.4 + 8.4 + 6.1 = about 35 s | All passed after update (644 tests). Lockfile changed by 245 insertions, 293 deletions. `bun audit` findings fell from 20 to 6. |
| Netlify build after update | `NITRO_PRESET=netlify bun run build` | 5.1 s | OK |

### 1a. Publish an article (JSON content route)
Machine loop measured: edited `content/articles/how-to-start-crocheting.json` in the scratch copy to `status: published` with dates, then `content:build` (0.1 s, "28 published and 6 draft"), `vitest` (18.0 s), `tsc` (10.4 s), `vite build` (4.5 s): about 33 s total.
Finding: flipping the status alone is NOT enough. Vitest failed 4 tests: an unsupported-superlative check ("perfect" in the body), two internal-link checks (a `related` slug and an inline link did not resolve) and a byte-stable formatting check (my Python rewrite reformatted the JSON). The five `coworkChecks` on that draft are still marked OPEN or unresolved in the file. So the gates work as advertised, and publishing a draft means real editing and source verification; the time for that is NOT measurable here.

### 1b. Update products with the CSV importer
- `bun run import:products docs/commerce/PRODUCT-RESEARCH-TEMPLATE.csv` ran in 0.0 s but the template contains no real rows (0 products). In my scratch run the following full test run failed 8 tests until I restored `src/data/catalog.generated.ts` from the real repo, so running the importer on an empty CSV appears to blank the catalog: treat as a hazard. (The tool output for that step was interleaved; I did not isolate the exact write.)
- The shipped `docs/commerce/product-research.csv` currently FAILS validation: 3 problems (two rows' text trips the price/scarcity-claim check; one role value is not allowed). `product-research.cowork-latest.csv` fails with 8 problems (for example an unknown hobby "paint-night"). Nothing was written for either, as designed.
- With those 3 rows removed (`mini.csv`, 61 products): `--check` 0.0 s OK; import 0.0 s ("Wrote 61 products (35 verified, 26 candidates)"); vitest 17.0 s, 644 passed; build 3.9 s. Machine loop about 21 s.
- Current docs say 62 catalog records; the real CSV inputs do not import cleanly today, so the documented 62-record state is not reproducible from the CSVs in the repo. Docs say the importer ships an empty catalog (`docs/commerce/IMPORT-DRY-RUN.md`), which is out of date.

### 1c. Lint
`bun run lint` (eslint .) did NOT finish: still running at 100% CPU after more than 9 minutes in the scratch copy, so I killed it. Not part of CI or the maintenance docs. Cause not investigated; could be linting generated or documentation folders. Unresolved: do not promise lint in a maintenance routine.

## 2. What the machine time adds up to
- Weekly automated health run (Actions): about 1.5 to 2 minutes of compute (install 4 s, tests 17 s, build 5 s, links 55 s, freshness under 1 s), no human time if nothing fails.
- Owner verification loop after any content or product edit: about 30 to 60 seconds of waiting.
- Dependency update PR loop: about 40 seconds of waiting plus review.
- Release to Netlify: build 5 s locally; the hosted build time was NOT measured (no deployed site tested).

## 3. Dependency risks (evidence from `bun audit`, `bun outdated`, `npm view`, 2026-11-19)
| Risk | Evidence | Severity |
|---|---|---|
| Pinned pre-release framework: `nitro` 3.0.260603-beta | npm `latest` is now 3.0.261103-rc (modified 2026-11-03). A beta underpins the server build; the Lovable config peer range also allows only nitro >= 3.0.260603-beta. | HIGH for stability, no exploit evidence |
| Single vendor build-config package `@lovable.dev/vite-tanstack-config` 2.27.2 | Latest tag 2.27.2, modified 2026-11-13 (maintained). Needed to build; public npm. | MEDIUM (removal would break fresh installs) |
| `bun audit` total, as locked | 20 vulnerabilities: 9 high, 10 moderate, 1 low | see below |
| `bun audit --prod` | 8 vulnerabilities: 2 high, 5 moderate, 1 low (prod graph: vite 8.1.5 launch-editor, zod 3.25.76, seroval 1.6.8) | MEDIUM |
| zod 3.25.76 | high: memory exhaustion validating oversized collections (fixed in 4.6.6+, a major upgrade) | MEDIUM: input is the author's own content, no public form |
| vite 8.1.5 (exact pin) | advisories apply to the dev server and launch-editor, not to the static output; latest is 8.3.8 | LOW to MEDIUM (dev machine only) |
| brace-expansion, minimatch (dev tooling) | 6 high DoS advisories | LOW (build-time tools) |
| seroval 1.6.8 | moderate code-injection advisories in serialization; fix 1.6.10/1.6.11; `bun update` cleared part of the findings | MEDIUM until updated; arrives via TanStack |
| vitest/@vitest/mocker 4.1.11 | moderate, fixed in 4.1.12 (dev only) | LOW |
| After `bun update` in scratch | 6 remain (2 high, 3 moderate, 1 low); pinned exact versions (vite, TanStack, nitro) are not moved by `bun update` and need manual edits | n/a |
| Many packages behind | `bun outdated` lists a long run (Radix, hookform resolvers 5 to 7, vitest 4 to 5, vite 8.1 to 8.3). | LOW |
| Runtime versions | Bun 1.4.4 locally versus 1.4.5 latest; Node 22 (active). CI uses `oven-sh/setup-bun@v2` unpinned so CI bun can differ. | LOW |
| Abandoned packages | Only nitro, the Lovable config, TanStack Start and bun had publish dates checked (all active, last modified Nov 2026). A full abandonment scan of 520 packages was NOT done. | UNKNOWN |

Note: `bun audit` is not run in CI; Dependabot (weekly, grouped, max 3 PRs) is the only automated path.

## 4. Cannot be measured here (state honestly to a buyer)
- Writing, source-checking and editing an article (the docs say hours; no sample taken).
- Researching and verifying a product listing on Amazon.
- Affiliate link spot-check (`docs/SOP-affiliate-link-check.md`), reading the Search Console and Netlify billing pages, rotating account access.
- Pages CMS editing: `.pages.yml` has never been opened in the live app, so no timing exists.
- Hosted Netlify build time, deploy credits actually consumed, bandwidth per visitor.
- Reviewing and merging Dependabot PRs, and fixing a failed update.
- Pinterest scheduling (`docs/PINTEREST-90-DAY-SCHEDULE.md`).
- Any time for first-time setup of accounts (domain, email, host, GitHub transfer).
The docs' own figures (about 30 minutes weekly routine, 1 to 2 hours monthly) are the author's estimates; only the machine part of them (2 to 3 minutes weekly) is measured above.
