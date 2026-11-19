# Product photo permissions (C12), 2026-11-19
Status for every product: NO PRODUCT PHOTO HAS A DOCUMENTED RIGHT TO BE USED. All rows keep `imageRights` = none. Do not copy, download or hotlink Amazon or maker images. Searches only; no site was scraped. Search snippets may be incomplete.

## Amazon images (the images behind our product links)
- Third-party summaries of the Associates rules agree: you can use Amazon product images only if you are an Associate and obtain them through Amazon's approved tools (the Product Advertising API or SiteStripe), not by copying them (https://getlasso.co/can-i-use-amazon-product-images-on-my-affiliate-website/, https://nichesiteproject.com/amazon-affiliate/audit).
- Reported changes (secondary source, https://www.wptasty.com/amazon-images-on-your-blog): SiteStripe static image links were discontinued December 2023; the Product Advertising API was retired 31 January 2025 and replaced by the Amazon Creators API, with a qualifying-sales requirement (10 sales in 30 days, per that page) before API access. A policy summary says API images may be cached only briefly (24 hours; https://conductatlas.com/platform/amazon-associates/amazon-associates-program-policies/product-advertising-image-caching-limited-to-24-hours/, tracker, not Amazon). NOT VERIFIED against Amazon's own Operating Agreement: the owner must read it in Associates Central once the account is approved.
- Consequence: until the account has API access, the site shows no Amazon product images. Cards stay text-only.

## Maker image terms
| Brand (products) | Maker media page found | Terms read | Status |
|---|---|---|---|
| Crayola (clay) | Press center "images to support your stories" (https://crayola.com/about-us/press-center); media contact form on its media center page | Site Terms of Use exist (https://aut.crayocom.cloud.sitefinity.com/terms-of-use); no image licence for bloggers/affiliates found | NO PERMISSION; ask Crayola media team before any use |
| Plaid: Mod Podge, Apple Barrel (sealer, paint) | Plaid has a news-release page (https://plaidonline.com/news-releases) | No affiliate or blogger image licence found | NO PERMISSION |
| Yarnspirations: Red Heart, Caron (yarn) | Brand pages and free-pattern site | No image licence for third-party sites found | NO PERMISSION |
| Sakura (Pigma), Scotch/3M, Arches, Penn, Paper Mate, Celestial Seasonings, NMJL, Stork | Not searched this pass | n/a | NOT CHECKED |
| Unknown or generic brands (about 40 rows, see the CSV) | Mostly none | n/a | NO PERMISSION; use original photography or no photo |

## Plan if photos are wanted
1. Owner photographs products they actually buy (own photo, record as "Own photo").
2. Or ask a maker's media contact in writing; save the reply in the repo and set `imageRights` to the stated terms.
3. Never use AI images for real branded products.
