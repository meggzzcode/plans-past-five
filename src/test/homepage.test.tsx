import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { categories } from "@/data/categories";
import { QUIZ_QUESTION_COUNT } from "@/data/quiz-meta";
import { QUIZ_ORDER } from "@/lib/quiz-flow";
import {
  finePrintNav,
  footerNav,
  isFindAHobbyPath,
  mobileNavItems,
  NAMES,
  primaryNav,
  sectionNav,
  SITEMAP_HREF,
  topNav,
} from "@/components/layout/nav";

describe("navigation list", () => {
  it("has exactly four destinations in order, with one name each", () => {
    expect(primaryNav.map((n) => [n.to, n.label])).toEqual([
      ["/hobbies", "Find a Hobby"],
      ["/make-plans", "Make Plans"],
      ["/shop", "The Shop"],
      ["/journal", "The Journal"],
    ]);
    expect(mobileNavItems).toBe(primaryNav);
    expect(topNav.map((n) => n.to)).toEqual(primaryNav.map((n) => n.to));
  });

  it("keeps the six mood pages out of the header, menu and footer but reachable from the Journal", () => {
    expect(categories).toHaveLength(6);
    expect(sectionNav.map((n) => n.to)).toEqual(categories.map((c) => `/${c.slug}`));
    const tos = [...mobileNavItems, ...footerNav, ...finePrintNav].map((n) => n.to);
    for (const c of categories) expect(tos).not.toContain(`/${c.slug}`);
    const journal = readFileSync("src/routes/journal.index.tsx", "utf8");
    expect(journal).toContain("sectionNav.map");
  });

  it("does not link retired or hidden pages from the header, menu or footer", () => {
    const tos = [...mobileNavItems, ...footerNav, ...finePrintNav].map((n) => n.to);
    for (const gone of [
      "/start-here",
      "/tools/tonight",
      "/tools/hobby-budget",
      "/changelog",
      "/methodology",
      "/corrections",
    ])
      expect(tos).not.toContain(gone);
    const footer = readFileSync("src/components/layout/Footer.tsx", "utf8");
    for (const gone of ["changelog", "hobby-budget", "start-here", "tools/tonight"])
      expect(footer).not.toContain(gone);
  });

  it("has no duplicate names or destinations", () => {
    const labels = mobileNavItems.map((n) => n.label);
    expect(new Set(labels).size).toBe(labels.length);
    const names = categories.map((c) => c.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("header: saved is a heart icon, search stays, the quiz button and mood row are gone", () => {
    const header = readFileSync("src/components/layout/Header.tsx", "utf8");
    expect(header).toContain("Heart");
    expect(header).not.toContain("Bookmark");
    expect(header).toContain('aria-label="Search"');
    expect(header).toContain("aria-label={NAMES.saved}");
    expect(header).not.toContain("sectionNav");
    expect(header).not.toContain('aria-label="Sections"');
  });

  it("footer lists exactly the seven legal and trust links", () => {
    expect([...footerNav.map((n) => n.label), "Sitemap"]).toEqual([
      "Privacy",
      "Terms",
      "Affiliate Disclosure",
      "Editorial Standards",
      "About",
      "Contact",
      "Sitemap",
    ]);
    expect(SITEMAP_HREF).toBe("/sitemap.xml");
  });
});

describe("names are consistent", () => {
  it("uses one name per destination", () => {
    expect(NAMES.hobbies).toBe("Find a Hobby");
    expect(NAMES.quiz).toBe(NAMES.hobbies);
    expect(NAMES.plans).toBe("Make Plans");
    expect(NAMES.shop).toBe("The Shop");
    expect(NAMES.saved).toBe("My Plans");
  });

  it("highlights Find a Hobby on the directory, hobby pages and the quiz", () => {
    for (const p of ["/hobbies", "/hobbies/crochet", "/hobby-finder"])
      expect(isFindAHobbyPath(p)).toBe(true);
    expect(isFindAHobbyPath("/shop")).toBe(false);
  });
});

describe("quiz question count", () => {
  it("matches the longest path through the quiz flow (it is adaptive, so most people see fewer)", () => {
    expect(QUIZ_ORDER.length).toBe(QUIZ_QUESTION_COUNT);
  });
});

describe("mobile menu fine print", () => {
  it("links About, Contact, Affiliate Disclosure and Editorial Standards", async () => {
    expect(finePrintNav.map((n) => n.label)).toEqual([
      "About",
      "Contact",
      "Affiliate Disclosure",
      "Editorial Standards",
    ]);
    const header = readFileSync("src/components/layout/Header.tsx", "utf8");
    expect(header).toContain("finePrintNav.map");
  });
});
