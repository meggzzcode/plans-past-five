import { Link } from "@tanstack/react-router";
import { shopDisclosureSentences } from "@/config/affiliate";
import { cn } from "@/lib/utils";

/**
 * Honest disclosure beside shopping links. The wording comes from one place (src/config/affiliate.ts)
 * and changes by itself when an affiliate entry goes live. Render it only where links appear.
 * `kind="product"` is for blocks of named products; the default covers mixed pages.
 */
export function AffiliateNote({
  className,
  kind = "general",
}: {
  className?: string;
  kind?: "product" | "general";
}) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)}>
      {shopDisclosureSentences(kind).join(" ")}{" "}
      <Link to="/affiliate-disclosure" className="underline">
        Disclosure
      </Link>
    </p>
  );
}
