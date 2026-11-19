# R3-3 Affordable Weekend (persona: 25-year-old, $40 budget, Saturday with one friend)

NOTE: simulated reviewer opinions, not real customer data. Tested with Playwright/Chromium at 390x844 (main run) and 320x640 (overflow checks only; one plan screenshot reviewed). Localhost dev server. The server dropped (connection refused) for a few minutes mid-session; I restarted `vite dev` on port 5950 (no repo files edited) and carried on. No external links clicked.

## Task 1: plan a Saturday with a friend, ~$40, medium energy. Outcome: partly
- /make-plans has no $40 option (Free / Under $25 / Under $50 / Under $100 / Flexible). Picked Under $50. Defaults arrive pre-selected (Full Saturday, A full day), so the form looks "done" before you touch it.
- Full Saturday / few hours / Social / A friend / Under $50 / Medium: 1:00 PM Cookie batch ($5-15, 1h15) and 2:45 PM Two-person book club (Free, 1h30). Header "3h 15m, about $10 (range $5 to $15)". Totals add up; times are consistent (1:00+1:15 then 15-minute gap). Result in about 1.5s.
- Full day variant: 9:30 AM "One-off volunteer shift" (3h, "search near you and sign up in advance"), 1:00 PM Cookie batch, 5:30 PM Cook a new recipe together. Header "10h, about $27 (range $13 to $40)" - sums correctly, and the high end exactly hits $40. But: a volunteer shift you must sign up for in advance is not something you can do "this Saturday with a friend" on the fly, and two baking/cooking items back to back is repetitive. A 3h 15m gap is shown as "free" time, good. "10h" is span including gaps, a bit misleading as a total.
- Sensible touches: "with a friend" wording in title and book-club "together" copy; costs are ranges and honest ("rough estimate"). No travel time between activities and no meal/transport cost is modelled; ideas have no places, so "realistic" is generic.
- Swap button worked (Cookie batch became Park toss); Save shows "Saved on this device. No account."

## Task 2: change answers. Outcome: mostly done, one contradiction found
- Solo / Creative / Under $25: "Your little creative Saturday for one", Cookie batch + One-color photo walk, about $10. Respects choices.
- Free / Relaxing / friend: Two-person book club + Magazine collage, total "Free". Respects choices (though 30-minute gap between them is not shown here, unlike other plans).
- Weeknight / Cozy / friend / Under $25 / Indoors / Low-key: one item, "Bookstore date" 6:00 PM, $0-15. Title says "date" for a friend plan; the "How long" question is hidden for weeknight (fine). Respects budget and indoors.
- Full Saturday / Half a day / Active / friend / Indoors / Medium: only "Beginner yoga at home" 30 min, Free, with a notice "You asked for half a day. We could fit about 30 min... Try dropping the indoor/outdoor choice". Honest, good, but yoga at home is not really a "with a friend" activity, and the plan fell far short of half a day.
- Outdoorsy / Outdoors / friend: photo walk, bike ride, "One roll, one walk" ($15-40 for film). Total $15-40 within $50. Respects outdoors. Bike ride assumes you have a bike.
- Weeknight / Active / Just me / Free / High energy: one item, yoga at home, 30 min. High-energy request got a low-energy answer (yoga is low energy on its own profile page), so "Active/High energy" is not honoured; contradiction.
- Tonight tool: fumes/free/solo/indoors gave Collage Art, Creative Writing, Reading/Crossword (all free, low energy, solo). Bursting/Under $50/with someone/outdoors gave Tennis, Roller Skating, Pickleball (roller skating is typically a rink, listed under outdoors). Okay/$25/with someone/indoors: first idea's title is a whole sentence ("Go to an adults' skate night and wobble together") rather than a name. "Tonight" with "whole evening" gives 3 ideas, each 20 min to 1h30, not a sequenced evening.

## Task 3: budget tool for two hobbies vs profiles. Outcome: done, small disagreements
- Yoga for Beginners: tool $0-25 (mat $0-25 essential; blocks and drop-in class optional, left out). Profile: "Under $25 to start", "$0 to $25". Agrees. "Treat myself" setting raises to $0-35.
- Pottery Painting: tool $15-40; profile "$15 to $40", "Under $50 to start". Agrees. Profile says "WHERE: Indoors or out" for a studio activity, odd.
- Tennis (extra): tool $15-50 counts racket ($15-40) + balls ($3-7) = $18-47, shown as $15-50 (rounded); sneakers, water, lesson are "optional" in the tool but the profile lists Sneakers and Water as starter-kit essentials. Profile "Under $50", yet its "Needs a lesson or two" difficulty plus "Beginner group lesson ($15-40)" would push over $50. Mild disagreement.
- Watercolor on the budget tool: items $6-15 + $5-10 + $3-8 = $14-33 but total shows "$10-35" (rounded down). Small, but shows totals are fuzzed, not summed.
- Tool is a plain select + chips + checkboxes, clear, and every estimate is labelled "(estimate)". Note: nothing ties the budget tool to the planner's $40.

