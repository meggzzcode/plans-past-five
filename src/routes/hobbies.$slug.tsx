import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getHobby, hobbies } from "@/data/hobbies";
import { articlesForHobby } from "@/content";
import { productsFor } from "@/data/products";
import { images } from "@/data/images";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { HobbyMeta, ArticleCard, ProductCard, HobbyCard } from "@/components/cards/Cards";
import { SaveButton } from "@/components/editorial/SaveButton";
import { AffiliateNote } from "@/components/editorial/AffiliateNote";
import { Kicker } from "@/components/editorial/Section";
import { Star, Divider } from "@/components/brand/Doodles";

export const Route = createFileRoute("/hobbies/$slug")({
  loader: ({ params }) => {
    const h = getHobby(params.slug);
    if (!h) throw notFound();
    return { slug: h.slug };
  },
  head: ({ loaderData }) => {
    const h = loaderData ? getHobby(loaderData.slug) : undefined;
    if (!h)
      return {
        meta: [{ title: `Hobby not found | ${site.name}` }, { name: "robots", content: "noindex" }],
      };
    // Hobby pages are short profiles; keep them out of the index until expanded into full guides.
    const hasGuide = articlesForHobby(h.slug).length > 0;
    return seo({
      title: `${h.name} for Beginners: How to Start`,
      description: `${h.description} Time, cost, supplies and an easy first session.`,
      path: `/hobbies/${h.slug}`,
      noindex: !hasGuide,
    });
  },
  component: HobbyPage,
});

function HobbyPage() {
  const { slug } = Route.useLoaderData();
  const h = getHobby(slug)!;
  const img = h.image ? images[h.image] : null;
  const reads = articlesForHobby(h.slug);
  const ps = productsFor(h.productIds);
  const similar = hobbies.filter((x) => x.slug !== h.slug && x.category === h.category).slice(0, 3);
  return (
    <>
      <section className="bg-butter">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-8 md:py-16">
          <div>
            <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link to="/hobbies" className="hover:text-cherry">
                Find a Hobby
              </Link>{" "}
              / {h.name}
            </nav>
            <Kicker className="mt-6">{h.category} hobby</Kicker>
            <h1 className="mt-3 text-5xl leading-[1] md:text-7xl">
              <em className="text-cherry">{h.name}</em>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink">{h.description}</p>
            <HobbyMeta h={h} className="mt-6 text-sm" />
            <div className="mt-6">
              <SaveButton
                item={{
                  key: `hobby:${h.slug}`,
                  kind: "hobby",
                  title: h.name,
                  href: `/hobbies/${h.slug}`,
                }}
              />
            </div>
          </div>
          {img ? (
            <div className="postcard rotate-2">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.w}
                  height={img.h}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="paper grid aspect-[4/3] rotate-2 place-items-center p-10 text-center">
              <div>
                <Star className="mx-auto h-8 w-8 text-cherry" />
                <p className="hand mt-3 text-4xl text-cherry">{h.firstActivity.split(".")[0]}.</p>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.3fr_1fr] md:px-8">
        <div className="prose-editorial">
          <h2 className="!mt-0">Why you might love it</h2>
          <p>{h.whyYoullLoveIt}</p>
          <h2>Your first session</h2>
          <p className="font-display text-2xl italic text-cherry">{h.firstActivity}</p>
          <h2>Good to know</h2>
          <ul>
            <li>
              <strong>Where:</strong>{" "}
              {h.settings
                .map((s) => (s === "home" ? "at home" : s === "out" ? "somewhere new" : "outdoors"))
                .join(", ")}
            </li>
            <li>
              <strong>Who with:</strong>{" "}
              {h.company.map((c) => (c === "solo" ? "on your own" : "with others")).join(" or ")}
            </li>
            <li>
              <strong>Beginner-friendliness:</strong>{" "}
              {h.beginner === 1
                ? "start tonight"
                : h.beginner === 2
                  ? "a short tutorial helps"
                  : "a lesson or two helps"}
            </li>
          </ul>
        </div>
        <aside className="h-fit bg-warm-white p-7 shadow-[var(--shadow-paper)]">
          <p className="kicker text-cherry">What you'll need</p>
          <ul className="mt-4 space-y-2">
            {h.supplies.map((s) => (
              <li key={s} className="flex gap-2 text-ink">
                <span className="text-cherry">✶</span>
                {s}
              </li>
            ))}
          </ul>
          {h.optional.length > 0 && (
            <>
              <p className="mt-6 font-display text-lg italic">Nice to have</p>
              <ul className="mt-2 space-y-1.5 text-sm text-espresso">
                {h.optional.map((s) => (
                  <li key={s}>○ {s}</li>
                ))}
              </ul>
            </>
          )}
        </aside>
      </section>
      {ps.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 md:px-8">
          <Divider label="Shop the hobby" />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ps.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
          <AffiliateNote className="mt-6" />
        </section>
      )}
      {reads.length > 0 && (
        <section className="mx-auto mt-20 max-w-6xl px-5 md:px-8">
          <Divider label="Read more" />
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {reads.slice(0, 3).map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </div>
        </section>
      )}
      <section className="mx-auto mt-20 max-w-6xl px-5 md:px-8">
        <p className="hand text-3xl text-cherry">if you like {h.name.toLowerCase()}, try…</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {similar.map((x) => (
            <HobbyCard key={x.slug} h={x} />
          ))}
        </div>
      </section>
    </>
  );
}
