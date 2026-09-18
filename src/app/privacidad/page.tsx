import React from "react";
import type { Metadata } from "next";
import { brandConfig } from "@/config/brandConfig";

import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Aviso de Privacidad",
  description: "Tratamiento, custodia y confidencialidad de datos personales en ARCANO.",
  alternates: {
    canonical: `${siteConfig.url}/privacidad/`,
  },
};

export default function PrivacidadPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-parchment">
      <header className="pb-8 border-b border-charcoal-border mb-8">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans block mb-2">
          Transparencia Legal
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-light">
          Aviso de Privacidad
        </h1>
        <p className="text-xs text-parchment-dim font-sans mt-2">
          Última actualización: {brandConfig.legal.lastUpdated}
        </p>
      </header>

      <div className="space-y-6 text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            1. Identidad y Responsable del Tratamiento
          </h2>
          <p>
            {brandConfig.name} ({brandConfig.legal.companyLegalName}), con domicilio de atención en {brandConfig.legal.address} y correo electrónico de contacto {brandConfig.contact.email}, es el responsable del tratamiento y resguardo de sus datos personales.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            2. Datos Personales Recabados
          </h2>
          <p>
            Para la prestación de los servicios de orientación simbólica y reserva de lecturas, recabamos exclusivamente los siguientes datos necesarios:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Nombre o alias para referirse a usted en la consulta.</li>
            <li>Dirección de correo electrónico para envío de confirmaciones y enlaces seguros.</li>
            <li>Número telefónico de WhatsApp (opcional, si el consultante solicita coordinación por dicha vía).</li>
            <li>Notas o intenciones previas que usted decida compartir voluntariamente.</li>
          </ul>
          <p className="pt-2">
            <strong>Nunca recabamos ni almacenamos</strong> datos financieros sensibles ni números de tarjeta de crédito/débito. Las transacciones se procesan mediante pasarelas de pago certificadas de terceros (Stripe / Mercado Pago / PayPal).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            3. Finalidad del Tratamiento
          </h2>
          <p>
            Los datos recabados tienen como única finalidad coordinar su cita, proporcionar el enlace seguro a la sala ceremonial y enviar la bitácora o material fotográfico derivado de su lectura. Sus datos jamás serán vendidos, cedidos ni compartidos con empresas de publicidad de terceros.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            4. Secreto Profesional y Confidencialidad
          </h2>
          <p>
            Todo lo conversado durante una sesión de lectura está protegido por el compromiso estricto de confidencialidad y secreto deontológico. Ninguna grabación ni transcripción será divulgada sin consentimiento expreso por escrito del consultante.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            5. Derechos ARCO
          </h2>
          <p>
            Usted tiene derecho en cualquier momento al Acceso, Rectificación, Cancelación u Oposición respecto al tratamiento de sus datos personales enviando una solicitud formal al correo: <strong>{brandConfig.contact.email}</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
