# Affiliate setup: buyer checklist

Short checklist. The full explanation, file edits and cautions are in `docs/buyer/AFFILIATE-ACTIVATION.md`. Research register of candidate programs: `src/data/affiliate-programs.ts` (every field UNVERIFIED until a researcher fills it from official pages).

## Ground rules

- The Amazon Associates account is **not transferable**. You must apply with your own account. The seller's account, tracking ids and portfolio are not included and must not be used on your site.
- **Approval is not guaranteed.** Programs decide, may require a live and reviewable site, and may reject or later close accounts. Do not plan around approval.
- Read the current program agreement yourself; rules and wording change. Wording in code (`AMAZON_ASSOCIATE_STATEMENT`) is flagged TODO-VERIFY (PENDING COWORK).
- The site is pre-revenue; do not assume any income.

## Checklist

- [ ] Domain live and site publicly reachable (`docs/buyer/HOSTING-AND-DEPLOYMENT.md`).
- [ ] Contact email set (`site.contactEmail`), Privacy, Terms and Affiliate Disclosure reviewed by a lawyer.
- [ ] Apply to Amazon Associates under your own account, using your own site URL. Note what you enter and the promotion methods you declare.
- [ ] If approved: edit `affiliateRegistry.amazon` in `src/config/affiliate.ts` (tracking id, `approvalStatus: "approved"`, `active: true`, `lastVerified`, `approvedPromotionMethods`, `accountOwnershipNote`).
- [ ] Confirm the required disclosure sentence against the current agreement; update `AMAZON_ASSOCIATE_STATEMENT` and `AMAZON_PROGRAM_STATEMENT` if needed.
- [ ] Update `site.legal.lastUpdated`.
- [ ] Run `bunx vitest run`; check a product link carries your tag and `rel="sponsored"`.
- [ ] Spot-check that button text still describes the real destination.
- [ ] Plans Past Five is Amazon-only. If you add another network later, do it only after approval and never guess link templates.
- [ ] Record accounts and who owns them in your password manager and `docs/buyer/ACCOUNT-DEPENDENCIES.md`.

## Do not

- Add affiliate links by hand into articles or product records.
- Reuse another site's tracking id.
- Show prices or ratings unless you have verified the program's terms for that.
- Add a cart button before it is verified (`docs/commerce/AMAZON-CART-RESEARCH.md`).
