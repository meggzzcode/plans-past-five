# Amazon product images and switching on the affiliate links (plan; nothing activated)

Written 2026-11-19 after the owner asked: "is there not a way to have an Amazon image of the product with their affiliate link? Maybe we need to start putting the affiliate links on the Amazon links we have."

## What is already established (see docs/marketplace/path-to-8/P1-PRODUCTS.md and PATH-TO-8.md, read 2026-11-19)
- Amazon's program policies bar storing, caching, cropping, overlaying or re-hosting Amazon product images. The permitted route is Amazon's own image delivery: either an Associates tool that gives you Amazon-hosted image code with your tracking ID, or the product API (Creators API) which returns image URLs that may be shown for up to 24 hours. The image must link only to that product's Amazon page.
- The Creators API needs an enrolled account with at least 10 qualifying sales in the past 30 days. That is not available today, so API images (and API prices) are out for now.
- Prices: Amazon requires displayed prices to be current and to come from its API, so a hard-coded price is not allowed. Prices therefore stay hidden. This is a rule, not only our preference.
- NOT FOUND / UNVERIFIED: whether the Associates toolbar (SiteStripe) in the owner's logged-in account still offers "Image" or "Text + Image" links today. Third parties say the old image-link feature ended in December 2023; Amazon's own help page returned 404 when read. Only a logged-in check can settle this. That check is Cowork workstream P below.

## Options, from safest to least safe
1. **Amazon-hosted image from an official Associates tool (if it still exists).** Compliant by design (Amazon serves the image and the click carries the tracking ID). Needs an approved Associates account and a tracking ID. Our code would build the image URL centrally from the product's ASIN and the tracking ID in `src/config/affiliate.ts`, show it ONLY when the affiliate entry is active (never in exported lists), wrap it in the same sponsored product link, and keep our editorial tile as the fallback. If the old widget URL no longer works, nothing is shown and the tile stays.
2. **Native Amazon ad widgets or product cards from the Associates dashboard.** Compliant but it embeds Amazon scripts and per-product code, which conflicts with the central, buyer-replaceable configuration. Not recommended.
3. **Manufacturer photos with written permission.** Cowork drafted the permission emails; the owner sends them. Slow, product by product.
4. **Our own photographs** of bought items (owner budget $250-500). Rights are clean; effort and cost fall on the owner.
Do NOT: download, screenshot, crop or re-host Amazon images, or use image URLs copied from product pages.

## Switching on the affiliate links ("putting the tracking ID on the Amazon links we have")
Everything is already built centrally: changing one entry in `src/config/affiliate.ts` retags every on-site Amazon link, switches the disclosure to the required Associates statement ("As an Amazon Associate I earn from qualifying purchases."), and keeps copied, printed and exported lists free of tags (tested active and inactive with a fake ID: `node scripts/check-affiliate-config.mjs`).
What the owner and Cowork must settle first (the code cannot):
- **A real tracking ID for this site** inside the existing master Associates account, with this website added to the account's website list. Eligibility and the account's status (the account was reported to be inside its 180-day window needing qualifying sales) must be read from the owner's logged-in Associates pages.
- **The site must be live and public** on planspastfive.com (the Netlify project is private and the domain is not connected yet). Associates traffic on a private site earns nothing and the program expects a public site.
- **The owner reads and accepts the Associates terms** on using the master account for this site and on a site that may be sold. The tracking ID is the seller's: it is removed or replaced before transfer; the buyer applies for their own account.
- **Written owner authorisation** (item D and E in `docs/launch/OWNER-AUTHORISATION-CHECKLIST.md`). Claude Code will not enter a real ID without it.
Then Claude Code: sets the single entry, adds the real ID to the config only, updates the "we don't currently earn" wording through the existing constants, runs the full suite active and inactive, builds ONE release, and Cowork verifies a link click lands on the right product with the tag.

## Honest expectations
Images and tracked links make the shop look and earn better only once there is traffic. A 30-day window is short for organic search; nothing here guarantees earnings, and the listing must still say pre-revenue unless real, dated numbers exist.
