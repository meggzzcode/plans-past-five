// Click audit: taps every visually clickable element on every public route at a phone viewport and
// checks that something happens (URL change, DOM/state change, dialog, toggle, copy, download, popup).
//
// Usage:
//   bunx vite dev --host 127.0.0.1 --port 5901        # or: bun run build && node scripts/serve-built.mjs 3000
//   node scripts/click-audit.mjs [--base http://127.0.0.1:5901] [--out report.json] [--quick]
//        [--routes /,/hobbies,/saved] [--viewport 390x844] [--max-same 4]
//
// Playwright must be resolvable (local install or `npm i -g playwright`). Exit code is 1 when any
// element is dead, obscured or logs a console error, so it can gate a release.
//
// Findings (see docs/marketplace/UI-FIXES.md):
//   dead          looks or is clickable, tapping it changes nothing (and it is not a same-page link)
//   console       a console error / page error / failed navigation (4xx, 5xx) followed a tap
//   obscured      tapping it was blocked by another element or it could not be reached
//   nested        interactive element inside another interactive element (a link in a link, ...)
//   partial-card  a hover-styled card whose link covers less than 90% of it
//   link-styled   underlined or link-coloured text that is not a link
//   no-affordance a link/button in running text with nothing that marks it as clickable
//   info-chip     bordered, pill-like text that is not interactive (review: decorative or missing link)
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

function loadPlaywright() {
  const require = createRequire(import.meta.url);
  try {
    return require("playwright");
  } catch {
    const root = execSync("npm root -g", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    return require(path.join(root, "playwright"));
  }
}
const { chromium } = loadPlaywright();

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : (args[i + 1] ?? fallback);
};
const flag = (name) => args.includes(`--${name}`);
const BASE = opt("base", "http://127.0.0.1:5901").replace(/\/$/, "");
const OUT = opt("out", path.join(os.tmpdir(), "click-audit.json"));
const [VW, VH] = opt("viewport", "390x844").split("x").map(Number);
const MAX_SAME = Number(opt("max-same", "5")); // tap this many look-alike links, URL-check the rest
const QUICK = flag("quick");
const VERBOSE = flag("verbose");
const ROUTE_BUDGET_MS = Number(opt("route-budget", "240000")); // stop tapping on a route after this

/* ---------------------------------- routes ---------------------------------- */

const STATIC = [
  "/",
  "/start-here",
  "/hobbies",
  "/journal",
  "/shop",
  "/hobby-finder",
  "/make-plans",
  "/tools/hobby-budget",
  "/tools/tonight",
  "/saved",
  "/search",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/affiliate-disclosure",
  "/editorial-policy",
  "/methodology",
  "/corrections",
  "/after-hours",
  "/weekends",
  "/solo-dates",
  "/better-together",
  "/creative-corner",
  "/movement",
];

async function discoverRoutes() {
  let paths = [];
  try {
    const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
    paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  } catch {
    /* fall through to the static list */
  }
  const pick = (prefix, n) => {
    const all = paths.filter((p) => p.startsWith(prefix) && p.split("/").length === 3);
    const step = Math.max(1, Math.floor(all.length / n));
    return all.filter((_, i) => i % step === 0).slice(0, n);
  };
  const routes = [...STATIC];
  routes.push(...pick("/hobbies/", 6), ...pick("/shop/", 8), ...pick("/journal/", 6));
  routes.push("/search?q=pottery"); // a search with results
  routes.push("/saved?seed=1"); // marker: seeded with one of each saved kind
  return [...new Set(routes)];
}

/* ------------------------- in-page helpers (serialised) ------------------------- */

const INIT = () => {
  window.__ca = { mut: 0, clip: 0, print: 0, open: 0 };
  new MutationObserver((l) => {
    window.__ca.mut += l.length;
  }).observe(document, { subtree: true, childList: true, attributes: true, characterData: true });
  try {
    const wt = async () => {
      window.__ca.clip++;
    };
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: wt, readText: async () => "" },
      configurable: true,
    });
  } catch {
    /* ignore */
  }
  window.print = () => {
    window.__ca.print++;
  };
};

