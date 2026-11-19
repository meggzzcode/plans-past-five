import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createMemoryHistory, createRouter, isRedirect } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { redirects, redirectedPaths } from "@/config/redirects";
import { sitemapPaths } from "@/lib/sitemap";
import { routeTree } from "@/routeTree.gen";

const root = join(__dirname, "..", "..");

/** The destination of every redirect, written out so a change to one is a deliberate edit here. */
const EXPECTED: Record<string, string> = {
  "/start-here": "/",
  "/tools/tonight": "/make-plans?mode=tonight",
  "/editorial-standards": "/editorial-policy",
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
        options: { beforeLoad?: (a: { search: Record<string, string> }) => unknown };
      };
      let thrown: unknown;
      try {
        route.options.beforeLoad?.({ search: {} });
      } catch (e) {
        thrown = e;
      }
      expect(isRedirect(thrown), `${r.from} must throw a redirect`).toBe(true);
      const opts = (thrown as { options: { statusCode?: number; to?: string } }).options;
      expect(opts.statusCode).toBe(301);
      expect(opts.to).toBe(parse(r.to).path);

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
      t: "60",
      e: "low",
      b: "free",
      c: "solo",
      w: "indoor",
      s: "2",
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
