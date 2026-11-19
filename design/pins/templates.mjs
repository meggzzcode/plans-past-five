// HTML templates for the Plans Past Five pin system. Each function takes a pin spec and returns a full HTML document (1000x1500).
// Visual language mirrors src/components/brand/Doodles.tsx and Wordmark.tsx (star, sparkle, flower, bow, squiggle, scalloped badge, gingham).

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/** *word* -> <em>word</em> (italic accent). Text is escaped first. */
export const em = (s = "") => esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>");

// ---- doodles (same paths as src/components/brand/Doodles.tsx) ----
const svg = {
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.5l2.3 7.2 7.2 2.3-7.2 2.3L12 20.5l-2.3-7.2L2.5 11l7.2-2.3z"/></svg>',
  sparkle:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z"/></svg>',
  bow: '<svg viewBox="0 0 48 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 14c-6-8-18-10-18-2s12 6 18 2zM24 14c6-8 18-10 18-2s-12 6-18 2z" fill="currentColor" fill-opacity=".18"/><path d="M22 16l-6 14M26 16l6 14"/><circle cx="24" cy="14.5" r="2.6" fill="currentColor"/></svg>',
  flower:
    '<svg viewBox="0 0 32 32">' +
    [0, 72, 144, 216, 288]
      .map(
        (r) =>
          `<ellipse cx="16" cy="8.5" rx="5" ry="7" fill="currentColor" opacity=".88" transform="rotate(${r} 16 16)"/>`,
      )
      .join("") +
    '<circle cx="16" cy="16" r="4" fill="#F8E5A3"/></svg>',
  arrow:
    '<svg viewBox="0 0 80 40" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 30c14-18 40-24 66-12"/><path d="M62 10l9 8-11 4"/></svg>',
  squiggle:
    '<svg viewBox="0 0 120 12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M2 6c8-6 12 6 20 0s12 6 20 0 12 6 20 0 12 6 20 0 12 6 20 0 12 6 16 0"/></svg>',
};

function scallop(cx, cy, r, rin, n) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2,
      am = ((i - 0.5) / n) * Math.PI * 2;
    const x = cx + Math.cos(a) * rin,
      y = cy + Math.sin(a) * rin;
    const qx = cx + Math.cos(am) * (r + 3),
      qy = cy + Math.sin(am) * (r + 3);
    pts.push(
      i === 0
        ? `M${x.toFixed(2)} ${y.toFixed(2)}`
        : `Q${qx.toFixed(2)} ${qy.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)}`,
    );
  }
  return pts.join(" ") + "Z";
}
const badgeSvg = (fill) =>
  `<svg viewBox="0 0 64 64"><path fill="${fill}" d="${scallop(32, 32, 28, 24, 14)}"/></svg>`;

/** deco: array of [kind, left, top, size, rotate] (px). */
const decoHtml = (list = []) =>
  list
    .map(
      ([k, x, y, s, r = 0]) =>
        `<div class="deco" style="left:${x}px;top:${y}px;width:${s}px;height:${k === "squiggle" ? Math.round(s / 10) : k === "bow" ? Math.round(s * 0.66) : k === "arrow" ? Math.round(s / 2) : s}px;transform:rotate(${r}deg)">${svg[k]}</div>`,
    )
    .join("");

const brand = (cls = "") => `<div class="brand ${cls}">plans past <i>five.</i></div>`;
const gingham = (pos) => `<div class="gingham-strip" style="${pos}"></div>`;
const pill = (txt, extra = "") =>
  `<div class="pillwrap ${extra}"><span class="pill kicker">${esc(txt)}</span></div>`;
const photoUrl = (p) => `../../../src/assets/${p.img}`;

