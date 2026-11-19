# Canva AI images generated for the site (log)

Canva only returns a 200 px preview to Claude Code, so the full-size files must be downloaded by the owner or Cowork from the Canva link (Download as JPG). Canva has a short cooldown between generations, so grids of several subjects are generated in one image and sliced afterwards. All of these are AI-generated (label source "Canva AI" in `docs/content/new-images.csv`); the licence and transfer terms of Canva AI images are UNVERIFIED (Cowork task C10).

| Asset id | Link | Generated | What it is | Use |
|---|---|---|---|---|
| MAHbXvOeP98 | https://www.canva.com/M/MAHbXvOeP98 | 2026-11-19 | Hands crocheting a butter-yellow blanket with a wooden hook, red and pink yarn in a basket (2336x1760) | Hero for the crochet article (key `crochetHands`) |
| MAHbX2wnywc | https://www.canva.com/M/MAHbX2wnywc | 2026-11-19 | 3x3 contact sheet. Row 1: scrapbooking, embroidery, crochet. Row 2: knitting, beaded jewelry, friendship bracelets. Row 3: paint by numbers, flower arranging, collage | Hobby card images for scrapbooking, embroidery, crochet, knitting, jewelry-making, friendship-bracelets, paint-by-numbers, flower-arranging, collage-art (slice with `scripts/slice-sheet.py`) |
| MAHbX7kpwy8 | https://www.canva.com/M/MAHbX7kpwy8 | 2026-11-19 | 3x3 contact sheet. Row 1: calligraphy, film photography (camera on windowsill), reading (armchair, books, tea). Row 2: jigsaw puzzle, crossword, baking (cookies). Row 3: indoor gardening (windowsill plants), vinyl collecting, creative writing (notebook and pen) | Hobby card images for calligraphy, film-photography, reading, jigsaw-puzzles, crossword-puzzles, baking, indoor-gardening, vinyl-collecting, creative-writing |
| MAHbXyz417s | https://www.canva.com/M/MAHbXyz417s | 2026-11-19 | 2 columns x 3 rows sheet (portrait 2:3, square tiles). Row 1: pickleball paddle and ball, roller skates. Row 2: binoculars and field notebook, camera in a wildflower meadow. Row 3: volunteer donation box, thrifted clothes rack | Hobby card images: pickleball, roller-skating, birdwatching, nature-photography, volunteering, thrifting. Slice with `--cols 2 --rows 3` |
| MAHbX_UjRFU | https://www.canva.com/M/MAHbX_UjRFU | 2026-11-19 | Single photo (landscape 4:3): hands trimming a flower stem over a gingham-clothed table beside a vase of pink and yellow flowers | Hero for the flower arranging article (key `flowerArranging`) |
| MAHbX5kQVHs | https://www.canva.com/M/MAHbX5kQVHs | 2026-11-19 | Single photo (landscape 4:3): woman from behind walking a cream city bike with a wicker basket of wildflowers on a sunlit lane, pink helmet on handlebars | Hero for the beginner cycling article (key `cyclingLane`) |
| MAHbXzI-Ijo | https://www.canva.com/M/MAHbXzI-Ijo | 2026-11-19 | Single photo (landscape 4:3): cozy evening corner, hands holding a tea mug, socked feet on an armchair, gingham side table with jigsaw puzzle, lamp and plant | Hero for the cozy / low-energy hobbies article (key `cozyCorner`) |

## Slicing a sheet
`python3 scripts/slice-sheet.py <downloaded.jpg> --cols 3 --rows 3 --names scrapbooking,embroidery,crochet,knitting,jewelry-making,friendship-bracelets,paint-by-numbers,flower-arranging,collage-art --out docs/content/incoming-images/`
Check each tile by eye before using it: AI grids sometimes mix up subjects; skip any tile that does not match its hobby.
