import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Container } from "@/src/components/layout/Container";
import { Eyebrow } from "@/src/components/ui/Eyebrow";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { homeImages } from "@/src/content/home";
import { Link } from "@/src/i18n/navigation";

export async function AboutTeaser() {
  const t = await getTranslations("Home.about");

  return (
    <section className="py-20 sm:py-24 lg:py-32" aria-labelledby="about-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-20">
          <div className="relative min-h-[28rem] overflow-hidden bg-warm-gray sm:min-h-[36rem] lg:min-h-[42rem]">
            <Image
              src={homeImages.about}
              alt={t("imageAlt")}
              fill
              placeholder="blur"
              className="object-cover object-center"
              sizes="(min-width: 1280px) 650px, (min-width: 1024px) 52vw, 100vw"
            />
            <div aria-hidden="true" className="absolute bottom-0 left-0 h-24 w-px bg-gold-light sm:h-36" />
          </div>

          <div>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <SectionHeading id="about-heading" className="mt-5 max-w-[12ch]">
              {t("title")}
            </SectionHeading>
            <div className="mt-7 max-w-lg space-y-5 text-base leading-7 text-muted">
              <p>{t("paragraphOne")}</p>
              <p>{t("paragraphTwo")}</p>
            </div>
            <Link href="/about" className="editorial-link mt-8">
              {t("cta")}
              <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
