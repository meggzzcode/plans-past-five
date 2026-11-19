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
/**
 * Two published articles predate the source rule and make no sourced claims (cost figures and
 * health claims were removed). Remove a slug here as soon as it has a source. Do not add to this list.
 */
export const SOURCELESS_ALLOWED = new Set(["low-energy-hobbies", "how-to-start-a-reading-journal"]);

export const articleSchema = z
  .object({
    slug: slugStr,
    title: str,
    titleItalic: z.string().optional(),
    dek: str,
    category: str,
    status: z.enum(["draft", "published"], {
      errorMap: () => ({ message: 'must be "draft" or "published"' }),
    }),
    publishedAt: z.string(),
    updatedAt: date.optional(),
    verifiedAt: date.optional(),
    hero: str,
    searchIntent: str,
    angle: str,
    hobbies: strList,
    productIds: strList,
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
      if (!(art.sources && art.sources.length) && !SOURCELESS_ALLOWED.has(art.slug))
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
  return { articles, images, problems };
}

// ------------------------------------------------------------------ outputs

const json = (v) => `${JSON.stringify(v, null, 2)}\n`;

/** Canonical on-disk form of an Article (schema key order). Throws ContentError if it is not valid. */
export function articleToData(article) {
  const base = articleSchema.parse(JSON.parse(JSON.stringify(article)));
  return { ...base, body: base.body.map((b) => blockSchemas[b.type].parse(b)) };
}
export const articleToJson = (article) => json(articleToData(article));

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
  const { articles, images, problems } = validateContent(root, opts);
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
  };
  if (opts.write !== false) {
    for (const [rel, text] of Object.entries(outputs)) {
      const p = join(root, rel);
      mkdirSync(join(p, ".."), { recursive: true });
      if (!existsSync(p) || readFileSync(p, "utf8") !== text) writeFileSync(p, text);
    }
  }
  return { articles, published, drafts, images, outputs };
}
