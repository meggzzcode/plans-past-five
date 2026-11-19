import { products } from "../src/data/products";
for (const p of products as any[])
  console.log(p.id, "|", p.name, "|", p.hobbySlugs.join(","), "|", p.collection);
