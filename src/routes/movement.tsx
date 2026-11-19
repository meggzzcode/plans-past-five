import { createFileRoute } from "@tanstack/react-router";
import { getCategory } from "@/data/categories";
import { CategoryPage } from "@/components/pages/CategoryPage";
import { seo } from "@/lib/seo";

const c = getCategory("movement")!;

export const Route = createFileRoute("/movement")({
  head: () => seo({ title: `${c.name}: ${c.short}`, description: c.intro, path: "/movement" }),
  component: () => <CategoryPage c={c} />,
});
