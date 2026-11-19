# A1 Customer, navigation and journey audit (first-time visitor lens)

Status: read-only audit, 2026-11-19, branch `editorial-reset`. Nothing in the repo was changed except this report.
Method: `git archive HEAD` copied to `/tmp/a1-copy`, production build served on port 5961, Playwright screenshots at 1280 and 390 (deviceScaleFactor 1) in `/tmp/a1-shots` (about 64 PNGs), DOM counts taken in the browser, source read for nav, header, footer and routes. The quiz (taps) and Make Plans (submit) journeys were driven by script; other tap counts are counted from the rendered page and labelled "counted". No traffic, conversion or revenue data exists or is invented here; SEO notes are structural only.

Caveat on screenshots: full-page captures show some below-fold images (journal cards, "More collections", "Read next") as blank pink boxes. That is lazy-loading in a full-page capture, not a defect I am claiming.

---

## 1. Headline findings

1. **The site has too many front doors for the same 43 hobbies.** Five parallel "taxonomies" ask the visitor to sort the same content: six mood pages (After Hours, Weekend Edit, Table for One, Better Together, Creative Corner, A Little Movement), the 6-question quiz, the 7-group planner, the 5-group Tonight tool, and 10 filter chips on the hobbies index. A first-time visitor on desktop sees **14 header items, 25 footer links and a second row of six mood links** before any content.
2. **The homepage says "Find your thing" six times** (header button, hero button, journey tile 1, closing CTA, footer button, plus the mobile menu button) and shows the same three journeys three times (hero, "start here" tiles, nav). 71 links on the page; 450 words.
3. **Tonight is a subset of Make Plans.** It is the same planner engine with 5 of the 7 inputs, linked from only home (one text link), the footer, saved empty state and the mobile "More" group. Folding it is right, and the planner already has "Weeknight" and "Evening" in "When?".
4. **The path to an actual product is long and ends in the wrong place.** Quiz to Amazon button is 9 taps (measured): hero CTA, 6 answers, "What you'll need", then "See it on Amazon". The quiz result page itself shows three hobbies and zero products. The shortest product path (home to /shop to "Three good first buys") is 2 to 3 taps but bypasses all personalisation.
5. **Disclaimer and "no prices / Amazon / this device" copy repeats 5 to 27 times per page** on shopping pages (inventory in section 8).
6. **Several features exist because they were built, not because a first-time visitor asks for them:** Hobby Starter Budget tool (linked only from the footer), "Find it near you" postcode box (on Tonight and Make Plans), My Plans backup codes/JSON import/export, five share actions on every hobby page and article, a public "What changed" changelog, a 5-page trust set, the second row of mood links in the header.
7. **I broadly agree with the four-destination nav**, with three deviations of my own (section 4): "Find a Hobby" must own the hobbies directory as well as the quiz; the six mood pages become Journal topics, not a header row; and My Plans should become a true heart (today the header icon is a bookmark while cards use hearts).

---

## 2. Counts: header, footer, nav and CTAs

### Chrome (same on every page)
| Element | Desktop 1280 | Mobile 390 |
|---|---|---|
| Sticky red banner "Professionally off duty." | 1 (non-interactive, always visible, takes 28px) | same |
| Header interactive items | 14: wordmark, 4 top links (Make Some Plans, Shop Your Hobby, Hobbies, The Journal), search, bookmark, "Find Your Thing" button, plus 6 mood links in a second row | 4 (wordmark, search, bookmark, menu) |
| Mobile menu panel | n/a | 20 items: 1 CTA, Start here (4), Browse by mood (6), More (4: Tonight, My Plans, Hobbies, Journal), fine print (5) |
| Footer links | 25 (Plans 6, Try it 8, About the site 9, plus "Find your thing", "How we make this", "What changed") | 25 |
| Distinct nav labels for the same destination | "Find Your Thing" (nav) = `/hobby-finder` (URL) = "Hobby Quiz" (title) = "hobby era" (H1); "Make Some Plans" = `/make-plans`; "Shop Your Hobby" = `/shop` = "Start the hobby. Buy one thing."; "My Plans" = `/saved` = "Penciled in." | same |

Footer duplicates the header: Plans column repeats the six mood links; "Try it" repeats Start Here, quiz, planner, shop, Tonight, Hobbies, My Plans; one extra (Hobby Starter Budget).

