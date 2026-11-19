#!/usr/bin/env bun
/**
 * DEVELOPER / BULK-MIGRATION TOOL. Not part of the owner's workflow: the owner edits products in
 * Pages CMS (content/products/*.json, see docs/buyer/PRODUCT-MANAGEMENT.md).
 *
 * Import researched products from a CSV into content/products/<id>.json (one file per product).
 *
 *   bun run import:products file.csv            validate, then write NEW products into content/products
 *   bun run import:products file.csv --check    validate only, write nothing (dry run)
 *   --update                                    also overwrite products whose id already has a file (default: skipped and reported)
 *   --out <dir>                                 write there instead of content/products (tests)
 *   (blank template: docs/commerce/PRODUCT-RESEARCH-TEMPLATE.csv; docs/commerce/product-research.csv is a frozen snapshot of the 66 migrated rows)
 *
 * Safety: nothing is written unless the WHOLE file validates; the write is atomic (temp file, then
 * rename), so a failed or interrupted import never leaves a half-written file. Existing product files
 * are never overwritten unless --update is given, and nothing is ever deleted.
 *
 * Schema: COLUMNS below (copied into docs/commerce/PRODUCT-RESEARCH-TEMPLATE.csv; explained in
 * PRODUCT-RESEARCH-TEMPLATE.md). `notes` is an internal, optional column: read, never stored or published. One row per product. Array fields use "|".
 * Validation is the same code the site uses (validateCatalogProduct), so anything that imports
 * here also passes at build time. On any error, NOTHING is written and every problem is printed
 * with its line number in the file. Runs under bun (it imports TypeScript directly).
 *
 * Accepts what Google Sheets ("Comma Separated Values (.csv)") and Excel ("CSV UTF-8") export:
 * BOM, CRLF line endings, quoted commas/newlines, empty trailing rows and columns, TRUE/FALSE
 * booleans, header names in any letter case. It refuses, with a precise message: semicolon/tab
 * exports, .xlsx files, unknown or price-like columns, and rows wider than the header.
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  amazonProductUrl,
  catalogReferenceProblems,
  isForbiddenField,
  validateCatalogProduct,
} from "../src/data/catalog-rules.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_OUT = resolve(root, "content/products");
/** Every column the template defines, in canonical spelling. */
export const COLUMNS = [
  "id",
  "name",
  "brand",
  "category",
  "description",
  "asin",
  "amazonUrl",
  "manufacturerUrl",
  "altRetailerUrl",
  "specs",
  "hobbies",
  "articles",
  "collections",
  "kitSlots",
  "role",
  "isEssential",
  "audience",
  "whySelected",
  "limitations",
  "shortName",
  "benefit",
  "compare",
  "lead",
  "onlyOne",
  "hold",
  "imageUrl",
  "imageCredit",
  "imageSource",
  "imageRights",
  "researchSources",
  "lastVerified",
  "availability",
  "affiliateNetwork",
  "affiliateStatus",
  "status",
  "notes",
];
/** Optional columns: may be missing from the header entirely. */
const OPTIONAL = new Set([
  "amazonUrl",
  "manufacturerUrl",
  "altRetailerUrl",
  "imageSource",
  "imageRights",
  "affiliateNetwork",
  "availability",
  "affiliateStatus",
  "status",
  "shortName",
  "benefit",
  "compare",
  "lead",
  "onlyOne",
  "hold",
  "imageUrl",
  "imageCredit",
  "notes",
]);
const OPTIONAL_STRINGS = [
  "manufacturerUrl",
  "altRetailerUrl",
  "imageSource",
  "imageRights",
  "affiliateNetwork",
  "shortName",
  "benefit",
  "compare",
  "hold",
  "imageUrl",
  "imageCredit",
];
const OPTIONAL_BOOLEANS = ["lead", "onlyOne"];

/** Id prefixes that mark invented rows. They are refused here so a fixture can never ship by accident. */
export const RESERVED_ID_PREFIXES = ["example-", "fixture-", "test-", "demo-", "sample-"];

