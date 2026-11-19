# Final verdict: Plans Past Five

Date: 2026-11-19. Release candidate `2e13370` (`aefbdb1` on top adds docs only). Scores and gate tables: `FINAL-SCORECARD.md`. Plain language, evidence-based. There are no traffic or revenue claims because there is no traffic and no revenue. Anything marked SIMULATED comes from AI personas, not real customers or buyers.

## The two decisions

- **CODE COMPLETE: READY FOR COWORK: YES.** All 23 mandatory code gates are PASS (none FAIL); what remains in them needs a live site, an account or a person. Before Cowork starts, write `docs/marketplace/final-inspection/RELEASE-HANDOVER.md` (the Cowork pack points to it and it does not exist) and regenerate `docs/buyer/INVENTORY.md`.
- **BUSINESS COMPLETE: READY TO LIST: NOT YET.** 12 of 21 applicable sale gates pass; 6 are blocked on a live site, 1 needs the owner, 2 need external checks.

Headline numbers: website business score 3.3 / 10 (Traffic 1, Revenue 1, Content 6, Operational stability and low risk 5); turnkey readiness 74.9 / 100 (66.4 if work awaiting external checks counts as zero); customer experience 6.5 / 10 SIMULATED; commercial desirability 4 / 10; buyer appeal 5.0 / 10 SIMULATED; technical quality 7.5 / 10; transfer readiness 6 / 10.

---

## 1. Excluding domain and email, is it ready to sell?

Not yet, but the repository is. The code, tests, content, tools, brand files, pins and buyer documents are finished and checked (735 of 735 tests, typecheck clean, lint 0 errors, `bun audit` 0). What stops a listing is not the code: the site has never been live on the domain, no product has been checked live by Cowork, the CMS has never been opened with a real login, the image licence terms have not been read live, and the owner has several decisions open. Domain and mailbox are two of those items, not all of them.

## 2. What remains mandatory before listing?

1. Live deploy on `planspastfive.com` with HTTPS, then make it public and check headers.
2. A working mailbox, and its address set in `src/config/site.ts` so the contact page has an inbox.
3. Cowork live verification of the 29 shown products, with a data-only import afterwards.
4. Cowork source results for the open article claims (safety statements first).
5. A real Pages CMS login test, including publish and rollback.
6. Lovable and Canva terms read live and the three rights documents updated together.
7. Repo privacy decision; build the real buyer package from `scripts/make-buyer-package.mjs` and scan it.
8. Owner decisions: price, whether domain and mailbox are in the sale, what to do with the seller's Netlify test project, support terms.
9. Live marketplace fee and comparable check; re-read the listing draft against the repo; the owner publishes it personally.
10. Re-run the inventory, scorecard and gate table on the final commit.

## 3. What should be left for the buyer?

- Search Console, Bing, GA4 (the loader exists and is off until an ID is set), Pinterest account and posting.
- Amazon Associates under their own account (not transferable), and the other affiliate programmes.
- Keyword and demand research, new articles, the other six kits, product photos with brand permission.
- Real prices and photos on the shop, if they want a stronger shop.
- Replacing the AI images, a lawyer's review of Privacy and Terms, a trademark check on the name.
- Code split of the article data (entry chunk 780 KB), self-hosted fonts, WebP, heading order on shop pages, shorter titles.
- Moving off the Nitro pre-release or the Lovable config package (a tested replacement `vite.config.ts` is in the security register).
- The 30-day activation experiment (it needs written owner authorisation per step and is optional).

## 4. What would the target audience genuinely like or dislike? (SIMULATED)

Five AI personas, run on an earlier build, so a snapshot only. **Liked:** the warm, clear first screen; Tonight and the quiz giving something to do in under a minute; plans that respect the stated budget and time; copying a plan to the group chat; honest disclosures and "why we picked it" lines; junk journaling and mahjong content. **Disliked:** no product photos and no prices; six of eight shop collections are a single "where to start" card; no contact address; anonymous "editors" byline; AI-looking images; no reason to come back beyond the tools. Average 6.5 of 10; supplies desirability 4.8.

## 5. What would a buyer find attractive?

- A finished, tested, server-rendered site with 32 sourced articles, 43 hobbies, four original tools and a saved-items system that works without accounts.
- A complete brand kit: 12 logos, palette, three OFL fonts, templates, 88 pins with a CSV and a 90-day schedule.
- No database, no paid APIs, about $1 to $17 a month to run.
- Honest disclosure and a documented, rehearsed takeover; guards against publishing unsourced claims; an affiliate switch built and tested in both states.
- A head start on structure and tooling, not a business. SIMULATED buyers rated website quality 7 to 7.5 and operating cost 6 to 8.

## 6. What would stop a buyer from making an offer?

- No traffic, no revenue, no domain history, not live: nothing can be shown working.
- Amazon dependency: no tag exists, the account does not transfer, approval needs sales that need traffic (SIMULATED investor: 2 of 10).
- AI-generated images and AI-drafted articles: no exclusivity, no registrable copyright promised, transfer terms unverified; the Lovable agreement cannot be assigned.
- Needs a developer for a first deploy, products and settings; the CMS is untested.
- Crowded niche, no named author, thin shop, unverified-live products.
- Dependence on a pre-release framework and one vendor config package.
SIMULATED willingness to purchase was 3, 3 and 4 out of 10.

## 7. Most defensible asking price

