"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { brandConfig } from "@/config/brandConfig";
import { servicesList } from "@/data/services";
import { arcanaList, Arcana } from "@/data/arcana";
import { tarotistProfile } from "@/data/tarotist";
import { testimonialsList } from "@/data/testimonials";
import { faqList } from "@/data/faq";
import { blogPosts } from "@/data/blog";
import { experienceSteps } from "@/data/experienceSteps";

import { IntroScreen } from "@/components/IntroScreen";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { DailyCardModule } from "@/components/DailyCardModule";
import { OracleReadingModule } from "@/components/OracleReadingModule";
import { ArcanaCard } from "@/components/ArcanaCard";
import { ArcanaModal } from "@/components/ArcanaModal";
import { NewsletterSection } from "@/components/NewsletterSection";
import { InstagramGrid } from "@/components/InstagramGrid";
import { AcademySection } from "@/components/academy/AcademySection";
import { trackEvent } from "@/lib/analytics";
import { getAssetPath } from "@/lib/utils";

export default function HomePage() {
  const [selectedArcanaForModal, setSelectedArcanaForModal] =
    useState<Arcana | null>(null);

  const handleBookingCta = (source: string) => {
    trackEvent({ name: "click_booking", params: { source } });
  };

  return (
    <>
      {/* 1. INTRO CINEMATOGRÁFICA */}
      <IntroScreen />

      {/* 2. HERO ESPECTACULAR: ATMÓSFERA NOCTURNA Y OSCURA CON MALACHAI */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center overflow-hidden -mt-20 sm:-mt-24 pt-28">
        {/* Fotografía de fondo real del santuario y ritual de niebla con tratamiento oscuro */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/malachai-ritual-niebla.jpg"
            alt="Ritual ceremonial nocturno en el santuario de ARCANO"
            fill
            priority
            className="object-cover object-center filter brightness-[0.20] contrast-[1.35] saturate-[0.7] scale-105"
          />
          {/* Capas de gradiente en obsidiana abisal y viñeta radial */}
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep/95 via-obsidian/80 to-obsidian-deep" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(4,4,5,0.95)_70%)]" />
        </div>

        {/* Contenido del Hero */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-6 animate-fadeIn">
          {/* Sello superior */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-gold/30 bg-charcoal/80 backdrop-blur text-gold text-xs tracking-[0.25em] uppercase font-sans shadow-[0_0_15px_rgba(198,160,82,0.15)]">
            <span>✦</span>
            <span>Santuario de Sabiduría Simbólica</span>
            <span>✦</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.2em] text-parchment font-light leading-none drop-shadow-lg">
            {brandConfig.name}
          </h1>

          <p className="text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase text-gold/90 font-sans font-light">
            {brandConfig.descriptor}
          </p>

          <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-gold/60 to-transparent my-6" />

          {/* Frase Editorial */}
          <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-parchment-muted max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
            &ldquo;{brandConfig.philosophicalQuote}&rdquo;
          </p>

          {/* CTAs */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/reservar"
              onClick={() => handleBookingCta("hero_primary")}
              className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-sans text-obsidian bg-gold hover:bg-gold-light transition-all duration-300 rounded-sm font-medium shadow-[0_0_25px_rgba(198,160,82,0.45)] hover:scale-105"
            >
              Reservar una lectura ✦
            </Link>

            <Link
              href="/arcanos"
              className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-sans text-parchment hover:text-gold border border-gold/40 hover:border-gold transition-all duration-300 rounded-sm bg-charcoal/60 backdrop-blur shadow-md"
            >
              Explorar los Arcanos
            </Link>
          </div>

          {/* Indicador de Desliza para entrar */}
          <div className="pt-12 sm:pt-16 animate-pulse-subtle">
            <span className="text-[10px] tracking-[0.3em] uppercase text-parchment-dim font-sans block mb-2">
              Desliza para entrar
            </span>
            <span className="text-gold text-sm block">↓</span>
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN INTRODUCCIÓN: EL TAROT COMO ESPEJO CON CÁLIZ DE HUMO */}
      <section className="py-20 sm:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Fundamentos del Santuario"
          title="El Tarot como Espejo"
          symbol="☾"
        />

        <div className="relative overflow-hidden rounded-xl border border-charcoal-border bg-gradient-to-b from-[#121218]/95 to-[#08080a] p-8 sm:p-12 shadow-[0_15px_45px_rgba(0,0,0,0.8)] space-y-6 text-center max-w-3xl mx-auto">
          {/* Fondo sutil del cáliz ritual con humo de Malachai */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <Image
              src="/images/malachai-caliz-humo.png"
              alt="Malachai sosteniendo el cáliz ceremonial con humo"
              fill
              className="object-cover object-center filter brightness-[0.22] contrast-[1.4]"
            />
          </div>

          <div className="relative z-10 space-y-6">
            <p className="font-serif text-xl sm:text-2xl text-parchment font-light leading-relaxed">
              &ldquo;El tarot es un lenguaje de símbolos. Una forma de observar aquello que a veces permanece oculto entre nuestras preguntas, emociones y decisiones.&rdquo;
            </p>

            <div className="h-[1px] w-16 mx-auto bg-gold/40" />

            <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed max-w-xl mx-auto">
              En ARCANO concebimos cada tirada como una herramienta noble de reflexión, introspección y orientación psicológica y existencial. No prometemos milagros inevitables, lecturas del futuro inmutables ni soluciones mágicas. La verdadera magia reside en la lucidez con la que decides responder a lo que los símbolos te revelan.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-charcoal-border/70 text-xs font-sans text-parchment-dim">
              <div className="p-2">
                <span className="text-gold block text-base mb-1">✦</span>
                Introspección
              </div>
              <div className="p-2">
                <span className="text-gold block text-base mb-1">✧</span>
                Confidencialidad
              </div>
              <div className="p-2">
                <span className="text-gold block text-base mb-1">☾</span>
                Ética Rigurosa
              </div>
              <div className="p-2">
                <span className="text-gold block text-base mb-1">◇</span>
                Claridad Práctica
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN DEL TAROTISTA: MALACHAI */}
      <section
        id="el-tarotista"
        className="py-20 sm:py-28 border-t border-charcoal-border/50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <SectionHeader
          subtitle="La Mirada detrás de las Cartas"
          title="Quien Lee los Arcanos"
          symbol="✦"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Fotografía de Malachai con filtro Dark Luxury */}
          <div className="lg:col-span-5">
            <div className="group relative aspect-square sm:aspect-[4/5] rounded-lg overflow-hidden border border-gold/35 shadow-[0_15px_50px_rgba(0,0,0,0.9)] bg-obsidian-deep">
              <Image
                src={getAssetPath(tarotistProfile.imagePlaceholder.imageUrl)}
                alt={tarotistProfile.imagePlaceholder.alt}
                fill
                unoptimized
                className="object-cover object-center filter brightness-[0.85] contrast-[1.15] group-hover:brightness-[0.95] transition-all duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {/* Viñeta perimetral de sombra */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-transparent to-obsidian/35 opacity-90" />
              <div className="absolute inset-0 border border-gold/20 rounded pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-parchment-dim font-sans bg-obsidian/90 px-3 py-1.5 rounded border border-charcoal-border shadow-md">
                  {tarotistProfile.imagePlaceholder.caption}
                </span>
              </div>
            </div>
          </div>

          {/* Biografía y Filosofía de Malachai */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-medium">
                  {tarotistProfile.role}
                </span>
                <span className="hidden sm:inline text-gold/60 text-xs">✦</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-parchment tracking-wide mt-1 font-light">
                {tarotistProfile.name}
              </h3>

              {/* Títulos sagrados ceremoniales debajo de Malachai */}
              <div className="flex flex-wrap items-center gap-2 mt-2 mb-3">
                {tarotistProfile.sacredTitles?.map((title, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-gold/10 border border-gold/40 text-[10px] sm:text-[11px] font-serif tracking-[0.18em] text-gold-light font-medium uppercase shadow-[0_0_10px_rgba(198,160,82,0.15)]"
                  >
                    {title}
                  </span>
                ))}
              </div>

              <p className="text-xs text-parchment-dim uppercase tracking-widest font-sans mt-2">
                {tarotistProfile.specialty} · {tarotistProfile.experienceYears}
              </p>
            </div>

            {/* Cita de Filosofía */}
            <div className="p-5 rounded-lg bg-charcoal/60 border-l-2 border-gold italic font-serif text-parchment text-sm sm:text-base leading-relaxed shadow-sm">
              &ldquo;{tarotistProfile.philosophy}&rdquo;
            </div>

            {/* Párrafos de biografía */}
            <div className="space-y-3 text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed">
              {tarotistProfile.bio.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Certificaciones y formación */}
            <div className="pt-4 border-t border-charcoal-border">
              <span className="text-[11px] uppercase tracking-[0.2em] text-gold font-sans block mb-2">
                Compromiso y Rigor Ceremonial
              </span>
              <ul className="space-y-1.5 text-xs text-parchment-dim font-sans">
                {tarotistProfile.certifications.map((cert, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-gold text-[10px]">✦</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. ORÁCULO VIVO: TIRADA DE LAS TRES REVELACIONES */}
      <section id="oraculo" className="border-t border-charcoal-border/50 py-12 sm:py-16">
        <OracleReadingModule />
      </section>

      {/* 5. SERVICIOS (LECTURAS) */}
      <section
        id="lecturas"
        className="py-20 sm:py-28 border-t border-charcoal-border/50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <SectionHeader
          subtitle="Consultas y Encuentros"
          title="Lecturas de los Arcanos"
          description="Cada sesión con Malachai es un espacio ceremonial concebido como una carta viva: con tiempo, respeto y orientación profunda."
          symbol="✧"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesList.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/lecturas"
            className="text-xs uppercase tracking-[0.25em] text-gold hover:text-gold-light border-b border-gold/40 hover:border-gold pb-1 font-sans transition-colors"
          >
            Ver detalles exhaustivos de todas las lecturas →
          </Link>
        </div>
      </section>

      {/* 6. TU EXPERIENCIA (5 PASOS) CON SAHUMERIO SUTIL DE FONDO */}
      <section className="py-20 sm:py-28 border-t border-charcoal-border/50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Fondo tenue del sahumerio */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full opacity-10 pointer-events-none">
          <Image
            src={getAssetPath("/images/malachai-sahumerio.png")}
            alt="Sahumerio ceremonial en el santuario"
            fill
            className="object-cover filter brightness-[0.2] contrast-[1.4]"
          />
        </div>

        <SectionHeader
          subtitle="El Camino Ceremonial"
          title="Tu Experiencia en ARCANO"
          description="Un proceso cuidado desde el primer instante para garantizar sosiego, respeto y confidencialidad absoluta."
          symbol="◇"
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-4 relative z-10">
          {experienceSteps.map((step, idx) => (
            <div
              key={step.stepNumber}
              className="relative rounded-lg p-5 bg-charcoal/60 border border-charcoal-border flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="flex justify-between items-center text-xs tracking-widest text-gold/80 mb-3 font-sans">
                  <span>Paso {step.stepNumber}</span>
                  <span className="text-sm font-serif">{step.glyph}</span>
                </div>
                <h4 className="font-serif text-base text-parchment font-medium tracking-wide">
                  {step.title}
                </h4>
                <p className="text-[11px] text-gold/75 font-sans mt-0.5">
                  {step.subtitle}
                </p>
                <p className="text-xs text-parchment-muted font-sans font-light mt-3 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {idx < experienceSteps.length - 1 && (
                <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 text-gold/40 text-xs z-20">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. CARTA DEL DÍA */}
      <section
        id="carta-del-dia"
        className="py-16 sm:py-24 border-t border-charcoal-border/50"
      >
        <DailyCardModule />
      </section>

      {/* 8. LOS 22 ARCANOS */}
      <section
        id="arcanos"
        className="py-20 sm:py-28 border-t border-charcoal-border/50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <SectionHeader
          subtitle="Compendio Arquetípico"
          title="Los XXII Arcanos Mayores"
          description="XXII caminos. Una sola pregunta. Tu propia interpretación."
          symbol="✦"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {arcanaList.slice(0, 12).map((arcana) => (
            <ArcanaCard
              key={arcana.slug}
              arcana={arcana}
              onQuickView={(a) => setSelectedArcanaForModal(a)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/arcanos"
            className="px-8 py-3 text-xs uppercase tracking-[0.25em] font-sans text-parchment hover:text-gold border border-gold/40 hover:border-gold rounded-sm bg-charcoal/60 transition-all inline-block"
          >
            Explorar los 22 Arcanos Completos ✦
          </Link>
        </div>
      </section>

      {/* 9 & 10. TAROT DEL AMOR Y TAROT PROFESIONAL */}
      <section className="py-20 sm:py-28 border-t border-charcoal-border/50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tarot del Amor */}
          <div className="rounded-xl border border-charcoal-border bg-gradient-to-b from-[#180f15] via-[#100a0e] to-[#07070a] p-8 sm:p-10 flex flex-col justify-between shadow-lg">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans">
                Vínculos & Espejos
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-parchment tracking-wide mt-2 font-light">
                Tarot del Amor y Relaciones
              </h3>
              <p className="font-serif italic text-sm text-parchment-muted mt-2">
                &ldquo;Explora los símbolos detrás de tus vínculos más profundos.&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light mt-4 leading-relaxed">
                Abordamos las relaciones no desde el miedo a la pérdida, sino desde la madurez afectiva, la comunicación honesta y la comprensión de las heridas que buscan sanar a través del encuentro.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-charcoal-border/80">
              <Link
                href="/tarot-del-amor"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-light font-sans font-medium"
              >
                <span>Conocer el enfoque del Tarot del Amor</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Tarot Profesional */}
          <div className="rounded-xl border border-charcoal-border bg-gradient-to-b from-[#10141a] via-[#0a0d12] to-[#07070a] p-8 sm:p-10 flex flex-col justify-between shadow-lg">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans">
                Estrategia & Vocación
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-parchment tracking-wide mt-2 font-light">
                Tarot Profesional y Propósito
              </h3>
              <p className="font-serif italic text-sm text-parchment-muted mt-2">
                &ldquo;Claridad estratégica para momentos de encrucijada y cambio.&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light mt-4 leading-relaxed">
                Una mirada despojada de ilusiones sobre tus proyectos, toma de decisiones críticas, alineación de talentos y superación de bloqueos creativos sin falsas promesas de éxito instantáneo.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-charcoal-border/80">
              <Link
                href="/tarot-profesional"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-light font-sans font-medium"
              >
                <span>Explorar la consulta vocacional</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11. TESTIMONIOS */}
      <section
        id="testimonios"
        className="py-20 sm:py-28 border-t border-charcoal-border/50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <SectionHeader
          subtitle="Voces del Camino"
          title="Quienes han Pasado por ARCANO"
          description="Ecos y experiencias de consultantes en sus propias palabras."
          symbol="✦"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonialsList.map((test) => (
            <div
              key={test.id}
              className="rounded-lg p-6 bg-charcoal/50 border border-charcoal-border flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center bg-obsidian text-gold text-xs font-serif">
                    {test.initials}
                  </div>
                  <div>
                    <h5 className="font-serif text-sm text-parchment font-medium">
                      {test.clientName}
                    </h5>
                    <span className="text-[10px] text-parchment-dim font-sans block">
                      {test.location}
                    </span>
                  </div>
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-parchment-muted leading-relaxed">
                  &ldquo;{test.quote}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-charcoal-border/60 text-[10px] uppercase tracking-wider text-gold/70 font-sans">
                {test.serviceUsed}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. REVISTA EDITORIAL / BLOG */}
      <section
        id="blog"
        className="py-20 sm:py-28 border-t border-charcoal-border/50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <SectionHeader
          subtitle="Sabiduría Escrita"
          title="Crónicas de los Símbolos"
          description="Ensayos, reflexiones arquetípicas y guías para el buscador consciente escritas por Malachai."
          symbol="☾"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {blogPosts.slice(0, 3).map((post) => (
            <article
              key={post.slug}
              className="group rounded-lg overflow-hidden border border-charcoal-border bg-charcoal/40 hover:border-gold/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 filter brightness-[0.7] contrast-[1.2]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-obsidian/80 backdrop-blur rounded text-[10px] uppercase tracking-widest text-gold font-sans">
                    {post.category}
                  </div>
                </div>

                <div className="p-5">
                  <span className="text-[10px] uppercase tracking-wider text-parchment-dim font-sans block mb-2">
                    {post.publishedAt} · {post.readTime}
                  </span>
                  <h4 className="font-serif text-lg text-parchment group-hover:text-gold transition-colors font-medium leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-xs text-parchment-muted font-sans font-light mt-2 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs uppercase tracking-[0.18em] text-gold hover:text-gold-light font-sans inline-flex items-center gap-1"
                >
                  <span>Leer crónica completa</span>
                  <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="text-xs uppercase tracking-[0.25em] text-parchment hover:text-gold border-b border-gold/40 pb-1 font-sans transition-colors"
          >
            Ver todos los artículos de la revista →
          </Link>
        </div>
      </section>

      {/* 13. ACADEMIA ESOTÉRICA */}
      <AcademySection />

      {/* 15. PREGUNTAS FRECUENTES (FAQ) */}
      <section
        id="faq"
        className="py-20 sm:py-28 border-t border-charcoal-border/50 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <SectionHeader
          subtitle="Claridad y Transparencia"
          title="Preguntas Frecuentes"
          description="Respuestas honestas y éticas a las dudas habituales de nuestros consultantes."
          symbol="✧"
        />

        <div className="space-y-4">
          {faqList.map((item, index) => (
            <details
              key={index}
              className="group rounded-lg border border-charcoal-border bg-charcoal/40 p-5 open:bg-charcoal/70 transition-colors"
            >
              <summary className="font-serif text-base sm:text-lg text-parchment cursor-pointer list-none flex items-center justify-between font-normal">
                <span>{item.question}</span>
                <span className="text-gold text-sm transition-transform group-open:rotate-180">
                  ↓
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t border-charcoal-border/60 text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* 14. NEWSLETTER CEREMONIAL */}
      <NewsletterSection />

      {/* 15. INSTAGRAM Y ATMÓSFERA VISUAL CON FOTOGRAFÍAS REALES OSCURECIDAS DE MALACHAI */}
      <InstagramGrid />

      {/* 16. GRAN CTA FINAL CON MALACHAI SOSTENIENDO EL ARCANO EN LA PENUMBRA */}
      <section className="py-24 sm:py-36 relative overflow-hidden text-center px-4 bg-obsidian-deep border-t border-charcoal-border">
        {/* Fotografía nocturna con velo oscuro */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/malachai-diablo.jpg"
            alt="Malachai en el santuario de ARCANO en la penumbra ceremonial"
            fill
            className="object-cover object-center filter brightness-[0.16] contrast-[1.4] saturate-[0.7] opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep via-obsidian-deep/80 to-obsidian-deep" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(4,4,5,0.96)_70%)]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          {/* Luna central tenue */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-gold/40 mx-auto flex items-center justify-center bg-obsidian/85 shadow-[0_0_35px_rgba(198,160,82,0.25)] mb-8">
            <span className="text-gold text-4xl">☾</span>
          </div>

          <span className="text-xs uppercase tracking-[0.3em] text-gold/90 font-sans block">
            El Umbral de la Decisión
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-parchment tracking-[0.08em] font-light leading-tight drop-shadow-md">
            &ldquo;Quizá la pregunta no sea qué va a suceder.
            <br />
            Quizá sea qué estás preparado para ver.&rdquo;
          </h2>

          <div className="h-[1px] w-20 mx-auto bg-gold/50 my-6" />

          <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light max-w-lg mx-auto leading-relaxed">
            Te invitamos a una conversación lúcida, confidencial y sin prejuicios frente a los arcanos con Malachai.
          </p>

          <div className="pt-6">
            <Link
              href="/reservar"
              onClick={() => handleBookingCta("footer_final_cta")}
              className="inline-block px-10 py-4 text-xs uppercase tracking-[0.25em] font-sans text-obsidian bg-gold hover:bg-gold-light transition-all duration-300 rounded-sm font-medium shadow-[0_0_30px_rgba(198,160,82,0.5)] hover:scale-105"
            >
              Reservar una lectura con Malachai ✦
            </Link>
          </div>
        </div>
      </section>

      {/* MODAL DE ARCANO ACTIVO */}
      <ArcanaModal
        arcana={selectedArcanaForModal}
        onClose={() => setSelectedArcanaForModal(null)}
      />
    </>
  );
}
