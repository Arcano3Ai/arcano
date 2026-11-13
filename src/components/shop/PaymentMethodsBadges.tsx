"use client";

import React from "react";

/**
 * 🔒 LOGOS OFICIALES DE MÉTODOS DE PAGO PARA ARCANO
 * Vector SVG de alta definición con diseño institucional auténtico:
 * - Mercado Pago (Pill oficial azul #009EE3, apretón de manos vectorial y tipografía de marca)
 * - Visa (Pill oficial blanco con tipografía Visa corporativa en azul #1434CB y ala dorada #F7B600)
 * - Mastercard (Pill oscuro con círculos entrelazados rojo #EB001B y naranja #F79E1B con lente translúcida)
 * - American Express (Pill corporativo azul #016FD0 con tipografía stencil AMEX)
 * - SPEI (Insignia Banxico verde esmeralda con ondas de transmisión interbancaria)
 * - OXXO (Pill oficial rojo institucional con contorno amarillo #FFD200 y tipografía OXXO)
 */

export function MercadoPagoLogo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-105 select-none ${className}`}
      title="Mercado Pago Oficial"
    >
      <svg
        className="h-5 w-auto drop-shadow-sm"
        viewBox="0 0 114 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="114" height="24" rx="4" fill="#009EE3" />
        {/* Handshake Oficial Vectorial */}
        <g transform="translate(6, 3.5) scale(0.7)" fill="#FFFFFF">
          <path d="M11.115 16.479a.93.927 0 0 1-.939-.886c-.002-.042-.006-.155-.103-.155-.04 0-.074.023-.113.059-.112.103-.254.206-.46.206a.816.814 0 0 1-.305-.066c-.535-.214-.542-.578-.521-.725.006-.038.007-.08-.02-.11l-.032-.03h-.034c-.027 0-.055.012-.093.039a.788.786 0 0 1-.454.16.7.699 0 0 1-.253-.05c-.708-.27-.65-.928-.617-1.126.005-.041-.005-.072-.03-.092l-.05-.04-.047.043a.728.726 0 0 1-.505.203.73.728 0 0 1-.732-.725c0-.4.328-.722.732-.722.364 0 .675.27.721.63l.026.195.11-.165c.01-.018.307-.46.852-.46.102 0 .21.016.316.05.434.13.508.52.519.68.008.094.075.1.09.1.037 0 .064-.024.083-.045a.746.744 0 0 1 .54-.225c.128 0 .263.03.402.09.69.293.379 1.158.374 1.167-.058.144-.061.207-.005.244l.027.013h.02c.03 0 .07-.014.134-.035.093-.032.235-.08.367-.08a.944.942 0 0 1 .94.93.936.934 0 0 1-.94.928zm7.302-4.171c-1.138-.98-3.768-3.24-4.481-3.77-.406-.302-.685-.462-.928-.533a1.559 1.554 0 0 0-.456-.07c-.182 0-.376.032-.58.095-.46.145-.918.505-1.362.854l-.023.018c-.414.324-.84.66-1.164.73a1.986 1.98 0 0 1-.43.049c-.362 0-.687-.104-.81-.258-.02-.025-.007-.066.04-.125l.008-.008 1-1.067c.783-.774 1.525-1.506 3.23-1.545h.085c1.062 0 2.12.469 2.24.524a7.03 7.03 0 0 0 3.056.724c1.076 0 2.188-.263 3.354-.795a9.135 9.11 0 0 0-.405-.317c-1.025.44-2.003.66-2.946.66-.962 0-1.925-.229-2.858-.68-.05-.022-1.22-.567-2.44-.57-.032 0-.065 0-.096.002-1.434.033-2.24.536-2.782.976-.528.013-.982.138-1.388.25-.361.1-.673.186-.979.185-.125 0-.35-.01-.37-.012-.35-.01-2.115-.437-3.518-.962-.143.1-.28.203-.415.31 1.466.593 3.25 1.053 3.812 1.089.157.01.323.027.491.027.372 0 .744-.103 1.104-.203.213-.059.446-.123.692-.17l-.196.194-1.017 1.087c-.08.08-.254.294-.14.557a.705.703 0 0 0 .268.292c.243.162.677.27 1.08.271.152 0 .297-.015.43-.044.427-.095.874-.448 1.349-.82.377-.296.913-.672 1.323-.782a1.494 1.49 0 0 1 .37-.05.611.61 0 0 1 .095.005c.27.034.533.125 1.003.472.835.62 4.531 3.815 4.566 3.846.002.002.238.203.22.537-.007.186-.11.352-.294.466a.902.9 0 0 1-.484.15.804.802 0 0 1-.428-.124c-.014-.01-1.28-1.157-1.746-1.543-.074-.06-.146-.115-.22-.115a.122.122 0 0 0-.096.045c-.073.09.01.212.105.294l1.48 1.47c.002 0 .184.17.204.395.012.244-.106.447-.35.606a.957.955 0 0 1-.526.171.766.764 0 0 1-.42-.127l-.214-.206a21.035 20.978 0 0 0-1.08-1.009c-.072-.058-.148-.112-.221-.112a.127.127 0 0 0-.094.038c-.033.037-.056.103.028.212a.698.696 0 0 0 .075.083l1.078 1.198c.01.01.222.26.024.511l-.038.048a1.18 1.178 0 0 1-.1.096c-.184.15-.43.164-.527.164a.8.798 0 0 1-.147-.012c-.106-.018-.178-.048-.212-.089l-.013-.013c-.06-.06-.602-.609-1.054-.98-.059-.05-.133-.11-.21-.11a.128.128 0 0 0-.096.042c-.09.096.044.24.1.293l.92 1.003a.204.204 0 0 1-.033.062c-.033.044-.144.155-.479.196a.91.907 0 0 1-.122.007c-.345 0-.712-.164-.902-.264a1.343 1.34 0 0 0 .13-.576 1.368 1.365 0 0 0-1.42-1.357c.024-.342-.025-.99-.697-1.274a1.455 1.452 0 0 0-.575-.125c-.146 0-.287.025-.42.075a1.153 1.15 0 0 0-.671-.564 1.52 1.515 0 0 0-.494-.085c-.28 0-.537.08-.767.242a1.168 1.165 0 0 0-.903-.43 1.173 1.17 0 0 0-.82.335c-.287-.217-1.425-.93-4.467-1.613a17.39 17.344 0 0 1-.692-.189 4.822 4.82 0 0 0-.077.494l.67.157c3.108.682 4.136 1.391 4.309 1.525a1.145 1.142 0 0 0-.09.442 1.16 1.158 0 0 0 1.378 1.132c.096.467.406.821.879 1.003a1.165 1.162 0 0 0 .415.08c.09 0 .179-.012.266-.034.086.22.282.493.722.668a1.233 1.23 0 0 0 .457.094c.122 0 .241-.022.355-.063a1.373 1.37 0 0 0 1.269.841c.37.002.726-.147.985-.41.221.121.688.341 1.163.341.06 0 .118-.002.175-.01.47-.059.689-.24.789-.382a.571.57 0 0 0 .048-.078c.11.032.234.058.373.058.255 0 .501-.086.75-.265.244-.174.418-.424.444-.637v-.01c.083.017.167.026.251.026.265 0 .527-.082.773-.242.48-.31.562-.715.554-.98a1.28 1.279 0 0 0 .978-.194 1.04 1.04 0 0 0 .502-.808 1.088 1.085 0 0 0-.16-.653c.804-.342 2.636-1.003 4.795-1.483a4.734 4.721 0 0 0-.067-.492 27.742 27.667 0 0 0-5.049 1.62zm5.123-.763c0 4.027-5.166 7.293-11.537 7.293-6.372 0-11.538-3.266-11.538-7.293 0-4.028 5.165-7.293 11.539-7.293 6.371 0 11.537 3.265 11.537 7.293zm.46.004c0-4.272-5.374-7.755-12-7.755S.002 7.277.002 11.55L0 12.004c0 4.533 4.695 8.203 11.999 8.203 7.347 0 12-3.67 12-8.204z" />
        </g>
        <text
          x="28"
          y="16.5"
          fill="#FFFFFF"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          fontSize="11"
          fontWeight="800"
          letterSpacing="-0.3"
        >
          mercado<tspan fontWeight="300"> pago</tspan>
        </text>
      </svg>
    </div>
  );
}

export function VisaLogo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-105 select-none ${className}`}
      title="Visa Oficial"
    >
      <svg
        className="h-5 w-auto drop-shadow-sm"
        viewBox="0 0 38 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="38" height="24" rx="4" fill="#FFFFFF" />
        <path
          d="M15.4 16.5l1.7-10.2h2.7l-1.7 10.2h-2.7zm10.2-10c-.5-.2-1.4-.4-2.4-.4-2.7 0-4.6 1.4-4.6 3.4 0 1.5 1.3 2.3 2.4 2.8 1.1.5 1.4.8 1.4 1.3 0 .7-.9 1-1.6 1-1.1 0-1.7-.2-2.6-.6l-.4-.2-.4 2.4c.6.3 1.9.5 3.1.6 2.9 0 4.7-1.4 4.8-3.5 0-1.2-.7-2.1-2.3-2.8-.9-.5-1.5-.8-1.5-1.3 0-.4.5-.9 1.6-.9.9 0 1.5.2 2 .4l.2.1.4-2.3zm6.6 3.6l1.3 3.4.2-1.1c.4-1.3 1.6-3.6 1.6-3.6l-1.5 0-1.6 1.3zm2.5 6.4h2.5l-2.2-10.2h-2.3c-.5 0-1 .3-.1.1l-3.7 8.6h2.8l.6-1.5h3.5l.5 1.5zm-19.9-10.2l-2.6 7-.3-1.4c-.5-1.6-2-3.4-3.7-4.2l2.4 8.8h2.8l4.2-10.2h-2.8z"
          fill="#1434CB"
        />
        <path
          d="M8.3 6.3H3.8l-.1.2c3.5.9 5.8 3 6.7 5.5l-1-4.8c-.2-.7-.6-.9-1.2-.9z"
          fill="#F7B600"
        />
      </svg>
    </div>
  );
}

