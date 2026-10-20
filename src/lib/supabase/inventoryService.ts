/**
 * ARCANO — Servicio de Inventario y Catálogo en Tiempo Real
 * Soporta Supabase PostgreSQL con fallback automático de alta disponibilidad
 * para Agentes de Inteligencia Artificial & WhatsApp Business Concierge.
 */

import { createClient } from './client';
import type {
  InventoryCollection,
  InventoryItem,
  WhatsAppAgentCatalogResponse,
  WhatsAppAgentProductSummary
} from '@/types/inventory';
import { brandConfig } from '@/config/brandConfig';

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && !url.includes('placeholder') && !key.includes('placeholder'));
}

/**
 * Carga de respaldo local (Snapshot estático) en caso de que Supabase esté inaccesible
 */
async function getLocalSnapshot() {
  try {
    if (typeof window === 'undefined') {
      const fs = await import('fs');
      const path = await import('path');
      const snapshotPath = path.join(process.cwd(), 'public', 'agent-inventory-snapshot.json');
      if (fs.existsSync(snapshotPath)) {
        return JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
      }
    } else {
      const res = await fetch('/agent-inventory-snapshot.json');
      if (res.ok) return await res.json();
    }
  } catch (err) {
    console.warn('[INVENTORY] Advertencia al leer snapshot local:', err);
  }
  return null;
}

/**
 * Obtener todas las colecciones con su stock agregado
 */
export async function getInventoryCollections(): Promise<InventoryCollection[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('inventory_collections')
        .select('*')
        .order('id', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as InventoryCollection[];
      }
    } catch (err) {
      console.warn('[INVENTORY] Error consultando Supabase, recurriendo a snapshot local:', err);
    }
  }

  const snapshot = await getLocalSnapshot();
  if (snapshot?.collections) {
    return snapshot.collections.map((c: any) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      symbol: c.symbol,
      target_stock: c.targetStock,
      current_stock: c.currentStock,
    }));
  }

  return [];
}

/**
 * Obtener piezas de inventario con filtros para tienda o agente
 */
export async function getInventoryItems(options?: {
  collectionId?: string;
  search?: string;
  inStockOnly?: boolean;
  limit?: number;
}): Promise<InventoryItem[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      let query = supabase
        .from('inventory_items')
        .select('*')
        .eq('is_active', true);

      if (options?.collectionId && options.collectionId !== 'todos') {
        query = query.eq('collection_id', options.collectionId);
      }

      if (options?.inStockOnly) {
        query = query.gt('available_quantity', 0);
      }

      if (options?.search) {
        const term = options.search.trim();
        query = query.or(`name.ilike.%${term}%,sku.ilike.%${term}%,tagline.ilike.%${term}%,stone_type.ilike.%${term}%`);
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query.order('sku', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as InventoryItem[];
      }
    } catch (err) {
      console.warn('[INVENTORY] Fallback a snapshot para getInventoryItems:', err);
    }
  }

  // Fallback a Snapshot local
  const snapshot = await getLocalSnapshot();
  if (snapshot?.items) {
    let items = snapshot.items.map((it: any) => ({
      id: it.id,
      sku: it.sku,
      name: it.name,
      slug: it.slug,
      collection_id: it.collectionId,
      price_mxn: it.priceMxn,
      stock_quantity: it.stockQuantity,
      reserved_quantity: it.reservedQuantity || 0,
      available_quantity: it.availableQuantity,
      min_stock_alert: it.minStockAlert,
      is_active: it.isActive,
      tagline: it.tagline,
      stone_type: it.stoneType,
      image_url: it.imageUrl,
      metadata: it.metadata || {}
    }));

    if (options?.collectionId && options.collectionId !== 'todos') {
      items = items.filter((i: InventoryItem) => i.collection_id === options.collectionId);
    }

    if (options?.inStockOnly) {
      items = items.filter((i: InventoryItem) => i.available_quantity > 0);
    }

    if (options?.search) {
      const q = options.search.toLowerCase();
      items = items.filter(
        (i: InventoryItem) =>
          i.name.toLowerCase().includes(q) ||
          i.sku.toLowerCase().includes(q) ||
          (i.tagline && i.tagline.toLowerCase().includes(q)) ||
          (i.stone_type && i.stone_type.toLowerCase().includes(q))
      );
    }

    if (options?.limit) {
      items = items.slice(0, options.limit);
    }

    return items;
  }

  return [];
}

