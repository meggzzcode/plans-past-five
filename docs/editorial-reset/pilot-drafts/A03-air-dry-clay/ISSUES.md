# A03 ISSUES (unresolved; nothing hidden)

## Blocking before any publication

1. **Amazon verification, all five products.** No ASIN, listing, seller, variant, availability or affiliate eligibility has been verified. All ASINs are leads from search. The Galeria listing's size field ("8 Fl Oz (Pack of 1)") conflicts with 20 x 12 ml. The sealer is conditional on confirming the Amazon product is the Mont Marte clay sealer. Needs Cowork. If any product fails, its block is deleted, not replaced with filler.
2. **Amazon disclosure wording.** Placeholder only: "DISCLOSURE: [Amazon-required Associate statement, wording pending verification]". docs/commerce/AMAZON-DISCLOSURE.md records the sentence "As an Amazon Associate I earn from qualifying purchases." read 2026-11-18 and src/config/affiliate.ts currently holds that wording, but Cowork's re-read of Associates Central is pending, so it is not hard-coded in the copy. Placement ("clearly and prominently") has no finer rule in what was read.
3. **Our own disclosure line may be untrue today.** "we may earn a commission" is only accurate once the Amazon entry is live; affiliate.ts has separate "not currently earning" wording. The renderer chooses the wording by state; the copy here must become the component, not static text.
4. **Image rights, everything uncleared.** No product image is cleared (no press kits at Mont Marte, F.I.L.A., Colart). No article image exists yet: nine slots are briefs only. Any AI image needs a docs/IMAGE-LICENSES.md ledger row and an "Illustrative image, AI-generated." caption. Rights and exclusivity of Canva/Lovable-generated images are unverified.
5. **Step photographs.** E3 forbids generated step images. Slots 4 to 6 (process shots) require a real person to make the pieces and photograph them, or those slots are omitted. Nobody has made them.
6. **The project steps have not been made by anyone.** Steps are adapted from maker tutorials as summarised in the research (Mont Marte tray tutorial dimensions are in the research; the pinch-pot and cutter-dish steps are generic and not quoted from the makers' pages). Specific technique wording such as "a piece about the size of a small plum", "thumb in, stopping before the bottom", "roll a thin coil", "press a pattern with a toothpick, fork or spoon back", "sand lightly" is editorial and UNSOURCED. A person who has made the pieces must check these before publication.

## Weakly sourced or conflicting claims

7. **Thickness.** Makers disagree (1/4 in Crayola; 1 cm Mont Marte; 1/2 in Sculpd, 3/4 in larger). The article quotes all three and tells her to follow her clay's maker. The Mont Marte block's own minimum is not stated in the research beyond the tutorial's 1 cm.
8. **"Waterproof".** Deliberately not used. Mont Marte and Sculpd listings use it; Crayola and Sculpd's help contradict. A reviewer may want a firmer line.
9. **Drying ranges.** Quoted from makers (24 hours to earthenware hardness, 24 to 48 hours, 24 hours to touch and 72 hours completely, 24 to 72 hours before varnishing) with their caveats. The "about a week" total, "about two hours" shaping time and the timeline strip are EDITORIAL ESTIMATES, not tested. DAS gives no time online.
10. **Mont Marte FAQ date.** The FAQ shows a page date of 09 Oct 2026; quoted as shown. Sealing order: Mont Marte's 2020 tips say seal before painting; its 2025 tutorial and Crayola say after. We follow the newer and Crayola.
11. **Sealer drying between coats.** Maker FAQ says "a few hours"; stockist and Amazon wording say about 30 minutes. Article says check the bottle. Mont Marte USA should confirm.
12. **Outdoor use.** Mont Marte allows sealed outdoor display (research); Crayola says indoors. Article follows the more cautious maker. A reviewer may find the sentence thin.
13. **"Sculpd says not to apply heat ... we would not use one near a flame."** The second half is our extrapolation. Remove if the reviewer thinks it is beyond the source.
14. **Galeria safety certification.** The research notes an ACMI AP seal statement on the maker page. The article does not repeat it (no exact wording captured). The Liquitex "safety certification" and DAS "easily washable" are maker-attributed; DAS "dermatologically tested" and "non-toxic" are left out on purpose (retailer wording only).
15. **No independent evidence anywhere.** Every product statement is maker-supplied or a stockist; no independent test was found. The article says so for the clay only; consider saying it for all five.
16. **"Dried face-down"** (research technique column for project 2) is not sourced to a maker line, so omitted.

## Empty slots and research gaps

17. **Brush.** The research says four purchases (clay, paint, brush, sealer) but contains no brush product row. The article leaves the brush slot empty and explains why only generically. If a brush is wanted it needs a research round.
18. **Empty by design:** boxed gift kit (Sculpd 78 held for owner decision), cutters and tools (Ateco 1441 held), paint pens, terracotta, spray/gloss finish. The E1 brief expected "rolling pin and craft knife (household)", "sandpaper": handled as household items.
19. **Quiz and Make Plans handoff.** No clay activity id for `with=` was found. The destination "The Creative Edit" has no confirmed route (old `creative-corner` category still exists).
20. **Customer voice.** No forum or customer review was read (unreachable). Customer fears (cracks, kid-made look, mess, safety) come from E1/M1 and the earlier pilot intent, not from this pass's research.

## Layout vs the current renderer (E2)

21. The article assumes `project` layout, a `steps` block with photos, a `timeline` block, a `productEdit` block with product ids and editor notes, and a "what it can and cannot be" callout. E2 says none of steps-with-photos, timeline or productEdit exist; `first30` gives numbered text steps; `whatYoullNeed` gives essentials and optional extras; `quote` and the existing image block exist. A comparison table is not used. The draft will render in the current renderer only as text with a bullet timeline.
22. Photo-less product cards are the current default and the E2 note is that large placeholder tiles read as unfinished. Five cards, three of them "alternative", on a page with no photos, risk the same effect; consider the "list, no pictures" style.
23. Per-product disclosure: the draft repeats the disclosure at top and at the head of the shopping block (E3 asks for both); E2 notes the renderer already repeats it 2 to 5 times. Possible over-repetition.

## Voice, rules and judgement calls

24. The draft states we have not made these pieces. This is honest but reads against the "friend with excellent taste" voice; a reviewer should decide the right level.
25. "Expect the first dish to come out a little lopsided" is a prediction, not an experience claim, but it sits near the line.
26. "Easy" in the meta title and Pinterest titles is editorial, not a claim, but is subjective.
27. Words checked against E3's banned list; no "best", "perfect", "must-have", "tested" or "waterproof". One exclamation mark: none. A final read by someone else is advised.
28. No prices, no price bands, no star ratings, no scores. Internal scores appear in PRODUCTS.md only.
29. Length: the Body section is 2,867 words by script count including image briefs, tables, flags, product blocks and FAQ. E3's Starter Guide range is 1,200 to 1,800 body words; the reader-facing prose was not counted separately, so the fit is unconfirmed and may run long.
30. Hero brief shows hands pressing clay; E3 says generated "result" images and safety-relevant demonstrations must not be presented as instruction. The brief limits it to mood, but clay-technique accuracy must be checked on any image.

## Pinterest, SEO, other

31. Pinterest AI-label policy not read. Pin copy, board names and UTMs undecided.
32. SERP observations are from E1 and the earlier pilot, not re-run. HowTo markup deferred; Google support status unverified.
33. The preview in preview/ is not the production renderer. It uses system serif/sans fallbacks (Fraunces/DM Sans not loaded locally) so the typography is approximate.
34. This folder is untracked; nothing was committed or pushed.
