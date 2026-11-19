import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createMemoryHistory, createRouter, isRedirect } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { redirects, redirectedPaths } from "@/config/redirects";
import { collections } from "@/data/products";
import { sitemapPaths } from "@/lib/sitemap";
import { routeTree } from "@/routeTree.gen";

const root = join(__dirname, "..", "..");

/** The destination of every redirect, written out so a change to one is a deliberate edit here. */
const EXPECTED: Record<string, string> = {
  "/start-here": "/",
  "/tools/tonight": "/make-plans?mode=tonight",
  "/editorial-standards": "/editorial-policy",
  // The eight earlier shop collection slugs, each to its one genuinely relevant new collection.
  "/shop/pottery-era": "/shop/creative",
  "/shop/creative-girl": "/shop/creative",
  "/shop/journaling-era": "/shop/paper",
  "/shop/girls-night-in": "/shop/hosting",
  "/shop/bookish-girl": "/shop/cozy",
  "/shop/cozy-after-hours": "/shop/cozy",
  "/shop/sporty-girl": "/shop/sporty",
  // (/shop/little-adventures keeps its address; only its name changed.)
};

const parse = (u: string) => {
  const url = new URL(u, "https://x.test");
  return { path: url.pathname, search: Object.fromEntries(url.searchParams) };
};

describe("redirect list", () => {
  it("lists every redirect with its destination (and nothing else)", () => {
    expect(Object.fromEntries(redirects.map((r) => [r.from, r.to]))).toEqual(EXPECTED);
  });

  it("gives a reason for each one", () => {
    for (const r of redirects) expect(r.why.length, r.from).toBeGreaterThan(20);
  });

  it("has no chains and no loops: no destination is itself redirected", () => {
    for (const r of redirects) {
      const dest = parse(r.to).path;
      expect(dest, `${r.from} -> ${r.to}`).not.toBe(r.from);
      expect(redirectedPaths, `${r.from} -> ${r.to} is a chain`).not.toContain(dest);
    }
    expect(new Set(redirectedPaths).size).toBe(redirectedPaths.length);
  });

  it("only sends visitors to pages that exist", () => {
    const router = createRouter({ routeTree });
    for (const r of redirects) {
      const matches = router.matchRoutes(parse(r.to).path);
      expect(matches.at(-1)?.routeId, r.to).not.toBe("__root__");
      expect(matches.at(-1)?.routeId, r.to).not.toBe("/$");
    }
  });
});

describe("route layer (dev server, tests and the built Nitro server)", () => {
  for (const r of redirects) {
    it(`${r.from} is a 301 to ${r.to}`, async () => {
      const router = createRouter({
        routeTree,
        history: createMemoryHistory({ initialEntries: [r.from] }),
      });
      // The status code travels on the thrown redirect: run the route's own guard.
      const match = router.matchRoutes(r.from).at(-1)!;
      const route = router.routesById[match.routeId as keyof typeof router.routesById] as {
        options: {
          beforeLoad?: (a: {
            search: Record<string, string>;
            params: Record<string, string>;
          }) => unknown;
        };
      };
      let thrown: unknown;
      try {
        route.options.beforeLoad?.({ search: {}, params: match.params as Record<string, string> });
      } catch (e) {
        thrown = e;
      }
      expect(isRedirect(thrown), `${r.from} must throw a redirect`).toBe(true);
      const opts = (
        thrown as {
          options: { statusCode?: number; to?: string; params?: Record<string, string> };
        }
      ).options;
      expect(opts.statusCode).toBe(301);
      // A dynamic target ("/shop/$category" + params) is resolved before comparing.
      const target = (opts.to ?? "").replace("$category", opts.params?.["category"] ?? "");
      expect(target).toBe(parse(r.to).path);

      // And the whole router lands on the destination (no further redirect).
      await router.load();
      const loc = router.state.location;
      const want = parse(r.to);
      expect(loc.pathname).toBe(want.path);
      for (const [k, v] of Object.entries(want.search))
        expect(String(loc.search[k as never])).toBe(v);
    });
  }

  it("/tools/tonight keeps the answers in a saved Tonight link", async () => {
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({
        initialEntries: ["/tools/tonight?t=60&e=low&b=free&c=solo&w=indoor&s=2"],
      }),
    });
    await router.load();
    expect(router.state.location.pathname).toBe("/make-plans");
    expect(router.state.location.search).toMatchObject({
      mode: "tonight",
      t: 60,
      e: "low",
      b: "free",
      c: "solo",
      w: "indoor",
      s: 2,
    });
  });
});

describe("Netlify _redirects", () => {
  const lines = readFileSync(join(root, "public/_redirects"), "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => l.split(/\s+/));

  it("has one 301 rule per redirect, same destination, in the same order", () => {
    expect(lines.map(([from, to, status]) => [from, to, status?.replace("!", "")])).toEqual(
      redirects.map((r) => [r.from, r.to, "301"]),
    );
  });

  it("forces each rule so a static file at the old path cannot shadow it", () => {
    for (const [from, , status] of lines) expect(status, from).toBe("301!");
  });
});

describe("retired shop collections: each redirect validated on its own", () => {
  const retired = redirects.filter((r) => r.from.startsWith("/shop/"));

  it("covers all eight earlier collection slugs except the one that kept its address", () => {
    expect(retired.map((r) => r.from.slice(6)).sort()).toEqual(
      [
        "bookish-girl",
        "cozy-after-hours",
        "creative-girl",
        "girls-night-in",
        "journaling-era",
        "pottery-era",
        "sporty-girl",
      ].sort(),
    );
  });

  it("each lands on a real, current collection (never a retired slug, never a chain)", () => {
    for (const r of retired) {
      const slug = r.to.slice(6);
      expect(
        collections.some((c) => c.slug === slug),
        `${r.from} -> ${r.to} is a current collection`,
      ).toBe(true);
      expect(redirectedPaths, `${r.from} -> ${r.to}`).not.toContain(r.to);
    }
  });

  it("a current collection address is never itself redirected", () => {
    for (const c of collections) expect(redirectedPaths).not.toContain(`/shop/${c.slug}`);
  });

  it("the destination is topically right for the old page", () => {
    // The old collection's own main hobby is served by the new one (what the visitor came for).
    const OLD_HOBBY: Record<string, string> = {
      "pottery-era": "air-dry-clay",
      "creative-girl": "watercolor-painting",
      "journaling-era": "junk-journaling",
      "girls-night-in": "mahjong",
      "bookish-girl": "reading",
      "cozy-after-hours": "jigsaw-puzzles",
      "sporty-girl": "pickleball",
    };
    for (const r of retired) {
      const dest = collections.find((c) => c.slug === r.to.slice(6))!;
      expect(dest.hobbies, `${r.from} -> ${dest.slug}`).toContain(OLD_HOBBY[r.from.slice(6)]);
    }
  });

  it("the sitemap lists none of the retired paths", () => {
    for (const r of retired) expect(sitemapPaths()).not.toContain(r.from);
  });
});

describe("sitemap", () => {
  it("excludes every redirected path, plus the hidden Hobby Budget utility", () => {
    const paths = sitemapPaths();
    for (const p of redirectedPaths) expect(paths).not.toContain(p);
    expect(paths).not.toContain("/tools/hobby-budget");
  });

  it("does not list the destination twice", () => {
    const paths = sitemapPaths();
    expect(new Set(paths).size).toBe(paths.length);
  });
});
