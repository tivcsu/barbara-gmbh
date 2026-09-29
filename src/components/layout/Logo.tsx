import Image from "next/image";

import { Link } from "@/src/i18n/navigation";

type LogoProps = {
  inverse?: boolean;
};

export function Logo({ inverse = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center ${
        inverse
          ? "relative h-16 w-[11.75rem] overflow-hidden sm:h-20 sm:w-56 xl:w-60"
          : ""
      }`}
      aria-label="Barbara GmbH"
      scroll={false}
    >
      {inverse ? (
        <Image
          src="/images/barbara-gmbh-logo-white.png"
          alt=""
          width={1774}
          height={887}
          loading="lazy"
          sizes="240px"
          className="absolute left-0 top-1/2 h-auto w-full -translate-y-1/2 mix-blend-lighten"
        />
      ) : (
        <Image
          src="/images/barbara-gmbh-logo-black.png"
          alt=""
          width={2172}
          height={724}
          loading="eager"
          sizes="(min-width: 1280px) 240px, (min-width: 640px) 224px, 188px"
          className="h-auto w-[11.75rem] sm:w-56 xl:w-60"
        />
      )}
    </Link>
  );
}
