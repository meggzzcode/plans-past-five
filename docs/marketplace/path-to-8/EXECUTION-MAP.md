# Execution map to 8: assuming the owner can do very little (2026-11-19)

Basis: docs/marketplace/path-to-8/PATH-TO-8.md (red-teamed) and the blind reviews. Owner decision today: **no publisher details will be supplied.** All scores are simulated-reviewer estimates, not measurements.

## 1. What "owner can do very little" changes
| Fact | Consequence |
|---|---|
| No publisher name/address | The "Published by" line stays empty (it is config-driven, so the BUYER sets their own after purchase, which fits a turnkey sale). Business credibility and authenticity lose their biggest lever: honest ceiling BC about 6, AU about 7. Never invent a name. |
| Agents may not purchase, accept agreements or enter payment/tax details | A domain, a paid mailbox, photography purchases and any listing fee are owner-only. Everything else can be done by Claude Code or Cowork. |
| Owner logins are still needed for 2FA prompts | Budget about 10 minutes, a few times. |

## 2. The owner's absolute minimum (5 small actions, about 1 hour in total)
| # | Action | Time | Unlocks | If skipped |
|---|---|---|---|---|
| O1 | Buy one domain at the owner's registrar (about $10-25/yr) and tell Cowork the name | 15 min | Live site on a real URL, mailbox, Search Console, Pinterest claim, buyer transfer | Fallback: stay on the free netlify.app address and sell WITHOUT a domain (buyer brings their own). BR drops about 0.5, TR about 0.3 |
| O2 | Create ONE mailbox for Contact/Corrections (free Cloudflare Email Routing once O1 exists, or a new free Gmail if no domain) and approve Cowork's test message | 15 min | Contact page truthful and operational (Trust +0.4 to +0.7) | Contact keeps saying "inbox not open"; Trust capped about 7 |
| O3 | Be present for 2FA/login prompts while Cowork sets up Netlify, Search Console, Pinterest, Pages CMS | 3 x 10 min | Live site, indexing evidence, proven CMS | Cowork stops at each login |
| O4 | Text 3-5 friends the usability test link/script (docs/marketplace/USABILITY-TEST-SCRIPT.md) and forward answers | 10 min | A real human score that outranks simulated ones | Only simulated reviews exist; say so to buyers |
| O5 | Say yes/no to the four standing questions: .ics export ok; keep "How we make this" link; Netlify at most 8 deploys per month; image licence statement in handover | 5 min | Unblocks final polish | Defaults used (yes, yes, 8, yes) |

Nothing else needs the owner. No photography purchase (see W2), no legal filing, no Published-by details.

## 3. Work Claude Code does (no owner time, branch first, deploys only with the release marker)
Order: (C1) planner realism + travel buffers + energy tests + 'why this plan'; (C2) link-first primary actions and loading states so a tap before hydration works; (C3) mobile reading mode (sticky mini-TOC, collapsible long sections) and LCP discipline on home; (C4) .ics download and Google Calendar link for plans (generated in the browser); (C5) Pinterest kit (2:3 pin per article/hobby, og:type article, per-route OG image, Save button); (C6) web manifest and icons (no service worker); (C7) optional device-only postcode that builds Google Maps search links per activity; (C8) rotating 'This weekend' strip (already have season strip; extend); (C9) merge 15 kits into 8 complete kits and render only kits with 4+ verified picks (after Cowork W1); (C10) image ledger + licence ledger for every image and the 'rights pack' docs; (C11) buyer docs sync (fresh-clone log, counts, Associates path, Netlify cap); (C12) real 'What changed' page; launch note; (C13) integrate new images from Cowork W2, retire repeats, vary composition and add portrait pin variants.

## 4. Work Cowork handles (owner present only for logins)
See docs/cowork/COWORK-MASTER-PROMPT-PATH-TO-8.md: W1 products (8 kits x 4-5 verified picks), W2 images (Canva originals + free licensed stock + licence log), W3 Netlify live + domain + Search Console/Bing + Pinterest (after O1, O2), W4 Pages CMS live test + recorded walkthrough, W5 read-live research checks (Flippa, Pinterest AI rule, Netlify terms, trademark knockout), W6 brand photo permission emails (drafts only; owner sends or skips), W7 blind re-review on the live URL, W8 usability-test packet for the owner's friends.

## 5. Honest target table with this owner constraint
Now = round-3 average. 'After CC' = Claude Code work only. 'After CW' = plus Cowork work. 'After owner minimum' = plus O1-O5. 'Weeks live' = 3-6 weeks indexing/history. Ceiling already assumes no publisher details.

| Dimension | Now | After CC | After CW | After owner minimum | Weeks live | Honest ceiling |
|---|---|---|---|---|---|---|
| Aesthetic | 8.0 | 8.0 | 8.3 | 8.3 | 8.3 | 8.5 |
| First impression | 7.6 | 8.0 | 8.2 | 8.2 | 8.2 | 8.5 |
| Navigation | 7.4 | 7.9 | 8.0 | 8.0 | 8.0 | 8.3 |
| Usefulness | 7.2 | 7.8 | 8.0 | 8.0 | 8.0 | 8.2 |
| Trust | 6.6 | 7.1 | 7.3 | 7.8 | 7.9 | 8.0 |
| Editorial authenticity | 6.2 | 6.7 | 7.0 | 7.1 | 7.4 | 7.6 |
| Product desirability | 5.8 | 6.2 | 7.0 | 7.0 | 7.2 | 7.5 (8 only with own photos) |
| Willingness to return | 6.4 | 7.0 | 7.0 | 7.0 | 7.3 | 7.5 |
| Willingness to share | 6.4 | 7.2 | 7.6 | 7.6 | 7.8 | 8.0 |
| Willingness to purchase | 4.8 | 5.2 | 6.0 | 6.0 | 6.4 | 6.8 |
| Business credibility | 5.2 | 5.4 | 5.6 | 6.0 | 6.3 | 6.5 |
| Buyer readiness | 5.2 | 6.2 | 7.2 | 7.8 | 8.2 | 8.5 |

Reaches 8: aesthetic, first impression, navigation, usefulness, share (about), buyer readiness (needs O1-O3). Honest near-misses: trust 7.8-8.0, desirability 7.0-7.5. Not reachable pre-revenue and without a named publisher: business credibility, willingness to purchase, authenticity, return. Do not chase them with fabricated signals.

## 6. Sequence and gates
Week 1: Claude Code C1-C8 and C10-C12 in parallel; Cowork W1, W2, W5, W6 start (no owner needed). Week 1-2: owner O1, O2, O5 (30 min); Cowork W3, W4 with O3. Release: ONE [deploy] when W1/W2/W3 pass and checks are green. Weeks 3-6: indexing and honest history; owner O4. Then Cowork W7 on the live URL and compare with the human results.
Gates before recommending a listing: live URL; operational mailbox; CMS proven (W4); every kit has 4+ verified picks; image ledger complete; human usability results recorded; blind re-review on live URL reported unadjusted; no claim outside the 'what we can say' list.
