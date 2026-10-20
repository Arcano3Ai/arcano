import React, { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pago No Completado | Reintentar Checkout | ARCANO",
  description: "Tu pago no pudo procesarse. Puedes intentar con otro método o solicitar asistencia personalizada.",
  robots: {
    index: false,
    follow: false,
  },
};

interface FailureProps {
  searchParams: Promise<{
    order_id?: string;
    error?: string;
    status?: string;
  }>;
}

async function FailureContent({ searchParams }: FailureProps) {
  const resolvedParams = await searchParams;
  const orderId = resolvedParams.order_id || "ARC-SESION";

  const whatsappMessage = encodeURIComponent(
    `¡Hola ARCANO! Tuve un inconveniente al pagar mi orden ceremonial *${orderId}*. ¿Me podrían ayudar a completar mi compra por transferencia o enlace directo?`
  );
  const whatsappUrl = `https://wa.me/528180923854?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-obsidian text-parchment pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Halo sutil */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Sello Alquímico */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/40 text-red-400 text-3xl shadow-[0_0_30px_rgba(239,68,68,0.2)] mb-4 animate-in zoom-in duration-500">
            ⚔️
          </div>
          <p className="text-xs font-sans uppercase tracking-[0.3em] text-red-400/90 font-semibold mb-2">
            ARCANO · Transacción Interrumpida
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-parchment tracking-wide">
            El Pago No Pudo Completarse
          </h1>
          <p className="font-sans text-sm text-parchment-muted mt-2 max-w-lg mx-auto">
            La entidad emisora o pasarela declinó la operación. No se ha realizado ningún cobro a tu cuenta y tus piezas siguen reservadas en tu carrito.
          </p>
        </div>

        {/* Tarjeta de Asistencia */}
        <div className="bg-charcoal/90 border border-gold/30 rounded-xl p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-md mb-8 space-y-6">
          <div className="space-y-3">
            <h3 className="font-serif text-sm text-gold tracking-widest uppercase">
              Causas Habituales & Soluciones
            </h3>
            <ul className="space-y-2 text-xs font-sans text-parchment-muted">
              <li className="flex items-start gap-2">
                <span className="text-gold">•</span>
                <span>Bloqueo de seguridad bancario para compras en línea (autoriza en tu App bancaria e intenta de nuevo).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold">•</span>
                <span>Límite de crédito o fondos insuficientes en la tarjeta seleccionada.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold">•</span>
                <span>Alternativa inmediata: Pagar mediante transferencia SPEI directa o saldo Mercado Pago / PayPal.</span>
              </li>
            </ul>
          </div>

          {/* Opciones de Reintento */}
          <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs font-serif text-emerald-400 font-semibold">
                ¿Prefieres pagar con ayuda de un Asesor?
              </p>
              <p className="text-[11px] font-sans text-parchment-muted mt-0.5">
                Te enviamos un enlace de pago alternativo o datos SPEI en segundos.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>💬</span>
              <span>Asistencia por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Acciones de Navegación */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/tienda"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gold hover:bg-amber-400 text-obsidian font-sans text-xs uppercase tracking-[0.2em] font-bold transition-all text-center shadow-[0_0_20px_rgba(198,160,82,0.35)] cursor-pointer"
          >
            ← Reintentar desde la Boutique
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutFailurePage({ searchParams }: FailureProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-obsidian flex items-center justify-center text-gold font-serif">
          Cargando estado...
        </div>
      }
    >
      <FailureContent searchParams={searchParams} />
    </Suspense>
  );
}
