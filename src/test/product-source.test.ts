/**
 * The one product source (content/products/*.json): it validates, it generates exactly what ships,
 * references never silently turn into plain text, and replacing a product updates every surface.
 */
import {
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, describe, expect, it } from "vitest";
// @ts-expect-error plain .mjs helper without type declarations
import * as lib from "../../scripts/content-lib.mjs";
import {
  catalog,
  filterVerified,
  getCatalogProduct,
  selectProducts,
  verifiedCatalog,
  type CatalogProduct,
} from "@/data/catalog";
import {
  PRODUCT_ROLES,
  productSetProblems,
  resolveProductId,
  toCatalogProduct,
  type ProductSource,
} from "@/data/catalog-rules";
import { hobbies } from "@/data/hobbies";
import { collections } from "@/data/products";
import { fillKit, kitSlotIndex, kits } from "@/data/kits";

const repo = path.resolve(__dirname, "../..");
const tmpRoots: string[] = [];
afterAll(() => tmpRoots.forEach((r) => rmSync(r, { recursive: true, force: true })));

/** A scratch copy of everything the build script reads, so tests never touch the repo. */
function scratch() {
  const root = mkdtempSync(path.join(tmpdir(), "products-"));
  tmpRoots.push(root);
  cpSync(path.join(repo, "content"), path.join(root, "content"), { recursive: true });
  mkdirSync(path.join(root, "src/data"), { recursive: true });
  for (const f of [
    "categories.ts",
    "images.ts",
    "images.extra.ts",
    "hobbies.ts",
    "products.ts",
    "kits.ts",
    "catalog-rules.ts",
  ])
    cpSync(path.join(repo, "src/data", f), path.join(root, "src/data", f));
  cpSync(path.join(repo, "src/assets"), path.join(root, "src/assets"), { recursive: true });
  mkdirSync(path.join(root, "scripts"), { recursive: true });
  for (const f of ["content-lib.mjs", "build-content.mjs"])
    cpSync(path.join(repo, "scripts", f), path.join(root, "scripts", f));
  symlinkSync(path.join(repo, "node_modules"), path.join(root, "node_modules"));
  return root;
}
const productPath = (root: string, id: string) => path.join(root, "content/products", `${id}.json`);
const readProduct = (root: string, id: string): ProductSource =>
  JSON.parse(readFileSync(productPath(root, id), "utf8"));
const writeProduct = (root: string, p: Record<string, unknown>) =>
  writeFileSync(productPath(root, String(p["id"])), `${JSON.stringify(p, null, 2)}\n`);
const problems = (root: string) => lib.validateContent(root).problems as string[];
const liveFrom = (root: string): CatalogProduct[] =>
  filterVerified((lib.validateContent(root).products as ProductSource[]).map(toCatalogProduct));
const redirectsFrom = (root: string): Record<string, string> =>
  lib.productRedirectsFrom(lib.validateContent(root).products);

const SWAP_ID = "scotch-glue-stick-photo-safe-4-pack";

