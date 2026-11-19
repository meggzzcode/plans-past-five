# R2-4 Affiliate Program Manager review: Plans Past Five

Note: these are simulated reviewer opinions (persona: affiliate program manager at a retailer vetting a site for program entry), not real customer data. Tested at 1280x800 on http://127.0.0.1:5950 with Playwright, reading live page text and link targets. No clicks to external sites, nothing bought or submitted.

## Task 1: Is it a real editorial publication? Outcome: partly
Steps: read home nav and footer, then About, Editorial Standards, How We Choose, Corrections, Contact, Privacy, Terms, Affiliate Disclosure.
- Present and substantive: About, Editorial Standards, Methodology ("How We Choose"), Affiliate Disclosure, Corrections (with policy and an empty log), Privacy, Terms. All linked in a footer "The fine print" block. robots.txt and a 92-URL sitemap exist.
- Byline: every story is "By The Plans Past Five Editors". About explains this is deliberate ("no single named author on purpose"). For a retailer vetting a publication this is a weakness: no named editor, no publisher or company entity, no address, no staff page, no credentials. It is honest, but it reads as anonymous.
- Dates: all 27 stories carry a publication date, but 26 are dated 18 or 19 November 2026 (today), so there is no publishing history. Each has a collapsed "Sources and when we checked" with "Facts last checked" (18 Nov). Nothing shows an older back catalogue; looks like a site launched in a day.
- Sources: real, relevant primary sources (USTA, Iowa State / Illinois / Minnesota Extension, ASPCA, NEDCC, ACMI, CPSC, FARE). Good. Sources are hidden in a collapsed section, easy to miss. One odd source in the tennis story: a USTA "wounded warrior curriculum" PDF cited for grip advice.
- Contact is NOT usable (see Task 4), which undermines "real publication".

## Task 2: Three articles, claims, sources, affiliate framing. Outcome: done
Read: "25 Things to Do After Work Instead of Scrolling" (18 Nov), "How to Start Playing Tennis as an Adult Beginner" (19 Nov), "How to Host a Craft Night With Friends" (19 Nov). I also scripted a scan of all 27 stories for bylines, amazon links, markdown artefacts, ratings words and first-person claims.
- Claims are generic and low risk (tennis scoring, clay drying 2-3 days, ACMI AP/CL seal advice, allergy cautions, "see a doctor if arm pain persists"). Tennis scoring matches USTA. No health claims, no invented experiences, no "I tried" or testimonials found. The only first-person hit was inside a quoted prompt ("one piece of tableware I love").
- Product relevance: strong. Gear is framed as optional ("borrow first", "play a few times first, then buy"), "no-spend swap" and "no-spend alternative" appear. This is better restraint than most affiliate sites.
- Link types: articles mostly use "Browse options on Amazon" (an Amazon search URL such as /s?k=beginner+tennis+racket+adult). Dedicated shop pages and some stories (junk journaling supplies, mahjong, craft/paint night) use "View on Amazon" with specific /dp/ ASIN links (e.g. Scotch glue sticks, Pigma Micron pens, UHAPEER clay kit). Labels match destinations. External non-Amazon links go to the cited .gov/.edu/.org sources.
- Disclosure placement: a note sits directly under the shop block in articles and under the hero of shop pages: "Buttons that say View on Amazon open a named product's own page... We show no prices... We don't currently earn from these links. Disclosure" with a link. Consistent on every page I checked. Caveat: the home page carries it too, but it is in small text.
- Minor copy bugs: in the "25 Things" story, "low-energy hobbies has more gentle ideas" (grammar, auto-inserted link text). Tennis story says "Nice to have (4)" and "See all (4)" with little context.
- Observation: stories are ~1,000-1,500 words each of plain listicle/guide content; useful but fairly generic and templated (same "short version", "what you'll need", shop block). Not thin, but little original reporting or voice.

## Task 3: Policy red flags. Outcome: done
- Prices: none shown on affiliate surfaces. Only rough cost bands in hobby copy ("Under $25 to start"), which are editorial estimates, not retailer prices. Acceptable.
- Ratings/review counts: none. Searched for stars/ratings; hits were the word "star" in non-review contexts (e.g. "Stars" in a reading journal). Methodology explicitly forbids them.
- Fake testimony: none found. Site states it will not invent experiences or testing, and says products have NOT been tested ("Manufacturer claims versus independent testing"). Honest.
- Misleading claims: claim that named products were "checked against their Amazon listing" is unverifiable by me. The affiliate-disclosure page says Amazon links are "ordinary Amazon links" and the site "does not currently earn" from them. For my program this is the central fact: the site is not yet affiliated and says it would update disclosures if that changes. Good for compliance, but it means the commission-link disclosure language does not exist yet in its final form ("note beside the links changes automatically" is a promise, not something I could test).
- AI disclosure: Present and fairly clear, on Editorial Standards under "How we use AI and images": AI used "to help with research, content development, organization and website operations"; images made with AI; no claim of firsthand experience or human review that did not occur. Also noted on Methodology (collection illustrations "made with AI tools") and the shop hero caption "illustrative styling, not specific products". Weaknesses: it is on a policy page only, not on the article byline or footer; the wording is vague on how much text is AI-generated (a stricter reviewer would want "most text is AI-drafted" stated plainly), and "do not claim ... human review that did not occur" implies there may be none. About page mentions AI only via a link. I would call it disclosed but easy to miss and soft.
- Thin/duplicate: 27 stories at 800-2,000 words; no obvious duplicates, but 26 share the same date and template. 43 hobbies. Not thin, but looks mass-produced.
- Link surprises: none. All Amazon links were www.amazon.com, rel=noopener, no tracking tag, no redirects through third parties. Pinterest share exists ("Pin it").
- Missing: no Amazon-required Associates statement ("As an Amazon Associate I earn from qualifying purchases") because the site is not yet in the program. That would need adding before activation.