### Per page (measured, visible links and buttons inside `<main>`, CTA = prominent action; page heights)
| Page | main links | main buttons | words | desktop / mobile height px | Notes |
|---|---|---|---|---|---|
| Home | 31 | 4 | 450 | 4,940 / 6,246 | 6 quiz links, 8 sections |
| Start Here | 11 | 0 | 168 | 2,853 / 4,543 | Duplicates homepage |
| Hobby quiz | 0 | 6 | 43 | 1,826 / 2,673 | 6 steps |
| Hobbies index | 44 | 53 (43 save hearts + 10 filter chips) | 1,696 | 8,880 / 22,417 | 43 cards |
| Hobby page (junk journaling) | 21 | 15 | 857 | 6,006 / 11,042 | 6 actions in hero |
| Hobby page (pickleball) | 12 | 12 | 616 | 4,566 / 8,895 | |
| Make Plans (form) | 0 | 1 (plus about 36 option chips) | 180 | 2,423 / 3,610 | 7 groups + checkbox |
| Make Plans (result) | n/a | 11 | 429 | 5,389 (mobile) | After one submit |
| Tonight | 7 | 7 (plus 17 chips) | 263 | 3,203 / 4,272 | Results render on load |
| Hobby Budget | 6 | 6 (plus about 12 controls) | 357 | 2,955 / 4,101 | Footer-only entry |
| Each mood page (6 pages) | 14 | 9 | 414 to 445 | about 3,950 / about 8,500 | Same template x6 |
| Journal index | 32 | 32 | 1,537 | 10,305 / 24,306 | 32 article cards, no filtering |
| Article (clay / mahjong / 35 hobbies) | 33 / 39 / 98 | 18 / 20 / 64 | 1,630 / 2,048 / 3,676 | 9,060 / 11,131 / 18,681 | |
| Shop index | 18 | 5 | 516 | 4,471 / 6,460 | 8 tiles + 3 picks + 2 gift picks |
| Shop collection (pottery era) | 32 | n/a | 737 | 5,690 / 11,309 | 8 sections |
| Saved (empty) | 4 | 3 | 125 | 2,240 / 3,203 | 4 CTAs + import/export UI |
| Search | 6 | 1 | 34 | 1,315 / 2,194 | |
| About / Contact | 4 / 4 | 0 | 255 / 82 | 3,185 / 1,986 | |
| Privacy / Terms / Affiliate / Editorial / Methodology / Corrections / Changelog | 0 to 3 | 0 | 94 to 561 | 2,161 to 5,617 | 7 legal/trust pages |

### CTA density by page (what a first-timer sees competing for the next tap)
- **Home**: 6 links to the quiz, 2 to Make Plans, 3 to Shop, 4 season cards, 4 kit cards, 6 mood tiles, 3 article cards, 1 Tonight link, 1 "All hobbies", 1 "All 43 hobbies", 1 "More ideas".
- **Hobby page hero**: "See what you need", "Save to My Plans", "Send to the group chat", "Copy link", "Pin it", plus the sidebar "Shop the kit" and the shop block's "Add the starters to my list" (3 save/shop CTAs on top of 3 share buttons).
- **Empty My Plans**: four equal-weight buttons (Find Your Thing, Pick a starter kit, Make Some Plans, What should I do tonight?).
- **Make Plans result**: Shuffle, "Too much? Make it lighter", Save, Print, Send to group chat, Copy link, postcode box, "Use this".
- **Tonight**: Shuffle ideas, Send to group chat, Copy link, postcode "Use this", and per idea "What you'll need", "Make it a whole plan", "Save to My Plans", "Read the how-to guide".

---

## 3. Evidence for the specific concerns

