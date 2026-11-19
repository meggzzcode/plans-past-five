# Website architecture

Checked against the repo on 2026-11-19. Developer-oriented notes also in `CLAUDE-HANDOFF.md` and `AGENTS.md`.

## Principles (from AGENTS.md)

- No database, auth, AI or paid backend; saved items use localStorage (`src/lib/saved.ts`, `src/lib/shoplist.ts`). The site is server-rendered, so the host must run an SSR function (`docs/buyer/HOSTING-AND-DEPLOYMENT.md`).
- All brand copy and settings come from `src/config/site.ts`. Retailer/Amazon links are built only in `src/config/affiliate.ts`.
- Content is typed local data (`src/content`, `src/data`); drafts use `status: "draft"` and are never exposed by public helpers.
- Product records store no prices, ratings, brands or ASINs unless verified; buttons describe the real destination.
- Quiz and planner use deterministic rules in `src/lib/finder.ts` and `src/lib/planner.ts`, covered by `src/test/rules.test.ts`.
- Lovable note: the repository is connected to Lovable. Do not rewrite pushed git history. Database, generated files and secrets are managed per the block at the top of `AGENTS.md`.

## Stack

TanStack Start (SSR) on React 19, TypeScript, Tailwind CSS v4, Vite via `@lovable.dev/vite-tanstack-config` (`vite.config.ts`). Tests: Vitest. Package manager: Bun.

## Directory map

```
src/config/        site.ts (brand, settings), affiliate.ts (link registry), trust-links.ts
src/content/       articles (types.ts, article-*.ts, drafts.ts, corrections.ts, index.ts helpers)
src/data/          hobbies, products (types), catalog (verified products), kits, categories,
                   activities, images, affiliate-programs (research register)
src/lib/           finder, planner, budget, tonight, saved, shoplist, search, seo, sitemap, track
src/components/    brand, layout, editorial, cards, commerce, pages, ui
src/routes/        one file per URL (file-based routing)
src/test/          Vitest suites
src/server.ts      SSR entry wrapper with error handling
public/            robots.txt, _headers, pins (pin images), favicons
scripts/           serve-built.mjs, site-health.mjs, import-products.mjs
design/            sources for brand assets and pins
docs/              handoff, buyer, content, commerce, marketing, SOPs
.github/           CI, site-health, monthly-digest workflows, dependabot
```

## Routes (`src/routes`)

`/` home, `/about`, `/after-hours`, `/weekends`, `/solo-dates`, `/better-together`, `/creative-corner`, `/movement`, `/journal` and `/journal/<slug>`, `/hobbies` and `/hobbies/<slug>`, `/shop` and `/shop/<collection>`, `/hobby-finder`, `/make-plans`, `/tools/hobby-budget`, `/tools/tonight`, `/saved`, `/search`, `/start-here`, `/contact`, `/privacy`, `/terms`, `/affiliate-disclosure`, `/editorial-policy`, `/corrections`, `/methodology`, `/sitemap.xml`. `src/routeTree.gen.ts` is generated; never edit by hand.

## Data flow

- Articles: `src/content/index.ts` registers published articles only (count: `docs/buyer/INVENTORY.md`); `articles` is the only list public code may use. Drafts are registered in `src/content/draft-registry.ts`, which exports `allArticlesIncludingDrafts` for tooling and tests only (`docs/content/ARTICLE-ROADMAP.md`).
- Products: one source, `content/products/*.json`, compiled by `scripts/build-content.mjs` into `src/data/catalog.generated.ts` (shown products only). Generic "Find ... on Amazon" links come from `content/product-search-terms.json`. Kits are slots in `src/data/kits.ts` filled by products tagged with that slot.
- Links: `resolveProductLink()` in `src/config/affiliate.ts` picks an active approved affiliate entry, else an ordinary retailer URL, else an Amazon search link. Disclosure text follows automatically.
- SEO: `src/lib/seo.ts` builds titles, descriptions, canonicals, Open Graph and JSON-LD. `src/lib/sitemap.ts` lists published pages for `/sitemap.xml`.
- Analytics: one setting, `analytics.ga4MeasurementId` (empty by default, so nothing loads). A valid ID makes `src/lib/analytics.ts` add the async Google tag to the root head and switches on `src/lib/track.ts` events. See `docs/buyer/ANALYTICS-SETUP.md`.

## Build and deploy output

`bun run build` runs `vite build`. The configured host is Netlify: `netlify.toml` sets `NITRO_PRESET=netlify`, which writes static files to `dist/` plus a server function. With no preset set, the build uses the Nitro `cloudflare-module` preset (`.output/`, a Worker entry plus static assets). Either way it is not a folder of static HTML files. Details: `docs/buyer/HOSTING-AND-DEPLOYMENT.md`.

## Quality gates

`.github/workflows/ci.yml` runs `bunx vitest run`, `bunx tsc --noEmit`, `bunx vite build` on pull requests. `src/test/seo-trust.test.ts` guards metadata and trust rules; `src/test/affiliate.test.ts` guards the affiliate registry and product validation; `src/test/rules.test.ts` the quiz and planner. Site health: `.github/workflows/site-health.yml` and `scripts/site-health.mjs`.

## Known limitations

- No CMS: content is edited as code (`docs/buyer/CONTENT-MANAGEMENT.md`).
- Fonts load from Google Fonts (`docs/BRAND-GUIDE.md`); self-host if you prefer.
- `site.url`, contact email, socials and legal owner name are empty in `src/config/site.ts` until the owner fills them.
