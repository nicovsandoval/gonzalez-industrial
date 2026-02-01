import { MessageCircle, ChevronDown } from "lucide-react";
import { hero, getWhatsAppUrl } from "../../data/siteData";
import { Button } from "../ui/Button";
import { HeroBackground } from "../ui/HeroBackground";

export function Hero() {
  return (
    <section
      id="inicio"
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <HeroBackground />

      {/* Content */}
      <div className="hero-content relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-32">
        {/* Chips */}
        <div className="hero-chips flex flex-wrap justify-center gap-3 mb-8">
          {hero.chips.map((chip) => (
            <span
              key={chip}
              className="hero-chip inline-flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-full border border-white/20"
            >
              {chip}
            </span>
          ))}
        </div>

        <h1 className="hero-title font-oswald text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase leading-tight tracking-wide">
          {hero.title}
        </h1>

        {/* Full subtitle (hidden on low-height viewports via CSS) */}
        <p className="hero-subtitle hero-subtitle-full mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
          {hero.subtitle}
        </p>
        {/* Compact subtitle (shown only on low-height viewports via CSS) */}
        <p className="hero-subtitle hero-subtitle-compact mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
          {hero.subtitleCompact}
        </p>

        <div className="hero-ctas mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            as="a"
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
            className="hero-cta-primary"
          >
            <MessageCircle className="hero-cta-icon" size={20} />
            {hero.ctaPrimary}
          </Button>
          <Button
            as="a"
            href="#servicios"
            variant="outline-light"
            size="lg"
            className="hero-cta-secondary"
          >
            {hero.ctaSecondary}
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#servicios"
        aria-label="Ir a servicios"
        className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors motion-safe:animate-bounce"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
