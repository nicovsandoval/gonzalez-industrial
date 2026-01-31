interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  className = "",
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`mb-12 ${alignment} ${className}`}>
      <h2 className="font-oswald text-3xl md:text-4xl font-bold text-[#1A1A1A] dark:text-white uppercase tracking-wide">
        {title}
      </h2>
      <div
        className={`mt-4 w-16 h-1 bg-[#61A75E] rounded-full ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
      {subtitle && (
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
