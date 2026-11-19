import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { getPrintable, bucketList } from "@/data/printables";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { WordmarkInline } from "@/components/brand/Wordmark";
import { Star, Flower, Bow } from "@/components/brand/Doodles";

export const Route = createFileRoute("/printables/$slug")({
  loader: ({ params }) => {
    const p = getPrintable(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getPrintable(loaderData.slug) : undefined;
    if (!p)
      return {
        meta: [
          { title: `Printable not found | ${site.name}` },
          { name: "robots", content: "noindex" },
        ],
      };
    return seo({
      title: `${p.name} (Free Printable)`,
      description: p.description,
      path: `/printables/${p.slug}`,
    });
  },
  component: PrintablePage,
});

function PrintablePage() {
  const { slug } = Route.useLoaderData();
  const p = getPrintable(slug)!;
  return (
    <>
      <section className="no-print mx-auto max-w-4xl px-5 pt-12 text-center md:px-8">
        <nav className="text-xs text-muted-foreground">
          <Link to="/printables" className="hover:text-cherry">
            The Out-of-Office Collection
          </Link>{" "}
          / {p.name}
        </nav>
        <h1 className="mt-5 text-5xl italic md:text-6xl">{p.name}</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-espresso">{p.description}</p>
        <button
          onClick={() => window.print()}
          className="mt-7 inline-flex items-center gap-2 bg-cherry px-7 py-3.5 font-semibold text-cream shadow-[4px_4px_0_var(--ink)] hover:-translate-y-0.5"
        >
          <Printer className="h-5 w-5" /> Print or save as PDF
        </button>
        <p className="mt-3 text-xs text-muted-foreground">
          Tip: in the print dialog choose "Save as PDF" and turn on "Background graphics" for full
          color.
        </p>
      </section>
      <div className="mx-auto my-12 max-w-[8.5in] px-3 print:m-0 print:max-w-none print:px-0">
        <div className="printable-sheet paper relative mx-auto aspect-[8.5/11] w-full overflow-hidden bg-warm-white p-[5%] text-ink print:aspect-auto print:h-[10.4in] print:shadow-none">
          {p.slug === "out-of-office-bucket-list" && <BucketList />}
          {p.slug === "weekend-edit-planner" && <WeekendPlanner />}
          {p.slug === "hobby-era-tracker" && <HobbyTracker />}
          <p className="absolute bottom-[2.5%] left-0 right-0 text-center text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase">
            {site.domain} · {site.slogan} · for personal use
          </p>
        </div>
      </div>
      <style>{`@media print { @page { size: letter; margin: 0.3in; } header, footer, .no-print { display: none !important; } * { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }`}</style>
    </>
  );
}

function SheetHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex items-end justify-between border-b-2 border-cherry pb-2">
      <div>
        <p className="text-[0.6rem] tracking-[0.25em] text-cherry uppercase">{site.signature}</p>
        <p className="font-display text-[clamp(1.2rem,4vw,2.2rem)] italic leading-none text-cherry">
          {title}
        </p>
        <p className="mt-1 text-[clamp(0.55rem,1.4vw,0.75rem)] text-espresso">{sub}</p>
      </div>
      <span className="text-[clamp(0.6rem,1.6vw,0.9rem)]">
        <WordmarkInline />
      </span>
    </div>
  );
}

function BucketList() {
  return (
    <>
      <SheetHead
        title="The Out-of-Office Bucket List"
        sub="Fifty little things to do outside of work. Tick one off a week."
      />
      <div className="mt-[3%] grid grid-cols-2 gap-x-[5%] gap-y-[2.5%]">
        {bucketList.map((s) => (
          <div key={s.section}>
            <p className="flex items-center gap-1 text-[clamp(0.55rem,1.5vw,0.8rem)] font-bold tracking-[0.15em] text-cherry uppercase">
              <Star className="h-2.5 w-2.5" />
              {s.section}
            </p>
            <ul className="mt-1 space-y-[0.15em]">
              {s.items.map((i) => (
                <li
                  key={i}
                  className="flex items-center gap-1.5 text-[clamp(0.5rem,1.4vw,0.78rem)] leading-tight"
                >
                  <span className="inline-block h-[0.8em] w-[0.8em] shrink-0 border border-cherry" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex items-center justify-center">
          <p className="hand text-center text-[clamp(0.9rem,2.6vw,1.6rem)] leading-tight text-cherry">
            being good at it is
            <br />
            completely optional ♡
          </p>
        </div>
      </div>
    </>
  );
}

function Lines({ n }: { n: number }) {
  return (
    <div className="space-y-[0.9em] pt-[0.5em]">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className="h-px bg-border" />
      ))}
    </div>
  );
}
function Box({ label, n, className = "" }: { label: string; n: number; className?: string }) {
  return (
    <div className={`border border-cherry/40 p-[3%] ${className}`}>
      <p className="text-[clamp(0.5rem,1.4vw,0.72rem)] font-bold tracking-[0.15em] text-cherry uppercase">
        {label}
      </p>
      <div className="text-[clamp(0.5rem,1.4vw,0.8rem)]">
        <Lines n={n} />
      </div>
    </div>
  );
}

function WeekendPlanner() {
  return (
    <>
      <SheetHead
        title="The Weekend Edit Planner"
        sub="Let's give Saturday a storyline. (Sunday too.)"
      />
      <p className="mt-[2%] text-[clamp(0.55rem,1.4vw,0.8rem)]">
        Weekend of: ______________________
      </p>
      <div className="mt-[2%] grid grid-cols-2 gap-[2.5%]">
        <Box label="Saturday" n={7} className="bg-butter/40" />
        <Box label="Sunday" n={7} className="bg-strawberry/40" />
        <Box label="People to see" n={3} />
        <Box label="Something creative" n={3} />
        <Box label="Something new" n={3} />
        <Box label="Rest & do-nothing time" n={3} />
        <Box label="Little things I'm looking forward to" n={3} className="col-span-2" />
        <Box label="Things I want to remember" n={3} className="col-span-2 bg-matcha/30" />
      </div>
      <Flower className="absolute right-[5%] top-[14%] h-8 w-8 text-cherry/70" />
    </>
  );
}

function HobbyTracker() {
  return (
    <>
      <SheetHead
        title="My Hobby Era Tracker"
        sub="Try it, rate it, keep what you love. No performance reviews."
      />
      <table className="mt-[3%] w-full border-collapse text-[clamp(0.45rem,1.3vw,0.72rem)]">
        <thead>
          <tr className="bg-cherry text-cream">
            {["Hobby I tried", "Date", "Cost", "How it felt", "Again?"].map((h) => (
              <th
                key={h}
                className="px-[1%] py-[0.6em] text-left font-semibold tracking-wide uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, i) => (
            <tr key={i} className={i % 2 ? "bg-butter/30" : ""}>
              <td className="h-[2.1em] border-b border-border" />
              <td className="border-b border-border" />
              <td className="border-b border-border" />
              <td className="border-b border-border text-cherry">☆ ☆ ☆ ☆ ☆</td>
              <td className="border-b border-border">Y / N</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-[3%] grid grid-cols-2 gap-[2.5%]">
        <Box label="Hobbies I want to try next" n={5} className="bg-strawberry/30" />
        <Box label="Supplies wishlist" n={5} />
        <Box label="My favorite hobby moment so far" n={3} className="col-span-2 bg-matcha/30" />
      </div>
      <Bow className="absolute right-[6%] top-[3%] h-8 w-12 text-cherry/80" />
    </>
  );
}
