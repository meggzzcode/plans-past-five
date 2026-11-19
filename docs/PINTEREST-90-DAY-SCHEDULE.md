# Pinterest 90-day schedule

Status: RECOMMENDED plan. Nothing has been posted, no account exists, and no audience or result is claimed. Pin images are in `public/pins/`, metadata is in `docs/pinterest-pins.csv`, and the account steps are in `docs/buyer/PINTEREST-SETUP.md`.

## What this schedule is

- **95 pins** over 90 days, built from **8 reusable template styles** (counts below). Roughly one pin a day; a handful of days carry two. Pinterest rewards steady new creative more than bursts, so the plan is a trickle, not a dump.
- **Start date is a placeholder** (`2027-01-04`, a Monday). Change `--start=YYYY-MM-DD` and re-run `node scripts/build-pins.mjs`, or just shift the "Day" numbers to your real launch date.
- Three creative approaches per priority article (two for the rest), each a different template and angle, so repeats of one URL never look like the same pin twice.
- **Spacing rule:** the second and third creative for the same destination go out in later rounds, so one URL is never pinned twice within a week.

| Template | Pins |
|---|---|
| editorial | 19 |
| headline | 17 |
| checklist | 16 |
| cover | 15 |
| steps | 12 |
| quote | 9 |
| quiz | 4 |
| printable | 3 |

## Two phases

**Phase 1, days 1 to 30: only pins whose page is live today (30 pins).** Published articles (35 hobbies, after-work ideas, creative hobbies at home, junk journaling), the hobby quiz, Make Some Plans, the three printables and the printables hub, and the six shop collections. This is the safe launch month.

**Phase 2, days 31 to 90: pins for drafts and tools not yet built (65 pins, status `hold-until-published`).** Dates are the *earliest* day a pin may go out. If the article is not published and verified by then (see `docs/TURNKEY-PLAN.md`: drafts stay drafts until `coworkChecks` pass), slide the pin later. Never post a pin to a 404, a noindexed draft or a page whose claims are unverified. Before posting, reread the pin copy against the final article; the CSV's `verify_before_posting` column says what to check.

Two pins in Phase 2 point at tools that may not exist yet (`/tools/hobby-budget`, `/tools/tonight`): hold them until those pages are live.

## Weekly rhythm (suggested)

| Day | Focus |
|---|---|
| Mon | Article pin (evergreen how-to or list) |
| Tue | Tool or printable pin |
| Wed | Article pin |
| Thu | Shop collection or starter-kit pin |
| Fri | Article pin, weekend angle |
| Sat | Quote or lifestyle pin (low effort, high brand) |
| Sun | Rest, or catch up on a held pin |

The generated table follows creative rounds rather than this rhythm to the letter; treat the rhythm as a guide when you reorder.

## Rules to avoid spam

1. One destination, one pin per week at most.
2. Never reuse an identical image for a different link. Each file here is unique.
3. Do not mass-save pins to many boards. Each pin has one primary board; add a second relevant board only after a few weeks and not for every pin.
4. No engagement pods, follow-for-follow, bought saves or fake accounts. No claims of an audience.
5. Write descriptions in your own voice. The CSV copy is a starting point; edit a few words so it sounds like you.
6. Disclose affiliate links where relevant (see `docs/buyer/PINTEREST-SETUP.md`). Pins link to your own pages, not directly to Amazon.
7. Respect Pinterest's current content and spam policies; they change. Check the Pinterest help centre before launch.

## Measuring (no targets, no promises)

Track weekly in Pinterest Analytics and your own analytics once wired (nothing is wired in the repo today):

- Impressions, saves, outbound clicks, per pin and per template.
- Which board and which creative approach (headline, checklist, quote and so on) earns outbound clicks.
- UTM `utm_content` is set to the pin id, so analytics can tell the three approaches for one article apart.

Reviews at **day 30, 60 and 90**: keep the template styles that get outbound clicks, retire those that only get impressions, and brief new creative in the same style. Do not extrapolate from a handful of clicks. Results depend on account age, niche competition, seasonality and quality, and none of that can be promised here.

## Keyword notes

Keywords in the CSV are qualitative search phrases chosen to match how people describe the topic. They are **not** validated for volume. Cowork should check each against Pinterest's own search suggestions (type the phrase in Pinterest search and note the autocomplete) and Pinterest Trends before posting, and swap in better phrases where the autocomplete suggests them.

