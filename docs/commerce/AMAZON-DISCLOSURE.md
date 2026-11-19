# Amazon Associates disclosure wording (read 2026-11-18)

Source: Associates Program Operating Agreement, section 5 "Identifying Yourself as an Associate", https://affiliate-program.amazon.com/help/operating/agreement (read in the owner's signed-in Chrome 2026-11-18).

Required wording (the Agreement says to state it "clearly and prominently", or a substantially similar statement previously allowed, on the Site):

> As an Amazon Associate I earn from qualifying purchases.

Other points from the same section and the Program Policies:
- Except for this disclosure and as required by law, no public communication about the Agreement or participation without Amazon's written permission (so do not publish commission rates or earnings).
- The Policies also require compliance with disclosure laws, naming the FTC endorsement guides (Participation Requirements).
- Do not misrepresent the relationship with Amazon; Amazon marks may be used only per the Trademark Guidelines.

For Claude Code: compare `AMAZON_ASSOCIATE_STATEMENT` in `src/config/affiliate.ts`; it should equal the sentence above, first person singular ("I"), ending with a full stop. `AMAZON_PROGRAM_STATEMENT` (longer text) is not prescribed by Amazon in the pages read; keep it consistent and do not claim approval until the owner has Amazon's final acceptance.
Placement: "clearly and prominently" has no more precise rule in the text read.

MISMATCH FOUND: `src/config/affiliate.ts` currently reads "As an Amazon Associate **we** earn from qualifying purchases." The Agreement sentence is "As an Amazon Associate **I** earn from qualifying purchases." Replace "we" with "I" (Claude Code to apply; I did not edit code).
