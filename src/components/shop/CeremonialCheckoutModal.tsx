"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { paymentConfig } from "@/config/paymentConfig";

interface CeremonialCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentGateway = "mercadopago" | "stripe" | "paypal" | "spei_direct" | "whatsapp";

export function CeremonialCheckoutModal({ isOpen, onClose }: CeremonialCheckoutModalProps) {
  const { items, totalCount, subtotal, hasFreeShipping, getWhatsAppOrderUrl, clearCart } = useCart();

  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway>("mercadopago");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Formulario de Envío
  const [shippingForm, setShippingForm] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    number: "",
    colonia: "",
    city: "",
    state: "Nuevo León",
    zipCode: "",
    wristSize: "M (18-19 cm)",
    notes: "",
  });

  if (!isOpen) return null;

  const shippingCost = hasFreeShipping ? 0 : 150;
  const finalTotal = subtotal + shippingCost;
  const orderId = `ARC-${Date.now().toString(36).toUpperCase()}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProcessPayment = async () => {
    setErrorMessage(null);

    // Validación básica
    if (!shippingForm.name.trim() || !shippingForm.email.trim() || !shippingForm.phone.trim()) {
      setErrorMessage("Por favor completa tu Nombre, Correo y Teléfono de contacto.");
      return;
    }
    if (!shippingForm.street.trim() || !shippingForm.number.trim() || !shippingForm.zipCode.trim() || !shippingForm.city.trim()) {
      setErrorMessage("Por favor completa tu dirección de entrega para preparar la guía de envío.");
      return;
    }

    setIsProcessing(true);

    try {
      const payload = {
        orderId,
        items,
        shippingCost,
        payer: {
          name: shippingForm.name,
          email: shippingForm.email,
          phone: shippingForm.phone,
          address: {
            street: shippingForm.street,
            number: shippingForm.number,
            colonia: shippingForm.colonia,
            city: shippingForm.city,
            state: shippingForm.state,
            zipCode: shippingForm.zipCode,
          },
          wristSize: shippingForm.wristSize,
          notes: shippingForm.notes,
        },
      };

      // 1. Caso SPEI Directo (Cero Comisiones a cuenta oficial de Sergio Adrián Pérez Villarreal)
      if (selectedGateway === "spei_direct") {
        window.location.href = `/checkout/pending?gateway=spei_direct&order_id=${orderId}&amount=${finalTotal}&name=${encodeURIComponent(shippingForm.name)}`;
        return;
      }

      // 2. Caso WhatsApp Concierge
      if (selectedGateway === "whatsapp") {
        window.open(getWhatsAppOrderUrl(), "_blank");
        onClose();
        return;
      }

      // 3. Caso Mercado Pago, Stripe o PayPal en arquitectura estática (GitHub Pages)
      // Generar orden ceremonial y conectar con el Concierge Oficial para enlace seguro
      const gatewayNames: Record<string, string> = {
        mercadopago: "Mercado Pago (Tarjetas, OXXO, hasta 12 MSI)",
        stripe: "Stripe (Apple Pay, Google Pay, Tarjetas Internacionales)",
        paypal: "PayPal Express",
      };

      const selectedName = gatewayNames[selectedGateway] || "Pago Digital";
      const customWhatsAppMessage = encodeURIComponent(
        `¡Hola ARCANO! He generado mi orden ceremonial *${orderId}* por *${selectedName}*.\n\n` +
        `📦 *Resumen de Orden:*\n` +
        items.map(item => `• ${item.quantity}x ${item.name} (${item.optionLabel || "Edición Sagrada"}) - $${(item.price * item.quantity).toLocaleString("es-MX")} MXN`).join("\n") +
        `\n\n💰 *Total a pagar:* $${finalTotal.toLocaleString("es-MX")} MXN\n` +
        `📍 *Destino:* ${shippingForm.street} #${shippingForm.number}, Col. ${shippingForm.colonia}, ${shippingForm.city}, ${shippingForm.state} CP ${shippingForm.zipCode}\n` +
        `👤 *Titular:* ${shippingForm.name} (${shippingForm.phone})\n\n` +
        `¿Me podrían proporcionar el enlace de pago oficial para completar la consagración?`
      );

      window.open(`https://wa.me/528180923854?text=${customWhatsAppMessage}`, "_blank");
      window.location.href = `/checkout/pending?gateway=${selectedGateway}&order_id=${orderId}&amount=${finalTotal}&name=${encodeURIComponent(shippingForm.name)}`;
      return;
    } catch (err: any) {
      console.error("Error al procesar pago:", err);
      setErrorMessage(err.message || "Ocurrió un error inesperado al iniciar el pago.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn text-left font-sans">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0A0A0A] border border-[#C5A059]/40 p-5 sm:p-8 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.95),0_0_30px_rgba(197,160,89,0.25)] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#141414] border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer text-sm"
          aria-label="Cerrar checkout"
        >
          ✕
        </button>

        {/* Encabezado Ceremonial */}
        <div className="text-center mb-6 pb-4 border-b border-neutral-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 border border-[#C5A059]/60 text-[9px] uppercase tracking-widest text-[#C5A059] mb-2 font-mono">
            <span>🔒 CHECKOUT CIFRADO SSL 256-BIT</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-white tracking-widest uppercase font-light">
            Portal de Pago Ceremonial
          </h2>
          <p className="text-xs text-neutral-400 font-light mt-1">
            {totalCount} {totalCount === 1 ? "pieza consagrada" : "piezas consagradas"} · Total a Pagar:{" "}
            <strong className="text-[#C5A059] font-medium font-serif text-sm">
              MXN ${finalTotal.toLocaleString("es-MX")}
            </strong>
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMNA IZQUIERDA: FORMULARIO DE ENVÍO */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-mono tracking-widest uppercase text-[#C5A059] flex items-center gap-2">
              <span>1. DATOS DE DESTINO & RECEPTOR</span>
              <span className="w-8 h-[1px] bg-[#C5A059]/40" />
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={shippingForm.name}
                  onChange={handleInputChange}
                  placeholder="Ej. Sergio Pérez"
                  className="w-full bg-[#111111] border border-neutral-800 focus:border-[#C5A059] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={shippingForm.phone}
                  onChange={handleInputChange}
                  placeholder="Ej. 81 1234 5678"
                  className="w-full bg-[#111111] border border-neutral-800 focus:border-[#C5A059] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                  Correo Electrónico (Para Guía de Rastreo) *
                </label>
                <input
                  type="email"
                  name="email"
                  value={shippingForm.email}
                  onChange={handleInputChange}
                  placeholder="ejemplo@correo.com"
                  className="w-full bg-[#111111] border border-neutral-800 focus:border-[#C5A059] rounded-lg px-3 py-2 text-white outline-none transition-colors"
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
                    value={shippingForm.street}
                    onChange={handleInputChange}
                    placeholder="Calle, Av. o Calzada"
                    className="w-full bg-[#111111] border border-neutral-800 focus:border-[#C5A059] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                    Número Ext/Int *
                  </label>
                  <input
                    type="text"
                    name="number"
                    value={shippingForm.number}
                    onChange={handleInputChange}
                    placeholder="#123 Int 4"
                    className="w-full bg-[#111111] border border-neutral-800 focus:border-[#C5A059] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                  Colonia / Barrio
                </label>
                <input
                  type="text"
                  name="colonia"
                  value={shippingForm.colonia}
                  onChange={handleInputChange}
                  placeholder="Colonia"
                  className="w-full bg-[#111111] border border-neutral-800 focus:border-[#C5A059] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                  Código Postal *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={shippingForm.zipCode}
                  onChange={handleInputChange}
                  placeholder="C.P. 64000"
                  className="w-full bg-[#111111] border border-neutral-800 focus:border-[#C5A059] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                  Ciudad / Municipio *
                </label>
                <input
                  type="text"
                  name="city"
                  value={shippingForm.city}
                  onChange={handleInputChange}
                  placeholder="Monterrey, CDMX, GDL..."
                  className="w-full bg-[#111111] border border-neutral-800 focus:border-[#C5A059] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                  Estado
                </label>
                <input
                  type="text"
                  name="state"
                  value={shippingForm.state}
                  onChange={handleInputChange}
                  className="w-full bg-[#111111] border border-neutral-800 focus:border-[#C5A059] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                  Talla de Muñeca (Brazaletes)
                </label>
                <select
                  name="wristSize"
                  value={shippingForm.wristSize}
                  onChange={handleInputChange}
                  className="w-full bg-[#111111] border border-neutral-800 focus:border-[#C5A059] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                >
                  <option value="S (16-17 cm)">S (16-17 cm) — Fina</option>
                  <option value="M (18-19 cm)">M (18-19 cm) — Estándar</option>
                  <option value="L (20-21 cm)">L (20-21 cm) — Amplia</option>
                  <option value="XL (22 cm)">XL (22 cm) — Extra</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                  Notas de Entrega / Dedicatoria
                </label>
                <input
                  type="text"
                  name="notes"
                  value={shippingForm.notes}
                  onChange={handleInputChange}
                  placeholder="Opcional: mensaje de regalo"
                  className="w-full bg-[#111111] border border-neutral-800 focus:border-[#C5A059] rounded-lg px-3 py-2 text-white outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: SELECCIÓN DE MÉTODO DE PAGO */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-mono tracking-widest uppercase text-[#C5A059] flex items-center gap-2">
              <span>2. MÉTODO DE PAGO</span>
              <span className="w-8 h-[1px] bg-[#C5A059]/40" />
            </h3>

            <div className="space-y-2.5">
              
              {/* Opción 1: Mercado Pago (Líder México) */}
              <label
                onClick={() => setSelectedGateway("mercadopago")}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedGateway === "mercadopago"
                    ? "bg-[#009EE3]/10 border-[#009EE3] shadow-[0_0_20px_rgba(0,158,227,0.3)] ring-1 ring-[#009EE3]"
                    : "bg-[#111111] border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <input
                  type="radio"
                  name="paymentGateway"
                  checked={selectedGateway === "mercadopago"}
                  onChange={() => setSelectedGateway("mercadopago")}
                  className="mt-1 accent-[#009EE3]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white flex items-center gap-1.5">
                      <span>💙 Mercado Pago</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#009EE3]/20 text-[#009EE3] text-[9px] font-mono font-bold">
                      MÁS POPULAR MX
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-300 mt-1 leading-snug">
                    Tarjetas Débito/Crédito, <strong>SPEI Inmediato</strong>, <strong>OXXO Efectivo</strong> y hasta 12 MSI.
                  </p>
                </div>
              </label>

              {/* Opción 2: Stripe (Google Pay / Apple Pay & Tarjetas) */}
              <label
                onClick={() => setSelectedGateway("stripe")}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedGateway === "stripe"
                    ? "bg-[#635BFF]/10 border-[#635BFF] shadow-[0_0_20px_rgba(99,91,255,0.3)] ring-1 ring-[#635BFF]"
                    : "bg-[#111111] border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <input
                  type="radio"
                  name="paymentGateway"
                  checked={selectedGateway === "stripe"}
                  onChange={() => setSelectedGateway("stripe")}
                  className="mt-1 accent-[#635BFF]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white flex items-center gap-1.5">
                      <span>💳 Stripe · Google Pay / Apple Pay</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#635BFF]/20 text-[#9B95FF] text-[9px] font-mono font-bold">
                      1 CLIC
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-300 mt-1 leading-snug">
                    Pago instantáneo con huella/FaceID (Google Pay / Apple Pay) o tarjetas internacionales.
                  </p>
                </div>
              </label>

              {/* Opción 3: PayPal */}
              <label
                onClick={() => setSelectedGateway("paypal")}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedGateway === "paypal"
                    ? "bg-[#0070BA]/10 border-[#0070BA] shadow-[0_0_20px_rgba(0,112,186,0.3)] ring-1 ring-[#0070BA]"
                    : "bg-[#111111] border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <input
                  type="radio"
                  name="paymentGateway"
                  checked={selectedGateway === "paypal"}
                  onChange={() => setSelectedGateway("paypal")}
                  className="mt-1 accent-[#0070BA]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">
                      🅿️ PayPal
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-[9px] font-mono font-bold">
                      PROTEGIDO
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-300 mt-1 leading-snug">
                    Paga con saldo o tarjetas vinculadas a tu cuenta PayPal con Protección al Comprador.
                  </p>
                </div>
              </label>

              {/* Opción 4: Transferencia SPEI Directa (Cero Comisiones) */}
              <label
                onClick={() => setSelectedGateway("spei_direct")}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedGateway === "spei_direct"
                    ? "bg-[#C5A059]/10 border-[#C5A059] shadow-[0_0_20px_rgba(197,160,89,0.3)] ring-1 ring-[#C5A059]"
                    : "bg-[#111111] border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <input
                  type="radio"
                  name="paymentGateway"
                  checked={selectedGateway === "spei_direct"}
                  onChange={() => setSelectedGateway("spei_direct")}
                  className="mt-1 accent-[#C5A059]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">
                      🏛️ Transferencia SPEI Directa
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#C5A059]/20 text-[#C5A059] text-[9px] font-mono font-bold">
                      0% COMISIÓN
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-300 mt-1 leading-snug">
                    Transfiere desde tu app bancaria a nuestra cuenta oficial <strong>Mercado Pago W</strong> y envía tu comprobante.
                  </p>
                </div>
              </label>

              {/* Opción 5: WhatsApp Concierge */}
              <label
                onClick={() => setSelectedGateway("whatsapp")}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedGateway === "whatsapp"
                    ? "bg-[#25D366]/10 border-[#25D366] shadow-[0_0_20px_rgba(37,211,102,0.3)] ring-1 ring-[#25D366]"
                    : "bg-[#111111] border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <input
                  type="radio"
                  name="paymentGateway"
                  checked={selectedGateway === "whatsapp"}
                  onChange={() => setSelectedGateway("whatsapp")}
                  className="mt-1 accent-[#25D366]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">
                      💬 WhatsApp Concierge
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#25D366]/20 text-[#25D366] text-[9px] font-mono font-bold">
                      PERSONALIZADO
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-300 mt-1 leading-snug">
                    Atención personalizada uno a uno con un maestro de la orden para asesoría y pago manual.
                  </p>
                </div>
              </label>
            </div>

            {/* Resumen Financiero */}
            <div className="p-4 rounded-xl bg-[#141414] border border-neutral-800 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal ({totalCount} piezas):</span>
                <span>MXN ${subtotal.toLocaleString("es-MX")}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Envío Express Asegurado:</span>
                <span className={hasFreeShipping ? "text-[#C5A059] font-medium" : "text-white"}>
                  {hasFreeShipping ? "Gratis" : `MXN $${shippingCost.toLocaleString("es-MX")}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif text-white pt-2 border-t border-neutral-800">
                <span className="text-[#C5A059]">Total a Pagar:</span>
                <span className="font-bold text-[#C5A059]">MXN ${finalTotal.toLocaleString("es-MX")}</span>
              </div>
            </div>

            {/* Botón de Acción Principal */}
            <button
              onClick={handleProcessPayment}
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-sans text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
                isProcessing
                  ? "bg-neutral-800 text-neutral-400 cursor-not-allowed"
                  : selectedGateway === "mercadopago"
                  ? "bg-[#009EE3] hover:bg-[#0089C7] text-white shadow-[0_0_25px_rgba(0,158,227,0.4)]"
                  : selectedGateway === "stripe"
                  ? "bg-[#635BFF] hover:bg-[#5349E0] text-white shadow-[0_0_25px_rgba(99,91,255,0.4)]"
                  : selectedGateway === "paypal"
                  ? "bg-[#FFC439] hover:bg-[#E5AF32] text-black shadow-[0_0_25px_rgba(255,196,57,0.4)]"
                  : selectedGateway === "spei_direct"
                  ? "bg-[#C5A059] hover:bg-[#d8b368] text-black shadow-[0_0_25px_rgba(197,160,89,0.4)]"
                  : "bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-[0_0_25px_rgba(37,211,102,0.4)]"
              }`}
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Conectando Pasarela...</span>
                </>
              ) : selectedGateway === "mercadopago" ? (
                <>
                  <span>Pagar con Mercado Pago · MXN ${finalTotal.toLocaleString("es-MX")}</span>
                  <span>↗</span>
                </>
              ) : selectedGateway === "stripe" ? (
                <>
                  <span>Pagar con Google Pay / Tarjeta · MXN ${finalTotal.toLocaleString("es-MX")}</span>
                  <span>🔒</span>
                </>
              ) : selectedGateway === "paypal" ? (
                <>
                  <span>Pagar con PayPal · MXN ${finalTotal.toLocaleString("es-MX")}</span>
                  <span>↗</span>
                </>
              ) : selectedGateway === "spei_direct" ? (
                <>
                  <span>Generar Ficha SPEI (CLABE Oficial)</span>
                  <span>🏛️</span>
                </>
              ) : (
                <>
                  <span>Completar por WhatsApp con un Asesor</span>
                  <span>💬</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
