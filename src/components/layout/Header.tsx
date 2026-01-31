import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { navLinks, getWhatsAppUrl } from "../../data/siteData";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Button } from "../ui/Button";
import { useScrollSpy } from "../../hooks/useScrollSpy";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Header({ isDark, onToggleTheme }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const headerBg = scrolled
    ? "bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-md shadow-sm"
    : "bg-transparent";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${headerBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2 shrink-0">
            <img
              src="/src/assets/logos/isotipo.png"
              alt="Gonzalez Industrial"
              className="h-10 w-auto"
              width={40}
              height={40}
              onError={(e) => {
                // Fallback text if logo not found
                (e.target as HTMLImageElement).style.display = "none";
                (
                  e.target as HTMLImageElement
                ).nextElementSibling?.classList.remove("hidden");
              }}
            />
            <span className="hidden font-oswald text-xl font-bold text-[#1A1A1A] dark:text-white uppercase tracking-wide">
              GI
            </span>
            <span className="font-oswald text-lg md:text-xl font-bold text-[#1A1A1A] dark:text-white uppercase tracking-wide">
              Gonzalez<span className="text-[#61A75E]"> Industrial</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "text-[#15401A] dark:text-[#61A75E] bg-[#15401A]/5 dark:bg-[#61A75E]/10"
                      : "text-neutral-700 dark:text-neutral-300 hover:text-[#15401A] dark:hover:text-[#61A75E]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            <Button
              as="a"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="sm"
            >
              <MessageCircle size={16} />
              Cotizar por WhatsApp
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              className="p-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer */}
          <nav
            className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-[#1A1A1A] z-50 shadow-2xl flex flex-col lg:hidden"
            aria-label="Menú móvil"
          >
            <div className="flex items-center justify-between px-4 h-16 border-b border-neutral-200 dark:border-neutral-700">
              <span className="font-oswald text-lg font-bold text-[#1A1A1A] dark:text-white uppercase">
                Menú
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Cerrar menú"
                className="p-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "text-[#15401A] dark:text-[#61A75E] bg-[#15401A]/5 dark:bg-[#61A75E]/10"
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
            <div className="px-4 py-4 border-t border-neutral-200 dark:border-neutral-700">
              <Button
                as="a"
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
                className="w-full"
              >
                <MessageCircle size={18} />
                Cotizar por WhatsApp
              </Button>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
