# Claude Code Handoff — Plans Past Five

Frontend-only TanStack Start (React 19, TypeScript, Tailwind v4) site. No database, auth, AI or paid services. Brand guide: `docs/BRAND-GUIDE.md`. Images: `docs/IMAGE-LICENSES.md`.

## Completed
- Design system, logo system, favicon, decorative kit; header with mobile menu; footer.
- Homepage (hero collage, categories, quiz teaser, 5:01 Edit, Weekend Edit, Table for One/Better Together, Journal, shop, newsletter-ready block).
- Six section pages, Journal index, article template (breadcrumbs, byline, date, computed reading time, TOC, pull quotes, all editorial inserts, save, copy-link, Pinterest share, contextual related reading, JSON-LD).
- 4 articles were originally published (35 hobbies; 25 after-work; 21 creative at home; junk journaling guide); these have NOT been source-checked yet (Cowork C4 still to do). Today (2026-11-19) 27 are `status: "published"` and 5 are drafts; see the build-out section below.
- 36 hobbies, directory with 10 filters, hobby profile pages (noindexed unless a published article covers the hobby).
- Off Duty Essentials: 8 collections, 36 product types, central Amazon search links, honest disclosure.
- Find Your Thing quiz (rule-based, 6 themes, too-few-matches handling). Make Some Plans (deterministic, save/shuffle/print).
- My Plans (localStorage). Site search.
- About, Start Here, Contact, Privacy, Terms, Affiliate Disclosure, Editorial Policy, custom 404, sitemap.xml, robots.txt, per-page metadata + canonicals.

## Architecture
```
src/config/site.ts        brand, taglines, social, legal, integration flags
src/config/affiliate.ts   Amazon link builder (associatesTag empty = unmonetized)
src/content/              articles (types.ts, one file per article, drafts.ts, index.ts helpers)
src/data/                 hobbies, products, categories, activities, images
src/lib/                  finder.ts, planner.ts, saved.ts, search.ts, seo.ts
src/components/brand|layout|editorial|cards|pages
src/routes/               one file per URL (see brief §10)
src/test/rules.test.ts    quiz/planner/content rules
```

## How to…
- **Add an article:** create `src/content/article-x.ts` exporting an `Article` (blocks: p, h2 with id, list, quote, image, item, inserts like `shopHobby`, `noSpend`, `makePlan`, `ifYouLoved`). Add to the `all` array in `src/content/index.ts`. `status: "draft"` keeps it out of routes, lists, search and sitemap. Inline text supports `**bold**` and `[link](/path)`.
- **Publish a draft:** write its `body`, set `status: "published"` and `publishedAt`.
- **Add/edit products:** `src/data/products.ts`. Set `amazonQuery` for a search link; set `exactUrl` only after verifying a listing (button then reads "View on Amazon"). Never add prices, ratings or ASINs without verification.
- **Monetize:** set `affiliate.associatesTag` in `src/config/affiliate.ts`. All links gain `tag=` and `rel="sponsored"`; disclosure text switches automatically.
- **Hobbies:** `src/data/hobbies.ts` seeds; tags (at-home, after-work, low-cost…) are derived in `make()`.
- **Quiz matching:** `src/lib/finder.ts` — hard filters (location, time, budget, company, energy ≤ +1), score craving +4, energy +2, beginner +1; theme from top categories; <3 results → suggests which constraint to loosen.
- **Planner:** `src/lib/planner.ts` + `src/data/activities.ts` — slots by when/length, filters part/company/budget/minutes/at-home, vibe score, `seed` rotates within top 4 (Shuffle). Activities never name real places, events or prices.
- **Saved items:** `src/lib/saved.ts`, key `ppf:my-plans:v1` in localStorage, read after mount.
- **Newsletter/analytics:** newsletter flags in `site.integrations` are placeholders; nothing is wired (add Kit/MailerLite only with owner credentials). Analytics is wired but off: set `analytics.ga4MeasurementId` (empty by default) to load GA4; decide consent first (`docs/buyer/ANALYTICS-SETUP.md`).

## Testing results (this build)
- Original build: typecheck clean, 12 tests (historical). Current (2026-11-19): typecheck clean; `bunx vitest run` → 523 tests passing in 34 files.
- Playwright: home, article, shop, directory render at 1280px and 390px with no console errors; quiz → result → save, planner → save, My Plans lists 2 items, draft URL returns 404.

## Known issues / not done
- `site.url`, contact email, socials, legal owner name are empty — fill in before launch.
- Privacy/Terms are starter text; owner should get them reviewed.
- Hobby profile pages are short; expand before indexing.
- Pinterest templates not built (concepts below). No 1200×630 OG image yet; hosting supplies a screenshot.
- Fonts load from Google Fonts; self-host with @fontsource if preferred.

