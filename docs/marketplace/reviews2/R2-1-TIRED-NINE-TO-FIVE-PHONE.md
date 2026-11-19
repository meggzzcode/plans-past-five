# R2-1 Tired 9-to-5 on phone (390x844, touch)

NOTE: simulated reviewer opinions from an automated Playwright run, not real customer data. Not all pages were viewed; scores are my honest read of what I saw.

## Task 1: Cold landing - PARTLY/DONE
Sentence: "A warm, retro-styled hobby and evening-plans site for women who just clocked out; I would tap 'Find Your Thing' (the pink quiz card) first." Load ~0.8s. Hero ("Because the best part of your day is still ahead", pottery-night photo) is charming and clear. But the three "start here" cards sit below the fold at 844px; first screen is only headline + photo. Smaller issue: the header search/saved icons have no labels.

## Task 2: One idea for tonight, low energy, free - DONE
/tools/tonight (reachable from the menu and footer, not on the home page). Defaults were already "an hour, running on fumes, free, just me", so I got 3 ideas with zero taps: Collage Art, Creative Writing, Reading, each with time, cost and a "First step". Great. Problems: "Read the guide" links don't match the idea (Collage Art -> a flower-arranging article; Reading -> "at-home-creative-weekend"). "Indoors or out" is shown though I had not chosen. Ideas are a bit samey for "fumes" (two are making/writing tasks, not truly zero-effort).

## Task 3: Hobby quiz - DONE
6 taps (making things / fumes / just me / at home / under 45 min / nothing), no email. Result "The Creative Girl" with 3 hobbies, first steps, URL holding answers (?q=7&a=cr.lo.so.ho.sh.fr). Fun and fast. Hesitations: the quiz result cards had no Save button and are not obviously tappable; the Collage Art tile is big and mostly yellow with a flower (no photo). Bug-ish: my first taps right after load did nothing (page not yet hydrated), so on a slow phone the first tap may be lost. Result page tapping a recap chip silently steps you back.

## Task 4: Save two, find after refresh - DONE
On /hobbies (43 "Save ... to My Plans" buttons) I saved Junk Journaling and Watercolor Painting; aria labels flipped to "Remove ... from My Plans". After reload, /saved listed both. Clear: "Saved on this device only", with backup/import. Caveat: hobbies directory is a long list; finding saves from the quiz result is not possible; heart/bookmark state feedback visible only via label (I did not verify visually).

## Task 5: Send an idea to a friend - DONE
Tonight: "Copy as text" yields a clean message with the 3 ideas plus a link back to the same results (checked clipboard). Quiz: "Copy link" shows "Link copied. Send it to a friend." plus Share my result, Save as image. Articles and /saved have "Send to the group chat". Nicely done. I did not test the native share sheet or image output.

## Task 6: Read one article for 2 minutes - DONE
"25 Things to Do After Work Instead of Scrolling", about 1,470 words, 6 min. Good headline, byline "The Plans Past Five Editors", photo, jump links, numbered scannable items with time/cost/solo chips, "No-spend alternative" box. No raw markdown, no leaked notes, no horizontal overflow (width 390). Would I finish: I would skim to the end of the "If you're exhausted" section and stop; it is a list so skimming works. Minor: "low-energy hobbies has more gentle ideas" (grammar); some items have "More", others don't; 5 distinct images in 6 slots (one repeat); the "Save to My Plans"/"Pin it" action stack at top is busy.

## Task 7: Menu -> contact / how it makes money - PARTLY
The menu (Start, Sections, Browse) has no Contact, About, or Disclosure; those exist only in the footer after a very long scroll. In the footer: Contact page says "Our contact inbox is being set up. Please check back soon." so there is no way to actually contact them (no email or form). Money: /affiliate-disclosure is clear and plain ("We don't currently earn from these links"; Amazon buttons explained) and home also has a short note with a Disclosure link. Honest, but I only found it via the home page note or footer, not the menu. Contradicts the "currently earn" claim only in that it announces a future change.

## What delighted me
Zero-tap tonight results; quiz speed with no email; "Copy as text" message; warm, consistent voice and visuals; honest disclosure and "nothing saved or sent" notes; no clutter or popups; fast loads.

## What made me hesitate or leave
Contact has no working channel; menu lacks About/Contact/Disclosure; mismatched "Read the guide" links; hobbies page says "Thirty-six ways" while the count says 43 hobbies; quiz result is a dead end without save buttons; hero uses most of the first screen before any action; first-tap-before-hydration being ignored; some tiles are stock-looking with no photos.

## Top 8 fixes ranked by impact
1. Provide a real contact method (email or form) or remove the placeholder.
2. Fix "Read the guide" links on Tonight so each guide matches its idea.
3. Add Save buttons and hobby links to quiz result cards.
4. Add About/Contact/Disclosure to the menu (a "Fine print" group).
5. Put a "Tonight" card on home, above the fold, with the three quick tools.
6. Fix "Thirty-six" vs 43 count.
7. Make the first tap work before hydration finishes (or disable buttons visibly until ready).
8. Tidy article copy (grammar, consistent "More" links, repeated image) and label header icons.

## Scores (1-10)
| Area | Score | Evidence |
|---|---|---|
| First impression | 8 | Warm hero, clear tagline, 0.8s load; CTAs below fold |
| Aesthetic appeal | 8 | Cohesive cherry/cream retro look, readable type, no overflow |
| Navigation | 6 | Clear menu, but no contact/about/disclosure in it, tonight tool not on home |
| Editorial authenticity | 7 | Consistent voice, honest "editors" byline and disclosure; stock-like imagery, generic list |
| Usefulness | 8 | Concrete first steps, time/cost, saves and share work |
| Trust | 7 | Candid disclosures, local-only saving; no working contact, mismatched guide links |
| Product desirability | 7 | Pleasant tools I would use again; content depth unverified beyond a few pages |
| Willingness to purchase | 4 | Shop not tested; "we don't earn" and Amazon-only links, no prices |
| Willingness to return | 7 | Tonight tool and saves are a good habit hook; no reminders/email |
| Willingness to share | 7 | Easy copy/link/text; image share untested |
| Business credibility | 5 | Placeholder contact, no named people, no revenue today |
| Buyer readiness | 5 | Polished front end but contact placeholder and content inconsistencies |
