import { ArrowRight } from "lucide-react";
import Image from "next/image";

import type { HomeService } from "@/src/content/home";
import { Link } from "@/src/i18n/navigation";

type ServiceCardProps = {
  service: HomeService;
  index: number;
  title: string;
  description: string;
  imageAlt: string;
  linkLabel: string;
};

export function ServiceCard({
  service,
  index,
  title,
  description,
  imageAlt,
  linkLabel,
}: ServiceCardProps) {
  const href = { pathname: "/services" as const, hash: service.anchor };

  return (
    <article className="service-card group flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-warm-gray">
        <Image
          src={service.image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          sizes="(min-width: 1280px) 224px, (min-width: 1024px) 30vw, (min-width: 768px) 46vw, 100vw"
          placeholder="blur"
        />
        <span className="absolute left-0 top-0 bg-ink px-3 py-2 text-[0.65rem] font-bold tracking-[0.16em] text-warm-white">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col border-b border-border py-5">
        <h3 className="hyphens-auto font-display text-[1.65rem] font-semibold leading-tight tracking-[-0.015em] text-ink">
          <Link href={href} className="transition-colors duration-200 hover:text-gold-dark">
            {title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
        <Link
          href={href}
          className="editorial-link mt-5 text-xs"
          aria-label={`${linkLabel}: ${title}`}
        >
          {linkLabel}
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
        </Link>
      </div>
    </article>
  );
}
