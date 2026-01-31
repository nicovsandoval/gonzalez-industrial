import { MessageCircle, Phone, Clock } from "lucide-react";
import { ctaBanner, contact, getWhatsAppUrl } from "../../data/siteData";
import { Button } from "../ui/Button";

export function CtaBanner() {
  return (
    <section className="relative py-16 md:py-20 bg-[#15401A] overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 11px)",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-oswald text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide">
          {ctaBanner.title}
        </h2>
        <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
          {ctaBanner.subtitle}
        </p>

        <div className="mt-8">
          <Button
            as="a"
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
          >
            <MessageCircle size={22} />
            {ctaBanner.ctaLabel}
          </Button>
        </div>

        {/* Info pills */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/70 text-sm">
          <span className="flex items-center gap-2">
            <Phone size={16} />
            {contact.phone}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={16} />
            {contact.schedule}
          </span>
        </div>
      </div>
    </section>
  );
}
