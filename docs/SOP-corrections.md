# SOP: handling a correction

1. Confirm the error against a primary source. Do not change a claim on someone's say-so alone.
2. Fix the page (article under `src/content`, or the relevant data file). Set `updatedAt` on articles.
3. Add an entry at the top of `corrections` in `src/content/corrections.ts`: date (YYYY-MM-DD), page path, what it said, what it says now. Wording is public; keep it factual.
4. Run `bunx vitest run`, `bunx tsc --noEmit`, `bunx vite build`; deploy.
5. Reply to the reporter if they gave contact details. Never publish their personal information.
6. Do not log typo or formatting fixes that do not change meaning.
