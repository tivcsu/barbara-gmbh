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
        inverse ? "bg-warm-white" : ""
      }`}
      aria-label="Barbara GmbH"
    >
      <Image
        src="/images/barbara-gmbh-logo.png"
        alt=""
        width={2172}
        height={724}
        loading={inverse ? "lazy" : "eager"}
        sizes="(min-width: 1280px) 240px, (min-width: 640px) 224px, 188px"
        className="h-auto w-[11.75rem] sm:w-56 xl:w-60"
      />
    </Link>
  );
}
