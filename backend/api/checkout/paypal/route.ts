import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, payer, shippingCost = 0, orderId = `PP-${Date.now().toString(36).toUpperCase()}` } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 });
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (clientId && clientSecret) {
      // 1. Obtener Access Token de PayPal
      const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
      const authRes = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      });
      const authData = await authRes.json();

      if (!authRes.ok) {
        return NextResponse.json({ error: "Error de autenticación con PayPal" }, { status: 500 });
      }

      // 2. Crear Orden v2
      const itemsTotal = items.reduce((sum: number, it: any) => sum + it.price * it.quantity, 0);
      const totalAmount = itemsTotal + shippingCost;

      const orderPayload = {
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: orderId,
            description: "Piezas ceremoniales de alta joyería ARCANO",
            amount: {
              currency_code: "MXN",
              value: totalAmount.toFixed(2),
              breakdown: {
                item_total: { currency_code: "MXN", value: itemsTotal.toFixed(2) },
                shipping: { currency_code: "MXN", value: shippingCost.toFixed(2) },
              },
            },
            items: items.map((it: any) => ({
              name: it.name,
              unit_amount: { currency_code: "MXN", value: Number(it.price).toFixed(2) },
              quantity: String(it.quantity),
              category: "PHYSICAL_GOODS",
            })),
          },
        ],
        application_context: {
          brand_name: "ARCANO — Sabiduría de los Arcanos",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          return_url: `${origin}/checkout/success?gateway=paypal&order_id=${orderId}`,
          cancel_url: `${origin}/checkout/failure?gateway=paypal&order_id=${orderId}`,
        },
      };

      const orderRes = await fetch("https://api-m.paypal.com/v2/checkout/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authData.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const orderData = await orderRes.json();
      const approveLink = orderData.links?.find((l: any) => l.rel === "approve")?.href;

      return NextResponse.json({
        success: true,
        orderId,
        paypalOrderId: orderData.id,
        url: approveLink || `${origin}/checkout/success?gateway=paypal&order_id=${orderId}`,
      });
    }

    // Modo Demostración
    const totalAmount = items.reduce((sum: number, it: any) => sum + it.price * it.quantity, 0) + shippingCost;

    return NextResponse.json({
      success: true,
      isDemo: true,
      orderId,
      totalAmount,
      url: `${origin}/checkout/pending?gateway=paypal&order_id=${orderId}&demo=true&amount=${totalAmount}`,
      message: "Orden de PayPal simulada (requiere PAYPAL_CLIENT_ID y PAYPAL_CLIENT_SECRET en .env.local)",
    });
  } catch (error: any) {
    console.error("Error en route /api/checkout/paypal:", error);
    return NextResponse.json({ error: error.message || "Error interno del servidor" }, { status: 500 });
  }
}
