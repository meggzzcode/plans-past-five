# Buyer 90-day plan

A suggested order of work. It makes **no promise** of traffic, rankings or income: the site is pre-revenue and not yet public (2026-11-19), and results depend on many things outside this repo. Adjust to your time. Hours are not estimated because they depend on you.

## Days 1 to 14: take ownership and get online

- Read `docs/buyer/START-HERE.md`, `BUSINESS-OVERVIEW.md`, `WEBSITE-ARCHITECTURE.md`.
- Finish the transfer (`docs/buyer/TRANSFER-CHECKLIST.md`); turn on two-factor everywhere; rotate shared credentials.
- Run locally: `bun install --frozen-lockfile`, `bunx vitest run`, `bunx tsc --noEmit`, `bun run build`.
- Choose hosting and the domain; deploy; set `site.url`; update `public/robots.txt` (`docs/buyer/HOSTING-AND-DEPLOYMENT.md`, `DOMAIN-AND-EMAIL.md`).
- Set up `hello@` and `site.contactEmail`.
- Get a lawyer to review Privacy and Terms.
- Verify the site in Search Console (DNS route) and submit the sitemap (`docs/buyer/ANALYTICS-SETUP.md`).

## Days 15 to 30: make the content trustworthy

- Pick the first cluster: the flagships (`junk-journaling-supplies-for-beginners`, `how-to-start-air-dry-clay`, `how-to-host-a-mahjong-night`) and their spokes (`docs/content/ARTICLE-ROADMAP.md`).
- Build or assign research briefs (`docs/content/ARTICLE-RESEARCH.md`); verify claims; resolve `coworkChecks`.
- Publish the first few verified articles with the gate (`docs/content/ARTICLE-QUALITY-CHECKLIST.md`, `docs/SOP-publish-article.md`).
- Register the new article files in `src/content/index.ts`.
- Start the weekly routine (`docs/buyer/WEEKLY-MAINTENANCE.md`).
- Open your Pinterest business account; create boards (`docs/marketing/PINTEREST-STRATEGY.md`).

## Days 31 to 60: distribution and first monetization steps

- Publish more of the roadmap in clusters; add internal links (`docs/content/INTERNAL-LINKING-STRATEGY.md`).
- Create and schedule pins for published articles (`docs/pinterest-pins.csv`, `public/pins`).
- Apply to affiliate programs under your own accounts once the site is live and reviewable (`docs/buyer/AFFILIATE-SETUP.md`). Do not assume approval.
- Begin product research for the kits tied to published articles (`docs/commerce/PRODUCT-RESEARCH.md`); verify a few products properly rather than many quickly.
- Decide on analytics and consent; add if appropriate.

## Days 61 to 90: review and decide

- Review Search Console and analytics (if enabled) to see which articles are indexed and read. Do not set targets from other sites.
- Update or merge weak articles; promote promising candidates from `docs/buyer/CONTENT-ROADMAP.md` only if evidence supports them.
- If an affiliate program approved you: activate in `src/config/affiliate.ts`, run tests, check disclosures (`docs/SOP-affiliate-link-check.md`).
- Monthly routine (`docs/buyer/MONTHLY-MAINTENANCE.md`).
- Write down what you learned and the next 90 days. Decide whether to continue, change direction or stop.

## Always

Verify before publishing. Never invent experience, testing, prices or ratings. Keep affiliate links in one place. Keep secrets out of the repo.
