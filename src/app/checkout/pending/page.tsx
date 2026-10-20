"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { paymentConfig } from "@/config/paymentConfig";

function PendingContent() {
  const searchParams = useSearchParams();
  const orderId =
    searchParams.get("order_id") ||
    searchParams.get("external_reference") ||
    "ARC-CEREMONIAL";

  const whatsappMessage = encodeURIComponent(
    `¡Hola ARCANO! Adjunto el comprobante de pago para mi orden ceremonial *${orderId}*. Deseo que inicien la preparación.`
  );
  const whatsappUrl = `https://wa.me/528180923854?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-obsidian text-parchment pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Halo de luz cálida */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Sello Alquímico */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-400/40 text-amber-300 text-3xl shadow-[0_0_30px_rgba(251,191,36,0.25)] mb-4 animate-in zoom-in duration-500">
            ⏳
          </div>
          <p className="text-xs font-sans uppercase tracking-[0.3em] text-amber-300/90 font-semibold mb-2">
            ARCANO · Orden Registrada
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-parchment tracking-wide">
            Pago en Proceso de Confirmación
          </h1>
          <p className="font-sans text-sm text-parchment-muted mt-2 max-w-lg mx-auto">
            Hemos reservado tus piezas ceremoniales. Para iniciar el ritual de consagración, completa tu transferencia SPEI o abono en OXXO.
          </p>
        </div>

        {/* Ficha Oficial de Pago Bancario */}
        <div className="bg-charcoal/90 border border-gold/30 rounded-xl p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-md mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gold/15 gap-4">
            <div>
              <span className="text-[11px] font-sans uppercase tracking-widest text-parchment-muted">
                Referencia Ceremonial
              </span>
              <p className="font-mono text-xl sm:text-2xl text-gold font-bold tracking-wider mt-0.5">
                {orderId}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs font-sans font-medium self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Esperando Acreditación</span>
            </div>
          </div>

          {/* Datos Bancarios Inmutables */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm text-gold tracking-widest uppercase flex items-center gap-2">
              <span>🏦</span>
              <span>Datos Oficiales para Transferencia Directa (SPEI)</span>
            </h3>

            <div className="p-4 rounded-lg bg-obsidian/70 border border-gold/20 space-y-3 font-mono text-xs">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center py-1 border-b border-gold/10">
                <span className="text-parchment-muted font-sans text-xs">Banco Destino:</span>
                <span className="text-parchment font-bold">{paymentConfig.speiDirect.bank}</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center py-1 border-b border-gold/10">
                <span className="text-parchment-muted font-sans text-xs">Beneficiario / Titular:</span>
                <span className="text-gold font-semibold">{paymentConfig.speiDirect.beneficiary}</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center py-1 border-b border-gold/10">
                <span className="text-parchment-muted font-sans text-xs">CLABE Interbancaria:</span>
                <span className="text-amber-300 font-bold tracking-wider select-all text-sm">
                  {paymentConfig.speiDirect.clabe}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center py-1">
                <span className="text-parchment-muted font-sans text-xs">Concepto de Transferencia:</span>
                <span className="text-gold font-bold">{orderId}</span>
              </div>
            </div>
          </div>

          {/* Si pagaste en OXXO */}
          <div className="p-4 rounded-lg bg-obsidian/40 border border-gold/15 text-xs font-sans space-y-1.5">
            <p className="font-semibold text-parchment flex items-center gap-1.5">
              <span>🏪</span>
              <span>¿Elegiste pagar en efectivo OXXO?</span>
            </p>
            <p className="text-parchment-muted text-[11px] leading-relaxed">
              Descarga o presenta en caja de cualquier tienda OXXO el código de barras generado por Mercado Pago / Spin. El pago se acredita automáticamente en minutos.
            </p>
          </div>

          {/* Enviar Comprobante */}
          <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs font-serif text-emerald-400 font-semibold">
                ¿Ya realizaste tu transferencia o depósito?
              </p>
              <p className="text-[11px] font-sans text-parchment-muted mt-0.5">
                Envía tu comprobante con el número {orderId} para acelerar el empaque.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>💬</span>
              <span>Enviar Comprobante</span>
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
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPendingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-obsidian flex items-center justify-center text-gold font-serif">
          Cargando datos de orden...
        </div>
      }
    >
      <PendingContent />
    </Suspense>
  );
}
