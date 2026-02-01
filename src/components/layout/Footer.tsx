import { navLinks, contact, footer } from "../../data/siteData";
import { Logo } from "../ui/Logo";

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-neutral-400 border-t border-transparent dark:border-neutral-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Logo context="footer" isDark={true} className="h-10 w-auto" />
            <p className="mt-4 text-sm leading-relaxed">
              Maquila y soluciones industriales a medida. Fabricación,
              mantenimiento y procesos metalmecánicos con calidad y
              cumplimiento.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-oswald text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navegación
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-[#61A75E] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-oswald text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contacto
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="hover:text-[#61A75E] transition-colors"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-[#61A75E] transition-colors"
                >
                  {contact.email}
                </a>
              </li>
              <li>{contact.address}</li>
              <li className="text-neutral-500 text-xs mt-2">
                {contact.schedule}
              </li>
            </ul>
            {footer.socialLinks.length > 0 && (
              <div className="flex gap-3 mt-4">
                {footer.socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-500 hover:text-[#61A75E] transition-colors capitalize text-sm"
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">{footer.copyright}</p>
          <a
            href="/politica-de-privacidad"
            className="text-xs hover:text-[#61A75E] transition-colors"
          >
            Política de privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}
