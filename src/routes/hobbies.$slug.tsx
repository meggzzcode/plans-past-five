import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  categoryLabels,
  getHobby,
  hobbies,
  hobbyTitleName,
  isHobbyIndexable,
} from "@/data/hobbies";
import { articlesForHobby, getArticle } from "@/content";
import { productsFor } from "@/data/products";
import { selectProducts, verifiedCatalog } from "@/data/catalog";
import { images } from "@/data/images";
import { site } from "@/config/site";
import { seo, absoluteUrl } from "@/lib/seo";
import { pinForHobby } from "@/lib/pins";
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
      title: `How to Start ${hobbyTitleName(h.name)}: What to Buy and Your First Session`,
      description: `${h.description} First session: ${h.timeLabel.toLowerCase()}${
        h.startupBudget
          ? `, startup roughly $${h.startupBudget.low} to $${h.startupBudget.high}`
          : ""
      }.`,
      path: `/hobbies/${h.slug}`,
      ...(h.image ? { image: absoluteUrl(images[h.image].src) } : {}),
      ...(pinForHobby(h.slug) ? { pinImage: pinForHobby(h.slug)! } : {}),
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
  const hasKit = selectProducts({ hobby: h.slug }, verifiedCatalog).all.length > 0;
  const kitHref = hasKit || ps.length > 0 ? "#kit" : "#supplies";
  const budget = h.startupBudget;
  const firstLine = h.firstActivity.split(".")[0] ?? h.firstActivity;
  const showFirstProject =
    h.firstProject && h.firstProject.trim().toLowerCase() !== h.firstActivity.trim().toLowerCase();
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
            <Kicker className="mt-6">{categoryLabels[h.category]}</Kicker>
            <h1 className="mt-3 text-5xl leading-[1] md:text-7xl">
              <em className="text-cherry">{h.name}</em>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink">{h.description}</p>
            <HobbyMeta h={h} className="mt-6 text-sm" />
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={kitHref}
                className="inline-flex min-h-11 items-center bg-cherry px-6 py-3 text-sm font-semibold text-cream no-underline hover:bg-ink"
              >
                See what you need
              </a>
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
            <div className="paper grid rotate-2 place-items-center p-6 text-center md:aspect-[4/3] md:p-10">
              <div>
                <Star className="mx-auto h-8 w-8 text-cherry" />
                <p className="kicker mt-3 text-cherry">Tonight, {h.timeLabel.toLowerCase()}</p>
                <p className="hand mt-2 text-3xl text-cherry md:text-4xl">{firstLine}.</p>
              </div>
            </div>
          )}
        </div>
      </section>
      {(h.difficulty || budget || h.timeCommitment || where) && (
        <section className="mx-auto max-w-6xl px-5 pt-12 md:px-8">
          <dl className="grid grid-cols-2 gap-px bg-ink/15 lg:grid-cols-4">
            {h.difficulty && (
              <div className="bg-warm-white p-4 md:p-5">
                <dt className="kicker text-cherry">Difficulty</dt>
                <dd className="mt-1 font-display text-lg md:text-xl">{h.difficulty}</dd>
              </div>
            )}
            {budget && (
              <div className="bg-warm-white p-4 md:p-5">
                <dt className="kicker text-cherry">Start for about</dt>
                <dd className="mt-1 font-display text-lg md:text-xl">
                  {budget.low === budget.high
                    ? money(budget.low)
                    : `${money(budget.low)} to ${money(budget.high)}`}
                </dd>
              </div>
            )}
            {h.timeCommitment && (
              <div className="bg-warm-white p-4 md:p-5">
                <dt className="kicker text-cherry">Time commitment</dt>
                <dd className="mt-1 font-display text-lg md:text-xl">{h.timeCommitment}</dd>
              </div>
            )}
            {where && (
              <div className="bg-warm-white p-4 md:p-5">
                <dt className="kicker text-cherry">Where</dt>
                <dd className="mt-1 font-display text-lg md:text-xl">{where}</dd>
              </div>
            )}
          </dl>
          {budget && (
            <p className="mt-3 text-xs text-muted-foreground">
              Approximate, not a price. {budget.assumptions} Costs vary by place and what you
              already own.
            </p>
          )}
        </section>
      )}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.3fr_1fr] md:px-8">
        <div className="prose-editorial">
          <h2 className="!mt-0">Your first session</h2>
          <p className="font-display text-2xl italic text-cherry">{h.firstActivity}</p>
          <h2>Why you'll love it</h2>
          <p>{h.whyYoullLoveIt}</p>
          {h.startSteps && h.startSteps.length > 0 && (
            <>
              <h2>Your first week</h2>
              <ol>
                {h.startSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </>
          )}
          {showFirstProject && (
            <>
              <h2>What you'll have made</h2>
              <p>{h.firstProject}</p>
            </>
          )}
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
        <aside
          id="supplies"
          className="h-fit scroll-mt-24 bg-warm-white p-7 shadow-[var(--shadow-paper)]"
        >
          <p className="kicker text-cherry">Your starter kit</p>
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
          {kitHref === "#kit" && (
            <a
              href={kitHref}
              className="mt-6 inline-flex min-h-11 items-center border-b-2 border-cherry text-sm font-semibold text-cherry no-underline"
            >
              Shop the kit ↓
            </a>
          )}
        </aside>
      </section>
      {!hasKit && ps.length > 0 && (
        <section id="kit" className="mx-auto max-w-6xl scroll-mt-24 px-5 md:px-8">
          <Divider label="Your starter kit" />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ps.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
          <AffiliateNote className="mt-6" />
        </section>
      )}
      <div id="kit" className="mx-auto max-w-6xl scroll-mt-24 px-5 md:px-8">
        <ShopMyHobby hobby={h.slug} />
      </div>
      {guides.length > 0 && (
        <section className="mx-auto mt-20 max-w-6xl px-5 md:px-8">
          <Divider label="Read next" />
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