## Day-by-day schedule

Dates assume the placeholder start `2027-01-04`. `HOLD` = `hold-until-published` (see Phase 2).

| Day | Date (placeholder) | Pin file | Template | Destination | Board | Status |
|---|---|---|---|---|---|---|
| 1 | 2027-01-04 | `01-35-hobbies-1-cover.jpg` | cover | `/journal/hobbies-to-try-when-life-feels-like-work-sleep-repeat` | Creative Hobbies for Beginners | live |
| 2 | 2027-01-05 | `31-quiz-1-quiz.png` | quiz | `/hobby-finder` | Plans Past Five | live |
| 3 | 2027-01-06 | `32-plans-1-headline.png` | headline | `/make-plans` | Weekend Activities | live |
| 4 | 2027-01-07 | `02-after-work-25-1-checklist.png` | checklist | `/journal/things-to-do-after-work-instead-of-scrolling` | After Work Activities | live |
| 5 | 2027-01-08 | `35-bucket-list-1-printable.png` | printable | `/printables/out-of-office-bucket-list` | Printable Planners | live |
| 6 | 2027-01-09 | `03-creative-home-21-1-editorial.jpg` | editorial | `/journal/creative-hobbies-you-can-start-at-home` | Creative Hobbies for Beginners | live |
| 7 | 2027-01-10 | `36-weekend-planner-1-printable.png` | printable | `/printables/weekend-edit-planner` | Printable Planners | live |
| 8 | 2027-01-11 | `37-hobby-tracker-1-printable.png` | printable | `/printables/hobby-era-tracker` | Printable Planners | live |
| 9 | 2027-01-12 | `04-junk-journal-1-cover.jpg` | cover | `/journal/how-to-start-junk-journaling` | Junk Journaling | live |
| 10 | 2027-01-13 | `38-printables-hub-1-editorial.jpg` | editorial | `/printables` | Printable Planners | live |
| 11 | 2027-01-14 | `39-shop-pottery-era-1-cover.jpg` | cover | `/shop/pottery-era` | Hobby Starter Kits | live |
| 12 | 2027-01-15 | `01-35-hobbies-2-headline.png` | headline | `/journal/hobbies-to-try-when-life-feels-like-work-sleep-repeat` | Creative Hobbies for Beginners | live |
| 13 | 2027-01-16 | `40-shop-creative-girl-1-editorial.jpg` | editorial | `/shop/creative-girl` | Hobby Starter Kits | live |
| 14 | 2027-01-17 | `02-after-work-25-2-editorial.jpg` | editorial | `/journal/things-to-do-after-work-instead-of-scrolling` | After Work Activities | live |
| 15 | 2027-01-18 | `41-shop-sporty-girl-1-cover.jpg` | cover | `/shop/sporty-girl` | Active Hobbies | live |
| 16 | 2027-01-19 | `42-shop-girls-night-in-1-editorial.jpg` | editorial | `/shop/girls-night-in` | Girls' Night Ideas | live |
| 17 | 2027-01-20 | `03-creative-home-21-2-steps.png` | steps | `/journal/creative-hobbies-you-can-start-at-home` | Creative Hobbies for Beginners | live |
| 18 | 2027-01-21 | `43-shop-bookish-girl-1-cover.jpg` | cover | `/shop/bookish-girl` | Cozy Hobbies | live |
| 19 | 2027-01-22 | `04-junk-journal-2-checklist.png` | checklist | `/journal/how-to-start-junk-journaling` | Junk Journaling | live |
| 20 | 2027-01-23 | `44-shop-little-adventures-1-editorial.jpg` | editorial | `/shop/little-adventures` | Affordable Adventures | live |
| 21 | 2027-01-24 | `31-quiz-2-quiz.png` | quiz | `/hobby-finder` | Plans Past Five | live |
| 22 | 2027-01-25 | `01-35-hobbies-3-quote.png` | quote | `/journal/hobbies-to-try-when-life-feels-like-work-sleep-repeat` | Creative Hobbies for Beginners | live |
| 23 | 2027-01-26 | `32-plans-2-quiz.png` | quiz | `/make-plans` | Weekend Activities | live |
| 24 | 2027-01-27 | `35-bucket-list-2-headline.png` | headline | `/printables/out-of-office-bucket-list` | Printable Planners | live |
| 25 | 2027-01-28 | `02-after-work-25-3-headline.png` | headline | `/journal/things-to-do-after-work-instead-of-scrolling` | After Work Activities | live |
| 26 | 2027-01-29 | `36-weekend-planner-2-quote.png` | quote | `/printables/weekend-edit-planner` | Printable Planners | live |
| 27 | 2027-01-30 | `03-creative-home-21-3-quote.png` | quote | `/journal/creative-hobbies-you-can-start-at-home` | Creative Hobbies for Beginners | live |
| 28 | 2027-01-31 | `37-hobby-tracker-2-headline.png` | headline | `/printables/hobby-era-tracker` | Printable Planners | live |
| 29 | 2027-02-01 | `31-quiz-3-quiz.png` | quiz | `/hobby-finder` | Plans Past Five | live |
| 30 | 2027-02-02 | `04-junk-journal-3-steps.png` | steps | `/journal/how-to-start-junk-journaling` | Junk Journaling | live |
| 31 | 2027-02-03 | `05-low-energy-1-headline.png` | headline | `/journal/low-energy-hobbies` | Cozy Hobbies | HOLD |
| 31 | 2027-02-03 | `06-find-a-hobby-1-headline.png` | headline | `/journal/how-to-find-a-hobby-as-an-adult` | Creative Hobbies for Beginners | HOLD |
| 32 | 2027-02-04 | `07-affordable-hobbies-1-headline.png` | headline | `/journal/affordable-hobbies-under-25` | Affordable Adventures | HOLD |
| 33 | 2027-02-05 | `08-junk-supplies-1-checklist.png` | checklist | `/journal/junk-journaling-supplies-for-beginners` | Junk Journaling | HOLD |
| 34 | 2027-02-06 | `09-air-dry-clay-1-cover.jpg` | cover | `/journal/how-to-start-air-dry-clay` | Creative Hobbies for Beginners | HOLD |
| 35 | 2027-02-07 | `10-watercolor-1-editorial.jpg` | editorial | `/journal/watercolor-painting-for-beginners` | Creative Hobbies for Beginners | HOLD |
| 36 | 2027-02-08 | `11-embroidery-1-headline.png` | headline | `/journal/how-to-start-embroidery` | Cozy Hobbies | HOLD |
| 37 | 2027-02-09 | `12-crochet-1-headline.png` | headline | `/journal/how-to-start-crocheting` | Cozy Hobbies | HOLD |
| 38 | 2027-02-10 | `13-flower-arranging-1-editorial.jpg` | editorial | `/journal/flower-arranging-as-a-hobby` | Cozy Hobbies | HOLD |
| 39 | 2027-02-11 | `14-starter-kits-1-cover.jpg` | cover | `/journal/creative-hobby-starter-kits-worth-considering` | Hobby Starter Kits | HOLD |
| 40 | 2027-02-12 | `15-weekend-things-1-cover.jpg` | cover | `/journal/things-to-do-on-the-weekend` | Weekend Activities | HOLD |
| 41 | 2027-02-13 | `16-creative-weekend-1-editorial.jpg` | editorial | `/journal/at-home-creative-weekend` | Weekend Activities | HOLD |
| 42 | 2027-02-14 | `17-picnic-1-editorial.jpg` | editorial | `/journal/how-to-plan-a-perfect-picnic` | Weekend Activities | HOLD |
| 43 | 2027-02-15 | `18-cheap-adventures-1-cover.jpg` | cover | `/journal/cheap-weekend-adventures` | Affordable Adventures | HOLD |
| 43 | 2027-02-15 | `19-solo-dates-1-cover.jpg` | cover | `/journal/solo-date-ideas` | Solo Date Ideas | HOLD |
| 44 | 2027-02-16 | `20-solo-coffee-1-editorial.jpg` | editorial | `/journal/how-to-take-yourself-on-a-solo-coffee-shop-date` | Solo Date Ideas | HOLD |
| 45 | 2027-02-17 | `21-cozy-solo-home-1-headline.png` | headline | `/journal/cozy-solo-dates-at-home` | Solo Date Ideas | HOLD |
| 46 | 2027-02-18 | `22-solo-saturday-1-steps.png` | steps | `/journal/how-to-plan-a-perfect-solo-saturday` | Solo Date Ideas | HOLD |
| 47 | 2027-02-19 | `23-girls-night-1-cover.jpg` | cover | `/journal/girls-night-ideas-that-arent-drinks` | Girls' Night Ideas | HOLD |
| 48 | 2027-02-20 | `24-craft-night-1-editorial.jpg` | editorial | `/journal/how-to-host-a-craft-night` | Girls' Night Ideas | HOLD |
| 49 | 2027-02-21 | `25-book-club-1-cover.jpg` | cover | `/journal/how-to-start-a-book-club` | Girls' Night Ideas | HOLD |
| 50 | 2027-02-22 | `33-budget-tool-1-checklist.png` | checklist | `/tools/hobby-budget` | Affordable Adventures | HOLD |
| 51 | 2027-02-23 | `26-mahjong-1-editorial.jpg` | editorial | `/journal/how-to-host-a-mahjong-night` | Girls' Night Ideas | HOLD |
| 52 | 2027-02-24 | `27-active-no-gym-1-cover.jpg` | cover | `/journal/active-hobbies-for-women-who-dont-love-the-gym` | Active Hobbies | HOLD |
| 53 | 2027-02-25 | `28-tennis-1-editorial.jpg` | editorial | `/journal/how-to-start-playing-tennis-as-an-adult` | Active Hobbies | HOLD |
| 54 | 2027-02-26 | `29-pickleball-1-headline.png` | headline | `/journal/pickleball-for-beginners` | Active Hobbies | HOLD |
| 55 | 2027-02-27 | `05-low-energy-2-editorial.jpg` | editorial | `/journal/low-energy-hobbies` | Cozy Hobbies | HOLD |
| 55 | 2027-02-27 | `30-cycling-1-headline.png` | headline | `/journal/how-to-get-into-recreational-cycling-as-an-adult` | Active Hobbies | HOLD |
| 56 | 2027-02-28 | `06-find-a-hobby-2-steps.png` | steps | `/journal/how-to-find-a-hobby-as-an-adult` | Creative Hobbies for Beginners | HOLD |
| 57 | 2027-03-01 | `07-affordable-hobbies-2-checklist.png` | checklist | `/journal/affordable-hobbies-under-25` | Affordable Adventures | HOLD |
| 58 | 2027-03-02 | `08-junk-supplies-2-editorial.jpg` | editorial | `/journal/junk-journaling-supplies-for-beginners` | Junk Journaling | HOLD |
| 59 | 2027-03-03 | `09-air-dry-clay-2-steps.png` | steps | `/journal/how-to-start-air-dry-clay` | Creative Hobbies for Beginners | HOLD |
| 60 | 2027-03-04 | `10-watercolor-2-checklist.png` | checklist | `/journal/watercolor-painting-for-beginners` | Creative Hobbies for Beginners | HOLD |
| 61 | 2027-03-05 | `11-embroidery-2-steps.png` | steps | `/journal/how-to-start-embroidery` | Cozy Hobbies | HOLD |
| 62 | 2027-03-06 | `12-crochet-2-checklist.png` | checklist | `/journal/how-to-start-crocheting` | Cozy Hobbies | HOLD |
| 63 | 2027-03-07 | `13-flower-arranging-2-steps.png` | steps | `/journal/flower-arranging-as-a-hobby` | Cozy Hobbies | HOLD |
| 64 | 2027-03-08 | `14-starter-kits-2-checklist.png` | checklist | `/journal/creative-hobby-starter-kits-worth-considering` | Hobby Starter Kits | HOLD |
| 65 | 2027-03-09 | `15-weekend-things-2-headline.png` | headline | `/journal/things-to-do-on-the-weekend` | Weekend Activities | HOLD |
| 66 | 2027-03-10 | `16-creative-weekend-2-steps.png` | steps | `/journal/at-home-creative-weekend` | Weekend Activities | HOLD |
| 67 | 2027-03-11 | `17-picnic-2-checklist.png` | checklist | `/journal/how-to-plan-a-perfect-picnic` | Weekend Activities | HOLD |
| 67 | 2027-03-11 | `18-cheap-adventures-2-headline.png` | headline | `/journal/cheap-weekend-adventures` | Affordable Adventures | HOLD |
| 68 | 2027-03-12 | `19-solo-dates-2-quote.png` | quote | `/journal/solo-date-ideas` | Solo Date Ideas | HOLD |
| 69 | 2027-03-13 | `20-solo-coffee-2-steps.png` | steps | `/journal/how-to-take-yourself-on-a-solo-coffee-shop-date` | Solo Date Ideas | HOLD |
| 70 | 2027-03-14 | `34-tonight-tool-1-headline.png` | headline | `/tools/tonight` | After Work Activities | HOLD |
| 71 | 2027-03-15 | `21-cozy-solo-home-2-editorial.jpg` | editorial | `/journal/cozy-solo-dates-at-home` | Solo Date Ideas | HOLD |
| 72 | 2027-03-16 | `22-solo-saturday-2-cover.jpg` | cover | `/journal/how-to-plan-a-perfect-solo-saturday` | Solo Date Ideas | HOLD |
| 73 | 2027-03-17 | `23-girls-night-2-checklist.png` | checklist | `/journal/girls-night-ideas-that-arent-drinks` | Girls' Night Ideas | HOLD |
| 74 | 2027-03-18 | `24-craft-night-2-steps.png` | steps | `/journal/how-to-host-a-craft-night` | Girls' Night Ideas | HOLD |
| 75 | 2027-03-19 | `25-book-club-2-steps.png` | steps | `/journal/how-to-start-a-book-club` | Girls' Night Ideas | HOLD |
| 76 | 2027-03-20 | `26-mahjong-2-checklist.png` | checklist | `/journal/how-to-host-a-mahjong-night` | Girls' Night Ideas | HOLD |
| 77 | 2027-03-21 | `27-active-no-gym-2-headline.png` | headline | `/journal/active-hobbies-for-women-who-dont-love-the-gym` | Active Hobbies | HOLD |
| 78 | 2027-03-22 | `28-tennis-2-quote.png` | quote | `/journal/how-to-start-playing-tennis-as-an-adult` | Active Hobbies | HOLD |
| 79 | 2027-03-23 | `29-pickleball-2-checklist.png` | checklist | `/journal/pickleball-for-beginners` | Active Hobbies | HOLD |
| 79 | 2027-03-23 | `30-cycling-2-steps.png` | steps | `/journal/how-to-get-into-recreational-cycling-as-an-adult` | Active Hobbies | HOLD |
| 80 | 2027-03-24 | `05-low-energy-3-checklist.png` | checklist | `/journal/low-energy-hobbies` | Cozy Hobbies | HOLD |
| 81 | 2027-03-25 | `06-find-a-hobby-3-quote.png` | quote | `/journal/how-to-find-a-hobby-as-an-adult` | Creative Hobbies for Beginners | HOLD |
| 82 | 2027-03-26 | `07-affordable-hobbies-3-editorial.jpg` | editorial | `/journal/affordable-hobbies-under-25` | Affordable Adventures | HOLD |
| 83 | 2027-03-27 | `08-junk-supplies-3-cover.jpg` | cover | `/journal/junk-journaling-supplies-for-beginners` | Junk Journaling | HOLD |
| 84 | 2027-03-28 | `10-watercolor-3-quote.png` | quote | `/journal/watercolor-painting-for-beginners` | Creative Hobbies for Beginners | HOLD |
| 85 | 2027-03-29 | `14-starter-kits-3-editorial.jpg` | editorial | `/journal/creative-hobby-starter-kits-worth-considering` | Hobby Starter Kits | HOLD |
| 86 | 2027-03-30 | `15-weekend-things-3-checklist.png` | checklist | `/journal/things-to-do-on-the-weekend` | Weekend Activities | HOLD |
| 87 | 2027-03-31 | `19-solo-dates-3-checklist.png` | checklist | `/journal/solo-date-ideas` | Solo Date Ideas | HOLD |
| 88 | 2027-04-01 | `23-girls-night-3-quote.png` | quote | `/journal/girls-night-ideas-that-arent-drinks` | Girls' Night Ideas | HOLD |
| 89 | 2027-04-02 | `24-craft-night-3-checklist.png` | checklist | `/journal/how-to-host-a-craft-night` | Girls' Night Ideas | HOLD |
| 90 | 2027-04-03 | `27-active-no-gym-3-quote.png` | quote | `/journal/active-hobbies-for-women-who-dont-love-the-gym` | Active Hobbies | HOLD |
