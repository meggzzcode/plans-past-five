# Image audit: do the photos match the articles, and do they repeat?

Audited 2026-11-19 by looking at all 14 images (`src/assets/`) and every article hero. Status labels: COMPLETED (reassignment done), NEEDS OWNER (new images needed).

## Finding
- The site has **14 images** (8 lifestyle photos, 6 shop still lifes) for **32 articles**. Before this audit one image was the hero of 7 articles and another of 6, and several matches were wrong (pickleball showed a tennis photo, flower arranging showed a picnic photo, crochet and embroidery showed unrelated crafts).
- **It is not possible to have both a matching photo and no repeats with 14 images.** Zero repeats needs 32 distinct images, so **18 more images** are needed.

## What was done now (interim, COMPLETED)
Every article hero was reassigned to the closest honest match, with no image used more than 3 times (was 7). Shop still lifes are used as heroes where they match the topic better than a lifestyle photo (clay tools for air-dry clay, mahjong tiles for the mahjong guide, a paddle for pickleball). They are styled illustrations, not photos of specific products.

| Article | New hero | Match | Repeats |
|---|---|---|---|
| 35 hobbies | potteryNight | OK (friends doing a craft) | 3 |
| 21 creative hobbies at home | potteryNight | OK | 3 |
| Paint night at home | potteryNight | Good (friends painting) | 3 |
| 25 things after work | watercolor | OK | 3 |
| Watercolor for beginners | watercolor | Good | 3 |
| Affordable hobbies under 25 | watercolor | Weak | 3 |
| Junk journaling guide | junkJournal | Good | 3 |
| Junk journaling supplies | junkJournal | Good (companion article) | 3 |
| Cozy hobbies (low energy) | junkJournal | Weak | 3 |
| 50 solo date ideas | soloCafe | Good | 3 |
| Solo coffee shop date (roadmap) | soloCafe | Good | 3 |
| Find a hobby as an adult | soloCafe | Weak | 3 |
| Reading journal | shopBookish | Good | 3 |
| Book club | shopBookish | OK (books, not friends) | 3 |
| Cozy solo dates at home | shopBookish | OK | 3 |
| Perfect picnic | picnic | Good | 2 |
| 30 things to do on the weekend | picnic | OK | 2 |
| Affordable weekend adventures | shopAdventures | Good | 3 |
| Flower arranging | shopAdventures | Weak (daisies in a tote, no vase) | 3 |
| Solo Saturday | shopAdventures | OK | 3 |
| Girls' night ideas | girlsNight | Good | 3 |
| Craft night | girlsNight | Good (beads and crafts) | 3 |
| Crocheting | girlsNight | Weak (no yarn or hooks) | 3 |
| Mahjong night | shopGirlsNight | Good (mahjong tiles) | 1 |
| Air-dry clay | shopPottery | Good (clay and tools) | 2 |
| At-home creative weekend | shopPottery | OK | 2 |
| Creative starter kits | shopCreative | Good | 2 |
| Embroidery | shopCreative | OK (hoop visible) | 2 |
| Pickleball | shopSporty | OK (paddle and ball, shared with tennis gear) | 1 |
| Tennis | tennis | Good | 1 |
| Active hobbies (not the gym) | hiking | OK | 2 |
| Recreational cycling (roadmap) | hiking | Weak (no bike) | 2 |

## Remaining weak matches (NEEDS OWNER: new images)
Priority order, with house-style prompts (warm editorial photography, gingham, cherry red, butter yellow, strawberry pink, garden green; no text, no brand logos, no real-person likeness):
1. **Crochet:** hands crocheting with soft yarn and a hook on a cozy sofa.
2. **Flower arranging:** a woman trimming stems beside a vase on a kitchen table.
3. **Cycling (roadmap article):** a woman walking a city bike with a helmet in a leafy lane.
4. **Pickleball:** a woman mid-rally on a pickleball court at golden hour.
5. **Find a hobby:** a table with small hobby items (paints, yarn, a book, a camera) she is choosing between.
6. **Cozy hobbies:** a blanket, tea and a half-finished puzzle in lamplight.
7. **Affordable hobbies:** a few inexpensive supplies (pencils, a small notebook, a thrifted mug) on a tidy desk.
Then 11 more to remove every remaining repeat (reading journal, book club with friends, cozy solo date, solo Saturday planner, weekend montage, embroidery close-up, paint night with canvases, picnic variations, solo date at home, hiking variations, tennis variation).

## Rules for any new image
- Log source and licence in `docs/IMAGE-LICENSES.md` (the existing 14 are AI-generated; the generating tool's licence and transfer terms are still UNVERIFIED: Cowork task C10).
- Never show a specific branded product; keep alt text honest in `src/data/images.ts`.
- Disclose AI-generated imagery in Editorial Standards (already covered by the single disclosure).

## Other places images repeat
- **Pins:** 28 of 88 pins use photos (up to 4 uses of one image); the rest are typographic. Photo pins should show the same image as their article's hero (aligned below).
- **Hobby profile pages:** 12 hobbies carry an image; two share `watercolor` and two share `girlsNight`.

## Pins (updated 2026-11-19)
Pin photos now match the article hero (or the destination) and no photo is used on more than 2 of the 88 pins, nor twice for one article. Where the hero is a weak match or a third use would repeat, the pin is typographic. Build: `node scripts/build-pins.mjs`.

Final photo use (25 photo pins, 63 typographic):

| Photo | Pins | Used on |
|---|---|---|
| potteryNight | 2 | 35 hobbies, creative hobbies at home |
| watercolor | 2 | after work, watercolor |
| junkJournal | 2 | junk journaling, junk journaling supplies |
| shopCreative | 2 | starter kits, shop collection |
| shopPottery | 2 | air-dry clay, shop collection |
| picnic | 2 | weekend things, perfect picnic |
| shopAdventures | 2 | cheap weekend adventures, shop collection |
| soloCafe | 2 | solo date ideas, solo coffee date |
| girlsNight | 2 | girls' night, craft night |
| shopGirlsNight | 2 | mahjong night, shop collection |
| shopBookish | 2 | book club, shop collection |
| hiking | 1 | active hobbies |
| tennis | 1 | tennis |
| shopSporty | 1 | shop collection |

Articles whose pins are all or partly typographic because no honest matching photo exists (or the matching one is already at its 2-pin limit):
- **No matching photo (weak hero):** low-energy hobbies, how to find a hobby, affordable hobbies under 25 (the extra budget pin too), flower arranging, crocheting, cycling, embroidery (hero shopCreative already at 2), pickleball (shopSporty is a shop collection still life; the article has no photo pin).
- **Photo withheld to keep each image at 2 pins or one photo per article:** at-home creative weekend (shopPottery), cozy solo dates at home (shopBookish), solo Saturday (shopAdventures), junk journaling supplies third pin, starter kits third pin.
New images listed above under "Remaining weak matches" would let these get photo pins.
