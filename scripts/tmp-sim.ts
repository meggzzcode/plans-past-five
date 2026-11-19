import { readFileSync, readdirSync } from "node:fs";
import { productsFor } from "../src/data/products";
import { selectProducts, verifiedCatalog } from "../src/data/catalog";
import { fillKit, kitHobbies, kits } from "../src/data/kits";
const only = process.argv[2];
for (const f of readdirSync("content/articles")) {
  const a = JSON.parse(readFileSync("content/articles/" + f, "utf8"));
  if (only && a.slug !== only) continue;
  const used = new Set<string>();
  for (const b of a.body) if (b.type === "shopTheArticle") selectProducts({ ...(b.articleSlug ? { article: b.articleSlug } : {}), ...(b.hobbies ? { hobbies: b.hobbies } : {}) }).all.forEach((p) => used.add(p.id));
  a.body.forEach((b: any, i: number) => {
    if (b.type === "shopTheArticle") { console.log(a.slug, i, "ARTICLE-block:", selectProducts({ article: b.articleSlug ?? a.slug }).all.map((p) => p.id).join(",")); return; }
    if (b.type !== "shopHobby" && b.type !== "starterKit") return;
    const claim = (ids: string[]) => { if (!ids.length || ids.some((id) => used.has(id))) return false; ids.forEach((x) => used.add(x)); return true; };
    const tagged = selectProducts({ article: a.slug }).all;
    let out = "TYPE-CARDS(" + b.productIds.join(",") + ")";
    if (tagged.length > 0) { out = claim(tagged.map((p) => p.id)) ? "TAGGED: " + tagged.map((p) => p.id).join(",") : out; }
    else {
      const hobbies = [...new Set(productsFor(b.productIds).map((p) => p.hobbySlugs[0]).filter(Boolean))] as string[];
      let done = false;
      if (b.type === "starterKit") {
        const kit = kits.find((k) => hobbies.some((h) => k.id === h || kitHobbies(k).includes(h)));
        if (kit) { const filled = fillKit(kit, verifiedCatalog); if (filled.length > 0 && filled.length <= 4 && claim(filled.map((x) => x.product.id))) { out = "KIT " + kit.id + ": " + filled.map((x) => x.product.id).join(","); done = true; } }
      }
      if (!done && hobbies.length) { const sel = selectProducts({ hobbies }).all; if (sel.length && sel.length <= 4 && claim(sel.map((p) => p.id))) out = "HOBBY[" + hobbies + "]: " + sel.map((p) => p.id).join(","); else out += " [hobbies=" + hobbies + " sel=" + sel.length + "]"; }
    }
    console.log(a.slug, i, b.type, "|", b.title, "=>", out);
  });
}
