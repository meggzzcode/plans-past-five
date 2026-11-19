#!/usr/bin/env node
/**
 * Embed invisible IPTC/XMP provenance in the site's AI-generated JPEGs:
 *   Iptc4xmpExt:DigitalSourceType = trainedAlgorithmicMedia
 * No dependencies; edits only the JPEG metadata segment, never the pixels. Idempotent.
 *
 *   node scripts/embed-ai-metadata.mjs            embed in every JPEG under src/assets
 *   node scripts/embed-ai-metadata.mjs --check    only report which files lack it (exit 1 if any)
 *   node scripts/embed-ai-metadata.mjs a.jpg b.jpg   specific files
 *
 * This is metadata for the handover and for platforms that read it. It is not shown on the site.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const XMP_ID = Buffer.from("http://ns.adobe.com/xap/1.0/\0", "latin1");
const DST = "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia";

const packet = () =>
  Buffer.from(
    `<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>` +
      `<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">` +
      `<rdf:Description rdf:about="" xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/">` +
      `<Iptc4xmpExt:DigitalSourceType>${DST}</Iptc4xmpExt:DigitalSourceType>` +
      `</rdf:Description></rdf:RDF></x:xmpmeta><?xpacket end="w"?>`,
    "utf8",
  );

export function hasMarker(buf) {
  return buf.includes(Buffer.from("trainedAlgorithmicMedia"));
}

export function embed(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) throw new Error("not a JPEG");
  if (hasMarker(buf)) return null;
  const body = Buffer.concat([XMP_ID, packet()]);
  const len = body.length + 2;
  if (len > 0xffff) throw new Error("XMP too large");
  const seg = Buffer.concat([Buffer.from([0xff, 0xe1, len >> 8, len & 255]), body]);
  // Insert after SOI and any leading APP0/APP1 segments (JFIF, Exif), before everything else.
  let pos = 2;
  while (buf[pos] === 0xff && (buf[pos + 1] === 0xe0 || buf[pos + 1] === 0xe1)) {
    pos += 2 + buf.readUInt16BE(pos + 2);
  }
  return Buffer.concat([buf.subarray(0, pos), seg, buf.subarray(pos)]);
}

const args = process.argv.slice(2);
const check = args.includes("--check");
const files = args.filter((a) => !a.startsWith("--"));
const dir = join(root, "src/assets");
const targets = files.length
  ? files
  : readdirSync(dir)
      .filter((f) => /\.jpe?g$/i.test(f))
      .map((f) => join(dir, f));

if (import.meta.url === `file://${process.argv[1]}`) {
  let missing = 0;
  for (const f of targets) {
    const buf = readFileSync(f);
    const out = embed(buf);
    if (out === null) continue;
    missing++;
    if (check) console.log(`missing: ${f}`);
    else {
      writeFileSync(f, out);
      console.log(`embedded: ${f}`);
    }
  }
  console.log(check ? `${missing} file(s) lack the marker` : `${missing} file(s) updated`);
  if (check && missing) process.exit(1);
}
