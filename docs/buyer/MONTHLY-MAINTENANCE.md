# Monthly maintenance (1 to 2 hours)

Automated: `.github/workflows/monthly-digest.yml` opens an issue on the 1st with counts of published and draft articles, hobbies and products, plus the freshness list. Counts only.

Owner checklist
1. Read the digest. Pick articles flagged as overdue and re-verify costs, rules and availability; update `updatedAt` and `verifiedAt` in the article file.
2. Review `src/content/corrections.ts`: every correction made this month should be logged (`docs/SOP-corrections.md`).
3. Confirm affiliate disclosure and Privacy still match reality, especially if you added an affiliate tag, analytics or a newsletter.
4. Check Google Search Console (once set up) for crawl errors and pages not indexed; compare against `/sitemap.xml`.
5. Rotate or review account access (GitHub, host, registrar, affiliate programs).
6. Run `bun scripts/site-health.mjs digest` locally any time to see the same counts.
