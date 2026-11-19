# Drafts resolved (2026-11-19)

All five drafts passed and are now `published` (publishedAt and verifiedAt 2026-11-19). Slugs and URLs unchanged. Edited only through `articleToJson`; `node scripts/build-content.mjs` reports 32 published and 2 draft. `bunx vitest run` (658 tests), `bunx tsc --noEmit` and `bunx eslint . --quiet` all pass. No test asserted the 27/7 counts, so no test expectations changed. The `sources` schema has no `checkedAt` field, so the 2026-11-19 check date is in each source's `note`. Pages were read directly with curl (a normal browser user agent); search snippets alone were not relied on for the final sources except where noted.

## how-to-start-air-dry-clay (published)
Issues: Crayola evidence came only from search snippets and retail listings; flame/heat caution unsourced.
Sources added (all read directly 2026-11-19):
- https://www.crayola.com/products/brands/scribble-scrubbie/faqs/can-air-dry-clay-pieces-be-sealed-faq (seal after 72 hours, acrylic varnish, test first, will not waterproof, display indoors)
- https://www.crayola.com/faqs/how-long-does-it-take-for-air-dry-clay-to-dry-faq (24 hours to touch, 72 hours fully dry, paint when dry)
- https://www.crayola.com/faqs/how-long-can-i-store-unused-air-dry-clay-in-an-airtight-container-faq
- https://www.crayola.com/products/clay-and-modeling-compounds/air-dry-clay (no kiln or oven)
- Kept: Crayola SDS (cdn.schoolspecialty.com), Safeway listing, Mont Marte FAQ (food-contact caution, secondhand).
Reworded: drying time now quotes Crayola (24 h to touch, about 72 h fully dry, check your label); sealer now "Crayola suggests an acrylic varnish... test on a scrap, only once completely dry"; flame/heat is now "as a precaution, keep it away from flame and heat".
Remaining caveat: the food and flame/heat cautions have no direct manufacturer statement beyond Crayola packaging text via Safeway; both are phrased conservatively (stricter than any source), not as tested facts. No certification or "non-toxic" claim is made.

