# Pinterest strategy

Status at 2026-11-19: no Pinterest account is confirmed, `site.social.pinterest` in `src/config/site.ts` is empty, and the site is pre-revenue and not yet public. Everything here is a plan. No follower, impression or traffic figure exists and none is claimed. Account setup steps live in `docs/buyer/PINTEREST-SETUP.md` (another worker is writing it; check it exists). The pin list is `docs/pinterest-pins.csv`, produced by another worker; this page defines the concepts that file should follow. Pin images exist in `public/pins/` (95 files at the time of writing, 2026-11-19; the generator is in `design/pins/`). Check both against the CSV before posting. Pins in the CSV carry UTM parameters on `tracked_url`; those go on pin links to our own pages only, never on affiliate or retailer links.

Why Pinterest fits: the topics (hobbies, supplies, hosting ideas, weekend plans) are visual and planned ahead. That is a guess about fit; test it, and judge by the owner's own analytics later (`docs/buyer/ANALYTICS-SETUP.md`).

## Principles

1. **Pins point to articles, not to Amazon.** A pin's destination is `https://<site.url>/journal/<slug>` (or a section, tool or printable route). The article is where context, honest advice and disclosure live. Never link a pin straight to an affiliate or retailer URL.
2. **No engagement tricks.** No follow-for-follow, pin-for-pin groups for the sake of numbers, comment bait, fake "limited time", fake scarcity or clickbait that the article does not deliver. Do not buy followers or saves.
3. **Honest pin copy.** The title and description say what the article really contains. No prices, ratings or claims we have not verified. No "tested" unless someone did.
4. **Original images.** Use images the project owns or has licensed (`docs/IMAGE-LICENSES.md`), plus designed text overlays. No copied retailer or competitor photos. See `docs/buyer/IMAGE-AND-ASSET-RIGHTS.md` (another worker) when present.
5. **Read the platform's current rules.** Pinterest's content and automation policies change. PENDING COWORK: read the current official guidelines and record any constraint on bulk or scheduled pinning, affiliate disclosure on pins, and link policies.
6. **Disclosure.** If a pin ever links straight to a monetized product page, disclosure must be on the pin. We do not do that. Disclosure for the article is on the article.

## Three pin concepts per article

Each article gets three concepts, written in the pins CSV with different titles and different images, all linking to the same article:

| Concept | Purpose | Looks like | Title style |
|---|---|---|---|
| Search-focused | Answers the question someone would type into Pinterest search | Clear text-led layout (magazine cover or editorial list style from `CLAUDE-HANDOFF.md`), the keyword phrase near the top | "How to Start Air-Dry Clay (Beginner Supply List)" |
| Aspirational | Sells the feeling of the life | A moodboard or flat lay in brand colors, little text | "A Cozy Creative Evening, Planned" |
| Practical | Gives a useful chunk at a glance | A checklist, step list, "what you need" or printable preview | "What You Actually Need for Junk Journaling" |

Rules for every pin: one idea; vertical 1000x1500 (the size used in `CLAUDE-HANDOFF.md`); readable text on a phone; one destination; alt text that describes the image; description that is plain language with natural keywords, not a keyword list. Hashtags are optional and should be few.

Example concept set for a flagship (illustrative; the real pins are in `docs/pinterest-pins.csv`): search pin "Junk Journaling Supplies for Beginners: What You Actually Need"; aspirational pin "Junk Journal Flat Lay"; practical pin "Essentials, Optional, Probably Own: Junk Journal Edition".

## Boards (proposed, not created)

Align boards with the site sections (`src/data/categories.ts`):
- Creative Corner (crafts and making)
- After Hours (weeknight hobbies)
- The Weekend Edit
- Table for One (solo dates)
- Better Together (hosting and friend plans)
- A Little Movement
- Starter Kits and Supplies (kit-style guides; keep descriptions honest: curated lists, not bundles)
- Printables (the three printables in `src/data/printables.ts`)

Each board gets a plain, keyword-aware description. Pin each new article to its section board first, then to a secondary board only if it truly fits. Do not pin the same image to ten boards.

## Cadence (recommendation, not a promise)

Publish an article, then create its three pins, and pin them spaced over days or weeks rather than all at once. Re-pin evergreen articles with fresh images from time to time. PENDING COWORK: what cadence does Pinterest's current guidance recommend for new accounts? Do not copy numbers from third-party blogs.

## Measurement

Use Pinterest's own analytics plus the site's analytics (`docs/buyer/ANALYTICS-SETUP.md`) to see which pins send readers who stay. No targets are set because nothing has been measured. Do not judge a pin by saves alone.

## Seasonal planning

Pin seasonal articles ahead of the season, since people tend to plan ahead on Pinterest (a general guess; verify with Pinterest Trends, PENDING COWORK). See `docs/marketing/CONTENT-DISTRIBUTION.md`.

## Pins already conceived

`CLAUDE-HANDOFF.md` lists 14 early pin concepts (magazine cover, editorial list, scrapbook guide, moodboard, printable preview). Treat them as seeds; they predate the three-concept rule above.

## PENDING COWORK

1. Current Pinterest rules on affiliate links, automation, and spam; record URL and date.
2. Does the owner need a business account and domain claim for Rich Pins or analytics? Steps and requirements from the official help pages (the repo supports a verification meta tag via `site.integrations.pinterestVerification`).
3. Pinterest Trends and search-suggestion checks for each article's primary keyword, dated.
