import { Gem, Handshake, RefreshCw, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/src/components/layout/Container";
import { Eyebrow } from "@/src/components/ui/Eyebrow";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

const values = [
  ["reliability", ShieldCheck],
  ["quality", Gem],
  ["personal", Handshake],
  ["flexibility", RefreshCw],
] as const;

export async function Values() {
  const t = await getTranslations("AboutPage.values");

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="values-heading">
      <Container>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <SectionHeading id="values-heading" className="mt-5 max-w-[15ch]">
          {t("title")}
        </SectionHeading>

        <div className="mt-12 grid border-l border-t border-border sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {values.map(([key, Icon]) => (
            <article key={key} className="min-h-64 border-b border-r border-border p-7">
              <Icon aria-hidden="true" className="h-7 w-7 text-gold-dark" strokeWidth={1.5} />
              <h3 className="mt-12 font-display text-2xl font-semibold text-ink">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {t(`items.${key}.description`)}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
