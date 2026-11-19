import { createFileRoute } from "@tanstack/react-router";
import { getCategory } from "@/data/categories";
import { CategoryPage } from "@/components/pages/CategoryPage";
import { seo } from "@/lib/seo";

const c = getCategory("solo-dates")!;

export const Route = createFileRoute("/solo-dates")({
  head: () => seo({ title: `${c.name}: ${c.short}`, description: c.intro, path: "/solo-dates" }),
  component: () => <CategoryPage c={c} />,
});
