import { it } from "vitest";
import { articles, articleWordCount } from "@/content";
it("wc", () => { console.log(articles.map((a) => a.slug + " " + articleWordCount(a)).join("\n")); });
