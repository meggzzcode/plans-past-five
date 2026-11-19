# Hobby card images ingested (2026-11-19)

Source: Canva AI contact sheets (links in `docs/content/CANVA-ASSETS.md`), sliced into tiles in `docs/content/incoming-images/sliced-tiles/`. Licence and transfer terms of Canva AI output are UNVERIFIED (Cowork task C10). Each row in `docs/content/new-images.csv` uses the new `hobbyFor` column; the ingest sets `image: "<key>"` on that hobby in `src/data/hobbies.ts`. Files are `src/assets/hobby-<name>.jpg` (642 px or 798 px square, kept at their own size, never upscaled), with AI provenance metadata embedded and ledger rows in `IMAGE-LICENCE-LEDGER.md`.

## Accepted (21)
scrapbooking, embroidery, crochet, knitting, jewelry-making, friendship-bracelets, paint-by-numbers, flower-arranging, collage-art, reading, jigsaw-puzzles, crossword-puzzles, baking, indoor-gardening, creative-writing, pickleball, roller-skating, birdwatching, nature-photography, volunteering, thrifting.

Soft notes (judged acceptable; flag if you disagree): the crossword grid, creative-writing notebook, paint-by-numbers canvas and reading-tile book spines show only illegible pseudo-writing, which is inherent to the subject; roller-skate wheels carry tiny unreadable marks.

## Skipped (3)
- calligraphy: the page shows large, partly readable gibberish script words; reads as malformed text.
- film-photography: the film canister and lens ring carry brand-like lettering and label styling.
- vinyl-collecting: the turntable control panel and record label show visible pseudo-text labels.

## Hobbies still without their own image (11)
calligraphy, film-photography, vinyl-collecting (skipped above), and yoga-for-beginners, dance-classes, museum-exploring, running, climbing, board-games, cooking-classes, language-learning (never in this batch).

## Checks
Ingest `--check` and the real run passed; a second run is a no-op. `embed-ai-metadata.mjs --check` reports 0 files lacking the marker. Content rebuilt. `/hobbies` and `/hobbies/roller-skating` checked with Playwright at 390 and 1280 px: 21 hobby-card images load, `object-cover` crops square tiles well. The profile page shows the tile at about 560 px wide, so it is slightly soft on high-density screens. Port 5991 was already taken by a stale server, so the dev server ran on 5992.
