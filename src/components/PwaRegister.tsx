"use client";

import React, { useEffect, useState } from "react";
import { getAssetPath } from "@/lib/utils";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const PwaRegister: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState<boolean>(false);
  const [showIosGuide, setShowIosGuide] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [isIosDevice, setIsIosDevice] = useState<boolean>(false);

  useEffect(() => {
    // 1. Detectar si ya se está ejecutando como app standalone (PWA instalada)
    const isApp =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(isApp);

    // 2. Detectar si es dispositivo iOS (iPhone, iPad, iPod)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(userAgent);
    setIsIosDevice(isIos);

    // 3. Registrar Service Worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        const swPath = getAssetPath("/sw.js");
        navigator.serviceWorker
          .register(swPath)
          .then((registration) => {
            console.log("✦ ARCANO PWA Service Worker registrado con éxito:", registration.scope);
          })
          .catch((err) => {
            console.warn("Aviso: Registro de Service Worker PWA:", err);
          });
      });
    }

    // 4. Capturar evento nativo de instalación para Android / Chrome / Edge
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 5. Garantizar que el banner aparezca al entrar a los 2.5 segundos
    // si no es standalone y no ha sido descartado en localStorage
    const dismissed = localStorage.getItem("arcano_pwa_dismissed");
    if (!dismissed && !isApp) {
      const timer = setTimeout(() => {
        setShowInstallBanner(true);
      }, 2500);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      setShowInstallBanner(false);
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log("Resultado de instalación PWA:", outcome);
      setDeferredPrompt(null);
      if (outcome === "accepted") {
        localStorage.setItem("arcano_pwa_dismissed", "true");
      }
    } else if (isIosDevice) {
      // Mostrar modal guía para iOS
      setShowIosGuide(true);
    } else {
      // Guía general para otros navegadores
      alert(
        "Para instalar ARCANO en tu dispositivo:\n\n1. Pulsa en el menú de opciones de tu navegador (⋮ o icono de compartir).\n2. Selecciona 'Instalar aplicación' o 'Agregar a la pantalla de inicio'."
      );
      handleDismiss();
    }
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    setShowIosGuide(false);
    // Recordar descarte por 7 días
    localStorage.setItem("arcano_pwa_dismissed", String(Date.now()));
  };

  if (isStandalone) return null;

  return (
    <>
      {/* Banner Principal de Instalación */}
      {showInstallBanner && (
        <div
          role="banner"
          aria-label="Instalación de la aplicación ARCANO"
          className="fixed bottom-20 left-4 right-4 sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm z-40 p-4 rounded-2xl bg-[#110d1c]/95 backdrop-blur-md border border-gold/45 shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_20px_rgba(198,160,82,0.2)] flex items-center justify-between gap-3 animate-fadeIn"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-obsidian-deep border border-gold/50 flex items-center justify-center flex-shrink-0 text-gold text-xl shadow-inner">
              ✦
            </div>
            <div className="min-w-0">
              <p className="font-serif text-sm text-parchment font-medium truncate">
                Instalar App ARCANO
              </p>
              <p className="text-[11px] text-parchment-dim font-sans truncate">
                {isIosDevice
                  ? "Añadir a pantalla de inicio iOS"
                  : "Acceso directo y oráculo offline"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={handleDismiss}
              className="p-1.5 text-parchment-dim hover:text-gold text-xs font-sans transition-colors"
              aria-label="Cerrar aviso de instalación"
            >
              ✕
            </button>
            <button
              onClick={handleInstallClick}
              className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-gold/90 via-gold-light to-gold/90 text-obsidian text-[11px] font-sans font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(198,160,82,0.4)] hover:scale-105 active:scale-95 transition-all"
            >
              Instalar
            </button>
          </div>
        </div>
      )}

      {/* Guía modal ceremonial para iOS Safari */}
      {showIosGuide && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowIosGuide(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-[#120d20] border border-gold/50 p-6 text-parchment shadow-2xl text-center relative"
          >
            <button
              onClick={() => setShowIosGuide(false)}
              className="absolute top-4 right-4 text-parchment-dim hover:text-gold text-base p-1"
              aria-label="Cerrar guía"
            >
              ✕
            </button>

            <div className="w-12 h-12 rounded-full border border-gold/40 mx-auto flex items-center justify-center text-gold text-2xl mb-3 shadow-inner">
              ✦
            </div>

            <h3 className="font-serif text-lg text-parchment mb-2 font-light">
              Instalar en tu iPhone o iPad
            </h3>

            <p className="text-xs text-parchment-muted mb-5 leading-relaxed font-sans font-light">
              Para tener ARCANO como una aplicación independiente en tu pantalla de inicio:
            </p>

            <div className="space-y-3 text-left text-xs text-parchment-dim font-sans">
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-charcoal/50 border border-charcoal-border">
                <span className="w-6 h-6 rounded-full bg-gold/20 text-gold font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <span>
                  Pulsa el botón <strong>Compartir</strong> (icono de cuadrado con flecha hacia arriba <span className="text-gold font-bold">⎋</span>) en la barra de Safari.
                </span>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-charcoal/50 border border-charcoal-border">
                <span className="w-6 h-6 rounded-full bg-gold/20 text-gold font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <span>
                  Desplázate hacia abajo y selecciona <strong>&ldquo;Agregar a pantalla de inicio&rdquo; ➕</strong>.
                </span>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-charcoal/50 border border-charcoal-border">
                <span className="w-6 h-6 rounded-full bg-gold/20 text-gold font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <span>
                  Pulsa <strong>&ldquo;Agregar&rdquo;</strong> en la esquina superior derecha.
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowIosGuide(false);
                handleDismiss();
              }}
              className="mt-6 w-full py-2.5 rounded-lg bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian text-xs font-sans font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(198,160,82,0.3)] hover:scale-102 transition-all"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};
