import { describe, expect, it } from "vitest";
import { articles, blockText } from "@/content";

/**
 * Published articles may not use unsupported superlatives. We research and curate; we do not run
 * lab tests, so words that claim a verified "best" or a guarantee are not allowed. Say what a
 * pick is good for and why instead ("a favorite for first projects", "our pick for beginners
 * because ...").
 */
export const BANNED = [
  /\bbest\b/i,
  /\bperfect(ly)?\b/i,
  /\bultimate\b/i,
  /\bguarantee[sd]?\b/i,
  /\bthe only\b/i,
  /\bfoolproof\b/i,
  /\bflawless\b/i,
  /\bunbeatable\b/i,
  /\bmust-have\b/i,
  /\bno-fail\b/i,
];

/** Explicit allowlist: "slug:title" entries whose TITLE may keep a banned word. Empty on purpose. */
const ALLOWED_TITLES: string[] = [];

const clean = (t: string) => t.replace(/\]\([^)]*\)/g, "]").replace(/\{\{product:[^}|]+\|/g, "");

function textOf(a: (typeof articles)[number]): { where: string; text: string }[] {
  const out = [{ where: "dek", text: a.dek }];
  if (!ALLOWED_TITLES.includes(`${a.slug}:title`)) out.push({ where: "title", text: a.title });
  a.body.forEach((b, i) => out.push({ where: `body[${i}] ${b.type}`, text: blockText(b) }));
  // item blocks carry extra shop copy too
  a.body.forEach((b, i) => {
    if (b.type === "shopHobby" || b.type === "shopTheArticle" || b.type === "shopMyHobby")
      out.push({
        where: `body[${i}] ${b.type} dek`,
        text: [b.title, b.dek].filter(Boolean).join(" "),
      });
  });
  return out.map((x) => ({ ...x, text: clean(x.text) }));
}

describe("published articles avoid unsupported superlatives", () => {
  it("has published articles to check", () => {
    expect(articles.length).toBeGreaterThan(20);
  });
  for (const a of articles) {
    it(a.slug, () => {
      const hits = textOf(a).flatMap(({ where, text }) =>
        BANNED.filter((re) => re.test(text)).map((re) => `${where}: ${re}`),
      );
      expect(hits).toEqual([]);
    });
  }
});
