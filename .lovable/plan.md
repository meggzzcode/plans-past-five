# Plans Past Five — Initial Build Plan

A frontend-only editorial lifestyle site built from the master brief. No database, accounts or paid services; saving uses the browser only. Work follows the brief's priority order; anything not finished properly is documented for Claude Code instead of half-shipped.

## Phase 1 — Brand and design system
- Tokens in the stylesheet for the full palette (Cherry Girl, Vanilla Cream, Garden Green, Espresso, Butter, Strawberry Milk, Matcha, Sunday Blue, Warm White, Soft Border, Dark Ink), contrast-checked.
- Fraunces (expressive italics) + DM Sans via Google Fonts link (both OFL).
- Hand-built SVG wordmark "plans past / five." (stacked, horizontal, compact), monogram, SVG favicon, light/dark variants.
- Decorative primitives used sparingly: gingham strip, star, hand-drawn arrow, scalloped edge, postcard frame, magazine label, paper note.
- Single site config file: name, domain, taglines, socials, legal, feature flags (newsletter/analytics disabled).
- Header with 5 nav items + mobile menu, footer, announcement strip.

## Phase 2 — Homepage
All sections A–O from the brief with varied magazine compositions: hero collage, intro, "Find your kind of fun" six categories, Hobby Finder teaser, 5:01 Edit, Weekend Edit, Solo not lonely, Better Together, Offline Shop, printable feature, Journal, newsletter-ready block (no fake confirmation), footer.

## Phase 3 — Content and templates
- Typed content models; 4 complete original articles (1, 2, 3, 6) plus 8 structured drafts hidden from nav, search and indexing.
- Article template: breadcrumbs, label, byline, date, computed reading time, TOC, pull quotes, "What you'll need", "Shop the hobby", "Make it a plan", related, save/copy link/Pinterest share.
- Category pages: After Hours, Weekends, Solo Dates, Better Together, Creative Corner, Movement; Journal index.

## Phase 4 — Shop
6 collections, 36 product-type records, plain Amazon search links (no fake affiliate tag, no reviews or prices), central affiliate config, disclosure near links.

## Phase 5 — Hobbies and Hobby Finder
36 hobby records with the full field set, directory with filters, hobby detail pages, rule-based "Find Your Thing" quiz with scored results.

## Phase 6 — Engagement
My Plans page (local browser saves, device-specific notice, remove, friendly empty state), Make Some Plans generator (rules-based, save/regenerate/print), site search over local data, printables library with downloadable PDFs/printable pages.

## Phase 7 — Pages, SEO and handoff
Start Here, About, Contact (mailto, no fake form), Privacy, Terms, Affiliate Disclosure, Editorial Policy. Unique head metadata per route, sitemap, robots. Handoff docs: README, BRAND-GUIDE.md, IMAGE-LICENSES.md, CLAUDE-HANDOFF.md, content roadmap, list of unfinished items.

## Images
About 20–25 original generated editorial images (film-photo feel, candid, colorful), documented in an image manifest. No scraped Amazon imagery.

## Technical details
- TanStack Start routes per brief section 10 (dynamic: hobbies.$slug, journal.$slug, shop.$category, printables.$slug).
- Folders: src/config, src/content (articles), src/data (hobbies, products, plans, printables), src/components (brand, layout, editorial, cards, tools), src/lib (saved storage hook, search, reading time, finder scoring).
- Saved items read in effects to avoid hydration mismatch.
- Tests for finder scoring, planner matching rules, and that drafts are excluded.
- Never mention the resale objective publicly.
