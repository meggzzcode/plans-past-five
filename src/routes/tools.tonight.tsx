import { createFileRoute, redirect } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

/**
 * Tonight is now the first mode of Make Plans (Stage 3a). 301 to /make-plans?mode=tonight, keeping any
 * answers in the address (saved and shared Tonight links carry t, e, b, c, w, s). See src/config/redirects.ts.
 */
export const Route = createFileRoute("/tools/tonight")({
  validateSearch: (s: Record<string, unknown>) => {
    const o: { t?: string; e?: string; b?: string; c?: string; w?: string; s?: string } = {};
    for (const k of ["t", "e", "b", "c", "w", "s"] as const) {
      const v = s[k];
      if (typeof v === "string" || typeof v === "number") o[k] = String(v);
    }
    return o;
  },
  beforeLoad: ({ search }) => {
    throw redirect({
      to: "/make-plans",
      search: { mode: "tonight", ...search },
      statusCode: 301,
    });
  },
  head: () =>
    seo({
      title: "What Should I Do Tonight? (moved)",
      description: "This page has moved to Make Plans.",
      path: "/tools/tonight",
      noindex: true,
    }),
});
