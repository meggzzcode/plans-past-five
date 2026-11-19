// Shared HTML builders for the Plans Past Five downloadable PDFs.
// Brand copy is read from src/config/site.ts so there is one source of truth.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(here, "../../..");

function readSite() {
  const src = fs.readFileSync(path.join(ROOT, "src/config/site.ts"), "utf8");
  const get = (k) => (src.match(new RegExp(`\\n  ${k}: "([^"]*)"`)) || [])[1] || "";
  return {
    name: get("name") || "Plans Past Five",
    domain: get("domain") || "planspastfive.com",
    tagline: get("tagline"),
    slogan: get("slogan"),
    signature: get("signature"),
  };
}
export const site = readSite();

export const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ---------- doodles (ported from src/components/brand/Doodles.tsx) ----------
export const D = {
  star: (c = "") =>
    `<svg class="${c}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.5l2.3 7.2 7.2 2.3-7.2 2.3L12 20.5l-2.3-7.2L2.5 11l7.2-2.3z"/></svg>`,
  sparkle: (c = "") =>
    `<svg class="${c}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z"/></svg>`,
  bow: (c = "", style = "") =>
    `<svg class="${c}" style="${style}" viewBox="0 0 48 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M24 14c-6-8-18-10-18-2s12 6 18 2zM24 14c6-8 18-10 18-2s-12 6-18 2z" fill="currentColor" fill-opacity=".15"/><path d="M22 16l-6 14M26 16l6 14"/><circle cx="24" cy="14.5" r="2.6" fill="currentColor"/></svg>`,
  flower: (c = "", style = "") =>
    `<svg class="${c}" style="${style}" viewBox="0 0 32 32" aria-hidden="true">${[
      0, 72, 144, 216, 288,
    ]
      .map(
        (r) =>
          `<ellipse cx="16" cy="8.5" rx="5" ry="7" fill="currentColor" opacity=".85" transform="rotate(${r} 16 16)"/>`,
      )
      .join("")}<circle cx="16" cy="16" r="4" fill="#f8e5a3"/></svg>`,
  arrow: (c = "", style = "") =>
    `<svg class="${c}" style="${style}" viewBox="0 0 80 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 30c14-18 40-24 66-12"/><path d="M62 10l9 8-11 4"/></svg>`,
  squiggle: (c = "", style = "") =>
    `<svg class="${c}" style="${style}" viewBox="0 0 120 12" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M2 6c8-6 12 6 20 0s12 6 20 0 12 6 20 0 12 6 20 0 12 6 20 0 12 6 16 0"/></svg>`,
};
const abs = (svg, style) => svg.replace("<svg ", `<svg style="position:absolute;${style}" `);
export const floaty = {
  flower: (style) => abs(D.flower(), style),
  star: (style) => abs(D.star(), style),
  sparkle: (style) => abs(D.sparkle(), style),
  bow: (style) => abs(D.bow(), style),
};

// ---------- small builders ----------
export const lines = (n = 3, cls = "") => `<div class="lines ${cls}" style="--n:${n}"></div>`;
export const dots = (n = 4) => `<div class="dots" style="--n:${n}"></div>`;
export const ck = (r = false) => `<i class="ck${r ? " r" : ""}"></i>`;
export const fill = (cls = "") => `<span class="fill ${cls}"></span>`;
export const rate = (n = 5) => `<span class="dotr">${"<i></i>".repeat(n)}</span>`;

export function box(
  label,
  { n = 3, hint = "", tone = "", cls = "", inner = "", tall = false } = {},
) {
  return `<div class="box ${tone} ${cls}"><span class="lbl">${label}</span>${
    hint ? `<span class="hint">${hint}</span>` : ""
  }${inner || (n ? lines(n, tall ? "tall" : "") : "")}</div>`;
}
export const sec = (t) => `<h3 class="sec">${D.star()}${esc(t)}</h3>`;
export function checklist(items, { cls = "" } = {}) {
  return `<ul class="cl ${cls}">${items.map((i) => `<li>${ck()}<span>${i}</span></li>`).join("")}</ul>`;
}
export const bullets = (items) =>
  `<ul class="plain">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
export const steps = (items) =>
  `<ol class="steps">${items.map((i) => `<li><span>${i}</span></li>`).join("")}</ol>`;
export const note = (t) => `<div class="note">${t}</div>`;

// ---------- page + cover ----------
export function header(title, sub = "", handNote = "", kicker = site.signature) {
  return `<div class="ph"><div><p class="kicker">${esc(kicker)}</p><h2>${esc(title)}</h2>${
    sub ? `<p class="sub">${sub}</p>` : ""
  }</div>${handNote ? `<p class="hand">${esc(handNote)}</p>` : ""}</div>`;
}

/** A normal inside page. `body` is HTML. Footer/page number added by makeDoc. */
export const page = (title, sub, body, { hand = "", cls = "", kicker } = {}) => ({
  kind: "page",
  html: `${header(title, sub, hand, kicker)}${body}`,
  cls,
});
/** A page with no header, caller supplies everything. */
export const rawPage = (html, cls = "") => ({ kind: "page", html, cls });

export function cover({
  kicker,
  title,
  dek,
  tone = "t-butter",
  badge = "",
  footerNote = "",
  doodles = "",
  hand = "",
}) {
  return {
    kind: "cover",
    html: `<div class="band top"></div><div class="band bot"></div>
