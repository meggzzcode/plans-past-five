# Weekly maintenance (about 30 minutes)

Automated: `.github/workflows/site-health.yml` runs Mondays 06:23 UTC (or run it by hand in GitHub Actions). It builds the site, checks every sitemap URL and internal link, and lists articles not updated in 6 months. Problems become a GitHub issue labelled `site-health`; the issue closes itself when fixed.

Owner checklist
1. Read any open `site-health` issue and fix internal broken links first (external link reports are advisory; many retailers block bots).
2. Merge green Dependabot pull requests (CI must pass).
3. Spot-check the live home page, one article, the shop and `/sitemap.xml`.
4. Check affiliate links still point where their button says (search vs listing). See `docs/SOP-affiliate-link-check.md`.
5. If you changed content, run locally: `bunx vitest run`, `bunx tsc --noEmit`, `bunx vite build`.

Never let automation publish content or change claims; publishing is a manual edit (`docs/SOP-publish-article.md`).
