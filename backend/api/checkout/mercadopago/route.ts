import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, payer, shippingCost = 0, orderId = `ARC-${Date.now().toString(36).toUpperCase()}` } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 });
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

    // Si hay Access Token de Mercado Pago configurado, crear preferencia oficial
    if (accessToken) {
      const mpItems = items.map((item: any) => ({
        id: item.productId || item.id,
        title: item.name,
        currency_id: "MXN",
        picture_url: item.imageUrl ? (item.imageUrl.startsWith("http") ? item.imageUrl : `${origin}${item.imageUrl}`) : undefined,
        description: `Pieza ritual de alta joyería ARCANO · ${item.categoryName || "Colección Ceremonial"}`,
        category_id: "jewelry",
        quantity: item.quantity,
        unit_price: Number(item.price),
      }));

      // Si hay costo de envío, agregarlo como ítem de servicio
      if (shippingCost > 0) {
        mpItems.push({
          id: "SHIPPING-FEE",
          title: "Envío Asegurado Express a todo México",
          currency_id: "MXN",
          picture_url: `${origin}/icon.svg`,
          description: "Servicio de mensajería asegurada con guía rastreable",
          category_id: "shipping",
          quantity: 1,
          unit_price: Number(shippingCost),
        });
      }

      const preferencePayload = {
        items: mpItems,
        payer: {
          name: payer?.name || "Cliente ARCANO",
          email: payer?.email || "contacto@arcanosolutions.com",
          phone: {
            number: payer?.phone || "8110000000",
          },
          address: payer?.address ? {
            street_name: payer.address.street || "",
            street_number: Number(payer.address.number) || 0,
            zip_code: payer.address.zipCode || "",
          } : undefined,
        },
        back_urls: {
          success: `${origin}/checkout/success?gateway=mercadopago&order_id=${orderId}`,
          pending: `${origin}/checkout/pending?gateway=mercadopago&order_id=${orderId}`,
          failure: `${origin}/checkout/failure?gateway=mercadopago&order_id=${orderId}`,
        },
        auto_return: "approved",
        external_reference: orderId,
        statement_descriptor: "ARCANO*JOYAS",
        payment_methods: {
          installments: 12,
        },
      };

      const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(preferencePayload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error Mercado Pago API:", data);
        return NextResponse.json({ error: data.message || "Error al crear preferencia en Mercado Pago" }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        orderId,
        initPoint: data.init_point,
        sandboxInitPoint: data.sandbox_init_point,
        preferenceId: data.id,
      });
    }

    // Modo Demostración / Sandbox Defensivo si aún no se agregan las llaves de producción
    const totalAmount = items.reduce((sum: number, it: any) => sum + it.price * it.quantity, 0) + shippingCost;
    
    return NextResponse.json({
      success: true,
      isDemo: true,
      orderId,
      totalAmount,
      initPoint: `${origin}/checkout/pending?gateway=mercadopago&order_id=${orderId}&demo=true&amount=${totalAmount}`,
      message: "Preferencia de Mercado Pago simulada (requiere MERCADOPAGO_ACCESS_TOKEN en .env.local para cobro real)",
    });
  } catch (error: any) {
    console.error("Error en route /api/checkout/mercadopago:", error);
    return NextResponse.json({ error: error.message || "Error interno del servidor" }, { status: 500 });
  }
}
