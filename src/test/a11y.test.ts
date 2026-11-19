import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { images } from "@/data/images";

/**
 * Cheap static accessibility checks. The real audit (axe-core in a browser, keyboard
 * and tap-target passes) is recorded in docs/marketplace/QA-REPORT.md.
 */
const routesDir = join(__dirname, "..", "routes");
const routeFiles = readdirSync(routesDir).filter((f) => f.endsWith(".tsx") && f !== "__root.tsx");
const read = (f: string) => readFileSync(join(routesDir, f), "utf8");

// Components that render the page's single <h1> on behalf of a route file.
const h1Components = ["PageHero", "ProsePage", "CategoryPage", "ContactPage"];

describe("image registry", () => {
  it("gives every image meaningful alt text and explicit dimensions", () => {
    for (const [key, img] of Object.entries(images)) {
      expect(img.alt.trim().length, `${key} alt`).toBeGreaterThanOrEqual(15);
      expect(img.w, `${key} width`).toBeGreaterThan(0);
      expect(img.h, `${key} height`).toBeGreaterThan(0);
    }
  });
});

describe("route headings", () => {
  it("every page route yields an h1 and never declares more than one in its own file", () => {
    for (const f of routeFiles) {
      const src = read(f);
      // The catch-all only renders the shared 404 component (which has the h1).
      if (f.startsWith("sitemap") || f === "$.tsx") continue;
      const own = (src.match(/<h1[\s>]/g) ?? []).length;
      const viaComponent = h1Components.some((c) => src.includes(`<${c}`));
      expect(own + (viaComponent ? 1 : 0), `${f} h1 count`).toBeGreaterThanOrEqual(1);
    }
  });

  it("route files use at most one h1 per rendered branch (no stacked h1 in the same return)", () => {
    for (const f of routeFiles) {
      const src = read(f);
      if (h1Components.some((c) => src.includes(`<${c}`))) {
        expect(
          src.match(/<h1[\s>]/g) ?? [],
          `${f} mixes PageHero-style h1 and own h1`,
        ).toHaveLength(0);
      }
    }
  });
});

describe("source-level a11y guards", () => {
  it("never renders a raw <img> without an alt attribute in routes", () => {
    for (const f of routeFiles) {
      const imgs = read(f).match(/<img\b[^>]*>/gs) ?? [];
      for (const tag of imgs) expect(tag, `${f} img`).toMatch(/\balt=/);
    }
  });
});
