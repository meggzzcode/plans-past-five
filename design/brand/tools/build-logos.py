#!/usr/bin/env python3
"""Builds the outlined (font-free) SVG logo files in design/brand/logos and favicon/.
Requires: pip install fonttools   (dev-time only; the SVG outputs have no dependencies)
Usage: python3 design/brand/tools/build-logos.py
Glyphs come from the static Fraunces / DM Sans files in design/brand/fonts (SIL OFL)."""
import math, os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

HERE = os.path.dirname(os.path.abspath(__file__))
BRAND = os.path.dirname(HERE)
FONTS = os.path.join(BRAND, "fonts")
OUT = os.path.join(BRAND, "logos")
FAV = os.path.join(BRAND, "favicon")

CHERRY, CREAM, BUTTER, GARDEN, ESPRESSO, STRAW = "#B83F43", "#FFF8EF", "#F8E5A3", "#394D3C", "#48362E", "#F4D4D7"

_cache = {}
def font(name):
    if name not in _cache:
        _cache[name] = TTFont(os.path.join(FONTS, name))
    return _cache[name]

def text_path(fontname, text, size, x=0.0, y=0.0, tracking=0.0, upper=False):
    """Return (svg path d, advance width). y is the baseline. tracking in em."""
    f = font(fontname)
    upm = f["head"].unitsPerEm
    gs = f.getGlyphSet()
    cmap = f.getBestCmap()
    hmtx = f["hmtx"]
    s = size / upm
    pen = SVGPathPen(gs, ntos=lambda v: ("%.2f" % v).rstrip("0").rstrip("."))
    cx = x
    if upper:
        text = text.upper()
    for ch in text:
        g = cmap[ord(ch)]
        tp = TransformPen(pen, (s, 0, 0, -s, cx, y))
        gs[g].draw(tp)
        cx += hmtx[g][0] * s + tracking * size
    return pen.getCommands(), cx - x - tracking * size

def stacked(fg, tagline=None, pad=24):
    S = 200.0
    d1, w1 = text_path("Fraunces-500.ttf", "plans past", S * 0.42, 0, 0, tracking=-0.025)
    d2, w2 = text_path("Fraunces-600-italic.ttf", "five.", S, 0, 0, tracking=-0.04)
    base1 = S * 0.33
    base2 = base1 + S * 0.9
    d1, _ = text_path("Fraunces-500.ttf", "plans past", S * 0.42, 0, base1, tracking=-0.025)
    d2, _ = text_path("Fraunces-600-italic.ttf", "five.", S, 0, base2, tracking=-0.04)
    W = max(w1, w2)
    H = base2 + S * 0.22
    parts = [f'<path fill="{fg}" d="{d1}"/>', f'<path fill="{fg}" d="{d2}"/>']
    if tagline:
        _, wt = text_path("DMSans-500.ttf", tagline, S * 0.1, 0, 0, tracking=0.2, upper=True)
        ts = S * 0.1 * min(1.0, W / wt) if wt > W else S * 0.1
        dt, wt = text_path("DMSans-500.ttf", tagline, ts, 0, base2 + S * 0.42, tracking=0.2, upper=True)
        H = base2 + S * 0.46
        parts.append(f'<path fill="{ESPRESSO if fg == CHERRY else fg}" d="{dt}"/>')
    return parts, W, H

def svg(parts, W, H, pad, bg=None, title="Plans Past Five"):
    vw, vh = W + 2 * pad, H + 2 * pad
    bgr = f'<rect width="{vw:.1f}" height="{vh:.1f}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vw:.1f} {vh:.1f}" role="img" aria-label="{title}">'
            f'<title>{title}</title>{bgr}<g transform="translate({pad},{pad})">{"".join(parts)}</g></svg>\n')

def inline(fg, pad=16):
    S = 100.0
    d1, w1 = text_path("Fraunces-500.ttf", "plans past", S, 0, S * 1.15, tracking=-0.025)
    gap = S * 0.18
    d2, w2 = text_path("Fraunces-600-italic.ttf", "five.", S * 1.45, w1 + gap, S * 1.15, tracking=-0.04)
    return [f'<path fill="{fg}" d="{d1}"/>', f'<path fill="{fg}" d="{d2}"/>'], w1 + gap + w2, S * 1.4

