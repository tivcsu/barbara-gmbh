import type { StaticImageData } from "next/image";
import Image from "next/image";

import { Container } from "@/src/components/layout/Container";
import { Eyebrow } from "@/src/components/ui/Eyebrow";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: StaticImageData;
  imageAlt: string;
  marker: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  marker,
}: PageHeroProps) {
  return (
    <section className="overflow-hidden bg-white">
      <Container>
        <div className="grid lg:min-h-[40rem] lg:grid-cols-[0.88fr_1.12fr]">
          <div className="flex flex-col justify-center py-16 sm:py-20 lg:py-24 lg:pr-16">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-7 max-w-[12ch] font-display text-[3rem] font-medium leading-[0.98] tracking-[-0.035em] text-ink sm:text-[4rem] lg:text-[4.6rem]">
              {title}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              {description}
            </p>
          </div>

          <div className="relative min-h-[25rem] overflow-hidden bg-warm-gray lg:min-h-full">
            <Image
              src={image}
              alt={imageAlt}
              fill
              preload
              placeholder="blur"
              className="object-cover object-center"
              sizes="(min-width: 1280px) 690px, (min-width: 1024px) 56vw, 100vw"
            />
            <span className="absolute right-0 top-0 bg-ink px-5 py-4 text-[0.65rem] font-bold tracking-[0.2em] text-warm-white">
              {marker}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
