"use client";

import React, { useState } from "react";
import { servicesList, Service } from "@/data/services";
import { formatCurrency } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { brandConfig } from "@/config/brandConfig";

interface BookingFormState {
  name: string;
  email: string;
  serviceId: string;
  intention: string;
  modality: string;
  preferredDate: string;
  preferredTime: string;
  additionalNotes: string;
  termsAccepted: boolean;
}

export const BookingWidget: React.FC<{ initialServiceSlug?: string }> = ({
  initialServiceSlug,
}) => {
  const defaultService =
    servicesList.find((s) => s.slug === initialServiceSlug) || servicesList[0];

  const [formData, setFormData] = useState<BookingFormState>({
    name: "",
    email: "",
    serviceId: defaultService.id,
    intention: "",
    modality: defaultService.modality,
    preferredDate: "",
    preferredTime: "18:00",
    additionalNotes: "",
    termsAccepted: false,
  });

  const [selectedService, setSelectedService] = useState<Service>(defaultService);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const s = servicesList.find((item) => item.id === e.target.value);
    if (s) {
      setSelectedService(s);
      setFormData({
        ...formData,
        serviceId: s.id,
        modality: s.modality,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validaciones estrictas
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage("Por favor ingresa tu nombre y correo electrónico.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("El formato del correo electrónico no parece válido.");
      return;
    }

    if (!formData.preferredDate) {
      setErrorMessage("Por favor selecciona una fecha deseada para tu sesión.");
      return;
    }

    if (!formData.termsAccepted) {
      setErrorMessage("Debes aceptar los términos y condiciones para continuar.");
      return;
    }

    setStatus("loading");

    try {
      // Simulación de envío a endpoint desacoplado
      await new Promise((resolve) => setTimeout(resolve, 1200));

      trackEvent({
        name: "click_booking",
        params: {
          serviceId: selectedService.id,
          source: "booking_widget_submit",
        },
      });

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "No fue posible procesar tu solicitud en este momento. Por favor intenta vía WhatsApp."
      );
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl border border-charcoal-border bg-gradient-to-b from-[#14141c] via-[#0d0d12] to-[#060608] p-6 sm:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.7)]">
      {/* Resumen del servicio seleccionado */}
      <div className="p-4 rounded-lg bg-charcoal/70 border border-charcoal-border/70 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans">
            Lectura Seleccionada
          </span>
          <h4 className="font-serif text-lg text-parchment font-medium">
            {selectedService.title} ({selectedService.durationMinutes} min)
          </h4>
          <span className="text-xs text-parchment-dim font-sans">
            {selectedService.modality}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-[0.2em] text-parchment-dim block">
            Inversión
          </span>
          <span className="font-serif text-xl sm:text-2xl text-gold font-light">
            {formatCurrency(selectedService.priceMXN)}
          </span>
        </div>
      </div>

      {status === "success" ? (
        <div className="text-center py-10 space-y-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-full border border-gold/50 mx-auto flex items-center justify-center bg-gold/10 text-gold text-2xl shadow-[0_0_20px_rgba(198,160,82,0.3)]">
            ✦
          </div>
          <h3 className="font-serif text-2xl text-parchment tracking-wide">
            Solicitud Recibida en el Santuario
          </h3>
          <p className="text-sm text-parchment-muted max-w-lg mx-auto font-sans leading-relaxed">
            Gracias por confiar en ARCANO,{" "}
            <span className="text-gold font-medium">{formData.name}</span>. Hemos
            recibido tu intención para la lectura{" "}
            <strong>{selectedService.title}</strong> el día{" "}
            <strong>{formData.preferredDate}</strong>.
          </p>
          <p className="text-xs text-parchment-dim font-sans">
            Te hemos enviado un correo a <strong>{formData.email}</strong> con los
            detalles de confirmación y el enlace seguro de tu sala ceremonial.
          </p>
          <div className="pt-4">
            <button
              onClick={() => setStatus("idle")}
              className="text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-light border-b border-gold/40 pb-0.5"
            >
              Realizar otra solicitud
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMessage && (
            <div className="p-3 rounded bg-wine/30 border border-wine/50 text-xs text-parchment-muted text-center">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Nombre */}
            <div>
              <label
                htmlFor="name"
                className="block text-[11px] uppercase tracking-[0.18em] text-parchment-dim mb-2 font-sans"
              >
                Nombre completo *
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Tu nombre o cómo deseas que te nombremos"
                className="w-full px-4 py-2.5 rounded bg-charcoal border border-charcoal-border focus:border-gold/60 focus:outline-none text-xs text-parchment font-sans"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[11px] uppercase tracking-[0.18em] text-parchment-dim mb-2 font-sans"
              >
                Correo electrónico *
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="nombre@ejemplo.com"
                className="w-full px-4 py-2.5 rounded bg-charcoal border border-charcoal-border focus:border-gold/60 focus:outline-none text-xs text-parchment font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Tipo de lectura */}
            <div>
              <label
                htmlFor="service"
                className="block text-[11px] uppercase tracking-[0.18em] text-parchment-dim mb-2 font-sans"
              >
                Tipo de lectura *
              </label>
              <select
                id="service"
                value={formData.serviceId}
                onChange={handleServiceChange}
                className="w-full px-4 py-2.5 rounded bg-charcoal border border-charcoal-border focus:border-gold/60 focus:outline-none text-xs text-parchment font-sans"
              >
                {servicesList.map((svc) => (
                  <option key={svc.id} value={svc.id}>
                    {svc.title} — {formatCurrency(svc.priceMXN)} ({svc.durationMinutes} min)
                  </option>
                ))}
              </select>
            </div>

            {/* Modalidad */}
            <div>
              <label
                htmlFor="modality"
                className="block text-[11px] uppercase tracking-[0.18em] text-parchment-dim mb-2 font-sans"
              >
                Modalidad
              </label>
              <input
                id="modality"
                type="text"
                readOnly
                value={selectedService.modality}
                className="w-full px-4 py-2.5 rounded bg-charcoal/50 border border-charcoal-border text-xs text-parchment-muted font-sans cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Fecha preferida */}
            <div>
              <label
                htmlFor="preferredDate"
                className="block text-[11px] uppercase tracking-[0.18em] text-parchment-dim mb-2 font-sans"
              >
                Fecha preferida *
              </label>
              <input
                id="preferredDate"
                type="date"
                required
                value={formData.preferredDate}
                onChange={(e) =>
                  setFormData({ ...formData, preferredDate: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded bg-charcoal border border-charcoal-border focus:border-gold/60 focus:outline-none text-xs text-parchment font-sans"
              />
            </div>

            {/* Horario preferido */}
            <div>
              <label
                htmlFor="preferredTime"
                className="block text-[11px] uppercase tracking-[0.18em] text-parchment-dim mb-2 font-sans"
              >
                Horario aproximado
              </label>
              <select
                id="preferredTime"
                value={formData.preferredTime}
                onChange={(e) =>
                  setFormData({ ...formData, preferredTime: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded bg-charcoal border border-charcoal-border focus:border-gold/60 focus:outline-none text-xs text-parchment font-sans"
              >
                <option value="11:00">Mañana (11:00 AM)</option>
                <option value="14:00">Mediodía (02:00 PM)</option>
                <option value="17:00">Tarde (05:00 PM)</option>
                <option value="19:00">Noche / Crepúsculo (07:00 PM)</option>
              </select>
            </div>
          </div>

          {/* Pregunta o intención */}
          <div>
            <label
              htmlFor="intention"
              className="block text-[11px] uppercase tracking-[0.18em] text-parchment-dim mb-2 font-sans"
            >
              Pregunta o intención de la consulta (opcional)
            </label>
            <textarea
              id="intention"
              rows={3}
              value={formData.intention}
              onChange={(e) =>
                setFormData({ ...formData, intention: e.target.value })
              }
              placeholder="Comparte brevemente qué área o inquietud deseas que exploren los símbolos..."
              className="w-full px-4 py-2.5 rounded bg-charcoal border border-charcoal-border focus:border-gold/60 focus:outline-none text-xs text-parchment font-sans leading-relaxed"
            />
          </div>

          {/* Checkbox Términos */}
          <div className="flex items-start gap-3">
            <input
              id="terms"
              type="checkbox"
              required
              checked={formData.termsAccepted}
              onChange={(e) =>
                setFormData({ ...formData, termsAccepted: e.target.checked })
              }
              className="mt-0.5 rounded border-charcoal-border text-gold focus:ring-gold bg-charcoal"
            />
            <label htmlFor="terms" className="text-[11px] text-parchment-muted font-sans leading-relaxed">
              Acepto los{" "}
              <a href="/terminos" className="text-gold underline" target="_blank">
                términos del servicio
              </a>{" "}
              y reconozco que las lecturas son un ejercicio simbólico de introspección personal y no sustituyen asesoría médica, legal ni financiera.
            </label>
          </div>

          {/* Botón Enviar */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3.5 px-6 text-xs uppercase tracking-[0.25em] font-sans text-obsidian bg-gold hover:bg-gold-light transition-all duration-300 rounded-sm font-medium shadow-[0_0_20px_rgba(198,160,82,0.35)] disabled:opacity-50"
          >
            {status === "loading" ? "Conectando con el Santuario..." : "Solicitar lectura ✦"}
          </button>

          <p className="text-[10px] text-center text-parchment-dim font-sans">
            Garantía de privacidad absoluta · Tus datos jamás serán transferidos a terceros
          </p>
        </form>
      )}
    </div>
  );
};
