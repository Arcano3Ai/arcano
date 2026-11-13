"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCheckoutModal } from "@/components/shop/ProductCheckoutModal";
import { PaymentMethodsBadges } from "@/components/shop/PaymentMethodsBadges";
import { ShopProduct } from "@/data/shop";

// Producto oculto de prueba exclusivamente para validación técnica de conciliación
const TEST_PRODUCT_10: ShopProduct = {
  id: "arc-test-10",
  slug: "prueba-conciliacion-10-pesos",
  name: "Prueba Técnica de Conciliación SPEI & Mercado Pago",
  categoryId: "diagnostico",
  categoryName: "Prueba de Pagos",
  price: 10,
  formattedPrice: "$10 MXN",
  shippingNote: "Entrega Digital Instantánea / Sin Encomienda Física",
  tagline: "Verificación en tiempo real de liquidación STP / Mercado Pago",
  description:
    "Ítem ceremonial simbólico de $10.00 MXN para verificar de extremo a extremo la generación de tickets de recaudación SPEI (STP), la acreditación bancaria y la conciliación en el panel de Mercado Pago.",
  ritualUse: "Calibración de pasarela de pago",
  details: [
    "Monto exacto: $10.00 MXN",
    "Genera ticket SPEI oficial de STP",
    "Acreditación automática en Mercado Pago",
    "Permite pago con Spin by OXXO, banca móvil, tarjeta o saldo MP",
  ],
  inStock: true,
  badge: "🧪 TEST $10 MXN",
  imageUrl: "/images/shop/pulsera-invierno-solsticio-lapislazuli.png",
};

export default function TestDiezPesosPage() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans antialiased selection:bg-[#C5A059]/30 selection:text-[#E8D8B0] flex flex-col justify-between">
      {/* Header técnico */}
      <header className="border-b border-neutral-800/80 bg-black/60 backdrop-blur-md py-4 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/tienda" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-xs font-mono">
            <span>←</span>
            <span>Volver a la Tienda</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>PÁGINA OCULTA DE PRUEBAS</span>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-3xl mx-auto px-4 py-12 sm:py-16 w-full">
        <div className="text-center mb-10">
          <span className="text-[11px] font-mono tracking-widest text-[#C5A059] uppercase block mb-2">
            ARCANO · LABORATORIO DE PAGOS
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif text-white tracking-wide uppercase font-light">
            Prueba de Conciliación SPEI ($10 MXN)
          </h1>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto mt-3">
            Esta página no es visible en el catálogo público. Fue creada para que puedas generar una orden oficial de Mercado Pago por <strong>$10.00 MXN</strong> y comprobar cómo se concilia en vivo desde tu app bancaria (Spin by OXXO, banca móvil, etc.).
          </p>
        </div>

        {/* Tarjeta del Producto de Prueba */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[#121212] to-[#0A0A0A] border border-[#C5A059]/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden bg-black border border-neutral-800 shrink-0">
              <Image
                src={TEST_PRODUCT_10.imageUrl}
                alt={TEST_PRODUCT_10.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-[#C5A059] border border-[#C5A059]/40">
                $10 MXN
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase">
                ORDEN DE COMPRA VÁLIDA EN MERCADO PAGO
              </span>
              <h2 className="text-lg sm:text-xl font-serif text-white mt-1">
                {TEST_PRODUCT_10.name}
              </h2>
              <p className="text-neutral-400 text-xs mt-2 line-clamp-2">
                {TEST_PRODUCT_10.description}
              </p>

              <div className="flex items-baseline gap-3 mt-4 justify-center sm:justify-start">
                <span className="text-2xl font-mono font-bold text-white">
                  $10.00
                </span>
                <span className="text-xs text-neutral-400 font-mono">MXN · Total Final</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-400 flex items-center gap-2">
              <span className="text-emerald-400">●</span>
              <span>Conectado a Mercado Pago Orders API (Producción)</span>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#E8D8B0] to-[#C5A059] text-black font-semibold text-xs tracking-wider uppercase hover:shadow-[0_0_25px_rgba(197,160,89,0.5)] transition-all cursor-pointer font-mono"
            >
              Comprar & Probar Pago ($10 MXN) →
            </button>
          </div>

          {/* Cintillo de Métodos de Pago Oficiales */}
          <div className="mt-4 pt-4 border-t border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider">
              MÉTODOS DE PAGO OFICIALES:
            </span>
            <PaymentMethodsBadges />
          </div>
        </div>

        {/* Guía Técnica de Pasos */}
        <div className="rounded-xl bg-[#0E0E0E] border border-neutral-800 p-6 text-xs text-neutral-300">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <span>⚙️</span>
            <span>¿Cómo probar la conciliación bancaria con esta orden?</span>
          </h3>
          <ol className="space-y-3 list-decimal list-inside text-neutral-400">
            <li>
              Haz clic en el botón dorado <strong>&quot;Comprar &amp; Probar Pago ($10 MXN)&quot;</strong>.
            </li>
            <li>
              Llena tus datos de prueba en la ventana que se abre y selecciona <strong>&quot;Mercado Pago · Tarjeta Crédito / Débito / SPEI&quot;</strong>.
            </li>
            <li>
              En la pantalla oficial de Mercado Pago, elige <strong>&quot;Transferencia SPEI&quot;</strong> (o paga con tarjeta/saldo si prefieres).
            </li>
            <li>
              Mercado Pago generará un ticket con <strong>monto exacto de $10.00 MXN</strong>, una CLABE STP (646...) y un número de referencia.
            </li>
            <li>
              Abre tu app de <strong>Spin by OXXO</strong> (o cualquier banca), transfiere <strong>$10.00 MXN exactos</strong> a esa CLABE con esa referencia.
            </li>
            <li>
              <strong>¡Listo!</strong> En cuanto Banxico lo liquide, como el monto ($10.00) coincidirá con la orden abierta en Mercado Pago, se aprobará y se reflejará de inmediato en tus ventas y en tu saldo disponible.
            </li>
          </ol>
        </div>
      </main>

      {/* Footer minimalista */}
      <footer className="border-t border-neutral-900 py-6 text-center text-neutral-500 text-xs font-mono">
        ARCANO Joyería Ceremonial · Entorno Técnico de Diagnóstico
      </footer>

      {/* Modal de Checkout conectado a $10 MXN */}
      <ProductCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={TEST_PRODUCT_10}
      />
    </div>
  );
}
