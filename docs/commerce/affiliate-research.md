# Affiliate program research register (C5), read 2026-11-18
Rules followed: official program/network pages only (search restricted to each program's own domains); nothing applied for; no account created. NOT FOUND = not stated on the pages read. Page ages shown by the search tool are noted where a source looked old. Several network pages conflict with each other; conflicts are flagged, not resolved. Claude Code should fill `src/data/affiliate-programs.ts` only for fields marked with a source URL.

## amazon-associates (Amazon Associates)
- Program/network: Amazon Associates (own network). https://affiliate-program.amazon.com
- Application: account must drive at least three qualified sales within 180 days (personal orders excluded); sites need robust original content (guideline: at least 10 posts), publicly available. Source: https://affiliate-program.amazon.com/help/node/topic/G8TW5AE9XL2VX9VM (read 2026-11-18).
- Commission and cookie: rate card is in the owner's signed-in account, NOT READ. Attribution: 24-hour session; items added to cart count if ordered within 89 days of the click. Source: Commission Income Statement, https://affiliate-program.amazon.com/help/operating/policies (updated April 14, 2026).
- Payment/tax: Associates Central requires a tax interview and payment method (help topic G8TW5AE9XL2VX9VM; details not read).
- Restrictions: disclosure sentence, no price display unless Amazon-served or API data, no redirecting links, no bookmark encouragement (see AMAZON-CART-RESEARCH.md, AMAZON-DISCLOSURE.md).
- Multi-site: NOT FOUND in text read. Transfer: not assignable without Amazon's prior written approval (Operating Agreement https://affiliate-program.amazon.com/help/operating/agreement).
- Fits: /shop, kits. Timing: apply once the site is live with content (needs real traffic for three sales). Buyer activation: buyer applies for own account, adds their site, replaces tracking ID in `src/config/affiliate.ts`.

## awin
- URL https://www.awin.com/us/getting-started ; network Awin.
- Application: complete form with the sites/social pages to promote and how; sign-up deposit. CONFLICT: Awin US FAQ says a $1 deposit is refunded via the publisher account at the first payment threshold (https://www.awin.com/us/faqs); a Help article says 1 EUR/GBP/USD credited and reimbursed at first threshold (https://success.awin.com/articles/en_US/Knowledge/Why-do-I-have-to-pay-the-sign-up-fee); older Awin pages say £5 or $5; the UK FAQ says joining is free with no deposit (https://www.awin.com/gb/faqs). Treat the deposit as $1 refundable per the newest help article, confirm at sign-up.
- Payment threshold: set in Account > Payment Details; defaults by currency (https://success.awin.com/articles/en_US/Knowledge/What-are-the-payment-thresholds). Amount NOT READ.
- Commission/cookie: set per advertiser; NOT FOUND at network level. Multi-site, transfer: NOT FOUND.
- Fits: Etsy-type merchants; /shop. Timing: after launch. Buyer: buyer creates own account.

## impact
- URL https://impact.com/partners/affiliate-partners/ ; sign-up free (same page); marketplace of 6,500+ brands.
- Payout: minimum payout threshold $10 USD; US-based partners need an electronic tax document once yearly earnings reach $2,000, and payouts are held until it is approved (https://help.impact.com/partner/what-would-you-like-to-learn-about/platform-features/finance/payments-withdrawals-and-balance/how-do-partners-get-paid, page about 38 days old).
- Creator campaigns need a social property with 1,000+ followers and age 18+ (help.impact.com, "Campaigns for Creators Explained").
- Commission/cookie: per brand; NOT FOUND at network level. Multi-site, transfer: NOT FOUND.

## cj (CJ Affiliate)
- URL https://www.cj.com/join ; free publisher sign-up (https://members.cj.com/member/signup/publisher/). Needs a valid website URL (https://www.cj.com/support, old page).
- Payment: eligible once closed commission balance reaches the minimum you set; payments around the 20th and 28th (https://junction.cj.com/article/cookie-dough-understanding-publisher-payment-cycle, old).
- Content Certification (pre-approved brands) lists 10K+ monthly pageviews and/or social following among criteria (https://www.cj.com/content-publishers, very old page: re-check).
- Commission/cookie: per advertiser. Multi-site, transfer: NOT FOUND.

## rakuten (Rakuten Advertising)
- URL https://pubhelp.rakutenadvertising.com/hc/en-us/articles/20898125890573-Publisher-Sign-Up-Process ; free; anyone with a website, blog or internet presence can register.
- Requirements: details about online presence (may be screened after joining), tax information and valid mailing address, agreement to policies (https://pubhelp.rakutenadvertising.com/hc/en-us/articles/360060314292-Requirements-for-New-Publishers, 21 days old). Members must be 18+ (Publisher Membership Agreement). Payment by PayPal, ACH or check, no fees (Set or Update Your Payment Method). 500 followers/5 posts requirement applies to influencer programs in the Supplier network (Affiliate Network Policies).
- Commission/cookie: per advertiser. Multi-site, transfer: NOT FOUND.

## etsy
- URL https://www.etsy.com/affiliates ; Help article https://help.etsy.com/hc/en-us/articles/360000335987-The-Affiliate-Program (221 days old).
- Cookie: 30 days for affiliates, 7 days for creators, 7 days for app sales. Commission is on the order price excluding shipping and taxes; no commission on cancelled/returned sales. Designed for bloggers, media and editorial sites; cashback and voucher sites are not eligible. CONFLICT on network: the policy page says the program is run through Awin; the help article says Rakuten terms apply. Confirm at sign-up.
- Commission rate: NOT FOUND. Etsy sellers must declare their shops (Awin merchant profile). Multi-site, transfer: NOT FOUND.
- Fits: /shop handmade, craft items. Not relevant to Etsy-affiliate rules for our own Etsy shop.

## walmart
- Two programs: legacy Walmart affiliate via Impact (https://affiliates.walmart.com/terms, old page) and Walmart Creator (https://corporate.walmart.com/news/2025/11/12/creators-at-the-core-evolving-the-walmart-creator-program-together): apply at WalmartCreator.com via short form; creators need Impact account setup, tax forms, bank details, identity verification, $10 minimum payout (https://creator.walmart.com/education/new-to-walmart-creator).
- Commission: the old benefits page says 1-4% (https://affiliates.walmart.com/page/benefits, undated, likely outdated): do NOT publish. Cookie, multi-site, transfer: NOT FOUND.

## target
- Program: Target Partners via Impact (https://partners.target.com/faqs): 7-day cookie window; order credited if placed within 7 days of the click. Apply through Impact; Target evaluates and accepts or rejects (Terms, https://partners.target.com/termsandconditions; page age about 1,887 days).
- Commission: homepage says "up to 8%" (https://partners.target.com/, page age about 1,654 days: likely stale); an older affiliate.target.com page says "up to 5%". CONFLICT: do not publish a figure.
- Prohibited: datafeed to third-party shopping sites, cookie stuffing, popups, misleading redirects (Terms). Multi-site, transfer, payment minimum: NOT FOUND.

## michaels (Michaels)
- Page https://www.michaels.com/affiliate-program (read in search 2026-11-18): up to 10% for select influencers and bloggers; default starting rate is typically 2%, set after review of website content, audience reach and publisher type; some products (including MakerPlace and Marketplace) excluded. Network and cookie: NOT FOUND on that page. Multi-site, transfer: NOT FOUND.
- Fits: /shop/pottery-era, /shop/creative-girl.

## blick (Blick Art Materials)
- Page https://www.dickblick.com/affiliates/ (page age about 2,559 days): apply via CJ or Awin; up to 10% commission; "30-Day Payouts". Awin profile (https://ui.awin.com/merchant-profile/88183): 15-day cookie. Terms (https://www.dickblick.com/affiliates/terms/): comply with FTC endorsement guides and conspicuously disclose compensation; no datafeeds to third-party shopping sites; sales to schools and businesses may not qualify. Seeks sites focused on arts, artists or education.
- Multi-site, transfer: NOT FOUND. Cookie on CJ listing: NOT FOUND.

## cricut
- Page https://cricut.com/en-us/partners: up to 12% commission, 5-day cookie, one-time 30% discount for new publishers (do not publish), no free product for sponsorships. Network: NOT FOUND on page. Multi-site, transfer, payment minimum: NOT FOUND. Fits /shop/creative-girl. Note: a Cricut Rewards loyalty program and Creator/Collective programs exist; those are not the affiliate program.

## skillshare
- Page https://www.skillshare.com/en/affiliates (page age about 1,301 days): 20% of revenue up to $34 per new paying customer, run through Impact. CONFLICT: an older blog page says 40% up to $67 (https://www.skillshare.com/en/blog/skillshare-affiliate-program/, about 953 days). Both pages are old; confirm current terms on sign-up. Cookie: NOT FOUND. Student Referral terms exclude affiliate publishers from referral rewards.

## udemy
- Run on Impact (https://www.udemy.com/affiliate/ and https://affiliatesupport.udemy.com/hc/en-us/articles/360049413233-Getting-started-on-Rakuten, both old pages). Cookie: 7 days, not product-specific (https://affiliatesupport.udemy.com/hc/en-us/articles/360049412573-What-is-a-cookie-How-long-do-cookies-last-, about 1,781 days). Commission rate not stated on those pages; discussed with the affiliate team (affiliate-team@udemy.com). Older support page lists Rakuten, Awin, Impact and Admitad networks: CONFLICT with the "Impact only" page. A 2026 Udemy-hosted business page describes affiliate commissions on marketplace courses without a rate (https://business.udemy.com/partner-with-udemy/). Multi-site, transfer: NOT FOUND.

## domestika
- Page https://www.domestika.org/en/affiliates (about 1,228 days): 30-day cookie; recurring purchases earn 20% commission (new-purchase rate not read). Join by sending a proposal via the Domestika affiliate form; team reviews and contacts you (https://support.domestika.org/hc/en-us/articles/360003374557-How-can-I-join-the-Affiliate-Program). Wants channels related to the creative sector. Network: NOT FOUND. Multi-site, transfer: NOT FOUND.

## classbento
- NO affiliate/publisher program found. ClassBento pages describe a supply-side model: 20% of listing price from the marketplace, 3.9% + $0.30 for bookings via the provider's own widget (https://classbento.com/teach, page age 5 days). Status: reject for the affiliate register unless the owner asks ClassBento directly. Do not link as monetized.

## viator
- Partner Resource Center https://partnerresources.viator.com/ : 8% commission on completed bookings, 30-day cookie, commission paid once the experience has been completed; affiliate tools include widgets, deep links, banners, Viator Shop, Affiliate API (https://partnerhelp.viator.com/en/articles/69-how-much-will-i-receive-in-commission-for-bookings-made-from-my-referrals, 239 days old). Misusing tracking parameters can lose commission (https://partnerresources.viator.com/blog/attribution/). Payment minimum, multi-site, transfer: NOT FOUND (a help article lists thresholds but I did not open it).

## getyourguide
- Partner signup https://partner.getyourguide.com/en-us/signup : "minimum commission rate of 8%, paid monthly" for website/blog partners (https://partner.getyourguide.com/en-us/travel-writers/). Partner Terms: commission is set in the Partner Portal; no scraping, data mining or AI use of GetYourGuide content (https://www.getyourguide.com/c/partner-terms-and-conditions, 839 days old). Cookie, payment minimum, multi-site, transfer: NOT FOUND. Network: GetYourGuide's privacy page names Awin and Conversant as affiliate-network service providers.

## ascend (Ascend by Partnerize, formerly Pepperjam)
- Sign up https://www.ascendpartner.com/affiliate/registration : form needs name, email, a 25+ character description of your site or social presence, primary channel URL, address, phone; accept Publisher Service Agreement; age 18+; reviewed usually within 24 hours (page age about 926 days). Free? NOT FOUND. Commission/cookie: per brand. Multi-site, transfer, payment minimum: NOT FOUND.

## avantlink
- Free to join, manual compliance review of every application; needs a verified website, social account or content platform with real value; applications are not reviewed until site ownership is confirmed (https://www.avantlink.com/faq/; https://support.avantlink.com/hc/en-us/articles/204952129-Affiliate-Application-FAQ, 50 days old). Default automatic payment minimum $25; tax and payment information required (https://support.avantlink.com/hc/en-us/articles/204796409-Affiliate-Commission-Payout-FAQ, 626 days old). Terms of Use: affiliates must be 18+, supply tax ID, and notify the network when they sell a website (https://www.avantlink.com/terms-of-use/). Publishers apply to each merchant program individually; the advertiser page says only about 30% of applicants are accepted (page age about 728 days). Fits /shop/sporty-girl (pickleball, tennis, cycling brands).

## Cross-program findings useful for the sale
- No page I read says an affiliate account can be transferred to a buyer. Two say the opposite or imply it: Amazon requires prior written approval to assign the Agreement; AvantLink requires notifying the network when a website is sold. Treat every account as non-transferable and tell the buyer to apply in their own name.
- Multi-website policy: NOT FOUND for any program except what Amazon's tracking-ID system implies. Ask each program's support before telling a buyer.
- Commission and cookie values change; every figure above carries the page's age. None should be published on the site (Amazon forbids publishing commission rates; others may by contract).
