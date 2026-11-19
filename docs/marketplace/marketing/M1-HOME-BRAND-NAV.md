# M1: Home, brand, nav, footer, Start Here, About, 404, journeys, sharing

Reviewed live at http://127.0.0.1:5950 (desktop 1280x800, mobile 390x844) plus source: src/routes/index.tsx, start-here.tsx, about.tsx, __root.tsx, src/components/layout/*, src/config/site.ts, src/lib/seo.ts, src/components/home/SeasonStrip.tsx, src/data/categories.ts. No site files edited.

## 1. Verdict and sell-appeal scores

The brand is genuinely strong: the pottery-night postcard, gingham strip, cherry italics and "Professionally off duty" bar produce a real feeling in the first second, and the hero headline is the best line on the site. The weakness is that the site stops at *mood*. After the hero, the home page quietly turns into a directory: tiles with generic taglines, "Six ways to spend your time", a hobby list, and a shop block that shows four category photos and then a small-print disclosure that says "We don't currently earn from these links" right under the ask. There is no concrete first win ("tonight, under $25, 30 minutes") and no visible bridge from a feeling to a basket. The hero has no button at all. The About page is editor-speak ("lifestyle publication and hobby discovery destination for career-oriented women") and the OG layer is missing on the homepage. Warm, pretty, honest; under-selling. Scores (honest): Home 6.5, Header/mobile menu 6, Footer 6, Start Here 5, About 5, 404 6.5, global voice/taglines 7.5, three journeys 6, social sharing/OG 3.

| Page / layer | Score | One-line reason |
|---|---|---|
| Home first 5 seconds (phone) | 7 | Great promise and image; no button above the fold |
| Home overall | 6.5 | Pretty but directory-shaped, soft ask |
| Header + mobile menu | 6 | Clean; 14-item menu, no primary action on phone |
| Footer | 6 | Tidy; zero selling, 3 columns of admin |
| /start-here | 5 | Reads like a help page, three H2s of instructions |
| /about | 5 | Editor-speak, no emotion, no next step |
| 404 | 6.5 | On-brand joke; useful buttons but generic |
| Brand voice/taglines | 7.5 | Distinctive; five competing lines |
| Three journeys | 6 | Right idea, flat microcopy, Shop hardest to want |
| Sharing/OG | 3 | Home has no og:image; shared links render as plain text |

## 2. Findings ranked by revenue/engagement impact

| # | Where | Finding | Impact |
|---|---|---|---|
| 1 | Home hero | No button/CTA. Phone fold shows headline, subhead, photo and the start of the tiles at y~750. She has to scroll to act. | Highest |
| 2 | Home shop teaser | Only four category photos (The Pottery Era etc.), no named product, no "what's in it", and the auto disclosure ("We don't currently earn from these links") sits directly under the ask. It is honest but it is the last thing she reads before clicking. | Highest |
| 3 | Home sequence | Section order: tiles, season, six sections, journal, shop, slogan. Shop sits fifth, below two browse blocks. Money path is the longest scroll. | High |
| 4 | Journey tiles | Taglines are mechanical: "Six quick questions, hobbies that fit." / "A realistic plan, built in a minute." / "Honest starter supplies, hobby by hobby." They name the tool, not the payoff. "Honest" is a defensive word in a sell line. | High |
| 5 | OG/sharing | Home head() sets no `image`, so Pinterest/iMessage/Facebook shares of the homepage have no picture. For a Pinterest-style, visual brand this is a big miss. seo() only emits og:image when passed one; /about, /start-here also none. | High |
| 6 | Home season strip | Strong idea (timely, saveable) but cards show "Under $50 to start" with no image and no next step beyond the heart. Four text cards in a row of picture cards breaks the visual rhythm on phone. | Medium |
| 7 | Home "Six ways to spend your time" | Section labels read as a site map. Names are clever but the sub-lines ("Weeknight hobbies & plans") are category-speak. | Medium |
| 8 | Start Here | H2s are "1. If you have no idea what you're into" etc., written as a manual. No images, no buttons, links in prose, third path is a wall of six section names. | Medium |
| 9 | About | Opens with philosophy (good) then "lifestyle publication and hobby discovery destination for career-oriented women". Not a sell. No CTA at end, just the slogan. | Medium |
| 10 | Header | Desktop CTA "Find Your Thing" hidden below md; phone has no action in the bar (search, bookmark, menu only). Second cherry strip uses site.signature, a third repetition of the brand idea above the fold. | Medium |
| 11 | Mobile menu | 6 tools + 6 sections + 2 browse + 5 fine-print links. "Start" group has Start Here, quiz, plans, shop, tonight, saved at equal weight. No primary highlighted. | Medium |
| 12 | Footer | Three link columns, "The fine print" is longest. No closing invitation or CTA. Tagline in butter italic is nice. | Low-Med |
| 13 | 404 | "This page clocked out early." is charming. Second button "Find Your Thing" is fine; could offer Shop or Make Some Plans too. | Low |
| 14 | Taglines | Five brand lines coexist: tagline, slogan, signature, mission, philosophy, plus a 12-item phrases list. The hero, closing and footer each use a different one. | Low-Med |
| 15 | Hero badge | Butter circle "more hobbies. fewer meetings." repeats a phrase from the phrases list and competes with the postcard caption "pottery night, thurs." Caption is a fabricated-feeling personal detail but reads as art direction, not a claim. Keep. | Low |

