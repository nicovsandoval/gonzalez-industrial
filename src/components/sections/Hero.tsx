import { useRef, useState } from "react";
import { MessageCircle, ChevronDown } from "lucide-react";
import { hero, getWhatsAppUrl } from "../../data/siteData";
import { Button } from "../ui/Button";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background video */}
      {hero.videoBg && !reducedMotion && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={hero.videoBg} type="video/mp4" />
        </video>
      )}

      {/* Background image (fallback or primary) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${hero.imageBg})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-32">
        {/* Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {hero.chips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-full border border-white/20"
            >
              {chip}
            </span>
          ))}
        </div>

        <h1 className="font-oswald text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase leading-tight tracking-wide">
          {hero.title}
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
          {hero.subtitle}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            as="a"
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
          >
            <MessageCircle size={20} />
            {hero.ctaPrimary}
          </Button>
          <Button as="a" href="#servicios" variant="outline-light" size="lg">
            {hero.ctaSecondary}
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#servicios"
        aria-label="Ir a servicios"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors motion-safe:animate-bounce"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
