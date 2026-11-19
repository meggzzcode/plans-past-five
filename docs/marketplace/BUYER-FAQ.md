# Buyer FAQ (draft, honest answers)

Status: DRAFT, 2026-11-19. Flippa rules were researched on 2026-11-18 (FLIPPA-RESEARCH.md) and re-checked at listing time. Not legal, tax or financial advice.

**Is the site making money?** No. It is pre-revenue with no traffic history, no audience data and no earnings. Nobody should quote earnings, traffic or rankings for it.

**Is it live?** No. Nothing is deployed or live. No host or domain connection exists in the repo; `planspastfive.com` is a placeholder. Status: BLOCKED on owner choices (NEEDS OWNER).

**What is included?** The repo (code, content, data, drafts, briefs, tests, CI), brand files, 88 pin images with CSV and schedule, and all docs. Full table: ASSET-INVENTORY.md.

**What is excluded?** Affiliate master or portfolio accounts and tracking IDs, payment and tax accounts, mailbox, Lovable project and credits, any personal credentials, the seller's other sites and tools. The domain is included only if the seller confirms ownership and agrees to transfer it.

**Do I need my own accounts?** Yes. You create or connect your own affiliate programs, host, domain registrar, mailbox, analytics, Search Console and Pinterest accounts. See `docs/buyer/ACCOUNT-DEPENDENCIES.md`.

**How do affiliate links work, and are they approved?** The site is built for Amazon Associates only. Nothing has been applied for and no approval exists. Links are ordinary Amazon links (search links or verified product pages) until you apply with your own account, are approved, and edit the registry in `src/config/affiliate.ts` (tracking id, approved, active). Approval is not guaranteed. Per Amazon's application help (read 2026-11-18) an account must drive at least three qualified sales within 180 days, and the Associates agreement cannot be assigned without Amazon's prior written approval, so the seller's account does not transfer. Amazon's policy on one account covering several websites was NOT FOUND; confirm in your own Associates account. See `docs/buyer/AFFILIATE-ACTIVATION.md`.

**What do I have to pay for?** Every cost is UNCONFIRMED in the repo: typically a domain, host, possibly a mailbox, optional tools and a legal review. No figure is stated. See OPERATING-COST-SUMMARY.md. Promotional first-term prices are not renewal prices.

**How much maintenance is there?** Weekly and monthly checklists exist (`docs/buyer/WEEKLY-MAINTENANCE.md`, `MONTHLY-MAINTENANCE.md`). Writing and verifying articles is the main time cost. There is no CMS; content changes are file edits.

**Was AI used?** Yes. The build was done with AI coding assistance, the existing images were generated with an AI image tool (`docs/IMAGE-LICENSES.md`), and articles were drafted with AI and held as drafts until claims are verified. The Editorial Policy page carries a disclosure.

**Do I own the images?** The repo records that the generated images may be transferred with the site, but confirming the image tool's terms is still open (see docs/commerce/image-rights-notes.md). Seek your own advice.

**Are the legal pages ready?** No. Privacy and Terms are starter text. Get them reviewed for your jurisdiction and your actual practices. Owner name and jurisdiction fields in `src/config/site.ts` are empty.

**How many articles are published?** 27 files are marked `status: "published"`; 5 more are drafts and there are 2 outline-only entries. "Published" means the article was source-checked by Cowork (2026-11-18) and set to published on the branch. It does NOT mean deployed: nothing is live. Of the 27, the 4 originally published articles have NOT been source-checked yet (Cowork task C4 is still to do for them); the other 23 were. The 5 drafts were checked and left not ready. Source-checking is a review of claims against sources, not a guarantee that every statement is correct.

**Are there verified products?** Yes, in a limited sense: the catalog holds 44 records, 37 verified and 7 candidates that never display. "Verified" means Cowork opened the Amazon listing and the record was reviewed; the links are ordinary Amazon links. Nobody on this project has bought or tested these products, and most records still say the manufacturer page was not checked. Product research (C3) continues toward about 60 products. Product-type records still link to Amazon searches. Only 7 of the 15 starter kits have any verified product.

**What is not proven?** Demand, traffic, search rankings, conversion, affiliate earnings, Pinterest performance, and whether any program will approve the site. Hypothetical forecasts are not evidence.

**Is there post-sale support?** A short, fixed, written-questions-only handover period is suggested (HANDOVER-TERMS-SUGGESTION.md). It is a suggestion for the parties and their lawyers. No indefinite free support.

**Is the technical state tested?** 250 automated tests passed (15 test files) and typecheck was clean on 2026-11-19. A production build and live QA have not been recorded.

**What is the price?** Not set. See PRICING-STRATEGY.md; Flippa fee and pricing-rule facts are recorded there with sources; no verified comparable sale was found, and the owner's cash costs are UNCONFIRMED. No price is guaranteed and a sale may not happen. Under Flippa's rules a site without revenue has a maximum asking or reserve price (see PRICING-STRATEGY.md).
