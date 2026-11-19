# C5 Supplies Shopper review

**SIMULATED SENTIMENT from an AI persona (beginner hobby-supplies shopper), not real customer research.**
Site: http://127.0.0.1:5990 (production build). Desktop 1280 and phone 390, Playwright/Chromium, own screenshots. No purchases, no submissions, no external sites opened (link targets read from the DOM only).

## What I did, step by step

1. **Shop hub (/shop).** Expected a product grid. Got a pink hero ("Start the hobby. Buy one thing."), eight "Which era are you in?" collection tiles, "Three good first buys" (mahjong, clay kit, journal) and a "Give someone a first evening" gifting pair (second mahjong set, embroidery kit). Clear, calm, no prices. Only 5 product cards on the hub, so it reads as a curated edit rather than a store.
2. **Picked a hobby: The Pottery Era.** Strong page: "Shape it tonight, paint it tomorrow", 4-item kit with "2 to start, 2 for later", a food-safety warning on painted clay (good, honest), "Your one pick to start" (UHAPEER air-dry clay kit), "Then add" acrylic paint, "Pretty extras for later" brushes and sealer. This is exactly the answer to "what is the best first purchase". Per-item "Why we picked it" cites the listing.
3. **Best first purchase** judged per collection: clay kit (Pottery), A5 journal (Creative/Journaling), blue-tile mahjong set (Girls' Night In), 48-colour watercolor (Little Adventures, Creative). Sporty, Bookish and Cozy gave no pick (see below).
4. **Compared 8+ named product cards across collections:** UHAPEER clay kit, Shuttle Art acrylics, Benicci brushes, Mod Podge sealer, ESRICH canvases, Stationery Island journal, Scotch glue sticks, Mr. Pen washi, Pigma Micron pens, Artecho watercolor, TIASUSAN and MUTEX mahjong, Bradove embroidery. Cards are icon tiles ("CLAY KIT / Shape it tonight") with brand, one-line description, reason. **No product photos at all**: every card is a pastel icon block. Desirability suffers: I cannot see what I'd receive; I'd have to click out to Amazon to judge.
5. **Links.** Named picks go to amazon.com/dp/ASINs (e.g. B0DFH9Z3BC clay, B081VK1CM1 journal, B0F6SDSQGF mahjong), target _blank, rel="sponsored noopener noreferrer". "Find X on Amazon" buttons go to amazon.com/s?k= searches (clearly labelled and explained). Not opened. Mild contradiction: the page says "We don't currently earn from these links" yet the rel attribute says "sponsored". Harmless to a shopper, but a trust-minded reader may notice.
7. **Shopping list.** Tapped "Add to my list" on the clay kit: label changed to "On my list". Added more (paint, brushes) from the small "add" icon on cards (icon-only on later items, no visible text after adding; ambiguous but has aria-label). /saved ("My Plans") lists items under "To buy" with "Got it / Later / Already own". "Copy as text" produced a clean checklist ("[ ] Acrylic Paint Set... Amazon: https://www.amazon.com/dp/..." with a date and an availability caveat); confirmed on the clipboard and showed "Copied as text." "Send to the group chat" copies the identical text ("Copied. Paste it in the chat.") (no native share sheet, just a copy). Also Download backup .json / copy backup code / import. Honest "Saved on this device only" notice. Quirks: list item names are the long Amazon titles ("Air Dry Clay Kit for Adults, Pottery Set for Beginners") rather than the short names on the card; list order is not the order I added; "Got it" moves item straight away with no undo prompt (there is "Back to my list").
8. **Completeness.** Only 3 of 8 collections have a full starter kit with named products: Pottery, Creative (and Journaling, which is a near-copy of Creative's kit). Girls' Night In has one pick (mahjong) plus searches. **Sporty Girl, Bookish Girl** have *zero* named products: six "Find X on Amazon" search buttons each, with the honest note "No named picks here yet: we only name a product once we've read its Amazon page." Cozy After Hours and Little Adventures borrow another collection's kit (Cozy shows "Pottery and paint night kit" with "More in Girls' Night In"; Little Adventures shows the Creative Girl watercolor kit). So the shop feels about 40% finished; the rest is a to-do list with search links.

## Defects and oddities seen
- Collection tiles on /shop reuse imagery: Creative Girl and Journaling Era share the same watercolor/hoop photo; Bookish Girl and Cozy After Hours share the same books/lamp photo. Pottery page's "More collections" repeats those too.
- Sporty page: "What you actually need" lists "Water" and "Insulated water bottle" and, under extras, both "Sports tote" and "Tote bag", and "Water bottle" as extra AND a "Already have it" skip item. Bookish: "Start with: A library book or one you already own / A book / A group or a library listing" ("A book" is filler). These read like auto-generated list padding.
- Collections' dedupe: "Prefer something different? (1)" expanders exist on several cards (alternatives), good, but the Pottery page then repeats the whole "Where to start" for Girls' Night (canvas kit) under a Pottery heading, slightly confusing.
- Full-page screenshots showed blank pink tiles in "More collections" and some images reported naturalWidth 0; that was lazy-loading only. With slow real scrolling all images loaded (1024/1440 px), so not a real bug.
- No horizontal scroll at 390. Phone layout is clean; the tilted "illustrative styling, not specific products" polaroid is a nice honesty touch.
- No console errors.

## Answers
- **Continue exploring?** Yes on Pottery/Creative; interest dropped on Sporty and Bookish (opening page: just search links, no photos, no pick).
- **Trust the publication?** Largely yes: no prices, plain affiliate and "how we choose" statements, food-safe warning, "illustrative styling" labels. Small dent from the sponsored-rel vs "don't earn" wording, and from "we read each Amazon page ourselves" next to collections that have not been read.
- **Try a recommended hobby?** Yes, air-dry clay (low cost, single box, clear first evening).
- **Click a product?** I would click the UHAPEER clay kit "See it on Amazon" (all-in-one, reason given, gift-friendly). I would not click the Mr. Pen washi tape or Mod Podge (nice-later, no visuals). Not clicked (no external sites).
- **Purchase supplies?** Probably the clay kit and paints via Amazon, but with hesitation: no photos, no prices, no ratings, so I'd verify everything on Amazon anyway.
- **Save?** Yes, works (shopping list plus hobby/article saves exist: bookmark icons on article cards, "My Plans").
- **Share?** List copy works; "group chat" is just a clipboard copy; no share on product cards. Pinning/share links on shop pages: none seen.
- **Return?** Maybe for the next kit; only if the empty collections get filled.

**Strengths:** one-pick-per-kit clarity, honest skip/borrow advice, clean list copy/export, calm tone, phone layout.
**Frustrations:** no product images, 4 of 8 collections without picks, reused collection photos, list-padding text, no prices anywhere (a beginner budget question goes unanswered: "Under $50 to start" appears only on hobby blurbs).
**Unanswered:** roughly what will the clay kit cost; is there a total for a full Pottery evening; which brush/paint is actually needed beyond the kit?

## Scores (1-10)
- First impression: 7 (warm, confident hero, but a pink void of text on the hub)
- Aesthetic appeal: 7 (polished palette/type; duplicate photos, icon tiles instead of products)
- Navigation: 7 (clear tiles, breadcrumb, nav; hub to kit to list is smooth)
- Editorial authenticity: 7 (voice, caveats, "why we picked it"; some generic padding)
- Usefulness: 6 (excellent where complete, thin on half the shop)
- Trust: 7 (transparent about links; minor wording conflict)
- Product desirability: 4 (no photos, no prices, icon placeholders)
- Willingness to purchase supplies: 5 (clay kit yes; others need research elsewhere)
- Willingness to return: 6
- Willingness to share: 6 (list copy is nice; no product-level share)
- Business credibility: 6 (well-built, honest; shop visibly unfinished and monetization disclaimed)

## Top 8 fixes
1. Add real product photos (or at least supplier images) to every product card; icon tiles kill desirability.
2. Fill Sporty, Bookish, Cozy and Little Adventures with named, verified picks and a "buy this first" card, or hide those collections until ready.
3. Give each collection a distinct hero/tile image (Creative vs Journaling, Bookish vs Cozy are repeats).
4. Show a rough price band per pick/kit (e.g. "about $20-30 for the first evening") despite the no-prices policy.
5. Clean padded lists ("A book", "Water" plus "Water bottle", "Sports tote" plus "Tote bag", skip-item also listed as extra).
6. Make Cozy/Little Adventures use their own kit instead of borrowing Pottery/Creative kits under another heading.
7. Reconcile "we don't earn from these links" with rel="sponsored", and "we read each Amazon page" with search-only collections.
8. Shopping list: use short card names, preserve add order, add a real native share (navigator.share) and a total "one evening" bundle view; label the icon-only add buttons visibly.

## 6-line summary
1. Shop hub is clear, calm and honest; Pottery is the best collection: one pick, then add, then later extras, with reasons.
2. Only about 3 of 8 collections have named products; Sporty and Bookish are just Amazon search buttons, and Cozy/Little Adventures reuse other kits.
3. No product photos anywhere on cards (icon tiles); desirability is the weakest area, with no price cue either.
4. Links: named picks go to amazon.com/dp ASINs (new tab, sponsored), others to amazon.com/s?k= searches; none opened.
5. Shopping list works (add, "On my list", /saved, Copy as text with clean checklist and URLs, group-chat button is just copy, backup/import exists).
6. Scores: first impression 7, aesthetics 7, navigation 7, authenticity 7, usefulness 6, trust 7, desirability 4, purchase 5, return 6, share 6, credibility 6.