const FIT = `<script>
(function(){
  function over(el){
    var mh=+el.dataset.maxh;
    if(mh){var c=el.firstElementChild;return c.offsetHeight>mh||c.scrollWidth>el.clientWidth+1;}
    var single=el.children.length===1&&el.firstElementChild.tagName==='DIV';
    var h=single?el.firstElementChild.offsetHeight>el.clientHeight+1:el.scrollHeight>el.clientHeight+1;
    return h||el.scrollWidth>el.clientWidth+1;}
  window.__over=over;
  function fit(el){var max=+el.dataset.max||100,min=+el.dataset.min||24,s=max;el.style.fontSize=s+'px';
    while(over(el)&&s>min){s-=2;el.style.fontSize=s+'px';}
    el.dataset.size=s;if(el.dataset.maxh){el.dataset.fitH=el.firstElementChild.offsetHeight;el.style.height='auto';}}
  function run(){document.querySelectorAll('.fit').forEach(fit);document.body.dataset.fitted='1';}
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){requestAnimationFrame(run)});
})();
</script>`;

function doc(p, bodyClass, inner) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${esc(p.id)}</title>
<meta name="viewport" content="width=1000">
<link rel="stylesheet" href="../pin.css"></head>
<body class="pin t-${p.t} th-${p.theme} ${bodyClass || ""}" data-pin="${esc(p.id)}">
${inner}
${FIT}
</body></html>`;
}

// ---------------------------------------------------------------- templates
const templates = {
  headline(p) {
    const v = p.variant || "stack";
    const deco =
      p.deco ||
      (v === "center"
        ? [
            ["star", 80, 1180, 70, 0],
            ["sparkle", 850, 120, 80, 10],
            ["flower", 840, 1130, 90, 12],
          ]
        : v === "num"
          ? [
              ["sparkle", 830, 700, 70, 0],
              ["star", 60, 1250, 64, -8],
            ]
          : [
              ["star", 830, 92, 86, 8],
              ["sparkle", 760, 1240, 64, 0],
              ["bow", 90, 1250, 120, -8],
            ]);
    const fitMax = v === "num" ? 128 : p.max || 150;
    return doc(
      p,
      v,
      `
${p.num ? `<div class="bignum disp fit chk" data-max="560" data-min="220">${esc(p.num)}</div>` : ""}
${pill(p.kicker || "The Journal", "")}
<div class="h disp fit chk" data-max="${fitMax}" data-min="52"><div>${em(p.headline)}</div></div>
${p.sub ? `<div class="sub chk fit" data-max="40" data-min="26">${em(p.sub)}</div>` : ""}
${p.note ? `<div class="note hand">${esc(p.note)}</div>` : ""}
${decoHtml(deco)}
${gingham("bottom:0;height:34px")}
<div class="brand" style="bottom:70px">plans past <i>five.</i></div>`,
    );
  },

  cover(p) {
    return doc(
      p,
      "",
      `
<div class="photo" style="background-image:url(${photoUrl(p)});background-position:${p.pos || "50% 50%"}"></div>
<div class="shade"></div>
<div class="mast">plans past <i>five.</i></div><div class="mastgingham"></div>
<div class="burst">${badgeSvg("currentColor")}<span>${esc(p.burst || "New")}</span></div>
<div class="block">
  <div class="kick kicker" style="color:var(--butter)">${esc(p.kicker || "The Journal")}</div>
  <div class="h disp fit chk" data-max="124" data-min="56" data-maxh="560"><div>${em(p.headline)}</div></div>
  ${p.sub ? `<div class="sub chk fit" data-max="34" data-min="24" style="height:auto">${esc(p.sub)}</div>` : ""}
</div>`,
    );
  },

  editorial(p) {
    const v = p.variant || "arch";
    const imgStyle = `background-image:url(${photoUrl(p)});background-position:${p.pos || "50% 50%"}`;
    if (v === "arch")
      return doc(
        p,
        "arch",
        `
