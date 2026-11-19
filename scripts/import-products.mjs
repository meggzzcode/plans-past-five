#!/usr/bin/env bun
/**
 * Import researched products from CSV into src/data/catalog.generated.ts.
 *
 *   bun run import:products [path/to/file.csv]
 *   (default: docs/commerce/PRODUCT-RESEARCH-TEMPLATE.csv)
 *
 * Schema: docs/commerce/PRODUCT-RESEARCH-TEMPLATE.csv. One row per product. Array fields use "|".
 * Validation is the same code the site uses (validateCatalogProduct), so anything that imports
 * here also passes at build time. On any error, NOTHING is written and every problem is printed.
 * Runs under bun (it imports TypeScript directly).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  amazonProductUrl,
  catalogReferenceProblems,
  validateCatalogProduct,
} from "../src/data/catalog.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const file = resolve(
  process.argv[2] ?? resolve(root, "docs/commerce/PRODUCT-RESEARCH-TEMPLATE.csv"),
);
const OUT = resolve(root, "src/data/catalog.generated.ts");

/** RFC-4180-ish parser: quotes, escaped quotes, commas and newlines inside quotes. Skips # comment lines. */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  let atLineStart = true;
  let skipping = false;
  const endRow = () => {
    row.push(cell);
    if (row.some((c) => c.trim() !== "")) rows.push(row);
    row = [];
    cell = "";
    atLineStart = true;
    skipping = false;
  };
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (skipping) {
      if (c === "\n") endRow();
      continue;
    }
    if (atLineStart && c === "#" && !quoted) {
      skipping = true;
      continue;
    }
    atLineStart = false;
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') ((cell += '"'), i++);
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") (row.push(cell), (cell = ""));
    else if (c === "\r") continue;
    else if (c === "\n") endRow();
    else cell += c;
  }
  if (cell !== "" || row.length) endRow();
  return rows;
}

const list = (v) =>
  (v ?? "")
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
const opt = (v) => (v && v.trim() ? v.trim() : undefined);

export function rowToProduct(header, cells) {
  const g = Object.fromEntries(header.map((h, i) => [h.trim(), (cells[i] ?? "").trim()]));
  const asin = g.asin; // never silently change an ASIN
  const p = {
    id: g.id,
    name: g.name,
    brand: g.brand,
    category: g.category,
    description: g.description,
    asin,
    amazonUrl: g.amazonUrl || (/^[A-Z0-9]{10}$/.test(asin) ? amazonProductUrl(asin) : ""),
    specs: list(g.specs).map((s) => {
      const i = s.indexOf(":");
      return { label: i < 0 ? s : s.slice(0, i).trim(), value: i < 0 ? "" : s.slice(i + 1).trim() };
    }),
    hobbies: list(g.hobbies),
    articles: list(g.articles),
    collections: list(g.collections),
    kitSlots: list(g.kitSlots).map((s) => {
      const [kit = "", slot = ""] = s.split("/");
      return { kit: kit.trim(), slot: slot.trim() };
    }),
    role: g.role,
    isEssential:
      g.isEssential.toLowerCase() === "true"
        ? true
        : g.isEssential.toLowerCase() === "false"
          ? false
          : g.isEssential,
    audience: g.audience,
    whySelected: g.whySelected,
    limitations: list(g.limitations),
    researchSources: list(g.researchSources),
    lastVerified: g.lastVerified,
    availability: g.availability || "check-listing",
    affiliateStatus: g.affiliateStatus || "not-activated",
    status: g.status || "candidate",
  };
  for (const k of [
    "affiliateUrl",
    "manufacturerUrl",
    "altRetailerUrl",
    "imageSource",
    "imageRights",
    "affiliateNetwork",
  ])
    if (opt(g[k])) p[k] = opt(g[k]);
  // Surface forbidden columns (price, rating...) so validation reports them.
  for (const h of header)
    if (
      !(h.trim() in p) &&
      ![
        "affiliateUrl",
        "manufacturerUrl",
        "altRetailerUrl",
        "imageSource",
        "imageRights",
        "affiliateNetwork",
      ].includes(h.trim()) &&
      opt(g[h.trim()])
    )
      p[h.trim()] = g[h.trim()];
  return p;
}

async function knownRefs() {
  try {
    const [{ hobbies }, { collections }, { kitSlotIndex }] = await Promise.all([
      import("../src/data/hobbies.ts"),
      import("../src/data/products.ts"),
      import("../src/data/kits.ts"),
    ]);
    return {
      hobbies: hobbies.map((h) => h.slug),
      collections: collections.map((c) => c.slug),
      kits: kitSlotIndex(),
    };
  } catch (e) {
    console.warn(`(skipping hobby/collection/kit cross-checks: ${e.message})`);
    return null;
  }
}

async function main() {
  const rows = parseCsv(readFileSync(file, "utf8"));
  if (rows.length === 0) return fail(["CSV has no header row"]);
  const [header, ...data] = rows;
  const errors = [];
  const products = [];
  data.forEach((cells, n) => {
    const line = n + 2;
    const p = rowToProduct(header, cells);
    if (String(p.id).startsWith("example-")) {
      errors.push(
        `row ${line}: id "${p.id}" is a template example; delete the row or give it a real id`,
      );
      return;
    }
    const problems = validateCatalogProduct(p);
    problems.forEach((m) => errors.push(`row ${line}: ${m}`));
    products.push(p);
  });
  const known = await knownRefs();
  if (known) errors.push(...catalogReferenceProblems(products, known));
  else
    errors.push(
      ...catalogReferenceProblems(products, {
        hobbies: products.flatMap((p) => p.hobbies),
        collections: products.flatMap((p) => p.collections),
        kits: Object.fromEntries(products.flatMap((p) => p.kitSlots).map((s) => [s.kit, [s.slot]])),
      }).filter((m) => /duplicate|same ASIN/.test(m)),
    );
  if (errors.length) return fail(errors);

  const body = `/**
 * GENERATED by \`bun run import:products\` from ${file.replace(root + "/", "")}.
 * Do not hand-edit. Only status "verified" records render publicly.
 */
import type { CatalogProduct } from "./catalog";

export const generatedCatalog: CatalogProduct[] = ${JSON.stringify(products, null, 2)};
`;
  writeFileSync(OUT, body);
  const verified = products.filter((p) => p.status === "verified").length;
  console.log(
    `Wrote ${products.length} products (${verified} verified, ${products.length - verified} candidates) to src/data/catalog.generated.ts`,
  );
}

function fail(errors) {
  console.error(`Import failed. Nothing was written.\n`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error(`\n${errors.length} problem(s). Fix the CSV and run again.`);
  process.exit(1);
}

if (import.meta.main ?? process.argv[1] === fileURLToPath(import.meta.url)) await main();
