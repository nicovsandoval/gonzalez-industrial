import watermarkSrc from "../../assets/logos/isotipo.svg";

interface WatermarkProps {
  className?: string;
}

/**
 * Watermark del isotipo — se posiciona absolute bottom-right.
 * El contenedor padre debe tener `position: relative`.
 * Usa filter para convertir el logo a blanco + opacity baja.
 */
export function Watermark({ className = "" }: WatermarkProps) {
  return (
    <img
      src={watermarkSrc}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`absolute bottom-3 right-3 w-11 h-11 md:w-14 md:h-14 opacity-20 pointer-events-none select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] ${className}`}
      style={{ filter: "brightness(0) invert(1)" }}
    />
  );
}
