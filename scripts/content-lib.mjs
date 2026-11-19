/**
 * Shared logic for the content pipeline: schema, validation and the generated modules.
 * Used by scripts/build-content.mjs (runs before every build), scripts/convert-articles-to-data.mjs
 * and the tests. Plain ESM so it runs under node or bun with no TypeScript step.
 *
 * The editable content lives in content/ (articles and images, edited through Pages CMS).
 * Nothing here reaches the network.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import {
  isLiveSource,
  productFileProblems,
  productSetProblems,
  publicProduct,
  resolveProductId,
  toCatalogProduct,
} from "../src/data/catalog-rules.ts";

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CAMEL = /^[a-z][A-Za-z0-9]*$/;

/** A validation problem in plain English: which file, which field, what to do. */
export class ContentError extends Error {
  constructor(problems) {
    super(problems.join("\n"));
    this.problems = problems;
  }
}

// ------------------------------------------------------------------ schemas

const str = z.string().trim().min(1, "must not be empty");
const strList = z.array(z.string().trim().min(1, "must not contain an empty line"));
const date = z.string().regex(DATE, "must be a date written like 2026-11-19");
const httpsUrl = z
  .string()
  .trim()
  .refine((v) => {
    try {
      return new URL(v).protocol === "https:";
    } catch {
      return false;
    }
  }, "must be a full web address starting with https://");
const slugStr = z
  .string()
  .regex(KEBAB, "must be lowercase words joined by hyphens, e.g. my-new-article");

/** Every block type in src/content/types.ts. Key order here is the order written to disk. */
export const blockSchemas = {
  p: z.object({ type: z.literal("p"), text: str }).strict(),
  h2: z
    .object({
      type: z.literal("h2"),
      text: str,
      id: z.string().regex(KEBAB, "must be lowercase words joined by hyphens").optional(),
    })
    .strict(),
  h3: z.object({ type: z.literal("h3"), text: str }).strict(),
  list: z
    .object({ type: z.literal("list"), items: strList.min(1, "needs at least one item") })
    .strict(),
  quote: z.object({ type: z.literal("quote"), text: str }).strict(),
  image: z
    .object({ type: z.literal("image"), image: str, caption: z.string().optional() })
    .strict(),
  item: z
    .object({
      type: z.literal("item"),
      n: z.number().int().positive().optional(),
      title: str,
      hobby: z.string().optional(),
      note: str,
      time: z.string().optional(),
      cost: z.string().optional(),
      company: z.string().optional(),
      first: z.string().optional(),
    })
    .strict(),
  whatYoullNeed: z
    .object({
      type: z.literal("whatYoullNeed"),
      essentials: strList.min(1, "needs at least one item"),
      optional: strList.optional(),
    })
    .strict(),
  starterKit: z
    .object({ type: z.literal("starterKit"), productIds: strList, title: z.string().optional() })
    .strict(),
  shopHobby: z
    .object({
      type: z.literal("shopHobby"),
      productIds: strList,
      title: z.string().optional(),
      dek: z.string().optional(),
    })
    .strict(),
  shopTheArticle: z
    .object({
      type: z.literal("shopTheArticle"),
      articleSlug: z.string().optional(),
      hobbies: strList.optional(),
      collection: z.string().optional(),
      title: z.string().optional(),
      dek: z.string().optional(),
    })
    .strict(),
  shopMyHobby: z
    .object({
      type: z.literal("shopMyHobby"),
      hobby: str,
      title: z.string().optional(),
      dek: z.string().optional(),
    })
    .strict(),
  saveSplurge: z.object({ type: z.literal("saveSplurge"), save: str, splurge: str }).strict(),
  tryThisWeekend: z.object({ type: z.literal("tryThisWeekend"), text: str }).strict(),
  girlsNight: z.object({ type: z.literal("girlsNight"), text: str }).strict(),
  first30: z
    .object({ type: z.literal("first30"), steps: strList.min(1, "needs at least one step") })
    .strict(),
  noSpend: z.object({ type: z.literal("noSpend"), text: str }).strict(),
  makePlan: z.object({ type: z.literal("makePlan"), text: str }).strict(),
  ifYouLoved: z
    .object({ type: z.literal("ifYouLoved"), hobbies: strList.min(1, "needs at least one hobby") })
    .strict(),
};
export const BLOCK_TYPES = Object.keys(blockSchemas);

