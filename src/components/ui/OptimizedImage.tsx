import { useState } from "react";
import type { ImgHTMLAttributes } from "react";

interface OptimizedImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "loading" | "decoding"> {
  src: string;
  alt: string;
  /**
   * Optional srcSet for responsive images.
   * Example: "/media/gallery/img-400w.jpg 400w, /media/gallery/img-800w.jpg 800w"
   *
   * When migrating to external storage (R2/S3), replace paths with CDN URLs:
   *   "https://cdn.example.com/img-400w.jpg 400w, https://cdn.example.com/img-800w.jpg 800w"
   */
  srcSet?: string;
  /**
   * Hint for the browser to pick the right source from srcSet.
   * Example: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
   */
  sizes?: string;
  /** Custom fallback when the image fails to load */
  fallback?: React.ReactNode;
}

/**
 * Image component with built-in performance best practices:
 * - loading="lazy" (native browser lazy loading)
 * - decoding="async" (non-blocking decode)
 * - Optional srcSet/sizes for responsive images
 * - Error state with customizable fallback
 */
export function OptimizedImage({
  src,
  alt,
  srcSet,
  sizes,
  fallback,
  className,
  onError,
  ...rest
}: OptimizedImageProps) {
  const [error, setError] = useState(false);

  if (error && fallback) return <>{fallback}</>;

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      srcSet={srcSet}
      sizes={sizes}
      className={className}
      onError={(e) => {
        setError(true);
        onError?.(e);
      }}
      {...rest}
    />
  );
}
