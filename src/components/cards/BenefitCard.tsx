import type { LucideIcon } from "lucide-react";

type BenefitCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function BenefitCard({
  icon: Icon,
  title,
  description,
}: BenefitCardProps) {
  return (
    <article className="border-t border-white/20 pt-7">
      <Icon aria-hidden="true" className="h-7 w-7 text-gold-light" strokeWidth={1.5} />
      <h3 className="mt-6 font-display text-2xl font-semibold text-warm-white">
        {title}
      </h3>
      <p className="mt-3 max-w-[17rem] text-sm leading-6 text-warm-white/60">
        {description}
      </p>
    </article>
  );
}
