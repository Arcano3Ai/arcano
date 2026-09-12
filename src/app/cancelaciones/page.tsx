import React from "react";
import type { Metadata } from "next";
import { brandConfig } from "@/config/brandConfig";

export const metadata: Metadata = {
  title: "Política de Cancelación y Reprogramación",
  description: "Políticas de aviso previo, cambios de horario y reembolsos en ARCANO.",
};

export default function CancelacionesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-parchment">
      <header className="pb-8 border-b border-charcoal-border mb-8">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans block mb-2">
          Puntualidad y Respeto Mutuo
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-light">
          Política de Cancelación
        </h1>
        <p className="text-xs text-parchment-dim font-sans mt-2">
          Última actualización: {brandConfig.legal.lastUpdated}
        </p>
      </header>

      <div className="space-y-6 text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            1. Reprogramación sin Costo
          </h2>
          <p>
            Comprendemos que surgen imprevistos vitales. Podrá reprogramar la fecha y hora de su lectura sin penalización alguna siempre que notifique con al menos <strong>24 horas de antelación</strong> a la hora fijada, escribiendo a nuestro WhatsApp o correo oficial.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            2. Cancelaciones y Reembolsos
          </h2>
          <p>
            Si cancela su cita con más de 24 horas de anticipación, podrá solicitar el reembolso del 100% del importe abonado o mantener el saldo a su favor para una sesión futura con vigencia de 6 meses.
          </p>
          <p>
            En cancelaciones notificadas con menos de 24 horas de anticipación, se retendrá un 50% en concepto de gastos de reserva del espacio ceremonial del lector.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            3. Inasistencias (No-Show) y Tolerancia
          </h2>
          <p>
            Contamos con un margen de tolerancia de 15 minutos en las sesiones por videoconferencia. Transcurrido dicho tiempo sin aviso del consultante, la sesión se considerará celebrada sin derecho a reembolso.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            4. Cancelación por parte del Lector
          </h2>
          <p>
            En el caso extraordinario de que el lector se vea obligado a reprogramar por causa de fuerza mayor o indisposición, se le notificará de inmediato ofreciéndole reprogramación prioritaria o el reembolso íntegro inmediato.
          </p>
        </section>
      </div>
    </div>
  );
}
