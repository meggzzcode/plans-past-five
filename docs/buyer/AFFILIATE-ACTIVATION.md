# Affiliate activation guide (buyer)

Plans Past Five ships **unmonetized**: plain Amazon search links, no tracking ids, `rel="noopener"` only, and a disclosure that says the site does not currently earn from links. You activate income with your own accounts.

## Why no accounts are included

Affiliate accounts belong to the person who applied. Amazon Associates accounts are tied to the account holder, are not transferable, and every site needs its own approval. Other networks have their own rules (see `src/data/affiliate-programs.ts`, which Cowork verifies from official pages; nothing there is assumed). The seller's master/portfolio accounts, ids and links are therefore deliberately not included, and nothing in this repo shares anything with another site.

## Where everything lives

| What                                         | File                                                                                |
| -------------------------------------------- | ----------------------------------------------------------------------------------- |
| Registry, link builder, disclosure sentences | `src/config/affiliate.ts`                                                           |
| Candidate programs (research register)       | `src/data/affiliate-programs.ts`                                                    |
| Product records                              | `src/data/products.ts`                                                              |
| Disclosure page / note                       | `src/routes/affiliate-disclosure.tsx`, `src/components/editorial/AffiliateNote.tsx` |

## Activate Amazon (own approval required)

1. Apply to Amazon Associates with your own account, listing your site URL. Wait for approval and read the current Operating Agreement.
2. In `src/config/affiliate.ts`, edit `affiliateRegistry.amazon`:
   - `websiteTrackingId: "your-tag-20"` (the tracking id Amazon gave this website)
   - `approvalStatus: "approved"`
   - `active: true`
   - `lastVerified: "YYYY-MM-DD"` (today)
   - `approvedPromotionMethods`: what Amazon approved (e.g. website content)
   - `accountOwnershipNote`: whose account it is
3. Confirm the required identification sentence (`AMAZON_ASSOCIATE_STATEMENT`) still matches the current Operating Agreement; edit the constant if not.
4. Run `bunx vitest run`. Every product link now carries `tag=your-tag-20`, gets `rel="sponsored noopener"`, and the disclosure switches to the monetized form.

Replacing an id later: change `websiteTrackingId` in that one place; every link follows. If any of `active`, `approvalStatus: "approved"` or a tracking id is missing, the site falls back to plain links automatically.

## Other networks (Awin, Impact, CJ, direct programs)

1. Apply and get approved in your own account; copy the deep-link format from your network dashboard.
2. Copy the Amazon entry shape into a new key in `affiliateRegistry` with `id` equal to the key, the retailer's `retailerHosts`, your `websiteTrackingId`, and `affiliateUrlTemplate` using `{tag}`, `{url}` or `{urlEncoded}`. Must start with `https://`. Never guess a template.
3. Set `approvalStatus: "approved"`, `active: true`, `lastVerified`.
4. Products pick the entry up when their verified `retailerUrl` is on one of its hosts (see PRODUCT-CATALOG.md).

## Resolution order

Active approved entry with tracking id for the destination, then the ordinary verified retailer URL, then a plain Amazon search link. Button text always names the real destination ("Browse options on Amazon" is a search page).

## Disclosure

Update `site.legal.lastUpdated` when going live. Keep the disclosure on the affiliate page and near product links (automatic). Have the owner or a lawyer review for your country (FTC or local rules).
