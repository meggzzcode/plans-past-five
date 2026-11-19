import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Download, Printer } from "lucide-react";
import { getPrintable } from "@/data/printables";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { track } from "@/lib/track";

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
      title: `${p.name} (Free Printable PDF)`,
      description: p.description,
      path: `/printables/${p.slug}`,
      image: `${site.url}${p.previews[0]}`,
    });
  },
  component: PrintablePage,
});

function PrintablePage() {
  const { slug } = Route.useLoaderData();
  const p = getPrintable(slug)!;
  return (
    <>
      <section className="mx-auto max-w-4xl px-5 pt-12 text-center md:px-8">
        <nav className="text-xs text-muted-foreground">
          <Link to="/printables" className="hover:text-cherry">
            The Out-of-Office Collection
          </Link>{" "}
          / {p.name}
        </nav>
        <h1 className="mt-5 text-5xl italic md:text-6xl">{p.name}</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-espresso">{p.description}</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <a
            href={p.pdf}
            download
            onClick={() => track("printable_download", { printable_id: p.slug })}
            className="inline-flex items-center gap-2 bg-cherry px-7 py-3.5 font-semibold text-cream shadow-[4px_4px_0_var(--ink)] hover:-translate-y-0.5"
          >
            <Download className="h-5 w-5" /> Download PDF
          </a>
          <a
            href={p.pdf}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 border-2 border-cherry px-6 py-3 font-semibold text-cherry hover:bg-strawberry/40"
          >
            <Printer className="h-5 w-5" /> Open print view
          </a>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {p.pages} · free · no email needed. Print at 100% on US Letter and turn on
          &ldquo;Background graphics&rdquo; for full color.
        </p>
      </section>

      <section className="mx-auto mt-12 grid max-w-5xl gap-10 px-5 md:grid-cols-[1.3fr_1fr] md:px-8">
        <div className="grid grid-cols-3 gap-3">
          {p.previews.map((src, i) => (
            <a
              key={src}
              href={p.pdf}
              target="_blank"
              rel="noopener"
              className={
                i === 0 ? "col-span-3" : "col-span-3 sm:col-span-1 md:col-span-3 lg:col-span-1"
              }
            >
              <img
                src={src}
                alt={i === 0 ? `Cover of ${p.name}` : `${p.name}, preview page ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                width={816}
                height={1056}
                className="paper mx-auto w-full max-w-md"
              />
            </a>
          ))}
        </div>
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl italic">What's inside</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-espresso">
              {p.includes.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl italic">How to use it</h2>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-espresso">
              {p.howToUse.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ol>
          </div>
          <p className="text-xs text-muted-foreground">
            For personal use. {site.domain} · {site.slogan}
          </p>
        </div>
      </section>
    </>
  );
}
