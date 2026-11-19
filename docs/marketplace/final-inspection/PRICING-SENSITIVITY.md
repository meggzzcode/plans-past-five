# Pricing sensitivity: what the seller keeps at five prices

**For the owner's decision. Not financial, tax or legal advice.** Prepared 2026-11-19. Every fee below is an ASSUMPTION from search snippets or third parties unless marked official; the marketplace's own pages returned 403 on 2026-11-19 (`MARKETPLACE-POSITIONING.md`). Re-run this table against the live fee page at listing time.

## 1. Read this first

- **Comparable sale evidence was NOT FOUND.** No completed sale of a comparable pre-revenue, not-live women's-hobby content site was found. Every number in the marketplace research is an asking price, a seller's claim or an author's reasoning (`MARKETPLACE-POSITIONING.md` section 1).
- **Replacement cost is not market value.** Section 5 of `MARKETPLACE-POSITIONING.md` argues a price from what a buyer would otherwise spend. A buyer is not obliged to pay it, and nothing in the repo shows anyone paying it.
- **A no-sale outcome is possible, and is plausible for a not-live, no-traffic, no-revenue asset.** If nobody bids, the non-refundable listing fee is lost and the cash result is the expenses alone.
- **The asking price is unresolved and is the owner's decision.** The provisional asking price recorded in `REMEDIATION-PLAN.md` is **$1,495**. The researched asking range in `MARKETPLACE-POSITIONING.md` is up to **$2,950** (quick-sale $1,200, expected negotiation range $1,500 to $2,500). Both stay on the page until the owner chooses; this file does not choose.

## 2. Known cash expenses (from the owner's receipts, 2026-11-19)

| Item | Amount | Date paid | Status |
| --- | --- | --- | --- |
| Domain (Namecheap order recorded in `CHECKPOINT.md`) | $12.28 | 2026-11-19 | Owner-reported; keep the receipt |
| Namecheap Private Email | $14.88 | 2026-11-19 | Owner-reported; keep the receipt |
| **Total cash spent** | **$27.16** | | |
| Hosting | $0 | | Netlify free plan, no paid plan; not yet connected |

Whether the domain and mailbox are part of the sale is a separate owner decision (`docs/buyer/BUYER-PACKAGE-CONTENTS.md`). If they are excluded, the buyer pays their own and the seller's $27.16 is simply sunk or recovered some other way. Renewals fall after the sale and are not counted.

## 3. Fee assumptions (flag every one)

| Assumption | Value used | Status |
| --- | --- | --- |
| Flippa success fee | 10% of the final price (below $50,000) | **UNVERIFIED.** Third-party snippets say about 10% below $50k; Flippa's own pages gave conflicting figures ("10% of final transaction value" on one, "from 5%" on another) and could not be fetched. Plan on 10% |
| Flippa listing fee | $49 (higher end; $29 is the low end) | **UNVERIFIED.** Reported range $29 to $49; **non-refundable**, paid at listing whether or not the asset sells |
| Escrow | **Not a separate line in the base case** | **UNVERIFIED.** It is not known whether Flippa's success fee already covers the escrow service. To avoid double counting, escrow appears as its own line only in the stress case in the second table, as if the seller paid Escrow.com's published schedule on top of the marketplace charges |
| Escrow.com schedule (stress case only) | 2.6% with a $50 minimum (standard, ACH disbursement $0) | Official page read 2026-11-19 (https://www.escrow.com/fee-calculator). The page sets no default payer; third parties say the buyer usually pays. Card or PayPal funding by the buyer adds 3.05% (not modelled); wire fees are extra (not modelled) |
| Payment-processor, currency or tax costs | **Not modelled** | UNKNOWN. Income tax on proceeds is the owner's matter; no tax information is held in this repo |

## 4. Sensitivity table: base case (no separate escrow line)

Net proceeds = gross price minus the 10% success fee minus the $49 listing fee. Cash profit = net proceeds minus the $27.16 cash spent. Development time is **not** subtracted (section 6).

| Gross price | Success fee (10%, UNVERIFIED) | Listing fee ($49, UNVERIFIED) | Net proceeds | Cash spent | Estimated cash profit |
| --- | --- | --- | --- | --- | --- |
| $995 | $99.50 | $49 | $846.50 | $27.16 | **$819.34** |
| $1,495 (provisional ask) | $149.50 | $49 | $1,296.50 | $27.16 | **$1,269.34** |
| $1,995 | $199.50 | $49 | $1,746.50 | $27.16 | **$1,719.34** |
| $2,495 | $249.50 | $49 | $2,196.50 | $27.16 | **$2,169.34** |
| $2,950 (researched ask) | $295.00 | $49 | $2,606.00 | $27.16 | **$2,578.84** |

With a $29 listing fee instead of $49, every figure is $20 higher.

## 5. Stress case: seller also pays a separate Escrow.com charge (only if the marketplace's charges do NOT already include escrow)

| Gross price | Escrow.com (2.6%, $50 minimum) | Net proceeds | Estimated cash profit |
| --- | --- | --- | --- |
| $995 | $50.00 | $796.50 | $769.34 |
| $1,495 | $50.00 | $1,246.50 | $1,219.34 |
| $1,995 | $51.87 | $1,694.63 | $1,667.47 |
| $2,495 | $64.87 | $2,131.63 | $2,104.47 |
| $2,950 | $76.70 | $2,529.30 | $2,502.14 |

Use this table only if the live fee page shows escrow is charged to the seller on top of the success fee. If the buyer pays escrow, or the success fee includes it, the base table applies.

## 6. Development time (shown separately, never as a cash cost)

The hours spent building the site are real but are not cash. The repo does not record them reliably, so none is invented here. Owner: enter your own estimate below if you want an effective hourly figure.

| Item | Value |
| --- | --- |
| Hours you spent building and documenting | ______ (owner to enter) |
| Effective rate at $1,269.34 cash profit | cash profit divided by your hours |
| Effective rate at $2,578.84 cash profit | cash profit divided by your hours |

For scale only, with arbitrary hour counts and not a statement of what was spent: at 100 hours the base-case cash profit works out to about $8.19 an hour at $995 and about $25.79 an hour at $2,950, before any tax. A no-sale outcome earns nothing for that time.

## 7. What this table does not say

- It does not say any of these prices will be paid. No sale evidence supports any of them.
- It does not include post-sale support time (`POST-SALE-SUPPORT-PROPOSAL.md` caps it at 5 hours; that time is also unpaid cash-free effort).
- It does not include income tax, self-employment tax, sales tax or marketplace currency fees. Ask an accountant.
- It does not include any value for the domain and mailbox if they are included in the sale (owner decision).
- The $9,999 cap on asking prices for assets with no revenue (marketplace rule, `PRICING-STRATEGY.md`) is not binding at any of these prices.
