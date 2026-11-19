# Transfer checklist (20 steps)

This is a suggested sequence for a secure handover. It is operational guidance, not legal or tax advice; get professional advice for the contract and escrow. Nothing here states a price, payment amount or tax detail. The site is pre-revenue; do not describe it as an earning business in the listing or contract.

Roles: **Seller** and **Buyer**. Mark each step with the date and who confirmed it.

1. **Agree the inventory and terms.** Written list of exactly what transfers (use the included and excluded lists below and `docs/buyer/ACCOUNT-DEPENDENCIES.md`), including what is not included and any limited post-sale help.
2. **Use marketplace escrow (or an equivalent neutral escrow).** Do not hand over assets before payment is secured in escrow.
3. **Confirm payment is secured** (held in escrow) before any asset moves. Do not put payment details in the repo or in docs.
4. **Prepare a sanitized repo and asset package.** Seller runs the secrets check from `docs/buyer/SECURITY-AND-BACKUPS.md`, confirms no `.env`, tokens, analytics IDs, affiliate IDs or personal data, removes seller-specific identifiers, and builds a clean archive of `design/`, `public/`, `src/`, `docs/`. Remember generated build output can carry seller labels (the worker name in `.output/server/wrangler.json` is derived from the project; do not ship `.output`).
5. **Transfer the domain** (if included and confirmed owned): registrar-to-registrar or account push per the registrar's current rules (re-read live). Buyer enables two-factor immediately.
6. **Transfer the repository** to the buyer's GitHub account (or the buyer imports the sanitized archive). Decide whether to keep full git history; if history is kept, scan it for secrets first. Do not rewrite published history while still connected to Lovable.
7. **Transfer or recreate hosting** under the buyer's account; set the build command (`bun run build`) and domain.
8. **Replace analytics IDs.** Buyer sets own `analytics.ga4MeasurementId` (the one analytics setting), `integrations.searchConsoleVerification` / `pinterestVerification`, and Bing properties; removes any seller IDs (none are expected in the repo; verify with a search).
9. **Replace affiliate IDs and credentials.** Buyer applies for own programs and edits `src/config/affiliate.ts` (`docs/buyer/AFFILIATE-SETUP.md`). Seller's ids are never reused. Credentials are shared only through a secure password manager channel, then rotated.
10. **Set up the mailbox.** Buyer creates `hello@` on the buyer's domain and sets `site.contactEmail` (`docs/buyer/DOMAIN-AND-EMAIL.md`). Seller's mailbox is not included.
11. **Transfer assets**: images, pin files (`public/pins`), pin sources (`design/`), `docs/pinterest-pins.csv`, brand files, license records (`docs/IMAGE-LICENSES.md`).
12. **Verify production.** Buyer builds from their repo, checks `/`, an article, `/shop`, `/sitemap.xml`, robots, headers, the contact page, and runs `bunx vitest run`, `bunx tsc --noEmit`, `bunx vite build` and the site-health workflow.
13. **Buyer acceptance.** Buyer confirms in writing that the inventory matches and production works.
14. **Payment release** from escrow per the agreed terms.
15. **Remove seller access** everywhere: GitHub collaborator or owner, host, registrar, DNS, analytics, Search Console, Pinterest, Lovable, email, design tools. Buyer rotates all shared credentials.
16. **Settle commissions.** If any affiliate or other earnings existed under the seller's accounts, handle them under the agreed terms. (None are confirmed for this site; the repo ships unmonetized.)
17. **Remove the site from the seller's affiliate portfolio** and unlink it from any seller dashboards, so the seller's accounts no longer reference the site.
18. **Verify no remaining dependencies.** Both parties walk `docs/buyer/ACCOUNT-DEPENDENCIES.md` line by line; search the repo and live site for seller IDs, emails, tags and webhooks.
19. **Record the sale**: the signed terms, the inventory, dates and confirmations, stored by both parties (outside the repo).
20. **Close out**: archive the seller's local copies and credentials per the agreement; set a calendar date for the end of any post-sale handover term.

## Included by default (the repo, once sanitized)

Source code, content data, drafts, docs, brand assets generated for the project, pin images and CSV, tests, CI configuration.

## Excluded by default (must be explicitly agreed to move)

Domain (only if confirmed owned), hosting accounts, mailbox and its mail, Lovable project and credits, any analytics or Search Console property, Pinterest or social accounts, affiliate accounts and ids (never transferable), seller's password manager and credentials, seller's other sites, tools and subscriptions, tax and financial records, any third-party license that does not allow transfer (re-read live to confirm image tool terms).

## Suggested limited post-sale handover term (optional; agree in writing)

- A fixed, short window (for example, a few weeks; length is for the parties to decide) for questions about the repo, docs and process, by written message only.
- Seller answers factual questions about the build; does not guarantee traffic, income or rankings; does not operate the site for the buyer.
- No access to buyer accounts; no ongoing obligations after the end date.
- Both parties keep copies of messages.