| Concern | Evidence |
|---|---|
| Excessive calls to action | "Find your thing" x6 on home (hero, tile, closing banner, header, footer, mobile menu). The closing banner "For the plot, not the paycheck. Find your thing / or start here" repeats the hero verbatim in purpose. Mobile hero stacks 2 CTAs plus a micro-line ("A few quick questions. No account needed.") before the first image. |
| Decision fatigue | Make Plans asks 7 questions (When 7 options, How long 3, Vibe 7, Who 4, Budget 5, Indoors/outdoors 3, Energy 4, plus "Keep it at home" checkbox) before showing anything. That is about 33 choices; most are preselected, but they are all displayed and the copy says "Starting choice, not yours yet" three times. Hobbies page: 43 cards at once, 10 stackable filters (AND logic, so "Outdoors" plus "At home" yields an empty state with the copy "Outdoors and at home together is a tough ask"; a dead end the site created). Mobile length of that page: 22,417 px (about 27 screens). Journal index: 32 articles in one unfiltered grid, 24,306 px on mobile. |
| Unnecessary filters/options | Hobbies filter chips overlap exactly with mood pages and quiz answers (At home, Outdoors, After work, Weekend, Solo, Social, Creative, Active, Low energy, Free or under $25). Make Plans "Indoors or outdoors" and "Keep it at home" are the same question twice. Budget tool "Experience level" and "Budget preference" (Keep it lean / Balanced / Treat myself) add a modelling layer on a rough estimate. |
| Repetitive homepage sections | Home sections in order: hero, "start here" (3 tiles = hero CTA + planner + shop), season strip, "Everything you need" (4 shop collections), "Pick your kind of plans past five" (6 mood tiles), "Ideas worth stealing" (3 articles), closing CTA. The 6 mood tiles are repeated on `/start-here` ("Rather just look around?") and in the desktop second header row and mobile menu: the same six images appear 3 times in the first click-depth. Shop collection tiles on home reuse the same images as /shop. |
| Overlapping features | Tonight vs Make Plans (same engine, `src/lib/tonight.ts` 469 lines and `src/lib/planner.ts` 1,272 lines); Start Here vs Home; Quiz vs Hobbies filters vs mood pages; Hobby page "Your starter kit" sidebar vs "Everything you need to start" shop block (same kit shown twice on one page); Hobby Budget vs the cost lines on every hobby card ("Under $50 to start") vs kit lists; Shop collection "Hobby guides this collection supports" chips vs hobby pages. |
| Excessive explanatory copy | Make Plans intro (4 lines about weekend booking) plus per-section helper lines; Tonight "Five taps, three ideas that fit. Nothing is sent anywhere; anything you save stays on this device." (plus a second location note under the postcode box and a third disclaimer at the bottom); Saved page: yellow "Saved on this device only..." box plus "Move to another device" section; /shop hero 3 lines plus a 4th line "We read each Amazon page ourselves..." plus footer-of-page 2-line disclaimer; collection page opens with a hero line, a kit blurb, "Who this is for", "What these hobbies involve" (3 more descriptions), "More ideas, by product type", guide chips. |
| Repeated disclaimers | Inventory in section 8. |
| Unnecessarily long journeys | Section 6. Quiz to product 9 taps. Tonight on mobile is hidden under menu > More (2 taps, vs 1 for the others). |
| Shopping overwhelming? | Moderately, not terribly. /shop is actually good ("Start the hobby. Buy one thing."): one intro, 8 era tiles, 3 first buys, 2 gift picks. But it shows **8 collections** (the plan already targets 6), then a collection page with one pick, "Then add", 2 "pretty extras", 3 "Prefer something different?" disclosures and a 9-item block of articles and cards after. Hobby pages show 4 products per hobby (1 pick, 1 add, 2 extras). The tiered logic is a strength; the volume of side-content around it is the issue. 43 hobby pages each carry a shop block, which is far more shop surface than a curated "luxury" model needs (the plan is 12 signature hobbies). |
| Features built because we built them | See section 5: Hobby Budget tool, near-me postcode box, My Plans export/import codes (`saved-transfer.ts`, 258 lines), 5 share actions, "Save as image" on quiz result, public changelog, the pin counter badge, a 3-step "Make it lighter/Shuffle" planner, 8 + 7 legal/trust pages. |

---

## 4. Four-destination navigation: investigation and my recommendation

Proposed by owner: **Find a Hobby, Make Plans, The Shop, The Journal**; My Plans as a heart icon; Tonight folded into Make Plans; legal/trust links to footer.

**My verdict: yes, with three deviations.**

1. **"Find a Hobby" must be the front door to both the quiz and the directory.** Today they are separate ("Find Your Thing" button vs "Hobbies" link) and /hobbies is the only place that shows the 43 hobbies. If the four destinations are exactly the owner's four, there is no home for the directory unless "Find a Hobby" lands on one page: quiz at the top (single CTA "Take the 4-question quiz"), then the signature hobbies, then "More hobbies" below. URL: keep `/hobbies` as the page, with `/hobby-finder` (the quiz) as its own step (the quiz still needs an indexable page: it is a sitemap URL today).
2. **The six mood pages do not belong in the header.** They are editorial index pages of the Journal (their content: 3 articles by category, 6 hand-picked hobbies, 3 shop collection tiles, one "Build my plan" button). The same `category` field drives the journal articles. Recommend they become **Journal topics** (chips on The Journal, one page per topic) rather than a seventh to twelfth nav item. This removes the second header row (6 items) and the mobile "Browse by mood" block (6 items), and removes the name collision "The Weekend Edit" (a mood page today and a planned shop collection in PLAN.md section 2b).
3. **Heart, not bookmark.** Header icon is a bookmark with a count badge; hobby cards use a heart; articles and plans use bookmark; the page is called "My Plans" but also holds saved hobbies and shopping lists. Use a heart everywhere, aria-label "Saved" (or "My Plans"), one icon. Keep `/saved`.

Tonight folding: **Merge into Make Plans.** Add a first control "Tonight / This weekend" (default Tonight) that defaults When = Evening, How long = A few hours, and shows results immediately (Tonight already renders results on load; the planner only after a submit). Redirect `/tools/tonight` to `/make-plans?when=evening`. Hide the postcode box behind a "Find it near you" link or drop it.

Resulting chrome:
- Desktop header: wordmark, **4 links**, search icon, heart icon. Optional single primary button is not needed (the nav itself says Find a Hobby). Total 7 items (from 14).
- Mobile header: wordmark, search, heart, menu. Menu: the same 4 links plus 4 small legal links (About, Contact, Disclosure, Editorial standards). 8 items (from 20).
- Footer: 1 column "Explore" (4), 1 column "About" (About, Contact, Affiliate Disclosure, Editorial Standards incl. How we choose, Privacy, Terms), tagline. About 12 links (from 25). Corrections, methodology and changelog fold into the Editorial Standards page.
- Remove the sticky red banner on mobile (or make it non-sticky): it permanently costs 28px of a 844px viewport for a slogan that also appears in the footer.