/**
 * Publish gate. A check in `coworkChecks` is resolved once it starts with one of these words and a date.
 * Anything else (TODO, CHECK, a bare question) blocks publishing. Drafts are exempt.
 */
const RESOLVED_CHECK =
  /^(RESOLVED|VERIFIED|SUPPORTED|REMOVED|CORRECT AS|NOTE|DONE|CLOSED)\b[^:]*\d{4}-\d{2}-\d{2}/;

export const articleSchema = z
  .object({
    slug: slugStr,
    title: str,
    titleItalic: z.string().optional(),
    dek: str,
    category: str,
    status: z.enum(["draft", "published"], {
      message: 'must be "draft" or "published"',
    }),
    publishedAt: z.string(),
    updatedAt: date.optional(),
    verifiedAt: date.optional(),
    hero: str,
    searchIntent: str,
    angle: str,
    hobbies: strList,
    sources: z
      .array(z.object({ title: str, url: httpsUrl, note: z.string().optional() }).strict())
      .optional(),
    coworkChecks: strList.optional(),
    related: z.array(slugStr).optional(),
    body: z.array(z.any()),
  })
  .strict();

export const imageSchema = z
  .object({
    key: z.string().regex(CAMEL, "must be one camelCase word, e.g. crochetHands"),
    file: str,
    alt: z
      .string()
      .trim()
      .min(
        20,
        "alt text is required: describe the photo in at least 20 characters for people who cannot see it",
      ),
    w: z.number().int().positive().optional(),
    h: z.number().int().positive().optional(),
    credit: z.string().optional(),
    source: z.string().optional(),
    sourceUrl: z.string().optional(),
    license: z.string().optional(),
    licenseUrl: z.string().optional(),
  })
  .strict();

// ------------------------------------------------------------------ helpers

/** Drop empty-string and null values from object keys (a CMS writes these for blank fields). */
export function dropBlanks(v) {
  if (Array.isArray(v)) return v.map(dropBlanks);
  if (v && typeof v === "object") {
    const o = {};
    for (const [k, x] of Object.entries(v)) {
      if (x === null || x === "") continue;
      o[k] = dropBlanks(x);
    }
    return o;
  }
  return v;
}

const where = (file, path) => `${file}${path.length ? `, field "${path.join(" > ")}"` : ""}`;

function zodProblems(file, error, bodyOffset = 0) {
  return error.issues.map((i) => {
    const path = i.path.map((p) => (typeof p === "number" ? `#${p + 1 + bodyOffset}` : p));
    return `${where(file, path)}: ${i.message}`;
  });
}

/** Image keys that still live in TypeScript (src/data/images.ts, images.extra.ts) until moved to content/images. */
function legacyImageKeys(root) {
  const keys = new Set();
  for (const f of ["src/data/images.ts", "src/data/images.extra.ts"]) {
    const p = join(root, f);
    if (!existsSync(p)) continue;
    for (const m of readFileSync(p, "utf8").matchAll(/^ {2}([a-zA-Z][A-Za-z0-9]*): \{/gm))
      keys.add(m[1]);
  }
  return keys;
}

function categorySlugs(root) {
  const p = join(root, "src/data/categories.ts");
  if (!existsSync(p)) return null;
  return new Set([...readFileSync(p, "utf8").matchAll(/^\s{4}slug: "([^"]+)"/gm)].map((m) => m[1]));
}

/** Read width and height from a JPEG, PNG, GIF or WebP file header. Returns null if unknown. */
export function imageSize(buf) {
  if (buf.length > 24 && buf[0] === 0x89 && buf.toString("ascii", 1, 4) === "PNG")
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  if (buf.toString("ascii", 0, 3) === "GIF")
    return { w: buf.readUInt16LE(6), h: buf.readUInt16LE(8) };
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) {
        i++;
        continue;
      }
      const m = buf[i + 1];
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m))
        return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const t = buf.toString("ascii", 12, 16);
    if (t === "VP8X") return { w: 1 + buf.readUIntLE(24, 3), h: 1 + buf.readUIntLE(27, 3) };
    if (t === "VP8 ") return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
    if (t === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
    }
  }
  return null;
}

