import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Volume1,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";

/* ── Platform detection ────────────────────────────────────
 * iOS does NOT allow programmatic volume control via HTMLVideoElement.volume.
 * The property is read-only and always returns 1. Only .muted can be toggled.
 * Therefore we never render a volume slider on iOS — just a mute/unmute button.
 *
 * On iPadOS 13+, Safari reports "Macintosh" in the UA but has touch support,
 * so we also check maxTouchPoints to catch iPads.
 */
const IS_IOS =
  typeof navigator !== "undefined" &&
  (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1));

const IS_TOUCH =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

/* ── Webkit-extended video element for iOS fullscreen ──────
 * iOS Safari does not support the standard Fullscreen API on arbitrary elements.
 * Instead we must call video.webkitEnterFullscreen() which triggers the native
 * iOS fullscreen player with its own controls. We accept that trade-off: the
 * inline player uses our custom UI, fullscreen on iOS uses Apple's native UI.
 */
interface WebkitVideo extends HTMLVideoElement {
  webkitEnterFullscreen?: () => void;
}

/* ── Props ─────────────────────────────────────────────── */
interface LightboxVideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
}

/* ── Helpers ───────────────────────────────────────────── */
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ── Component ─────────────────────────────────────────── */
export function LightboxVideoPlayer({
  src,
  poster,
  title,
  className = "",
}: LightboxVideoPlayerProps) {
  /* refs */
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<WebkitVideo>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeSliderRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const lastVolumeRef = useRef(1);
  const seekingRef = useRef(false);

  /* state */
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volumeOpen, setVolumeOpen] = useState(false);

  /* ── Autoplay on mount ─────────────────────────── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    const attempt = video.play();
    if (attempt) {
      attempt
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Browser blocked unmuted autoplay — retry muted
          video.muted = true;
          setIsMuted(true);
          video
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        });
    }
    return () => {
      video.pause();
    };
  }, [src]);

  /* ── Auto-hide controls after 2 s while playing ── */
  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (isPlaying) {
      hideTimerRef.current = setTimeout(() => {
        setShowControls(false);
        setVolumeOpen(false); // close slider when controls hide
      }, 2000);
    }
  }, [isPlaying]);

  useEffect(() => {
    resetHideTimer();
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isPlaying, resetHideTimer]);

  /* ── Play / Pause ──────────────────────────────── */
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  /* ── Volume ────────────────────────────────────── */
  const applyVolume = useCallback((v: number) => {
    const video = videoRef.current;
    if (!video) return;
    const clamped = Math.max(0, Math.min(1, v));
    video.volume = clamped;
    setVolumeState(clamped);
    if (clamped > 0 && video.muted) {
      video.muted = false;
      setIsMuted(false);
    } else if (clamped === 0) {
      video.muted = true;
      setIsMuted(true);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) {
      video.muted = false;
      video.volume = lastVolumeRef.current || 0.5;
      setIsMuted(false);
      setVolumeState(video.volume);
    } else {
      lastVolumeRef.current = video.volume;
      video.muted = true;
      setIsMuted(true);
    }
  }, []);

  /* ── Seek ──────────────────────────────────────── */
  const seekTo = useCallback(
    (fraction: number) => {
      const video = videoRef.current;
      if (!video || !duration) return;
      video.currentTime = Math.max(0, Math.min(duration, fraction * duration));
      setCurrentTime(video.currentTime);
    },
    [duration]
  );

  /* ── Fullscreen ────────────────────────────────── */
  const canFullscreenStandard =
    typeof document !== "undefined" &&
    !!document.documentElement.requestFullscreen;

  const toggleFullscreenCb = useCallback(() => {
    /* Standard Fullscreen API (desktop, Android) */
    if (canFullscreenStandard) {
      const el = containerRef.current;
      if (!el) return;
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        el.requestFullscreen().catch(() => {});
      }
      return;
    }
    /* iOS fallback: webkitEnterFullscreen on the <video> element.
     * This hands control to Safari's native fullscreen player. */
    const video = videoRef.current;
    if (video?.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
    }
  }, [canFullscreenStandard]);

  /* Listen for fullscreen change — standard + webkit */
  useEffect(() => {
    const onStandard = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onStandard);

    const video = videoRef.current;
    const onWebkitBegin = () => setIsFullscreen(true);
    const onWebkitEnd = () => setIsFullscreen(false);
    if (video) {
      video.addEventListener("webkitbeginfullscreen", onWebkitBegin);
      video.addEventListener("webkitendfullscreen", onWebkitEnd);
    }

    return () => {
      document.removeEventListener("fullscreenchange", onStandard);
      if (video) {
        video.removeEventListener("webkitbeginfullscreen", onWebkitBegin);
        video.removeEventListener("webkitendfullscreen", onWebkitEnd);
      }
    };
  }, []);

  /* Fullscreen button is always shown — standard API or webkit fallback */
  const canFullscreen =
    canFullscreenStandard ||
    (typeof videoRef.current?.webkitEnterFullscreen === "function");

  /* ── Keyboard shortcuts (Space, ←, →, M) ──────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const video = videoRef.current;
      if (!video) return;
      switch (e.key) {
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft":
          e.preventDefault();
          video.currentTime = Math.max(0, video.currentTime - 5);
          setCurrentTime(video.currentTime);
          resetHideTimer();
          break;
        case "ArrowRight":
          e.preventDefault();
          video.currentTime = Math.min(
            video.duration || 0,
            video.currentTime + 5
          );
          setCurrentTime(video.currentTime);
          resetHideTimer();
          break;
        case "m":
        case "M":
          toggleMute();
          resetHideTimer();
          break;
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [togglePlay, toggleMute, resetHideTimer]);

  /* ── Video element events ──────────────────────── */
  const onLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };
  const onTimeUpdate = () => {
    if (videoRef.current && !seekingRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };
  const onEnded = () => setIsPlaying(false);

  /* ── Progress bar interaction ──────────────────── */
  const getFraction = (clientX: number, el: HTMLDivElement | null) => {
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  };

  const handleProgressMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    seekingRef.current = true;
    seekTo(getFraction(e.clientX, progressRef.current));
    const onMove = (ev: MouseEvent) =>
      seekTo(getFraction(ev.clientX, progressRef.current));
    const onUp = () => {
      seekingRef.current = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };
  const handleProgressTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    seekingRef.current = true;
    seekTo(getFraction(e.touches[0].clientX, progressRef.current));
  };
  const handleProgressTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
    seekTo(getFraction(e.touches[0].clientX, progressRef.current));
  };
  const handleProgressTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    seekingRef.current = false;
  };

  /* ── Volume slider interaction ─────────────────── */
  const handleVolSliderMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    applyVolume(getFraction(e.clientX, volumeSliderRef.current));
    const onMove = (ev: MouseEvent) =>
      applyVolume(getFraction(ev.clientX, volumeSliderRef.current));
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };
  const handleVolSliderTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    applyVolume(getFraction(e.touches[0].clientX, volumeSliderRef.current));
  };
  const handleVolSliderTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
    applyVolume(getFraction(e.touches[0].clientX, volumeSliderRef.current));
  };
  const handleVolSliderTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  /* ── Derived values ────────────────────────────── */
  const progress = duration > 0 ? currentTime / duration : 0;
  const displayVolume = isMuted ? 0 : volume;

  /* Volume icon — adapts to current level */
  const VolumeIcon =
    isMuted || volume === 0 ? VolumeX : volume <= 0.5 ? Volume1 : Volume2;

  /* ── Render ────────────────────────────────────── */
  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={resetHideTimer}
      onTouchStart={resetHideTimer}
      style={
        isFullscreen
          ? {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#000",
            }
          : undefined
      }
    >
      {/* ── Video — no native controls ───────────── */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        onClick={togglePlay}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className={
          isFullscreen
            ? "cursor-pointer block"
            : "max-w-[90vw] max-h-[70vh] md:max-h-[72vh] rounded-lg cursor-pointer block"
        }
        style={
          isFullscreen
            ? {
                maxWidth: "100vw",
                maxHeight: "100vh",
                width: "auto",
                height: "auto",
                objectFit: "contain" as const,
              }
            : undefined
        }
        aria-label={title}
      />

      {/* ── Big play overlay (when paused) ────────── */}
      {!isPlaying && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          aria-label="Reproducir"
          className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-colors ${
            isFullscreen ? "" : "rounded-lg"
          }`}
        >
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-white/90 text-[#15401A] shadow-lg">
            <Play size={28} fill="currentColor" className="ml-1" />
          </div>
        </button>
      )}

      {/* ── Controls bar ─────────────────────────── */}
      <div
        className={`absolute bottom-0 left-0 right-0 pt-10 pb-2.5 px-3 transition-opacity duration-300 ${
          isFullscreen ? "" : "rounded-b-lg"
        } ${
          showControls || !isPlaying
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,.70) 0%, rgba(0,0,0,.35) 60%, transparent 100%)",
          /* iPhone safe area — only applied in fullscreen to avoid notch overlap */
          ...(isFullscreen
            ? {
                paddingBottom:
                  "calc(0.625rem + env(safe-area-inset-bottom, 0px))",
              }
            : {}),
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Progress bar ─────────────────────── */}
        <div
          ref={progressRef}
          className="relative w-full h-5 flex items-center cursor-pointer mb-1.5 group/p"
          onMouseDown={handleProgressMouseDown}
          onTouchStart={handleProgressTouchStart}
          onTouchMove={handleProgressTouchMove}
          onTouchEnd={handleProgressTouchEnd}
          role="slider"
          aria-label="Progreso del video"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          {/* Track */}
          <div className="absolute left-0 right-0 h-1 group-hover/p:h-1.5 bg-white/20 rounded-full transition-all" />
          {/* Fill */}
          <div
            className="absolute left-0 h-1 group-hover/p:h-1.5 bg-[#61A75E] rounded-full transition-all"
            style={{ width: `${progress * 100}%` }}
          />
          {/* Handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#61A75E] rounded-full shadow-md opacity-0 group-hover/p:opacity-100 transition-opacity"
            style={{ left: `calc(${progress * 100}% - 7px)` }}
          />
        </div>

        {/* ── Bottom row ───────────────────────── */}
        <div className="flex items-center gap-1">
          {/* Play / Pause — 44px touch target */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
            className="w-11 h-11 flex items-center justify-center shrink-0 text-white/90 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61A75E]"
          >
            {isPlaying ? (
              <Pause size={20} />
            ) : (
              <Play size={20} fill="currentColor" />
            )}
          </button>

          {/* Time */}
          <span className="text-white/70 text-xs tabular-nums select-none whitespace-nowrap mr-1">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className="flex-1" />

          {/* ── Volume group ───────────────────── */}
          <div
            className="relative flex items-center"
            onMouseEnter={() => {
              if (!IS_TOUCH && !IS_IOS) setVolumeOpen(true);
            }}
            onMouseLeave={() => {
              if (!IS_TOUCH) setVolumeOpen(false);
            }}
          >
            {/* Mute / Unmute icon — always visible on all platforms */}
            <button
              onClick={() => {
                toggleMute();
                /* On Android / touch non-iOS: also toggle slider visibility */
                if (IS_TOUCH && !IS_IOS) {
                  setVolumeOpen((prev) => !prev);
                }
              }}
              aria-label={isMuted ? "Activar sonido" : "Silenciar"}
              className="w-11 h-11 flex items-center justify-center shrink-0 text-white/90 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61A75E]"
            >
              <VolumeIcon size={20} />
            </button>

            {/* Volume slider — hidden on iOS (volume is hardware-only on iOS) */}
            {!IS_IOS && volumeOpen && (
              <div className="ml-0.5 flex items-center h-11">
                <div
                  ref={volumeSliderRef}
                  className="relative w-20 h-5 flex items-center cursor-pointer group/v"
                  onMouseDown={handleVolSliderMouseDown}
                  onTouchStart={handleVolSliderTouchStart}
                  onTouchMove={handleVolSliderTouchMove}
                  onTouchEnd={handleVolSliderTouchEnd}
                  role="slider"
                  aria-label="Volumen"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(displayVolume * 100)}
                >
                  {/* Track */}
                  <div className="absolute left-0 right-0 h-1 bg-white/20 rounded-full" />
                  {/* Fill */}
                  <div
                    className="absolute left-0 h-1 bg-[#61A75E] rounded-full"
                    style={{ width: `${displayVolume * 100}%` }}
                  />
                  {/* Handle */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#61A75E] rounded-full shadow-md"
                    style={{
                      left: `calc(${displayVolume * 100}% - 6px)`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* ── Fullscreen — always visible ──── */}
          {canFullscreen && (
            <button
              onClick={toggleFullscreenCb}
              aria-label={
                isFullscreen
                  ? "Salir de pantalla completa"
                  : "Pantalla completa"
              }
              className="w-11 h-11 flex items-center justify-center shrink-0 text-white/90 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61A75E]"
            >
              {isFullscreen ? (
                <Minimize size={20} />
              ) : (
                <Maximize size={20} />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