<div class="photo" style="${imgStyle}"></div>
${decoHtml(
  p.deco || [
    ["star", 40, 70, 90, -8],
    ["sparkle", 850, 840, 80, 0],
    ["flower", 60, 790, 100, 0],
  ],
)}
<div class="kick kicker abs" style="color:var(--acc)">${esc(p.kicker || "")}</div>
<div class="h disp fit chk" data-max="92" data-min="44"><div>${em(p.headline)}</div></div>
${p.note ? `<div class="note hand">${esc(p.note)}</div>` : ""}
${brand()}`,
      );
    if (v === "postcard")
      return doc(
        p,
        "postcard",
        `
<div class="kick kicker abs pill" style="top:90px;left:80px;background:var(--pill-bg);color:var(--pill-fg);padding:14px 30px 12px;border-radius:999px">${esc(p.kicker || "")}</div>
<div class="photo" style="${imgStyle}"></div>
<div class="tape" style="left:140px;top:285px;transform:rotate(-9deg)"></div>
<div class="tape" style="left:690px;top:300px;transform:rotate(7deg)"></div>
${p.cap ? `<div class="cap hand chk">${esc(p.cap)}</div>` : ""}
<div class="h disp fit chk" data-max="92" data-min="44"><div>${em(p.headline)}</div></div>
${decoHtml(
  p.deco || [
    ["sparkle", 830, 160, 90, 0],
    ["bow", 70, 1340, 130, -6],
  ],
)}
${gingham("bottom:0;height:34px")}`,
      );
    // split
    return doc(
      p,
      "split",
      `
<div class="photo" style="${imgStyle}"></div>
<div class="panel"></div><div class="scallop"></div>
<div class="kick kicker abs" style="color:var(--acc)">${esc(p.kicker || "")}</div>
<div class="h disp fit chk" data-max="86" data-min="44"><div>${em(p.headline)}</div></div>
${p.note ? `<div class="note hand">${esc(p.note)}</div>` : ""}
${decoHtml(p.deco || [["star", 850, 900, 80, 10]])}
${gingham("bottom:0;height:34px")}`,
    );
  },

  checklist(p) {
    const items = (p.items || [])
      .map((it) => `<div class="li"><span class="box"></span><span>${em(it)}</span></div>`)
      .join("");
    return doc(
      p,
      "",
      `
${pill(p.kicker || "Checklist")}
<div class="h disp fit chk" data-max="92" data-min="44"><div>${em(p.headline)}</div></div>
<div class="tape" style="left:130px"></div><div class="tape" style="left:700px;transform:rotate(5deg)"></div>
<div class="card"><div class="list fit chk" data-max="54" data-min="26">${items}</div></div>
${p.note ? `<div class="note hand">${esc(p.note)}</div>` : ""}
${decoHtml(
  p.deco || [
    ["star", 860, 70, 80, 8],
    ["sparkle", 30, 1380, 60, 0],
  ],
)}
${brand("")}`,
    );
  },

  steps(p) {
    const steps = (p.steps || [])
      .map(
        ([a, b], i) =>
          `<div class="st"><div class="n">${i + 1}</div><div class="tx"><div class="a">${em(a)}</div><div class="b">${esc(b)}</div></div></div>`,
      )
      .join("");
    return doc(
      p,
      "",
      `
<div class="kick kicker abs" style="color:var(--acc)">${esc(p.kicker || "How to start")}</div>
<div class="h disp fit chk" data-max="96" data-min="44"><div>${em(p.headline)}</div></div>
<div class="rail n${(p.steps || []).length}">${steps}</div>
${p.note ? `<div class="note hand">${esc(p.note)}</div>` : ""}
${decoHtml(p.deco || [["flower", 860, 80, 80, 10]])}
${gingham("bottom:0;height:34px")}
${brand("").replace('class="brand "', 'class="brand " style="bottom:70px;left:auto;right:80px;text-align:right;font-size:34px"')}`,
    );
  },

  quote(p) {
    return doc(
      p,
      p.variant || "",
      `