function readJsonDir(root, rel) {
  const dir = join(root, rel);
  if (!existsSync(dir)) return { files: [], problems: [] };
  const files = [];
  const problems = [];
  for (const f of readdirSync(dir)
    .filter((n) => n.endsWith(".json"))
    .sort()) {
    const file = `${rel}/${f}`;
    try {
      files.push({
        file,
        name: f.slice(0, -5),
        data: JSON.parse(readFileSync(join(dir, f), "utf8")),
      });
    } catch (e) {
      problems.push(
        `${file}: this file is not valid JSON (${e.message}). If you edited it by hand, undo the last change in GitHub history.`,
      );
    }
  }
  return { files, problems };
}

/**
 * Slugs the content may refer to, read from the TypeScript data files with plain pattern matching
 * (this script runs under plain node). A test compares them with the real exports, so they cannot
 * drift. Anything whose source file is missing is left out and its checks are skipped.
 */
export function knownRefsFromSource(root) {
  const read = (f) => {
    const p = join(root, f);
    return existsSync(p) ? readFileSync(p, "utf8") : null;
  };
  const out = {};
  const hobbies = read("src/data/hobbies.ts");
  if (hobbies)
    out.hobbies = [...hobbies.matchAll(/^ {4}name: "([^"]+)",/gm)].map((m) =>
      m[1]
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    );
  const prods = read("src/data/products.ts");
  if (prods) {
    const start = prods.indexOf("export const collections");
    const end = prods.indexOf("\nconst p = (");
    out.collections = [
      ...prods.slice(start, end > start ? end : undefined).matchAll(/^ {4}slug: "([^"]+)"/gm),
    ].map((m) => m[1]);
  }
  const kits = read("src/data/kits.ts");
  if (kits) {
    const idx = {};
    const heads = [...kits.matchAll(/^ {4}id: "([^"]+)",/gm)];
    heads.forEach((h, i) => {
      const seg = kits.slice(h.index, heads[i + 1]?.index ?? kits.length);
      idx[h[1]] = [...seg.matchAll(/\bs\(\s*"([^"]+)"/g)].map((m) => m[1]);
    });
    out.kits = idx;
  }
  const dir = join(root, "content/articles");
  if (existsSync(dir))
    out.articles = readdirSync(dir)
      .filter((n) => n.endsWith(".json"))
      .map((n) => n.slice(0, -5));
  return out;
}

export const searchTermSchema = z
  .object({
    id: slugStr,
    label: str,
    query: z
      .string()
      .regex(
        /^[a-z0-9]+( [a-z0-9]+)*$/,
        "must be lowercase words and numbers separated by single spaces",
      ),
    collection: z.string(),
    hobbies: z.array(z.string()),
  })
  .strict();

/**
 * content/product-search-terms.json: the one short list behind every generic "Search Amazon for X"
 * link (a kind of product, not a named pick). Returns { terms, problems }.
 */
