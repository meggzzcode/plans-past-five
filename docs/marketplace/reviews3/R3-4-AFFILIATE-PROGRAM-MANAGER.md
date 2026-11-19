# R3-4 Affiliate Program Manager review: Plans Past Five

NOTE: These are simulated reviewer opinions from an independent pass, not real customer or program data. Desktop 1280x800, Playwright, live site at http://127.0.0.1:5950. Nothing was clicked through to external sites; I read the hrefs. No repo files were edited.

## Method
Dumped visible text and every link on all 92 sitemap URLs (30 journal stories, 38 hobby pages, 7 shop collections, tools, legal/trust pages). Read three stories in full (paint night, cycling, starter kits), opened collapsed "Sources" panels on three more, screenshotted one story.

## Task 1: Is it a real editorial publication? Outcome: partly
- Trust pages all exist and are linked in the footer on every page: About, Contact, Affiliate Disclosure, Editorial Standards, How We Choose (methodology), Corrections, Privacy, Terms. This is above average for a new site.
- Authorship: every story is "BY THE PLANS PAST FIVE EDITORS". About says "no single named author on purpose". No named editor, no masthead, no company/legal entity, no address. For a program manager this is the weakest identity signal: I cannot tell who is behind it or who to contract with.
- Dates: 23 stories dated Nov 19, 2026 and 4 dated Nov 18, 2026 (today is Nov 19). Every page's "last updated" is 2026-11-19. The whole archive appears to have been published within 48 hours. Honest, but it reads as a launch batch with no track record, and no traffic/age history I can verify.
- Sources: collapsed "Sources and when we checked" on stories lists real authorities (CPSC, ACMI, FARE, Iowa State Extension, ASPCA, CDC, NHTSA, REI) with a "Facts last checked" date. That is genuinely good. Sources are in a collapsed panel; 21 of 30 story pages contain it, so about 9 stories have none (I did not verify which topics need one).
- Corrections page exists with a policy and an empty log ("No corrections yet").
- Corrections and Contact both say the inbox "isn't open yet". See Task 4.

## Task 2: Three articles. Outcome: done
1. How to Host a Paint Night at Home. Practical, plausible, safety-aware (ACMI AP/CL seal, allergies, paint-water disposal). Two named products with brand and ASIN links (ESRICH canvases, Benicci brushes), each with "Why we picked it" drawn from the listing ("listing says pre-coated with gesso"). Relevant and modestly framed. Disclosure sits directly under each product block: "Ordinary Amazon links. We show no prices... We don't currently earn from these links. Disclosure". Opening line "Picture it: six friends round one table" is a scene, not a claimed experience.
2. How to Start Cycling Again as an Adult. Heavily sourced (10 government/industry links incl. CDC, NHTSA, CPSC, REI). Hedges well ("check your local rules"). Helmet-replacement advice defers to maker. No fabricated testimony.
3. Are Craft Starter Kits Worth It? Explicitly "doesn't rank named kits, and nothing here comes from hands-on testing". Product cards are search links ("Find embroidery starter kit on Amazon"), labelled differently from named-product links ("See it on Amazon"). Disclosure repeats under the block.
- Claims are generic and low-risk; no stats invented. Date/staleness: all fresh. Disclosure is consistent site-wide in wording.
- Weakness: "A strong candidate for a kit", "Often worth buying loose" is opinion without evidence of testing; fine because they say they did not test.

## Task 3: Policy red flags. Outcome: done
- Prices/ratings: none shown. The "$" strings (about 50 pages) are budget bands such as "Under $25 to start" or the budget tool, not product prices. Good for most programs (no stale-price or Amazon price-display problems).
- Fake testimony/experiences: none found. Searched for "I tried / I tested / we tested": nothing. About and Editorial Standards promise none. Strong.
- Links: 269 Amazon hrefs. Two kinds: ASIN (/dp/B...) for named products and amazon.com/s?k= searches for generic items. None carries a tag= parameter, so there is no affiliate tracking at all currently (consistent with the stated "we don't currently earn"). All have rel="noopener" only. If activated they must add rel="sponsored" (and nofollow). External sources use noopener noreferrer, fine. Some image-only links have empty text (accessibility and label issue). Many search links repeat (pocket notebook pack on 13 pages), so the shop is heavily templated.
- Link labelling: "See it on Amazon" vs "Find ... on Amazon" is a clear, honest convention, explained on the disclosure page.
- Thin/duplicate content: stories are substantive (4 to 6 min, structured), hobby pages are templated (time/cost/space/company plus first session). The same product blocks recur across stories and shop pages. Not thin, but repetitive and formulaic.
- AI disclosure: present but buried. Stated in About ("how we use AI tools is explained on the editorial standards page"), Editorial Standards ("We use AI tools to help with research, content development, organization and website operations... images created with AI tools and depict no real people or brands") and Methodology (illustrations AI-made). It does NOT appear on any story page or byline (word "AI" absent from the story text I checked) and not in the footer. The hero photo on the paint-night story is photoreal (a woman painting) with no caption saying it is AI-generated. A reader or partner reviewing a story would not know. The phrasing "do not claim ... human review that did not occur" is slightly evasive: it does not say whether a human edits or fact-checks. This is the most likely compliance objection.
- Contradictions: Terms says "we ... may earn a commission on some purchases" and Privacy says links "may become affiliate links... so we can earn a small commission"; the Affiliate Disclosure and every link note say "we don't currently earn". Reconcilable (future tense) but sloppy. Privacy also says no analytics; fine.
- Raw markdown / leaked notes: none seen. 404 page is friendly.

