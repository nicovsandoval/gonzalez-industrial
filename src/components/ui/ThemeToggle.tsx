import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  transparent?: boolean;
}

export function ThemeToggle({
  isDark,
  onToggle,
  transparent = false,
}: ThemeToggleProps) {
  const colorClass = transparent
    ? "text-white hover:bg-white/15 focus-visible:ring-offset-transparent"
    : "text-[#1A1A1A] dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#1A1A1A]";

  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={`relative p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61A75E] focus-visible:ring-offset-2 ${colorClass}`}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
