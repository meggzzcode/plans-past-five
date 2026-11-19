# C4 - Budget-conscious weekend persona (about $40)

SIMULATED SENTIMENT from an AI persona, not real customer research. Method: Playwright chromium on the production build at 390 and 320 px wide. I drove the Make Some Plans, Hobby Starter Budget, Saved, Search and Tonight pages, plus the Crochet, Watercolor and Yoga hobby profiles and the "25 Weekend Adventures That Cost Almost Nothing" article. Nothing bought, no external sites opened. I viewed screenshots only for the Make Some Plans form and a plan result. Everything else is read from page text.

## Narrative
1. Make Some Plans loads with defaults silently pre-selected (Full Saturday, full day, Creative, Just me, Under $25). I expected a blank form, and the "Creative" default quietly shapes every plan. The page is clean at 390 and 320 with no horizontal scroll.
2. Under $25, Saturday, home: 3 stops, "about $10 (range $5 to $15)". Flowers $5-15, collage free and dance free sum to $5-15, so the total is correct. Midpoint rounding is fine. The day has 3h45m and 2h gaps, which is thin for "a full day".
3. Free + Weeknight + Just me + Indoors + few hours: Magazine collage then Dinner for one, 2h15m, "Free", "kept indoors", nothing to book. This respected every choice. Verdict: good.
4. Free full weekend: 6 stops, all Free. Pickleball ("bring or borrow a paddle") and the bike ride quietly assume gear, so "Free" is optimistic. The title says "creative weekend" but the items are pickleball, bike and yoga. The header reads "17h 30m", which is confusing for 6 hours of activities.
5. Under $25 + Outdoors weekend: Café window sketch $4-12 + 5 free = "about $8 ($4-12)", correct. But a café sketch and "backyard stargazing" are loosely "outdoors", and it includes "Sign up ahead" volunteering despite "nothing to book" in the page promise.
6. Under $50, partner, low-key: flowers $5-15 + watercolor $0-15 + zine free = $5-30, shown "about $18 ($5-30)", correct. Respects low energy and budget. Honest range, but I only had a $40 budget in mind and there is no "Under $40" option.
7. Swap, Shuffle and "Too much? Make it lighter" all work. Lighter drops a stop and says plainly "You asked for a full day. We could fit about 3h 45m...". Honest, with the total recalculated each time.
8. Copy plan copies a tidy text block plus a link. Share (on the restored plan and on /saved) calls the native share sheet with the same text. Print button exists. Save toasts "Saved on this device. No account."
9. /saved lists the plan with "Opens this exact itinerary again". Opening it reproduced the identical plan and cost. The backup code round trip works: I cleared storage, pasted the code, "Check code" reported "Found 1 saved item", then "Add to this device". Good. Frustration: the saved card shows no total cost or date, only "Morning: ... Afternoon: ...".
10. Budget tool, Yoga for Beginners: $0-25 (1 counted, 2 optional left out). Crochet: $5-25. Watercolor: $10-35. "Keep it lean" and "Treat myself" move the range ($0-20 / $0-35 for yoga; $10-25 / $15-50 for watercolor) with no explanation of why. Rounding is outward: watercolor items sum to $14-33 but show $10-35. Ticking all "I already have this" gives "FREE TO START", which is good. Confusing: the heading is "OPTIONAL EXTRAS (INCLUDE IN MY TOTAL)" but the result says "optional left out", and the control is labelled "I already have this", so it is unclear how to include them.
11. Comparison against profiles. Crochet profile "$5 to $25" matches the tool. Watercolor profile "$10 to $35" matches the tool and "Under $50" label. Yoga profile "$0 to $25" matches. Consistent. But the shop blocks show no prices at all ("We show no prices"), so I cannot check the budget against what I would actually pay. The watercolor "one pick" is a 48-color set that sounds more than the $6-15 "student set" in the tool. The crochet profile lists a 5mm hook and scissors in the kit, yet the shop block shows only two yarns, with no hook.
12. Article "25 Weekend Adventures That Cost Almost Nothing": nice voice, safety notes, sources, a no-spend promise. But almost every item's cost reads "Varies" (one "Free"). For a budget reader that is the weakest part.
13. Search: "cheap date" gives 13 results, "looking for: low cost, better with others", but top hits are Friendship Bracelets, Jigsaw Puzzles, Hiking, Yoga and Dance Classes (a paid drop-in), which does not read as dates. "yoga" gives exactly 1 correct result. "tired" gives 31 results and no high-energy hobbies (hiking, tennis, pickleball, running, roller skating, dance absent), which is smart, though the list is 30 hobbies deep. Nonsense gives "0 results" plus a helpful set of suggestions (Free hobbies, Cheap date ideas...). "$40" returns 0 results (no price search). No raw markdown, leaked notes or console errors seen.
14. Tonight tool: "an hour, running on fumes, free, just me" returned Collage Art, Creative Writing... sensible, free, and with "Make it a whole plan".
15. Technical: no horizontal overflow at 390/320 on 9 pages, no console errors or failed requests. Some images read as unloaded because they were below the fold (lazy). Not confirmed as broken. The sitemap omits some hobby profile pages that exist (for example /hobbies/yoga-for-beginners), though home says "All 43 hobbies".

