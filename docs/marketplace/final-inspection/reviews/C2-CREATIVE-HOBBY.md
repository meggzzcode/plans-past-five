# C2 Creative Hobby Seeker: Customer Experience Review

**SIMULATED SENTIMENT from an AI persona, not real customer research.** Site: http://127.0.0.1:5990 (production build). Playwright chromium, 1280x800 then 390 wide.

Persona: a woman wanting a new creative hobby (junk journaling, clay, watercolor, crochet, pottery painting).

## Walkthrough (desktop)
1. **Home.** Hero "Because the best part of your day is still ahead." with a warm photo of three women painting pottery. Clear CTA "Find your thing". Banner "Professionally off duty" is charming. Seasonal row ("try one for autumn") shows Watercolor, Crosswords, Vinyl, Pottery Painting. In my full-page capture the "Pick your kind" tiles and a few images looked blank pink. They were lazy-loaded and loaded fine on scroll, so not a real bug, but a fast scroller may see pink boxes for a moment.
2. **Creative Corner** (/creative-corner). Chosen over the quiz because I already know I want something crafty. Three article cards plus six hobby cards: Watercolor, Air-Dry Clay, Crochet, Junk Journaling, Embroidery, Calligraphy. I expected photos on each. Only Watercolor, Clay and Junk Journaling have photos. Crochet, Embroidery and Calligraphy show yellow tiles with a script word. They look intentional but make those hobbies feel less real. Mild bug: on those placeholder cards the "MAKE SOMETHING" tag sits under the placeholder, not above the title, so DOM order differs.
3. **Pottery Painting** (my first instinct, from the hero photo). Page is clean but thin: "Your first session" is one sentence, the first-week list has 4 steps, the kit is 2 items (a kit, brushes). It does not say what a studio session costs or how to find one. "$15 to $40" appears with a sensible caveat. Mixed message: kit says "food-safe once baked", while the 21-hobbies article says check it is decorative only before food or drink. Slightly contradictory for a mug page.
4. **Junk Journaling** (my pick, because it is cheap and I can start tonight). Page is the best of the three I read: "Empty your bag and wallet, pick three bits of paper from this week, and make one page about it." Cost "$0 to $20", an honest note that I may own glue and scissors, a 4-step first week, a "what you'll have made" line. I understood how to begin in under a minute.
5. **Article** "How to Start Junk Journaling: A Beginner's Guide". Read it. Genuinely helpful: 6-step first 30 minutes, four techniques (three colors, tear instead of cut, pockets, tip-ins), page ideas, "common worries". Warm, specific, no raw markdown or leaked notes seen. Byline is "The Plans Past Five Editors" (no individual person), dated Nov 18, 2026.
6. **Supplies.** On the hobby page and article: "One pick" A5 hardcover journal 120 gsm (Stationery Island), Scotch glue sticks 4-pack, then "later" washi tape (21 rolls) and Pigma Micron pens. Product cards use illustrated icon tiles, not product photos, so I cannot see what I would buy. Buttons say "See it on Amazon" and go to amazon.com/dp/... product pages (I did not open them). "Prefer something different? (1)" gives an alternative. No prices shown by design, with a clear note that links do not currently earn the site money. That honesty raised my trust; no price made me hesitate.
7. **Collection page** /shop/creative-girl. Hero says "illustrative styling, not specific products", which is honest. It mixes a junk-journal kit and a watercolor kit under "Creative Girl", and the first kit is titled "Everything for your first junk journal". Fine, but the page does not mention crochet, which the Creative Corner promised.
8. **Save.** "Save to My Plans" changed to "Saved to My Plans". /saved lists "Junk Journaling" under "Hobby wishlist", with honest "saved on this device only", export/backup. Works. The list is plain text with no thumbnail.
9. **Share.** Copy link copied https://planspastfive.com/hobbies/junk-journaling (production domain, not localhost, fine) and showed a "Link copied" toast. "Send to the group chat" showed "Copied. Paste it in the chat." (it just copies; no native share sheet on desktop). Pin it opened pinterest.com/pin/create with media=.../pins/16-creative-weekend-1-headline.png. That image name belongs to a different piece (a weekend plan), so a pin for junk journaling may show the wrong picture. I did not open Pinterest.
10. **Phone (390).** No horizontal scroll (scrollWidth 390). Header is compact with a hamburger. Hobby page title, stats and CTAs fit well. Amazon buttons are full width and thumb-friendly. The hero photo comes right after the CTAs. Product tiles are illustrations again. Pages are very long (about 10,000 px) but well chunked. My fast-scroll check reported a few images not yet loaded (1 to 4 per page); lazy loading, not broken.

