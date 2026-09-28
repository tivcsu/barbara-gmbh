import { BadgeCheck, Clock3, ShieldCheck, UsersRound } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { BenefitCard } from "@/src/components/cards/BenefitCard";
import { Container } from "@/src/components/layout/Container";
import { Eyebrow } from "@/src/components/ui/Eyebrow";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

const benefits = [
  ["quality", BadgeCheck],
  ["team", UsersRound],
  ["flexibility", Clock3],
  ["reliability", ShieldCheck],
] as const;

export async function Benefits() {
  const t = await getTranslations("Home.benefits");

  return (
    <section className="bg-ink py-20 sm:py-24 lg:py-28" aria-labelledby="benefits-heading">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Eyebrow inverse>{t("eyebrow")}</Eyebrow>
            <SectionHeading id="benefits-heading" inverse className="mt-5 max-w-[11ch]">
              {t("title")}
            </SectionHeading>
          </div>
          <p className="max-w-xl text-base leading-7 text-warm-white/60 lg:justify-self-end lg:pb-2">
            {t("intro")}
          </p>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {benefits.map(([key, Icon]) => (
            <BenefitCard
              key={key}
              icon={Icon}
              title={t(`items.${key}.title`)}
              description={t(`items.${key}.description`)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
