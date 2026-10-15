"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ShopProduct } from "@/data/shop";
import { getWhatsAppUrl } from "@/config/brandConfig";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  categoryName: string;
  optionLabel?: string;
  isDoublePerforation?: boolean;
  hasGoldSpecs?: boolean;
}

export interface AddItemOptions {
  optionKey?: string;
  optionLabel?: string;
  price?: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: ShopProduct, options?: AddItemOptions, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  hasFreeShipping: boolean;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getWhatsAppOrderUrl: () => string;
}

const FREE_SHIPPING_THRESHOLD = 1480; // MXN
const CART_STORAGE_KEY = "arcano_ceremonial_cart_v1";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Carga defensiva inicial desde localStorage en cliente
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // Ignorar errores de parsing
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persistencia automática
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Silencioso en caso de quota excedida
    }
  }, [items, isHydrated]);

  const addItem = (product: ShopProduct, options?: AddItemOptions, quantity = 1) => {
    const itemPrice = options?.price ?? product.price;
    const itemId = options?.optionKey ? `${product.id}-${options.optionKey}` : product.id;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      const newItem: CartItem = {
        id: itemId,
        productId: product.id,
        name: product.name,
        price: itemPrice,
        quantity,
        imageUrl: product.imageUrl,
        categoryName: product.categoryName,
        optionLabel: options?.optionLabel,
        isDoublePerforation: product.isDoublePerforation,
        hasGoldSpecs: product.goldSpecifications !== undefined,
      };
      return [...prev, newItem];
    });

    setIsCartOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Si tiene algún Dúo o el subtotal supera el umbral, aplica envío gratis
  const hasDuoItem = items.some(
    (item) => item.id.includes("duo") || (item.optionLabel && item.optionLabel.toLowerCase().includes("dúo"))
  );
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || hasDuoItem;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const getWhatsAppOrderUrl = () => {
    if (items.length === 0) {
      return getWhatsAppUrl("Hola ARCANO, deseo consultar sobre las piezas de la boutique ceremonial.");
    }

    const itemsSummary = items
      .map((item, idx) => {
        const variant = item.optionLabel ? ` [${item.optionLabel}]` : "";
        const itemLineTotal = item.price * item.quantity;
        return `${idx + 1}. *${item.quantity}x ${item.name}*${variant} — MXN $${itemLineTotal.toLocaleString("es-MX")}`;
      })
      .join("\n");

    const shippingText = hasFreeShipping
      ? "✨ *Envío Express Gratis a todo México incluido*"
      : "📦 *Envío:* Por cotizar a mi código postal";

    const message = `Hola ARCANO, deseo encargar las siguientes piezas ceremoniales de su boutique:

✦ *PEDIDO CONSOLIDADO:*
${itemsSummary}

──────────────
• *Subtotal:* MXN $${subtotal.toLocaleString("es-MX")}
• ${shippingText}
• *TOTAL ESTIMADO:* MXN $${subtotal.toLocaleString("es-MX")}

¿Me confirman la disponibilidad de las piezas para proporcionarles mi dirección completa y realizar el pago? ¡Gracias!`;

    return getWhatsAppUrl(message);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        hasFreeShipping,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen((prev) => !prev),
        getWhatsAppOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
