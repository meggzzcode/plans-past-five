#!/usr/bin/env python3
"""Slice an AI contact sheet (equal grid) into separate tile images.

Usage: python3 scripts/slice-sheet.py sheet.jpg --cols 3 --rows 3 --names a,b,c,... --out dir [--trim 0.01]
Each tile is cropped with a small inner trim to remove gutters/borders and saved as <name>.jpg (quality 90).
Needs Pillow. Always check each tile by eye afterwards.
"""
import argparse, os
from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument("sheet")
ap.add_argument("--cols", type=int, default=3)
ap.add_argument("--rows", type=int, default=3)
ap.add_argument("--names", required=True, help="comma-separated tile names, left to right, top to bottom")
ap.add_argument("--out", required=True)
ap.add_argument("--trim", type=float, default=0.012, help="fraction trimmed from each tile edge")
a = ap.parse_args()

names = [n.strip() for n in a.names.split(",") if n.strip()]
if len(names) > a.cols * a.rows:
    raise SystemExit("more names than tiles")
im = Image.open(a.sheet).convert("RGB")
W, H = im.size
tw, th = W / a.cols, H / a.rows
os.makedirs(a.out, exist_ok=True)
for i, n in enumerate(names):
    r, c = divmod(i, a.cols)
    x0, y0 = c * tw, r * th
    tx, ty = tw * a.trim, th * a.trim
    box = (round(x0 + tx), round(y0 + ty), round(x0 + tw - tx), round(y0 + th - ty))
    tile = im.crop(box)
    p = os.path.join(a.out, f"{n}.jpg")
    tile.save(p, quality=90)
    print(p, tile.size)