## Task 4: save, refresh, restore, copy. Outcome: done
- Save works ("Saved on this device. No account."). Refresh of /make-plans without parameters shows a blank form again (plan not auto-restored); the plan lives under /saved ("Penciled in. Saved itineraries") with a link that reopens the exact itinerary (parameters and ids in URL). Restore worked, including after the server restart when re-opened via link. Clear warning "Not synced. Clearing browser data removes it" and backup/export options.
- Planner "Copy plan" text: "Your little social Saturday with a friend / Free on Saturday? I planned it, want to join me? / 1:00 PM Park toss (1h, Free) / 2:30 PM Two-person book club (1h 30m, Free) / Total: 3h, Free (rough estimate) / Open the same plan: <long URL with ?when=...&ids=...>". I would paste this in a group chat: friendly line, times, cost. The URL is long and ugly (query string), but fine.
- /saved "Copy as text" and "Send to the group chat" give a worse version: "Afternoon: Park toss / Afternoon: Two-person book club / <URL>" - no times, cost or friendly line. I would not paste that. The two copy formats are inconsistent.

## Task 5: search. Outcome: done
- "cheap date": 13 results ("looking for: low cost, better with others"). Top results: Friendship Bracelets, Jigsaw Puzzles, Hiking, Yoga for Beginners, Dance Classes, Roller Skating... Reasonable but not date-shaped; the filter interprets it as "low cost + social", results not clearly ordered by cost.
- "yoga": 1 result, Yoga for Beginners. Correct.
- "tired": 31 results, "looking for: low energy", 30 hobbies - mostly right (journaling, watercolor, knitting) but 30 of 43 is not much of a filter.
- "blorptz": "0 results", helpful fallback list (Free hobbies, Cheap date ideas, Yoga, hobby quiz, Make a plan). Good.
- Each search took ~1.2-1.8s.

## Viewports
- 390x844: no horizontal scroll on any page tested; plan card, buttons and chips read well; plan result appears below the form (long scroll; footer is also long).
- 320x640: scrollWidth 320 and no off-screen elements on /, /make-plans, /tonight, /hobby-budget, /saved, /search. Plan card text wraps fine, not clipped. Park toss shows a placeholder icon image (a green star) rather than a photo at 320 (the cookie batch had a photo), so image treatment is uneven.

## What delighted me
- Honest, plain tone: "rough estimate", "You asked for half a day. We could fit about 30 min", no account needed.
- Copy-to-group-chat text with "Free on Saturday? I planned it, want to join me?".
- Save with clear "this device only" disclosure plus backup.
- Zero-result page with useful alternatives; swap per item.

## What made me hesitate or leave
- No $40 budget choice; default selections pre-checked.
- Plans are generic (no places, no travel/meal time), sometimes thin (30 minutes for "half a day"), and "active/high energy" can return yoga.
- Volunteer shift with advance sign-up in a same-day plan; repeated cooking items.
- Saved-page copy text is bare compared with the planner copy; refresh clears the plan unless you saved it.
- Server outage during testing (dev server; may not be a product issue).

## Top 8 fixes ranked by impact
1. Make plans for high-energy/active requests respect energy (don't return yoga), and fill the requested duration or explain more.
2. Make "Copy as text" on /saved identical to the planner copy (times, cost, friendly line).
3. Add a custom/$40 budget (slider or Under $40) and show a running total versus budget.
4. Exclude advance-booking items (volunteer shift) from "this Saturday" plans or label them.
5. Avoid repeating the same activity type back to back (two cooking items).
6. Add travel/meal buffers or a "Need to get there" note; show total cost with and without gaps clarity ("10h" span).
7. Align the budget tool with hobby profiles (tennis shoes/water essential vs optional; show unrounded totals consistent with items).
8. Rework search ranking for "cheap date" (order by cost, date-like items) and tighten "tired"; unify image treatment (placeholder star icons).

## Scores (simulated, 1-10)
| Dimension | Score | Evidence |
|---|---|---|
| First impression | 7 | Warm green/red styling, clear tagline and Start Here cards; long page |
| Aesthetic appeal | 8 | Cohesive typography and palette at 390 and 320, no overflow; some placeholder images |
| Navigation | 7 | Header icons, footer lists, tool links; plan result is far below the form |
| Editorial authenticity | 7 | Friendly honest voice, but ideas generic and a few odd titles |
| Usefulness | 6 | Plans add up but lack places/travel; energy mismatch on active |
| Trust | 8 | "Rough estimate" everywhere, no-account disclosure, backup option |
| Product desirability | 6 | Fun planner, no real reason to buy beyond affiliate lists |
| Willingness to purchase | 5 | Mostly free ideas; I didn't see anything compelling to buy on my path |
| Willingness to return | 6 | Planner and tonight tool are quick and free |
| Willingness to share | 7 | Group-chat copy text is shareable (planner version) |
| Business credibility | 7 | Disclosures and methodology pages exist; cannot judge business beyond that |
| Buyer readiness | 5 | Budget tool links to starter kits but is disconnected from plans; no $40 path |
