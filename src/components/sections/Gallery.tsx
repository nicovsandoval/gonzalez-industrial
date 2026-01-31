import { useState, useRef, useCallback, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryItems } from "../../data/siteData";
import type { GalleryItem } from "../../data/siteData";
import { SectionHeading } from "../ui/SectionHeading";
import { Lightbox } from "../ui/Lightbox";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(-1);
  const prevItem = () =>
    setLightboxIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length);
  const nextItem = () =>
    setLightboxIndex((i) => (i + 1) % galleryItems.length);

  return (
    <section id="galeria" className="py-20 md:py-28 bg-white dark:bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Galería"
          subtitle="Nuestro trabajo habla por nosotros. Vea nuestras instalaciones y procesos."
        />

        {/* Mobile: Horizontal carousel */}
        <MobileCarousel items={galleryItems} onItemClick={openLightbox} />

        {/* Desktop/Tablet: Masonry grid */}
        <div className="hidden md:block columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryItems.map((item, index) => (
            <DesktopCard
              key={index}
              item={item}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>
      </div>

      <Lightbox
        items={galleryItems}
        currentIndex={lightboxIndex}
        isOpen={lightboxIndex >= 0}
        onClose={closeLightbox}
        onPrev={prevItem}
        onNext={nextItem}
      />
    </section>
  );
}

/* ── Mobile Carousel ─────────────────────────────── */

function MobileCarousel({
  items,
  onItemClick,
}: {
  items: GalleryItem[];
  onItemClick: (index: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    if (children.length === 0) return;

    // Find the child closest to the scroll center
    const scrollCenter = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    for (let i = 0; i < children.length; i++) {
      const childCenter = children[i].offsetLeft + children[i].offsetWidth / 2;
      const dist = Math.abs(scrollCenter - childCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    }
    setActiveIndex(closest);
  }, []);

  const scrollTo = useCallback(
    (index: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const child = el.children[index] as HTMLElement | undefined;
      if (child) {
        child.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    },
    [reducedMotion]
  );

  const goPrev = () => scrollTo(Math.max(0, activeIndex - 1));
  const goNext = () => scrollTo(Math.min(items.length - 1, activeIndex + 1));

  return (
    <div className="md:hidden">
      {/* Scroll container */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 pb-2"
        >
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              item={item}
              onClick={() => onItemClick(index)}
            />
          ))}
        </div>

        {/* Prev / Next buttons */}
        {items.length > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="Anterior"
              className="absolute left-1 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-200 shadow-md backdrop-blur-sm hover:bg-white dark:hover:bg-neutral-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61A75E]"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goNext}
              aria-label="Siguiente"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-200 shadow-md backdrop-blur-sm hover:bg-white dark:hover:bg-neutral-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61A75E]"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Dots indicator */}
      {items.length > 1 && (
        <div
          className="flex justify-center gap-2 mt-4"
          role="tablist"
          aria-label="Indicadores de galería"
        >
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Ir a imagen ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61A75E] focus-visible:ring-offset-1 ${
                i === activeIndex
                  ? "bg-[#61A75E] scale-110"
                  : "bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Carousel Item (mobile) ──────────────────────── */

function CarouselItem({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const itemRef = useRef<HTMLButtonElement>(null);
  const [imgError, setImgError] = useState(false);
  const reducedMotion = useReducedMotion();

  // Auto-play video when visible in carousel, pause when scrolled away
  useEffect(() => {
    if (item.type !== "video" || reducedMotion) return;
    const video = videoRef.current;
    const el = itemRef.current;
    if (!video || !el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [item.type, reducedMotion]);

  return (
    <button
      ref={itemRef}
      onClick={onClick}
      className="snap-center shrink-0 w-[80vw] aspect-[4/3] rounded-xl overflow-hidden relative bg-neutral-200 dark:bg-neutral-800 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61A75E] focus-visible:ring-offset-2"
      aria-label={`Ver ${item.alt}`}
    >
      {item.type === "video" ? (
        <>
          <video
            ref={videoRef}
            src={item.src}
            poster={item.poster}
            muted
            loop
            playsInline
            preload="none"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 text-[#15401A] shadow-lg">
              <Play size={20} fill="currentColor" />
            </div>
          </div>
        </>
      ) : (
        <>
          {!imgError ? (
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <FallbackPlaceholder alt={item.alt} />
          )}
        </>
      )}
    </button>
  );
}

/* ── Desktop / Tablet masonry card ───────────────── */

function DesktopCard({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLButtonElement>(null);
  const [imgError, setImgError] = useState(false);
  const reducedMotion = useReducedMotion();

  const aspectClass =
    item.aspect === "tall"
      ? "aspect-[3/4]"
      : item.aspect === "wide"
        ? "aspect-[16/10]"
        : "aspect-square";

  // Pause video when out of viewport (desktop)
  useEffect(() => {
    if (item.type !== "video" || reducedMotion) return;
    const video = videoRef.current;
    const el = cardRef.current;
    if (!video || !el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [item.type, reducedMotion]);

  return (
    <button
      ref={cardRef}
      onClick={onClick}
      className={`relative w-full ${aspectClass} rounded-xl overflow-hidden group cursor-pointer break-inside-avoid bg-neutral-200 dark:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61A75E] focus-visible:ring-offset-2`}
      aria-label={`Ver ${item.alt}`}
    >
      {item.type === "video" ? (
        <>
          <video
            ref={videoRef}
            src={item.src}
            poster={item.poster}
            muted
            loop
            playsInline
            preload="none"
            className="w-full h-full object-cover"
            onMouseEnter={() => {
              if (!reducedMotion) videoRef.current?.play();
            }}
            onMouseLeave={() => {
              if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
              }
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/90 text-[#15401A] shadow-lg group-hover:scale-110 transition-transform">
              <Play size={24} fill="currentColor" />
            </div>
          </div>
        </>
      ) : (
        <>
          {!imgError ? (
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgError(true)}
            />
          ) : (
            <FallbackPlaceholder alt={item.alt} />
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
        </>
      )}
    </button>
  );
}

/* ── Shared fallback ─────────────────────────────── */

function FallbackPlaceholder({ alt }: { alt: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center text-neutral-400 dark:text-neutral-600">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center">
          <span className="text-lg font-oswald font-bold">GI</span>
        </div>
        <p className="text-xs">{alt}</p>
      </div>
    </div>
  );
}
