# Marketplace listing draft: Plans Past Five

Status: DRAFT for owner review. Nothing has been published, listed or offered. Facts below were read from the repo on 2026-11-19 and will drift; re-check with LISTING-CHECKLIST.md before use.

## Flippa rules this draft follows (Cowork, docs/marketplace/FLIPPA-RESEARCH.md, read 2026-11-18)

> Cowork's summary of Flippa's rule (not a verbatim quote; re-read the page before listing): claims of revenue or traffic must be supported by evidence; potential-revenue or potential-traffic claims must be clearly marked as potential and accompanied by robust workings and assumptions; specific potential revenue or traffic numbers are expressly forbidden in listing titles. Source: https://support.flippa.com/hc/en-us/articles/360000217435-Making-potential-revenue-claims-on-sites-without-revenue (read 2026-11-18, page about 3,097 days old). Also Flippa's Prohibited Content page bars unverified performance or financial claims, promises or guarantees (https://support.flippa.com/hc/en-us/articles/360000298675-Prohibited-Content), and Site Rules require full details with nothing hidden (https://support.flippa.com/hc/en-us/articles/203110254-Site-Rules-for-Buyers-Sellers).

How this draft complies: it states "no revenue yet" and "no traffic history"; the title carries no earnings or traffic number; there is no "will earn" wording; "Growth opportunities" are labelled hypothetical and carry no figures or workings, so they are not presented as potential-revenue claims. Pricing limits for sites without revenue are in PRICING-STRATEGY.md (Flippa's pre-revenue price ceiling, with a recorded conflict between pages). Flippa's required listing fields and handover rules were NOT READ; check them at listing time.

How to read the check boxes: every line marked **AVAILABLE AT LISTING ONLY IF COMPLETE** depends on work that is not finished today. The lead must tick the box only after confirming the claim is true on the day of listing, and must delete the line otherwise.

## Title

Plans Past Five — Turnkey Women's Lifestyle Brand With Interactive Hobby Tools, SEO Content, Shopping Section & Pinterest Assets

(Pre-revenue is disclosed in the first line of the description, below. No earnings figure appears anywhere in this listing.)

## Short description

Plans Past Five is a pre-revenue, newly built women's lifestyle and hobby publication prepared as a transparent turnkey starter site. It has no traffic history and no earnings. It includes a built website with interactive hobby tools, a 36-hobby directory, 27 published articles (23 source-checked by Cowork on the branch; the 4 original articles are not source-checked yet) plus 5 drafts, 37 verified Amazon products (listing-checked, not tested by us), 88 Pinterest pin images and a full brand asset set. Amazon Associates links are not activated, no application has been made, and affiliate and payment accounts are not included; the buyer sets up their own. No earnings are claimed or guaranteed.

## Long description

### Read this first: what this is and is not

- Plans Past Five is **pre-revenue**. It has earned nothing and has **no traffic history**.
- Amazon Associates links are **not yet activated** and nothing has been applied for. Approval is **not guaranteed** and is the buyer's to apply for.
- The seller's master or portfolio affiliate accounts are **not included**. The buyer must create or connect their own affiliate and payment accounts.
- There is **no guarantee of future earnings**. Any forecast a buyer makes is hypothetical.
- **Nothing is live.** The site is not deployed; there is no domain, host or analytics. "Published" means set to `status: "published"` on the branch after a Cowork source check (2026-11-18), not deployed. The 4 originally published articles still need that source check (Cowork task C4).
- Products are checked against their Amazon listings and linked with ordinary (non-affiliate) Amazon links. We have not bought or tested them.

### What the business is

A women's lifestyle and hobby publication. Brand copy in `src/config/site.ts`: tagline "Making a life, not just a living."; mission "Helping women fall in love with the life they live outside of work."; philosophy "Your career can be a big part of your life without being your whole life." The editorial angle is creative hobbies, weekend plans, solo dates, friendships and small adventures for the hours outside work, plus a shopping section of product types and a set of tools.

### Target audience

Women who want a hobby or a better weekend but are unsure where to start, with an emphasis on beginners, low budgets, low energy evenings, solo plans and plans with friends. The audience is a positioning choice, not a measured audience: there is no audience data.

### What has been developed (counts read from the repo, 2026-11-19)

| Item | Count | Status | Where |
|---|---|---|---|
| Published articles | 27 (`status: "published"`). 23 source-checked by Cowork on 2026-11-18 (`docs/content/verification/`, `verification-applied/`); the 4 originals (`article-35-hobbies.ts`, `article-after-work.ts`, `article-creative-home.ts`, `article-junk-journaling.ts`) are NOT source-checked yet (Cowork C4 to do) | COMPLETED on the branch; NOT deployed, nothing is live | `src/content/article-*.ts` |
| Article drafts | 5 files still `status: "draft"` (how-to-start-air-dry-clay, how-to-start-crocheting, how-to-start-embroidery, watercolor-painting-for-beginners, affordable-hobbies-under-25); source-checked and left NOT READY; 32 research briefs | IN PROGRESS | `src/content/article-*.ts`, `docs/content/briefs/` |
| Outline-only drafts in drafts.ts | 2 | IN PROGRESS | `src/content/drafts.ts` |
| Article roadmap target | 30 articles; 50-topic buyer roadmap | RECOMMENDED | `docs/TURNKEY-PLAN.md`, `docs/buyer/CONTENT-ROADMAP.md` |
| Hobbies in the directory | 36 (test-enforced), 10 filters, profile pages | COMPLETED | `src/data/hobbies.ts` |
| Site sections | 6 (After Hours, The Weekend Edit, Creative Corner, Table for One, Better Together, A Little Movement) | COMPLETED | `src/data/categories.ts` |
| Shop collections | 8 | COMPLETED | `src/data/products.ts` |
| Shop product types | 36 product-type records (names and search queries; no prices, ratings, brands or ASINs) | COMPLETED | `src/data/products.ts` |
| Verified specific products | 37 verified, 7 candidates that never display. Verified = Amazon listing opened and reviewed by Cowork; ordinary non-affiliate links; not tested by us; manufacturer pages mostly unchecked | IN PROGRESS (C3 continues toward about 60) | `src/data/catalog.generated.ts` |
| Starter kit shopping lists | 15 kit definitions as slots; render only when verified products fill them; 7 kits have at least one slot filled, 8 have none | COMPLETED as system, partly filled | `src/data/kits.ts` |
| Interactive tools | 4: Find Your Thing quiz, Make Some Plans planner, Hobby Budget tool, Tonight tool; plus My Plans saved items and site search | COMPLETED | `src/lib`, `src/routes` |
| Pinterest pins | 88 pin images, CSV with metadata, 90-day schedule; 72 point to published articles (published on the branch, not deployed) and 16 are marked hold-until-published | COMPLETED as assets; no account | `public/pins`, `docs/pinterest-pins.csv` |
| Brand assets | 12 logo files, 11 board covers, 4 social images (including a 1200x630 OG image), 4 article templates, 5 favicon files, fonts with licences | COMPLETED | `design/brand` |
| Documentation | 160 Markdown files under docs, including 25 buyer guides and a 20-step transfer checklist | COMPLETED (some depend on pending research) | `docs/` |
| Automated tests | 250 passing in 15 files; typecheck clean | VERIFIED 2026-11-19 | `src/test` |
| Trust pages | About, Contact, Privacy, Terms, Affiliate Disclosure, Editorial Policy, Methodology, Corrections, Start Here | COMPLETED; legal pages are starter text | `src/routes` |

- [ ] AVAILABLE AT LISTING ONLY IF COMPLETE: state a higher published-article count (today 27) only if drafts have been verified and flipped to published; do not say the 4 original articles are source-checked until C4 is done for them; never say "live" (check `grep -H 'status:' src/content/article-*.ts`).
- [ ] AVAILABLE AT LISTING ONLY IF COMPLETE: re-count verified products (`src/data/catalog.generated.ts`) on the day of listing. Today: 37 verified, 7 candidate; describe them as checked against Amazon listings, not tested by us.
- [ ] AVAILABLE AT LISTING ONLY IF COMPLETE: say the site is live only if a host and domain are connected and production QA (C9) is done. Today: no domain connection, host or live site is confirmed.
- [ ] AVAILABLE AT LISTING ONLY IF COMPLETE: say a domain is included only if the seller confirms they own it and it will transfer. Today: `planspastfive.com` is a placeholder in `site.ts`; ownership and purchase are UNCONFIRMED.

### What makes it distinctive

- Original interactive tools (a rule-based quiz, a deterministic planner, a budget tool, a tonight picker) rather than only articles.
- An honesty-first design: no invented experiences, experts, prices or ratings; drafts stay hidden until their claims are verified; an editorial policy, methodology and corrections page exist.
- A shopping system that works without any affiliate account: ordinary links by default, with Amazon Associates links activating only when a buyer sets up their own approved account.
- A complete brand system and a large Pinterest asset set ready for an owner to start from.
- Extensive buyer documentation, including a transfer checklist and an operating-cost page that keeps unknowns marked UNCONFIRMED.

### How the site operates

- Frontend-only TanStack Start site (React 19, TypeScript, Tailwind v4). No database, no user accounts, no AI APIs and no paid back-end services (`CLAUDE-HANDOFF.md`).
- Content lives in repo files (articles in `src/content`, data in `src/data`). Publishing an article means editing a file and setting its status; there is no CMS.
- Saved items use the visitor's own browser storage.
- The build output is server-rendered (see `docs/buyer/HOSTING-AND-DEPLOYMENT.md`), so the buyer needs a host that runs the server entry. Host choice and cost are UNCONFIRMED.
- CI, a site-health check and Dependabot are configured in `.github/`.

### Monetization methods (none active)

- **Amazon Associates links:** the system is built and unit-tested but **not activated**; no application has been made. Amazon Associates is the only program the site is built for. Setting a tracking tag is not enough; the Amazon entry in `src/config/affiliate.ts` must also be approved and active, using the buyer's own approved account (`docs/buyer/AFFILIATE-ACTIVATION.md`). Per Amazon's application help (read 2026-11-18), an account must drive at least three qualified sales within 180 days, and approval is not guaranteed. The Associates account cannot be transferred without Amazon's prior written approval, so the buyer applies in their own name.
- No sponsorship, advertising or newsletter revenue exists. A newsletter is deliberately not wired.
- **No earnings are claimed. No earnings are guaranteed.**

### Existing content

27 published articles (including 35 hobbies; 25 things to do after work; 21 creative hobbies at home; a junk journaling guide; the other 23 were source-checked by Cowork, the four named originals not yet), the 36-hobby directory, six section pages, and trust pages. Five further articles remain drafts after the source check, plus 2 outline-only entries; research briefs and verification notes are included. None of this is deployed.

### Interactive features

Hobby finder quiz (rule-based, six result themes), Make Some Plans planner (save, shuffle, print), Hobby Budget tool, Tonight tool, My Plans (browser storage), site search, article save and share, shopping checklist.

### Pinterest assets

88 pin images in several template styles, a metadata CSV with destinations, boards, keywords, alt text and a `verify_before_posting` column, and a 90-day schedule with a placeholder start date. No Pinterest account exists and nothing has been posted.

### Operating expenses

All operating costs are **UNCONFIRMED**. The repo contains no invoices or billing details. See OPERATING-COST-SUMMARY.md in this folder and `docs/buyer/OPERATING-COSTS.md`. No monthly figure is stated in this listing.

- [ ] AVAILABLE AT LISTING ONLY IF COMPLETE: state any cost figure only after the owner confirms it from an invoice or account page, with promotional and renewal prices kept separate.

### Technical infrastructure

Open-source dependencies managed with Bun; no paid dependencies found. Hosting, domain, mailbox, analytics, Search Console and Pinterest accounts are not set up. Security headers: a static `public/_headers` file exists and code-level work was in progress when this was written.

### Required maintenance

Weekly and monthly checklists exist (`docs/buyer/WEEKLY-MAINTENANCE.md`, about 30 minutes for the weekly routine per that doc, and `MONTHLY-MAINTENANCE.md`). The main ongoing work is writing and source-verifying articles and checking product and Amazon links. Content growth is manual.

### Included assets

Source code, content and data files, drafts and research briefs, brand files, pin images and CSV, tests, CI configuration, all docs. See ASSET-INVENTORY.md.

### Not included

Seller's affiliate master or portfolio accounts, any tracking IDs, payment accounts, mailbox, Lovable project and credits, any analytics or social account (none exist), password managers and credentials, and the domain unless confirmed owned and agreed. Newsletter lists do not exist.

### Growth opportunities (hypothetical, no outcome implied)

Revise and publish the 5 remaining drafts, source-check the 4 original articles; extend the verified product catalog; apply for the buyer's own Amazon Associates account; launch the Pinterest schedule; extend the roadmap beyond the 30-article target. Whether any of this earns money is unknown.

### Ownership transfer process

Marketplace escrow, sanitized repo transfer, domain transfer if included, host recreated in the buyer's account, buyer's own analytics and affiliate IDs, removal of seller access, then acceptance. Full 20-step list: `docs/buyer/TRANSFER-CHECKLIST.md`. Optional limited handover: HANDOVER-TERMS-SUGGESTION.md (a suggestion needing legal review).

### Reason for selling

We develop independent digital brands as part of a website development and acquisition portfolio. Plans Past Five has been developed as a turnkey starter business for a new owner to operate and grow.

### Disclosures (keep these in the final listing)

- Pre-revenue; no traffic history; no audience data.
- No guarantee of income, traffic, rankings or affiliate approval.
- AI was used in building the project (code assistance and AI-generated images); see `docs/IMAGE-LICENSES.md` and the Editorial Policy page (`src/routes/editorial-policy.tsx`).
- Privacy and Terms pages are starter text and need review by the buyer's own professional.
- Prices shown anywhere are suggestions only.
