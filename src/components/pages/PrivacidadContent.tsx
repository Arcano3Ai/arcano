"use client";

import React from "react";
import { brandConfig } from "@/config/brandConfig";
import { useLanguage } from "@/context/LanguageContext";

export function PrivacidadContent() {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-parchment">
      <header className="pb-8 border-b border-charcoal-border mb-8">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans block mb-2">
          {t("Transparencia Legal", "Legal Transparency")}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-light">
          {t("Aviso de Privacidad", "Privacy Notice")}
        </h1>
        <p className="text-xs text-parchment-dim font-sans mt-2">
          {t("Última actualización:", "Last updated:")} {brandConfig.legal.lastUpdated}
        </p>
      </header>

      <div className="space-y-6 text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            {t("1. Identidad y Responsable del Tratamiento", "1. Identity and Controller")}
          </h2>
          <p>
            {t(
              `${brandConfig.name} (${brandConfig.legal.companyLegalName}), con domicilio de atención en ${brandConfig.legal.address} y correo electrónico de contacto ${brandConfig.contact.email}, es el responsable del tratamiento y resguardo de sus datos personales.`,
              `${brandConfig.name} (${brandConfig.legal.companyLegalName}), located at ${brandConfig.legal.address} with contact email ${brandConfig.contact.email}, is the controller responsible for the protection and processing of your personal data.`
            )}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            {t("2. Datos Personales Recabados", "2. Personal Data Collected")}
          </h2>
          <p>
            {t(
              "Para la prestación de los servicios de orientación simbólica y reserva de lecturas, recabamos exclusivamente los siguientes datos necesarios:",
              "To provide symbolic guidance services and schedule readings, we exclusively gather the following necessary data:"
            )}
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("Nombre o alias para referirse a usted en la consulta.", "Name or alias to address you during the consultation.")}</li>
            <li>{t("Dirección de correo electrónico para envío de confirmaciones y enlaces seguros.", "Email address to send confirmations and secure sanctuary access links.")}</li>
            <li>{t("Número telefónico de WhatsApp (opcional, si el consultante solicita coordinación por dicha vía).", "WhatsApp phone number (optional, if the seeker requests coordination via this channel).")}</li>
            <li>{t("Notas o intenciones previas que usted decida compartir voluntariamente.", "Preliminary notes or intentions you voluntarily choose to share.")}</li>
          </ul>
          <p className="pt-2">
            <strong>{t("Nunca recabamos ni almacenamos", "We never collect or store")}</strong>{" "}
            {t(
              "datos financieros sensibles ni números de tarjeta de crédito/débito. Las transacciones se procesan mediante pasarelas de pago certificadas de terceros (Stripe / Mercado Pago / PayPal).",
              "sensitive financial information or credit/debit card numbers. All transactions are securely processed by certified third-party payment gateways (Stripe / Mercado Pago / PayPal)."
            )}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            {t("3. Finalidad del Tratamiento", "3. Purpose of Processing")}
          </h2>
          <p>
            {t(
              "Los datos recabados tienen como única finalidad coordinar su cita, proporcionar el enlace seguro a la sala ceremonial y enviar la bitácora o material fotográfico derivado de su lectura. Sus datos jamás serán vendidos, cedidos ni compartidos con empresas de publicidad de terceros.",
              "Collected data serves the sole purpose of scheduling your session, delivering the secure sanctuary link, and transmitting photos or reflection journal notes derived from your reading. Your information is never sold, leased, or shared with third-party advertisers."
            )}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            {t("4. Secreto Profesional y Confidencialidad", "4. Professional Discretion & Confidentiality")}
          </h2>
          <p>
            {t(
              "Todo lo conversado durante una sesión de lectura está protegido por el compromiso estricto de confidencialidad y secreto deontológico. Ninguna grabación ni transcripción será divulgada sin consentimiento expreso por escrito del consultante.",
              "Everything shared during a ceremonial reading is protected under strict confidentiality and ethical discretion. No recording or transcript is ever published or shared without express written consent."
            )}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            {t("5. Derechos ARCO", "5. Data Subject Rights (Access, Rectification, Erasure, Objection)")}
          </h2>
          <p>
            {t(
              "Usted tiene derecho en cualquier momento al Acceso, Rectificación, Cancelación u Oposición respecto al tratamiento de sus datos personales enviando una solicitud formal al correo:",
              "You hold the right at any time to Access, Rectify, Cancel, or Object to the processing of your personal information by sending a formal request to:"
            )}{" "}
            <strong>{brandConfig.contact.email}</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
