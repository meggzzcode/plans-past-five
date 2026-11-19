import { describe, expect, it } from "vitest";
import { getArticle } from "@/content";
import { hobbies } from "@/data/hobbies";
import { selectProducts } from "@/data/catalog";

const need = (slug: string) => {
  const b = getArticle(slug)!.body.find((x) => x.type === "whatYoullNeed");
  if (!b || b.type !== "whatYoullNeed") throw new Error("no list");
  return b;
};
const HOW = "how-to-start-junk-journaling";
const SUP = "junk-journaling-supplies-for-beginners";

describe("junk journaling: one essentials list", () => {
  it("hobby page, how-to and supplies guide agree on the essentials count", () => {
    const hobby = hobbies.find((h) => h.slug === "junk-journaling")!;
    expect(need(HOW).essentials).toHaveLength(hobby.supplies.length);
    expect(need(SUP).essentials).toHaveLength(hobby.supplies.length);
  });

  it("each intro says what it is for and links to the other once", () => {
    for (const [slug, other, phrase] of [
      [HOW, SUP, /how to begin/i],
      [SUP, HOW, /what to buy/i],
    ] as const) {
      const a = getArticle(slug)!;
      expect(a.dek).toMatch(phrase);
      const intro = JSON.stringify(a.body.slice(0, 2));
      expect(intro).toMatch(phrase);
      const links = JSON.stringify(a.body).match(new RegExp(`\\(/journal/${other}\\)`, "g")) ?? [];
      expect(links).toHaveLength(1);
    }
  });

  it("the 'only one' journal pick is the thicker-paper one, with an alternative kept", () => {
    const s = selectProducts({ hobby: "junk-journaling" });
    expect(s.pick?.id).toBe("stationery-island-a5-blank-journal-180-pages");
    expect(JSON.stringify(s.pick?.specs)).toMatch(/120 gsm/);
    const alts = s.alternativesOf[s.pick!.id] ?? [];
    expect(alts.map((p) => p.id)).toContain("paperage-blank-journal-160-pages");
  });
});
