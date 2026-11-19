import { createFileRoute, Link } from "@tanstack/react-router";
import { printables } from "@/data/printables";
import { seo } from "@/lib/seo";
import { PageHero, toneBg } from "@/components/editorial/Section";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/printables/")({
  head: () => seo({ title: "The Out-of-Office Collection: Free Printables", description: "Free printable bucket list, weekend planner and hobby tracker for your life outside work. No email required.", path: "/printables" }),
  component: Printables,
});

function Printables() {
  return (
    <>
      <PageHero kicker="The Out-of-Office Collection" title="Free printables for your life outside work." italic="outside work." dek="Open one, hit print (or save as PDF), and stick it somewhere you'll see it. No email required." tone="matcha" />
      <section className="mx-auto mt-16 grid max-w-7xl gap-10 px-5 md:grid-cols-3 md:px-8">
        {printables.map((p, i) => (
          <Link key={p.slug} to="/printables/$slug" params={{ slug: p.slug }} className="group block">
            <div className={cn("grid aspect-[4/5] place-items-center p-8", toneBg[p.tone])}>
              <div className={cn("paper aspect-[8.5/11] w-4/5 p-5 transition group-hover:rotate-0", i % 2 ? "rotate-3" : "-rotate-3")}>
                <p className="kicker text-[0.55rem] text-cherry">plans past five</p>
                <p className="mt-2 font-display text-xl italic leading-tight text-cherry">{p.name}</p>
                <div className="mt-4 space-y-2">{Array.from({ length: 7 }).map((_, j) => <div key={j} className="h-px bg-border" />)}</div>
              </div>
            </div>
            <h2 className="mt-5 text-2xl italic group-hover:text-cherry">{p.name}</h2>
            <p className="mt-1 text-espresso">{p.description}</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{p.pages} · Free</p>
          </Link>
        ))}
      </section>
    </>
  );
}
