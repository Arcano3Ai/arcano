"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { brandConfig } from "@/config/brandConfig";
import { paymentConfig } from "@/config/paymentConfig";
import { ShopProduct } from "@/data/shop";
import { WristSizeGuideModal } from "./WristSizeGuideModal";

interface ProductCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ShopProduct | null;
}

export function ProductCheckoutModal({
  isOpen,
  onClose,
  product,
}: ProductCheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "spei">("card");
  const [isProcessingCard, setIsProcessingCard] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    number: "",
    colonia: "",
    zipCode: "",
    city: "",
    state: "Nuevo León",
    wristSize: "M (18-19 cm) — Estándar",
    notes: "",
  });

  const [copiedClabe, setCopiedClabe] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState("");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !product || !mounted) return null;

  const CLABE_OFICIAL = "722969017074087021";
  const TITULAR_OFICIAL = "Sergio Adrian Perez Villarreal";
  const BANCO_OFICIAL = "Mercado Pago W";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyClabe = async () => {
    try {
      await navigator.clipboard.writeText(CLABE_OFICIAL);
      setCopiedClabe(true);
      setTimeout(() => setCopiedClabe(false), 3000);
    } catch {
      setCopiedClabe(true);
      setTimeout(() => setCopiedClabe(false), 3000);
    }
  };

  const validateShippingForm = (): boolean => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage("Por favor ingresa tu Nombre y Teléfono / WhatsApp de contacto.");
      return false;
    }
    if (
      !formData.street.trim() ||
      !formData.number.trim() ||
      !formData.zipCode.trim() ||
      !formData.city.trim()
    ) {
      setErrorMessage("Por favor completa los datos de tu dirección para generar la guía de envío.");
      return false;
    }
    return true;
  };

  const handlePayWithCard = async () => {
    setErrorMessage(null);
    if (!validateShippingForm()) return;

    setIsProcessingCard(true);
    const orderId = `ARC-PROD-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const response = await fetch(paymentConfig.mercadoPago.checkoutApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId: product.id || product.slug,
          orderId,
          buyerEmail: formData.email.trim() || "cliente@arcanosolutions.com",
          buyerName: formData.name.trim(),
          buyerPhone: formData.phone.trim(),
          shippingAddress: {
            street: formData.street.trim(),
            number: formData.number.trim(),
            colonia: formData.colonia.trim(),
            city: formData.city.trim(),
            state: formData.state.trim(),
            zipCode: formData.zipCode.trim(),
          },
          items: [
            {
              title: product.name,
              unit_price: product.price,
              quantity: 1,
            },
          ],
          shippingCost: 0,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.checkout_url) {
        throw new Error(data?.error || "No se pudo conectar con Mercado Pago. Intenta nuevamente o usa SPEI.");
      }

      // Redirigir inmediatamente a Mercado Pago Checkout Pro
      window.location.href = data.checkout_url;
    } catch (err: any) {
      console.error("Error al iniciar checkout con Mercado Pago:", err);
      setErrorMessage(err?.message || "Ocurrió un error al conectar con la pasarela de pago.");
      setIsProcessingCard(false);
    }
  };

  const handlePayWithSpei = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!validateShippingForm()) return;

    const orderId = `ARC-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedOrderId(orderId);
    setOrderConfirmed(true);

    const whatsappMsg = encodeURIComponent(
      `¡Hola ARCANO! He registrado mi orden ceremonial (Folio: *${orderId}*).\n\n` +
      `📦 *Pieza:* ${product.name}\n` +
      `💰 *Monto a Transferir:* $${product.price.toLocaleString("es-MX")} MXN (Envío Express a Todo México Incluido)\n\n` +
      `👤 *Receptor:* ${formData.name}\n` +
      `📱 *Teléfono:* ${formData.phone}\n` +
      `📧 *Correo:* ${formData.email || "No especificado"}\n` +
      `📍 *Dirección de Entrega:* ${formData.street} #${formData.number}, Col. ${formData.colonia || "N/A"}, C.P. ${formData.zipCode}, ${formData.city}, ${formData.state}\n` +
      `📏 *Talla de Muñeca:* ${formData.wristSize}\n` +
      (formData.notes ? `📝 *Notas de Entrega:* ${formData.notes}\n\n` : "\n") +
      `🏛️ *Datos de Transferencia:* ${BANCO_OFICIAL} · CLABE ${CLABE_OFICIAL} (${TITULAR_OFICIAL})\n\n` +
      `Adjunto mi comprobante de transferencia para programar el despacho de mi paquete.`
    );

    window.open(`https://wa.me/${brandConfig.contact.whatsappNumber}?text=${whatsappMsg}`, "_blank");
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl overflow-y-auto animate-fadeIn text-left font-sans">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] my-auto overflow-y-auto bg-[#0A0A0A] border border-[#C5A059]/50 p-5 sm:p-8 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.95)] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#161616] border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer text-sm"
          aria-label="Cerrar modal de pago"
        >
          ✕
        </button>

        {/* Encabezado Ceremonial */}
        <div className="text-center mb-6 pb-4 border-b border-neutral-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 border border-[#C5A059]/60 text-[10px] uppercase tracking-widest text-[#C5A059] mb-2 font-mono">
            <span>🔒 CHECKOUT SEGURO & ENVÍO EXPRESS A TODO MÉXICO</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl text-white tracking-wide uppercase font-light">
            Selecciona Pago & Datos de Envío
          </h2>
          
          {/* Tarjeta de Producto en Checkout */}
          <div className="flex items-center justify-center gap-3 mt-2 text-xs text-neutral-300">
            {product.imageUrl && (
              <div className="relative w-10 h-10 rounded-md overflow-hidden bg-black border border-neutral-800 shrink-0">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="text-left">
              <p className="font-medium text-white">{product.name}</p>
              <p className="text-[11px] text-[#C5A059] font-mono">
                ${product.price.toLocaleString("es-MX")} MXN · Envío Express Incluido
              </p>
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {orderConfirmed ? (
          /* PANTALLA DE PEDIDO REGISTRADO EXITOSAMENTE */
          <div className="space-y-6 text-center py-4 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-center text-3xl text-emerald-400">
              ✓
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">
                ORDEN REGISTRADA EXITOSAMENTE
              </span>
              <h3 className="text-2xl font-serif text-white mt-1">Folio: {generatedOrderId}</h3>
              <p className="text-xs text-neutral-300 mt-2 max-w-md mx-auto leading-relaxed">
                Hemos reservado tu pieza ceremonial. Realiza tu transferencia por{" "}
                <strong className="text-[#C5A059]">${product.price.toLocaleString("es-MX")} MXN</strong> para liberar la guía de envío y comenzar el empaque ceremonial.
              </p>
            </div>

            {/* FICHA BANCARIA PARA TRANSFERIR */}
            <div className="p-4 rounded-xl bg-black/80 border border-[#C5A059]/40 text-left font-mono text-xs space-y-2.5">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
                <span className="text-neutral-400">Banco Receptor:</span>
                <span className="text-white font-bold">{BANCO_OFICIAL}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
                <span className="text-neutral-400">Titular de la Cuenta:</span>
                <span className="text-[#FFE2A4] font-medium">{TITULAR_OFICIAL}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
                <span className="text-neutral-400">Monto Exacto:</span>
                <span className="text-emerald-400 font-bold text-sm">
                  ${product.price.toLocaleString("es-MX")} MXN
                </span>
              </div>
              <div className="pt-1">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-neutral-400">CLABE Interbancaria (18 dígitos):</span>
                  <button
                    type="button"
                    onClick={handleCopyClabe}
                    className="px-2.5 py-1 rounded bg-[#C5A059]/20 hover:bg-[#C5A059]/30 border border-[#C5A059]/60 text-[#FFE2A4] text-[10px] transition-all cursor-pointer font-sans"
                  >
                    {copiedClabe ? "✓ ¡Copiada!" : "📋 Copiar CLABE"}
                  </button>
                </div>
                <div className="p-2.5 rounded bg-[#111] border border-neutral-800 text-[#FFE2A4] font-bold text-sm tracking-widest text-center select-all">
                  {CLABE_OFICIAL}
                </div>
              </div>
              <div className="flex justify-between items-center text-[11px] pt-1 text-neutral-400">
                <span>Concepto / Referencia:</span>
                <span className="text-white font-bold">{generatedOrderId}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs text-neutral-300">
              💬 Se abrió una ventana de WhatsApp para que adjuntes la captura de tu transferencia. Si no se abrió, pulsa el botón verde abajo.
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  const whatsappMsg = encodeURIComponent(
                    `¡Hola ARCANO! Adjunto el comprobante de mi transferencia para la orden *${generatedOrderId}* ($${product.price} MXN - ${product.name}).`
                  );
                  window.open(`https://wa.me/${brandConfig.contact.whatsappNumber}?text=${whatsappMsg}`, "_blank");
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                💬 Enviar Comprobante por WhatsApp
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs transition-all cursor-pointer"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        ) : (
          /* FORMULARIO DE ENVÍO Y SELECCIÓN DE MÉTODO DE PAGO */
          <div className="space-y-5">
            {/* 1. SELECTOR DE MÉTODO DE PAGO */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2 block">
                SELECCIONA TU MÉTODO DE PAGO PREFERIDO:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Opción Tarjeta / Mercado Pago (Recomendada / Cero Fricción) */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentMethod === "card"
                      ? "bg-[#C5A059]/15 border-[#C5A059] ring-1 ring-[#C5A059] shadow-[0_0_20px_rgba(197,160,89,0.25)]"
                      : "bg-[#111] border-neutral-800 hover:border-neutral-700 opacity-75"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>💳</span>
                      <span>Mercado Pago · Tarjeta Crédito / Débito</span>
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/50 text-emerald-400 text-[9px] font-mono font-bold">
                      INSTANTÁNEO
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    Crédito, Débito, Meses sin intereses, Saldo Mercado Pago o Mercado Crédito.
                  </p>
                  <div className="mt-2 pt-2 border-t border-neutral-800/80 flex items-center justify-between flex-wrap gap-1.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#009EE3]/20 border border-[#009EE3]/50 text-[#009EE3] text-[9px] font-bold">
                        Mercado Pago
                      </span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-white text-[#1A1F71] font-black italic text-[9px] tracking-wider leading-none">
                        VISA
                      </span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-700 leading-none">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EB001B] inline-block"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F79E1B] -ml-1 inline-block"></span>
                        <span className="text-[8px] text-white font-bold ml-1">mastercard</span>
                      </span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#006FCF] text-white font-bold text-[8px] tracking-wider leading-none">
                        AMEX
                      </span>
                    </div>
                    <span className="text-[8px] text-emerald-400 font-mono">🔒 Cifrado 3DS</span>
                  </div>
                </button>

                {/* Opción Transferencia SPEI */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("spei")}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentMethod === "spei"
                      ? "bg-[#C5A059]/15 border-[#C5A059] ring-1 ring-[#C5A059] shadow-[0_0_20px_rgba(197,160,89,0.25)]"
                      : "bg-[#111] border-neutral-800 hover:border-neutral-700 opacity-75"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>🏛️</span>
                      <span>Transferencia SPEI</span>
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                    Transfiere desde la app de tu banco a nuestra cuenta oficial y envía comprobante.
                  </p>
                  <div className="mt-2 pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-[#C5A059] text-[9px] font-mono font-bold">
                        <span>🏛️</span>
                        <span>SPEI</span>
                      </span>
                      <span className="text-[9px] text-neutral-400 font-mono">Banca Móvil / Spin by OXXO</span>
                    </div>
                    <span className="text-[8px] text-neutral-400 font-mono">Sin comisiones</span>
                  </div>
                </button>
              </div>
            </div>

            {/* SI SELECCIONÓ SPEI: MOSTRAR FICHA BANCARIA INMUTABLE */}
            {paymentMethod === "spei" && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-black via-[#161208] to-black border border-[#C5A059]/50 shadow-inner animate-fadeIn">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#FFE2A4] font-bold flex items-center gap-1.5">
                    <span>🏛️ DATOS PARA RECIBIR TU TRANSFERENCIA SPEI</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1">
                  <div className="p-2 rounded bg-black/50 border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 block font-sans">Banco Receptor:</span>
                    <span className="text-white font-bold">{BANCO_OFICIAL}</span>
                  </div>
                  <div className="p-2 rounded bg-black/50 border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 block font-sans">Titular de la Cuenta:</span>
                    <span className="text-[#FFE2A4] font-semibold">{TITULAR_OFICIAL}</span>
                  </div>
                </div>

                <div className="mt-2.5 p-2.5 rounded-lg bg-black/70 border border-[#C5A059]/40 flex flex-col sm:flex-row items-center justify-between gap-2">
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] text-neutral-400 block font-sans">CLABE Interbancaria (SPEI):</span>
                    <span className="font-mono text-sm sm:text-base font-extrabold text-[#FFE2A4] tracking-widest select-all">
                      {CLABE_OFICIAL}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyClabe}
                    className="px-3 py-1.5 rounded-md bg-[#C5A059] hover:bg-[#d8b368] text-black font-semibold text-xs tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    {copiedClabe ? (
                      <>
                        <span>✓</span>
                        <span>¡CLABE Copiada!</span>
                      </>
                    ) : (
                      <>
                        <span>📋</span>
                        <span>Copiar CLABE</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[10px] text-neutral-400 mt-2 font-mono text-center sm:text-left">
                  💡 Llena tus datos de entrega y haz clic en &quot;Confirmar Pedido&quot;. Se abrirá WhatsApp para que adjuntes tu comprobante.
                </p>
              </div>
            )}

            {/* 2. CAMPOS DE ENTREGA */}
            <div>
              <h3 className="text-xs font-mono tracking-widest uppercase text-[#C5A059] mb-3 flex items-center gap-2">
                <span>📍 DATOS DE ENTREGA (REPÚBLICA MEXICANA)</span>
                <span className="flex-1 h-[1px] bg-neutral-800" />
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ej. Sergio Adrián Pérez"
                    className="w-full bg-[#111] border border-neutral-800 focus:border-[#C5A059] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Ej. 81 2191 2778"
                    className="w-full bg-[#111] border border-neutral-800 focus:border-[#C5A059] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                    Correo Electrónico (Para Guía de Rastreo FedEx/DHL)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu-correo@ejemplo.com"
                    className="w-full bg-[#111] border border-neutral-800 focus:border-[#C5A059] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-2 grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                      Calle y Cruzamientos *
                    </label>
                    <input
                      type="text"
                      name="street"
                      required
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder="Calle y entrecalles"
                      className="w-full bg-[#111] border border-neutral-800 focus:border-[#C5A059] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                      Número Ext / Int *
                    </label>
                    <input
                      type="text"
                      name="number"
                      required
                      value={formData.number}
                      onChange={handleInputChange}
                      placeholder="#123 Int A"
                      className="w-full bg-[#111] border border-neutral-800 focus:border-[#C5A059] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                    Colonia / Fraccionamiento
                  </label>
                  <input
                    type="text"
                    name="colonia"
                    value={formData.colonia}
                    onChange={handleInputChange}
                    placeholder="Colonia"
                    className="w-full bg-[#111] border border-neutral-800 focus:border-[#C5A059] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                    Código Postal *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="C.P. (5 dígitos)"
                    className="w-full bg-[#111] border border-neutral-800 focus:border-[#C5A059] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                    Ciudad / Municipio *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Ej. Monterrey, San Pedro..."
                    className="w-full bg-[#111] border border-neutral-800 focus:border-[#C5A059] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                    Estado *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Nuevo León, CDMX, Jalisco..."
                    className="w-full bg-[#111] border border-neutral-800 focus:border-[#C5A059] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-mono">
                      Talla de Muñeca (Ajuste Personalizado)
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-[10px] font-mono text-[#C5A059] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>📏</span> ¿Cómo medir mi muñeca?
                    </button>
                  </div>
                  <select
                    name="wristSize"
                    value={formData.wristSize}
                    onChange={handleInputChange}
                    className="w-full bg-[#111] border border-neutral-800 focus:border-[#C5A059] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                  >
                    <option value="S (16-17 cm) — Muñeca delgada">S (16-17 cm) — Muñeca delgada</option>
                    <option value="M (18-19 cm) — Estándar unisex">M (18-19 cm) — Estándar unisex (Recomendada)</option>
                    <option value="L (20-21 cm) — Muñeca amplia">L (20-21 cm) — Muñeca amplia</option>
                    <option value="XL (22 cm) — Extra amplia">XL (22 cm) — Extra amplia</option>
                  </select>
                </div>

                {/* Campo de notas/dedicatoria temporalmente oculto */}
              </div>
            </div>

            {/* BOTÓN DE ACCIÓN DINÁMICO */}
            <div className="pt-2">
              {paymentMethod === "card" ? (
                <button
                  type="button"
                  onClick={handlePayWithCard}
                  disabled={isProcessingCard}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#d8b368] to-[#C5A059] hover:brightness-110 active:scale-98 text-black font-sans font-black text-sm uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(197,160,89,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isProcessingCard ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>Conectando con Mercado Pago...</span>
                    </>
                  ) : (
                    <>
                      <span>💳 Pagar con Mercado Pago / Tarjeta (${product.price.toLocaleString("es-MX")} MXN)</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePayWithSpei}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#d8b368] to-[#C5A059] hover:brightness-110 active:scale-98 text-black font-sans font-black text-sm uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(197,160,89,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>🏛️ Confirmar Pedido y Enviar Comprobante por WhatsApp</span>
                  <span>→</span>
                </button>
              )}
              <p className="text-[10px] text-center text-neutral-400 mt-2 font-mono">
                {paymentMethod === "card"
                  ? "Al hacer clic, serás redirigido a la pasarela segura oficial de Mercado Pago para completar tu pago."
                  : "Al confirmar, se guardan tus datos de envío y se abre WhatsApp para recibir la foto de tu comprobante."}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal Independiente de Guía de Medición de Muñeca */}
      <WristSizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>,
    document.body
  );
}

