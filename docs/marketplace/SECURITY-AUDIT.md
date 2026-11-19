# Security and personal-data audit

Date: 2026-11-19. Scope: the repository `plans-past-five` (frontend-only TanStack Start site, Cloudflare/Nitro build output). Covers sale gates 7 (no known critical security issues) and 19 (personal credentials excluded) in `TURNKEY-READINESS.md`.

## Method

| Check | How |
| --- | --- |
| Secrets and personal data, working tree | `git grep -I` over all 622 tracked files (excluding `bun.lock`) for key and token shapes (`sk-`, `AKIA`, `ghp_`, `github_pat_`, `xox`, JWT `eyJ...`, `AIza`, PEM private keys), `api_key`/`secret`/`password`/`token` assignments, Supabase/Lovable terms, `VITE_*` vars, email addresses, tax and bank terms (SSN, EIN, IBAN, routing/account number, PayPal, Venmo), and absolute home paths. |
| Secrets and personal data, git history | The same patterns run with `git grep` against every commit from `git rev-list --all` (18 commits, all branches). Also listed every file ever added or deleted whose name looks like `.env`, `.pem`, `.key`, `.whl`, secrets or credentials (none), and all commit author and committer identities. |
| Images | Tracked PNG and JPG files in `public/` and `design/` checked for EXIF artist, copyright, GPS and software tags (none found). |
| Dependencies | `bun audit` and `bun audit --prod` (bun 1.4.4, network through the proxy worked). `npm audit` cannot run: there is no `package-lock.json` (ENOLOCK). |
| Exposure | Read all routes in `src/routes`; searched `console.*`; ran `bunx vite build` and inspected `.output` for `.map` files, env references, secrets, draft content and tooling metadata. |
| Third-party hosts | Built site served with `node scripts/serve-built.mjs` (`vite preview` fails: it expects `dist/`), then 25 routes loaded in Playwright chromium and every request to a non-local origin recorded. |

No secret values appear in this report.

## Findings

| # | Severity | Location | Finding | Recommendation | Owner |
| --- | --- | --- | --- | --- | --- |
| F1 | Medium (business, not a vulnerability) | `src/content/index.ts` line 76 filters drafts at runtime, but every article module is imported, so all of them ship in `.output/public/assets/content-*.js` and `.output/server/_ssr/content-*.mjs` | 28 of 32 articles are `status: "draft"` and are fully readable in the public JavaScript, including the internal `coworkChecks` verification notes (56 occurrences) and the unpublished text of `article-low-energy-hobbies.ts`. Anyone can read unpublished content and internal fact-check to-dos from the live site. | Before launch either publish those articles or stop bundling drafts (load drafts only in dev, or strip `coworkChecks`/draft entries at build time). Needs a `src/**` change, so it was not made in this audit. Tell the buyer drafts are public until fixed. | FIXED 2026-11-19 by the lead: drafts moved to src/content/draft-registry.ts (not imported by site code); build output re-checked, no draft text or `coworkChecks` string remains; src/test/content-registry.test.ts guards it |
| F2 | Medium | `bun audit --prod`: `zod@3.25.76` (direct dependency, GHSA-mrhx-c7xc-m3w5, high) | Memory exhaustion on oversized constrained collections; fixed only in zod 4.6.6+ (a major). `src` does not import zod directly, so it is used only through `@hookform/resolvers` and build tooling; not reachable from untrusted input on this static-style site. | Do not upgrade now. Plan a zod 4 move with the buyer's first dependency pass. | Buyer |
| F3 | Low | `vite@8.1.5` (exactly pinned in `package.json` and `overrides`) bundling `launch-editor` (GHSA-587h-7wmj-h5pm, high, Windows only) plus 1 low and 3 moderate Vite/launch-editor advisories | Affect the dev server only; none ship in the build. Fixed versions exist in vite 8.3.x but the pin is deliberate (managed by `@lovable.dev/vite-tanstack-config`), so it was left alone. | Raise the pin when Lovable config allows it; run the dev server only on trusted networks. | Buyer |
| F4 | Low | `seroval@1.6.8` (2 moderate advisories: code and script injection when serializing attacker-controlled typed arrays or RegExp) | Used by TanStack SSR to serialize loader data. All data here is static and first-party, no user input is serialized, so not reachable today. `bun update seroval` moves it to 1.8.2 cleanly but it is only moderate, so it was not applied under the audit rules. | Apply `bun update seroval` and re-run tests at first maintenance. | Buyer |
| F5 | Low | Dev-only: `brace-expansion` 1.x and 5.x (9 high ReDoS/stack advisories), `minimatch`, `@vitest/mocker` | Reached through eslint, typescript-eslint and vitest. Never part of the built site. | Let Dependabot (`.github/dependabot.yml`) propose the patch bumps. | Buyer |
| F6 | Info | `.output/server/wrangler.json` (gitignored) | The Cloudflare worker name is generated from the GitHub remote and contains the owner's GitHub handle. Not committed, but it ships if `.output` is zipped and handed over. The same handle is in the git remote URL in `.git/config`. | Hand over a clean export (no `.output`, `.wrangler`, `.tanstack`, `.git/config` remote) or re-clone and change the remote before transfer. Confirm with the owner whether the handle is private. | Owner |
| F7 | Info (portability) | `docs/marketplace/presentation/README.md` line 16 (`cd /home/user/plans-past-five`) | Absolute home path in a committed doc. Harmless, not a secret. | Replace with a relative path. | Next docs worker |
| F8 | Info (portability, history only) | Deleted files `design/kits/hobby-era-kit/src/_cover.html` and `design/kits/weekend-edit-kit/src/_cover.html` (line 16, `file:///home/user/plans-past-five/...`) | Absolute paths exist only in git history. No tracked file in `design/` or `public/` has one. | Optional: ship a squashed history or a source-only export. | Owner |
| F9 | Info | `public/_headers` | `Cache-Control` rule for `/assets/*` is emitted as `immutable_chunks` by the build step (not a valid directive value), and CSP, HSTS and X-Frame-Options are deliberately not set (documented in the file). Security headers only apply on hosts that read `_headers`. | Confirm headers on the real host after deploy. | Buyer |

