import { createFileRoute } from "@tanstack/react-router";
import { getCategory } from "@/data/categories";
import { CategoryPage } from "@/components/pages/CategoryPage";
import { seo } from "@/lib/seo";

const c = getCategory("weekends")!;

export const Route = createFileRoute("/weekends")({
  head: () => seo({ title: `${c.name}: ${c.short}`, description: c.intro, path: "/weekends" }),
  component: () => <CategoryPage c={c} />,
});
