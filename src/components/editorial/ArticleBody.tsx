import { Link } from "@tanstack/react-router";
import type { Block } from "@/content";
import { getHobby } from "@/data/hobbies";
import { productsFor } from "@/data/products";
import { selectProducts, verifiedCatalog } from "@/data/catalog";
import { fillKit, kits } from "@/data/kits";
import { ShopTheArticle } from "@/components/commerce/ShopTheArticle";
import { ShopMyHobby } from "@/components/commerce/ShopMyHobby";
import { StarterKit } from "@/components/commerce/StarterKit";
import { images } from "@/data/images";
import { Inline } from "./Inline";
import { ProductCard, HobbyCard } from "@/components/cards/Cards";
import { Star, Bow, Flower, Arrow } from "@/components/brand/Doodles";
import { Clock, Wallet, Users } from "lucide-react";
import { SaveButton } from "./SaveButton";
import { AffiliateNote } from "./AffiliateNote";

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-editorial">
      {blocks.map((b, i) => (
        <BlockView key={i} b={b} />
      ))}
    </div>
  );
}

function Box({
  tone,
  label,
  icon,
  children,
}: {
  tone: string;
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <aside className={`not-prose relative my-10 ${tone} px-6 py-6 md:px-8`}>
      <p className="kicker mb-3 flex items-center gap-2 text-cherry">
        {icon}
        {label}
      </p>
      <div className="text-[1rem] leading-relaxed text-ink">{children}</div>
    </aside>
  );
}

/**
 * Legacy `starterKit` / `shopHobby` blocks list product TYPES by id. When verified catalog products exist
 * for the same hobbies, show those instead (through the new components); otherwise return null so the
 * original product-type cards render exactly as before.
 */