/**
 * Consulta de una pieza individual por SKU o ID
 */
export async function getItemBySkuOrId(skuOrId: string): Promise<InventoryItem | null> {
  const clean = skuOrId.trim();
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('inventory_items')
        .select('*')
        .or(`id.eq.${clean},sku.eq.${clean}`)
        .maybeSingle();

      if (!error && data) {
        return data as InventoryItem;
      }
    } catch (err) {
      console.warn('[INVENTORY] Error al buscar por SKU/ID:', err);
    }
  }

  const snapshot = await getLocalSnapshot();
  if (snapshot?.items) {
    const found = snapshot.items.find((it: any) => it.id === clean || it.sku.toLowerCase() === clean.toLowerCase());
    if (found) {
      return {
        id: found.id,
        sku: found.sku,
        name: found.name,
        slug: found.slug,
        collection_id: found.collectionId,
        price_mxn: found.priceMxn,
        stock_quantity: found.stockQuantity,
        reserved_quantity: found.reservedQuantity || 0,
        available_quantity: found.availableQuantity,
        min_stock_alert: found.minStockAlert,
        is_active: found.isActive,
        tagline: found.tagline,
        stone_type: found.stoneType,
        image_url: found.imageUrl,
        metadata: {}
      };
    }
  }

  return null;
}

/**
 * Formato especializado para Agente de WhatsApp Business (LLM / Tool Calling)
 */
export async function getAgentCatalog(options?: {
  collectionId?: string;
  search?: string;
  baseUrl?: string;
}): Promise<WhatsAppAgentCatalogResponse> {
  const [collections, items] = await Promise.all([
    getInventoryCollections(),
    getInventoryItems({ collectionId: options?.collectionId, search: options?.search })
  ]);

  const origin = options?.baseUrl || 'https://arcano.lat';

  const formattedItems: WhatsAppAgentProductSummary[] = items.map((it) => {
    const purchaseUrl = `${origin}/tienda?sku=${encodeURIComponent(it.sku)}#${it.id}`;
    return {
      sku: it.sku,
      id: it.id,
      name: it.name,
      collection: it.collection_id,
      price_mxn: it.price_mxn,
      price_formatted: `MXN $${it.price_mxn.toLocaleString('es-MX')}`,
      available_stock: it.available_quantity,
      in_stock: it.available_quantity > 0,
      tagline: it.tagline || '',
      stone_type: it.stone_type || '',
      image_url: it.image_url ? (it.image_url.startsWith('http') ? it.image_url : `${origin}${it.image_url}`) : '',
      purchase_link: purchaseUrl
    };
  });

  return {
    total_collections: collections.length,
    total_items: formattedItems.length,
    target_stock_per_collection: 1000,
    collections: collections.map((c) => ({
      id: c.id,
      name: c.name,
      symbol: c.symbol || '✦',
      stock: c.current_stock,
      total_pieces: items.filter((i) => i.collection_id === c.id).length
    })),
    items: formattedItems
  };
}

/**
 * Reserva atómica de stock (evita sobreventas si varios clientes piden la misma pieza en WhatsApp)
 */
export async function reserveStock(
  itemIdOrSku: string,
  quantity = 1,
  ref = 'WHATSAPP_CONCIERGE'
) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.rpc('rpc_reserve_stock', {
        p_item_id: itemIdOrSku,
        p_quantity: quantity,
        p_reservation_ref: ref
      });
      if (error) throw error;
      return data;
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al reservar stock' };
    }
  }
  return { success: true, warning: 'Supabase offline: reserva en modo simulado', remaining_available: 1000 };
}

/**
 * Confirmación de venta atómica
 */
export async function confirmSale(
  itemIdOrSku: string,
  quantity = 1,
  orderRef = 'WHATSAPP_PAID'
) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.rpc('rpc_confirm_sale', {
        p_item_id: itemIdOrSku,
        p_quantity: quantity,
        p_order_ref: orderRef
      });
      if (error) throw error;
      return data;
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al confirmar venta' };
    }
  }
  return { success: true, warning: 'Supabase offline: venta en modo simulado' };
}
