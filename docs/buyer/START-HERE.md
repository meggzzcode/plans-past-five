# Start here (buyer)

Plans Past Five is a frontend-only website for women who want hobbies, weekend plans and friendships outside work. It is **pre-revenue and not yet public** as of 2026-11-19: no confirmed live domain, no affiliate account, no analytics, no email list, no traffic history. You are buying a built starter site and a plan, not an earning business. Nothing in these docs promises traffic or income.

## Read in this order

1. `docs/buyer/BUSINESS-OVERVIEW.md`: what the business is and is not.
2. `docs/buyer/WEBSITE-ARCHITECTURE.md`: how the code is organized.
3. `docs/buyer/ACCOUNT-DEPENDENCIES.md` and `docs/buyer/TRANSFER-CHECKLIST.md`: what you get and how handover works.
4. `docs/buyer/HOSTING-AND-DEPLOYMENT.md` and `docs/buyer/DOMAIN-AND-EMAIL.md`: getting it online.
5. `docs/buyer/AFFILIATE-ACTIVATION.md` (long form) and `docs/buyer/AFFILIATE-SETUP.md` (checklist): how monetization would work with YOUR accounts.
6. `docs/buyer/CONTENT-MANAGEMENT.md`, `docs/buyer/PRODUCT-MANAGEMENT.md`, `docs/buyer/CONTENT-ROADMAP.md`: running content.
7. `docs/buyer/ANALYTICS-SETUP.md`, `docs/buyer/SEO-GUIDE.md`, `docs/buyer/MARKETING-ROADMAP.md`: getting found and measuring.
8. `docs/buyer/OPERATING-COSTS.md`, `docs/buyer/SECURITY-AND-BACKUPS.md`, `docs/buyer/WEEKLY-MAINTENANCE.md`, `docs/buyer/MONTHLY-MAINTENANCE.md`, `docs/buyer/TROUBLESHOOTING.md`.
9. `docs/buyer/BUYER-90-DAY-PLAN.md`: a suggested first 90 days.

Other docs in the repo: `CLAUDE-HANDOFF.md` (developer handoff), `AGENTS.md` (project rules), `docs/BRAND-GUIDE.md`, `docs/content/*` (editorial system), `docs/commerce/*` (product and kit research), `docs/marketing/*` (Pinterest and distribution), `docs/IMAGE-LICENSES.md`, `docs/SOP-*.md` (publish, corrections, link checks).

## Quick facts (checked 2026-11-19)

- Stack: TanStack Start (React 19, TypeScript, Tailwind v4), built with Vite. Package manager: Bun (`bun.lock`).
- No database, accounts, payments, AI or server secrets. Saved items live in each visitor's browser.
- Content is typed local data in `src/content` and `src/data`; brand copy lives in `src/config/site.ts`; Amazon and other retailer links are built only in `src/config/affiliate.ts`.
- The site ships **unmonetized**: plain search links, no tracking ids, a disclosure that says links currently earn nothing.
- Four articles are published; most of the 30 planned articles exist as drafts (`docs/content/ARTICLE-ROADMAP.md`). Drafts are never public.
- Tests: `bunx vitest run` (106 tests passing at the time of checking).

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

Costs, domain ownership, hosting, mailbox and any account are unconfirmed unless the repo shows them. Facts needing live research are labeled PENDING COWORK in the docs.
