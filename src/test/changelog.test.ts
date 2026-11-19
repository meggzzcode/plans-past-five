import { describe, expect, it } from "vitest";
import { articles } from "@/content";
import { articleJsonLd, modifiedAfterPublish } from "@/lib/seo";
import { changelog, firstChanged, lastChanged, LAUNCH_NOTE } from "@/content/changelog";
import { sitemapPaths } from "@/lib/sitemap";

describe("changelog", () => {
  it("has the launch note and real, ordered, valid dates", () => {
    expect(LAUNCH_NOTE).toBe("Launched November 2026");
    const dates = changelog.map((d) => d.date);
    expect(dates).toEqual([...dates].sort().reverse());
    for (const d of dates) {
      expect(d).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(d >= "2026-11-01").toBe(true);
      expect(d <= new Date().toISOString().slice(0, 10)).toBe(true);
    }
    expect(firstChanged() <= lastChanged()).toBe(true);
  });
  it("entries are plain English: no commit hashes", () => {
    for (const day of changelog) {
      expect(day.changes.length).toBeGreaterThan(0);
      for (const c of day.changes) expect(c).not.toMatch(/\b[0-9a-f]{7,40}\b/);
    }
  });
  it("is in the sitemap", () => {
    expect(sitemapPaths()).toContain("/changelog");
  });
});

describe("structured dates match visible dates", () => {
  it("every article's JSON-LD dates are its visible published and updated/checked dates, never earlier than launch", () => {
    for (const a of articles) {
      const ld = articleJsonLd({
        title: a.title,
        description: a.dek,
        path: `/journal/${a.slug}`,
        image: "/favicon.svg",
        publishedAt: a.publishedAt,
        updatedAt: modifiedAfterPublish(a),
      });
      expect(ld.datePublished).toBe(a.publishedAt);
      const visible = [a.publishedAt, a.updatedAt, a.verifiedAt].filter(Boolean);
      expect(visible).toContain(ld.dateModified);
      expect(a.publishedAt >= "2026-11-01").toBe(true);
    }
  });
});