/** Tags every candidate with data-ca and returns descriptors. Also runs the static checks. */
function collect(skipChrome) {
  const SEL =
    'a[href],button,summary,select,textarea,input:not([type=hidden]),[role=button],[role=tab],[role=checkbox],[role=switch],[role=menuitem],[role=link],[onclick],[tabindex]:not([tabindex="-1"])';
  const vis = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) return false;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none" || Number(cs.opacity) === 0)
      return false;
    return !el.closest("[hidden],[aria-hidden=true] ,[inert]") || el.closest("[role=dialog]");
  };
  const inChrome = (el) => !!el.closest("header,footer");
  const label = (el) =>
    (
      el.getAttribute("aria-label") ||
      el.innerText ||
      el.getAttribute("title") ||
      el.getAttribute("alt") ||
      el.value ||
      ""
    )
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 60);
  document.querySelectorAll("[data-ca]").forEach((e) => e.removeAttribute("data-ca"));
  const interactive = new Set([...document.querySelectorAll(SEL)]);
  // cursor:pointer on something that is not natively interactive (outermost only)
  for (const el of document.querySelectorAll("body *")) {
    if (interactive.has(el)) continue;
    if (getComputedStyle(el).cursor !== "pointer") continue;
    const p = el.parentElement;
    if (p && getComputedStyle(p).cursor === "pointer") continue;
    if (el.closest(SEL)) continue;
    interactive.add(el);
  }
  const out = [];
  const seenLabelFor = new Set();
  let i = 0;
  for (const el of interactive) {
    if (!vis(el)) continue;
    if (skipChrome && inChrome(el)) continue;
    if (el.disabled || el.getAttribute("aria-disabled") === "true") continue;
    if (el.tagName === "INPUT" && el.type === "file") continue;
    // a wrapper label of a control that is already a candidate would double count
    if (el.tagName === "LABEL" && el.querySelector(SEL)) continue;
    const id = String(i++);
    el.setAttribute("data-ca", id);
    const cs = getComputedStyle(el);
    const href = el.getAttribute("href");
    out.push({
      id,
      tag: el.tagName.toLowerCase(),
      role: el.getAttribute("role") || "",
      text: label(el),
      href,
      target: el.getAttribute("target") || "",
      download: el.hasAttribute("download"),
      cls: String(el.className?.baseVal ?? el.className ?? ""),
      pointerOnly: !el.matches(SEL),
      cursor: cs.cursor,
      nested:
        !!el.parentElement?.closest("a[href],button,[role=button]") &&
        el.matches("a[href],button,[role=button]"),
      chrome: inChrome(el),
      selected:
        el.getAttribute("aria-pressed") === "true" ||
        el.getAttribute("aria-checked") === "true" ||
        el.getAttribute("aria-selected") === "true" ||
        el.getAttribute("aria-current") === "page",
      field:
        el.tagName === "SELECT"
          ? "select"
          : el.tagName === "INPUT" && /^(text|search|email|number|)$/.test(el.type)
            ? "text"
            : el.tagName === "TEXTAREA"
              ? "text"
              : "",
      submit:
        el.tagName === "BUTTON" &&
        (el.type === "submit" || (!el.getAttribute("type") && !!el.closest("form"))),
    });
    void seenLabelFor;
  }

  /* ---------- static smell checks ---------- */
  const smells = [];
  const nonInteractive = (el) => !el.closest(SEL);
  const rect = (el) => el.getBoundingClientRect();
  // link-styled text that is not a link
  for (const el of document.querySelectorAll("p,span,h1,h2,h3,h4,li,div,strong,em")) {
    if (!vis(el) || !nonInteractive(el)) continue;
    if (skipChrome && inChrome(el)) continue;
    if (el.children.length > 0 && el.matches("div,li,p")) continue; // leaf-ish nodes only
    const cs = getComputedStyle(el);
    const txt = (el.textContent || "").trim();
    if (!txt || txt.length > 80) continue;
    const underlined = cs.textDecorationLine.includes("underline");
    if (underlined && !el.closest("u,abbr,del,ins,summary,label")) {
      smells.push({
        kind: "link-styled",
        text: txt.slice(0, 50),
        detail: "underlined text that is not a link",
      });
    }
  }
  // cards with a hover style whose link covers little of them / hover style without any link
  for (const el of document.querySelectorAll("article,li,div,section")) {
    if (!/(^|\s)hover:/.test(String(el.className)) || !vis(el)) continue;
    if (skipChrome && inChrome(el)) continue;
    if (el.closest(SEL) === el) continue;
    const links = el.querySelectorAll(":scope a[href]");
    const r = rect(el);
    if (links.length === 0 && nonInteractive(el)) {
      smells.push({
        kind: "link-styled",
        text: (el.textContent || "").trim().slice(0, 50),
        detail: "hover effect but no link or action inside",
      });
      continue;
    }
    let best = 0;
    for (const a of links) {
      const ar = rect(a);
      best = Math.max(best, (ar.width * ar.height) / Math.max(1, r.width * r.height));
    }
    if (links.length && best < 0.9) {
      smells.push({
        kind: "partial-card",
        text: (el.textContent || "").trim().slice(0, 50),
        detail: `link covers ${(best * 100).toFixed(0)}% of the card`,
      });
    }
  }
  // links/buttons in running text with no affordance
  for (const el of document.querySelectorAll("p a[href], li a[href], p button, td a[href]")) {
    if (!vis(el)) continue;
    if (skipChrome && inChrome(el)) continue;
    const cs = getComputedStyle(el);
    const ps = getComputedStyle(el.parentElement);
    const hasBorder = parseFloat(cs.borderBottomWidth) > 0 || parseFloat(cs.borderTopWidth) > 0;
    const hasBg = cs.backgroundColor !== "rgba(0, 0, 0, 0)";
    const underline = cs.textDecorationLine.includes("underline");
    const colourDiffers = cs.color !== ps.color;
    const heavier = Number(cs.fontWeight) > Number(ps.fontWeight);
    const hasIcon = !!el.querySelector("svg,img");
    const hasBgImg = cs.backgroundImage !== "none";
    if (!underline && !hasBorder && !hasBg && !colourDiffers && !heavier && !hasIcon && !hasBgImg) {
      smells.push({
        kind: "no-affordance",
        text: label(el),
        detail: `${el.tagName.toLowerCase()} in running text looks like plain text`,
      });
    }
  }
  // chip-like decoration
  for (const el of document.querySelectorAll("span,li,div")) {
    if (el.children.length > 2 || !vis(el) || !nonInteractive(el)) continue;
    if (skipChrome && inChrome(el)) continue;
    const cs = getComputedStyle(el);
    const t = (el.textContent || "").trim();
    if (!t || t.length > 28) continue;
    const bordered = parseFloat(cs.borderTopWidth) > 0 && parseFloat(cs.borderRadius) > 0;
    const pill = parseFloat(cs.borderRadius) >= 999 || /rounded-full/.test(String(el.className));
    const padded = parseFloat(cs.paddingLeft) >= 6 && parseFloat(cs.paddingTop) >= 2;
    if ((bordered || pill) && padded && /inline/.test(cs.display)) {
      smells.push({
        kind: "info-chip",
        text: t,
        detail: "pill/bordered text that is not interactive",
      });
    }
  }
  return { cands: out, smells };
}

