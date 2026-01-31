import { services } from "../../data/siteData";
import { SectionHeading } from "../ui/SectionHeading";
import { Icon } from "../ui/Icon";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useEffect, useRef, useState } from "react";

export function Services() {
  return (
    <section
      id="servicios"
      className="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Nuestros Servicios"
          subtitle="Soluciones metalmecánicas integrales para su industria."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
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
      className="group bg-white dark:bg-neutral-800 rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md dark:shadow-none dark:hover:bg-neutral-750 border border-neutral-200 dark:border-neutral-700 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#15401A]/10 dark:bg-[#61A75E]/10 text-[#15401A] dark:text-[#61A75E] mb-4 group-hover:bg-[#15401A] group-hover:text-white dark:group-hover:bg-[#61A75E] dark:group-hover:text-white transition-colors duration-300">
        <Icon name={service.icon} size={24} />
      </div>
      <h3 className="font-oswald text-lg font-semibold text-[#1A1A1A] dark:text-white uppercase tracking-wide mb-2">
        {service.title}
      </h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {service.description}
      </p>
    </div>
  );
}
