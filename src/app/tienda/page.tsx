"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  shopCategories,
  shopProducts,
  ShopProduct,
} from "@/data/shop";
import { getWhatsAppUrl } from "@/config/brandConfig";
import { CreativeProcessGallery } from "@/components/shop/CreativeProcessGallery";
import { useCart } from "@/context/CartContext";
import { useLanguage, LanguageToggle } from "@/context/LanguageContext";
import { EpicMineralVeinSelector } from "@/components/shop/EpicMineralVeinSelector";

// Formateador estilo Aurum Brothers: $X,XXX.00 MXN
function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} MXN`;
}

// Estructura de Espécimen en Bruto estilo Aurum Brothers ("SHOP BY STONE")
interface RawStoneShowcase {
  id: string; // Para filtro de productos
  titleEn: string; // Título exacto en inglés (Sodalite, Tiger Eye, etc.)
  nameEs: string; // Nombre en español
  vibe: string; // Atributo metafísico/vibracional
  image: string; // Fotografía en bruto con reflejo sobre negro
  accentColor: string; // Tonalidad de acento sutil
  itemCount: number; // Cantidad de piezas en la boutique
}

// 1. Sendero Superior (Izquierda a Derecha) · Minerales Clásicos de Cabecera
const STONES_UPPER_TRAIL: RawStoneShowcase[] = [
  {
    id: "Lapislázuli",
    titleEn: "Lapis Lazuli",
    nameEs: "Lapislázuli Real",
    vibe: "Soberanía & Sabiduría",
    image: "/images/shop/stones/lapis_lazuli_raw.jpg",
    accentColor: "#1D4ED8",
    itemCount: 6,
  },
  {
    id: "Ojo de Tigre",
    titleEn: "Tiger Eye",
    nameEs: "Ojo de Tigre Imperial",
    vibe: "Coraje & Confianza",
    image: "/images/shop/stones/tiger_eye_raw.jpg",
    accentColor: "#D97706",
    itemCount: 29,
  },
  {
    id: "Cornalina",
    titleEn: "Carnelian",
    nameEs: "Cornalina Ámbar",
    vibe: "Fuego Vital & Pasión",
    image: "/images/shop/stones/carnelian_raw.jpg",
    accentColor: "#DC2626",
    itemCount: 6,
  },
  {
    id: "Amatista",
    titleEn: "Amethyst",
    nameEs: "Amatista Púrpura",
    vibe: "Transmutación Espiritual",
    image: "/images/shop/stones/amethyst_raw.jpg",
    accentColor: "#8B5CF6",
    itemCount: 8,
  },
  {
    id: "Turmalina",
    titleEn: "Tourmaline",
    nameEs: "Turmalina Negra",
    vibe: "Escudo Áurico Puro",
    image: "/images/shop/stones/tourmaline_raw.jpg",
    accentColor: "#52525B",
    itemCount: 6,
  },
  {
    id: "Aguamarina",
    titleEn: "Aquamarine",
    nameEs: "Aguamarina Sagrada",
    vibe: "Serenidad & Flujo",
    image: "/images/shop/stones/aquamarine_raw.jpg",
    accentColor: "#06B6D4",
    itemCount: 2,
  },
];

// 2. Sendero Inferior tras el Rebote Geológico (Derecha a Izquierda) · Minerales Raros & Menos Comunes
const STONES_LOWER_TRAIL: RawStoneShowcase[] = [
  {
    id: "Piedra Luna",
    titleEn: "Rainbow Moonstone",
    nameEs: "Piedra Luna Arcoíris",
    vibe: "Intuición & Misterio",
    image: "/images/shop/stones/moonstone_raw.jpg",
    accentColor: "#93C5FD",
    itemCount: 2,
  },
  {
    id: "Turquesa",
    titleEn: "Natural Turquoise",
    nameEs: "Turquesa en Matriz",
    vibe: "Salto de Fe & Protección",
    image: "/images/shop/stones/turquoise_raw.jpg",
    accentColor: "#06B6D4",
    itemCount: 2,
  },
  {
    id: "Pirita",
    titleEn: "Golden Pyrite",
    nameEs: "Pirita Cúbica Dorada",
    vibe: "Magnetismo & Fuego Creador",
    image: "/images/shop/stones/pyrite_raw.jpg",
    accentColor: "#EAB308",
    itemCount: 4,
  },
  {
    id: "Rodocrosita",
    titleEn: "Inca Rhodochrosite",
    nameEs: "Rodocrosita Rosa Inca",
    vibe: "Amor Consciente & Gracia",
    image: "/images/shop/stones/rhodochrosite_raw.jpg",
    accentColor: "#F43F5E",
    itemCount: 2,
  },
  {
    id: "Cuarzo Ahumado",
    titleEn: "Smoky Quartz",
    nameEs: "Cuarzo Ahumado",
    vibe: "Luz Interior & Enraizamiento",
    image: "/images/shop/stones/smoky_quartz_raw.jpg",
    accentColor: "#78716C",
    itemCount: 3,
  },
  {
    id: "Citrino",
    titleEn: "Golden Citrine",
    nameEs: "Citrino Dorado Solar",
    vibe: "Vitalidad & Éxito Tangible",
    image: "/images/shop/stones/citrine_raw.jpg",
    accentColor: "#F59E0B",
    itemCount: 2,
  },
];

// 3. Otros Minerales y Resinas Sagradas del Santuario
const STONES_REMAINING: RawStoneShowcase[] = [
  {
    id: "Malaquita",
    titleEn: "Malachite",
    nameEs: "Malaquita & Jade",
    vibe: "Sanación del Corazón",
    image: "/images/shop/stones/malachite_raw.jpg",
    accentColor: "#059669",
    itemCount: 8,
  },
  {
    id: "Obsidiana",
    titleEn: "Obsidian",
    nameEs: "Obsidiana Sagrada",
    vibe: "Protección Telúrica",
    image: "/images/shop/stones/obsidian_raw.jpg",
    accentColor: "#EAB308",
    itemCount: 12,
  },
  {
    id: "Labradorita",
    titleEn: "Labradorite",
    nameEs: "Labradorita Espectral",
    vibe: "Magia & Alquimia",
    image: "/images/shop/stones/labradorite_raw.jpg",
    accentColor: "#0284C7",
    itemCount: 3,
  },
  {
    id: "Ámbar",
    titleEn: "Chiapas Amber",
    nameEs: "Ámbar de Simojovel",
    vibe: "Luz Solar Fósil",
    image: "/images/shop/stones/amber_raw.jpg",
    accentColor: "#F59E0B",
    itemCount: 31,
  },
  {
    id: "Ónix",
    titleEn: "Black Onyx",
    nameEs: "Ónix Negro & Lava",
    vibe: "Fuerza & Enraizamiento",
    image: "/images/shop/stones/onyx_raw.jpg",
    accentColor: "#71717A",
    itemCount: 13,
  },
  {
    id: "Sodalita",
    titleEn: "Sodalite",
    nameEs: "Sodalita Azul",
    vibe: "Visión & Intuición",
    image: "/images/shop/stones/sodalite_raw.jpg",
    accentColor: "#3B82F6",
    itemCount: 5,
  },
];

const AURUM_STONES_SHOWCASE: RawStoneShowcase[] = [
  ...STONES_UPPER_TRAIL,
  ...STONES_LOWER_TRAIL,
  ...STONES_REMAINING,
];

// Colecciones visuales ("LATEST COLLECTIONS" estilo Aurum Brothers)
const FEATURED_COLLECTIONS = [
  {
    id: "coleccion-arcanos",
    name: "Arcanos Mayores",
    image: "/images/shop/pulseras/brazalete-arcano-i-el-mago-onix-lapislazuli.jpg",
    stoneFilter: "todos",
    catFilter: "coleccion-arcanos",
  },
  {
    id: "onix-lava",
    name: "Ónix & Lava Volcánica",
    image: "/images/shop/pulseras_arcanos/pulsera_02.jpeg",
    stoneFilter: "Ónix",
    catFilter: "todos",
  },
  {
    id: "ojo-de-tigre",
    name: "Ojo de Tigre & Halcón",
    image: "https://cdn.shopify.com/s/files/1/0238/9055/9056/files/Frontal.webp?v=1785859032",
    stoneFilter: "Ojo de Tigre",
    catFilter: "todos",
  },
  {
    id: "oro-18k",
    name: "Oro 18K & Gemas",
    image: "https://quetzam.mx/cdn/shop/products/1_9564c0c5-cb5f-46eb-bc8a-e48219bd084d.jpg?v=1772558204&width=800",
    stoneFilter: "todos",
    catFilter: "alta-joyeria-oro",
  },
  {
    id: "lapislazuli",
    name: "Lapislázuli & Pirita",
    image: "/images/shop/pulseras/brazalete-arcano-i-el-mago-onix-lapislazuli-lifestyle.jpg",
    stoneFilter: "Lapislázuli",
    catFilter: "todos",
  },
  {
    id: "ambar-chiapas",
    name: "Ámbar de Chiapas",
    image: "/images/shop/pulseras/pulsera-ambar-chiapas-caricias-maternales.jpg",
    stoneFilter: "Ámbar",
    catFilter: "ambar-chiapas",
  },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [selectedStone, setSelectedStone] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProduct, setActiveProduct] = useState<ShopProduct | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  // Opciones de configuración de brazalete estilo Aurum Brothers
  const [selectedWristSize, setSelectedWristSize] = useState<string>("M");
  const [modalTab, setModalTab] = useState<"detalles" | "mineral" | "ritual">("detalles");
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  // Escuchar parámetro ?stone=... en la URL para auto-filtrar al venir desde el Menú de la Galería
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const stoneParam = params.get("stone");
      if (stoneParam) {
        setSelectedStone(stoneParam);
        setSelectedCategory("todos");
        setTimeout(() => {
          document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" });
        }, 250);
      }
    }
  }, []);


  const { addItem, openCart, totalCount } = useCart();
  const { language, setLanguage, t } = useLanguage();

  // Control de scroll y tecla Escape para el modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProduct(null);
      }
    };
    if (activeProduct) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setModalTab("detalles");
      setSelectedWristSize("M");
      setActiveModalImage(activeProduct.imageUrl);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeProduct]);

  // Wishlist toggle
  const toggleWishlist = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtrado reactivo de productos (Categoría + Piedra + Búsqueda)
  const filteredProducts = useMemo(() => {
    return shopProducts.filter((product) => {
      // 1. Filtro de Categoría
      const matchesCategory =
        selectedCategory === "todos" ||
        (selectedCategory === "doble-perforacion" &&
          (product.isDoublePerforation === true || product.categoryId === "doble-perforacion")) ||
        (selectedCategory === "alta-joyeria-oro" &&
          (product.categoryId === "alta-joyeria-oro" ||
            product.goldSpecifications !== undefined ||
            product.theme === "alta-joyeria-oro")) ||
        product.categoryId === selectedCategory ||
        product.theme === selectedCategory;

      // 2. Filtro de Piedra estilo Aurum Brothers
      let matchesStone = true;
      if (selectedStone !== "todos") {
        const queryStone = selectedStone.toLowerCase();
        const prodName = product.name.toLowerCase();
        const prodDesc = product.description.toLowerCase();
        const prodStone = (product.stoneType || "").toLowerCase();
        const prodTag = product.tagline.toLowerCase();

        if (queryStone.includes("ónix") || queryStone.includes("onix")) {
          matchesStone =
            prodStone.includes("ónix") ||
            prodStone.includes("onix") ||
            prodStone.includes("lava") ||
            prodName.includes("ónix") ||
            prodName.includes("onix") ||
            prodName.includes("lava");
        } else if (queryStone.includes("tigre")) {
          matchesStone =
            prodStone.includes("tigre") ||
            prodStone.includes("halcón") ||
            prodName.includes("tigre") ||
            prodName.includes("halcón") ||
            prodTag.includes("tigre");
        } else if (queryStone.includes("ámbar") || queryStone.includes("ambar")) {
          matchesStone =
            product.categoryId === "ambar-chiapas" ||
            prodStone.includes("ámbar") ||
            prodStone.includes("ambar") ||
            prodName.includes("ámbar") ||
            prodName.includes("ambar") ||
            prodDesc.includes("ámbar") ||
            prodDesc.includes("ambar");
        } else if (queryStone.includes("lapis")) {
          matchesStone =
            prodStone.includes("lapis") ||
            prodName.includes("lapis") ||
            prodDesc.includes("lapis");
        } else if (queryStone.includes("obsidiana")) {
          matchesStone =
            prodStone.includes("obsidiana") ||
            prodName.includes("obsidiana") ||
            prodDesc.includes("obsidiana");
        } else if (queryStone.includes("malaquita")) {
          matchesStone =
            prodStone.includes("malaquita") ||
            prodName.includes("malaquita") ||
            prodDesc.includes("malaquita");
        } else if (queryStone.includes("labradorita")) {
          matchesStone =
            prodStone.includes("labradorita") ||
            prodName.includes("labradorita") ||
            prodDesc.includes("labradorita");
        } else if (queryStone.includes("amatista")) {
          matchesStone =
            prodStone.includes("amatista") ||
            prodName.includes("amatista") ||
            prodDesc.includes("amatista");
        } else if (queryStone.includes("turmalina")) {
          matchesStone =
            prodStone.includes("turmalina") ||
            prodName.includes("turmalina") ||
            prodDesc.includes("turmalina");
        } else if (queryStone.includes("cornalina")) {
          matchesStone =
            prodStone.includes("cornalina") ||
            prodName.includes("cornalina") ||
            prodDesc.includes("cornalina");
        } else if (queryStone.includes("aguamarina")) {
          matchesStone =
            prodStone.includes("aguamarina") ||
            prodName.includes("aguamarina") ||
            prodDesc.includes("aguamarina");
        } else if (queryStone.includes("sodalita")) {
          matchesStone =
            prodStone.includes("sodalita") ||
            prodName.includes("sodalita") ||
            prodDesc.includes("sodalita");
        } else if (queryStone.includes("luna")) {
          matchesStone =
            prodStone.includes("luna") ||
            prodName.includes("luna") ||
            prodDesc.includes("luna") ||
            prodDesc.includes("moonstone");
        } else if (queryStone.includes("turquesa")) {
          matchesStone =
            prodStone.includes("turquesa") ||
            prodName.includes("turquesa") ||
            prodDesc.includes("turquesa") ||
            prodDesc.includes("turquoise");
        } else if (queryStone.includes("pirita")) {
          matchesStone =
            prodStone.includes("pirita") ||
            prodName.includes("pirita") ||
            prodDesc.includes("pirita") ||
            prodDesc.includes("pyrite");
        } else if (queryStone.includes("rodocrosita")) {
          matchesStone =
            prodStone.includes("rodocrosita") ||
            prodName.includes("rodocrosita") ||
            prodDesc.includes("rodocrosita") ||
            prodDesc.includes("rhodochrosite");
        } else if (queryStone.includes("ahumado")) {
          matchesStone =
            prodStone.includes("ahumado") ||
            prodName.includes("ahumado") ||
            prodDesc.includes("ahumado") ||
            prodDesc.includes("smoky");
        } else if (queryStone.includes("citrino")) {
          matchesStone =
            prodStone.includes("citrino") ||
            prodName.includes("citrino") ||
            prodDesc.includes("citrino") ||
            prodDesc.includes("citrine");
        } else if (queryStone.includes("fluorita")) {
          matchesStone =
            prodStone.includes("fluorita") ||
            prodName.includes("fluorita") ||
            prodDesc.includes("fluorita") ||
            prodTag.includes("fluorita");
        } else if (queryStone.includes("rutilado")) {
          matchesStone =
            prodStone.includes("rutilado") ||
            prodName.includes("rutilado") ||
            prodDesc.includes("rutilado") ||
            prodStone.includes("pirita");
        } else if (queryStone.includes("lava")) {
          matchesStone =
            prodStone.includes("lava") ||
            prodStone.includes("volcánica") ||
            prodStone.includes("volcanica") ||
            prodName.includes("lava") ||
            prodDesc.includes("lava");
        } else if (queryStone.includes("amazonita")) {
          matchesStone =
            prodStone.includes("amazonita") ||
            prodName.includes("amazonita") ||
            prodDesc.includes("amazonita");
        } else if (queryStone.includes("granate") || queryStone.includes("buey")) {
          matchesStone =
            prodStone.includes("granate") ||
            prodStone.includes("buey") ||
            prodName.includes("granate") ||
            prodName.includes("buey") ||
            prodDesc.includes("granate") ||
            prodDesc.includes("buey");
        } else if (queryStone.includes("selenita")) {
          matchesStone =
            prodStone.includes("selenita") ||
            prodStone.includes("luna") ||
            prodName.includes("selenita") ||
            prodDesc.includes("selenita");
        } else if (queryStone.includes("nefrita") || queryStone.includes("jade")) {
          matchesStone =
            prodStone.includes("jade") ||
            prodStone.includes("nefrita") ||
            prodName.includes("jade") ||
            prodDesc.includes("jade");
        } else {
          matchesStone =
            prodStone.includes(queryStone) ||
            prodName.includes(queryStone) ||
            prodDesc.includes(queryStone) ||
            prodTag.includes(queryStone);
        }
      }

      // 3. Filtro de búsqueda rápida
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.categoryName.toLowerCase().includes(query) ||
        product.tagline.toLowerCase().includes(query) ||
        (product.stoneType && product.stoneType.toLowerCase().includes(query)) ||
        product.description.toLowerCase().includes(query);

      return matchesCategory && matchesStone && matchesSearch;
    }).sort((a, b) => {
      // Priorizar brazaletes y talismanes minerales al frente estilo Aurum Brothers
      const isBraceletA =
        a.categoryId === "talismanes" ||
        a.categoryId === "coleccion-arcanos" ||
        a.categoryId === "ambar-chiapas" ||
        a.categoryId === "alta-joyeria-oro" ||
        a.categoryId === "duos" ||
        a.id.startsWith("aurum-") ||
        a.id.startsWith("arcano-") ||
        a.id.startsWith("talisman-arcano-");
      const isBraceletB =
        b.categoryId === "talismanes" ||
        b.categoryId === "coleccion-arcanos" ||
        b.categoryId === "ambar-chiapas" ||
        b.categoryId === "alta-joyeria-oro" ||
        b.categoryId === "duos" ||
        b.id.startsWith("aurum-") ||
        b.id.startsWith("arcano-") ||
        b.id.startsWith("talisman-arcano-");

      if (isBraceletA && !isBraceletB) return -1;
      if (!isBraceletA && isBraceletB) return 1;

      // Si ambos son brazaletes, priorizar los destacados y las piezas insignia
      if (isBraceletA && isBraceletB) {
        // El Mago (Pieza Insignia de Apertura) va en la posición de honor absoluta #1
        if (a.id === "talisman-arcano-i-el-mago-onix-lapislazuli") return -1;
        if (b.id === "talisman-arcano-i-el-mago-onix-lapislazuli") return 1;

        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        if (a.categoryId === "coleccion-arcanos" && b.categoryId !== "coleccion-arcanos") return -1;
        if (a.categoryId !== "coleccion-arcanos" && b.categoryId === "coleccion-arcanos") return 1;
        // Priorizar las nuevas piezas de piedras comunes al inicio de los destacados
        if (a.id.startsWith("arcano-") && !b.id.startsWith("arcano-")) return -1;
        if (!a.id.startsWith("arcano-") && b.id.startsWith("arcano-")) return 1;
      }
      return 0;
    });
  }, [selectedCategory, selectedStone, searchQuery]);

  const handleAddToCart = (
    product: ShopProduct,
    e?: React.MouseEvent,
    options?: { optionKey?: string; optionLabel?: string; price?: number },
    autoOpen: boolean = false
  ) => {
    if (e) e.stopPropagation();
    addItem(product, options);
    setAddedProductId(product.id);
    if (autoOpen) {
      setTimeout(() => openCart(), 200);
    }
    setTimeout(() => setAddedProductId(null), 1800);
  };

  const getProductWhatsAppMessage = (product: ShopProduct) => {
    const sizeCm =
      selectedWristSize === "S"
        ? "16-17 cm"
        : selectedWristSize === "M"
        ? "18-19 cm"
        : selectedWristSize === "L"
        ? "20-21 cm"
        : "22 cm";
    const sizeNote = ` (Talla Muñeca: ${selectedWristSize} [${sizeCm}])`;
    if (product.categoryId === "ambar-chiapas") {
      return `Hola ARCANO Concierge, deseo ordenar el brazalete "${product.name}"${sizeNote} (${formatPrice(product.price)} ${product.shippingNote}). ¿Sigue disponible para despacho prioritario?`;
    }
    if (product.categoryId === "alta-joyeria-oro" || product.goldSpecifications) {
      return `Hola ARCANO Concierge, deseo ordenar la joya de alta orfebrería "${product.name}"${sizeNote} (${formatPrice(product.price)} ${product.shippingNote}). ¿Tienen disponibilidad inmediata?`;
    }
    return `Hola ARCANO Concierge, deseo ordenar la pieza ritual "${product.name}"${sizeNote} (${formatPrice(product.price)} ${product.shippingNote}).`;
  };

  return (
    <div className="bg-[#000000] text-[#FFFFFF] min-h-screen font-sans selection:bg-[#C5A059]/30 selection:text-[#F3EFE6] w-full max-w-full overflow-x-clip">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP ANNOUNCEMENT BAR (ESTILO AURUM BROTHERS)
         ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#0D0D0D] text-neutral-300 py-2 px-4 border-b border-neutral-900 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-light">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="hidden md:flex items-center gap-3 text-[#C5A059]">
            <span className="text-xs">✦</span>
            <span>{t("BOUTIQUE ESOTÉRICA DE ALTA JOYERÍA", "SACRED FINE JEWELRY BOUTIQUE")}</span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-3 sm:gap-6 text-center text-neutral-200">
            <span>{t("ENVÍO EXPRESS GRATIS SOBRE $1,480 MXN", "FREE EXPRESS SHIPPING OVER $1,480 MXN")}</span>
            <span className="opacity-30">·</span>
            <span>{t("MINERALES 100% PUROS SIN METALES", "100% PURE MINERALS · ZERO METALS")}</span>
            <span className="opacity-30 hidden sm:inline">·</span>
            <span className="hidden sm:inline">{t("CONSAGRACIÓN EN LUNA LLENA & FUEGO", "FULL MOON & SACRED FIRE CONSECRATED")}</span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle size="sm" />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. HEADER PRINCIPAL · NAVEGACIÓN LIMPIA Y ELEGANTE
         ───────────────────────────────────────────────────────────── */}
      <header className="border-b border-neutral-900 bg-black/95 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo ARCANO estilo Aurum Brothers */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="text-xl sm:text-2xl text-[#C5A059] group-hover:scale-105 transition-transform">
                ✦
              </span>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-2xl tracking-[0.3em] font-light text-white group-hover:text-[#C5A059] transition-colors uppercase">
                  ARCANO
                </span>
                <span className="text-[8px] tracking-[0.35em] text-neutral-400 uppercase font-sans -mt-1 hidden sm:block">
                  HANDMADE FINE JEWELRY
                </span>
              </div>
            </Link>
          </div>

          {/* Navegación Central (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase font-light text-neutral-300">
            <button
              onClick={() => {
                setSelectedCategory("todos");
                setSelectedStone("todos");
                document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Novedades
            </button>
            <button
              onClick={() => {
                setSelectedCategory("talismanes");
                setSelectedStone("todos");
                document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Brazaletes
            </button>
            <button
              onClick={() => {
                setSelectedCategory("ambar-chiapas");
                setSelectedStone("Ámbar");
                document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Ámbar de Chiapas
            </button>
            <button
              onClick={() => {
                setSelectedCategory("alta-joyeria-oro");
                setSelectedStone("todos");
                document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Oro 18K
            </button>
            <button
              onClick={() => {
                setSelectedCategory("duos");
                setSelectedStone("todos");
                document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Stacks & Dúos
            </button>
            <a
              href="#the-art-of-stacking"
              className="text-[#C5A059] hover:brightness-110 transition-colors"
            >
              Stacking Guide
            </a>
          </nav>

          {/* Iconos de Acción Derecha */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* WhatsApp Concierge */}
            <a
              href={getWhatsAppUrl("Hola ARCANO Concierge, deseo asesoría personalizada para elegir un brazalete mineral.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-neutral-400 hover:text-[#25D366] transition-colors py-1.5 px-3 border border-neutral-800 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              <span>Concierge</span>
            </a>

            {/* Selector de Idioma */}
            <div className="hidden sm:block">
              <LanguageToggle size="sm" />
            </div>

            {/* Carrito / Bolsa Aurum */}
            <button
              onClick={openCart}
              className="flex items-center gap-2.5 py-2 px-3.5 sm:px-4 bg-[#111111] hover:bg-[#1a1a1a] border border-neutral-800 rounded-full text-xs font-sans tracking-widest uppercase text-white transition-all cursor-pointer"
              aria-label="Abrir Bolsa de Compra"
            >
              <svg className="w-4 h-4 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Bolsa</span>
              <span className="w-5 h-5 rounded-full bg-[#C5A059] text-black text-[10px] font-bold flex items-center justify-center">
                {totalCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          3. HERO PRINCIPAL: VETA GEOLÓGICA & COMPRA POR MINERAL
             (FONDO NÍTIDO, DESTELLOS CRISTALINOS & TIPOGRAFÍA DE LUJO)
         ───────────────────────────────────────────────────────────── */}
      {/* ─────────────────────────────────────────────────────────────
          3. HERO PRINCIPAL: VETA GEOLÓGICA EN ZIGZAG CON REBOTE
             (FONDO NÍTIDO, DESTELLOS CRISTALINOS & MINERALES RAROS)
         ───────────────────────────────────────────────────────────── */}
      <EpicMineralVeinSelector
        selectedStone={selectedStone}
        onSelectStone={(stoneId) => {
          setSelectedStone(stoneId);
          setSelectedCategory("todos");
        }}
        language={language}
        t={t}
        filteredCount={filteredProducts.length}
      />

      {/* Barra de Confianza & Compromisos Sagrados en Tipografía Fina */}
      <div className="bg-[#0A0A0A] border-b border-neutral-900 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-4 text-center text-xs text-neutral-300 font-serif">
          <div className="flex items-center gap-2">
            <span className="text-[#C5A059] text-xs">✦</span>
            <span className="tracking-wider">{t("Minerales 100% Puros Sin Metales (8mm)", "100% Pure Minerals · Zero Metals (8mm)")}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[#C5A059] text-xs">✦</span>
            <span className="tracking-wider">{t("Consagrado en Luna Llena & Hoguera Sagrada", "Consecrated under Full Moon & Sacred Fire")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#C5A059] text-xs">✦</span>
            <span className="tracking-wider">{t("Hecho a Mano a la Medida Exacta de tu Muñeca", "Handcrafted to Your Exact Wrist Size")}</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. SECCIÓN "LATEST COLLECTIONS" (GALERÍA REDONDEADA AURUM)
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-neutral-900">
        <h2 className="text-xl sm:text-2xl font-light tracking-[0.25em] text-white text-center mb-10 uppercase">
          LATEST COLLECTIONS
        </h2>

        {/* Carousel / Grid de Colecciones */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {FEATURED_COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => {
                setSelectedCategory(col.catFilter);
                setSelectedStone(col.stoneFilter);
                document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative aspect-square bg-[#0D0D0D] rounded-xl overflow-hidden cursor-pointer border border-neutral-800/80 hover:border-[#C5A059]/60 transition-all duration-300 shadow-md"
            >
              <Image
                src={col.image}
                alt={col.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover filter brightness-[0.85] contrast-[1.1] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-2.5 text-center">
                <span className="block text-[11px] font-sans font-medium text-white tracking-wider uppercase group-hover:text-[#C5A059] transition-colors">
                  {col.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* ─────────────────────────────────────────────────────────────
          5.1. CATÁLOGO PRINCIPAL & INTEGRACIÓN TOTAL DEL FILTRADO
               (FLOATING CARDS ESTILO AURUM BROTHERS & ARCANO)
         ───────────────────────────────────────────────────────────── */}
      <div id="catalogo-top" className="scroll-mt-24" />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Título Editorial del Catálogo */}
        <div className="text-center mb-8">
          <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.3em] uppercase text-[#C5A059] block mb-2 font-medium">
            {t("ALTA JOYERÍA MINERAL & ORFEBRERÍA SAGRADA", "FINE MINERAL JEWELRY & SACRED CRAFT")}
          </span>
          <h2 className="text-2xl sm:text-4xl font-light tracking-[0.22em] text-white uppercase mb-3">
            {t("CATÁLOGO DE TALISMANES", "TALISMANS CATALOG")}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
            {t(
              "Piezas individuales y colecciones forjadas en minerales puros Grado AAA de 8mm. Consagradas en Luna Llena ante fuego ceremonial sagrado de 1.5 metros.",
              "Individual pieces and sets crafted from 100% pure AAA Grade 8mm minerals. Consecrated under the Full Moon before a 1.5-meter sacred ceremonial fire."
            )}
          </p>
        </div>

        {/* Banner de Estado Activo si hay un Mineral Filtrado */}
        {selectedStone !== "todos" && (
          <div className="mb-8 p-4 sm:p-5 bg-gradient-to-r from-black via-[#111111] to-black border border-[#C5A059] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn shadow-[0_0_30px_rgba(197,160,89,0.2)]">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <span className="w-3 h-3 rounded-full bg-[#C5A059] animate-ping" />
              <div>
                <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A059] block font-medium">
                  {t("FILTRANDO POR VETA MINERAL:", "FILTERING BY MINERAL VEIN:")}
                </span>
                <span className="text-base sm:text-lg font-light text-white tracking-wide">
                  {selectedStone} ·{" "}
                  <span className="text-neutral-300 text-xs sm:text-sm font-light">
                    {filteredProducts.length}{" "}
                    {filteredProducts.length === 1
                      ? t("pieza consagrada encontrada", "consecrated piece found")
                      : t("piezas consagradas encontradas", "consecrated pieces found")}
                  </span>
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedStone("todos");
                setSelectedCategory("todos");
              }}
              className="px-4 py-2 text-xs font-sans tracking-widest uppercase text-black font-semibold bg-[#C5A059] hover:bg-[#d8b368] rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>✕ {t("Mostrar Todo el Catálogo", "Show All Pieces")}</span>
            </button>
          </div>
        )}

        {/* Barra de Filtro de Categorías & Barra de Búsqueda */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-neutral-900 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto scrollbar-none py-1">
            <button
              onClick={() => {
                setSelectedCategory("todos");
                setSelectedStone("todos");
              }}
              className={`px-3 py-1.5 tracking-wider uppercase transition-colors rounded-sm cursor-pointer ${
                selectedCategory === "todos" && selectedStone === "todos"
                  ? "text-[#C5A059] border-b-2 border-[#C5A059] font-medium"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {t("Todos", "All")} ({shopProducts.length})
            </button>
            <button
              onClick={() => {
                setSelectedCategory("coleccion-arcanos");
                setSelectedStone("todos");
              }}
              className={`px-3 py-1.5 tracking-wider uppercase transition-colors rounded-sm cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === "coleccion-arcanos"
                  ? "text-[#C5A059] border-b-2 border-[#C5A059] font-medium"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <span>{t("Colección Arcanos", "Arcana Collection")}</span>
              <span className="text-[#C5A059] text-[10px]">♾️</span>
            </button>
            <button
              onClick={() => {
                setSelectedCategory("ambar-chiapas");
                setSelectedStone("Ámbar");
              }}
              className={`px-3 py-1.5 tracking-wider uppercase transition-colors rounded-sm cursor-pointer ${
                selectedCategory === "ambar-chiapas"
                  ? "text-[#C5A059] border-b-2 border-[#C5A059] font-medium"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {t("Ámbar de Simojovel", "Chiapas Amber")}
            </button>
            <button
              onClick={() => {
                setSelectedCategory("alta-joyeria-oro");
                setSelectedStone("todos");
              }}
              className={`px-3 py-1.5 tracking-wider uppercase transition-colors rounded-sm cursor-pointer ${
                selectedCategory === "alta-joyeria-oro"
                  ? "text-[#C5A059] border-b-2 border-[#C5A059] font-medium"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {t("Alta Joyería Oro 18K", "Fine 18K Gold")}
            </button>
            <button
              onClick={() => {
                setSelectedCategory("talismanes");
                setSelectedStone("todos");
              }}
              className={`px-3 py-1.5 tracking-wider uppercase transition-colors rounded-sm cursor-pointer ${
                selectedCategory === "talismanes"
                  ? "text-[#C5A059] border-b-2 border-[#C5A059] font-medium"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {t("Brazaletes Minerales", "Mineral Talismans")}
            </button>
            <button
              onClick={() => {
                setSelectedCategory("duos");
                setSelectedStone("todos");
              }}
              className={`px-3 py-1.5 tracking-wider uppercase transition-colors rounded-sm cursor-pointer ${
                selectedCategory === "duos"
                  ? "text-[#C5A059] border-b-2 border-[#C5A059] font-medium"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {t("Dúos & Stacks", "Duos & Stacks")}
            </button>
          </div>

          {/* Campo de Búsqueda Rápida */}
          <div className="relative w-full lg:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("Buscar gema, arcano, intención...", "Search stone, arcana, intention...")}
              className="w-full bg-[#0D0D0D] border border-neutral-800 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A059] transition-colors rounded-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2 text-neutral-500 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            GRID DE PRODUCTOS ESTILO AURUM BROTHERS (FLOATING CARDS)
           ───────────────────────────────────────────────────────────── */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center bg-[#0A0A0A] border border-neutral-900 p-8 rounded-2xl">
            <span className="text-3xl block mb-3 text-neutral-500">🔍</span>
            <h3 className="text-lg text-white font-light mb-2">
              {t("No encontramos piezas con ese criterio", "No pieces match your criteria")}
            </h3>
            <p className="text-xs text-neutral-400 mb-6 max-w-md mx-auto">
              {t(
                "Prueba seleccionando otro mineral en la veta geológica o restablece todos los filtros del catálogo.",
                "Try picking another mineral on the geological vein or reset all filters."
              )}
            </p>
            <button
              onClick={() => {
                setSelectedCategory("todos");
                setSelectedStone("todos");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 bg-[#C5A059] text-black text-xs font-sans tracking-widest uppercase font-semibold hover:bg-[#d8b368] rounded-full transition-all cursor-pointer shadow-lg"
            >
              {t("Ver Todo el Catálogo", "Show All Pieces")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-7 gap-y-10 sm:gap-y-12">
            {filteredProducts.map((product) => {
              const isHovered = hoveredCardId === product.id;
              const isAdded = addedProductId === product.id;
              const isWishlisted = Boolean(wishlist[product.id]);
              const hasSecondaryImg = Boolean(
                product.secondaryImageUrl && product.secondaryImageUrl !== product.imageUrl
              );

              return (
                <div
                  key={product.id}
                  onClick={() => setActiveProduct(product)}
                  onMouseEnter={() => setHoveredCardId(product.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className="group flex flex-col cursor-pointer select-none text-left"
                >
                  {/* Contenedor de Imagen de Producto: Fondo Negro de Estudio, Borde Invisible */}
                  <div className="relative aspect-square w-full overflow-hidden bg-[#0A0A0A] rounded-xl border border-neutral-900 group-hover:border-neutral-800 transition-colors">
                    
                    {/* Imagen Primaria */}
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className={`object-cover transition-opacity duration-500 ${
                        hasSecondaryImg && isHovered ? "opacity-0" : "opacity-100"
                      } ${!product.inStock ? "grayscale-[40%] opacity-70" : ""}`}
                    />

                    {/* Imagen Secundaria (Efecto Hover de Muñeca / Lifestyle) */}
                    {hasSecondaryImg && (
                      <Image
                        src={product.secondaryImageUrl!}
                        alt={`${product.name} lifestyle`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className={`object-cover transition-opacity duration-500 absolute inset-0 ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    )}

                    {/* Badges Estilo Aurum Brothers (Top-Left Outlined Pills) */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
                      {product.goldSpecifications && (
                        <span className="px-2 py-0.5 border border-[#C5A059] text-[#C5A059] text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-sans font-medium bg-black/75 backdrop-blur-sm rounded-sm">
                          ORO 18K
                        </span>
                      )}
                      {product.badge && !product.goldSpecifications && (
                        <span className="px-2 py-0.5 border border-[#C5A059]/70 text-[#C5A059] text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-sans font-medium bg-black/75 backdrop-blur-sm rounded-sm">
                          {product.badge.includes("8mm") ? "8MM AAA" : product.badge.toUpperCase()}
                        </span>
                      )}
                      {product.featured && (
                        <span className="px-2 py-0.5 border border-white/60 text-white text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-sans font-medium bg-black/75 backdrop-blur-sm rounded-sm">
                          LIMITED
                        </span>
                      )}
                    </div>

                    {/* Bookmark / Wishlist Icon (Top-Right) */}
                    <button
                      onClick={(e) => toggleWishlist(product.id, e)}
                      className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 flex items-center justify-center transition-colors text-white"
                      aria-label="Guardar en favoritos"
                    >
                      <svg
                        className={`w-3.5 h-3.5 ${isWishlisted ? "text-[#C5A059] fill-[#C5A059]" : "text-white"}`}
                        fill={isWishlisted ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                    </button>

                    {/* Botón "+" en esquina inferior derecha estilo Aurum Brothers */}
                    {product.inStock && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product, undefined, undefined, true);
                        }}
                        className={`absolute bottom-2.5 right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-sans font-bold text-sm transition-all duration-300 rounded-sm cursor-pointer shadow-lg ${
                          isAdded
                            ? "bg-[#27AE60] text-white scale-110"
                            : "bg-[#C5A059] text-black hover:bg-[#d8b368] hover:scale-105"
                        }`}
                        title="Añadir a la bolsa"
                      >
                        {isAdded ? "✓" : "+"}
                      </button>
                    )}

                    {/* Badge de Agotado si aplica */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 pointer-events-none">
                        <span className="px-3 py-1 border border-neutral-500 text-neutral-300 text-[10px] uppercase tracking-[0.25em] font-sans font-medium bg-black/90">
                          SOLD OUT
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Información Centrada de la Pieza (Estilo Aurum Brothers) */}
                  <div className="pt-3 text-center flex flex-col items-center">
                    
                    {/* Intención Arquetípica si tiene */}
                    {product.intentionWords && product.intentionWords.length > 0 && (
                      <span className="text-[8px] sm:text-[9px] font-sans tracking-[0.2em] uppercase text-[#C5A059] mb-0.5 line-clamp-1">
                        {product.intentionWords.join(" · ")}
                      </span>
                    )}

                    {/* Título en tipografía sans-serif limpia */}
                    <h3 className="text-xs sm:text-sm font-normal text-neutral-200 group-hover:text-[#C5A059] transition-colors line-clamp-1 mb-1">
                      {product.name}
                    </h3>

                    {/* Precio Centrado */}
                    <p className="text-xs sm:text-sm text-neutral-400 font-normal mb-1">
                      {formatPrice(product.price)}
                    </p>

                    {/* Reseñas con estrellas doradas Aurum */}
                    <div className="flex items-center justify-center gap-1 text-[11px] text-[#C5A059]">
                      <span>★★★★★</span>
                      <span className="text-neutral-500 text-[10px]">
                        ({12 + (product.price % 37)})
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

  {/* ─────────────────────────────────────────────────────────────
          6. SECCIÓN "THE ART OF STACKING" (ESTILO AURUM BROTHERS)
         ───────────────────────────────────────────────────────────── */}
      <section id="the-art-of-stacking" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-neutral-900 text-center">
        <h2 className="text-2xl sm:text-3xl font-light tracking-[0.25em] text-white uppercase mb-3">
          THE ART OF STACKING
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Diseñados para lucir con distinción individualmente o en capas junto a tu reloj favorito. Descubre cómo combinar texturas minerales y calibres para elevar tu presencia personal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stack 1 */}
          <div
            onClick={() => {
              setSelectedStone("Obsidiana");
              document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group cursor-pointer text-left"
          >
            <div className="relative aspect-[4/5] bg-[#0A0A0A] rounded-sm overflow-hidden mb-4">
              <Image
                src="/images/shop/pulseras_arcanos/pulsera_01.jpeg"
                alt="Stack Escudo Telúrico"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A059] block mb-1">
                  STACK #01 · ESCUDO SAGRADO
                </span>
                <h3 className="text-lg font-light text-white">Obsidiana & Hematita</h3>
              </div>
            </div>
            <p className="text-xs text-neutral-400 font-light leading-relaxed mb-2">
              Protección psíquica, sobriedad y enraizamiento telúrico. Ideal para portar junto a un reloj de acero o carátula negra.
            </p>
            <span className="text-xs text-[#C5A059] tracking-wider uppercase font-medium group-hover:underline">
              Explorar Stack →
            </span>
          </div>

          {/* Stack 2 */}
          <div
            onClick={() => {
              setSelectedStone("Ámbar");
              document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group cursor-pointer text-left"
          >
            <div className="relative aspect-[4/5] bg-[#0A0A0A] rounded-sm overflow-hidden mb-4">
              <Image
                src="/images/shop/pulseras/pulsera-ambar-chiapas-caricias-maternales.jpg"
                alt="Stack Ámbar Solar"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A059] block mb-1">
                  STACK #02 · ORO SOLAR
                </span>
                <h3 className="text-lg font-light text-white">Ámbar Fósil & Ojo de Tigre</h3>
              </div>
            </div>
            <p className="text-xs text-neutral-400 font-light leading-relaxed mb-2">
              Calidez prehistórica de Chiapas, magnetismo personal y abundancia. Acentos solares para proyectar liderazgo.
            </p>
            <span className="text-xs text-[#C5A059] tracking-wider uppercase font-medium group-hover:underline">
              Explorar Stack →
            </span>
          </div>

          {/* Stack 3 */}
          <div
            onClick={() => {
              setSelectedStone("Labradorita");
              document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group cursor-pointer text-left"
          >
            <div className="relative aspect-[4/5] bg-[#0A0A0A] rounded-sm overflow-hidden mb-4">
              <Image
                src="/images/shop/pulseras_arcanos/pulsera_05.jpeg"
                alt="Stack Visión & Éter"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A059] block mb-1">
                  STACK #03 · VISIÓN & ÉTER
                </span>
                <h3 className="text-lg font-light text-white">Labradorita & Lapislázuli</h3>
              </div>
            </div>
            <p className="text-xs text-neutral-400 font-light leading-relaxed mb-2">
              Destellos espectrales de azul pavo real y pirita dorada. Conexión intuitiva y discernimiento oracular.
            </p>
            <span className="text-xs text-[#C5A059] tracking-wider uppercase font-medium group-hover:underline">
              Explorar Stack →
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. PROCESO CREATIVO & MANIFIESTO ARTESANAL
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-neutral-900">
        <CreativeProcessGallery />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. FOOTER CON SELLOS DE CONFIANZA & MÉTODOS DE PAGO (AURUM)
         ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#0A0A0A] border-t border-neutral-900 text-neutral-400 text-xs py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Columna 1: Brand & Craft */}
            <div>
              <span className="font-serif text-lg tracking-[0.25em] text-white block mb-3 uppercase">
                ARCANO
              </span>
              <p className="text-neutral-400 font-light leading-relaxed mb-4">
                Joyería de alta orfebrería mineral ensamblada a mano con gemas naturales Grado AAA, ámbar fósil de Chiapas y acentos forjados en Oro 18K y Plata .925.
              </p>
              <span className="text-[11px] text-[#C5A059] tracking-wider block uppercase">
                Handmade in Mexico & The Netherlands
              </span>
            </div>

            {/* Columna 2: Soporte & Guías */}
            <div>
              <span className="text-xs font-medium tracking-[0.2em] text-white uppercase block mb-3">
                SOPORTE
              </span>
              <ul className="space-y-2 font-light">
                <li>
                  <a
                    href={getWhatsAppUrl("Hola ARCANO, tengo dudas sobre cómo medir mi muñeca para mi brazalete.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Guía de Tallas de Muñeca
                  </a>
                </li>
                <li>
                  <a
                    href={getWhatsAppUrl("Hola ARCANO Concierge, deseo información sobre envíos y garantías.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Envíos Prioritarios & Devoluciones
                  </a>
                </li>
                <li>
                  <a
                    href={getWhatsAppUrl("Hola ARCANO, deseo cotizar una pieza personalizada a mi medida.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Brazaletes a Medida (Concierge)
                  </a>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-white transition-colors">
                    Contacto Directo
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 3: Colecciones */}
            <div>
              <span className="text-xs font-medium tracking-[0.2em] text-white uppercase block mb-3">
                COLECCIONES
              </span>
              <ul className="space-y-2 font-light">
                <li><button onClick={() => { setSelectedCategory("ambar-chiapas"); setSelectedStone("Ámbar"); }} className="hover:text-white text-left">Ámbar de Simojovel, Chiapas</button></li>
                <li><button onClick={() => { setSelectedCategory("talismanes"); setSelectedStone("Obsidiana"); }} className="hover:text-white text-left">Obsidiana Dorada Imperial</button></li>
                <li><button onClick={() => { setSelectedCategory("talismanes"); setSelectedStone("Labradorita"); }} className="hover:text-white text-left">Labradorita Espectral</button></li>
                <li><button onClick={() => { setSelectedCategory("alta-joyeria-oro"); setSelectedStone("todos"); }} className="hover:text-white text-left">Oro 18K & Gemas Sagradas</button></li>
                <li><button onClick={() => { setSelectedCategory("duos"); setSelectedStone("todos"); }} className="hover:text-white text-left">Sets de Dúos Fluviales</button></li>
              </ul>
            </div>

            {/* Columna 4: Newsletter Aurum */}
            <div>
              <span className="text-xs font-medium tracking-[0.2em] text-white uppercase block mb-3">
                STAY IN THE LOOP
              </span>
              <p className="text-neutral-400 font-light leading-relaxed mb-3">
                Nuevas piezas de edición limitada cada mes y acceso prioritario a gemas de cantera.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Tu correo electrónico..."
                  className="bg-[#141414] border border-neutral-800 px-3 py-2 text-xs text-white placeholder-neutral-500 w-full rounded-l-sm focus:outline-none"
                />
                <button
                  onClick={() => alert("¡Gracias por unirte al Círculo Exclusivo ARCANO!")}
                  className="px-4 py-2 bg-[#C5A059] text-black text-xs font-semibold uppercase tracking-wider rounded-r-sm hover:bg-[#d8b368]"
                >
                  OK
                </button>
              </div>
            </div>
          </div>

          {/* Barra Inferior con Métodos de Pago */}
          <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-light">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
              <span>© 2026 ARCANO · All Rights Reserved. Luxury Beaded Bracelets.</span>
              <span className="hidden sm:inline">·</span>
              <span>
                Desarrollado por{" "}
                <a
                  href="https://agenteweb.com.mx/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C5A059] hover:underline underline-offset-2 font-medium"
                >
                  agenteweb.com.mx
                </a>
              </span>
            </div>
            <div className="flex items-center gap-3 text-neutral-400 text-xs">
              <span>Visa</span>
              <span>·</span>
              <span>Mastercard</span>
              <span>·</span>
              <span>AMEX</span>
              <span>·</span>
              <span>Apple Pay</span>
              <span>·</span>
              <span>Mercado Pago</span>
              <span>·</span>
              <span>SPEI</span>
              <span>·</span>
              <span>OXXO</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          9. MODAL DE PRODUCTO (ESTILO AURUM BROTHERS SIZING & SPECS)
         ───────────────────────────────────────────────────────────── */}
      {activeProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn"
          onClick={() => setActiveProduct(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-neutral-800 p-6 sm:p-10 my-auto text-left rounded-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Cerrar */}
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#141414] border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer text-sm"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Columna Izquierda: Imagen y Galería de Ángulos */}
              <div>
                <div className="relative aspect-square w-full bg-[#111111] overflow-hidden rounded-sm">
                  <Image
                    src={activeModalImage || activeProduct.imageUrl}
                    alt={activeProduct.name}
                    fill
                    className="object-cover transition-all duration-300"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />

                  {/* Badges en Modal */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    {activeProduct.goldSpecifications && (
                      <span className="px-2 py-0.5 border border-[#C5A059] bg-black/70 text-[#C5A059] text-[9px] uppercase tracking-widest font-sans font-medium">
                        ORO 18K
                      </span>
                    )}
                    {activeProduct.badge && (
                      <span className="px-2 py-0.5 border border-[#C5A059]/70 bg-black/70 text-[#C5A059] text-[9px] uppercase tracking-widest font-sans font-medium">
                        {activeProduct.badge}
                      </span>
                    )}
                  </div>

                  {!activeProduct.inStock && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-[10px] uppercase tracking-widest font-sans font-medium">
                      SOLD OUT
                    </div>
                  )}
                </div>

                {/* Vistas en Miniatura si existen imágenes secundarias */}
                {activeProduct.images && activeProduct.images.length > 1 && (
                  <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1 scrollbar-none">
                    {activeProduct.images.map((img, i) => {
                      const isSelected = (activeModalImage || activeProduct.imageUrl) === img;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveModalImage(img)}
                          className={`relative w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden bg-[#111111] cursor-pointer transition-all ${
                            isSelected
                              ? "border-2 border-[#C5A059] scale-105"
                              : "border border-neutral-800 opacity-60 hover:opacity-100"
                          }`}
                        >
                          <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Columna Derecha: Selector de Talla, Pestañas y Checkout */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A059] block mb-1">
                    {activeProduct.stoneType || activeProduct.categoryName}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-light text-white tracking-wide mb-2">
                    {activeProduct.name}
                  </h2>

                  {/* Reseñas y Estrellas */}
                  <div className="flex items-center gap-2 mb-3 text-[#C5A059] text-xs">
                    <span>★★★★★</span>
                    <span className="text-neutral-400 text-[11px]">4.9 (48 reseñas verificadas)</span>
                  </div>

                  {/* Palabras de Intención Arquetípica */}
                  {activeProduct.intentionWords && activeProduct.intentionWords.length > 0 && (
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#C5A059] font-medium">
                        Intención:
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {activeProduct.intentionWords.map((word, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#141414] border border-[#C5A059]/40 text-neutral-200 rounded-sm font-sans"
                          >
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Precio */}
                  <div className="mb-6 pb-4 border-b border-neutral-800">
                    <span className="text-2xl sm:text-3xl font-normal text-white">
                      {formatPrice(activeProduct.price)}
                    </span>
                    <span className="text-xs text-neutral-400 block mt-1 font-light">
                      {activeProduct.shippingNote} · Empaque de Colección & Envío Asegurado
                    </span>
                  </div>

                  {/* Selector de Talla de Muñeca (Aurum Sizing Guide) */}
                  <div className="mb-6 p-4 bg-[#111111] border border-neutral-800 rounded-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-sans uppercase tracking-wider text-neutral-200 font-medium">
                        Talla de Muñeca (Circunferencia):
                      </span>
                      <a
                        href={getWhatsAppUrl("Hola ARCANO, tengo dudas sobre cómo medir mi muñeca para mi brazalete.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-sans text-[#C5A059] underline underline-offset-2"
                      >
                        Guía de Tallas
                      </a>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { size: "S", label: "16-17 cm" },
                        { size: "M", label: "18-19 cm" },
                        { size: "L", label: "20-21 cm" },
                        { size: "XL", label: "22 cm" },
                      ].map((t) => (
                        <button
                          key={t.size}
                          onClick={() => setSelectedWristSize(t.size)}
                          className={`py-2 px-1 text-center border rounded-sm transition-all cursor-pointer ${
                            selectedWristSize === t.size
                              ? "bg-white text-black border-white font-bold shadow-md"
                              : "bg-[#161616] text-neutral-300 border-neutral-800 hover:border-neutral-600"
                          }`}
                        >
                          <span className="text-xs block font-bold">{t.size}</span>
                          <span className="text-[9px] block opacity-80">{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pestañas de Información (Detalles / Propiedades / Consagración) */}
                  <div className="flex border-b border-neutral-800 mb-5 gap-6 text-xs sm:text-sm font-sans uppercase tracking-wider">
                    <button
                      onClick={() => setModalTab("detalles")}
                      className={`pb-2.5 transition-colors cursor-pointer ${
                        modalTab === "detalles" ? "border-b-2 border-[#C5A059] text-[#C5A059] font-medium" : "text-neutral-500 hover:text-white"
                      }`}
                    >
                      {activeProduct.arcanoStory ? "Historia" : "Detalles"}
                    </button>
                    <button
                      onClick={() => setModalTab("mineral")}
                      className={`pb-2.5 transition-colors cursor-pointer ${
                        modalTab === "mineral" ? "border-b-2 border-[#C5A059] text-[#C5A059] font-medium" : "text-neutral-500 hover:text-white"
                      }`}
                    >
                      {activeProduct.arcanoStory ? "Minerales" : "Propiedades"}
                    </button>
                    <button
                      onClick={() => setModalTab("ritual")}
                      className={`pb-2.5 transition-colors cursor-pointer ${
                        modalTab === "ritual" ? "border-b-2 border-[#C5A059] text-[#C5A059] font-medium" : "text-neutral-500 hover:text-white"
                      }`}
                    >
                      Consagración
                    </button>
                  </div>

                  {/* Contenido de Pestaña con Tipografía Grande y Clara (Mobile First) */}
                  <div className="min-h-[110px] text-sm sm:text-base font-normal text-neutral-200 leading-relaxed mb-6">
                    {modalTab === "detalles" && (
                      <div className="space-y-3.5">
                        {activeProduct.arcanoStory ? (
                          <div className="space-y-3">
                            <div className="p-3.5 bg-gradient-to-br from-[#141414] to-[#0A0A0A] border border-[#C5A059]/30 rounded-sm">
                              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A059] font-semibold block mb-1">
                                Mito & Viaje del Alma:
                              </span>
                              <p className="text-sm sm:text-base text-neutral-200 font-normal leading-relaxed italic">
                                "{activeProduct.arcanoStory}"
                              </p>
                            </div>
                            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                              {activeProduct.description}
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm sm:text-base text-neutral-200 font-normal leading-relaxed">
                            {activeProduct.description}
                          </p>
                        )}
                        {activeProduct.details && activeProduct.details.length > 0 && !activeProduct.arcanoStory && (
                          <ul className="space-y-2 pt-3 border-t border-neutral-800 text-xs sm:text-sm text-neutral-300">
                            {activeProduct.details.map((d, i) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <span className="text-[#C5A059] mt-0.5 font-bold">✦</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                    {modalTab === "mineral" && (
                      <div className="space-y-3 p-4 bg-[#0D0D0D] border border-neutral-800 rounded-sm">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-neutral-800 pb-2.5">
                          <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#C5A059] font-medium">Gemas 100% Puras:</span>
                          <span className="text-base sm:text-lg font-medium text-white tracking-wide">{activeProduct.stoneType || "Mineral Natural Grado AAA"}</span>
                        </div>
                        <p className="text-sm sm:text-base text-neutral-200 font-normal leading-relaxed">{activeProduct.tagline}</p>
                        {activeProduct.beadMatrix ? (
                          <div className="pt-3 border-t border-neutral-800 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A059]">
                                Matriz Técnica Sagrada · 22 Cuentas
                              </span>
                              <span className="text-[10px] text-neutral-400 font-sans italic">
                                {activeProduct.beadMatrix.archetype}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                              <div className="p-2.5 bg-[#141414] border border-neutral-800 rounded-sm">
                                <span className="text-[9px] block text-neutral-400 uppercase font-sans mb-1 font-medium">
                                  Cuerpo Principal (19 ctas - 8mm)
                                </span>
                                <span className="text-white font-medium block">
                                  {activeProduct.beadMatrix.mainBody.replace(/ \(\d+ ctas - \d+ mm\)/, '')}
                                </span>
                              </div>
                              <div className="p-2.5 bg-[#141414] border border-[#C5A059]/40 rounded-sm">
                                <span className="text-[9px] block text-[#C5A059] uppercase font-sans mb-1 font-medium">
                                  Laterales (2 ctas - 8mm)
                                </span>
                                <span className="text-[#F3EFE6] font-medium block">
                                  {activeProduct.beadMatrix.lateralBeads.replace(/ \(\d+ ctas - \d+ mm\)/, '')}
                                </span>
                              </div>
                              <div className="p-2.5 bg-[#141414] border border-neutral-800 rounded-sm">
                                <span className="text-[9px] block text-neutral-400 uppercase font-sans mb-1 font-medium">
                                  Centro Focal (1 cta - 10mm)
                                </span>
                                <span className="text-white font-medium block">
                                  {activeProduct.beadMatrix.centerPiece.replace(/ \(\d+ cta - \d+ mm\)/, '')}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : activeProduct.details && activeProduct.details.length > 0 ? (
                          <ul className="space-y-2 pt-3 border-t border-neutral-800 text-xs sm:text-sm text-neutral-300">
                            {activeProduct.details.map((d, i) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <span className="text-[#C5A059] mt-0.5 font-bold">✦</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        <p className="text-xs sm:text-sm text-[#C5A059]/90 italic pt-1">
                          ✦ Cada esfera es 100% mineral geológico auténtico, tallado a 8mm y sin añadidos metálicos.
                        </p>
                      </div>
                    )}
                    {modalTab === "ritual" && (
                      <div className="p-4 bg-gradient-to-br from-[#121212] via-[#0D0D0D] to-black border border-[#C5A059]/40 rounded-sm space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base text-[#C5A059]">🔥</span>
                          <span className="text-xs sm:text-sm font-sans uppercase tracking-[0.2em] text-[#C5A059] font-semibold">
                            Rito de Fuego & Luna Llena:
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-neutral-200 font-normal leading-relaxed">
                          {activeProduct.ritualUse || "Consagrado bajo el influjo de la Luna Llena frente a una hoguera sagrada de fuego creador y destructor (1.5 m de alto por 1 m de base). Purificado con resinas vivas para anclar tu intención."}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Botones de Compra */}
                  <div className="space-y-3">
                    {activeProduct.inStock ? (
                      <button
                        onClick={() => {
                          const sizeCm =
                            selectedWristSize === "S"
                              ? "16-17 cm"
                              : selectedWristSize === "M"
                              ? "18-19 cm"
                              : selectedWristSize === "L"
                              ? "20-21 cm"
                              : "22 cm";
                          handleAddToCart(
                            activeProduct,
                            undefined,
                            {
                              optionKey: `talla-${selectedWristSize}`,
                              optionLabel: `Talla ${selectedWristSize} (${sizeCm})`,
                            },
                            true
                          );
                        }}
                        className={`w-full py-4 text-xs font-sans tracking-[0.22em] uppercase transition-all duration-300 font-semibold shadow-lg cursor-pointer flex items-center justify-center gap-2 ${
                          addedProductId === activeProduct.id
                            ? "bg-[#27AE60] text-white"
                            : "bg-[#C5A059] text-black hover:bg-[#d8b368]"
                        }`}
                      >
                        <span>{addedProductId === activeProduct.id ? "¡AÑADIDO A TU BOLSA!" : "AÑADIR A LA BOLSA"}</span>
                        <span>·</span>
                        <span>{formatPrice(activeProduct.price)}</span>
                      </button>
                    ) : (
                      <div className="w-full py-3.5 bg-neutral-800 text-neutral-400 text-xs font-sans tracking-[0.2em] uppercase text-center font-medium">
                        Pieza Agotada
                      </div>
                    )}

                    {/* WhatsApp Checkout Directo con Concierge */}
                    <a
                      href={getWhatsAppUrl(getProductWhatsAppMessage(activeProduct))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-[#111111] border border-[#25D366]/40 text-[#25D366] text-xs font-sans tracking-[0.18em] uppercase font-medium hover:bg-[#25D366]/10 transition-colors flex items-center justify-center gap-2 rounded-sm"
                    >
                      <span>💬 COMPRAR POR WHATSAPP CONCIERGE</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