export function MastercardLogo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-105 select-none ${className}`}
      title="Mastercard Oficial"
    >
      <svg
        className="h-5 w-auto drop-shadow-sm"
        viewBox="0 0 38 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="38" height="24" rx="4" fill="#141414" stroke="#2B2B2B" strokeWidth="0.8" />
        <circle cx="15" cy="12" r="7.5" fill="#EB001B" />
        <circle cx="23" cy="12" r="7.5" fill="#F79E1B" />
        <path
          d="M19 7.32a7.48 7.48 0 0 0-2.77 4.68 7.48 7.48 0 0 0 2.77 4.68 7.48 7.48 0 0 0 2.77-4.68A7.48 7.48 0 0 0 19 7.32z"
          fill="#FF5F00"
        />
      </svg>
    </div>
  );
}

export function AmexLogo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-105 select-none ${className}`}
      title="American Express Oficial"
    >
      <svg
        className="h-5 w-auto drop-shadow-sm"
        viewBox="0 0 38 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="38" height="24" rx="4" fill="#016FD0" />
        <g transform="translate(4, 5.5) scale(0.187)" fill="#FFFFFF">
          <path fillRule="evenodd" clipRule="evenodd" d="M31.02 111.462V86.31H57.6l2.848 3.738 2.931-3.738H160v23.38s-2.49 1.689-5.421 1.689h-53.427l-3.2-4v4H87.379v-6.758s-1.427.979-4.531.979H79.29v5.779h-16l-2.842-3.827-2.938 3.827-26.49.083zM0 67.462L5.958 53.51h10.394l3.386 7.828v-7.834H32.62l2.048 5.69 1.952-5.69h57.87v2.842s3.02-2.842 8-2.842l18.752.09 3.379 7.737v-7.827h10.758l2.925 4.442V53.51h11.034v25.16H138.4l-2.848-4.448v4.441h-15.808l-1.6-4h-4.275l-1.6 4h-10.752c-4.263 0-7.021-2.752-7.021-2.752v2.752h-16.18l-3.2-4v4H14.849l-1.6-4h-4.27l-1.6 4H0v-11.2z" fill="#fff"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M8.09 56.538L0 75.379h5.242l1.51-3.731h8.717l1.51 3.731H22.4l-8.09-18.841H8.09zm3.02 4.352l2.67 6.572H8.447l2.662-6.572zm11.828 14.49V56.537l7.462.083 4.358 12.083 4.263-12.166H46.4v18.841h-4.71V61.517l-4.98 13.862h-4.09l-5.068-13.862v13.862h-4.614zm26.662 0V56.537h15.38V60.8H54.4V64h10.31v3.91H54.4v3.38h10.58v4.09H49.6zm18.042-18.842v18.841h4.71V68.71h1.958l5.6 6.67h5.78l-6.228-6.932a5.676 5.676 0 005.159-5.786c0-4-3.11-6.124-6.573-6.124H67.642zm4.71 4.262h5.338c1.33 0 2.22.98 2.22 1.952 0 1.248-1.248 1.958-2.13 1.958h-5.428V60.8zm19.11 14.58h-4.8V56.537h4.8v18.841zm11.38 0h-1.063c-4.979 0-8.09-3.918-8.09-9.332 0-5.517 3.021-9.51 9.332-9.51h5.158v4.441h-5.427c-2.573 0-4.352 2.042-4.352 5.069 0 3.642 2.042 5.152 5.062 5.152h1.248l-1.862 4.18h-.006zm10.22-18.842l-8.083 18.841h5.242l1.517-3.731h8.704l1.51 3.731h5.427l-8.089-18.841h-6.228zm3.028 4.352l2.662 6.572h-5.331l2.669-6.572zm11.731 14.49V56.537h5.958l7.642 11.814V56.538h4.717v18.841h-5.786L132.538 63.2v12.18h-4.717zm-93.504 32.882V89.421H49.6v4.269H39.02v3.2h10.324v4H39.021v3.289H49.6v4.083H34.317zm75.104 0V89.421H124.8v4.269h-10.579v3.2h10.317v4h-10.317v3.289H124.8v4.083h-15.379zm-59.2 0l7.469-9.241-7.642-9.6H56l4.538 5.958 4.524-5.952h5.696L63.2 98.848l7.558 9.414H64.8l-4.448-5.772-4.262 5.772h-5.87zM71.29 89.51v18.842h4.8V102.4h4.972c4.186 0 7.386-2.221 7.386-6.58 0-3.558-2.496-6.31-6.758-6.31h-10.4zm4.8 4.18h5.241c1.331 0 2.317.8 2.317 2.13 0 1.242-.986 2.132-2.317 2.132H76.18V93.69h-.09zm14.4-4.27v18.842h4.71V101.6h1.952l5.6 6.662h5.786l-6.228-6.924a5.676 5.676 0 005.152-5.786c0-4-3.11-6.131-6.572-6.131h-10.4zm4.71 4.27h5.338c1.324 0 2.214.972 2.214 1.958 0 1.242-1.242 1.952-2.131 1.952H95.2v-3.91zm31.821 14.572v-4.083h9.427c1.414 0 1.952-.717 1.952-1.6 0-.8-.621-1.6-1.952-1.6h-4.269c-3.731 0-5.779-2.227-5.779-5.6 0-3.027 1.862-5.958 7.379-5.958h9.152l-1.952 4.269h-7.923c-1.51 0-1.952.8-1.952 1.51 0 .8.538 1.6 1.69 1.6h4.448c4.083 0 5.862 2.31 5.862 5.421 0 3.289-1.958 5.958-6.131 5.958l-9.952.083zm17.241 0v-4.083h8.986c1.414 0 1.952-.717 1.952-1.6 0-.8-.621-1.6-1.952-1.6h-3.827c-3.731 0-5.773-2.227-5.773-5.6 0-3.027 1.862-5.958 7.373-5.958H160l-1.952 4.269h-7.738c-1.51 0-1.958.8-1.958 1.51 0 .8.538 1.6 1.696 1.6h4.083c4.096 0 5.869 2.31 5.869 5.421 0 3.289-1.952 5.958-6.138 5.958l-9.6.083z" fill="#fff"/>
        </g>
      </svg>
    </div>
  );
}

