import { createFileRoute } from "@tanstack/react-router";
import { getCategory } from "@/data/categories";
import { CategoryPage } from "@/components/pages/CategoryPage";
import { seo } from "@/lib/seo";

const c = getCategory("creative-corner")!;

export const Route = createFileRoute("/creative-corner")({
  head: () => seo({ title: `${c.name}: ${c.short}`, description: c.intro, path: "/creative-corner" }),
  component: () => <CategoryPage c={c} />,
});
