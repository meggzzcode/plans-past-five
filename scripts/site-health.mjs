#!/usr/bin/env bun
// Site health checks for Plans Past Five. Run with bun (it reads the TypeScript data files directly).
//
//   bun scripts/site-health.mjs links     [--base http://localhost:3000] [--out report.md]
//   bun scripts/site-health.mjs freshness [--months 6] [--out report.md]
//   bun scripts/site-health.mjs digest    [--out report.md]
//
// links:     fetches <base>/sitemap.xml, checks every sitemap URL answers 200 (host rewritten to --base),
//            then checks every internal link found on those pages. External links are checked but are
//            REPORT-ONLY: they never make the run fail. Use a live site with --base https://yourdomain.
//            For a local check: `bun run build && node scripts/serve-built.mjs &` then run links.
// freshness: lists published articles whose last update (updatedAt, else publishedAt) is older than N months. Nothing is changed or published.
// digest:    counts of articles (published/draft), hobbies, products and collections.
//
// A report file is written only when something needs attention. Exit code 1 = internal problems found
// (links mode only); freshness and digest always exit 0. Exit 2 = the script could not run.

import { writeFileSync, existsSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const mode = args[0];
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
};
const out = flag("--out");
const MAX_AGE_MONTHS = Number(flag("--months", 6));
// Hosts that refuse automated visitors: never reported.
const SKIP_HOSTS = [
  "amazon.com",
  "amzn.to",
  "pinterest.com",
  "instagram.com",
  "tiktok.com",
  "facebook.com",
];

const load = (p) => import(pathToFileURL(join(root, p)).href);

function finish(lines, { failOnLines = false } = {}) {
  if (lines.length === 0) {
    console.log("All clear: nothing needs attention.");
    if (out && existsSync(out)) rmSync(out);
    return 0;
  }
  const text = lines.join("\n") + "\n";
  console.log(text);
  if (out) writeFileSync(out, text);
  return failOnLines ? 1 : 0;
}

const monthsAgo = (months) => {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return d;
};

async function freshness() {
  const { articles } = await load("src/content/index.ts");
  const cutoff = monthsAgo(MAX_AGE_MONTHS);
  const lines = [];
  const stale = articles.filter(
    (a) => new Date(`${a.updatedAt ?? a.publishedAt}T12:00:00Z`) < cutoff,
  );
  if (stale.length) {
    lines.push(`## Articles not reviewed in ${MAX_AGE_MONTHS}+ months`, "");
    for (const a of stale)
      lines.push(`- /journal/${a.slug} (last updated ${a.updatedAt ?? a.publishedAt})`);
    lines.push("");
    if (lines.length) {
    }
    lines.push(
      "Review the article, re-check costs, rules and availability, then set updatedAt (and verifiedAt) in its file under src/content. This report never edits or publishes anything.",
    );
    lines.unshift("# Content freshness", "");
  }
  return finish(lines);
}

async function digest() {
  const { articles } = await load("src/content/index.ts");
  const { allArticlesIncludingDrafts } = await load("src/content/draft-registry.ts");
  const { hobbies } = await load("src/data/hobbies.ts");
  const { products, collections } = await load("src/data/products.ts");
  const drafts = allArticlesIncludingDrafts.length - articles.length;
  const lines = [
    "# Monthly digest",
    "",
    `- Published articles: ${articles.length}`,
    `- Draft articles (not public): ${drafts}`,
    `- Hobbies: ${hobbies.length}`,
    `- Product records: ${products.length} in ${collections.length} collections`,
    `- Published articles with no verifiedAt date: ${articles.filter((a) => !a.verifiedAt).length}`,
    "",
    "Counts only. Nothing was published or changed.",
  ];
  console.log(lines.join("\n"));
  if (out) writeFileSync(out, lines.join("\n") + "\n");
  return 0;
}

const hrefs = (html) =>
  [...html.matchAll(/<a\s[^>]*?href="([^"#]*)(?:#[^"]*)?"/g)]
    .map((m) => m[1].replace(/&amp;/g, "&"))
    .filter(Boolean);

async function status(url, method = "GET") {
  try {
    const r = await fetch(url, { method, redirect: "follow", signal: AbortSignal.timeout(15000) });
    return r.status;
  } catch (e) {
    return `error: ${e.message}`;
  }
}

async function links() {
  const base = flag("--base", "http://localhost:3000").replace(/\/$/, "");
  const sm = await fetch(`${base}/sitemap.xml`).catch(() => null);
  if (!sm || !sm.ok) {
    console.error(`Could not read ${base}/sitemap.xml. Is the site running?`);
    return 2;
  }
  const xml = await sm.text();
  const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  const problems = [];
  const internal = new Set();
  const external = new Set();
  for (const p of paths) {
    const url = `${base}${p}`;
    const r = await fetch(url, { signal: AbortSignal.timeout(15000) }).catch((e) => ({
      status: `error: ${e.message}`,
      text: async () => "",
    }));
    if (r.status !== 200) {
      problems.push(`- Sitemap URL ${p} returned ${r.status}`);
      continue;
    }
    for (const h of hrefs(await r.text())) {
      if (h.startsWith("/") && !h.startsWith("//")) internal.add(h);
      else if (/^https?:\/\//.test(h)) {
        const u = new URL(h);
        if (u.origin === new URL(base).origin) internal.add(u.pathname + u.search);
        else external.add(h);
      }
    }
  }
  for (const p of internal) {
    if (paths.includes(p.split("?")[0])) continue;
    const s = await status(`${base}${p}`);
    if (s !== 200) problems.push(`- Internal link ${p} returned ${s}`);
  }
  const extReport = [];
  for (const u of external) {
    const host = new URL(u).hostname.replace(/^www\./, "");
    if (SKIP_HOSTS.some((h) => host === h || host.endsWith(`.${h}`))) continue;
    const s = await status(u, "HEAD");
    if (typeof s !== "number" || s >= 400) extReport.push(`- ${u} returned ${s}`);
  }
  const lines = [];
  if (problems.length) lines.push("# Broken internal links or sitemap URLs", "", ...problems, "");
  if (extReport.length)
    lines.push(
      "# External links to look at (report only, may be bot blocking)",
      "",
      ...extReport,
      "",
    );
  console.log(
    `Checked ${paths.length} sitemap URLs, ${internal.size} internal links, ${external.size} external links.`,
  );
  return finish(lines, { failOnLines: problems.length > 0 });
}

const modes = { links, freshness, digest };
if (!modes[mode]) {
  console.error(
    "Usage: bun scripts/site-health.mjs <links|freshness|digest> [--out file] [--base url] [--months n]",
  );
  process.exit(2);
}
process.exit(await modes[mode]());
