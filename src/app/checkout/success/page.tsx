"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { brandConfig } from "@/config/brandConfig";
import { useLanguage } from "@/context/LanguageContext";

function SuccessContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const orderId =
    searchParams.get("order_id") ||
    searchParams.get("external_reference") ||
    "ARC-CEREMONIAL";
  const paymentId = searchParams.get("payment_id");

  const whatsappMessage = encodeURIComponent(
    t(
      `¡Hola ARCANO! He completado mi orden ceremonial *${orderId}*${
        paymentId ? ` (ID Pago: ${paymentId})` : ""
      }. Deseo confirmar los detalles de consagración y seguimiento de envío.`,
      `Hello ARCANO! I have completed my ceremonial order *${orderId}*${
        paymentId ? ` (Payment ID: ${paymentId})` : ""
      }. I would like to confirm consecration details and shipping tracking.`
    )
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
            {t("ARCANO · Círculo de Consagración", "ARCANO · Consecration Circle")}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-parchment tracking-wide">
            {t("Tu Pedido ha Sido Consagrado", "Your Order Has Been Consecrated")}
          </h1>
          <p className="font-sans text-sm text-parchment-muted mt-2 max-w-lg mx-auto">
            {t(
              "La transacción fue procesada con éxito. Tu talismán ceremonial ha sido reservado y entra a la fase de preparación energética.",
              "The transaction was processed successfully. Your ceremonial talisman has been reserved and enters the energetic preparation phase."
            )}
          </p>
        </div>

        {/* Tarjeta de Orden Ceremonial */}
        <div className="bg-charcoal/90 border border-gold/30 rounded-xl p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-md mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gold/15 gap-4">
            <div>
              <span className="text-[11px] font-sans uppercase tracking-widest text-parchment-muted">
                {t("Referencia de Orden", "Order Reference")}
              </span>
              <p className="font-mono text-xl sm:text-2xl text-gold font-bold tracking-wider mt-0.5">
                {orderId}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-xs font-sans font-medium self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t("Pago Acreditado · En Preparación", "Payment Approved · In Preparation")}</span>
            </div>
          </div>

          {/* Fases del Ritual de Preparación */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm text-gold tracking-widest uppercase">
              {t("Proceso de Entrega Sagrada", "Sacred Delivery Process")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
              <div className="p-3.5 rounded-lg bg-obsidian/60 border border-gold/15 space-y-1">
                <span className="text-gold font-serif text-sm">{t("1. Limpieza", "1. Cleansing")}</span>
                <p className="text-parchment-muted text-[11px] leading-relaxed">
                  {t(
                    "Purificación mineral con humo de copal blanco y salvia silvestre.",
                    "Mineral purification with white copal smoke and mountain sage."
                  )}
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-obsidian/60 border border-gold/15 space-y-1">
                <span className="text-gold font-serif text-sm">{t("2. Consagración", "2. Consecration")}</span>
                <p className="text-parchment-muted text-[11px] leading-relaxed">
                  {t(
                    "Impronta de intención según el Arcano y ajuste milimétrico a tu muñeca.",
                    "Intention imprinting according to the Arcana and bespoke wrist fitting."
                  )}
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-obsidian/60 border border-gold/15 space-y-1">
                <span className="text-gold font-serif text-sm">{t("3. Envío Seguro", "3. Secure Shipping")}</span>
                <p className="text-parchment-muted text-[11px] leading-relaxed">
                  {t(
                    "Caja rígida con lacre ceremonial negro y guía rastreable DHL/Estafeta.",
                    "Rigid ceremonial box with black wax seal and tracked express courier."
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Asistencia Directa */}
          <div className="p-4 rounded-lg bg-gold/5 border border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs font-serif text-gold font-semibold">
                {t(
                  "¿Deseas personalizar tu consagración o confirmar la talla?",
                  "Wish to customize your consecration or confirm your size?"
                )}
              </p>
              <p className="text-[11px] font-sans text-parchment-muted mt-0.5">
                {t(
                  "Nuestro Concierge ceremonial está disponible en tiempo real en Monterrey.",
                  "Our ceremonial Concierge is available in real time."
                )}
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>💬</span>
              <span>{t("Notificar por WhatsApp", "Notify via WhatsApp")}</span>
            </a>
          </div>
        </div>

        {/* Acciones de Navegación */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/tienda"
            className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gold/40 hover:border-gold hover:bg-gold/10 text-gold font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all text-center cursor-pointer"
          >
            {t("← Volver a la Boutique", "← Return to Boutique")}
          </Link>
          <Link
            href="/lecturas"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-charcoal border border-gold/20 hover:border-gold/50 text-parchment font-sans text-xs uppercase tracking-[0.2em] transition-all text-center cursor-pointer"
          >
            {t("Explorar Lecturas de Tarot →", "Explore Tarot Readings →")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  const { t } = useLanguage();
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-obsidian flex items-center justify-center text-gold font-serif">
          {t("Cargando confirmación sagrada...", "Loading sacred confirmation...")}
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
