/**
 * ============================================================
 * GONZALEZ INDUSTRIAL — Datos editables del sitio
 * ============================================================
 *
 * Edita este archivo para cambiar textos, teléfonos, servicios,
 * productos, pasos del proceso, galería y más.
 *
 * Todos los assets de media van en /public/media/
 * Los logos van en /src/assets/logos/
 */

// ─── Contacto y WhatsApp ───────────────────────────────────
export const contact = {
  /** Número con código de país, sin + ni espacios */
  whatsappNumber: "573167417150",
  /** Mensaje predeterminado al abrir WhatsApp */
  whatsappDefaultMessage:
    "Hola Gonzalez Industrial, quiero cotizar un servicio.",
  /** Correo electrónico de contacto */
  email: "tallergonzalez1949@gmail.com",
  /** Teléfono visible (formato libre) */
  phone: "+57 316 7417150",
  /** Dirección física */
  address: "Taller Industrial Gonzalez, Bucaramanga, Colombia",
  /** Google Maps embed URL (reemplazar con la real) */
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.9730524156303!2d-73.1289877!3d7.1291136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e68157bd535c89b%3A0x4f86dc836aef6450!2sTaller%20Industrial%20Gonzalez!5e0!3m2!1ses-419!2sco!4v1769978431995!5m2!1ses-419!2sco",
  /** Horario de atención */
  schedule: "Lunes a Viernes: 7:30 AM – 6:15 PM | Sábados: 7:30 AM – 1:00 PM",
};

/** Genera link de WhatsApp con mensaje personalizado */
export function getWhatsAppUrl(customMessage?: string): string {
  const msg = encodeURIComponent(
    customMessage ?? contact.whatsappDefaultMessage
  );
  return `https://wa.me/${contact.whatsappNumber}?text=${msg}`;
}

// ─── Navegación ────────────────────────────────────────────
export const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Productos", href: "#productos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Galería", href: "#galeria" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

// ─── Hero ──────────────────────────────────────────────────
export const hero = {
  title: "Maquila y soluciones metalmecánicas a medida",
  subtitle:
    "Fabricación, mantenimiento y mecanizado industrial con precisión, calidad y cumplimiento.",
  /** Versión corta del subtítulo para viewports de poca altura */
  subtitleCompact:
    "Mecanizado industrial con precisión, calidad y cumplimiento.",
  ctaPrimary: "Cotizar ahora",
  ctaSecondary: "Ver servicios",
  chips: ["Respuesta rápida", "Calidad garantizada", "Entrega a tiempo"],
  /** Video de fondo (mp4) — dejar vacío para usar solo imagen */
  videoBg: "/media/hero-video.mp4",
  /** Imagen de fondo (fallback si no hay video) */
  imageBg: "/media/hero-bg.jpg",
};

// ─── Servicios ─────────────────────────────────────────────
export interface Service {
  icon: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    icon: "Factory",
    title: "Maquila Industrial",
    description:
      "Producción de piezas y componentes a medida según requerimientos del cliente.",
  },
  {
    icon: "CircleDot",
    title: "Tornería Convencional",
    description:
      "Servicio de torno para ejes, bujes, roscas, piñones y piezas cilíndricas.",
  },
  {
    icon: "Flame",
    title: "Soldadura General",
    description:
      "Soldadura eléctrica y MIG para estructuras, refuerzos y reparación de piezas.",
  },
  {
    icon: "Scissors",
    title: "Taladro y Mecanizado",
    description:
      "Perforado, ranurado y ajustes mecánicos en diferentes materiales.",
  },
  {
    icon: "Wrench",
    title: "Fresadora",
    description:
      "Mecanizado de superficies, chaveteros y geometrías especiales.",
  },
  {
    icon: "Cog",
    title: "Mantenimiento Industrial y Agrícola",
    description:
      "Reparación y mantenimiento de maquinaria industrial y agrícola.",
  },
];

