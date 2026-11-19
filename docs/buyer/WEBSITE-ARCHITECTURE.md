# Website architecture

Checked against the repo on 2026-11-19. Developer-oriented notes also in `CLAUDE-HANDOFF.md` and `AGENTS.md`.

## Principles (from AGENTS.md)

- Frontend-only: no database, auth, AI or paid backend; saved items use localStorage (`src/lib/saved.ts`, `src/lib/shoplist.ts`). The site is meant to be portable.
- All brand copy and settings come from `src/config/site.ts`. Retailer/Amazon links are built only in `src/config/affiliate.ts`.
- Content is typed local data (`src/content`, `src/data`); drafts use `status: "draft"` and are never exposed by public helpers.
- Product records store no prices, ratings, brands or ASINs unless verified; buttons describe the real destination.
- Quiz and planner use deterministic rules in `src/lib/finder.ts` and `src/lib/planner.ts`, covered by `src/test/rules.test.ts`.
- Lovable note: the repository is connected to Lovable. Do not rewrite pushed git history. Database, generated files and secrets are managed per the block at the top of `AGENTS.md`.

## Stack

TanStack Start (SSR) on React 19, TypeScript, Tailwind CSS v4, shadcn-style UI components (`src/components/ui`), Vite via `@lovable.dev/vite-tanstack-config` (`vite.config.ts`). Tests: Vitest. Package manager: Bun.

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

- Articles: `src/content/index.ts` registers published articles only (27 on 2026-11-19); `articles` is the only list public code may use. Drafts (5 files plus the 2 outlines in `drafts.ts`) are registered in `src/content/draft-registry.ts`, which exports `allArticlesIncludingDrafts` for tooling and tests only (`docs/content/ARTICLE-ROADMAP.md`).
- Products: two layers. Product TYPES (`src/data/products.ts`) link to an Amazon search. The verified catalog (`src/data/catalog.ts`, generated list in `src/data/catalog.generated.ts`) holds 44 records on 2026-11-19 (37 verified, 7 candidate; ordinary non-affiliate links, listing-checked not tested) and is filled by `bun run import:products` from a researched CSV; with no verified product it renders nothing. Kits (`src/data/kits.ts`) are slots filled only by verified products.
- Links: `resolveProductLink()` in `src/config/affiliate.ts` picks an active approved affiliate entry, else an ordinary retailer URL, else an Amazon search link. Disclosure text follows automatically.
- SEO: `src/lib/seo.ts` builds titles, descriptions, canonicals, Open Graph and JSON-LD. `src/lib/sitemap.ts` lists published pages for `/sitemap.xml`.
- Analytics: `src/lib/track.ts` is a no-op helper; it fires only if a Google Analytics ID is set and a gtag function already exists on the page. No script is loaded by the repo (see `docs/buyer/ANALYTICS-SETUP.md`).

## Build and deploy output

`bun run build` runs `vite build`. The checked build output used the Nitro `cloudflare-module` preset (observed in `.output/nitro.json`; the same finding is described in `docs/buyer/SEO-GUIDE.md`): a Worker entry plus static assets, not static HTML files. Details: `docs/buyer/HOSTING-AND-DEPLOYMENT.md`.

## Quality gates

`.github/workflows/ci.yml` runs `bunx vitest run`, `bunx tsc --noEmit`, `bunx vite build` on pull requests. `src/test/seo-trust.test.ts` guards metadata and trust rules; `src/test/affiliate.test.ts` guards the affiliate registry and product validation; `src/test/rules.test.ts` the quiz and planner. Site health: `.github/workflows/site-health.yml` and `scripts/site-health.mjs`.

## Known limitations

- No CMS: content is edited as code (`docs/buyer/CONTENT-MANAGEMENT.md`).
- Fonts load from Google Fonts (`docs/BRAND-GUIDE.md`); self-host if you prefer.
- `site.url`, contact email, socials and legal owner name are empty in `src/config/site.ts` until the owner fills them.
