# New owner quick start

Plain-language guide for the first week. It is drawn from `BUYER-TAKEOVER.md` (the clean-room rehearsal, the can-and-cannot table and the credentials list). The buyer-facing entry point is `docs/buyer/START-HERE.md`; this page is a shorter walk-through for the same steps. Nothing here promises traffic or income: the site is built, not live and not earning. Counts of articles, products and images are in `docs/buyer/INVENTORY.md`.

## What you get and what you do not
You get the website code, the articles and tools, product records, brand files and Pinterest pins (counts: `docs/buyer/INVENTORY.md`). You do not get any account: no domain login, hosting, email, affiliate, analytics or Pinterest login, and nothing from the seller's affiliate or portfolio accounts. You create those under your own name. You do not need the seller, Lovable or Canva to run, edit or host the site. What is and is not in the package: `docs/buyer/BUYER-PACKAGE-CONTENTS.md`.

## Who can do what
- Comfortable with a terminal, or with a developer friend: everything below.
- Not technical: you can edit articles in a browser once Pages CMS is connected and tested (`docs/buyer/CMS-SETUP.md`, not yet tested with a real login). Products, affiliate settings, analytics and the first deploy need a developer or a patient assistant for a few hours. The full table is in `BUYER-TAKEOVER.md` section 1.

## Day 1: get it running (about 30 to 60 minutes for a developer)
1. Put the code in your own GitHub account (`docs/buyer/TRANSFER-CHECKLIST.md`).
2. Install Bun (bun.sh) and Node 22. Neither version is pinned in the repo.
3. In the project folder: `bun install --frozen-lockfile`, then `bun run dev`. It binds to `127.0.0.1` and prints the address (8080 in the last check); open that.
4. Run `bunx vitest run` (under a minute) and `bun run build`.

## Days 2 to 3: get online
1. The repo is configured for Netlify (`netlify.toml`): it sets the Netlify build preset, publishes `dist` and uses a server-rendering function, so the host must run that function. No Netlify account exists yet; create your own and connect your GitHub copy. Netlify's free-plan credits and limits change: re-read them live (`docs/buyer/NETLIFY-CREDITS-AND-RELEASES.md`). Cloudflare or another host is an alternative that needs its own build setup and verification (`docs/buyer/HOSTING-AND-DEPLOYMENT.md`).
2. A build only runs when the commit message contains `[deploy]`, or when you press Trigger deploy (untested). To publish: `git commit --allow-empty -m "Release: what changed [deploy]"` and push.
3. Register or transfer a domain, then set `url` and `domain` in `src/config/site.ts` and the `Sitemap:` line in `public/robots.txt`.
4. Create a mailbox and set `contactEmail`; choose the "Published by" details (`docs/buyer/PUBLISHER-SETUP.md`). Update the tests that expect these to be empty.

## Week 1: make it yours
- Read `docs/buyer/HANDS-ON-RECIPES.md`: exact commands for publishing an article, adding a product, images and backups.
- Have a lawyer review Privacy, Terms and the affiliate disclosure.
- Verify the site in Google Search Console and Pinterest by pasting the codes into `src/config/site.ts`.
- Apply for Amazon Associates under your own account once the site is live. Only then switch on affiliate links (one place: `src/config/affiliate.ts`). Approval is not guaranteed.
- Analytics is wired but off: set `analytics.ga4MeasurementId` once you have your own GA4 ID and have decided about consent (`docs/buyer/ANALYTICS-SETUP.md`).

## Three things that can hurt you
1. **The product importer replaces the whole catalog.** Always start from the full `docs/commerce/product-research.csv` and run `--check` first (a guard refuses a big shrink; do not use `--force` casually).
2. **Publishing is gated, not fact-checked.** The build refuses a published article with no source, no `verifiedAt` date or open checks; you still have to check the facts.
3. **A saved CMS edit is not a live edit.** Nothing goes live until you publish on purpose.

## Every week and month
`docs/buyer/WEEKLY-MAINTENANCE.md` and `docs/buyer/MONTHLY-MAINTENANCE.md`: check links, re-verify product listings, publish on purpose.

## Backups
Run `git bundle create ../plans-past-five.bundle --all` before big changes and keep it with your other backups; GitHub is your main copy. Content-only copy: `content/`, `src/assets/`, `docs/commerce/product-research.csv`, `docs/pinterest-pins.csv`, `src/config/site.ts`.

## When you will need help
- Any change to code: a developer.
- Reading the image tool terms (Lovable, Canva AI) before relying on the images: you, ideally with a lawyer (`docs/buyer/IMAGE-AND-ASSET-RIGHTS.md`).
- Domain handover, if the sale includes a domain: the seller must provide registrar proof (`docs/buyer/DOMAIN-AND-EMAIL.md`).
- Questions in a support window: only if the owner offers one; the draft terms are a proposal that is not approved (`POST-SALE-SUPPORT-PROPOSAL.md`).

## Known gaps the seller may fix before listing (owner decision)
Pin Node and Bun versions (`.nvmrc`, `packageManager`); list Playwright and fonttools as optional tools; have the image script add the ledger row; run a real Netlify deploy and the CMS login test.
