import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";

interface LightboxVideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function LightboxVideoPlayer({
  src,
  poster,
  title,
  className = "",
}: LightboxVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const seekingRef = useRef(false);

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
    // Only auto-hide when playing
    if (isPlaying) {
      hideTimerRef.current = setTimeout(() => setShowControls(false), 2000);
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
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  /* ── Mute / Unmute ─────────────────────────────── */
  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
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
  const fullscreenSupported =
    typeof document !== "undefined" &&
    !!document.documentElement.requestFullscreen;

  const toggleFullscreenCb = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

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
  const getFraction = (clientX: number) => {
    const bar = progressRef.current;
    if (!bar) return 0;
    const rect = bar.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  };

  const handleProgressMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    seekingRef.current = true;
    seekTo(getFraction(e.clientX));

    const onMove = (ev: MouseEvent) => seekTo(getFraction(ev.clientX));
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
    seekTo(getFraction(e.touches[0].clientX));
  };
  const handleProgressTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
    seekTo(getFraction(e.touches[0].clientX));
  };
  const handleProgressTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    seekingRef.current = false;
  };

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={resetHideTimer}
      onTouchStart={resetHideTimer}
    >
      {/* Video — no native controls */}
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
        className="max-w-[90vw] max-h-[70vh] md:max-h-[72vh] rounded-lg cursor-pointer block"
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
          className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg transition-colors"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-white/90 text-[#15401A] shadow-lg">
            <Play size={28} fill="currentColor" className="ml-1" />
          </div>
        </button>
      )}

      {/* ── Controls bar ─────────────────────────── */}
      <div
        className={`absolute bottom-0 left-0 right-0 rounded-b-lg pt-10 pb-2.5 px-3 transition-opacity duration-300 ${
          showControls || !isPlaying
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,.70) 0%, rgba(0,0,0,.35) 60%, transparent 100%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bar */}
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

        {/* Bottom row */}
        <div className="flex items-center gap-2.5">
          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
            className="text-white/90 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61A75E]"
          >
            {isPlaying ? (
              <Pause size={20} />
            ) : (
              <Play size={20} fill="currentColor" />
            )}
          </button>

          {/* Time */}
          <span className="text-white/70 text-xs tabular-nums select-none whitespace-nowrap">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className="flex-1" />

          {/* Volume (desktop only) */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
            className="hidden md:block text-white/90 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61A75E]"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          {/* Fullscreen (desktop only) */}
          {fullscreenSupported && (
            <button
              onClick={toggleFullscreenCb}
              aria-label={
                isFullscreen
                  ? "Salir de pantalla completa"
                  : "Pantalla completa"
              }
              className="hidden md:block text-white/90 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61A75E]"
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
