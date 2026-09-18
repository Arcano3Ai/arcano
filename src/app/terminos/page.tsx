import React from "react";
import type { Metadata } from "next";
import { brandConfig } from "@/config/brandConfig";

import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Términos y Condiciones del Servicio",
  description: "Términos, alcance y naturaleza ética de las consultas de tarot en ARCANO.",
  alternates: {
    canonical: `${siteConfig.url}/terminos/`,
  },
};

export default function TerminosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-parchment">
      <header className="pb-8 border-b border-charcoal-border mb-8">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans block mb-2">
          Condiciones de Uso
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-light">
          Términos y Condiciones
        </h1>
        <p className="text-xs text-parchment-dim font-sans mt-2">
          Última actualización: {brandConfig.legal.lastUpdated}
        </p>
      </header>

      <div className="space-y-6 text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            1. Naturaleza del Servicio
          </h2>
          <p>
            Las sesiones de lectura brindadas por {brandConfig.name} constituyen un ejercicio de orientación simbólica, introspección personal y diálogo reflexivo a través de arquetipos universales.
          </p>
          <div className="p-4 rounded bg-wine/20 border border-wine/40 text-parchment">
            <strong>Exención de responsabilidad profesional:</strong> Las lecturas de tarot bajo ninguna circunstancia sustituyen diagnósticos ni tratamientos médicos, terapias psicológicas o psiquiátricas, asesorías financieras, fiscales ni representaciones jurídicas.
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            2. Mayoría de Edad
          </h2>
          <p>
            Los servicios de {brandConfig.name} están dirigidos exclusivamente a personas mayores de 18 años con plena capacidad jurídica para contratar.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            3. Libre Albedrío y Responsabilidad Personal
          </h2>
          <p>
            El consultante reconoce que las cartas describen tendencias y arquetipos del presente. Las decisiones que tome con posterioridad a la sesión son de su exclusiva y entera responsabilidad.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            4. Código Ético del Lector
          </h2>
          <p>
            {brandConfig.name} se reserva el derecho de rechazar consultas que pretendan invadir la privacidad de terceros sin su consentimiento, realizar trabajos de daño o condicionar la libertad ajena.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg text-parchment font-medium">
            5. Jurisdicción y Contacto
          </h2>
          <p>
            Para cualquier aclaración referente a estos términos, puede escribir a: <strong>{brandConfig.contact.email}</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
