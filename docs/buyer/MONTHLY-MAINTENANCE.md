# Monthly maintenance (1 to 2 hours)

Automated: `.github/workflows/monthly-digest.yml` opens an issue on the 1st with counts of published and draft articles, hobbies and products, plus the freshness list. Counts only.

Owner checklist
1. Read the digest. Pick articles flagged as overdue and re-verify costs, rules and availability; update `updatedAt` and `verifiedAt` in the article file.
2. Review `src/content/corrections.ts`: every correction made this month should be logged (`docs/SOP-corrections.md`).
3. Confirm affiliate disclosure and Privacy still match reality, especially if you added an affiliate tag, analytics or a newsletter.
4. **Search Console monthly check (once your property is verified; https://search.google.com/search-console).** Open Pages (indexing): write down the indexed count and the not-indexed reasons exactly as Console shows them, with the date range. Open Sitemaps: confirm `/sitemap.xml` was read and its discovered-pages count. Open Performance: note clicks and impressions for the last 28 days. Do not say a page is indexed until Console shows it, and do not publish the numbers as a promise. Compare against `/sitemap.xml`; fix errors it names.
4a. Netlify credits: see `docs/buyer/NETLIFY-CREDITS-AND-RELEASES.md` (300 credits a month, at most 8 deploys).
5. Rotate or review account access (GitHub, host, registrar, affiliate programs).
6. Run `bun scripts/site-health.mjs digest` locally any time to see the same counts.
