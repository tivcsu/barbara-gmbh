type EyebrowProps = {
  children: React.ReactNode;
  inverse?: boolean;
};

export function Eyebrow({ children, inverse = false }: EyebrowProps) {
  return (
    <p
      className={`flex items-center gap-3 text-[0.6875rem] font-bold uppercase tracking-[0.2em] ${
        inverse ? "text-gold-light" : "text-gold-dark"
      }`}
    >
      <span aria-hidden="true" className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}
