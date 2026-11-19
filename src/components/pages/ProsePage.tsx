import type { ReactNode } from "react";
import { PageHero, toneBg } from "@/components/editorial/Section";

export function ProsePage({ kicker, title, italic, dek, tone = "butter", children }: { kicker: string; title: string; italic?: string | undefined; dek: string; tone?: keyof typeof toneBg; children: ReactNode }) {
  return (
    <>
      <PageHero kicker={kicker} title={title} italic={italic} dek={dek} tone={tone} />
      <div className="prose-editorial mx-auto max-w-[680px] px-5 py-14 md:px-8">{children}</div>
    </>
  );
}