// ─── Productos / Capacidades ───────────────────────────────
export interface Product {
  /** AVIF image (primary, modern browsers) */
  imageAvif: string;
  /** WebP image (fallback) */
  imageWebp: string;
  /** Alt text for the product image */
  alt: string;
  title: string;
  category: string;
  badge?: string;
  whatsappMessage: string;
}

/**
 * Productos del taller — edita imageAvif/imageWebp/alt para actualizar las fotos.
 * Los archivos deben existir en /public/media/products/
 */
export const products: Product[] = [
  {
    imageAvif: "/media/products/piezas-mecanizadas.avif",
    imageWebp: "/media/products/piezas-mecanizadas.webp",
    alt: "Piezas mecanizadas a medida",
    title: "Piezas Mecanizadas",
    category: "Mecanizado",
    badge: "Personalizable",
    whatsappMessage:
      "Hola, quiero cotizar piezas mecanizadas: ejes, bujes, tornillos especiales, casquillos y componentes a medida.",
  },
  {
    imageAvif: "/media/products/estructuras-metalicas.avif",
    imageWebp: "/media/products/estructuras-metalicas.webp",
    alt: "Piñones y coronas industriales",
    title: "Piñones y Coronas",
    category: "Transmisión",
    badge: "Personalizable",
    whatsappMessage:
      "Hola, necesito cotización para fabricación o reparación de piñones, coronas y engranajes industriales.",
  },
  {
    imageAvif: "/media/products/componentes-industriales.avif",
    imageWebp: "/media/products/componentes-industriales.webp",
    alt: "Poleas industriales para transmisión",
    title: "Poleas Industriales",
    category: "Transmisión",
    badge: "Personalizable",
    whatsappMessage:
      "Hola, quiero cotizar poleas para transmisión y maquinaria industrial.",
  },
  {
    imageAvif: "/media/products/ejes-y-bujes.avif",
    imageWebp: "/media/products/ejes-y-bujes.webp",
    alt: "Cadenas industriales",
    title: "Cadenas Industriales",
    category: "Transmisión",
    badge: "Personalizable",
    whatsappMessage:
      "Hola, necesito cotización para fabricación, reparación o ensamble de cadenas industriales.",
  },
  {
    imageAvif: "/media/products/soportes-bases.avif",
    imageWebp: "/media/products/soportes-bases.webp",
    alt: "Componentes especiales fabricados a medida",
    title: "Componentes Especiales",
    category: "Fabricación a medida",
    badge: "Personalizable",
    whatsappMessage:
      "Hola, quiero cotizar piezas únicas fabricadas según muestra o requerimiento específico.",
  },
  {
    imageAvif: "/media/products/prototipos.avif",
    imageWebp: "/media/products/prototipos.webp",
    alt: "Prototipos y piezas a medida",
    title: "Prototipos y Piezas a Medida",
    category: "Desarrollo",
    badge: "A medida",
    whatsappMessage:
      "Hola, me interesa desarrollar piezas únicas o series cortas según necesidad.",
  },
];

// ─── Proceso de Trabajo ────────────────────────────────────
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Diagnóstico",
    description:
      "Evaluamos su necesidad, revisamos planos o muestras y definimos los requerimientos técnicos.",
    icon: "ClipboardCheck",
  },
  {
    step: 2,
    title: "Propuesta",
    description:
      "Presentamos cotización detallada con tiempos, materiales y condiciones claras.",
    icon: "FileText",
  },
  {
    step: 3,
    title: "Producción",
    description:
      "Ejecutamos el trabajo con maquinaria adecuada y personal calificado.",
    icon: "Hammer",
  },
  {
    step: 4,
    title: "Control de Calidad",
    description:
      "Verificamos medidas, acabados y funcionalidad antes de la entrega.",
    icon: "ShieldCheck",
  },
  {
    step: 5,
    title: "Entrega",
    description:
      "Entregamos en los tiempos pactados con soporte postventa.",
    icon: "PackageCheck",
  },
];

