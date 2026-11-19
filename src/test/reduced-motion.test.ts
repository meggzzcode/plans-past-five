import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("reduced motion", () => {
  it("smooth scrolling is switched off for visitors who prefer reduced motion", () => {
    const css = readFileSync(join(__dirname, "..", "styles.css"), "utf8");
    const smooth = css.indexOf("scroll-behavior: smooth");
    expect(smooth).toBeGreaterThan(-1);
    const reduce = css.indexOf("prefers-reduced-motion: reduce", smooth);
    expect(reduce).toBeGreaterThan(smooth);
    expect(css.slice(reduce, reduce + 120)).toContain("scroll-behavior: auto");
  });

  it("the search results block wraps a long unbroken query instead of widening the page", () => {
    const src = readFileSync(join(__dirname, "..", "routes", "search.tsx"), "utf8");
    expect(src).toContain("[overflow-wrap:anywhere]");
  });
});
