import { Link } from "@tanstack/react-router";
import { isMonetized, liveDisclosureSentences } from "@/config/affiliate";
import { cn } from "@/lib/utils";

/** Honest disclosure beside product links; wording changes once an affiliate entry is live. */
export function AffiliateNote({ className }: { className?: string }) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)}>
      {isMonetized()
        ? `${liveDisclosureSentences().join(" ")} It never changes what we recommend. `
        : "Links open an Amazon search so you can compare options. We don't currently earn from these links. "}
      <Link to="/affiliate-disclosure" className="underline">
        Disclosure
      </Link>
    </p>
  );
}
