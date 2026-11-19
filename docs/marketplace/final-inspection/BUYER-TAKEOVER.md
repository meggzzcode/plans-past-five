# Buyer takeover: what a new owner can and cannot do alone

This is the single takeover file (it replaces the earlier `BUYER-TAKEOVER-LOG.md`). `docs/marketplace/final-inspection/NEW-OWNER-QUICKSTART.md` is the plain-language first-week guide drawn from it. Basis: a clean-room rehearsal on 2026-11-19 by a worker using only `README.md` and `docs/buyer/`, from a `git archive HEAD` export into an empty folder, a throwaway HOME, no `node_modules`, no `.env` and no Lovable, Netlify, GitHub or Canva credentials. Nothing was deployed and no account was touched. Tools: Bun 1.4.4, Node 22.23.5, Linux. Fake test values (affiliate tag, test email, test company) were used in a scratch copy only. The rehearsal was run against an earlier commit; section 5 says what has changed since.

Counts: see `docs/buyer/INVENTORY.md` (generated). This file does not repeat them.

## 1. What a non-technical buyer can and cannot do alone

| Task | Alone, no developer? | What is needed |
| --- | --- | --- |
| Read the docs, decide whether to buy | Yes | `docs/buyer/START-HERE.md` |
| Edit or add an ARTICLE | Only after Pages CMS is connected and tested with a real login | A GitHub account, the CMS login, then a publish step. The CMS connection has NOT been tested (`docs/buyer/CMS-TEST-PLAN.md`). Without it, editing article JSON by hand needs a terminal |
| Publish (make an edit go live) | Partly | Netlify's Trigger deploy button, or a commit message ending in `[deploy]`. Whether the button honours the skip rule is untested (`docs/buyer/CMS-TEST-PLAN.md`) |
| Run the site on your own computer | Needs a helper the first time | Install Bun and Node 22, then `bun install --frozen-lockfile` and `bun run dev`. About 30 to 60 minutes for a developer; not realistic for a first-timer without help |
| Create hosting, domain, mailbox accounts | Yes, with patience | Your own logins; card for the domain. Nothing transfers from the seller (`docs/buyer/ACCOUNT-DEPENDENCIES.md`) |
| First deploy to Netlify | Needs a developer or a patient assistant for a few hours | GitHub repo in your name, Netlify connected to it, production branch, environment, domain and DNS, then `site.url` and `public/robots.txt` edited. The build needs the server-rendering function (see `docs/buyer/HOSTING-AND-DEPLOYMENT.md`) |
| Add or change PRODUCTS | No | Edit a CSV and run the importer, then tests and a build. The importer replaces the WHOLE catalog from the CSV (section 3) |
| Switch affiliate links on | No | Apply to Amazon Associates under your own account first; then edit `src/config/affiliate.ts`; several tests assert the unmonetized default and must be updated (`docs/buyer/AFFILIATE-ACTIVATION.md`) |
| Turn analytics on | Partly | One empty setting, `analytics.ga4MeasurementId`, once you have your own GA4 ID and have decided about consent (`docs/buyer/ANALYTICS-SETUP.md`). A developer should check the page after a rebuild |
| Set contact email and "Published by" details | Needs a developer or careful editing | Edit `src/config/site.ts`, then update the tests that expect these to be empty (`docs/buyer/PUBLISHER-SETUP.md`) |
| Replace images or branding | No | Image tool needs Pillow, sharp or ImageMagick; regenerating pins needs Playwright, Chromium and fonttools (not declared in `package.json`); each new image needs a ledger row |
| Decide the legal pages, image rights, trademark | You, with a lawyer | Starter text only; nothing here is legal advice |
| Check the facts in what you publish | You | `docs/SOP-publish-article.md` |

Rule of thumb: articles in a browser (once the CMS is proven); everything else needs a developer or an assistant for a few hours. Nothing makes the site earn or rank.

## 2. Manual steps (in order, as rehearsed)

1. Get the source into your own GitHub account (repository transfer or an export of the sanitized package; `docs/buyer/TRANSFER-CHECKLIST.md`, `docs/buyer/BUYER-PACKAGE-CONTENTS.md`).
2. Install Bun and Node 22. Neither version is pinned in the repo (no `.nvmrc`, no `engines`).
3. `bun install --frozen-lockfile` (measured 3.3 s on a warm cache; allow 5 to 15 minutes cold, including installing Bun).
4. `bun run dev`. It binds to `127.0.0.1` and prints the URL (port 8080 in the check on 2026-11-19); open that.
5. `bunx vitest run`, `bunx tsc --noEmit`, `bun run build`.
6. Create hosting, point `netlify.toml` at your Netlify site, set the domain, `site.url` and the `Sitemap:` line in `public/robots.txt`.
7. Publish deliberately: a build runs only when the commit message contains `[deploy]` or you press Trigger deploy.
8. Then the accounts: mailbox, Search Console, Pinterest, Amazon Associates, analytics (all yours; none transfer).

