# Amazon add-to-cart research

Question: can a reader add a whole starter kit to an Amazon cart in one click, and should this site offer that?

**Conclusion for now: until the answer is verified from official sources, ship an honest shopping checklist and no cart button.** This research was not done live (Claude Code cannot browse behind logins or verify current program pages). Everything below marked PENDING COWORK needs a person or Cowork to read the official pages and record what they say, with URLs and dates. Nothing in this file states what Amazon allows; do not treat any recollection as fact.

## What exists today

- A browser-only shopping checklist: `src/lib/shoplist.ts` (localStorage key `ppf:shop-list:v1`; per-product status need / own / later), used by `src/components/commerce/ProductCard.tsx` and `src/components/commerce/ShopMyHobby.tsx`. Nothing leaves the device.
- Product links come only from `src/config/affiliate.ts`. Each product has one button that names its real destination. There is no multi-item cart mechanism and none should be built until this research says one is allowed and supported.
- Kits are editorially curated lists, not bundles (`docs/commerce/STARTER-KITS.md`).

## Research questions (for Cowork, from official Amazon pages only)

Record each answer with: the page URL, the page title, the date read, and a short quote or paraphrase.

### A. Policy
1. What do the current Amazon Associates Program Operating Agreement and Program Policies say about how links may be built and placed (text links, product links, buttons, dynamic links)?
2. Do they permit or prohibit adding multiple products to a cart on behalf of a visitor from an affiliate site? Any wording about "Add to Cart" forms or buttons?
3. What do the policies say about showing prices, ratings, availability or product images (including API-sourced data and caching limits)? (We store none of these; confirm that remains the safe choice.)
4. What disclosure wording and placement are required, and does it differ for a page with multiple product links? (Current text in code: `AMAZON_ASSOCIATE_STATEMENT` in `src/config/affiliate.ts`, flagged TODO-VERIFY.)
5. Are there rules about link cloaking, redirects, shorteners or wrapping Amazon links in our own tracking? (Relevant to `track.ts` events such as `affiliate_outbound_click`.)

### B. Technical mechanisms
6. Is there an officially documented, currently supported way for an affiliate site to send a visitor to Amazon with several items pre-loaded in the cart? If so, what is it called and which page documents it?
7. Is the "Creators API" (or any successor to the Product Advertising API) officially described as supporting cart or multi-item functionality? What does it return and allow?
8. Is there any documented limit on how many items, which marketplaces, and which product types are supported?
9. What authentication or credentials does it need, and could they be kept out of a frontend-only site (this project must not hold secrets; see `AGENTS.md` project rules and `docs/buyer/SECURITY-AND-BACKUPS.md`)? A mechanism that needs a server-side secret conflicts with the frontend-only constraint and would need a decision from the owner.

### C. Eligibility and confirmation
10. What eligibility requirements apply (approved Associates account, number of qualifying sales, account age, site review)? Are they different for API access than for ordinary links?
11. Does the mechanism require the visitor to confirm the cart on Amazon? Is there anything that lets items be added without the visitor seeing and confirming them?
12. What happens if an item is unavailable or changes? How would the reader be told?

### D. Attribution, mobile and operations
13. How is attribution handled for a multi-item cart link versus single product links (tracking id, cookie window, which items count)? Quote the program's wording.
14. How does it behave on mobile browsers and the Amazon app (deep-linking, sign-in redirects)?
15. What maintenance burden does it add: version changes, deprecations, key rotation, rate limits, terms changes? Who would own it after a sale (accounts are not transferable; see `docs/buyer/AFFILIATE-ACTIVATION.md`)?

## Findings

PENDING COWORK. (Fill in a table with columns: question number, answer, source URL, date read, confidence. Leave blank until read from the official page.)

## Decision rules

- If findings show an officially supported, policy-compliant mechanism that needs no secrets in the repo, write a design note (data flow, disclosure, confirmation step, buyer setup) and ask the owner before building anything.
- If it needs secrets or a backend, record that it conflicts with the frontend-only constraint and defer.
- If findings are unclear or the program terms prohibit it, keep the checklist and per-item links, and close this item.
- Under every outcome: no invented links, no cart button until verified, no claims about what the cart does, and no changing the sentence in `AMAZON_ASSOCIATE_STATEMENT` without checking the current agreement.

## What to ship meanwhile

An honest shopping checklist: the reader ticks what she needs, marks what she already owns, saves things for later, and opens each item's own listing. The wording says what it is: a list, not a cart.
