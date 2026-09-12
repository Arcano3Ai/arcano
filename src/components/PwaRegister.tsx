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
  const [isStandalone, setIsStandalone] = useState<boolean>(false);

  useEffect(() => {
    // Detectar si ya se está ejecutando como PWA standalone
    const isApp =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(isApp);

    // Registrar Service Worker
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

    // Manejar evento de instalación en Android / Chrome
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Mostrar banner solo si no es standalone y no ha sido descartado en esta sesión
      const dismissed = sessionStorage.getItem("arcano_pwa_dismissed");
      if (!dismissed && !isApp) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    setShowInstallBanner(false);
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("Resultado de instalación PWA:", outcome);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    sessionStorage.setItem("arcano_pwa_dismissed", "true");
  };

  if (isStandalone || !showInstallBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 p-4 rounded-xl bg-[#0f0b1a]/95 backdrop-blur-md border border-gold/40 shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex items-center justify-between gap-3 animate-fadeIn">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-obsidian-deep border border-gold/50 flex items-center justify-center flex-shrink-0 text-gold text-lg shadow-inner">
          ✦
        </div>
        <div className="min-w-0">
          <p className="font-serif text-sm text-parchment font-medium truncate">
            Instalar ARCANO
          </p>
          <p className="text-[11px] text-parchment-dim font-sans truncate">
            Acceso directo y experiencia inmersiva
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={handleDismiss}
          className="p-1.5 text-parchment-muted hover:text-parchment text-xs font-sans"
          aria-label="Cerrar aviso de instalación"
        >
          ✕
        </button>
        <button
          onClick={handleInstallClick}
          className="px-3.5 py-1.5 rounded bg-gradient-to-r from-gold/90 via-gold-light to-gold/90 text-obsidian text-[11px] font-sans font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(198,160,82,0.4)] hover:scale-105 transition-all"
        >
          Instalar
        </button>
      </div>
    </div>
  );
};