def scallop(cx, cy, r, rin, n):
    pts = []
    for i in range(n + 1):
        a = i / n * math.pi * 2
        am = (i - 0.5) / n * math.pi * 2
        x, y = cx + math.cos(a) * rin, cy + math.sin(a) * rin
        qx, qy = cx + math.cos(am) * (r + 3), cy + math.sin(am) * (r + 3)
        pts.append(("M%.2f %.2f" % (x, y)) if i == 0 else ("Q%.2f %.2f %.2f %.2f" % (qx, qy, x, y)))
    return " ".join(pts) + "Z"

def monogram(fill, stroke, five, star):
    d5, w5 = text_path("Fraunces-600-italic.ttf", "5", 38, 0, 45)
    d5, w5 = text_path("Fraunces-600-italic.ttf", "5", 38, 31 - w5 / 2, 45)
    return [f'<path fill="{fill}" stroke="{stroke}" stroke-width="2" d="{scallop(32,32,28,24,16)}"/>',
            f'<path fill="{five}" d="{d5}"/>',
            f'<path fill="{star}" d="M47 14l1.4 3.6 3.6 1.4-3.6 1.4L47 24l-1.4-3.6L42 19l3.6-1.4z"/>']

def write(path, s):
    with open(path, "w") as fh:
        fh.write(s)
    print("wrote", os.path.relpath(path, BRAND))

# primary: stacked
p, W, H = stacked(CHERRY); write(f"{OUT}/logo-primary-cherry.svg", svg(p, W, H, 24))
p, W, H = stacked(CHERRY, "Making a life, not just a living"); write(f"{OUT}/logo-primary-tagline-cherry.svg", svg(p, W, H, 24))
p, W, H = stacked(CREAM); write(f"{OUT}/logo-primary-cream.svg", svg(p, W, H, 24))
p, W, H = stacked(CREAM); write(f"{OUT}/logo-primary-cream-on-garden.svg", svg(p, W, H, 40, bg=GARDEN))
p, W, H = stacked(CHERRY); write(f"{OUT}/logo-primary-cherry-on-cream.svg", svg(p, W, H, 40, bg=CREAM))
p, W, H = stacked(ESPRESSO); write(f"{OUT}/logo-primary-espresso-1color.svg", svg(p, W, H, 24))
# wordmark: horizontal
p, W, H = inline(CHERRY); write(f"{OUT}/wordmark-horizontal-cherry.svg", svg(p, W, H, 16))
p, W, H = inline(CREAM); write(f"{OUT}/wordmark-horizontal-cream.svg", svg(p, W, H, 16))
p, W, H = inline(ESPRESSO); write(f"{OUT}/wordmark-horizontal-espresso-1color.svg", svg(p, W, H, 16))
# secondary: monogram badge
write(f"{OUT}/logo-secondary-monogram-cream.svg", svg(monogram(CREAM, CHERRY, CHERRY, CHERRY), 64, 64, 4, title="Plans Past Five monogram"))
write(f"{OUT}/logo-secondary-monogram-cherry.svg", svg(monogram(CHERRY, CHERRY, CREAM, BUTTER), 64, 64, 4, title="Plans Past Five monogram"))
write(f"{OUT}/logo-secondary-monogram-on-garden.svg", svg(monogram(CREAM, CREAM, CHERRY, CHERRY), 64, 64, 4, bg=GARDEN, title="Plans Past Five monogram"))
# favicon source (outlined version of public/favicon.svg)
d5, w5 = text_path("Fraunces-700-italic.ttf", "5", 46, 0, 49)
d5, w5 = text_path("Fraunces-700-italic.ttf", "5", 46, 30 - w5 / 2, 49)
write(f"{FAV}/favicon-source.svg",
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>Plans Past Five favicon</title>'
      f'<rect width="64" height="64" rx="14" fill="{CHERRY}"/><path fill="{CREAM}" d="{d5}"/>'
      f'<path fill="{BUTTER}" d="M49 10l1.6 4.4 4.4 1.6-4.4 1.6L49 22l-1.6-4.4L43 16l4.4-1.6z"/></svg>\n')
