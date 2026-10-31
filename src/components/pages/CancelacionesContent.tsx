"use client";

import React from "react";
import { brandConfig } from "@/config/brandConfig";
import { useLanguage } from "@/context/LanguageContext";

export function CancelacionesContent() {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-parchment">
      <header className="pb-8 border-b border-charcoal-border mb-8">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans block mb-2">
          {t("Puntualidad y Respeto Mutuo", "Punctuality & Mutual Respect")}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-light">
          {t("Política de Cancelación", "Cancellation Policy")}
        </h1>
        <p className="text-xs text-parchment-dim font-sans mt-2">
          {t("Última actualización:", "Last updated:")} {brandConfig.legal.lastUpdated}
        </p>
      </header>

      <div className="space-y-6 text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            {t("1. Reprogramación sin Costo", "1. Rescheduling at No Charge")}
          </h2>
          <p>
            {t(
              "Comprendemos que surgen imprevistos vitales. Podrá reprogramar la fecha y hora de su lectura sin penalización alguna siempre que notifique con al menos",
              "We understand unexpected life events happen. You may reschedule the date and time of your reading without penalty provided you notify us at least"
            )}{" "}
            <strong>{t("24 horas de antelación", "24 hours in advance")}</strong>{" "}
            {t(
              "a la hora fijada, escribiendo a nuestro WhatsApp o correo oficial.",
              "relative to the scheduled time, via our WhatsApp or official email."
            )}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            {t("2. Cancelaciones y Reembolsos", "2. Cancellations and Refunds")}
          </h2>
          <p>
            {t(
              "Si cancela su cita con más de 24 horas de anticipación, podrá solicitar el reembolso del 100% del importe abonado o mantener el saldo a su favor para una sesión futura con vigencia de 6 meses.",
              "If you cancel your appointment more than 24 hours in advance, you may request a 100% refund of the paid amount or retain the credit for a future reading valid for 6 months."
            )}
          </p>
          <p>
            {t(
              "En cancelaciones notificadas con menos de 24 horas de anticipación, se retendrá un 50% en concepto de gastos de reserva del espacio ceremonial del lector.",
              "For cancellations notified with less than 24 hours advance notice, 50% is retained to cover ceremonial preparation and dedicated reader reservation."
            )}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            {t("3. Inasistencias (No-Show) y Tolerancia", "3. No-Shows and Grace Period")}
          </h2>
          <p>
            {t(
              "Contamos con un margen de tolerancia de 15 minutos en las sesiones por videoconferencia. Transcurrido dicho tiempo sin aviso del consultante, la sesión se considerará celebrada sin derecho a reembolso.",
              "We maintain a 15-minute grace period for video sessions. Once elapsed without notice from the seeker, the session is deemed held without entitlement to refund."
            )}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            {t("4. Cancelación por parte del Lector", "4. Cancellation by the Reader")}
          </h2>
          <p>
            {t(
              "En el caso extraordinario de que el lector se vea obligado a reprogramar por causa de fuerza mayor o indisposición, se le notificará de inmediato ofreciéndole reprogramación prioritaria o el reembolso íntegro inmediato.",
              "In the extraordinary event that the reader must reschedule due to force majeure or unforeseen illness, you will be notified immediately and offered priority rescheduling or an immediate full refund."
            )}
          </p>
        </section>
      </div>
    </div>
  );
}
