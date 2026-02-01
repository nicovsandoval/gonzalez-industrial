export type HeroImageSources = {
  avif: string;
  webp: string;
  jpg: string;
};

type HeroSet = {
  id: string;
  videoSrc?: string;
  imageBase: string;
  posterBase: string;
};

export type HeroMediaSelection = {
  id: string;
  kind: "video" | "image";
  videoSrc?: string;
  image: HeroImageSources;
  poster: HeroImageSources;
};

const desktopSets: HeroSet[] = [
  {
    id: "desktop-1",
    videoSrc: "/media/hero-video-1.mp4",
    imageBase: "/media/hero-bg-1",
    posterBase: "/media/hero-bg-1",
  },
  {
    id: "desktop-2",
    videoSrc: "/media/hero-video-2.mp4",
    imageBase: "/media/hero-bg-2",
    posterBase: "/media/hero-bg-2",
  },
  {
    id: "desktop-3",
    videoSrc: "/media/hero-video-3.mp4",
    imageBase: "/media/hero-bg-3",
    posterBase: "/media/hero-bg-3",
  },
  {
    id: "desktop-4",
    imageBase: "/media/hero-bg-4",
    posterBase: "/media/hero-bg-4",
  },
];

const mobileSets: HeroSet[] = [
  {
    id: "mobile-1",
    videoSrc: "/media/hero-video-vertical-1.mp4",
    imageBase: "/media/hero-bg-vertical-1",
    posterBase: "/media/hero-bg-vertical-1",
  },
  {
    id: "mobile-2",
    videoSrc: "/media/hero-video-vertical-2.mp4",
    imageBase: "/media/hero-bg-vertical-2",
    posterBase: "/media/hero-bg-vertical-2",
  },
  {
    id: "mobile-3",
    videoSrc: "/media/hero-video-vertical-3.mp4",
    imageBase: "/media/hero-bg-vertical-2",
    posterBase: "/media/hero-bg-vertical-2",
  },
];

function makeImageSources(base: string): HeroImageSources {
  return {
    avif: `${base}.avif`,
    webp: `${base}.webp`,
    jpg: `${base}.jpg`,
  };
}

function pickRandomSet(isMobile: boolean): HeroSet {
  const sets = isMobile ? mobileSets : desktopSets;
  const index = Math.floor(Math.random() * sets.length);
  return sets[index];
}

export function getIsMobileHero(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches;
}

export function canAutoplayHeroVideo(reducedMotion: boolean): boolean {
  if (reducedMotion) return false;
  if (typeof navigator === "undefined") return true;

  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;

  if (connection?.saveData) return false;
  const effectiveType = connection?.effectiveType;
  if (effectiveType === "slow-2g" || effectiveType === "2g") return false;
  return true;
}

export function selectHeroMedia(options: {
  isMobile: boolean;
  allowVideo: boolean;
}): HeroMediaSelection {
  const set = pickRandomSet(options.isMobile);
  const image = makeImageSources(set.imageBase);
  const poster = makeImageSources(set.posterBase);
  const canUseVideo = options.allowVideo && Boolean(set.videoSrc);

  return {
    id: set.id,
    kind: canUseVideo ? "video" : "image",
    videoSrc: canUseVideo ? set.videoSrc : undefined,
    image,
    poster,
  };
}