const snapshot = () => {
  let ls = "";
  try {
    ls = JSON.stringify(localStorage) + JSON.stringify(sessionStorage);
  } catch {
    /* ignore */
  }
  const checks = [
    ...document.querySelectorAll(
      "[aria-expanded],[aria-pressed],[aria-checked],[aria-selected],[data-state],input,details",
    ),
  ]
    .map((e) =>
      [
        e.getAttribute("aria-expanded"),
        e.getAttribute("aria-pressed"),
        e.getAttribute("aria-checked"),
        e.getAttribute("aria-selected"),
        e.getAttribute("data-state"),
        e.checked,
        e.open,
        e.value,
      ].join(","),
    )
    .join("|");
  return {
    url: location.pathname + location.search + location.hash,
    scroll: Math.round(scrollY),
    mut: window.__ca?.mut ?? 0,
    clip: window.__ca?.clip ?? 0,
    print: window.__ca?.print ?? 0,
    ls,
    checks,
    dialogs: document.querySelectorAll("[role=dialog],[role=alertdialog],dialog[open]").length,
    hasNotFound:
      /page not found|not found/i.test(document.body.innerText.slice(0, 600)) &&
      /404/.test(document.body.innerText.slice(0, 600)),
  };
};

/* ---------------------------------- run ---------------------------------- */

