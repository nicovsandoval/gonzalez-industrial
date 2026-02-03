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
  image: string;
  title: string;
  category: string;
  badge?: string;
  whatsappMessage: string;
}

export const products: Product[] = [
  {
    image: "/media/products/piezas-mecanizadas.avif",
    title: "Piezas Mecanizadas",
    category: "Mecanizado",
    badge: "Personalizable",
    whatsappMessage:
      "Hola, quiero cotizar piezas mecanizadas: ejes, bujes, tornillos especiales, casquillos y componentes a medida.",
  },
  {
    image: "/media/products/estructuras-metalicas.avif",
    title: "Piñones y Coronas",
    category: "Transmisión",
    badge: "Personalizable",
    whatsappMessage:
      "Hola, necesito cotización para fabricación o reparación de piñones, coronas y engranajes industriales.",
  },
  {
    image: "/media/products/componentes-industriales.avif",
    title: "Poleas Industriales",
    category: "Transmisión",
    badge: "Personalizable",
    whatsappMessage:
      "Hola, quiero cotizar poleas para transmisión y maquinaria industrial.",
  },
  {
    image: "/media/products/ejes-y-bujes.avif",
    title: "Cadenas Industriales",
    category: "Transmisión",
    badge: "Personalizable",
    whatsappMessage:
      "Hola, necesito cotización para fabricación, reparación o ensamble de cadenas industriales.",
  },
  {
    image: "/media/products/soportes-bases.avif",
    title: "Componentes Especiales",
    category: "Fabricación a medida",
    badge: "Personalizable",
    whatsappMessage:
      "Hola, quiero cotizar piezas únicas fabricadas según muestra o requerimiento específico.",
  },
  {
    image: "/media/products/prototipos.avif",
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
export interface GalleryItem {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  /** Aspect: "square" | "tall" | "wide" para masonry */
  aspect?: "square" | "tall" | "wide";
}

export const galleryItems: GalleryItem[] = [
  {
    type: "image",
    src: "/media/gallery/taller-01.jpg",
    alt: "Vista general del taller",
    aspect: "wide",
  },
  {
    type: "image",
    src: "/media/gallery/torno-cnc.jpg",
    alt: "Torno CNC en operación",
    aspect: "tall",
  },
  {
    type: "image",
    src: "/media/gallery/soldadura.jpg",
    alt: "Proceso de soldadura",
    aspect: "square",
  },
  {
    type: "video",
    src: "/media/gallery/proceso-corte.mp4",
    poster: "/media/gallery/proceso-corte-poster.jpg",
    alt: "Proceso de corte por plasma",
    aspect: "wide",
  },
  {
    type: "image",
    src: "/media/gallery/piezas-terminadas.jpg",
    alt: "Piezas terminadas",
    aspect: "square",
  },
  {
    type: "image",
    src: "/media/gallery/equipo-trabajo.jpg",
    alt: "Equipo de trabajo",
    aspect: "tall",
  },
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
