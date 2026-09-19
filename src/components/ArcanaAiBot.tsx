"use client";

import React, { useState, useRef, useEffect } from "react";
import { arcanaList, Arcana } from "@/data/arcana";
import { getWhatsAppUrl } from "@/config/brandConfig";
import { sacredAudio } from "@/lib/sacredAudio";
import { getAssetPath, handleImageError } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  arcanaCard?: Arcana;
  quickReplies?: string[];
  timestamp: string;
}

export const ArcanaAiBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const initialMessages: ChatMessage[] = [
    {
      id: "welcome-1",
      sender: "bot",
      text: "Bienvenido al santuario digital. Soy el Custodio de ARCANO. Puedo orientarte sobre la sabiduría simbólica de los 22 Arcanos Mayores, calcular tu Arcano de Nacimiento o guiarte hacia las lecturas y consultas oraculares.",
      quickReplies: [
        "¿Cómo es una lectura de Tarot?",
        "¿Qué significa El Loco?",
        "Calcular mi Arcano de Nacimiento",
        "Ver lecturas disponibles",
      ],
      timestamp: "Ahora",
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Procesador oracular para Arcanos y Consultas
  const processQuery = (
    rawQuery: string
  ): { response: string; arcana?: Arcana; quickReplies?: string[] } => {
    const q = rawQuery.toLowerCase().trim();

    // 0. Preguntas sobre la Academia Esotérica y Promoción Web
    if (
      q.includes("academia") ||
      q.includes("curso") ||
      q.includes("aprender") ||
      q.includes("clase") ||
      q.includes("estudiar") ||
      q.includes("astrologia") ||
      q.includes("astrología") ||
      q.includes("numerologia") ||
      q.includes("numerología") ||
      q.includes("reiki") ||
      q.includes("web gratis") ||
      q.includes("promocion") ||
      q.includes("promoción") ||
      q.includes("nivel 1") ||
      q.includes("nivel 2") ||
      q.includes("nivel 3") ||
      q.includes("nivel 5")
    ) {
      if (q.includes("web") || q.includes("gratis") || q.includes("promocion") || q.includes("promoción")) {
        return {
          response: `✦ Promoción Principal de la Academia Esotérica:\n\n«Completa los 5 niveles de formación y recibe una página web personalizada GRATIS con dominio incluido durante 1 año.»\n\n• Aplica completando los Niveles 1 al 5 de tu disciplina elegida (Tarot, Astrología, Numerología o Reiki).\n• Inversión: $799 MXN por curso (precio universal para todos los niveles).\n• Incluye: diseño profesional, botones a WhatsApp, catálogo/servicios y dominio por 1 año.\n• Nota: Después del primer año, la renovación del dominio es independiente.\n\nPuedes explorar los detalles en la sección «Academia» de nuestra web.`,
          quickReplies: ["Ver Cursos de Tarot ($799 MXN)", "Ver Astrología y Carta Natal", "Ver Numerología", "¿Cómo obtengo la web gratis?"],
        };
      }

      return {
        response: `✦ Academia Esotérica — ARCANO:\n\nPlataforma educativa con 4 rutas de formación sagrada:\n\n1. 🎴 Tarot (6 Niveles iniciáticos a profesionales)\n2. 🪐 Astrología (5 Niveles: Desde Cero hasta Carta Natal y Kármica)\n3. 🔢 Numerología (5 Niveles: Códigos, Número de Vida y Profesional)\n4. ✨ Reiki y Energía (5 Niveles: Bienestar, Chakras y Conexión Interior)\n\n• Inversión: Todos los cursos a $799 MXN.\n• ¡Completa los 5 niveles de cualquier disciplina y recibe tu página web personalizada GRATIS con dominio por 1 año!`,
        quickReplies: ["¿Cómo obtengo la web gratis?", "Explorar Cursos ($799 MXN)", "Ver Rutas de Aprendizaje"],
      };
    }

    // 1. Preguntas sobre tienda o productos físicos (Boutique de Piedras de Río & Inciensos)
    if (
      q.includes("tienda") ||
      q.includes("producto") ||
      q.includes("comprar") ||
      q.includes("catalogo") ||
      q.includes("catálogo") ||
      q.includes("piedra") ||
      q.includes("quemador") ||
      q.includes("portaincienso") ||
      q.includes("incienso") ||
      q.includes("runa") ||
      q.includes("sahumerio") ||
      q.includes("salvia") ||
      q.includes("palo santo")
    ) {
      return {
        response: `✦ ¡Nuestra Boutique Ceremonial está activa!\n\nDisponemos de una colección exclusiva de Piezas Únicas de Río, taladradas y grabadas a mano como soportes y quemadores de incienso ritual:\n\n• ᚱ Quemador Piedra Aura Runas + 12 varitas: MXN $219 (+ envío)\n• 🌿 Quemador Piedra Aura + 12 varitas: MXN $149 (+ envío)\n• 🪶 Set de Incienso «Bosque Sagrado» (12 varitas): MXN $89 (+ envío)\n• 💫 Piedra Aura Dorada (Edición Ritual): MXN $199 (+ envío)\n• ✨ Piedras de Río Portales 11:11, 777, 444, Flor de la Vida y Lunas.\n\nCada piedra es única e irrepetible. Puedes ver la colección completa en la sección /tienda y solicitar tu pieza directamente por WhatsApp.`,
        quickReplies: [
          "Ir a la Tienda Ceremonial",
          "Pedir por WhatsApp",
          "Ver lecturas de tarot",
        ],
      };
    }

    // 2. Cálculo de arcano de nacimiento
    if (q.includes("nacimiento") || q.includes("cumpleaños") || q.includes("fecha") || /\b\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}\b/.test(q)) {
      const dateMatch = q.match(/(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})/);
      if (dateMatch) {
        const day = parseInt(dateMatch[1], 10);
        const month = parseInt(dateMatch[2], 10);
        let year = parseInt(dateMatch[3], 10);
        if (year < 100) year += 2000;

        const allDigits = `${day}${month}${year}`.split("").map(Number);
        let sum = allDigits.reduce((acc, curr) => acc + curr, 0);
        while (sum > 22 && sum !== 0) {
          sum = sum.toString().split("").map(Number).reduce((a, b) => a + b, 0);
        }

        const natalArcana = arcanaList.find((a) => {
          if (sum === 22 || sum === 0) return a.slug === "el-loco";
          return a.number === sum.toString();
        }) || arcanaList[0];

        return {
          response: `✦ Tu Arcano de Nacimiento es ${natalArcana.name} (Número ${natalArcana.number} · ${natalArcana.archetype}).\n\nEste arcano rige tu propósito vital y la fuerza arquetípica que viniste a encarnar en esta vida.\n\n«${natalArcana.quote}»\n\n• Lección primordial: ${natalArcana.description}\n• Pregunta clave: «${natalArcana.reflectionQuestion}»`,
          arcana: natalArcana,
          quickReplies: [`Consejo de ${natalArcana.name}`, "Consultar con El Señor de los Arcanos", "Ver lecturas disponibles"],
        };
      }

      return {
        response: "✦ Para calcular tu Arcano de Nacimiento, dime tu fecha de nacimiento (por ejemplo: 14/05/1992). Realizaré la suma teosófica para revelar el arquetipo que guía tu alma.",
        quickReplies: ["14/05/1992", "22/10/1988", "07/03/1995"],
      };
    }

    // 3. Consultas sobre los 22 Arcanos Mayores
    const foundArcana = arcanaList.find((a) => {
      const nameClean = a.name.toLowerCase();
      const slugClean = a.slug.replace(/-/g, " ");
      return q.includes(nameClean) || q.includes(slugClean) || q.includes(a.name.replace(/^(el|la|los|las)\s+/i, "").toLowerCase());
    });

    if (foundArcana) {
      if (q.includes("luz") || q.includes("sombra") || q.includes("polaridad")) {
        return {
          response: `✦ Polaridad de ${foundArcana.name} (${foundArcana.number}):\n\n• En la Luz (Aspecto armónico): ${foundArcana.keywordsLight.join(", ")}.\n\n• En la Sombra (Aspecto a integrar): ${foundArcana.keywordsShadow.join(", ")}.\n\n• Esencia: ${foundArcana.description}\n\nPregunta de introspección: «${foundArcana.reflectionQuestion}»`,
          arcana: foundArcana,
          quickReplies: [`Consejo en el amor de ${foundArcana.name}`, `Consejo en el trabajo de ${foundArcana.name}`, "¿Consultar con El Señor de los Arcanos?"],
        };
      }

      if (q.includes("amor") || q.includes("pareja") || q.includes("relacion")) {
        return {
          response: `✦ ${foundArcana.name} en el Amor y los Vínculos:\n\n${foundArcana.love}\n\nCrecimiento personal: «${foundArcana.personalGrowth}»`,
          arcana: foundArcana,
          quickReplies: [`En el trabajo: ${foundArcana.name}`, `Sombra de ${foundArcana.name}`, "Tirada de 3 cartas"],
        };
      }

      if (q.includes("trabajo") || q.includes("dinero") || q.includes("carrera") || q.includes("profesional")) {
        return {
          response: `✦ ${foundArcana.name} en el Ámbito Profesional y Material:\n\n${foundArcana.work}\n\nCrecimiento: «${foundArcana.personalGrowth}»`,
          arcana: foundArcana,
          quickReplies: [`En el amor: ${foundArcana.name}`, `Simbolismo de ${foundArcana.name}`, "Tirada de 3 cartas"],
        };
      }

      return {
        response: `✦ ${foundArcana.name} (Arcano ${foundArcana.number} · ${foundArcana.archetype}):\n\n«${foundArcana.quote}»\n\n• Significado esencial: ${foundArcana.description}\n• Luz: ${foundArcana.keywordsLight.slice(0, 3).join(", ")}\n• Sombra: ${foundArcana.keywordsShadow.slice(0, 3).join(", ")}\n• Consejo oracular: «${foundArcana.reflectionQuestion}»`,
        arcana: foundArcana,
        quickReplies: [
          `Luz y sombra de ${foundArcana.name}`,
          `${foundArcana.name} en el amor`,
          `Ver tratado de ${foundArcana.name}`,
        ],
      };
    }

    // 4. Tirada de cartas o consultas
    if (q.includes("tirada") || q.includes("cartas") || q.includes("oraculo") || q.includes("como leer")) {
      return {
        response: "✦ La Tirada de las Tres Revelaciones (Pasado, Presente y Futuro) está disponible en vivo en nuestro santuario:\n\n1. Pasado: La raíz profunda de tu situación.\n2. Presente: El espejo sagrado y la prueba en este instante.\n3. Futuro: Hacia dónde fluye tu destino si actúas con conciencia.\n\nPuedes realizarla en la sección «Oráculo Ritual en Vivo» ingresando tu nombre y pregunta.",
        quickReplies: ["¿Qué significa La Estrella?", "Ver lecturas disponibles", "Consultar con El Señor de los Arcanos"],
      };
    }

    if (q.includes("señor") || q.includes("arcanos") || q.includes("malachai") || q.includes("lector") || q.includes("tarotista") || q.includes("sesion") || q.includes("cita") || q.includes("reserva")) {
      return {
        response: "✦ El Señor de los Arcanos es Lector y Custodio de los Símbolos en ARCANO. Brinda sesiones privadas de tarot ceremonial con estricta confidencialidad y rigor ético.\n\nPuedes coordinar una lectura personal vía WhatsApp o explorar las lecturas disponibles en la web.",
        quickReplies: ["Consultar por WhatsApp", "Ver lecturas disponibles", "Calcular mi Arcano"],
      };
    }

    // Respuesta general
    return {
      response: `✦ En ARCANO, los símbolos custodian respuestas a todas las encrucijadas. Pregúntame sobre cualquier arcano (ej: «El Mago», «La Muerte»), tu fecha de nacimiento o sobre los servicios de lecturas y la Academia.`,
      quickReplies: ["¿Cómo es una lectura de Tarot?", "¿Qué significa El Loco?", "Calcular mi Arcano de Nacimiento", "Ver lecturas disponibles"],
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    sacredAudio.playChime(528, 0.4, 0.04);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: "Ahora",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const { response, arcana, quickReplies } = processQuery(userMsg.text);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response,
        arcanaCard: arcana,
        quickReplies,
        timestamp: "Ahora",
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      sacredAudio.playCardFlip();
    }, 550);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Botón flotante ceremonial: El Sello de ARCANO (arriba del botón de WhatsApp, anclado abajo) */}
      <aside
        id="arcana-bot-floating-btn"
        aria-label="El Sello de ARCANO — Custodio y Oráculo"
        style={{
          position: "fixed",
          bottom: "max(5rem, calc(env(safe-area-inset-bottom, 0px) + 5rem))",
          right: "max(1.25rem, calc(env(safe-area-inset-right, 0px) + 1.25rem))",
          top: "auto",
        }}
        className="z-40 flex items-center gap-3 print:hidden no-print"
      >
        {/* Tooltip místico expandible */}
        <div
          className={`hidden sm:block transition-all duration-300 pointer-events-none ${
            isHovered && !isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          }`}
        >
          <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-gold-light bg-obsidian-deep/95 border border-gold/50 px-3 py-1.5 rounded shadow-[0_0_15px_rgba(198,160,82,0.3)] backdrop-blur">
            El Sello de ARCANO ✦
          </span>
        </div>

        {/* Botón con el Sello Sagrado de ARCANO */}
        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
            sacredAudio.playChime(639, 0.6, 0.05);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Abrir asistente de Arcanos"
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-gold/80 bg-gradient-to-br from-[#262014] via-[#15131e] to-[#090810] text-gold hover:text-gold-light flex items-center justify-center shadow-[0_0_24px_rgba(218,165,32,0.55)] hover:shadow-[0_0_35px_rgba(255,215,0,0.85)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {/* Anillo de pulso místico */}
          <span className="absolute inset-0 rounded-full border border-gold/40 animate-ping opacity-35 pointer-events-none" />

          {isOpen ? (
            <span className="text-xl font-serif">✕</span>
          ) : (
            <div className="flex flex-col items-center justify-center">
              {/* Sello Alquímico Representativo de ARCANO */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="w-6 h-6 filter drop-shadow-[0_0_8px_rgba(255,215,0,0.7)]"
              >
                {/* Círculo sagrado perimetral */}
                <circle cx="12" cy="12" r="9.5" className="stroke-gold/70" strokeWidth="1" />
                {/* Triángulo de fuego alquímico */}
                <polygon points="12 3 20.5 17.5 3.5 17.5" className="stroke-gold fill-gold/20" strokeWidth="1.4" />
                {/* Ojo del Oráculo central con pupila */}
                <circle cx="12" cy="12.5" r="2" className="fill-gold" />
                {/* Rayos de luz celestial */}
                <path d="M12 2v2M12 20v2M2 12h2M20 12h2" className="stroke-gold-light" strokeWidth="1.2" />
              </svg>
              <span className="text-[7px] font-sans font-bold uppercase tracking-[0.2em] text-gold-light mt-0.5">
                ARCANO
              </span>
            </div>
          )}
        </button>
      </aside>

      {/* Ventana de Chat del Custodio de ARCANO */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Ventana de consulta del Custodio de ARCANO"
          style={{
            position: "fixed",
            bottom: "max(5rem, calc(env(safe-area-inset-bottom, 0px) + 5rem))",
            right: "max(0.75rem, env(safe-area-inset-right, 0px))",
            top: "auto",
          }}
          className="w-[94vw] sm:w-[420px] h-[520px] max-h-[78vh] rounded-2xl border border-gold/50 bg-[#0d0c15]/98 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(198,160,82,0.25)] flex flex-col z-50 overflow-hidden animate-fadeIn print:hidden no-print"
        >
          {/* Cabecera */}
          <div className="p-4 border-b border-charcoal-border/70 bg-gradient-to-r from-[#1c1628] via-[#13111d] to-[#0c0b14] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gold/60 flex items-center justify-center bg-gold/15 shadow-[0_0_12px_rgba(198,160,82,0.3)]">
                <span className="text-gold text-lg">🜂</span>
              </div>
              <div>
                <h3 className="font-serif text-sm text-parchment font-medium tracking-wide flex items-center gap-1.5">
                  <span>Custodio de ARCANO</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-gold/20 text-gold-light border border-gold/40 font-sans">
                    ORÁCULO DIGITAL
                  </span>
                </h3>
                <span className="text-[10px] text-parchment-dim font-sans block">
                  Sabiduría de los Arcanos & Guía Simbólica
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full border border-charcoal-border hover:border-gold/60 text-parchment-dim hover:text-gold flex items-center justify-center transition-colors text-sm"
            >
              ✕
            </button>
          </div>

          {/* Cuerpo de Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans scrollbar-thin scrollbar-thumb-gold/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-xl p-3.5 leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-gold/30 to-gold/20 text-parchment border border-gold/40 rounded-br-none"
                      : "bg-[#14121d] text-parchment-muted border border-charcoal-border rounded-bl-none shadow-md"
                  }`}
                >
                  <p className="whitespace-pre-line text-[12px]">{msg.text}</p>

                  {/* Ficha pequeña del Arcano */}
                  {msg.arcanaCard && (
                    <div className="mt-3 pt-2.5 border-t border-gold/20 flex items-center gap-3 bg-obsidian/60 p-2 rounded border border-charcoal-border">
                      <div className="w-10 h-14 relative rounded overflow-hidden border border-gold/40 flex-shrink-0 bg-black">
                        <img
                          src={getAssetPath(msg.arcanaCard.imageUrl)}
                          alt={msg.arcanaCard.name}
                          onError={handleImageError}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="font-serif text-gold-light text-xs block truncate font-medium">
                          {msg.arcanaCard.name} ({msg.arcanaCard.number})
                        </span>
                        <span className="text-[10px] text-parchment-dim block truncate font-sans">
                          {msg.arcanaCard.archetype} · {msg.arcanaCard.element}
                        </span>
                        <a
                          href={`/arcanos/${msg.arcanaCard.slug}`}
                          className="text-[10px] text-gold hover:underline inline-flex items-center gap-1 mt-0.5"
                        >
                          Ver tratado completo →
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sugerencias Rápidas / Quick Replies */}
                {msg.quickReplies && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                    {msg.quickReplies.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (reply.includes("WhatsApp")) {
                            window.open(getWhatsAppUrl(`Hola ARCANO, tengo una consulta sobre las lecturas y los arcanos.`), "_blank");
                          } else {
                            handleSendMessage(reply);
                          }
                        }}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-gold/10 hover:bg-gold/25 border border-gold/30 text-gold-light transition-all text-left shadow-sm hover:scale-105 active:scale-95"
                      >
                        ✦ {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-gold/60 text-xs p-2">
                <span className="animate-spin text-sm">✧</span>
                <span className="font-serif italic text-[11px]">Consultando los registros sagrados...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Enlaces rápidos: Lecturas y WhatsApp */}
          <div className="px-4 py-2 bg-[#12101c] border-t border-charcoal-border/50 text-[10px] text-parchment-dim flex items-center justify-between font-sans">
            <a href="/lecturas" className="text-parchment-muted hover:text-gold flex items-center gap-1">
              <span>🔮</span>
              <span>Ver Lecturas de Tarot</span>
            </a>
            <span className="text-gold/40">✦</span>
            <a
              href={getWhatsAppUrl("Hola, deseo consultar sobre una lectura personalizada con El Señor de los Arcanos en ARCANO.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-light font-medium underline flex items-center gap-1"
            >
              <span>Consultar por WhatsApp</span>
              <span>→</span>
            </a>
          </div>

          {/* Formulario de Entrada */}
          <div className="p-3 border-t border-charcoal-border bg-[#0b0a10] flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pregunta por un arcano, tu fecha o una tirada..."
              className="flex-1 bg-[#151320] border border-charcoal-border rounded-lg px-3.5 py-2.5 text-xs text-parchment placeholder-parchment-dim/60 focus:outline-none focus:border-gold transition-colors"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-lg bg-gold hover:bg-gold-light text-obsidian disabled:opacity-40 disabled:hover:bg-gold transition-all shadow-[0_0_12px_rgba(198,160,82,0.3)] active:scale-95"
              aria-label="Enviar pregunta al custodio"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
