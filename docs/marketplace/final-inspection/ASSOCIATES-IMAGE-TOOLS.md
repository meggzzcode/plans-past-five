# Amazon Associates Central: link and ad tools, images, requirements (read-only check)

Checked 2026-11-20 about 10:30 AM ET in the owner's logged-in Associates Central (US). Read only: no Create/Get Link buttons clicked, no embed codes copied, no settings changed. Selected tracking ID on the Manage Tracking IDs page: **planspastfive-20** (the account also lists pawspassage-20).

## What the current Associates Central actually offers
Main menu: The Basics, Home, Reports, Tools, Promotions, Creator University, Account, Help.
- **Tools** contains exactly five items: SiteStripe, Link Checker, Product Advertising API, Manage Your Tracking IDs, CreatorsAPI.
- **Promotions** contains: Creator Connections, Amazon Bounty Program, Creator Rewards.
- **Help** contains: Getting started, Operating Agreement, Commission Income Statement, Program Policies, Contact Us.
- There is NO "Product Linking" menu in this account. Direct visits to the old address `/home/productlinks` returned "Page Not Found". I found no Product Links, Custom Links, Native Shopping Ads, Recommendation Ads, Search Widget, banner or "Amazon Ads" builder anywhere in the menus. (They may exist for other accounts or be retired; I could not find them here, so treat them as NOT AVAILABLE to this account, not as proven discontinued.)

## Tool by tool
| Tool | Shows product images? | What it requires | Works for planspastfive-20? |
|---|---|---|---|
| SiteStripe (toolbar on Amazon pages while signed in) | The page text says it builds "Get Link: Text" links. This page shows no image option. Earlier checks in this project (SITESTRIPE-IMAGE-FORMAT.md) found only Short Link / Full Link. So: text links only, no images. | Signed in to Amazon with the same account as Associates; no sales threshold or approval mentioned; no embed code. | Yes. It tags links with the tracking ID selected in Associates Central (planspastfive-20). Re-check the selected ID before copying each link. |
| Link Checker | No (checks tagging of a pasted amazon.com URL only; not used, nothing submitted). | None stated. Note: new tracking IDs can take minutes before it validates them. | Yes, any tracking ID on the account. |
| Manage Your Tracking IDs | No. | Add Tracking ID button exists (not clicked). Page says a new ID can take up to 24 hours to enable for OneLink. | planspastfive-20 is listed and currently selected. |
| Product Advertising API (menu item) | Would return product data including images, but see below. | Opens the same page as CreatorsAPI (see next row), i.e. it is now accessed through the Creators API. | Not usable now. |
| Creators API | Programmatic product data (the PA API route is what supplies images and titles). | See "Creators API" section. | Not available now (requirement marked ❌). |
| Creator Connections (Promotions) | Not opened; it is a campaign marketplace, not an image tool. | Not read. | Not assessed. |
| Amazon Bounty Program, Creator Rewards (Promotions) | Not opened; not image tools. | Not read. | Not assessed. |
| Home-page tile "Connect your account to Instagram" | Described as linking Amazon products inside Instagram. Not for a website. | Not read further. | Not relevant to the site. |

## Creators API
- Page: /creatorsapi ("Creators API"). It says it gives programmatic access to Amazon product data and creator services.
- Access requirement shown on the page for this account: **"❌ Have an Approved Associates Account."** The cross is shown, so this account does not currently meet it.
- Stated eligibility (FAQ): an approved creators account, and being logged in with Full access to create applications and credentials. To use the PA API through Creators API you also need **at least 10 qualifying sales in the past 30 days**.
- Review time after creating credentials: up to 48 hours; an "AssociateNotEligible" error can appear during that time and, if it persists past 48 hours, means the criteria are not met.
- You can create up to two applications with two credential sets each. (None created.)
- Not stated on the page: what "approved" means. (Amazon's usual rule is 3 qualifying sales within 180 days of signing up, but this page does not say that, so it is not confirmed here.) The account has 0 sales and 0 earnings this month, 24 clicks over 30 days.
- Practical result: no product images or titles from Amazon's API until the account is approved AND reaches 10 qualifying sales in 30 days. Credentials are per account, not per tracking ID, so this would apply to planspastfive-20 and pawspassage-20 together.

## Other things noticed
- Home banner: "Don't let delays stop you from getting paid. The primary account holder needs to finish filling out payment information." (not actioned).
- Associates reports show 0 shipped items, $0.00 earnings.

## Bottom line for images
Nothing in this account's Associates Central gives embeddable product images for planspastfive-20. Only text links (SiteStripe) are available; image-capable routes (Creators/PA API) are gated behind an approved account and 10 sales in 30 days. Keep using own photography or brand/press images permitted by their owners, with text affiliate links, per the earlier image decisions in this folder.

## Not checked
- Creator Connections, Bounty and Creator Rewards detail pages.
- Whether Amazon's help pages describe retired tools (only the logged-in account was read).
