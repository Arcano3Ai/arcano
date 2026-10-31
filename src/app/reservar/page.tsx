"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BookingWidget } from "@/components/BookingWidget";
import { SectionHeader } from "@/components/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";

function BookingWidgetWrapper() {
  const searchParams = useSearchParams();
  const servicio = searchParams.get("servicio") || undefined;
  return (
    <BookingWidget
      initialServiceSlug={servicio || "lectura-general"}
    />
  );
}

export default function ReservarPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <SectionHeader
        as="h1"
        subtitle={t("Encuentro Personal", "Personal Encounter")}
        title={t("Reservar tu Lectura", "Book Your Reading")}
        description={t(
          "Elige la lectura que mejor se adapte a tu necesidad actual y selecciona tu fecha preferida. Toda sesión se realiza en un entorno de quietud y estricta confidencialidad.",
          "Choose the reading that best matches your current inquiry and pick your preferred date. Every session is held in serene stillness and absolute confidentiality."
        )}
        symbol="✦"
      />

      <Suspense
        fallback={
          <div className="text-center py-20 text-gold text-xs uppercase tracking-widest">
            {t("Cargando santuario de reservas...", "Loading booking sanctuary...")}
          </div>
        }
      >
        <BookingWidgetWrapper />
      </Suspense>
    </div>
  );
}
