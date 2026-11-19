# C1 Tired nine-to-five on her phone (390x844 touch)

**SIMULATED SENTIMENT from an AI persona, not real customer research.** Observations come from a real Playwright run against http://127.0.0.1:5990 (touch, 390x844, DPR 1). Where I say "I felt", that is persona voice. Not tested: real iOS/Android share sheets (I stubbed navigator.share and read what it was called with), real clipboard, slow networks, Google Fonts (not reachable/verified). I bought nothing and opened no external sites.

## Task narration

**1. Land cold, what is this site?** Top bar "PROFESSIONALLY OFF DUTY." Headline "Because the best part of your day is still ahead." Sub: "Find a hobby, plan the night, and get the little supplies to start it. Close the laptop. Open your evening." A big red "Find your thing" button and "or plan this weekend", with "A few quick questions. No account needed." I understood within about 5 seconds: hobbies/evening plans/starter supplies for after-work women. The warm photo (three women painting pottery, caption "pottery night, thurs.") sits right under the CTA on first screen. Slight hesitation: the photo is people-heavy, and I was too tired to read the tagline "more hobbies. fewer meetings." as anything but cute. Nothing about who runs it on the first screen. Page height 6246px, no horizontal scroll (scrollWidth 390).

**2. Something for tonight, low energy.** Scrolling past the hero I saw three tinted cards (Find Your Thing / Make Some Plans / Shop Your Hobby) and, small, "Just need something for tonight? What Should I Do Tonight?" That is my actual need and it is a small text link below the big cards; I almost missed it. Tapped it: /tools/tonight shows chips for time, energy, budget, company, where, with defaults already set ("An hour, Running on fumes, Free, Just me") and three results visible instantly: Collage Art (45 min, free), Creative Writing (30 min), Reading (30 min), each with a "First step" sentence. This was the best moment of the visit: zero-effort, relevant, free. Frustration: the "For:" line says "indoors or out" while the label for WHERE was Either. Fine, but I had to scroll past 5 chip rows (~1.5 screens) before seeing any idea, so on my phone I would have thought nothing happened. No photos on the ideas, text only. Also: hmm, "running on fumes" got me "Creative Writing" and "Collage Art", which still require making something; a tired person may want "watch/listen" ideas. Reading was the only one that felt like zero effort.

**3. Quiz.** /hobby-finder: six single-tap questions, auto-advance, a Back button. I tapped Making things / Running on fumes / Just me / At home / Under 45 min / Nothing. The URL becomes /hobby-finder?q=7&a=cr.lo.so.ho.sh.fr (shareable). Result: "you're giving… The Creative Girl", a photo of a journal, my six answers echoed as chips, and three matches (Collage Art "Easiest start", Creative Writing, Crossword Puzzles), each with "Tonight, try: ..." and "What you'll need". Delight: the persona label and the echoed answers. Weak: the lower result cards are flat yellow/pink blocks with flower clip-art instead of imagery (looks placeholder-ish), and the quiz says "Up to six taps" but the result is the same three low-effort hobbies the tonight tool gave me (consistent, but also not much new). Result buttons: "Plan my weekend with this", "Send this to the group chat", "Save as image", "Copy link", "Take it again".

**4. Save two things, find them after refresh.** On /tools/tonight I tapped the hearts on Collage Art and Creative Writing. Buttons flipped to "Saved to My Plans" (aria-pressed true) and the header bookmark got a red badge "2". Saved to localStorage key ppf:my-plans:v1. I loaded /saved: "Penciled in. ... Saved on this device only. Not synced. Clearing browser data removes it." Both items listed under "Hobby wishlist" with "Copy as text" and "Send to the group chat". Persisted across navigation. Then on a long article I saved the article and did a true page reload: heart still showed "Saved to My Plans: 25 Things...", and /saved listed it under "Stories". Works. Candid note: the honest "this device only" warning is good, but I have no account, so a new phone loses everything; there is an export/backup code option, which a tired person will never use. The bookmark icon in the header has no label (icon-only); I knew it from the badge.

