"use client";

import React, { useState } from "react";
import { brandConfig, getWhatsAppUrl } from "@/config/brandConfig";
import { SectionHeader } from "@/components/SectionHeader";
import { TarotSocialIcons } from "@/components/TarotSocialIcons";
import { trackEvent } from "@/lib/analytics";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Consulta general",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      trackEvent({ name: "submit_contact", params: { subject: formData.subject } });
      setStatus("success");
      setFormData({ name: "", email: "", subject: "Consulta general", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const whatsappUrl = getWhatsAppUrl();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <SectionHeader
        subtitle="Correspondencia Directa"
        title="Contacto con el Santuario"
        description="Si tienes inquietudes sobre alguna lectura, eventos privados o colaboraciones, comunícate a través de nuestro formulario o por canales directos."
        symbol="✦"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mt-12 items-start">
        {/* Canales Oficiales */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl border border-charcoal-border bg-charcoal/50 p-6 sm:p-8 space-y-6">
            <h3 className="font-serif text-xl text-parchment font-light">
              Canales de Comunicación
            </h3>

            {/* WhatsApp */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans block">
                Atención Rápida por WhatsApp
              </span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-parchment hover:text-gold transition-colors font-sans flex items-center gap-2"
              >
                <span>{brandConfig.contact.phone}</span>
                <span className="text-xs text-gold">↗</span>
              </a>
              <span className="text-[11px] text-parchment-dim block">
                {brandConfig.contact.hours}
              </span>
            </div>

            {/* Correo Electrónico */}
            <div className="space-y-1 pt-4 border-t border-charcoal-border">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans block">
                Correo Electrónico Oficial
              </span>
              <a
                href={`mailto:${brandConfig.contact.email}`}
                className="text-sm text-parchment hover:text-gold transition-colors font-sans"
              >
                {brandConfig.contact.email}
              </a>
            </div>

            {/* Presencia en Redes Sociales (Tarot Style) */}
            <div className="space-y-2 pt-4 border-t border-charcoal-border">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans block">
                Canales Esotéricos Oficiales
              </span>
              <TarotSocialIcons size="sm" />
            </div>

            {/* Ubicación */}
            <div className="space-y-1 pt-4 border-t border-charcoal-border">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans block">
                Modalidad
              </span>
              <p className="text-xs text-parchment-muted font-sans">
                {brandConfig.contact.location}
              </p>
            </div>
          </div>
        </div>

        {/* Formulario de Mensaje */}
        <div className="lg:col-span-7">
          <div className="rounded-xl border border-charcoal-border bg-gradient-to-b from-[#14141c] to-[#08080a] p-6 sm:p-8 shadow-xl">
            {status === "success" ? (
              <div className="text-center py-12 space-y-4 animate-fadeIn">
                <div className="w-14 h-14 rounded-full border border-gold/50 mx-auto flex items-center justify-center bg-gold/10 text-gold text-2xl">
                  ✦
                </div>
                <h3 className="font-serif text-2xl text-parchment">
                  Mensaje Enviado al Santuario
                </h3>
                <p className="text-xs sm:text-sm text-parchment-muted font-sans max-w-md mx-auto leading-relaxed">
                  Agradecemos tus palabras. Te responderemos a la brevedad con la serenidad y atención que merece tu mensaje.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-xs uppercase tracking-widest text-gold hover:text-gold-light border-b border-gold/40 pb-0.5"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-serif text-xl text-parchment font-light mb-4">
                  Envíanos una Correspondencia
                </h3>

                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[11px] uppercase tracking-[0.18em] text-parchment-dim mb-1.5 font-sans"
                  >
                    Nombre *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Tu nombre completo"
                    className="w-full px-4 py-2.5 rounded bg-charcoal border border-charcoal-border focus:border-gold/60 focus:outline-none text-xs text-parchment font-sans"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-[11px] uppercase tracking-[0.18em] text-parchment-dim mb-1.5 font-sans"
                  >
                    Correo electrónico *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="nombre@ejemplo.com"
                    className="w-full px-4 py-2.5 rounded bg-charcoal border border-charcoal-border focus:border-gold/60 focus:outline-none text-xs text-parchment font-sans"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-[11px] uppercase tracking-[0.18em] text-parchment-dim mb-1.5 font-sans"
                  >
                    Motivo de la consulta
                  </label>
                  <select
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded bg-charcoal border border-charcoal-border focus:border-gold/60 focus:outline-none text-xs text-parchment font-sans"
                  >
                    <option value="Consulta general">Consulta general</option>
                    <option value="Dudas sobre una lectura">Dudas sobre una lectura</option>
                    <option value="Eventos o sesiones privadas">Eventos o sesiones privadas</option>
                    <option value="Certificados de regalo">Certificados de regalo</option>
                    <option value="Prensa o colaboraciones">Prensa o colaboraciones</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[11px] uppercase tracking-[0.18em] text-parchment-dim mb-1.5 font-sans"
                  >
                    Mensaje *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Escribe tu mensaje con tranquilidad..."
                    className="w-full px-4 py-2.5 rounded bg-charcoal border border-charcoal-border focus:border-gold/60 focus:outline-none text-xs text-parchment font-sans leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 px-6 text-xs uppercase tracking-[0.25em] font-sans text-obsidian bg-gold hover:bg-gold-light transition-all rounded-sm font-medium shadow-[0_0_20px_rgba(198,160,82,0.3)] disabled:opacity-50"
                >
                  {status === "loading" ? "Enviando correspondencia..." : "Enviar mensaje ✦"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