describe("the real product source", () => {
  it("validates with no problems, one file per product, file name equals id", () => {
    expect(lib.validateContent(repo).problems).toEqual([]);
    const files = readdirSync(path.join(repo, "content/products")).filter((f) =>
      f.endsWith(".json"),
    );
    expect(files.length).toBe(66);
  });
  it("the pattern-matched slug lists equal the real TypeScript data", () => {
    const k = lib.knownRefsFromSource(repo);
    expect([...k.hobbies].sort()).toEqual(hobbies.map((h) => h.slug).sort());
    expect([...k.collections].sort()).toEqual(collections.map((c) => c.slug).sort());
    expect(k.kits).toEqual(kitSlotIndex());
  });
  it("src/data/catalog.generated.ts is exactly what the build generates (not stale)", () => {
    const r = lib.buildContent(repo, { write: false });
    expect(readFileSync(path.join(repo, "src/data/catalog.generated.ts"), "utf8")).toBe(
      r.outputs["src/data/catalog.generated.ts"],
    );
  });
  it("only shown products ship: no candidates, held or discontinued records, reasons or notes", () => {
    const src = readFileSync(path.join(repo, "src/data/catalog.generated.ts"), "utf8");
    expect(catalog.length).toBe(29);
    for (const p of catalog) expect(p.status).toBe("verified");
    expect(src).not.toMatch(/"statusReason"|"hold"|Kid-marketed|Cowork|"status": "candidate"/);
  });
  it("every product reference in kits, collections and hobbies points at a real thing", () => {
    for (const id of readdirSync(path.join(repo, "content/products")).map((f) => f.slice(0, -5))) {
      const p = JSON.parse(readFileSync(path.join(repo, "content/products", `${id}.json`), "utf8"));
      for (const s of p.kitSlots)
        expect(kitSlotIndex()[s.kit], `${id} kit ${s.kit}`).toContain(s.slot);
      for (const c of p.collections)
        expect(
          collections.some((x) => x.slug === c),
          `${id} collection ${c}`,
        ).toBe(true);
      for (const h of p.hobbies)
        expect(
          hobbies.some((x) => x.slug === h),
          `${id} hobby ${h}`,
        ).toBe(true);
    }
    for (const k of kits) expect(k.slots.length).toBeGreaterThan(0);
  });
});

describe("replacement resolution", () => {
  let n = 0;
  const mk = (id: string, status: ProductSource["status"], replacedBy?: string): ProductSource =>
    ({
      ...readProduct(repo, SWAP_ID),
      id,
      asin: `B0TESTA${100 + n}`,
      amazonUrl: `https://www.amazon.com/dp/B0TESTA${100 + n++}`,
      status,
      ...(status === "held" || status === "discontinued" ? { statusReason: "test reason" } : {}),
      ...(replacedBy ? { replacedBy } : {}),
    }) as ProductSource;
  const map = (...ps: ProductSource[]) => new Map(ps.map((p) => [p.id, p]));
  it("a live id resolves to itself", () => {
    expect(resolveProductId("aaa", map(mk("aaa", "verified")))).toMatchObject({
      ok: true,
      id: "aaa",
    });
  });
  it("follows a chain to a live product", () => {
    const m = map(
      mk("old", "discontinued", "mid"),
      mk("mid", "held", "new"),
      mk("new", "verified"),
    );
    expect(resolveProductId("old", m)).toMatchObject({ ok: true, id: "new", via: ["old", "mid"] });
  });
  it("fails on an unknown id, a missing successor, a dead end and a cycle, in plain words", () => {
    expect(resolveProductId("nope", map())).toMatchObject({ ok: false });
    const dead = resolveProductId("old", map(mk("old", "discontinued")));
    expect(dead).toMatchObject({ ok: false });
    expect((dead as { problem: string }).problem).toMatch(/has no replacement/);
    expect(
      (resolveProductId("old", map(mk("old", "held", "ghost"))) as { problem: string }).problem,
    ).toMatch(/no product with that id/);
    const loop = resolveProductId("a", map(mk("a", "held", "b"), mk("b", "held", "a")));
    expect((loop as { problem: string }).problem).toMatch(/circle \(a -> b -> a\)/);
  });
  it("productSetProblems reports duplicates, cycles and dead ends once, naming the file", () => {
    const out = productSetProblems([
      mk("a", "held", "b"),
      mk("b", "held", "a"),
      mk("c", "discontinued", "d"),
      mk("d", "held"),
      mk("a", "verified"),
    ]);
    const text = out.join("\n");
    expect(text).toMatch(/used by more than one product file/);
    expect(text).toMatch(/content\/products\/c\.json, field "replacedBy"/);
  });
  it("a candidate or live record may not carry replacedBy", () => {
    const bad = { ...readProduct(repo, SWAP_ID), replacedBy: "something-else" };
    const root = scratch();
    writeProduct(root, bad);
    expect(problems(root).join("\n")).toMatch(/only held or discontinued products can be replaced/);
  });
});

