import { useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { GalleryItem } from "../../data/siteData";
import { Watermark } from "./Watermark";
import { LightboxVideoPlayer } from "../media/LightboxVideoPlayer";

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}

export function Lightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
  onGoTo,
}: LightboxProps) {
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  /* ── Keyboard navigation ──────────────────────── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // When fullscreen is active let the browser exit it first
        if (document.fullscreenElement) return;
        onClose();
      }
      // Arrow keys navigate items only for images; the video player handles seek
      const isVideo = items[currentIndex]?.type === "video";
      if (!isVideo) {
        if (e.key === "ArrowLeft") onPrev();
        if (e.key === "ArrowRight") onNext();
      }
    },
    [onClose, onPrev, onNext, items, currentIndex]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  /* ── Scroll active thumbnail into view ────────── */
  useEffect(() => {
    const container = thumbnailsRef.current;
    if (!container || currentIndex < 0) return;
    const active = container.children[currentIndex] as HTMLElement | undefined;
    if (active) {
      active.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [currentIndex]);

  /* ── Touch / swipe handlers ───────────────────── */
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.targetTouches[0].clientX;
    touchDeltaX.current = 0;
  }

  function handleTouchMove(e: React.TouchEvent) {
    touchDeltaX.current = e.targetTouches[0].clientX - touchStartX.current;
  }

  function handleTouchEnd() {
    if (Math.abs(touchDeltaX.current) > 50) {
      if (touchDeltaX.current < 0) onNext();
      else onPrev();
    }
    touchDeltaX.current = 0;
  }

  if (!isOpen || !items[currentIndex]) return null;

  const item = items[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Visor de galería"
    >
      {/* ── Top bar: counter + close ──────────────── */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <span className="text-white/70 text-sm font-medium tabular-nums">
          {currentIndex + 1} / {items.length}
        </span>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Cerrar"
          className="p-2 text-white/80 hover:text-white transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X size={28} />
        </button>
      </div>

      {/* ── Main content area ─────────────────────── */}
      <div
        className="flex-1 flex items-center justify-center relative min-h-0 px-4 md:px-16"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Prev arrow (desktop) */}
        {items.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Anterior"
            className="hidden md:flex absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/60 hover:text-white transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronLeft size={36} />
          </button>
        )}

        {/* Media */}
        <div
          className="relative max-w-full max-h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {item.type === "video" ? (
            <LightboxVideoPlayer
              key={item.id}
              src={item.srcMp4 ?? ""}
              poster={item.posterWebp}
              title={item.alt}
            />
          ) : (
            <picture>
              {item.srcAvif && <source srcSet={item.srcAvif} type="image/avif" />}
              <img
                key={item.id}
                src={item.srcWebp}
                alt={item.alt}
                decoding="async"
                className="max-w-[90vw] max-h-[70vh] md:max-h-[72vh] rounded-lg object-contain"
              />
            </picture>
          )}
          <Watermark className="w-10 h-10 md:w-14 md:h-14" />
        </div>

        {/* Next arrow (desktop) */}
        {items.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Siguiente"
            className="hidden md:flex absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/60 hover:text-white transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronRight size={36} />
          </button>
        )}
      </div>

      {/* ── Caption ───────────────────────────────── */}
      {item.caption && (
        <p className="text-white/50 text-xs md:text-sm text-center px-4 py-1 shrink-0">
          {item.caption}
        </p>
      )}

      {/* ── Thumbnails strip ──────────────────────── */}
      <div
        ref={thumbnailsRef}
        className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide shrink-0 justify-start md:justify-center"
      >
        {items.map((thumb, i) => (
          <button
            key={thumb.id}
            onClick={() => onGoTo(i)}
            aria-label={`Ir a ${thumb.alt}`}
            className={`shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61A75E] ${
              i === currentIndex
                ? "border-[#61A75E] opacity-100 scale-105"
                : "border-transparent opacity-40 hover:opacity-70"
            }`}
          >
            {thumb.type === "video" ? (
              <div className="relative w-full h-full bg-neutral-800">
                {thumb.posterWebp && (
                  <picture>
                    {thumb.posterAvif && <source srcSet={thumb.posterAvif} type="image/avif" />}
                    <img
                      src={thumb.posterWebp}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </picture>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play size={16} className="text-white drop-shadow-md" fill="currentColor" />
                </div>
              </div>
            ) : (
              <picture>
                {thumb.srcAvif && <source srcSet={thumb.srcAvif} type="image/avif" />}
                <img
                  src={thumb.srcWebp}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </picture>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
