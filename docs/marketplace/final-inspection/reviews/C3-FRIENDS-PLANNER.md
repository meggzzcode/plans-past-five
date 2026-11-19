# C3 Friends Planner: independent customer review

SIMULATED SENTIMENT from an AI persona, not real customer research. Persona: a woman planning activities with friends (girls' night, mahjong, paint night, picnic). Tested at 390px phone and 1280px desktop against http://127.0.0.1:5990 using Playwright, with my own screenshots. No external sites were opened and nothing was bought or submitted. The only link I saw but did not open was the Pinterest share link, which points to pinterest.com/pin/create/button/.

## What I did, step by step

1. **Planner (/make-plans), phone.** I picked Evening, Social, The group, Under $50, Indoors. I expected a group plan that fit an evening and a budget.
   - **What I got:** "Your little social evening with the group", 6:00 PM, "Game night", Free, 2h 30m, "Start: Pick two games and set out snacks." The "Why this plan" line restates my filters ("with the group... indoors... $50 or less... nothing that needs booking ahead"), which is reassuring.
   - **Mahjong tie-in:** the plan page then showed a "Grab what you need for Mahjong" shelf. Game night became a mahjong kit, which is a clever tie-in, but nothing explains why mahjong was picked.
   - **Shuffle:** it gave a "Friendship bracelet hour" ($8 to $20, 1h 30m), which fits a group. But its first step says "Order or pick up a bead or thread kit ahead", which sits oddly next to "nothing that needs booking ahead" and "start tonight".
2. **More planner runs.**
   - **Weeknight, group, Free, Low-key:** it returned a "Two-person book club" for "the group". That is a clear mismatch with "with friends".
   - **Saturday, outdoors, group, under $25:** pickleball, trail walk and stargazing, 9h 15m, Free. Reasonable, and it respected budget and outdoors.
   - **Weekend, friend, creative, under $50, keep at home:** a 17h 30m, five-stop weekend at about $30 (range $15 to $45). That is a lot of plan for "a friend", and there is no "quick" control.
   - **Evening, creative, group:** "Magazine collage", 45 min, Free. That is a thin "girls' night".
   - **Positives:** time and budget were respected in every run (the "$X or less" line was accurate against the shown ranges). "Too much? Make it lighter" is a thoughtful touch.
   - **Wobbly control:** the "How long?" options change depending on When (Evening shows "One stop / Two stops"; Saturday shows "A few hours / Half a day / A full day"), which confused my first attempt.
3. **Sending the plan to the group chat.**
   - **Copy plan:** copies "Your little social evening with the group / Plan for the group this evening. Who's in? / 6:00 PM Game night (2h 30m, Free) / Total ... / Open the same plan: [link]". This is genuinely group-chat-ready, and "Who's in?" is a nice voice touch.
   - **The link:** it uses the production domain planspastfive.com with the full query string and the plan ids, so it reopens the same plan. It is long and ugly in a chat, but it works.
   - **What is missing:** there is no native share sheet, SMS, WhatsApp or "Text the group chat" button on the planner. Only Copy, Save, Print and Shuffle.
   - **Save:** the plan page showed no visible confirmation text for Save in my test, only "Copied" for copy.
4. **Article: How to Start a Mahjong Night With Your Girls.**
   - **Read.** The article is substantive and cautious: the version question (American, Chinese, Riichi), "find your teacher", "does the listing name your version?", "at least eight jokers" for American sets, and a "Playing with respect" section. It reads like real hosting advice, not filler.
   - **Mobile friction:** the best hosting content ("Your first night, step by step", "If something goes sideways", "Playing with respect") sits in collapsed accordions. They show as headings with blank space below until tapped. It works, but on a phone the core how-to is hidden by default.
   - **Share row:** four actions under the title.
     - Save to My Plans: worked. The header bookmark badge went to 1 and My Plans (at /saved) stores it, "device only".
     - Copy link: works.
     - Send to the group chat: copies "How to Start a Mahjong Night With Your Girls (Plans Past Five)\n<link>" and shows "Copied. Paste it in the chat." Good, but it is copy-only.
     - Pin it: opens Pinterest in a popup (not followed).
   - **Sources and dating:** sources are real third-party links (several are retailer blogs). Every article I saw is dated November 19, 2026, "by the Plans Past Five editors", with "Facts last checked November 18". That is the same date as today, so it reads like launch-day content rather than an established magazine.
5. **Article: 25 Girls' Night Ideas That Aren't Drinks.**
   - It has a good "ask two questions in the chat / offer two options, not ten" framework and a "Getting the group chat to commit" section ("Give a deadline", "Be the one who books"). That is exactly my real problem.
   - It says "Pick from: 25 ideas", but several groups (Out and about, Low-key, Getting the group chat to commit) are collapsed.
   - Several idea cards show only "More" and "Varies" for cost. As a budget-conscious planner I want numbers.
   - The shop block offers one canvas pack for a girls' night about not-drinks. Fine, but thin.
   - The same few photos repeat. "girls-night-crafts" appears four to five times and "shop-girls-night-in" twice in one article.
6. **Social idea that needs supplies: paint night.**
   - The article is warm and practical (one easy painting, a step list, "do it yourself first", "aprons can be shirts worn backwards"), with safety notes (ACMI seal, allergy notes).
   - **Supplies:** "8 x 10 canvases, 10-pack" (ESRICH) as the one pick, and a 12-piece Benicci brush set. Both link to Amazon (I did not click).
   - **Mismatches:** the shop block says "More in The Pottery Era", a pottery collection, in a paint-night article. The /shop/girls-night-in page promises "a mahjong night or a paint-and-sip table", while the girls'-night article is about "ideas that aren't drinks".
   - **Cost:** no prices are shown anywhere (stated: "Amazon or the seller sets price"). So I cannot check budget against supplies, and the planner's "$50 or less" only counts activity cost, not the kit.
7. **Shop, Girls' Night In.**
   - Honest framing: "illustrative styling, not specific products", "A list we put together, not a bundle we sell", "We don't currently earn from these links."
   - The pick is TIASUSAN American set, "166 blue tiles, racks, carry bag", with a mat and a 2026 NMJL card as follow-ons.
   - But the hobby page says "Start for about $0 to $70", and with no price shown I cannot tell whether a full retail set fits in that range. I could not verify it.

## Answers

- **Continue exploring?** Yes. The planner-to-article-to-shop chain is coherent for my use case.
- **Trust the publication?** Moderately. Disclosure, sources, "how we check" and "facts last checked" are strong. But the identical dates, the "editors" byline, no named people and the "illustrative" photos keep me from fully trusting it as an established magazine.
- **Try a recommended hobby?** Yes, mahjong night and paint night. The mahjong article convinced me to message my group ("Does anyone play, and which version?").
- **Click a product recommendation?** I would click the TIASUSAN mahjong set, because it is the one pick and the "why we picked it" line is specific (dice, chips, wind indicator, manual included). I would hesitate over the canvases (generic) and need a price before the mahjong set. I did not click, per the brief.
- **Consider purchasing?** Maybe the mahjong mat or card. I would not buy a set without price visibility.
- **Save an article or hobby?** Yes. The bookmark works on articles, hobbies and shop picks, stays on this device only, and has export and import. There are no accounts and no sync (stated).
- **Share the website?** I can copy the article link or the plan, and it is nicely worded. I would paste into WhatsApp manually. There is no native share button.
- **Return?** Yes, for the next plan. Mostly because "Copy plan" produces ready-to-send text, and the hosting guides are good.

## Strengths

- The planner honours budget, setting and time, and the "Why this plan" line explains it.
- Copy plan and Send to the group chat output is well written ("Who's in?").
- Mahjong content is careful and not stereotyped.
- Voice, visual design and mobile layout are warm and polished. No console errors or raw markdown seen.

## Frustrations and interest drops

- **"Two-person book club" for a group:** this broke the "with friends" promise.
- **Hidden accordions on mobile:** the "first night" checklist is collapsed until tapped.
- **Plan vs shop budget:** the plan's budget excludes supplies, and shop shows no prices.
- **"Order a kit ahead":** this contradicts "start tonight / nothing to book".
- **Repeated photography.**
- **No native share or text-the-group button.**

## Unanswered questions

- What does a full group kit cost?
- Why mahjong for "game night"?
- Who are the editors?
- Does Save on the planner confirm visibly?
- Can I send a poll or RSVP? (No.)

## Scores

| Dimension | Score | Evidence |
|---|---|---|
| First impression | 8 | Warm, clear hero: "Because the best part of your day is still ahead", with one CTA. |
| Aesthetic appeal | 8 | Cohesive palette, type and photography on mobile and desktop. Repeated images hold it back. |
| Navigation | 7 | Clear nav and sub-nav, breadcrumbs, and a jump list. But the controls change by "When", and collapsed accordions hide content. |
| Editorial authenticity | 6 | Useful, specific advice and real sources. But same-day dates, an anonymous "editors" byline and illustrative imagery. |
| Usefulness | 7 | Planner and group-chat copy are genuinely useful. The book-club mismatch and unpriced supplies cost points. |
| Trust | 7 | Strong disclosures and "no prices shown" honesty. Anonymity and date uniformity temper it. |
| Product desirability | 6 | Sensible single picks with reasons. Generic canvases, no prices, and a pottery label in a paint article. |
| Willingness to purchase supplies | 5 | Would consider the mahjong card or mat. No price visibility and Amazon-only. |
| Willingness to return | 7 | Planner plus copyable plans give a reason to come back. |
| Willingness to share | 6 | Easy copy link, but no native share. The plan text is nice to paste. |
| Business credibility | 6 | Affiliate and editorial pages are present. Early-stage signals: one date, no named team, no prices. |

## Top 8 fixes, ranked

1. Make the group planner respect "The group": never return solo or two-person ideas (the "Two-person book club" case).
2. Add a native "Send to the group chat" (Web Share, SMS or WhatsApp) on the planner and the share rows, in addition to Copy.
3. Show approximate supply costs (a range) next to each pick and a "supplies total" that interacts with the planner budget.
4. Open accordions by default on mobile, or show their first lines, for the step-by-step hosting sections.
5. Fix contradictions: "order a kit ahead" vs "nothing to book"; the pottery label on the paint-night shop; "paint-and-sip" vs "not drinks".
6. Reduce image repetition across articles.
7. Stagger publish dates and name real authors or editors, to improve editorial credibility.
8. Show an explicit saved confirmation for the planner Save, and give every idea card a cost instead of "Varies" or "More".

## 6-line summary for the lead

1. The planner works well for friends and respects budget and time, and the "Copy plan" text with a reopening link is the best feature.
2. Defect: a group plan returned a "Two-person book club", and a plan for a friend ran to a 17.5h, five-stop weekend with no quick option.
3. The mahjong and girls'-night articles are credible and useful, but the key hosting steps are collapsed on mobile.
4. Share is copy-only (plus Pinterest); there is no native share, SMS or WhatsApp.
5. Shop is honest (illustrative images, no prices) but gives no cost visibility and has a few label mismatches (a pottery collection under paint night).
6. Scores: first impression 8, trust 7, purchase intent 5, return 7; the main gaps are authenticity signals (same-day dates, anonymous byline) and unpriced supplies.
