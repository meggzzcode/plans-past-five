import { createFileRoute } from "@tanstack/react-router";
import { getCategory } from "@/data/categories";
import { CategoryPage } from "@/components/pages/CategoryPage";
import { seo } from "@/lib/seo";

const c = getCategory("after-hours")!;

export const Route = createFileRoute("/after-hours")({
  head: () => seo({ title: c.metaTitle, description: c.metaDescription, path: "/after-hours" }),
  component: () => <CategoryPage c={c} />,
});