Risks I see: (a) "Find a Hobby" and "Make Plans" are both discovery tools; they need a one-line distinction on the home page ("Not sure what to try? / Know what you want to do tonight?"), which the current hero already does; (b) The Shop must stay reachable from hobby pages and journal articles, not only the nav (it is, via shop blocks); (c) search is currently an icon only; keep it.

---

## 5. Classification per page and feature

Legend: K Keep, I Improve, S Simplify, M Merge, H Hide (reachable, not promoted, noindex or unlinked), R Remove. "From scratch?" = would we build this today for a curated, low-maintenance sale. Impact columns: CX customer experience, Com commercial, SEO (indexed URLs / redirect), Load buyer workload.

| Page / feature | Class | From scratch today? | CX | Commercial | SEO | Buyer workload |
|---|---|---|---|---|---|---|
| Home `/` | **Simplify** (8 sections to 4, section 7) | Yes, much shorter | High: faster first decision | Medium: clearer shop path | Keep URL | Lower (fewer blocks to keep current) |
| Start Here `/start-here` | **Merge into Home** | No: it is a longer home | Neutral; removes duplicate entry point | None | 1 indexed URL, 301 to `/` | Lower |
| Hobby quiz `/hobby-finder` | **Improve** (6 to 4 questions; result shows first starter pick) | Yes, but shorter | High | High: closest route to a product | Keep URL | Neutral |
| Hobbies index `/hobbies` | **Improve + Simplify** (lead with 12 signature hobbies, collapse the rest; 10 chips to 5 single-select, or none) | Yes, smaller | High | Medium | Keep URL; 35 indexed URLs under it | Lower |
| Hobby pages `/hobbies/<slug>` (34 indexable, 9 noindexed) | **Improve** the 12 signature; **Simplify** the other 31 to a lighter template (no shop block, no "if you like" cards) | 12 yes; 31 only as light discovery (as PLAN already says) | High for the 12 | High for the 12 (shop block lives here) | Keep all 34 URLs; noindex the lightest ones only after review | Lower |
| Make Plans `/make-plans` | **Simplify + absorb Tonight** (4 visible questions: When, Who, Budget, Vibe; Energy/Indoors/Home under "Fine-tune") | Yes, as a "plan in one tap" | High | Medium: results carry kits | Keep URL | Neutral (largest code, 1,272 lines; unchanged engine) |
| Tonight `/tools/tonight` | **Merge into Make Plans** | No (a duplicate of one planner preset) | Slight gain | None | 1 indexed URL, 301 to `/make-plans?when=evening` | Lower (one fewer tool and test surface) |
| Hobby Budget `/tools/hobby-budget` | **Remove (or Hide)**: if kept, only as a collapsible "Estimate my start-up cost" inside a hobby page | No: footer-only entry, overlaps "Under $50 to start" + kit list | Low | Low | 1 indexed URL, 301 to `/hobbies` | Lower (161 lines + 395 lines of `equipment.ts` estimates to maintain) |
| Mood pages (After Hours, Weekends, Solo Dates, Better Together, Creative Corner, Movement) | **Merge into Journal as topics** | No as a parallel nav; yes as article topics | Neutral | Neutral | 6 indexed URLs, 301 to `/journal/topics/<slug>` (or keep paths unchanged in phase 1, they are no-history URLs) | Lower (6 hand-picked featured lists `categories.ts` to 1 field) |
| Journal index `/journal` | **Improve** (topic chips, "Start here" 3 picks, the rest below) | Yes | High | High (articles carry shop blocks) | Keep URL | Neutral |
| Articles `/journal/<slug>` (32) | **Keep** (rewrite per plan) | Yes | High | High | Keep all URLs; consolidations get 301s per A2 | Neutral |
| Shop `/shop` | **Simplify**: 6 collections, 1 intro line, drop "Three good first buys" or "Give someone a first evening" (keep one) | Yes | High | High | Keep URL | Lower |
| Collection pages `/shop/<slug>` (8) | **Simplify** (6) | Yes, shorter: kit, 3 extras, 1 related story | High | High | 8 indexed; 2 retired slugs 301 to nearest collection | Lower |
| My Plans `/saved` | **Improve + Simplify**: heart in header; remove Move-to-another-device UI from the empty state (collapse under "Backup") | Heart list yes; export/import codes no | Medium | Low | noindex already | Lower (`saved-transfer.ts` 258 lines + tests) |
| Search `/search` | **Keep** (icon only) | Yes (43 hobbies, 32 articles) | Medium | Low | noindex already | Neutral |
| About `/about` | **Keep** (trim) | Yes | Medium | Medium (trust for a buyer) | Keep | Neutral |
| Contact `/contact` | **Keep** (82 words, no form) | Yes | Low | Low | Keep | Neutral |
| Privacy, Terms | **Keep**, footer only | Required | Low | Required | Keep | Neutral |
| Affiliate Disclosure | **Keep** (the one place the full text lives) | Yes | Low | Required | Keep | Neutral |
| Editorial Standards `/editorial-policy` | **Keep + absorb** Methodology and Corrections as sections | One page, not three | Low | Medium | `/methodology`, `/corrections` 301 to `/editorial-policy#...`; `/editorial-standards` already 301s | Lower |
| Changelog `/changelog` | **Hide**: remove footer link "What changed" and the sitemap entry; keep the file as a seller doc | No: public changelog is a maintenance chore for a customer who will not read it | None | None | 1 indexed URL, 301 to `/about` (or noindex) | Lower (stops every release asking for an entry) |
| "Find it near you" postcode box | **Remove** (or hide behind a link) | No | Low | None | none | Lower (`near.ts`, `near-terms.ts`) |
| Share bar (Group chat, Copy link, Pin it, Print, Save as image) | **Simplify**: one "Share" button with a menu; remove "Save as image" | One share action yes | Medium | Low | none | Lower |
| Header second row + mobile "Browse by mood" | **Remove** (moods become Journal topics) | No | Positive | None | none | Lower |
| Sticky red banner | **Simplify** (non-sticky or remove) | No | Positive on mobile | None | none | Neutral |
| Season strip on home | **Keep** (one row of 3-4) | Yes, if automated | Medium | Medium | none | Neutral |
| Hobby page "If you like X, try..." and "Read next" | **Merge** into one "Next" row of 3 | One row yes | Low | Low | none | Lower |

