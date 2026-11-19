# Start here (buyer)

Plans Past Five is a frontend-only website for women who want hobbies, weekend plans and friendships outside work. It is **pre-revenue and not yet public** as of 2026-11-19: no confirmed live domain, no affiliate account, no analytics, no email list, no traffic history. You are buying a built starter site and a plan, not an earning business. Nothing in these docs promises traffic or income.

## Read in this order

0. `docs/buyer/FRESH-CLONE-LOG.md`: proof the repo installs, tests, type-checks, lints and builds from a clean export.
1. `docs/buyer/BUSINESS-OVERVIEW.md`: what the business is and is not.
2. `docs/buyer/WEBSITE-ARCHITECTURE.md`: how the code is organized.
3. `docs/buyer/ACCOUNT-DEPENDENCIES.md` and `docs/buyer/TRANSFER-CHECKLIST.md`: what you get and how handover works.
4. `docs/buyer/HOSTING-AND-DEPLOYMENT.md`, `docs/buyer/NETLIFY-CREDITS-AND-RELEASES.md` (300 credits a month; at most 8 deploys) and `docs/buyer/DOMAIN-AND-EMAIL.md`: getting it online.
5. `docs/buyer/AMAZON-ASSOCIATES-PATH.md` (the path and the dated rules), `docs/buyer/AFFILIATE-ACTIVATION.md` (long form) and `docs/buyer/AFFILIATE-SETUP.md` (checklist): how monetization would work with YOUR accounts.
6. `docs/buyer/CONTENT-MANAGEMENT.md`, `docs/buyer/PRODUCT-MANAGEMENT.md`, `docs/buyer/CONTENT-ROADMAP.md`: running content.
7. `docs/buyer/ANALYTICS-SETUP.md`, `docs/buyer/SEO-GUIDE.md`, `docs/buyer/MARKETING-ROADMAP.md`: getting found and measuring.
8. `docs/buyer/OPERATING-COSTS.md`, `docs/buyer/SECURITY-AND-BACKUPS.md`, `docs/buyer/WEEKLY-MAINTENANCE.md`, `docs/buyer/MONTHLY-MAINTENANCE.md`, `docs/buyer/TROUBLESHOOTING.md`.
9. `docs/buyer/BUYER-90-DAY-PLAN.md`: a suggested first 90 days.
10. `docs/buyer/HANDS-ON-RECIPES.md`: tested step-by-step commands (local run, publish an article, add a product, affiliate switch, images, backups) and the gotchas found in a clean-room takeover.

Other docs in the repo: `CLAUDE-HANDOFF.md` (developer handoff), `AGENTS.md` (project rules), `docs/BRAND-GUIDE.md`, `docs/content/*` (editorial system), `docs/commerce/*` (product and kit research), `docs/marketing/*` (Pinterest and distribution), `docs/IMAGE-LICENSES.md`, `docs/content/IMAGE-LICENCE-LEDGER.md`, `docs/SOP-*.md` (publish, corrections, link checks).

## Quick facts (counted 2026-11-19 from the repo; re-run the commands if the date is old)

- Stack: TanStack Start (React 19, TypeScript, Tailwind v4), built with Vite. Package manager: Bun (`bun.lock`).
- No database, accounts, payments, AI or server secrets. Saved items live in each visitor's browser.
- Content is typed local data in `src/content`, `content/articles` and `src/data`; brand copy lives in `src/config/site.ts`; Amazon and other retailer links are built only in `src/config/affiliate.ts`.
- The site ships **unmonetized**: ordinary Amazon links, no tracking ids, and a disclosure that says links currently earn nothing. How that changes: `docs/buyer/AMAZON-ASSOCIATES-PATH.md`.
- Articles: **27 published, 7 drafts** (`node scripts/build-content.mjs` prints the count). 23 were source-checked on 2026-11-18 and show a "facts last checked" date; the 4 originals have source-check notes in `docs/content/verification/` but no date shown on their pages yet. Published means set to published in the repo, not deployed: nothing is live. Drafts are never public.
- Hobbies: **43** (`src/data/hobbies.ts`). Shop collections: **8**.
- Product records: **64** in `src/data/catalog.generated.ts` (re-counted with the importer `--check`): 37 verified (29 shown, 8 on editorial hold) and 27 candidates (never shown). Kits: **8** collection kits; a kit renders as a kit only with 4 or more named verified picks, otherwise as one "Where to start" card.
- Pinterest pins: **88** images in `public/pins` (`docs/pinterest-pins.csv`).
- Images: **18** in `src/assets` (14 original plus 4 from Canva), each with a row in `docs/content/IMAGE-LICENCE-LEDGER.md`.
- Tests: `bunx vitest run`: 641 tests in 44 files passing on 2026-11-19 (see `docs/buyer/FRESH-CLONE-LOG.md` for the clean-export run).
- Buyer guides in `docs/buyer`: 33 files, this one included.

## First commands

```
bun install --frozen-lockfile
bun run dev           # local site
bunx vitest run       # tests
bunx tsc --noEmit     # typecheck
bun run build         # production build into .output
```

## What you must do yourself

- Choose hosting and a domain, and set `site.url` in `src/config/site.ts`.
- Set up your own mailbox, analytics, Search Console, Pinterest and affiliate accounts. Nothing is transferable from the seller; see `docs/buyer/ACCOUNT-DEPENDENCIES.md`.
- Review the Privacy and Terms pages with a lawyer (they are starter text, not legal advice).
- Verify every factual claim you publish; follow `docs/SOP-publish-article.md`.

## What is unconfirmed

Costs, domain ownership, hosting, mailbox and any account are unconfirmed unless the repo shows them. Facts that change (prices, plan limits, program rules) say "re-read live" in the docs: check the official page before relying on them. Open tasks for an assistant working in your browser are listed in `docs/cowork`.

## What we do not claim

No traffic, no revenue, no approved affiliate account, no indexing before Search Console shows it, no exclusive or copyrighted images, no trademark clearance, no legal review, no no-code editing of hobbies, products or config (articles only, once the editor is connected and tested), and not live until deployed and checked. The full list is in `docs/marketplace/LISTING-DRAFT.md`.

## Honest dates

The site launched in November 2026. `/changelog` ("What changed") lists only real changes on the day they happened; do not backdate entries or article dates.
