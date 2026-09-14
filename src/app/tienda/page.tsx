"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Tienda Ceremonial desactivada temporalmente (productos no reales).
 * Redirige de forma inmediata al inicio.
 */
export default function ShopPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="w-20 h-20 rounded-full border border-gold/40 flex items-center justify-center bg-charcoal/60 mb-6 shadow-[0_0_25px_rgba(198,160,82,0.2)]">
        <span className="text-gold text-3xl">✦</span>
      </div>
      <span className="text-xs uppercase tracking-[0.3em] text-gold/80 font-sans block mb-3">
        Boutique Ceremonial en Preparación
      </span>
      <h1 className="font-serif text-2xl sm:text-3xl text-parchment font-light max-w-lg leading-tight mb-4">
        Nuestras piezas sagradas se encuentran en consagración
      </h1>
      <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light max-w-md leading-relaxed mb-8">
        Por el momento, la tienda física no está disponible. Todas nuestras lecturas de tarot, tiradas oraculares y formación están 100% activas.
      </p>
      <Link
        href="/"
        className="px-8 py-3 text-xs uppercase tracking-[0.25em] font-sans text-obsidian bg-gold hover:bg-gold-light transition-all rounded-sm font-medium shadow-[0_0_20px_rgba(198,160,82,0.35)]"
      >
        Regresar al Santuario ✦
      </Link>
    </div>
  );
}