---

## 6. First-time visitor journeys (taps from landing)

"Tap" = a tap or click that changes what the user sees. Quiz taps measured by script; others counted from the DOM and screenshots.

### Journey A: "I have no idea what to try" (find a hobby to plan to product)
**Current, desktop (measured/counted):**
1. Home: tap hero "Find your thing" (1)
2. Quiz 6 questions: Making things, Running on fumes, Just me, At home, Under 45 minutes, Nothing (2 to 7)
3. Result: 3 hobbies. Tap "What you'll need for Collage Art" (8)
4. Hobby page `#kit`: tap "See it on Amazon" on the one pick (9) (page jumps via anchor; product is below the hero, 4 products on screen)
5. Plan: separate branch: result "Plan my weekend with this" (8) then Make Plans form pre-filled but requires another "Plan my weekend" tap (9), plan shown, Save (10)

= **9 taps to a product, 10 to a plan; 7 distinct decisions** before the first product (6 answers plus a hobby choice).

**Mobile:** same 9, but quiz step cards each need a scroll back; the result page is 4,038 px tall and the product is not on it.

**Proposed:**
1. Home: tap "Find a Hobby" (1)
2. Quiz 4 questions: what you want more of, energy, who, budget (2 to 5); drop "Where" (answered by "what you want more of") and "How long" (folded into energy)
3. Result: **one hero hobby + two alternates**, with the hero hobby's "Start with this one pick" product button and a "Plan a first session" button (6: Amazon, or 6: plan)

