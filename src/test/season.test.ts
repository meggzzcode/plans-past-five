import { describe, expect, it } from "vitest";
import { hobbies } from "@/data/hobbies";
import {
  SEASON_COPY,
  seasonOf,
  seasonOfMonth,
  seasonalHobbies,
  seasonScore,
  weekOfMonth,
  weekendHobbies,
} from "@/lib/season";

describe("seasonOfMonth", () => {
  it("maps every month, wrapping December into winter", () => {
    const expected = [
      "winter",
      "winter",
      "spring",
      "spring",
      "spring",
      "summer",
      "summer",
      "summer",
      "autumn",
      "autumn",
      "autumn",
      "winter",
    ];
    expect([...Array(12).keys()].map(seasonOfMonth)).toEqual(expected);
    expect(seasonOfMonth(12)).toBe("winter");
    expect(seasonOfMonth(-1)).toBe("winter");
    expect(seasonOf(new Date(2026, 10, 19))).toBe("autumn");
  });
});

describe("seasonalHobbies", () => {
  it("returns a stable, varied set for every month using real hobby data", () => {
    for (let m = 0; m < 12; m++) {
      const d = new Date(2026, m, 15);
      const a = seasonalHobbies(d);
      expect(a.length).toBe(4);
      expect(a.map((h) => h.slug)).toEqual(seasonalHobbies(d).map((h) => h.slug));
      expect(new Set(a.map((h) => h.slug)).size).toBe(a.length);
      for (const h of a) expect(seasonScore(h, seasonOf(d))).toBeGreaterThan(0);
      const perCat = a.reduce<Record<string, number>>(
        (acc, h) => ({ ...acc, [h.category]: (acc[h.category] ?? 0) + 1 }),
        {},
      );
      expect(Math.max(...Object.values(perCat))).toBeLessThanOrEqual(2);
    }
  });
  it("favours outdoor hobbies in summer and indoor ones in winter", () => {
    const outdoorShare = (m: number) => {
      const picks = seasonalHobbies(new Date(2026, m, 10));
      return picks.filter((h) => h.tags.includes("outdoors")).length / picks.length;
    };
    expect(outdoorShare(6)).toBeGreaterThan(outdoorShare(0));
    const winter = seasonalHobbies(new Date(2026, 0, 10));
    expect(winter.filter((h) => h.tags.includes("at-home")).length).toBeGreaterThanOrEqual(3);
  });
  it("rotates month to month within a season and never exceeds the list or count", () => {
    const a = seasonalHobbies(new Date(2026, 8, 10))
      .map((h) => h.slug)
      .join();
    const b = seasonalHobbies(new Date(2026, 9, 10))
      .map((h) => h.slug)
      .join();
    const c = seasonalHobbies(new Date(2026, 10, 10))
      .map((h) => h.slug)
      .join();
    expect(new Set([a, b, c]).size).toBeGreaterThan(1);
    expect(
      seasonalHobbies(new Date(2026, 5, 1), hobbies.slice(0, 2), 4).length,
    ).toBeLessThanOrEqual(2);
    expect(seasonalHobbies(new Date(2026, 5, 1), [], 4)).toEqual([]);
  });
  it("has copy for every season", () => {
    expect(Object.keys(SEASON_COPY).sort()).toEqual(["autumn", "spring", "summer", "winter"]);
  });
});

describe("weekendHobbies (this weekend)", () => {
  it("is deterministic, varied and built only from existing hobbies for the season", () => {
    for (let m = 0; m < 12; m++) {
      for (const day of [3, 10, 17, 24, 30]) {
        const d = new Date(2026, m, day);
        const a = weekendHobbies(d);
        expect(a.length).toBe(4);
        expect(a.map((h) => h.slug)).toEqual(weekendHobbies(d).map((h) => h.slug));
        expect(new Set(a.map((h) => h.slug)).size).toBe(4);
        for (const h of a) expect(hobbies).toContain(h);
        for (const h of a) expect(seasonScore(h, seasonOf(d))).toBeGreaterThan(0);
        const perCat = a.reduce<Record<string, number>>(
          (acc, h) => ({ ...acc, [h.category]: (acc[h.category] ?? 0) + 1 }),
          {},
        );
        expect(Math.max(...Object.values(perCat))).toBeLessThanOrEqual(2);
      }
    }
  });
  it("is the same all week and rotates between weeks of the month", () => {
    const slugs = (day: number) =>
      weekendHobbies(new Date(2026, 10, day))
        .map((h) => h.slug)
        .join();
    expect(slugs(8)).toBe(slugs(14));
    expect(
      new Set([slugs(2), slugs(9), slugs(16), slugs(23), slugs(30)]).size,
    ).toBeGreaterThanOrEqual(4);
  });
  it("numbers the weeks of the month 1 to 5", () => {
    expect(
      [1, 7, 8, 14, 15, 21, 22, 28, 29, 31].map((d) => weekOfMonth(new Date(2026, 0, d))),
    ).toEqual([1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);
  });
  it("leans on the weekend tag", () => {
    const share = (m: number) => {
      const picks = weekendHobbies(new Date(2026, m, 10));
      return picks.filter((h) => h.tags.includes("weekend")).length;
    };
    expect(share(6)).toBeGreaterThanOrEqual(2);
  });
});
