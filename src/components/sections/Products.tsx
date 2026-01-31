import { MessageCircle } from "lucide-react";
import { products, getWhatsAppUrl } from "../../data/siteData";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useEffect, useRef, useState } from "react";

export function Products() {
  return (
    <section id="productos" className="py-20 md:py-28 bg-white dark:bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Productos y Capacidades"
          subtitle="Fabricamos a medida según sus necesidades. Sin catálogo fijo: cada pieza es un proyecto único."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.title} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className="group bg-neutral-50 dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md dark:shadow-none border border-neutral-200 dark:border-neutral-700 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Placeholder on error
            const el = e.target as HTMLImageElement;
            el.style.display = "none";
          }}
        />
        {/* Placeholder when no image */}
        <div className="absolute inset-0 flex items-center justify-center text-neutral-400 dark:text-neutral-500">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-neutral-300 dark:bg-neutral-600 flex items-center justify-center">
              <span className="text-2xl font-oswald font-bold">GI</span>
            </div>
            <p className="text-xs">{product.title}</p>
          </div>
        </div>

        {product.badge && (
          <div className="absolute top-3 right-3">
            <Badge variant="accent">{product.badge}</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="text-xs font-medium text-[#61A75E] uppercase tracking-wider">
          {product.category}
        </span>
        <h3 className="mt-1 font-oswald text-lg font-semibold text-[#1A1A1A] dark:text-white uppercase tracking-wide">
          {product.title}
        </h3>
        <Button
          as="a"
          href={getWhatsAppUrl(product.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="sm"
          className="mt-4 w-full"
        >
          <MessageCircle size={16} />
          Solicitar cotización
        </Button>
      </div>
    </div>
  );
}
