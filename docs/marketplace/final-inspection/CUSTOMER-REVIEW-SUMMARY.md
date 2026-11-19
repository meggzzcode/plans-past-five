# Customer review summary (all rounds)

> **EVERY SCORE IN THIS FILE IS SIMULATED AI SENTIMENT.** It comes from AI personas driving the site with Playwright. It is not customer research, not a survey and not evidence of marketplace demand. No real person has scored this site yet. Scores are copied from the report tables as written (1 to 10). Averages are plain arithmetic means of the rows shown, nothing weighted or adjusted. The reviewer sets differ between rounds (different personas, different counts, different builds), so a change between rounds is NOT proof of improvement or decline.

Two different questions are kept apart throughout:
- **"Would I buy the supplies?"** is a customer question (this file).
- **"Would I buy the site?"** is a buyer question (see `BUYER-REVIEW-SUMMARY.md`). The two numbers measure different things and are never combined.

## 1. What was read

| Round | Folder | Reports | Customer personas | Build |
|---|---|---|---|---|
| Round 1 | `reviews/` | 3 | one reader persona applied to first visit, articles/shop, tools | earliest |
| Round 2 | `reviews2/` | R2-1 to R2-5 | R2-1 tired 9-to-5 phone, R2-2 creative-hobby woman, R2-3 affordable weekend (R2-4, R2-5 are buyers) | after Round 1 fixes |
| Round 3 | `reviews3/` | R3-1 to R3-5 | R3-1, R3-2, R3-3 same three personas (R3-4, R3-5 are buyers) | after `ROUND2-FIXES.md` |
| Final inspection | `final-inspection/reviews/` | C1 to C5 | C1 tired 9-to-5, C2 creative hobby, C3 friends planner, C4 budget weekend, C5 supplies shopper | **an earlier build, before the Wave B and Wave C fixes** |
| Marketing | `marketing/` | M1 to M6 | page-level "sell-appeal" expert reviews | pre-fix |

The final inspection (C1 to C5) was run on a build that did not yet have the fixes listed in section 5, so some of its complaints are already addressed. No re-run on the current build exists. No such re-run has happened (see section 10).

## 2. Round 1 (single reader, different scale, shown separately)

Round 1 used one reader and a different set of rows, so it is NOT averaged with later rounds.

| Report | Rows as scored |
|---|---|
| Review 1 first visit | first impression 8, clarity 6, aesthetic 8, trust 6, usefulness 7, would come back 5 |
| Review 2 articles/trust/buying | article interest 7, phone readability 6, voice authenticity 5, trust 5, product desirability 3, "I would buy" 3 |
| Review 3 tools | fun 7, clarity 8, usefulness of results 6, trust in results 6, "I would share this" 5 |

## 3. Per-dimension table, customer personas only

Order in each cell: the individual scores, then the mean. R2 = R2-1, R2-2, R2-3. R3 = R3-1, R3-2, R3-3. Final = C1, C2, C3, C4, C5. Means are rounded to two decimals (R2, R3) or one decimal (final, n=5, exact).

| Dimension | R2 (n=3) | R3 (n=3) | Final inspection (n=5) |
|---|---|---|---|
| First impression | 8, 8, 7 = 7.67 | 8, 8, 7 = 7.67 | 7, 8, 8, 8, 7 = 7.6 |
| Aesthetic appeal | 8, 8, 7 = 7.67 | 8, 8, 8 = 8.00 | 8, 8, 8, 8, 7 = 7.8 |
| Navigation | 6, 8, 7 = 7.00 | 7, 8, 7 = 7.33 | 7, 8, 7, 7, 7 = 7.2 |
| Emotional connection / editorial authenticity | 7, 6, 6 = 6.33 | 7, 6, 7 = 6.67 | 6, 7, 6, 7, 7 = 6.6 |
| Usefulness | 8, 8, 5 = 7.00 | 8, 8, 6 = 7.33 | 8, 8, 7, 7, 6 = 7.2 |
| Trust | 7, 7, 8 = 7.33 | 7, 7, 8 = 7.33 | 5, 7, 7, 8, 7 = 6.8 |
| Product desirability | 7, 5, 6 = 6.00 | 7, 5, 6 = 6.00 | 4, 5, 6, 5, 4 = 4.8 |
| Willingness to purchase supplies | 4, 5, 4 = 4.33 | 4, 6, 5 = 5.00 | 3, 6, 5, 5, 5 = 4.8 |
| Willingness to return | 7, 7, 6 = 6.67 | 7, 7, 6 = 6.67 | 5, 7, 7, 7, 6 = 6.4 |
| Willingness to share | 7, 6, 6 = 6.33 | 7, 6, 7 = 6.67 | 6, 7, 6, 7, 6 = 6.4 |
| Business credibility | 5, 6, 7 = 6.00 | 5, 6, 7 = 6.00 | 3, 7, 6, 7, 6 = 5.8 |

