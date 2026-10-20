/**
 * ARCANO — Tipos del Sistema de Inventario & Agente de WhatsApp Business
 */

export interface InventoryCollection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  symbol: string | null;
  target_stock: number;
  current_stock: number;
  created_at?: string;
  updated_at?: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  slug: string;
  collection_id: string;
  price_mxn: number;
  stock_quantity: number;
  reserved_quantity: number;
  available_quantity: number;
  min_stock_alert: number;
  is_active: boolean;
  tagline: string | null;
  stone_type: string | null;
  image_url: string | null;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export type MovementType =
  | 'initial_seed'
  | 'restock'
  | 'reservation_hold'
  | 'reservation_release'
  | 'sale'
  | 'audit_adjustment'
  | 'damaged';

export interface InventoryMovement {
  id: string;
  item_id: string;
  movement_type: MovementType;
  quantity_delta: number;
  previous_stock: number;
  new_stock: number;
  reference_id?: string | null;
  notes?: string | null;
  performed_by?: string | null;
  created_at: string;
}

/**
 * Formato ultraligero y optimizado para LLMs y Agentes de WhatsApp Business (Tool Calling)
 */
export interface WhatsAppAgentProductSummary {
  sku: string;
  id: string;
  name: string;
  collection: string;
  price_mxn: number;
  price_formatted: string;
  available_stock: number;
  in_stock: boolean;
  tagline: string;
  stone_type: string;
  image_url: string;
  purchase_link: string;
}

export interface WhatsAppAgentCatalogResponse {
  total_collections: number;
  total_items: number;
  target_stock_per_collection: number;
  collections: {
    id: string;
    name: string;
    symbol: string;
    stock: number;
    total_pieces: number;
  }[];
  items: WhatsAppAgentProductSummary[];
}