export function readSearchTerms(root, known) {
  const file = "content/product-search-terms.json";
  const p = join(root, file);
  if (!existsSync(p)) return { terms: [], problems: [] };
  let data;
  try {
    data = JSON.parse(readFileSync(p, "utf8"));
  } catch (e) {
    return { terms: [], problems: [`${file}: this file is not valid JSON (${e.message}).`] };
  }
  const problems = [];
  const terms = [];
  const seen = new Set();
  const list = Array.isArray(data?.terms) ? data.terms : [];
  if (!Array.isArray(data?.terms)) problems.push(`${file}: expected a list called "terms"`);
  list.forEach((raw, i) => {
    const r = searchTermSchema.safeParse(dropBlanks(raw));
    if (!r.success) {
      problems.push(
        ...zodProblems(file, r.error).map((m) =>
          m.replace(", field", `, search term #${i + 1}, field`),
        ),
      );
      return;
    }
    const t = r.data;
    if (seen.has(t.id)) problems.push(`${file}: the search term id "${t.id}" is used twice`);
    seen.add(t.id);
    if (known.collections && !known.collections.includes(t.collection))
      problems.push(`${file}, search term "${t.id}": "${t.collection}" is not a shop collection`);
    for (const h of t.hobbies)
      if (known.hobbies && !known.hobbies.includes(h))
        problems.push(`${file}, search term "${t.id}": "${h}" is not a hobby`);
    terms.push(t);
  });
  return { terms, problems };
}

/** Read and check content/products. Returns { sources, problems } (sources are the raw, valid product files). */
export function readProducts(root, known, now = new Date()) {
  const { files, problems } = readJsonDir(root, "content/products");
  const sources = [];
  for (const { file, data } of files) {
    const raw = dropBlanks(data);
    const p = productFileProblems(file, raw, now);
    if (p.length) problems.push(...p);
    else sources.push(raw);
  }
  const refs =
    known.hobbies && known.collections && known.kits
      ? {
          hobbies: known.hobbies,
          collections: known.collections,
          kits: known.kits,
          ...(known.articles ? { articles: known.articles } : {}),
        }
      : undefined;
  problems.push(...productSetProblems(sources, refs, now));
  return { sources, problems };
}

const PRODUCT_MENTION = /\{\{product:([a-z0-9-]+)\|([^}]+)\}\}/g;

/** Every string in a value, with the block field it came from. */
function* strings(v, path = []) {
  if (typeof v === "string") yield [path.join(" > "), v];
  else if (Array.isArray(v)) for (const [i, x] of v.entries()) yield* strings(x, [...path, i + 1]);
  else if (v && typeof v === "object")
    for (const [k, x] of Object.entries(v)) yield* strings(x, [...path, k]);
}

/**
 * Product and slug references inside one article. Every {{product:id|label}} must resolve to a live
 * product (following "Replaced by"); nothing is ever quietly turned into plain text.
 */
