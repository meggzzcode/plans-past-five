# Analytics setup

**The site is analytics-ready, not tracking.** As checked on 2026-11-19: no analytics script is loaded anywhere in the repo, no cookies are set for analytics, and the Privacy page says no analytics or newsletter tools are active (`src/routes/privacy.tsx`). Nothing is measured today.

## Central IDs (`src/config/site.ts`)

```
integrations: {
  newsletter: { enabled: false, provider: "", formAction: "" },
  googleAnalyticsId: "",
  searchConsoleVerification: "",
  pinterestVerification: "",
}
```

Important finding: these four fields are **placeholders**. At the time of checking, no code renders `searchConsoleVerification` or `pinterestVerification` as a tag, and no code loads Google Analytics from `googleAnalyticsId`. `docs/buyer/SEO-GUIDE.md` says the verification meta tag renders when non-empty; the code search did not find it, so confirm in `src/routes/__root.tsx` and `src/lib/seo.ts` before relying on it. Safe verification routes that need no code: DNS TXT record verification for Search Console and Bing, and domain claiming through the platform's own supported methods (PENDING COWORK: current steps from official help pages).

## The tracking helper (`src/lib/track.ts`)

`track(event, params)` is a no-op unless `site.integrations.googleAnalyticsId` is set AND a `gtag` function already exists on the page. It never loads a script. It sends only allow-listed keys with short primitive values (and rejects strings containing "@").

Event vocabulary (`TRACK_EVENTS`): `product_impression`, `product_click`, `retailer_outbound_click`, `affiliate_outbound_click`, `shop_article_interaction`, `kit_interaction`, `shoplist_save`, `quiz_complete`, `planner_use`.

Allowed parameters (`TRACK_PARAM_KEYS`): `product_id`, `hobby`, `article`, `collection`, `kit`, `slot`, `retailer`, `link_kind`, `role`, `placement`, `action`, `count`, `theme`. Ids and slugs only; never user-entered text.

Not every event is wired to every component; confirm usage with `grep -rn "track(" src`.

## Setup steps (buyer, your own accounts)

1. Create your own Google Analytics property and Search Console property for your final domain (PENDING COWORK: current steps and any consent requirements by region).
2. Decide on consent. If you use analytics cookies or identifiers, a consent mechanism may be required in some places; get legal advice. Update `src/routes/privacy.tsx` and the cookie language before turning anything on.
3. Add the analytics loader in the root route only after consent logic exists, then set `googleAnalyticsId`. Test with `track()` events in the browser.
4. Verify the site in Google Search Console (DNS TXT is the no-code route). Submit `/sitemap.xml`.
5. Do the same in Bing Webmaster Tools if you want Bing (PENDING COWORK: current steps).
6. Verify Pinterest domain ownership in your Pinterest business account if you use Pinterest (`docs/marketing/PINTEREST-STRATEGY.md`).
7. Replace any seller IDs. None are in the repo (`docs/buyer/TRANSFER-CHECKLIST.md` includes a check).

## Privacy note

Do not send names, emails or free-text queries to analytics. The helper enforces that for events it sends. Keep the Privacy page honest: it must state exactly what is on. The Privacy and Terms pages are starter text, not legal advice.

## What to look at

Search Console: indexed pages, queries, errors. Analytics: which articles lead to checklist saves, and product clicks. No benchmarks are given because none were measured.
