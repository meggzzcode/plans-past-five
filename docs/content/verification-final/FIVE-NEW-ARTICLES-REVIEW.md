# Independent review of the five newly published articles (2026-11-19)

Method: every source URL in each article was fetched directly (curl or WebFetch) and the page text searched for the claim. Verdict key: SUPPORTED / PARTLY / UNSUPPORTED / UNVERIFIABLE (source blocked). "Edit" means a change made in this pass.

## Verdicts

| article | verdict |
|---|---|
| how-to-start-air-dry-clay | SUFFICIENT (one unverifiable retailer source, two softer claims fixed) |
| watercolor-painting-for-beginners | SUFFICIENT (one partner page returned 503/unreachable; claim also covered by acmiart.org) |
| how-to-start-embroidery | SUFFICIENT |
| how-to-start-crocheting | SUFFICIENT (one claim softened) |
| affordable-hobbies-under-25 | SUFFICIENT (all price and free claims already removed or hedged) |

No article needs to go back to draft.

## how-to-start-air-dry-clay

| claim | source | supports? | action |
|---|---|---|---|
| No kiln or oven needed, dries naturally | crayola.com air-dry-clay page ("no kiln or oven required!") | SUPPORTED | none |
| Drying 24 h to touch, ~72 h fully dry, varies with size and conditions | crayola.com drying FAQ (page JSON read) | SUPPORTED | none |
| Seal only when fully dry (72 h), acrylic varnish, test first, will not waterproof, display indoors | crayola.com sealing FAQ | SUPPORTED | none |
| Store unused clay airtight; no water added | crayola.com storage FAQ | SUPPORTED | none |
| Paint with acrylics once dry | Crayola drying FAQ (tempera, acrylic, watercolor) | SUPPORTED | none |
| No respirator needed under normal use (so mask is optional) | Crayola SDS (PDF text extracted: "No respirator is required under normal conditions of use") | SUPPORTED. Hosted on schoolspecialty.com, not crayola.com | none |
| Do not use for food or drink, even if sealed | Mont Marte FAQ: "isn't food safe"; "sealing" part is inference from Crayola "will not waterproof" | PARTLY (food: supported by a third-party maker; no Crayola statement; Safeway page is script-rendered and its text could not be read) | Wording left (conservative, stricter than sources). Safeway source note corrected to say unconfirmed. Cowork item stays open |
| Keep away from flame and heat | Mont Marte FAQ: not suitable for open flames or high heat; baking can melt or burn. Crayola SDS: "slight fire hazard" | PARTLY (third-party maker plus SDS, no Crayola statement) | Note updated; wording kept as "precaution" |
| Dry slowly, even thickness, out of direct sun; fast or uneven drying causes cracks | Mont Marte FAQ (gradual drying, away from heat and sun, even thickness) | SUPPORTED (third party) | none |
| Sand gently only when dry, ventilated space, mask optional | Mont Marte (sand when fully dry); Crayola SDS | SUPPORTED / PARTLY | none |
| White clay is the easiest to paint over | none | UNSUPPORTED | Edit: now "White clay gives a pale base for paint." |
| Flip after a day, score and join figurines with water, straw hole, cookie cutters, jar lid cuts a circle | none (ordinary craft technique, no health or product claim) | UNSUPPORTED but low risk | left |
| "Check your clay's label for age warnings" | Crayola page shows none, so defers to label | SUPPORTED as advice | none |
| Clay is among affordable hobbies | internal link, no price stated | n/a | none |

Decision: SUFFICIENT. The food and heat statements are conservative, now backed by one third-party maker FAQ plus Crayola SDS and Crayola's own "will not waterproof / indoors" text. No certification or "non-toxic" claim is made.

## watercolor-painting-for-beginners

| claim | source | supports? | action |
|---|---|---|---|
| AP seal: certified non-toxic when used as intended; CL seal: health warnings | acmiart.org/materials-safety (read: AP "non-injurious to humans when used as intended", toxicologist-certified; CL "Cautionary Labeling") | SUPPORTED. Note ACMI describes CL as for older kids/adults | none |
| Avoid materials with lead, cadmium and other heavy metals | CPSC 5015.pdf (PDF text: "Avoid materials with lead, cadmium and other heavy...") | SUPPORTED | none |
| Do not hold brushes in the mouth or tip them with the lips | CPSC 5015.pdf ("Never hold brushes or tools in your mouth, tip brushes with your lips") | SUPPORTED | none |
| Labeling law (LHAMA) explainer | partners.acmiart.org page: WebFetch 503, curl no connection | UNVERIFIABLE. Article does not state anything beyond the AP/CL seals, which acmiart.org covers | none; keep as secondary source or drop in a later pass |
| Tape paper down; peel tape low and parallel once dry | artistsnetwork.com wash page ("Pull it low and parallel...", "completely dry") | SUPPORTED | none |
| Flat wash with bead of paint; graded wash fades | same page and glossary (gradated wash: value changes gradually) | SUPPORTED | none |
| Wet-into-wet blooms; looks strong wet but dries lighter | artistsnetwork techniques page and glossary | SUPPORTED | none |
| Thin paper buckles; heavier paper kinder | artistsnetwork beginner guide ("Lightweight paper will buckle when wet") | SUPPORTED | none |
| 300gsm (140 lb) cold press, "many guides suggest" | artistsnetwork (standard weights, 140-lb cold-pressed example); Winsor & Newton page (300gsm cold press, designed not to cockle) | PARTLY (a maker page and a magazine example; "many guides" is a mild generalisation) | none; hedged already |
| Pans and tubes exist; pan set least fuss | artistsnetwork guide (tubes or pans) | PARTLY (least-fuss is opinion) | none |
| Wet-on-dry definition | glossary has "wet-into-dry wash" and drybrush | SUPPORTED in substance | none |
| Paint light to dark, leave bare paper for highlights, project timings, mixing tips | none (general technique, timings are suggestions) | UNSUPPORTED, low risk, phrased as guidance ("Generally") | left |
| Wash up after painting | none (generic hygiene) | UNSUPPORTED, harmless | left |

