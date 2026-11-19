# REVIEW 3: The Interactive Tools

**Important caveat:** I am simulating ONE reasonable person (late 20s/early 30s, 9-to-5, tired on weeknights, likes pretty things, impatient with forms, wary of lead capture). This is one simulated reader, not research. Real tests with 5 real people would be better and would catch things I cannot. Screenshots are in `/tmp/claude-0/review3/`.

Method: local dev build, Playwright, phone 390x844 first, then 320px and desktop. I ran the quiz with 5+ answer sets, the planner with about 8, Tonight with about 6, the budget tool with 6 hobbies, the directory with every filter, 3 hobby profiles, and 10 searches.

## Overall in one paragraph

It is a lovely, warm, trustworthy-feeling site, and the honesty is a real asset: "Made on your device. Nothing about you is collected or sent.", "(estimate)", "No invented events". There is no email wall anywhere, which is rare and very welcome. But the tools are thinner than their wrapping. The three "pick a result" tools draw from the same small pool of about 36 hobbies, so they start to feel samey fast (Crossword Puzzles, Collage Art, Creative Writing and Reading recur across tools). Several results contradict the answers I gave. There is no real "send to the group chat" button on the planner or the Tonight tool. Cost numbers disagree between pages for the same hobby.

---

## 1. /hobby-finder, "Find Your Thing" (quiz)

**Feel:** Cute, quick, low pressure. "Seven questions. No email. A playful guide, not a personality test." is exactly the right promise. Large tap targets, a progress bar, and a "← Back" button on each step. Seven taps took me about 25 seconds. Time to value is great.

**Questions in her words:** Mostly yes: "Be honest: how much energy do you have after work?" with "Running on fumes / Some left in the tank / Let's go" is the best line on the site. "None: I want to start tonight" is also good. Weak spots: Q2 option **"Indoors, home or out"** is confusing (it reads like a typo or like "Anywhere", and "Anywhere" is a separate option below it). Q1 **"Something different"** is vague. Q5 "Friends or new people" merges two very different social situations.

**Results, quoted:**
- Answers Creativity / At home / Under 45 min / Free / Just me / None / Fumes gave **"The Creative Girl"**, "Your beginner pick: Collage Art", then Creative Writing, Crossword Puzzles, Reading. Believable and cheap. "Why it fits: it gives you more creativity, works at home, a first session takes 45 minutes, costs nothing to start, matches a low-energy day, is beginner-friendly." The "Why it fits" line is the best part: it is specific and proves it listened.
- Answers Relaxation / Indoors, home or out / An hour or two / Under $25 / Friends or new people / A little / Some left gave **"The Creative Girl" again**, with the identical "HOBBIES THAT SUIT YOU: Junk Journaling, Watercolor Painting, Air-Dry Clay, Embroidery" chips, though the detailed list changed (Air-Dry Clay, Baking, Book Clubs, Crossword). I asked for relaxation and friends and was told I am a creative girl. Two quite different answer sets gave the same persona and the same chips. That is where it starts to feel like a personality quiz after all.
- Movement / Outdoors / An hour or two / Under $50 / Friends / A little / Let's go gave **"The Sporty Girl"**: Tennis, Pickleball, Roller Skating. Right and satisfying.
- Adventure / Somewhere new / Half a day / Flexible / Friends / Challenge / Let's go gave **"The Little Adventurer"**. The first result is **Museum Exploring, "low energy"**, even though I said "Bring on a challenge" and "Let's go". Minor mismatch. Budget shows "Varies — can start small", which is vague for someone who said Flexible.
- New friendships / Outdoors / Under 45 min / Free / Friends / None / Fumes (a tight combo) gave persona **"The Social Butterfly"**, a "beginner pick: Craft Nights" with a "First activity: Invite three friends for a bracelet night this week", and then a dashed box: **"Nothing fits every answer exactly. We'd rather be honest than pad the list... Loosening your time would open up more options."** I love the honesty. But it is confusing because the card above still shows four confident hobbies including Book Clubs and Mahjong (not outdoors, not 45 min), which contradicts the "nothing fits" box below. Also the suggestion says loosen "time" when the real culprit is likely "Outdoors + Fumes + Free". Only one button ("Change my answers") fixes it and it presumably restarts all seven.