Notes on reading the table:
- R2 and R3 also scored "buyer readiness" (R2: 5, 5, 4; R3: 5, 5, 5). It is a different construct and is left out of the table.
- The three R2 and R3 personas are the same personas, run blind each time against a changing build. The five final personas include two new ones (C4 budget weekend, C5 supplies shopper) and re-use the other three roles.
- Round-to-round movement is within what a different run of the same AI persona could plausibly produce. Do not report it as an effect of the fixes.
- Final-inspection product desirability (4.8) and supplies purchase (4.8) are lowest of all dimensions, driven by C1 (4 and 3) and C5 (4 and 5). C1 judged the shop mostly from a tired-evening point of view and found most items free or already owned.

## 4. Marketing-expert sell-appeal (separate construct)

`marketing/M1` to `M6` give page-level "sell-appeal" scores (1 to 10) from simulated marketing reviewers. This is not the same construct as customer sentiment and is not averaged with it. Individual scores as stated in the reports:

- Home: first 5 seconds on phone 7, overall 6.5 (M1). Header and menu 6, footer 6, Start Here 5, About 5, 404 6.5, brand voice 7.5, sharing/OG 3.
- Hobby layer (M2): directory 5, category pages average 5 (Creative Corner 6, Movement 4, Table for One 4, After Hours 5, Weekend Edit 5, Better Together 5). Profiles ranged from 3.5 (Yoga, Running, no products) to 7 (Junk Journaling, Watercolor, Mahjong).
- Articles (M3, M4): individual articles ranged from 4 (cycling) to 8 (cozy solo dates, girls' night, 35-hobbies roundup, after-work, solo dates). M4 states a set average of about 6.8 for its 14 articles. Journal index 5, article template 6.
- Shop (M5): shop index 5, collection with filled kit 6, collection with no named products 3, named product card 6, type-level card 4, saved list 4, overall "somewhere she wants to shop" 5.5.
- Tools and trust (M6): quiz questions 8, quiz results 6, planner form 6, planner result 5, tonight 6, budget 5, saved 5, search 5, contact/corrections 3, 404 8, Pinterest CSV 6.
- Common M-verdict: strong mood and honesty, weak "reason to act": no hero button, no product photos or prices, shop reads as a policy page, contact dead end. `marketing/IMPLEMENTED-M1.md` to `M6.md` record what was changed in response.

## 5. Recurring concerns (raised by more than one reviewer)

| Concern | Raised by | Status now |
|---|---|---|
| No working way to contact the site | R2-1, R3-1, R2-4, R3-4, R3-5, C1, B1 and others | **STILL OPEN.** `src/config/site.ts` `contactEmail` is empty by design. Owner action: mailbox `hello@` is planned in `docs/cowork/OWNER-ACTIONS.md` (Wave 2), not confirmed done |
| No prices, product photos or ratings on product cards (icon tiles only) | R1, R2-2, R3-2, C1, C2, C3, C5 | **STILL OPEN, partly by rule.** Business rules forbid inventing prices or ratings. Real photos need permission (`docs/commerce/photo-permission-emails.md`, owner optional action 10) |
| Thin shop: four collections (Sporty, Bookish, Little Adventures, Cozy) have no verified named product | R2-2, C5, C1 | **PARTLY.** WAVE-B-SHOP made these pages honest ("where to start", guides and what to look for). Verification of more products sits in Cowork queue `docs/cowork/PRODUCT-VERIFICATION-QUEUE.csv` |
| Anonymous "Editors" byline, same-day publication dates, templated pieces | R2-2, R2-4, R3-2, R3-4, C2, C3 | **STILL OPEN by decision** ("no named publisher", `OWNER-ACTIONS.md`). Reduces authenticity scores; EDITORIAL-CLEANUP varied openers, closers and chips only |
| AI-looking, repeated images | R1, R2-2, R3-2, C3, C5 | **PARTLY.** ROUND3-FIXES capped any one image at 3 uses across 34 articles and reassigned four heroes. Images remain AI and few |
| Generic or vague plans, "Varies" cost chips | R2-3, R3-3, C3, C4 | **PARTLY FIXED.** Wave B planner fixes and EDITORIAL-CLEANUP replaced or removed the chips. Venues, travel time and local specifics are not invented (by rule) and so remain absent |
| No reason to come back (no reminder, email or sync) | R1, R2-1, C1, C2, R3-5 | **STILL OPEN by decision** (no newsletter, accounts or database in scope) |
| No native share on the planner and shop list, only copy | C3, C5, R2-1 | **PARTLY.** ROUND3-FIXES unified share URLs and the /saved copy. Native share exists on some surfaces, copy-only on others. Not re-tested |
| "We don't currently earn" text next to `rel="sponsored"` | R3-4, C5 | **KEPT ON PURPOSE.** The rel hygiene was a reviewer request (ROUND3-FIXES 1); disclosure text now comes from `commissionStatement()` |

## 6. Reproducible defects and their status

Fixed means a change is recorded in a fix document and (where noted) covered by a test. "Not re-tested" means I did not re-run it. I did not build or run the site for this file.

| Defect | Found by | Status | Source of the fix |
|---|---|---|---|
| Tonight "Read the guide" link did not match the idea | R2-1 | FIXED | ROUND2-FIXES 1 |
| Quiz result cards had no Save button | R2-1 | FIXED | ROUND2-FIXES 2 |
| Mobile menu had no About, Contact, Disclosure links | R2-1 | FIXED | ROUND2-FIXES 3 |
| Contradictory junk-journaling essentials (4 / 5 / 6 items) and overlapping articles | R2-2 | FIXED | ROUND2-FIXES 4 to 6 |
| Planner had no budget step above $50; generic "drop-in class" outranked specific ideas | R2-3 | FIXED | ROUND2-FIXES 7 |
| Plural grammar "low-energy hobbies has more gentle ideas" | R2-1 | FIXED | ROUND3-FIXES 3 |
| "our guide to our guide to" typo | C1 | FIXED | COMMERCIAL-AUDIT fix 1 |
| Unsourced claim "huge moment among women's social clubs" | commercial audit | FIXED | COMMERCIAL-AUDIT fix 2 |
| Group plan returned a "Two-person book club" | C3 | FIXED | WAVE-B-TOOLS 1 |
| 17h 30m weekend plan (two days summed) | C3, C4 | FIXED | WAVE-B-TOOLS 2 |
| "Order a kit ahead" inside a "nothing to book" plan | C3 | FIXED | WAVE-B-TOOLS 3 |
| Free plans silently assumed gear | R3-3 | PARTLY: now says "borrow or own, not included in cost"; gear not filtered out | WAVE-B-TOOLS 4 |
| Silent default choices in the planner | R3-3 | FIXED ("Based on" chips, "(default)" tags) | WAVE-B-TOOLS 5 |
| Budget tool wording; saved plan cards lacked date and cost | R3-3 | FIXED | WAVE-B-TOOLS 6, 7 |
| How-to sections collapsed on phone | C3 | FIXED (all sections open) | WAVE-B-TOOLS 8 |
| Wrong Pinterest image on hobby pages; pin set 22 pointed at a non-published route | C2 | FIXED | WAVE-B-TOOLS 9 |
| High-energy filter and thin "half a day" plan | R3-3 | FIXED | ROUND3-FIXES 5 |
| Share links used the local origin | R3 reviewers | FIXED (canonical URL everywhere) | ROUND3-FIXES 7 |
| Quiz result tiles were flat yellow placeholder blocks | R2-1, C1 | FIXED (compact chip row) | ROUND3-FIXES 11 |
| Collections borrowed another collection's kit; padded kit items | C3, C5 | FIXED | WAVE-B-SHOP |
| Hero image repeated 4 or more times | R2-2, C3, C5 | PARTLY (max 3 per image) | ROUND3-FIXES 10 |
| First tap ignored before the page was ready | R2-1 | FIXED per TECHNICAL-QA (`scripts/first-tap-check.mjs` passes at 4x CPU); ROUND2-FIXES had recorded "not done"; not re-tested here | TECHNICAL-QA |
| Search ignored natural phrases with "hobby"; 5,000-char query overflowed; smooth scroll with reduced motion | C4 / TECHNICAL-QA | FIXED (D2, D3, D4) | TECHNICAL-QA |
| "Varies" cost chips; "Picture it" openers; plan callouts at the end of nearly every article | R3-2, C3, C4 | FIXED across 22 articles | EDITORIAL-CLEANUP |
| Paint-night / book-club / girls-night articles show canvases that do not fit | C3, COMMERCIAL-AUDIT 1 | **UNCLEAR.** Wave B kit ownership fixed the kit blocks, but EDITORIAL-CLEANUP still lists the "More in The Pottery Era" label under paint night as unchanged, and no document records the book-club and girls-night canvas fix. Re-check live |
| Internal "coworkChecks" and catalog notes inside the client JS bundle | COMMERCIAL-AUDIT 3 | **OPEN or unverified.** WAVE-B-TOOLING gates publishing but I found no record of removing the fields from the bundle |
| Remaining dollar chips ("Under $25") in one article | COMMERCIAL-AUDIT 5 | **OPEN** (editorial decision) unless EDITORIAL-CLEANUP chips covered it |
| Shop heading levels (h1 to h3), long meta titles, 404 title, sitemap headers | TECHNICAL-QA R1 to R4 | **OPEN, low** |
| Contact page offers no way to write | all | **OPEN** (see section 5) |

## 7. Strengths (several reviewers agree)

- Warm, cohesive look and clear first screen; scored 7 to 8 on first impression and aesthetics in every round.
- The Tonight tool and quiz: zero or six taps, no email, shareable result (R2-1, C1, C4).
- Honest tone: disclosures, "rough estimate", "no invented events", "nothing sent", local-only saving with a backup/import code (R2-3, R3-3, C4, C5 trust 7 to 8).
- "Copy plan" and "Send to the group chat" text is chat-ready ("Who's in?") (C3, R2-3).
- Deep guides where complete: junk journaling and the pottery kit with one pick and a reason (C2, C5).
- Technical quality: `TECHNICAL-QA.md` reports no critical or high defects, all internal links resolve, 98 sitemap pages, keyboard and 320 px checks pass.

## 8. Where interest dropped

- Contact page with no contact, then "we don't currently earn" with no named people (C1, R2-1).
- Product cards with an icon tile, no photo, no price (C2, C5, C1).
- "Varies" on almost every cost chip in the cheap-adventures list (C4; later cleaned).
- Plans that ignored the answers: two-person book club for a group, 17.5 hour weekend (C3; later fixed).
- Half the shop with no named pick (C5).
- No hook to return and nothing saved across devices (C1, C2).

## 9. Journeys A to E (owner's brief), outcomes

Evidence is simulated. "Reached" means the persona completed the path, not that a real person would.

**A. Discover a hobby, then guide, then supplies, then a product.** Reached in about three clicks (R2-2, C2, C5). Junk journaling and pottery were praised. Stalled at the product: no photo or price, so personas said they would verify on Amazon anyway. Supplies purchase scores in the final round: C2 6, C5 5 (clay kit yes, others need outside research).

**B. Low-energy budget evening.** Strong. C1 got three ideas with no taps and a six-tap quiz result; C4's $40 plan added up and the sums were checked. Drops: "Varies" costs, "cheap date" search returning non-date items, shop picks with no price against a lean budget. C1 supplies score was 3 because most ideas were free.

**C. A realistic Saturday.** Mixed. Budget and time were honoured in C3 and C4 runs, but usefulness scored 5 (R2-3), 6 (R3-3), 7 (C4). Missing: places, travel, local detail. The 17.5 hour weekend and "ahead of time" items are fixed; vague items remain. Real places are deliberately not invented.

**D. Girls' night.** Positive on content (mahjong and "25 ideas that aren't drinks" read as real hosting advice, C3). C3 would message her group and consider the mahjong set or mat, but not without a price. Fixed since: two-person book club, kit-ahead wording, collapsed sections. Open: no native share on the planner, kit price visibility, possible mismatched canvases.

**E. Save, share, rediscover.** Works technically (C1 saved two items, reloaded, found them under /saved; C3, C4, C5 same; import/export tested in TECHNICAL-QA). Drops: "this device only" with no reminder, icon-only bookmark, copy-only "group chat" on some surfaces. Return scores in the final round: 5, 7, 7, 7, 6.

## 10. What a real human test must confirm

All of the above is AI opinion. A real test is the only way to learn whether any of it holds. Use `docs/marketplace/USABILITY-TEST-SCRIPT.md` (3 to 5 women, 20 minutes each, their own phone, no coaching, no names or faces recorded; report human results separately from these AI results). Specifically confirm:

1. Whether the first screen makes people tap something (all AI personas said yes; humans may differ).
2. Whether people actually find the Tonight tool and the quiz from the home page.
3. Whether the missing contact address and "we don't currently earn" cost trust, or whether it reads as honest.
4. Whether no-photo, no-price product cards stop people clicking "See it on Amazon".
5. Whether the plan "feels like something I would actually do on a Saturday for about $40".
6. Whether people share anything, and how (native share sheet, copy, screenshot).
7. Whether AI imagery and an anonymous byline matter to real readers.
8. Whether the save-on-this-device model survives a real phone, a changed phone, and cleared data.
9. Real devices, real share sheets, real clipboard, slow networks (not tested by the AI runs, see C1).

Also planned but not yet done: a blind re-review on the live URL after the release deploy (Cowork workstream K in `docs/cowork/COWORK-FINAL-PACK.md`). No claim in this file covers the live site.