describe("replacing a product updates every reference", () => {
  const surfaces = (list: CatalogProduct[]) => {
    const rows: Record<string, string[]> = {};
    const add = (k: string, ps: CatalogProduct[]) =>
      (rows[k] = ps.map((p) => `${p.id}:${p.asin}:${p.name}`));
    for (const h of hobbies) add(`hobby:${h.slug}`, selectProducts({ hobby: h.slug }, list).all);
    for (const c of collections)
      add(`collection:${c.slug}`, selectProducts({ collection: c.slug }, list).all);
    for (const k of kits)
      rows[`kit:${k.id}`] = fillKit(k, list)
        .flatMap((f) => [f.product, ...f.alternatives])
        .map((p) => `${p.id}:${p.asin}:${p.name}`);
    for (const slug of readdirSync(path.join(repo, "content/articles")).map((f) => f.slice(0, -5)))
      add(`article:${slug}`, selectProducts({ article: slug }, list).all);
    return rows;
  };
  it("same id, new name and ASIN: every hobby page, article, kit and collection shows the new one", () => {
    const root = scratch();
    const before = surfaces(liveFrom(root));
    const old = readProduct(root, SWAP_ID);
    const swapped = {
      ...old,
      name: "Replacement Glue Stick Four Pack",
      asin: "B0REPLACE9",
    };
    writeProduct(root, swapped);
    expect(problems(root)).toEqual([]); // every inline mention still resolves
    const after = surfaces(liveFrom(root));
    const placed = Object.entries(before).filter(([, v]) =>
      v.some((x) => x.startsWith(`${SWAP_ID}:`)),
    );
    expect(placed.length).toBeGreaterThanOrEqual(5); // hobby page, articles, kits and collections
    for (const [surface] of placed) {
      expect(after[surface], surface).toContain(
        `${SWAP_ID}:B0REPLACE9:Replacement Glue Stick Four Pack`,
      );
    }
    // nothing anywhere still carries the old listing
    for (const [surface, v] of Object.entries(after))
      for (const x of v) expect(x, surface).not.toContain(old.asin);
    // and the generated module the site imports carries the new one only
    const out = lib.buildContent(root, { write: false }).outputs[
      "src/data/catalog.generated.ts"
    ] as string;
    expect(out).toContain("B0REPLACE9");
    expect(out).not.toContain(`"asin": "${old.asin}"`);
    expect(out).not.toContain(`"amazonUrl": "https://www.amazon.com/dp/${old.asin}"`);
  });
  it("new id with replacedBy: old references keep working and now show the successor", () => {
    const root = scratch();
    const old = readProduct(root, SWAP_ID);
    const fresh = {
      ...old,
      id: "glue-stick-successor",
      name: "Successor Glue Stick",
      asin: "B0SUCCESS1",
    };
    writeProduct(root, fresh);
    writeProduct(root, {
      ...old,
      status: "discontinued",
      statusReason: "No longer sold",
      replacedBy: "glue-stick-successor",
    });
    expect(problems(root)).toEqual([]);
    const live = liveFrom(root);
    const map = redirectsFrom(root);
    expect(map[SWAP_ID]).toBe("glue-stick-successor");
    expect(live.some((p) => p.id === SWAP_ID)).toBe(false);
    // an inline {{product:scotch-glue-stick-photo-safe-4-pack|a glue stick}} now resolves to the successor
    expect(getCatalogProduct(SWAP_ID, live, map)?.name).toBe("Successor Glue Stick");
    // hobby, kit and collection placements carried by the successor's copied tags
    expect(selectProducts({ hobby: "junk-journaling" }, live).all.map((p) => p.id)).toContain(
      "glue-stick-successor",
    );
    const kit = kits.find((k) => k.id === "junk-journaling")!;
    expect(fillKit(kit, live).some((f) => f.product.id === "glue-stick-successor")).toBe(true);
  });
});

