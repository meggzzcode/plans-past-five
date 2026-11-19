import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, render } from "@testing-library/react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { articleWordCount, articles, blockText, readingMinutes, type Block } from "@/content";
import { ArticleBody } from "@/components/editorial/ArticleBody";
import { modifiedAfterPublish } from "@/lib/seo";
import { sitemapPaths } from "@/lib/sitemap";

const MD = "see [Make Some Plans](/make-plans) and **bold**";

const blocks: Block[] = [
  { type: "p", text: MD },
  { type: "h2", text: "Head **x**", id: "h" },
  { type: "h3", text: "Sub [a](/make-plans)" },
  { type: "list", items: [MD] },
  { type: "quote", text: MD },
  { type: "item", n: 1, title: "T **x**", note: MD, first: MD },
  { type: "whatYoullNeed", essentials: [MD], optional: [MD + "!"] },
  { type: "saveSplurge", save: MD, splurge: MD },
  { type: "tryThisWeekend", text: MD },
  { type: "girlsNight", text: MD },
  { type: "first30", steps: [MD] },
  { type: "noSpend", text: MD },
  { type: "makePlan", text: MD },
];

const Wrap = ({ children }: { children: ReactNode }) => {
  const root = createRootRoute({ component: () => <>{children}</> });
  const router = createRouter({
    routeTree: root,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  return <RouterProvider router={router} />;
};

afterEach(cleanup);

describe("reading time", () => {
  it("counts every block type and uses 200 wpm", () => {
    expect(blockText({ type: "image", image: "hero" as never, caption: "one two three" })).toBe(
      "one two three",
    );
    expect(blockText({ type: "ifYouLoved", hobbies: ["junk-journaling"] })).toBe("junk journaling");
    expect(blockText({ type: "item", title: "a", note: "b c", first: "d" })).toBe("a b c d");
    expect(blockText({ type: "shopTheArticle" })).toBe("");
    expect(blockText({ type: "p", text: "[two words](/x) **now**" })).toBe("two words now");
    const words = (n: number) => Array.from({ length: n }, () => "w").join(" ");
    const a = { dek: words(10), body: [{ type: "p", text: words(390) } as Block] };
    expect(articleWordCount(a)).toBe(400);
    expect(readingMinutes(a)).toBe(2);
    expect(readingMinutes({ dek: "x", body: [] })).toBe(1);
  });
  it("long articles are not under-labelled (the old bug labelled 2,300 words as 4 minutes)", () => {
    const all = articles.map((a) => ({ a, w: articleWordCount(a) }));
    for (const { a, w } of all) expect(readingMinutes(a)).toBe(Math.max(1, Math.round(w / 200)));
    const longest = all.sort((x, y) => y.w - x.w)[0]!;
    expect(longest.w).toBeGreaterThan(1500);
    expect(readingMinutes(longest.a)).toBeGreaterThanOrEqual(7);
  });
});

describe("inline markup", () => {
  it("renders every text block through the inline renderer", async () => {
    const { container } = render(
      <Wrap>
        <ArticleBody blocks={blocks} articleSlug="none" />
      </Wrap>,
    );
    await act(async () => {});
    const text = container.textContent ?? "";
    expect(text).toContain("Make Some Plans");
    expect(text).not.toContain("](");
    expect(text).not.toContain("**");
    expect(container.querySelectorAll("a[href='/make-plans']").length).toBeGreaterThan(10);
  });
});

describe("trust pages", () => {
  const read = (p: string) => readFileSync(p, "utf8");
  it("methodology no longer says brands are never shown", () => {
    const s = read("src/routes/methodology.tsx");
    expect(s).not.toMatch(/prices, star ratings, brands/);
    expect(s).toMatch(/checked it against (their|its) Amazon\s+listing/);
  });
  it("corrections has an honest no-inbox statement", () => {
    const s = read("src/routes/corrections.tsx");
    expect(s).not.toMatch(/inbox is being set up/);
    expect(s).toMatch(/site\.contactEmail \?/);
  });
  it("about explains the editorial identity", () => {
    expect(read("src/routes/about.tsx")).toMatch(/no single named author/);
  });
  it("editorial-standards redirects and is not in the sitemap", () => {
    const s = read("src/routes/editorial-standards.tsx");
    expect(s).toMatch(/redirect\(\{ to: "\/editorial-policy", statusCode: 301/);
    expect(s).toMatch(/noindex: true/);
    expect(sitemapPaths()).not.toContain("/editorial-standards");
  });
  it("dateModified only uses a date later than publishedAt", () => {
    expect(modifiedAfterPublish({ publishedAt: "2026-11-18", verifiedAt: "2026-11-18" })).toBe(
      undefined,
    );
    expect(modifiedAfterPublish({ publishedAt: "2026-11-18" })).toBe(undefined);
    expect(modifiedAfterPublish({ publishedAt: "2026-11-18", verifiedAt: "2026-11-20" })).toBe(
      "2026-11-20",
    );
  });
  it("article route shows sources only when present", () => {
    const s = read("src/routes/journal.$slug.tsx");
    expect(s).toMatch(/sources\.length > 0/);
    expect(s).toMatch(/Sources and when we checked/);
    expect(s).toMatch(/Facts last checked/);
  });
});
