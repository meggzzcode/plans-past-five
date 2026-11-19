import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/config/site";
import { articles, articlesForHobby } from "@/content";
import { categories } from "@/data/categories";
import { collections } from "@/data/products";
import { printables } from "@/data/printables";
import { hobbies } from "@/data/hobbies";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const paths = [
          "/", "/start-here", "/hobbies", "/journal", "/shop", "/hobby-finder", "/make-plans", "/printables", "/about", "/contact",
          "/privacy", "/terms", "/affiliate-disclosure", "/editorial-policy",
          ...categories.map((c) => `/${c.slug}`),
          ...articles.map((a) => `/journal/${a.slug}`), // published only
          ...collections.map((c) => `/shop/${c.slug}`),
          ...printables.map((p) => `/printables/${p.slug}`),
          ...hobbies.filter((h) => articlesForHobby(h.slug).length > 0).map((h) => `/hobbies/${h.slug}`), // indexable hobby pages only
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `  <url><loc>${site.url}${p}</loc></url>`).join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