describe("a dangling reference fails the content build, in plain English", () => {
  it("removing a product that an article mentions fails, naming the article, block and id", () => {
    const root = scratch();
    rmSync(productPath(root, SWAP_ID));
    const text = problems(root).join("\n");
    expect(text).toMatch(/content\/articles\/[a-z0-9-]+\.json, block #\d+ \(\w+\), field "[^"]+"/);
    expect(text).toContain(`{{product:${SWAP_ID}|`);
    expect(text).toMatch(/there is no product with the id "scotch-glue-stick-photo-safe-4-pack"/);
  });
  it("holding a mentioned product with no replacement fails; adding replacedBy fixes it", () => {
    const root = scratch();
    const p = readProduct(root, SWAP_ID);
    writeProduct(root, { ...p, status: "held", statusReason: "paused for a check" });
    expect(problems(root).join("\n")).toMatch(/is held and has no replacement/);
    writeProduct(root, {
      ...p,
      status: "held",
      statusReason: "paused",
      replacedBy: "mr-pen-washi-tape-21-rolls",
    });
    expect(problems(root)).toEqual([]);
  });
  it("a replacement cycle fails", () => {
    const root = scratch();
    const a = readProduct(root, SWAP_ID);
    const b = readProduct(root, "mr-pen-washi-tape-21-rolls");
    writeProduct(root, { ...a, status: "held", statusReason: "x", replacedBy: b.id });
    writeProduct(root, { ...b, status: "held", statusReason: "y", replacedBy: a.id });
    expect(problems(root).join("\n")).toMatch(/go in a circle/);
  });
  it("a misspelt mention, a kit slot that does not exist and an unknown collection fail", () => {
    const root = scratch();
    const a = JSON.parse(
      readFileSync(path.join(root, "content/articles/at-home-creative-weekend.json"), "utf8"),
    );
    a.body[0] = { type: "p", text: "Bad {{product:Glue Stick|a glue stick}} here." };
    writeFileSync(
      path.join(root, "content/articles/at-home-creative-weekend.json"),
      JSON.stringify(a, null, 2),
    );
    const p = readProduct(root, "mr-pen-washi-tape-21-rolls");
    writeProduct(root, {
      ...p,
      kitSlots: [{ kit: "junk-journaling", slot: "no-such-slot" }],
      collections: ["no-such-collection"],
    });
    const text = problems(root).join("\n");
    expect(text).toMatch(/is not written correctly/);
    expect(text).toMatch(/kit "junk-journaling" has no slot "no-such-slot"/);
    expect(text).toMatch(/unknown collection "no-such-collection"/);
  });
  it("node scripts/build-content.mjs exits 1 and prints the file and the id", () => {
    const root = scratch();
    rmSync(productPath(root, SWAP_ID));
    const r = spawnSync(process.execPath, ["scripts/build-content.mjs", "--check"], {
      cwd: root,
      encoding: "utf8",
    });
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/NOT rebuilt/);
    expect(r.stderr).toContain("content/articles/");
    expect(r.stderr).toContain(SWAP_ID);
    const ok = spawnSync(process.execPath, ["scripts/build-content.mjs", "--check"], {
      cwd: scratch(),
      encoding: "utf8",
    });
    expect(ok.status, ok.stderr).toBe(0);
  });
});

