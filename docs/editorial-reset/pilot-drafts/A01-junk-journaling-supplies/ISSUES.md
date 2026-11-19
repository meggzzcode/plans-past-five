# A01 ISSUES (every unresolved item; nothing here is resolved)

Severity: BLOCKER (cannot publish), MAJOR (should resolve before publish), MINOR.

## 1. Verification (all BLOCKERS)

1. **No ASIN is verified.** Every ASIN came from an amazon.com URL in search results. Amazon returned 503 to a direct fetch, so no listing, variant, seller, stock or contents was read. Status for all products: needs Cowork Amazon verification. Until done, no product link may go live.
2. **mt washi seller (BLOCKER for the washi slot).** One mt listing was reported as sold by a third-party reseller (Monster-Stationery); US distributor per Faire is Sweet Bella; no evidence any Amazon seller is authorised. Three of the seven product blocks, and the highest-scoring product (86), depend on this. If it fails the article loses its palette-setting item; fallback is Archer & Olive washi (unverified, sold out at maker) or an empty slot, which would break the "three directions" structure.
3. **Rifle sticker set contents (BLOCKER for Garden Press' flourish).** Count is reported as 128, 130 or 150 across sources; maker page rendered no description. Seller "Rifle Paper Co." is a search-summary claim only. Scores exactly 80 (the line).
4. **Strathmore, Tombow, Sakura sellers** unconfirmed; Sakura authenticity risk on third-party sellers; Strathmore gray listing carries a conflicting "paper weight 67" field.
5. **Maker pages not read this pass:** the mt product page (adhesion, removability, tearing unknown); Sakura page was read in v1 but a same-day refetch returned empty; Fiskars (503) and Staedtler (404) unread. The Sakura quotes in the article rest on the v1 reading.
6. **Strathmore "48 pages".** The maker page says 48 pages; the article reads this as 24 sheets. The research note that 24 sheets is "about a dozen two-page spreads" is inconsistent with 48 pages if pages are sides (it would be about 24 spreads). The draft therefore avoids any spread count. Check the maker's definition.
7. **Look of each direction is unverified.** Colourways come from listing titles; no product image was seen. The palettes, "warm, black and gold", "pale blue", are inferred. Check by sight before publishing the direction names.

## 2. Image rights (BLOCKER for any product image; MAJOR otherwise)

- No product imagery is cleared for any product. Amazon listing imagery is not used. Maker assets or press programmes were not located. All product cards stay photo-less swatch cards by default.
- Mood images (hero, Slots A to E, four pins) are editorial/inspirational. Real photography is preferred; if AI is used it needs the licence ledger entry (`docs/IMAGE-LICENSES.md`) and the caption "Illustrative image, AI-generated." Canva/Lovable commercial-use and transfer terms are recorded but exclusivity and transfer are unverified.
- E3 forbids illustrative images that imply what a specific product looks like. The brief for the washi still lifes says "generic" and "no brand pattern"; an AI model can still drift toward a real mt pattern. Review each image against that.
- Pinterest AI-label setting was not re-read against the current policy.

## 3. Trademark (MAJOR)

- "Letters Home": a LETTERS HOME mark exists for a book series (Waterloo House LLC, serial 77435065), different class; no stationery mark seen. "Postmarked" was avoided because of Levenger's collection.
- "Garden Press" and "Sunday Blue": nothing found; nearest is SUNDAY PLANNING (registered, paper goods).
- All checks were quick web searches, NOT legal clearance. A USPTO search (Class 16 and related) is still needed. The names are used only as editorial section labels, never as product or brand names; a lower-risk option is to rename to plain descriptors ("Warm and postal", "Botanical", "Quiet blue").

## 4. Disclosure wording (MAJOR)

- The Amazon-required statement is a placeholder. The code constant ("As an Amazon Associate I earn from qualifying purchases.") has NOT been re-read from Amazon's current Operating Agreement by Cowork for this stage (TODO in `src/config/affiliate.ts`).
- Our own plain-language line ("we may earn a commission if you buy, at no extra cost to you... does not decide what goes in this edit") is NOT Amazon-prescribed and must be checked. PLAN section 0000 warns that the owner's card line must be checked against the Agreement.
- E3 asks for the disclosure at the top and at the head of each shopping block, PLAN asks to avoid repetitive disclaimers. The draft uses top-of-page plus one short repeat at the end matter; the right cadence is undecided.
- Associates account status is unconfirmed (PLAN: treat as registered, pending final approval). The page must not imply approval. The Associates statement itself should be live only when the Amazon entry is live.
- Tracking and the tag `planspastfive-20` are not active; destinations in PRODUCTS.md are prospective only.

## 5. Renderer limits (MAJOR; see E2)

- Current renderer has one article template, no layout field, and none of the blocks this draft assumes: no `productEdit`, `compare` table, direction switcher or tabbed product block. The draft's "choose your direction" is written as sequential sections; the research's desktop switcher and mobile tabs are not possible without E2 changes.
- Product cards without photos render as typographic tiles that E2 found read as placeholders and, on shared categories, look identical. This edit has seven cards and no photos.
- `shopTheArticle` selects products by tags, not by an editor-chosen list; E2 flags that the owner cannot control which products appear.
- Disclosure currently repeats up to 3 to 5 times per page (E2); this conflicts with the "without repetitive disclaimers" instruction.
- The preview here is an editorial copy preview, not the production renderer; its look is indicative only.

## 6. Weak or unsupported claims, and doubts (MAJOR/MINOR)

- Every "archival", "acid-free", "PAT" and "waterproof" statement is a maker claim passed on and attributed; none is verified. The scrapbooking section deliberately defers to a conservator for irreplaceable prints. A safety/archival reviewer should read it.
- "mt is a Japanese company dating itself to 1923, with mt launched in 2008" rests on a history page read in v1; no product page.
- "Do not promise it will not warp" for Strathmore: no evidence either way.
- The Tombow "won't warp or wrinkle paper" maker claim was deliberately left out because it conflicts in spirit with our no-claim stance on Strathmore; check whether we want to quote it with attribution.
- "Scissors: compared five pairs" is true of the research table (S1 to S5) but the reader-facing sentence does not say why Kokuyo failed; this is intentional to avoid naming an unverified seller problem in public copy. Debatable.
- "Kits we compared: four": true per research (K1 to K4). The article describes K1 without naming it (no brand named, no link). Whether to name a rejected-or-undecided product is an editorial decision.
- The article says "a lovely writing notebook can be the wrong book for glue"; this alludes to Leuchtturm (80 gsm, maker). No brand is named; fine, but weakly evidenced as a general statement.
- The "one pick per job" premise: three washi sets across three directions is arguably three picks for one job; defended as "one set per direction".
- The pen set contents (01/03/05) come from the research label for the 30061 blister; unverified on the listing.
- The closing says "Order the four things this week": Garden Press is five items; Letters Home and Sunday Blue are four. Acceptable but loose.
- Length: roughly 2,400 words versus E3's 800 to 1,300 target for the Edit format (see ARTICLE.md note).
- "No best claims": the draft uses none, but "sturdy", "handsome" and "dependable" are our adjectives for products we have not handled; judge whether these imply testing.
- The E1 brief said the edit would cover "two adhesives (glue stick or tape runner, plus a liquid glue)" and "small scissors or craft knife (safe-use note)". The research gate left liquid glue and scissors out; the draft follows the research, so it departs from E1's product types and has no craft-knife safety note (a craft knife is not recommended).
- The E1 expected "six things worth buying"; the edit gives four or five. Intentional.

## 7. Other open items

- Byline, "last checked" date and update cadence are placeholders; no invented author.
- Paper Edit collection path does not exist (LINKS-AND-TOOLS.md). Legacy `journaling-era` tags remain.
- Make Plans handoff query not run end-to-end.
- Gift box: concept only; depends on the mt seller check; K1 might later become a ready-made gift kit if its contents are verified.
- Carrying/storage (Poppin accordion file, 79) and decorative for Letters Home remain open: a new Cowork look could close them.
- A02 shares no product with A01 (by design): A02 is out of scope here and its product set was not re-checked.
- Hero and mood photography: medium burden per E1 (one styled shoot of purchased units); no budget or schedule is planned.
- Customer-voice evidence is thin: Reddit and forum threads were not reachable in the research; M1's customer insights are carried, labelled research-supported or assumption there, and not re-derived.
