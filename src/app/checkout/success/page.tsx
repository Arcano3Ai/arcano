"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { brandConfig } from "@/config/brandConfig";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId =
    searchParams.get("order_id") ||
    searchParams.get("external_reference") ||
    "ARC-CEREMONIAL";
  const paymentId = searchParams.get("payment_id");

  const whatsappMessage = encodeURIComponent(
    `¡Hola ARCANO! He completado mi orden ceremonial *${orderId}*${
      paymentId ? ` (ID Pago: ${paymentId})` : ""
    }. Deseo confirmar los detalles de consagración y seguimiento de envío.`
  );
  const whatsappUrl = `https://wa.me/${brandConfig.contact.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-obsidian text-parchment pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Halo de luz mística */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Sello Alquímico */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border-2 border-gold/40 text-gold text-3xl shadow-[0_0_30px_rgba(198,160,82,0.3)] mb-4 animate-in zoom-in duration-500">
            ⚜️
          </div>
          <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold/90 font-semibold mb-2">
            ARCANO · Círculo de Consagración
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-parchment tracking-wide">
            Tu Pedido ha Sido Consagrado
          </h1>
          <p className="font-sans text-sm text-parchment-muted mt-2 max-w-lg mx-auto">
            La transacción fue procesada con éxito. Tu talismán ceremonial ha sido reservado y entra a la fase de preparación energética.
          </p>
        </div>

        {/* Tarjeta de Orden Ceremonial */}
        <div className="bg-charcoal/90 border border-gold/30 rounded-xl p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-md mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gold/15 gap-4">
            <div>
              <span className="text-[11px] font-sans uppercase tracking-widest text-parchment-muted">
                Referencia de Orden
              </span>
              <p className="font-mono text-xl sm:text-2xl text-gold font-bold tracking-wider mt-0.5">
                {orderId}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-xs font-sans font-medium self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Pago Acreditado · En Preparación</span>
            </div>
          </div>

          {/* Fases del Ritual de Preparación */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm text-gold tracking-widest uppercase">
              Proceso de Entrega Sagrada
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
              <div className="p-3.5 rounded-lg bg-obsidian/60 border border-gold/15 space-y-1">
                <span className="text-gold font-serif text-sm">1. Limpieza</span>
                <p className="text-parchment-muted text-[11px] leading-relaxed">
                  Purificación mineral con humo de copal blanco y salvia silvestre.
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-obsidian/60 border border-gold/15 space-y-1">
                <span className="text-gold font-serif text-sm">2. Consagración</span>
                <p className="text-parchment-muted text-[11px] leading-relaxed">
                  Impronta de intención según el Arcano y ajuste milimétrico a tu muñeca.
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-obsidian/60 border border-gold/15 space-y-1">
                <span className="text-gold font-serif text-sm">3. Envío Seguro</span>
                <p className="text-parchment-muted text-[11px] leading-relaxed">
                  Caja rígida con lacre ceremonial negro y guía rastreable DHL/Estafeta.
                </p>
              </div>
            </div>
          </div>

          {/* Asistencia Directa */}
          <div className="p-4 rounded-lg bg-gold/5 border border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs font-serif text-gold font-semibold">
                ¿Deseas personalizar tu consagración o confirmar la talla?
              </p>
              <p className="text-[11px] font-sans text-parchment-muted mt-0.5">
                Nuestro Concierge ceremonial está disponible en tiempo real en Monterrey.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>💬</span>
              <span>Notificar por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Acciones de Navegación */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/tienda"
            className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gold/40 hover:border-gold hover:bg-gold/10 text-gold font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all text-center cursor-pointer"
          >
            ← Volver a la Boutique
          </Link>
          <Link
            href="/lecturas"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-charcoal border border-gold/20 hover:border-gold/50 text-parchment font-sans text-xs uppercase tracking-[0.2em] transition-all text-center cursor-pointer"
          >
            Explorar Lecturas de Tarot →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-obsidian flex items-center justify-center text-gold font-serif">
          Cargando confirmación sagrada...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
