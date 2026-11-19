import { describe, expect, it } from "vitest";
import { emptySearchSuggestions, search, searchDetailed } from "@/lib/search";
import { hobbies } from "@/data/hobbies";

const hobbyHits = (q: string) => search(q).filter((h) => h.kind === "Hobby");

describe("search understands human phrases", () => {
  it("finds yoga", () => {
    const hits = search("yoga");
    expect(hits[0]?.title).toBe("Yoga for Beginners");
    expect(hits[0]?.to).toBe("/hobbies/yoga-for-beginners");
  });

  it("'cheap date' returns low-cost hobbies that suit two", () => {
    const h = hobbyHits("cheap date");
    expect(h.length).toBeGreaterThan(0);
    for (const hit of h) {
      const hobby = hobbies.find((x) => `/hobbies/${x.slug}` === hit.to)!;
      expect(hobby.tags).toContain("low-cost");
      expect(hobby.tags).toContain("social");
    }
  });

  it("'something to do with friends after work' returns social, after-work hobbies", () => {
    const out = searchDetailed("something to do with friends after work");
    const h = out.hits.filter((x) => x.kind === "Hobby");
    expect(h.length).toBeGreaterThan(3);
    expect(out.understood).toEqual(expect.arrayContaining(["better with others", "after work"]));
    for (const hit of h) {
      const hobby = hobbies.find((x) => `/hobbies/${x.slug}` === hit.to)!;
      expect(hobby.tags).toEqual(expect.arrayContaining(["social", "after-work"]));
    }
  });

  it("'rainy day' returns at-home hobbies only", () => {
    const h = hobbyHits("rainy day");
    expect(h.length).toBeGreaterThan(0);
    for (const hit of h) {
      const hobby = hobbies.find((x) => `/hobbies/${x.slug}` === hit.to)!;
      expect(hobby.settings).toContain("home");
    }
  });

  it("'free' returns free hobbies, not hobbies that merely mention the word", () => {
    const h = hobbyHits("free");
    expect(h.length).toBeGreaterThan(0);
    for (const hit of h) {
      expect(hobbies.find((x) => `/hobbies/${x.slug}` === hit.to)!.cost).toBe("free");
    }
  });

  it("'alone' returns solo hobbies and leaves out social-only ones", () => {
    const titles = hobbyHits("alone").map((h) => h.title);
    expect(titles).toContain("Reading");
    expect(titles).not.toContain("Tennis");
  });

  // Updated deliberately: hobbies now always rank above guides, so the first hit is a hobby and the
  // weekend article follows the hobbies.
  it("'weekend' returns hobbies first, then a weekend article", () => {
    const hits = search("weekend");
    expect(hits[0]!.kind).toBe("Hobby");
    const firstJournal = hits.findIndex((h) => h.kind === "Journal");
    expect(firstJournal).toBeGreaterThan(0);
    expect(hits.slice(0, firstJournal).every((h) => h.kind === "Hobby")).toBe(true);
  });

  it("'kids' honestly returns nothing and gives an empty state", () => {
    const out = searchDetailed("kids");
    expect(out.hits).toEqual([]);
    expect(out.empty?.message).toMatch(/adults/i);
  });

  it("ranks a title match above a body match", () => {
    const hits = search("pottery");
    expect(hits[0]!.title.toLowerCase()).toContain("pottery");
  });

  it("empty search is empty, with suggestions", () => {
    expect(searchDetailed("   ").hits).toEqual([]);
    expect(searchDetailed("zzzxqv").empty).toBeTruthy();
  });
});

describe("emptySearchSuggestions", () => {
  it("offers queries that really return results, plus quiz and directory links", () => {
    const s = emptySearchSuggestions("nothing here");
    expect(s.suggestedQueries.length).toBeGreaterThanOrEqual(4);
    for (const q of s.suggestedQueries) expect(search(q.query).length, q.query).toBeGreaterThan(0);
    const to = s.links.map((l) => l.to);
    expect(to).toContain("/hobby-finder");
    expect(to).toContain("/hobbies");
    expect(s.message).toContain("nothing here");
  });
});
