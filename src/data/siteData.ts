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
  whatsappNumber: "57XXXXXXXXXX",
  /** Mensaje predeterminado al abrir WhatsApp */
  whatsappDefaultMessage:
    "Hola Gonzalez Industrial, quiero cotizar un servicio.",
  /** Correo electrónico de contacto */
  email: "contacto@gonzalezindustrial.com",
  /** Teléfono visible (formato libre) */
  phone: "+57 XXX XXX XXXX",
  /** Dirección física */
  address: "Zona Industrial, Bogotá, Colombia",
  /** Google Maps embed URL (reemplazar con la real) */
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.0!2d-74.08!3d4.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMzknMDAuMCJOIDc0wrAwNCc0OC4wIlc!5e0!3m2!1ses!2sco!4v1700000000000",
  /** Horario de atención */
  schedule: "Lunes a Viernes: 7:00 AM – 5:00 PM | Sábados: 8:00 AM – 12:00 M",
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
  title: "Maquila y soluciones industriales a medida",
  subtitle:
    "Fabricación, mantenimiento y procesos metalmecánicos con calidad y cumplimiento.",
  /** Versión corta del subtítulo para viewports de poca altura */
  subtitleCompact:
    "Fabricación y procesos metalmecánicos con calidad y cumplimiento.",
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
      "Producción en serie y por lote con procesos estandarizados para optimizar costos y tiempos.",
  },
  {
    icon: "CircleDot",
    title: "Tornería CNC",
    description:
      "Mecanizado de precisión en torno convencional y CNC para piezas con tolerancias estrictas.",
  },
  {
    icon: "Flame",
    title: "Soldadura Especializada",
    description:
      "Soldadura MIG, TIG y electrodo en acero, inoxidable y aluminio con certificación de calidad.",
  },
  {
    icon: "Scissors",
    title: "Corte y Conformado",
    description:
      "Corte por plasma, oxicorte y cizalla para láminas y perfiles de distintos espesores.",
  },
  {
    icon: "Wrench",
    title: "Mantenimiento Industrial",
    description:
      "Mantenimiento preventivo y correctivo de maquinaria, equipos y estructuras metálicas.",
  },
  {
    icon: "Cog",
    title: "Fabricación de Piezas",
    description:
      "Diseño y fabricación de componentes a medida según planos o muestras del cliente.",
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
    image: "/media/products/piezas-mecanizadas.jpg",
    title: "Piezas Mecanizadas",
    category: "Componentes",
    badge: "Personalizable",
    whatsappMessage:
      "Hola, quiero cotizar piezas mecanizadas a medida.",
  },
  {
    image: "/media/products/estructuras-metalicas.jpg",
    title: "Estructuras Metálicas",
    category: "Estructuras",
    badge: "Personalizable",
    whatsappMessage:
      "Hola, necesito cotización para estructuras metálicas.",
  },
  {
    image: "/media/products/componentes-industriales.jpg",
    title: "Componentes Industriales",
    category: "Componentes",
    badge: "Personalizable",
    whatsappMessage:
      "Hola, quiero cotizar componentes industriales.",
  },
  {
    image: "/media/products/ejes-y-bujes.jpg",
    title: "Ejes y Bujes",
    category: "Piezas de precisión",
    badge: "Personalizable",
    whatsappMessage: "Hola, necesito cotización para ejes y bujes.",
  },
  {
    image: "/media/products/soportes-bases.jpg",
    title: "Soportes y Bases",
    category: "Estructuras",
    badge: "Personalizable",
    whatsappMessage:
      "Hola, quiero cotizar soportes y bases metálicas.",
  },
  {
    image: "/media/products/prototipos.jpg",
    title: "Prototipos y Series Cortas",
    category: "Desarrollo",
    badge: "A medida",
    whatsappMessage:
      "Hola, me interesa desarrollar un prototipo o serie corta.",
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
    "Somos un taller metalmecánico con amplia experiencia en fabricación, mantenimiento y maquila industrial. Trabajamos con compromiso, calidad y cumplimiento para ofrecer soluciones reales a la industria colombiana.",
  highlights: [
    {
      icon: "Award",
      title: "Experiencia comprobada",
      description:
        "Años de trayectoria resolviendo retos industriales con profesionalismo.",
    },
    {
      icon: "ShieldCheck",
      title: "Calidad rigurosa",
      description:
        "Control de calidad en cada etapa del proceso productivo.",
    },
    {
      icon: "Cpu",
      title: "Maquinaria adecuada",
      description:
        "Equipos convencionales y CNC para diversos tipos de trabajo.",
    },
    {
      icon: "Headset",
      title: "Soporte constante",
      description:
        "Acompañamiento técnico y atención personalizada de principio a fin.",
    },
  ],
  /** Certificaciones/sellos (placeholder — reemplazar con reales) */
  certifications: [
    "Seguridad Industrial",
    "Control de Calidad",
    "Buenas Prácticas de Manufactura",
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
    // Descomentar y completar si aplica:
    // { platform: "facebook", url: "https://facebook.com/..." },
    // { platform: "instagram", url: "https://instagram.com/..." },
  ] as { platform: string; url: string }[],
};
