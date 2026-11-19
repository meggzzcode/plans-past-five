import { createFileRoute, notFound } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
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
  head: () =>
    seo({
      title: "Page not found",
      description:
        "This page doesn't exist or has moved. Try the hobby quiz, the planner or the shop.",
      path: "/404",
      noindex: true,
    }),
  notFoundComponent: NotFoundComponent,
});
