# P1 - Products: raising "Product desirability" and "Willingness to purchase" to 8+

Researched 2026-11-19. Read-only research on the repo; this is the only file written.
Convention: "READ <date>" = I fetched the page that day. "SECONDARY" = a third-party summary, not Amazon's own text. "NOT FOUND" = I could not confirm it.

## 0. Bottom line

- The single biggest lever is real product imagery. The only fully rule-clean way to show Amazon product photos on the site is to pull them from Amazon's Creators API, and that needs an approved Associates account with recent qualifying sales, so it is a post-approval, post-traffic step, not something available now.
- Before approval, the best compliant substitutes are (a) our own photos of products the owner buys, (b) written-permission or press-kit manufacturer images, (c) honest illustration and styled scenes labelled as such. None of these is quite as strong as a real photo grid.
- Honest ceiling for a blind reviewer scoring a no-price, no-testimonial, newly launched affiliate site: Product desirability about 7.5 to 8, Willingness to purchase about 6.5 to 7.5. Reaching 8 on purchase willingness is possible only with real photography on most cards plus full kits; it is unlikely from copy and layout alone. Reason: a reviewer who cannot see price, ratings or reviews, and who has never heard of the brand, has no value anchor. Photography plus a clear "why this one" line closes most of that gap, but not all of it, because we are forbidden to substitute fake social proof.

## 1. What Amazon actually allows (quoted, with URL and date read)

### 1.1 Operating Agreement
URL: https://affiliate-program.amazon.com/help/operating/agreement . READ 2026-11-19. Header date: "October 15, 2025".
- Links must use tagged formats: "The links must properly use the special "tagged" link formats we provide" (Section 1).
- Program Content definition: "Program Content specifically excludes any data, images, text, or other information" tied to offerings on non-Amazon sites (Section 1). That is, Amazon's license does not cover images of products not sold on Amazon.
- Section 1 says Amazon "may make available to you data, images, text, link formats, widgets" (the fetch tool returned fragments; the full definition is in the IP License below).
- "You will not misrepresent or embellish our relationship with you" (Section 5). Do not imply Amazon endorses the site.
- Qualifying purchases are "subject to the limitations in" the Commission Income Statement (not read in full).

### 1.2 Program Policies (incl. Associates Program IP License)
URL: https://affiliate-program.amazon.com/help/operating/policies . READ 2026-11-19. Page says last updated "April 14, 2026". The fetch tool returned paraphrase-plus-short-quotes; exact clause numbers below are as the tool reported them and should be re-checked on the page before anything is built on them.
- Image caching (IP License 2(h)): "You will not store or cache Product Advertising Content consisting of an image" and "you may store a link to Product Advertising Content consisting of an image for up to 24 hours". Non-image Product Advertising Content may be cached up to 24 hours. Client applications "may not store or cache Product Advertising Content".
  Consequence: we may NOT download Amazon images and host them as files in /public or the repo. We may only hotlink the image URL the API returns, and must refresh the link at least every 24 hours.
