"use client";

import React, { useState, useEffect, useRef } from "react";
import { getAudioPath } from "@/lib/utils";

export const AtmosphereAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getOrCreateAudio = () => {
    if (!audioRef.current && typeof window !== "undefined") {
      const primaryUrl = getAudioPath("/audio/druidic-dance.mp3");
      const audio = new Audio(primaryUrl);
      audio.preload = "auto";
      audio.loop = true;
      audio.volume = 0.28; // Volumen sutil ceremonial
      audioRef.current = audio;
    }
    return audioRef.current;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isExplicitlyMuted = localStorage.getItem("arcano_ambient_muted") === "true";
    const audio = getOrCreateAudio();

    if (audio && !isExplicitlyMuted) {
      // Intentar reproducción inmediata al entrar a la página
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {
            // Si la política de autoplay del navegador restringe audio sin gesto previo,
            // activar la música en el primer clic, toque o desplazamiento en cualquier parte de la pantalla.
            const handleFirstGesture = () => {
              if (audioRef.current && audioRef.current.paused && localStorage.getItem("arcano_ambient_muted") !== "true") {
                audioRef.current
                  .play()
                  .then(() => {
                    setIsPlaying(true);
                    setHasInteracted(true);
                  })
                  .catch(() => {});
              }
              cleanupGestures();
            };

            const cleanupGestures = () => {
              window.removeEventListener("click", handleFirstGesture);
              window.removeEventListener("touchstart", handleFirstGesture);
              window.removeEventListener("pointerdown", handleFirstGesture);
              window.removeEventListener("scroll", handleFirstGesture);
              window.removeEventListener("keydown", handleFirstGesture);
            };

            window.addEventListener("click", handleFirstGesture, { once: true, passive: true });
            window.addEventListener("touchstart", handleFirstGesture, { once: true, passive: true });
            window.addEventListener("pointerdown", handleFirstGesture, { once: true, passive: true });
            window.addEventListener("scroll", handleFirstGesture, { once: true, passive: true });
            window.addEventListener("keydown", handleFirstGesture, { once: true, passive: true });
          });
      }
    }

    let wasPlayingBeforeArcano = false;

    const handleArcanoPauseAmbient = () => {
      if (audioRef.current && !audioRef.current.paused) {
        wasPlayingBeforeArcano = true;
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleArcanoResumeAmbient = () => {
      if (wasPlayingBeforeArcano && audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            wasPlayingBeforeArcano = false;
          })
          .catch(() => {});
      }
    };

    window.addEventListener("arcano_pause_ambient", handleArcanoPauseAmbient);
    window.addEventListener("arcano_resume_ambient", handleArcanoResumeAmbient);

    return () => {
      window.removeEventListener("arcano_pause_ambient", handleArcanoPauseAmbient);
      window.removeEventListener("arcano_resume_ambient", handleArcanoResumeAmbient);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    const audio = getOrCreateAudio();
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      localStorage.setItem("arcano_ambient_muted", "true");
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
          localStorage.removeItem("arcano_ambient_muted");
        })
        .catch((err) => {
          console.warn("Audio playback issue:", err);
        });
    }
  };

  return (
    <div
      className="fixed bottom-6 left-6 z-40 flex items-center gap-3 print:hidden no-print"
      aria-label="Control de audio ambiental"
    >
      {/* Botón de control ceremonial */}
      <button
        type="button"
        onClick={togglePlay}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={isPlaying ? "Pausar atmósfera sonora" : "Activar atmósfera sonora"}
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border transition-all duration-500 flex items-center justify-center shadow-lg hover:scale-105 ${
          isPlaying
            ? "border-gold bg-gradient-to-br from-[#1e1710] via-[#121118] to-[#08080a] text-gold shadow-[0_0_25px_rgba(198,160,82,0.4)]"
            : "border-charcoal-border hover:border-gold/60 bg-obsidian-deep/90 text-parchment-dim hover:text-gold shadow-[0_0_15px_rgba(0,0,0,0.6)]"
        }`}
      >
        {isPlaying ? (
          <div className="flex items-center gap-1">
            <span className="w-1 h-3.5 bg-gold rounded-full animate-pulse" />
            <span className="w-1 h-5 bg-gold rounded-full animate-pulse [animation-delay:150ms]" />
            <span className="w-1 h-2.5 bg-gold rounded-full animate-pulse [animation-delay:300ms]" />
          </div>
        ) : (
          <span className="text-sm font-serif">✧</span>
        )}
      </button>

      {/* Tooltip explicativo */}
      <div
        className={`hidden sm:block transition-all duration-300 pointer-events-none ${
          isHovered || (!hasInteracted && !isPlaying)
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-2"
        }`}
      >
        <div className="text-[11px] font-sans uppercase tracking-[0.2em] text-parchment bg-obsidian-deep/95 border border-gold/35 px-3 py-1.5 rounded shadow-lg backdrop-blur flex items-center gap-2">
          <span>{isPlaying ? "Atmósfera Sonora: Druidic Dance" : "Activar sonido del santuario ✦"}</span>
        </div>
      </div>
    </div>
  );
};
