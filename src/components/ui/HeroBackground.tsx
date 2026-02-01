import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import {
  canAutoplayHeroVideo,
  getIsMobileHero,
  selectHeroMedia,
} from "../../utils/heroMedia";

export function HeroBackground() {
  const reducedMotion = useReducedMotion();
  const [media] = useState(() =>
    selectHeroMedia({
      isMobile: getIsMobileHero(),
      allowVideo: canAutoplayHeroVideo(reducedMotion),
    })
  );
  const [videoEnabled, setVideoEnabled] = useState(media.kind === "video");
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoEnabled) return;
    if (!videoRef.current) return;
    const playPromise = videoRef.current.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => setVideoEnabled(false));
    }
  }, [videoEnabled]);

  useEffect(() => {
    if (reducedMotion) setVideoEnabled(false);
  }, [reducedMotion]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <picture className="absolute inset-0 block">
        <source srcSet={media.image.avif} type="image/avif" />
        <source srcSet={media.image.webp} type="image/webp" />
        <img
          src={media.image.jpg}
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
      </picture>

      {videoEnabled && media.videoSrc && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={media.poster.jpg}
          onLoadedData={() => setVideoReady(true)}
          onError={() => setVideoEnabled(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={media.videoSrc} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 dark:from-black/70 dark:via-black/55 dark:to-black/80" />
    </div>
  );
}