## 3. Concrete rewrites (ready to paste)

### Home: meta
- Current title: "Plans Past Five: Making a life, not just a living."
- Current description: "Creative hobbies, cute weekend plans, solo dates, new friendships and little adventures for women who want a life they love outside of work."
- New title: `Plans Past Five: Hobbies, Weekend Plans & Starter Supplies for After Work`
- New description: `Find a hobby you'll actually look forward to, plan a weekend with a storyline, and shop simple starter supplies. For women with plans past five.`
- Note: seo() appends the brand only if absent; this title contains it.

### Home: hero
- Headline: keep "Because the best part of your day is *still ahead.*"
- Current subhead: "Hobbies, plans and little adventures for after you close your laptop."
- New subhead: `Find a hobby, plan the night, and get the little supplies to start it. Close the laptop. Open your evening.`
- ADD primary CTA under subhead (cherry solid, min-h-12, full width on phone): `Find your thing` linking /hobby-finder, with secondary text link below it: `or plan this weekend` linking /make-plans.
- Add microcopy under button (small, honest): `Six questions. About two minutes. No account.` (confirm quiz time matches reality before using "two minutes"; otherwise drop it).
- Butter badge: change to `your evening, sorted.` or keep as is; do not add a second tagline competing with the headline.

### Home: "start here" row
- Current: "hi, you clocked out. start here:" -> keep (good voice).
- Tile 1 current: "Find Your Thing / Six quick questions, hobbies that fit." -> `Find Your Thing / Six questions. A few hobbies that fit your time, budget and energy.`
- Tile 2 current: "Make Some Plans / A realistic plan, built in a minute." -> `Make Some Plans / Pick the night and the mood. Get a plan you can save or print.`
- Tile 3 current: "Shop Your Hobby / Honest starter supplies, hobby by hobby." -> `Shop Your Hobby / Everything you need for the first try, hobby by hobby.`
- Make tile 1 visually dominant (stronger cherry border or "Start here" kicker); the others secondary.

### Home: season strip
- Current line template: "Good for autumn / Earlier dark, cosier plans. Make something, curl up."
- Keep. Add per-card affordance: `See the starter list` after the cost line (links to the hobby page) so the card has a verb. Suggest a small thumbnail (hobby image) left of the text on phone.

### Home: "Six ways to spend your time"
- Current: "Six ways to spend *your time*" -> `Pick your kind of *plans past five*`
- Link text "All 43 hobbies" -> keep (specific number is real from data).

### Home: journal
- Current: "Fresh from *The Journal*" / "All stories" -> `Ideas worth stealing` / `More ideas`. ("Fresh" implies recency you may not maintain; "stories" is inaccurate for how-to articles.)