function verifiedFor(b: Extract<Block, { type: "starterKit" | "shopHobby" }>): React.ReactNode {
  if (verifiedCatalog.length === 0) return null;
  const hobbies = [
    ...new Set(
      productsFor(b.productIds)
        .map((p) => p.hobbySlugs[0])
        .filter((x): x is string => !!x),
    ),
  ];
  if (b.type === "starterKit") {
    const kit = kits.find((k) => hobbies.some((h) => k.id === h || k.hobby === h));
    if (kit && fillKit(kit, verifiedCatalog).length > 0)
      return <StarterKit kit={kit} {...(b.title ? { title: b.title } : {})} />;
  }
  if (selectProducts({ hobbies }).all.length === 0) return null;
  const common = {
    ...(b.title ? { title: b.title } : {}),
    ...(b.type === "shopHobby" && b.dek ? { dek: b.dek } : {}),
  };
  return hobbies.length === 1 ? (
    <ShopMyHobby hobby={hobbies[0]!} {...common} />
  ) : (
    <ShopTheArticle hobbies={hobbies} {...common} />
  );
}

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "p":
      return (
        <p>
          <Inline text={b.text} />
        </p>
      );
    case "h2":
      return (
        <h2 id={b.id} className="scroll-mt-28">
          {b.text}
        </h2>
      );
    case "h3":
      return <h3>{b.text}</h3>;
    case "list":
      return (
        <ul>
          {b.items.map((t, i) => (
            <li key={i}>
              <Inline text={t} />
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-12 border-y-2 border-cherry py-8 text-center font-display text-3xl italic leading-tight text-cherry md:text-4xl">
          <Star className="mx-auto mb-3 h-5 w-5" />“{b.text}”
        </blockquote>
      );
    case "image": {
      const img = images[b.image];
      return (
        <figure className="my-10 -mx-5 md:mx-0">
          <img
            src={img.src}
            alt={img.alt}
            width={img.w}
            height={img.h}
            loading="lazy"
            className="w-full"
          />
          {b.caption && (
            <figcaption className="hand mt-2 px-5 text-xl text-cherry md:px-0">
              {b.caption}
            </figcaption>
          )}
        </figure>
      );
    }
    case "item": {
      const h = b.hobby ? getHobby(b.hobby) : undefined;
      const time = b.time ?? h?.timeLabel;
      const cost = b.cost ?? h?.costLabel;
      const company =
        b.company ??
        (h
          ? h.company.length > 1
            ? "Solo or social"
            : h.company[0] === "solo"
              ? "Solo"
              : "Social"
          : undefined);
      const first = b.first ?? h?.firstActivity;
      return (
        <section className="my-9 border-t border-border pt-6">
          <h3 className="!mt-0 flex items-baseline gap-3">
            {b.n !== undefined && (
              <span className="font-display text-4xl italic text-cherry">{b.n}.</span>
            )}
            <span>{b.title}</span>
          </h3>
          <p>
            <Inline text={b.note} />
          </p>
          {(time || cost || company) && (
            <ul className="!mb-3 flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium [&>li]:!pl-0 [&>li]:before:!hidden">
              {time && (
                <li className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-cherry" />
                  {time}
                </li>
              )}
              {cost && (
                <li className="flex items-center gap-1.5">
                  <Wallet className="h-4 w-4 text-cherry" />
                  {cost}
                </li>
              )}
              {company && (
                <li className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-cherry" />
                  {company}
                </li>
              )}
            </ul>
          )}
          {h && (
            <p className="!mb-2 text-[0.95rem]">
              <strong>You'll need:</strong> {h.supplies.join(", ")}.
            </p>
          )}
          {first && (
            <p className="!mb-2 text-[0.95rem]">
              <span className="hand text-xl text-cherry">first try → </span>
              {first}
            </p>
          )}
          {h && (
            <div className="flex flex-wrap items-center gap-5 text-sm">
              <Link to="/hobbies/$slug" params={{ slug: h.slug }} className="font-semibold">
                Read the {h.name.toLowerCase()} guide
              </Link>
              <SaveButton
                item={{
                  key: `hobby:${h.slug}`,
                  kind: "hobby",
                  title: h.name,
                  href: `/hobbies/${h.slug}`,
                }}
              />
            </div>
          )}
        </section>
      );
    }
    case "whatYoullNeed":
      return (
        <Box tone="bg-butter" label="What you'll need" icon={<Star className="h-3 w-3" />}>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-2 font-display text-xl">The essentials</p>
              <ul className="space-y-1.5">
                {b.essentials.map((e) => (
                  <li key={e} className="flex gap-2">
                    <span className="text-cherry">✶</span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            {b.optional && (
              <div>
                <p className="mb-2 font-display text-xl italic">Nice to have</p>
                <ul className="space-y-1.5">
                  {b.optional.map((e) => (
                    <li key={e} className="flex gap-2">
                      <span className="text-cherry">○</span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Box>
      );
    case "starterKit":
    case "shopHobby": {
      const verified = verifiedFor(b);
      if (verified) return <>{verified}</>;
      const ps = productsFor(b.productIds);
      return (
        <aside className="not-prose my-12 border-y-2 border-ink py-8">
          <p className="kicker text-cherry">Off Duty Essentials</p>
          <h3 className="mt-2 font-display text-3xl italic">
            {b.title ?? (b.type === "starterKit" ? "The Starter Kit" : "Shop the hobby")}
          </h3>
          {"dek" in b && b.dek && <p className="mt-2 text-muted-foreground">{b.dek}</p>}
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            {ps.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
          <AffiliateNote className="mt-6" />
        </aside>
      );
    }
    case "shopTheArticle":
      return (
        <ShopTheArticle
          {...(b.articleSlug ? { article: b.articleSlug } : {})}
          {...(b.hobbies ? { hobbies: b.hobbies } : {})}
          {...(b.collection ? { collection: b.collection } : {})}
          {...(b.title ? { title: b.title } : {})}
          {...(b.dek ? { dek: b.dek } : {})}
        />
      );
    case "shopMyHobby":
      return (
        <ShopMyHobby
          hobby={b.hobby}
          {...(b.title ? { title: b.title } : {})}
          {...(b.dek ? { dek: b.dek } : {})}
        />
      );
    case "saveSplurge":
      return (
        <aside className="not-prose my-10 grid md:grid-cols-2">
          <div className="bg-matcha/60 p-6">
            <p className="kicker text-garden">Save</p>
            <p className="mt-2 text-ink">{b.save}</p>
          </div>
          <div className="bg-strawberry p-6">
            <p className="kicker text-cherry">Splurge</p>
            <p className="mt-2 text-ink">{b.splurge}</p>
          </div>
        </aside>
      );
    case "tryThisWeekend":
      return (
        <Box
          tone="bg-sunday/70"
          label="Try it this weekend"
          icon={<Flower className="h-4 w-4 text-cherry" />}
        >
          <p>{b.text}</p>
        </Box>
      );
    case "girlsNight":
      return (
        <Box tone="bg-strawberry" label="Make it a girls' night" icon={<Bow className="h-4 w-6" />}>
          <p>{b.text}</p>
        </Box>
      );
    case "noSpend":
      return (
        <Box tone="bg-warm-white border border-dashed border-garden" label="No-spend alternative">
          <p>{b.text}</p>
        </Box>
      );
    case "first30":
      return (
        <Box tone="paper" label="Your first 30 minutes">
          <ol className="space-y-3">
            {b.steps.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-display text-2xl italic leading-none text-cherry">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </Box>
      );
    case "makePlan":
      return (
        <aside className="not-prose my-12 bg-cherry px-6 py-8 text-cream md:px-10">
          <p className="kicker text-butter">Make it a plan</p>
          <p className="mt-3 font-display text-2xl leading-snug md:text-3xl">{b.text}</p>
          <div className="mt-5 flex flex-wrap gap-4">
            <Link
              to="/hobby-finder"
              className="bg-cream px-5 py-2.5 text-sm font-semibold text-cherry hover:bg-butter"
            >
              Find Your Thing
            </Link>
            <Link
              to="/make-plans"
              className="border-2 border-cream px-5 py-2 text-sm font-semibold text-cream hover:bg-cream hover:text-cherry"
            >
              Let's Make Plans
            </Link>
          </div>
        </aside>
      );
    case "ifYouLoved": {
      const hs = b.hobbies.map(getHobby).filter((x): x is NonNullable<typeof x> => !!x);
      return (
        <aside className="not-prose my-14">
          <p className="hand flex items-center gap-2 text-3xl text-cherry">
            If you loved this, try… <Arrow className="h-6 w-12" />
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {hs.map((h) => (
              <HobbyCard key={h.slug} h={h} />
            ))}
          </div>
        </aside>
      );
    }
  }
}
