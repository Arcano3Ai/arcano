import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, payer, shippingCost = 0, orderId = `STR-${Date.now().toString(36).toUpperCase()}` } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 });
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (stripeSecretKey) {
      // Construir parámetros para Stripe Checkout Session (API v1)
      const params = new URLSearchParams();
      params.append("mode", "payment");
      params.append("success_url", `${origin}/checkout/success?gateway=stripe&session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`);
      params.append("cancel_url", `${origin}/checkout/failure?gateway=stripe&order_id=${orderId}`);
      params.append("client_reference_id", orderId);

      if (payer?.email) {
        params.append("customer_email", payer.email);
      }

      // Habilitar métodos de pago (Tarjetas, OXXO, Google Pay, Apple Pay)
      params.append("payment_method_types[0]", "card");
      params.append("payment_method_types[1]", "oxxo");
      params.append("payment_method_types[2]", "customer_balance");
      params.append("payment_method_options[customer_balance][funding_type]", "bank_transfer");
      params.append("payment_method_options[customer_balance][bank_transfer][type]", "mx_bank_transfer");

      // Items
      items.forEach((item: any, idx: number) => {
        params.append(`line_items[${idx}][price_data][currency]`, "mxn");
        params.append(`line_items[${idx}][price_data][unit_amount]`, String(Math.round(item.price * 100))); // En centavos
        params.append(`line_items[${idx}][price_data][product_data][name]`, item.name);
        if (item.imageUrl) {
          const fullImg = item.imageUrl.startsWith("http") ? item.imageUrl : `${origin}${item.imageUrl}`;
          params.append(`line_items[${idx}][price_data][product_data][images][0]`, fullImg);
        }
        params.append(`line_items[${idx}][quantity]`, String(item.quantity));
      });

      // Envío si aplica
      if (shippingCost > 0) {
        const nextIdx = items.length;
        params.append(`line_items[${nextIdx}][price_data][currency]`, "mxn");
        params.append(`line_items[${nextIdx}][price_data][unit_amount]`, String(Math.round(shippingCost * 100)));
        params.append(`line_items[${nextIdx}][price_data][product_data][name]`, "Envío Asegurado Express a todo México");
        params.append(`line_items[${nextIdx}][quantity]`, "1");
      }

      const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const session = await response.json();

      if (!response.ok) {
        console.error("Error Stripe API:", session);
        return NextResponse.json({ error: session.error?.message || "Error al crear sesión en Stripe" }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        orderId,
        url: session.url,
        sessionId: session.id,
      });
    }

    // Modo Demostración
    const totalAmount = items.reduce((sum: number, it: any) => sum + it.price * it.quantity, 0) + shippingCost;

    return NextResponse.json({
      success: true,
      isDemo: true,
      orderId,
      totalAmount,
      url: `${origin}/checkout/pending?gateway=stripe&order_id=${orderId}&demo=true&amount=${totalAmount}`,
      message: "Sesión de Stripe simulada (requiere STRIPE_SECRET_KEY en .env.local para cobro real)",
    });
  } catch (error: any) {
    console.error("Error en route /api/checkout/stripe:", error);
    return NextResponse.json({ error: error.message || "Error interno del servidor" }, { status: 500 });
  }
}