Decision: SUFFICIENT. Safety statements (seals, heavy metals, brushes) are directly sourced to ACMI and CPSC.

## how-to-start-embroidery

| claim | source | supports? | action |
|---|---|---|---|
| Back stitch: continuous solid line, outlines | DMC stitch guide | SUPPORTED | none |
| Stem stitch: staggered straight stitches, lettering and outlines | DMC stitch guide | SUPPORTED | none |
| Split stitch: outlines and padding, like a mini chain | DMC ("used for outlines and padding... looks a little like a mini chain stitch") | SUPPORTED | none |
| Satin stitch fills a shape with parallel stitches; outline with split stitch first for a neat edge | DMC | SUPPORTED | none |
| French knot: wrap thread around the needle | DMC | SUPPORTED | none |
| Running stitch is simplest | DMC describes it only | PARTLY (opinion, harmless) | none |
| Floss about arm's length, max 50 cm (18 in); separate one strand at a time; strand count per pattern | DMC stranded floss page | SUPPORTED | none |
| Embroidery needles: medium/long eye for several strands; sharp point | DMC needles page | SUPPORTED | none |
| Evenweave cotton suits beginners | DMC fabrics page | SUPPORTED | none |
| "Needles are sharp, store them in a case" | DMC "sharp point" | SUPPORTED (storage advice is common sense) | none |
| Hoop: fabric "taut like a drum" | none | UNSUPPORTED | Edit: "taut" (drum wording removed in two places) |
| Tangle, pucker and messy-back fixes, needle minder, small scissors, pouch tip | none (general technique) | UNSUPPORTED, low risk | left |
| Check floss label before washing; test transfer pen on scrap | defers to labels | SUPPORTED as advice | none |
| No cost or "cheap" claims | n/a | n/a | none |

Decision: SUFFICIENT. All stitch, floss and needle facts are from DMC (a manufacturer).

## how-to-start-crocheting

| claim | source | supports? | action |
|---|---|---|---|
| Core moves: slip knot, chain, single crochet | Lion Brand guide | SUPPORTED | none |
| Medium/worsted weight, light solid yarn shows stitches; skip dark or variegated | Lion Brand | SUPPORTED (Lion also names dark/variegated; "fuzzy" was not in the page) | Edit: "dark or fuzzy ... unpicks without fuss" replaced with "light, solid-colored ... dark or variegated" |
| Use the hook size on the yarn label | Lion Brand | SUPPORTED | none |
| Skip first chain / work into second chain from hook | Lion Brand ("second chain from the hook") | SUPPORTED | none |
| Count stitches each row; practice swatch catches tension and counting slips | Lion Brand | SUPPORTED | none |
| US single crochet = UK double; US double = UK treble; "sc" is a US abbreviation | Craft Yarn Council abbreviations and term-differences table | SUPPORTED (table text flattened but rows align) | none |
| Yarn label lists weight, suggested hook, care | CYC yarn weight system page (weights and hook ranges); care from general knowledge | PARTLY | none |
| Pull out and unravel to fix a mistake "which smooth yarn allows" | none | UNSUPPORTED | Edit: clause removed |
| Hook one size up if too tight; relaxed grip evens stitches; shake out hands | Lion Brand says grip tension and wrist fatigue (partly); hook size-up inferred | PARTLY, phrased as suggestion not health claim | none |
| Square projects (scarf, coaster, joined squares) | Lion Brand mentions scarf, dishcloth, granny square | PARTLY | none |

Decision: SUFFICIENT. US/UK terms and beginner material guidance rest on Craft Yarn Council and Lion Brand (a yarn maker, not neutral but a primary source for its own advice).

## affordable-hobbies-under-25

| claim | source | supports? | action |
|---|---|---|---|
| Some common houseplants are harmful to pets; check ASPCA list | ASPCA toxic/non-toxic plants page; ASPCA houseplants news page (lists dumb cane, calla lily, pothos, peace lily, Chinese evergreen as calcium oxalate plants) | SUPPORTED | none |
| No dollar figures; "check local prices" | n/a | removed claims | none |
| Library "may lend more than books"; "close to free" with library card | none (hedged) | UNSUPPORTED but hedged | left; already "may" |
| Many public trails are free, some parks charge | none | UNSUPPORTED but hedged ("many ... some") | left; Cowork row exists |
| Birdwatching with "a bird-ID app or a library field guide" | no "free" claim made | SUPPORTED (no free claim) | none |
| Kits "usually include" canvas, paints, brush (paint by numbers); embroidery kits "often bundle" hoop etc.; both say "check the listing" | none | PARTLY, hedged and defers to listing | left |
| Hobby content cross-references (watercolor, clay, embroidery, junk journaling) | the other four articles | consistent with them | none |
| Cutting in a jar of water roots; friendship bracelets need floss and safety pin; baking, jigsaw, thrifting tips | none (common knowledge, no safety or product claim) | UNSUPPORTED, low risk | left |
| "Free"/"costs nothing" wording | only: cutting from a friend's plant "costs nothing" (true by construction), noSpend block lists activities needing nothing new | acceptable | none |

Decision: SUFFICIENT. The earlier agent removed the unsupportable price framing; remaining statements are hedged lifestyle guidance and one sourced pet-safety line.

## Not verifiable in this pass
- safeway.com listing (script-rendered shell, no text).
- partners.acmiart.org LHAMA page (503 / connection failure).
- Merlin bird app (not cited; "free" correctly absent).
