import { about } from "../../data/siteData";
import { SectionHeading } from "../ui/SectionHeading";
import { Icon } from "../ui/Icon";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useEffect, useRef, useState } from "react";

export function About() {
  return (
    <section
      id="nosotros"
      className="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={about.title} />

        {/* Description */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {about.description}
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {about.highlights.map((item, index) => (
            <HighlightCard key={item.title} item={item} index={index} />
          ))}
        </div>

        {/* Certifications placeholder */}
        {about.certifications.length > 0 && (
          <div className="text-center">
            <h3 className="font-oswald text-xl font-semibold text-[#1A1A1A] dark:text-white uppercase tracking-wide mb-6">
              Certificaciones y Seguridad
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {about.certifications.map((cert) => (
                <div
                  key={cert}
                  className="px-6 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400"
                >
                  {/* PLACEHOLDER: Reemplazar con logos/sellos reales */}
                  {cert}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function HighlightCard({
  item,
  index,
}: {
  item: (typeof about.highlights)[0];
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
      className="text-center p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
    >
      <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-[#15401A]/10 dark:bg-[#61A75E]/10 text-[#15401A] dark:text-[#61A75E] mb-4">
        <Icon name={item.icon} size={28} />
      </div>
      <h4 className="font-oswald text-base font-semibold text-[#1A1A1A] dark:text-white uppercase tracking-wide mb-2">
        {item.title}
      </h4>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {item.description}
      </p>
    </div>
  );
}