### Resolved during this audit

Applied with `bun update js-yaml nanoid source-map-js launch-editor` (patch and minor bumps inside existing ranges; `package.json` unchanged, only `bun.lock`):

| Package | Before | After | Advisory removed |
| --- | --- | --- | --- |
| js-yaml | 4.3.0 | 4.3.2 | 2 high (CPU exhaustion) |
| nanoid | 3.3.16 | 3.3.20 | 1 high (infinite loop) |
| source-map-js | 1.2.1 | 1.2.2 | 1 high (event-loop DoS) |
| launch-editor (top-level copy) | 2.14.1 | 2.14.2 | patch only; Vite's own copy remains flagged (F3) |

Advisory counts, all dependencies: 27 (14 high, 12 moderate, 1 low) before, 20 (9 high, 10 moderate, 1 low) after. Production-scoped (`--prod`, which includes the Vite build tooling because it sits in `dependencies`): 12 (6 high, 5 moderate, 1 low) before, 8 (2 high, 5 moderate, 1 low) after. No critical advisories at any point.

Verification after the change: `bunx tsc --noEmit` clean; `bunx vite build` succeeded; `bun install --frozen-lockfile` clean. `bunx vitest run` shows 191 pass and 2 fail in `src/test/shop.test.tsx` ("ships an empty catalog", "empty-catalog parity"). The same 2 fail with the original `bun.lock`, so they come from another worker's uncommitted edit to `src/data/catalog.generated.ts` (12 products in the catalog where the test expects none), not from this change.

### Reachability in a static-style site

The deployed artifact is pre-rendered/edge-rendered React with no database, no auth, no server functions that take user input, and no form posts. Advisories in `vite`, `launch-editor`, `eslint`, `vitest`, `minimatch` and `brace-expansion` affect developer machines and CI only. `zod`, `seroval` and `nanoid` run in or are bundled with the site but are only fed first-party static data, so the advisories are not exploitable by a visitor today.

## Checks and evidence

| Check | Result | Evidence |
| --- | --- | --- |
| Private keys, API keys, tokens, JWTs, `.env` in tree | PASS | No matches. Only hits for "Supabase" and "secret" are comments in `src/start.ts` lines 29-31, `src/lib/lovable-error-reporting.ts` line 55, `AGENTS.md` line 18 and a printable "Host's secret" tip. `.gitignore` excludes `*.local`, `.dev.vars`, `.wrangler/`. |
| Same in git history (18 commits) | PASS | Same hits only. No `.env`, key, `.whl`, zip or secret-named file was ever added. |
| Supabase or Lovable keys | PASS | No Supabase project, no `supabase/` folder, no Lovable key. `.lovable/project.json` holds only a template name and revision id. |
| Personal email addresses | PASS | The only address in any tracked file or any commit is `a@b.com` in `src/test/shop.test.tsx` line 407 (test fixture, not a problem). `src/config/site.ts` `contactEmail` is empty. Commit authors are `Claude`, `Lovable` and `gpt-engineer-app[bot]` noreply addresses only. |
| Owner's name or handle in committed files | PASS | `git grep` of the GitHub handle over the tree and all history: no matches. It appears only in the git remote URL and the generated build output (F6). |
| Tax, bank, password terms | PASS | Only policy wording ("never put passwords, codes or tax details in any file", "password manager" advice, "payment and tax accounts excluded") in `docs/`. No values. |
| Affiliate IDs and tracking tags | PASS | `src/config/affiliate.ts` ships with empty tracking ids and everything inactive. |
| Stray files in `public/` and `design/` | PASS | `public/` holds `_headers`, favicons, `robots.txt` and 35-plus pin images; `design/` holds brand and pin sources. No `.env`, wheel or archive files, and no image metadata with names, GPS or software tags. Absolute paths: see F7 and F8. |
| Admin or debug routes | PASS | Every route file in `src/routes` was reviewed; none is an admin, debug, API or dev route. `/saved` and `/search` are disallowed in `robots.txt` (user-facing, not sensitive). |
| `console.log` of data in the site | PASS | `src/` has only `console.error` in error handlers (`server.ts`, `start.ts`, `__root.tsx`, `error-capture.ts`). `console.log` appears only in `scripts/` CLI tools. |
| Source maps in build output | PASS | `find .output -name '*.map'` returns nothing (236 files). |
| Env or secrets in build output | PASS | No `import.meta.env`, `process.env` or `VITE_` strings in `.output/public`; no key or JWT shapes anywhere in `.output`. |
| Draft content in built output | PASS after fix (re-checked 2026-11-19: no `coworkChecks` string in .output after the registry split). Original finding: FAIL | The draft-only sentences ("stand in the kitchen eating crackers over the sink", "a spot that will annoy you tomorrow"), the title "20 Cozy Hobbies to Try After a Long Day" and the string `coworkChecks` are all present in `.output/public/assets/content-DvALnnMe.js` and `.output/server/_ssr/content-DGui__gm.mjs`. See F1. |
| `.lovable/` or tooling metadata shipping | PASS | `.lovable/` is not in `.output`. The build output does contain a small Lovable error-reporting hook (`window.__lovableReportRuntimeError`, only active inside the Lovable editor preview) which makes no network call by itself. `.wrangler/`, `.output/`, `.tanstack/` are gitignored, but exist in the working folder (see F6). |
| Local paths in build output | PASS | No `/home/user` string in `.output`. |

