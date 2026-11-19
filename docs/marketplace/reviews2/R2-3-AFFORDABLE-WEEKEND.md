# R2-3 Affordable Weekend (persona: 25yo, $40 budget, Saturday with a friend)

NOTE: These are simulated reviewer opinions from one automated walkthrough (Playwright, chromium, 390x844 and 320x640), not real customer data.

## Task 1: Plan a Saturday with a friend, ~$40, medium energy. Outcome: PARTLY
- Planner at /make-plans has no $40 option (Free / Under $25 / Under $50 / Flexible). Picked Under $50 (closest). Chose Full Saturday, Half a day, Social, A friend, Either, Medium. Result in ~1.6s.
- Plan "Your little social Saturday with a friend": 9:30 Drop-in class ($0-30, 1h30), 12:00 Two-person book club (Free, 1h30), 2:00 Park toss (Free, 1h). Header "5h 30m, about $15 (range $0 to $30)". Times and totals are consistent (9:30 to 3:00 = 5h30; $0+$0+$30 = $30 max). Under $40.
- Realism problems: "Drop-in class" is generic ("find a class near you ... or pick a free video"), which is not a plan item. "Two-person book club" at noon = "choose a short novel together and set a date to talk" is not a Saturday activity. No travel time or meal/coffee break between items (only "1h free" gap). "Full Saturday" but only ends about 3 PM. It does respect "with a friend" (two-person items, park toss) and the budget.
- Disclaimer says ideas are location-independent, which is honest but means it is a list of prompts, not an itinerary.

## Task 2: Change answers. Outcome: DONE, mostly respected
- Solo (Relaxing, Just me, Under $50): "Relaxing Saturday for one": meal prep, bookstore date, cafe crossword; $13-$50 range, "about $33" (midpoints sum to ~$31.5, minor mismatch). Respects solo. "Big-pot meal prep" is not very relaxing/Saturday-fun.
- Free (Free, friend): returned only 3h (Park toss, book club) with a clear note "You asked for half a day. We could fit about 3h... try a higher energy level for more." Respects Free; honest.
- Tonight (Evening, Cozy, friend, Under $25, Low-key): just ONE item, Bookstore date 6 PM, 1h. Respects choices but a thin "evening with a friend". Choosing Evening hides the "How long" row (no confusion but no control).
- Indoors: Drop-in class, book club, Thrift challenge; all plausible indoors; $0-45 range. Note a swap card for thrifting arguably needs travel.
- Outdoors/Free/Solo/High energy: one item, Short local trail walk, 2h30, Free. Respects it; safety tip included (good).
- "Keep it at home" checkbox works as a control (did not deeply test its output). No contradictions with chosen filters found.

## Task 3: Budget tool vs profiles. Outcome: DONE, mostly agree
- Watercolor: tool essentials $6-15 + $5-10 + $3-8 = $14-33, displayed "about $10-$35"; profile "Rough startup budget $10 to $35". Agree (tool rounds). Profile card says "Under $50 to start": looser but not wrong.
- Tennis: tool $15-$50 (racket+balls only; shoes, bottle, tote, lesson optional); profile $15 to $50. Agree. But profile "What you'll need" lists sneakers and water as essentials while the tool treats them as optional extras: small inconsistency; and a beginner lesson ($15-40) is described as "needs a lesson or two" yet excluded from the headline.
- Yoga: tool $0-25 and profile $0-25 agree; "Treat myself" gives $0-35 (differs but intended).
- The tennis journal article has no dollar figures, so nothing to compare.

