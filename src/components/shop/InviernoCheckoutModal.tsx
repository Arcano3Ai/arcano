"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { brandConfig } from "@/config/brandConfig";
import { paymentConfig } from "@/config/paymentConfig";

interface InviernoCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle?: string;
  price?: number;
}

export function InviernoCheckoutModal({
  isOpen,
  onClose,
  productTitle = "Pulsera de Lapislázuli Natural 8mm + Porta Incienso Áurico",
  price = 1299,
}: InviernoCheckoutModalProps) {
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

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
    if (!formData.street.trim() || !formData.number.trim() || !formData.zipCode.trim() || !formData.city.trim()) {
      setErrorMessage("Por favor completa los datos de tu dirección para la entrega.");
      return false;
    }
    return true;
  };

  const handlePayWithCard = async () => {
    setErrorMessage(null);
    if (!validateShippingForm()) return;

    setIsProcessingCard(true);
    const orderId = `ARC-INV-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const response = await fetch(paymentConfig.mercadoPago.checkoutApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId: "invierno-1299",
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
              title: productTitle,
              unit_price: price,
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

      // Redirigir a Mercado Pago Checkout Pro
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

    const orderId = `ARC-INV-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedOrderId(orderId);
    setOrderConfirmed(true);

    const whatsappMsg = encodeURIComponent(
      `¡Hola ARCANO! He registrado mi pedido para la *Colección de Invierno* (Folio: *${orderId}*).\n\n` +
      `📦 *Pieza:* ${productTitle}\n` +
      `💰 *Monto a Pagar:* $${price.toLocaleString("es-MX")} MXN (Envío Gratis a Todo México + Porta Incienso de Regalo)\n\n` +
      `👤 *Receptor:* ${formData.name}\n` +
      `📱 *Teléfono:* ${formData.phone}\n` +
      `📧 *Correo:* ${formData.email || "No especificado"}\n` +
      `📍 *Dirección de Entrega:* ${formData.street} #${formData.number}, Col. ${formData.colonia || "N/A"}, C.P. ${formData.zipCode}, ${formData.city}, ${formData.state}\n` +
      `📏 *Talla de Muñeca:* ${formData.wristSize}\n` +
      (formData.notes ? `📝 *Notas:* ${formData.notes}\n\n` : "\n") +
      `🏛️ *Datos de Transferencia:* Mercado Pago W · CLABE ${CLABE_OFICIAL} (${TITULAR_OFICIAL})\n\n` +
      `Adjunto mi comprobante de transferencia para programar el despacho de mi paquete.`
    );

    window.open(`https://wa.me/${brandConfig.contact.whatsappNumber}?text=${whatsappMsg}`, "_blank");
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl overflow-y-auto animate-fadeIn text-left font-sans">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] my-auto overflow-y-auto bg-[#0A0A0A] border border-[#D4AF37]/50 p-5 sm:p-8 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.95)] text-white"
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

        {/* Encabezado */}
        <div className="text-center mb-6 pb-4 border-b border-neutral-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 border border-[#D4AF37]/60 text-[10px] uppercase tracking-widest text-[#FFE2A4] mb-2 font-mono">
            <span>🔒 PAGO DIRECTO POR TRANSFERENCIA SPEI</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl text-white tracking-wide uppercase font-light">
            Datos de Envío & Transferencia
          </h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
            {productTitle} ·{" "}
            <strong className="text-[#FFE2A4] font-medium font-serif text-sm">
              ${price.toLocaleString("es-MX")} MXN (Envío Gratis a Todo México)
            </strong>
          </p>
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
                Hemos reservado tu pulsera y el Porta Incienso Áurico de regalo. Realiza tu transferencia por{" "}
                <strong className="text-[#FFE2A4]">${price.toLocaleString("es-MX")} MXN</strong> para liberar la guía de envío.
              </p>
            </div>

            {/* FICHA BANCARIA PARA TRANSFERIR */}
            <div className="p-4 rounded-xl bg-black/80 border border-[#D4AF37]/40 text-left font-mono text-xs space-y-2.5">
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
                <span className="text-emerald-400 font-bold text-sm">${price.toLocaleString("es-MX")} MXN</span>
              </div>
              <div className="pt-1">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-neutral-400">CLABE Interbancaria (18 dígitos):</span>
                  <button
                    type="button"
                    onClick={handleCopyClabe}
                    className="px-2.5 py-1 rounded bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/60 text-[#FFE2A4] text-[10px] transition-all cursor-pointer font-sans"
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
              💬 Se abrió una ventana de WhatsApp para que adjuntes la captura de pantalla de tu transferencia. Si no se abrió, pulsa el botón abajo.
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  const whatsappMsg = encodeURIComponent(
                    `¡Hola ARCANO! Adjunto el comprobante de mi transferencia para la orden *${generatedOrderId}* ($${price} MXN).`
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
                      ? "bg-[#D4AF37]/15 border-[#D4AF37] ring-1 ring-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]"
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
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 bg-[#009EE3]/15 border border-[#009EE3]/40 rounded text-[#009EE3] text-[9px] font-bold">
                        Mercado Pago
                      </span>
                      <span className="text-[9px] text-neutral-400 font-mono">VISA · Mastercard · AMEX</span>
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
                      ? "bg-[#D4AF37]/15 border-[#D4AF37] ring-1 ring-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]"
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
                </button>
              </div>
            </div>

            {/* SI SELECCIONÓ SPEI: MOSTRAR FICHA BANCARIA INMUTABLE */}
            {paymentMethod === "spei" && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-black via-[#161208] to-black border border-[#D4AF37]/50 shadow-inner animate-fadeIn">
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

              <div className="mt-2.5 p-2.5 rounded-lg bg-black/70 border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="text-center sm:text-left">
                  <span className="text-[10px] text-neutral-400 block font-sans">CLABE Interbancaria (SPEI):</span>
                  <span className="font-mono text-sm sm:text-base font-extrabold text-[#FFE2A4] tracking-widest select-all">
                    {CLABE_OFICIAL}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyClabe}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#c29d2f] text-black font-sans font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)] cursor-pointer"
                >
                  {copiedClabe ? "✓ ¡Copiada!" : "📋 Copiar CLABE"}
                </button>
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-400 font-sans">
                <span>Monto a transferir: <strong className="text-white">${price.toLocaleString("es-MX")} MXN</strong></span>
                <span className="text-emerald-400">✓ Envío Gratis a Todo México</span>
              </div>
            </div>
            )}

            {/* SI SELECCIONÓ TARJETA: MICRO-BADGES DE CONFIANZA MERCADO PAGO */}
            {paymentMethod === "card" && (
              <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/20 via-black to-emerald-950/20 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs animate-fadeIn">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 text-base">🔒</span>
                  <div>
                    <p className="font-medium text-white text-[11px]">Checkout Pro Seguro con Mercado Pago</p>
                    <p className="text-[10px] text-neutral-400">Cifrado SSL de 256 bits · Protección al Comprador Arcano</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-neutral-300">
                  <span className="px-1.5 py-0.5 rounded bg-black/60 border border-neutral-800">VISA</span>
                  <span className="px-1.5 py-0.5 rounded bg-black/60 border border-neutral-800">MC</span>
                  <span className="px-1.5 py-0.5 rounded bg-black/60 border border-neutral-800">AMEX</span>
                  <span className="px-1.5 py-0.5 rounded bg-black/60 border border-neutral-800">DÉBITO</span>
                </div>
              </div>
            )}

            {/* 2. DATOS DE DESTINO / ENVÍO */}
            <div className="space-y-3 pt-1">
              <h3 className="text-xs font-mono tracking-widest uppercase text-[#FFE2A4] flex items-center gap-2">
                <span>📦 DATOS PARA LA GUÍA DE ENVÍO</span>
                <span className="flex-1 h-[1px] bg-neutral-800" />
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                    Nombre Completo de Quien Recibe *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ej. Sergio Pérez"
                    className="w-full bg-[#111] border border-neutral-800 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-white outline-none transition-colors"
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
                    placeholder="Ej. 81 1234 5678"
                    className="w-full bg-[#111] border border-neutral-800 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                    Correo Electrónico (Para envío de Guía de Rastreo)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ejemplo@correo.com"
                    className="w-full bg-[#111] border border-neutral-800 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-2 grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                      Calle *
                    </label>
                    <input
                      type="text"
                      name="street"
                      required
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder="Calle o Avenida"
                      className="w-full bg-[#111] border border-neutral-800 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                      Número Ext/Int *
                    </label>
                    <input
                      type="text"
                      name="number"
                      required
                      value={formData.number}
                      onChange={handleInputChange}
                      placeholder="#123"
                      className="w-full bg-[#111] border border-neutral-800 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                    Colonia / Sector
                  </label>
                  <input
                    type="text"
                    name="colonia"
                    value={formData.colonia}
                    onChange={handleInputChange}
                    placeholder="Colonia"
                    className="w-full bg-[#111] border border-neutral-800 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                    Código Postal (C.P.) *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="C.P. 64000"
                    className="w-full bg-[#111] border border-neutral-800 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-white outline-none transition-colors"
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
                    placeholder="Monterrey, CDMX, Guadalajara..."
                    className="w-full bg-[#111] border border-neutral-800 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-white outline-none transition-colors"
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
                    placeholder="Nuevo León, Jalisco, etc."
                    className="w-full bg-[#111] border border-neutral-800 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                    Talla de Muñeca (Ajuste Perfecto)
                  </label>
                  <select
                    name="wristSize"
                    value={formData.wristSize}
                    onChange={handleInputChange}
                    className="w-full bg-[#111] border border-neutral-800 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                  >
                    <option value="S (16-17 cm) — Fina">S (16-17 cm) — Fina</option>
                    <option value="M (18-19 cm) — Estándar">M (18-19 cm) — Estándar</option>
                    <option value="L (20-21 cm) — Amplia">L (20-21 cm) — Amplia</option>
                    <option value="XL (22 cm) — Extra">XL (22 cm) — Extra</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                    Instrucciones Especiales / Dedicatoria
                  </label>
                  <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Opcional: entre calles, etc."
                    className="w-full bg-[#111] border border-neutral-800 focus:border-[#D4AF37] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* BOTÓN DE ACCIÓN DINÁMICO */}
            <div className="pt-2">
              {paymentMethod === "card" ? (
                <button
                  type="button"
                  onClick={handlePayWithCard}
                  disabled={isProcessingCard}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] hover:brightness-110 active:scale-98 text-black font-sans font-black text-sm uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isProcessingCard ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>Conectando con Mercado Pago...</span>
                    </>
                  ) : (
                    <>
                      <span>💳 Pagar con Mercado Pago / Tarjeta (${price.toLocaleString("es-MX")} MXN)</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePayWithSpei}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] hover:brightness-110 active:scale-98 text-black font-sans font-black text-sm uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>🏛️ Confirmar Pedido y Enviar Comprobante por WhatsApp</span>
                  <span>→</span>
                </button>
              )}
              <p className="text-[10px] text-center text-neutral-500 mt-2 font-mono">
                {paymentMethod === "card"
                  ? "Al hacer clic, serás redirigido a la pasarela segura oficial de Mercado Pago para completar tu pago."
                  : "Al confirmar, se guardan tus datos de envío y se abre el chat para recibir la foto de tu comprobante."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
