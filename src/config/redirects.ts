/**
 * Every permanent (301) redirect the site makes, in one list. Three places use it and a test keeps
 * them in step:
 *  1. the route files (src/routes/start-here.tsx, tools.tonight.tsx, editorial-standards.tsx) throw a
 *     301 `redirect`, so the dev server, the tests and the built Nitro server all redirect;
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
];

/** The paths that redirect; the sitemap excludes all of them. */
export const redirectedPaths: readonly string[] = redirects.map((r) => r.from);