## Task 4: Contact and legal pages. Outcome: failed on contact, done on legal
- Contact page: no email, no form, no address, no social. "Our public inbox isn't open yet, and we won't show an address until it is." The Corrections page says the same. I cannot contact the publisher, and readers cannot report errors, so the corrections policy is not actionable. This alone blocks most affiliate programs (they require a working contact and a reviewable ownership trail).
- Privacy, Terms, Affiliate Disclosure exist, are readable, dated 2026-11-19, and in the footer. Privacy and Terms are short and plain; no company name, jurisdiction, governing law, or Amazon Associates mandatory statement ("As an Amazon Associate I earn from qualifying purchases"), which would be required if tracking links go live.

## Task 5: Would I approve? Not yet (conditional "revisit").
Reasons to like it: no prices/ratings, no fake experiences, honest "not tested" framing, labelled link types, consistent per-block disclosure, real government/extension sources, full trust-page set, relevant contextual product matches (kit for paint night, helmet for cycling).
Required before approval:
1. A working public contact email (and a way to submit corrections).
2. Named responsible party: publisher/company name, location, at least one named editor with a bio, so authorship is not wholly anonymous.
3. A visible AI-use note on story pages (byline line or footer link) and image captions or an "AI-generated illustration" label on photoreal images; say who reviews/edits and fact-checks.
4. Traffic and site-history evidence; 30 stories all dated within 48 hours is a launch batch, so I would want a few weeks of publishing cadence and real audience before approving.
5. Align Terms/Privacy wording with the disclosure; add the program-required Associate statement and rel="sponsored" on activation; confirm disclosure placement stays above the fold of each affiliate block once links are tagged.
6. Fix empty link text and repeated generic-search padding.

## What delighted me
- The no-prices / no-ratings / no-invented-experience stance is explicit and actually followed.
- "See it on Amazon" versus "Find ... on Amazon" labelling, with a plain-English explanation.
- Real sources with "facts last checked" dates, and an honest "we haven't tested these" line.
- Disclosure placed immediately beside each product block, not just in the footer.

## What made me hesitate
- No way to contact anyone. No named people or entity.
- Whole archive created in two days; zero history.
- AI use disclosed only on policy pages, photoreal images unlabelled in context.
- No affiliate tracking exists yet, so I am approving a promise, not a live integration.
- Heavy templating and repeated product blocks.

## Top 8 fixes ranked by impact
1. Publish a working contact email and correction route.
2. Name the publisher/entity and at least one accountable editor; add a masthead.
3. Put an AI-use statement on every story (byline-level) and label AI images in context.
4. Build publishing history over time; stagger dates, show real updated dates.
5. State human review/fact-check practice plainly.
6. Reconcile Terms/Privacy/Disclosure commission language; add Associate statement and rel="sponsored" before enabling tags.
7. Give every story a visible (not collapsed) sources section, and add it to the roughly 9 stories lacking one.
8. Reduce repeated generic Amazon search links and fix empty link labels.

## Scores (1-10; simulated)
| Dimension | Score | Evidence |
|---|---|---|
| First impression | 7 | Polished, warm, clear purpose; full nav and footer trust links. |
| Aesthetic appeal | 8 | Consistent serif/sans design, clean story layout seen in screenshot. |
| Navigation | 8 | Clear nav, breadcrumbs, categories; footer holds all policy pages. |
| Editorial authenticity | 6 | Good sourcing and honesty, but anonymous "Editors", templated, all dated within 2 days, AI use only on policy pages. |
| Usefulness | 7 | Practical, safety-aware stories and starter kits. |
| Trust | 5 | Honest content, but no contact, no named entity, buried AI disclosure. |
| Product desirability | 6 | Relevant starter picks; generic search links dilute it. |
| Willingness to purchase | N/A | Not judged as a consumer; no purchases made. |
| Willingness to return | 6 | Useful for ideas; thin history. |
| Willingness to share | 6 | Share/pin tools present; content pleasant but not distinctive. |
| Business credibility | 4 | No contact, entity, address, traffic proof, or live affiliate setup. |
| Buyer readiness | 5 | Disclosure and link hygiene strong; contact, rel="sponsored", Associate statement missing. |
