import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getArticle, readingMinutes, relatedArticles, toc } from "@/content";
import { getCategory } from "@/data/categories";
import { images } from "@/data/images";
import { getHobby } from "@/data/hobbies";
import { getPrintable } from "@/data/printables";
import { site } from "@/config/site";
import { seo, absoluteUrl, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { ArticleBody } from "@/components/editorial/ArticleBody";
import { SaveButton } from "@/components/editorial/SaveButton";
import { ShareButtons } from "@/components/editorial/ShareButtons";
import { ArticleCard, HobbyCard } from "@/components/cards/Cards";
import { Divider } from "@/components/brand/Doodles";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const a = getArticle(params.slug);
    if (!a) throw notFound();
    return { slug: a.slug };
  },
  head: ({ loaderData }) => {
    const a = loaderData ? getArticle(loaderData.slug) : undefined;
    if (!a)
      return {
        meta: [{ title: `Story not found | ${site.name}` }, { name: "robots", content: "noindex" }],
      };
    const cat = getCategory(a.category);
    const path = `/journal/${a.slug}`;
    return seo({
      title: a.title,
      description: a.dek,
      path,
      type: "article",
      image: absoluteUrl(images[a.hero].src),
      jsonLd: [
        articleJsonLd({
          title: a.title,
          description: a.dek,
          path,
          image: images[a.hero].src,
          publishedAt: a.publishedAt,
          updatedAt: a.updatedAt,
        }),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "The Journal", path: "/journal" },
          ...(cat ? [{ name: cat.name, path: `/${cat.slug}` }] : []),
          { name: a.title, path },
        ]),
      ],
    });
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useLoaderData();
  const a = getArticle(slug)!;
  const cat = getCategory(a.category)!;
  const img = images[a.hero];
  const sections = toc(a);
  const related = relatedArticles(a);
  const hobbies = a.hobbies
    .map(getHobby)
    .filter((x): x is NonNullable<typeof x> => !!x)
    .slice(0, 3);
  const printable = a.printable ? getPrintable(a.printable) : undefined;
  const parts =
    a.titleItalic && a.title.includes(a.titleItalic) ? a.title.split(a.titleItalic) : null;
  const date = new Date(a.publishedAt + "T12:00:00Z").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  return (
    <article>
      <header className="mx-auto max-w-4xl px-5 pt-10 text-center md:px-8 md:pt-14">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-cherry">
            Home
          </Link>{" "}
          <span className="mx-1.5">/</span>
          <Link to="/journal" className="hover:text-cherry">
            The Journal
          </Link>{" "}
          <span className="mx-1.5">/</span>
          <Link to={`/${cat.slug}`} className="hover:text-cherry">
            {cat.name}
          </Link>
        </nav>
        <p className="kicker mt-6 text-cherry">{cat.name}</p>
        <h1 className="mt-4 text-4xl leading-[1.02] md:text-6xl">
          {parts ? (
            <>
              {parts[0]}
              <em className="text-cherry">{a.titleItalic}</em>
              {parts[1]}
            </>
          ) : (
            a.title
          )}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-espresso md:text-xl">{a.dek}</p>
        <p className="mt-6 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          By {site.editorialByline} · <time dateTime={a.publishedAt}>{date}</time> ·{" "}
          {readingMinutes(a)} min read
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-6">
          <SaveButton
            item={{
              key: `article:${a.slug}`,
              kind: "article",
              title: a.title,
              href: `/journal/${a.slug}`,
            }}
          />
          <ShareButtons title={a.title} path={`/journal/${a.slug}`} image={img.src} />
        </div>
      </header>
      <figure className="mx-auto mt-10 max-w-6xl md:px-8">
        <img
          src={img.src}
          alt={img.alt}
          width={img.w}
          height={img.h}
          className="max-h-[640px] w-full object-cover"
        />
      </figure>
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pt-12 md:px-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          {sections.length > 2 && (
            <nav className="sticky top-28" aria-label="In this story">
              <p className="kicker text-cherry">In this story</p>
              <ol className="mt-4 space-y-2.5 border-l border-border pl-4 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-espresso hover:text-cherry">
                      {s.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </aside>
        <div className="max-w-[680px]">
          {sections.length > 2 && (
            <details className="mb-8 border border-border bg-warm-white p-4 lg:hidden">
              <summary className="kicker cursor-pointer text-cherry">In this story</summary>
              <ol className="mt-3 space-y-2 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>{s.text}</a>
                  </li>
                ))}
              </ol>
            </details>
          )}
          <ArticleBody blocks={a.body} />
          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-border pt-6">
            <SaveButton
              item={{
                key: `article:${a.slug}`,
                kind: "article",
                title: a.title,
                href: `/journal/${a.slug}`,
              }}
            />
            <ShareButtons title={a.title} path={`/journal/${a.slug}`} image={img.src} />
          </div>
        </div>
      </div>
      {printable && (
        <section className="mx-auto mt-16 max-w-4xl px-5 md:px-8">
          <Link
            to="/printables/$slug"
            params={{ slug: printable.slug }}
            className="group flex flex-col items-start gap-4 bg-butter p-8 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="kicker text-cherry">Free printable</p>
              <p className="mt-2 font-display text-3xl italic">{printable.name}</p>
              <p className="mt-1 text-espresso">{printable.dek}</p>
            </div>
            <span className="bg-cherry px-5 py-2.5 text-sm font-semibold text-cream group-hover:bg-ink">
              Print it free
            </span>
          </Link>
        </section>
      )}
      <section className="mx-auto mt-20 max-w-7xl px-5 md:px-8">
        <Divider label="You might also love" />
        {related.length > 0 && (
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {related.map((r) => (
              <ArticleCard key={r.slug} a={r} />
            ))}
          </div>
        )}
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {hobbies.map((h) => (
            <HobbyCard key={h.slug} h={h} />
          ))}
        </div>
      </section>
    </article>
  );
}