export function articleReferenceProblems(art, byId, known, now = new Date()) {
  const out = [];
  const file = `content/articles/${art.slug}.json`;
  const sourceMap = byId;
  art.body.forEach((b, i) => {
    const where = `${file}, block #${i + 1} (${b.type})`;
    for (const [field, text] of strings(b)) {
      const mentions = [...text.matchAll(PRODUCT_MENTION)];
      const opened = (text.match(/\{\{product:/g) ?? []).length;
      if (opened !== mentions.length)
        out.push(
          `${where}, field "${field}": a product mention is not written correctly. Use {{product:some-id|words to show}} with the id in lowercase letters and hyphens.`,
        );
      for (const m of mentions) {
        if (!sourceMap) continue;
        const r = resolveProductId(m[1], sourceMap, now);
        if (!r.ok)
          out.push(
            `${where}, field "${field}": the product mention {{product:${m[1]}|${m[2]}}} cannot be shown: ${r.problem}. Fix it in Products (for example set "Replaced by" on the old product), or change this sentence.`,
          );
      }
    }
    const slugList = (label, vals, allowed) => {
      if (!allowed) return;
      for (const v of vals)
        if (!allowed.includes(v))
          out.push(
            `${where}, field "${label}": "${v}" is not a known ${label === "collection" ? "shop collection" : label === "articleSlug" ? "article" : "hobby"}`,
          );
    };
    if (b.type === "shopTheArticle") {
      slugList("hobbies", b.hobbies ?? [], known.hobbies);
      if (b.collection) slugList("collection", [b.collection], known.collections);
      if (b.articleSlug) slugList("articleSlug", [b.articleSlug], known.articles);
    }
    if (b.type === "shopMyHobby") slugList("hobby", [b.hobby], known.hobbies);
    if ((b.type === "shopHobby" || b.type === "starterKit") && known.searchTerms)
      for (const id of b.productIds)
        if (!known.searchTerms.includes(id))
          out.push(
            `${where}, field "productIds": "${id}" is not in the search terms list (content/product-search-terms.json) and is not a product. Pick one from the list, or add it there.`,
          );
    if (b.type === "ifYouLoved") slugList("hobbies", b.hobbies, known.hobbies);
  });
  return out;
}

// ------------------------------------------------------------------ validation

/**
 * Validate the whole content/ folder. Returns { articles, images, problems }.
 * `articles` holds parsed, canonical Article objects (published and draft); `images` the image records.
 */
export function validateContent(root, opts = {}) {
  const problems = [];
  const cats = opts.categories ?? categorySlugs(root);

  // images
  const imgRead = readJsonDir(root, "content/images");
  problems.push(...imgRead.problems);
  const images = [];
  const imageKeys = new Set();
  for (const { file, data } of imgRead.files) {
    const r = imageSchema.safeParse(dropBlanks(data));
    if (!r.success) {
      problems.push(...zodProblems(file, r.error));
      continue;
    }
    const img = r.data;
    if (imageKeys.has(img.key)) problems.push(`${file}: the image key "${img.key}" is used twice`);
    imageKeys.add(img.key);
    const diskPath = img.file.startsWith("/uploads/")
      ? join(root, "public", img.file)
      : img.file.startsWith("src/assets/")
        ? join(root, img.file)
        : null;
    if (!diskPath) {
      problems.push(
        `${file}, field "file": must be a photo uploaded through the CMS (starts with /uploads/) or an existing site photo (src/assets/...)`,
      );
      continue;
    }
    if (!existsSync(diskPath)) {
      problems.push(
        `${file}, field "file": the photo "${img.file}" does not exist. Upload it again in the Images section.`,
      );
      continue;
    }
    if (!img.w || !img.h) {
      const size = imageSize(readFileSync(diskPath));
      if (!size) {
        problems.push(
          `${file}: could not read the size of "${img.file}". Use a JPG, PNG or WebP photo.`,
        );
        continue;
      }
      img.w = size.w;
      img.h = size.h;
    }
    images.push(img);
  }
  const allKeys = new Set([...imageKeys, ...legacyImageKeys(root)]);

  // articles
  const artRead = readJsonDir(root, "content/articles");
  problems.push(...artRead.problems);
  const articles = [];
  const seen = new Map();
  for (const { file, data } of artRead.files) {
    const raw = dropBlanks(data);
    if (raw && typeof raw === "object" && raw.status === "draft" && raw.publishedAt === undefined)
      raw.publishedAt = "";
    const r = articleSchema.safeParse(raw);
    const before = problems.length;
    if (!r.success) problems.push(...zodProblems(file, r.error));
    if (!r.success && !(raw && typeof raw === "object" && Array.isArray(raw.body))) continue;
    const art = r.success ? r.data : raw;
    // blocks, one by one, so the message names the block number
    const body = [];
    (art.body ?? []).forEach((b, i) => {
      const schema = b && typeof b === "object" ? blockSchemas[b.type] : undefined;
      if (!schema) {
        problems.push(
          `${file}, block #${i + 1}: unknown block type "${b?.type}". Allowed types: ${BLOCK_TYPES.join(", ")}.`,
        );
        return;
      }
      const br = schema.safeParse(b);
      if (!br.success) {
        for (const iss of br.error.issues)
          problems.push(
            `${file}, block #${i + 1} (${b.type}), field "${iss.path.join(" > ") || "type"}": ${iss.message}`,
          );
        return;
      }
      if (b.type === "image" && !allKeys.has(b.image))
        problems.push(
          `${file}, block #${i + 1} (image), field "image": there is no picture called "${b.image}". Choose one from the list.`,
        );
      body.push(br.data);
    });
    if (problems.length > before || !r.success) continue;
    if (seen.has(art.slug))
      problems.push(
        `${file}: the slug "${art.slug}" is already used by ${seen.get(art.slug)}. Every article needs its own web address name.`,
      );
    seen.set(art.slug, file);
    if (cats && !cats.has(art.category))
      problems.push(
        `${file}, field "category": "${art.category}" is not a category on the site (${[...cats].join(", ")})`,
      );
    if (!allKeys.has(art.hero))
      problems.push(
        `${file}, field "hero": there is no picture called "${art.hero}". Choose one from the list.`,
      );
    if (art.titleItalic && !art.title.includes(art.titleItalic))
      problems.push(`${file}, field "titleItalic": must be a phrase that appears inside the title`);
    if (art.status === "published" && !DATE.test(art.publishedAt))
      problems.push(
        `${file}, field "publishedAt": a published article needs a date written like 2026-11-19`,
      );
    if (art.status === "published") {
      if (!(art.sources && art.sources.length))
        problems.push(
          `${file}, field "sources": a published article needs at least one source (title and https link). Add one, or set the article back to draft.`,
        );
      if (!art.verifiedAt)
        problems.push(
          `${file}, field "verifiedAt": a published article needs the date its facts were checked, written like 2026-11-19`,
        );
      const open = (art.coworkChecks ?? []).filter((c) => !RESOLVED_CHECK.test(c.trim()));
      if (open.length)
        problems.push(
          `${file}, field "coworkChecks": ${open.length} unresolved check(s) on a published article (first: "${open[0].slice(0, 80)}"). Resolve each one (start it with RESOLVED, VERIFIED, SUPPORTED, REMOVED, CORRECT AS, NOTE or DONE plus a date, like "RESOLVED 2026-11-19: ...") or set the article back to draft.`,
        );
    }
    if (art.status === "draft" && art.publishedAt !== "" && !DATE.test(art.publishedAt))
      problems.push(
        `${file}, field "publishedAt": must be empty or a date written like 2026-11-19`,
      );
    if (art.updatedAt && art.updatedAt < art.publishedAt && art.publishedAt)
      problems.push(`${file}, field "updatedAt": is earlier than publishedAt`);
    articles.push({ ...art, body });
  }
  const slugs = new Set(artRead.files.map((f) => f.data?.slug).filter(Boolean));
  for (const a of articles)
    for (const s of a.related ?? []) {
      if (s === a.slug)
        problems.push(
          `content/articles/${a.slug}.json, field "related": an article cannot be related to itself`,
        );
      else if (!slugs.has(s))
        problems.push(
          `content/articles/${a.slug}.json, field "related": there is no article "${s}"`,
        );
    }
  // products: the one source every shop block, kit, collection and inline mention reads
  const known = opts.known ?? knownRefsFromSource(root);
  const st = readSearchTerms(root, known);
  problems.push(...st.problems);
  if (st.terms.length) known.searchTerms = st.terms.map((t) => t.id);
  const prod = readProducts(root, known, opts.now);
  problems.push(...prod.problems);
  const sourceMap = new Map(prod.sources.map((p) => [p.id, p]));
  for (const a of articles)
    problems.push(...articleReferenceProblems(a, sourceMap, known, opts.now));
  return { articles, images, products: prod.sources, searchTerms: st.terms, problems };
}

// ------------------------------------------------------------------ outputs

const json = (v) => `${JSON.stringify(v, null, 2)}\n`;

/** Canonical on-disk form of an Article (schema key order). Throws ContentError if it is not valid. */
export function articleToData(article) {
  const base = articleSchema.parse(JSON.parse(JSON.stringify(article)));
  return { ...base, body: base.body.map((b) => blockSchemas[b.type].parse(b)) };
}
export const articleToJson = (article) => json(articleToData(article));

/** Retired (not shown) product id -> the id that replaces it. */
export function productRedirectsFrom(sources, now = new Date()) {
  const redirects = {};
  for (const s of sources)
    if (!isLiveSource(s, now) && s.replacedBy) redirects[s.id] = s.replacedBy;
  return redirects;
}

/** The module the site imports: ONLY products that are shown, plus retired id -> replacement. */
export function generatedCatalogModule(sources, now = new Date()) {
  const ordered = [...sources].sort(
    (a, b) => (a.order ?? 100000) - (b.order ?? 100000) || a.id.localeCompare(b.id),
  );
  const live = ordered
    .filter((s) => isLiveSource(s, now))
    .map((s) => publicProduct(toCatalogProduct(s)));
  const redirects = productRedirectsFrom(ordered, now);
  return `// GENERATED by scripts/build-content.mjs from content/products/*.json. Do not edit by hand: change
// products in Pages CMS (Products) and the next build regenerates this file. Only products that are
// shown are included: candidates, held and discontinued products, hold reasons and internal notes
// never reach the browser.
import type { CatalogProduct } from "./catalog-rules";

export const generatedCatalog: CatalogProduct[] = ${JSON.stringify(live, null, 2)};

/** A retired product id -> the product id that replaces it. */
export const productRedirects: Record<string, string> = ${JSON.stringify(redirects, null, 2)};
`;
}

export function generatedSearchTermsModule(terms) {
  return `// GENERATED by scripts/build-content.mjs from content/product-search-terms.json. Do not edit by hand.
import type { SearchTerm } from "./search-terms";

export const generatedSearchTerms: SearchTerm[] = ${JSON.stringify(terms, null, 2)};
`;
}

export function generatedImagesModule(images) {
  const imports = [];
  const rows = images
    .slice()
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((img) => {
      let src;
      if (img.file.startsWith("src/assets/")) {
        const id = `img_${img.key}`;
        imports.push(`import ${id} from "@/${img.file.slice(4)}";`);
        src = id;
      } else src = JSON.stringify(img.file);
      return `  ${img.key}: {\n    src: ${src},\n    alt: ${JSON.stringify(img.alt)},\n    w: ${img.w},\n    h: ${img.h},\n  },`;
    });
  return `// GENERATED by scripts/build-content.mjs from content/images/*.json. Do not edit by hand:\n// change pictures in Pages CMS (Images) and the next build regenerates this file.\n${imports.length ? `${imports.join("\n")}\n` : ""}import type { Img } from "./images";\n\nexport const generatedImages = {${rows.length ? `\n${rows.join("\n")}\n` : ""}} satisfies Record<string, Img>;\n`;
}

/**
 * Build all generated modules. Throws ContentError (with every problem listed) if anything is invalid.
 * With { write: false } returns the file texts without touching disk.
 */
export function buildContent(root, opts = {}) {
  const { articles, images, products, searchTerms, problems } = validateContent(root, opts);
  if (problems.length) throw new ContentError(problems);
  // Internal verification notes (coworkChecks) stay in the content files and drafts bundle; they are
  // not shipped in the public client bundle.
  const published = articles
    .filter((a) => a.status === "published")
    // eslint-disable-next-line no-unused-vars
    .map(({ coworkChecks, ...rest }) => rest);
  const drafts = articles.filter((a) => a.status === "draft");
  const outputs = {
    "src/content/generated/published.json": json(published),
    "src/content/generated/drafts.json": json(drafts),
    "src/data/images.generated.ts": generatedImagesModule(images),
    "src/data/catalog.generated.ts": generatedCatalogModule(products, opts.now),
    "src/data/search-terms.generated.ts": generatedSearchTermsModule(searchTerms),
  };
  if (opts.write !== false) {
    for (const [rel, text] of Object.entries(outputs)) {
      const p = join(root, rel);
      mkdirSync(join(p, ".."), { recursive: true });
      if (!existsSync(p) || readFileSync(p, "utf8") !== text) writeFileSync(p, text);
    }
  }
  return { articles, published, drafts, images, products, outputs };
}
