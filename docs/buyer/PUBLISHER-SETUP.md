# Publisher setup: who is "Published by"

The site can show one honest line: "Published by <name>, <address>." It appears in the footer and on About, Contact, Terms and Privacy, and only after you fill in the settings below. While they are empty, nothing is shown and nothing is invented.

This page is a plain-language guide, not legal or tax advice. The choice is yours. If you are unsure which option fits, ask a lawyer or accountant in your state or country.

## Where the settings live

`src/config/site.ts`:

- `publisherName`: the name to show. Required for the line to appear.
- `publisherEntityType`: optional free text such as "sole proprietor", "DBA" or "LLC". Shown in brackets after the name.
- `publisherAddress`: optional, a real postal address, PO box or registered-agent address you can receive mail at.
- `publisherUrl`: optional, an https:// page for the publisher.

Also fill in `legal.ownerName` and `legal.jurisdiction` with the same details so Terms and Privacy match the footer. The wording comes from one helper (`src/lib/publisher.ts`), so it is identical on every page.

Run `bunx vitest run src/test/publisher-trust-links.test.tsx` before publishing: it prints a warning listing any owner-supplied fields that are still empty.

## The three honest options

1. **Your own name.** Publish as yourself ("Published by Jane Doe"). Needs nothing to be filed. You are personally the publisher, and an address is shown only if you choose to give one (a PO box or mail-forwarding address you really use is acceptable; never show a borrowed or made-up address).
2. **A sole-proprietor business name (DBA / "assumed name").** You trade under a name such as "Plans Past Five" while remaining the owner. Many places require a registration or filing for a trade name; rules, fees and where to file vary by state, county or country. You will need the filing receipt or number and a mailing address.
3. **A registered company (for example an LLC).** A separate legal entity registered in a state. You need the exact registered name, the state, a registered agent, a business address, and ongoing filings and fees that vary by state. Use the exact registered name, including "LLC".

Whichever you pick, state only facts: who owns the site, where, and how to reach them. Do not add a biography, credentials or a person who does not exist.

## What you need to decide

- Which option, and the exact name to show.
- Whether to show an address, and which one you can reliably receive mail at.
- The same name must be used in the affiliate programme applications and in the Terms and Privacy pages.

## Researching the filing

Tell the assistant which state (or country) you are in, then run a pending follow-up task listed in `docs/cowork` in `docs/cowork/PLANS-PAST-FIVE-COWORK-TASKS.md`. It reads the current official rules for DBA and LLC filing there, with dates, and reports them. Nothing is filed or paid for by the assistant.
