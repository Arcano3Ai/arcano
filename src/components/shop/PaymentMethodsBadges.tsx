"use client";

import React from "react";

export function MercadoPagoLogo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#009EE3] text-white font-sans font-bold text-[10px] shadow-sm select-none shrink-0 transition-transform hover:scale-105 ${className}`}
      title="Mercado Pago"
    >
      {/* Handshake Oficial Mercado Pago */}
      <svg className="w-3.5 h-3 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.9 9.5c-.7-.7-1.7-1-2.7-.8l-4.4-2.5c-.4-.2-.8-.2-1.2 0L8.1 8.8c-.8.5-1.1 1.4-.9 2.3.2.9.9 1.6 1.8 1.8l3.1.6-3.8 2.2c-.4.2-.6.7-.6 1.1 0 .5.3.9.7 1.1l2.5 1.5c.4.2.8.2 1.2 0l4.5-2.6 1.9 1.1c.4.2.8.2 1.2 0l3-1.7c.6-.3.9-1 .8-1.7-.1-.6-.5-1.2-1.1-1.4l-1.9-1.1 1.9-1.1c.7-.4 1.1-1.1 1-1.9-.1-.8-.6-1.4-1.3-1.7zm-2.4 1.4l-2.4 1.4-3.1-.6 4.3-2.5c.4-.1.8 0 1 .3.3.4.3.9.2 1.4z" />
      </svg>
      <span className="tracking-tight leading-none text-white font-extrabold lowercase">
        mercado<span className="font-light">pago</span>
      </span>
    </div>
  );
}

export function VisaLogo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center justify-center px-2 py-1 rounded bg-white text-[#1A1F71] font-black italic text-[11px] tracking-wider shadow-sm select-none shrink-0 leading-none ${className}`}
      title="Visa"
    >
      <span className="text-[#F7B600]">V</span>
      <span>ISA</span>
    </div>
  );
}

export function MastercardLogo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-1 rounded bg-[#161616] border border-neutral-700 shadow-sm select-none shrink-0 leading-none ${className}`}
      title="Mastercard"
    >
      <div className="relative flex items-center">
        <span className="w-3 h-3 rounded-full bg-[#EB001B] inline-block"></span>
        <span className="w-3 h-3 rounded-full bg-[#F79E1B] -ml-1.5 opacity-90 inline-block"></span>
      </div>
      <span className="text-[9px] text-white font-bold tracking-tight font-sans">mastercard</span>
    </div>
  );
}

export function AmexLogo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center justify-center px-2 py-1 rounded bg-[#006FCF] text-white font-black text-[9px] tracking-widest shadow-sm select-none shrink-0 leading-none ${className}`}
      title="American Express"
    >
      AMEX
    </div>
  );
}

export function SpeiLogo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#091D13] border border-emerald-500/40 text-emerald-300 font-mono text-[9px] font-bold shadow-sm select-none shrink-0 leading-none ${className}`}
      title="SPEI Transferencia Inmediata"
    >
      <svg className="w-3 h-3 fill-current text-emerald-400" viewBox="0 0 24 24">
        <path d="M12 2L2 7v3h20V7L12 2zm1 16h3v-6h-3v6zm-5 0h3v-6H8v6zm-5 2h18v2H3v-2zm1-8h3v-6H4v6zm13 0h3v-6h-3v6z" />
      </svg>
      <span>SPEI</span>
    </div>
  );
}

export function OxxoLogo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center justify-center px-2 py-1 rounded bg-[#D52B1E] border border-[#FFD100]/40 text-[#FFD100] font-black text-[9px] tracking-wider shadow-sm select-none shrink-0 leading-none ${className}`}
      title="OXXO Pay"
    >
      OXXO
    </div>
  );
}

interface PaymentMethodsBadgesProps {
  className?: string;
  showSpei?: boolean;
  showOxxo?: boolean;
}

export function PaymentMethodsBadges({
  className = "",
  showSpei = true,
  showOxxo = true,
}: PaymentMethodsBadgesProps) {
  return (
    <div className={`flex items-center gap-1.5 flex-wrap ${className}`}>
      <MercadoPagoLogo />
      <VisaLogo />
      <MastercardLogo />
      <AmexLogo />
      {showSpei && <SpeiLogo />}
      {showOxxo && <OxxoLogo />}
    </div>
  );
}
