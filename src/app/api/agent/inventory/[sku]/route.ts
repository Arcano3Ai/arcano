import { NextRequest, NextResponse } from 'next/server';
import { getItemBySkuOrId } from '@/lib/supabase/inventoryService';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Endpoint de Consulta de Pieza Específica para Agente de WhatsApp Business
 * GET /api/agent/inventory/[sku]
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { sku: string } }
) {
  try {
    const sku = params.sku;
    if (!sku) {
      return NextResponse.json({ success: false, error: 'SKU no especificado' }, { status: 400 });
    }

    const item = await getItemBySkuOrId(sku);
    if (!item) {
      return NextResponse.json(
        {
          success: false,
          error: `No se encontró ninguna pieza con el SKU o identificador "${sku}"`
        },
        { status: 404 }
      );
    }

    const origin = req.nextUrl.origin;
    const directLink = `${origin}/tienda?sku=${encodeURIComponent(item.sku)}#${item.id}`;

    return NextResponse.json(
      {
        success: true,
        sku: item.sku,
        id: item.id,
        name: item.name,
        collection_id: item.collection_id,
        price_mxn: item.price_mxn,
        price_formatted: `MXN $${item.price_mxn.toLocaleString('es-MX')}`,
        stock_available: item.available_quantity,
        in_stock: item.available_quantity > 0,
        tagline: item.tagline,
        stone_type: item.stone_type,
        image_url: item.image_url ? (item.image_url.startsWith('http') ? item.image_url : `${origin}${item.image_url}`) : '',
        purchase_link: directLink,
        agent_talking_points: [
          `Pieza consagrada con stock disponible: ${item.available_quantity} unidades.`,
          `Precio oficial: MXN $${item.price_mxn.toLocaleString('es-MX')}. Envíos asegurados a todo México.`,
          item.stone_type ? `Composición mineral: ${item.stone_type}.` : null,
          item.tagline ? `Intención ceremonial: ${item.tagline}` : null
        ].filter(Boolean)
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store, max-age=0'
        }
      }
    );
  } catch (error: any) {
    console.error('[API_AGENT_SKU_ERROR]', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error al consultar pieza' },
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
