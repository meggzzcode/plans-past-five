# Security risk register: dependency audit, secrets, bundle, headers

Date of inspection: 2026-11-19. Method: every test ran in scratch copies made with `git archive HEAD` (`/tmp/sec`, then a second fresh archive of a newer HEAD, `/tmp/fresh`, to confirm the patch). The real repo was not built in, installed in, or modified, apart from this file and `security-update.patch`.

## 1. Bottom line

- No critical, exploitable production vulnerability was found. Nothing here lets an outside visitor read data, run code, or take over the site. The site has no database, accounts, uploads or secrets, and its only server-side input is the URL.
- `bun audit` on the committed state: **20 findings (9 high, 10 moderate, 1 low)**. After the safe patch in section 5: **0 findings**. Nothing was hidden: all 20 are listed below.
- Of the 20, only the 2 `seroval` findings touch code that ships to production (the SSR runtime and the browser bundle). Both are moderate and need attacker-controlled typed arrays or RegExp objects, which a URL cannot supply. The other 18 are build-time, dev-server or test-runner only.
- The earlier "6 remain after `bun update`" result is reproducible only if the exact pins (`vite 8.1.5`) are left alone. `vite` is pinned to an exact version, so a plain `bun update` cannot move it. Raising that pin to `8.1.7` clears the 5 vite findings.
- What genuinely remains (not advisories, but real): Nitro is pre-release software (section 6), the site is coupled to a vendor config package (section 6), no CSP/HSTS/X-Frame-Options is sent (section 4), and one internal note ships in the public JS (section 3). None is exploitable in this architecture today.
- Note for whoever applies this: `main` was moving while I worked (other agents committed during the inspection). The patch was re-verified against the newest HEAD (`300cd45`) and applies cleanly.

## 2. Findings: every advisory from `bun audit` (before)

Classification key: PROD-RUNTIME = code that runs on the server or in visitors' browsers; BUILD = runs only when the owner builds; DEV = only while a developer runs the dev server; TEST = only in the test runner. "Direct" means listed in package.json.

