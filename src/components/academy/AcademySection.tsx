"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  academyCategories,
  academyCourses,
  academyBenefits,
  howItWorksSteps,
  webPromotionBenefits,
  academyFaqList,
  AcademyCategory,
  AcademyCourse,
  AcademyCategoryId,
} from "@/data/academy";
import { CourseCard } from "./CourseCard";
import { CourseModal } from "./CourseModal";
import { ProgressTracker } from "./ProgressTracker";
import { brandConfig } from "@/config/brandConfig";
import { getAssetPath, handleImageError } from "@/lib/utils";
import { useStudent } from "@/lib/academy/studentContext";

interface AcademySectionProps {
  asHeading?: "h1" | "h2";
}

export const AcademySection: React.FC<AcademySectionProps> = ({ asHeading: HeadingTag = "h2" }) => {
  const [activeCategory, setActiveCategory] = useState<AcademyCategoryId | "todos">("todos");
  const [selectedCourse, setSelectedCourse] = useState<AcademyCourse | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { student } = useStudent();

  // Filtrado de cursos
  const filteredCourses =
    activeCategory === "todos"
      ? academyCourses
      : academyCourses.filter((course) => course.category === activeCategory);

  const handleSelectDiscipline = (catId: AcademyCategoryId) => {
    setActiveCategory(catId);
    const element = document.getElementById("cursos-academia");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClaimWebPromotion = () => {
    const text = encodeURIComponent(
      `Hola, El Señor de los Arcanos / ARCANO. Deseo información sobre la promoción de la Academia Esotérica: *Completa los 5 niveles y recibe tu página web personalizada GRATIS con dominio*. ¿Cómo inicio mi formación?`
    );
    window.open(`https://wa.me/${brandConfig.contact.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <section id="academia" className="relative bg-[#07060b] text-parchment overflow-hidden border-t border-charcoal-border">
      {/* Halo de fondo cósmico sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(60,35,95,0.25)_0%,rgba(198,160,82,0.09)_35%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(25,18,48,0.4)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(40,25,70,0.3)_0%,transparent_70%)] pointer-events-none" />

      {/* ============================================================ */}
      {/* 1. HERO PRINCIPAL */}
      {/* ============================================================ */}
      <div className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Columna de Texto */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-deep/80 border border-gold/40 text-gold-light text-[11px] uppercase tracking-[0.25em] font-sans shadow-[0_0_15px_rgba(198,160,82,0.15)]">
              <span>✦</span>
              <span>PLATAFORMA EDUCATIVA ESOTÉRICA PREMIUM</span>
            </div>

            <HeadingTag className="font-serif text-4xl sm:text-5xl lg:text-6xl text-parchment tracking-[0.05em] font-light leading-[1.15]">
              ACADEMIA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold drop-shadow-[0_0_25px_rgba(198,160,82,0.3)]">
                ESOTÉRICA
              </span>
            </HeadingTag>

            <p className="font-serif text-lg sm:text-xl text-parchment-dim italic max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              &ldquo;Explora el conocimiento ancestral, desarrolla tu intuición y transforma tu pasión espiritual en una nueva forma de crecimiento.&rdquo;
            </p>

            <p className="text-sm sm:text-base text-parchment-muted font-sans font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Aprende Tarot, Astrología, Numerología, Reiki y Energía a través de rutas de formación diseñadas para avanzar paso a paso.
            </p>

            {/* Badges de Garantía */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-sans text-parchment-dim">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 shadow-inner">
                <span>🎁</span> <strong className="text-emerald-200 font-bold">Nivel 1 GRATIS por Promoción</strong>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#100e18] border border-charcoal-border shadow-inner">
                <span className="text-gold">✦</span> Niveles 2 al 6: <strong className="text-gold-light ml-1 font-semibold">$799 MXN</strong>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#100e18] border border-charcoal-border shadow-inner">
                <span className="text-gold">🔓</span> Al completar Nivel 5: <strong className="text-gold-light ml-1 font-semibold">Web Gratis con Dominio</strong>
              </span>
            </div>

            {/* Botones de Acción */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href={student ? "/academia/mi-panel" : "/academia/login"}
                className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black text-xs uppercase tracking-[0.2em] font-sans font-bold shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all duration-300 hover:scale-[1.03] text-center flex items-center justify-center gap-2"
              >
                <span>🗝️</span>
                <span>{student ? "MI AULA VIRTUAL (PANEL)" : "INGRESAR AL AULA VIRTUAL"}</span>
              </Link>
              <a
                href="#cursos-academia"
                className="w-full sm:w-auto px-8 py-3.5 rounded-sm border border-gold/40 text-gold-light hover:text-parchment hover:border-gold text-xs uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 hover:bg-gold/10 text-center"
              >
                EXPLORAR CURSOS
              </a>
            </div>
          </div>

          {/* Columna Visual de Elementos Esotéricos Cinemáticos */}
          <div className="lg:col-span-5 relative flex justify-center items-center min-h-[380px] sm:min-h-[440px]">
            {/* Círculo místico de geometría sagrada y astrología */}
            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-gold/25 flex items-center justify-center bg-obsidian-deep/70 shadow-[0_0_60px_rgba(198,160,82,0.18)]">
              {/* Anillo de constelaciones giratorio */}
              <div className="absolute inset-3 rounded-full border border-dashed border-gold/20 animate-[spin_160s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border border-gold/15" />
              <span className="text-gold/30 text-7xl select-none font-serif">☾</span>
            </div>

            {/* Carta 1: Tarot (Izquierda / El Loco) */}
            <div className="absolute -left-2 sm:left-2 top-8 w-28 sm:w-36 aspect-[2/3] rounded-lg overflow-hidden border border-gold/40 shadow-[0_10px_30px_rgba(0,0,0,0.85)] -rotate-12 transition-transform duration-500 hover:rotate-0 hover:scale-105 hover:z-30 hover:border-gold bg-black">
              <Image
                src={getAssetPath("/images/cards/ar00.webp")}
                alt="Tarot — Arquetipos Sagrados"
                fill
                onError={handleImageError}
                sizes="(max-width: 640px) 112px, 144px"
                className="object-contain"
              />
              <div className="absolute bottom-1 inset-x-1 py-0.5 bg-black/85 rounded text-center">
                <span className="text-[9px] text-gold-light uppercase tracking-widest font-sans font-semibold">
                  TAROT
                </span>
              </div>
            </div>

            {/* Centro: Geometría & Astrología (El Sol) */}
            <div className="relative z-20 w-32 sm:w-44 aspect-[2/3] rounded-lg overflow-hidden border-2 border-gold shadow-[0_15px_45px_rgba(198,160,82,0.35)] transition-transform duration-500 hover:scale-110 bg-black">
              <Image
                src={getAssetPath("/images/cards/ar19.webp")}
                alt="Astrología — El Sol & Carta Natal"
                fill
                onError={handleImageError}
                sizes="(max-width: 640px) 128px, 176px"
                className="object-contain"
              />
              <div className="absolute bottom-2 inset-x-2 py-1 bg-obsidian-deep/95 border border-gold/50 rounded text-center shadow">
                <span className="text-[10px] text-gold-light uppercase tracking-widest font-sans font-bold">
                  4 DISCIPLINAS
                </span>
              </div>
            </div>

            {/* Carta 3: Energía y Numerología (Derecha / El Mundo) */}
            <div className="absolute -right-2 sm:right-2 bottom-6 w-28 sm:w-36 aspect-[2/3] rounded-lg overflow-hidden border border-gold/40 shadow-[0_10px_30px_rgba(0,0,0,0.85)] rotate-12 transition-transform duration-500 hover:rotate-0 hover:scale-105 hover:z-30 hover:border-gold bg-black">
              <Image
                src={getAssetPath("/images/cards/ar21.webp")}
                alt="Reiki & Numerología — Síntesis Cósmica"
                fill
                onError={handleImageError}
                sizes="(max-width: 640px) 112px, 144px"
                className="object-contain"
              />
              <div className="absolute bottom-1 inset-x-1 py-0.5 bg-black/85 rounded text-center">
                <span className="text-[9px] text-gold-light uppercase tracking-widest font-sans font-semibold">
                  ENERGÍA
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. FRASE DE TRANSICIÓN */}
      {/* ============================================================ */}
      <div className="relative py-16 sm:py-24 border-y border-charcoal-border/70 bg-[#090711]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-gold text-xl font-serif">✦</span>
          <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-parchment font-light tracking-wide leading-snug">
            &ldquo;EL CONOCIMIENTO SE CONVIERTE EN INTUICIÓN CUANDO APRENDES A INTERPRETARLO.&rdquo;
          </p>
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-gold-light font-sans font-medium">
            Elige tu disciplina y comienza tu camino.
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. SELECTOR DE DISCIPLINAS ("ELIGE TU CAMINO") */}
      {/* ============================================================ */}
      <div id="elige-tu-camino" className="relative py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-deep border border-gold/30 text-gold-light text-[11px] uppercase tracking-[0.2em] font-sans">
            <span>✧</span>
            <span>RUTAS DE FORMACIÓN SAGRADA</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-parchment font-light">
            ELIGE TU CAMINO
          </h2>
          <p className="font-serif text-base sm:text-lg text-parchment-dim italic">
            &ldquo;Cuatro caminos. Un universo de conocimiento.&rdquo;
          </p>
        </div>

        {/* 4 Tarjetas de Disciplinas Principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {academyCategories.map((category) => (
            <div
              key={category.id}
              className="group relative rounded-xl bg-[#0d0a17] border border-charcoal-border hover:border-gold/60 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_12px_35px_rgba(198,160,82,0.2)]"
            >
              <div className="space-y-4">
                {/* Icono y Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-lg bg-obsidian-deep border border-gold/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-obsidian border border-charcoal-border text-[10px] uppercase tracking-wider text-parchment-muted font-sans">
                    {category.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-parchment group-hover:text-gold-light transition-colors font-medium">
                    {category.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-charcoal-border/60 flex items-center justify-between">
                <span className="text-[11px] font-sans text-gold/80">
                  {category.activeCount} Niveles • <span className="text-emerald-400 font-semibold">Nivel 1 GRATIS</span>
                </span>
                <button
                  onClick={() => handleSelectDiscipline(category.id)}
                  className="px-3.5 py-1.5 rounded bg-obsidian-deep border border-gold/40 text-gold-light hover:border-gold hover:text-parchment text-[11px] uppercase tracking-widest font-sans font-semibold transition-all group-hover:bg-gold/15"
                >
                  VER CURSOS →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4 & 5. SISTEMA DE CATEGORÍAS & CUADRÍCULA DE CURSOS */}
      {/* ============================================================ */}
      <div id="cursos-academia" className="relative py-20 bg-[#090712] border-t border-charcoal-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header de la sección de cursos */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl text-parchment font-light">
              CATÁLOGO DE CURSOS
            </h2>
            <p className="text-sm sm:text-base text-parchment-muted font-sans font-light">
              Explora todos los niveles disponibles. El Nivel 1 es{" "}
              <strong className="text-emerald-400 font-semibold">100% GRATIS por promoción</strong>, y los niveles del 2 al 6 tienen una inversión única de{" "}
              <strong className="text-gold-light font-semibold">$799 MXN</strong>.
            </p>
          </div>

          {/* Barra de Filtros / Navegación por Disciplina */}
          <div className="w-full max-w-5xl mx-auto mb-12">
            <div className="w-full overflow-x-auto py-3 px-4 sm:px-6 no-scrollbar">
              <div className="flex items-center min-w-max mx-auto justify-center gap-2 sm:gap-3">
                <button
                  onClick={() => setActiveCategory("todos")}
                  className={`px-4 py-2 rounded-full text-xs font-sans uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                    activeCategory === "todos"
                      ? "bg-gradient-to-r from-gold/90 via-gold-light to-gold/90 text-obsidian font-bold shadow-[0_0_15px_rgba(198,160,82,0.4)] scale-105"
                      : "bg-obsidian-deep border border-charcoal-border text-parchment-dim hover:text-parchment hover:border-gold/40"
                  }`}
                >
                  ✦ TODOS ({academyCourses.length})
                </button>

                {academyCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs font-sans uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                      activeCategory === cat.id
                        ? "bg-gradient-to-r from-gold/90 via-gold-light to-gold/90 text-obsidian font-bold shadow-[0_0_15px_rgba(198,160,82,0.4)] scale-105"
                        : "bg-obsidian-deep border border-charcoal-border text-parchment-dim hover:text-parchment hover:border-gold/40"
                  }`}
                >
                  {cat.icon} {cat.title} ({cat.activeCount})
                </button>
              ))}
              </div>
            </div>
          </div>

          {/* Cuadrícula de Cursos Reutilizando CourseCard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onSelectCourse={(c) => setSelectedCourse(c)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 8. PROGRESO INTERACTIVO (ProgressTracker) */}
      {/* ============================================================ */}
      <div id="ruta-aprendizaje" className="relative py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProgressTracker
          currentCategory={activeCategory === "todos" ? "tarot" : activeCategory}
          onSelectCategory={(catId) => setActiveCategory(catId)}
          onClaimWebClick={handleClaimWebPromotion}
        />
      </div>

      {/* ============================================================ */}
      {/* 11. PROMOCIÓN DE LA PÁGINA WEB */}
      {/* ============================================================ */}
      <div className="relative py-20 sm:py-28 bg-[#0a0815] border-y border-charcoal-border/70 overflow-hidden">
        {/* Glow dorado intenso de fondo */}
        <div className="absolute -top-32 right-1/4 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(198,160,82,0.12)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Columna de Texto de la Promoción */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold-light text-[11px] uppercase tracking-[0.2em] font-sans">
                <span>🎁</span>
                <span>BENEFICIO EXCLUSIVO DE GRADUACIÓN</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-parchment font-light leading-tight">
                TU CONOCIMIENTO MERECE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold drop-shadow-[0_0_20px_rgba(198,160,82,0.4)]">
                  SU PROPIO ESPACIO
                </span>
              </h2>

              <p className="font-serif text-lg sm:text-xl text-gold-light italic">
                &ldquo;Completa los 5 niveles y recibe una página web personalizada GRATIS.&rdquo;
              </p>

              <p className="text-sm sm:text-base text-parchment-dim font-sans font-light leading-relaxed">
                Queremos ayudarte a transformar lo que aprendes en una presencia profesional en internet. Ya sea en Tarot, Astrología, Numerología o Reiki, saldrás listo para recibir consultantes.
              </p>

              {/* Lista de 9 Beneficios con Check */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {webPromotionBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-parchment-dim font-sans">
                    <span className="text-gold font-serif text-base">✓</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Texto Legal / Informativo del Dominio */}
              <div className="p-3.5 rounded-lg bg-obsidian-deep/80 border border-charcoal-border text-xs text-parchment-muted font-sans leading-relaxed">
                <span className="text-gold/90 font-medium">Nota informativa:</span> El dominio está incluido sin costo durante el primer año. Después del primer año, la renovación del dominio es independiente.
              </div>

              {/* Botón Promoción */}
              <div className="pt-2">
                <Link
                  href="/academia/registro/?promo=web-gratis-nivel-5"
                  className="w-full sm:w-auto px-8 py-3.5 rounded bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian text-xs uppercase tracking-[0.2em] font-sans font-bold shadow-[0_0_25px_rgba(198,160,82,0.5)] hover:shadow-[0_0_35px_rgba(198,160,82,0.7)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-center"
                >
                  <span>INICIAR MI RUTA HACIA EL NIVEL 5</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Columna de Mockup de Laptop & Página Web Profesional */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-lg aspect-[16/11] rounded-2xl bg-gradient-to-b from-[#181329] to-[#0c0916] border-2 border-gold/40 p-4 sm:p-6 shadow-[0_0_50px_rgba(198,160,82,0.25)] flex flex-col justify-between">
                {/* Barra de Navegador de la Laptop */}
                <div className="flex items-center justify-between pb-3 border-b border-charcoal-border">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <div className="px-4 py-0.5 rounded-full bg-obsidian-deep border border-charcoal-border text-[10px] font-mono text-gold-light/80">
                    https://tu-nombre-esoterico.com
                  </div>
                  <div className="text-gold/40 text-xs">🔒</div>
                </div>

                {/* Previsualización del Sitio Web Regalado */}
                <div className="my-auto py-6 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full border-2 border-gold/60 mx-auto overflow-hidden relative shadow-[0_0_20px_rgba(198,160,82,0.3)]">
                    <Image
                      src={getAssetPath("/images/cards/ar02.webp")}
                      alt="Tu perfil profesional"
                      fill
                      onError={handleImageError}
                      className="object-cover"
                    />
                  </div>
                  <div className="font-serif text-xl sm:text-2xl text-parchment">
                    Tu Espacio Profesional
                  </div>
                  <p className="text-xs text-parchment-dim font-sans max-w-xs mx-auto">
                    Lecturas de Tarot • Carta Natal • Consultas Online
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-2">
                    <span className="px-3 py-1 rounded bg-green-950/80 border border-green-600/40 text-green-300 text-[10px] font-sans font-semibold flex items-center gap-1">
                      <span>WhatsApp Directo</span>
                    </span>
                    <span className="px-3 py-1 rounded bg-obsidian-deep border border-gold/30 text-gold-light text-[10px] font-sans">
                      Agenda Abierta
                    </span>
                  </div>
                </div>

                {/* Pie del Mockup */}
                <div className="pt-3 border-t border-charcoal-border flex items-center justify-between text-[10px] font-sans text-parchment-muted">
                  <span>100% Responsive (Móvil & Escritorio)</span>
                  <span className="text-gold font-medium">Incluye 1 año de dominio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 13. BENEFICIOS ("¿QUÉ VAS A DESARROLLAR?") */}
      {/* ============================================================ */}
      <div className="relative py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-deep border border-gold/30 text-gold-light text-[11px] uppercase tracking-[0.2em] font-sans">
            <span>✦</span>
            <span>TRANSFORMACIÓN PERSONAL</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-parchment font-light">
            ¿QUÉ VAS A DESARROLLAR?
          </h2>
          <p className="text-sm sm:text-base text-parchment-muted font-sans font-light">
            Un marco integral que combina la sabiduría simbólica tradicional con la aplicación profesional.
          </p>
        </div>

        {/* 6 Tarjetas de Beneficios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {academyBenefits.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-xl bg-[#0e0b18] border border-charcoal-border hover:border-gold/50 transition-all duration-300 group hover:-translate-y-1 shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
            >
              <div className="text-2xl font-serif text-gold mb-3 group-hover:scale-110 transition-transform">
                {item.glyph}
              </div>
              <h3 className="font-serif text-xl text-parchment font-medium mb-2 group-hover:text-gold-light transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 14. CÓMO FUNCIONA ("TU CAMINO COMIENZA AQUÍ") */}
      {/* ============================================================ */}
      <div className="relative py-20 sm:py-28 bg-[#090711] border-y border-charcoal-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-deep border border-gold/30 text-gold-light text-[11px] uppercase tracking-[0.2em] font-sans">
              <span>01 - 04</span>
              <span>METODOLOGÍA CLARA</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-parchment font-light">
              TU CAMINO COMIENZA AQUÍ
            </h2>
            <p className="text-sm sm:text-base text-parchment-muted font-sans font-light">
              Un proceso simple, transparente y diseñado para que alcances tu máxima autonomía espiritual y profesional.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="relative rounded-xl bg-[#0e0c1a] border border-charcoal-border p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="font-serif text-3xl sm:text-4xl text-gold/40 font-light mb-4">
                    {step.stepNumber}
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl text-parchment font-medium mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 15. COMPARADOR DE DISCIPLINAS ("ENCUENTRA TU CAMINO") */}
      {/* ============================================================ */}
      <div className="relative py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-parchment font-light">
            ENCUENTRA TU CAMINO
          </h2>
          <p className="text-sm sm:text-base text-parchment-muted font-sans font-light">
            Descubre cuál de nuestras disciplinas resuena con tu búsqueda actual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {academyCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-6 rounded-xl bg-[#0c0916] border border-charcoal-border hover:border-gold/50 flex flex-col justify-between space-y-6 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="text-2xl">{cat.icon}</div>
                <h3 className="font-serif text-xl text-gold-light font-medium">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-sm text-parchment-dim font-sans font-light leading-relaxed">
                  {cat.idealFor}
                </p>
              </div>

              <button
                onClick={() => handleSelectDiscipline(cat.id)}
                className="w-full py-2.5 rounded bg-obsidian-deep border border-gold/40 text-gold-light hover:border-gold hover:text-parchment hover:bg-gold/15 text-xs uppercase tracking-widest font-sans font-semibold transition-colors text-center"
              >
                EXPLORAR
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 16. PREGUNTAS FRECUENTES (FAQ) */}
      {/* ============================================================ */}
      <div className="relative py-20 sm:py-28 bg-[#090712] border-t border-charcoal-border/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-deep border border-gold/30 text-gold-light text-[11px] uppercase tracking-[0.2em] font-sans">
              <span>✦</span>
              <span>RESOLUCIÓN DE DUDAS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-parchment font-light">
              PREGUNTAS FRECUENTES
            </h2>
          </div>

          <div className="space-y-3">
            {academyFaqList.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-lg bg-[#0e0b19] border border-charcoal-border overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-parchment hover:text-gold-light transition-colors"
                  >
                    <span className="font-serif text-base sm:text-lg font-normal">
                      {faq.question}
                    </span>
                    <span className="text-gold font-serif text-xl flex-shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-parchment-dim font-sans font-light leading-relaxed border-t border-charcoal-border/50 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 17. CTA FINAL */}
      {/* ============================================================ */}
      <div className="relative py-24 sm:py-32 bg-gradient-to-b from-[#090712] to-[#050409] text-center border-t border-charcoal-border/70 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,160,82,0.1)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 space-y-6">
          <span className="text-gold text-2xl font-serif">✦</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-parchment font-light leading-snug">
            TU CAMINO COMIENZA CON EL CONOCIMIENTO.
          </h2>
          <p className="font-serif text-base sm:text-lg text-parchment-dim italic max-w-2xl mx-auto leading-relaxed">
            &ldquo;Elige una disciplina. Abre una nueva puerta. Aprende a interpretar un universo de símbolos.&rdquo;
          </p>

          <div className="pt-4">
            <a
              href="#cursos-academia"
              className="inline-block px-10 py-4 rounded-sm bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian text-xs uppercase tracking-[0.25em] font-sans font-bold shadow-[0_0_30px_rgba(198,160,82,0.5)] hover:shadow-[0_0_45px_rgba(198,160,82,0.75)] hover:scale-105 transition-all duration-300"
            >
              EXPLORAR LA ACADEMIA
            </a>
          </div>
        </div>
      </div>

      {/* Modal de Detalle de Curso */}
      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </section>
  );
};