## Answers
- **Continue exploring?** Yes. The tone and photos made me want to open a second page, and Creative Corner made the next click obvious.
- **Trust the publication?** Mostly yes. Honest about prices, affiliate status and "per the listing". Doubts: no named author, no real people, and a thin hobby page for pottery painting. Conflicting food-safety wording on pottery painting.
- **Try a hobby?** Yes: junk journaling this weekend, tonight even, because the first session needs only things in my bag. I would not try pottery painting from that page alone, since it does not help me find a studio.
- **Click a product recommendation?** Yes, the A5 journal (the "one pick" with a stated reason: thicker 120 gsm paper). Not the glue sticks, which I would just buy at the shop. I would hesitate without a price or a photo of the actual product.
- **Buy supplies?** Maybe. The journal and washi tape yes, in the same cart as groceries or on Amazon. Low-cost list helps. The lack of product photos and prices holds me back.
- **Save?** Tried it; works and is honest about being device-local.
- **Share?** Copy link works. I would send the junk-journaling link to a friend. The Pinterest image mismatch is a concern.
- **Return?** Probably, for the weekend plans and the next hobby idea, if I got a reminder. No email signup was visible in the pages I used.

## Strengths
- Hero photo, "Professionally off duty" voice, warm palette and typography feel like a real lifestyle brand.
- Junk journaling hobby page and guide give a clear first session with a realistic cost.
- Radical honesty on prices and affiliate status; "one pick" simplifies choice.
- Save, copy link and backup actually work. Mobile layout holds up.

## Frustrations and interest drops
- Moment 1: Crochet, Embroidery and Calligraphy cards show a yellow placeholder, not a photo.
- Moment 2: Pottery Painting page is thin; no studio finder, no cost per session.
- Moment 3: Product tiles are illustrations, not photos; no price, so I cannot judge the value.
- Moment 4: Pinterest pin uses an image named for a different article.
- Moment 5: Pottery painting food-safety wording differs between the hobby page and the article.
- Unanswered: Who are "the editors"? Where do I find crochet supplies or a crochet first session? What does the studio cost near me?

## Scores (1-10)
- First impression: **8**. Strong hero, clear CTA, voice.
- Aesthetic appeal: **8**. Cohesive palette and type; placeholder tiles hold it back from 9.
- Navigation: **8**. Two nav rows, Creative Corner reachable in one click, breadcrumbs; many overlapping paths (Journal, Hobbies, Shop, Corner).
- Editorial authenticity: **7**. Helpful and warm, but unbylined and a little templated across hobby pages.
- Usefulness: **8**. Junk journaling is excellent; pottery painting thin.
- Trust: **7**. Honest disclosures; no human author, no prices.
- Product desirability: **5**. Sensible picks, but illustrated tiles, no photos or prices.
- Willingness to purchase supplies: **6**. I would buy the journal; the missing price and photo slow me down.
- Willingness to return: **7**. Good for weekend ideas; no reminder or newsletter seen.
- Willingness to share: **7**. Copy link works; friend-friendly content; pin image issue.
- Business credibility: **7**. Well-built site with policy pages (About, Editorial Standards, Corrections, Methodology); no human faces.

## Top 8 fixes
1. Add real product photos (or real imagery) to the supplies cards instead of illustration tiles.
2. Show an approximate price range per product (even "about $12") or explain on-page how to see it.
3. Replace the yellow placeholder cards (Crochet, Embroidery, Calligraphy and others) with photos.
4. Deepen the Pottery Painting page: studio finder tips, per-session cost, what to ask, one clear first session.
5. Reconcile food-safety wording for pottery painting between the hobby page and the article.
6. Fix the Pinterest share image for each hobby/article to match its content.
7. Add a named human author or editor bio with a face for credibility.
8. Offer a reminder or newsletter hook ("send me this plan on Friday") to drive return visits.

## 6-line summary
1. Junk journaling via Creative Corner was easy to find, easy to understand and cheap to start; I would try it this weekend.
2. Visuals and voice feel premium and trustworthy; mobile works with no horizontal scroll.
3. Weak spots: placeholder tiles for several hobbies and illustration-only product cards with no prices.
4. Pottery Painting page is thin and has a food-safety wording conflict.
5. Save (device-local) and Copy link work; Pinterest pin uses a mismatched image.
6. Scores: first impression 8, usefulness 8, trust 7, product desirability 5, purchase willingness 6, return 7.
