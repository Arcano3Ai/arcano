"use client";

import React, { useState, useEffect, useRef } from "react";

interface ArcanaAudioPlayerProps {
  audioUrl: string;
  audioTitle?: string;
  arcanaName: string;
  slug: string;
  variant?: "detailed" | "compact" | "badge";
}

export const ArcanaAudioPlayer: React.FC<ArcanaAudioPlayerProps> = ({
  audioUrl,
  audioTitle,
  arcanaName,
  slug,
  variant = "detailed",
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.volume = volume;
    audioRef.current = audio;

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      window.dispatchEvent(new CustomEvent("arcano_resume_ambient"));
    };

    const onStopOtherTracks = (e: Event) => {
      const customEvent = e as CustomEvent<{ slug: string }>;
      if (customEvent.detail?.slug !== slug && audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    window.addEventListener("arcano_stop_other_tracks", onStopOtherTracks);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      window.removeEventListener("arcano_stop_other_tracks", onStopOtherTracks);
      if (audioRef.current) {
        if (!audioRef.current.paused) {
          audioRef.current.pause();
          window.dispatchEvent(new CustomEvent("arcano_resume_ambient"));
        }
        audioRef.current = null;
      }
    };
  }, [audioUrl, slug]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      window.dispatchEvent(new CustomEvent("arcano_resume_ambient"));
    } else {
      window.dispatchEvent(
        new CustomEvent("arcano_stop_other_tracks", { detail: { slug } })
      );
      window.dispatchEvent(new CustomEvent("arcano_pause_ambient"));

      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Audio playback interrupted:", err);
        });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // 1. Variante compacta (para modal)
  if (variant === "compact") {
    return (
      <div className="w-full rounded-md border border-gold/35 bg-gradient-to-r from-obsidian-deep via-[#16141a] to-obsidian-deep p-3 flex items-center justify-between gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
        <button
          type="button"
          onClick={togglePlay}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${
            isPlaying
              ? "border-gold bg-gold/20 text-gold shadow-[0_0_15px_rgba(198,160,82,0.4)] scale-105"
              : "border-gold/40 hover:border-gold bg-charcoal text-parchment hover:text-gold"
          }`}
          aria-label={isPlaying ? `Pausar música de ${arcanaName}` : `Reproducir música de ${arcanaName}`}
        >
          {isPlaying ? (
            <span className="text-sm">❚❚</span>
          ) : (
            <span className="text-sm ml-0.5">▶</span>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-gold truncate">
              {audioTitle || `Música Sagrada · ${arcanaName}`}
            </span>
            {isPlaying && (
              <span className="flex items-center gap-0.5">
                <span className="w-0.5 h-2.5 bg-gold animate-pulse" />
                <span className="w-0.5 h-3.5 bg-gold animate-pulse [animation-delay:150ms]" />
                <span className="w-0.5 h-2 bg-gold animate-pulse [animation-delay:300ms]" />
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-charcoal-border rounded-lg appearance-none cursor-pointer accent-gold"
              aria-label="Progreso de audio"
            />
            <span className="text-[10px] font-sans text-parchment-dim shrink-0">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Variante detallada (Altar sonoro para la página de detalle /arcanos/[slug])
  return (
    <section
      className="relative my-10 rounded-xl border border-gold/40 bg-gradient-to-b from-[#18141f] via-[#100e16] to-[#08070b] p-6 sm:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(198,160,82,0.12)] overflow-hidden"
      aria-label={`Reproductor consagrado de ${arcanaName}`}
    >
      {/* Marco ornamental y resplandor de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(198,160,82,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-2 border border-gold/15 rounded-lg pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Cabecera ceremonial */}
        <div className="flex items-center gap-5 w-full md:w-auto">
          <button
            type="button"
            onClick={togglePlay}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 transition-all duration-500 flex items-center justify-center shrink-0 shadow-2xl hover:scale-105 ${
              isPlaying
                ? "border-gold bg-gradient-to-br from-gold/30 via-[#261e12] to-obsidian text-gold shadow-[0_0_35px_rgba(198,160,82,0.55)]"
                : "border-gold/50 hover:border-gold bg-gradient-to-br from-[#1a1722] to-obsidian text-parchment hover:text-gold shadow-[0_0_20px_rgba(0,0,0,0.8)]"
            }`}
            aria-label={isPlaying ? `Pausar sintonía sagrada de ${arcanaName}` : `Iniciar sintonía sagrada de ${arcanaName}`}
          >
            {isPlaying ? (
              <span className="text-xl sm:text-2xl font-bold">❚❚</span>
            ) : (
              <span className="text-2xl sm:text-3xl ml-1 font-serif text-gold">▶</span>
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-gold font-medium">
                ✦ Sinfonía Consagrada del Arcano
              </span>
              {isPlaying && (
                <span className="px-2 py-0.5 rounded text-[9px] font-sans uppercase tracking-widest bg-gold/20 text-gold border border-gold/40 animate-pulse">
                  En Resonancia
                </span>
              )}
            </div>
            <h3 className="font-serif text-lg sm:text-2xl text-parchment font-light tracking-wide truncate">
              {audioTitle || `Música Sagrada de ${arcanaName}`}
            </h3>
            <p className="text-xs text-parchment-muted font-sans font-light mt-0.5">
              Custodiada por El Señor de los Arcanos para la meditación oracular y contemplación de la carta.
            </p>
          </div>
        </div>

        {/* Ecualizador místico dinámico */}
        <div className="flex items-end gap-1 h-8 px-4 py-1 bg-obsidian-deep/70 rounded-full border border-gold/25">
          <span
            className={`w-1 bg-gold rounded-full transition-all duration-300 ${
              isPlaying ? "h-6 animate-pulse" : "h-1 opacity-40"
            }`}
          />
          <span
            className={`w-1 bg-gold rounded-full transition-all duration-300 ${
              isPlaying ? "h-4 animate-pulse [animation-delay:100ms]" : "h-1 opacity-40"
            }`}
          />
          <span
            className={`w-1 bg-gold rounded-full transition-all duration-300 ${
              isPlaying ? "h-7 animate-pulse [animation-delay:200ms]" : "h-1 opacity-40"
            }`}
          />
          <span
            className={`w-1 bg-gold rounded-full transition-all duration-300 ${
              isPlaying ? "h-5 animate-pulse [animation-delay:300ms]" : "h-1 opacity-40"
            }`}
          />
          <span
            className={`w-1 bg-gold rounded-full transition-all duration-300 ${
              isPlaying ? "h-8 animate-pulse [animation-delay:400ms]" : "h-1 opacity-40"
            }`}
          />
          <span
            className={`w-1 bg-gold rounded-full transition-all duration-300 ${
              isPlaying ? "h-3 animate-pulse [animation-delay:150ms]" : "h-1 opacity-40"
            }`}
          />
          <span
            className={`w-1 bg-gold rounded-full transition-all duration-300 ${
              isPlaying ? "h-6 animate-pulse [animation-delay:250ms]" : "h-1 opacity-40"
            }`}
          />
        </div>
      </div>

      {/* Barra de progreso / control temporal */}
      <div className="relative z-10 mt-6 pt-5 border-t border-charcoal-border/70">
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-gold/90 w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-charcoal-border rounded-lg appearance-none cursor-pointer accent-gold"
            aria-label="Línea de tiempo de la canción sagrada"
          />
          <span className="text-xs font-mono text-parchment-dim w-10">
            {formatTime(duration)}
          </span>

          {/* Botón Silencio/Sonido */}
          <button
            type="button"
            onClick={toggleMute}
            className="text-parchment-dim hover:text-gold transition-colors text-xs font-sans px-2 py-1 border border-charcoal-border hover:border-gold/40 rounded"
            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
      </div>
    </section>
  );
};
