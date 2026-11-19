import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getHobby, hobbies, isHobbyIndexable } from "@/data/hobbies";
import { articlesForHobby, getArticle } from "@/content";
import { productsFor } from "@/data/products";
import { images } from "@/data/images";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { HobbyMeta, ArticleCard, ProductCard, HobbyCard } from "@/components/cards/Cards";
import { SaveButton } from "@/components/editorial/SaveButton";
import { ShareButtons } from "@/components/editorial/ShareButtons";
import { AffiliateNote } from "@/components/editorial/AffiliateNote";
import { Kicker } from "@/components/editorial/Section";
import { Star, Divider } from "@/components/brand/Doodles";
import { ShopMyHobby } from "@/components/commerce/ShopMyHobby";

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
    return seo({
      title: `${h.name} for Beginners: How to Start`,
      description: `${h.description} Time, cost, supplies and an easy first session.`,
      path: `/hobbies/${h.slug}`,
      noindex: !isHobbyIndexable(h.slug),
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
  const related = (h.relatedHobbies ?? [])
    .map((slug) => getHobby(slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const similar = (
    related.length ? related : hobbies.filter((x) => x.slug !== h.slug && x.category === h.category)
  ).slice(0, 3);
  const guides = [...(h.relatedGuides ?? []).map((g) => getArticle(g)), ...reads].filter(
    (a, i, arr): a is NonNullable<typeof a> =>
      Boolean(a) && arr.findIndex((b) => b?.slug === a?.slug) === i,
  );
  const budget = h.startupBudget;
  const money = (n: number) => `$${n}`;
  const where =
    h.indoorOutdoor === "indoor"
      ? "Indoors"
      : h.indoorOutdoor === "outdoor"
        ? "Outdoors"
        : h.indoorOutdoor === "either"
          ? "Indoors or out"
          : null;
  return (
    <>
      <section className="bg-butter">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-8 md:py-16">
          <div>
            <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link to="/hobbies" className="hover:text-cherry">
                Hobbies
              </Link>{" "}
              / {h.name}
            </nav>
            <Kicker className="mt-6">{h.category} hobby</Kicker>
            <h1 className="mt-3 text-5xl leading-[1] md:text-7xl">
              <em className="text-cherry">{h.name}</em>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink">{h.description}</p>
            <HobbyMeta h={h} className="mt-6 text-sm" />
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-1">
              <SaveButton
                item={{
                  key: `hobby:${h.slug}`,
                  kind: "hobby",
                  title: h.name,
                  href: `/hobbies/${h.slug}`,
                }}
              />
              <ShareButtons
                title={`${h.name} for beginners`}
                path={`/hobbies/${h.slug}`}
                {...(img ? { image: img.src } : {})}
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
      {(h.difficulty || budget || h.timeCommitment || where) && (
        <section className="mx-auto max-w-6xl px-5 pt-12 md:px-8">
          <dl className="grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {h.difficulty && (
              <div className="bg-warm-white p-5">
                <dt className="kicker text-cherry">Difficulty</dt>
                <dd className="mt-1 font-display text-xl">{h.difficulty}</dd>
              </div>
            )}
            {budget && (
              <div className="bg-warm-white p-5">
                <dt className="kicker text-cherry">Rough startup budget</dt>
                <dd className="mt-1 font-display text-xl">
                  {budget.low === budget.high
                    ? money(budget.low)
                    : `${money(budget.low)} to ${money(budget.high)}`}
                </dd>
              </div>
            )}
            {h.timeCommitment && (
              <div className="bg-warm-white p-5">
                <dt className="kicker text-cherry">Time commitment</dt>
                <dd className="mt-1 font-display text-xl">{h.timeCommitment}</dd>
              </div>
            )}
            {where && (
              <div className="bg-warm-white p-5">
                <dt className="kicker text-cherry">Where</dt>
                <dd className="mt-1 font-display text-xl">{where}</dd>
              </div>
            )}
          </dl>
          {budget && (
            <p className="mt-3 text-xs text-muted-foreground">
              Approximate range, not a price. {budget.assumptions} Costs vary by place and what you
              already own.
            </p>
          )}
        </section>
      )}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.3fr_1fr] md:px-8">
        <div className="prose-editorial">
          <h2 className="!mt-0">Why you might love it</h2>
          <p>{h.whyYoullLoveIt}</p>
          {h.startSteps && h.startSteps.length > 0 && (
            <>
              <h2>How to get started</h2>
              <ol>
                {h.startSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </>
          )}
          <h2>Your first session</h2>
          <p className="font-display text-2xl italic text-cherry">{h.firstActivity}</p>
          {h.firstProject && (
            <>
              <h2>A good first project</h2>
              <p>{h.firstProject}</p>
            </>
          )}
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
          {h.learningResources && h.learningResources.length > 0 && (
            <>
              <h2>Where to learn</h2>
              <ul>
                {h.learningResources.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </>
          )}
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
          <Divider label="Shop your hobby" />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ps.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
          <AffiliateNote className="mt-6" />
        </section>
      )}
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <ShopMyHobby hobby={h.slug} />
      </div>
      {guides.length > 0 && (
        <section className="mx-auto mt-20 max-w-6xl px-5 md:px-8">
          <Divider label="Guides that mention it" />
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {guides.slice(0, 3).map((a) => (
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
