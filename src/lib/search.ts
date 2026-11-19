import { articles } from "@/content";
import { hobbies } from "@/data/hobbies";
import { products, collections } from "@/data/products";
import { categories } from "@/data/categories";
import { printables } from "@/data/printables";

export type SearchHit = { kind: string; title: string; text: string; to: string };

function index(): (SearchHit & { hay: string })[] {
  return [
    ...articles.map((a) => ({
      kind: "Journal",
      title: a.title,
      text: a.dek,
      to: `/journal/${a.slug}`,
      hay: `${a.title} ${a.dek} ${a.hobbies.join(" ")}`,
    })),
    ...hobbies.map((h) => ({
      kind: "Hobby",
      title: h.name,
      text: h.description,
      to: `/hobbies/${h.slug}`,
      hay: `${h.name} ${h.description} ${h.tags.join(" ")} ${h.category}`,
    })),
    ...collections.map((c) => ({
      kind: "Off Duty Essentials",
      title: c.name,
      text: c.dek,
      to: `/shop/${c.slug}`,
      hay: `${c.name} ${c.dek} ${c.intro}`,
    })),
    ...products.map((p) => ({
      kind: "Shop pick",
      title: p.name,
      text: p.blurb,
      to: `/shop/${p.collection}`,
      hay: `${p.name} ${p.blurb} ${p.hobbySlugs.join(" ")}`,
    })),
    ...categories.map((c) => ({
      kind: "Section",
      title: c.name,
      text: c.intro,
      to: `/${c.slug}`,
      hay: `${c.name} ${c.short} ${c.intro}`,
    })),
    ...printables.map((p) => ({
      kind: "Printable",
      title: p.name,
      text: p.dek,
      to: `/printables/${p.slug}`,
      hay: `${p.name} ${p.description}`,
    })),
  ];
}

export function search(q: string, limit = 30): SearchHit[] {
  const terms = q
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 1);
  if (!terms.length) return [];
  return index()
    .map((e) => {
      const hay = e.hay.toLowerCase();
      const title = e.title.toLowerCase();
      let s = 0;
      for (const t of terms) {
        if (title.includes(t)) s += 3;
        else if (hay.includes(t)) s += 1;
        else return null;
      }
      return { e, s };
    })
    .filter((x): x is { e: ReturnType<typeof index>[number]; s: number } => !!x)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ e }) => ({ kind: e.kind, title: e.title, text: e.text, to: e.to }));
}
