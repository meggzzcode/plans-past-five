# Wave B: shop honesty pass

## What changed
- **Collections own their kits** (`kitIds` in `src/data/products.ts`). No collection borrows another's kit. Cozy After Hours has none; Girls' Night In no longer shows the reading kit; Little Adventures no longer shows watercolor. A kit's "More in ..." link goes to the kit's own collection (paint night now says Girls' Night In, not The Pottery Era).
- **Collections without verified products** (Sporty, Bookish, Little Adventures, Cozy) show "Where to start: guides and what to look for", with links to the hobby guides and journal articles, then the what-to-look-for lists and search cards (labelled as types, not picks). Tiles carry the same honest label.
- **Distinct tile images** (existing keys): Creative = watercolor, Journaling = junkJournal, Bookish = hobbyReading, Cozy = cozyCorner.
- **Kit item classes**: essential (verified product, else "Still to choose (no verified listing yet)" in plain text), optional extra, household ("You probably have: ...", plain text, never linked, never counted), removed (padded items). New `household` slot need; `isFullKit(filled, kit)` now also requires every essential verified, plus at least 4 picks.
- **Removed from kits**: highlighters, club notebook (near-duplicates in the reading kit), "extras for people who finish early"; project supplies is now an optional boxed set.
- **Dedupe**: `dedupeListGroups` in `src/lib/shoplist.ts` drops Water/Water bottle, Sports tote/Tote bag, a bare "A book" from the collection "what you need" lists.
- **Tier labels**: "Starter pick"; "Step up: a prettier version"; "Step up: once you're hooked"; "Nice later". No prices, ratings or counts.
- Tests updated in `src/test/shop.test.tsx`.

## Per-kit status (verified catalog today)
| Kit | Status | Awaiting verification (essential) | Household | Optional |
|---|---|---|---|---|
| Junk journaling | Complete (journal, adhesive verified) | none | scissors | washi, pens verified; paper not |
| Air-dry clay | Complete (clay, paint verified) | none | mat or baking paper | brushes, sealer verified; tools not |
| Watercolor | Where to start (3 picks) | none | masking tape, water jar | brushes; palette not |
| Mahjong night | Where to start (3 picks) | none | snack bowls | mat verified |
| Pottery and paint night | Where to start | acrylic paint | aprons, scissors and glue, table cover | palettes, easel, boxed set |
| Picnic | Not shown (nothing verified) | blanket | plates and cups | bag, insulated bag |
| Reading and book club | Not shown (nothing verified) | journal, pen | snack bowls, mug | many |
| Pickleball and tennis | Not shown (nothing verified) | paddles, balls, racquet | none | bags, court shoes |

## Notes
Two collection-wide lint errors (`scripts/tmp-sim*.ts`) and tsc errors in `catalog-import.test.ts` belong to other owners.