| # | Package (installed before) | Direct / transitive | Where it runs | Advisory | Sev (CVSS) | Plausible exploitability in THIS architecture | Fixed in | Fix applied (scratch) | Residual |
|---|---|---|---|---|---|---|---|---|---|
| 1 | seroval 1.6.8 | transitive (TanStack router-core, start-client-core) | PROD-RUNTIME (SSR serializer in `.output/server`, and client) | GHSA-f86p-h4j2-7qgj (CWE-79/94) code injection via a typed array's own `constructor` | moderate | Needs the app to serialize an attacker-built typed array into the SSR page. The only attacker input is the URL, which yields strings and numbers, never typed arrays. The search page's `?q=` is a string and was confirmed HTML-escaped in the SSR output. Very unlikely. | 1.6.11 | Yes, 1.6.11 (lockfile, in-range `bun audit fix`) | None |
| 2 | seroval 1.6.8 | transitive | PROD-RUNTIME | GHSA-9wx9-5pv9-3349 (CWE-79/116) script injection via RegExp sources in serialized output | moderate (4.7) | Same as 1: no code path puts an attacker-supplied RegExp into serialized state. | 1.6.10 | Yes, 1.6.11 | None |
| 3 | vite 8.1.5 | direct (exact pin) | DEV (dev server only; not in `.output`) | GHSA-9jrq-w75r-8gcw (CWE-80) cross-origin script execution through custom middleware | low | Only while `vite dev` is running and a malicious page is open in the same browser. The dev script binds `127.0.0.1`. Not present in the deployed site. | 8.1.6 | Yes, pin 8.1.7 | None |
| 4 | vite 8.1.5 | direct | DEV | GHSA-rq7h-c2jc-7f22 (CWE-22/284) files outside `server.fs.allow` served | moderate | Dev server only, and only when project paths match system paths. Not deployed. | 8.1.6 | Yes, 8.1.7 | None |
| 5 | vite 8.1.5 (bundled launch-editor code) | direct | DEV | GHSA-698v-4r3x-3vcv (CWE-78) `%` not escaped on Windows | moderate | Windows dev machines only, dev server only. Not deployed. | 8.1.6 | Yes, 8.1.7 | None |
| 6 | vite 8.1.5 (bundled launch-editor code) | direct | DEV | GHSA-r825-w8mm-5pxw (CWE-88) editor CLI flag misinterpretation, arbitrary command execution for some editors | moderate | "Open in editor" feature of the dev server only. Not deployed. | 8.1.6 | Yes, 8.1.7 | None |
| 7 | vite 8.1.5 (bundled launch-editor code) | direct | DEV | GHSA-587h-7wmj-h5pm (CWE-77) `fs.existsSync()` check bypass on Windows | high | Windows dev machines only, dev server only. Not deployed. Severity label is high, but exposure is a developer's laptop. | 8.1.6 | Yes, 8.1.7 | None |
| 8 | zod 3.25.76 | direct (`^3.25.76`) | BUILD only (used by `scripts/content-lib.mjs`, the content validator run by `prebuild`; confirmed absent from `.output/server` and client assets) | GHSA-mrhx-c7xc-m3w5 (CWE-770) memory exhaustion validating oversized constrained collections | high (7.5) | Zod only validates the owner's own article JSON during the build. No visitor input reaches it. A maliciously huge article file would need write access to the repo, which already means full control. | 4.6.6 (no 3.x fix exists) | Yes, `zod ^4.6.7` plus a one-line change in `scripts/content-lib.mjs` (see section 5). This is a major upgrade, tested, 661/661 and later 717/717 tests pass | None |
| 9 | brace-expansion 1.1.16 and 5.0.8 | transitive (eslint, typescript-eslint, via minimatch) | DEV (lint tooling) | GHSA-mh99-v99m-4gvg (CWE-400/770) unbounded expansion, out-of-memory | high (7.5) | Triggered by a hostile glob pattern passed to ESLint. Patterns come from the repo's own config. | 1.1.17 / 5.0.9 | Yes, 1.1.21 and 5.0.12 | None |
| 10 | brace-expansion (same) | transitive | DEV | GHSA-rgw5-rvv9-x895 (CWE-400/770) unbounded intermediate arrays, bypass of the earlier fix (two ranges, `<1.1.18` and `>=4.0.0 <5.0.9`) | high (7.5) | As 9. | 1.1.18 / 5.0.9 | Yes | None |
| 11 | brace-expansion (same) | transitive | DEV | GHSA-qhr7-859c-m2p7 (CWE-400/674) stack exhaustion on nested braces (`<1.1.20`, `>=4.0.0 <5.0.11`) | high (7.5) | As 9. | 1.1.20 / 5.0.11 | Yes | None |
| 12 | brace-expansion (same) | transitive | DEV | GHSA-6j4f-fj2g-mc7p (CWE-400/674) stack exhaustion in parseCommaParts (`<1.1.19`, `>=4.0.0 <5.0.10`) | high (7.5) | As 9. | 1.1.19 / 5.0.10 | Yes | None |
| 13 | brace-expansion (same) | transitive | DEV | GHSA-q2hr-2g5m-vwhr (CWE-400/407) quadratic CPU expansion (`<1.1.21`, `>=4.0.0 <5.0.12`) | moderate (5.3) | As 9. | 1.1.21 / 5.0.12 | Yes | None |
| 14 | minimatch 10.2.6 | transitive (typescript-eslint) | DEV | GHSA-g3hv-75wg-m249 (CWE-405) DoS via globparts amplification | moderate | Hostile glob needed; lint tooling only. | 11.0.1 | Yes: `typescript-eslint ^8.73.0` pulls minimatch 11.0.9 | None |
| 15 | @vitest/mocker 4.1.11 | transitive (vitest) | TEST | GHSA-qxg6-89mg-rqv8 (CWE-94/116/306) code injection via unauthenticated manual mock registration | moderate (4.7) | Only while the Vitest UI/server is exposed to a network. Tests run from the CLI and in CI. | 4.1.12 | Yes: `vitest ^4.1.12` | None |
| 16 | @vitest/mocker 4.1.11 | transitive | TEST | GHSA-xp26-3454-mjgp (CWE-22) Windows backslash traversal bypass | moderate (5.9) | Windows test runs with a network-exposed Vitest server only. | 4.1.12 | Yes | None |

