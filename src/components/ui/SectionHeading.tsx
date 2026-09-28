type SectionHeadingProps = {
  children: React.ReactNode;
  inverse?: boolean;
  className?: string;
  id?: string;
};

export function SectionHeading({
  children,
  inverse = false,
  className = "",
  id,
}: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className={`font-display text-[2.45rem] font-medium leading-[1.02] tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem] ${
        inverse ? "text-warm-white" : "text-ink"
      } ${className}`}
    >
      {children}
    </h2>
  );
}