describe("generic search terms (the retired product types)", () => {
  it("src/data/search-terms.generated.ts is exactly what the build generates", () => {
    const r = lib.buildContent(repo, { write: false });
    expect(readFileSync(path.join(repo, "src/data/search-terms.generated.ts"), "utf8")).toBe(
      r.outputs["src/data/search-terms.generated.ts"],
    );
  });
  it("a shop block naming an id that is neither a search term nor known fails the build", () => {
    const root = scratch();
    const file = path.join(root, "content/articles/pickleball-for-beginners.json");
    const a = JSON.parse(readFileSync(file, "utf8"));
    const i = a.body.findIndex((b: { type: string }) => b.type === "shopHobby");
    a.body[i].productIds = ["pickleball-paddles", "no-such-term"];
    writeFileSync(file, JSON.stringify(a, null, 2));
    const text = problems(root).join("\n");
    expect(text).toContain("content/articles/pickleball-for-beginners.json");
    expect(text).toContain(`block #${i + 1} (shopHobby), field "productIds": "no-such-term"`);
  });
  it("a search term with a bad collection, bad hobby or odd search words fails", () => {
    const root = scratch();
    const file = path.join(root, "content/product-search-terms.json");
    const t = JSON.parse(readFileSync(file, "utf8"));
    t.terms[0] = { ...t.terms[0], collection: "nope", hobbies: ["not-a-hobby"] };
    t.terms[1] = { ...t.terms[1], query: "Air-Dry!" };
    writeFileSync(file, JSON.stringify(t, null, 2));
    const text = problems(root).join("\n");
    expect(text).toMatch(/"nope" is not a shop collection/);
    expect(text).toMatch(/"not-a-hobby" is not a hobby/);
    expect(text).toMatch(/lowercase words and numbers/);
  });
  it("the article files no longer carry the dead top-level productIds field", () => {
    for (const f of readdirSync(path.join(repo, "content/articles"))) {
      const a = JSON.parse(readFileSync(path.join(repo, "content/articles", f), "utf8"));
      expect(a, f).not.toHaveProperty("productIds");
    }
  });
});

describe("what ships is the live set", () => {
  it("verifiedCatalog equals the shipped list and has no duplicate ids or ASINs", () => {
    expect(verifiedCatalog.length).toBe(catalog.length);
    expect(new Set(catalog.map((p) => p.id)).size).toBe(catalog.length);
    expect(new Set(catalog.map((p) => p.asin)).size).toBe(catalog.length);
  });
});

describe("the Pages CMS products form matches the data rules", () => {
  const yml = readFileSync(path.join(repo, ".pages.yml"), "utf8");
  const section = yml.slice(
    yml.indexOf("  - name: products\n"),
    yml.indexOf("  - name: product-search-terms"),
  );
  it("has a products collection over content/products and a search-terms file", () => {
    expect(section).toContain("path: content/products");
    expect(yml).toContain("path: content/product-search-terms.json");
  });
  it("offers every status, link type, role, collection and kit the code accepts, and nothing else", () => {
    const values = (after: string) => {
      const start = section.indexOf(`name: ${after}\n`);
      const end = section.indexOf("\n      - ", start + 1);
      return [
        ...section.slice(start, end < 0 ? undefined : end).matchAll(/value: ([a-z-]+),/g),
      ].map((m) => m[1]);
    };
    expect(values("status")).toEqual(["candidate", "verified", "held", "discontinued"]);
    expect(values("linkType")).toEqual(["amazon-affiliate-ready", "editorial-pick"]);
    expect([...values("role")].sort()).toEqual([...PRODUCT_ROLES].sort());
    expect([...values("collections")].sort()).toEqual(collections.map((c) => c.slug).sort());
    const kitStart = section.indexOf("name: kitSlots");
    const kitIds = [...section.slice(kitStart).matchAll(/value: ([a-z-]+),/g)].map((m) => m[1]);
    expect([...kitIds].sort()).toEqual(kits.map((k) => k.id).sort());
  });
  it("every field a product file uses has a form field (so nothing is uneditable)", () => {
    const names = new Set([...section.matchAll(/name: ([A-Za-z]+)/g)].map((m) => m[1]));
    for (const f of readdirSync(path.join(repo, "content/products"))) {
      const p = JSON.parse(readFileSync(path.join(repo, "content/products", f), "utf8"));
      // image fields and affiliate bookkeeping are kept by the CMS merge setting, not shown
      for (const k of Object.keys(p)) {
        if (/^(image(Url|Credit|Source|Rights)|affiliateStatus|affiliateNetwork)$/.test(k))
          continue;
        expect(names.has(k), `${f}: ${k}`).toBe(true);
      }
    }
  });
});
