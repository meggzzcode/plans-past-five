import { Link } from "@tanstack/react-router";
import { isMonetized } from "@/config/affiliate";
import { cn } from "@/lib/utils";

/** Honest disclosure beside product links; wording changes once an Associates tag is set. */
export function AffiliateNote({ className }: { className?: string }) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)}>
      {isMonetized()
        ? "As an Amazon Associate we earn from qualifying purchases. It never changes what we recommend. "
        : "Links open an Amazon search so you can compare options. We don't currently earn from these links. "}
      <Link to="/affiliate-disclosure" className="underline">
        Disclosure
      </Link>
    </p>
  );
}
