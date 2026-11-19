#!/usr/bin/env node
// Serves the production build (.output) locally so health checks can crawl it. Run `bun run build` first.
//   node scripts/serve-built.mjs [port]      (default 3000)
// Static files come from .output/public; everything else goes to the built server entry,
// exactly as the Cloudflare Worker would handle it. Not a production server.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import { join, extname, dirname, normalize } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", ".output");
const publicDir = join(root, "public");
const port = Number(process.argv[2] ?? 3000);
const entry = join(root, "server", "index.mjs");
if (!existsSync(entry)) {
  console.error("No build found. Run `bun run build` first.");
  process.exit(2);
}
const worker = (await import(pathToFileURL(entry).href)).default;
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".txt": "text/plain",
  ".json": "application/json",
};

async function staticFile(pathname) {
  const file = normalize(join(publicDir, decodeURIComponent(pathname)));
  if (!file.startsWith(publicDir) || !existsSync(file) || !statSync(file).isFile()) return null;
  return new Response(await readFile(file), {
    headers: { "content-type": types[extname(file)] ?? "application/octet-stream" },
  });
}
const env = {
  ASSETS: {
    fetch: async (req) =>
      (await staticFile(new URL(req.url).pathname)) ?? new Response("", { status: 404 }),
  },
};
const ctx = { waitUntil() {}, passThroughOnException() {} };

createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  const response =
    (await staticFile(url.pathname)) ??
    (await worker.fetch(new Request(url, { method: req.method }), env, ctx));
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(Buffer.from(await response.arrayBuffer()));
}).listen(port, () => console.log(`Serving build on http://localhost:${port}`));
