# Pricing strategy framework

Status: DRAFT framework, 2026-11-19. Every market number, fee and comparable sale is PENDING COWORK (task C7, output docs/marketplace/FLIPPA-RESEARCH.md). This file contains **no prices, no fee rates and no comparable sales** and none should be invented. Not financial advice.

## Principles

- **No price is guaranteed.** A sale may not happen, or may happen below any figure here.
- **Established-revenue valuation multiples do not apply.** Methods that multiply monthly profit or revenue need an earnings history. This site is pre-revenue with no traffic history, so those multiples have nothing to multiply and must not be used or implied.
- A pre-revenue starter site is priced by what is built, what a buyer would have to spend to recreate it, and what comparable pre-revenue listings actually sold for, once C7 supplies verified sales.
- Never price off anything speculative: no earnings forecasts, traffic targets or affiliate projections appear in a listing, and any buyer forecast is hypothetical.

## Keep the evidence types separate

| Evidence type | Use | Weight |
|---|---|---|
| Verified completed sales (confirmed sold, with the sale price shown by the marketplace) | Only type that can anchor a price range | Highest |
| Asking prices (listings with a price, not sold) | Context for what sellers hope for; never present as sales | Low |
| Auction bids (including unmet reserves) | Shows interest, not a sale | Low |
| Unsold or expired listings | Evidence that an asking level did not clear | Informational |

Record, for each comparable: marketplace, date, type (from the table), stated price, whether it is a site without revenue, content size, and what was included. All blank until C7 is done.

## Tiers (definitions only; values blank until C7)

| Tier | Meaning | Value |
|---|---|---|
| Quick-sale price | Price at which the owner would accept a fast sale | ______ (owner decides after C7) |
| Standard asking price | Mid-range ask supported by verified completed sales | ______ |
| Premium asking price | Higher ask, only if more is complete at listing (domain, live host, more verified articles, verified products) | ______ |
| Suggested auction reserve | Not lower than the minimum acceptable net proceeds once fees are covered | ______ |
| Minimum acceptable net proceeds | The least the owner will accept after fees and costs | ______ |

Premium pricing should not be set unless the items marked AVAILABLE AT LISTING ONLY IF COMPLETE in LISTING-DRAFT.md are actually complete.

## Calculator (formulas in words)

Inputs (blank; owner fills, fee figures come from C7):

| Input | Value |
|---|---|
| A. Cash costs to date (from receipts) | ______ |
| B. Hours invested | ______ |
| C. Owner's value per hour for own time (owner chooses; optional) | ______ |
| D. Success or commission fee, percent | ______ % (PENDING COWORK) |
| E. Listing fee | ______ (PENDING COWORK) |
| F. Escrow fee | ______ (PENDING COWORK; who pays is a term to confirm) |
| G. Other fees (payment, currency, transfer) | ______ |
| P. Candidate sale price | ______ |

Arithmetic:

1. Cost basis (cash) = A.
2. Cost basis including time (optional, shown separately) = A + (B x C). Cash and time stay in separate lines; never report them as one cash figure.
3. Success fee amount = P x (D divided by 100).
4. Total marketplace and transaction fees = (3) + E + F + G.
5. **Estimated net proceeds = P minus (4).**
6. Net result against cash = (5) minus A.
7. **Minimum acceptable net proceeds** = the owner's chosen floor, at least A if the owner wants to recover cash. Floor price needed = (floor + E + F + G) divided by (1 minus D/100), because the success fee is a share of P. Re-check that formula against how the marketplace actually computes its fee (C7).
8. **Suggested reserve** = the floor price from step 7, rounded up by the owner, never below it.

Worked example: not provided on purpose, because any example number would look like a market figure.

## Pending before any price is set

- C7: marketplace fees, listing requirements, revenue-claim rules for sites without revenue, verified completed comparable sales.
- NEEDS OWNER: cash costs (A), hours (B), floor, and whether the domain is included.
- Re-run the calculator when the marketplace's fees are known.