<div class="qm">&ldquo;</div>
<div class="q fit chk" data-max="${p.max || 110}" data-min="46"><div>${em(p.quote)}</div></div>
<div class="attr"><span class="squig" style="display:block;width:170px;height:16px;color:var(--acc)">${svg.squiggle}</span></div>
<div class="from"><div class="lab">${esc(p.fromLabel || "From the guide")}</div><div class="ttl fit chk" data-max="46" data-min="28">${esc(p.from || "")}</div></div>
<div class="cta"><span class="pill kicker">${esc(p.cta || "Read it")} &rarr;</span></div>
${decoHtml(
  p.deco || [
    ["sparkle", 820, 60, 90, 8],
    ["star", 810, 1050, 70, 0],
  ],
)}
${brand()}`,
    );
  },

  printable(p) {
    const s = p.sheet || {};
    const lines = (s.lines || [])
      .map((l) => `<div class="ln"><i></i><span>${esc(l)}</span></div>`)
      .join("");
    const grid = s.grid
      ? `<div class="grid">${s.grid.map((g, i) => `<div class="cell ${i % 3 === 1 ? "fill" : ""}">${esc(g)}</div>`).join("")}</div>`
      : "";
    return doc(
      p,
      "",
      `
${pill(p.kicker || "Free printable")}
<div class="h disp fit chk" data-max="100" data-min="48"><div>${em(p.headline)}</div></div>
<div class="sheetback"></div>
<div class="sheet"><div class="st">${esc(s.title || "")}</div><div class="ss">${esc(s.sub || "")}</div>${lines}${grid}</div>
<div class="badge" style="color:${p.theme === "butter" || p.theme === "cherry" || p.theme === "garden" ? "var(--straw)" : "var(--butter)"}">${badgeSvg("currentColor")}<span>${esc(p.burst || "Free")}</span></div>
${p.note ? `<div class="note hand">${esc(p.note)}</div>` : ""}
${decoHtml(p.deco || [["star", 40, 520, 70, -8]])}
${brand()}`,
    );
  },

  quiz(p) {
    const v = p.variant || "question";
    let inner;
    if (v === "result") {
      const r = p.result || {};
      inner = `<div class="result"><div class="rk">${esc(r.kicker || "Your hobby era")}</div><div class="rt">${esc(r.title)}</div><div class="rl">${esc(r.line)}</div><div class="chips">${(r.chips || []).map((c) => `<span>${esc(c)}</span>`).join("")}</div></div>`;
    } else {
      const q = p.q || {};
      inner = `<div class="ui"><div class="dots">${[0, 1, 2, 3, 4, 5].map((i) => `<i class="${i <= (q.n || 1) - 1 ? "on" : ""}"></i>`).join("")}</div><div class="qn">Question ${q.n || 1} of 6</div><div class="qq fit chk" data-max="46" data-min="30">${esc(q.q)}</div>${(q.opts || []).map((o, i) => `<div class="opt ${i === (q.sel ?? -1) ? "sel" : ""}"><span>${esc(o)}</span></div>`).join("")}</div>`;
    }
    return doc(
      p,
      v,
      `
${pill(p.kicker || "Find Your Thing")}
<div class="h disp fit chk" data-max="108" data-min="52"><div>${em(p.headline)}</div></div>
${inner}
${p.note ? `<div class="note hand">${esc(p.note)}</div>` : ""}
<div class="cta"><span class="pill kicker">${esc(p.cta || "Take the quiz")} &rarr;</span></div>
${decoHtml(
  p.deco || [
    ["star", 60, 120, 80, -8],
    ["sparkle", 880, 520, 60, 0],
    ["flower", 870, 1330, 90, 10],
  ],
)}
${gingham("bottom:0;height:34px")}`,
    );
  },
};

export function render(p) {
  const f = templates[p.t];
  if (!f) throw new Error("unknown template " + p.t);
  return f(p);
}
export const templateNames = Object.keys(templates);
