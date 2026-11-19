# Cowork read-live business facts (2026-11-19)

Each fact: VERIFIED (read on an official page by me today), INACCESSIBLE, NOT CHECKED, or ASSUMPTION. Forum reports are labelled as such. No legal conclusions.

## Netlify
| Fact | Status | Source |
|---|---|---|
| Free plan: 300 credits a month, hard limit, no auto recharge, never charged, 1 concurrent build | VERIFIED | https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/ |
| A successful production deploy costs 15 credits | VERIFIED | same page and https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/ |
| Web bandwidth 20 credits per GB; web requests 2 credits per 10,000; compute 10 per GB-hour | VERIFIED | credit-based-pricing-plans page |
| Deploy previews, branch deploys, failed deploys and form submissions are not metered by credits | VERIFIED | same page |
| Rolling back to a previous production deploy does not use credits; failed deploys do not | VERIFIED | how-credits-work page |
| When Free credits run out, projects pause until the next billing cycle | VERIFIED | https://www.netlify.com/pricing/personal-vs-free and https://www.netlify.com/pricing/pro-vs-free/ |
| Personal: 1,000 credits, $9/month, auto recharge; Pro: 5,000 credits (page shows $20 per member) | VERIFIED | https://www.netlify.com/changelog/netlify-pricing-update-introducing-credit-based-plans/ (Pro vs Free page mentions up to 20,000 credits; plan details may have changed) |
| Whether a SKIPPED build (ignore-build rule) costs credits | NOT FOUND in the docs I read. The credit pages only describe published production deploys. Must be tested live (workstream G). | |
| Whether "Trigger deploy" builds when the commit message lacks the release marker | NOT TESTED (needs Netlify login) | |
| Commercial use of the Free plan | NOT FOUND on the pricing pages; the Terms of Use were not read. | https://www.netlify.com/legal/terms-of-use/ (not read) |
| Forum reports (not official): stale "out of credits" banner blocking deploys on Free teams with credits left, July 2026 | VERIFIED that the posts exist; cause unconfirmed | https://answers.netlify.com/t/free-team-has-run-out-of-credits-with-30-credits-available-production-deploys-blocked/165400 |

## Domain registrars (.com)
| Registrar | Fact | Status |
|---|---|---|
| Namecheap | Bought this domain: $12.08 first year + $0.20 ICANN; list renewal $15.98 (seen on Namecheap order and search, 2026-11-19) | VERIFIED in the account |
| Cloudflare Registrar | At-cost, no markup: about $10.44 a year (wholesale plus ICANN fee) per third-party reviews dated 2026; must use Cloudflare DNS | ASSUMPTION: from review sites, not Cloudflare's price table |
| Porkbun | About $11.06 to $11.08 first year and renewal per reviews; Porkbun's own calculator states a five-year comparison (checked by Porkbun 2026-10-13) | VERIFIED that the calculator exists (https://porkbun.com/about/domain-cost-calculator); exact price not read from Porkbun's price page |

