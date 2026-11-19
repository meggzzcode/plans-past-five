import { articles } from "@/content";
import { hobbies, type Hobby } from "@/data/hobbies";
import { products, collections } from "@/data/products";
import { categories } from "@/data/categories";

export type SearchHit = { kind: string; title: string; text: string; to: string };

function index(): (SearchHit & { hay: string; hobby?: Hobby })[] {
  return [
    ...articles.map((a) => ({
      kind: "Journal",
      title: a.title,
      text: a.dek,
      to: `/journal/${a.slug}`,
      hay: `${a.title} ${a.dek} ${a.hobbies.join(" ")}`,
    })),
    ...hobbies.map((h) => ({
      kind: "Hobby",
      title: h.name,
      text: h.description,
      to: `/hobbies/${h.slug}`,
      hay: `${h.name} ${h.description} ${h.tags.join(" ")} ${h.category}`,
      hobby: h,
    })),
    ...collections.map((c) => ({
      kind: "Off Duty Essentials",
      title: c.name,
      text: c.dek,
      to: `/shop/${c.slug}`,
      hay: `${c.name} ${c.dek} ${c.intro}`,
    })),
    ...products.map((p) => ({
      kind: "Shop pick",
      title: p.name,
      text: p.blurb,
      to: `/shop/${p.collection}`,
      hay: `${p.name} ${p.blurb} ${p.hobbySlugs.join(" ")}`,
    })),
    ...categories.map((c) => ({
      kind: "Section",
      title: c.name,
      text: c.intro,
      to: `/${c.slug}`,
      hay: `${c.name} ${c.short} ${c.intro}`,
    })),
  ];
}

/**
 * Search understands a few human phrases. Everything is typed data you can edit: each concept
 * lists the phrases that trigger it and the hobby features a hobby must have to match.
 * A hobby's features are its tags plus `cat:<category>`, `cost:<bucket>` and `energy:<level>`.
 */
export type SearchConcept = {
  id: string;
  /** Short label shown back to the person ("Looking for: social"). */
  label: string;
  /** Lowercase phrases that trigger this concept (matched on word boundaries). */
  phrases: string[];
  /** Hobby features that must all be present. */
  features: string[];
  /** Words that, when in a journal/shop title, count as a title match for this concept. */
  titleWords?: string[];
};

export const searchConcepts: SearchConcept[] = [
  {
    id: "cheap",
    label: "low cost",
    phrases: [
      "cheap",
      "budget",
      "inexpensive",
      "affordable",
      "low cost",
      "low-cost",
      "on a budget",
      "frugal",
    ],
    features: ["low-cost"],
    titleWords: ["cheap", "affordable", "budget"],
  },
  {
    id: "free",
    label: "free to start",
    phrases: ["free", "costs nothing", "no cost", "zero cost"],
    features: ["cost:free"],
    titleWords: ["free"],
  },
  {
    id: "social",
    label: "better with others",
    phrases: [
      "with friends",
      "with a friend",
      "with my friends",
      "friends",
      "friend",
      "social",
      "group",
      "together",
      "with others",
      "date night",
      "date",
      "girls night",
      "meet people",
    ],
    features: ["social"],
    titleWords: ["friends", "girls night", "group", "social"],
  },
  {
    id: "solo",
    label: "done alone",
    phrases: ["alone", "solo", "by myself", "on my own", "just me", "for one", "myself"],
    features: ["solo"],
    titleWords: ["solo", "alone"],
  },
  {
    id: "after-work",
    label: "after work",
    phrases: [
      "after work",
      "after-work",
      "weeknight",
      "weeknights",
      "evening",
      "evenings",
      "after 5",
      "tonight",
    ],
    features: ["after-work"],
    titleWords: ["after work", "evening"],
  },
  {
    id: "weekend",
    label: "weekend",
    phrases: ["weekend", "weekends", "saturday", "sunday"],
    features: ["weekend"],
    titleWords: ["weekend", "saturday", "sunday"],
  },
  {
    id: "at-home",
    label: "at home",
    phrases: [
      "rainy day",
      "rainy",
      "rain",
      "at home",
      "indoors",
      "indoor",
      "stay in",
      "staying in",
      "cozy",
    ],
    features: ["at-home"],
    titleWords: ["rainy", "at home", "cozy", "indoor"],
  },
  {
    id: "outdoors",
    label: "outdoors",
    phrases: ["outdoors", "outdoor", "outside", "fresh air"],
    features: ["outdoors"],
    titleWords: ["outdoor", "outside"],
  },
  {
    id: "active",
    label: "active",
    phrases: ["active", "exercise", "workout", "fitness", "movement", "move my body"],
    features: ["active"],
    titleWords: ["active", "movement"],
  },
  {
    id: "creative",
    label: "creative",
    phrases: ["creative", "crafty", "crafts", "craft", "arty"],
    features: ["creative"],
    titleWords: ["creative", "craft"],
  },
  {
    id: "low-energy",
    label: "low energy",
    phrases: ["low energy", "low-energy", "tired", "lazy", "exhausted", "relaxing", "chill"],
    features: ["low-energy"],
    titleWords: ["low energy", "low-energy", "relaxing"],
  },
];

/**
 * Words that mean "something we honestly do not cover". The site is written for adults, so a
 * search for these returns nothing rather than a loosely related list.
 */
export const unsupportedSearchTerms: string[] = [
  "kids",
  "kid",
  "children",
  "child",
  "toddler",
  "toddlers",
  "baby",
  "babies",
  "teens",
  "teenagers",
];

