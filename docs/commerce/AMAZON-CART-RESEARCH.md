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

## Findings (read 2026-11-18 in the owner's signed-in Chrome unless noted; official Amazon pages only except where marked)

Sources: Program Policies (updated April 14, 2026) https://affiliate-program.amazon.com/help/operating/policies ; Operating Agreement https://affiliate-program.amazon.com/help/operating/agreement ; Application review help https://affiliate-program.amazon.com/help/node/topic/G8TW5AE9XL2VX9VM ; Creators API docs https://affiliate-program.amazon.com/creatorsapi/docs/en-us/introduction (+ /onboarding/register-for-creators-api, /frequently-asked-questions, /paapiv5-deprecation). Add to Cart form doc (legacy, PA-API site): https://webservices.amazon.com/paapi5/documentation/add-to-cart-form.html (search snippet only: the browser refused script access to that domain, so I did not read the whole page).

| Q | Answer | Source | Confidence |
|---|---|---|---|
| A1 links | Special Links must carry the Associates ID/tag (format XXXXX-##) as a URL parameter, be accessed directly from your Site, and you must not encourage visitors to bookmark them. Product lists (search results, events, department pages) are allowed only with additional original relevant content on the page. | Program Policies, Participation Requirements s.2 | High |
| A2 multi-product cart | The policies read describe cart behaviour for attribution only (items added to cart count if ordered within 89 days of the click, within a session). The policy text I extracted has no wording that permits or forbids an Add to Cart form or button. | Commission Income Statement s.1(c); Participation Requirements | Medium (absence of text, not an explicit rule) |
| A3 prices | A Site may show prices and availability only if Amazon serves the link that displays them, or if the data comes via the Creators API/PA-API under the License. Not showing prices remains the safe choice. | Participation Requirements | High |
| A4 disclosure | Exact sentence required: "As an Amazon Associate I earn from qualifying purchases." Must be clear and prominent on the Site. See AMAZON-DISCLOSURE.md. | Operating Agreement s.5 | High |
| A5 redirects/cloaking | Purchases via a "Redirecting Link" (a link that reaches Amazon through an intermediate site without the visitor taking an action there) are excluded from commissions. Special Links "must be accessed directly from your Site". No offering rewards for using Special Links. Do not use Associates links in client-side software or non-approved apps. | Commission Income Statement s.2(e); Participation Requirements | High for redirects; shorteners NOT FOUND in text read |
| B6 supported cart mechanism today | An "Add to Cart form" is documented on the PA-API documentation site (US endpoint https://www.amazon.com/gp/aws/cart/add.html, ASIN.x parameters, optional AssociateTag) but PA-API 5 is deprecated and returns 403 to callers. The Creators API lists only SearchItems, GetItems, GetVariations, GetBrowseNodes: no cart operation. I found no current official page confirming the Add to Cart form is still supported. | Creators API intro (operations list); PA-API deprecation notice; search snippet of add-to-cart-form.html | Medium: status of the legacy form UNCONFIRMED |
| B7 Creators API and cart | No cart or multi-item operation in the documented operations. | Creators API introduction | High |
| B8 limits | NOT FOUND | | |
| B9 credentials | Creators API uses OAuth 2.0 client credentials; secrets cannot live in a frontend-only repo. | Creators API FAQ | High |
| C10 eligibility | Associates application review requires qualified sales (at least three within 180 days, personal orders excluded) and a site with robust original content (guideline: at least 10 posts), publicly available. Creators API sign-up requires an account that has received final acceptance and referred qualified sales. | Application review help; Register for Creators API | High |
| C11-12 | NOT FOUND for the legacy form. | | |
| D13 attribution | Session ends at the first of: 24 hours from click, an order placed, or a new Special Link click. Cart: purchase of a product added to cart is credited if the order completes no later than 89 days after the click; item must ship within 180 days. | Commission Income Statement s.1 | High |
| D14 mobile | NOT FOUND; mobile apps are restricted to Approved Mobile Applications. | Participation Requirements s.5 | Medium |
| D15 ownership | Operating Agreement: the account cannot be assigned without Amazon's prior written approval. Buyer must create their own Associates account; PA-API retired; Creators API needs a server-side secret. | Operating Agreement | High |

## Account and multi-site notes
- Account assignment: "You may not assign this Agreement, by operation of law or otherwise, without our express prior written approval." (Operating Agreement.) Sale packet should say the buyer applies for their own account.
- Termination: either party may end the Agreement at any time with 7 calendar days' written notice (Operating Agreement s.6). After a termination for violation or abuse, rejoining needs Amazon's advance authorization (Program Policies).
- The account contact and Site information must stay complete and accurate (Participation Requirements). Exact multi-site and tracking-ID policy wording was NOT FOUND in the pages read; confirm in Account Settings / Manage Your Tracking IDs before telling a buyer.
- Do not combine an Associates tag with another affiliate program on the same traffic (Commission Income Limitations).

## Recommendation
Keep the shopping checklist; build no cart button. Reasons: the only documented cart mechanism sits in deprecated PA-API documentation and its current support is unconfirmed; the Creators API has no cart operation and needs a secret. Re-check this page when the owner asks Amazon (Associates "Contact Us") whether the Add to Cart form remains supported.

## Decision rules

- If findings show an officially supported, policy-compliant mechanism that needs no secrets in the repo, write a design note (data flow, disclosure, confirmation step, buyer setup) and ask the owner before building anything.
- If it needs secrets or a backend, record that it conflicts with the frontend-only constraint and defer.
- If findings are unclear or the program terms prohibit it, keep the checklist and per-item links, and close this item.
- Under every outcome: no invented links, no cart button until verified, no claims about what the cart does, and no changing the sentence in `AMAZON_ASSOCIATE_STATEMENT` without checking the current agreement.

## What to ship meanwhile

An honest shopping checklist: the reader ticks what she needs, marks what she already owns, saves things for later, and opens each item's own listing. The wording says what it is: a list, not a cart.

## Decision

Decision (2026-11-19, from Cowork's findings read 2026-11-18): ship the honest shopping checklist and build no add-to-cart button. Cowork found no officially supported, currently documented mechanism: the only documented cart mechanism (an Add to Cart form) sits in PA-API documentation, PA-API 5 is deprecated, and its current support is UNCONFIRMED (the page was only seen as a search snippet). The Creators API lists SearchItems, GetItems, GetVariations and GetBrowseNodes only, with no cart operation, and uses OAuth 2.0 client credentials that cannot live in a frontend-only repo. Even if a mechanism were confirmed, using the Creators API would also need an Associates account with final acceptance and referred qualified sales (a buyer-side requirement we cannot meet pre-revenue) and a server-side secret, which conflicts with the frontend-only constraint. We are therefore not building it now. Unchanged unknowns: item limits, mobile behaviour, and unavailable-item handling (NOT FOUND). Reopen only if Amazon confirms in writing that the Add to Cart form remains supported, and ask the owner before building anything.
