# Affiliate activation guide (buyer)

Plans Past Five ships **unmonetized**: plain Amazon search links, no tracking ids, `rel="noopener"` only, and a disclosure that says the site does not currently earn from links. You activate income with your own accounts.

## Why no accounts are included

Affiliate accounts belong to the person who applied. Amazon's Operating Agreement says it may not be assigned "without our express prior written approval" (https://affiliate-program.amazon.com/help/operating/agreement, read 2026-11-18), so treat the seller's account as non-transferable and apply in your own name. Plans Past Five uses Amazon Associates only (owner decision 2026-11-19). The facts recorded about Amazon, with sources, are in `src/data/affiliate-programs.ts` and `docs/commerce/affiliate-research.md`. The seller's master/portfolio accounts, ids and links are therefore deliberately not included, and nothing in this repo shares anything with another site.

The step-by-step path, dates and the replacement of the "we don't currently earn" lines are in `docs/buyer/AMAZON-ASSOCIATES-PATH.md`.

## Where everything lives

| What                                         | File                                                                                |
| -------------------------------------------- | ----------------------------------------------------------------------------------- |
| Registry, link builder, disclosure sentences | `src/config/affiliate.ts`                                                           |
| Amazon Associates research register | `src/data/affiliate-programs.ts`                                                    |
| Product records                              | `src/data/products.ts`                                                              |
| Disclosure page / note                       | `src/routes/affiliate-disclosure.tsx`, `src/components/editorial/AffiliateNote.tsx` |

## Verified Amazon Associates facts (Cowork, read 2026-11-18; Amazon changes these, re-read before you rely on them)

| Topic | What Amazon's pages say | Source |
|---|---|---|
| Qualifying sales | The account must drive at least **three qualified sales within 180 days** of application (personal orders excluded). Until then the application is not fully accepted. | https://affiliate-program.amazon.com/help/node/topic/G8TW5AE9XL2VX9VM |
| Site requirements | Robust original content (guideline: at least 10 posts), publicly available. | same page |
| Attribution | 24-hour session; items added to cart count if ordered within 89 days of the click. | Program Policies (updated April 14, 2026), https://affiliate-program.amazon.com/help/operating/policies |
| Commission rates | Rate card is in your signed-in account; NOT READ. Amazon also restricts public communication about the Agreement, so do not publish rates or earnings. | Operating Agreement s.5 |
| Payment and tax | A tax interview and a payment method are required in Associates Central (details not read). | G8TW5AE9XL2VX9VM |
| Disclosure sentence | "As an Amazon Associate I earn from qualifying purchases." shown clearly and prominently. | Operating Agreement s.5 (`AMAZON_ASSOCIATE_STATEMENT`) |
| Links | Tag every link with your Associates ID; no redirecting links; do not encourage bookmarking Special Links; show prices only if Amazon serves them or via API. | Program Policies |
| Several websites | NOT FOUND in the text read. Check Account Settings, Manage Your Tracking IDs, or ask Amazon. Plan on a separate tracking ID for this site. | n/a |
| Transfer | Agreement not assignable without Amazon's prior written approval. | Operating Agreement |
| Termination | Either side may end the Agreement on 7 calendar days' written notice. | Operating Agreement s.6 (read 2026-11-18) |

Timing: the three-sale window means the site needs real visitors first. Nothing has been applied for by the seller, and approval is not guaranteed.

## Activate Amazon (own approval required)

Do these in order. Nothing else in the code needs to change.

1. **Get your own approval.** Apply to Amazon Associates in your own name, listing your site URL. Complete the tax interview and payment method. You have 180 days to drive three qualified sales (your own orders do not count). Read the current Operating Agreement. Create a tracking id for this website in Associates Central (Manage Your Tracking IDs).
2. **Replace the id and flip the one entry.** In `src/config/affiliate.ts` there is exactly one entry, `affiliateRegistry.amazon`. It is built with `blank(...)`; add these fields to it (spread the `blank(...)` result and override):

   ```ts
   amazon: {
     ...blank("amazon", "Amazon Associates", "Amazon",
       ["amazon.com", "www.amazon.com"], "https://www.amazon.com"),
     websiteTrackingId: "your-tag-20", // the tracking id Amazon gave THIS website
     approvalStatus: "approved",
     active: true,
     lastVerified: "YYYY-MM-DD", // today
     approvedPromotionMethods: ["website content"], // what Amazon approved
     accountOwnershipNote: "Account owned by <your name or company>.",
   },
   ```

   Use your own id only. Never reuse another site's id. If any of `active`, `approvalStatus: "approved"` or a tracking id is missing, the site falls back to plain links automatically.
