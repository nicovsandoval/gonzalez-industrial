interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const base =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide";
  const variants: Record<string, string> = {
    default:
      "bg-[#15401A]/10 text-[#15401A] dark:bg-[#61A75E]/20 dark:text-[#61A75E]",
    accent: "bg-[#61A75E] text-white",
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
