import React, { Suspense } from "react";
import type { Metadata } from "next";
import { BookingWidget } from "@/components/BookingWidget";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Reservar una Lectura de Tarot",
  description:
    "Solicita tu sesión personalizada de tarot con ARCANO. Selección de lectura, fecha, modalidad y acompañamiento ceremonial.",
};

function BookingWidgetWrapper({
  searchParams,
}: {
  searchParams?: { servicio?: string; arcano?: string };
}) {
  return (
    <BookingWidget
      initialServiceSlug={searchParams?.servicio || "lectura-general"}
    />
  );
}

export default function ReservarPage({
  searchParams,
}: {
  searchParams?: { servicio?: string; arcano?: string };
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <SectionHeader
        subtitle="Encuentro Personal"
        title="Reservar tu Lectura"
        description="Elige la lectura que mejor se adapte a tu necesidad actual y selecciona tu fecha preferida. Toda sesión se realiza en un entorno de quietud y estricta confidencialidad."
        symbol="✦"
      />

      <Suspense
        fallback={
          <div className="text-center py-20 text-gold text-xs uppercase tracking-widest">
            Cargando santuario de reservas...
          </div>
        }
      >
        <BookingWidgetWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