## Task 4: Contact and legal pages. Outcome: partly / failed on contact
- /contact says: "Our contact inbox is being set up. Please check back soon." No email address, no form, no social handle. Corrections page says "We do not have a public corrections inbox yet." So the stated corrections process cannot be used. This is the biggest blocker.
- Privacy exists and is clear (no accounts, no analytics, local storage only, Google Fonts IP note, retailer cookies). Terms exist (short, covers affiliate links). Affiliate Disclosure exists. All dated 2026-11-19. Privacy says affiliate links "may become" affiliate links.
- No company name, registered address or business entity anywhere; no jurisdiction in terms.

## Task 5: Would I approve? Verdict: not yet (conditional, pending items)
Positives: unusually honest and cautious on prices, ratings, testing and testimonials; clear link labelling; consistent disclosure near links; real sources; relevant, restrained product recommendations; full set of policy pages.
Required before approval:
1. A working contact method (monitored email or form) and a corrections inbox; link it in footer.
2. A named publisher/legal entity and either a named editor or accountable contact; about the AI-assisted workflow, state it plainly (what is AI-drafted, who reviews).
3. Some publishing history or traffic evidence (all content is 1-2 days old); I'd ask for analytics or a reapply after 60-90 days.
4. Final affiliate disclosure wording on every commission page (e.g. "As an Amazon Associate...") plus matching updates to Terms, Privacy, Methodology. Verify the "automatic note change" actually works.
5. Surface sources and AI disclosure more visibly (not collapsed).
6. Fix the copy glitches noted.

## What delighted me
- The disclosure sentences next to every shopping block, and the plain-English "we show no prices or ratings".
- "No-spend alternative" and "borrow first" framing: recommendations do not feel pushy.
- Real, checkable sources (.edu/.gov/.org) per story.
- Clean design that looks like a real magazine at 1280x800; hero image and shop pages render well.

## What made me hesitate
- Contact inbox "being set up" and no corrections inbox.
- Anonymous "Editors" byline, no entity, everything dated the same two days.
- AI use disclosed only on a policy page, in vague wording.
- Site currently earns nothing, so there is no live affiliate disclosure to audit.
- Content is generic and templated.

## Top 8 fixes ranked by impact
1. Publish a working contact email/form and corrections inbox.
2. Add a named publisher/entity and accountable person, with address or jurisdiction.
3. Make AI use explicit and visible (footer line, about page, story footer) with specifics.
4. Build content history (backdate nothing; just publish over time) and add analytics.
5. Prepare final affiliate wording (Associate statement) and align Privacy/Terms/Methodology.
6. Expand sources visibility (expanded or "Sources" jump link in the "In this story" nav).
7. Fix copy glitches (e.g. "low-energy hobbies has more gentle ideas", "(4)" counters) and the unusual USTA wounded-warrior source.
8. Add some differentiated editorial voice or original material beyond templated listicles.

## Scores (1-10, simulated)
| Dimension | Score | Evidence |
|---|---|---|
| First impression | 8 | Polished editorial home, clear nav, honest shop line visible on home |
| Aesthetic appeal | 8 | Cohesive magazine look, good type and photography at 1280x800 |
| Navigation | 8 | Clear header, sub-nav, footer fine print block; no broken links seen |
| Editorial authenticity | 5 | Good sourcing, but anonymous byline, same-day dates, templated pieces |
| Usefulness | 7 | Practical beginner plans, costs, no-spend options |
| Trust | 6 | Honest policies, but no working contact and no entity |
| Product desirability | 6 | Sensible, low-key picks, modest specificity |
| Willingness to purchase | N/A | Persona does not shop; links not clicked |
| Willingness to return | 6 | Pleasant, but little distinctive voice |
| Willingness to share | 6 | Shareable tools and guides; not strong enough to evangelise |
| Business credibility | 4 | No entity, no contact, no traffic or history |
| Buyer readiness | 5 | Policies ready, contact and affiliate setup not |
