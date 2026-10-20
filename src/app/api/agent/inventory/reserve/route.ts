import { NextRequest, NextResponse } from 'next/server';
import { reserveStock, getItemBySkuOrId } from '@/lib/supabase/inventoryService';

export const dynamic = 'force-dynamic';

/**
 * Endpoint de Reserva de Piezas para Agente de WhatsApp Business
 * POST /api/agent/inventory/reserve
 * 
 * Body:
 * {
 *   "sku": "ARC-00",
 *   "quantity": 1,
 *   "customerPhone": "5218121912778",
 *   "customerName": "Nombre Cliente"
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sku, quantity = 1, customerPhone = '', customerName = '' } = body;

    if (!sku) {
      return NextResponse.json(
        { success: false, error: 'SKU o identificador de pieza requerido' },
        { status: 400 }
      );
    }

    const item = await getItemBySkuOrId(sku);
    if (!item) {
      return NextResponse.json(
        { success: false, error: `Pieza con SKU "${sku}" no encontrada` },
        { status: 404 }
      );
    }

    const reservationRef = `WA_${customerPhone.replace(/\D/g, '') || 'CLIENT'}_${Date.now()}`;
    const result = await reserveStock(item.id, Number(quantity) || 1, reservationRef);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'No fue posible apartar la pieza por falta de inventario disponible'
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Pieza "${item.name}" reservada exitosamente para ${customerName || customerPhone || 'cliente'}.`,
        reservation_id: reservationRef,
        sku: item.sku,
        name: item.name,
        price_mxn: item.price_mxn,
        quantity_reserved: Number(quantity) || 1,
        remaining_available: result.remaining_available
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error: any) {
    console.error('[API_AGENT_RESERVE_ERROR]', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error al procesar reserva de inventario' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