## Task 4: Save, refresh, restore, copy. Outcome: DONE
- Save: button changes to "Saved", note "Saved on this device. No account." Reload keeps the plan (URL encodes inputs, so it also restores by link). /saved lists "Your little social Saturday with a friend", with Morning/Afternoon item labels, copy as text, send to group chat, backup/export. Good.
- Copied text: "Free on Saturday? I planned it, want to join me?" then times/items/costs, total, and an "Open the same plan" link. It is group-chat ready, friendly, and the link is a long query string (ugly but works). I would paste it, though "Drop-in class" and "Two-person book club" are vague enough that friends would ask "what is that?". Link points to 127.0.0.1 locally (dev environment, not judged).
- Same inputs gave the same plan twice (deterministic seed); Shuffle exists.

## Task 5: Search. Outcome: DONE with ranking concerns
- "cheap date": 15 results ("looking for: low cost, better with others"); top results Friendship Bracelets, Jigsaw Puzzles, Hiking, Yoga: weak for "date"; ranks are loose.
- "yoga": 1 result, Yoga for Beginners: correct.
- "tired": 31 results ("low energy"), 30 hobbies: too broad to help a tired person choose; no sorting by effort.
- "zxqvbn": "0 results" with helpful suggestion chips and links (Free hobbies, Cheap date ideas, quiz, make a plan). Good empty state.
- The header search icon opens /search?q= with example chips: good.

## Viewports
- 390x844 and 320x640: no horizontal overflow on /, /make-plans, /saved, /tools/hobby-budget, /tools/tonight, /search, /hobbies/tennis (scrollWidth equals viewport; no elements past the edge). Plan card at 320 wraps cleanly; the cost line "about $15 (range $0 to $30)" wraps onto a second line but is not clipped. Tap targets fine. No raw markdown or leaked internal notes seen. Plan cards for generic items show a placeholder star tile instead of photos (visually repetitive across items).

## What delighted me
- Honest tone ("No invented events, no fake opening hours"), the "we could fit about 3h" explanation, cost ranges instead of fake prices, saved-on-device clarity, friendly copy-as-text message, solid empty search state, no overflow at 320.

## What made me hesitate or leave
- No $40 / exact-budget input. Items are generic prompts ("find a class near you"), no travel or where-to-go. Thin results for evening/free (1-2 items). Search ranking for "cheap date" and "tired" is vague. No real venues means a 25-year-old still has to do the planning.

## Top 8 fixes ranked by impact
1. Replace generic items (Drop-in class, Two-person book club) with concrete, doable ideas with a "where/how" line.
2. Add a custom budget number (e.g. $40) or Under $40 option.
3. Show travel/buffer and meal slots; extend "Full Saturday" to a real day arc.
4. Give thin results (evening, free) 2-3 items or explain and suggest a relaxation of one filter.
5. Make "about $X" match the visible midpoint sums (33 vs ~31.5) or explain the method.
6. Search: rank "cheap date" toward date-shaped ideas; cap/sort "tired" results by lowest effort.
7. Align profile "What you'll need" with budget tool essentials (tennis sneakers/water; lesson).
8. Shorten the share link and show real photos instead of placeholder tiles.

## Scores (1-10, simulated)
| Dimension | Score | Evidence |
|---|---|---|
| First impression | 7 | Warm, clear planner headline; fast load; placeholder tiles on cards |
| Aesthetic appeal | 7 | Cohesive cream/cherry/sage, clean at 320; generic star tiles repeat |
| Navigation | 7 | Clear header/tools, search chips; search link lands on empty q= page |
| Editorial authenticity | 6 | Honest tone and disclaimers; plan items read generic |
| Usefulness | 5 | Totals consistent, filters respected, but plans too vague for a real Saturday |
| Trust | 8 | Honest ranges, "no invented events", local-only saving, consistent budget data |
| Product desirability | 6 | Nice idea, shallow output |
| Willingness to purchase | 4 | Shop links/affiliate not tested; no strong pull from plan |
| Willingness to return | 6 | Saved plans and budget tool are handy |
| Willingness to share | 6 | Group-chat copy text good; content vague |
| Business credibility | 7 | Policies, disclosures, clean build, no leaks |
| Buyer readiness | 4 | Generic items and budget gaps; no clear path from plan to purchase |
