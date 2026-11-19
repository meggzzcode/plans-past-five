# Editorial reset: execution plan (awaiting owner approval, nothing executed)

Status 2026-11-19. Baseline: `b376648` (plus Cowork round-2 prompt `6111700`). This plan supersedes the monetisation rewrite of last week for article bodies; it does not supersede the hard constraints (see section 6).

## 1. What changes and what does not
- **Changes:** every article body is rewritten from a fresh brief; the library is reorganised into 12 flagship / 9 discovery / 7 supporting, with 4 consolidations; product research moves to a weighted scoring model (desirability first); shop re-merchandised into 8 named collections; homepage, quiz, planner, journal journeys refined.
- **Stays:** URLs, route architecture, the hobby directory, My Plans (browser storage only), the importer + catalog pipeline, affiliate registry (tracking OFF), CMS, tests, security headers, docs set. No accounts, database, newsletter, paid ads, new tools.
- **Not wasted from last week:** the 30 article-only product types, hobby gear blocks, Amazon-only link test, catalog (66 records), 13 Cowork-verified additions, source lists, safety wording. They are inputs, not the base copy.

## 2. Decisions I need from you before Phase B starts (short list)
1. **Branch.** This session is set to push to `claude/vibrant-dirac-amdf7r`. I propose tagging the baseline (`baseline-pre-reset`) and working there, with backups under `docs/editorial-reset/backup/` (private repo only; excluded from the sale package). A separate `editorial-reset` branch needs your OK to push.
2. **Product pictures.** Brief wants cards that show "visual appearance", but Amazon forbids stored images and only API-fed images are allowed (needs sales). Options: (a) text + editorial inspiration image per collection, no product photos (safe, my default); (b) Cowork confirms SiteStripe image embeds are allowed for this site type (workstream P) and we use them. Choose after Cowork reports; default is (a).
3. **Cycling article.** It carries safety guidance. Default: keep the page live, noindex-free, folded into "Active hobbies" as a section with a 301 once the replacement is validated; never delete.
4. **Consolidation redirects.** Netlify `_redirects` entries add real redirects (needs one release deploy anyway). Default: 301s, canonical to the merged guide, old slugs kept in the sitemap history file.
5. **Pilot approval gate.** I will stop after Phase B and present the four pilots for your approval. Nothing else is rewritten before that.

## 3. Phases, owners, parallelism

**Phase A: Baseline and research (parallel, about 4 agents)**
- A1 Tag baseline, snapshot article JSON + rendered screenshots (desktop 1280, mobile 390) of all 32 pages, copy to backup folder. Confirm which listed problems still reproduce (adhesive claims, watercolor hero, broad product fallback, impression counting, blank analytics/contact, planner equipment assumptions). Many are already fixed: report each as FIXED / OPEN with evidence, not from old audits.
- A2 Keyword-intent validation for all 32 (search intent, overlap, cannibalisation pairs, the 4 consolidation candidates). Source: SERP reading via web search; no invented volumes.
- A3 Product research framework: `docs/commerce/research/SCORING.md` (the 25/20/20/10/10/10/5 model, 80 shortlist, 90 flagship, safety/compatibility/listing gates), schema for `PRODUCT-RESEARCH-DB.csv` with every field in brief section 6, internal scores never shown to readers or labelled as ratings.
- A4 Art direction guide and image inventory skeleton (`docs/IMAGE-LICENSES.md` extended: source, rights, intended use, "inspiration, not product" flag).
- Output: `BEFORE-AUDIT.md`, `ARTICLE-DISPOSITION.md` (keep/rewrite/merge/archive with reasons).

**Phase B: Pilot (4 articles, parallel agents, then my integration)**
Air-Dry Clay (project tutorial), Junk Journaling Supplies (shopping guide), Mahjong Night (group experience), 35 Hobbies (traffic feature). Each gets: brief, independent research, outline, draft, product shortlist from the scoring DB, image plan, shop block design. Rendered at 1280/390, compared side by side with the old version, scored on the four perspectives. **STOP: you approve, adjust, or reject before Phase C.**

**Phase C: the 9 remaining flagships** (watercolor, creative hobby starter kits, embroidery, craft night, paint night, picnic, at-home creative weekend, cozy solo dates, pickleball). The pilot already covers 3 of the 12 flagships (clay, junk journaling supplies, mahjong); the fourth pilot (35 Hobbies) is a discovery article. Same pipeline; the 8 shopping collections are built alongside. Cowork verifies listings in rolling batches.

**Phase D: Library** 9 discovery + 7 supporting + validated consolidations + redirects + internal-link rewrite and checker.

**Phase E: Journey** homepage editorial row after the three journeys; directory top 10-12 hobbies as full beginner pages (existing hobbies only); quiz result -> first activity, guide, starter supplies, save-to-plan; planner and Tonight separate "now with what you own" vs "needs supplies/advance"; My Plans framed as a collection; Journal category navigation and prominence.

**Phase F: QA and launch readiness** full gates, responsive/a11y/performance, link health, redirect tests, sitemap, analytics events, four-perspective simulated reviews (labelled simulated), five-person usability script, buyer docs refreshed, scorecard and verdict, tracker.

## 4. Division of labour
- **Claude Code:** all writing, research synthesis from public sources, code, content JSON, tests, docs, scoring DB, redirects, reviews.
- **Cowork (owner browser):** live Amazon listing verification per shortlisted product, SiteStripe/image-rule check, Pinterest, consoles, the one deploy. Sent in rolling batches only for products that score 80+ in my research, so it never verifies junk.
- **Owner:** pilot approval, deploy "go", logins, pricing, real-reader usability sessions.

## 5. Quality gates (every phase)
eslint, tsc, vitest (byte-stable JSON test), affiliate guard in both modes, both builds, `bun audit`, link health, no-unsupported-claims, Amazon-only test, no internal notes in bundle. New tests: redirect map, every merged slug resolves, every named product has verification date + ASIN verified by Cowork, no "best/guaranteed" claims, collection descriptive labels present. Never merge red; main only fast-forwarded at the final tested release.

## 6. Constraints carried forward (unchanged)
No purchases, payments, agreements, affiliate applications or real IDs, no listings, emails, pins posted, domain/ownership/visibility changes. No fabricated ASINs, prices, ratings, reviews, testing, traffic or revenue. No stored Amazon images or prices. AI disclosure only on Editorial Standards. Simulated reviews labelled simulated. No newsletter/printables/accounts/DB. Never run prettier on article JSON.

## 7. Risks
- Rewriting everything resets source verification: every claim keeps its source or is dropped; safety content (cycling, clay, glue, skates) rewritten conservatively and re-sourced.
- Redirects and merges can hurt a site with no traffic history only marginally; low risk now, which is why do it before launch.
- Pilot may show the old drafts were already adequate in places: reuse where it adds value, per the brief.
- Volume: 28 articles x full pipeline is large; pilot sets the per-article cost before committing.

## 8. Order of work once approved
A (parallel) -> B -> your approval -> C and D in parallel batches -> E -> F -> final release commit -> Cowork go.