const SEED_SAVED = JSON.stringify([
  {
    key: "article:solo-date-ideas",
    kind: "article",
    title: "Solo date ideas",
    href: "/journal/solo-date-ideas",
    savedAt: new Date().toISOString(),
  },
  {
    key: "hobby:pottery-painting",
    kind: "hobby",
    title: "Pottery Painting",
    href: "/hobbies/pottery-painting",
    savedAt: new Date().toISOString(),
  },
  {
    key: "product:test",
    kind: "product",
    title: "A product",
    href: "/shop/creative-girl",
    savedAt: new Date().toISOString(),
  },
]);

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: VW, height: VH },
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 2,
  acceptDownloads: true,
});
const baseHost = new URL(BASE).host;
await ctx.route("**/*", (route) => {
  const u = new URL(route.request().url());
  if (u.host === baseHost || /google|gstatic|data:/.test(u.host)) return route.continue();
  return route.fulfill({
    status: 200,
    contentType: "text/html",
    body: "<title>external</title>external",
  });
});
await ctx.addInitScript(INIT);
await ctx.addInitScript((seed) => {
  if (
    new URLSearchParams(location.search).get("seed") === "1" &&
    !localStorage.getItem("ppf:my-plans:v1")
  ) {
    localStorage.setItem("ppf:my-plans:v1", seed);
  }
}, SEED_SAVED);

