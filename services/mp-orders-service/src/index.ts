import express, { Request, Response } from "express";
import cors from "cors";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const app = express();
const port = process.env.PORT || 8080;

// Inicialización de Supabase PostgreSQL
const supabaseUrl = process.env.SUPABASE_URL || "https://myxwjlgyxmuqwnevloav.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

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

interface ShippingAddress {
  street?: string;
  number?: string;
  colonia?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

interface CreateOrderBody {
  cartId?: string;
  orderId?: string;
  buyerEmail?: string;
  buyerName?: string;
  buyerPhone?: string;
  shippingAddress?: ShippingAddress;
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

    const { cartId, orderId, buyerEmail, buyerName, buyerPhone, shippingAddress, items, shippingCost = 0 } = req.body as CreateOrderBody;

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

    // 4. Desglose enriquecido de datos del pagador (Maximiza aprobación y antifraude)
    const nameParts = (buyerName || "Cliente Arcano").trim().split(/\s+/);
    const firstName = nameParts[0] || "Cliente";
    const lastName = nameParts.slice(1).join(" ") || "Arcano";

    const cleanPhone = (buyerPhone || "").replace(/\D/g, "");
    const areaCode = cleanPhone.length === 10 ? cleanPhone.slice(0, 2) : "52";
    const phoneNumber = cleanPhone.length === 10 ? cleanPhone.slice(2) : cleanPhone || "12345678";

    const payerPayload: any = {
      email: buyerEmail || "cliente@arcanosolutions.com",
      first_name: firstName,
      last_name: lastName,
      phone: {
        area_code: areaCode,
        number: phoneNumber,
      },
    };

    if (shippingAddress && shippingAddress.street) {
      payerPayload.address = {
        street_name: shippingAddress.street,
        street_number: shippingAddress.number || "S/N",
        zip_code: shippingAddress.zipCode || "64000",
      };
    }

    // 5. Llamada a la API de Mercado Pago (Orders API v1)
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
        payer: payerPayload,
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
    const responsePayload = {
      success: true,
      order_id: mpData.id,
      checkout_url: mpData.checkout_url || mpData.init_point,
      external_reference: externalReference,
      total_amount: finalTotal,
    };

    // 6. Persistencia Full E-Commerce en Supabase PostgreSQL (asíncrona / segura)
    if (supabase) {
      (async () => {
        try {
          // A) Insertar orden de negocio
          const { data: newOrder, error: orderErr } = await supabase
            .from("orders")
            .insert({
              external_reference: externalReference,
              status: "awaiting_payment",
              currency: "MXN",
              subtotal_amount: itemsTotal,
              shipping_amount: shippingCost,
              total_amount: finalTotal,
              buyer_email: buyerEmail || "cliente@arcanosolutions.com",
              buyer_first_name: firstName,
              buyer_last_name: lastName,
              buyer_phone: cleanPhone || null,
              shipping_street_name: shippingAddress?.street || "No especificado",
              shipping_street_number: shippingAddress?.number || "S/N",
              shipping_colonia: shippingAddress?.colonia || null,
              shipping_city: shippingAddress?.city || "No especificado",
              shipping_state: shippingAddress?.state || "No especificado",
              shipping_zip_code: shippingAddress?.zipCode || "00000",
            })
            .select("id")
            .single();

          if (orderErr) {
            console.warn("[Supabase] No se pudo persistir orden en orders:", orderErr.message);
            return;
          }

          if (newOrder) {
            // B) Insertar items de la orden
            const orderItemsData = items.map((i) => ({
              order_id: newOrder.id,
              sku: i.description || null,
              title: i.title,
              unit_price: Number(i.unit_price),
              quantity: Number(i.quantity),
              line_total: Number(i.unit_price) * Number(i.quantity),
            }));
            await supabase.from("order_items").insert(orderItemsData);

            // C) Insertar espejo en mp_orders
            await supabase.from("mp_orders").insert({
              order_id: newOrder.id,
              mp_order_id: String(mpData.id),
              mp_status: mpData.status || "opened",
              mp_status_detail: mpData.status_detail || "waiting_payment",
              mp_total_amount: finalTotal,
              checkout_url: mpData.checkout_url || mpData.init_point,
            });

            console.log(`[Supabase Full E-Commerce] Orden ${externalReference} persistida con éxito.`);
          }
        } catch (dbErr: any) {
          console.error("[Supabase Error] Fallo al guardar en base de datos:", dbErr?.message);
        }
      })();
    }

    return res.json(responsePayload);
  } catch (error: any) {
    console.error("Error no controlado en /create-order:", error);
    return res.status(500).json({
      error: "Error interno del servidor al procesar la orden.",
      message: error?.message || "Error desconocido",
    });
  }
});

// Helpers para validación de Webhook de Mercado Pago
function parseXSignature(xSignature: string | null | undefined) {
  if (!xSignature) return null;
  // Formato esperado: ts=<TIMESTAMP>,v1=<SIGNATURE>
  const parts = Object.fromEntries(
    xSignature.split(",").map((kv) => {
      const [k, v] = kv.split("=");
      return [k?.trim(), v?.trim()];
    })
  );
  if (!parts.ts || !parts.v1) return null;
  return { ts: parts.ts as string, v1: parts.v1 as string };
}

function hmacSHA256(secret: string, manifest: string) {
  return crypto.createHmac("sha256", secret).update(manifest).digest("hex");
}

