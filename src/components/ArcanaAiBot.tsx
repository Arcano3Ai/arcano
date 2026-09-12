"use client";

import React, { useState, useRef, useEffect } from "react";
import { arcanaList, Arcana } from "@/data/arcana";
import { shopProducts, shopCategories, ShopProduct } from "@/data/shop";
import { getWhatsAppUrl } from "@/config/brandConfig";
import { sacredAudio } from "@/lib/sacredAudio";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  arcanaCard?: Arcana;
  shopItem?: ShopProduct;
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
      text: "Bienvenido al santuario digital. Soy el Custodio de ARCANO. Puedo orientarte sobre la sabiduría simbólica de los 22 Arcanos Mayores, calcular tu Arcano de Nacimiento o guiarte a través de los artículos rituales de nuestra Boutique Ceremonial.",
      quickReplies: [
        "¿Qué productos hay en la tienda?",
        "¿Qué significa El Loco?",
        "Calcular mi Arcano de Nacimiento",
        "Baraja ARCANO de bordes dorados",
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

  // Procesador oracular para la Tienda y los Arcanos
  const processQuery = (
    rawQuery: string
  ): { response: string; arcana?: Arcana; shopItem?: ShopProduct; quickReplies?: string[] } => {
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
      q.includes("nivel 3")
    ) {
      if (q.includes("web") || q.includes("gratis") || q.includes("promocion") || q.includes("promoción")) {
        return {
          response: `✦ Promoción Principal de la Academia Esotérica:\n\n«Completa los primeros 3 niveles y recibe una página web personalizada GRATIS con dominio incluido durante 1 año.»\n\n• Aplica completando los Niveles 1, 2 y 3 de tu disciplina elegida (Tarot, Astrología, Numerología o Reiki).\n• Inversión: $799 MXN por curso (precio universal para todos los niveles).\n• Incluye: diseño profesional, botones a WhatsApp, catálogo/servicios y dominio por 1 año.\n• Nota: Después del primer año, la renovación del dominio es independiente.\n\nPuedes explorar los detalles en la sección «Academia» de nuestra web.`,
          quickReplies: ["Ver Cursos de Tarot ($799 MXN)", "Ver Astrología y Carta Natal", "Ver Numerología", "¿Cómo obtengo la web gratis?"],
        };
      }

      return {
        response: `✦ Academia Esotérica — ARCANO:\n\nPlataforma educativa con 4 rutas de formación sagrada:\n\n1. 🎴 Tarot (6 Niveles iniciáticos a profesionales)\n2. 🪐 Astrología (5 Niveles: Desde Cero hasta Carta Natal y Kármica)\n3. 🔢 Numerología (5 Niveles: Códigos, Número de Vida y Profesional)\n4. ✨ Reiki y Energía (5 Niveles: Bienestar, Chakras y Conexión Interior)\n\n• Inversión: Todos los cursos a $799 MXN.\n• ¡Completa los primeros 3 niveles de cualquier disciplina y recibe tu página web personalizada GRATIS con dominio por 1 año!`,
        quickReplies: ["¿Cómo obtengo la web gratis?", "Explorar Cursos ($799 MXN)", "Ver Rutas de Aprendizaje"],
      };
    }

    // 1. Preguntas de la Tienda
    if (
      q.includes("tienda") ||
      q.includes("producto") ||
      q.includes("comprar") ||
      q.includes("catalogo") ||
      q.includes("precio") ||
      q.includes("costo") ||
      q.includes("vela") ||
      q.includes("sahumerio") ||
      q.includes("incienso") ||
      q.includes("resina") ||
      q.includes("cristal") ||
      q.includes("mineral") ||
      q.includes("obsidiana") ||
      q.includes("amatista") ||
      q.includes("baraja") ||
      q.includes("mazo") ||
      q.includes("libro") ||
      q.includes("grimorio") ||
      q.includes("tapiz")
    ) {
      // Buscar producto específico
      if (q.includes("vela") || q.includes("soja") || q.includes("ritualis")) {
        const item = shopProducts.find((p) => p.id === "vela-arcano-ritualis")!;
        return {
          response: `✦ ${item.name} (${item.formattedPrice}):\n\n${item.description}\n\n• Uso ceremonial: ${item.ritualUse}\n• Disponibilidad: En stock con sello de consagración.`,
          shopItem: item,
          quickReplies: ["¿Cómo comprar por WhatsApp?", "Ver Inciensos y Resinas", "Baraja de Tarot ARCANO"],
        };
      }

      if (q.includes("sahumerio") || q.includes("salvia") || q.includes("limpieza")) {
        const item = shopProducts.find((p) => p.id === "sahumerio-salvia-copal")!;
        return {
          response: `✦ ${item.name} (${item.formattedPrice}):\n\n${item.description}\n\n• Uso ceremonial: ${item.ritualUse}`,
          shopItem: item,
          quickReplies: ["Comprar por WhatsApp", "Resinas de Copal Negro", "Vela ARCANO RITUALIS"],
        };
      }

      if (q.includes("incienso") || q.includes("resina") || q.includes("copal") || q.includes("mirra") || q.includes("frankincense")) {
        const item = shopProducts.find((p) => p.id === "resinas-sagradas-arcano")!;
        return {
          response: `✦ ${item.name} (${item.formattedPrice}):\n\n${item.description}\n\n• Incluye: 150g de resina pura virgen y 10 pastillas de carbón vegetal ceremonial.\n• Uso: ${item.ritualUse}`,
          shopItem: item,
          quickReplies: ["Comprar Resinas por WhatsApp", "Ver Cristales y Minerales", "¿Tienen envíos a todo México?"],
        };
      }

      if (q.includes("cristal") || q.includes("mineral") || q.includes("obsidiana") || q.includes("amatista") || q.includes("cuarzo")) {
        const item = shopProducts.find((p) => p.id === "estuche-mineralia-arcano")!;
        return {
          response: `✦ ${item.name} (${item.formattedPrice}):\n\n${item.description}\n\n• Incluye: Geoda de amatista, esfera de obsidiana negra pulida, obelisco de cuarzo cristal y pepita de pirita en cofre de terciopelo con sello de pan de oro.`,
          shopItem: item,
          quickReplies: ["Comprar Estuche Mineralia", "Baraja ARCANO TAROT", "¿Cómo limpiar los cristales?"],
        };
      }

      if (q.includes("baraja") || q.includes("mazo") || q.includes("cartas") || q.includes("dorad")) {
        const item = shopProducts.find((p) => p.id === "baraja-arcano-tarot-deluxe")!;
        return {
          response: `✦ ${item.name} (${item.formattedPrice}):\n\n${item.description}\n\n• Características: Cartulina alemana de lino de 350g, bordes con baño de pan de oro brillante (gilded edges), caja rígida de dos piezas y libreto de 120 páginas por Malachai.`,
          shopItem: item,
          quickReplies: ["Adquirir Baraja por WhatsApp", "Libro de los Símbolos", "¿Hacen envíos internacionales?"],
        };
      }

      if (q.includes("libro") || q.includes("grimorio") || q.includes("tratado") || q.includes("escrito")) {
        const item = shopProducts.find((p) => p.id === "libro-arcano-simbolos-malachai")!;
        return {
          response: `✦ ${item.name} (${item.formattedPrice}):\n\n${item.description}\n\n• Edición especial: Tapa dura en cuero oscuro grabado en oro con broche metálico vintage, 320 páginas con los 22 tratados y guías rituales.`,
          shopItem: item,
          quickReplies: ["Comprar Libro por WhatsApp", "Tapiz de Altar", "Ver catálogo de la tienda"],
        };
      }

      if (q.includes("envio") || q.includes("entrega") || q.includes("pais") || q.includes("mexico")) {
        return {
          response: "✦ Envíos de la Boutique ARCANO:\n\n• Realizamos envíos seguros a toda la República Mexicana (3 a 5 días hábiles) con empaque ceremonial protegido por sellos de lacre.\n• Envíos internacionales disponibles bajo cotización previa.\n• Para pedidos inmediatos, puedes contactarnos directamente por WhatsApp.",
          quickReplies: ["Pedir por WhatsApp", "Ver Velas y Sahumerios", "Baraja de Tarot ARCANO"],
        };
      }

      // Catálogo general de la tienda
      return {
        response: `✦ La Boutique Ceremonial de ARCANO cuenta con 5 colecciones consagradas:\n\n1. Velas y sahumerios: Ambientación y purificación vegetal.\n2. Inciensos y resinas: Copal negro, mirra y sándalo ancestral.\n3. Cristales y minerales: Amatista, obsidiana, cuarzo y pirita.\n4. Cartas y oráculos: Baraja ARCANO de 78 cartas con cantos en pan de oro.\n5. Libros y artículos rituales: El Libro de los Símbolos y tapices bordados.\n\nPuedes explorar el catálogo completo en la sección «Tienda» o consultarme por una pieza específica.`,
        quickReplies: [
          "Vela ARCANO RITUALIS",
          "Baraja ARCANO TAROT",
          "Estuche de Cristales",
          "Caja de Resinas Sagradas",
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
          quickReplies: [`Consejo de ${natalArcana.name}`, "Consultar con Malachai", "¿Qué productos tienen en la tienda?"],
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
          quickReplies: [`Consejo en el amor de ${foundArcana.name}`, `Consejo en el trabajo de ${foundArcana.name}`, "¿Consultar con Malachai?"],
        };
      }

      if (q.includes("amor") || q.includes("pareja") || q.includes("relacion")) {
        return {
          response: `✦ ${foundArcana.name} en el Amor y los Vínculos:\n\n${foundArcana.love}\n\nCrecimiento personal: «${foundArcana.personalGrowth}»`,
          arcana: foundArcana,
          quickReplies: [`En el trabajo: ${foundArcana.name}`, `Sombra de ${foundArcana.name}`, "Ver baraja en la tienda"],
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
        quickReplies: ["¿Qué significa La Estrella?", "¿Qué productos hay en la tienda?", "Consultar con Malachai"],
      };
    }

    if (q.includes("malachai") || q.includes("sesion") || q.includes("cita") || q.includes("reserva")) {
      return {
        response: "✦ Malachai es Lector y Custodio de los Símbolos en ARCANO. Brinda sesiones privadas de tarot ceremonial con estricta confidencialidad y rigor ético.\n\nPuedes coordinar una lectura personal vía WhatsApp o explorar las lecturas disponibles en la web.",
        quickReplies: ["Consultar por WhatsApp", "Ver lecturas disponibles", "Ir a la tienda"],
      };
    }

    // Respuesta general
    return {
      response: `✦ En ARCANO, los símbolos custodian respuestas a todas las encrucijadas. Pregúntame sobre cualquier arcano (ej: «El Mago», «La Muerte»), tu fecha de nacimiento o sobre las piezas rituales de nuestra tienda (velas, inciensos, cristales, barajas).`,
      quickReplies: ["Velas y sahumerios", "¿Qué significa El Loco?", "Calcular mi Arcano de Nacimiento", "Baraja ARCANO TAROT"],
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
      const { response, arcana, shopItem, quickReplies } = processQuery(userMsg.text);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response,
        arcanaCard: arcana,
        shopItem: shopItem,
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
      {/* Botón flotante ceremonial: El Sello de ARCANO (arriba del botón de WhatsApp) */}
      <aside
        aria-label="El Sello de ARCANO — Custodio y Tienda"
        className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40 flex items-center gap-3"
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
          aria-label="Abrir asistente de Arcanos y Tienda"
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
          className="fixed bottom-20 sm:bottom-28 right-3 sm:right-6 w-[94vw] sm:w-[420px] h-[520px] max-h-[78vh] rounded-2xl border border-gold/50 bg-[#0d0c15]/98 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(198,160,82,0.25)] flex flex-col z-50 overflow-hidden animate-fadeIn"
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
                    ORÁCULO & TIENDA
                  </span>
                </h3>
                <span className="text-[10px] text-parchment-dim font-sans block">
                  Sabiduría de los Arcanos & Boutique Sagrada
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
                          src={msg.arcanaCard.imageUrl}
                          alt={msg.arcanaCard.name}
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

                  {/* Ficha pequeña de Producto de la Tienda */}
                  {msg.shopItem && (
                    <div className="mt-3 pt-2.5 border-t border-gold/20 flex items-center gap-3 bg-obsidian/70 p-2.5 rounded border border-gold/30">
                      <div className="w-12 h-12 relative rounded overflow-hidden border border-gold/40 flex-shrink-0 bg-black">
                        <img
                          src={msg.shopItem.imageUrl}
                          alt={msg.shopItem.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-serif text-gold-light text-xs block truncate font-medium">
                          {msg.shopItem.name}
                        </span>
                        <span className="text-xs text-parchment font-serif font-medium block">
                          {msg.shopItem.formattedPrice}
                        </span>
                        <a
                          href={getWhatsAppUrl(`Hola ARCANO, deseo comprar: ${msg.shopItem.name} (${msg.shopItem.formattedPrice})`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-gold hover:text-gold-light font-sans font-medium inline-flex items-center gap-1 mt-0.5 underline"
                        >
                          Comprar por WhatsApp →
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
                          if (reply.includes("WhatsApp") || reply.includes("Comprar")) {
                            window.open(getWhatsAppUrl(`Hola ARCANO, tengo una consulta sobre la boutique y los arcanos.`), "_blank");
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

          {/* Enlaces rápidos: Tienda y WhatsApp */}
          <div className="px-4 py-2 bg-[#12101c] border-t border-charcoal-border/50 text-[10px] text-parchment-dim flex items-center justify-between font-sans">
            <a href="/tienda" className="text-parchment-muted hover:text-gold flex items-center gap-1">
              <span>🛍️</span>
              <span>Ir a la Tienda</span>
            </a>
            <span className="text-gold/40">✦</span>
            <a
              href={getWhatsAppUrl("Hola Malachai, deseo consultar sobre una lectura o un producto de ARCANO.")}
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
              placeholder="Pregunta por un arcano, tu fecha o un producto..."
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
