// Sintetizador Web Audio API puro para resonancias rituales ceremoniales
class SacredAudioEngine {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Tono de campana ceremonial sagrada (Frecuencia Solfeggio 528Hz / 432Hz con armónicos ricos)
  playChime(freq = 528, duration = 2.4, gainLevel = 0.08) {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(gainLevel, now + 0.03);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      masterGain.connect(ctx.destination);

      // Fundamental y dos armónicos esotéricos
      const harmonics = [1, 2.76, 5.4];
      harmonics.forEach((h, index) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = index === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq * h, now);

        const harmGain = 1 / (index + 1);
        oscGain.gain.setValueAtTime(harmGain, now);
        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + duration);
      });
    } catch {
      // Ignorar silenciosamente si el navegador bloquea audio antes de gesto
    }
  }

  // Sonido sutil de volteo de carta / pergamino
  playCardFlip() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);

      // Añadir una resonancia de campana muy tenue
      this.playChime(432, 1.8, 0.035);
    } catch {
      // Audio no disponible
    }
  }
}

export const sacredAudio = new SacredAudioEngine();