async function waitForServer() {
  for (let i = 0; i < 30; i++) {
    try {
      if ((await fetch(BASE + "/")).status < 500) return;
    } catch {
      /* server restarting (dev server reloads) */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
}

const routes = process.argv.includes("--routes")
  ? opt("routes", "").split(",")
  : await discoverRoutes();
const report = { base: BASE, viewport: `${VW}x${VH}`, routes: [], totals: {} };
let first = true;

for (const route of QUICK ? routes.slice(0, 6) : routes) {
  const page = await ctx.newPage();
  const events = [];
  const popups = [];
  const downloads = [];
  const responses = [];
  page.on(
    "console",
    // ERR_CONNECTION_REFUSED/RESET is the dev server restarting under HMR, not a page fault.
    (m) =>
      m.type() === "error" &&
      !/ERR_CONNECTION_(REFUSED|RESET)/.test(m.text()) &&
      events.push(`console: ${m.text().slice(0, 160)}`),
  );
  page.on("pageerror", (e) => events.push(`pageerror: ${e.message.slice(0, 160)}`));
  page.on("download", (d) => downloads.push(d.suggestedFilename()));
  page.on("response", (r) => {
    if (r.request().resourceType() === "document" && r.status() >= 400)
      responses.push(`${r.status()} ${r.url()}`);
  });
  ctx.on("page", (p) => {
    if (p !== page) popups.push(p);
  });
  const goto = async () => {
    await waitForServer();
    await page.goto(BASE + route, { waitUntil: "load", timeout: 20000 }).catch(() => {});
    await page.waitForLoadState("networkidle", { timeout: 2500 }).catch(() => {});
    await page.waitForTimeout(150);
  };
  await goto();
  const routeStart = Date.now();
  const entry = { route, candidates: 0, clicked: 0, results: [], smells: [], problems: [] };
  const { cands, smells } = await page.evaluate(collect, !first);
  entry.candidates = cands.length;
  const dedupSmell = new Set();
  for (const s of smells) {
    const k = s.kind + s.text;
    if (!dedupSmell.has(k)) {
      dedupSmell.add(k);
      entry.smells.push(s);
    }
  }
  for (const c of cands)
    if (c.nested)
      entry.smells.push({
        kind: "nested",
        text: c.text,
        detail: `${c.tag} inside another interactive element`,
      });

  const sameSig = new Map();
  for (const c of cands) {
    const sig = `${c.tag}|${c.cls}`;
    const n = (sameSig.get(sig) ?? 0) + 1;
    sameSig.set(sig, n);
    if (Date.now() - routeStart > ROUTE_BUDGET_MS) {
      entry.problems.push({
        kind: "budget",
        text: "(route)",
        detail: "route time budget exhausted; remaining elements not tapped",
      });
      break;
    }
    if (VERBOSE) console.log(`  . ${c.tag} "${c.text}" ${c.href ?? ""}`);
    const res = { text: c.text, tag: c.tag, href: c.href, outcome: "", detail: "" };
    entry.results.push(res);
    const internal = c.href && c.href.startsWith("/");
    // URL-only check for look-alike internal links beyond the sample size
    if (internal && n > MAX_SAME) {
      const r = await fetch(BASE + c.href).catch(() => null);
      res.outcome = r && r.status < 400 ? "ok-http" : "dead";
      res.detail = r ? `HTTP ${r.status}` : "fetch failed";
      continue;
    }
    if (!internal && n > MAX_SAME && !c.href) {
      res.outcome = "sampled"; // look-alike button (same tag + classes): behaviour covered by the ones tapped above
      continue;
    }
    if (c.href && /^(mailto:|tel:)/.test(c.href)) {
      res.outcome = "ok-scheme";
      continue;
    }
    const loc = page.locator(`[data-ca="${c.id}"]`).first();
    if (!(await loc.count())) {
      res.outcome = "skipped";
      res.detail = "element gone after reset";
      continue;
    }
    if (!(await loc.isVisible())) {
      // collapsed <details>, folded sections and clipped content report a box but cannot be seen
      res.outcome = "hidden";
      continue;
    }
    const before = await page.evaluate(snapshot).catch(() => null);
    if (!before) {
      await goto();
      continue;
    }
    events.length = 0;
    responses.length = 0;
    popups.length = 0;
    downloads.length = 0;
    try {
      await loc.scrollIntoViewIfNeeded({ timeout: 2000 });
      if (c.field === "select") {
        // a native <select> cannot be tapped open in a script: pick the last option instead
        const vals = await loc.evaluate((s) => [...s.options].map((o) => o.value));
        await loc.selectOption(vals[vals.length - 1]);
      } else if (c.field === "text") {
        await loc.tap({ timeout: 3500 });
        const focused = await loc.evaluate((e) => document.activeElement === e);
        if (!focused) throw new Error("input did not take focus");
        await loc.fill("clay");
      } else if (c.submit) {
        const input = page
          .locator("form input[type=text],form input:not([type]),form input[type=search]")
          .first();
        if (await input.count()) await input.fill("clay");
        await loc.tap({ timeout: 3500 });
      } else {
        await loc.tap({ timeout: 3500 });
      }
    } catch (e) {
      const msg = String(e.message);
      const blocked = /intercepts pointer events/.test(msg);
      res.outcome = "obscured";
      res.detail = blocked
        ? (msg.match(/<[^>]+>[^\n]*intercepts/)?.[0] ?? "blocked by another element").slice(0, 160)
        : msg.split("\n")[0].slice(0, 160);
      entry.problems.push({ kind: "obscured", text: c.text, detail: res.detail });
      await goto();
      continue;
    }
    await page.waitForTimeout(350);
    for (const p of popups) await p.close().catch(() => {});
    const after = await page.evaluate(snapshot).catch(() => null);
    const changedUrl = !after || after.url !== before.url;
    const sameLink =
      internal &&
      new URL(c.href, BASE).pathname + new URL(c.href, BASE).search === before.url.split("#")[0];
    const changes = [];
    if (changedUrl) changes.push(`url -> ${after?.url ?? "(navigated)"}`);
    if (after) {
      if (after.mut > before.mut) changes.push("dom");
      if (Math.abs(after.scroll - before.scroll) > 20) changes.push("scroll");
      if (after.clip > before.clip) changes.push("copied");
      if (after.print > before.print) changes.push("print");
      if (after.ls !== before.ls) changes.push("storage");
      if (after.checks !== before.checks) changes.push("state");
      if (after.dialogs !== before.dialogs) changes.push("dialog");
    }
    if (popups.length) changes.push("new tab");
    if (downloads.length) changes.push(`download ${downloads[0]}`);
    res.detail = changes.join(", ");
    const errs = [...events, ...responses];
    if (after?.hasNotFound) errs.push("landed on a not-found page");
    if (errs.length) {
      res.outcome = "console";
      res.detail += ` | ${errs.join(" ; ")}`;
      entry.problems.push({ kind: "console", text: c.text, detail: errs.join(" ; ") });
    } else if (changes.length) {
      res.outcome = "ok";
    } else if (c.selected) {
      res.outcome = "already-selected"; // tapping the active option of a choice group is a no-op by design
    } else if (sameLink) {
      res.outcome = "self-link";
    } else {
      res.outcome = "dead";
      entry.problems.push({
        kind: "dead",
        text: c.text,
        detail: `${c.tag}${c.href ? ` href=${c.href}` : ""} ${c.pointerOnly ? "(cursor:pointer only) " : ""}cls=${c.cls.slice(0, 80)}`,
      });
    }
    entry.clicked++;
    // reset page state for the next element
    if (changes.length) {
      await goto();
      await page.evaluate(collect, !first); // re-tag in the same order
    }
  }
  first = false;
  report.routes.push(entry);
  const dead = entry.problems.length;
  console.log(
    `${route.padEnd(48)} candidates ${String(entry.candidates).padStart(3)}  tapped ${String(entry.clicked).padStart(3)}  problems ${dead}  smells ${entry.smells.length}`,
  );
  for (const p of entry.problems) console.log(`    ! ${p.kind}: "${p.text}" ${p.detail}`);
  await page.close();
}

/* header menu: open it once and audit the links inside */
{
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" }).catch(() => {});
  const menuBtn = page.getByRole("button", { name: /menu/i }).first();
  const menu = { route: "(header menu)", links: 0, problems: [] };
  if (await menuBtn.count()) {
    await menuBtn.tap();
    await page.waitForTimeout(300);
    const hrefs = await page.evaluate(() =>
      [
        ...new Set(
          [...document.querySelectorAll("header a[href],[role=dialog] a[href],nav a[href]")]
            .filter((a) => a.getBoundingClientRect().width > 0)
            .map((a) => a.getAttribute("href")),
        ),
      ].filter((h) => h.startsWith("/")),
    );
    menu.links = hrefs.length;
    for (const h of hrefs) {
      const r = await fetch(BASE + h).catch(() => null);
      if (!r || r.status >= 400)
        menu.problems.push({ kind: "dead", text: h, detail: `HTTP ${r?.status}` });
    }
    const link = page
      .locator("header a[href^='/'],[role=dialog] a[href^='/']")
      .filter({ visible: true })
      .nth(3);
    const before = page.url();
    if (await link.count()) {
      await link.tap().catch(() => {});
      await page.waitForTimeout(400);
      if (page.url() === before)
        menu.problems.push({
          kind: "dead",
          text: "menu link",
          detail: "tapping a menu link did not navigate",
        });
    }
  } else {
    menu.problems.push({
      kind: "dead",
      text: "menu button",
      detail: "no menu button found at phone width",
    });
  }
  console.log(`(header menu)`.padEnd(48) + `links ${menu.links}  problems ${menu.problems.length}`);
  for (const p of menu.problems) console.log(`    ! ${p.kind}: ${p.text} ${p.detail}`);
  report.routes.push({
    route: "(header menu)",
    candidates: menu.links,
    clicked: 1,
    results: [],
    smells: [],
    problems: menu.problems,
  });
  await page.close();
}

const all = report.routes.flatMap((r) => r.problems.map((p) => ({ route: r.route, ...p })));
const smellAll = report.routes.flatMap((r) => r.smells.map((s) => ({ route: r.route, ...s })));
report.totals = {
  routes: report.routes.length,
  candidates: report.routes.reduce((n, r) => n + r.candidates, 0),
  tapped: report.routes.reduce((n, r) => n + r.clicked, 0),
  problems: all.length,
  byKind: Object.fromEntries(
    [...new Set([...all, ...smellAll].map((x) => x.kind))].map((k) => [
      k,
      [...all, ...smellAll].filter((x) => x.kind === k).length,
    ]),
  ),
};
writeFileSync(OUT, JSON.stringify(report, null, 2));
console.log("\nTOTALS", JSON.stringify(report.totals));
console.log("Smells (review):");
const grouped = new Map();
for (const s of smellAll) {
  const k = `${s.kind} | ${s.text} | ${s.detail}`;
  grouped.set(k, [...(grouped.get(k) ?? []), s.route]);
}
for (const [k, rs] of grouped)
  console.log(
    `  ${k}  [${[...new Set(rs)].slice(0, 3).join(", ")}${rs.length > 3 ? ", ..." : ""}]`,
  );
console.log(`Report written to ${OUT}`);
await browser.close();
process.exit(all.length ? 1 : 0);
