# SEO guide

Facts below were checked against this repo and a production build on 2026-11-19. No traffic, ranking or earnings figures exist for this site; none are claimed.

## What is already in place
- Per-page title, description, canonical and Open Graph tags through `src/lib/seo.ts` (`seo()`); every route sets its own. `src/test/seo-trust.test.ts` fails if two routes share a title, description or canonical, or if a route is missing one.
- JSON-LD: Organization on every page (`src/routes/__root.tsx`; `sameAs` lists only the social URLs set in `src/config/site.ts`), BreadcrumbList on articles and key pages, Article on stories (image, publish and modified dates, publisher).
- `sitemap.xml` is generated from `src/lib/sitemap.ts`: published pages only. It excludes `/saved` and `/search`, drafts, and hobby profiles without a published guide (those are also `noindex`). `public/robots.txt` disallows `/saved` and `/search` and names the sitemap.

## Crawlability finding (TanStack Start SSR)
Ran `bunx vite build`, then loaded the built server entry (`.output/server/index.mjs`) and requested pages:
- `/` returns 200 with full server-rendered HTML: one `<h1>`, `<title>`, canonical, about 65 links in the markup, Organization JSON-LD.
- An article (`/journal/how-to-start-junk-journaling`) returns 200 with server-rendered content, canonical and three JSON-LD blocks (Organization, Article, BreadcrumbList).
- `/sitemap.xml` returns 200 as XML.
So search engines receive real HTML without needing to run JavaScript. The build target is a Cloudflare Worker (`.output/server/wrangler.json`), not static HTML files: there is no pre-rendered `index.html` in `.output/public`. A host must run the Worker (or Node-compatible server entry). No framework migration is needed.
Re-run any time: `bun run build`, then `node scripts/serve-built.mjs 3000` and `curl http://localhost:3000/`.

## Before launch (owner)
1. Confirm `site.url` in `src/config/site.ts` is the final domain (it feeds canonicals, sitemap, JSON-LD) and update the `Sitemap:` line in `public/robots.txt`.
2. Add a 1200x630 share image (none exists yet) and pass it as `image` where wanted.
3. Set `site.integrations.searchConsoleVerification` (rendered as `<meta name="google-site-verification">` in the root head when non-empty; `pinterestVerification` likewise renders `<meta name="p:domain_verify">`), verify in Google Search Console, submit `/sitemap.xml`.
4. Fill social URLs in `site.social` only when the profiles exist.
5. Expand hobby profile pages before indexing; today they index only when a published article covers the hobby (`src/routes/hobbies.$slug.tsx`).

## Ongoing
- Publish only verified articles; see `docs/SOP-publish-article.md`.
- Weekly workflow checks every sitemap URL and internal link (`docs/buyer/WEEKLY-MAINTENANCE.md`).
- Do not add a page to the sitemap list in `src/lib/sitemap.ts` unless it has a route and its own unique title and description.
