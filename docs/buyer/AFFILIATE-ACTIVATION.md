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

1. Apply to Amazon Associates with your own account, listing your site URL. Complete the tax interview and payment method. You have 180 days to drive three qualified sales (your own orders do not count). Read the current Operating Agreement.
2. In `src/config/affiliate.ts`, edit `affiliateRegistry.amazon`:
   - `websiteTrackingId: "your-tag-20"` (the tracking id Amazon gave this website)
   - `approvalStatus: "approved"`
   - `active: true`
   - `lastVerified: "YYYY-MM-DD"` (today)
   - `approvedPromotionMethods`: what Amazon approved (e.g. website content)
   - `accountOwnershipNote`: whose account it is
3. `AMAZON_ASSOCIATE_STATEMENT` already holds Amazon's wording as read on 2026-11-18; confirm it still matches the current Operating Agreement. `AMAZON_PROGRAM_STATEMENT` (the longer disclosure-page sentence) is not prescribed by Amazon in the pages Cowork read; review it and do not claim approval before Amazon's final acceptance. Both are used only while the Amazon entry is live.
4. Run `bunx vitest run`. Every product link now carries `tag=your-tag-20`, gets `rel="sponsored noopener"`, and the disclosure switches to the monetized form.

Replacing an id later: change `websiteTrackingId` in that one place; every link follows. If any of `active`, `approvalStatus: "approved"` or a tracking id is missing, the site falls back to plain links automatically.

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