### Home: shop teaser
- Current: "Starter supplies, *honestly picked*" with link "Shop Your Hobby".
- New heading: `Everything you need for *try number one*`
- Add one line under heading: `Pick a hobby, see the starter list, buy only what you need. Opens on Amazon.`
- Link: `Shop Your Hobby` -> `See the starter lists`
- Tile captions (currently collection names only, e.g. "The Pottery Era"): add the dek on each tile, e.g. `The Pottery Era / Clay, paint and very lovable lumpy bowls` (already in products.ts `dek`). Do the same for the other three.
- Disclosure: currently auto text "Buttons that say 'View on Amazon' open a named product's own page; 'Browse options' opens an Amazon search for a type of product. We show no prices... We don't currently earn from these links." On the homepage teaser use a shorter honest line and keep the full text on the shop pages and the Disclosure page: `Links go to Amazon. Prices and shipping are set by Amazon. Disclosure.` Keep honest: if the affiliate tag goes live this sentence must still say that links may earn a commission; route this through shopDisclosureSentences rather than hardcoding.

### Home: closing
- Current: "For the plot, not the paycheck." + mission + "New here? Start here" (small underline link).
- New: slogan stays. Replace mission line with `Your evening is allowed to be the main character.` and replace the tiny link with a real button: `Find your thing` (cherry) plus text link `or start here`.

### Header
- Top strip: "PROFESSIONALLY OFF DUTY." keep. Do not repeat this phrase elsewhere in hero.
- Phone: add a compact cherry pill `Find your thing` to the left of the search icon at >=360px, or put the CTA first inside the open menu (see below).
- Nav order desktop: Start Here, Make Some Plans, Hobbies, The Journal, Shop Your Hobby. Move Shop to the second slot after Find Your Thing is the CTA button: `Make Some Plans`, `Shop Your Hobby`, `Hobbies`, `The Journal`, then CTA. Keep Start Here only in the footer and menu.

### Mobile menu
- Rename group "Start" -> `Start here`. Lead with a full-width cherry button `Find Your Thing`. Group "Sections" -> `Browse by mood`. Group "Browse" -> `More`. Demote "What Should I Do Tonight?" and "My Plans" into More. Consider hiding the five fine-print links behind a single "About & fine print" row on phone.

### /start-here
- Current meta: title "Start Here: New to Plans Past Five?", description "A quick guide to finding your next hobby, planning your weekend and saving ideas on Plans Past Five."
- New title: `Start Here: Find a Hobby, Plan Tonight, Shop the Basics`
- New description: `Not sure what to do after work? Take the six-question hobby quiz, build a plan for tonight or this weekend, or shop simple starter supplies.`
- H1 current: "Hi. You clocked out. What's the plan?" -> keep.
- Dek current: "Three easy ways in, depending on what you know about what you want." -> `Three ways in. Pick whichever sounds like you right now.`
- H2 1 current: "1. If you have no idea what you're into" -> `No idea what you're into?` Body: `Answer six questions and get a few hobbies that fit your time, budget and energy.` Button: `Find your thing`.
- H2 2 current: "2. If you want a plan for tonight or this weekend" -> `Want a plan for tonight or this weekend?` Body: `Pick the night, the mood and a budget. We'll build a realistic plan you can save or print.` Button: `Make some plans`.
- NEW block (missing today): `Already know your hobby?` Body: `Go straight to the starter list: what you need for the first try, and nothing you don't.` Button: `Shop your hobby`.
- H2 3 current: "3. If you like to browse" -> `Rather just look around?` keep the section list but render as six picture tiles with their `short` lines rather than a run-on paragraph.
- "Save as you go" -> keep the substance: `Tap the heart on anything to keep it in My Plans. It lives on this device. No account needed.` (check icon name: UI uses a heart/bookmark; match whichever the page shows.)
- Layout: three large tappable cards with image, not H2 + paragraph. Buttons full width on phone.

### /about
- Current meta description: site.mission (fine). Keep or use: `Plans Past Five is for women who want something to look forward to after work: hobbies to try, plans to make and the supplies to get started.`
- Hero dek (mission): keep.
- Current para: "Plans Past Five is a lifestyle publication and hobby discovery destination for career-oriented women who want a more creative, interesting, social and fulfilling life outside of work. We celebrate ambition. We just don't think your job should be your whole identity."
- New: `Plans Past Five is for the woman who closes her laptop at 5:01 and wants something to look forward to. We help you find a hobby, plan the evening or weekend, and pick up simple supplies to start. We love a good career. We just think your life gets to be bigger than it.`
- "Who it's for" current: "The woman who closes her laptop at 5:01 and wonders what to do..." -> move the 5:01 line to the opener (above) and rewrite here: `Introverts and extroverts. New in town. Rebuilding friendships. Watching a budget. If you want to try pottery painting, tennis, junk journaling or a solo café date and just need a nudge, this is for you.`
- "How we work" is honest and needed, but two paragraphs on no named author reads defensive. Combine: `Everything here is written by ${editorialByline}. We don't invent personal experiences, product tests, reviews or community numbers. See our editorial standards and affiliate disclosure.` (AI disclosure stays inside Editorial Standards as required; the existing link wording is fine.)
- ADD end-of-page CTA block (cherry button): `Ready? Find your thing` plus text link `or make some plans`. Today the page ends on the slogan with no action.
- Image: the girlsNight figure is a good emotional image; place it above "What we believe" on phone and add a Caveat caption in brand style (generic, not a claim).

