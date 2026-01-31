# Gonzalez Industrial — Sitio Web

Sitio web tipo landing page para el taller industrial **Gonzalez Industrial**. React + TypeScript + Vite + Tailwind CSS v4.

## Requisitos

- Node.js >= 18
- npm >= 9

## Instalación

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173).

## Build de producción

```bash
npm run build
```

Los archivos se generan en `dist/`. Para previsualizar:

```bash
npm run preview
```

## Deploy

Compatible con Netlify, Vercel y Cloudflare Pages.

- **Netlify**: Framework preset "Vite", build command `npm run build`, publish directory `dist`.
- **Vercel**: Auto-detecta Vite.
- **Cloudflare Pages**: Build command `npm run build`, output directory `dist`.

### Netlify Forms

El formulario de contacto incluye los atributos `data-netlify="true"` y `name="contacto"`. En Netlify esto activa la captura de formularios automáticamente. Fuera de Netlify, el formulario usa `mailto:` como fallback.

---

## Cómo editar contenido

Todo el contenido editable está en un solo archivo:

```
src/data/siteData.ts
```

### WhatsApp

1. Abrir `siteData.ts`
2. Cambiar `whatsappNumber` por el número real (formato: `57XXXXXXXXXX`, sin + ni espacios)
3. Cambiar `whatsappDefaultMessage` por el mensaje deseado

### Teléfono, correo y dirección

En el objeto `contact` de `siteData.ts`:
- `phone`: número visible en el sitio
- `email`: correo de contacto
- `address`: dirección física
- `schedule`: horario de atención

### Servicios

Array `services` en `siteData.ts`. Cada servicio tiene:
- `icon`: nombre del icono de [lucide-react](https://lucide.dev/icons/) (PascalCase)
- `title`: título del servicio
- `description`: descripción corta

### Productos

Array `products` en `siteData.ts`. Cada producto tiene:
- `image`: ruta a la imagen en `/public/media/products/`
- `title`, `category`, `badge`
- `whatsappMessage`: mensaje prellenado para cotización

### Galería

Array `galleryItems` en `siteData.ts`. Soporta imágenes y videos:
- `type`: `"image"` o `"video"`
- `src`: ruta al archivo en `/public/media/gallery/`
- `poster`: (solo video) imagen de poster
- `aspect`: `"square"` | `"tall"` | `"wide"` para el grid masonry

---

## Cómo cambiar logos

Los logos se esperan en:

```
src/assets/logos/
├── logo-horizontal.png
├── logo-vertical.png
└── isotipo.png
```

El `isotipo.png` se usa en el header. Reemplazarlos con archivos reales.

---

## Media (fotos y videos)

Todas las imágenes y videos van en:

```
public/media/
├── hero-bg.jpg          ← Fondo del hero (1920x1080 recomendado)
├── hero-video.mp4       ← Video de fondo (opcional)
├── og-image.jpg         ← Imagen para compartir en redes (1200x630)
├── products/            ← Fotos de productos (800x600 recomendado)
└── gallery/             ← Fotos y videos de galería
```

### Recomendaciones para optimizar imágenes

1. **Formato**: Usar WebP o AVIF para fotos (con fallback JPG). Los navegadores modernos los soportan.
2. **Tamaño**:
   - Hero: max 1920px de ancho, calidad 80%
   - Products: max 800px de ancho, calidad 80%
   - Gallery: max 1200px de ancho, calidad 80%
   - OG Image: exactamente 1200x630px
3. **Herramientas**: [Squoosh](https://squoosh.app/), [Sharp](https://sharp.pixelplumbing.com/), o ImageOptim.
4. **Peso objetivo**: < 200KB por imagen, < 100KB para thumbnails.

### Recomendaciones para videos

1. **Formato**: MP4 con codec H.264 para máxima compatibilidad.
2. **Resolución**: 1080p máximo, 720p preferible para web.
3. **Duración**: Hero video < 30 segundos, sin audio (el video del hero está muteado).
4. **Compresión**: Usar [HandBrake](https://handbrake.fr/) o FFmpeg:
   ```bash
   ffmpeg -i input.mp4 -vcodec h264 -acodec aac -crf 28 -preset slow -movflags +faststart output.mp4
   ```
5. **Poster**: Crear una imagen JPG del primer frame como poster para carga rápida.
6. **Peso objetivo**: < 5MB para hero video, < 3MB para galería.

---

## Estructura del proyecto

```
src/
├── assets/logos/         → Logos del taller
├── components/
│   ├── layout/           → Header, Footer
│   ├── sections/         → Hero, Services, Products, Process, Gallery, About, CtaBanner, Contact
│   └── ui/               → Button, Badge, Icon, ThemeToggle, WhatsAppFloat, Lightbox, SectionHeading
├── data/
│   └── siteData.ts       → TODO el contenido editable
├── hooks/                → useTheme, useScrollSpy, useReducedMotion
├── styles/
│   └── index.css         → Tailwind imports y tokens
├── App.tsx               → Composición de secciones
└── main.tsx              → Entry point
```

## Modo oscuro

- Automático por sistema (`prefers-color-scheme`)
- Toggle manual en el header
- Persistencia en `localStorage`
- Script inline en `index.html` evita parpadeo al cargar

## Accesibilidad

- Skip to content link
- Contraste AA en textos principales
- Labels correctos en formulario
- Focus visible en todos los elementos interactivos
- `prefers-reduced-motion` respetado (sin animaciones si el usuario lo prefiere)
- Navegación por teclado completa en lightbox (Escape, flechas)

## Tecnologías

- [React 19](https://react.dev/) + TypeScript
- [Vite 6](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (iconos)