## 3. Takeover findings you must know

- **Dev server flag.** On a machine without IPv6 the original dev command failed (`EAFNOSUPPORT` on `:::8080`). `bun run dev` now runs `vite dev --host 127.0.0.1`; use the URL it prints.
- **The product importer replaces the whole catalog.** `bun run import:products <csv>` rebuilds `src/data/catalog.generated.ts` from the file you give it. Start from the full `docs/commerce/product-research.csv`, append your rows, run `--check` first. A guard refuses a write that would shrink the catalog by 30% or more (and a blank file) unless `--force` is given. Never run it on a partial CSV. (Row validation and the shrink guard are described in the header of `scripts/import-products.mjs`.)
- **Publish gate.** The content build now rejects a published article that has no source, no `verifiedAt` date or unresolved `coworkChecks`, with a plain-English message and a "NOT rebuilt" notice. The hand-written JSON must also match the canonical format; run `bun run content:format <file>` to rewrite it correctly. A human fact-check is still required: the build checks that the fields exist, not that the facts are right.
- **A build is not a deploy.** The default build preset targets Cloudflare; `netlify.toml` sets `NITRO_PRESET=netlify`, which writes static files to `dist/` plus a server-rendering function. Deploying "the `.output` folder" is only right for the default preset.
- **Affiliate switch needs test updates.** With a tag set, 19 of 19 Amazon links on a sampled shop page gained `?tag=`, and the disclosure switched to the Associates statement. Several tests that assert the unmonetized default then fail by design and must be updated.
- **Images.** The ingest script resizes and wires an image but did not write the `docs/content/IMAGE-LICENCE-LEDGER.md` row that `image-ledger.test.ts` requires; add it by hand.
- **Backups.** `git bundle create --all` restored cleanly (install and build passed). A bundle holds committed history only.

## 4. Dependencies and credentials

| Need | Required for | Notes |
| --- | --- | --- |
| Bun (1.4.4 tested) | install, build, scripts | Not pinned; `bun.lock` |
| Node 22 | `node scripts/*.mjs`, preview server | Not pinned |
| Python 3 with Pillow, or sharp, or ImageMagick | image ingest only | Optional |
| Playwright + Chromium, `fonttools` | rebuilding pins and brand PNGs only | Not in `package.json`; optional |
| `@lovable.dev/vite-tanstack-config` (public npm package) | the Vite, TanStack and Nitro setup in `vite.config.ts` | Installs and builds with no Lovable account. A third-party build dependency: if it left npm, the build config would need rewriting. `src/lib/lovable-error-reporting.ts` and `.lovable/` are inert without Lovable |
| Lovable account | NOT needed to run, build, deploy or edit | Only to keep using the Lovable editor and sync; the project is not transferable by default and its service agreement is not assignable (`docs/buyer/IMAGE-AND-ASSET-RIGHTS.md`) |
| GitHub account (yours) | hosting the repo, CI (no secrets), Pages CMS login, Netlify connection | |
| Netlify account (yours) | hosting | `netlify.toml` is ready; none exists yet; credits re-read live |
| Domain, DNS, mailbox | go-live | Registrar proof needed if the domain is part of the sale |
| Amazon Associates, Google Analytics and Search Console, Pinterest | monetization, measurement, distribution | None included; Amazon is not transferable |
| Canva | NOT needed | Finished assets are in the repo; Canva AI terms unverified |
| Google Fonts | runtime request for fonts | Self-hosting is optional |
| The seller | NOT required for any step above | Optional: image-terms questions, domain registrar proof, questions inside the support window (`POST-SALE-SUPPORT-PROPOSAL.md`, proposal only) |

## 5. Status of the rehearsal's gaps (as of the generating commit; re-check)

| Finding | Status |
| --- | --- |
| `bun run dev` failed without IPv6 | Fixed: script uses `--host 127.0.0.1` |
| Validator did not enforce sources, `verifiedAt`, empty `coworkChecks` | Fixed in `scripts/content-lib.mjs`; human fact-check still required |
| Importer replaces the whole catalog; docs did not say so | Documented here and in `docs/buyer/PRODUCT-MANAGEMENT.md`; shrink guard exists |
| No Google Analytics loader | A loader now exists, off by default (`analytics.ga4MeasurementId`); wording lives in `docs/buyer/ANALYTICS-SETUP.md` |
| No pinned Node or Bun versions | OPEN |
| Playwright and fonttools undeclared | OPEN (documented as optional) |
| Ingest script does not write the ledger row | OPEN |
| Real Netlify dry run (CLI timed out in the sandbox) | OPEN: no real deploy has been run |
| Pages CMS real login test | OPEN (`docs/buyer/CMS-TEST-PLAN.md`) |

Measured compute for the rehearsal was about one minute of command time; the whole rehearsal took about 25 minutes including reading. A realistic first-timer estimate for a developer is half a day to the first deploy; for a non-developer it is not feasible alone for products, affiliate settings and the first deploy.