### 404
- Keep: "out of office..." / "404" / "This page clocked out early."
- Body current: "It doesn't exist or has moved. Good news: there's plenty else to do tonight." Keep.
- Buttons current: "Back home" (solid) + "Find Your Thing" (outline). New: solid `Find Your Thing`, outline `Back home`, plus a small text row: `Make Some Plans · Shop Your Hobby`. Primary action should be the one that gets her moving, not home.

### Footer
- Brand column current: tagline + mission. New: keep tagline; mission to `Helping women fall in love with the life they live outside of work.` (unchanged) and add a cherry-on-green button `Find your thing` under it.
- Column titles: "Explore" -> `Plans`, "Tools" -> `Try it`, "The fine print" -> `About the site`. Move Start Here to the first link of Tools/Try it. Keep Affiliate Disclosure visible (required) and the Amazon Associate statement per the existing disclosure page.
- Bottom bar: slogan repeated on every page is fine; keep.

## 4. Visual direction

- Home hero: keep the postcard. Add the primary CTA button directly under the subhead; on phone the fold ends at the tile row, so the button must sit above the image or immediately below the subhead (reduce hero image max-w to ~340px so button + image + first tile peek all show in 844px).
- Hero image alt/caption: "pottery night, thurs." is a charming caption; keep as design copy only. Do not turn it into a testimonial.
- Journey tiles: use three images that show the *outcome*, not the topic. Find Your Thing currently uses a hiker photo (hiking), which pushes sporty. Swap for a collage-style or a tidy "hobby table" image (e.g., watercolor, clay, crochet on one gingham table). Make Some Plans uses shopAdventures (picnic/daisies) which is fine. Shop Your Hobby uses shopBookish (books and candlelight); better to show a starter set laid flat (e.g., embroidery hoop, floss, scissors) to promise "get started".
- Shop teaser: make each tile show the flat-lay of the starter set with the dek text beneath; use a 2x2 on phone, 4x1 desktop. Add a visible text button `See the starter list` on each tile (currently the whole card is a link with just a title).
- Season strip: add small thumbnails; today it is 4 plain cards with big shadows between image-rich sections. Alternatively use a horizontal scroll row on phone to reduce vertical length.
- Home page length on phone is ~5350px. Remove one browse block (merge "Six ways" into a compact horizontal scroller) to bring the shop above the 50% mark.
- Gingham: used well as hero divider and footer. Reuse as a thin top border on the shop teaser so the sell zone has a distinct visual signature.
- Journal block: three picks, hidden third on phone; fine. Use consistent crop (4:3) as is.
- 404: add a small illustration (Star/Sparkle doodle or an empty cup) so it doesn't feel unfinished; add a second gingham band above the footer (already there).
- OG images: create one 1200x630 brand card (cream background, gingham edge, hero postcard crop, wordmark, the hero headline in Fraunces) and pass `image` in seo() for /, /start-here, /about, /hobby-finder, /make-plans, /shop. Journal/hobby pages already pass hero images. Add a `defaultOgImage` to site.ts and use it as the fallback inside seo() (note the root route comment forbids adding it in __root; do it in seo() so every route that calls it inherits a real image, or add per route).

## 5. Quick wins (under 1 hour each)

