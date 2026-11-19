# GA4 loader verification

Date: 2026-11-19. Scope: the single analytics setting `analytics.ga4MeasurementId` (`src/lib/analytics.ts`, `src/lib/track.ts`, `src/routes/__root.tsx`, `src/routes/privacy.tsx`).

## Method

1. Two throwaway copies of the repo in /tmp (never the real repo, no write to it): one with `analytics.ga4MeasurementId = "G-TEST123456"` (a fake ID), one with the shipped empty value. Each built with `vite build` and served with `scripts/serve-built.mjs` on its own port.
2. Playwright (system Chrome). All requests to `googletagmanager.com` / `google-analytics.com` were intercepted and answered with an empty stub, so no real hit was ever sent; any other third-party host was aborted and logged. The server-rendered HTML was fetched with `accept-encoding: identity` and inspected before any JavaScript ran. Events were read from `window.dataLayer` (what `gtag` queued).
3. Invalid IDs are covered by unit tests, not the browser (they are rejected before rendering).

## Results

| Check | ID set | ID empty |
| --- | --- | --- |
| Loader `<script src=".../gtag/js?id=G-TEST123456" async>` in server-rendered `<head>` | exactly 1 | 0 |
| Inline `gtag('config', ...)` in server HTML | exactly 1 | 0 |
| Inline snippet contents | only `dataLayer`, `gtag`, `js` date, `config` with the ID; no user, page or storage data | none |
| `window.gtag` after load | function | undefined |
| Requests to Google (tag) on one page load | 1 (stubbed) | 0 |
| Other third-party requests | Google Fonts only (pre-existing) | Google Fonts only |
| Cookies set before/after load (localhost context) | none | none |
| Client navigation (4 link clicks) | loader tags in DOM stay 1, no extra tag request, `config` calls stay 1 | nothing |
| Events | `product_impression`, `product_click`, `retailer_outbound_click` reached `gtag` with allow-listed keys only (`product_id`, `role`, `placement`, `retailer`, `link_kind`); no non-allow-listed key seen | none |
| Privacy page | "This site uses Google Analytics ..." present, "No analytics ... active" absent | the "no analytics" text present, GA sentence absent |

Invalid IDs (empty, lowercase `g-...`, `G-` alone, `G-SHORT`, injection `G-ABC123XYZ9');alert(1);//`, URLs, `GTM-`, `UA-`, trailing newline plus markup) all render nothing (`src/test/analytics.test.ts`).

## Defect found and fixed

First run with an ID: the inline snippet re-executed on every client-side navigation (the router re-renders head scripts), pushing a new `js` and `config` pair each time (5 `config` calls after 4 navigations). In real GA4 each `config` sends a `page_view`, which would double-count with GA4's own history-change page views. The snippet is now idempotent (`window.__ppfGa4` guard and `window.gtag=window.gtag||function(){dataLayer.push(arguments)}`); after the fix the `config` count stays 1 across navigations. Guarded by a unit test that runs the snippet three times.

## Where `integrations.googleAnalyticsId` comes from

`src/config/site.ts` sets it to `analytics.ga4MeasurementId`. A test asserts they are equal and that no source file assigns `googleAnalyticsId` or hard-codes a `G-...` ID. `track()` reads it; it does not validate the format, so an invalid ID in the one setting would still enable `track()` calls to a `gtag` that does not exist (they no-op because no `gtag` is defined). Not a data risk; noted for completeness.

## Cookies and privacy

- ID empty: no cookies and no analytics request; the Privacy page says so, and that is true.
- ID set: the tag loads immediately on every page with no consent step. Real GA4 then sets first-party cookies (typically `_ga`, `_ga_<id>`) and sends usage data to Google. This could NOT be observed here because Google was stubbed; it is stated from Google's documented behaviour and must be confirmed live.
- The Privacy sentence for the enabled state ("uses Google Analytics ... may set cookies or identifiers") is accurate, so no banner was added. Whether a banner, Consent Mode, opt-out or regional handling is required depends on the buyer's operation and visitors. That is a legal question, not answered here and not legal advice (`docs/buyer/ANALYTICS-SETUP.md`).

## Tests added

`src/test/analytics.test.ts`: snippet defines `gtag` and runs js+config once when re-run; no page/user data in snippet; one loader plus one inline script; whitespace, null and markup handling; `googleAnalyticsId` follows the one setting; no source assigns it or hard-codes an ID; root head uses `ga4Scripts()` and privacy copy switches on `validGa4Id()`. Existing `wiring.test.ts` and `shop.test.tsx` cover `track()` no-op and allow-listing.

## Not verified, for Cowork / live

- Real delivery: with the owner's real ID after deploy, confirm page views and the events in GA4 Realtime and DebugView.
- Cookie names and lifetimes actually set by Google, and any consent requirement for the target audience.
- Behaviour with ad blockers and strict browsers; Consent Mode (not implemented).
- Content Security Policy: none is shipped, so nothing blocks the tag; if the buyer adds one it must allow `www.googletagmanager.com` and `*.google-analytics.com`.
