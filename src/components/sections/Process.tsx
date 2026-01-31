import { processSteps } from "../../data/siteData";
import { SectionHeading } from "../ui/SectionHeading";
import { Icon } from "../ui/Icon";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useEffect, useRef, useState } from "react";

export function Process() {
  return (
    <section
      id="proceso"
      className="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Nuestro Proceso"
          subtitle="Trabajamos con un proceso claro y organizado para garantizar resultados."
        />

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-300 dark:bg-neutral-700 md:-translate-x-px" />

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <ProcessStepCard
                key={step.step}
                step={step}
                index={index}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStepCard({
  step,
  index,
  isEven,
}: {
  step: (typeof processSteps)[0];
  index: number;
  isEven: boolean;
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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-4 md:gap-0 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`,
      }}
    >
      {/* Circle on the line */}
      <div className="absolute left-6 md:left-1/2 w-12 h-12 -translate-x-1/2 bg-[#15401A] dark:bg-[#61A75E] rounded-full flex items-center justify-center text-white font-oswald font-bold text-sm z-10 shadow-md">
        {step.step}
      </div>

      {/* Content card */}
      <div
        className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
          isEven ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
        }`}
      >
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 shadow-sm border border-neutral-200 dark:border-neutral-700">
          <div
            className={`flex items-center gap-2 mb-2 ${
              isEven ? "md:justify-end" : "md:justify-start"
            }`}
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#15401A]/10 dark:bg-[#61A75E]/10 text-[#15401A] dark:text-[#61A75E]">
              <Icon name={step.icon} size={18} />
            </div>
            <h3 className="font-oswald text-lg font-semibold text-[#1A1A1A] dark:text-white uppercase tracking-wide">
              {step.title}
            </h3>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}