Count check: audit rows by package are seroval 2, vite 5, zod 1, brace-expansion 9 (5 advisory IDs; 4 of them are listed twice because they have two vulnerable ranges, which is why rows 9-13 stand for 9 audit rows), minimatch 1 and @vitest/mocker 2: 2 + 5 + 1 + 9 + 1 + 2 = 20. Severity split: 9 high (zod 1, vite 1, brace-expansion 7), 10 moderate, 1 low.

Note on the vite rows: `bun audit` attributes three launch-editor advisories to `vite` because Vite bundles that code. The standalone `launch-editor` package in the lockfile (2.14.2, used by TanStack devtools) is not flagged.

Production vs dev: `bun audit --prod` reported 8 findings (vite 5, zod 1, seroval 2) because TanStack Start lists vite and zod in its dependency tree. That label overstates the risk: vite and zod are not in the deployed server bundle or the browser JS. Only seroval is (verified by grepping `.output/server` and `.output/public`).

## 3. Secrets, bundle contents, drafts

Secret scan
- Tracked files (999) scanned with `detect-secrets` (installed with pip, since gitleaks/trufflehog are not available through bunx/npx here): 0 findings. Tool sanity-checked against a planted fake AWS key (it detected it).
- Regex scan of the tracked tree and the complete history (`git log -p --all`, all added lines, 116 commits at the time) for AKIA/ASIA, `sk-`, `sk_live_`, `ghp_`/`gho_`/`github_pat_`, `xox*-`, `AIza`, PEM private keys, JWT-shaped tokens and `api_key/secret/token/password = <16+ chars>` assignments: 0 matches.
- No `.env`, `.pem`, `.key`, credential or token file was ever added in any commit (`git log --diff-filter=A` name scan). `.gitignore` excludes `*.local`, `.dev.vars` and `.wrangler`.
- Email addresses in tracked files: only `a@b.com` (tests) and `affiliate-team@udemy.com` (research doc, a third party's public contact). None in the built site.
- Git author metadata: `Claude <noreply@anthropic.com>`, Lovable/gpt-engineer bot no-reply addresses, dependabot. No personal email addresses in history.
- GitHub workflows (`ci.yml`, `monthly-digest.yml`, `site-health.yml`): no `secrets.*` references, no `pull_request_target`, explicit `permissions:` blocks, `bun install --frozen-lockfile`.
- `.lovable/project.json` holds only a template name and revision.

Public bundle (built `.output/public` and the Netlify `dist/`, 101 asset files each)
- No source maps (`*.map`): none emitted.
- Secret regex over all built assets: only false positives (Tailwind CSS variables `sk-image-linear-from-pos` etc. match the `sk-` pattern). No keys or tokens.
- `coworkChecks`: absent from the client bundle and from `src/content/generated/published.json` (stripped by the content build). The word "Cowork" appears once, as described below.
- Email addresses in built assets: none.
- Draft articles: the two drafts (`cute-weekend-plans-that-arent-brunch`, `make-friends-as-an-adult-through-hobbies`) do not appear in `.output/public` or `dist` (title and slug grep: 0 hits), are not in `/sitemap.xml` (98 URLs, 0 draft matches), and their URLs return 404 in the built server. `src/content/draft-registry.ts` is imported only by tests and scripts.

Findings from the bundle review (none are credentials)

| ID | Finding | Severity | Detail | Recommendation |
|---|---|---|---|---|
| B1 | Internal note ships in public JS | Low (information disclosure, no secret) | `src/data/catalog.generated.ts` line 448 has a `hold` field: "...Held for audience fit; swap for an adult-oriented clay once Cowork C12 confirms one." It is bundled in `assets/ProductCard-*.js`, so any visitor can read it. A second `hold` string ("Held for audience fit.") ships too. | Strip `hold` (and any other internal-only catalog field) in the catalog generator before it reaches `src/`, or move it to a non-bundled file. Not applied: it is a content/data change outside this security patch. |
| B2 | Editorial metadata ships in public JS | Info | Per-article `searchIntent`, `angle` and `verifiedAt` (32 articles) are in the client bundle, so competitors can read the SEO angle for each article. | Optional: drop these fields from the published article shape if they should stay private. |

## 4. HTTP headers

Method: scratch build served with `scripts/serve-built.mjs` (`node scripts/serve-built.mjs 4173`, which runs the real built server entry), `curl -D -` on several routes.

| Route | Status | X-Content-Type-Options | Referrer-Policy | Permissions-Policy | CSP / HSTS / X-Frame-Options |
|---|---|---|---|---|---|
| `/`, `/journal`, `/journal/<article>`, `/hobbies`, `/shop`, `/search?q=...` (SSR HTML) | 200 | nosniff | strict-origin-when-cross-origin | camera/microphone/geolocation/payment/usb denied | not set |
| unknown route, and the 2 draft URLs (SSR 404 HTML) | 404 | nosniff | same | same | not set |
| `/sitemap.xml` (SSR route, `application/xml`) | 200 | **absent** | **absent** | **absent** | not set |
| `/robots.txt`, `/favicon.svg`, `/assets/*.js` (static, harness serves) | 200 | harness does not apply `_headers` | n/a | n/a | n/a |
| `/admin`, `/_server`, `/@vite/client`, `/.env`, `/nitro.json`, `/content/*.json`, `/docs/*` | 404 | n/a | n/a | n/a | n/a |

Comparison with the source files
- `src/lib/security-headers.ts` (applied only when the response `content-type` contains `text/html`) and `public/_headers` set the identical three headers. Observed SSR HTML matches them exactly.
- Gap H1 (Low): non-HTML responses from the server (the sitemap) get none of the three headers, because the wrapper only touches HTML. `X-Content-Type-Options` on XML is the only one that matters, and a sitemap has no sensitive content. Fix: have `withSecurityHeaders` set `X-Content-Type-Options` on every response.
- Gap H2 (Low, deliberate and documented in both files): no Content-Security-Policy, no HSTS, no X-Frame-Options. Without CSP, any future XSS would not be contained; today there is no found XSS (the reflected `?q=` value is escaped as `&quot;&gt;&lt;img ...`). Without X-Frame-Options the site can be framed (clickjacking), but it has no login, form that changes state, or payment, so there is nothing to hijack. HSTS should be added once the production domain is final and HTTPS-only (the host usually offers it). Do not enable X-Frame-Options/`frame-ancestors` while the Lovable editor preview needs iframing.
- The harness `serve-built.mjs` does not apply `public/_headers`, so static-asset headers (immutable caching, nosniff) were checked from the generated `.output/public/_headers` and `dist/_headers` instead: they contain the 3 headers on `/*` and `cache-control: public, max-age=31536000, immutable` on `/assets/*`. Cloudflare Workers Static Assets and Netlify both honour that file. Confirm on the real host after the first deploy.
- Harness-only artefacts, not site issues: `TRACE /` returns 500 and `/manifest.webmanifest` is served as `application/octet-stream` by the test server's small MIME table.
- Other checks: no `Set-Cookie`, no `Server`/`X-Powered-By` header, no CORS headers; the app has no cookies and uses localStorage only for saved lists and planner state.

Development-only endpoints
- No API routes, server functions or debug routes exist in `src/routes` (the only server handler is `sitemap.xml`). The built server returns 404 for `/@vite/*`, `/_server`, `/admin`.
- The Lovable config adds dev-only plugins (TanStack devtools, error loggers, HMR gate, dev-server bridge) only under `vite dev`/sandbox. The dev script is `vite dev --host 127.0.0.1` (loopback; the wrapper's own default would be `::`, all interfaces). Do not expose the dev server to a network.
- Unsafe patterns searched: one `dangerouslySetInnerHTML` (`src/components/ui/chart.tsx`, shadcn chart, not imported anywhere, so dead code and not in the bundle); no `eval`, `new Function` or `innerHTML`.

## 5. Patch plan (applied and verified in scratch)

Patch file: `docs/marketplace/final-inspection/security-update.patch` (3 files: `package.json`, `bun.lock`, `scripts/content-lib.mjs`). `git apply --check` passes against a fresh `git archive HEAD` (HEAD `300cd45`) and against the live working tree. After applying to the fresh archive, `bun.lock` is byte-identical to the scratch result and `bun install --frozen-lockfile` succeeds (which is what `netlify.toml` runs).

Apply: `git apply docs/marketplace/final-inspection/security-update.patch && bun install` (then run the checks below).

package.json changes (exactly 4 version lines)

| Line | Before | After | Reason |
|---|---|---|---|
| dependencies.zod | `^3.25.76` | `^4.6.7` | row 8; the only fix is the 4.x line (row 8) |
| devDependencies.typescript-eslint | `^8.56.1` | `^8.73.0` | row 14 (minimatch 11) |
| devDependencies.vite | `8.1.5` | `8.1.7` | rows 3-7 (kept as an exact pin, as before; the `rolldown 1.2.1` override is unchanged and the build works with it) |
| devDependencies.vitest | `^4.1.10` | `^4.1.12` | rows 15-16 |

bun.lock changes: vite 8.1.5 to 8.1.7, vitest and @vitest/mocker 4.1.11 to 4.1.12, seroval 1.6.8 to 1.6.11 (via `bun audit fix`, in range), brace-expansion 1.1.16 to 1.1.21 and 5.0.8 to 5.0.12, typescript-eslint family 8.65 to 8.73, minimatch to 11.0.9 and 3.1.5 kept, zod 3.25.76 removed (one copy, 4.6.7, remains; TanStack already used 4.x). No other dependency moved. A full `bun update` was deliberately not used: it rewrites about 35 package.json ranges (React, Radix, Tailwind) with no security benefit.

scripts/content-lib.mjs (1 hunk): Zod 4 removed `errorMap`. The one use, `z.enum(["draft","published"], { errorMap: () => ({ message: '...' }) })`, becomes `z.enum([...], { message: '...' })`. Only this build-time script imports zod. Before the change, the test `rejects a bad status` failed under Zod 4 (proving the test covers it); after it, all tests pass and the generated content (`src/content/generated/*`) is byte-identical to the Zod 3 result.

Verification results (scratch; "before" = committed state, "after" = patched). First run on the original HEAD, repeated on the newest HEAD `300cd45` with the patch applied:

| Check | Before | After |
|---|---|---|
| `bun install --frozen-lockfile` | ok | ok |
| `bunx vitest run` | 46 files, 661 tests pass | 46 / 661 pass; on newest HEAD 48 files / 717 tests pass |
| `bunx tsc --noEmit` | exit 0 | exit 0 |
| `bunx eslint . --quiet` | exit 0 | exit 0 |
| `bun run build` (Cloudflare default) | ok | ok |
| `NITRO_PRESET=netlify bun run build` | ok | ok |
| `bun audit` | 20 (9 high, 10 moderate, 1 low) | **0** |
| `bun audit --prod` | 8 (2 high, 5 moderate, 1 low) | **0** |

One flaky test was seen once (`planner-quiz` budget test timed out at 5 s while the machine was loaded during the Zod experiment) and passed on re-run; it is not related to the update.

Not applied, on purpose: `bun audit fix --latest` (would cross majors), vitest 5.x, vite 8.3.x, react-start 1.169, nitro RC (see section 6), and any change that moves the hosting target.

## 6. Nitro beta and the Lovable config package

### 6.1 Nitro
- Installed and pinned: `nitro 3.0.260603-beta`. npm `latest` is `3.0.261103-rc` (published 2026-11-03). **There is no stable Nitro 3 release.** The 2.x line (`nitropack 2.13.6`) is a different product and TanStack Start's `nitro/vite` plugin needs Nitro 3, so it is not a swap.
- Scratch swap to the RC (change `"nitro": "3.0.260603-beta"` to `"3.0.261103-rc"`, then `bun install`): all checks pass (661/661 tests, tsc, eslint, both builds, audit 0). Differences to expect: the Netlify build writes its function to `.netlify/v1/functions` (it was `.netlify/functions-internal`; Netlify reads both) and `dist/` is unchanged. The RC is still pre-release, so this swaps a beta for a release candidate rather than for a stable version. **Recommendation**: do it as a separate, small change after the owner's own deploy test on the real host. It is not in the patch because it changes build output paths and the owner asked for no uncontrolled upgrades. Gain: closer to stable, newer h3/srvx (already audit-clean either way).
- Stable alternative with the same tools: `@netlify/vite-plugin-tanstack-start 1.3.19` (stable, replaces Nitro for Netlify only). Scratch test: builds, 661/661 tests pass, but the output moves to `dist/client` (so `netlify.toml` `publish` must change), the SSR function becomes `.netlify/v1/functions/server.mjs`, the install grows from about 510 to about 930 packages, and `bun audit` shows 2 new moderate findings (glob, minimatch) in the plugin's own dependencies. It also locks the site to Netlify. This is a hosting migration, not a small change. **Not recommended now.** `@cloudflare/vite-plugin 1.70.1` is the Cloudflare equivalent; not tested, same category of change.

### 6.2 @lovable.dev/vite-tanstack-config 2.27.2
- It is a build-config helper (peer dependency list: vite, nitro, @tailwindcss/vite, vite-tsconfig-paths, @vitejs/plugin-react, @tanstack/react-start). It is listed in `minimumReleaseAgeExcludes` in `bunfig.toml`, so it bypasses the 24-hour supply-chain guard, as do six other `@lovable.dev` packages that are not installed.
- What it adds, from reading `dist/index.js`: Tailwind, tsconfig-paths and React plugins; `tanstackStart` with an import-protection rule (client may not import `**/server/**` or `server-only`); Nitro in build mode with `defaultPreset: "cloudflare-module"` (honours `NITRO_PRESET`); `@` alias to `src`; React/TanStack dedupe; `VITE_*` define injection; lightningcss as the CSS transformer; dev-only devtools and error loggers; and sandbox-only extras (fixed port 8080, HMR gate, dev-server bridge, build diagnostics, a reachability manifest, an exit watchdog) that run only inside Lovable's environment. It makes no network calls in a normal build (the asset proxy is a no-op unless `LOVABLE_PREVIEW_HOST` is set).
- Scratch swap: `vite.config.ts` replaced with a direct config of about 30 lines (plugins above, `nitro({ defaultPreset: "cloudflare-module" })` on build only, same alias/dedupe/`server: { entry: "server" }` option, `lightningcss` added as a direct devDependency) and the package removed. Result with the Nitro RC: tsc ok, 661/661 tests, both builds ok, audit 0, and `dist/` contents identical in layout. ESLint reported only Prettier line-wrapping in the new file (fixable with `prettier --write`). Not in the patch because it removes the Lovable editor/preview integration (sandbox port, HMR gate, error reporting hooks used by `src/lib/lovable-error-reporting.ts`), which matters only if the buyer keeps editing in Lovable. Verdict: replacement is a small, safe change **if the owner leaves Lovable**; keep the wrapper while the Lovable editor is in use.

Vendored replacement tested in scratch (for the owner or buyer to keep in reserve):

```ts
import { defineConfig } from "vite";
import path from "node:path";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
  css: { transformer: "lightningcss" },
  resolve: {
    alias: { "@": path.resolve(process.cwd(), "src") },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime",
             "@tanstack/react-query", "@tanstack/query-core"],
  },
  server: { host: "::", port: 8080 },
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
      importProtection: { behavior: "error", client: { files: ["**/server/**"], specifiers: ["server-only"] } },
    }),
    ...(command === "build" ? [nitro({ defaultPreset: "cloudflare-module" })] : []),
    viteReact(),
  ],
}));
```
(Also add `"lightningcss": "^1.30.0"` to devDependencies and remove `@lovable.dev/vite-tanstack-config`.)

### 6.3 Recovery strategy if either dependency disappears or breaks
1. Pinned versions are in `bun.lock` with integrity hashes, and `netlify.toml` installs with `--frozen-lockfile`. A package removed from npm still installs only if cached; so keep a copy: run `npm pack nitro@3.0.260603-beta @lovable.dev/vite-tanstack-config@2.27.2` and store the two tarballs outside the repo (or in a private release) as a backup, or vendor the config as shown above.
2. If the Lovable wrapper vanishes: apply the vendored `vite.config.ts` above (verified to build identically), delete the dependency and the `bunfig.toml` exclusion list.
3. If Nitro beta breaks a build: first try `3.0.261103-rc` (verified). If Nitro 3 is unusable, the fallback is the host's official TanStack Start adapter (Netlify plugin verified to build; Cloudflare plugin untested), accepting the `publish` path change.
4. The existing safeguards worth keeping: the `[deploy]` marker rule and the 24-hour `minimumReleaseAge`. Add the two `.output`/`dist` smoke checks (`bun run build` and `NITRO_PRESET=netlify bun run build`) to CI; CI currently runs `vite build` only.
5. Dependabot is configured weekly with grouped minor/patch updates. Exact pins (`vite`, `nitro`, `@tanstack/*`, the `rolldown` override) need each bump reviewed by hand because they were pinned on purpose, so add a monthly `bun audit` to the routine.

## 7. Remaining risks, stated honestly

Is there a critical exploitable production vulnerability? **No.** No advisory in the committed state or the patched state is exploitable through the site's real attack surface, and no secret was found.

| Residual risk | Severity | Status after patch |
|---|---|---|
| Nitro 3 is pre-release (beta, newest is RC); behaviour or output paths can still change | Medium (maintenance/stability, not a known vulnerability) | Open. RC bump verified in scratch, not applied. |
| Dependency on `@lovable.dev/vite-tanstack-config` (vendor package, exempt from the 24 h release-age guard) | Low-medium (supply chain) | Open. Replacement tested; recovery plan above. |
| `seroval` fixes depend on the in-range lockfile pull (1.6.11); the exact-pinned TanStack packages (`react-router`, `react-start`, `router-plugin`) are held back by pins and need a manual look | Low | Mitigated for now (audit 0). |
| No CSP, HSTS or X-Frame-Options | Low (no sensitive actions; no XSS found) | Open by design; add HSTS after domain/HTTPS is final, consider a CSP in report-only mode first. |
| Sitemap (non-HTML SSR response) lacks nosniff | Low | Open (one-line change in `security-headers.ts`). |
| Internal note ("Cowork C12", `hold` text) and editorial metadata visible in public JS | Low | Open (B1, B2). |
| Zod 4 major bump touches the content validator | Low | Mitigated: 1-line change, tests prove behaviour, generated output identical. Without that, high-labelled advisory stays (build-time only). |
| Static-asset header behaviour could only be read from `_headers`, not tested on a live host | Low | Verify with `curl -I` after first real deploy. |

A new advisory can appear at any time; this register is a snapshot of 2026-11-19 (`bun audit` 0 findings on patched scratch). Re-run `bun audit` before each sale-related handover.