// ─── Galería ───────────────────────────────────────────────
/**
 * Cada item de la galería. Para editar:
 *  - Renombra los archivos y actualiza srcAvif/srcWebp (o srcMp4/posterAvif/posterWebp).
 *  - Cambia alt y caption cuando el dueño confirme qué muestra cada foto.
 *  - aspect controla la proporción en el mosaico masonry: "square" | "tall" | "wide".
 *
 * Los primeros 8 items se muestran en el preview. El 9.° tile muestra "+N".
 */
export interface GalleryItem {
  id: string;
  type: "image" | "video";
  /** AVIF source (images) */
  srcAvif?: string;
  /** WebP source (images, fallback) */
  srcWebp?: string;
  /** MP4 source (videos) */
  srcMp4?: string;
  /** Video poster AVIF */
  posterAvif?: string;
  /** Video poster WebP (fallback) */
  posterWebp?: string;
  alt: string;
  /** Caption shown only in lightbox */
  caption: string;
  /** Aspect for masonry: "square" | "tall" | "wide" */
  aspect: "square" | "tall" | "wide";
}

/** Cuántos items se muestran en el preview del mosaico (sin contar el tile "+N") */
export const GALLERY_FEATURED_COUNT = 8;

export const galleryItems: GalleryItem[] = [
  // ── Primeros 8: visibles en el mosaico / carrusel ──────
  { id: "img-1",   type: "image", srcAvif: "/media/gallery/1.avif",  srcWebp: "/media/gallery/1.webp",  alt: "Foto 1",  caption: "Foto 1",  aspect: "wide" },
  { id: "img-3",   type: "image", srcAvif: "/media/gallery/3.avif",  srcWebp: "/media/gallery/3.webp",  alt: "Foto 3",  caption: "Foto 3",  aspect: "tall" },
  { id: "img-4",   type: "image", srcAvif: "/media/gallery/4.avif",  srcWebp: "/media/gallery/4.webp",  alt: "Foto 4",  caption: "Foto 4",  aspect: "square" },
  { id: "video-1", type: "video", srcMp4: "/media/gallery/1.mp4",   posterAvif: "/media/gallery/5.avif", posterWebp: "/media/gallery/5.webp", alt: "Video del taller 1", caption: "Video 1", aspect: "wide" },
  { id: "img-6",   type: "image", srcAvif: "/media/gallery/6.avif",  srcWebp: "/media/gallery/6.webp",  alt: "Foto 6",  caption: "Foto 6",  aspect: "tall" },
  { id: "img-7",   type: "image", srcAvif: "/media/gallery/7.avif",  srcWebp: "/media/gallery/7.webp",  alt: "Foto 7",  caption: "Foto 7",  aspect: "square" },
  { id: "img-8",   type: "image", srcAvif: "/media/gallery/8.avif",  srcWebp: "/media/gallery/8.webp",  alt: "Foto 8",  caption: "Foto 8",  aspect: "wide" },
  { id: "video-2", type: "video", srcMp4: "/media/gallery/2.mp4",   posterAvif: "/media/gallery/9.avif", posterWebp: "/media/gallery/9.webp", alt: "Video del taller 2", caption: "Video 2", aspect: "square" },

  // ── Resto: visibles solo en el lightbox (a partir del tile "+N") ──
  { id: "img-2",   type: "image", srcAvif: "/media/gallery/2.avif",  srcWebp: "/media/gallery/2.webp",  alt: "Foto 2",  caption: "Foto 2",  aspect: "square" },
  { id: "img-5",   type: "image", srcAvif: "/media/gallery/5.avif",  srcWebp: "/media/gallery/5.webp",  alt: "Foto 5",  caption: "Foto 5",  aspect: "wide" },
  { id: "img-9",   type: "image", srcAvif: "/media/gallery/9.avif",  srcWebp: "/media/gallery/9.webp",  alt: "Foto 9",  caption: "Foto 9",  aspect: "tall" },
  { id: "img-10",  type: "image", srcAvif: "/media/gallery/10.avif", srcWebp: "/media/gallery/10.webp", alt: "Foto 10", caption: "Foto 10", aspect: "square" },
  { id: "img-11",  type: "image", srcAvif: "/media/gallery/11.avif", srcWebp: "/media/gallery/11.webp", alt: "Foto 11", caption: "Foto 11", aspect: "wide" },
  { id: "img-12",  type: "image", srcAvif: "/media/gallery/12.avif", srcWebp: "/media/gallery/12.webp", alt: "Foto 12", caption: "Foto 12", aspect: "square" },
  { id: "img-13",  type: "image", srcAvif: "/media/gallery/13.avif", srcWebp: "/media/gallery/13.webp", alt: "Foto 13", caption: "Foto 13", aspect: "tall" },
  { id: "img-14",  type: "image", srcAvif: "/media/gallery/14.avif", srcWebp: "/media/gallery/14.webp", alt: "Foto 14", caption: "Foto 14", aspect: "square" },
  { id: "img-15",  type: "image", srcAvif: "/media/gallery/15.avif", srcWebp: "/media/gallery/15.webp", alt: "Foto 15", caption: "Foto 15", aspect: "wide" },
  { id: "img-16",  type: "image", srcAvif: "/media/gallery/16.avif", srcWebp: "/media/gallery/16.webp", alt: "Foto 16", caption: "Foto 16", aspect: "square" },
  { id: "img-17",  type: "image", srcAvif: "/media/gallery/17.avif", srcWebp: "/media/gallery/17.webp", alt: "Foto 17", caption: "Foto 17", aspect: "tall" },
  { id: "img-18",  type: "image", srcAvif: "/media/gallery/18.avif", srcWebp: "/media/gallery/18.webp", alt: "Foto 18", caption: "Foto 18", aspect: "square" },
  { id: "img-19",  type: "image", srcAvif: "/media/gallery/19.avif", srcWebp: "/media/gallery/19.webp", alt: "Foto 19", caption: "Foto 19", aspect: "wide" },
];