## watercolor-painting-for-beginners (published)
Issues: technique, paper and brush-in-mouth claims unchecked.
Sources added: Artists Network flat/gradated wash page (https://www.artistsnetwork.com/uncategorized/perfect-watercolor-wash-michael-reardon/), glossary (https://www.artistsnetwork.com/art-techniques/watercolor-glossary-of-terms/), wet-into-wet page (https://www.artistsnetwork.com/art-mediums/watercolor/watercolor-painting-techniques/), beginner guide (https://www.artistsnetwork.com/art-mediums/watercolor/all-in-one-guide-to-watercolor-for-beginners/), Winsor & Newton 300gsm cold press paper page (https://www.winsornewton.com/products/watercolour-paper-gummed-300gsm-140lb). Existing ACMI, CPSC and ACMI-partners sources kept (CPSC and ACMI re-read directly).
Supported: brush-in-mouth now sourced to the CPSC guide ("never hold brushes... in your mouth, tip brushes with your lips"); taping paper and peeling low and parallel; flat and gradated washes; wet-into-wet dries lighter.
Reworded or removed: "perfect for" clouds (house style test); "improves every painting more than expensive paint" removed; "a couple of minutes" of wetting pans now "a few drops of water"; "student grade is fine" now "a sensible place to start"; "mix two colors at most" now a suggestion; 300gsm (140 lb) cold press phrased as "many guides suggest". Wet-on-dry kept as the plain definition (the glossary only confirms the related drybrush term). Hero changed (see below).

## how-to-start-embroidery (published)
Issues: costs, hoop, strands, fabric, needle, stitch descriptions, wash/press, safety.
Sources added (DMC manufacturer pages, read directly): https://www.dmc.com/US/en/sbs-embroidery-stitch-diagrams ; https://www.dmc.com/US/en/technique-embroidery-use-stranded-thread ; https://www.dmc.com/US/en/products/embroidery-needles ; https://www.dmc.com/en/fabrics
Reworded: stitch descriptions now match DMC (back stitch continuous line, stem stitch for lettering and outlines, split stitch for outlines and padding, satin stitch outlined first, French knot wrapped around the needle); floss "about as long as your arm, no more than about 50 cm (18 in)" and separate strands per the pattern; needle "medium-to-long eye" (comparison with sewing needles dropped); fabric "such as evenweave cotton" (DMC's beginner fabric; linen-blend claim dropped). "Six stitches cover most of embroidery" became "enough to start"; "loose is cheaper" and "mistakes disappear into the texture" removed. The children-and-pets needle line was removed (no source); "needles are sharp, store them in a case" kept. Cost labels were already removed.

## how-to-start-crocheting (published)
Issues: costs, hook size, US/UK terms, yarn guidance, stitch descriptions.
Sources added: https://www.lionbrand.com/community/blog/how-to-crochet/ (slip knot, chain, single crochet; light solid medium-weight yarn; hook size on label; swatch; count stitches) ; https://www.craftyarncouncil.com/standards/crochet-abbreviations (US single crochet = UK double, US double = UK treble) ; https://www.craftyarncouncil.com/standards/yarn-weight-system (weight categories; used for label-first advice only, no numbers quoted).
Reworded: US/UK equivalence restored with the CYC table; "cotton or acrylic blend" dropped; single and double crochet uses softened (no "good for dishcloths/blankets"); "only one live loop" dropped; swatch/counting tip added; "perfectly good" changed (house style test). Wrist-comfort line remains a plain suggestion, not a health claim.
Products: productIds empty; the shopTheArticle block shows only catalog items tagged to this article (crochet hooks and yarn), which match the topic.

## affordable-hobbies-under-25 (published)
Issues: headline and every "Typically under $X" label had no price source.
Resolution: all numeric price framing removed. Title is now "15 Affordable Hobbies You Can Start on a Small Budget" (slug and URL unchanged, so the URL still says under-25; consider a redirect only if the slug is ever changed). Cost labels are free/low-cost guidance ("Free to start", "Often free with a library card", "Often cheaper secondhand", "Low cost; check local prices", "Your own cap"). The "About those prices" section is now "About costs" and says dollar figures are omitted on purpose. Library lending softened to "may lend more than books"; "free bird-ID app" changed to "a bird-ID app or a library field guide" (Merlin's site returned 403 to automated reads, so free status was not confirmed); noSpend block now "Several of these can start today with nothing new".
Sources added: ASPCA toxic and non-toxic plants (https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants) and https://www.aspca.org/news/these-houseplants-can-cause-trouble-your-pets, used for a new pet-safety line in the indoor gardening item.
Products: watercolor-sets, air-dry-clay, embroidery-kits, pocket-notebooks all exist and match the listed hobbies.

## Hero images (shared-hero test)
`round3-fixes` caps a hero at 2 published articles. Three of the five collided, so I switched to keys that exist in the image data: watercolor to `flowerArranging`, embroidery to `cozyCorner`, affordable to `picnic` (clay `shopPottery` and crochet `crochetHands` unchanged). These are weaker thematic fits than the originals (`watercolor`, `shopCreative`, `soloCafe`, which three other published articles also use). Suggest the owner of `solo-date-ideas` and `how-to-host-a-paint-night-at-home` (watercolor), `creative-hobby-starter-kits-worth-considering` or `things-to-do-after-work-instead-of-scrolling` (shopCreative) rebalance, after which my articles can go back to the better images. `picnic` is now at its cap of 2 published; the draft `cute-weekend-plans-that-arent-brunch` also uses it and must change hero before it is published.

## Link suggestions for other articles (not applied)
Currently no published article links to clay, watercolor or affordable-hobbies; crochet and embroidery link only to each other.
- how-to-start-air-dry-clay: from creative-hobbies-you-can-start-at-home, at-home-creative-weekend, how-to-host-a-craft-night, creative-hobby-starter-kits-worth-considering.
- watercolor-painting-for-beginners: from creative-hobbies-you-can-start-at-home, how-to-host-a-paint-night-at-home, solo-date-ideas, creative-hobby-starter-kits-worth-considering.
- how-to-start-embroidery and how-to-start-crocheting: from creative-hobbies-you-can-start-at-home, low-energy-hobbies, cozy-solo-dates-at-home.
- affordable-hobbies-under-25: from how-to-find-a-hobby-as-an-adult, cheap-weekend-adventures, things-to-do-on-the-weekend.
Outbound links inside my five already point to published articles only.
