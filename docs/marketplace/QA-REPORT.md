# QA report: accessibility, lab performance, journeys

Date: 2026-11-19
Environment: **local development server and local production build of the working copy. This is not production.** Chromium via Playwright, axe-core 4.x (tags wcag2a, wcag2aa, wcag21a/aa, wcag22aa, best-practice). All performance figures are **lab data from one machine, not real-user data**. No real-user Core Web Vitals exist for this site; INP is not measured (it needs real-user data).

## 1. Accessibility (axe, 31 routes x 2 viewports: 390x844 and 1280x900)

Routes: home, hobby-finder, make-plans, both tools, hobbies index plus 2 profiles, shop index plus 2 collections, journal index plus the 4 published articles, saved, search (empty and `?q=clay`), about, contact, start-here, editorial-policy, methodology, corrections, affiliate-disclosure, privacy, terms, after-hours, weekends, 404.

| Rule                                                                                               | Before (routes affected, per viewport)      | After                                                         |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------- |
| color-contrast (cherry text on butter, strawberry, sunday, matcha tints; large initials on matcha) | 24 of 31 routes (about 70 nodes)            | 0                                                             |
| label-content-name-mismatch (logo link, "Save to My Plans" buttons, affiliate links in articles)   | 31 of 31                                    | 0                                                             |
| heading-order (footer h3 after h1; card h3 after h1 on directory pages)                            | make-plans, hobbies, journal, saved, search | 0                                                             |
| landmark-unique (article starter-kit boxes)                                                        | 2 of the 4 articles                         | 0 (cleared by the commerce/content worker; not touched by me) |
| Exactly one h1                                                                                     | all pass                                    | all pass                                                      |

Final run: **0 axe violations on all 62 page/viewport combinations** (the 404 shows 0 once the dev server is warm; one cold-compile run returned a blank document, which is a dev-server artefact).

### Fixes made

