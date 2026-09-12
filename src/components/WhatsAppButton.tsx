"use client";

import React, { useState } from "react";
import { getWhatsAppUrl } from "@/config/brandConfig";
import { trackEvent } from "@/lib/analytics";

export const WhatsAppButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    trackEvent({ name: "click_whatsapp", params: { source: "floating_button" } });
  };

  const whatsappUrl = getWhatsAppUrl();

  return (
    <aside
      aria-label="Atención directa por WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
    >
      {/* Tooltip místico expandible en hover */}
      <div
        className={`hidden sm:block transition-all duration-300 pointer-events-none ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}
      >
        <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-parchment bg-obsidian-deep/95 border border-gold/40 px-3 py-1.5 rounded shadow-lg backdrop-blur">
          Hablar con ARCANO ✦
        </span>
      </div>

      {/* Botón flotante ceremonial */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-gold/60 hover:border-gold bg-gradient-to-br from-[#1c1810] via-[#121118] to-[#08080a] text-gold hover:text-gold-light flex items-center justify-center shadow-[0_0_20px_rgba(198,160,82,0.3)] hover:shadow-[0_0_35px_rgba(198,160,82,0.6)] transition-all duration-500 hover:scale-105"
      >
        <svg
          className="w-6 h-6 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 0C5.405 0 .025 5.378.025 12.004c0 2.116.552 4.183 1.602 6.002L.004 24l6.167-1.617a11.96 11.96 0 0 0 5.86 1.517h.005c6.626 0 12.006-5.38 12.006-12.006A11.962 11.962 0 0 0 12.031 0zm0 21.93a9.92 9.92 0 0 1-5.06-1.39l-.364-.216-3.76 1 .985-3.663-.238-.378a9.932 9.932 0 0 1-1.52-5.28C2.073 6.51 6.536 2.05 12.03 2.05a9.92 9.92 0 0 1 7.039 2.923 9.92 9.92 0 0 1 2.916 7.031c0 5.498-4.464 9.926-9.954 9.926zm5.45-7.466c-.299-.15-1.77-.874-2.045-.973-.274-.1-.474-.15-.674.15-.2.299-.773.973-.948 1.173-.175.2-.349.225-.649.075-.299-.15-1.264-.466-2.408-1.485-.89-.794-1.49-1.774-1.665-2.073-.175-.3-.018-.462.132-.611.135-.135.299-.35.45-.524.149-.175.2-.299.299-.499.1-.2.05-.374-.025-.524-.075-.15-.674-1.623-.923-2.221-.242-.582-.488-.503-.674-.513l-.574-.01c-.2 0-.524.075-.798.374s-1.048 1.023-1.048 2.495 1.073 2.893 1.222 3.093c.15.2 2.112 3.224 5.117 4.522.715.309 1.273.494 1.708.632.718.228 1.371.196 1.888.119.576-.086 1.77-.723 2.02-1.422.25-.698.25-1.297.175-1.422-.075-.125-.274-.2-.574-.35z" />
        </svg>
      </a>
    </aside>
  );
};
