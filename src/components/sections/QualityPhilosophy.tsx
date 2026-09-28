import { getTranslations } from "next-intl/server";

import { Container } from "@/src/components/layout/Container";
import { Eyebrow } from "@/src/components/ui/Eyebrow";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

export async function QualityPhilosophy() {
  const t = await getTranslations("AboutPage.quality");

  return (
    <section className="bg-ink py-20 sm:py-24 lg:py-28" aria-labelledby="quality-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow inverse>{t("eyebrow")}</Eyebrow>
            <SectionHeading id="quality-heading" inverse className="mt-5 max-w-[12ch]">
              {t("title")}
            </SectionHeading>
            <p className="mt-7 max-w-lg text-base leading-7 text-warm-white/60">
              {t("intro")}
            </p>
          </div>

          <div className="divide-y divide-white/15 border-y border-white/15">
            {["planning", "execution", "communication"].map((key, index) => (
              <article key={key} className="grid gap-4 py-7 sm:grid-cols-[3rem_1fr] sm:gap-6">
                <span className="text-xs font-bold tracking-[0.18em] text-gold-light">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-warm-white">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-warm-white/60">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
