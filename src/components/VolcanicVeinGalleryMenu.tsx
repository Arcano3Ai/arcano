"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { EpicMineralVeinSelector } from "@/components/shop/EpicMineralVeinSelector";

/**
 * VolcanicVeinGalleryMenu
 * Unificado y sincronizado permanentemente con la Veta Sagrada de 32 Minerales en 2 Secciones.
 * Redirige fluidamente a la boutique /tienda/ filtrando por el mineral seleccionado.
 */
export function VolcanicVeinGalleryMenu() {
  const router = useRouter();
  const { language, t } = useLanguage();

  return (
    <div className="w-full">
      <EpicMineralVeinSelector
        selectedStone="todos"
        onSelectStone={(stoneId) => {
          router.push(`/tienda/?stone=${encodeURIComponent(stoneId)}#catalogo-top`);
        }}
        language={language}
        t={t}
      />
    </div>
  );
}
