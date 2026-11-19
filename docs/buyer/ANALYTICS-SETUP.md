# Analytics setup

## The one setting

Analytics has **one** switch: `analytics.ga4MeasurementId` in `src/config/site.ts`.

- **Empty (the default): nothing loads.** No script, no request to Google, no analytics cookie, no `track()` events. The Privacy page says no analytics is active.
- **A valid GA4 ID** (format `G-` then 8 to 12 capital letters or digits, e.g. `G-ABC123XYZ9`): adds the standard async Google tag to the head of every page (`src/lib/analytics.ts`, rendered by `src/routes/__root.tsx`), switches on the `track()` events (`src/lib/track.ts`), and changes the Privacy page analytics sentence to say Google Analytics is used.
- **An invalid value** (wrong format, lowercase, a URL, code) is ignored and renders nothing.

`integrations.googleAnalyticsId` is not a second setting. It is a copy that follows `analytics.ga4MeasurementId` and exists only so `track()` can read it. Never set it separately, and never write a GA4 ID anywhere else (`docs/` and `src/` contain no seller ID; check with `grep -rn "G-[A-Z0-9]\{8,\}" src`).

## Search Console and Pinterest verification

These are separate and independent of analytics. Both live in `integrations.*` in `src/config/site.ts` and render as meta tags in every page head (`src/lib/verification.ts`) as soon as they are non-empty:

- `integrations.searchConsoleVerification` renders `<meta name="google-site-verification">`.
- `integrations.pinterestVerification` renders `<meta name="p:domain_verify">`.

A DNS TXT record is the no-code alternative for Search Console and Bing.

## What a valid ID does, exactly

The head gets two scripts: `https://www.googletagmanager.com/gtag/js?id=<ID>` (async) and a small inline snippet that defines `gtag`, then runs `gtag('js')` and `gtag('config', '<ID>')` once. The inline snippet is guarded so client-side navigation does not repeat it. The ID is checked against the format before it is placed in code. The site sends no user data of its own in the snippet.

Events sent through `gtag('event', ...)` (`TRACK_EVENTS`): `product_impression`, `product_click`, `retailer_outbound_click`, `affiliate_outbound_click`, `shop_article_interaction`, `kit_interaction`, `shoplist_save`, `quiz_complete`, `planner_use`. Allowed parameters (`TRACK_PARAM_KEYS`): `product_id`, `hobby`, `article`, `collection`, `kit`, `slot`, `retailer`, `link_kind`, `role`, `placement`, `action`, `count`, `theme`, `persona`, `when`, `length`. Ids and slugs only; anything else is dropped, strings over 80 characters or containing "@" are dropped. `quiz_complete` and `planner_use` are defined but not every event is called from every component; confirm with `grep -rn "track(" src`.

## What is tested, and what is not

Tested in code (`src/test/analytics.test.ts`, `src/test/wiring.test.ts`, `src/test/shop.test.tsx`): empty default renders nothing; valid ID renders the async loader and a single config call; invalid and injection IDs render nothing; the snippet is idempotent; `integrations.googleAnalyticsId` follows the one setting; `track()` is a no-op without an ID or `gtag` and only passes allow-listed params; the Privacy page sentence switches with the ID.

Verified once in a real browser against a production build with a fake ID, requests to Google blocked (`docs/marketplace/final-inspection/GA4-VERIFICATION.md`): one loader tag in the server-rendered head, `window.gtag` defined, events reach `gtag` with allow-listed params, no duplicate loading on client navigation, no third-party request and no cookies with the ID empty.

**Not tested:** that Google actually receives hits (needs a real property), GA4 Realtime/DebugView, Consent Mode, behaviour with ad blockers, and any consent banner (none exists). Those are for the owner or Cowork once a real ID exists.

## Cookies and consent (read before setting an ID)

- With the ID empty, the site sets no analytics cookies and loads no analytics. The site's only third-party request is Google Fonts (see `docs/marketplace/SECURITY-AUDIT.md`).
- With a valid ID the tag loads **on every page view immediately, with no consent step**. Google Analytics 4 then sets first-party cookies (typically `_ga` and `_ga_<container id>`) in the visitor's browser and sends usage data to Google. Exact names, lifetimes and IP handling are Google's and change; re-read Google's current documentation.
- The Privacy page sentence switches to "This site uses Google Analytics ... Google may set cookies or identifiers" when an ID is set. That is true, but it is a notice, not consent.
- **Whether you need a consent banner, Consent Mode, an opt-out, a regional block, or a data processing agreement depends on where your visitors live and where you operate (for example the EU, UK, and some US states). This is a legal question; this repo does not answer it and this is not legal advice.** The site has no consent banner. If you need one, decide that before setting the ID, add it, and update `src/routes/privacy.tsx` and the cookie wording.
- Do not send names, emails or free-text queries to analytics. The helper enforces that for events it sends.

## Setup steps (buyer, your own accounts)

1. Create your own Google Analytics 4 property and web data stream for the final domain (re-read live: current steps).
2. Decide on consent (section above). Update the Privacy page if needed.
3. Set `analytics.ga4MeasurementId` to your ID and rebuild. The two default-empty assertions in `src/test/analytics.test.ts` and `src/test/shop.test.tsx` / `wiring.test.ts` expect the shipped empty value; update them if you ship with an ID.
4. After deploy, check GA4 Realtime and DebugView for page views and the events above.
5. Set `integrations.searchConsoleVerification` (or use DNS TXT), verify in Search Console, submit `/sitemap.xml`.
6. Do the same in Bing Webmaster Tools if you want Bing (re-read live: current steps).
7. Set `integrations.pinterestVerification` if you use Pinterest (`docs/marketing/PINTEREST-STRATEGY.md`).
8. Remove any seller IDs (none are in the repo; `docs/buyer/TRANSFER-CHECKLIST.md` includes a check).

## What to look at

Search Console: indexed pages, queries, errors. Analytics: which articles lead to checklist saves and product clicks. No benchmarks are given because none were measured.
