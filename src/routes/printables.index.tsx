import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { printables } from "@/data/printables";
import { seo } from "@/lib/seo";
import { PageHero, toneBg } from "@/components/editorial/Section";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/printables/")({
  head: () =>
    seo({
      title: "The Out-of-Office Collection: Free Printables",
      description:
        "Six free printable PDFs: a hobby workbook, 30-day challenge, weekend planner, solo date cards, starter checklist and girls' night hosting planner. No email required.",
      path: "/printables",
    }),
  component: Printables,
});

function Printables() {
  return (
    <>
      <PageHero
        kicker="The Out-of-Office Collection"
        title="Free printables for your life outside work."
        italic="outside work."
        dek="Six real PDFs you can download and print. No email, no sign-up, no catch."
        tone="matcha"
      />
      <section className="mx-auto mt-16 grid max-w-7xl gap-10 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-3">
        {printables.map((p, i) => (
          <article key={p.slug} className="group">
            <Link to="/printables/$slug" params={{ slug: p.slug }} className="block">
              <div className={cn("grid aspect-[4/5] place-items-center p-8", toneBg[p.tone])}>
                <img
                  src={p.previews[0]}
                  alt={`Cover of ${p.name}`}
                  loading="lazy"
                  width={816}
                  height={1056}
                  className={cn(
                    "paper w-4/5 transition group-hover:rotate-0",
                    i % 2 ? "rotate-3" : "-rotate-3",
                  )}
                />
              </div>
              <h2 className="mt-5 text-2xl italic group-hover:text-cherry">{p.name}</h2>
            </Link>
            <p className="mt-1 text-espresso">{p.description}</p>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <span>{p.pages} · Free</span>
              <a
                href={p.pdf}
                download
                className="inline-flex items-center gap-1 text-cherry hover:underline"
              >
                <Download className="h-3.5 w-3.5" /> Download PDF
              </a>
            </p>
          </article>
        ))}
      </section>
    </>
  );
}
