# Walkthrough video script (4 to 6 minutes)

Status: **no video has been recorded.** This session had no screen-recording tool. The script and `SHOT-LIST.md` are ready so the recording can be made later by Cowork (task C9 in `docs/cowork/PLANS-PAST-FIVE-COWORK-TASKS.md`) or by anyone with a screen recorder.

Rules for narration: describe what is on screen. Say the site is pre-revenue and not yet launched. Make no statement about traffic, audience, rankings or earnings, and do not predict any. Record from a local or staging build, and say so on screen or in the opening line.

Target length about 5 minutes at a relaxed pace (roughly 700 words of narration). Timings are guides.

---

## 0:00 Opening (homepage) [Shots 1-2]

"This is Plans Past Five, a lifestyle site for women who want hobbies, weekend plans and friendships outside work. It is pre-revenue and not yet launched, so what you'll see is the built site running locally, not a live business. Brand line: making a life, not just a living."

Scroll the homepage slowly. Point at the hero, the six section tiles and the shop block.

## 0:40 Navigation [Shots 3-4]

"The main navigation has Find a Hobby, After Hours, Weekends, the Journal and the Shop. Under the hood there are six editorial sections: After Hours, The Weekend Edit, Table for One, Better Together, Creative Corner and A Little Movement." Open one section page, then shrink the window or use the phone width to show the menu works on mobile.

## 1:10 Article experience [Shots 5-6]

"The Journal holds published articles only. Here is one: how to start junk journaling. Notice the structured blocks: what you'll need, a first-30-minutes list, save-or-splurge notes, and a clear affiliate note. 27 articles are set to published on the branch; 23 of them were source-checked by Cowork, but this junk journaling guide is one of the 4 original articles that has not been source-checked yet. Five more remain drafts and stay hidden. Nothing here is deployed." Show the save button.

## 1:50 Hobby directory [Shots 7-8]

"The directory lists 36 hobbies with filters. Each has a profile: why you'd like it, time and cost labels, and related reads. Costs are estimates, not live prices."

## 2:15 Find Your Thing quiz [Shots 9-10]

"Seven questions, no email. Answer a few, show the progress bar, then the result: matched hobbies with a first step. It is a playful guide, not a personality test."

## 2:45 Activity planner [Shots 11-12]

"Make Some Plans builds an itinerary from curated ideas around your time, vibe, company and budget. There are no invented events or opening hours. A plan can be saved to My Plans, which lives in this browser only." Also show the two small tools: the Hobby Starter Budget and Tonight (shot 13).

## 3:30 Shopping experience [Shots 14-15]

"Off Duty Essentials has eight collections. It is curated, not a store: nothing is sold on this site. Product records name types of items; 37 verified Amazon products have been checked against their listings, not tested by us, and linked with ordinary Amazon links; type cards still use plain Amazon searches. No affiliate program is active."

## 4:25 Affiliate configuration [Shots 16-17]

"Monetization is designed to be switched on by the buyer with their own accounts. All affiliate logic lives in one file, `src/config/affiliate.ts`. Every entry ships empty: no tracking IDs, not active, not approved. The activation steps are in `docs/buyer/AFFILIATE-ACTIVATION.md`. The seller's own accounts are not included, and approval is never guaranteed."

On screen: open `src/config/affiliate.ts` (registry at the top) and `docs/buyer/AFFILIATE-ACTIVATION.md` (the "Activate Amazon" steps). Then show `/affiliate-disclosure`.

## 5:05 Content management [Shots 18-19]

"Everything is plain files. Articles: `src/content/`. Hobbies: `src/data/hobbies.ts`. Products and collections: `src/data/products.ts`. Brand copy: `src/config/site.ts`. The how-to is `docs/buyer/CONTENT-MANAGEMENT.md`, and publishing follows `docs/SOP-publish-article.md`."

## 5:35 Close [Shot 20]

"That's the site: built, documented and honest about its status. It is pre-revenue and not launched, with no traffic history, and affiliate approval is not guaranteed. Start with `docs/buyer/START-HERE.md`."