## Outstanding articles (drafts)
Historical list from the first build; superseded by `docs/content/ARTICLE-ROADMAP.md` (2026-11-19: 27 published, 5 drafts).
30 Solo Date Ideas · 20 Affordable Hobbies Under $30 · How to Host a Cute Craft Night · Getting Into Tennis as a Beginner · How to Start Watercolor Painting at Home · 15 Low-Energy Hobbies · How to Make Friends as an Adult Through Hobbies · 25 Cute Weekend Plans That Aren't Just Brunch.

## Pinterest launch pin concepts (1000×1500)
| # | Style | Title | Destination |
|---|---|---|---|
| 1 | Magazine cover | 35 Hobbies for When Life Feels Like Work, Sleep, Repeat | /journal/hobbies-to-try-when-life-feels-like-work-sleep-repeat |
| 2 | Editorial list | 25 Things to Do After Work Instead of Scrolling | /journal/things-to-do-after-work-instead-of-scrolling |
| 3 | Scrapbook guide | How to Start Junk Journaling (Beginner Supply List) | /journal/how-to-start-junk-journaling |
| 4 | Scrapbook guide | Your First Junk Journal Page in 30 Minutes | /journal/how-to-start-junk-journaling |
| 5 | Editorial list | 21 Creative Hobbies You Can Start at Home | /journal/creative-hobbies-you-can-start-at-home |
| 6 | Moodboard | Cozy Creative Evening Ideas | /after-hours |
| 7 | Magazine cover | What's Your Hobby Era? Take the Quiz | /hobby-finder |
| 8 | Weekend moodboard | Let's Give Saturday a Storyline | /make-plans |
| 9 | Moodboard | Pottery Night at Home Supplies | /shop/pottery-era |
| 10 | Editorial list | Girls' Night In Ideas That Aren't Wine | /shop/girls-night-in |
| 11 | Moodboard | Solo Date Ideas: Table for One | /solo-dates |

## Next steps
1. Fill owner details in `site.ts`; connect domain; set `site.url`.
2. Revise the 5 remaining drafts and source-check the 4 original articles (Cowork C4).
3. Generate missing imagery (see IMAGE-LICENSES.md) and an OG image.
4. Build Pinterest templates.
5. Wire the newsletter once credentials exist; set `analytics.ga4MeasurementId` once the owner supplies a GA4 ID and has decided on consent.


## Turnkey build-out (2026-11-19, branch claude/vibrant-dirac-amdf7r)
Plan and work split: `docs/TURNKEY-PLAN.md`. Checkpoint: `docs/RESUME.md`. Cowork tasks: `docs/cowork/PLANS-PAST-FIVE-COWORK-TASKS.md`. Buyer docs: `docs/buyer/`. Content and commerce docs: `docs/content/`, `docs/commerce/`, `docs/marketing/`.
- **Articles:** 27 are `status: "published"` and registered in `src/content/index.ts`; 5 are drafts (how-to-start-air-dry-clay, how-to-start-crocheting, how-to-start-embroidery, watercolor-painting-for-beginners, affordable-hobbies-under-25) plus 2 outline-only entries in `src/content/drafts.ts`, all registered in `src/content/draft-registry.ts`, which only tests and scripts import, so draft text is not bundled into the public site. 23 of the published articles were source-checked by Cowork on 2026-11-18 (`docs/content/verification/`, applied in `docs/content/verification-applied/`); the 5 drafts were checked and left NOT READY. The 4 originally published articles have NOT been source-checked yet (Cowork C4 still to do). Published means set to published on the branch, not deployed.
- **Affiliate behavior changed:** setting `associatesTag` alone no longer monetizes. The Amazon entry in `src/config/affiliate.ts` must also be `approved` and `active`. See `docs/buyer/AFFILIATE-ACTIVATION.md`. The older "Monetize" note above is superseded.
- **Shoppable system:** `src/data/catalog.ts` and generated `src/data/catalog.generated.ts` (44 records: 37 verified, 7 candidate; imported with `bun run import:products`; details in `docs/commerce/IMPORT-REVIEW.md`), `src/components/commerce/*`, `src/lib/shoplist.ts`. Only verified records render, and with no verified product a slot renders nothing. Verified means the Amazon listing was checked (ordinary non-affiliate links), not that the product was tested.
- **Planner and quiz** were rewritten (total budget, time slots, restoring saved plans, energy, quiz handoff). New tools at `/tools/hobby-budget` and `/tools/tonight`.
- **Trust pages:** `/editorial-policy` (with the one AI disclosure), `/methodology`, `/corrections`.
- **Newsletter:** the homepage no longer promises one (standing decision: no newsletters for now).
- Printables and digital products were removed by owner decision (2026-11-19).
- Amazon Associates is the only affiliate program; nothing is applied for or active. Nothing is deployed.
- Not yet true: no domain, host, GA4 property (the setting is empty) or affiliate account is set up; legal pages are starter text.