1. Add hero primary CTA button + secondary link (index.tsx).
2. Add a default og:image fallback in seo() and a 1200x630 asset; set image for /, /about, /start-here.
3. Rewrite home meta title/description (above).
4. Rewrite the three journey taglines.
5. Add dek text under each shop teaser tile; change "honestly picked" heading; replace homepage disclosure with a short one routed via the affiliate config.
6. Turn closing "New here? Start here" into a real button.
7. Reorder desktop nav (Make Some Plans, Shop Your Hobby first) and add phone menu CTA at top.
8. Start Here: swap numbered H2s for the question-style headings and add buttons.
9. About: rewrite opener and add end CTA.
10. 404: make Find Your Thing the solid button, add two text links.
11. Rename "Fresh from The Journal" to "Ideas worth stealing".

## 6. Bigger moves

1. Re-sequence home as: hero + CTA, three journeys, "Start this weekend" (one featured hobby with its starter list and Amazon button), season strip, shop teaser, journal, closing. One primary action per screen.
2. Build a "featured starter kit" home module: one hobby, image, three real items from your product data with "Browse options"/"View on Amazon" buttons (no prices, no ratings), so the home page shows a real offer, not just categories.
3. Rebuild Start Here as three visual cards (image, one-line promise, one button) and add "Already know your hobby?" path.
4. Produce branded OG/Pinterest templates for each section (After Hours, Weekend Edit etc.) and wire them via seo().
5. Photography pass for journey tiles and shop tiles (outcome flat-lays, one consistent warm gingham light).
6. Consolidate brand lines into a documented hierarchy (see 7) and apply across header, hero, footer, 404.
7. Add Pinterest-friendly "Save" prompts where you already have pins in public/pins, since the brand's visual format suits it. No account needed.

## 7. Cross-page consistency issues

- Brand lines: tagline "Making a life, not just a living." (home title, footer, About H1), slogan "For the plot, not the paycheck." (closing, footer bar), signature "Professionally off duty." (header bar), mission, philosophy, plus hero H1 "Because the best part of your day is still ahead." and badge "more hobbies. fewer meetings." That is six lines doing the same job. Proposed hierarchy: H1 = "still ahead" (hero only), tagline = About H1 and OG, slogan = closing/footer, signature = header bar only, badge = drop or rotate from `phrases`.
- Voice: Home and Start Here use "you clocked out" (lovely); About and policy pages revert to "career-oriented women" and "publication". Keep second person and warm everywhere; avoid "destination", "publication", "discovery".
- Names: "Find Your Thing", "Make Some Plans", "Shop Your Hobby", "My Plans" are consistent across nav/footer/tiles. Good. "Hobbies" vs "hobby directory" (Start Here) vs "All hobbies" (home) vs "All 43 hobbies": pick one. "The Journal" vs "stories" vs "Fresh from": pick "The Journal / ideas".
- CTA verbs: nav uses nouns (labels), page links say "All stories", "All hobbies", "Shop Your Hobby", "New here? Start here". Standardise: one cherry button verb per page (Find your thing), secondary text links in cherry underline.
- Casing: hero H1 sentence case, tile titles Title Case, Caveat handwriting is lowercase. Fine, but be consistent that handwriting is always lowercase and sparingly used (home has three: start-here line, caption, badge).
- Tense: Start Here uses "Take Find Your Thing"; tiles use noun phrases. Use imperative everywhere for CTAs.
- Disclosure: shop teaser on the home page uses the long general disclosure; shop pages should carry the full text. Keep consistent wording sourced from config/affiliate.ts.
- Disclosure honesty note: "We don't currently earn from these links" is accurate pre-activation and must switch automatically on activation (it does, via isMonetized()). Do not hardcode.
- Home meta uses an em-dash-free "Name: tagline" while root.tsx uses `Name — tagline` as fallback. Align on a colon.
- Quiz count: tile says "Six quick questions"; Start Here says "six-question". Fine; keep both generated from quizCountWord().

## Top 5 changes

1. Add a hero CTA button ("Find your thing" + "or plan this weekend") and a one-line promise subhead; give phone users an action in the first 5 seconds.
2. Add a real default og:image (1200x630 brand card) via seo() so every shared link has a picture; set it on /, /about and /start-here.
3. Rework the shop teaser into "Everything you need for try number one" with the dek on each tile, a "See the starter list" button, and a short disclosure line (config-driven).
4. Rewrite the journey taglines around payoff and make Find Your Thing visually dominant; rebuild Start Here as three image cards with buttons plus "Already know your hobby?".
5. Rewrite About's opener out of editor-speak and end About, closing, footer and 404 with one clear primary action.