= **6 taps to a product, 6 to a plan; 5 decisions.** A product on the quiz result is a content change (reuse the hobby's one-pick; no new catalogue work).

### Journey B: "I know the hobby (e.g. pickleball), what do I need?"
- **Current:** Home > Hobbies (1) > scroll 43 cards to Pickleball or filter (2 to 3, filters AND together) > hobby page (3 or 4) > See it on Amazon (4 or 5). Or Home > "Shop Your Hobby" tile (1) > era tile "The Sporty Girl" (2) > collection page > Amazon (3). Or Header search (1) type + results (2) + hobby (3) + Amazon (4).
- **Proposed:** Home > Shop (1) > collection tile (2) > product (3); or Find a Hobby > signature hobby tile (2) > "Start with this pick" (3). Search unchanged.

### Journey C: "Plan tonight"
- **Current:** desktop: footer "What Should I Do Tonight?" (1) (results render on load) > Save (2). Mobile: Menu (1) > More > Tonight (2) > Save (3). Or home "or plan this weekend" (1) > Plan my weekend (2) > Save (3). Two different plan tools with two different default sets.
- **Proposed:** Make Plans (1), defaults to Tonight and renders on load, Save (2). Mobile: Menu (1) > Make Plans (2) > Save (3), same as today but one tool.

### Journey D: "Reading about it first" (Journal to product)
- **Current:** Home article card (1) > article, inline shop block "Shop the article" (2). Journal index is a 32-card unfiltered grid (24,306 px on mobile): Journal (1) > scroll > article (2) > product (3).
- **Proposed:** Journal (1) > topic chip > article (2) > product (3): unchanged, but fewer cards above the fold.

### Journey E: "Save something and come back"
- **Current:** heart on a hobby card, bookmark on an article/plan/shop pick (inconsistent), header bookmark with count badge (3). My Plans empty state asks 4 more actions.
- **Proposed:** one heart icon everywhere; empty state has one CTA ("Find a Hobby").

Summary of taps (home to product): current 9 / 3 (known hobby, via /shop) / 3 (article). Proposed 6 / 3 / 3. Home to plan: current 3 (10 through the quiz), proposed 2 (6 through the quiz).

---

## 7. Proposed simplified sitemap

```
/                              Home (4 sections)
/hobbies                       Find a Hobby: quiz entry + 12 signature + "More hobbies"
  /hobbies/<slug>              34 pages kept; 12 signature get the full template
/hobby-finder                  The quiz (4 questions); linked from /hobbies and home
/make-plans                    Make Plans (Tonight is a preset: ?when=evening)
/shop                          The Shop (6 collections)
  /shop/<collection>           6 pages
/journal                       The Journal
  /journal/topics/<topic>      6 topics (the old mood pages)
  /journal/<slug>              articles (about 28 to 32; consolidations per A2)
/saved                         My Plans (heart icon; noindex)
/search                        Search (icon; noindex)
Footer only:
/about  /contact  /affiliate-disclosure  /editorial-policy  /privacy  /terms
```

### Redirects (all 301; destination is genuinely relevant)
| Old URL | New destination | Reason |
|---|---|---|
| `/start-here` | `/` | Home carries the same three entries |
| `/tools/tonight` | `/make-plans?when=evening` | Folded in |
| `/tools/hobby-budget` | `/hobbies` | Removed (or Hide; if hobby pages keep a collapsible estimate, still redirect) |
| `/after-hours` | `/journal/topics/after-hours` | Mood to topic (phase 2; phase 1 may keep the old paths to avoid churn) |
| `/weekends` | `/journal/topics/weekends` | same |
| `/solo-dates` | `/journal/topics/solo-dates` | same |
| `/better-together` | `/journal/topics/better-together` | same |
| `/creative-corner` | `/journal/topics/creative-corner` | same |
| `/movement` | `/journal/topics/movement` | same |
| `/methodology` | `/editorial-policy#how-we-choose` | Merged trust page |
| `/corrections` | `/editorial-policy#corrections` | Merged trust page |
| `/changelog` | `/about` (or noindex) | Hidden |
| `/editorial-standards` | `/editorial-policy` | Already redirects |
| `/shop/<retired-collection>` (2 of the 8 if cut to 6) | the nearest collection (e.g. Cozy After Hours to Cozy; Little Adventures to Weekend) | Per PLAN 2b mapping |
Redirect infrastructure exists only in route code today (`editorial-standards.tsx` throws a 301 `redirect`; `netlify.toml` has no redirect rules and `public/_redirects` is absent). The planned redirect-map test (PLAN section 5) should cover this list. Indexed URLs affected today (sitemap has 98): about 13 change, 85 stay. No traffic history is available to weigh them, which is the plan's own argument for doing this now.

---

## 8. Proposed homepage section list

Current (8 blocks): hero; "hi, you clocked out. start here" (3 tiles) plus Tonight link; "This weekend, try one for autumn" (4 hobby cards); "Everything you need for try number one" (4 shop collections plus a 3-line disclaimer); "Pick your kind of plans past five" (6 mood tiles); "Ideas worth stealing" (3 articles); closing CTA banner; footer.

| Section | Verdict | Why |
|---|---|---|
| Hero (headline, one primary CTA "Find a hobby", one text link "or plan this weekend") | **Keep** | Strongest block; remove the micro-line "A few quick questions. No account needed" (the quiz page says it) |
| "Start here" 3 tiles + Tonight link | **Remove** | Repeats the hero CTA and the nav |
| "This weekend, try one for [season]" (4 hobby cards) | **Keep**, show 3 | Fresh, curated, a reason to return; drives to the shop via hobby pages |
| Shop collections ("Everything you need...") | **Keep**, show 3 of the 6 collections with one line and "See the shop" | The only commercial block on home; move the 3-line Amazon disclaimer out (footer carries it) |
| 6 mood tiles | **Remove** | Duplicate of Start Here, header row and menu; moods become Journal topics |
| "Ideas worth stealing" (3 articles) | **Keep** | Journal teaser; keep 3 |
| Closing CTA banner | **Remove** | Third "Find your thing" on the page |
| Footer | Simplify as in section 4 | |

Result: **4 content sections** (hero, this weekend, shop edit, journal) and about 18 to 20 links (from 31). Same photography, less repetition.

---

## 9. Repeated-copy and disclaimer inventory, with proposed single locations

Counts are text matches inside `<main>` on the rendered page (header and footer excluded); they measure repetition, not word count.

| Copy | Where it currently repeats | Measured evidence | Proposed single location |
|---|---|---|---|
| "Ordinary Amazon links. We show no prices: Amazon or the seller sets price, shipping and returns. We don't currently earn from these links. Disclosure" (source `config/affiliate.ts` lines 258 to 287, rendered by `ShopDisclosure`, `AffiliateNote`) | Home kit section; /shop (hero, again under first buys, again at page bottom); every collection page hero and after the kit; every hobby page shop block (twice); every article shop block; budget tool | Matches of "amazon" in main: home 5, /shop 12, junk journaling hobby page 8, pickleball 6, clay article 7, mahjong article 13, 35-hobbies article 27. "No prices" lines: shop 2, junk journaling 2, clay 2, mahjong 3, 35-hobbies 5. | **One line at the first product block on a page** ("Links go to Amazon. No prices shown. How links work"), the full text only on `/affiliate-disclosure`, and in the footer. The "See it on Amazon" button label is already a disclosure at point of click. When tracking is OFF, remove "We don't currently earn" from page level entirely and keep it on the disclosure page. |
| "Saved on this device only / Stays on this device / No account / No email" | Home hero micro-line, Start Here ("Save as you go"), quiz subtitle, Tonight (twice), Saved page (yellow box plus "Move to another device"), quiz results footer, share notes | Tonight main: 2 "this device"; saved: 2; start-here: 1 and "no account" 1; quiz subtitle "No email, no account" | **Saved page only**, plus one tooltip on the first heart tap ("Saved in this browser"). Remove from home, quiz, tools. |
| "Costs and times are approximate / Ideas are general... check local hours, prices and safety" | Make Plans result footer, Tonight footer, Budget footer (8 "estimate/approximate" matches), per-item "(estimate)" labels on Tonight cards | Tonight 4 "estimate", Budget 8 "estimate" | One line at the bottom of Make Plans results; delete per-item "(estimate)" tags; budget tool goes away |
| "Starting choice, not yours yet. Pick the one that fits." | Make Plans under three groups (Vibe, Who, Budget) | Visible in screenshot | Delete (the preselected chip is obvious) or show once |
| "How we make this" / "How we choose" / Editorial Standards | Footer link x2 ("How we make this" and "Editorial Standards" plus "How We Choose" in About), article byline link, shop hero link, methodology page | Footer lists 3 near-identical trust links; mobile fine-print lists Editorial Standards, Affiliate Disclosure, Corrections again | One "Editorial Standards" link in the footer; article byline keeps "How we make this" |
| Tagline set: "Professionally off duty" (banner), "Making a life, not just a living" (footer), "For the plot, not the paycheck" (footer and closing banner), "Because the best part of your day is still ahead" (H1), "more hobbies. fewer meetings." (sticker) | Home and every page header/footer | 5 slogans for one brand | Keep 1 header-free slogan (H1) plus 1 footer tagline; drop banner and "plot/paycheck" |
| "Find it near you (optional)... Stays on this device. We never see it. It only builds Google Maps search links..." | Tonight, Make Plans result | Two pages, 3 sentences each | Remove the feature (see section 5) |
| AI / safety disclosures | Editorial Standards only (per rule); article safety lines (3 matches in the clay article) are content, keep in place | | unchanged |

---

## 10. Page-by-page notes (first-time visitor lens)

- **Home**: strong first screen on both widths (headline, one clear button, a warm photo). Value is diluted below: the second screen repeats what the first and the header already say. Mobile hero pushes a 2-line micro-note and a text link between the button and the image.
- **Start Here**: reads as a homepage rewritten as a page. Three equal tiles (quiz, planner, shop) plus six mood tiles plus a "Save as you go" box. No unique value after a home that already does this.
- **Quiz**: good (photo answers, single-question steps, URL step state). Problem is the end: results give 3 hobbies but no product, and the main follow-up button is "Plan my weekend with this" (an evening/weekend planner for a visitor who may only want to try a hobby). "Take it again", "Send to the group chat", "Copy link", "Save as image" are 4 extras after the answer.
- **Hobbies index**: the largest scan load on the site (43 cards, 1,696 words, 22,417 px on mobile). Cards are good-looking; only 12 are strategic hobbies (PLAN 2b). 9 hobby pages are noindexed because they have no article, yet their cards sit in the directory.
- **Hobby page**: clear structure (first session, why you'll love it, first week, what you'll have made, where to learn, shop block). Duplicates: sidebar "Your starter kit" and the shop block; "Where to learn" generic bullets ("Beginner video tutorials", "A library book or e-book on the basics") repeat across hobbies; "Read next" and "If you like X, try..." are two cards rows. Mobile length 8,895 to 11,042 px.
- **Make Plans**: the form is the page; on mobile you must scroll through 7 groups to reach the button (form is about 3,600 px). Good result page (timeline, print, save). Defaults are pre-selected so a first-timer could press one button; that is not obvious because the button sits below all groups.
- **Tonight**: the best first-time experience on the site (results on load, 5 compact groups). That is the argument for making Make Plans behave the same way, not for keeping two.
- **Budget**: a calculator with an experience level, a budget preference, essentials, optional extras, an estimate and 3 disclaimers. Nobody lands here: only the footer links to it.
- **Mood pages (6)**: same template six times (hero, "Start with a read" 3 articles, "Pick one to try" 6 hobbies, "Build my plan", "Shop the look" 3 collection tiles). Overlap each other (After Hours features junk journaling, watercolor, reading; Creative Corner features the same) and the hobbies index.
- **Journal**: 32 cards, lead article first. No topic navigation on the index. Needs topic chips and 3 featured, not 32 at once.
- **Articles**: good format; the 35-hobbies article is 3,676 words, 98 links and 64 buttons, i.e. a hub page. Mahjong 2,048 words, clay 1,630. Disclaimers repeat per shop block (27 "amazon" mentions on the longest).
- **Shop**: best-edited page on the site. Header says what it is, tiles are large, three picks per kit logic. Reduce to 6 tiles; the "Three good first buys" and "Give someone a first evening" blocks are two more product lists on an index whose job is to send people into a collection.
- **Saved**: empty state asks 4 questions at once and shows backup/import tools to a visitor with nothing saved. Naming drift: "My Plans" / "Penciled in." / heart vs bookmark.
- **Search**: fine, quiet; icon only.
- **About, Contact, policies**: short and plain; fine. 7 trust/legal pages for a site that sells nothing directly is more than needed; 3 can merge into 1.

---

## 11. Ranked recommendations

| # | Recommendation | Effort | Impact (CX / Commercial / SEO / Buyer workload) |
|---|---|---|---|
| 1 | Replace header with 4 destinations + search + heart; remove the 6-link mood row and mobile "Browse by mood"; footer to 2 columns | M | CX high, SEO none (links only), workload lower |
| 2 | Quiz result: one hero hobby with its "one pick" product button and "Plan a first session"; cut quiz to 4 questions | M | CX high, commercial high; 9 to 6 taps |
| 3 | Fold Tonight into Make Plans (preset + results on load, 4 visible questions); 301 `/tools/tonight` | M | CX high, SEO 1 redirect, workload lower |
| 4 | Collapse Home from 8 sections to 4; retire "start here" tiles, mood tiles, closing CTA | S | CX high, commercial neutral |
| 5 | Merge `/start-here` into `/`; 301 | S | SEO 1 redirect |
| 6 | One disclaimer pattern: one line at first product block, full text on Affiliate Disclosure, drop page-level "we don't currently earn" | S | CX medium, trust high, workload lower |
| 7 | Hobbies index: lead with 12 signature hobbies, "More hobbies" collapsed; filters to 5 single-select or remove | M | CX high, commercial medium |
| 8 | Mood pages to Journal topics with chips on the Journal index; 6 redirects (or phase 2) | M | CX medium, SEO 6 redirects, workload lower |
| 9 | Remove Hobby Budget tool (or inline it as a collapsible on hobby pages) | S | CX low, workload lower |
| 10 | Shop to 6 collections; one product list on `/shop` (drop one of "first buys" / "gift") | M | CX high, commercial high |
| 11 | Heart icon everywhere for My Plans; one name; strip export/import from the empty state | S | CX medium |
| 12 | Merge Methodology and Corrections into Editorial Standards; hide Changelog; footer to 12 links | S | SEO 3 redirects, workload lower |
| 13 | Remove postcode box and "Save as image"; one Share menu | S | CX low, workload lower |
| 14 | Hobby page: merge sidebar kit and shop block; merge "Read next" and "If you like"; lighter template for the 31 non-signature hobbies | M to L | CX medium, workload lower |
| 15 | Remove sticky banner and extra slogans | S | CX low |

Estimates of effort assume the existing planner, shop blocks and kits are reused; nothing here adds a feature.

---

## Summary (5 lines)
1. The site has five overlapping ways to sort the same hobbies (6 mood pages, 6-step quiz, 7-group planner, 5-group Tonight, 10 filter chips); desktop header shows 14 items and the footer 25 links, and "Find your thing" appears 6 times on the homepage.
2. Four-destination nav (Find a Hobby, Make Plans, The Shop, The Journal + search + heart) is right, with my deviations: Find a Hobby owns the directory, the six mood pages become Journal topics, and the header bookmark becomes a heart.
3. Tonight should merge into Make Plans (same engine, 301 `/tools/tonight`); Start Here merges into Home; Hobby Budget, the postcode box, the changelog link and export/import UI should be removed or hidden.
4. Quiz to product is 9 taps today (measured) because the quiz result shows no product; a 4-question quiz with a one-pick product on the result gets it to 6; Amazon/"no prices"/"on this device" copy repeats 5 to 27 times per shopping page and should live in one line plus the disclosure page.
5. About 13 of 98 indexed URLs would redirect (6 moods, Start Here, Tonight, Budget, Methodology, Corrections, Changelog, plus 2 retired collections); no traffic data exists, so SEO risk is structural only.
