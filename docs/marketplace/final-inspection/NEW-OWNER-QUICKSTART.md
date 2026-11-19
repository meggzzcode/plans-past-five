# New owner quick start (proposal)

Plain-language guide for the first week. It is based on a rehearsal in a clean environment (`BUYER-TAKEOVER-LOG.md`). Nothing here promises traffic or income: the site is built and ready, not live and not earning.

## What you get and what you do not
You get the website code, 34 or so articles and tools, product records, brand files and 88 pins. You do not get any account: no domain, hosting, email, affiliate, analytics or Pinterest login. You create those under your own name. You do not need the seller, Lovable or Canva to run, edit or host the site.

## Who can do what
- Comfortable with a terminal, or with a developer friend: everything below.
- Not technical: you can edit articles in a browser once Pages CMS is connected (`docs/buyer/CMS-SETUP.md`), but products, affiliate settings, analytics and the first deploy need a developer or a patient assistant for a few hours.

## Day 1: get it running (about 30 to 60 minutes)
1. Put the code in your own GitHub account (`docs/buyer/TRANSFER-CHECKLIST.md`).
2. Install Bun (bun.sh) and Node 22.
3. In the project folder: `bun install --frozen-lockfile`, then `bun run dev -- --host 127.0.0.1 --port 5173` and open http://127.0.0.1:5173/ .
4. Run `bunx vitest run` (about 20 seconds; everything should pass) and `bun run build`.

## Days 2 to 3: get online
1. Choose a host. The repo is already set up for Netlify (`netlify.toml`); create your own Netlify account and connect your GitHub copy. Plan for at most 8 releases a month on the free plan (re-read the numbers live).
2. A build only runs when the commit message contains `[deploy]`. To publish: `git commit --allow-empty -m "Release: what changed [deploy]"` and push.
3. Buy or transfer a domain, then set `url` and `domain` in `src/config/site.ts` and the `Sitemap:` line in `public/robots.txt`.
4. Create a mailbox and set `contactEmail`; choose the "Published by" details (`docs/buyer/PUBLISHER-SETUP.md`). Update the tests that expect these to be empty.

## Week 1: make it yours
- Read `docs/buyer/HANDS-ON-RECIPES.md`: exact commands for publishing an article, adding a product, images, backups.
- Have a lawyer review Privacy, Terms and the affiliate disclosure.
- Verify the site in Google Search Console and Pinterest by pasting the codes into `src/config/site.ts`.
- Apply for Amazon Associates under your own account once the site is live. Only then switch on affiliate links (one place: `src/config/affiliate.ts`). Approval is not guaranteed.
- Analytics: the site does not load Google Analytics yet; adding it is a small developer task, after you decide about consent.

## Every week and month
`docs/buyer/WEEKLY-MAINTENANCE.md` and `docs/buyer/MONTHLY-MAINTENANCE.md`: check links, re-verify product listings, publish on purpose.

## Backups
Run `git bundle create ../plans-past-five.bundle --all` before big changes and keep it with your other backups; GitHub is your main copy. Content-only copy: `content/`, `src/assets/`, `docs/commerce/product-research.csv`, `docs/pinterest-pins.csv`, `src/config/site.ts`.

## When you will need help
- Adding Google Analytics, or any change to code: a developer.
- Reading the image tool terms (Lovable, Canva AI) before relying on the images: you, ideally with a lawyer.
- Domain handover, if the sale includes a domain: the seller must provide proof (`docs/buyer/DOMAIN-AND-EMAIL.md`).
- Questions in the agreed support window: `docs/marketplace/final-inspection/POST-SALE-SUPPORT-PROPOSAL.md`.

## Proposal for the seller
Ship this page as the first page of the buyer package, and consider fixing before listing: (1) make the publish check enforce sources and `verifiedAt`; (2) add a Google Analytics loader behind the consent setting; (3) pin Node and Bun versions (`.nvmrc`, `packageManager`); (4) list Playwright and fonttools as optional tools; (5) have the image script add the ledger row.
