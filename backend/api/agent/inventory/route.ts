import { NextRequest, NextResponse } from 'next/server';
import { getAgentCatalog, getInventoryItems } from '@/lib/supabase/inventoryService';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Endpoint de Alta Velocidad para Agentes de WhatsApp Business & Concierge de IA
 * GET /api/agent/inventory
 * 
 * Parámetros soportados:
 * - collection: ID de la colección (ej. 'coleccion-arcanos', 'alta-joyeria-oro')
 * - q: Búsqueda en lenguaje natural (ej. 'amatista', 'el loco', 'oro', 'sahumerio')
 * - sku: Consulta por SKU exacto (ej. 'ARC-00', 'ORO-01')
 * - in_stock_only: 'true' (por defecto) o 'false'
 * - format: 'agent' (token-efficient para LLMs) o 'full'
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const collection = searchParams.get('collection') || undefined;
    const search = searchParams.get('q') || searchParams.get('sku') || undefined;
    const format = searchParams.get('format') || 'agent';
    const origin = req.nextUrl.origin;

    if (format === 'full') {
      const items = await getInventoryItems({
        collectionId: collection,
        search,
        inStockOnly: searchParams.get('in_stock_only') !== 'false'
      });
      return NextResponse.json(
        {
          success: true,
          count: items.length,
          items
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-store, max-age=0'
          }
        }
      );
    }

    const catalog = await getAgentCatalog({
      collectionId: collection,
      search,
      baseUrl: origin
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Catálogo de inventario para Agente de WhatsApp Business',
        ...catalog
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store, max-age=0'
        }
      }
    );
  } catch (error: any) {
    console.error('[API_AGENT_INVENTORY_ERROR]', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error interno al consultar inventario para agente'
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
