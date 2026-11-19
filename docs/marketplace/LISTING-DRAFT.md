# Marketplace listing draft: Plans Past Five

Status: DRAFT for owner review. Nothing has been published, listed or offered. Facts below were read from the repo on 2026-11-19 and will drift; re-check with LISTING-CHECKLIST.md before use.

Marketplace-specific wording rules, fee rules and revenue-claim rules for pre-revenue sites are PENDING COWORK (task C7, output expected at docs/marketplace/FLIPPA-RESEARCH.md). Nothing here guesses them. Adjust this draft to the marketplace's rules once C7 is done.

How to read the check boxes: every line marked **AVAILABLE AT LISTING ONLY IF COMPLETE** depends on work that is not finished today. The lead must tick the box only after confirming the claim is true on the day of listing, and must delete the line otherwise.

## Title

Plans Past Five — Turnkey Women's Lifestyle Brand With Interactive Hobby Tools, SEO Content, Affiliate-Ready Shopping & Digital Products

(Pre-revenue is disclosed in the first line of the description, below. No earnings figure appears anywhere in this listing.)

## Short description

Plans Past Five is a pre-revenue, newly built women's lifestyle and hobby publication prepared as a transparent turnkey starter site. It has no traffic history and no earnings. It includes a built website with interactive hobby tools, a 36-hobby directory, 4 published articles plus drafts awaiting source verification, free printables, two prepared premium digital kits, 95 Pinterest pin images and a full brand asset set. Affiliate links are not activated and affiliate and payment accounts are not included; the buyer sets up their own. No earnings are claimed or guaranteed.

## Long description

### Read this first: what this is and is not

- Plans Past Five is **pre-revenue**. It has earned nothing and has **no traffic history**.
- Affiliate links are **not yet activated**. Affiliate approval is **not guaranteed** and is the buyer's to apply for.
- The seller's master or portfolio affiliate accounts are **not included**. The buyer must create or connect their own affiliate and payment accounts.
- There is **no guarantee of future earnings**. Any forecast a buyer makes is hypothetical.
- The premium digital kits are **prepared but not for sale**: no storefront, checkout or payment provider exists.

### What the business is

A women's lifestyle and hobby publication. Brand copy in `src/config/site.ts`: tagline "Making a life, not just a living."; mission "Helping women fall in love with the life they live outside of work."; philosophy "Your career can be a big part of your life without being your whole life." The editorial angle is creative hobbies, weekend plans, solo dates, friendships and small adventures for the hours outside work, plus a shopping section of product types and a set of tools and downloads.

### Target audience

Women who want a hobby or a better weekend but are unsure where to start, with an emphasis on beginners, low budgets, low energy evenings, solo plans and plans with friends. The audience is a positioning choice, not a measured audience: there is no audience data.

### What has been developed (counts read from the repo, 2026-11-19)

| Item | Count | Status | Where |
|---|---|---|---|
| Published articles | 4 | COMPLETED | `src/content/article-35-hobbies.ts`, `article-after-work.ts`, `article-creative-home.ts`, `article-junk-journaling.ts` |
| Article drafts awaiting source verification | 28 files written as drafts (`status: "draft"`), each with a `coworkChecks` list; 28 research briefs | IN PROGRESS, NEEDS Cowork verification | `src/content/article-*.ts`, `docs/content/briefs/` |
| Outline-only drafts in drafts.ts | 2 | IN PROGRESS | `src/content/drafts.ts` |
| Article roadmap target | 30 articles; 50-topic buyer roadmap | RECOMMENDED | `docs/TURNKEY-PLAN.md`, `docs/buyer/CONTENT-ROADMAP.md` |
| Hobbies in the directory | 36 (test-enforced), 10 filters, profile pages | COMPLETED | `src/data/hobbies.ts` |
| Site sections | 6 (After Hours, The Weekend Edit, Creative Corner, Table for One, Better Together, A Little Movement) | COMPLETED | `src/data/categories.ts` |
| Shop collections | 6 | COMPLETED | `src/data/products.ts` |
| Shop product types | 36 product-type records (names and search queries; no prices, ratings, brands or ASINs) | COMPLETED | `src/data/products.ts` |
| Verified specific products | 0 (catalog empty; import path built) | BLOCKED on Cowork C3 | `src/data/catalog.ts` |
| Starter kit shopping lists | 15 kit definitions as slots; render only when verified products fill them | COMPLETED as system, empty of products | `src/data/kits.ts` |
| Interactive tools | 4: Find Your Thing quiz, Make Some Plans planner, Hobby Budget tool, Tonight tool; plus My Plans saved items and site search | COMPLETED | `src/lib`, `src/routes` |
| Free printables | 6 PDFs with previews | COMPLETED | `public/downloads`, `src/data/printables.ts` |
| Premium kits | 2 (Hobby Era Kit, 75 pages in 9 PDFs; Weekend Edit and Girls Night Kit, 55 pages in 9 PDFs) | PREPARED, NOT FOR SALE; terms need owner review | `design/kits`, `src/data/digital-products.ts` |
| Pinterest pins | 95 pin images, CSV with metadata, 90-day schedule; 30 point to published articles or live pages, 65 are marked hold-until-published | COMPLETED as assets; no account | `public/pins`, `docs/pinterest-pins.csv` |
| Brand assets | 12 logo files, 12 board covers, 4 social images (including a 1200x630 OG image), 4 article templates, 5 favicon files, fonts with licences | COMPLETED | `design/brand` |
| Documentation | 77 Markdown files under docs, including 26 buyer guides and a 20-step transfer checklist | COMPLETED (some depend on pending research) | `docs/` |
| Automated tests | 206 passing in 11 files; typecheck clean | VERIFIED 2026-11-19 | `src/test` |
| Trust pages | About, Contact, Privacy, Terms, Affiliate Disclosure, Editorial Policy, Methodology, Corrections, Start Here | COMPLETED; legal pages are starter text | `src/routes` |