- How to obtain: "You may obtain Product Advertising Content by making calls to Creators API or PA API." Data feed only with "express prior written approval" (2(b)). The license does NOT contain a separate sentence saying images must come only through the API, but it does say the license "does not include any downloading, copying or other use of Program Content" outside what it grants, and grants the right to "copy and display Program Content solely on your Site" (Section 1). Net reading: use the API; do not scrape or save pictures from product pages. (My reading, not Amazon's sentence.)
- Links: "link each use of the Program Content solely to the related Product detail page" and "You will link each use of Product Advertising Content to, and only to, the relevant page of an Amazon Site" (Sections 1 and 2(c)(iii)). So an image from Amazon must link to that product's Amazon page, with our tag. It cannot link to our own article, or to a non-Amazon retailer.
- Alteration: "you may resize Program Content consisting of a graphic image in a manner that maintains the original proportions" (Participation Requirements 6(a)); other alteration is prohibited. So no crops to square, no overlays, no badges, no filters, no recolor, no collage that alters it.
- Prices: a date/time stamp next to price or availability is required if shown and the disclaimer "Product prices and availability are accurate as of the date/time indicated and are subject to change." We show no prices, which sidesteps this. Keep it that way.
- Trademarks: "You may not alter any Amazon Mark in any manner" (Trademark Guidelines 4).
- Reselling: SECONDARY (ConductAtlas): content may not be sold or redistributed. Not verified on Amazon's page.

### 1.3 Creators API (successor to PA-API 5)
- Deprecation page: https://affiliate-program.amazon.com/creatorsapi/docs/en-us/paapiv5-deprecation . READ 2026-11-19. Quote: "New and existing integrations should move to the Creators API to continue accessing Amazon's product catalog." It says PA-API 5 "has been deprecated" and callers receive HTTP 403. No dates on that page. Third-party sources give April 30 / May 15 2026 (SECONDARY, conflicting). Build only on Creators API.
- Introduction: https://affiliate-program.amazon.com/creatorsapi/docs/en-us/introduction . READ 2026-11-19. Requirements as stated: "Be enrolled in the Amazon Associates program for your target marketplace" and "at least 10 qualifying sales within the past 30 days". Register via Associates Central and generate credentials. Operations: SearchItems, GetItems, GetVariations, GetBrowseNodes. The page does not say what fields come back.
  Consequence: a brand-new approved account with no sales cannot call the API. The earlier "3 sales in 180 days" figure appears only in third-party blogs (SECONDARY); the "10 sales in 30 days" figure is on Amazon's own page. Ongoing access also depends on keeping sales up (SECONDARY says access lapses after a window without sales; NOT FOUND on an Amazon page I could fetch).
- Best-practices page: https://affiliate-program.amazon.com/creatorsapi/docs/en-us/concepts/best-programming-practices . READ 2026-11-19. TTL table: Offers "1 hour"; BrowseNodeInfo "1 hour"; "All other Fields/Nodes/Resources" (examples include "BrowseNodes, DetailPageURL, Images, ItemInfo") "1 day". It says responses "can be cached on your end under the guidelines defined in the License Agreement". This is a refresh-interval table; it does not override the IP License ban on storing image files. Treat "cache the image URL, never the file, refresh daily".
- Old PA-API registration help page (https://affiliate-program.amazon.com/help/node/topic/GBRCD467W33NMWLD, READ 2026-11-19) gives no sales threshold; it only mentions request-rate scaling "based on sales generated in the last 30 days". Stale.

### 1.4 SiteStripe and image links
- Amazon's SiteStripe help page https://affiliate-program.amazon.com/help/stripe.html returned HTTP 404 on 2026-11-19. NOT FOUND (official).
- Search-result snippet of Amazon's own help and tools pages still describes Image and Text+Image link options (undated, possibly stale). Multiple third parties (SECONDARY: techtactician.com, wpadvancedads.com, getlasso.co updated 2026-07-17) say Image and Text+Image SiteStripe embeds stopped working around December 2023 / January 2024 and only text links remain. I could not confirm this from Amazon. Plan as if SiteStripe gives text links only, and verify by logging in once approved.
- Native Shopping Ads: Amazon pages exist in search results (e.g. https://affiliate-program.amazon.com/help/node/topic/GFR9BXY4CM8XF7XC) but that page returned HTTP 500 and could not be read; one blog claims they were discontinued 2023-08-25 (SECONDARY). NOT FOUND whether currently available. Even if available, they are third-party scripts that add Amazon-styled ad units; they would not let us control the look of our cards and may conflict with the "no ad-network look" positioning. Do not rely on them.

### 1.5 Things Amazon rules say we cannot do (from the above)
Downloading Amazon product images to our own host; cropping/overlaying/recoloring them; linking an Amazon-sourced image to anything other than the Amazon product page; showing Amazon images for non-Amazon products; showing prices without timestamp and disclaimer; implying endorsement.

## 2. Getting real product photography outside Amazon

### 2.1 What fair use does and does not cover
- US Copyright Office, https://www.copyright.gov/fair-use/more-info.html , READ 2026-11-19: four factors (purpose and character incl. commercial/transformative; nature of the work; amount used; market effect). "Courts evaluate fair use claims on a case-by-case basis" and "there is no formula".
- Commercial affiliate galleries that reproduce a manufacturer's marketing photo to sell the same product are the weak case. SECONDARY (legal commentary search result, not read in full): Minka Lighting v. Bath Kitchen Decor (C.D. Cal. 2015) found infringement where product photos were reused to sell the same products. Cropping does not by itself make it fair. Treat manufacturer photos as NOT usable without permission or an explicit publisher license. This is not legal advice.

### 2.2 Brand press and asset pages (what I could confirm)
| Brand | Finding | Usable now? |
|---|---|---|
| Crayola | Terms of Use https://www.crayola.com/terms-of-use READ 2026-11-19, effective "May 20, 2024": license is for "non-commercial purposes only", download for "solely for your personal or family use"; no reproduction or derivative works "without the specific permission of Crayola"; linking sites "must not use any Crayola trademarks without the prior written permission". Press center page returned 404 at the URL I tried; search results show a media center with images and fact sheets and an Influencer Program contact (SECONDARY snippet, may be staging domain). | No, unless Crayola grants written permission or the influencer program terms allow it. Ask. |
| Faber-Castell | Global press portal on MyNewsdesk (e.g. https://www.mynewsdesk.com/faber-castell/pressreleases/not-a-bit-of-a-write-off-faber-castell-celebrates-handwriting-3195766). Search summary says English releases mark images "free for editorial use" with a copyright credit (SECONDARY; I did not open the page). | Editorial use only; an affiliate shopping card is arguably not editorial. Ask press office in writing. |
| 3M / Scotch | 3M News Center releases offer downloadable photos, terms not found; 3M channel guidelines say 3M assets are for partners and "should not appear in materials not specifically featuring 3M without written permission" (SECONDARY snippet). | NOT FOUND publisher terms. Ask media relations. |
| Sakura of America | No press kit or usage terms found. | NOT FOUND. |
| Prang, Stationery Island, Mr. Pen | Not researched with sources. | NOT FOUND. |

Practical read: craft and stationery brands rarely publish blanket "use for commerce" licenses. A short written permission email from each brand ("may we show your product photo, credited and linked, in our shopping guide?") is the legitimate route; small brands like Stationery Island often say yes because it is free marketing. Keep every reply as a saved record.

### 2.3 Affiliate-network image feeds
- Awin: publisher product feeds include image-URL fields and Awin offers a resize/caching service (https://help.awin.com/developers/docs/product-feed-publisher , SECONDARY snippet). The legal terms for displaying merchant images sit in Awin Standard Terms and Code of Conduct, which I did not retrieve. NOT FOUND whether feed images may be shown on any publisher site; assume per-merchant terms apply.
- Impact, Rakuten, ShareASale: not researched. NOT FOUND.
- Important: our revenue model is Amazon only (per project rules). Joining other networks to get photos would add programs and links that the site has ruled out; and images from a non-Amazon merchant feed that link to Amazon would breach that merchant's rules. Not recommended.

### 2.4 How review sites actually get photos
Standard industry sources: they buy and shoot the product themselves (Wirecutter-style testing), or receive manufacturer press images under editorial license, or use retailer/brand-supplied asset libraries under affiliate or partner terms. The Strategist rule, per search snippet: every gift is "something I've used myself or something that's been recommended to me by a trusted source" (SECONDARY). We cannot claim testing, so our own photography must be labelled as "bought by us, photographed on our desk", not "tested" (see Section 5).

## 3. How the best sites present products without prices (patterns, not citations)
I could not find primary documents describing card anatomy (the search returned nothing usable). What follows is craft judgment from observing these sites, marked as such; none is a sourced fact.
- Strategist/Wirecutter pattern: product title links to the editorial rationale; separate buy button goes to retailer. SECONDARY snippet confirms this two-link structure. We can mimic: title -> our guide section, button -> Amazon.
- A card that sells without price has: (1) a real image, (2) one specific job-to-be-done line ("the pen that doesn't bleed through journal pages"), (3) one honest tradeoff line ("thinner tip than it looks"), (4) a "pairs with" cue, (5) one calm button.
- "Whole look" framing: show the kit as a styled set (flat-lay of 4-6 items on one surface) first, then the cards. This is what makes an empty-looking set feel like a hobby you could start tonight.
- Honest social proof available to us without fakes: "fits in a tote", "under 20 minutes to set up", "the one thing you can skip", counts like "6 picks, about the cost of a movie night" are NOT allowed if they imply a price. Allowed: "needs no experience", "no special tools", "one drawer's worth". Do not invent ratings, "bestseller", review counts, or quotes.
- Price-less value cue: a "total outlay: low / modest" band is a price claim in disguise and invites inaccuracy; prefer "what you actually need vs. nice-to-have" lists, which the site already has.

## 4. Honest substitutes for photos
| Option | Allowed? | Notes |
|---|---|---|
| Own flat-lay photos of purchased items | Yes, clean. Photos we take are ours (copyright). Trademark: showing the product and brand name accurately to identify it is ordinary descriptive use. Do not claim "tested", "reviewed" or "recommended after testing". Caption e.g. "Bought and photographed by us". Cost: 25-30 products at roughly $5-$25 each plus a $0-$40 light/backdrop = about $200-$600 owner outlay; some returnable. These photos can link to the Amazon page like any other. | Best non-API option. Fits the rule "no fake testing" only if captions say "photographed", not "tested". |
| Illustrated product spotlights (our own illustration, labelled "illustration") | Yes. | Lowest risk, moderate lift. Must look accurate to the real product category and not be mistaken for the actual product. |
| AI scenes labelled as illustration | Allowed in principle by Amazon (no Amazon content). FTC: materially misleading product images fall under truth-in-advertising (SECONDARY, vendor blogs; FTC page not read). The site already uses an "Illustrative styling, not specific products" label (per M5 review). | Fine for mood/category scenes. NOT fine as the picture on a named-product card, because it shows something that is not that product. AI disclosure is restricted by project rule to Editorial Standards, so image-level labelling must be an "illustration" caption, which is a different thing; confirm with the owner before adding any new AI disclosure line elsewhere. |
| Brand-supplied images with written permission | Yes if saved. | Low cost, slow, brand-dependent. |
| Product-type icon tiles (current) | Allowed, but the reviewer score problem. | Keep only as fallback. |

## 5. Verified products per kit and the empty-kit fix
- Current state (M5 review): 31 verified named products; 9 of 15 kits render nothing; 4 of 8 collections have no named product.
- How many does a kit need to feel complete: this is a judgment, not sourced. Retail starter kits and gift guides typically show 4 to 6 items per set (a "core 3 + 2 to 3 add-ons") and one "skip it" line. I would target 5 named picks per kit (3 essentials, 2 upgrades), which at 8 collections means about 40 named products, and at 15 kits about 60-75 if each kit stands alone. A smaller honest alternative: 4 per kit across 8 collections = 32, which is about what exists, but concentrated into 8 complete kits rather than spread thin.
- Empty-kit fix, in order: (1) do not render empty kits at all (partly done); (2) merge the 15 kits into 8 collection kits so every kit has at least 4 named, imaged items; (3) for any collection that still lacks picks, show one illustrated "start here" card and a free-start line, not six "Browse options" search cards; (4) fill the rest from verified products only (the site already requires verifying each Amazon page).

## 6. Ranked action plan

Cost key: $ owner cash, T = time. Effect = my honest estimate of change in the two scores (desirability / purchase), not additive across rows.

| # | Step | Who | Allowed under Amazon rules? | Cost | Expected effect | Notes |
|---|---|---|---|---|---|---|
| 1 | Photograph 24-30 owned products in flat-lays (white or kraft backdrop, window light, one "whole look" per kit plus single product shots). Caption: "Bought and photographed by us." Link to Amazon with our tag as normal. | Owner buys and shoots; Claude Code builds the card/kit components, alt text, caption, image optimization | Yes; our own photos, not Program Content, so no 24-hour rule and no API needed. We must not claim testing. | $200-$600 plus 1-2 days | +1.2 to +1.8 desirability, +1.0 to +1.5 purchase (largest available lift) | Biggest honest win before approval. Keep brand/box visible (identifies the product). |
| 2 | Merge 15 kits into 8 complete kits; 4-5 named picks each with image, one job line, one tradeoff line, "pairs with" cue; delete the apologetic empty states. | Claude Code (data/copy); owner approves picks | Yes | Low; picks must be re-verified against live Amazon pages | +0.5 to +0.8 desirability, +0.6 to +1.0 purchase | Fixes "empty kits" and "filler picks". Remove filler: if a pick is generic, cut it, do not pad. |
| 3 | Rebuild the product card: image first, "why we picked it" in one sentence, honest tradeoff, one button. Title links to our guide section. | Claude Code | Yes | Low | +0.3 to +0.5 / +0.3 to +0.5 | Needs step 1 images to pay off. |
| 4 | Email 6-10 brands for written permission to use official product photos (credited, linked). Start with Stationery Island, smaller makers, then Faber-Castell and Crayola press/influencer contacts. Keep replies. | Owner (sends); Cowork can draft/track the emails | Yes if permission is in writing. NOT FOUND any blanket license. | Free; weeks | +0.2 to +0.6 each for covered products | Treat as a bonus, never a plan dependency. |
| 5 | Illustrated spotlight and styled scene images clearly labelled "illustration". Use for category and collection heroes, not named-product cards. | Claude Code / Cowork (image generation) | Yes | Low to moderate | +0.2 to +0.4 / +0.1 to +0.2 | Replaces the two repeated collection images too. |
| 6 | After Associates approval and 10 qualifying sales in a 30-day window: apply for Creators API, fetch image URLs at runtime (server or build-time proxy), refresh at most every 24 hours (daily TTL per best-practices page), hotlink only, unaltered except proportional resize, each image linked to the Amazon product page with our tag. Where API images and our own photos both exist, prefer the API image for the buy card and our flat-lay for the guide. | Claude Code builds; owner supplies credentials | Yes, if above conditions met. Needs approved account; sales gate; no stored image files | Dev days; no cash | +0.8 to +1.2 / +0.8 to +1.2 over icon tiles, mostly overlaps step 1 | Gate is hard: the API cannot be used to look better in order to earn the first sales. Also maintains a dependency on keeping sales up. |
| 7 | Apply honest value cues without prices: "what you really need / what you can skip / start free" per kit (already partially present). | Claude Code | Yes | Low | +0.2 to +0.4 purchase | The best price-less value anchor we can use honestly. |

Realistic path: steps 1+2+3 plus 7 get to about 7.3-7.8 desirability and 6.3-7.0 purchase. Adding step 6 after real sales, and step 4 permissions, is what can reach 8.

Why the ceiling is not simply 10: purchase willingness in a blind review is driven by price anchor, ratings, brand familiarity and urgency. We forbid price display, star ratings, review counts, testimonials, urgency tactics, newsletters and accounts. What remains is photo quality, specificity, tradeoff honesty and completeness. Those carry it to roughly 7-8, not 9+.

## 7. What we must NOT do
- Do not save, mirror or rehost Amazon images (no files in /public, repo, CDN, or base64). Hotlink API-returned URLs only, refreshed daily.
- Do not take screenshots of Amazon pages or right-click-save product photos; do not paste images from SiteStripe/third-party plugin exports into the repo.
- Do not crop to square, overlay badges, recolor or add filters to Amazon images; proportional resize only.
- Do not link an Amazon-sourced image to anything but the Amazon product page.
- Do not display prices, ratings, review counts or "bestseller" labels from Amazon (prices would also trigger timestamp and disclaimer requirements).
- Do not use manufacturer press photos without written permission; "editorial use" and "non-commercial" terms do not cover an affiliate shop.
- Do not caption our photos as "tested" or "reviewed in our lab" or imply expert testing; do not use AI images on named-product cards or present illustrations as the real product.
- Do not invent testimonials, bylines or social proof; do not build a newsletter or account system to produce "popularity" signals.
- Do not use other affiliate networks' feeds to supply images for Amazon links.
- Do not assume the PA-API (deprecated) or old SiteStripe image embeds still work.
- Do not publish any Amazon-account-gated feature (the API) until approval and sales exist; the site must stand on its own before then.

## 8. Open items / NOT FOUND
- Amazon SiteStripe official help page (404) and whether Image links still exist: NOT FOUND.
- Native Shopping Ads current availability: NOT FOUND.
- Exact current wording of the IP License clauses was returned by a summarizing fetch tool; open the page and copy exact clauses before relying on them in a legal context.
- Official statement of "3 sales in 180 days" account-approval rule: NOT FOUND on Amazon's pages; only third-party blogs.
- Whether the Creators API returns image URLs in GetItems responses: not stated on the intro page; third-party plugin docs say yes (SECONDARY). Confirm with the first API call.
- Brand image licenses for Sakura, Prang, Stationery Island, Scotch (publisher terms): NOT FOUND.
- Card-anatomy data from Wirecutter, Apartment Therapy, Cup of Jo, Hobbycraft, Etsy, Pinterest: no usable source found; Section 3 is judgment.