3. **Know what the disclosure will say.** The moment the entry is live, these appear automatically beside shop links, on the disclosure page, and in Terms and Privacy:
   - "As an Amazon Associate I earn from qualifying purchases." (`AMAZON_ASSOCIATE_STATEMENT`, Amazon's wording as read on 2026-11-18; confirm it still matches the Operating Agreement.)
   - "It never changes what we recommend."
   - "We may earn a commission on qualifying purchases at no extra cost to you." (replaces "We don't currently earn from these links.")
   - The longer program sentence `AMAZON_PROGRAM_STATEMENT` is not prescribed by Amazon in the pages Cowork read; review it and do not claim approval before Amazon's final acceptance.
4. **Run the tests.** The suite does not depend on the shipped configuration, so it must be green with your id in place:

   ```
   bunx vitest run                          # your real configuration
   node scripts/check-affiliate-config.mjs  # full suite forced inactive, then forced active (fake id, in memory)
   bunx tsc --noEmit && bunx eslint . --quiet
   ```

   Do not run `scripts/check-affiliate-config.mjs --expect-inactive`; that flag is only for the seller's release branch and fails once you activate. Your real id is never written into a test.
5. **Review the live wording.** Update `site.legal.lastUpdated`, open `/affiliate-disclosure`, `/shop`, a product card and `/terms` and read the disclosure once.
6. **Deploy** as described in `docs/buyer/HOSTING-AND-DEPLOYMENT.md` (`bun run build`, then publish). After deploying, click a product link on the live site and check the URL ends in `?tag=your-tag-20`.

Replacing an id later: change `websiteTrackingId` in that one place; every link follows.

### How this was tested

The suite was verified with a FAKE, well-formed id (`testsite-20`, not a real account) in both states: shipped inactive, and the Amazon entry activated (approved, active, fake id). Both states: full `vitest` suite, `tsc --noEmit`, `eslint` and the production build. Each affiliate-sensitive test sets the registry to the state it needs and restores it. A guard test (`src/test/affiliate-config-independence.test.ts`) and `scripts/check-affiliate-config.mjs` re-run the suite in both states. Evidence: `docs/marketplace/final-inspection/AFFILIATE-ACTIVATION-TEST.md`.

## Adding another program later (not part of this business)

Plans Past Five uses Amazon Associates only (owner decision 2026-11-19); no other program has been researched for you. If you choose to add one yourself:

1. Apply and get approved in your own account; copy the deep-link format from your network dashboard.
2. Copy the Amazon entry shape into a new key in `affiliateRegistry` with `id` equal to the key, the retailer's `retailerHosts`, your `websiteTrackingId`, and `affiliateUrlTemplate` using `{tag}`, `{url}` or `{urlEncoded}`. Must start with `https://`. Never guess a template.
3. Set `approvalStatus: "approved"`, `active: true`, `lastVerified`.
4. Products pick the entry up when their verified `retailerUrl` is on one of its hosts (see PRODUCT-CATALOG.md).

## Resolution order

Active approved entry with tracking id for the destination, then the ordinary verified retailer URL, then a plain Amazon search link. Button text always names the real destination ("Browse options on Amazon" is a search page).

## Disclosure

Update `site.legal.lastUpdated` when going live. Keep the disclosure on the affiliate page and near product links (automatic). Have the owner or a lawyer review for your country (FTC or local rules).

## Exports stay ordinary
Activating Amazon tags on-site changes nothing in copied lists, printed lists, backups or shares. They use `src/lib/export-links.ts` (names plus a link back to this site, never a tagged link) because Amazon bars Special Links in printed and offline material. See docs/commerce/EXPORT-LINK-POLICY.md. Do not switch them to the affiliate resolver.

## Seller note (2026-11-19)
The Amazon entry is live on the seller's own Associates account with tracking id `planspastfive-20`. The buyer must replace `websiteTrackingId` (and `accountOwnershipNote`) with their own account's id before or at handover; the account and id do not transfer. Do not run `check-affiliate-config.mjs --expect-inactive` on this branch.
