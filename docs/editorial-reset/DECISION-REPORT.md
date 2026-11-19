# Decision report: finish simplifying this repo (A) or start a clean minimal site (B)?

Date 2026-11-19. Status: all development paused; nothing deleted; awaiting owner decision. Effort figures are rough planning estimates, not measurements. Code sizes below are measured.

## What we have today (measured)
34 routes, about 38,500 lines of code (src plus scripts), 10,800 lines of tests (68 files), 18 data files (7,250 lines; hobbies alone 1,860), 41 components, 513 docs files, 11 runtime dependencies. Built for a larger product than the one we now want: hobby directory (43), quiz, two planners, saved items, six mood pages, tools. Strengths worth keeping: one product source with build gates, one settings file, central affiliate links, publish workflow, image-rights gate, strong tests. Weakness: the owner-facing surface is big, and the content is not yet at the standard we want (the four pilots are drafts; zero Amazon-verified product links; no cleared photos; CMS never tested with a real login).

## Option A: finish simplifying this repo
- **Remaining work:** integrate pilots and new article layouts (about 5 new block types), finish the 12 to 28 articles, remove or hide the features we no longer want (quiz, planners, saved, directory, mood pages), fix the docs set (513 files down to about 11), run the real CMS and Netlify test.
- **Effort:** about 8 to 12 work packages, most of them removals and test rewrites that exist only because the old features are there. Content work (the same in both options) is the biggest part.
- **Technical risk:** low to medium. Safety nets exist (901 tests, gates). But each removal ripples through tests, pins, redirects and docs (we just saw this when deleting articles proved large), and Netlify still runs a Node server build for what is mostly static content.
- **Buyer maintenance:** improving, but the buyer still receives a repo with 34 routes, 38k lines and 7k lines of hobby/activity data they do not need to understand. Realistic: 3 to 5 hours a month only after the removals.
- **SEO:** neutral. Nothing is indexed and the site is private; old URLs carry no equity. Redirects already exist for the few that matter.
- **Preserve:** everything already in the repo, by default.

## Option B: clean minimal site in a new repository
Scope you gave: homepage, about 12 exceptional articles, curated Amazon products, a simple CMS, basic analytics, essential legal pages. No directory, quiz, planner or saved items.
- **Suggested stack (my recommendation):** a static-site generator (Astro) with Markdown articles, one JSON file per product, one settings file, Pages CMS, Netlify static hosting. No server, no database, no state in the browser. Estimated 2,000 to 4,000 lines of code instead of 38,500.
- **Effort:** about 10 to 14 work packages: scaffold and design system (2), article templates and product cards (2), port content and product records (2), settings, analytics, legal, SEO basics (2), CMS and publish workflow plus the real acceptance test (2), QA, accessibility, performance and handover docs (2). Content work is the same as in A.
- **Technical risk:** medium at first (new code, new framework), low once built because the surface is tiny. The CMS and publish path are untested in both options. Risk to control: re-creating the safety checks we already have (product reference check, image rights, build validation). Those are small and portable.
- **Buyer maintenance:** best. A non-coder edits articles, products, images and settings in the CMS; there is no planner or quiz to break; static hosting is cheaper and makes deploys faster and less likely to be credit-hungry. Realistic: 2 to 3 hours a month.
- **SEO:** neutral to slightly better (static pages, fast, simple markup). Only about 12 URLs to plan; reuse the best existing slugs. No equity at risk.
- **Preserve (copy across):** brand voice and standards (E3), the merchandising method and scoring, product research and Cowork verification data, the four pilot drafts and image briefs, existing photos with their licence records, the affiliate rules and central-tag design, legal pages' text, the publish workflow and settings validation ideas, domain, email, Netlify and Associates setup. Keep this repo as a private archive and as an expansion path (the quiz and planner can be offered to a buyer as a future add-on, not part of the core).

## Recommendation: Option B
The goal is a polished, monetised, easy-to-operate site. Most of what makes Option A heavy is exactly what you no longer want to sell, and removing it costs about as much as building the small site, while leaving a bigger, more entangled repo behind. Option B costs a little more up front, delivers a much smaller thing a buyer can understand in an hour, and fits the Pages CMS plus static hosting model well. The content, research, photos, product data and rules we have built carry over either way, so little of the real value is lost.
Condition: keep this repository (including branch `editorial-reset`) untouched as the archive, and start B by reusing only the pieces listed above, one at a time.

## What would change my mind
Choose A if (1) you decide the quiz and planner are part of what makes the business worth buying, or (2) you need something live within days rather than weeks. Either favours finishing the existing site.

## If you approve B, the first steps (nothing starts before your go)
1. Create the new private repository and a minimal scaffold (homepage, article template, product card, legal pages).
2. Port the product records and settings; re-implement the three build checks (product references, image rights, content validation).
3. Bring over the four pilot articles, then write the remaining articles in the approved order.
4. Run the real CMS and publish acceptance test on a throwaway site; then Cowork verifies products, and you authorise going live and switching the tracking ID on.
