import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "outline-light" | "ghost";

type BaseProps = {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/**
 * Variantes del botón.
 * Todas comparten: padding, border-radius, font-weight, gap, transición y focus ring.
 * Solo cambian colores y bordes.
 *
 * - primary:       sólido verde oscuro → hover verde medio
 * - secondary:     sólido verde medio → hover invierte a blanco (alto contraste universal)
 * - outline:       borde verde, para superficies claras/oscuras normales
 * - outline-light: borde blanco, para fondos con imagen/overlay (hero, banners)
 * - ghost:         transparente con texto verde
 */
const variantClasses: Record<Variant, string> = {
  primary: [
    "bg-[#15401A] text-white",
    "hover:bg-[#61A75E]",
    "active:bg-[#4e8c4b]",
    "focus-visible:ring-[#61A75E]",
    "focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#1A1A1A]",
  ].join(" "),
  secondary: [
    "bg-[#61A75E] text-white",
    "hover:bg-white hover:text-[#15401A]",
    "active:bg-neutral-100 active:text-[#15401A]",
    // ring-offset-transparent: secondary lives on colored backgrounds (banner, hero)
    "focus-visible:ring-white focus-visible:ring-offset-transparent",
  ].join(" "),
  outline: [
    "border-2 border-[#15401A] text-[#15401A]",
    "hover:bg-[#15401A] hover:text-white",
    "active:bg-[#15401A]/90 active:text-white",
    "dark:border-[#61A75E] dark:text-[#61A75E]",
    "dark:hover:bg-[#61A75E] dark:hover:text-white",
    "dark:active:bg-[#61A75E]/90 dark:active:text-white",
    "focus-visible:ring-[#15401A] dark:focus-visible:ring-[#61A75E]",
    "focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#1A1A1A]",
  ].join(" "),
  "outline-light": [
    "border-2 border-white text-white",
    "hover:bg-white hover:text-[#1A1A1A]",
    "active:bg-neutral-100 active:text-[#1A1A1A]",
    // ring-offset-transparent: outline-light lives on dark overlays (hero, banners)
    "focus-visible:ring-white focus-visible:ring-offset-transparent",
  ].join(" "),
  ghost: [
    "text-[#15401A] hover:bg-[#15401A]/10",
    "active:bg-[#15401A]/20",
    "dark:text-[#61A75E] dark:hover:bg-[#61A75E]/10",
    "dark:active:bg-[#61A75E]/20",
    "focus-visible:ring-[#15401A] dark:focus-visible:ring-[#61A75E]",
    "focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#1A1A1A]",
  ].join(" "),
};

const sizeClasses: Record<string, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
  } = props;

  const classes = [
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(" ");

  if (props.as === "a") {
    // Exclude props consumed by Button so they don't override computed attrs
    const {
      as: _,
      variant: _v,
      size: _s,
      className: _c,
      children: _ch,
      ...anchorProps
    } = props as ButtonAsAnchor;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const {
    as: _,
    variant: _v,
    size: _s,
    className: _c,
    children: _ch,
    ...buttonProps
  } = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