- `src/styles.css`: `--cherry` deepened from oklch(0.54 0.15 22) (about #B83F43) to oklch(0.50 0.15 22) (about #A93438). Same hue and chroma, so the brand reads the same, but cherry text now passes 4.5:1 on cream, butter, strawberry and sunday. Cream on cherry rises from 5.2:1 to 6.2:1. Added a rule that makes kickers on matcha backgrounds Garden Green (cherry on matcha cannot reach 4.5:1). **Brand owner should confirm the slightly deeper cherry.** `docs/BRAND-GUIDE.md` still lists #B83F43.
- `Cards.tsx`: decorative 48px hobby initial on matcha was `text-cherry/90` (2.56:1), now `text-cherry` (3.3:1, passes the 3:1 large-text bar).
- `Header.tsx`: logo link name now matches its visible text ("plans past five. home"); search, My Plans and menu targets are 44x44 (were 36 and 40).
- `Footer.tsx`: column titles are h2 (were h3 with no h2 above).
- `SaveButton.tsx`: accessible name now starts with the visible text ("Save to My Plans: Tennis"); compact card button is 44px on mobile; text button has a 44px hit area (invisible pseudo-element, no visual change).
- `ShareButtons.tsx` (Copy link, Pin it) and home hero CTAs: `min-h-11`.
- `hobbies.index.tsx`, `journal.index.tsx`: visually hidden h2 so cards (h3) follow a heading.

### Keyboard (Playwright, real Tab/Enter/Space)

- Tab order on home, quiz, planner, both tools: skip link first, then logo, nav (desktop) or search/My Plans/menu (mobile), then page content in visual order. 60 stops per page checked, **no stop without a visible focus indicator**, none hidden behind the sticky header (focus scroll is smooth, so measure after about 1 s).
- Quiz: all 7 questions answered with Tab + Enter only; focus moves to each new question heading; result page has one h1; "Turn this into a plan" reached and activated by keyboard.
- Planner: options toggle with Space, "Make my plan", "Shuffle ideas" and "Save to My Plans" all operable by keyboard.

### Not fixed / left

- Tap targets under 44px at 390px remain on: affiliate "Browse options on Amazon" links (24px high) and "I need this / I already own this" checkboxes (20px, the label is wider) in `src/components/commerce/**` (not mine to edit); inline text links in running prose (exempt under WCAG 2.2 AA 24px rule, all pass 24px); "In this story" summary (17px). Recommended follow-up: pad these to 44px in commerce.
- Card headings (h3) directly after the h1 on a few pages are mitigated by the hidden h2 only where listed; other pages did not flag.
- Manual screen-reader pass (VoiceOver/NVDA) not done. Automated tools find roughly a third of issues.

## 2. Lab performance (production build served locally with `scripts/serve-built.mjs`)

Method: Chromium, cache disabled, median of 3 runs for "before", 1 run for "after". Throttled profile: CDP CPU 4x, 1.6 Mbps down, 150 ms RTT, 390x844 mobile. LCP is read before any scrolling; CLS is also read before scrolling (scrolling to trigger lazy images changed neither). TBT is a proxy: sum of long tasks over 50 ms after FCP. The local server does **not compress** responses, so JS/CSS bytes below are uncompressed (a real host will send roughly a third of that), and the throttled times overstate production. Fonts come from Google Fonts over the sandbox proxy.

Targets: LCP 2.5 s or less, CLS 0.1 or less. INP: not measured (real-user data only).

| Page (390px, throttled)   | LCP before         | LCP after                   | CLS before / after | TBT proxy  | JS (uncompressed) | Images on load | Fonts  |
| ------------------------- | ------------------ | --------------------------- | ------------------ | ---------- | ----------------- | -------------- | ------ |
| Home                      | 2.9 s (h1 text)    | 3.0 s                       | 0.046 / 0.046      | 0 ms       | 510 KB            | 737 KB         | 402 KB |
| Article (junk journaling) | 5.6 s (hero image) | 4.7 s (1 run, within noise) | 0.045 / 0.045      | 4 to 12 ms | 534 KB            | 201 KB         | 402 KB |
| Quiz                      | 1.9 s              | 1.9 s                       | 0.003              | 0 ms       | 531 KB            | 0              | 328 KB |
| Shop                      | 1.7 s              | 1.7 s                       | 0.007              | 0 ms       | 495 KB            | 526 KB         | 328 KB |

Unthrottled, all four pages: LCP 0.16 to 0.44 s, CLS 0 to 0.016 (mobile and 1280 desktop). CSS is 96 KB on every page. **Result: CLS passes everywhere. LCP passes unthrottled; on the throttled mobile profile home (about 2.9 s) and the article (4.7 to 5.6 s) miss 2.5 s in this lab, mostly because the uncompressed 500 KB of JS plus 400 KB of fonts share a 1.6 Mbps link.** I did not get a compressed-server rerun finished, so the production-like figure is unmeasured. Re-test on the real host (Cowork C9).

Largest bottlenecks, in order:

1. Web fonts: a render-blocking Google Fonts stylesheet then 330 to 400 KB of Fraunces/DM Sans/Caveat variable fonts. This sets FCP (1.7 to 2.9 s throttled) and causes the only visible shift (hero heading re-wraps when Fraunces replaces the fallback; 0.045 of CLS on mobile home and article). Not changed: self-hosting and subsetting the fonts is the right fix but changes the brand typography files, so it is a deliberate follow-up. A size-adjusted fallback font-face would remove most of that CLS.
2. JavaScript: about 500 KB uncompressed on every page (router, React). TBT proxy is near 0, so this is a bytes problem, not a main-thread problem.
3. Images: 130 to 245 KB JPEGs, already sized sensibly with width/height, aspect-ratio boxes, `loading="lazy"` below the fold. Converting to WebP/AVIF would save about 30 to 50 percent; not done.

Fixes made: `fetchpriority="high"` on the home hero images and the article hero image; `decoding="async"` on lazy home images. These were the only changes that were both safe and missing (explicit dimensions, aspect ratios, lazy loading and `font-display: swap` were already in place). Measured effect is small or within noise.

## 3. SEO lab checks (built server, 31 pages)

Every page: 200, one h1, title, description, canonical, viewport, lang, Twitter card, no image without alt or dimensions. No duplicate titles or descriptions. `/saved` and `/search` are `noindex` and disallowed in robots.txt; sitemap lists 50 URLs, all 200, none of them saved/search; unknown URLs return 404; draft article slugs return 404. Article pages have Organization, Article and BreadcrumbList JSON-LD.
Defects left (src/routes and content-data owned, small): `og:image` is missing on every non-article page; titles over about 60 characters on make-plans, shop collections and all 4 articles may truncate in results; short descriptions (43 to 67 chars) on privacy, terms, affiliate-disclosure, search, about; the junk-journaling hobby description is 213 chars.

## 4. Journeys (Playwright, 390 and 1280, fresh browser profile each)

All passed at both widths: quiz start to result (keyboard only), result to planner with query params and the "Carried over from your quiz" note and prefilled selections; planner generate, shuffle, save; save a hobby; reload My Plans (hobby and plan both still listed); reopen the saved plan from My Plans (restored and shown as saved); remove controls present; Tonight tool returns 3 ideas; Hobby Budget shows totals; hobby directory filters narrow 36 to 12 to 9 with the count announced; search for "clay" (12 results, keyboard submit) and empty state; 404 returns status 404 with one h1 and a way home; all 25 header and footer links (including the mobile menu) return 200 with exactly one h1. No failures. The only console error was the expected 404 resource of the 404 test page.

## 5. Checks run

`bunx prettier --write` on changed files, `bunx eslint .` (0 errors, 8 pre-existing warnings in `ui/`), `bunx tsc --noEmit`, `bunx vitest run` (14 files, 235 tests, including new `src/test/a11y.test.ts`), `bunx vite build`: all pass.

## 6. Remaining for production QA (Cowork C9)

- Real-host run of Lighthouse or PageSpeed and WebPageTest with compression and CDN caching; confirm LCP and CLS on the live domain. Real-user Core Web Vitals (including INP) only after traffic, via Search Console or analytics.
- Decide on self-hosted fonts (largest lab bottleneck) and WebP/AVIF images.
- Add an `og:image` default; check link previews.
- Screen reader pass (VoiceOver iOS, NVDA), real iPhone and Android tap/scroll check, 200 percent zoom and reduced-motion check.
- Pad commerce tap targets and checkboxes to 44px.
- Confirm the deepened cherry with the brand owner and update BRAND-GUIDE.
- Re-run axe after any content or commerce change.
