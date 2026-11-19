import { cn } from "@/lib/utils";

type P = { className?: string };

export const Star = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} aria-hidden fill="currentColor">
    <path d="M12 1.5l2.3 7.2 7.2 2.3-7.2 2.3L12 20.5l-2.3-7.2L2.5 11l7.2-2.3z" />
  </svg>
);

export const Sparkle = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden fill="currentColor">
    <path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z" />
  </svg>
);

export const Bow = ({ className }: P) => (
  <svg viewBox="0 0 48 32" className={cn("h-6 w-9", className)} aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 14c-6-8-18-10-18-2s12 6 18 2zM24 14c6-8 18-10 18-2s-12 6-18 2z" fill="currentColor" fillOpacity=".15" />
    <path d="M22 16l-6 14M26 16l6 14" /><circle cx="24" cy="14.5" r="2.6" fill="currentColor" />
  </svg>
);

export const Flower = ({ className }: P) => (
  <svg viewBox="0 0 32 32" className={cn("h-7 w-7", className)} aria-hidden>
    {[0, 72, 144, 216, 288].map((r) => (
      <ellipse key={r} cx="16" cy="8.5" rx="5" ry="7" fill="currentColor" opacity=".85" transform={`rotate(${r} 16 16)`} />
    ))}
    <circle cx="16" cy="16" r="4" fill="var(--butter)" />
  </svg>
);

export const Arrow = ({ className }: P) => (
  <svg viewBox="0 0 80 40" className={cn("h-8 w-16", className)} aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M4 30c14-18 40-24 66-12" /><path d="M62 10l9 8-11 4" />
  </svg>
);

export const Squiggle = ({ className }: P) => (
  <svg viewBox="0 0 120 12" className={cn("h-3 w-28", className)} aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M2 6c8-6 12 6 20 0s12 6 20 0 12 6 20 0 12 6 20 0 12 6 20 0 12 6 16 0" />
  </svg>
);

/** Magazine-style divider: rule · star · rule */
export const Divider = ({ className, label }: P & { label?: string }) => (
  <div className={cn("flex items-center gap-4 text-cherry", className)} aria-hidden={!label}>
    <span className="h-px flex-1 bg-current opacity-40" />
    {label ? <span className="kicker">{label}</span> : <Star className="h-4 w-4" />}
    <span className="h-px flex-1 bg-current opacity-40" />
  </div>
);
