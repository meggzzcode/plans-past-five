- A Live Amazon verification: done (29/29 in stock, ASIN and title match; 4 flagged). Files: docs/commerce/FINAL-LISTING-VERIFICATION.csv. Branch cowork/product-verification. Blockers: manufacturer-page checks not repeated this round; Pigma, Scotch 6061 and Arches sold by third parties. NMJL four-packs now confirmed, sold by NMJL.
- B Kit completion: PARTLY (4 of the tier 1-4 picks). Files: docs/commerce/buy-plan/VERIFIED-QUEUE.csv (passes --check, 4 candidates), VERIFIED-QUEUE-EXTRAS.csv (sentiment, sources, decision, tier). Branch cowork/product-verification. Surprise: the importer rejects the extra columns the pack asks for (sentimentSummary etc.), so I put them in notes and in the sidecar file; Claude Code should fix the pack or the importer. Done: Franklin X-40, HEAD Ti S6, Penn Extra Duty (B000T21OJU), Clover Amour. Not done: HEAD Gravity Tour/Selkirk paddles (no review summary readable), Babolat Boost, Susan Bates Silvalume (search hit was a different hook), mahjong card sleeve, acrylic/watercolor/paint-night picks, manufacturer safety pages, tier 2-3 articles. Reviews read via Amazon's on-page Customers-say summary only.
- C Source verification: PARTLY. File docs/content/verification-final/COWORK-SOURCE-RESULTS.md, branch cowork/source-verification. Supported: clay food-contact (Crayola), Merlin free (Cornell), helmet (CPSC), museum EBT program. Needs rewording: clay drying time, flame/heat line. Not checked: tennis warm-up, free-court claims, LHAMA, FIVE-NEW-ARTICLES-REVIEW claims, glaze food safety.
- E Read-live business facts: PARTLY. File docs/marketplace/final-inspection/COWORK-READ-LIVE.md, branch cowork/read-live. Done: Netlify credits, registrars, email options, Pages CMS, Amazon policy text. Surprise: the Amazon policies page does not contain the 3-sales/180-day or 60-day rules the pack mentions, so they are marked NOT FOUND. Not done: GA4, Search Console, Bing, Pinterest, other affiliates, Netlify terms, whether a skipped build costs credits (needs login).
- J Marketplace research: PARTLY. File docs/marketplace/final-inspection/COWORK-MARKETPLACE-RESEARCH.md, branch cowork/marketplace-research. No verified sold comps for pre-revenue sites found; Flippa starter cap NOT FOUND; escrow fee pages disagree (2.6% vs 3.25%).
- F-pre/trademark: PARTLY. docs/marketplace/TRADEMARK-KNOCKOUT.md, branch cowork/marketplace-research. Web search found no exact-phrase brand; USPTO database, state registries and handle checks not done.
- I Pinterest verification: DONE for files/CSV/destinations/policy. docs/marketplace/final-inspection/PINTEREST-VERIFICATION.md, branch cowork/pinterest-verification. Two published articles lack a pin; 25 photo pins may get AI labels; SITE_URL placeholder must be replaced at go-live. Images not visually reviewed one by one.
- D Asset rights: DONE (register + unsent draft emails). docs/cowork/ASSET-RIGHTS-REGISTER.md, docs/commerce/photo-permission-emails.md, branch cowork/asset-rights. Open: Lovable transfer clause not found; Canva AI terms not re-read; Google Fonts terms not read.

## FINAL SUMMARY (2026-11-19)
No code, main branch or claude/vibrant-dirac-amdf7r changed by Cowork work; data and report files only. Nothing purchased, sent, published, scheduled or accepted.

| Workstream | Status | Files | Branch |
|---|---|---|---|
| A Amazon verification | DONE (29/29; 3 CHANGED, 1 flagged) | docs/commerce/FINAL-LISTING-VERIFICATION.csv | cowork/product-verification |
| B Kit completion | PARTLY (4 verified queue rows; paddles, Babolat, mahjong sleeve, watercolor/acrylic/paint-night, safety pages, tier 2-3 NOT DONE) | docs/commerce/buy-plan/VERIFIED-QUEUE.csv, VERIFIED-QUEUE-EXTRAS.csv | cowork/product-verification |
| C Article sources | PARTLY (unchecked claims remain) | docs/content/verification-final/COWORK-SOURCE-RESULTS.md | cowork/source-verification |
| D Asset rights | DONE | docs/cowork/ASSET-RIGHTS-REGISTER.md, docs/commerce/photo-permission-emails.md (unsent) | cowork/asset-rights |
| E Read-live facts | PARTLY (GA4, Search Console, Bing, Pinterest, other affiliates, Netlify terms NOT CHECKED) | docs/marketplace/final-inspection/COWORK-READ-LIVE.md | cowork/read-live |
| F-pre Trademark screen | PARTLY (web search only; USPTO database not searched) | docs/marketplace/TRADEMARK-KNOCKOUT.md | cowork/marketplace-research |
| I Pinterest verification | DONE | docs/marketplace/final-inspection/PINTEREST-VERIFICATION.md | cowork/pinterest-verification |
| J Marketplace research | PARTLY (no verified sold comps; no evidence-backed ask) | docs/marketplace/final-inspection/COWORK-MARKETPLACE-RESEARCH.md | cowork/marketplace-research |
| G Netlify + CMS test | BLOCKED: needs owner login and go-ahead; hosting not chosen | | |
| F Email round trip | BLOCKED: needs owner to send tests and read hello@ inbox; DNS records are live | | |
| N Repo visibility | BLOCKED: report only on owner request; nothing changed | | |
| H, K, L, M post-deploy | BLOCKED: site not deployed | | |
| O optional | NOT RUN: no explicit authorisation | | |