## Answers
- Keep exploring: yes. Plans tool and honest totals are the hook.
- Trust: moderately high. Rough-estimate language, "we don't currently earn from these links", sources and safety notes. Lowered by no prices on products and many "Varies".
- Try a hobby: yes, Yoga at home or collage tonight; both free.
- Click a product: I would open the crochet yarn (Red Heart, plain light color, clear reason) because the reasoning is concrete. I would not click the 48-color watercolor set (I can't see the price, and it is more than a beginner needs for $10).
- Buy supplies: lukewarm. With no prices, a $40 shopper can't confirm the kit fits.
- Save: yes, tried. Plans save with local storage and backup code. Articles/hobbies/products have Save/heart actions.
- Share: tried Copy plan, Share and Send to the group chat. Works.
- Return: yes, for the plan builder and "Tonight". Moments interest dropped: seeing "Varies" for nearly every item in the cheap-adventures list; no prices on shop picks; the "17h 30m" weekend header; "Creative" weekend with pickleball and bike.

## Strengths
- Plan totals sum correctly in every case I checked.
- Filters (free, indoors, solo, low-key) are respected.
- Save/restore/backup works end to end.
- Honest "lighter" message when it cannot fill a full day.
- Candid disclosures and phone layout at 320.

## Frustrations and unanswered questions
- No prices on shop picks. No "$40" tier. Optional-extras wording. Unexplained lean/treat multipliers. "Free" plans that assume gear.

## Scores (1-10)
- First impression 8: warm, clear hook, fast.
- Aesthetic appeal 8: coherent type and color, clean at 320.
- Navigation 7: tools are findable; Search icon, saved and footer work; defaults pre-selected and sitemap gaps.
- Editorial authenticity 7: real voice and caveats; the "Varies" list feels templated.
- Usefulness 7: plan builder is strong; cost gaps hold it back.
- Trust 8: checked sums, disclosures, sources.
- Product desirability 5: no prices, one pick mismatched to a lean budget.
- Willingness to purchase supplies 5: can't verify against $40.
- Willingness to return 7: the planner and Tonight.
- Willingness to share 7: Share and Copy worked.
- Business credibility 7: polished; sitemap and cost gaps.

## Top 8 fixes
1. Show rough price or a price band on every shop pick (or a "typical $X" line) and tie it to the budget tool.
2. Replace "Varies" in the cheap-adventures article with real cost bands (Free / under $10 / under $25).
3. Fix the budget tool's optional-extras wording and add a one-line explanation of Lean/Balanced/Treat.
4. Make "Free" plans honest about borrowed gear (paddle, bike) or exclude them from the free filter.
5. Don't pre-select a vibe, or show "Creative" as a visible default; align titles with the stops (creative weekend with pickleball).
6. Add an "Under $40" or custom amount; add cost and date to saved plan cards.
7. Re-rank "cheap date" results (date-able first, drop paid classes) and support "$40" style queries.
8. Complete the sitemap, fix the weekend duration header (17h 30m), and add the missing crochet hook pick.

## Summary
1. Simulated budget persona review at 390 and 320 px; no layout or console errors found.
2. Plan builder totals are correct and respect free, solo, indoors, low-key and tonight choices.
3. Save, restore, share, copy and backup-code import all work.
4. Budget tool matches hobby profiles but has confusing optional-extras wording and unexplained lean/treat multipliers.
5. Biggest weakness: no prices on shop picks and "Varies" costs in the cheap-adventures article.
6. Search is decent ("yoga", "tired", nonsense), but "cheap date" results are not date-like; scores range 5-8.
