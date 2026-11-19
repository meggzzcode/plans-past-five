import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getArticle, readingMinutes, relatedArticles, toc } from "@/content";
import { getCategory } from "@/data/categories";
import { images } from "@/data/images";
import { getHobby } from "@/data/hobbies";
import { site } from "@/config/site";
import { seo, absoluteUrl, articleJsonLd, breadcrumbJsonLd, modifiedAfterPublish } from "@/lib/seo";
import { ArticleBody } from "@/components/editorial/ArticleBody";
import { shortVersion } from "@/components/editorial/article-summary";
import { SaveButton } from "@/components/editorial/SaveButton";
import { ShareButtons } from "@/components/editorial/ShareButtons";
import { ArticleCard, HobbyCard } from "@/components/cards/Cards";
import { Divider } from "@/components/brand/Doodles";
import { Clock, ListChecks, Leaf, Sparkles } from "lucide-react";

const longDate = (iso: string) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

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
          updatedAt: modifiedAfterPublish(a),
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
  const parts =
    a.titleItalic && a.title.includes(a.titleItalic) ? a.title.split(a.titleItalic) : null;
  const date = longDate(a.publishedAt);
  const short = shortVersion(a);
  const hasIfYouLoved = a.body.some((b) => b.type === "ifYouLoved");
  const sources = (a.sources ?? []).filter((s) => /^https?:\/\//.test(s.url));
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
      <figure className="mx-auto mt-6 max-w-6xl md:mt-10 md:px-8">
        <img
          src={img.src}
          alt={img.alt}
          width={img.w}
          height={img.h}
          fetchPriority="high"
          className="aspect-[4/5] w-full object-cover sm:aspect-[16/10] md:max-h-[640px] md:aspect-auto"
        />
      </figure>
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-8 px-5 pt-8 md:px-8 lg:gap-12 lg:pt-12 lg:grid-cols-[220px_minmax(0,1fr)]">
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
        <div className="min-w-0 max-w-[680px]">
          <ShortVersion items={short} />
          {sections.length > 3 && (
            <nav aria-label="Jump to a section" className="mb-8 lg:hidden">
              <p className="kicker mb-2 text-cherry">Jump to</p>
              <ul className="jump-row -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
                {sections.map((s) => (
                  <li key={s.id} className="shrink-0">
                    <a
                      href={`#${s.id}`}
                      className="inline-flex min-h-9 max-w-[16rem] items-center truncate rounded-full border border-border bg-warm-white px-3.5 text-sm text-espresso no-underline hover:border-cherry hover:text-cherry"
                    >
                      <span className="truncate">{s.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <ArticleBody blocks={a.body} />
          {sources.length > 0 && (
            <details className="mt-10 border border-border bg-warm-white p-4 text-sm">
              <summary className="kicker cursor-pointer text-cherry">
                Sources and when we checked
              </summary>
              <ul className="mt-3 space-y-2">
                {sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.title}
                    </a>
                    {s.note ? <span className="text-muted-foreground"> ({s.note})</span> : null}
                  </li>
                ))}
              </ul>
              {a.verifiedAt && (
                <p className="mt-3 text-muted-foreground">
                  Facts last checked: {longDate(a.verifiedAt)}
                </p>
              )}
            </details>
          )}
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
      {(related.length > 0 || (!hasIfYouLoved && hobbies.length > 0)) && (
        <section className="mx-auto mt-16 max-w-6xl px-5 md:px-8" aria-label="You might also love">
          <Divider label="You might also love" />
          {related.length > 0 && (
            <ul className="jump-row -mx-5 mt-8 flex snap-x gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0">
              {related.map((r) => (
                <li key={r.slug} className="w-[62%] shrink-0 snap-start sm:w-[40%] md:w-auto">
                  <ArticleCard a={r} size="sm" />
                </li>
              ))}
            </ul>
          )}
          {/* The article's own "If you loved this" block already shows hobby cards; never show them twice. */}
          {!hasIfYouLoved && hobbies.length > 0 && (
            <div className="photo-cards mt-8 grid grid-cols-3 gap-3 sm:gap-5">
              {hobbies.map((h) => (
                <HobbyCard key={h.slug} h={h} />
              ))}
            </div>
          )}
        </section>
      )}
    </article>
  );
}

/** "The short version": up to three facts taken from the article's own data. Renders nothing when there are fewer than two. */
function ShortVersion({ items }: { items: ReturnType<typeof shortVersion> }) {
  if (items.length < 2) return null;
  const icons: Record<string, React.ReactNode> = {
    read: <Clock aria-hidden className="h-4 w-4" />,
    do: <Sparkles aria-hidden className="h-4 w-4" />,
    need: <ListChecks aria-hidden className="h-4 w-4" />,
    free: <Leaf aria-hidden className="h-4 w-4" />,
  };
  return (
    <section
      aria-label="The short version"
      className="mb-8 border-l-4 border-cherry bg-butter/50 px-5 py-4"
    >
      <h2 className="kicker mb-2 text-cherry">The short version</h2>
      <ul className="space-y-1.5 text-[0.98rem] text-ink">
        {items.map((it) => (
          <li key={it.key} className="flex items-start gap-2.5">
            <span className="mt-[0.2rem] text-cherry">{icons[it.key]}</span>
            <span>
              <strong>{it.label}:</strong>{" "}
              {it.href ? (
                <a href={it.href} className="underline decoration-cherry/50 underline-offset-4">
                  {it.value}
                </a>
              ) : (
                it.value
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