## Owner actions
1. Send a fresh test email to hello@planspastfive.com and subscriptions@; confirm it arrives (DNS may take up to 4 hours from about 14:55).
2. Choose hosting (see COWORK-READ-LIVE.md), then say "go" for workstream G.
3. Read Amazon's Associates Operating Agreement in your account; the policy summaries are secondary.
4. Search PLANS PAST FIVE on tmsearch.uspto.gov and check the @planspastfive handles.
5. Confirm Flippa pricing at flippa.com/pricing before listing; ask Lovable whether AI output transfers to a buyer.
6. Decide whether to send the draft photo-permission emails.
7. Merge the cowork/* branches (data and docs only) when ready; each branch carries its own COWORK-PROGRESS lines.
8. Claude Code defects: importer rejects the extra columns in VERIFIED-QUEUE-EXTRAS (kept as a sidecar); pins use a {SITE_URL} placeholder; see docs/cowork/DEFECT-PACKET.md.

## FINISH PASS (2026-11-19)
- B: 13 more Amazon pages read in owner's browser; docs/commerce/buy-plan/VERIFIED-ADDITIONS.csv (importer-clean VERIFIED-QUEUE.csv left untouched). Liquitex 12-set not found. Susan Bates Silvalume H-8 now FOUND (B003I5L15M; earlier NOT FOUND corrected). Decisions: keep 8, hold 5.
- C: previously unchecked rows resolved in COWORK-SOURCE-RESULTS.md (finish pass). Remaining open: Safeway page re-open (low risk), general 'often free' claims are not sourceable.
- E: Netlify terms, Search Console, Pinterest claim, Amazon agreement read; GA4 and Bing help pages gave no answers (NOT FOUND).
- J: Flippa pricing page read: no dollar prices or success-fee rates published there; escrow fee pages conflict (cannot reconcile); no sold comps (NOT FOUND).
- Trademark: USPTO database searched; no exact mark; HOOKED AFTER FIVE (class 41) to be opened by owner.

## Round 2 (2026-11-19), branch cowork/round2

| Item | Status | Notes |
|---|---|---|
| B2 products | Partly | Tier 1-3 sampled; 8 rows in docs/commerce/buy-plan/VERIFIED-QUEUE-2.csv, `--check` passes (0 verified, 8 candidates). Osprey and Giro rows are on hold (third-party seller; Giro manufacturer safety page not read). Bike lights (Cygolite, Blackburn) have no Customers-say summary: not queued. Not reached: yarn/needles, flower items, jigsaw, paint-by-number, yoga mat, letter set, tennis/pickleball shoes, skate gear, jewelry/sewing kits, picnic tableware, bell. |
| Held decisions | Not done | HELD-DECISIONS.md says all five stay held. |
| C2 claims | Not done | Safeway page and unsourced-sentence list not produced. |
| Pinterest pin rows | Done | Two rows in PINTEREST-VERIFICATION.md (images still to build). |
| Pinterest account | Partly | Handle @planspastfive confirmed, business profile, bio and website field set. 7 pins published, 6 boards exist. Website not claimed. Instagram/TikTok handle check not done. |
| Amazon policy read | Partly | Public Operating Agreement only; 180-day rule, image/price rules, SiteStripe NOT FOUND (AMAZON-POLICY-READ.md). |
| Domain (owner-instructed) | Done | Netlify: planspastfive.com primary, www redirect. Namecheap: removed parking URL redirect and parking CNAME; added A @ 75.2.60.5 and CNAME www plans-past-five.netlify.app. MX and SPF untouched, nameservers untouched. Netlify DNS verification passed and Let's Encrypt cert issued for both names. No release deploy yet, so the domain serves nothing. |
| GA4/Bing/GSC, trademark serial, Flippa, email test, G, H-O | Not done | Need owner logins or "go"; G needs RELEASE-HANDOVER.md merged status and the owner's go before the one deploy. |
