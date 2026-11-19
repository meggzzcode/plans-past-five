# A01 SEO notes

No search volumes, difficulty or CPC figures exist for any keyword here. All volume fields are **UNMEASURED**. No SERP tool was run for this draft; SERP observations below are carried from the E1 brief (written 2026-11-19 from pages the E1 author read) and have NOT been re-read or independently refreshed.

## Keywords

| Role | Keyword | Intent | Volume | Notes |
|---|---|---|---|---|
| Primary | junk journal supplies for beginners | Commercial investigation + informational | UNMEASURED | Single intent per E3 headline rule 2. In the H1, meta title and slug stem. |
| Secondary | what do you need for junk journaling | Informational, supplies | UNMEASURED | Answered by "The complete first-spread list" and the FAQ. |
| Secondary | junk journal supplies list | Commercial investigation | UNMEASURED | The table is the list. |
| Secondary | junk journal starter kit | Commercial investigation | UNMEASURED | Risk: she may want a boxed kit; the page says plainly that no kit is in the edit and why. Expect some bounce from kit-seekers (assumption). |
| Tertiary (assumption) | junk journaling supplies, scrapbooking supplies for beginners, washi tape for journaling | Informational / commercial | UNMEASURED | Scrapbooking is folded in as one short section, not a second intent. Do not chase "scrapbooking supplies" as a head term from this page. |

Slug: `junk-journaling-supplies-for-beginners` (E1: keep the old slug that matches the commercial query). Note the slug says "journaling" while the primary keyword says "journal": a small mismatch, accepted to preserve the URL; the on-page copy uses both.

## SERP observations (carried, not re-verified)

- E1 states page one for junk-journal supplies is brand craft blogs (Stampin' Up, Salvaged Living), shop-owned lists (Benable) and 101planners: text lists, none a single-pick-per-job visual edit; guides disagree little (journal, glue, scraps).
- Implication (assumption): the opening is design and honesty (what to skip, empty slots stated) rather than new facts.
- Not observed: featured snippets, People Also Ask, image packs, shopping modules. Check before publishing.

## Title and meta rationale

- Meta title (59 chars): "Junk Journal Supplies for Beginners: The Small, Pretty Edit". Leads with the searchable noun phrase (E3 rule 1), keeps "Small, Pretty" as the voice. Uses "Journal" (the more common phrasing, assumption, UNMEASURED) in the title; the H1 uses the E1 working title with "Starter Edit".
- Meta description (150 chars): promises one core kit, three looks, and what she already owns; no price, no "best", no commission claim.
- Rule check: no brand names in the title (E3 rule 6), no inflated numbers, 50 to 65 characters.

## Schema suggestions (for the developer; none implemented)

- `Article` (headline, datePublished, dateModified, author as Person/Organization placeholder, image).
- `BreadcrumbList` (Journal > The Paper Edit > this page).
- `FAQPage` for the five FAQ questions. Caution: Google restricts FAQ rich results for most sites; low expected value, low cost.
- **Do NOT mark up `Product`, `Offer`, `AggregateRating` or `Review`.** We hold no prices, ratings or reviews and have tested nothing; such markup would imply them. An `ItemList` of the recommended products is acceptable only if each item is a plain name with no offer data (optional, low value).
- `rel="sponsored"` (or `sponsored nofollow`) on every Amazon link; confirm the renderer does this.

## Cannibalisation note vs A02 (How to Start Junk Journaling, `/journal/how-to-start-junk-journaling`)

- Separate intents: A01 = what to buy (commercial); A02 = how to make a first spread (informational). Primary keywords do not overlap: "junk journal supplies for beginners" vs "how to start junk journaling".
- Overlap risk: "what do you need for junk journaling" could land on either. A01 owns it (supplies list). A02 should answer it in one sentence and link to A01.
- Product sets are disjoint by design: A01 = Strathmore hardbound, Tombow runner, mt washi, Micron, Rifle; A02 = Strathmore softcover and a Zebra pastel set. This also avoids two near-identical product pages.
- A01 should not carry step-by-step instructions (A02's job); the closing here points to the first action only.
- Old URL handling: `how-to-start-junk-journaling` and `junk-journaling-supplies-for-beginners` both keep their slugs per E1; no redirect needed for A01.
- Check after launch (Search Console, if connected): queries where both URLs appear; adjust internal anchor text.

## Internal-link anchors (see LINKS-AND-TOOLS.md)

Use descriptive anchors ("how to build your first spread", "junk journaling hobby guide"), not "click here". Avoid exact-match "junk journal supplies for beginners" anchors from A02 pointing to A01 more than once.
