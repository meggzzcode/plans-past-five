# Business overview

## What it is

Plans Past Five is a lifestyle content site. Brand copy lives in `src/config/site.ts`: tagline "Making a life, not just a living."; mission "Helping women fall in love with the life they live outside of work."; philosophy "Your career can be a big part of your life without being your whole life." Voice and visuals: `docs/BRAND-GUIDE.md`, `docs/content/BRAND-VOICE.md`.

## Status (2026-11-19)

- Pre-revenue. Not yet public (domain `planspastfive.com` is configured as the placeholder `site.url`; whether it is registered, owned or connected is NOT confirmed by the repo).
- No affiliate account is active; the site is unmonetized by default (`src/config/affiliate.ts`).
- No analytics, newsletter, social accounts or traffic history exist.
- No earnings, traffic, ranking or audience figures exist, and none should be quoted to anyone as fact.

## What is built

| Area | What exists | Where |
|---|---|---|
| Brand and design system | Wordmark, palette, type, decorative kit | `docs/BRAND-GUIDE.md`, `src/components/brand` |
| Section pages | After Hours, The Weekend Edit, Creative Corner, Table for One, Better Together, A Little Movement | `src/routes/*.tsx`, `src/data/categories.ts` |
| Journal (articles) | 27 `status: "published"` articles (23 source-checked on 2026-11-18; the 4 originals not yet; not deployed), 7 drafts, 2 outline-only entries | `src/content`, `docs/content/ARTICLE-ROADMAP.md` |
| Hobby directory | 43 hobbies with filters and profile pages | `src/data/hobbies.ts` |
| Shop (Off Duty Essentials) | 8 collections, 36 product-type records, 37 verified Amazon products (listing-checked, not tested by us; 8 collection kits; a kit shows as a kit only with 4 or more verified picks, else one start-here card), kit slots, shopping checklist | `src/data/products.ts`, `src/data/kits.ts`, `src/lib/shoplist.ts` |
| Tools | Hobby finder quiz, Make Some Plans planner, hobby budget tool, tonight tool | `src/lib/finder.ts`, `planner.ts`, `budget.ts`, `tonight.ts` |
| Pinterest assets | Pin images and a pins CSV | `public/pins`, `docs/pinterest-pins.csv` |
| Trust pages | About, Contact, Privacy, Terms, Affiliate Disclosure, Editorial Policy, Corrections, Methodology | `src/routes` |
| Automation | CI, weekly site-health check, monthly digest, Dependabot | `.github/` |

Counts (articles, hobbies, products, tests) were checked on 2026-11-19 and will drift; re-check with the repo.

## How it could make money (unvalidated)

1. Affiliate links on buying guides and kit lists once you have your own approved accounts (`docs/buyer/AFFILIATE-ACTIVATION.md`).
2. Possibly display advertising or sponsorships much later. Not planned or researched.

All three are hypotheses. None has produced revenue. Affiliate programs require approval and have rules about how links and disclosures are used; approval is not guaranteed.

## What the site is not

- Not an established-earnings business. No financial statements, traffic proof or revenue are included.
- Not a store. It sells nothing today; kits are editorially curated lists, not bundles. Digital products (printables, kits for sale) are not part of this business.
- Not accounts-and-database software. There are no users, no stored personal data.
- Not medical or mental-health advice. Copy avoids those claims by policy.

## Main risks (honest list)

- Content-site growth is slow and uncertain; search and Pinterest traffic cannot be promised.
- Affiliate approval and terms are controlled by the programs; commissions and rules change.
- Published articles were source-checked (2026-11-18) except the 4 originals, which still need that check (a pending follow-up task). The 5 remaining drafts did not pass and need revision.
- Search engines may treat AI-assisted drafts skeptically if they are thin; the editorial system (`docs/content/`) exists to keep quality up.
- Dependency on Lovable and the Nitro Cloudflare Worker build; see `docs/buyer/HOSTING-AND-DEPLOYMENT.md`.

## Where the money would go (unconfirmed)

See `docs/buyer/OPERATING-COSTS.md`. Every line there is UNCONFIRMED unless the repo shows it.