${doodles}
<div class="inner">
  <div><span class="wm">plans past <b>five.</b></span><p class="tag">${esc(site.tagline)}</p></div>
  <div style="margin-top:0.95in">
    ${badge ? `<span class="stamp">${esc(badge)}</span>` : ""}
    <p class="kicker" style="margin-top:0.22in">${esc(kicker)}</p>
    <h1 style="margin-top:0.1in">${title}</h1>
    <p class="dek">${dek}</p>
    ${hand ? `<p class="hand" style="margin-top:0.2in">${esc(hand)}</p>` : ""}
  </div>
  <div class="panel ${tone}">${footerNote}</div>
</div>`,
    cls: "cover",
  };
}

/** Assemble a full HTML document. `cssHref` is relative to the output file. */
export function makeDoc({ title, footerLabel, pages, cssHref = "brand.css" }) {
  const body = pages
    .map((p, i) => {
      const n = i + 1;
      const foot =
        p.kind === "cover"
          ? ""
          : `<div class="pf"><span><b>${esc(site.domain)}</b></span><span>${esc(footerLabel)}</span><span>${n} / ${pages.length}</span></div>`;
      return `<section class="page ${p.cls || ""}">${p.html}${foot}</section>`;
    })
    .join("\n");
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title>
<meta name="viewport" content="width=816">
<link rel="stylesheet" href="${cssHref}">
</head><body>
${body}
</body></html>
`;
}

// ---------- activity cards ----------
const catTone = {
  Creative: "t-butter-s",
  "Table for one": "t-strawberry-s",
  "Better together": "t-matcha-s",
  "After hours": "t-sunday-s",
  Weekend: "t-butter-s",
  Cozy: "t-strawberry-s",
  Active: "t-matcha-s",
  Hosting: "t-strawberry-s",
  Craft: "t-butter-s",
  Games: "t-sunday-s",
  Treat: "t-matcha-s",
  Seasonal: "t-sunday-s",
};
export function card(c, i) {
  const tone = catTone[c.cat] || "t-cream";
  const corner = [D.flower("corner"), D.star("corner"), D.bow("corner"), D.sparkle("corner")][
    i % 4
  ];
  return `<div class="card ${tone}">
  <div class="cat"><span class="kicker">${esc(c.cat)}</span></div>${corner}
  <h4>${esc(c.title)}</h4>
  <p class="body">${esc(c.body)}</p>
  ${c.hand ? `<p class="hand">${esc(c.hand)}</p>` : ""}
  <div class="meta"><span>${esc(c.time)}</span><span>${esc(c.cost)}</span>${c.bring ? `<span>Bring: ${esc(c.bring)}</span>` : ""}</div>
</div>`;
}
/** Splits cards into pages of 6 (2 x 3). */
export function cardPages(cards, deckName, startIndex = 0) {
  const out = [];
  for (let i = 0; i < cards.length; i += 6) {
    const slice = cards.slice(i, i + 6);
    while (slice.length < 6) slice.push(null);
    out.push({
      kind: "page",
      cls: "noframe",
      html: `<div class="cards">${slice
        .map((c, j) =>
          c
            ? card(c, startIndex + i + j)
            : `<div class="card t-cream"><span class="kicker">Make your own</span><h4>Your idea here</h4><div style="margin-top:0.12in">${lines(5)}</div><div class="meta"><span>Time ______</span><span>Cost ______</span></div></div>`,
        )
        .join(
          "",
        )}</div><p class="card-note">${esc(deckName)} · cut along the dashed lines · ${esc(site.domain)}</p>`,
    });
  }
  return out;
}

// ---------- calendars & day rows ----------
export function monthGrid(rows = 5) {
  const dow = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return `<div class="cal">${dow.map((d) => `<div class="dow">${d}</div>`).join("")}${Array.from({
    length: rows * 7,
  })
    .map((_, i) => `<div class="day${i % 7 > 4 ? " wk" : ""}">&nbsp;</div>`)
    .join("")}</div>`;
}

// ---------- file helpers ----------
export function writeFile(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}
