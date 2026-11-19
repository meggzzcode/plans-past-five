# Product photo permissions (C12), 2026-11-19
Status for every product: NO PRODUCT PHOTO HAS A DOCUMENTED RIGHT TO BE USED. All rows keep `imageRights` = none. Do not copy, download or hotlink Amazon or maker images. Searches only; no site was scraped. Search snippets may be incomplete.

## Amazon images (the images behind our product links)
- Third-party summaries of the Associates rules agree: you can use Amazon product images only if you are an Associate and obtain them through Amazon's approved tools (the Product Advertising API or SiteStripe), not by copying them (https://getlasso.co/can-i-use-amazon-product-images-on-my-affiliate-website/, https://nichesiteproject.com/amazon-affiliate/audit).
- Reported changes (secondary source, https://www.wptasty.com/amazon-images-on-your-blog): SiteStripe static image links were discontinued December 2023; the Product Advertising API was retired 31 January 2025 and replaced by the Amazon Creators API, with a qualifying-sales requirement (10 sales in 30 days, per that page) before API access. A policy summary says API images may be cached only briefly (24 hours; https://conductatlas.com/platform/amazon-associates/amazon-associates-program-policies/product-advertising-image-caching-limited-to-24-hours/, tracker, not Amazon). NOT VERIFIED against Amazon's own Operating Agreement: the owner must read it in Associates Central once the account is approved.
- Consequence: until the account has API access, the site shows no Amazon product images. Cards stay text-only.

## Maker image terms (all 8 skipped brands now searched, 2026-11-19: no permission found for any)
| Brand (products) | Maker media page found | Terms read | Status |
|---|---|---|---|
| Crayola (clay) | Press center "images to support your stories" (https://crayola.com/about-us/press-center); media contact form on its media center page | Site Terms of Use exist (https://aut.crayocom.cloud.sitefinity.com/terms-of-use); no image licence for bloggers/affiliates found | NO PERMISSION; ask Crayola media team before any use |
| Plaid: Mod Podge, Apple Barrel (sealer, paint) | Plaid has a news-release page (https://plaidonline.com/news-releases) | No affiliate or blogger image licence found | NO PERMISSION |
| Yarnspirations: Red Heart, Caron (yarn) | Brand pages and free-pattern site | No image licence for third-party sites found | NO PERMISSION |
| Sakura (Pigma) | None found (search returned nothing relevant, 2026-11-19) | n/a | NOT FOUND: no permission |
| 3M / Scotch | 3M news center and a Content Use Agreement for user-posted content (https://www.3m.com/3M/en_US/company-us/content-use-agreement/); channel-partner brand guidelines say 3M can share 3M-owned photography with channel partners (https://multimedia.3m.com/mws/media/2222561O/channel-relationship-guidelines-3m-brand-version-2-2-june-2022-external.pdf) | Channel-partner terms apply to authorised distributors, not to affiliate bloggers | NO PERMISSION found; ask 3M or use own photos |
| Arches / Canson | None found | n/a | NOT FOUND |
| Penn (HEAD) | HEAD site has Terms of Use and a Penn brand site (https://pennracquet.com); no media or image-licence page found | Terms of Use not read | NOT FOUND |
| Paper Mate (Newell Brands) | Newell site terms: downloading content "does not transfer any right or ownership" and use is only as the terms allow (https://bgcz-001.dx.commercecloud.salesforce.com/s/gracobaby/terms-of-use.html, a Newell storefront); a Salsify product-content portal exists but is for retail partners | No affiliate image licence found | NO PERMISSION |
| Celestial Seasonings | Only third-party galleries (BevNET) turned up | n/a | NOT FOUND |
| NMJL | League store only. The annual card is copyrighted: the layout and design are protected (https://www.lernerdavid.com/news-successes/unscripted/copyright-issues-in-america-s-fast-growing-mah-jongg-craze) | n/a | DO NOT show or reproduce the card or its contents; link to the League store |
| Stork scissors (AQUEENLY, 3 Swords, Gingher, DOVO) | "Stork" is a design style sold by many makers; no single brand or image licence | n/a | NO PERMISSION for any of them |
| Unknown or generic brands (about 40 rows, see the CSV) | Mostly none | n/a | NO PERMISSION; use original photography or no photo |

## Plan if photos are wanted
1. Owner photographs products they actually buy (own photo, record as "Own photo").
2. Or ask a maker's media contact in writing; save the reply in the repo and set `imageRights` to the stated terms.
3. Never use AI images for real branded products.
