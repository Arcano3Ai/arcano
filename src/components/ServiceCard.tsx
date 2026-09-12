"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Service } from "@/data/services";
import { formatCurrency } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface ServiceCardProps {
  service: Service;
  onSelectBooking?: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelectBooking }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleBooking = () => {
    trackEvent({
      name: "view_service",
      params: {
        serviceId: service.id,
        serviceName: service.title,
        price: service.priceMXN,
      },
    });
    if (onSelectBooking) {
      onSelectBooking(service);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between rounded-md p-6 sm:p-8 transition-all duration-700 ease-out transform perspective-1000 bg-gradient-to-b from-[#14141c] via-[#0d0d12] to-[#07070a] border border-charcoal-border hover:border-gold/60 shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(198,160,82,0.18)] hover:-translate-y-2 hover:rotate-[0.5deg]"
      data-interactive="true"
    >
      {/* Marco ornamental interior con hilos dorados de 1px */}
      <div className="absolute inset-2 sm:inset-3 border border-gold/20 rounded pointer-events-none transition-colors duration-500 group-hover:border-gold/40" />

      {/* Esquinas ornamentales con símbolos sagrados */}
      <div className="absolute top-4 left-4 text-[10px] text-gold/50">✦</div>
      <div className="absolute top-4 right-4 text-[10px] text-gold/50">✦</div>
      <div className="absolute bottom-4 left-4 text-[10px] text-gold/50">✦</div>
      <div className="absolute bottom-4 right-4 text-[10px] text-gold/50">✦</div>

      {/* Cabecera de la Carta */}
      <div className="relative z-10 pt-2">
        <div className="flex items-center justify-between text-xs tracking-[0.25em] text-gold/75 mb-3 font-sans">
          <span>ARCANO {service.numberRoman}</span>
          <span className="text-sm font-serif">{service.symbol}</span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl text-parchment tracking-[0.08em] font-normal leading-snug group-hover:text-gold transition-colors duration-300">
          {service.title}
        </h3>

        <p className="text-xs uppercase tracking-[0.18em] text-parchment-dim mt-1 font-sans">
          {service.subtitle}
        </p>

        {/* Separador fino */}
        <div className="my-5 h-[1px] w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        {/* Descripción */}
        <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed min-h-[54px]">
          {service.shortDescription}
        </p>

        {/* Características visibles en hover o siempre en mobile */}
        <div className="mt-5 space-y-2">
          {service.keyFeatures.slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-parchment/80 font-sans">
              <span className="text-gold text-[10px] mt-0.5">✧</span>
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pie de la Carta: Duración, Precio y CTA */}
      <div className="relative z-10 mt-8 pt-5 border-t border-charcoal-border/80">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-parchment-dim">
              Duración
            </span>
            <span className="text-xs text-parchment font-medium font-sans">
              {service.durationMinutes} minutos
            </span>
          </div>

          <div className="flex flex-col text-right">
            <span className="text-[10px] uppercase tracking-[0.2em] text-parchment-dim">
              Inversión
            </span>
            <span className="font-serif text-lg sm:text-xl text-gold font-light tracking-wide">
              {formatCurrency(service.priceMXN)}
            </span>
          </div>
        </div>

        {/* Modalidad */}
        <div className="mb-4 text-[11px] text-parchment-dim/80 text-center font-sans tracking-wider">
          Modalidad: {service.modality}
        </div>

        {/* Botón Reservar */}
        <Link
          href={`/reservar?servicio=${service.slug}`}
          onClick={handleBooking}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs uppercase tracking-[0.2em] font-sans text-parchment bg-charcoal/90 hover:bg-gold hover:text-obsidian border border-gold/35 hover:border-gold transition-all duration-500 rounded-sm shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(198,160,82,0.25)]"
        >
          <span>Reservar sesión</span>
          <span className="text-xs">✦</span>
        </Link>
      </div>

      {/* Resplandor áureo en hover de fondo */}
      <div
        className={`absolute inset-0 rounded-md bg-radial-mystic pointer-events-none transition-opacity duration-700 ${
          isHovered ? "opacity-60" : "opacity-0"
        }`}
      />
    </div>
  );
};
