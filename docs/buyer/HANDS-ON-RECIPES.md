# Hands-on recipes (each one tested in a clean export, 2026-11-19)

Every command below was run in a fresh `git archive HEAD` export with no `node_modules`, `.env` or accounts (`docs/marketplace/final-inspection/BUYER-TAKEOVER-LOG.md`). Tools: Bun 1.4.4, Node 22. Run commands from the project folder.

## Run it locally
```
bun install --frozen-lockfile
bun run dev -- --host 127.0.0.1 --port 5173     # then open http://127.0.0.1:5173/
```
Plain `bun run dev` picks its own host and port (it printed port 8080 in a container) and can fail with `EAFNOSUPPORT` on a machine without IPv6. Read the "Local:" line it prints; the `--host`/`--port` flags above avoid the problem.

## Build, and which output folder
- `bun run build` makes `.output/` (the Cloudflare-style default). Preview it with `node scripts/serve-built.mjs 3000`.
- `NITRO_PRESET=netlify bun run build` makes `dist/` plus `.netlify/functions-internal/` (what `netlify.toml` does). Both finish in seconds.
- `docs/buyer/SECURITY-AND-BACKUPS.md` says "deploy `.output`": that is only the default preset.

## Publish an article (draft to published)
1. Copy a similar `content/articles/<slug>.json`, give it a new `slug`, keep `"status": "draft"`.
2. Fill `sources` (each needs `title` and an `https://` `url`; no other keys), set `verifiedAt`, `publishedAt` (YYYY-MM-DD) and empty `coworkChecks`. Set `"status": "published"`.
3. `bun run content:format content/articles/<slug>.json` rewrites the file in the exact format the tests expect (otherwise `src/test/build-content.test.ts` fails on spacing alone).
4. `bun run content:build` validates (plain-English errors, nothing is written if something is wrong). Then `bunx vitest run` and `bun run build`.
5. Check `/journal`, `/journal/<slug>` and `/sitemap.xml`.
Important: the validator enforces field shapes (for example `titleItalic` must be a phrase inside the title, source URLs must be https, dates must be YYYY-MM-DD) but it does NOT block a published article that has no `sources`, no `verifiedAt` or unresolved `coworkChecks`. That gate is yours: `docs/content/ARTICLE-QUALITY-CHECKLIST.md`. Tests also reject banned words such as "best" or "perfect" in titles and text, and inline links to articles that are still drafts.

## Update an article
Edit the JSON, set `updatedAt`, run `bun run content:format <file>` and `bun run content:build`. A bad date or a `http://` source stops the build with the field name in the message.

## Add a product
`bun run import:products` REPLACES the whole generated catalog with the CSV you give it, so always start from the full file: copy `docs/commerce/product-research.csv`, append your row (column rules in the header of `docs/commerce/PRODUCT-RESEARCH-TEMPLATE.csv`), run it with `--check` first, then without, then `bunx vitest run` and a build. Save your copy back over `docs/commerce/product-research.csv` so the next import keeps it. A verified product with `kitSlots` and `collections` appears on its `/shop/<collection>` page and the matching hobby page; kits and `/shop` need the kit rules in `docs/commerce/STARTER-KITS.md`.

## Switch on affiliate links
Edit `affiliateRegistry.amazon` in `src/config/affiliate.ts` (`websiteTrackingId`, `approvalStatus: "approved"`, `active: true`, `lastVerified`, `approvedPromotionMethods`, `accountOwnershipNote`). Every Amazon link then carries `?tag=<your id>` and the disclosure text switches. Expect about 9 existing tests to fail, because they assert the unmonetized defaults (`affiliate.test.ts`, `rules.test.ts`, `shop.test.tsx`, `round3-fixes.test.tsx`): update those expectations deliberately. Links already carry `rel="sponsored noopener noreferrer"` even while unmonetized.

## Add images
Documented no-code route: `docs/buyer/CMS-SETUP.md`. Script route: put the file in `docs/content/incoming-images/`, add a row to `docs/content/new-images.csv` (copy `new-images.template.csv`; `source` must be one of Unsplash, Pexels, Pixabay, Canva AI, Lovable AI, Own photo, CC0), run `node scripts/ingest-images.mjs --check` then `node scripts/ingest-images.mjs`. Then:
- add a matching row to `docs/content/IMAGE-LICENCE-LEDGER.md` (the test `image-ledger.test.ts` fails without it; the script only writes to `docs/IMAGE-LICENSES.md`),
- run `bunx prettier --write src/data/images.extra.ts`, `bunx vitest run`, a build,
- for AI-generated images also `node scripts/embed-ai-metadata.mjs`.
Needs Pillow (`pip install pillow`), `sharp` or ImageMagick installed on your machine.

## Branding
Replace `public/favicon.svg` (and `public/favicon.ico`, `public/icons/*`, which are separate files), edit `src/components/brand/Wordmark.tsx`, colours in `src/styles.css`. Regenerating the brand PNGs and pins (`design/brand/build-brand.mjs`, `scripts/build-pins.mjs`) needs Playwright with Chromium, and `design/brand/tools/build-logos.py` needs `pip install fonttools`. None of these is in `package.json`: install them yourself first.

## Analytics and verification
`searchConsoleVerification` and `pinterestVerification` in `src/config/site.ts` render as meta tags. Google Analytics has its own single setting, `analytics.ga4MeasurementId` (empty means nothing loads); `integrations.googleAnalyticsId` just follows it. See `docs/buyer/ANALYTICS-SETUP.md`.

## Email and Published by
Fill `contactEmail`, `legal.ownerName`, `legal.jurisdiction`, `publisherName`, `publisherEntityType`, `publisherAddress` in `src/config/site.ts`. The Contact and Privacy pages show the email; footer, About, Contact, Terms and Privacy show the Published-by line. To see the pre-publish check run `bunx vitest run src/test/publisher-trust-links.test.tsx --reporter=verbose`; the empty-field warning is only visible with that flag. Once you fill the fields, the test "ships empty and renders nothing" fails by design: update it.

## Marketing assets
Pins: `public/pins/` (88 images), plan and captions: `docs/pinterest-pins.csv` (replace `{SITE_URL}` with your domain), brand files: `design/brand/` (logos, social templates, exports), pin sources: `design/pins/`. Zip them: `zip -r marketing-assets.zip public/pins docs/pinterest-pins.csv design docs/marketing` (about 22 MB).

## Backups
- Whole site: `git bundle create ../plans-past-five.bundle --all`, check with `git bundle verify`, restore with `git clone ../plans-past-five.bundle new-folder`, then `bun install --frozen-lockfile && bun run build`. A bundle contains committed history only: commit first.
- Content only (no history): copy `content/`, `src/assets/`, `docs/commerce/product-research.csv`, `docs/pinterest-pins.csv`, `docs/content/` and `src/config/site.ts` into a zip. That is everything that is not code or tooling. Restore by copying the folders back into a fresh export of the code and running `bun run content:build`.
