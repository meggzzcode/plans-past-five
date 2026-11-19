# Content distribution

How an article reaches readers. The site is pre-revenue and not yet public (2026-11-19). No audience, traffic or ranking exists, so this page describes channels and routines, with no numbers.

## Channels

1. **Organic search (primary for commercial and how-to articles).** Pages are server-rendered with unique titles, descriptions, canonicals and JSON-LD (`docs/buyer/SEO-GUIDE.md`). After each publish: confirm the URL is in `/sitemap.xml`, then request indexing in Search Console once the property is verified (`docs/buyer/ANALYTICS-SETUP.md`). Do not expect results on a timeline; indexing and ranking speed is not something this repo can promise.
2. **Pinterest (primary for visual and inspirational articles).** Three pin concepts per article, linking to the article (`docs/marketing/PINTEREST-STRATEGY.md`).
3. **Internal links.** Hubs, related reading and cross-links carry readers between guides (`docs/content/INTERNAL-LINKING-STRATEGY.md`). A new article should never be an orphan.
4. **Tools.** The quiz (`/hobby-finder`), planner (`/make-plans`), budget and tonight tools (`/tools/hobby-budget`, `/tools/tonight`) give people reasons to arrive and return; each links back to relevant guides.
5. **Newsletter.** Not wired. `site.integrations.newsletter.enabled` is `false`. Add it only with the owner's own provider account and updated privacy page.
6. **Social (Instagram, TikTok).** Not set up; `site.social` is empty. Optional later; do not create accounts just to hold names.

## Publish routine (per article)

1. Pass `docs/content/ARTICLE-QUALITY-CHECKLIST.md` and flip to published (`docs/SOP-publish-article.md`).
2. Add inbound internal links from relevant published articles.
3. After deploy: verify the page, sitemap entry and social share preview.
4. Create the three pins and pin them over time.
5. Request indexing in Search Console.
6. Note the publish date. Re-check the article when its sources or products age (`docs/buyer/MONTHLY-MAINTENANCE.md`).

## Seasonal timing (qualitative guesses, all PENDING COWORK to verify with Google Trends and Pinterest Trends)

Seasonality for each topic is a guess until checked. General logic to test, not facts:
- Planning-heavy topics (picnics, hosting, weekend plans) are probably searched shortly before the season, so publish and pin a little earlier than the season. How much earlier is unknown.
- Hobby-starting topics may see interest around new-year and back-to-routine periods; unverified.
- Cozy at-home and indoor creative topics probably fit cooler months; outdoor and movement topics probably fit warmer months. Verify per region; the audience's region mix is unknown.
- Gift and holiday topics (see `docs/buyer/CONTENT-ROADMAP.md`) need lead time; unknown how much.

Record verified timing in each article's research brief (`docs/content/ARTICLE-RESEARCH.md`), not here.

## What we do not do

- No buying traffic, followers or links; no link exchanges or comment spam.
- No claims about reach, rankings or earnings.
- No cross-posting identical text across sites (duplicate content).
- No promoting by linking straight to retailers.

## PENDING COWORK

1. Is the audience mostly US-based? (Search Console and Pinterest analytics, once live.)
2. Which of the 30 articles have measurable seasonal peaks? Provide the Google Trends and Pinterest Trends reading, with date.
