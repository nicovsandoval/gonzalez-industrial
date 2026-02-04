import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { navLinks, getWhatsAppUrl } from "../../data/siteData";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";
import { useScrollSpy } from "../../hooks/useScrollSpy";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onMobileMenuChange?: (open: boolean) => void;
}

export function Header({
  isDark,
  onToggleTheme,
  onMobileMenuChange,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Scroll lock (iOS-safe, no jump) ─────────────────────────
  // Lock/unlock is imperative (not inside useEffect) so body style
  // removal and scrollTo happen in the same synchronous call —
  // no paint cycle in between that would flash scroll-position 0.
  const scrollLockY = useRef(0);

  const openMenu = useCallback(() => {
    scrollLockY.current = window.scrollY;
    Object.assign(document.body.style, {
      position: "fixed",
      top: `-${scrollLockY.current}px`,
      left: "0",
      right: "0",
      width: "100%",
    });
    setMobileOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    const y = scrollLockY.current;
    Object.assign(document.body.style, {
      position: "",
      top: "",
      left: "",
      right: "",
      width: "",
    });
    // behavior:'auto' bypasses CSS scroll-behavior:smooth → no visible jump
    window.scrollTo({ top: y, left: 0, behavior: "auto" });
    setMobileOpen(false);
  }, []);

  // Notify parent; safety cleanup if component unmounts while menu is open
  useEffect(() => {
    onMobileMenuChange?.(mobileOpen);
    if (mobileOpen) {
      return () => {
        Object.assign(document.body.style, {
          position: "",
          top: "",
          left: "",
          right: "",
          width: "",
        });
        window.scrollTo({ top: scrollLockY.current, left: 0, behavior: "auto" });
      };
    }
  }, [mobileOpen, onMobileMenuChange]);

  // Close drawer on ESC key
  useEffect(() => {
    if (!mobileOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [mobileOpen, closeMenu]);

  const isTransparent = !scrolled;

  // When transparent the header floats over the dark hero,
  // so logos and text must use their "dark-background" variants.
  const effectiveLogoDark = scrolled ? isDark : true;

  // Header background: transparent at top, solid+blur on scroll
  const headerBg = scrolled
    ? "bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-md shadow-md"
    : "bg-transparent";

  // Icon color (hamburger, close) adapts to header state
  const iconColorClass = isTransparent
    ? "text-white hover:bg-white/15"
    : "text-[#1A1A1A] dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${headerBg}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ─── Desktop: CSS Grid with equal side slots ─── */}
          <div className="hidden lg:grid grid-cols-[200px_1fr_200px] xl:grid-cols-[280px_1fr_280px] items-center h-20">
            {/* Left slot — Logo */}
            <div className="flex items-center justify-start pl-2">
              <a href="#inicio" className="inline-block">
                <Logo
                  context="header-desktop"
                  isDark={effectiveLogoDark}
                  className="h-11 xl:h-12 w-auto"
                />
              </a>
            </div>

            {/* Center slot — Nav */}
            <nav
              className="flex items-center justify-center gap-0.5"
              aria-label="Navegación principal"
            >
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                const activeClass = isTransparent
                  ? "text-white bg-white/20"
                  : "text-[#15401A] dark:text-[#61A75E] bg-[#15401A]/10 dark:bg-[#61A75E]/10";
                const inactiveClass = isTransparent
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-[#1A1A1A] dark:text-neutral-300 hover:text-[#15401A] dark:hover:text-[#61A75E] hover:bg-neutral-100 dark:hover:bg-neutral-800";
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`px-2.5 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive ? activeClass : inactiveClass
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Right slot — Actions (mirrors left slot width) */}
            <div className="flex items-center justify-end pr-2 gap-3">
              <ThemeToggle
                isDark={isDark}
                onToggle={onToggleTheme}
                transparent={isTransparent}
              />
              <Button
                as="a"
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="sm"
                className="whitespace-nowrap"
              >
                <MessageCircle size={16} />
                <span className="hidden xl:inline">Cotizar por WhatsApp</span>
                <span className="xl:hidden">Cotizar</span>
              </Button>
            </div>
          </div>

          {/* ─── Mobile layout ─── */}
          <div className="flex lg:hidden items-center justify-between h-16">
            {/* Logo */}
            <a href="#inicio" className="shrink-0">
              <Logo
                context="header-mobile"
                isDark={effectiveLogoDark}
                className="h-9 w-9"
              />
            </a>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle
                isDark={isDark}
                onToggle={onToggleTheme}
                transparent={isTransparent}
              />
              <button
                onClick={() => (mobileOpen ? closeMenu() : openMenu())}
                aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={mobileOpen}
                className={`p-2 rounded-lg transition-colors ${iconColorClass}`}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Mobile Drawer (outside <header> for independent stacking) ─── */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="mobile-drawer-backdrop fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <nav
            className="mobile-drawer-panel fixed top-0 right-0 w-[280px] max-w-[85vw] bg-white dark:bg-[#1A1A1A] z-[60] shadow-2xl flex flex-col lg:hidden"
            aria-label="Menú móvil"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 min-h-[64px] border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-2.5">
                <Logo
                  context="header-mobile"
                  isDark={isDark}
                  className="h-6 w-6"
                />
                <span className="font-oswald text-lg font-bold text-[#1A1A1A] dark:text-white uppercase tracking-wide">
                  Menú
                </span>
              </div>
              <button
                onClick={closeMenu}
                aria-label="Cerrar menú"
                className="p-2 -mr-2 text-[#1A1A1A] dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Nav links — scrollable if needed */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-1">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`flex items-center min-h-[44px] px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "text-[#15401A] dark:text-[#61A75E] bg-[#15401A]/10 dark:bg-[#61A75E]/10"
                        : "text-[#1A1A1A] dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* CTA */}
            <div className="px-5 py-5 border-t border-neutral-200 dark:border-neutral-700">
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
    </>
  );
}
