# P3: Return, Share, Useful (path to 8+)

Research date: 2026-11-19. Scope: the five scores Willingness to return (~6.4), Willingness to share (~6.4), Usefulness (~7.2), Navigation (~7.4), First impression (~7.6). Rules honoured: no newsletter, no accounts or backend, no paid subscriptions, no paid ads, low maintenance, transferable, Pinterest is the main channel.

Honesty note up front: all scores are from simulated blind reviewers, not real visitors. Treat every "expected effect" as a judgement, not a measurement. Where I could not confirm something it says NOT FOUND or NOT CONFIRMED.

## What the repo already has (checked 2026-11-19)

- Quiz share already makes a PNG result card and uses `navigator.share` with files (`src/components/quiz/share.ts`). Planner and Tonight use text share. Pinterest "Pin it" and group-chat share exist (`docs/marketplace/REPEAT-VISITS-AND-SHARING.md`).
- NOT present: web app manifest, service worker, RSS/Atom feed, `.ics` export, postcode/"near me" links, `theme-color` only. `public/_headers` sets `Permissions-Policy: geolocation=()`, so the browser geolocation API is blocked by our own header (good: it stops anyone adding it by accident).
- 88 pin images already in `public/pins`. Sitemap is a server route (`src/routes/sitemap[.]xml.tsx`), so a feed can be added the same way.
- Netlify deploys are capped (about 20 a month, `[deploy]` marker). Anything that ships a service worker must not make stale-content bugs possible between deploys.

## Ranked steps

Effort: S = under half a day, M = 1-2 days, L = 3+ days. "Who": CC = Claude Code, CW = Cowork, OW = owner.

| # | Step | Who | Effort | Targets | Expected effect (judgement) |
|---|------|-----|--------|---------|------------------------------|
| 1 | "Add to my calendar" on every plan: `.ics` download plus Google Calendar link | CC | M | Return, Useful | Return +0.5 to +0.8, Useful +0.3 |
| 2 | Optional postcode/town (device only) and "find this near me" links per activity | CC | M | Useful, Return | Useful +0.4 to +0.6 |
| 3 | Planner realism: travel buffer, duration, honour every energy setting, evening depth | CC (content: CC or CW) | M-L | Useful | Useful +0.4 to +0.7 |
| 4 | Pinterest-first share kit: 2:3 pin per article/hobby, `og:type=article`, Save button with `data-pin-media`, per-page OG | CC (images: CW/Canva) | M | Share | Share +0.5 to +0.8 |
| 5 | Result/plan cards as PNG on every tool (reuse quiz code) plus "send to the group chat" text | CC | S-M | Share | Share +0.4 to +0.6 |
| 6 | Installable web app (manifest + icons + gentle install hint), no service worker at first | CC | S | Return | Return +0.2 to +0.4 |
| 7 | Rotating "This weekend / This month" hub and a monthly challenge page with fixed rhythm (dated, evergreen) | CC (build), CW (monthly copy), OW (monthly 30 minutes) | M, then 30 min/month | Return | Return +0.3 to +0.5 |
| 8 | Phone reading mode: sticky mini-TOC, collapsible sections, "skim" toggle, `content-visibility` | CC | M | Navigation, First impression | Nav +0.4 to +0.6 |
| 9 | First-tap fix: link-first design and hydration-aware controls | CC | S-M | Navigation, First impression | Nav +0.2 to +0.4, First +0.2 |
| 10 | Above-the-fold hub pattern and LCP discipline | CC | S-M | First impression | First +0.3 to +0.5 |
| 11 | Atom/RSS feed route | CC | S | Return (small) | +0.0 to +0.1; useful mainly as a feed and discovery channel |
| 12 | Pinterest board hygiene and weekly pinning cadence | OW (with CW making pins) | ongoing, 1 hour/week | Return, Share (real traffic) | Not scored by reviewers; this is the real return engine |

### Honest ceilings