/** Decode a file: UTF-8 (BOM stripped) or the UTF-16 Excel's "Unicode Text" writes. Refuses .xlsx. */
export function decodeCsvBuffer(buf) {
  if (buf.length >= 2 && buf[0] === 0x50 && buf[1] === 0x4b)
    throw new Error(
      "this is a spreadsheet file (.xlsx), not a CSV. Export it: Google Sheets > File > Download > Comma Separated Values (.csv); Excel > Save As > CSV UTF-8",
    );
  if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe)
    return buf.toString("utf16le").slice(1);
  return buf.toString("utf8");
}

/**
 * RFC-4180-ish parser: quotes, escaped quotes, commas and newlines inside quotes, CRLF, BOM.
 * Skips blank lines, rows that are only commas, and lines starting with # (outside quotes).
 * The returned array has a parallel `lines` property: the 1-based file line each row starts on.
 */
export function parseCsv(input) {
  const text = input.charCodeAt(0) === 0xfeff ? input.slice(1) : input;
  const rows = [];
  rows.lines = [];
  let row = [];
  let cell = "";
  let quoted = false;
  let atLineStart = true;
  let skipping = false;
  let line = 1;
  let start = 1;
  const endRow = () => {
    row.push(cell);
    if (row.some((c) => c.trim() !== "")) {
      rows.push(row);
      rows.lines.push(start);
    }
    row = [];
    cell = "";
    atLineStart = true;
    skipping = false;
    start = line;
  };
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === "\n") line++;
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
      else if (c === "\r" && text[i + 1] === "\n") continue;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") (row.push(cell), (cell = ""));
    else if (c === "\r") continue;
    else if (c === "\n") endRow();
    else cell += c;
  }
  if (quoted) {
    rows.unterminatedQuoteLine = start;
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
// Zero-width, bidi and other invisible characters that survive copy-paste from web pages.
const INVISIBLE = new RegExp("[\\u200b-\\u200f\\u2028\\u2029\\u202a-\\u202e\\u2060\\u00ad\\ufeff]");

/**
 * Validate and canonicalise the header row. Returns { header, errors }: `header` has canonical
 * column names ("" for ignorable empty columns).
 */
export function checkHeader(rawHeader) {
  const errors = [];
  if (rawHeader.length === 1) {
    if (/[;\t]/.test(rawHeader[0]))
      errors.push(
        'the header is one cell with ";" or tab characters in it: the file is not comma-separated. Re-export as "Comma Separated Values (.csv)" (Excel: choose "CSV UTF-8", not "CSV (semicolon delimited)" or "Text (tab delimited)")',
      );
    else errors.push("the header row has a single column; is this a comma-separated CSV?");
    return { header: [], errors };
  }
  const byLower = new Map(COLUMNS.map((c) => [c.toLowerCase(), c]));
  const seen = new Map();
  const header = rawHeader.map((h, i) => {
    const name = h.replace(/\s+/g, " ").trim();
    if (name === "") return "";
    const canon = byLower.get(name.toLowerCase());
    if (!canon) {
      errors.push(
        isForbiddenField(name)
          ? `column "${name}" is not allowed (no prices, ratings, review counts, discounts or stock claims). Delete the column`
          : `unknown column "${name}". Delete it or keep it in a separate sheet; allowed columns: ${COLUMNS.join(", ")}`,
      );
      return `?${i}`;
    }
    if (seen.has(canon))
      errors.push(`column "${canon}" appears twice (columns ${seen.get(canon) + 1} and ${i + 1})`);
    seen.set(canon, i);
    return canon;
  });
  const missing = COLUMNS.filter((c) => !OPTIONAL.has(c) && !seen.has(c));
  if (missing.length) errors.push(`missing required column(s): ${missing.join(", ")}`);
  return { header, errors };
}

/** Convert one row to a product-shaped object. Per-field format problems are pushed onto `issues`. */
export function rowToProduct(header, cells, issues = []) {
  const g = {};
  header.forEach((h, i) => {
    if (h && !h.startsWith("?")) g[h] = (cells[i] ?? "").trim();
  });
  for (const c of COLUMNS) g[c] ??= "";
  for (const k of ["id", "asin", "amazonUrl", "lastVerified"])
    if (INVISIBLE.test(g[k]) || /[^\x20-\x7e]/.test(g[k]))
      issues.push(
        `${k} "${g[k]}" contains invisible or non-ASCII characters (often from copy-paste). Retype it`,
      );
  const asin = g.asin; // never silently change an ASIN
  if (/^\d{8,9}$/.test(asin))
    issues.push(
      `asin "${asin}" has only digits and is ${asin.length} long: a spreadsheet probably dropped a leading zero. Format the column as plain text and re-enter it`,
    );
  if (/^\d{4,6}$/.test(g.lastVerified) || /^\d{1,2}[/.-]\d{1,2}[/.-]\d{2,4}$/.test(g.lastVerified))
    issues.push(
      `lastVerified "${g.lastVerified}" was reformatted by the spreadsheet. Format the column as plain text and type the date as YYYY-MM-DD`,
    );
  const specs = list(g.specs).map((s) => {
    const i = s.indexOf(":");
    if (i < 0)
      issues.push(`specs entry "${s}" needs the form label:value (separate entries with |)`);
    return { label: i < 0 ? s : s.slice(0, i).trim(), value: i < 0 ? "" : s.slice(i + 1).trim() };
  });
  const kitSlots = list(g.kitSlots).map((s) => {
    if (!s.includes("/"))
      issues.push(`kitSlots entry "${s}" needs the form kit/slot (separate entries with |)`);
    const [kit = "", slot = ""] = s.split("/");
    return { kit: kit.trim(), slot: slot.trim() };
  });
  const bool = g.isEssential.toLowerCase();
  const p = {
    id: g.id,
    name: g.name,
    brand: g.brand,
    category: g.category,
    description: g.description,
    asin,
    amazonUrl: g.amazonUrl || (/^[A-Z0-9]{10}$/.test(asin) ? amazonProductUrl(asin) : ""),
    specs,
    hobbies: list(g.hobbies),
    articles: list(g.articles),
    collections: list(g.collections),
    kitSlots,
    role: g.role,
    isEssential: bool === "true" ? true : bool === "false" ? false : g.isEssential,
    audience: g.audience,
    whySelected: g.whySelected,
    limitations: list(g.limitations),
    researchSources: list(g.researchSources),
    lastVerified: g.lastVerified,
    availability: g.availability || "check-listing",
    affiliateStatus: g.affiliateStatus || "not-activated",
    status: g.status || "candidate",
  };
  for (const k of OPTIONAL_STRINGS) if (opt(g[k])) p[k] = opt(g[k]);
  for (const k of OPTIONAL_BOOLEANS) {
    const v = (g[k] ?? "").toLowerCase();
    if (v === "true") p[k] = true;
    else if (v === "false") p[k] = false;
    else if (v !== "") {
      issues.push(`${k} "${g[k]}" must be TRUE, FALSE or empty`);
    }
  }
  return p;
}

/**
 * Pure conversion of CSV text. Never touches the filesystem except to read article slugs when
 * `known.articles` is not supplied by the caller. Returns { products, errors, warnings }.
 * `known` = { hobbies, collections, kits, articles? } (see catalogReferenceProblems).
 */
export function importCsv(text, known, now = new Date()) {
  const errors = [];
  const warnings = [];
  const rows = parseCsv(text);
  if (rows.unterminatedQuoteLine)
    errors.push(
      `line ${rows.unterminatedQuoteLine}: a quoted cell is never closed (a stray " character). Every " inside text must be doubled ("")`,
    );
  if (rows.length === 0) {
    errors.push("the CSV has no header row (is the file empty?)");
    return { products: [], errors, warnings };
  }
  const [rawHeader, ...data] = rows;
  const { header, errors: headerErrors } = checkHeader(rawHeader);
  headerErrors.forEach((m) => errors.push(`line ${rows.lines[0]}: ${m}`));
  if (headerErrors.length) return { products: [], errors, warnings };

  const products = [];
  const lineOf = new Map();
  const idLine = new Map();
  const asinLine = new Map();
  data.forEach((cells, n) => {
    const line = rows.lines[n + 1];
    const issues = [];
    const extra = cells.slice(header.length).some((c) => c.trim() !== "");
    if (extra)
      issues.push(
        `has ${cells.length} cells but the header has ${header.length} columns. A text cell with a comma in it must be wrapped in "double quotes" (spreadsheets do this automatically)`,
      );
    cells.forEach((c, i) => {
      if (header[i] === "" && c.trim() !== "")
        issues.push(`column ${i + 1} has data but no header name`);
    });
    const p = rowToProduct(header, cells, issues);
    if (p.imageUrl || p.imageCredit || p.imageSource || (p.imageRights && p.imageRights !== "none"))
      issues.push(
        "picture columns must stay empty: pictures are recorded per product in Pages CMS with their rights, never imported",
      );
    issues.forEach((m) => errors.push(`line ${line}: ${m}`));
    const id = String(p.id);
    const reserved = RESERVED_ID_PREFIXES.find((pre) => id.startsWith(pre));
    if (reserved) {
      errors.push(
        `line ${line}: id "${id}" starts with "${reserved}", which marks an example or test row; delete the row or give it a real id`,
      );
      return;
    }
    if (/FIXTUR|EXAMPLE|PLACEHOLD/i.test(String(p.asin)))
      errors.push(`line ${line}: asin "${p.asin}" looks like a placeholder`);
    for (const m of validateCatalogProduct(p, now)) {
      // With a bad ASIN there is nothing to derive the link from; the ASIN message already says what to fix.
      if (/amazonUrl is required/.test(m) && !p.amazonUrl && !/^[A-Z0-9]{10}$/.test(p.asin))
        continue;
      errors.push(`line ${line}: ${m}`);
    }
    if (idLine.has(id))
      errors.push(
        `line ${line}: id "${id}" is already used on line ${idLine.get(id)}; ids must be unique`,
      );
    else idLine.set(id, line);
    if (p.asin && asinLine.has(p.asin))
      errors.push(
        `line ${line}: ASIN ${p.asin} is already used on line ${asinLine.get(p.asin)}; one row per product`,
      );
    else asinLine.set(p.asin, line);
    products.push(p);
    lineOf.set(p, line);
  });
  if (known) {
    const { articles: knownArticles, ...refsOnly } = known;
    const refs = catalogReferenceProblems(products, refsOnly).filter(
      (m) => !/duplicate id|same ASIN/.test(m),
    );
    for (const m of refs) {
      const hit = products.find((p) => m.startsWith(`${p.id}:`));
      errors.push(hit ? `line ${lineOf.get(hit)}: ${m}` : m);
    }
    if (knownArticles)
      for (const p of products)
        for (const a of p.articles)
          if (!knownArticles.includes(a))
            warnings.push(
              `line ${lineOf.get(p)}: ${p.id}: article "${a}" does not exist yet (typo? Products tagged to a missing article never appear there)`,
            );
  }
  return { products, errors, warnings };
}

/** Article slugs from content/articles/*.json (published and draft), read from file names. */
function articleSlugs() {
  try {
    const dir = resolve(root, "content/articles");
    return readdirSync(dir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.slice(0, -5));
  } catch {
    return undefined;
  }
}

async function knownRefs() {
  try {
    const [{ hobbies }, { collections }, { kitSlotIndex }] = await Promise.all([
      import("../src/data/hobbies.ts"),
      import("../src/data/products.ts"),
      import("../src/data/kits.ts"),
    ]);
    const articles = articleSlugs();
    return {
      hobbies: hobbies.map((h) => h.slug),
      collections: collections.map((c) => c.slug),
      kits: kitSlotIndex(),
      ...(articles ? { articles } : {}),
    };
  } catch (e) {
    console.warn(`(skipping hobby/collection/kit cross-checks: ${e.message})`);
    return null;
  }
}

function fail(errors, warnings = []) {
  console.error(`Import failed. Nothing was written.\n`);
  for (const e of errors) console.error(`  - ${e}`);
  for (const w of warnings) console.error(`  (warning) ${w}`);
  console.error(`\n${errors.length} problem(s). Fix the CSV and run again.`);
  process.exit(1);
}

const KEY_ORDER = ["id", "name", "brand", "category", "status", "statusReason", "replacedBy"];

/** CSV product -> the source file shape (a held product becomes status "held" with its reason). */
export function toSourceRecord(p) {
  // The Amazon address is derived from the ASIN, so it is not stored.
  // Pictures are managed per product in the CMS (rights recorded), never imported.
  const {
    hold,
    amazonUrl: _derived,
    imageUrl: _i,
    imageCredit: _c,
    imageSource: _s,
    imageRights: _r,
    ...rest
  } = p;
  void [_derived, _i, _c, _s, _r];
  const rec = {
    ...rest,
    status: hold ? "held" : p.status,
    ...(hold ? { statusReason: hold } : {}),
  };
  const ordered = {};
  for (const k of KEY_ORDER) if (rec[k] !== undefined) ordered[k] = rec[k];
  for (const k of Object.keys(rec)) if (!(k in ordered)) ordered[k] = rec[k];
  return ordered;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    console.log(
      "Usage: bun run import:products <path/to/file.csv> [--check] [--update] [--out <dir>]\n  --check   validate only, write nothing\n  --update  overwrite products that already have a file (default: skipped)\n  --out     write into this folder instead of content/products\nDeveloper tool for bulk loading. Owners edit products in Pages CMS.",
    );
    return;
  }
  const check = args.includes("--check");
  const outIdx = args.indexOf("--out");
  const OUT = outIdx >= 0 && args[outIdx + 1] ? resolve(args[outIdx + 1]) : DEFAULT_OUT;
  if (outIdx >= 0 && !args[outIdx + 1]) return fail(["--out needs a file path."]);
  const given = args.find((a, i) => !a.startsWith("--") && !(outIdx >= 0 && i === outIdx + 1));
  const file = resolve(given ?? resolve(root, "docs/commerce/PRODUCT-RESEARCH-TEMPLATE.csv"));
  // Without an explicit file the script only validates the template (never writes), so a stray run
  // cannot blank the catalog.
  if (!given && !check) {
    return fail([
      "no CSV file given. Run: bun run import:products docs/commerce/product-research.csv (add --check to validate only).",
    ]);
  }
  if (!existsSync(file)) return fail([`file not found: ${file}`]);
  let text;
  try {
    text = decodeCsvBuffer(readFileSync(file));
  } catch (e) {
    return fail([e.message]);
  }
  const { products, errors, warnings } = importCsv(text, await knownRefs());
  if (errors.length) return fail(errors, warnings);
  for (const w of warnings) console.warn(`(warning) ${w}`);

  if (products.length === 0 && !check)
    return fail(["the file has no product rows, so nothing was written."]);
  const verified = products.filter((p) => p.status === "verified").length;
  const summary = `${products.length} products (${verified} verified, ${products.length - verified} candidates)`;
  if (check) {
    console.log(`OK: ${summary} pass validation. Nothing was written (--check).`);
    return;
  }
  const update = args.includes("--update");
  mkdirSync(OUT, { recursive: true });
  const written = [];
  const skipped = [];
  try {
    for (const p of products) {
      const target = resolve(OUT, `${p.id}.json`);
      if (existsSync(target) && !update) {
        skipped.push(p.id);
        continue;
      }
      const tmp = `${target}.tmp-${process.pid}`;
      writeFileSync(tmp, `${JSON.stringify(toSourceRecord(p), null, 2)}\n`);
      renameSync(tmp, target);
      written.push(p.id);
    }
  } catch (e) {
    return fail([`could not write into ${OUT}: ${e.message}`]);
  }
  console.log(
    `Wrote ${written.length} product file(s) to ${OUT === DEFAULT_OUT ? "content/products" : OUT}${skipped.length ? `; skipped ${skipped.length} that already exist (use --update to overwrite): ${skipped.join(", ")}` : ""}.`,
  );
}

if (import.meta.main ?? process.argv[1] === fileURLToPath(import.meta.url)) await main();
