import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Container } from "@/src/components/layout/Container";
import { Eyebrow } from "@/src/components/ui/Eyebrow";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { pageImages } from "@/src/content/pages";

export async function CompanyIntroduction() {
  const t = await getTranslations("AboutPage.introduction");

  return (
    <section className="py-20 sm:py-24 lg:py-32" aria-labelledby="company-introduction-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-20">
          <div>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <SectionHeading id="company-introduction-heading" className="mt-5 max-w-[13ch]">
              {t("title")}
            </SectionHeading>
            <div className="mt-7 max-w-xl space-y-5 text-base leading-7 text-muted">
              <p>{t("paragraphOne")}</p>
              <p>{t("paragraphTwo")}</p>
            </div>
          </div>

          <div className="relative min-h-[28rem] overflow-hidden bg-warm-gray sm:min-h-[36rem]">
            <Image
              src={pageImages.aboutIntroduction}
              alt={t("imageAlt")}
              fill
              placeholder="blur"
              className="object-cover object-center"
              sizes="(min-width: 1280px) 650px, (min-width: 1024px) 54vw, 100vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
