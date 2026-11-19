import { describe, expect, it } from "vitest";
import {
  MAX_FILE_CHARS,
  MAX_ITEMS,
  buildBundle,
  bundleToCode,
  bundleToJson,
  cleanSavedItem,
  isSafeInternalHref,
  mergeSaved,
  mergeShop,
  parseImport,
} from "@/lib/saved-transfer";
import type { SavedItem } from "@/lib/saved";

const item = (over: Record<string, unknown> = {}) => ({
  key: "hobby:pottery",
  kind: "hobby",
  title: "Pottery",
  href: "/hobbies/pottery",
  savedAt: "2026-05-01T10:00:00.000Z",
  ...over,
});
const wrap = (saved: unknown[], shop: unknown = {}) =>
  JSON.stringify({ app: "plans-past-five", v: 1, exportedAt: "2026-05-02T00:00:00Z", saved, shop });

describe("export then import", () => {
  const saved = [
    item() as SavedItem,
    item({ key: "article:a", kind: "article", title: "A story", href: "/journal/a" }) as SavedItem,
  ];
  const b = buildBundle(saved, { "p-1": "need", "p-2": "later" }, new Date("2026-06-01T00:00:00Z"));
  it("round-trips through JSON and through the copyable code", () => {
    for (const text of [bundleToJson(b), bundleToCode(b)]) {
      const r = parseImport(text);
      expect(r.ok).toBe(true);
      if (r.ok) {
        expect(r.bundle.saved.map((s) => s.key)).toEqual(["hobby:pottery", "article:a"]);
        expect(r.bundle.shop).toEqual({ "p-1": "need", "p-2": "later" });
        expect(r.skipped).toBe(0);
      }
    }
  });
  it("handles non-ASCII titles in codes", () => {
    const r = parseImport(
      bundleToCode(buildBundle([item({ title: "Crème brûlée night ☕" }) as SavedItem], {})),
    );
    expect(r.ok && r.bundle.saved[0]?.title).toBe("Crème brûlée night ☕");
  });
});

describe("parseImport rejects bad input", () => {
  it.each([
    ["empty", ""],
    ["not json", "hello"],
    ["array", "[]"],
    ["wrong app", JSON.stringify({ app: "other", v: 1, saved: [item()] })],
    ["wrong version", JSON.stringify({ app: "plans-past-five", v: 2, saved: [item()] })],
    ["saved not array", JSON.stringify({ app: "plans-past-five", v: 1, saved: {} })],
    ["nothing valid", wrap([{ nope: 1 }])],
    ["damaged code", "PPF1.@@@@"],
    ["code not json", "PPF1.aGVsbG8"],
  ])("%s", (_n, text) => {
    expect(parseImport(text).ok).toBe(false);
  });
  it("rejects non-strings and oversize input", () => {
    expect(parseImport(42).ok).toBe(false);
    expect(parseImport(null).ok).toBe(false);
    const big = wrap([item()]) + " ".repeat(10) + "x".repeat(MAX_FILE_CHARS);
    expect(parseImport(big).ok).toBe(false);
  });
});

