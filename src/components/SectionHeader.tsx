import React from "react";

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  alignment?: "center" | "left";
  symbol?: string;
  as?: "h1" | "h2";
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  subtitle,
  title,
  description,
  alignment = "center",
  symbol = "✦",
  as: Component = "h2",
}) => {
  const isCenter = alignment === "center";

  return (
    <div className={`mb-12 sm:mb-16 ${isCenter ? "text-center mx-auto" : "text-left"} max-w-3xl`}>
      {/* Símbolo decorativo sutil */}
      <div className={`flex items-center gap-3 mb-3 ${isCenter ? "justify-center" : "justify-start"}`}>
        <span className="h-[1px] w-6 bg-gold/40" />
        <span className="text-gold text-xs tracking-widest">{symbol}</span>
        <span className="h-[1px] w-6 bg-gold/40" />
      </div>

      {subtitle && (
        <span className="block text-xs uppercase tracking-[0.25em] text-gold/80 font-sans mb-2">
          {subtitle}
        </span>
      )}

      <Component className="font-serif text-2xl sm:text-4xl md:text-5xl tracking-[0.12em] text-parchment font-light leading-tight">
        {title}
      </Component>

      {description && (
        <p className="mt-4 text-sm sm:text-base text-parchment-muted font-sans font-light leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};
