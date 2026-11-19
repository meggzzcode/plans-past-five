/**
 * Pure helpers for scripts/ingest-images.mjs (no file system, no image tools), so they can be unit
 * tested with fake rows. See src/test/images.test.ts.
 */

export const COLUMNS = [
  "key",
  "file",
  "alt",
  "source",
  "creator",
  "sourceUrl",
  "licenseName",
  "licenseUrl",
  "dateSourced",
  "heroFor",
  "pinFor",
  "notes",
  "hobbyFor",
];

export const SOURCES = [
  "Unsplash",
  "Pexels",
  "Pixabay",
  "Canva AI",
  "Lovable AI",
  "Own photo",
  "CC0",
];
export const AI_SOURCES = ["Canva AI", "Lovable AI"];
export const MIN_WIDTH = 1600;
export const MAX_WIDTH = 1600;
/** Minimum width for rows that only feed small hobby cards (hobbyFor set, no heroFor). */
export const MIN_WIDTH_CARD = 600;
export const ALT_MIN = 20;
export const ALT_MAX = 160;
export const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

/** The host each stock/AI source must use for its source URL (others are unchecked). */
const SOURCE_HOSTS = {
  Unsplash: "unsplash.com",
  Pexels: "pexels.com",
  Pixabay: "pixabay.com",
  "Canva AI": "canva.com",
};

/** Real brands/sites that must not appear in alt text. */
const BRAND_WORDS = [
  "nike",
  "adidas",
  "puma",
  "lululemon",
  "wilson",
  "babolat",
  "selkirk",
  "joola",
  "amazon",
  "canva",
  "unsplash",
  "pexels",
  "pixabay",
  "lovable",
  "apple",
  "iphone",
  "canon",
  "nikon",
  "sony",
  "fujifilm",
  "polaroid",
  "starbucks",
  "instagram",
  "pinterest",
  "etsy",
  "cricut",
  "yeti",
  "stanley",
  "hydro flask",
  "lego",
  "ikea",
  "target",
  "trek",
  "specialized",
  "coca-cola",
  "pepsi",
  "google",
];

export function isCamelCaseKey(key) {
  return /^[a-z][a-zA-Z0-9]*$/.test(key ?? "");
}

export function kebabKey(key) {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

export function isHttpsUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === "https:" && u.hostname.includes(".");
  } catch {
    return false;
  }
}

function hostMatches(url, domain) {
  try {
    const h = new URL(url).hostname.toLowerCase();
    return h === domain || h.endsWith(`.${domain}`);
  } catch {
    return false;
  }
}

export function brandsIn(text) {
  const lower = ` ${text.toLowerCase()} `;
  return BRAND_WORDS.filter((b) =>
    new RegExp(`[^a-z0-9]${b.replace(/[-\s]/g, "[-\\s]")}[^a-z0-9]`).test(lower),
  );
}

export function isValidDate(value, today = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) return false;
  const d = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== value) return false;
  return d.getTime() <= today.getTime() + 24 * 3600 * 1000;
}

