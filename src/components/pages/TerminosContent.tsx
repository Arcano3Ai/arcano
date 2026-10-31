"use client";

import React from "react";
import { brandConfig } from "@/config/brandConfig";
import { useLanguage } from "@/context/LanguageContext";

export function TerminosContent() {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-parchment">
      <header className="pb-8 border-b border-charcoal-border mb-8">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans block mb-2">
          {t("Condiciones de Uso", "Terms of Use")}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-light">
          {t("Términos y Condiciones", "Terms and Conditions")}
        </h1>
        <p className="text-xs text-parchment-dim font-sans mt-2">
          {t("Última actualización:", "Last updated:")} {brandConfig.legal.lastUpdated}
        </p>
      </header>

      <div className="space-y-6 text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            {t("1. Naturaleza del Servicio", "1. Nature of the Service")}
          </h2>
          <p>
            {t(
              `Las sesiones de lectura brindadas por ${brandConfig.name} constituyen un ejercicio de orientación simbólica, introspección personal y diálogo reflexivo a través de arquetipos universales.`,
              `Reading sessions provided by ${brandConfig.name} constitute an exercise in symbolic guidance, personal introspection, and reflective dialogue through universal archetypes.`
            )}
          </p>
          <div className="p-4 rounded bg-wine/20 border border-wine/40 text-parchment">
            <strong>{t("Exención de responsabilidad profesional:", "Professional disclaimer:")}</strong>{" "}
            {t(
              "Las lecturas de tarot bajo ninguna circunstancia sustituyen diagnósticos ni tratamientos médicos, terapias psicológicas o psiquiátricas, asesorías financieras, fiscales ni representaciones jurídicas.",
              "Tarot readings under no circumstances replace medical diagnoses or treatments, psychological or psychiatric therapy, financial or tax advice, or legal representation."
            )}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            {t("2. Mayoría de Edad", "2. Legal Age")}
          </h2>
          <p>
            {t(
              `Los servicios de ${brandConfig.name} están dirigidos exclusivamente a personas mayores de 18 años con plena capacidad jurídica para contratar.`,
              `Services offered by ${brandConfig.name} are exclusively aimed at adults aged 18 or older with full legal capacity to enter into agreements.`
            )}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            {t("3. Libre Albedrío y Responsabilidad Personal", "3. Free Will and Personal Accountability")}
          </h2>
          <p>
            {t(
              "El consultante reconoce que las cartas describen tendencias y arquetipos del presente. Las decisiones que tome con posterioridad a la sesión son de su exclusiva y entera responsabilidad.",
              "The seeker acknowledges that the cards describe currents and archetypes of the present moment. Decisions taken subsequent to the session remain their sole and sovereign responsibility."
            )}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            {t("4. Código Ético del Lector", "4. Reader Ethical Code")}
          </h2>
          <p>
            {t(
              `${brandConfig.name} se reserva el derecho de rechazar consultas que pretendan invadir la privacidad de terceros sin su consentimiento, realizar trabajos de daño o condicionar la libertad ajena.`,
              `${brandConfig.name} reserves the right to decline inquiries that seek to invade the privacy of third parties without consent, perform harmful intentions, or condition another person's autonomy.`
            )}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            {t("5. Jurisdicción y Contacto", "5. Jurisdiction and Contact")}
          </h2>
          <p>
            {t("Para cualquier aclaración referente a estos términos, puede escribir a:", "For any inquiries regarding these terms, you may write to:")}{" "}
            <strong>{brandConfig.contact.email}</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
