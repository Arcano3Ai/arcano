# Architecture Decision Record (ADR): Integración Checkout Pro Mercado Pago & Certificación de Calidad

**Proyecto:** ARCANO — Sabiduría de los Arcanos  
**Fecha de Certificación:** 13 de Noviembre, 2026  
**Resultado Oficial en Panel:** **94 / 100 ("Cerca del ideal")**  
**Requisitos Obligatorios Pendientes:** **0 de 8 (100% Cumplido)**  
**ID de Medición Oficial:** `ORDTST01M7ARNY96RE0YSRPDMBEXYFGE`  

---

## 1. Contexto y Objetivos
Para habilitar el cobro seguro con tarjetas de crédito/débito y transferencias directas en México para ARCANO, se integró **Mercado Pago Checkout Pro** mediante la **Orders API v1**, respaldado por un backend serverless en **Google Cloud Run** y persistencia relacional transaccional en **Supabase PostgreSQL**.

---

## 2. Decisiones de Arquitectura (ADRs)

### ADR-01: Modelo de Compra "Guest Checkout" vs Registro Obligatorio
- **Decisión:** Mantener la experiencia de compra como invitado (Guest Checkout Ceremonial) en lugar de obligar al usuario a crear una cuenta y contraseña antes de pagar.
- **Justificación de Negocio:** En e-commerce de autor y lujo, forzar el login previo genera un abandono de carrito de entre el 25% y 35%. 
- **Impacto en Certificación:** Se omitió deliberadamente el campo opcional `additional_info.payer.registration_date` (+2 pts), ya que la Orders API v1 rechaza propiedades no soportadas en compras de invitados y obligar a un registro previo deterioraría la conversión.

### ADR-02: Cliente REST Nativo Serverless vs SDK Monolítico
- **Decisión:** Implementar las llamadas HTTP con `fetch` nativo sobre **Node.js 22 LTS en Google Cloud Run** con tipado TypeScript estricto.
- **Justificación Técnica:** Los SDKs monolíticos agregan dependencias innecesarias, aumentan el tamaño del contenedor y ralentizan los cold starts. La implementación nativa reduce la superficie de ataque, optimiza la latencia a milisegundos y garantiza control total sobre los reintentos y timeouts.
- **Impacto en Certificación:** Se omitió deliberadamente la recomendación opcional de "SDK de Backend" (+4 pts).

### ADR-03: Blindaje Antifraude con 3D Secure (3DS) y Liability Shift
- **Decisión:** Enviar obligatoriamente `liability_shift: "required"` y `validation: "on_fraud_risk"` en `config.online.transaction_security`.
- **Justificación:** Transfiere la responsabilidad financiera de desconocimiento de compra o fraude al banco emisor de la tarjeta, protegiendo el flujo de caja del negocio.

### ADR-04: Conciliación Atómica e Idempotente por Webhook
- **Decisión:** Desacoplar la recepción de webhooks mediante validación de firma criptográfica **HMAC SHA-256** (`x-signature`) y procesar la sincronización en PostgreSQL mediante el procedimiento almacenado `rpc_sync_order_from_webhook(p_event jsonb)`.
- **Garantías:** 
  1. Deduplicación estricta por `request_id` (`x-request-id`).
  2. Bloqueo pesimista con `SELECT ... FOR UPDATE` para evitar condiciones de carrera si dos webhooks llegan simultáneamente.
  3. Descuento de inventario atómico que ocurre una única vez (`inventory_committed_at IS NULL`).

### ADR-05: Resumen de Tarjeta Reconocible (`statement_descriptor`)
- **Decisión:** Configurar `config.statement_descriptor = "ARCANO"`.
- **Justificación:** El cliente ve claramente "ARCANO" en su banca en línea o estado de cuenta bancario, reduciendo desconocimientos accidentales.

---

## 3. Endpoints de Infraestructura

| Endpoint | Entorno | Propósito |
| :--- | :--- | :--- |
| `POST /create-order` | **Producción** | Recibe el carrito, persiste en `orders` y devuelve la `checkout_url` real para clientes. |
| `POST /create-order-test` | **Pruebas (Sandbox)** | Crea órdenes de prueba con `MP_ACCESS_TOKEN_TEST` sin tocar datos de producción. |
| `POST /webhook` | **Producción / Test** | Valida firma HMAC, audita el payload y delega la transición de estado al RPC de Supabase. |
| `GET /health` | Global | Verificación de estado del microservicio y conectividad. |

---

## 4. Estado de Producción
- **Frontend (`arcanosolutions.com`):** Conectado al endpoint de producción con badges oficiales de Mercado Pago y sellos 3DS.
- **Backend (Cloud Run):** Desplegado en `us-central1` (`mp-orders-service`).
- **Base de Datos (Supabase):** Tablas relacionales `orders`, `order_items`, `mp_orders`, `mp_payments`, `webhook_events` operativas.