export function SpeiLogo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-105 select-none ${className}`}
      title="SPEI Transferencia Inmediata"
    >
      <svg
        className="h-5 w-auto drop-shadow-sm"
        viewBox="0 0 46 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="46" height="24" rx="4" fill="#0A2218" stroke="#10B981" strokeWidth="1" />
        <g fill="#10B981">
          {/* S */}
          <path d="M7 16.5h3.6c1.3 0 2.2-.7 2.2-1.8 0-.9-.6-1.4-1.6-1.6l-1.1-.3c-.5-.1-.8-.3-.8-.6 0-.3.3-.5.8-.5.6 0 1.1.2 1.6.5l.5-1.2c-.6-.4-1.3-.6-2.1-.6-1.3 0-2.2.7-2.2 1.8 0 .9.6 1.4 1.6 1.6l1.1.3c.5.1.8.3.8.6 0 .4-.4.6-.9.6-.7 0-1.3-.3-1.8-.7L7 16.5z" />
          {/* P */}
          <path d="M14 10.8h3.4c1.4 0 2.3.8 2.3 2.1s-.9 2.1-2.3 2.1h-1.9v2.2H14v-6.4zm1.5 3h1.7c.6 0 1-.3 1-.9s-.4-.9-1-.9h-1.7v1.8z" />
          {/* E */}
          <path d="M20.8 10.8h4.5v1.3h-3v1.2h2.7v1.3h-2.7v1.3h3.1v1.3h-4.6v-6.4z" />
          {/* I */}
          <path d="M26.6 10.8h1.5v6.4h-1.5v-6.4z" />
          {/* Ondas Oficiales de Señal SPEI */}
          <path d="M33 16.5a4 4 0 0 0 0-8" fill="none" stroke="#34D399" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M35.5 18a6.5 6.5 0 0 0 0-11" fill="none" stroke="#34D399" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M38 19.5a9 9 0 0 0 0-14" fill="none" stroke="#34D399" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

export function OxxoLogo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-105 select-none ${className}`}
      title="OXXO Pay Oficial"
    >
      <svg
        className="h-5 w-auto drop-shadow-sm"
        viewBox="0 0 50 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="50" height="24" rx="4" fill="#D52B1E" />
        <rect x="2.5" y="2.5" width="45" height="19" rx="2.5" fill="#E51A24" stroke="#FFD200" strokeWidth="1.2" />
        <rect x="4.5" y="4.5" width="41" height="15" rx="2" fill="#FFD200" />
        <text
          x="7.5"
          y="15.5"
          fill="#D52B1E"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="900"
          fontSize="11"
          letterSpacing="0.8"
        >
          OXXO
        </text>
      </svg>
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
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      <MercadoPagoLogo />
      <VisaLogo />
      <MastercardLogo />
      <AmexLogo />
      {showSpei && <SpeiLogo />}
      {showOxxo && <OxxoLogo />}
    </div>
  );
}
