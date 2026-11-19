import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Sparkle } from "@/components/brand/Doodles";

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("kicker flex items-center gap-2 text-cherry", className)}><Sparkle className="h-3 w-3" />{children}</p>;
}

export function SectionHead({ kicker, title, italic, dek, className, align = "left" }: { kicker?: string; title: string; italic?: string; dek?: ReactNode; className?: string; align?: "left" | "center" }) {
  const parts = italic && title.includes(italic) ? title.split(italic) : null;
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center [&_p.kicker]:justify-center", className)}>
      {kicker && <Kicker>{kicker}</Kicker>}
      <h2 className="mt-3 text-4xl leading-[1.02] md:text-5xl">
        {parts ? <>{parts[0]}<em className="text-cherry">{italic}</em>{parts[1]}</> : title}
      </h2>
      {dek && <p className="mt-4 text-lg text-muted-foreground">{dek}</p>}
    </div>
  );
}

export const toneBg = {
  butter: "bg-butter", strawberry: "bg-strawberry", matcha: "bg-matcha", sunday: "bg-sunday", cream: "bg-warm-white",
} as const;

export function PageHero({ kicker, title, italic, dek, tone = "butter", children }: { kicker: string; title: string; italic?: string | undefined; dek: string; tone?: keyof typeof toneBg; children?: ReactNode }) {
  const parts = italic && title.includes(italic) ? title.split(italic) : null;
  return (
    <section className={cn("relative overflow-hidden", toneBg[tone])}>
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-14 md:px-8 md:pb-20 md:pt-20">
        <Kicker>{kicker}</Kicker>
        <h1 className="mt-4 max-w-4xl text-5xl leading-[0.98] md:text-7xl">
          {parts ? <>{parts[0]}<em className="text-cherry">{italic}</em>{parts[1]}</> : title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-espresso md:text-xl">{dek}</p>
        {children}
      </div>
      <div className="gingham-strip opacity-70" />
    </section>
  );
}