// ─── Nosotros ──────────────────────────────────────────────
export const about = {
  title: "Sobre Gonzalez Industrial",
  description:
    "Somos un taller metalmecánico con experiencia en mecanizado, soldadura y mantenimiento industrial y agrícola. Trabajamos piezas a medida con compromiso, calidad y cumplimiento.",
  highlights: [
    {
      icon: "Award",
      title: "Experiencia en Taller",
      description:
        "Años de trabajo en torno, fresadora y maquinaria convencional.",
    },
    {
      icon: "ShieldCheck",
      title: "Calidad en Cada Pieza",
      description:
        "Cuidado en medidas, acabados y funcionamiento de cada trabajo.",
    },
    {
      icon: "Cpu",
      title: "Maquinaria Convencional",
      description:
        "Torno, fresadora, taladro y prensa hidráulica.",
    },
    {
      icon: "Headset",
      title: "Atención Directa",
      description:
        "Trato directo con el cliente y trabajo según necesidad real.",
    },
  ],
  /** Certificaciones/sellos */
  certifications: [
    "Seguridad industrial",
    "Control dimensional",
    "Buenas prácticas de taller",
  ],
};

// ─── CTA Banner ────────────────────────────────────────────
export const ctaBanner = {
  title: "¿Tiene un proyecto industrial en mente?",
  subtitle:
    "Contáctenos hoy y reciba una cotización sin compromiso. Respuesta rápida garantizada.",
  ctaLabel: "Cotizar por WhatsApp",
};

// ─── Footer ────────────────────────────────────────────────
export const footer = {
  copyright: `© ${new Date().getFullYear()} Gonzalez Industrial. Todos los derechos reservados.`,
  socialLinks: [
    { platform: "instagram", url: "https://www.instagram.com/tallerindustrialgonzalez1949/" },
    { platform: "facebook", url: "https://www.facebook.com/tallerindustrial.gonzalez" },
  ] as { platform: string; url: string }[],
};