**Shareability:** Result card has "Copy text", "Save card", "Print". Copy works ("Copied. Paste it anywhere you like."). The pasted text is short and charming: "My hobby era: The Creative Girl. ... A good first hobby to try: Collage Art. Find yours at planspastfive.com/hobby-finder". The link is not clickable (no https://). "Save card" downloads **an SVG (my-hobby-era-creative.svg)**, which most people cannot post to Instagram stories or iMessage easily. It should be a PNG. This is the most shareable thing on the site and it is one fix away from great. No native Share button (Web Share API) on phones.

**Edge cases:** In-page Back works. Browser Back leaves the page, not the previous question. **Refresh mid-quiz resets to Question 1** and refreshing the results page also loses the result (no URL). Keyboard works well: Tab, Enter, and focus moves to the next question heading. At 320px the layout is fine but the header logo breaks into "plans past" at the left and "five." floated to the right of it, which looks broken.

**Verdict:** Would use once, enjoy it, send the card to a friend if it were a PNG. Would not retake often.

---

## 2. /make-plans, "Make Some Plans" (planner)

**Feel:** The best idea on the site: an actual time-stamped itinerary. The form is seven rows of chips with sensible defaults already ticked (Full Saturday, A full day, Creative, Just me, Under $25, Either, No preference), so it is one tap to a result. Options adapt nicely: choosing "Weeknight" changes HOW LONG to "One stop / Two stops". But the defaults being pre-ticked means a lazy tap on "Make my plan" returns a plan she did not choose, and nothing tells her what was assumed. Vibe is single-select; I expected multiple ("cozy and social").

**Results, quoted:**
- Full Saturday / full day / Social / The group / Under $50: **"YOUR LITTLE SOCIAL SATURDAY WITH THE GROUP. About 6h 15m of plans · Estimated total about $13 to $40 (approximate) · fits under $50"**: 9:30 AM "One-off volunteer shift" (3h), 1:30 PM "Cookie batch", 6:30 PM "Cook a new recipe together". After shuffling I got "Drop-in class" at 9:30, "Cookie batch", "Two-person book club". This is mostly believable but it is not "a Saturday I would do": it opens with volunteering or a class at 9:30 AM and then "Bake one batch of cookies and give half away" for a group; "Two-person book club" is listed for The group. The "group" is barely reflected. There is no lunch, no travel time, no "meet at" slot, and a gap from 12:30 to 1:30 or 2:45 to 6:30 is unexplained. The pacing is evenly spaced (9:30 / 1:30 / 6:30) like a template.
- Full Sunday / Half a day / Outdoorsy / A friend / Flexible / Outdoors / High energy: title **"YOUR LITTLE OUTDOORSY SUNDAY"** (the friend is dropped from the title), 9:30 AM "Open-play pickleball", then **1:30 PM "Golden-hour park walk"**. Golden hour at 1:30 PM is wrong (and in November sunset is about 4:30). It is a content-vs-time bug. "Half a day" produced only 2h of plans. Pickleball labelled "Free (approximate)" but "Paddle" is in the supplies list.
- Full weekend / Relaxing / A partner / Under $25 / Low-key: six steps over two days, including a 20-minute Saturday-evening step **"Plan the next weekend"** (filler) and a "Golden-hour park walk" at 1:30 PM Sunday again. "A partner" is not reflected anywhere in the title ("YOUR LITTLE RELAXING WEEKEND"). Total "$0 to $25" is correct against budget and credible.
- Weeknight / One stop / Cozy / Just me / Free / Indoors / Low-key: **"Dinner for one. Make a nice dinner for one: candle, good plate, eat at the table."** 6:30 to 7:30 PM, Free. Lovely, realistic, on-brand. Best result I got.
- Evening / Social / The group / Free / Outdoors / Low-key (and Creative left selected): **"We couldn't build a plan that fits all of that... Nothing found for this slot. No creative idea fits this evening slot yet. Try dropping the indoor/outdoor choice."** Honest, and it tells her what to loosen, but it still shows "Save to My Plans" and "Print" on an empty plan, and it said "creative" when I was trying to get social (my own selection, but it highlights that nothing shows which vibe is active).

**Cost/time credibility:** Per-step ranges ("about $5 to $15", "about $8 to $25") are plausible and labelled "(approximate)", plus a footer "Costs are rough ranges for planning, not quotes." Totals add up. Good.

**Share with friends:** This is the biggest gap. Buttons are only **"Shuffle ideas", "Save to My Plans", "Print"**. No Copy, no Share, no "text this to the group chat". The URL after "Make my plan" stays at /make-plans (no parameters), so she cannot copy the address bar either. The only way to get a restorable link is via the Saved page, whose link is `/make-plans?when=saturday&length=full-day&vibe=social&who=group&budget=under50&home=0&setting=any&energy=any&seed=1&ids=drop-in%2Cbake%2Cbook-club` and which does restore the exact plan correctly (I verified). So the technology exists; it is just not exposed. A "Copy plan as text" and "Share link" button would be the single biggest upgrade. The plan on one page also has no printable/PDF-looking summary I could judge; "Print" exists.

**Saving:** "Save to My Plans" gives the toast "Saved to My Plans". On /saved: "Your little social Saturday with the group. Opens this exact itinerary again. Morning: Drop-in class / Afternoon: Cookie batch / Evening: Two-person book club". It worked after reload. Local-only is explained on /saved ("Saved items live in this browser only. They aren't synced between devices, and clearing your browser data will remove them.") but NOT at the moment of saving on the planner. A header badge shows the count. It feels safe (no account) but she may not realize her phone and laptop will not match.

**Edge cases:** 320px: no horizontal scroll, plan headline is huge (5 lines) but readable. Back button/refresh: results are lost on refresh (planner state is not in the URL).

**Verdict:** Most useful tool, would use again, but results need smarter composition (see improvements).

---

## 3. /tools/tonight, "What should I do tonight?"

**Feel:** Fast, on-brand ("It's after five and the sofa is calling"). Five question rows, and results appear immediately and update live with no submit button. Zero friction. But it renders results before she has answered anything (defaults: "An hour / Running on fumes / Free / Just me / Either"), which makes it feel like it answered a question she did not ask. The page also says "five quick questions" but they are all on one screen, which is better than a stepper.

**Results, quoted:**
- Defaults: "Birdwatching, About 1h, Free (estimate), First step: Sit on one park bench for 30 minutes and log every bird you hear." **Birdwatching for someone "running on fumes" in November after dark** is odd. "Collage Art" and "Creative Writing" follow.
- Whole evening / Bursting / Under $50 / With someone / Outdoors: "Hiking, About 3h... First step: Pick a short, well-marked trail under three miles and go on a Saturday morning." And "Picnicking... claim a patch of grass on Saturday." **For a tool called "tonight" these tell her to do it on Saturday morning**, which is a real contradiction. Three hours of hiking is not "the whole evening" for a worker leaving at 5:30.
- 30 min / Fumes / Free / Just me / Indoors: Creative Writing, Crossword Puzzles ("**Solve a Monday-level crossword with a friend over coffee.**" despite "Just me"), Reading. Fine but one contradicts her answers.
- 30 min / Fumes / Free / Just me / Outdoors: "**Only 1 idea fit. Try 'either' for indoor or outdoor.**" Honest. The idea was Reading (outdoors is a stretch) and the Shuffle button is disabled.
- A couple of hours / Flexible / With someone / Bursting / Indoors: Roller Skating, Film Photography, Mahjong. "Film Photography" indoors is a stretch.
- Okay / Under $25 / Either: Air-Dry Clay, bookstore date, Nature Photography. Shuffle gives genuinely different sets each time (good).

The ideas mix two types: hobby names ("Air-Dry Clay") and activities (the "First step" text); some cards show only a hobby name and the "First step" does the work. Each has "Hobby page" and "Read the guide", but no "Save" or "Share".

**Trust:** "Costs and times are approximate assumptions, not live prices or listings." Clear. Cost labels "(estimate)" are present.

**Verdict:** Would open it once on a bad night; would not rely on it until it knows about the time of day and the "tonight vs. weekend" difference. Doesn't feel "personal".

---

## 4. /tools/hobby-budget, "Hobby Starter Budget"

**Feel:** Clear and practical, the most "grown-up" tool. A dropdown with 36 hobbies, three experience levels, three budget attitudes, and tickboxes for "I already have this". Results update live: "YOUR ESTIMATE FOR WATERCOLOR PAINTING. ABOUT $15–$50. 3 items counted, 3 optional left out." Ticking everything gives "FREE TO START. You already own everything on this list. Go and start." (a nice touch). Nothing is saved or shared; no copy/print on this page itself (the hobby profile has "Copy list / Print list").

**Credibility problem: the numbers disagree with the rest of the site.**
- Watercolor Painting: the Hobby Directory card says "**Under $25 to start**"; the hobby profile says "ROUGH STARTUP BUDGET **$10 to $35**"; this tool says "**ABOUT $15–$50**". Three different answers for one hobby.
- Tennis (Brand new, Keep it lean): "**ABOUT $20–$115**" vs. the directory card "About $25–$50 to start" and the profile (Pickleball $25 to $100). "Keep it lean" still yields a top end of $115 because it adds every item's maximum together (Sneakers "$0–$40", Water bottle "$0–$15").
- Hiking, Brand new, Keep it lean: "**ABOUT $0–$65**" including "Comfortable shoes about $0–$42" and "Water about $0–$11". Ranges that wide are not useful for deciding. A $0 lower bound is honest but "Free to $65" is not a plan.
- "Keep it lean / Balanced / Treat myself" scale prices mechanically (Tennis treat: $30–$160), which reads as arithmetic, not as real product tiers.
All are labelled "(estimate)" and "Costs are approximate planning assumptions... not live prices", so labelling is excellent; the issue is consistency.

**Other points:** The 36-hobby dropdown is a long native select. No "recently viewed" or links from a hobby page to this tool pre-filled with that hobby (I did not find a direct one on the profile, though the profile has its own "Shopping checklist"). No total shown as "typical" (e.g., "most people spend about $X").

**Verdict:** Useful once she is already interested in a specific hobby, which is its limit. Would use it before buying. Would not send to a friend, but would reference it.

---

## 5. /saved, "My Plans"

"Penciled in. Everything you've saved, in one place. Saved items live in this browser only. They aren't synced between devices, and clearing your browser data will remove them." That is the right disclosure and it is clear. Hobbies saved show as plain name rows ("Collage Art") with an X, and "Clear all". Saved plans show a three-line summary and "Opens this exact itinerary again." Works after reload, restores precisely. Annoyances: saved hobby rows show only a name (no time/cost/why); no way to export or email-to-self (understandable given "no account", but a "Copy all as text" or a share link would solve the "phone vs laptop" gap); "Clear all" has no confirmation visible (I did not click it). The empty state, "Nothing on the calendar yet? Let's fix that.", is charming. No indication in the quiz or planner at the moment of saving that it is local-only.

---

## 6. /hobbies, directory and 3 profiles

**Directory:** "Thirty-six ways to be a beginner again." Cards are clear (time, budget, energy) and the filters are ten chips: "At home, Outdoors, After work, Weekend, Solo, Social, Creative, Active, Low energy, Free or low cost". They work and combine (AND logic) and show a count ("4 hobbies" for Outdoors + Low energy + Free + Social; results: Watercolor Painting, Birdwatching, Outdoor Sketching, Picnicking, which seems right-ish).

Problems: **filters barely filter.** Solo returns 31 of 36 and Social returns 30 of 36, After work 27, Low energy 26: nearly everything has every tag, so choosing "Solo" or "Social" tells her almost nothing. Outdoors includes "Reading" and "Watercolor Painting". "Active" returns only 4 (Tennis, Pickleball, Hiking, Roller Skating). Filter state is not in the URL, so she can't share a filtered list. I did not see sorting. No search box on the page.

**Missing hobbies:** There is no yoga, dancing, running, climbing, cooking classes, language learning, gardening outside indoor plants, or board-game nights beyond "Craft Nights"/"Mahjong". A search for "yoga" returns "0 results". For a 9-to-5 woman wanting movement, "Active" being only 4 items is thin and no gym, yoga, or dance class means "A Little Movement" feels light.

**Profiles (Watercolor Painting, Pickleball, Book Clubs):** Well written and practical: "DIFFICULTY / ROUGH STARTUP BUDGET / TIME COMMITMENT / WHERE", "Your first session", "A good first project", "Where to learn", "What you'll need", shop list, a "Shopping checklist" with Copy/Print, and "if you like pickleball, try…". "Approximate range, not a price. Assumes a student-grade pan set..." is a model of good labelling. Annoyances: the quiz/directory card and profile give different money ranges (see above); "Good to know: Where: at home, somewhere new" for Book Clubs is odd; Pickleball "Where: outdoors, somewhere new" ignores indoor courts yet says "Indoors or out" two sections up; "Beginner-friendliness: start tonight" appears on all three, which makes it feel boilerplate. The Amazon "Browse options" links are repeated and the shop blocks make the page long, but the line "We don't currently earn from these links. Disclosure" reassures. The profile page is long (about 2,000 words including related items) on mobile.

---

## 7. /search

Search is very simple, with suggested chips ("pottery, solo, tennis, free, journal, friends") and the heading "What are you in the mood for?" Results are keyword only and mix Journal articles, hobbies and shop pages with a small label (HOBBY / JOURNAL / OFF DUTY ESSENTIALS).
- "pottery": 10 results, top two are the hobby and the shop ("Pottery Painting", "The Pottery Era"). Good.
- "solo": 30 results, but articles first, hobbies buried. "free": 5 results, first two are articles; "Birdwatching" and "Museum Exploring" appear only because their blurb contains "free".
- "journal": 16 results, relevant.
- Natural language fails: "cheap date" gives "0 results for 'cheap date'. Nothing yet. Try a simpler word, or let the quiz pick for you." and "something to do with friends after work" gives 0 results. "yoga": 0. A tired person types phrases like these. The zero state is friendly but offers no clickable suggestions.
- **At 320px the /search page scrolls horizontally** (document width 394px on a 320px screen), a layout bug.

---

## Cross-cutting

- **Too few real options, repeated across tools:** Crossword Puzzles, Collage Art, Reading, Creative Writing, Golden-hour park walk, Cookie batch, Two-person book club all recur, so the tools feel like windows onto one list.
- **Tone is great**, accurate, honest. "No invented events, no fake opening hours" is a trust builder.
- **Lead capture wariness:** none; no emails, no popups. That's a big plus, and could be stated more loudly on /make-plans.
- **Mobile:** works at 390 and 320 (apart from /search overflow and the logo wrap in the header).
- **Desktop:** I took desktop screenshots (`plan_desktop.png`, `quiz_desktop.png`); I judged phone as the primary experience and did not find desktop-specific problems.

## What would she use again, skip, send

- **Use again:** /make-plans (an actual Saturday; with better composition and share it is the hero).
- **Send to a friend:** the quiz result card ("My hobby era: The Creative Girl"), if it were a PNG with a Share button. Second choice: a planned Saturday sent to the group chat, if sharable.
- **Skip:** /tools/tonight (contradictions, results shown before answers) and /hobbies filters as they are (they do not narrow). Hobby Budget she would use only when committing to a hobby.

## Ratings (1-10, one simulated person)

| Dimension | Score | Note |
|---|---|---|
| Fun | 7 | Charming copy, fast quiz; samey results |
| Clarity | 8 | Mostly obvious; a few confusing labels ("Indoors, home or out") |
| Usefulness of results | 6 | Planner and budget good in concept; contradictions and thin pool |
| Trust in results | 6 | Honest labelling, but numbers disagree and some answers contradicted |
| "I would share this" | 5 | Wants to, but there is no easy way (SVG card, no planner share) |

## Ten highest-impact improvements (ranked)

1. **Add Share / Copy-as-text to the planner (/make-plans) and Tonight, with a real link.** Output a friendly message ("Saturday plan: 9:30 volunteer..., total about $13 to $40") plus the restorable URL that already exists under /saved. Reason: she plans with friends via group chat; this is the biggest missing feature and it is nearly built. Also put the plan parameters into the URL on "Make my plan".
2. **Make the quiz card shareable: export PNG (not SVG), add a native Share button, make the link https and clickable.** Reason: it is the most viral object on the site and the SVG download is a dead end on phones.
3. **Fix contradictions between answers and results.** "Just me" returning "with a friend over coffee" (/tools/tonight); "tonight" returning "go on a Saturday morning" (Hiking, Picnicking); "A friend / A partner" missing from the plan title and steps; Museum Exploring "low energy" for "Bring on a challenge". Reason: nothing erodes trust faster than a result that ignores what she said.
4. **Reconcile cost ranges across the directory card, profile and budget tool, and stop summing maxima.** E.g., Watercolor is "Under $25 to start" vs "$10 to $35" vs "$15–$50"; Tennis "$25–$50" vs "$20–$115". Show a "most people spend about $X" typical figure and make "Keep it lean" actually lean. Reason: credible costs are the core promise of a budget tool.
5. **Make the planner's Saturday more realistic.** Time-of-day-aware activities (no "golden-hour walk" at 1:30 PM), lunch/dinner/travel buffers, pacing that fits the chosen length (a "Half a day" should not return 2h), no filler like "Plan the next weekend", and obey "The group" and "A partner". Reason: "an actual Saturday she would do" is the tool's promise.
6. **Quiz results: stop returning the same persona/chips for different answers and reconcile the "Nothing fits" box with the confident card above it.** When there are no exact matches, hide or label the persona chips and say which answer is the blocker ("Outdoors + Under 45 min + Free is the tight combo") with one-tap relax buttons. Reason: clarity and honesty at the moment of failure; avoids "so I'm a creative girl even though I said friends".
7. **Persist progress and results.** Keep quiz state and result in the URL or localStorage so refresh or Back does not return her to Question 1 or lose the result. Reason: tired users get interrupted; losing a result feels broken.
8. **Widen the pool and fix the filters.** Add yoga, dance, running, cooking classes, board games, language learning, climbing; make Solo/Social/Outdoors tags meaningful (Reading is not an Outdoors hobby); add sort and URL-based filter state. Reason: repeated results and "0 results for 'yoga'" make the tools feel small, and Active has only 4 hobbies.
9. **Search that understands human phrases and recovers from zero results.** Map "cheap date", "after work", "with friends", "tired" to tags; put hobbies above articles; offer tappable suggestions on empty. Also fix the horizontal overflow at 320px (document 394px wide). Reason: this is how an impatient person looks for things.
10. **Explain local-only saving at the point of saving, and show what the tools assumed.** On Save: "Saved on this device only. Copy link to keep it elsewhere." Show a "Based on: Full Saturday, Creative..." line (the planner pre-ticks defaults and the Tonight tool shows results before any answer). Also fix the 320px header logo wrap and the confusing "Indoors, home or out" label. Reason: reassurance plus transparency is the brand's strength; surface it where decisions happen.
