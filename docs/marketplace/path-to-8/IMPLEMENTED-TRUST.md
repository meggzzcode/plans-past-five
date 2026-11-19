# Trust implementation (P2 steps 2, 3, 5)

## Done
- **A. Published by.** Optional config in `src/config/site.ts` (`publisherName`, `publisherEntityType`, `publisherAddress`, `publisherUrl`), all empty. One helper `src/lib/publisher.ts` plus `PublishedBy` component render "Published by <name> (<type>), <address>." in the footer, About, Contact, Terms and Privacy, only when `publisherName` is set (renders nothing otherwise). `docs/buyer/PUBLISHER-SETUP.md` (three options, no legal advice, owner decides). Cowork task C19 added (runs only after the owner names the state; dated, sourced).
- **Pre-publish check.** `src/test/publisher-trust-links.test.tsx` warns (console) listing owner fields still empty (contact email, publisher name/address, legal owner name) and fails if a set value looks like a placeholder or the publisher URL is not https.
- **B. "How we make this".** `NAMES.howWeMake` in `nav.ts`; small link to `/editorial-policy` under every article byline and in the footer. Neither the label nor surrounding text mentions AI; the disclosure stays only on the Editorial Standards page. Tests cover this.
- **C1. Sources and last checked.** Article template: visible "Sources" list (titles linking out, collapsible, open by default), "Facts last checked <verifiedAt>" (also shown when there are no sources but a verified date exists), and a "How we check" link to `/methodology` on every article. "Updated <date>" appears in the byline only when `updatedAt` exists (none do today); no dates were added or changed.
- **C2. Superlatives.** 34 edits across 19 published articles (best, perfect, perfectly, ultimate, guarantee, the only) rewritten into specific, still-warm wording (for example "a satisfying first evening", "a strong fit for a proper shared conversation"). Title "How to Plan the Perfect Aesthetic Picnic" is now "How to Plan a Dreamy Aesthetic Picnic" (slug unchanged, so links and URLs still work; italic phrase kept). Hooks, facts, sources and image references untouched. Written through `articleToJson`, so the files stay in canonical format.
- **C tests.** `src/test/no-unsupported-claims.test.ts` fails on banned words in published titles, deks and body (explicit, empty title allowlist). Updated the old source-string assertion in `trust-format.test.tsx`.

## Skipped, with reasons
- Real publisher name, address, URL and contact email: owner facts, left empty by rule.
- Changelog page: not requested.
- Softening mild comparatives such as "easiest" or "most": these describe ideas, not product rankings, and the brief named best/perfect/ultimate/guaranteed/the only.
- Full-route jsdom render test of the article page: the app root waits on stylesheets in jsdom and hangs, so the template is checked as source and in a real browser.
- Google's note that AI use should be disclosed "where readers would wonder" conflicts mildly with disclosure-only-on-Editorial-Standards; the labelled link on every byline and footer is the agreed compromise. Owner to confirm.
