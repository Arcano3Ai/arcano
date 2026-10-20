# ARCANO — Guía de Conexión del Agente de WhatsApp Business al Inventario

Esta guía documenta cómo conectar tu Agente de WhatsApp Business (implementado en **Python**, **Node.js**, **n8n** o herramientas de IA) a la base de datos de inventario de **ARCANO**.

---

## 1. Arquitectura de Datos del Inventario

- **Total de Colecciones**: 11 Colecciones ceremoniales.
- **Total de Piezas Únicas**: 148 Productos.
- **Cuota de Inventario**: **Exactamente 1,000 piezas por colección** (Total Global: 11,000 unidades en inventario).
- **Control de Concurrencia**: Prevención de sobreventa mediante reservas atómicas en PostgreSQL (`rpc_reserve_stock`).
- **Resiliencia**: Si Supabase experimenta latencia o mantenimiento, la API responde automáticamente desde el snapshot estático en caché `/agent-inventory-snapshot.json`.

---

## 2. Endpoints HTTP para el Agente

### A. Consultar Catálogo Completo o Filtrado
```http
GET /api/agent/inventory?q=amatista&collection=coleccion-arcanos
```

**Respuesta JSON (Optimizada para Agente / LLM)**:
```json
{
  "success": true,
  "total_collections": 11,
  "total_items": 148,
  "target_stock_per_collection": 1000,
  "items": [
    {
      "sku": "ARC-00",
      "id": "talisman-arcano-0-el-loco-labradorita-turquesa",
      "name": "Arcano 0 · El Loco (Labradorita & Turquesa Natural)",
      "collection": "coleccion-arcanos",
      "price_mxn": 1580,
      "price_formatted": "MXN $1,580",
      "available_stock": 46,
      "in_stock": true,
      "tagline": "Libertad · Confianza · Comienzo. Talismán del salto de fe.",
      "stone_type": "Labradorita & Turquesa Natural",
      "image_url": "https://arcano.lat/images/shop/pulseras_arcanos/pulsera_01.jpeg",
      "purchase_link": "https://arcano.lat/tienda?sku=ARC-00#talisman-arcano-0-el-loco-labradorita-turquesa"
    }
  ]
}
```

### B. Consultar Ficha Técnica por SKU
```http
GET /api/agent/inventory/ARC-00
```

### C. Apartar / Reservar Pieza para un Consultante
```http
POST /api/agent/inventory/reserve
Content-Type: application/json

{
  "sku": "ARC-00",
  "quantity": 1,
  "customerPhone": "5218121912778",
  "customerName": "Adrián"
}
```

---

## 3. Ejemplo de Implementación en Python (FastAPI / LangChain / OpenAI)

```python
import requests

ARCANO_BASE_URL = "http://localhost:3000" # o tu dominio en producción: https://arcano.lat

def consultar_inventario_arcanos(busqueda: str = "", coleccion: str = ""):
    """Función de Tool Calling para el agente de WhatsApp."""
    params = {}
    if busqueda:
        params["q"] = busqueda
    if coleccion:
        params["collection"] = coleccion
        
    response = requests.get(f"{ARCANO_BASE_URL}/api/agent/inventory", params=params, timeout=5)
    return response.json()

def apartar_pieza_cliente(sku: str, telefono: str, nombre: str):
    """Aparta una pieza cuando el cliente solicita comprarla por WhatsApp."""
    payload = {
        "sku": sku,
        "quantity": 1,
        "customerPhone": telefono,
        "customerName": nombre
    }
    response = requests.post(f"{ARCANO_BASE_URL}/api/agent/inventory/reserve", json=payload, timeout=5)
    return response.json()
```

---

## 4. Consulta Directa en Supabase (Python / Node.js)

Si tu agente de WhatsApp se conecta directamente a Supabase:

### Python (`supabase-py`):
```python
from supabase import create_client

SUPABASE_URL = "https://myxwjlgyxmuqwnevloav.supabase.co"
SUPABASE_KEY = "tu-anon-key-aqui"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Consultar piezas con stock disponible
response = supabase.table("inventory_items") \
    .select("sku, name, price_mxn, available_quantity, collection_id") \
    .gt("available_quantity", 0) \
    .execute()

items = response.data
```

### Node.js (`@supabase/supabase-js`):
```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Reservar pieza de forma atómica evitando race conditions
const { data, error } = await supabase.rpc('rpc_reserve_stock', {
  p_item_id: 'ARC-00',
  p_quantity: 1,
  p_reservation_ref: 'WA_5218121912778'
});
```

---

## 5. Esquema de Códigos SKU por Colección

| Colección | Prefijo SKU | Piezas | Stock por Colección |
| :--- | :---: | :---: | :---: |
| Arcanos Mayores | `ARC-00` a `ARC-21` | 22 | **1,000 piezas** |
| Alta Joyería & Oro 18K | `ORO-01` a `ORO-10` | 10 | **1,000 piezas** |
| Ámbar de Chiapas | `AMB-01` a `AMB-24` | 24 | **1,000 piezas** |
| Doble Perforación | `DBP-01` a `DBP-11` | 11 | **1,000 piezas** |
| Reiki & Sanación | `RKI-01` a `RKI-04` | 4 | **1,000 piezas** |
| Quemadores & Runas | `RUN-01` a `RUN-04` | 4 | **1,000 piezas** |
| Símbolos & Geometría | `GEO-01` a `GEO-14` | 14 | **1,000 piezas** |
| Frecuencias Angelicales | `ANG-01` a `ANG-03` | 3 | **1,000 piezas** |
| Sahumerios & Kits | `SAH-01` a `SAH-06` | 6 | **1,000 piezas** |
| Talismanes de Muñeca | `TAL-01` a `TAL-42` | 42 | **1,000 piezas** |
| Dúos Alquímicos | `DUO-01` a `DUO-08` | 8 | **1,000 piezas** |
| **TOTAL** | — | **148** | **11,000 piezas** |
