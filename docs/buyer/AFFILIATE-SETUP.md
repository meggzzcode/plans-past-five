# Affiliate setup: buyer checklist

Short checklist. The full explanation, file edits and cautions are in `docs/buyer/AFFILIATE-ACTIVATION.md`. Amazon Associates is the only program used. Its verified facts and sources are in `docs/buyer/AFFILIATE-ACTIVATION.md` and `src/data/affiliate-programs.ts` (read 2026-11-18; commission rates NOT READ and not published).

## Ground rules

- The Amazon Associates account is **not transferable**: the Operating Agreement cannot be assigned without Amazon's prior written approval (read 2026-11-18). You must apply with your own account. The seller's account, tracking ids and portfolio are not included and must not be used on your site.
- **Approval is not guaranteed.** Programs decide, may require a live and reviewable site, and may reject or later close accounts. Do not plan around approval.
- Read the current program agreement yourself; rules and wording change. `AMAZON_ASSOCIATE_STATEMENT` holds the sentence from Operating Agreement s.5, read 2026-11-18: "As an Amazon Associate I earn from qualifying purchases." `AMAZON_PROGRAM_STATEMENT` is not prescribed by Amazon in the pages read; review it.
- The site is pre-revenue; do not assume any income.

## Checklist

- [ ] Domain live and site publicly reachable (`docs/buyer/HOSTING-AND-DEPLOYMENT.md`).
- [ ] Contact email set (`site.contactEmail`), Privacy, Terms and Affiliate Disclosure reviewed by a lawyer.
- [ ] Apply to Amazon Associates under your own account, using your own site URL. Plan for **three qualified sales within 180 days** (personal orders excluded) and a tax interview plus payment method. Note what you enter and the promotion methods you declare.
- [ ] If approved: in Pages CMS > Site settings enter your own tracking ID, the date you confirmed the approval, and switch Amazon tracking ON (stored in `content/settings.json`; `src/config/affiliate.ts` reads it).
- [ ] Create a tracking ID for this site in Associates Central (multi-site policy NOT FOUND; check Manage Your Tracking IDs). Never reuse another site's ID.
- [ ] Confirm the required disclosure sentence against the current agreement; update `AMAZON_ASSOCIATE_STATEMENT` and `AMAZON_PROGRAM_STATEMENT` if needed.
- [ ] Update `site.legal.lastUpdated`.
- [ ] Run `bunx vitest run`; check a product link carries your tag and `rel="sponsored"`.
- [ ] Spot-check that button text still describes the real destination.
- [ ] Plans Past Five is Amazon-only. Do not publish commission rates or earnings (Amazon restricts public communication about the Agreement).
- [ ] Record accounts and who owns them in your password manager and `docs/buyer/ACCOUNT-DEPENDENCIES.md`.

## Do not

- Add affiliate links by hand into articles or product records.
- Reuse another site's tracking id.
- Show prices or ratings unless you have verified the program's terms for that.
- Add a cart button before it is verified (`docs/commerce/AMAZON-CART-RESEARCH.md`).