**5. Share one idea.** On the quiz result and on an article, "Send to the group chat" called the Web Share API with sensible payloads (title, text, and a planspastfive.com URL; quiz share carried my answers in the URL: "My hobby era: The Creative Girl... Find yours at planspastfive.com/hobby-finder"). "Copy link" on the tonight tool and article showed "Copied" feedback ("Copied with a link to these ideas."). I could not verify a real share sheet or clipboard content on a real device. Note: shared URLs point to https://planspastfive.com (not the host I was on), which I cannot confirm exists; I did not open it.

**6. Read an article for two minutes.** Opened "25 Things to Do After Work Instead of Scrolling" (about 1,250 words, "6 MIN READ", byline "THE PLANS PAST FIVE EDITORS", dated Nov 18, 2026). Readable on a phone: large serif headings, numbered items with time/cost/company pills, a sticky "IN THIS STORY / Skip to shopping" bar, a yellow "No-spend alternative" callout. Bugs: (a) visible duplicated copy "our guide to our guide to low-energy hobbies" in the "If you're exhausted" intro; (b) numbering is non-contiguous in view: section "If you want to make something" is a collapsed accordion, so the list jumps from 5 to 12, which felt like missing content until I understood it was collapsed (there is just a chevron); (c) the sticky bar overlaps content as you scroll; fine. No raw markdown or placeholders found (regex check for **, ](, {{, lorem, undefined: clean). The article is original-sounding and practical, with the editors admitting "pick one, not all of them". But it is generic list-journalism, no firsthand voice, which the About page says is deliberate.

**7. Contact and money.** /contact says: "Our public inbox isn't open yet, and we won't show an address until it is." So I cannot contact the site at all: no email, no form, no social. It does invite corrections, "story ideas" and "partnership questions" but gives nowhere to send them. This is the biggest trust miss for me. Money: /affiliate-disclosure says shopping links are ordinary Amazon links and "We don't currently earn from these links. If that changes, we may earn a commission, and this page ... will be updated first." Same message appears under shop sections. So the honest answer to "how does it make money?" is: currently it does not. That is refreshingly honest but raises the question of who pays for it and whether it will still exist next month. The editorial standards say images are AI-generated ("depict no real people or brands") and that AI is used for research and content. That disclosure is good, but it contradicts my gut feel from the hero photo (it looked like real women at a pottery table); knowing it is AI made me feel slightly cooler about "pottery night, thurs." The photo captions ("illustrative styling, not specific products") are honest too.

## Product click (no purchase)
On /hobbies/collage-art the kit is "Old magazines, glue stick, scissors, card or paper", mostly things I already have, with only one product card: "Washi tape collection" -> "Find washi tape collection on Amazon" -> https://www.amazon.com/s?k=washi+tape+set (target=_blank, rel=sponsored noopener noreferrer; I did not open it). That is an Amazon search, not a product, and the card has no photo. On /shop/creative-girl there is a proper named pick: "A5 hardcover journal, 120 gsm, Stationery Island" with "Why we picked it: Thicker paper than a standard notebook, per the listing." and "See it on Amazon", plus Scotch glue sticks 4-pack, floral washi tape, Pigma Micron pens. I would click the journal pick because it says why and what to pair it with. I would not click the washi search; it feels like a placeholder. Note a subtle contradiction: `rel=sponsored` is set on links while the pages say "We don't currently earn from these links".

## Questions
- **Continue exploring?** Yes, but only because the tonight tool paid off immediately. After that my interest dipped on the flat colored result cards and again on Contact.
- **Trust the publication?** Partly. Strong: very explicit editorial policy, no fake reviews/prices, honest "we haven't tested". Weak: no way to contact anyone, no named people, AI-generated imagery, a site that earns nothing yet.
- **Try a recommended hobby?** Yes: Collage Art tonight (free, 45 min, supplies at home) or Reading. Both were pitched with a concrete first step.
- **Consider buying supplies?** Low desire. Mostly the hobbies were free or common items; products have no prices, no photos on several cards, and open Amazon. For pottery or watercolor I might look at the shop lists, but I did not feel pulled.
- **Save?** Exists and works for hobbies, plans, articles; device-only with export/backup.
- **Share?** Web Share + Copy link + Pinterest on content; quiz results shareable with answer in URL; "Save as image" exists (not tested).
- **Return?** Maybe on a Thursday evening for the tonight tool if I remembered it; there is no email/push reminder and no account, which is privacy-friendly but gives me no reason to come back. Dropped moments: (1) tonight link buried under the three big cards, (2) the "our guide to our guide to" typo, (3) Contact page with no contact.

## Strengths
Instant tonight tool with sensible defaults; quiz is fast (6 taps) with a charming result and shareable URL; saving works and persists with clear local-only wording; no horizontal scroll on mobile; honest affiliate and editorial pages; no leaked notes or raw markdown seen on the pages I read; accessible labels on save buttons.

## Frustrations and unanswered questions
No contact route; unclear who the editors are and who funds the site; hobby cards on home and quiz result lack photography; AI imagery; shops show no prices; the tonight results show only three ideas that skew "make something"; collapsed article section hides items with only a chevron; typo; icon-only header buttons.

## Scores (1-10)
- First impression: 7. Clear promise, warm hero, big CTA in the first screen; no editorial identity visible.
- Aesthetic appeal: 8. Cohesive red/cream/serif brand, polished hero and kit photos; but placeholder-looking flower cards in results.
- Navigation: 7. Hamburger, sticky header, bookmark badge, tidy footer; the tonight tool is under-promoted on the homepage.
- Editorial authenticity: 6. Honest and consistent but generic, anonymous, AI-assisted/AI images, and a visible copy glitch.
- Usefulness: 8. Tonight tool and quiz gave actionable first steps in under a minute.
- Trust: 5. Policies are exemplary, but no contact, no named humans, no revenue model.
- Product desirability: 4. Few named products, search links, little imagery, no prices.
- Willingness to purchase supplies: 3. Most items free or already owned; no urgency or specifics.
- Willingness to return: 5. Useful once; no hook beyond my memory.
- Willingness to share: 6. Share and copy link work and the quiz result is share-worthy; I would send the quiz to a friend.
- Business credibility: 3. Earns nothing, no public contact, anonymous, so it reads as a project rather than a business.

## Top 8 fixes, ranked
1. Publish a working contact route (email address or form) and fix the claim that "partnership questions" are welcome with nowhere to send them.
2. Promote "What should I do tonight?" on the home page to a full-width card above the fold of the second screen, and keep the three results visible without scrolling past all chips (or auto-scroll to results).
3. Fix the duplicated "our guide to our guide to low-energy hobbies" copy in the after-work article and scan for similar template glitches.
4. Replace the flat colored/flower placeholder cards on quiz results and home hobby cards with real thumbnails.
5. Clarify the money story on one page: who runs and funds the site, and whether affiliate earning is planned (and reconcile with rel=sponsored).
6. Give every product card a photo or labelled product image, and use named products rather than Amazon searches for the starter kits (e.g. washi tape).
7. Make collapsed article sections obvious (label "5 more ideas", don't skip numbering) and label header icons (search, saved).
8. Add a gentle return hook (optional email/"remind me Thursday" or add-to-homescreen prompt) and make cloud-free saving less fragile (surface the export code near the save badge).

## 6-line summary for the lead
1. Simulated tired-phone persona: first impression is warm and clear; the tonight tool and quiz are the stars and work in a few taps.
2. Save works (badge, localStorage, survives reload, /saved page, local-only warning) and share sends sensible payloads/URLs (stubbed share API only).
3. Article is readable but has a visible copy bug ("our guide to our guide to") and a collapsed section that makes the numbering jump 5 to 12.
4. Contact page says the inbox "isn't open yet", so there is no way to contact the site; money is "we don't currently earn", honest but credibility-sapping.
5. Products are weak: Amazon search links, few photos, no prices; the flat placeholder cards on quiz results feel unfinished.
6. Scores: First 7, Aesthetic 8, Nav 7, Editorial 6, Useful 8, Trust 5, Product 4, Buy 3, Return 5, Share 6, Business 3.