describe("item validation", () => {
  it("drops items with unsafe links", () => {
    for (const href of [
      "javascript:alert(1)",
      "https://evil.example/x",
      "//evil.example",
      '/ok"onmouseover="x',
      "/a<script>",
      "/a\\b",
      "data:text/html,hi",
      "",
      42,
    ])
      expect(cleanSavedItem(item({ href }))).toBeNull();
    expect(isSafeInternalHref("/hobbies/pottery")).toBe(true);
    expect(isSafeInternalHref("/make-plans?when=saturday&seed=2")).toBe(true);
  });
  it("strips HTML angle brackets and control characters from text", () => {
    const c = cleanSavedItem(
      item({ title: "<img src=x onerror=alert(1)>Tea\u0000 time", note: "a<b>\u0007c\nd" }),
    );
    expect(c?.title).toBe("img src=x onerror=alert(1)Tea time");
    expect(c?.note).toBe("abc\nd");
    expect(`${c?.title}${c?.note}`).not.toMatch(/[<>]/);
  });
  it("requires a known kind, matching key prefix, valid date and sane lengths", () => {
    expect(cleanSavedItem(item({ kind: "evil" }))).toBeNull();
    expect(cleanSavedItem(item({ key: "article:pottery" }))).toBeNull();
    expect(cleanSavedItem(item({ key: "hobby:" + "x".repeat(2000) }))).toBeNull();
    expect(cleanSavedItem(item({ savedAt: "yesterday" }))).toBeNull();
    expect(cleanSavedItem(item({ title: "   " }))).toBeNull();
    expect(cleanSavedItem(item({ title: "t".repeat(201) }))).toBeNull();
    expect(cleanSavedItem(null)).toBeNull();
    expect(cleanSavedItem([])).toBeNull();
  });
  it("ignores unknown fields and prototype keys", () => {
    const c = cleanSavedItem(
      JSON.parse(
        '{"key":"hobby:a","kind":"hobby","title":"A","href":"/a","savedAt":"2026-01-01","__proto__":{"x":1},"extra":"y"}',
      ),
    ) as Record<string, unknown>;
    expect(Object.keys(c).sort()).toEqual(["href", "key", "kind", "savedAt", "title"]);
    expect(({} as Record<string, unknown>)["x"]).toBeUndefined();
  });
  it("keeps a valid plan payload and drops a malformed one while keeping the bookmark", () => {
    const plan = {
      input: {
        when: "saturday",
        length: "half-day",
        vibe: "cozy",
        who: "friend",
        budget: "under25",
        atHome: false,
      },
      seed: 2,
      ids: ["a-1", "b-2"],
    };
    const ok = cleanSavedItem(item({ key: "plan:/x", kind: "plan", plan }));
    expect(ok?.plan?.ids).toEqual(["a-1", "b-2"]);
    const bad = cleanSavedItem(
      item({ key: "plan:/x", kind: "plan", plan: { ...plan, ids: ["<b>"] } }),
    );
    expect(bad).not.toBeNull();
    expect(bad?.plan).toBeUndefined();
  });
  it("counts skipped entries, de-duplicates keys and caps the list", () => {
    const r = parseImport(wrap([item(), item(), { bad: true }]));
    expect(r.ok && r.bundle.saved).toHaveLength(1);
    expect(r.ok && r.skipped).toBe(2);
    const many = Array.from({ length: MAX_ITEMS + 5 }, (_, i) =>
      item({ key: `hobby:h${i}`, href: `/hobbies/h${i}` }),
    );
    const r2 = parseImport(wrap(many));
    expect(r2.ok && r2.bundle.saved).toHaveLength(MAX_ITEMS);
    expect(r2.ok && r2.skipped).toBe(5);
  });
  it("validates shopping list ids and statuses", () => {
    const r = parseImport(
      wrap([item()], {
        good: "need",
        own1: "own",
        __proto__x: "need",
        "bad id": "need",
        w: "maybe",
        "<b>": "need",
      }),
    );
    expect(r.ok && r.bundle.shop).toEqual({ good: "need", own1: "own" });
    expect(r.ok && r.skipped).toBe(4);
    expect(parseImport(wrap([], { a: "later" })).ok).toBe(true);
  });
});

describe("merging", () => {
  const a = item({ savedAt: "2026-01-01T00:00:00.000Z" }) as SavedItem;
  const newer = item({ title: "Pottery (new)", savedAt: "2026-03-01T00:00:00.000Z" }) as SavedItem;
  const other = item({
    key: "hobby:knit",
    title: "Knit",
    href: "/hobbies/knit",
    savedAt: "2026-02-01T00:00:00.000Z",
  }) as SavedItem;
  it("adds, never deletes, and the newer copy wins; newest first", () => {
    const m = mergeSaved([a, other], [newer]);
    expect(m.map((i) => i.title)).toEqual(["Pottery (new)", "Knit"]);
    expect(mergeSaved([newer], [a])[0]?.title).toBe("Pottery (new)");
  });
  it("shopping list keeps local choices", () => {
    expect(mergeShop({ x: "own" }, { x: "need", y: "later" })).toEqual({ x: "own", y: "later" });
  });
});
