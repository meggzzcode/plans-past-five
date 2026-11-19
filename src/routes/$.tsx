import { createFileRoute, notFound } from "@tanstack/react-router";
import { site } from "@/config/site";
import { NotFoundComponent } from "@/components/layout/NotFound";

/**
 * Catch-all for addresses that match nothing. It exists only so the 404 page gets its own unique
 * title and a noindex robots tag (the root head cannot tell a missing page from a real one).
 * The response status stays 404.
 */
export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw notFound();
  },
  head: () => ({
    meta: [
      { title: `Page not found | ${site.name}` },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  notFoundComponent: NotFoundComponent,
});