## Third-party hosts called by the pages

25 routes loaded in a real browser against the production build. Result: exactly two external origins, both Google Fonts. No analytics, tag manager, ad, chat, form-handler or CDN image host is called with the shipped (empty) analytics setting. Setting `analytics.ga4MeasurementId` adds `www.googletagmanager.com` (see `docs/buyer/ANALYTICS-SETUP.md`).

| Host | Type | Where | How to remove |
| --- | --- | --- | --- |
| `fonts.googleapis.com` | Stylesheet | `src/routes/__root.tsx` (preconnect and stylesheet link, around lines 112-116), every page | Delete the three font links and self-host Caveat, DM Sans and Fraunces. The font files and their OFL licences are already in `design/brand/fonts/`. This also removes the visitor IP disclosure to Google. |
| `fonts.gstatic.com` | Font files | Same | Same as above. |

Code that can call out but is inert by default: `src/lib/analytics.ts` (renders the Google tag only when `analytics.ga4MeasurementId` holds a valid GA4 ID; empty by default) and `src/lib/track.ts` (fires only when that ID is set and `gtag` exists; it never loads a script itself). Outbound links (Amazon, Pinterest) are plain anchors, not requests made by the page. The site contains no Supabase, Stripe, email or newsletter service; the buyer connects none and has none to disconnect. The privacy page says no analytics or newsletter tools are active while the ID is empty and switches to a Google Analytics sentence when one is set; if fonts are left on Google, add a one-line mention.

## What could not be checked

- Hosting settings: no host is connected, so response headers (CSP, HSTS, X-Frame-Options, cache rules), TLS and access controls on the real site are unverified.
- Account security: 2FA and recovery details for GitHub, Lovable, domain registrar, DNS, Pinterest, affiliate networks and any mailbox. These are excluded from the sale and are the owner's to confirm.
- GitHub repository settings: visibility, collaborators, deploy keys, Actions secrets, branch protection, and whether GitHub secret scanning or push protection is on. The git history was scanned locally only. A clone's full history is what a buyer receives, so it is covered; forks, PR refs, issues, wikis and any deleted branches on GitHub were not scanned.
- Any copy of the work outside this repo (Lovable project history and chat, Google Drive, local scratch files, other machines).
- Secrets scanning used pattern matching; an unusual secret format could be missed. No dedicated scanner (gitleaks, trufflehog) was available offline.
- Image content: photos and graphics were not inspected visually for faces, addresses or screenshots with personal data.
- Licence and image-rights questions are covered in `docs/IMAGE-LICENSES.md`, not here.

## Verdict

**Gate 7, no known critical security issues: PASS on what was checked.** No critical advisory exists in production or dev dependencies, no admin, debug or data-collecting routes exist, no source maps or environment values ship, and the only live external requests are Google Fonts. The two remaining production high advisories (zod 3.x, Vite's bundled `launch-editor`) are not reachable by a site visitor. Two caveats the owner should read: hosting headers and GitHub and account settings were not checked (above), and F1 (drafts in the public bundle) was found and FIXED on 2026-11-19 (see F1).

**Gate 19, personal credentials excluded: PASS for the repository contents, working tree and all 18 commits.** No credential, key, token, password, tax or bank detail, or personal email was found in any committed file or any commit; the owner's GitHub handle is not in any committed file. Remaining owner actions before handover: build the hand-over archive from a clean export so `.output/server/wrangler.json` and the `.git/config` remote (both contain the GitHub handle) are not included (F6), and confirm the GitHub-side items listed above.

Re-run before listing: `bun audit --prod`, `bunx vitest run`, `bunx tsc --noEmit`, `bunx vite build`, and the history scan, because other workers are changing `src/**` and `docs/**` concurrently.
