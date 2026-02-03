import { useState } from "react";
import { MessageCircle, Mail, MapPin, Send } from "lucide-react";
import { contact, getWhatsAppUrl } from "../../data/siteData";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";

interface FormData {
  name: string;
  company: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  message?: string;
}

export function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "",
    company: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "El nombre es obligatorio.";
    if (!form.phone.trim()) errs.phone = "El teléfono es obligatorio.";
    if (!form.message.trim()) errs.message = "El mensaje es obligatorio.";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    // Build mailto fallback
    const subject = encodeURIComponent(
      `Cotización — ${form.company || form.name}`
    );
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nEmpresa: ${form.company}\nTeléfono: ${form.phone}\n\n${form.message}`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;

    setSubmitted(true);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  return (
    <section id="contacto" className="py-20 md:py-28 bg-white dark:bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Contacto"
          subtitle="Estamos listos para atenderle. Escríbanos o llámenos."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Cards */}
          <div className="space-y-6">
            {/* WhatsApp */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-5 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-[#61A75E] dark:hover:border-[#61A75E] transition-colors group"
            >
              <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-[#1A1A1A] dark:text-white group-hover:text-[#61A75E] transition-colors">
                  WhatsApp
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {contact.phone}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                  Respuesta rápida en horario laboral
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${contact.email}`}
              className="flex items-start gap-4 p-5 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-[#61A75E] dark:hover:border-[#61A75E] transition-colors group"
            >
              <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-full bg-[#15401A]/10 dark:bg-[#61A75E]/10 text-[#15401A] dark:text-[#61A75E]">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-[#1A1A1A] dark:text-white group-hover:text-[#61A75E] transition-colors">
                  Correo electrónico
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {contact.email}
                </p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-start gap-4 p-5 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-full bg-[#15401A]/10 dark:bg-[#61A75E]/10 text-[#15401A] dark:text-[#61A75E]">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-[#1A1A1A] dark:text-white">
                  Ubicación
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {contact.address}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                  {contact.schedule}
                </p>
              </div>
            </div>

            {/* Map embed */}
            <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 aspect-video bg-neutral-200 dark:bg-neutral-800">
              <iframe
                src={contact.mapsEmbedUrl}
                title="Ubicación de Gonzalez Industrial"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-6 md:p-8 border border-neutral-200 dark:border-neutral-700">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#61A75E]/20 text-[#61A75E] mb-4">
                  <Send size={28} />
                </div>
                <h3 className="font-oswald text-xl font-semibold text-[#1A1A1A] dark:text-white uppercase">
                  ¡Mensaje enviado!
                </h3>
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                  Nos pondremos en contacto pronto.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", company: "", phone: "", message: "" });
                  }}
                  className="mt-6 text-sm text-[#61A75E] hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                // Netlify Forms compatible attributes
                data-netlify="true"
                name="contacto"
              >
                <input type="hidden" name="form-name" value="contacto" />

                <h3 className="font-oswald text-xl font-semibold text-[#1A1A1A] dark:text-white uppercase tracking-wide mb-6">
                  Escríbanos
                </h3>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                    >
                      Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "err-name" : undefined}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-[#1A1A1A] dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#61A75E] focus:border-transparent transition-shadow"
                      placeholder="Su nombre completo"
                    />
                    {errors.name && (
                      <p
                        id="err-name"
                        role="alert"
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                    >
                      Empresa
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-[#1A1A1A] dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#61A75E] focus:border-transparent transition-shadow"
                      placeholder="Nombre de su empresa (opcional)"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                    >
                      Teléfono <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "err-phone" : undefined}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-[#1A1A1A] dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#61A75E] focus:border-transparent transition-shadow"
                      placeholder="+57 300 000 0000"
                    />
                    {errors.phone && (
                      <p
                        id="err-phone"
                        role="alert"
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                    >
                      Mensaje <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "err-message" : undefined
                      }
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-[#1A1A1A] dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#61A75E] focus:border-transparent transition-shadow resize-y"
                      placeholder="Describa lo que necesita..."
                    />
                    {errors.message && (
                      <p
                        id="err-message"
                        role="alert"
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full mt-6">
                  <Send size={18} />
                  Enviar mensaje
                </Button>

                <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-500 text-center">
                  También puede escribirnos directamente por{" "}
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#61A75E] hover:underline"
                  >
                    WhatsApp
                  </a>
                  .
                </p>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500 text-center">
                  Al enviar este formulario, acepta nuestra{" "}
                  <a
                    href="/politica-de-privacidad"
                    className="text-[#61A75E] hover:underline"
                  >
                    Política de Privacidad
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
