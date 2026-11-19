import { cn } from "@/lib/utils";

/** Primary stacked wordmark: "plans past / five." — "five." oversized italic. Pure HTML text so it stays editable. */
export function WordmarkStacked({ className, tagline }: { className?: string; tagline?: string }) {
  return (
    <div className={cn("inline-flex flex-col items-start leading-none text-cherry", className)}>
      <span
        className="font-display text-[0.42em] font-medium tracking-tight"
        style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
      >
        plans past
      </span>
      <span
        className="-mt-[0.08em] font-display text-[1em] font-semibold italic tracking-[-0.04em]"
        style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
      >
        five<span className="text-cherry">.</span>
      </span>
      {tagline && (
        <span className="mt-[0.35em] font-sans text-[0.13em] font-medium tracking-[0.22em] uppercase text-espresso">
          {tagline}
        </span>
      )}
    </div>
  );
}

/** Horizontal nav wordmark. */
export function WordmarkInline({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-flex items-baseline gap-[0.18em] leading-none text-cherry", className)}
      style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
    >
      <span className="font-display font-medium tracking-tight">plans past</span>
      <span className="font-display text-[1.45em] font-semibold italic tracking-[-0.04em]">
        five.
      </span>
    </span>
  );
}

/** Monogram: an italic "5" with a star, inside a scalloped badge. */
export function Monogram({ className, inverted }: { className?: string; inverted?: boolean }) {
  const fg = inverted ? "var(--cream)" : "var(--cherry)";
  const bg = inverted ? "var(--cherry)" : "var(--cream)";
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Plans Past Five monogram">
      <path fill={bg} stroke={fg} strokeWidth="2" d={scallopPath(32, 32, 28, 24, 16)} />
      <text
        x="31"
        y="45"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontStyle="italic"
        fontWeight="600"
        fontSize="38"
        fill={fg}
      >
        5
      </text>
      <path fill={fg} d="M47 14l1.4 3.6 3.6 1.4-3.6 1.4L47 24l-1.4-3.6L42 19l3.6-1.4z" />
    </svg>
  );
}

function scallopPath(cx: number, cy: number, r: number, rIn: number, n: number) {
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    const am = ((i - 0.5) / n) * Math.PI * 2;
    const x = cx + Math.cos(a) * rIn,
      y = cy + Math.sin(a) * rIn;
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