- Range: provisional **$1,495** (`REMEDIATION-PLAN.md`) to researched **$2,950** (`MARKETPLACE-POSITIONING.md`; expected negotiation range $1,500 to $2,500, quick sale $1,200).
- **This is judgment, not market data.** No completed sale of a comparable pre-revenue, not-live site was found (Flippa pages returned 403; every figure found is an asking price, a claim or an author's opinion). All marketplace fees are unverified assumptions.
- **A no-sale outcome is possible and plausible**; the listing fee ($29 to $49, unverified) is non-refundable.
- Simulated buyers' ceilings were low hundreds to about $1,000, a starter-site price, and a low offer for brand and pins only. That is simulated sentiment, not market data, but it points below both numbers.
- **Recommendation: ask $1,995 as open to offers, accept offers from about $1,200, and drop to $1,495 if there are no offers after about 30 days or after the live-domain check.** Reasoning: $1,995 sits inside the researched negotiation band, leaves room to meet a buyer near the provisional price, and avoids anchoring at $2,950 which the research itself calls generous for a not-live site. If the goal is to sell rather than test the market, ask $1,495 from the start. Net at $1,495 is about $1,269 and at $1,995 about $1,719 after the assumed 10% fee, $49 listing fee and $27.16 cash spent (`PRICING-SENSITIVITY.md`). The owner decides.

## 8. How much ongoing maintenance does the business actually need?

Do not read "two minutes a week" anywhere. Measured machine time is small; human time is real and mostly unmeasured.

| Kind | Machine time (measured in a scratch copy, indicative within 2x) | Human time |
|---|---|---|
| Routine maintenance | Weekly health run about 1.5 to 2 minutes of GitHub compute; local tests, typecheck and build about 35 to 60 seconds; a dependency update loop about 40 seconds plus review (`MAINTENANCE-MEASURED.md`). Hosted build time and credits not measured | Docs estimate about 30 minutes a week (read health issue, merge Dependabot PRs, spot-check) and 1 to 2 hours a month (digest, freshness, corrections, Search Console, credits). These are the author's estimates, not measured. A failed update or a broken link costs more |
| Content creation | A publish loop is about 33 seconds of machine time, but a draft fails the gates until it is edited and sourced | Hours per article to write, source-check and edit; not measured. Roughly the work that produced 32 articles |
| Product verification | Importer checks run in under a second | Checking each Amazon listing, ASIN, availability and wording by hand, and re-checking when records pass their verification window; no time sample exists |
| Marketing | Pin images are built | Posting about 88 pins on a 90-day plan, reading reports; the activation plan budgets about 6 owner hours over 30 days as an estimate for an experiment, with no promise of results |

Minimum to keep it alive: pay the domain, merge security updates, keep within the Netlify credit cap. Anything that grows the business is content, product and marketing work by a person.

## 9. Can the buyer operate it without relying on us?

Yes for reading, running and deploying from the docs; no for a first-time, non-technical buyer without help. The seller is not required for any step in `BUYER-TAKEOVER.md`. Genuine dependencies:

- **`@lovable.dev/vite-tanstack-config`** (public npm package, wraps Vite, TanStack Start and Nitro). No Lovable account is needed, but if it left npm the build config would need replacing (a tested replacement is in the security register). It is also exempt from the 24-hour release-age guard.
- **Nitro `3.0.260603-beta`** (pre-release; an RC `3.0.261103-rc` was verified in scratch). No stable Nitro 3 exists.
- **Netlify** (configured host; free plan has a 300-credit monthly cap, about 15 credits per production deploy, deploy marker rule in `netlify.toml`). Other hosts need their own verification.
- **GitHub** (repo, CI, Pages CMS login, Netlify connection).
- Domain registrar, mailbox, Amazon Associates, Google and Pinterest accounts: all the buyer's own.
A developer (or an AI coding tool) is needed for: the first deploy (hours), editing products (CSV plus importer and tests), switching affiliate links on (and updating tests), setting contact and publisher details, replacing images, any code change, and fixing a broken dependency update. Articles in a browser only after the CMS is proven.

## 10. Have we overdeveloped anything?

Honestly, yes in places where more effort will not change what a buyer pays:

- Test volume and scenario matrices beyond what a buyer will read; 735 tests is already far past the point of persuading anyone.
- Document volume: 37 buyer docs plus 140+ working reports; a buyer will read START-HERE, the overview and the transfer checklist.
- Three rounds of simulated reviews and many audits: they found real defects early, but further rounds only repeat the same limits (no live site, no photos, AI images, no Amazon account).
- Pin volume (88) and the buy-plan research (about 200 candidate rows): nothing is being posted and only 29 products show.
- Performance lab tuning below what a live check will show; real numbers need the live host.
- The 30-day activation plan, pricing sensitivity detail and fee modelling on unverified fees.
What will not change sale value: more articles, more tests, more review rounds, more docs. What would: a live indexed site with a few weeks of data, a working mailbox, live-verified products, and cleared image terms.

## 11. Are we ready to move on to the next website?

**Yes, with conditions.** Yes because the repository work is done and further code effort here has low return. Conditions: (a) the owner gets the Cowork pack going, or accepts that the listing waits for the external items in question 2; (b) `RELEASE-HANDOVER.md` is written and the inventory regenerated; (c) the repo is frozen at `2e13370` with changes limited to data-only imports and fixes Cowork reports; (d) nothing is published, deployed or listed without the owner's explicit approval; (e) the next site reuses the lessons (live domain and host early, verify listings live, decide image rights before generating images, keep scope frozen, do not let several agents edit one tree), not the volume of paperwork.