- [ ] AVAILABLE AT LISTING ONLY IF COMPLETE: state a higher published-article count only if drafts have been verified and flipped to published (check `grep -H 'status:' src/content/article-*.ts`).
- [ ] AVAILABLE AT LISTING ONLY IF COMPLETE: state any number of verified products only after Cowork C3 has loaded them into the catalog. Today: 0.
- [ ] AVAILABLE AT LISTING ONLY IF COMPLETE: say the site is live only if a host and domain are connected and production QA (C9) is done. Today: no domain connection, host or live site is confirmed.
- [ ] AVAILABLE AT LISTING ONLY IF COMPLETE: say a domain is included only if the seller confirms they own it and it will transfer. Today: `planspastfive.com` is a placeholder in `site.ts`; ownership and purchase are UNCONFIRMED.

### What makes it distinctive

- Original interactive tools (a rule-based quiz, a deterministic planner, a budget tool, a tonight picker) rather than only articles.
- An honesty-first design: no invented experiences, experts, prices or ratings; drafts stay hidden until their claims are verified; an editorial policy, methodology and corrections page exist.
- A shopping system that works without any affiliate account: ordinary links by default, with affiliate links activating only when a buyer sets up approved accounts.
- Original printables and premium kits with embedded open-licence fonts and no third-party artwork (`docs/IMAGE-LICENSES.md`).
- A complete brand system and a large Pinterest asset set ready for an owner to start from.
- Extensive buyer documentation, including a transfer checklist and an operating-cost page that keeps unknowns marked UNCONFIRMED.

### How the site operates

- Frontend-only TanStack Start site (React 19, TypeScript, Tailwind v4). No database, no user accounts, no AI APIs and no paid back-end services (`CLAUDE-HANDOFF.md`).
- Content lives in repo files (articles in `src/content`, data in `src/data`). Publishing an article means editing a file and setting its status; there is no CMS.
- Saved items use the visitor's own browser storage.
- The build output is server-rendered (see `docs/buyer/HOSTING-AND-DEPLOYMENT.md`), so the buyer needs a host that runs the server entry. Host choice and cost are UNCONFIRMED.
- CI, a site-health check and Dependabot are configured in `.github/`.

### Monetization methods (none active)

- **Affiliate links:** the system is built and unit-tested but **not activated**. Setting a tracking tag is not enough; the Amazon entry in `src/config/affiliate.ts` must also be approved and active, using the buyer's own approved account (`docs/buyer/AFFILIATE-ACTIVATION.md`). Approval is not guaranteed.
- **Premium digital kits:** prepared, **not for sale**. A buyer would need to choose a storefront, review the draft usage terms and confirm fees. Suggested prices in the repo are marked as recommendations, not live prices.
- No sponsorship, advertising or newsletter revenue exists. A newsletter is deliberately not wired.
- **No earnings are claimed. No earnings are guaranteed.**

### Existing content

Four published articles (35 hobbies; 25 things to do after work; 21 creative hobbies at home; junk journaling guide), the 36-hobby directory, six section pages, trust pages and six printables. Twenty-eight further articles are written as drafts with research briefs and a list of claims to verify before publishing.

### Interactive features

Hobby finder quiz (rule-based, six result themes), Make Some Plans planner (save, shuffle, print), Hobby Budget tool, Tonight tool, My Plans (browser storage), site search, article save and share, shopping checklist.

### Digital products

Six free printable PDFs (`public/downloads`) and two premium kits prepared in `design/kits` (zips included) with draft usage terms that need owner review. Kits are not for sale today.

### Pinterest assets

95 pin images in several template styles, a metadata CSV with destinations, boards, keywords, alt text and a `verify_before_posting` column, and a 90-day schedule with a placeholder start date. No Pinterest account exists and nothing has been posted.

### Operating expenses

All operating costs are **UNCONFIRMED**. The repo contains no invoices or billing details. See OPERATING-COST-SUMMARY.md in this folder and `docs/buyer/OPERATING-COSTS.md`. No monthly figure is stated in this listing.

- [ ] AVAILABLE AT LISTING ONLY IF COMPLETE: state any cost figure only after the owner confirms it from an invoice or account page, with promotional and renewal prices kept separate.

### Technical infrastructure

Open-source dependencies managed with Bun; no paid dependencies found. Hosting, domain, mailbox, analytics, Search Console and Pinterest accounts are not set up. Security headers: a static `public/_headers` file exists and code-level work was in progress when this was written.

### Required maintenance

Weekly and monthly checklists exist (`docs/buyer/WEEKLY-MAINTENANCE.md`, about 30 minutes for the weekly routine per that doc, and `MONTHLY-MAINTENANCE.md`). The main ongoing work is writing and source-verifying articles and checking product and affiliate links. Content growth is manual.

### Included assets

Source code, content and data files, drafts and research briefs, brand files, printable sources and PDFs, premium kit sources and zips, pin images and CSV, tests, CI configuration, all docs. See ASSET-INVENTORY.md.

### Not included

Seller's affiliate master or portfolio accounts, any tracking IDs, payment accounts, mailbox, Lovable project and credits, any analytics or social account (none exist), password managers and credentials, and the domain unless confirmed owned and agreed. Newsletter lists do not exist.

### Growth opportunities (hypothetical, no outcome implied)

Verify and publish the 28 drafts; load verified products; apply for the buyer's own affiliate programs; launch the Pinterest schedule; sell the premium kits through a storefront the buyer chooses; extend the roadmap beyond the 30-article target. Whether any of this earns money is unknown.

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