/** Filler words dropped from a sentence-style search. */
export const searchStopwords = new Set([
  "something",
  "anything",
  "to",
  "do",
  "doing",
  "with",
  "the",
  "a",
  "an",
  "for",
  "i",
  "me",
  "my",
  "on",
  "in",
  "of",
  "and",
  "or",
  "some",
  "thing",
  "things",
  "idea",
  "ideas",
  "day",
  "what",
  "can",
  "want",
  "need",
  "like",
  "that",
  "is",
  "are",
  "good",
  "fun",
  "nice",
  "easy",
  "best",
  "after",
  "when",
  "at",
  "into",
  "get",
  "try",
]);

const normalize = (q: string) =>
  ` ${q
    .toLowerCase()
    .replace(/[^a-z0-9$'\- ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()} `;

const escapeRe = (t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const featuresOf = (h: Hobby): Set<string> =>
  new Set([...h.tags, `cat:${h.category}`, `cost:${h.cost}`, `energy:${h.energy}`]);

export type EmptySearchSuggestions = {
  message: string;
  /** Tappable example searches, each known to return results. */
  suggestedQueries: { label: string; query: string }[];
  /** Places to go instead of a dead end. */
  links: { label: string; to: string }[];
};

/** Helpful empty state for the search route: example searches plus the quiz and the directory. */
export function emptySearchSuggestions(q = ""): EmptySearchSuggestions {
  const unsupported = unsupportedSearchTerms.some((t) => normalize(q).includes(` ${t} `));
  return {
    message: unsupported
      ? "We write for adults looking for a hobby of their own, so we don't have anything honest to show for that. Here are some places to start."
      : q.trim()
        ? `Nothing matched "${q.trim()}". Try a simpler word, or start from one of these.`
        : "Try one of these, or let the quiz pick for you.",
    suggestedQueries: [
      { label: "Free hobbies", query: "free" },
      { label: "Cheap date ideas", query: "cheap date" },
      { label: "Something to do alone", query: "alone" },
      { label: "With friends after work", query: "with friends after work" },
      { label: "Rainy day", query: "rainy day" },
      { label: "Yoga", query: "yoga" },
    ],
    links: [
      { label: "Take the hobby quiz", to: "/hobby-finder" },
      { label: "Browse all hobbies", to: "/hobbies" },
      { label: "Make a plan", to: "/make-plans" },
    ],
  };
}

export type SearchOutcome = {
  hits: SearchHit[];
  /** Plain-language labels for the phrases we understood, e.g. ["better with others", "after work"]. */
  understood: string[];
  /** Present when there are no hits. */
  empty?: EmptySearchSuggestions;
};

type Entry = SearchHit & { hay: string; hobby?: Hobby };

export function searchDetailed(q: string, limit = 30): SearchOutcome {
  let rest = normalize(q);
  const none = (): SearchOutcome => ({
    hits: [],
    understood: [],
    empty: emptySearchSuggestions(q),
  });
  if (!rest.trim()) return none();
  if (unsupportedSearchTerms.some((t) => rest.includes(` ${t} `))) return none();

  // 1. Pull out known phrases, longest first.
  const found: SearchConcept[] = [];
  const phrases = searchConcepts
    .flatMap((c) => c.phrases.map((p) => ({ c, p })))
    .sort((a, b) => b.p.length - a.p.length);
  for (const { c, p } of phrases) {
    const re = new RegExp(`(?<=\\s)${escapeRe(p)}(?=\\s)`);
    if (re.test(rest)) {
      if (!found.includes(c)) found.push(c);
      rest = rest.replace(new RegExp(`(?<=\\s)${escapeRe(p)}(?=\\s)`, "g"), " ");
    }
  }
  const terms = rest.split(" ").filter((t) => t.length > 1 && !searchStopwords.has(t));
  if (!found.length && !terms.length) return none();

  const scored: { e: Entry; s: number }[] = [];
  for (const e of index() as Entry[]) {
    const hay = e.hay.toLowerCase();
    const title = e.title.toLowerCase();
    let s = 0;
    let ok = true;
    // Remaining words must all appear; a title match counts for more.
    for (const t of terms) {
      if (title.includes(t)) s += 10;
      else if (hay.includes(t)) s += 1;
      else {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    if (found.length) {
      if (e.hobby) {
        const f = featuresOf(e.hobby);
        if (!found.every((c) => c.features.every((x) => f.has(x)))) continue;
        s += 5 * found.length;
      } else if (terms.length) {
        // A non-hobby result with extra words keeps the all-words rule above.
      } else {
        // Concept-only search: articles and shop pages count only on a title match.
        const hit = found.some((c) => (c.titleWords ?? []).some((w) => title.includes(w)));
        if (!hit) continue;
        s += 10;
      }
    }
    scored.push({ e, s });
  }
  scored.sort((a, b) => b.s - a.s || (a.e.hobby ? 0 : 1) - (b.e.hobby ? 0 : 1));
  const hits = scored
    .slice(0, limit)
    .map(({ e }) => ({ kind: e.kind, title: e.title, text: e.text, to: e.to }));
  return {
    hits,
    understood: found.map((c) => c.label),
    ...(hits.length ? {} : { empty: emptySearchSuggestions(q) }),
  };
}

export const search = (q: string, limit = 30): SearchHit[] => searchDetailed(q, limit).hits;
