# Plans Past Five — Initial Build Plan (refined)

A frontend-only editorial lifestyle magazine for women building a life outside work. No database, accounts, AI or payments; saving is browser-only. Built in the refined priority order; anything not finished properly is hidden and documented in CLAUDE-HANDOFF.md.

## Brand and naming
- Tagline "Making a life, not just a living.", slogan "For the plot, not the paycheck.", signature phrase "Professionally off duty.", mission "Helping women fall in love with the life they live outside of work." Approved phrase bank used selectively.
- Section names used everywhere: After Hours, The Weekend Edit, Creative Corner, Table for One, Better Together, A Little Movement, Off Duty Essentials, Find Your Thing, Make Some Plans, My Plans, The Out-of-Office Collection, The Out-of-Office Note, The Journal.
- Lead colors: cherry red, vanilla cream, butter yellow, strawberry milk; matcha and Sunday blue for select sections. Fraunces (expressive italics) + DM Sans.
- Original SVG wordmark "plans past / five." (stacked, horizontal, compact, monogram, favicon, light/dark).
- Restrained decorative kit: gingham, scallops, stars, bows, flowers, hand-drawn arrows, handwritten notes, postcard frames, magazine dividers. Few rounded boxes and pill buttons; varied compositions.

## Priority 1–2: Design system and homepage
Hero "Because the best part of your day is still ahead." with supporting copy "Creative hobbies, cute weekend plans, solo dates, new friendships and little adventures. Because there's a whole lot of life waiting for you after you close your laptop." and CTAs Find Your Thing / Let's Make Plans. Tagline sits beneath the wordmark; slogan on select editorial/marketing elements; "Professionally off duty." as a recurring detail. Applied across metadata, brand guide, printables and site config. Then a consolidated journey: relatable intro, six categories, Hobby Finder teaser, After Hours (5:01 Edit), Weekend Edit, Table for One + Better Together, Journal, Off Duty Essentials, free printable, Out-of-Office Note (no fake signup), footer.

## Priority 3–4: Content and articles
- Typed article model with search intent, angle, hobby links, product links, related content.
- Complete: (1) 35 Hobbies…Work, Sleep, Repeat, (2) 25 Things to Do After Work Instead of Scrolling, (3) 21 Creative Hobbies at Home, (6) How to Start Junk Journaling. Each activity covers what/why/time/cost/supplies/how to start/solo or social/first activity.
- Eight unpublished drafts (excluded from nav, search, sitemap, indexing).
- Reusable inserts: What You'll Need, The Starter Kit, Shop the Hobby, Save or Splurge, Try It This Weekend, Make It a Girls' Night, Your First 30 Minutes, No-Spend Alternative, Make It a Plan, If You Loved This, Try...
- Contextual related content scored by shared hobbies/categories, never a fixed three.

## Priority 5: Off Duty Essentials
Six collections x six product types exactly as specified (Pottery Era, Creative Girl, Sporty Girl, Girls' Night In, Bookish Girl, Little Adventures). Original descriptions, related activities, central Amazon search links labelled "Browse on Amazon", no prices/ratings/ASINs/brands, affiliate tag empty by default, disclosure beside links. Illustrative collection photography only.

## Priority 6: Hobbies and Find Your Thing
36 hobby records; directory with filters; detail pages (thin ones noindexed). Rule-based quiz with six playful result themes, 3–5 hobbies with reasons, cost, time, first step, articles, supplies, save. Hard constraints respected; if too few matches, explain and suggest loosening filters.

## Priority 7–9: My Plans, Make Some Plans, printables
- My Plans: local saves of hobbies, articles, plans, solo dates; remove; empty state "Nothing on the calendar yet? Let's fix that."; device-only notice.
- Make Some Plans: after-work, Saturday, Sunday, solo, friend, at-home; deterministic matching on time, budget, energy, company; save, regenerate, print.
- Three printables (Out-of-Office Bucket List with 50 activities, Weekend Edit Planner, My Hobby Era Tracker) as real downloadable/print-ready pages.

## Experience priorities
Boutique-magazine feel on every page, mobile-first polish for Pinterest visitors, product picks framed as editorial help, substance over page count, no extra services or dependencies, CLAUDE-HANDOFF.md lists unfinished work, known issues, test results and next steps.

## Images
About 20–25 original generated images: hero collage, six categories, key article heroes, finder, six shop collections, brand lifestyle. Diverse, candid, film feel; manifest in IMAGE-LICENSES.md.

## SEO, Pinterest, handoff
SSR metadata per page, canonicals, sitemap, robots, JSON-LD, custom 404. 12–15 pin concepts documented (templates if time allows). Docs: CLAUDE-HANDOFF.md (all required sections), BRAND-GUIDE.md, IMAGE-LICENSES.md. Never mention resale publicly.

## Technical details
- TanStack Start; routes per brief (hobbies.$slug, journal.$slug, shop.$category, printables.$slug), category slugs matching new names.
- src/config, src/content, src/data (hobbies, products, activities, printables), src/components (brand, layout, editorial, cards, tools), src/lib (saved storage, search, reading time, finder and planner scoring, related content).
- Tests: finder respects budget/time/location, planner matching rules, drafts excluded from public lists.
