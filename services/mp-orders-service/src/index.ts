import express, { Request, Response } from "express";
import cors from "cors";
import crypto from "crypto";

const app = express();
const port = process.env.PORT || 8080;

// Configuración de CORS permitiendo dominios autorizados de ARCANO
const allowedOrigins = [
  "https://arcanosolutions.com",
  "https://www.arcanosolutions.com",
  "http://localhost:3000",
  "http://localhost:3001",
];

app.use(
  cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      // Permitir peticiones sin origin (server-to-server o Postman) o si coincide con allowedOrigins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origen no permitido por política CORS de ARCANO"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

interface CartItem {
  title: string;
  unit_price: number;
  quantity: number;
  description?: string;
  picture_url?: string;
}

interface CreateOrderBody {
  cartId?: string;
  orderId?: string;
  buyerEmail?: string;
  buyerName?: string;
  buyerPhone?: string;
  items: CartItem[];
  shippingCost?: number;
}

// Healthcheck
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "mp-orders-service",
    timestamp: new Date().toISOString(),
  });
});

// Endpoint principal: Crear Orden / Preferencia en Mercado Pago
app.post("/create-order", async (req: Request, res: Response) => {
  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      console.error("CRITICAL: MP_ACCESS_TOKEN no está configurado en las variables de entorno.");
      return res.status(500).json({
        error: "Configuración incompleta: falta MP_ACCESS_TOKEN en el servidor.",
      });
    }

    const { cartId, orderId, buyerEmail, buyerName, items, shippingCost = 0 } = req.body as CreateOrderBody;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "El carrito no contiene productos." });
    }

    // 1. Validar montos y calcular total exacto
    const itemsTotal = items.reduce((sum, item) => sum + Number(item.unit_price) * Number(item.quantity), 0);
    const finalTotal = itemsTotal + Number(shippingCost);

    if (finalTotal <= 0) {
      return res.status(400).json({ error: "El monto total debe ser mayor a 0 MXN." });
    }

    // 2. Idempotencia y Referencia Externa
    const idempotencyKey = crypto.randomUUID();
    const externalReference = orderId || (cartId ? `ARC-CART-${cartId}` : `ARC-ORD-${Date.now().toString(36).toUpperCase()}`);

    // 3. Preparar items para la API de Mercado Pago (Orders API v1 requiere unit_price como string decimal)
    const mpItems = items.map((item) => ({
      title: item.title,
      unit_price: Number(item.unit_price).toFixed(2),
      quantity: Number(item.quantity),
    }));

    if (shippingCost > 0) {
      mpItems.push({
        title: "Envío Express Asegurado",
        unit_price: Number(shippingCost).toFixed(2),
        quantity: 1,
      });
    }

    // 4. Llamada a la API de Mercado Pago (Orders API v1)
    const mpResponse = await fetch("https://api.mercadopago.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        type: "online",
        processing_mode: "manual",
        total_amount: finalTotal.toFixed(2),
        external_reference: externalReference,
        payer: {
          email: buyerEmail || "cliente@arcanosolutions.com",
          first_name: buyerName || "Cliente Arcano",
        },
        items: mpItems,
        config: {
          online: {
            success_url: "https://arcanosolutions.com/checkout/success",
            pending_url: "https://arcanosolutions.com/checkout/pending",
            failure_url: "https://arcanosolutions.com/checkout/failure",
            auto_return: "approved",
          },
        },
      }),
    });

    const mpData = await mpResponse.json();

    if (!mpResponse.ok) {
      console.error("Error devuelto por Mercado Pago Orders API:", mpData);
      return res.status(mpResponse.status).json({
        error: "Mercado Pago no pudo crear la orden.",
        details: mpData,
      });
    }

    // 5. Devolver checkout_url para redirección inmediata
    return res.json({
      success: true,
      order_id: mpData.id,
      checkout_url: mpData.checkout_url || mpData.init_point,
      external_reference: externalReference,
      total_amount: finalTotal,
    });
  } catch (error: any) {
    console.error("Error no controlado en /create-order:", error);
    return res.status(500).json({
      error: "Error interno del servidor al procesar la orden.",
      message: error?.message || "Error desconocido",
    });
  }
});

app.listen(port, () => {
  console.log(`[ARCANO MP-ORDERS-SERVICE] Escuchando en el puerto ${port}`);
});