- Willingness to return: realistic ceiling about 7.5 to 7.8 without email. Reviewers keep pricing in "no list or newsletter hooks". Steps 1, 6, 7 together can get close to 7.5; reaching 8 needs reviewers to accept calendar plus home-screen plus a dated monthly page as "pull". I would not promise 8.
- Willingness to share: realistic ceiling 7.8 to 8.2. This is the most reachable 8, because Pinterest-native sharing and cards are concrete and visible to a reviewer.
- Usefulness: ceiling 8.0 to 8.3 if steps 2 and 3 land and the planner stops ignoring settings. Steps 2 and 3 matter more than any marketing step.
- Navigation: ceiling 8.0 to 8.4 (steps 8, 9). First impression: ceiling 8.0 to 8.3 (step 10, plus fixing repeated images, which is a content task for CW).

## Step detail

### 1. Calendar export (the best rule-compliant "reminder" we have)

- Idea: a plan or weekend slot gets "Add to calendar" with a start time she picks. She gets a reminder from her own calendar app. No email, no push, no server.
- Two outputs: (a) a client-generated `.ics` Blob download (RFC 5545 `VEVENT`, `DTSTART`, `DTEND`, `SUMMARY`, `LOCATION`, `DESCRIPTION`, a `VALARM` 1 hour before); (b) a Google Calendar link `https://calendar.google.com/calendar/render?action=TEMPLATE&text=...&dates=YYYYMMDDTHHMMSS/...&details=...&location=...`.
- Confirmed (2026-11-19): the Google link format and `dates` start/end pattern, via a community doc repo; Google has never published official docs for it, so treat it as stable-but-unofficial (https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs/blob/master/services/google.md , https://interactiondesignfoundation.github.io/add-event-to-calendar-docs/services/google.html).
- Is `.ics` OK under our rules? My reading: yes. The "no printables" rule is about selling digital products. An `.ics` is a free utility file generated in the browser from her own plan, it is not stocked, sold or hosted. OWNER TO CONFIRM that reading once. Keep it free and generated on the fly.
- Time-zone care: write "floating" local time (no `Z`) so the event lands at the time she chose on her device. Test on iPhone Calendar and Google Calendar.
- Add a "Friday evening" preset and a "Saturday 10:00" preset so one tap schedules the next weekend.

### 2. Near me without location data

- Optional field "Your town or postcode (stays on this device)". Store in localStorage only. Never send to us. Update `/privacy` to say so.
- Do NOT use the Geolocation API (our header blocks it; it would add a permission prompt and a privacy burden).
- Per activity, build outbound search links from a mapping `hobby -> venue search term` (for example pottery -> "pottery class", watercolour -> "art class", climbing -> "climbing wall"):
  - Google Maps: `https://www.google.com/maps/search/?api=1&query=pottery+class+near+<postcode>` . CONFIRMED in Google's official Maps URLs guide: `api=1` required, `query` required, accepts a place name or search phrase (https://developers.google.com/maps/documentation/urls/guide , read via search 2026-11-19).
  - Eventbrite: `https://www.eventbrite.com/d/{location}/{query}/` where location is a slug like `united-kingdom--london` or `ny--new-york`. Seen only in third-party scraper docs (https://apify.com/eiv/eventbrite-scraper.md). A postcode does NOT map to that slug. NOT FOUND: any confirmed date or "this weekend" parameter. Use only for a typed town and verify each link by hand, or skip.
  - Meetup: `https://www.meetup.com/find/us--ny--new-york/` style pages seen in Meetup's own llms.txt (https://meetup.com/llms.txt). Same slug problem. NOT FOUND: a postcode URL or a date parameter.
  - Safest default: a plain Google search or Google Maps link (works for any postcode/town, any country). Treat Eventbrite and Meetup as optional extras for a town the user types.
- Affiliate/sponsored caution: these are plain search links, no tracking. Add `rel="noopener noreferrer"`; label as "Opens Google Maps".
- Transferability: keep the venue-term mapping in the content data file so a buyer can edit it.
- Effect on "no local hook" complaint: gives a hook without us owning local data. It will not fully satisfy a reviewer who wants named venues; do not claim local coverage.

### 3. Planner and tool realism

Findings (read 2026-11-19, weak sources; treat as guidance not proof): good itinerary UX shows the gap between stops as a visible row (travel estimate), keeps 15-30 minutes buffer between activities, limits to one or two anchor activities, and flags over-packed days (https://roambuffer.onrender.com/ , https://www.smartertravel.com/create-perfect-travel-itinerary/ , https://planpro.us.com/travel/guides/itinerary-planning-tips). NOT FOUND: strong sources on an "energy level" filter pattern, so design it from our own data.

Concrete changes:
- Every plan item gets `minutes` and `needsTravel` (home / walk / short trip). Planner inserts a "Get there and settle in: 15-30 min" row when `needsTravel` is true, and a "Wind down" row for evenings.
- Honour all energy settings: write a test that, for each energy value, the output differs and respects it (this is the reviewers' "ignores some energy settings" complaint). Add a visible "Why this plan" line naming the settings used.
- Evening plans: add at least 3 distinct evening templates per energy level (home, out, social) so the evening pool is not thin. Content work: CC can draft, CW should edit for variety.
- Add a "Too much? Make it lighter" button that drops one item and lengthens buffers, rather than regenerating.
- Make Tonight and Weekend and Hobby Budget feel different: different input (time left tonight / days free / budget) and different output shape (single idea card / timeline / shopping range). Do not merge them.

### 4. Pinterest-first sharing

- Pin image: 2:3 vertical, 1000 x 1500 px is the common standard; taller than 2:3 may be cropped; square underperforms per vendor guides (https://www.tailwindapp.com/blog?p=6316 , https://publer.com/blog/pinterest-image-sizes-dimensions/ ; third-party, not Pinterest). We have 88 pins already: audit that every article and hobby has a 2:3 pin and the page uses it.
- Rich pins: official spec requires `og:type` = `article` or `blog`, `og:title`, `og:description`; `og:site_name` strongly suggested; up to six `og:image` tags; the page gives NO image size and NO validator procedure (https://developers.pinterest.com/docs/web-features/article-rich-pins/ , read 2026-11-19). Claims of 100-character titles or 600x315 minimums come from one vendor only: NOT CONFIRMED.
- Check each article route sets `og:type=article` (my grep of `journal.$slug.tsx` found no `og:type` or `og:image` lines; verify, may be set via a helper). Hobbies without a photo let Pinterest guess the image: give every page a designated 2:3 image.
- Save button: use `data-pin-media` to point at the 2:3 pin and `data-pin-description` (up to 500 characters, only about the first 75-100 show in grid view) (https://developers.pinterest.com/docs/web-features/buttons/ via search 2026-11-19; the exact attribute table was garbled, verify on the live page). Our current custom `pin/create/button` link is fine and needs no SDK; keep it, and put the 2:3 image in `media`.
- Hidden pin images: add a visually hidden 2:3 `<img>` only if Pinterest's Save button needs it. NOT CONFIRMED whether hidden images are allowed by Pinterest policy; prefer showing the pin image in a visible "Save for later" block instead.
- Every page needs a visible, thumb-reachable Save/Pin button after the intro and after the last section.

### 5. Cards and group-chat flows

- Web Share API: HTTPS and a user click are required; files are shared only if `navigator.canShare({files})` is true; PNG/JPEG/WebP/PDF/text are usually shareable; AbortError on cancel must be silent (https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share , read 2026-11-19). The repo already does this for the quiz; reuse that code for Tonight and the weekend plan ("Plan card": 1080 x 1350 PNG with title, 3 time-stamped lines, site name and URL).
- Always show a fallback: Copy link, Copy as text, Download image. Desktop reviewers often have no `navigator.share`.
- WhatsApp/iMessage-ready text: short, emoji-light, with the link last, plus a line like "Saturday 2pm?" to invite a reply. (Pattern judgement; no source needed.) Offer a `https://wa.me/?text=` link as a labelled button. NOT verified against current WhatsApp docs in this research.
- Add a "Plan it with a friend" mode: the shared link carries the plan in the URL hash (no backend), so the friend opens the exact plan. The repo already encodes plans for import; confirm URL length stays under about 2,000 characters and fall back to the PNG when it does not.

### 6. Installable app (home-screen icon as a return nudge)

- Installability (Chromium): manifest with `name`/`short_name`, `icons` including 192px and 512px, `start_url`, `display`, and `prefer_related_applications` false or absent; HTTPS. A service worker is NOT required for installability (https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable , read 2026-11-19).
- iOS 16.4+: install from the Share menu in Safari and other browsers. `beforeinstallprompt` is not supported on iOS, so the install hint must be a manual "Share, then Add to Home Screen" text there; Android Chrome can show a custom button.
- TanStack Start feasibility: a community issue reports `vite-plugin-pwa` not compatible with TanStack Start production builds (https://github.com/TanStack/router/issues/4021); whether fixed: NOT CONFIRMED. A Feb 2026 third-party guide uses the plugin for manifest only and generates the service worker after the build with Workbox. Lovable-specific PWA guidance: NOT FOUND (docs URL returned 404). Repo detail: `vite.config.ts` warns not to add duplicate plugins, so do NOT add plugins; instead put a static `public/manifest.webmanifest`, icons in `public/`, and a `<link rel="manifest">` plus `apple-touch-icon` in `__root.tsx` head.
- Service worker (optional, later): if wanted, a hand-written `public/sw.js` that only caches `/saved` shell and tool pages with a network-first strategy, versioned, with a "kill switch" (unregister) path. Risk: stale pages after the capped deploys, and Lovable editor iframe previews (not tested). Benefit is small, offline use is not what reviewers asked for. Recommend: manifest now, service worker only if the owner wants offline.
- Install hint placement: on `/saved` after she saves her first item, one dismissible line ("Keep this on your home screen"). Not a popup on first visit.
- Expected effect is small by itself; the icon on a phone is a quiet reminder only for people who install it.

### 7. Seasonal and rhythm content (the realistic substitute for "come back")

- Weekly slot: "This weekend" strip that is date-driven on the client (no deploy needed): 4 picks rotating by ISO week from a curated pool, with a calendar button. A fixed rhythm ("new picks every Friday") is credible when it is deterministic rotation, not a promise of fresh writing. Do NOT claim "updated weekly" unless it rotates for real (editorial standards).
- Monthly challenge page: `/challenge/<month>` or one page that switches by month ("Try one new thing in November"), 4 small tasks, a tick list saved in localStorage, an `.ics` for four Saturday reminders, and a pin per month. Owner effort about 30 minutes a month to choose the theme; CW drafts. Repeat-visit cause is the tick list and the calendar reminders.
- Evidence: advice sources say a predictable rhythm and recurring features build return habits, but they are vendor blogs and not controlled studies (https://blogherald.com/blogging-news/the-architecture-of-blog-stickiness-and-why-most-publishers-still-get-it-wrong/ , read via search 2026-11-19). NOT FOUND: any hard data on return lift for a no-email lifestyle hub.
- The existing season strip is northern-hemisphere; add a toggle for the southern hemisphere (small, removes a known limit).

### 8. Shorter-feeling articles on phones (11-14k px)

- Sticky mini-TOC: a slim bar under the header with current section and a jump menu (native `<details>` so it works before hydration).
- Collapsible sections: use native `<details>`/`<summary>` for "the long bits" (shopping lists, FAQ, alternatives) open by default on desktop, closed on phone via a small client-side tweak or CSS only where possible.
- "Skim" toggle: hides body paragraphs and shows headings plus bold lines; store the choice in localStorage (a per-viewer convenience).
- `content-visibility: auto` with `contain-intrinsic-size` on below-the-fold sections cuts render cost on long pages (not confirmed with a source in this run; test with Lighthouse before and after).
- Break long pages with a "Save this idea" block every 3 to 4 sections. This also helps sharing.
- Do not remove content to hit a pixel target; shorten by collapsing and by moving repeated lists into linked pages.

### 9. First tap ignored before hydration

- Cause: server HTML paints before JS attaches handlers, so buttons do nothing for a moment. TanStack Start docs: deferred hydration keeps server HTML visible, and `interaction()` boundaries hydrate on the first click and re-dispatch the event, but event details like pointer coordinates are not guaranteed; they do not describe a general replay for other boundaries (https://tanstack.com/start/latest/docs/framework/react/guide/deferred-hydration , read 2026-11-19). Also, `never()` ancestors block interactivity. A secondary source says React raises hydration priority for a Suspense boundary on a discrete event (not from react.dev; NOT CONFIRMED there).
- Fixes in order of reliability:
  1. Link-first: make primary actions real `<a href>` (to `/tools/tonight?energy=low`, `/make-plans?...`) or `<form method="get">` so they work with zero JS. Navigation, TOC, "Pin it" and "Add to calendar" links are all natively clickable.
  2. Put quiz/planner choices in the URL so a click before hydration still navigates.
  3. Where a button is unavoidable, render it `disabled` with a "Loading..." affordance until a `hydrated` flag is set, rather than silently ignoring the tap; or wrap interactive islands in `interaction()` so the first touch hydrates and re-dispatches.
  4. Do not defer hydration of the header, nav and primary tool controls; defer only below-the-fold widgets with `visible()`.
- Test: throttle CPU 4x on a phone profile, tap within 500 ms of paint.

### 10. First impression above the fold

- Pattern for lifestyle hubs (judgement from the reviewer complaints; no source): one clear promise line, one dominant photo, two primary actions side by side ("What should I do tonight?" and "Plan my weekend"), and a peek of the next section so she knows to scroll. No carousel, no banner stack.
- LCP: official guidance (web.dev, read 2026-11-19): target 2.5 s or less at the 75th percentile; the LCP image must be in the initial HTML, never lazy-loaded; use `fetchpriority="high"` on one image; preload if referenced from CSS/JS; keep TTFB low via CDN (https://web.dev/articles/optimize-lcp). CLS: set width/height or aspect-ratio on all images and reserve space for late sections like the season strip (it renders after mount).
- Fix repeated images (a reviewer complaint): a content job. Assign unique hero images per hobby category; CW or the owner sources/creates them; no stock reuse across adjacent cards.

### 11. Feed

- Atom feed at `/feed.xml` as a server route like the sitemap. Free, no accounts. Tiny return effect because few women in this audience use feed readers; its real value is discovery and syndication. Pinterest RSS auto-publish: NOT CONFIRMED in this research; verify in Pinterest's help before relying on it.

### 12. Pinterest operations (owner, ongoing)

- Pinterest scale: 631 million monthly users in Q1 2026, about 70% female (one aggregator citing Statista; Pew 2023: half of US women use Pinterest) (https://www.socialchamp.com/blog/pinterest-statistics/ , https://blog.hootsuite.com/pinterest-statistics/ ; secondary sources). NOT FOUND: data on board-return behaviour or seasonal lead times from this search.
- Practical cadence (judgement): organise boards by occasion ("Friday night in", "Solo Saturday"); pin each article with 2 to 3 different pin images; pin seasonal items early; keep pin text matching the page. CW can produce pin sets; the owner pins about 1 hour a week.
- Pinterest is the return channel here: a saved pin is a "reminder" that lives on Pinterest, which suits the no-email rule.

## What NOT to do (violates our rules)

- Web push notifications: NO. They require a server to store subscriptions and send messages (web.dev: "normally ... through a server that you control", needs stored subscriptions, VAPID-signed requests) and on iOS the site must first be added to the Home Screen (https://web.dev/articles/push-notifications-overview , https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/ via search). That is a backend and a de-facto subscriber list.
- Email, SMS, "notify me", waitlists, comment/login prompts: all break no-newsletter/no-accounts.
- Any shared "streak" or leaderboard or "plans other women saved": needs a backend.
- Browser geolocation, IP lookups, or a venue database/API we maintain: privacy burden, cost, maintenance. Use typed postcode plus outbound search links only.
- Selling or gating calendars, planners, printables: digital products are out; the `.ics` stays free and on-the-fly.
- Paid ads or boosted pins; paid scheduling subscriptions (Tailwind etc.) for the pinning workflow.
- Third-party chat/share widgets that track (AddThis-style); the Pinterest script is optional and our link-only button already works.
- Claiming "updated weekly" or "near you" when it is rotation or a search link.
- Adding a Vite plugin that duplicates the Lovable config (explicit warning in `vite.config.ts`).
- A service worker that caches HTML aggressively (stale pages after a deploy, and deploys are capped).
- og:image on the root route (explicit repo warning in `__root.tsx`); add it per page only.

## Suggested order of work (one release batch each, mind the deploy cap)

1. Batch A (CC): steps 1, 6, 9, 11 (calendar, manifest, link-first fixes, feed). Mostly small and independent.
2. Batch B (CC + CW): steps 2, 3 (postcode links, planner realism, evening content).
3. Batch C (CC + CW + OW): steps 4, 5, 12 (pin kit, cards, board cadence).
4. Batch D (CC): steps 8, 10, 7 (reading mode, hero/LCP, monthly challenge).
5. After each batch, re-run two or three blind reviewers on the specific criteria and keep the score only if it moves; stop adding features once Return and Share plateau (diminishing returns without email).

## Sources (URL, date read 2026-11-19)

- Pinterest article rich pins: https://developers.pinterest.com/docs/web-features/article-rich-pins/ (fetched)
- Pinterest Save button docs: https://developers.pinterest.com/docs/web-features/buttons/ (search snippet only; verify live)
- MDN Web Share: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share (fetched)
- MDN PWA installability: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable (fetched)
- web.dev push overview: https://web.dev/articles/push-notifications-overview (fetched)
- WebKit iOS web push: https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/ (search snippet)
- web.dev LCP: https://web.dev/articles/optimize-lcp (fetched)
- TanStack Start deferred hydration: https://tanstack.com/start/latest/docs/framework/react/guide/deferred-hydration (fetched)
- TanStack/vite-plugin-pwa issue: https://github.com/TanStack/router/issues/4021 (search snippet; status unconfirmed)
- Google Maps URLs: https://developers.google.com/maps/documentation/urls/guide (search snippet)
- Google Calendar link format (unofficial): https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs/blob/master/services/google.md (search snippet)
- Eventbrite URL pattern (third party): https://apify.com/eiv/eventbrite-scraper.md ; Meetup: https://meetup.com/llms.txt (search snippets)
- Pinterest image size vendors: https://www.tailwindapp.com/blog?p=6316 , https://publer.com/blog/pinterest-image-sizes-dimensions/ (search snippets)
- Pinterest audience stats: https://www.socialchamp.com/blog/pinterest-statistics/ , https://blog.hootsuite.com/pinterest-statistics/ (search snippets)
- Itinerary buffer guidance: https://roambuffer.onrender.com/ , https://www.smartertravel.com/create-perfect-travel-itinerary/ (search snippets)
- Return-habit advice: https://blogherald.com/blogging-news/the-architecture-of-blog-stickiness-and-why-most-publishers-still-get-it-wrong/ (search snippet)

## NOT FOUND / NOT CONFIRMED list

- Lovable-specific PWA/service-worker guidance (docs URL 404).
- Whether vite-plugin-pwa now works with TanStack Start.
- Eventbrite/Meetup date or postcode URL parameters.
- Pinterest official image-size spec and rich-pin validator procedure; hidden-image policy; RSS auto-publish.
- React/react.dev statement on replay of pre-hydration clicks.
- Any measured return-visit lift for a no-email hub.
- Whether `.ics` counts as a "printable/digital product" under the owner's rule (my reading: no; owner to confirm).
