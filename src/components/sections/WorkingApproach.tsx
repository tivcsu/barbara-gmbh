import { getTranslations } from "next-intl/server";

import { Container } from "@/src/components/layout/Container";
import { Eyebrow } from "@/src/components/ui/Eyebrow";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

export async function WorkingApproach() {
  const t = await getTranslations("AboutPage.approach");

  return (
    <section className="py-20 sm:py-24 lg:py-28" aria-labelledby="approach-heading">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <SectionHeading id="approach-heading" className="mt-5 max-w-[13ch]">
              {t("title")}
            </SectionHeading>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted lg:justify-self-end lg:pb-2">
            {t("intro")}
          </p>
        </div>

        <ol className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-3">
          {["understand", "plan", "deliver"].map((key, index) => (
            <li key={key} className="border-t border-gold pt-6">
              <span className="text-[0.65rem] font-bold tracking-[0.18em] text-gold-dark">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-7 font-display text-2xl font-semibold text-ink">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
                {t(`items.${key}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