// Control de Idempotencia en memoria para Webhooks (evita procesar duplicados)
const processedEvents = new Set<string>();
function isEventProcessed(eventKey: string): boolean {
  if (!eventKey) return false;
  if (processedEvents.has(eventKey)) return true;
  if (processedEvents.size > 2000) {
    const firstKey = processedEvents.values().next().value;
    if (firstKey) processedEvents.delete(firstKey);
  }
  processedEvents.add(eventKey);
  return false;
}

// Handler de Webhook de Mercado Pago
export async function webhookHandler(req: Request, res: Response) {
  try {
    const xRequestId = req.header("x-request-id") || "";
    const xSignature = parseXSignature(req.header("x-signature"));

    // En Webhooks de Mercado Pago, el identificador del recurso viene en data.id o query.id
    const dataId = (req.body?.data?.id || req.query?.["data.id"] || req.query?.id) ? String(req.body?.data?.id || req.query?.["data.id"] || req.query?.id) : "";

    // Validación de firma HMAC SHA-256 (si MP_WEBHOOK_SECRET está configurado)
    const webhookSecret = process.env.MP_WEBHOOK_SECRET;
    if (webhookSecret && xSignature && dataId && xRequestId) {
      const manifest = `id:${dataId};request-id:${xRequestId};ts:${xSignature.ts};`;
      const expected = hmacSHA256(webhookSecret, manifest);

      if (expected !== xSignature.v1) {
        console.warn("[MP Webhook] Firma inválida rechazada:", { dataId, xRequestId });
        return res.status(401).json({ error: "invalid signature" });
      }
    }

    // Idempotencia: Verificar si este evento ya fue recibido
    const eventKey = `${xRequestId || 'no-req'}:${dataId}`;
    if (isEventProcessed(eventKey)) {
      console.log("[MP Webhook] Evento ya procesado previamente (Idempotencia ACK):", eventKey);
      return res.status(200).json({ received: true, id: dataId, deduplicated: true });
    }

    // Log estructurado del evento
    console.log("[MP Webhook Event Recibido]:", {
      type: req.body?.type || req.query?.type,
      action: req.body?.action || req.query?.topic,
      dataId,
      live_mode: req.body?.live_mode,
      timestamp: new Date().toISOString(),
    });

    // 2. Conciliación Asíncrona Full E-Commerce en Supabase
    if (supabase && dataId) {
      (async () => {
        try {
          // Guardar evento para auditoría e idempotencia
          await supabase.from("webhook_events").insert({
            request_id: xRequestId || `auto-${Date.now()}-${dataId}`,
            event_type: req.body?.type || req.query?.type || "unknown",
            event_action: req.body?.action || req.query?.topic || "unknown",
            data_id: dataId,
            signature_valid: true,
            raw_payload: req.body,
          });

          // Consultar el recurso oficial en Mercado Pago API (Fuente de Verdad)
          const accessToken = process.env.MP_ACCESS_TOKEN;
          if (accessToken) {
            const isPayment = (req.body?.type || req.query?.type) === "payment";
            const apiEndpoint = isPayment
              ? `https://api.mercadopago.com/v1/payments/${dataId}`
              : `https://api.mercadopago.com/v1/orders/${dataId}`;

            const checkRes = await fetch(apiEndpoint, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (checkRes.ok) {
              const resource = await checkRes.json();
              const extRef = resource.external_reference;
              const mpStatus = resource.status || (resource.order_status === "paid" ? "closed" : "opened");
              const mpStatusDetail = resource.status_detail || null;

              // Datos si es pago
              const paymentId = isPayment ? String(resource.id) : (resource.payments?.[0]?.id ? String(resource.payments[0].id) : null);
              const paymentAmount = isPayment ? resource.transaction_amount : (resource.total_amount ? Number(resource.total_amount) : null);
              const paymentStatus = isPayment ? resource.status : (resource.payments?.[0]?.status || null);
              const paymentMethodId = resource.payment_method_id || null;
              const paymentTypeId = resource.payment_type_id || null;

              if (extRef) {
                const { data: syncRes, error: syncErr } = await supabase.rpc("rpc_sync_order_from_webhook", {
                  p_external_reference: extRef,
                  p_mp_order_id: isPayment ? (resource.order?.id ? String(resource.order.id) : dataId) : dataId,
                  p_mp_status: mpStatus,
                  p_mp_status_detail: mpStatusDetail,
                  p_mp_payment_id: paymentId,
                  p_payment_amount: paymentAmount,
                  p_payment_status: paymentStatus,
                  p_payment_method_id: paymentMethodId,
                  p_payment_type_id: paymentTypeId,
                });

                if (syncErr) {
                  console.error("[Supabase Conciliación RPC Error]:", syncErr.message);
                } else {
                  console.log("[Supabase Conciliación Exitosa]:", syncRes);
                }
              }
            }
          }
        } catch (syncErr: any) {
          console.error("[MP Webhook Async Sync Error]:", syncErr?.message);
        }
      })();
    }

    // ACK rápido (Mercado Pago espera 200/201 para confirmar la entrega y evitar reintentos)
    return res.status(200).json({ received: true, id: dataId });
  } catch (err: any) {
    console.error("[MP Webhook] Error procesando notificación:", err);
    return res.status(500).json({ error: "internal webhook error" });
  }
}

// Endpoint Webhook (soportamos tanto /webhook como /webhook/mp)
app.post("/webhook", webhookHandler);
app.post("/webhook/mp", webhookHandler);

app.listen(port, () => {
  console.log(`[ARCANO MP-ORDERS-SERVICE] Escuchando en el puerto ${port}`);
});

