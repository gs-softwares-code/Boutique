export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "text-center mx-auto" : "text-left"} max-w-2xl ${className ?? ""}`}>
      {eyebrow && (
        <p className="text-[0.68rem] tracking-luxe uppercase text-gold mb-4">{eyebrow}</p>
      )}
      <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-espresso leading-tight text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-espresso/65 leading-relaxed text-[0.95rem]">{subtitle}</p>
      )}
    </div>
  );
}