## Email options (receive and send)
| Option | Receive | Send | Status |
|---|---|---|---|
| Namecheap Private Email (what was bought: Launch plan, $14.88 first year; mailbox hello@ plus alias subscriptions@) | yes | yes | VERIFIED purchase; renewal price NOT confirmed on an official page. DNS records needed: MX to mx1/mx2.privateemail.com, SPF include:spf.privateemail.com (added 2026-11-19, live) |
| Cloudflare Email Routing | forward only, free | does not send mailbox mail; Cloudflare Email Service can send by API/SMTP with limits | VERIFIED receive-only routing is free (https://developers.cloudflare.com/email-routing/limits/ and https://www.cloudflare.com/products/email-routing). Needs Cloudflare as nameserver. |
| Zoho Mail | yes | yes | Free plan reported for up to 5 users on one domain in eligible regions; Mail Lite about $1 per user a month. Third-party sources only; Zoho's page not read |
| Google Workspace | yes | yes | Business Starter about $7 a month per user annual (about $8.40 monthly) per TechRepublic Aug 2026; no permanent free plan. Third-party source only |

## Pages CMS
| Fact | Status |
|---|---|
| Free, open source (MIT), hosted version at app.pagescms.org, GitHub login, no limits stated on collaborators or projects | VERIFIED on https://pagescms.org/ (FAQ says 100% free) and https://github.com/pagescms/pagescms |
| Free limits beyond that | NOT FOUND |

## Amazon Associates (read: https://affiliate-program.amazon.com/help/operating/policies, Operating Agreement updated Oct 15, 2025; changes effective Apr 14, 2026 noted)
| Fact | Status |
|---|---|
| Offline promotion (printed material, ebooks, mailings, oral) is barred; email and direct messages only if recipients opted in (Participation Requirements section 4) | VERIFIED |
| Program Content (including images) may be used only on your site; images may be resized proportionally not altered; not to be stored or cached (a link may be kept up to 24 hours) (Participation Requirements 6(a); IP License 2(h)) | VERIFIED. Matches our rule: no Amazon images in the repo. |
| Prices and availability may be shown only if Amazon serves the link or you use Creators/PA API; prices need a date and the stated disclaimer (Participation Requirements 2(b); IP License 2(i)) | VERIFIED. Matches our rule: no prices shown. |
| Star ratings and reviews only via API (6(t)) | VERIFIED |
| You may not use an Associates tag assigned to someone else (IP License 2(b)); license is non-transferable | VERIFIED. Supports the plan that master affiliate accounts are not part of the sale and the buyer uses their own tag. |
| Customer must buy within 89 days of click; shipped/paid within 180 days of purchase (Commission Income Statement 1(b)) | VERIFIED. This is NOT the same as the "3 sales in 180 days" rule. |
| "3 qualifying sales within 180 days of signup" account-closure rule and the "content within 60 days" rule | NOT FOUND on the policies page I read. Do not rely on these figures until read on Amazon's own FAQ. |
| Disclosure sentence "As an Amazon Associate I earn from qualifying purchases" | VERIFIED in the Operating Agreement text (UK/CN pages quote it; the US page is the same agreement) |
| Assignment of the agreement or selling a site | NOT READ (Operating Agreement section not read) |

## Not checked this round
GA4, Search Console, Bing Webmaster Tools, Pinterest business tools and AI-image labelling policy, other affiliate programs. These need pages I did not open.

## Finish pass 2026-11-19 (items previously NOT CHECKED)
| Item | Finding | Status | Source |
|---|---|---|---|
| Netlify Terms of Use: transfer, Free-plan commercial/affiliate use | The Website Terms of Use do not address project transfers or plan-specific restrictions; section 12 bars assigning the Terms without Netlify's consent; services sit under the Self-Serve Subscription Agreement (not read). General content limits: sections 3 to 5 (illegal content, Acceptable Use Policy, Netlify's etiquette). No affiliate ban on this page | VERIFIED what the page says; transfer rules NOT FOUND there (check team/site transfer in Netlify docs at deploy time) | https://www.netlify.com/legal/terms-of-use/ |
| Google Analytics (GA4) retention, cost, ownership transfer | The help page fetched (support.google.com/analytics/answer/11583528) covers Universal Analytics only and says nothing on GA4 retention, price or admin transfer | NOT FOUND on an official page I could read. Practical step at handover: new owner is added as Administrator in GA4 Admin, previous owner then removed (not verified here) | |
| Google Search Console ownership | Verified owners prove ownership by token (HTML file, tag, DNS TXT); delegated owners are added by an owner with no token; there is no formal transfer procedure: the new owner verifies, then the old tokens are removed; a property needs at least one verified owner; removed owners' tokens keep working until deleted | VERIFIED | https://support.google.com/webmasters/answer/7687615 |
| Bing Webmaster Tools | The help URL I opened was only a landing page with no steps; cost, import from Search Console and ownership sharing not stated | NOT FOUND | https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b |
| Pinterest claimed website | Claim in Settings > Link to Pinterest > Claim; four methods: Google Merchant Center, HTML tag, HTML file, DNS TXT (up to 72 hours); you must own the domain and edit its source; unclaim via Settings > Claimed accounts disconnects linked pins; a site can be claimed by only one account, no transfer process described | VERIFIED; transfer procedure NOT FOUND (implied: unclaim, then new owner claims) | https://help.pinterest.com/en/business/article/claim-your-website |
| Amazon Associates Operating Agreement | Section 12 bars assigning the Agreement without Amazon's written approval and binds successors; "Site" is defined broadly (website, app, social content, Alexa skill); Section 12 lets Amazon crawl the Site. The 180-day qualifying-sales rule, tag transfer and image/price storage limits are NOT in this page (they sit in the Program Policies / Commission Income Statement, which it links) | VERIFIED what it says; 180-day rule still NOT FOUND on an Amazon page I could read | https://affiliate-program.amazon.com/help/operating/agreement |
| Other affiliate programs | No other affiliate program is active in the repo; this checks no further programs | NOT APPLICABLE until owner joins another | |

## Pinterest (2026-11-19 update)
- Handle @planspastfive, business account, profile photo set, website field set, website CLAIMED (TXT method) after the site was deployed; 7 typographic pins published (earlier this session).
- AI-image labelling policy (Pinterest newsroom, 30 April 2025, "Introducing Gen AI Labels"): Pinterest may show an "AI modified" label on image Pins it detects were generated or modified with AI, using image metadata (IPTC) and its own classifiers; it does not rely only on self-reporting. Users can hide or see fewer AI Pins. Pinterest has said the system is imperfect and creators can appeal a wrong label. Labels are not shown on ads (ads only disclose in "Why am I seeing this ad?"). Source: https://newsroom.pinterest.com/en-gb/news/introducing-gen-ai-labels (read via search results 2026-11-19; the live policy page was not opened).
- Instagram/TikTok handle availability for @planspastfive: NOT CHECKED in this pass.
