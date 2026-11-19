# Operating costs

**Nothing here is a confirmed cost.** The repo does not contain invoices, plan names, prices or billing details, and none were read from any account. Every line is UNCONFIRMED unless it says otherwise. No cost is recommended; this is a list of what a buyer may need to price out. All numbers are intentionally absent. This page is a pattern (confirmed vs estimated, promotional vs renewal), not a quote.

Site status: pre-revenue, not yet public (2026-11-19).

## How to read the columns

- **Status**: CONFIRMED (shown by the repo or a document you hold), UNCONFIRMED (unknown), NOT NEEDED (the repo does not require it).
- **Pricing type**: a promotional first-term price is not a renewal price. Always find the renewal price before you count on a number. PENDING COWORK: read each provider's current pricing page and record promotional versus renewal separately, with date.

| Item | Needed? | Status | Pricing type to check | Notes |
|---|---|---|---|---|
| Domain name | Yes, to go public | UNCONFIRMED (the repo shows `planspastfive.com` as a placeholder; ownership not confirmed) | Registration promo vs renewal; privacy add-ons | `docs/buyer/DOMAIN-AND-EMAIL.md` |
| Hosting | Yes | UNCONFIRMED (host not chosen) | Free tier limits vs paid plan; bandwidth and request limits | Build is a server-rendered Worker-style output (`docs/buyer/HOSTING-AND-DEPLOYMENT.md`) |
| Email mailbox (hello@) | Recommended | UNCONFIRMED | Per-mailbox vs per-user pricing; promo vs renewal | One mailbox with aliases planned |
| GitHub (repo) | Yes | UNCONFIRMED | Free vs paid plan | Your own account; two-factor on |
| Lovable (if you keep using it) | Optional | UNCONFIRMED | Subscription and credits | `AGENTS.md`; the Lovable project belongs to the seller's account |
| Analytics (Google Analytics, Search Console, Bing) | Optional | UNCONFIRMED | Usually free; verify | `docs/buyer/ANALYTICS-SETUP.md` |
| Newsletter provider | Optional, not wired | UNCONFIRMED | Free tier limits vs paid | Disabled in `site.ts` |
| Pinterest business account | Optional | UNCONFIRMED | Usually free; verify | `docs/marketing/PINTEREST-STRATEGY.md` |
| Affiliate programs | Optional | UNCONFIRMED | Typically free to join; verify | Own accounts; approval not guaranteed |
| Image generation or stock images | Optional | UNCONFIRMED | Per-subscription or per-image | Existing images were AI-generated for this project; see `docs/IMAGE-LICENSES.md` |
| Design tools (Canva etc.) | Optional | UNCONFIRMED | Free vs paid | Pin sources are generated from `design/pins` and do not require an account |
| Legal review of Privacy/Terms | Recommended | UNCONFIRMED | One-off professional fee | Pages are starter text |
| Business entity, tax and accounting | Depends on your situation | UNCONFIRMED | Varies by jurisdiction | Not covered by these docs; no tax or financial advice given |
| Payment processor or storefront for digital products | Only if you sell digital products | UNCONFIRMED | Percentage and fixed fees | `docs/buyer/DIGITAL-PRODUCTS.md` when present |
| Dependencies | Yes (free) | CONFIRMED that the repo uses open-source packages managed by Bun; paid dependencies not found | n/a | Dependabot is configured (`.github/dependabot.yml`) |
| Database, authentication, AI APIs, payment backend | No | NOT NEEDED (frontend-only by design, `AGENTS.md`) | n/a | |

## Your time

Content verification, product research and maintenance take hours each week (`docs/buyer/WEEKLY-MAINTENANCE.md`, about 30 minutes for the routine checklist alone, per that doc). Writing and verifying articles is the main time cost.

## What this page will not do

- Recommend buying anything.
- State prices, promotions or break-even points.
- Predict revenue.

Fill in your real numbers in your own records after you choose providers. Never put billing details or card numbers in the repo.