export function splitList(value) {
  return (value ?? "")
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Validate one CSV row. Returns an array of precise error strings (empty = valid).
 * ctx: {
 *   baseKeys: Set   keys registered in src/data/images.ts (never reusable),
 *   ingestedKeys: Map<string,{alt:string}>  keys already in images.extra.ts (idempotent re-run if same alt),
 *   seenKeys: Set   keys earlier in this CSV (mutated),
 *   fileExists: boolean, info: {width,height}|null|{error}, today?: Date, knownSlugs?: Set
 * }
 */
export function validateRow(row, ctx) {
  const errors = [];
  const key = (row.key ?? "").trim();
  const file = (row.file ?? "").trim();
  const alt = (row.alt ?? "").trim();
  const source = (row.source ?? "").trim();
  const need = (name) => !(row[name] ?? "").trim() && errors.push(`${name} is required`);

  const cardOnly = splitList(row.hobbyFor).length > 0 && splitList(row.heroFor).length === 0;
  const minWidth = cardOnly ? MIN_WIDTH_CARD : MIN_WIDTH;

  if (!key) errors.push("key is required");
  else if (!isCamelCaseKey(key))
    errors.push(`key "${key}" must be camelCase (letters and digits, starting lowercase)`);
  else if (ctx.baseKeys?.has(key))
    errors.push(`key "${key}" is already used in src/data/images.ts`);
  else if (ctx.seenKeys?.has(key)) errors.push(`key "${key}" appears twice in the CSV`);
  else {
    const prior = ctx.ingestedKeys?.get(key);
    if (prior && prior.alt !== alt)
      errors.push(
        `key "${key}" was already ingested with different alt text; use a new key to add a different image`,
      );
  }
  if (key) ctx.seenKeys?.add(key);

  if (!file) errors.push("file is required");
  else if (/(^|[\\/])\.\.([\\/]|$)|^[\\/]|\\/.test(file))
    errors.push(
      `file "${file}" must be a relative path inside docs/content/incoming-images/ (no .. or absolute paths)`,
    );
  else if (!IMAGE_EXTENSIONS.some((e) => file.toLowerCase().endsWith(e)))
    errors.push(`file "${file}" must be one of ${IMAGE_EXTENSIONS.join(", ")}`);
  else if (!ctx.fileExists)
    errors.push(`file "${file}" not found in docs/content/incoming-images/`);
  else if (!ctx.info) errors.push(`file "${file}" could not be inspected`);
  else if (ctx.info.error)
    errors.push(`file "${file}" is not a readable image (${ctx.info.error})`);
  else if (ctx.info.width < minWidth)
    errors.push(
      `file "${file}" is ${ctx.info.width} px wide (${ctx.info.width}x${ctx.info.height}); at least ${minWidth} px wide is required. Download the larger or original size.`,
    );

  if (alt.length < ALT_MIN || alt.length > ALT_MAX)
    errors.push(`alt text is ${alt.length} characters; it must be ${ALT_MIN} to ${ALT_MAX}`);
  const brands = brandsIn(alt);
  if (brands.length) errors.push(`alt text must not name brands (found: ${brands.join(", ")})`);

  if (!SOURCES.includes(source))
    errors.push(`source "${source}" must be one of: ${SOURCES.join(", ")}`);
  need("creator");
  need("licenseName");
  if (!isHttpsUrl(row.sourceUrl ?? "")) errors.push("sourceUrl must be an https URL");
  else if (SOURCE_HOSTS[source] && !hostMatches(row.sourceUrl, SOURCE_HOSTS[source]))
    errors.push(`sourceUrl must be on ${SOURCE_HOSTS[source]} for source ${source}`);
  if (!isHttpsUrl(row.licenseUrl ?? "")) errors.push("licenseUrl must be an https URL");
  if (!isValidDate(row.dateSourced ?? "", ctx.today))
    errors.push("dateSourced must be a real date, YYYY-MM-DD, not in the future");
  if (AI_SOURCES.includes(source) && !/\bAI\b|generated/i.test(row.licenseName ?? ""))
    errors.push(
      `source ${source} is AI-generated: licenseName must say so (for example "AI-generated image, ${source} terms")`,
    );

  for (const slug of splitList(row.heroFor)) {
    if (ctx.knownSlugs && !ctx.knownSlugs.has(slug))
      errors.push(`heroFor: no article file with slug "${slug}"`);
  }
  for (const slug of splitList(row.hobbyFor)) {
    if (!ctx.hobbies) continue;
    if (!ctx.hobbies.has(slug)) errors.push(`hobbyFor: no hobby with slug "${slug}"`);
    else {
      const current = ctx.hobbies.get(slug);
      if (current && current !== key)
        errors.push(`hobbyFor: hobby "${slug}" already has image "${current}"`);
    }
  }
  return errors;
}

/**
 * Find hobby seeds in the text of src/data/hobbies.ts: [{slug, image|null}]. A seed starts at a
 * 4-space-indented `name: "..."` line and ends at the next 2-space `},`.
 */
export function parseHobbySeeds(text) {
  const out = [];
  const re = /^ {4}name: "([^"]+)",\n([\s\S]*?)^ {2}\},$/gm;
  for (const m of text.matchAll(re)) {
    const slug = m[1]
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const img = /^ {4}image: "(\w+)",$/m.exec(m[2]);
    out.push({ slug, image: img ? img[1] : null });
  }
  return out;
}

/** Return hobbies.ts text with `image: "<key>"` set on the seed for `slug` (unchanged if already set). */
export function setHobbyImage(text, slug, key) {
  const re = /^( {4}name: "([^"]+)",\n)([\s\S]*?)(^ {2}\},$)/gm;
  let done = false;
  const next = text.replace(re, (all, head, name, body, tail) => {
    const s = name
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    if (s !== slug) return all;
    done = true;
    if (/^ {4}image: "/m.test(body)) return all;
    return `${head}    image: "${key}",\n${body}${tail}`;
  });
  if (!done) throw new Error(`no hobby with slug "${slug}"`);
  return next;
}

/** Minimal RFC 4180 CSV parser. Lines starting with # (at a record start) are comments. */
export function parseCsv(text) {
  const src = text.replace(/^﻿/, "").replace(/\r\n?/g, "\n");
  const records = [];
  let rec = [];
  let field = "";
  let quoted = false;
  let atStart = true;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (atStart && !quoted && c === "#") {
      while (i < src.length && src[i] !== "\n") i++;
      continue;
    }
    atStart = false;
    if (quoted) {
      if (c === '"' && src[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      rec.push(field);
      field = "";
    } else if (c === "\n") {
      rec.push(field);
      field = "";
      if (rec.some((f) => f.trim() !== "")) records.push(rec);
      rec = [];
      atStart = true;
    } else field += c;
  }
  rec.push(field);
  if (rec.some((f) => f.trim() !== "")) records.push(rec);
  return records;
}

/** Turn parsed records into row objects; throws with a precise message on a bad header or wide row. */
export function rowsFromRecords(records) {
  if (!records.length) throw new Error("CSV has no header row");
  const header = records[0].map((h) => h.trim());
  const unknown = header.filter((h) => !COLUMNS.includes(h));
  if (unknown.length) throw new Error(`unknown column(s): ${unknown.join(", ")}`);
  const missing = ["key", "file", "alt", "source"].filter((h) => !header.includes(h));
  if (missing.length) throw new Error(`missing required column(s): ${missing.join(", ")}`);
  return records.slice(1).map((r, i) => {
    if (r.length > header.length)
      throw new Error(`row ${i + 2} has ${r.length} fields but the header has ${header.length}`);
    const row = {};
    for (const c of COLUMNS) row[c] = "";
    header.forEach((h, j) => (row[h] = (r[j] ?? "").trim()));
    return row;
  });
}
