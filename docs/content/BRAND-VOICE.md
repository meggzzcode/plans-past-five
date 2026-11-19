# Brand voice

Short version: write like a thoughtful, encouraging friend who has done her homework. Warm, specific, a little funny, never pushy. The visual and naming system is in `docs/BRAND-GUIDE.md`; the editorial rules readers can see are on `/editorial-policy`. This page is the working voice guide for writers.

## The honesty rule (most important)

- **Never fake first-person experience.** The site has no staff who tested these hobbies unless the owner really did. Do not write "I tried this last weekend", "we tested 12 sets", "my friends loved it", "in my experience". Do not use "our editors tested" either.
- **Hypothetical scenes are fine, but must read as hypothetical.** "Picture a Tuesday: dishes done, an hour left, a pad of paper on the table" is a scene. Do not follow it with "that was me" or dress it up as a real anecdote. Use "imagine", "picture", "say you", "if you're like many beginners" only where the claim is a general, checkable observation.
- **No invented testimonials, experts, statistics, prices or ratings.** If you cannot point to a source, rephrase as advice ("a small set is plenty to start") rather than fact ("most beginners waste $50").
- **No medical or mental-health promises.** Hobbies are fun and can be relaxing; do not say they cure stress, anxiety or loneliness.

## What the voice sounds like

- Contractions, short sentences, one idea at a time.
- Concrete and everyday: a kitchen table, a lunch break, a Sunday with nothing in it.
- Encouraging without cheerleading. "Being good at it is completely optional" is the brand's attitude, not a catchphrase to repeat in every post.
- Honest about cost and effort. Say what is skippable. Say when something is a "later" purchase.
- Gentle cheek, not sarcasm. Never at the reader's expense.

## Do

- Open with the reader's situation or question, then answer it in the first screen.
- Give a number, time or amount only when it is true and checkable ("a first page takes about as long as one episode" is a guess; do not state it as fact unless verified).
- Name the real next step ("Pick one paper scrap and glue it down").
- Say what to buy in plain words and why, and say what to skip.
- Use the brand phrases sparingly (`phrases` in `src/config/site.ts`): at most one per article.
- Write alt text and link text that say what is there ("beginner watercolor sets", not "click here").

## Avoid

- Hustle talk: "level up", "crush it", "make the most of every minute", productivity framing of leisure.
- Pressure: "you need", "you must", "everyone should".
- Gatekeeping and shaming: "just", "simply", "obviously", "real artists".
- Hype and scarcity: "game changer", "must-have", "limited", "best ever".
- Generic AI-writing patterns:
  - Openers like "In today's fast-paced world", "Have you ever wondered", "Whether you're a ... or a ...".
  - "It's not just X, it's Y" and "more than just a hobby".
  - Stacks of three adjectives ("cozy, creative, calming") and tidy triplets everywhere.
  - Filler transitions: "Let's dive in", "Without further ado", "Now that we've covered".
  - Words that signal autopilot: "delve", "tapestry", "journey", "unlock", "elevate", "curated" (unless it literally means a curated list), "embark", "navigate", "vibrant", "seamless".
  - Closing summaries that repeat the intro ("In conclusion", "Ultimately, ...").
  - Em dash chains and colon-heavy sentences; vary rhythm and use plain punctuation.
  - Vague claims with no object: "this can really help", "many people find".
  - Moralizing endings: "Remember, the most important thing is to enjoy the process."

## Before and after examples (original, for training only)

**Autopilot opener**
- Before: "In today's busy world, finding time for a hobby can feel overwhelming, but it doesn't have to be."
- After: "If your evenings disappear between dinner and bed, a hobby needs to fit in a small gap. This one does."

**Fake experience**
- Before: "I tested six clay brands and this one was my favorite."
- After: "Look for a block of at least a pound or two, so a first lumpy bowl doesn't feel expensive. Brand matters less than you'd think at this stage; we haven't compared them hands-on, so check the listing for what's included."

**Hype**
- Before: "This game-changing kit is a must-have for every crafter!"
- After: "A kit is handy if you want everything in one box. If you already own scissors and glue, a smaller set costs less and does the same job."

**Pressure**
- Before: "You need to start journaling today to see results."
- After: "Pick a notebook you won't mind messing up. Ten minutes counts."

**Hypothetical scene done right**
- Before (implies lived): "Last Saturday I laid out a gingham blanket and it was perfect."
- After: "Picture it: a gingham blanket, a loaf of bread, nowhere to be. The plan is that simple; the packing list below keeps it that simple."

**Gatekeeping**
- Before: "Just pick up any brush, it's super easy."
- After: "Start with one round brush. It handles most first paintings, and you can add more once you know what you reach for."

## Checks before sending an article to review

- Search the draft for: "I ", "my ", "we tested", "our team", "personally", "in my experience", "I've tried". Each hit must go or be a clearly marked hypothetical.
- Search for the avoid-list words above.
- Read the first two sentences aloud. If they could open any article on the internet, rewrite them.
- Confirm every number is sourced (`sources` field) or phrased as advice. See `docs/content/ARTICLE-QUALITY-CHECKLIST.md`.


## Owner clarification (2026-11-19)
"Girls" and "bestie" are fine to use. The rule is only to avoid constantly addressing the reader that way. Use them where they sound natural, not as a tic.
