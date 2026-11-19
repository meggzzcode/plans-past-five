import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, Wallet, Zap } from "lucide-react";
import type { Article } from "@/content";
import { readingMinutes } from "@/content";
import { getCategory } from "@/data/categories";
import { images } from "@/data/images";
import type { Hobby } from "@/data/hobbies";
import type { Product, Collection } from "@/data/products";
import { productHref, isMonetized } from "@/config/affiliate";
import { SaveButton } from "@/components/editorial/SaveButton";
import { cn } from "@/lib/utils";
import { toneBg } from "@/components/editorial/Section";

export function ArticleCard({ a, size = "md", className }: { a: Article; size?: "sm" | "md" | "lg"; className?: string }) {
  const img = images[a.hero];
  const cat = getCategory(a.category);
  return (
    <article className={cn("group relative", className)}>
      <Link to="/journal/$slug" params={{ slug: a.slug }} className="block">
        <div className={cn("relative overflow-hidden bg-muted", size === "lg" ? "aspect-[4/3]" : size === "sm" ? "aspect-square" : "aspect-[4/5]")}>
          <img src={img.src} alt={img.alt} width={img.w} height={img.h} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
        </div>
        <p className="kicker mt-4 text-cherry">{cat?.name}</p>
        <h3 className={cn("mt-2 leading-[1.08] text-ink decoration-cherry decoration-2 underline-offset-4 group-hover:underline", size === "lg" ? "text-3xl md:text-4xl" : size === "sm" ? "text-lg" : "text-2xl")}>{a.title}</h3>
        {size !== "sm" && <p className="mt-2 line-clamp-2 text-muted-foreground">{a.dek}</p>}
        <p className="mt-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">{readingMinutes(a)} min read</p>
      </Link>
      <div className="absolute right-3 top-3"><SaveButton compact item={{ key: `article:${a.slug}`, kind: "article", title: a.title, href: `/journal/${a.slug}` }} /></div>
    </article>
  );
}

export function HobbyMeta({ h, className }: { h: Hobby; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-espresso", className)}>
      <li className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-cherry" />{h.timeLabel}</li>
      <li className="flex items-center gap-1"><Wallet className="h-3.5 w-3.5 text-cherry" />{h.costLabel}</li>
      <li className="flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-cherry" />{h.energy} energy</li>
    </ul>
  );
}

const hobbyTone: Record<Hobby["category"], keyof typeof toneBg> = {
  creative: "butter", cozy: "strawberry", social: "strawberry", active: "matcha", outdoors: "matcha", bookish: "sunday",
};

export function HobbyCard({ h, className }: { h: Hobby; className?: string }) {
  const img = h.image ? images[h.image] : null;
  return (
    <article className={cn("group relative flex flex-col border border-border bg-warm-white transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-paper)]", className)}>
      <Link to="/hobbies/$slug" params={{ slug: h.slug }} className="flex flex-1 flex-col">
        {img ? (
          <div className="aspect-[5/3] overflow-hidden"><img src={img.src} alt={img.alt} width={img.w} height={img.h} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>
        ) : (
          <div className={cn("relative grid aspect-[5/3] place-items-center", toneBg[hobbyTone[h.category]])}>
            <span className="font-display text-5xl italic text-cherry/90">{h.name.split(" ")[0]}</span>
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <p className="kicker text-cherry">{h.category}</p>
          <h3 className="mt-1.5 text-2xl leading-tight">{h.name}</h3>
          <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">{h.description}</p>
          <HobbyMeta h={h} className="mt-4" />
        </div>
      </Link>
      <div className="absolute right-3 top-3"><SaveButton compact item={{ key: `hobby:${h.slug}`, kind: "hobby", title: h.name, href: `/hobbies/${h.slug}` }} /></div>
    </article>
  );
}

/** Editorial product recommendation. Button text reflects the real destination. */
export function ProductCard({ p, index, className }: { p: Product; index?: number; className?: string }) {
  const href = productHref(p);
  return (
    <article className={cn("flex flex-col border-t-2 border-ink pt-4", className)}>
      <div className="flex items-baseline justify-between gap-3">
        {index !== undefined && <span className="font-display text-3xl italic text-cherry">{String(index + 1).padStart(2, "0")}</span>}
        <SaveButton compact className="!h-8 !w-8 !shadow-none !bg-transparent" item={{ key: `product:${p.id}`, kind: "product", title: p.name, href: `/shop/${p.collection}` }} />
      </div>
      <h3 className="mt-1 text-xl leading-tight">{p.name}</h3>
      <p className="mt-2 text-sm text-espresso">{p.blurb}</p>
      <p className="mt-3 text-sm"><span className="hand text-lg text-cherry">look for → </span><span className="text-muted-foreground">{p.lookFor}</span></p>
      {p.noSpend && <p className="mt-2 text-sm text-garden"><strong>No-spend swap:</strong> {p.noSpend}</p>}
      <a href={href} target="_blank" rel={isMonetized() ? "sponsored noopener" : "noopener"} className="mt-4 inline-flex w-fit items-center gap-1.5 border-b-2 border-cherry pb-0.5 text-sm font-semibold text-cherry hover:border-transparent">
        {p.exactUrl ? "View on Amazon" : "Browse options on Amazon"} <ArrowUpRight className="h-4 w-4" />
      </a>
    </article>
  );
}

export function CollectionCard({ c, className }: { c: Collection; className?: string }) {
  const img = images[c.image];
  return (
    <Link to="/shop/$category" params={{ category: c.slug }} className={cn("group block", className)}>
      <div className={cn("p-3 pb-0", toneBg[c.tone])}>
        <div className="aspect-square overflow-hidden"><img src={img.src} alt={img.alt} width={img.w} height={img.h} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>
        <div className="px-1 py-4">
          <h3 className="text-2xl italic leading-tight group-hover:text-cherry">{c.name}</h3>
          <p className="mt-1 text-sm text-espresso">{c.dek}</p>
        </div>
      </div>
    </Link>
  );
}
