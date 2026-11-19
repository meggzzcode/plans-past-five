/**
 * Every permanent (301) redirect the site makes, in one list. Three places use it and a test keeps
 * them in step:
 *  1. the route files (src/routes/start-here.tsx, tools.tonight.tsx, editorial-standards.tsx, and
 *     shop.$category.tsx for the retired shop collection slugs) throw a 301 `redirect`, so the dev
 *     server, the tests and the built Nitro server all redirect;
 *  2. public/_redirects, which Netlify applies at the edge before the app runs;
 *  3. src/lib/sitemap.ts, which never lists a redirected path.
 * To add one: add it here, add the matching line to public/_redirects, add a route file that throws
 * the redirect, and run the tests (src/test/redirects.test.ts lists every entry).
 * Redirect targets must be final pages, never another redirect (no chains).
 */
export type SiteRedirect = {
  from: string;
  /** Path (and fixed query) of the destination. */
  to: string;
  /** Why the destination is the right place for someone arriving from `from`. */
  why: string;
};

export const redirects: readonly SiteRedirect[] = [
  {
    from: "/start-here",
    to: "/",
    why: "Start Here was a longer copy of the homepage; the home page now carries the three journeys.",
  },
  {
    from: "/tools/tonight",
    to: "/make-plans?mode=tonight",
    why: "Tonight is now the first mode of Make Plans, same questions and same ideas. Saved Tonight links keep their answers (t, e, b, c, w, s are passed through).",
  },
  {
    from: "/editorial-standards",
    to: "/editorial-policy",
    why: "Older name for the Editorial Standards page (existing redirect).",
  },
  {
    from: "/shop/pottery-era",
    to: "/shop/creative",
    why: "The Pottery Era (clay and ceramic painting) is now part of The Creative Edit with painting, embroidery and crochet.",
  },
  {
    from: "/shop/creative-girl",
    to: "/shop/creative",
    why: "The Creative Girl (watercolor, thread, clay) became The Creative Edit; its journaling picks moved to The Paper Edit.",
  },
  {
    from: "/shop/journaling-era",
    to: "/shop/paper",
    why: "The Journaling Era (journals, tape, pens, scrapbooking) became The Paper Edit.",
  },
  {
    from: "/shop/girls-night-in",
    to: "/shop/hosting",
    why: "Girls' Night In (mahjong and paint nights, hosting a group) became The Hosting Edit.",
  },
  {
    from: "/shop/bookish-girl",
    to: "/shop/cozy",
    why: "The Bookish Girl (reading evenings) is now inside The Cozy Edit, with reading, puzzles and slow evenings.",
  },
  {
    from: "/shop/cozy-after-hours",
    to: "/shop/cozy",
    why: "Cozy After Hours (comforts for a weeknight at home) became The Cozy Edit.",
  },
  {
    from: "/shop/sporty-girl",
    to: "/shop/sporty",
    why: "The Sporty Girl (tennis, pickleball, movement) became The Sporty Edit. Shows a short coming-soon note until it has verified products.",
  },
];

/** The paths that redirect; the sitemap excludes all of them. */
export const redirectedPaths: readonly string[] = redirects.map((r) => r.from);

/** The redirect for a request path (a retired shop collection slug, say), if there is one. */
export const redirectFor = (path: string): SiteRedirect | undefined =>
  redirects.find((r) => r.from === path);
