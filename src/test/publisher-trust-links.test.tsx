import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, render, waitFor } from "@testing-library/react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";
import { site } from "@/config/site";
import { articles } from "@/content";
import { publisherLine } from "@/lib/publisher";
import { NAMES } from "@/components/layout/nav";
import { Footer } from "@/components/layout/Footer";
import { PublishedBy } from "@/components/layout/PublishedBy";

afterEach(cleanup);
const read = (p: string) => readFileSync(p, "utf8");

const empty = {
  publisherName: "",
  publisherEntityType: "",
  publisherAddress: "",
  publisherUrl: "",
};

describe("publisher line (A)", () => {
  it("ships empty and renders nothing", () => {
    expect(site.publisherName).toBe("");
    expect(site.publisherEntityType).toBe("");
    expect(site.publisherAddress).toBe("");
    expect(site.publisherUrl).toBe("");
    expect(publisherLine()).toBeNull();
    expect(publisherLine({ ...empty, publisherAddress: "1 Example Way" })).toBeNull();
    const { container } = render(<PublishedBy />);
    expect(container.textContent).toBe("");
  });

  it("uses one wording: Published by <name>, <address>", () => {
    expect(publisherLine({ ...empty, publisherName: "Test Co" })?.text).toBe(
      "Published by Test Co.",
    );
    expect(
      publisherLine({ ...empty, publisherName: "Test Co", publisherAddress: "PO Box 1" })?.text,
    ).toBe("Published by Test Co, PO Box 1.");
    expect(
      publisherLine({
        ...empty,
        publisherName: "Test Co",
        publisherEntityType: "sole proprietor",
        publisherAddress: "PO Box 1",
      })?.text,
    ).toBe("Published by Test Co (sole proprietor), PO Box 1.");
  });

  it("ignores a publisher URL that is not https", () => {
    expect(
      publisherLine({ ...empty, publisherName: "T", publisherUrl: "http://x.test" })?.url,
    ).toBe("");
    expect(
      publisherLine({ ...empty, publisherName: "T", publisherUrl: "https://x.test" })?.url,
    ).toBe("https://x.test");
  });

  it("is rendered on the footer, About, Contact, Terms and Privacy through the one helper", () => {
    const files = [
      "src/components/layout/Footer.tsx",
      "src/routes/about.tsx",
      "src/routes/contact.tsx",
      "src/routes/terms.tsx",
      "src/routes/privacy.tsx",
    ];
    for (const f of files) expect(read(f), f).toMatch(/<PublishedBy/);
    // no page writes its own "Published by" wording
    const dirs = ["src/routes", "src/components"];
    for (const d of dirs) {
      const walk = (p: string): string[] =>
        readdirSync(p, { withFileTypes: true }).flatMap((e) =>
          e.isDirectory() ? walk(join(p, e.name)) : [join(p, e.name)],
        );
      for (const f of walk(d).filter((x) => /\.tsx?$/.test(x))) {
        if (f.endsWith("PublishedBy.tsx")) continue;
        expect(read(f), f).not.toMatch(/Published by/);
      }
    }
  });
});

describe("pre-publish placeholder check", () => {
  it("warns (does not fail) about empty owner-supplied fields", () => {
    const fields: Record<string, string> = {
      "site.contactEmail": site.contactEmail,
      "site.publisherName": site.publisherName,
      "site.publisherAddress": site.publisherAddress,
      "site.legal.ownerName": site.legal.ownerName,
    };
    const empties = Object.entries(fields)
      .filter(([, v]) => !v.trim())
      .map(([k]) => k);
    if (empties.length)
      console.warn(
        `[pre-publish] Owner-supplied fields still empty, so these lines will not appear on the live site: ${empties.join(", ")}. See docs/buyer/PUBLISHER-SETUP.md.`,
      );
    // Values that ARE set must be real: no example/placeholder text, https-only URL.
    for (const [k, v] of Object.entries(fields)) {
      if (!v.trim()) continue;
      expect(v, k).not.toMatch(
        /example\.(com|org)|lorem|tbd|todo|your[- ]name|placeholder|\[.*\]/i,
      );
    }
    if (site.publisherUrl) expect(site.publisherUrl).toMatch(/^https:\/\//);
  });
});

describe("'How we make this' link (B)", () => {
  it("is named in nav NAMES and does not mention AI", () => {
    expect(NAMES.howWeMake).toBe("How we make this");
    expect(NAMES.howWeMake).not.toMatch(/\bAI\b|artificial|generated/i);
  });

  it("appears in the footer and goes to the Editorial Standards page", async () => {
    const root = createRootRoute({ component: () => <Footer /> });
    const router = createRouter({
      routeTree: root,
      history: createMemoryHistory({ initialEntries: ["/"] }),
    });
    const view = render(<RouterProvider router={router} />);
    await act(async () => {
      await router.load();
    });
    await waitFor(() => view.getByText(NAMES.howWeMake));
    const a = view.getByText(NAMES.howWeMake).closest("a")!;
    expect(a.getAttribute("href")).toBe("/editorial-policy");
    expect(view.container.textContent ?? "").not.toMatch(/\bAI\b/);
  });

  it("is in every article byline area and the disclosure is not repeated there", () => {
    const s = read("src/routes/journal.$slug.tsx");
    expect(s).toMatch(/NAMES\.howWeMake/);
    expect(s).toMatch(/to="\/editorial-policy"/);
    expect(s).not.toMatch(/\bAI\b|artificial intelligence/);
  });
});

describe("sources and last checked (C)", () => {
  const withDates = articles.filter((a) => a.verifiedAt);

  it("article template shows last-checked date, sources with links, and a 'How we check' link", () => {
    // The full route tree waits on stylesheets in jsdom, so the template is checked as source and
    // verified in a real browser (see docs/marketplace/path-to-8/IMPLEMENTED-TRUST.md).
    const s = read("src/routes/journal.$slug.tsx");
    expect(s).toMatch(/Facts last checked <time/);
    expect(s).toMatch(/a\.verifiedAt &&/);
    expect(s).toMatch(/href=\{s\.url\}/);
    expect(s).toMatch(/to="\/methodology"/);
    expect(s).toMatch(/How we check/);
    expect(articles.some((a) => a.verifiedAt && (a.sources ?? []).length > 0)).toBe(true);
  });

  it("template shows an Updated line only when updatedAt exists", () => {
    const s = read("src/routes/journal.$slug.tsx");
    expect(s).toMatch(/a\.updatedAt \?/);
    expect(s).toMatch(/Updated <time/);
  });

  it("every published article that lists sources has a verifiedAt date, and dates are not invented", () => {
    for (const a of articles) {
      if ((a.sources ?? []).length) expect(a.verifiedAt, a.slug).toBeTruthy();
      if (a.updatedAt) expect(a.updatedAt >= a.publishedAt, a.slug).toBe(true);
    }
    expect(withDates.length).toBeGreaterThan(0);
  });
});
