-- ==============================================================================
-- ARCANO — SEED DE INVENTARIO: 1,000 UNIDADES EXACTAS POR COLECCIÓN
-- Total Colecciones: 11 | Total Piezas: 148 | Total Unidades: 11,000
-- Generado para integración directa con PostgreSQL / Supabase & Agente WhatsApp
-- ==============================================================================

BEGIN;

-- 1. INSERTAR O ACTUALIZAR COLECCIONES CEREMONIALES
INSERT INTO public.inventory_collections (id, name, slug, description, symbol, target_stock, current_stock)
VALUES (
  'coleccion-arcanos',
  'Colección Arcanos Mayores',
  'coleccion-arcanos',
  'Talismanes de muñeca consagrados a los 22 arquetipos del Tarot hermético y la alquimia interior.',
  '♾️',
  1000,
  1000
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  symbol = EXCLUDED.symbol,
  target_stock = EXCLUDED.target_stock,
  updated_at = NOW();

INSERT INTO public.inventory_collections (id, name, slug, description, symbol, target_stock, current_stock)
VALUES (
  'alta-joyeria-oro',
  'Alta Joyería & Oro 18K',
  'alta-joyeria-oro',
  'Talismanes ceremoniales y gargantillas consagradas con herrajes bañados en oro 18K y gemas naturales de Grado AAA.',
  '⚜️',
  1000,
  1000
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  symbol = EXCLUDED.symbol,
  target_stock = EXCLUDED.target_stock,
  updated_at = NOW();

INSERT INTO public.inventory_collections (id, name, slug, description, symbol, target_stock, current_stock)
VALUES (
  'ambar-chiapas',
  'Ámbar de Chiapas & Minerales',
  'ambar-chiapas',
  'Talismanes ceremoniales con auténtico ámbar fósil de Simojovel, plata fina Ley .925 y minerales sagrados.',
  '✨',
  1000,
  1000
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  symbol = EXCLUDED.symbol,
  target_stock = EXCLUDED.target_stock,
  updated_at = NOW();

INSERT INTO public.inventory_collections (id, name, slug, description, symbol, target_stock, current_stock)
VALUES (
  'doble-perforacion',
  'Doble Perforación (Dual)',
  'doble-perforacion',
  'Soportes de piedra con dos orificios para sahumerio dual y mezcla de aromas.',
  '⚡',
  1000,
  1000
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  symbol = EXCLUDED.symbol,
  target_stock = EXCLUDED.target_stock,
  updated_at = NOW();

INSERT INTO public.inventory_collections (id, name, slug, description, symbol, target_stock, current_stock)
VALUES (
  'reiki-sanacion',
  'Reiki & Sanación',
  'reiki-sanacion',
  'Símbolos Cho Ku Rei, Hagstones (piedras bruja) y piedras de armonización.',
  '🌀',
  1000,
  1000
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  symbol = EXCLUDED.symbol,
  target_stock = EXCLUDED.target_stock,
  updated_at = NOW();

INSERT INTO public.inventory_collections (id, name, slug, description, symbol, target_stock, current_stock)
VALUES (
  'portainciensos-y-runas',
  'Quemadores Rúnicos & Aura',
  'portainciensos-y-runas',
  'Soportes de piedra taladrados a mano para incienso y varitas sagradas.',
  'ᚱ',
  1000,
  1000
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  symbol = EXCLUDED.symbol,
  target_stock = EXCLUDED.target_stock,
  updated_at = NOW();

INSERT INTO public.inventory_collections (id, name, slug, description, symbol, target_stock, current_stock)
VALUES (
  'simbolos-y-geometria',
  'Símbolos Sagrados & Sol',
  'simbolos-y-geometria',
  'Geometría sagrada, soles alquímicos, lunas y mandalas pintados a mano en piedra.',
  '🜃',
  1000,
  1000
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  symbol = EXCLUDED.symbol,
  target_stock = EXCLUDED.target_stock,
  updated_at = NOW();

INSERT INTO public.inventory_collections (id, name, slug, description, symbol, target_stock, current_stock)
VALUES (
  'frecuencias-angelicales',
  'Números Angelicales',
  'frecuencias-angelicales',
  'Frecuencias sincrónicas (11:11, 777, 444) para anclar intenciones.',
  '☉',
  1000,
  1000
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  symbol = EXCLUDED.symbol,
  target_stock = EXCLUDED.target_stock,
  updated_at = NOW();

INSERT INTO public.inventory_collections (id, name, slug, description, symbol, target_stock, current_stock)
VALUES (
  'sahumerios-y-kits',
  'Kits & Bandejas de Altar',
  'sahumerios-y-kits',
  'Inciensos de monte, atados de salvia, bandejas de río y kits de limpieza profunda.',
  '🜁',
  1000,
  1000
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  symbol = EXCLUDED.symbol,
  target_stock = EXCLUDED.target_stock,
  updated_at = NOW();

INSERT INTO public.inventory_collections (id, name, slug, description, symbol, target_stock, current_stock)
VALUES (
  'talismanes',
  'Talismanes de Muñeca',
  'talismanes',
  'Pulseras artesanales consagradas con minerales naturales y amuletos sagrados.',
  '📿',
  1000,
  1000
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  symbol = EXCLUDED.symbol,
  target_stock = EXCLUDED.target_stock,
  updated_at = NOW();

INSERT INTO public.inventory_collections (id, name, slug, description, symbol, target_stock, current_stock)
VALUES (
  'duos',
  'Dúos Alquímicos',
  'duos',
  'Kits rituales de Altar Fluvial: Piedra Sahumadora + Talismán de Muñeca.',
  '✨',
  1000,
  1000
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  symbol = EXCLUDED.symbol,
  target_stock = EXCLUDED.target_stock,
  updated_at = NOW();


-- 2. INSERTAR O ACTUALIZAR PIEZAS (148 PRODUCTOS ÚNICOS)
INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-0-el-loco-labradorita-turquesa',
  'ARC-00',
  'Arcano 0 · El Loco (Howlita Blanca & Ónix Mate)',
  'talisman-arcano-0-el-loco-labradorita-turquesa',
  'coleccion-arcanos',
  1580,
  46,
  0,
  5,
  TRUE,
  'Nuevos comienzos · Libertad · Aventura. Talismán del salto de fe con howlita blanca y anclaje de ónix y hematita.',
  'Howlita Blanca, Ónix Mate & Hematita Metálica',
  '/images/shop/pulseras_arcanos/pulsera_01.jpeg',
  '{"tagline":"Nuevos comienzos · Libertad · Aventura. Talismán del salto de fe con howlita blanca y anclaje de ónix y hematita.","stoneType":"Howlita Blanca, Ónix Mate & Hematita Metálica","arcanoNumber":"0"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-i-el-mago-onix-lapislazuli',
  'ARC-0I',
  'Arcano I · El Mago (Ónix Brillante & Lapislázuli)',
  'talisman-arcano-i-el-mago-onix-lapislazuli',
  'coleccion-arcanos',
  1680,
  46,
  0,
  5,
  TRUE,
  'Manifestación · Voluntad · Concentración. Talismán del poder creador que une cielo y tierra.',
  'Ónix Negro Brillante, Lapislázuli & Pirita Dorada',
  '/images/shop/pulseras/brazalete-arcano-i-el-mago-onix-lapislazuli.jpg',
  '{"tagline":"Manifestación · Voluntad · Concentración. Talismán del poder creador que une cielo y tierra.","stoneType":"Ónix Negro Brillante, Lapislázuli & Pirita Dorada","arcanoNumber":"I"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-ii-la-sacerdotisa-piedra-luna-amatista',
  'ARC-II',
  'Arcano II · La Sacerdotisa (Cuarzo Blanco & Amatista)',
  'talisman-arcano-ii-la-sacerdotisa-piedra-luna-amatista',
  'coleccion-arcanos',
  1680,
  46,
  0,
  5,
  TRUE,
  'Intuición · Misterio · Sabiduría interior. Talismán de quietud y conexión con las aguas sagradas del alma.',
  'Cuarzo Blanco Lechoso, Amatista & Piedra Luna / Opalina',
  '/images/shop/pulseras_arcanos/pulsera_02.jpeg',
  '{"tagline":"Intuición · Misterio · Sabiduría interior. Talismán de quietud y conexión con las aguas sagradas del alma.","stoneType":"Cuarzo Blanco Lechoso, Amatista & Piedra Luna / Opalina","arcanoNumber":"II"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-iii-la-emperatriz-cuarzo-rosa-jade',
  'ARC-III',
  'Arcano III · La Emperatriz (Cuarzo Rosa & Jade Verde)',
  'talisman-arcano-iii-la-emperatriz-cuarzo-rosa-jade',
  'coleccion-arcanos',
  1680,
  46,
  0,
  5,
  TRUE,
  'Abundancia · Creatividad · Naturaleza. Talismán de la fertilidad creadora y el amor incondicional.',
  'Cuarzo Rosa, Jade Verde & Aventurina Verde',
  '/images/shop/pulseras_arcanos/pulsera_03.jpeg',
  '{"tagline":"Abundancia · Creatividad · Naturaleza. Talismán de la fertilidad creadora y el amor incondicional.","stoneType":"Cuarzo Rosa, Jade Verde & Aventurina Verde","arcanoNumber":"III"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-iv-el-emperador-ojo-tigre-hematita',
  'ARC-IV',
  'Arcano IV · El Emperador (Jaspe Rojo & Ojo de Tigre)',
  'talisman-arcano-iv-el-emperador-ojo-tigre-hematita',
  'coleccion-arcanos',
  1680,
  46,
  0,
  5,
  TRUE,
  'Autoridad · Estructura · Liderazgo. Talismán de solidez terrenal y dominio consciente.',
  'Jaspe Rojo, Ónix Brillante & Ojo de Tigre Dorado',
  '/images/shop/pulseras_arcanos/pulsera_04.jpeg',
  '{"tagline":"Autoridad · Estructura · Liderazgo. Talismán de solidez terrenal y dominio consciente.","stoneType":"Jaspe Rojo, Ónix Brillante & Ojo de Tigre Dorado","arcanoNumber":"IV"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-v-el-hierofante-lapislazuli-ojo-halcon',
  'ARC-0V',
  'Arcano V · El Hierofante (Sodalita Azul & Ojo de Tigre)',
  'talisman-arcano-v-el-hierofante-lapislazuli-ojo-halcon',
  'coleccion-arcanos',
  1680,
  46,
  0,
  5,
  TRUE,
  'Sabiduría tradicional · Guía espiritual · Verdad. Talismán del puente sagrado entre cielo y tierra.',
  'Sodalita Azul, Ojo de Tigre & Hematita Dorada',
  '/images/shop/pulseras_arcanos/pulsera_05.jpeg',
  '{"tagline":"Sabiduría tradicional · Guía espiritual · Verdad. Talismán del puente sagrado entre cielo y tierra.","stoneType":"Sodalita Azul, Ojo de Tigre & Hematita Dorada","arcanoNumber":"V"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-vi-los-enamorados-rodocrosita-cuarzo-ahumado',
  'ARC-VI',
  'Arcano VI · Los Enamorados (Cornalina & Cuarzo Rosa)',
  'talisman-arcano-vi-los-enamorados-rodocrosita-cuarzo-ahumado',
  'coleccion-arcanos',
  1680,
  46,
  0,
  5,
  TRUE,
  'Amor · Unión · Elección · Armonía. Talismán de la devoción consciente y la concordia del corazón.',
  'Cornalina Naranja, Cuarzo Rosa & Jaspe Rojo',
  '/images/shop/pulseras_arcanos/pulsera_06.jpeg',
  '{"tagline":"Amor · Unión · Elección · Armonía. Talismán de la devoción consciente y la concordia del corazón.","stoneType":"Cornalina Naranja, Cuarzo Rosa & Jaspe Rojo","arcanoNumber":"VI"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-vii-el-carro-obsidiana-ojo-buey',
  'ARC-VII',
  'Arcano VII · El Carro (Ojo de Tigre & Hematita)',
  'talisman-arcano-vii-el-carro-obsidiana-ojo-buey',
  'coleccion-arcanos',
  1680,
  46,
  0,
  5,
  TRUE,
  'Determinación · Avance · Triunfo. Talismán de la victoria sobre los impulsos opuestos.',
  'Ojo de Tigre Dorado, Ónix Brillante & Hematita Gris Metálica',
  '/images/shop/pulseras_arcanos/pulsera_07.jpeg',
  '{"tagline":"Determinación · Avance · Triunfo. Talismán de la victoria sobre los impulsos opuestos.","stoneType":"Ojo de Tigre Dorado, Ónix Brillante & Hematita Gris Metálica","arcanoNumber":"VII"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-viii-la-fuerza-cornalina-ojo-tigre',
  'ARC-VIII',
  'Arcano VIII · La Fuerza (Jaspe Paisaje & Ojo de Buey)',
  'talisman-arcano-viii-la-fuerza-cornalina-ojo-tigre',
  'coleccion-arcanos',
  1680,
  46,
  0,
  5,
  TRUE,
  'Dominio interior · Paciencia · Valentía. Talismán de la compasión que doma al león interno.',
  'Jaspe Paisaje / Dálmata, Ónix Mate & Ojo de Buey Rojo',
  '/images/shop/pulseras_arcanos/pulsera_08.jpeg',
  '{"tagline":"Dominio interior · Paciencia · Valentía. Talismán de la compasión que doma al león interno.","stoneType":"Jaspe Paisaje / Dálmata, Ónix Mate & Ojo de Buey Rojo","arcanoNumber":"VIII"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-ix-el-ermitano-cuarzo-ahumado-onix',
  'ARC-IX',
  'Arcano IX · El Ermitaño (Cuarzo Ahumado & Labradorita)',
  'talisman-arcano-ix-el-ermitano-cuarzo-ahumado-onix',
  'coleccion-arcanos',
  1680,
  46,
  0,
  5,
  TRUE,
  'Introspección · Paciencia · Sabiduría. Talismán de la linterna interior que alumbra en la oscuridad.',
  'Cuarzo Ahumado / Ágata Gris, Ónix Mate & Labradorita',
  '/images/shop/pulseras_arcanos/pulsera_09.jpeg',
  '{"tagline":"Introspección · Paciencia · Sabiduría. Talismán de la linterna interior que alumbra en la oscuridad.","stoneType":"Cuarzo Ahumado / Ágata Gris, Ónix Mate & Labradorita","arcanoNumber":"IX"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-x-la-rueda-pirita-malaquita',
  'ARC-0X',
  'Arcano X · La Rueda de la Fortuna (Aventurina & Citrino)',
  'talisman-arcano-x-la-rueda-pirita-malaquita',
  'coleccion-arcanos',
  1680,
  45,
  0,
  5,
  TRUE,
  'Ciclos · Oportunidades · Prosperidad. Talismán de la sincronicidad y el giro favorable del destino.',
  'Aventurina Verde, Citrino Dorado & Pirita Dorada',
  '/images/shop/pulseras_arcanos/pulsera_10.jpeg',
  '{"tagline":"Ciclos · Oportunidades · Prosperidad. Talismán de la sincronicidad y el giro favorable del destino.","stoneType":"Aventurina Verde, Citrino Dorado & Pirita Dorada","arcanoNumber":"X"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-xi-la-justicia-jaspe-hematita',
  'ARC-XI',
  'Arcano XI · La Justicia (Hematita Gris & Ónix Brillante)',
  'talisman-arcano-xi-la-justicia-jaspe-hematita',
  'coleccion-arcanos',
  1680,
  45,
  0,
  5,
  TRUE,
  'Equilibrio · Verdad · Responsabilidad. Talismán de la espada de la lucidez y la balanza armónica.',
  'Hematita Gris, Howlita Blanca & Ónix Negro Brillante',
  '/images/shop/pulseras_arcanos/pulsera_11.jpg',
  '{"tagline":"Equilibrio · Verdad · Responsabilidad. Talismán de la espada de la lucidez y la balanza armónica.","stoneType":"Hematita Gris, Howlita Blanca & Ónix Negro Brillante","arcanoNumber":"XI"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-xii-el-colgado-aguamarina-sodalita',
  'ARC-XII',
  'Arcano XII · El Colgado (Cuarzo Azul & Sodalita)',
  'talisman-arcano-xii-el-colgado-aguamarina-sodalita',
  'coleccion-arcanos',
  1680,
  45,
  0,
  5,
  TRUE,
  'Pausa · Perspectiva · Transformación. Talismán de la rendición consciente y la visión invertida.',
  'Ágata Azul Claro / Cuarzo Azul, Cuarzo Lechoso & Sodalita Marina',
  '/images/shop/pulseras_arcanos/pulsera_12.jpg',
  '{"tagline":"Pausa · Perspectiva · Transformación. Talismán de la rendición consciente y la visión invertida.","stoneType":"Ágata Azul Claro / Cuarzo Azul, Cuarzo Lechoso & Sodalita Marina","arcanoNumber":"XII"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-xiii-la-muerte-obsidiana-turmalina',
  'ARC-XIII',
  'Arcano XIII · La Muerte (Ónix Brillante & Lava Volcánica)',
  'talisman-arcano-xiii-la-muerte-obsidiana-turmalina',
  'coleccion-arcanos',
  1680,
  45,
  0,
  5,
  TRUE,
  'Transformación · Cierre · Renacimiento. Talismán de la poda sagrada que libera espacio a lo nuevo.',
  'Ónix Brillante, Hematita Oscura & Lava Volcánica / Ónix Mate',
  '/images/shop/pulseras_arcanos/pulsera_13.jpg',
  '{"tagline":"Transformación · Cierre · Renacimiento. Talismán de la poda sagrada que libera espacio a lo nuevo.","stoneType":"Ónix Brillante, Hematita Oscura & Lava Volcánica / Ónix Mate","arcanoNumber":"XIII"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-xiv-la-templanza-amatista-cuarzo-cristal',
  'ARC-XIV',
  'Arcano XIV · La Templanza (Amatista & Cuarzo Cristal)',
  'talisman-arcano-xiv-la-templanza-amatista-cuarzo-cristal',
  'coleccion-arcanos',
  1680,
  45,
  0,
  5,
  TRUE,
  'Armonía · Moderación · Equilibrio. Talismán de la alquimia interior que funde opuestos en gracia.',
  'Amatista Púrpura, Howlita Blanca & Cuarzo Cristal Transparente',
  '/images/shop/pulseras_arcanos/pulsera_14.jpg',
  '{"tagline":"Armonía · Moderación · Equilibrio. Talismán de la alquimia interior que funde opuestos en gracia.","stoneType":"Amatista Púrpura, Howlita Blanca & Cuarzo Cristal Transparente","arcanoNumber":"XIV"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-xv-el-diablo-obsidiana-lava',
  'ARC-XV',
  'Arcano XV · El Diablo (Jaspe Rojo Oscuro & Ónix)',
  'talisman-arcano-xv-el-diablo-obsidiana-lava',
  'coleccion-arcanos',
  1680,
  45,
  0,
  5,
  TRUE,
  'Deseo · Pasión · Poder material. Talismán del reconocimiento y dominio de las pulsiones primarias.',
  'Jaspe Rojo Oscuro / Ágata Vino, Ónix Brillante & Hematita Negra',
  '/images/shop/pulseras_arcanos/pulsera_15.jpg',
  '{"tagline":"Deseo · Pasión · Poder material. Talismán del reconocimiento y dominio de las pulsiones primarias.","stoneType":"Jaspe Rojo Oscuro / Ágata Vino, Ónix Brillante & Hematita Negra","arcanoNumber":"XV"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-xvi-la-torre-lava-jaspe-brecha',
  'ARC-XVI',
  'Arcano XVI · La Torre (Lava Volcánica & Jaspe Rojo)',
  'talisman-arcano-xvi-la-torre-lava-jaspe-brecha',
  'coleccion-arcanos',
  1680,
  45,
  0,
  5,
  TRUE,
  'Ruptura · Revelación · Liberación. Talismán del rayo de la verdad que desmorona lo falso.',
  'Lava Volcánica Negra, Jaspe Rojo & Pirita / Hematita Dorada',
  '/images/shop/pulseras_arcanos/pulsera_16.jpg',
  '{"tagline":"Ruptura · Revelación · Liberación. Talismán del rayo de la verdad que desmorona lo falso.","stoneType":"Lava Volcánica Negra, Jaspe Rojo & Pirita / Hematita Dorada","arcanoNumber":"XVI"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-xvii-la-estrella-aguamarina-amazonita',
  'ARC-XVII',
  'Arcano XVII · La Estrella (Turquesa & Piedra Luna)',
  'talisman-arcano-xvii-la-estrella-aguamarina-amazonita',
  'coleccion-arcanos',
  1680,
  45,
  0,
  5,
  TRUE,
  'Esperanza · Inspiración · Renovación. Talismán del manantial celeste que nutre el espíritu.',
  'Turquesa / Howlita Azul, Cuarzo Cristal & Piedra Luna / Opalina',
  '/images/shop/pulseras_arcanos/pulsera_17.jpg',
  '{"tagline":"Esperanza · Inspiración · Renovación. Talismán del manantial celeste que nutre el espíritu.","stoneType":"Turquesa / Howlita Azul, Cuarzo Cristal & Piedra Luna / Opalina","arcanoNumber":"XVII"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-xviii-la-luna-piedra-luna-labradorita',
  'ARC-XVIII',
  'Arcano XVIII · La Luna (Piedra Luna Gris & Amatista)',
  'talisman-arcano-xviii-la-luna-piedra-luna-labradorita',
  'coleccion-arcanos',
  1680,
  45,
  0,
  5,
  TRUE,
  'Intuición · Sueños · Mundo interior. Talismán del cruce nocturno por las aguas del inconsciente.',
  'Piedra Luna Gris / Ágata Gris, Cuarzo Ahumado & Amatista Púrpura',
  '/images/shop/pulseras_arcanos/pulsera_18.jpg',
  '{"tagline":"Intuición · Sueños · Mundo interior. Talismán del cruce nocturno por las aguas del inconsciente.","stoneType":"Piedra Luna Gris / Ágata Gris, Cuarzo Ahumado & Amatista Púrpura","arcanoNumber":"XVIII"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-xix-el-sol-citrino-pirita',
  'ARC-XIX',
  'Arcano XIX · El Sol (Citrino Solar & Ojo de Tigre)',
  'talisman-arcano-xix-el-sol-citrino-pirita',
  'coleccion-arcanos',
  1680,
  45,
  0,
  5,
  TRUE,
  'Vitalidad · Alegría · Éxito. Talismán de la plenitud radiante, calidez y celebración de la vida.',
  'Citrino Solar / Cuarzo Amarillo, Cornalina Naranja & Ojo de Tigre Dorado',
  '/images/shop/pulseras_arcanos/pulsera_19.jpg',
  '{"tagline":"Vitalidad · Alegría · Éxito. Talismán de la plenitud radiante, calidez y celebración de la vida.","stoneType":"Citrino Solar / Cuarzo Amarillo, Cornalina Naranja & Ojo de Tigre Dorado","arcanoNumber":"XIX"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-xx-el-juicio-malaquita-lapislazuli',
  'ARC-XX',
  'Arcano XX · El Juicio (Fluorita Multicolor & Amatista)',
  'talisman-arcano-xx-el-juicio-malaquita-lapislazuli',
  'coleccion-arcanos',
  1680,
  45,
  0,
  5,
  TRUE,
  'Despertar · Transformación personal · Resurrección. Talismán del clarín que llama a la consciencia superior.',
  'Fluorita Multicolor / Ágata Musgosa, Amatista & Cuarzo Cristal',
  '/images/shop/pulseras_arcanos/pulsera_20.jpg',
  '{"tagline":"Despertar · Transformación personal · Resurrección. Talismán del clarín que llama a la consciencia superior.","stoneType":"Fluorita Multicolor / Ágata Musgosa, Amatista & Cuarzo Cristal","arcanoNumber":"XX"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'talisman-arcano-xxi-el-mundo-lapislazuli-cuarzo-malaquita',
  'ARC-XXI',
  'Arcano XXI · El Mundo (7 Minerales de Integración & Ónix)',
  'talisman-arcano-xxi-el-mundo-lapislazuli-cuarzo-malaquita',
  'coleccion-arcanos',
  1680,
  45,
  0,
  5,
  TRUE,
  'Integración · Plenitud · Culminación. Talismán de la danza cósmica y la totalidad consumada.',
  '7 Minerales en Armonía, Ónix Mate & Conector Sagrado',
  '/images/shop/pulseras_arcanos/pulsera_21.jpg',
  '{"tagline":"Integración · Plenitud · Culminación. Talismán de la danza cósmica y la totalidad consumada.","stoneType":"7 Minerales en Armonía, Ónix Mate & Conector Sagrado","arcanoNumber":"XXI"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'joya-01-ojo-de-tigre-corazon-oro',
  'ORO-01',
  'Talismán Sagrado del Corazón: Ojo de Tigre & Herrajes de Oro',
  'joya-01-ojo-de-tigre-corazon-oro',
  'alta-joyeria-oro',
  3290,
  100,
  0,
  10,
  TRUE,
  'Ojo de Tigre dorado grado gema y hematita con medallón central de corazón y herrajes facetados en Oro 18K.',
  '',
  '/images/shop/pulseras_arcanos/pulsera_01.jpeg',
  '{"tagline":"Ojo de Tigre dorado grado gema y hematita con medallón central de corazón y herrajes facetados en Oro 18K.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'joya-02-choker-amatista-geoda-oro',
  'ORO-02',
  'Gargantilla Ceremonial: Amatista Profunda & Druza en Oro 18K',
  'joya-02-choker-amatista-geoda-oro',
  'alta-joyeria-oro',
  3890,
  100,
  0,
  10,
  TRUE,
  'Gargantilla sutil de amatistas púrpuras Grado AAA y cuarzo nieve con separadores cúbicos de Oro 18K y dije de druza natural.',
  '',
  '/images/shop/pulseras_arcanos/pulsera_02.jpeg',
  '{"tagline":"Gargantilla sutil de amatistas púrpuras Grado AAA y cuarzo nieve con separadores cúbicos de Oro 18K y dije de druza natural.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'joya-03-collar-amatista-turmalina-oro',
  'ORO-03',
  'Collar de Alta Consagración: Amatista & Punta de Cristal en Oro 18K',
  'joya-03-collar-amatista-turmalina-oro',
  'alta-joyeria-oro',
  3890,
  100,
  0,
  10,
  TRUE,
  'Esferas de amatista profunda con cadena de eslabones de lujo y dije corazón bañado en Oro 18K con cristal facetado.',
  '',
  '/images/shop/pulseras_arcanos/pulsera_03.jpeg',
  '{"tagline":"Esferas de amatista profunda con cadena de eslabones de lujo y dije corazón bañado en Oro 18K con cristal facetado.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'joya-04-pulsera-cornalina-dalmata-tigre',
  'ORO-04',
  'Talismán Ígneo: Rondelles de Cornalina, Jaspe Dálmata & Ojo de Tigre en Oro',
  'joya-04-pulsera-cornalina-dalmata-tigre',
  'alta-joyeria-oro',
  3290,
  100,
  0,
  10,
  TRUE,
  'Rondelles de cornalina roja translúcida Grado AAA con jaspe dálmata natural y esferas de ojo de tigre.',
  '',
  '/images/shop/pulseras_arcanos/pulsera_04.jpeg',
  '{"tagline":"Rondelles de cornalina roja translúcida Grado AAA con jaspe dálmata natural y esferas de ojo de tigre.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'joya-05-pulsera-malaquita-unakita-oro',
  'ORO-05',
  'Talismán del Corazón Botánico: Malaquita Pura & Cuentas de Oro 18K',
  'joya-05-pulsera-malaquita-unakita-oro',
  'alta-joyeria-oro',
  3290,
  100,
  0,
  10,
  TRUE,
  'Malaquita verde pura con vetas naturales concéntricas, unakita y cuentas espaciadoras facetadas en Oro 18K.',
  '',
  '/images/shop/pulseras_arcanos/pulsera_05.jpeg',
  '{"tagline":"Malaquita verde pura con vetas naturales concéntricas, unakita y cuentas espaciadoras facetadas en Oro 18K.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'joya-06-pulsera-fuego-jaspe-cuarzo-oro',
  'ORO-06',
  'Talismán Telúrico Raíz: Jaspe Rojo Imperial & Cuarzo en Bruto con Oro 18K',
  'joya-06-pulsera-fuego-jaspe-cuarzo-oro',
  'alta-joyeria-oro',
  3290,
  100,
  0,
  10,
  TRUE,
  'Astillas pulidas de jaspe rojo imperial, cuarzo cristalino central en bruto y esferas de Oro 18K.',
  '',
  '/images/shop/pulseras_arcanos/pulsera_06.jpeg',
  '{"tagline":"Astillas pulidas de jaspe rojo imperial, cuarzo cristalino central en bruto y esferas de Oro 18K.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'joya-07-pulsera-sodalita-bloques-oro',
  'ORO-07',
  'Brazalete Oracular: Bloques de Sodalita Azul Real & Oro 18K',
  'joya-07-pulsera-sodalita-bloques-oro',
  'alta-joyeria-oro',
  3290,
  100,
  0,
  10,
  TRUE,
  'Bloques geométricos macizos de sodalita azul noche con vetas de calcita y separadores facetados en Oro 18K.',
  '',
  '/images/shop/pulseras_arcanos/pulsera_07.jpeg',
  '{"tagline":"Bloques geométricos macizos de sodalita azul noche con vetas de calcita y separadores facetados en Oro 18K.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'joya-08-pulsera-cuarzo-nieve-pez-oro',
  'ORO-08',
  'Talismán de la Abundancia Serena: Cuarzo Nieve & Pez Sagrado en Oro 18K',
  'joya-08-pulsera-cuarzo-nieve-pez-oro',
  'alta-joyeria-oro',
  3290,
  100,
  0,
  10,
  TRUE,
  'Esferas pulidas de cuarzo nieve marfil Grado AAA con dije de pez esculpido y cuentas cúbicas en Oro 18K.',
  '',
  '/images/shop/pulseras_arcanos/pulsera_08.jpeg',
  '{"tagline":"Esferas pulidas de cuarzo nieve marfil Grado AAA con dije de pez esculpido y cuentas cúbicas en Oro 18K.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'joya-09-pulsera-cornalina-citrino-solar',
  'ORO-09',
  'Talismán Solar Radiante: Cornalina de Madagascar & Citrino Ámbar con Oro',
  'joya-09-pulsera-cornalina-citrino-solar',
  'alta-joyeria-oro',
  3290,
  100,
  0,
  10,
  TRUE,
  'Rondelles de cornalina carmesí y esferas de citrino solar brillante Grado AAA con sutiles detalles dorados.',
  '',
  '/images/shop/pulseras_arcanos/pulsera_09.jpeg',
  '{"tagline":"Rondelles de cornalina carmesí y esferas de citrino solar brillante Grado AAA con sutiles detalles dorados.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'joya-10-pulsera-amazonita-cuarzo-oro',
  'ORO-10',
  'Talismán de Aguas Vivas: Pepitas de Amazonita & Cuarzo Cristalino en Oro 18K',
  'joya-10-pulsera-amazonita-cuarzo-oro',
  'alta-joyeria-oro',
  3290,
  100,
  0,
  10,
  TRUE,
  'Pepitas pulidas de amazonita verde azulada con esferas de cuarzo puro y separadores facetados en Oro 18K.',
  '',
  '/images/shop/pulseras_arcanos/pulsera_10.jpeg',
  '{"tagline":"Pepitas pulidas de amazonita verde azulada con esferas de cuarzo puro y separadores facetados en Oro 18K.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'pulsera-ambar-trebol-cuadrifolio',
  'AMB-01',
  'Talismán Cuadrifolio Solar: Trébol de Plata Ley .925 & Ámbar Puro de Chiapas',
  'talisman-cuadrifolio-plata-925-ambar-chiapas',
  'ambar-chiapas',
  2190,
  42,
  0,
  5,
  TRUE,
  'Símbolo ancestral de sincronicidad favorable. Plata legítima .925 y ámbar fósil chiapaneco de resplandor miel.',
  '',
  '/images/shop/pulseras/pulsera-ambar-trebol-plata.jpg',
  '{"tagline":"Símbolo ancestral de sincronicidad favorable. Plata legítima .925 y ámbar fósil chiapaneco de resplandor miel.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'pulsera-ambar-infinito-sagrado',
  'AMB-02',
  'Brazalete Infinito Sagrado: Ámbar Meloso de Chiapas & Plata Ley .925',
  'brazalete-infinito-amor-plata-925-ambar-chiapas',
  'ambar-chiapas',
  2190,
  42,
  0,
  5,
  TRUE,
  'Lazos de devoción eterna y resina solar fósil para sellar pactos del alma y lealtad áurea.',
  '',
  '/images/shop/pulseras/pulsera-ambar-plata-amor-por-siempre.jpg',
  '{"tagline":"Lazos de devoción eterna y resina solar fósil para sellar pactos del alma y lealtad áurea.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'pulsera-ambar-mano-fatima-hamsa',
  'AMB-03',
  'Hamsa Protectora de Plata .925 & Ámbar Fósil de Chiapas',
  'hamsa-protectora-plata-925-ambar-fosil-chiapas',
  'ambar-chiapas',
  2190,
  42,
  0,
  5,
  TRUE,
  'El escudo milenario de la Hamsa contra el mal de ojo, potenciado con el fuego solar del ámbar puro.',
  '',
  '/images/shop/pulseras/pulsera-ambar-mano-fatima-plata.jpg',
  '{"tagline":"El escudo milenario de la Hamsa contra el mal de ojo, potenciado con el fuego solar del ámbar puro.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'pulsera-ojo-tigre-verde-ambar',
  'AMB-04',
  'Talismán Visión del Felino: Ojo de Tigre Esmeralda & Trilogía de Ámbar Solar',
  'talisman-ojo-tigre-verde-trilogia-ambar-solar',
  'ambar-chiapas',
  3490,
  42,
  0,
  5,
  TRUE,
  'Reflejos de seda vegetal y resina fósil. Enfoque estratégico, valentía y transmutación de temores.',
  '',
  '/images/shop/pulseras/pulsera-ojo-tigre-verde-perlas-ambar.jpg',
  '{"tagline":"Reflejos de seda vegetal y resina fósil. Enfoque estratégico, valentía y transmutación de temores.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'pulsera-ambar-arbol-de-la-vida',
  'AMB-05',
  'Talismán Yggdrasil: Árbol de la Vida en Plata .925 con Cuentas de Ámbar',
  'talisman-yggdrasil-arbol-vida-plata-925-ambar',
  'ambar-chiapas',
  2190,
  42,
  0,
  5,
  TRUE,
  'Raíces profundas en la Madre Tierra y ramas alzadas hacia la luz estelar. Conexión biófila ancestral.',
  '',
  '/images/shop/pulseras/pulsera-ambar-plata-arbol-de-la-vida.jpg',
  '{"tagline":"Raíces profundas en la Madre Tierra y ramas alzadas hacia la luz estelar. Conexión biófila ancestral.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'pulsera-ambar-caricias-maternales',
  'AMB-06',
  'Amuleto Maternal Dulce Guarda: Cuentas Redondas de Ámbar Chiapaneco Puro',
  'amuleto-maternal-cuentas-ambar-puro-chiapas',
  'ambar-chiapas',
  2190,
  42,
  0,
  5,
  TRUE,
  'Calidez terapéutica y sosiego natural. Cuentas suaves de ámbar fósil certificadas para serenidad y descanso.',
  '',
  '/images/shop/pulseras/pulsera-ambar-chiapas-caricias-maternales.jpg',
  '{"tagline":"Calidez terapéutica y sosiego natural. Cuentas suaves de ámbar fósil certificadas para serenidad y descanso.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'pulsera-howlita-blanca-perla-ambar',
  'AMB-07',
  'Brazalete Nieve & Sol: Howlita Blanca Glacial & Gema Central de Ámbar',
  'brazalete-nieve-y-sol-howlita-blanca-ambar-chiapas',
  'ambar-chiapas',
  2190,
  42,
  0,
  5,
  TRUE,
  'Mármol interior de quietud zen coronado por la calidez lumínica de la resina solar de Chiapas.',
  '',
  '/images/shop/pulseras/pulsera-howlita-blanca-perla-ambar.jpg',
  '{"tagline":"Mármol interior de quietud zen coronado por la calidez lumínica de la resina solar de Chiapas.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'pulsera-ambar-chips-fluviales',
  'AMB-08',
  'Talismán Fluvial Primitivo: Astillas Pulidas (Chips) de Ámbar Puro de Chiapas',
  'talisman-chips-organicos-ambar-chiapas-autentico',
  'ambar-chiapas',
  2190,
  42,
  0,
  5,
  TRUE,
  'Cientos de millones de años de luz solar atrapada en fragmentos orgánicos de alta vibración mineral.',
  '',
  '/images/shop/pulseras/pulsera-ambar-chiapas-chips-fluviales.jpg',
  '{"tagline":"Cientos de millones de años de luz solar atrapada en fragmentos orgánicos de alta vibración mineral.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-10315875025146',
  'AMB-09',
  'Brazalete Maestro: Ámbar Báltico en Forma de Semilla',
  'aurum-brazalete-ambar-baltico-en-forma-de-semilla',
  'ambar-chiapas',
  2190,
  42,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.',
  'Ámbar de Chiapas',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/ambar_hilo_rojo_frontal_q90.webp?v=1790110314',
  '{"tagline":"Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.","stoneType":"Ámbar de Chiapas","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-9332230324474',
  'AMB-10',
  'Brazalete Maestro: Ámbar de Chiapas en Forma de Pucas',
  'aurum-brazalete-ambar-de-chiapas-en-forma-de-pucas',
  'ambar-chiapas',
  2190,
  42,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.',
  'Ámbar de Chiapas',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/1_b12204bb-df2d-43e8-b6d6-301404636f3b.jpg?v=1785107494',
  '{"tagline":"Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.","stoneType":"Ámbar de Chiapas","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-4103722139728',
  'AMB-11',
  'Brazalete Maestro: Perlas de Ámbar de Chiapas',
  'aurum-brazalete-perlas-de-ambar-de-chiapas-amarillo',
  'ambar-chiapas',
  2190,
  42,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.',
  'Ámbar de Chiapas',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/PulseradeAmbarfrontal.webp?v=1785862539',
  '{"tagline":"Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.","stoneType":"Ámbar de Chiapas","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-9331668877562',
  'AMB-12',
  'Brazalete Maestro: ámbar de Chiapas en forma de infinito',
  'aurum-brazalete-ambar-de-chiapas-en-forma-de-infinito',
  'ambar-chiapas',
  1580,
  42,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.',
  'Ámbar de Chiapas',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/Image20220413114229.jpg?v=1785021363',
  '{"tagline":"Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.","stoneType":"Ámbar de Chiapas","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7718280069370',
  'AMB-13',
  'Brazalete Maestro: Ojo de Tigre Multicolor con una Perla de Ámbar',
  'aurum-brazalete-ojo-de-tigre-multicolor-con-una-perla-de-ambar',
  'ambar-chiapas',
  1580,
  42,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.',
  'Ámbar de Chiapas',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/1_b7dfd0b6-1169-4c50-af97-38a7130ee6f9.jpg?v=1661458707',
  '{"tagline":"Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.","stoneType":"Ámbar de Chiapas","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-8743592952058',
  'AMB-14',
  'Brazalete Maestro: 7 Nudos con Ámbar de Chiapas',
  'aurum-brazalete-7-nudos-con-ambar-de-chiapas',
  'ambar-chiapas',
  2190,
  42,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.',
  'Ámbar de Chiapas',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/Image20250326145817.png?v=1743026010',
  '{"tagline":"Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.","stoneType":"Ámbar de Chiapas","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-8024831164666',
  'AMB-15',
  'Brazalete Maestro: Jade en Forma Cilíndrica con Ámbar',
  'aurum-brazalete-jade-en-forma-cilindrica-con-ambar',
  'ambar-chiapas',
  2190,
  42,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.',
  'Ámbar de Chiapas',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/1_3ff5a9b9-f81b-4621-a3a4-acffd9623c6f.jpg?v=1695760400',
  '{"tagline":"Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.","stoneType":"Ámbar de Chiapas","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7980475777274',
  'AMB-16',
  'Brazalete: con una Perla de Ámbar Grande, Jade y Ojo de Tigre',
  'aurum-brazalete-con-una-perla-de-ambar-grande-jade-y-ojo-de-tigre',
  'ambar-chiapas',
  2190,
  42,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.',
  'Ámbar de Chiapas',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/1_0ab6602f-5e9c-44cf-92ea-5db42e45d590.jpg?v=1685480200',
  '{"tagline":"Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.","stoneType":"Ámbar de Chiapas","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7923730153722',
  'AMB-17',
  'Brazalete Maestro: Ojo Turco Plano con 2 Perlas de Ámbar de Chiapas',
  'aurum-brazalete-ojo-turco-plano-con-2-perlas-de-ambar-de-chiapas',
  'ambar-chiapas',
  1580,
  41,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.',
  'Ámbar de Chiapas',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/1_6da46f19-03ec-43b7-8105-4f565870bae8.jpg?v=1677097783',
  '{"tagline":"Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.","stoneType":"Ámbar de Chiapas","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7840660291834',
  'AMB-18',
  'Brazalete Maestro: Jade y Ámbar de Chiapas',
  'aurum-brazalete-jade-y-ambar-de-chiapas',
  'ambar-chiapas',
  2190,
  41,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.',
  'Ámbar de Chiapas',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/5_681d526e-c6df-491f-b3c1-be7001685ab9.jpg?v=1668625353',
  '{"tagline":"Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.","stoneType":"Ámbar de Chiapas","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7799295377658',
  'AMB-19',
  'Brazalete Maestro: Ámbar Rojo de Perlas en Disminución',
  'aurum-brazalete-ambar-rojo-de-perlas-en-disminucion',
  'ambar-chiapas',
  2190,
  41,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.',
  'Ámbar de Chiapas',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/1_6a01ec2a-07cf-49e0-bd07-27a67b911000.jpg?v=1665080894',
  '{"tagline":"Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.","stoneType":"Ámbar de Chiapas","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7685333713146',
  'AMB-20',
  'Brazalete Maestro: Ámbar de Chiapas y Ojo Turco Azul',
  'aurum-brazalete-ambar-de-chiapas-y-ojo-turco-azul',
  'ambar-chiapas',
  2190,
  41,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.',
  'Ámbar de Chiapas',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/1_8691907d-29cf-4fd3-b070-21aa8cd672bc.jpg?v=1658511177',
  '{"tagline":"Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.","stoneType":"Ámbar de Chiapas","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7514339901690',
  'AMB-21',
  'Brazalete Maestro: plata con ámbar San Benito',
  'aurum-brazalete-plata-con-ambar-san-benito',
  'ambar-chiapas',
  2190,
  41,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.',
  'Ámbar de Chiapas',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/Image20220408151612.jpg?v=1649449764',
  '{"tagline":"Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.","stoneType":"Ámbar de Chiapas","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-6900315488450',
  'AMB-22',
  'Brazalete Maestro: Ámbar Con Plata Perfección Infinita',
  'aurum-brazalete-ambar-con-plata-perfeccion-infinita',
  'ambar-chiapas',
  2190,
  41,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.',
  'Ámbar de Chiapas',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/1_6d05ea76-1833-44e2-98ce-1dce1b7f328f.jpg?v=1770316269',
  '{"tagline":"Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.","stoneType":"Ámbar de Chiapas","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-6146742223042',
  'AMB-23',
  'Brazalete Maestro: Ámbar de Chiapas Inicio/Vida',
  'aurum-brazalete-ambar-de-chiapas-con-ojo-de-tigre-en-forma-de-semilla',
  'ambar-chiapas',
  2190,
  41,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.',
  'Ámbar de Chiapas',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/2_2f7bc147-aa87-443c-bf59-c719d6cb87dc.jpg?v=1649800220',
  '{"tagline":"Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.","stoneType":"Ámbar de Chiapas","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-4770983313488',
  'AMB-24',
  'Brazalete Maestro: Ámbar de Chiapas Fortaleza Natural',
  'aurum-brazalete-ambar-de-chiapas-con-ojo-de-tigre',
  'ambar-chiapas',
  2190,
  41,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.',
  'Ámbar de Chiapas',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/Image20250423151852_1.png?v=1745443368',
  '{"tagline":"Gemas naturales seleccionadas de Ámbar de Chiapas (8mm & Chips). Acabado artesanal de alta durabilidad.","stoneType":"Ámbar de Chiapas","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'quemador-rio-doble-basalto',
  'DBP-01',
  'Quemador de Basalto de Río – Doble Perforación',
  'quemador-rio-doble-basalto-ceremonial',
  'doble-perforacion',
  980,
  91,
  0,
  9,
  TRUE,
  'Piedra de basalto oscuro con doble orificio para combustión dual simultánea.',
  '',
  '/images/shop/basalt_incense_holder_1.jpg',
  '{"tagline":"Piedra de basalto oscuro con doble orificio para combustión dual simultánea.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'quemador-rio-doble-oro-alquimico',
  'DBP-02',
  'Quemador de Río Áureo – Doble Perforación Ceremonial',
  'quemador-rio-doble-oro-alquimico',
  'doble-perforacion',
  980,
  91,
  0,
  9,
  TRUE,
  'Canto rodado con detalles áureos consagrados al fuego y dos orificios para varillas aromáticas.',
  '',
  '/images/shop/gold_painted_river_stone_incense_holder.jpg',
  '{"tagline":"Canto rodado con detalles áureos consagrados al fuego y dos orificios para varillas aromáticas.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'quemador-rio-doble-artesanal',
  'DBP-03',
  'Quemador de Río Rústico – Doble Perforación Zen',
  'quemador-rio-doble-artesanal-zen',
  'doble-perforacion',
  980,
  91,
  0,
  9,
  TRUE,
  'Piedra de río natural con textura fluvial virgen y doble taladro artesanal.',
  '',
  '/images/shop/handmade_river_stone_incense_holder.jpg',
  '{"tagline":"Piedra de río natural con textura fluvial virgen y doble taladro artesanal.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'quemador-rio-doble-purpura-tarot',
  'DBP-04',
  'Quemador Fluvial Púrpura – Doble Perforación Oracular',
  'quemador-fluvial-purpura-doble-perforacion-oracular',
  'doble-perforacion',
  980,
  91,
  0,
  9,
  TRUE,
  'Piedra con tonalidad mística púrpura y doble taladro para sahumerio de cartas.',
  '',
  '/images/shop/purple_tarot_incense_holder.jpg',
  '{"tagline":"Piedra con tonalidad mística púrpura y doble taladro para sahumerio de cartas.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'quemador-rio-doble-reiki-simbolos',
  'DBP-05',
  'Quemador Reiki Sagrado – Doble Perforación de Sanación',
  'quemador-reiki-sagrado-doble-perforacion',
  'doble-perforacion',
  980,
  91,
  0,
  9,
  TRUE,
  'Símbolos de armonización pintados a mano y dos orificios para inciensos de purificación.',
  '',
  '/images/shop/reiki_stone_incense_holder.jpg',
  '{"tagline":"Símbolos de armonización pintados a mano y dos orificios para inciensos de purificación.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'quemador-rio-doble-canto-n14',
  'DBP-06',
  'Canto Rodado Fluvial N° 14 – Doble Perforación',
  'canto-rodado-fluvial-14-doble-perforacion',
  'doble-perforacion',
  980,
  91,
  0,
  9,
  TRUE,
  'Forma anatómica de río seleccionada con perforación dual simétrica.',
  '',
  '/images/shop/river_stone_incense_holder_14.jpg',
  '{"tagline":"Forma anatómica de río seleccionada con perforación dual simétrica.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'quemador-rio-doble-canto-n15',
  'DBP-07',
  'Canto Rodado Fluvial N° 15 – Doble Perforación de Altar',
  'canto-rodado-fluvial-15-doble-perforacion-altar',
  'doble-perforacion',
  980,
  91,
  0,
  9,
  TRUE,
  'Base plana perfecta y doble taladro para mezclar aromas de madera y flores.',
  '',
  '/images/shop/river_stone_incense_holder_15.jpg',
  '{"tagline":"Base plana perfecta y doble taladro para mezclar aromas de madera y flores.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'quemador-rio-doble-borgoña',
  'DBP-08',
  'Piedra de Río Tono Borgoña – Doble Perforación',
  'piedra-rio-tono-borgoña-doble-perforacion',
  'doble-perforacion',
  980,
  91,
  0,
  9,
  TRUE,
  'Vetas rojizas y terrosas de río con perforación doble para sahumado dual.',
  '',
  '/images/shop/burgundy_stone_incense_holder.jpg',
  '{"tagline":"Vetas rojizas y terrosas de río con perforación doble para sahumado dual.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'quemador-rio-doble-bosque-profundo',
  'DBP-09',
  'Piedra Fluvial Bosque Profundo – Doble Perforación',
  'piedra-fluvial-bosque-profundo-doble-perforacion',
  'doble-perforacion',
  980,
  91,
  0,
  9,
  TRUE,
  'Tonalidad mineral verde-oliva oscura con dos orificios de combustión vertical.',
  '',
  '/images/shop/image_20260918_104707.jpg',
  '{"tagline":"Tonalidad mineral verde-oliva oscura con dos orificios de combustión vertical.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'quemador-rio-doble-terracota',
  'DBP-10',
  'Canto Rodado Terracota Natural – Doble Orificio',
  'canto-rodado-terracota-natural-doble-orificio',
  'doble-perforacion',
  980,
  91,
  0,
  9,
  TRUE,
  'Calidez de tierra y agua con orificios duales para varillas aromáticas.',
  '',
  '/images/shop/image_20260918_105459.jpg',
  '{"tagline":"Calidez de tierra y agua con orificios duales para varillas aromáticas.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'quemador-rio-doble-rustica-ancestral',
  'DBP-11',
  'Piedra Ancestral de Río – Doble Perforación Rústica',
  'piedra-ancestral-rio-doble-perforacion-rustica',
  'doble-perforacion',
  980,
  90,
  0,
  9,
  TRUE,
  'Piedra robusta con presencia rústica y doble taladro para rituales prolongados.',
  '',
  '/images/shop/image_20260918_105509.jpg',
  '{"tagline":"Piedra robusta con presencia rústica y doble taladro para rituales prolongados.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'trio-piedras-reiki-cho-ku-rei',
  'RKI-01',
  'Trío Sagrado de Río – Símbolo Cho Ku Rei (Reiki)',
  'trio-sagrado-rio-simbolo-cho-ku-rei-reiki',
  'reiki-sanacion',
  980,
  250,
  0,
  25,
  TRUE,
  'Conjunto de 3 piedras de río pintadas a mano con el símbolo de poder y protección Reiki.',
  '',
  '/images/shop/cho_ku_rei_pebbles.jpg',
  '{"tagline":"Conjunto de 3 piedras de río pintadas a mano con el símbolo de poder y protección Reiki.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'canto-rio-cho-ku-rei-oro',
  'RKI-02',
  'Canto Rodado Cho Ku Rei en Oro Alquímico',
  'canto-rodado-cho-ku-rei-oro-alquimico',
  'reiki-sanacion',
  980,
  250,
  0,
  25,
  TRUE,
  'Piedra de palma con el símbolo Cho Ku Rei en trazo áureo consagrado a la luna para anclar energía vital.',
  '',
  '/images/shop/gold_cho_ku_rei_pebble.jpg',
  '{"tagline":"Piedra de palma con el símbolo Cho Ku Rei en trazo áureo consagrado a la luna para anclar energía vital.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'piedra-bruja-hagstone-reiki-oro',
  'RKI-03',
  'Piedra Bruja Fluvial (Hagstone) con Oro Sagrado',
  'piedra-bruja-fluvial-hagstone-oro-sagrado',
  'reiki-sanacion',
  980,
  250,
  0,
  25,
  TRUE,
  'Piedra con perforación natural creada por el agua y detalles dorados sagrados.',
  '',
  '/images/shop/reiki_hagstone_gold.jpg',
  '{"tagline":"Piedra con perforación natural creada por el agua y detalles dorados sagrados.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'piedra-meditacion-reiki-dorada',
  'RKI-04',
  'Piedra de Meditación Reiki – Destellos Áureos',
  'piedra-meditacion-reiki-destellos-aureos',
  'reiki-sanacion',
  980,
  250,
  0,
  25,
  TRUE,
  'Canto rodado suave para imposición de manos, meditación y alineación de chakras.',
  '',
  '/images/shop/reiki_pebble_gold.jpg',
  '{"tagline":"Canto rodado suave para imposición de manos, meditación y alineación de chakras.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'juego-quemador-piedra-aura-runas',
  'RUN-01',
  'Juego de Quemador de Incienso de Piedra Aura Runas',
  'juego-quemador-piedra-aura-runas',
  'portainciensos-y-runas',
  980,
  250,
  0,
  25,
  TRUE,
  'Soporte de piedra de río taladrado a mano con Runas Sagradas y 12 varitas de incienso.',
  '',
  '/images/shop/piedra-aura-runas-dorada.png',
  '{"tagline":"Soporte de piedra de río taladrado a mano con Runas Sagradas y 12 varitas de incienso.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'juego-quemador-piedra-aura',
  'RUN-02',
  '🌿 Juego de Quemador de Incienso de Piedra Aura',
  'juego-quemador-piedra-aura',
  'portainciensos-y-runas',
  980,
  250,
  0,
  25,
  TRUE,
  'Soporte de río taladrado a mano + paquete de 12 varitas Bosque Sagrado.',
  '',
  '/images/shop/piedra-redonda-mandala-dorado.png',
  '{"tagline":"Soporte de río taladrado a mano + paquete de 12 varitas Bosque Sagrado.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'piedra-aura-dorada-ritual',
  'RUN-03',
  '💫 Piedra Aura Dorada – Edición Ritual',
  'piedra-aura-dorada-edicion-ritual',
  'portainciensos-y-runas',
  980,
  250,
  0,
  25,
  TRUE,
  'Piedra de río tallada y pintada a mano con símbolos de protección y equilibrio.',
  '',
  '/images/shop/piedra-aura-corazon-chakras.png',
  '{"tagline":"Piedra de río tallada y pintada a mano con símbolos de protección y equilibrio.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'piedra-ovalada-runas-dremel',
  'RUN-04',
  'Piedra Rúnica Nórdica – Sello de Poder Ancestral',
  'piedra-runica-nordica-poder-ancestral',
  'portainciensos-y-runas',
  980,
  250,
  0,
  25,
  TRUE,
  'Runas del Futhark Antiguo talladas en relieve dremel con pátina oro nórdico.',
  '',
  '/images/shop/piedra-ovalada-runas-dremel.png',
  '{"tagline":"Runas del Futhark Antiguo talladas en relieve dremel con pátina oro nórdico.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'piedra-rio-simbolo-solar',
  'GEO-01',
  'Piedra de Río Símbolo Solar Ancestral',
  'piedra-rio-simbolo-solar-ancestral',
  'simbolos-y-geometria',
  980,
  72,
  0,
  7,
  TRUE,
  'Pintado a mano del sol radiante primitivo sobre piedra pulida por el río.',
  '',
  '/images/shop/river_stone_sun_symbol.jpg',
  '{"tagline":"Pintado a mano del sol radiante primitivo sobre piedra pulida por el río.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'piedra-colgante-loto-borgoña',
  'GEO-02',
  'Piedra Amuleto Loto Sagrado – Tono Borgoña',
  'piedra-amuleto-loto-sagrado-borgoña',
  'simbolos-y-geometria',
  980,
  72,
  0,
  7,
  TRUE,
  'Canto rodado con flor de loto en relieve dorado y matiz borgoña profundo.',
  '',
  '/images/shop/burgundy_lotus_pendant.jpg',
  '{"tagline":"Canto rodado con flor de loto en relieve dorado y matiz borgoña profundo.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'quemador-rio-pintado-orquidea-dorada',
  'GEO-03',
  'Quemador de Río Ilustrado – Motivos Celestiales',
  'quemador-rio-ilustrado-motivos-celestiales',
  'simbolos-y-geometria',
  980,
  72,
  0,
  7,
  TRUE,
  'Soporte taladrado para incienso con ilustración sagrada áurea consagrada al fuego.',
  '',
  '/images/shop/painted_river_stone_incense_holder.jpg',
  '{"tagline":"Soporte taladrado para incienso con ilustración sagrada áurea consagrada al fuego.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'piedra-rio-pintada-motivos-sagrados',
  'GEO-04',
  'Piedra Fluvial Ilustrada – Geometría Sagrada',
  'piedra-fluvial-ilustrada-geometria-sagrada',
  'simbolos-y-geometria',
  980,
  72,
  0,
  7,
  TRUE,
  'Pintura ritual con pigmentos áureos y sellado mate sobre roca de río.',
  '',
  '/images/shop/painted_river_stone.jpg',
  '{"tagline":"Pintura ritual con pigmentos áureos y sellado mate sobre roca de río.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'piedra-plana-flor-de-la-vida',
  'GEO-05',
  'Piedra Plana Flor de la Vida – Geometría Sagrada',
  'piedra-plana-flor-de-la-vida-geometria-sagrada',
  'simbolos-y-geometria',
  980,
  72,
  0,
  7,
  TRUE,
  'Canto rodado plano con la matriz de la Flor de la Vida grabada artesanalmente.',
  '',
  '/images/shop/piedra-plana-flor-de-la-vida.png',
  '{"tagline":"Canto rodado plano con la matriz de la Flor de la Vida grabada artesanalmente.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'piedra-blanca-luna-estrellas',
  'GEO-06',
  'Piedra Natural Blanca – Luna Mística & Constelaciones',
  'piedra-blanca-luna-estrellas-altar-nocturno',
  'simbolos-y-geometria',
  980,
  72,
  0,
  7,
  TRUE,
  'Piedra blanca de río ilustrada a mano con luna creciente y cielo nocturno.',
  '',
  '/images/shop/piedra-blanca-luna-estrellas.png',
  '{"tagline":"Piedra blanca de río ilustrada a mano con luna creciente y cielo nocturno.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'piedra-triple-luna-fases',
  'GEO-07',
  'Piedra Triple Luna – Arquetipos de la Diosa',
  'piedra-triple-luna-fases-hecate',
  'simbolos-y-geometria',
  980,
  71,
  0,
  7,
  TRUE,
  'Las tres fases sagradas (Doncella, Madre y Anciana) cinceladas en río.',
  '',
  '/images/shop/piedra-triple-luna-fases.png',
  '{"tagline":"Las tres fases sagradas (Doncella, Madre y Anciana) cinceladas en río.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'piedra-sol-cara-dorado',
  'GEO-08',
  'Piedra Solar Alquímica – Rostro del Sol de Medianoche',
  'piedra-solar-alquimica-rostro-dorado',
  'simbolos-y-geometria',
  980,
  71,
  0,
  7,
  TRUE,
  'Sol radiante cincelado con expresión solemne y destellos dorados.',
  '',
  '/images/shop/piedra-sol-cara-dorado.png',
  '{"tagline":"Sol radiante cincelado con expresión solemne y destellos dorados.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'piedra-sol-dual-dorado',
  'GEO-09',
  'Piedra Sol Dual – Polaridad & Luz Interior',
  'piedra-sol-dual-polaridad-y-equilibrio',
  'simbolos-y-geometria',
  980,
  71,
  0,
  7,
  TRUE,
  'Canto de río con mitad dorada reflectante y rayos en contraste.',
  '',
  '/images/shop/piedra-sol-dual-dorado.png',
  '{"tagline":"Canto de río con mitad dorada reflectante y rayos en contraste.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'piedra-om-tallado',
  'GEO-10',
  'Piedra Sagrada Mantra OM – Vibración Primordial',
  'piedra-sagrada-om-vibracion-primordial',
  'simbolos-y-geometria',
  980,
  71,
  0,
  7,
  TRUE,
  'Glifo sánscrito sagrado del OM tallado sobre canto rodado pulido por el agua.',
  '',
  '/images/shop/piedra-om-tallado.png',
  '{"tagline":"Glifo sánscrito sagrado del OM tallado sobre canto rodado pulido por el agua.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'piedra-ojo-turco',
  'GEO-11',
  'Piedra Amuleto Ojo Turco – Escudo Nazar',
  'piedra-amuleto-ojo-turco-nazar',
  'simbolos-y-geometria',
  980,
  71,
  0,
  7,
  TRUE,
  'Canto rodado pintado a mano con el amuleto tradicional contra malas energías.',
  '',
  '/images/shop/piedra-ojo-turco.png',
  '{"tagline":"Canto rodado pintado a mano con el amuleto tradicional contra malas energías.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'piedra-ovalada-mandala-loto',
  'GEO-12',
  'Piedra Ovalada Mandala Loto – Despertar & Serenidad',
  'piedra-ovalada-mandala-loto-6-petalos',
  'simbolos-y-geometria',
  980,
  71,
  0,
  7,
  TRUE,
  'Mandala de loto de 6 pétalos grabado con dremel sobre piedra ovalada de río.',
  '',
  '/images/shop/piedra-ovalada-mandala-loto.png',
  '{"tagline":"Mandala de loto de 6 pétalos grabado con dremel sobre piedra ovalada de río.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'piedra-7-chakras-puntos',
  'GEO-13',
  'Piedra de Alineación 7 Chakras – Centros Sutiles',
  'piedra-alineacion-7-chakras-vortices',
  'simbolos-y-geometria',
  980,
  71,
  0,
  7,
  TRUE,
  'Piedra fluvial con la secuencia de vórtices energéticos punteada a mano.',
  '',
  '/images/shop/piedra-7-chakras-puntos.png',
  '{"tagline":"Piedra fluvial con la secuencia de vórtices energéticos punteada a mano.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'piedra-corazon-infinito',
  'GEO-14',
  'Piedra Corazón Infinito – Amor Sagrado & Vínculo',
  'piedra-corazon-infinito-amor-sagrado',
  'simbolos-y-geometria',
  980,
  71,
  0,
  7,
  TRUE,
  'Piedra de río con el lazo infinito entrelazado con el corazón sagrado.',
  '',
  '/images/shop/piedra-corazon-infinito.png',
  '{"tagline":"Piedra de río con el lazo infinito entrelazado con el corazón sagrado.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'piedra-natural-11-11',
  'ANG-01',
  'Piedra de Río Portal 11:11 – Manifestación Angélica',
  'piedra-rio-alargada-portal-11-11',
  'frecuencias-angelicales',
  980,
  334,
  0,
  33,
  TRUE,
  'Piedra alargada con grabado dremel del código sincrónico 11:11 en oro.',
  '',
  '/images/shop/piedra-natural-11-11.png',
  '{"tagline":"Piedra alargada con grabado dremel del código sincrónico 11:11 en oro.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'piedra-oscura-777-dorado',
  'ANG-02',
  'Piedra Oscura Frecuencia 777 – Sincronía Divina',
  'piedra-oscura-frecuencia-777-sincronia-divina',
  'frecuencias-angelicales',
  980,
  333,
  0,
  33,
  TRUE,
  'Canto rodado oscuro con el número sagrado 777 en trazo áureo consagrado al fuego y la luna.',
  '',
  '/images/shop/piedra-oscura-777-dorado.png',
  '{"tagline":"Canto rodado oscuro con el número sagrado 777 en trazo áureo consagrado al fuego y la luna.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'piedra-numero-444',
  'ANG-03',
  'Piedra Angélica 444 – Protección y Fundación',
  'piedra-angelica-444-proteccion-guia',
  'frecuencias-angelicales',
  980,
  333,
  0,
  33,
  TRUE,
  'Piedra de río grabada con el 444, sello de amparo y seguridad espiritual.',
  '',
  '/images/shop/piedra-numero-444.png',
  '{"tagline":"Piedra de río grabada con el 444, sello de amparo y seguridad espiritual.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'bandeja-altar-rio-cenizas-incienso',
  'SAH-01',
  'Bandeja Ceremonial de Río para Incienso & Cenizas',
  'bandeja-ceremonial-rio-incienso-cenizas',
  'sahumerios-y-kits',
  1380,
  167,
  0,
  16,
  TRUE,
  'Plato de piedra natural para depositar cenizas, quemar resinas o colocar varillas.',
  '',
  '/images/shop/river_stone_incense_tray.jpg',
  '{"tagline":"Plato de piedra natural para depositar cenizas, quemar resinas o colocar varillas.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'bandeja-altar-piedras-tarot',
  'SAH-02',
  'Bandeja de Altar Fluvial para Lecturas de Tarot',
  'bandeja-altar-fluvial-lecturas-tarot',
  'sahumerios-y-kits',
  1380,
  167,
  0,
  16,
  TRUE,
  'Set de bandeja y piedras consagradas para acompañar la mesa del tarotista.',
  '',
  '/images/shop/tarot_stones_tray.jpg',
  '{"tagline":"Set de bandeja y piedras consagradas para acompañar la mesa del tarotista.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'kit-altar-mistico-incienso-flatlay',
  'SAH-03',
  'Kit de Altar Místico con Piedra & Varillas Sagradas',
  'kit-altar-mistico-piedra-varillas-sagradas',
  'sahumerios-y-kits',
  1380,
  167,
  0,
  16,
  TRUE,
  'Conjunto completo con quemador de río, varillas botánicas y elementos de altar.',
  '',
  '/images/shop/mystical_incense_tarot_flatlay.jpg',
  '{"tagline":"Conjunto completo con quemador de río, varillas botánicas y elementos de altar.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'kit-ceremonial-plano-incienso',
  'SAH-04',
  'Set Ceremonial de Incienso & Soporte de Piedra',
  'set-ceremonial-incienso-soporte-piedra',
  'sahumerios-y-kits',
  1380,
  167,
  0,
  16,
  TRUE,
  'Edición con quemador de río, incienso natural y guía de armonización.',
  '',
  '/images/shop/incense_kit_flatlay.jpg',
  '{"tagline":"Edición con quemador de río, incienso natural y guía de armonización.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'kit-limpia-runas-salvia-palosanto',
  'SAH-05',
  'Kit Ceremonial Limpia Runas con Salvia & Palo Santo',
  'kit-limpia-runas-salvia-blanca-palo-santo',
  'sahumerios-y-kits',
  1380,
  166,
  0,
  16,
  TRUE,
  'Plato de piedra de río para sahumado, atado de salvia blanca y palo santo.',
  '',
  '/images/shop/kit-limpia-runas-salvia-palosanto.png',
  '{"tagline":"Plato de piedra de río para sahumado, atado de salvia blanca y palo santo.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'set-incienso-bosque-sagrado',
  'SAH-06',
  '🪶 Set de Incienso «Bosque Sagrado»',
  'set-incienso-bosque-sagrado',
  'sahumerios-y-kits',
  1380,
  166,
  0,
  16,
  TRUE,
  '12 varitas artesanales de resinas naturales y aceites esenciales de monte.',
  '',
  '/images/shop/inciensos-y-resinas.jpg',
  '{"tagline":"12 varitas artesanales de resinas naturales y aceites esenciales de monte.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'pulsera-transmutacion-amatista',
  'TAL-01',
  'Talismán de Transmutación: Amatista Profunda',
  'pulsera-transmutacion-amatista',
  'talismanes',
  1580,
  24,
  0,
  5,
  TRUE,
  'Amatistas violeta oscuro con gota de cuarzo rosa rústico central.',
  '',
  '/images/shop/talismanes/pulsera-transmutacion-amatista.jpg',
  '{"tagline":"Amatistas violeta oscuro con gota de cuarzo rosa rústico central.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'pulsera-fuego-sagrado-jaspe-rojo',
  'TAL-02',
  'Talismán del Fuego Sagrado: Jaspe Rojo & Ojo de Tigre',
  'pulsera-fuego-sagrado-jaspe-rojo',
  'talismanes',
  950,
  24,
  0,
  5,
  TRUE,
  'Astillas rústicas de jaspe rojo con cuarzo cristalino central en bruto y ojo de tigre.',
  '',
  '/images/shop/talismanes/pulsera-fuego-sagrado-jaspe-rojo.jpg',
  '{"tagline":"Astillas rústicas de jaspe rojo con cuarzo cristalino central en bruto y ojo de tigre.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'pulsera-vision-oracular-sodalita',
  'TAL-03',
  'Talismán de Visión Oracular: Sodalita Azul',
  'pulsera-vision-oracular-sodalita',
  'talismanes',
  1480,
  24,
  0,
  5,
  TRUE,
  'Bloques rectangulares macizos de sodalita azul con vetas de calcita blanca.',
  '',
  '/images/shop/talismanes/pulsera-vision-oracular-sodalita.jpg',
  '{"tagline":"Bloques rectangulares macizos de sodalita azul con vetas de calcita blanca.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'pulsera-alquimia-solar-cornalina',
  'TAL-04',
  'Talismán de Alquimia Solar: Cornalina Ámbar',
  'pulsera-alquimia-solar-cornalina',
  'talismanes',
  1480,
  24,
  0,
  5,
  TRUE,
  'Rondelles de cornalina roja translúcida y cuentas esféricas de ámbar/calcita amarilla.',
  '',
  '/images/shop/talismanes/pulsera-alquimia-solar-cornalina.jpg',
  '{"tagline":"Rondelles de cornalina roja translúcida y cuentas esféricas de ámbar/calcita amarilla.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'pulsera-bosque-profundo-malaquita',
  'TAL-05',
  'Talismán Bosque Profundo: Malaquita Verde',
  'pulsera-bosque-profundo-malaquita',
  'talismanes',
  1580,
  24,
  0,
  5,
  TRUE,
  'Cuentas de malaquita verde veteada con acento mineral de unakita y cuarzo rosa.',
  '',
  '/images/shop/talismanes/pulsera-bosque-profundo-malaquita.jpg',
  '{"tagline":"Cuentas de malaquita verde veteada con acento mineral de unakita y cuarzo rosa.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'pulsera-escudo-telurico-jaspe-dalmata',
  'TAL-06',
  'Talismán Escudo Telúrico: Jaspe Dálmata',
  'pulsera-escudo-telurico-jaspe-dalmata',
  'talismanes',
  950,
  24,
  0,
  5,
  TRUE,
  'Jaspe dálmata punteado, ojo de tigre dorado y cornalina.',
  '',
  '/images/shop/talismanes/pulsera-escudo-telurico-jaspe-dalmata.jpg',
  '{"tagline":"Jaspe dálmata punteado, ojo de tigre dorado y cornalina.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'pulsera-sombra-y-luz-cuentas-oscuras',
  'TAL-07',
  'Talismán Sombra y Luz: Cuentas Oscuras & Sol',
  'pulsera-sombra-y-luz-cuentas-oscuras',
  'talismanes',
  1480,
  24,
  0,
  5,
  TRUE,
  'Cuentas oscuras facetadas de hematita y cuarzo ahumado con dije de disco central.',
  '',
  '/images/shop/talismanes/pulsera-sombra-y-luz-cuentas-oscuras.jpg',
  '{"tagline":"Cuentas oscuras facetadas de hematita y cuarzo ahumado con dije de disco central.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'pulsera-luz-lunar-cuarzo-marfil',
  'TAL-08',
  'Talismán Luz Lunar: Cuarzo Marfil & Pez Dorado',
  'pulsera-luz-lunar-cuarzo-marfil',
  'talismanes',
  1480,
  24,
  0,
  5,
  TRUE,
  'Cuentas esféricas de cuarzo marfil pulido con separadores dorados y dije de pez esculpido.',
  '',
  '/images/shop/talismanes/pulsera-luz-lunar-cuarzo-marfil.jpg',
  '{"tagline":"Cuentas esféricas de cuarzo marfil pulido con separadores dorados y dije de pez esculpido.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-10315843469562',
  'TAL-09',
  'Brazalete Maestro: Hematita en Forma de Flecha Pulida',
  'aurum-brazalete-hematita-en-forma-de-flecha-pulida',
  'talismanes',
  950,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Hematita Pulida (Geométrica / Flecha). Acabado artesanal de alta durabilidad.',
  'Hematita Pulida',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/hematita_flecha_frontal_nudo_q90.webp?v=1790109888',
  '{"tagline":"Gemas naturales seleccionadas de Hematita Pulida (Geométrica / Flecha). Acabado artesanal de alta durabilidad.","stoneType":"Hematita Pulida","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-9182449959162',
  'TAL-10',
  'Brazalete Maestro: Labradorita Premium y Obsidiana Dorada',
  'aurum-brazalete-labradorita-premium-y-obsidiana-dorada',
  'talismanes',
  1680,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Labradorita Espectral (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Labradorita Espectral',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/Image20260408164532.png?v=1775688681',
  '{"tagline":"Gemas naturales seleccionadas de Labradorita Espectral (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Labradorita Espectral","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-9181517316346',
  'TAL-11',
  'Brazalete Maestro: Citrino Premium Tonalidad Natural',
  'aurum-brazalete-citrino-tonalidad-natural',
  'talismanes',
  1680,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Citrino Dorado (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Citrino Dorado',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/Image20260407202817.png?v=1775615996',
  '{"tagline":"Gemas naturales seleccionadas de Citrino Dorado (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Citrino Dorado","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7590458196218',
  'TAL-12',
  'Brazalete Maestro: Ojo Turco Rojo y Ónix',
  'aurum-brazalete-ojo-turco-y-onix',
  'talismanes',
  950,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Ojo de Tigre & Halcón (8mm & 10mm). Acabado artesanal de alta durabilidad.',
  'Ojo de Tigre & Halcón',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/3_7da1affb-d719-4020-b235-0979e96d9cd1.jpg?v=1649958241',
  '{"tagline":"Gemas naturales seleccionadas de Ojo de Tigre & Halcón (8mm & 10mm). Acabado artesanal de alta durabilidad.","stoneType":"Ojo de Tigre & Halcón","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-8925826121978',
  'TAL-13',
  'Brazalete: del Zodiaco',
  'aurum-brazalete-del-zodiaco',
  'talismanes',
  1480,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Minerales del Zodiaco (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Minerales del Zodiaco',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/Aries.jpg?v=1758132333',
  '{"tagline":"Gemas naturales seleccionadas de Minerales del Zodiaco (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Minerales del Zodiaco","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-8868702847226',
  'TAL-14',
  'Brazalete: Signos del Zodiaco',
  'aurum-brazalete-signos-del-zodiaco',
  'talismanes',
  1480,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Minerales del Zodiaco (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Minerales del Zodiaco',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/Disenosintitulo_11_0cf75f0d-3632-4987-871e-8047ea30a1a9.jpg?v=1753380745',
  '{"tagline":"Gemas naturales seleccionadas de Minerales del Zodiaco (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Minerales del Zodiaco","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-8766441619706',
  'TAL-15',
  'Brazalete Maestro: Lapislázuli con Plata',
  'aurum-brazalete-lapislazuli-con-plata',
  'talismanes',
  1680,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Lapislázuli Real (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Lapislázuli Real',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/Image20250416162202.png?v=1744843472',
  '{"tagline":"Gemas naturales seleccionadas de Lapislázuli Real (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Lapislázuli Real","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-8760829214970',
  'TAL-16',
  'Brazalete Maestro: Ojo Turco Azul y jaspe Rojo',
  'aurum-brazalete-ojo-turco-azul-y-jaspe-rojo',
  'talismanes',
  950,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Ojo de Tigre & Halcón (8mm & 10mm). Acabado artesanal de alta durabilidad.',
  'Ojo de Tigre & Halcón',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/Image20250409154910_1.jpg?v=1744235457',
  '{"tagline":"Gemas naturales seleccionadas de Ojo de Tigre & Halcón (8mm & 10mm). Acabado artesanal de alta durabilidad.","stoneType":"Ojo de Tigre & Halcón","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-8630025847034',
  'TAL-17',
  'Brazalete Maestro: Jaspe Rojo',
  'aurum-brazalete-jaspe-rojo',
  'talismanes',
  950,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Jaspe Rojo Imperial (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Jaspe Rojo Imperial',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/1_3_df396902-b013-42f8-8c95-6a6a607bb9e6.jpg?v=1756937839',
  '{"tagline":"Gemas naturales seleccionadas de Jaspe Rojo Imperial (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Jaspe Rojo Imperial","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-8476277407994',
  'TAL-18',
  'Brazalete Maestro: Obsidiana Copo de Nieve',
  'aurum-brazalete-obsidiana-copo-de-nieve',
  'talismanes',
  1580,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Obsidiana Dorada (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Obsidiana Dorada',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/9_269d2678-a5e4-4b19-9337-137b0954e66b.jpg?v=1717002450',
  '{"tagline":"Gemas naturales seleccionadas de Obsidiana Dorada (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Obsidiana Dorada","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-8192829030650',
  'TAL-19',
  'Brazalete: Triple Protección Amatista',
  'aurum-brazalete-triple-proteccion-amatista',
  'talismanes',
  1580,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Amatista Sagrada (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Amatista Sagrada',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/1_2e72435b-a27b-494b-b7a3-30483cf5208f.jpg?v=1709238038',
  '{"tagline":"Gemas naturales seleccionadas de Amatista Sagrada (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Amatista Sagrada","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-8192825884922',
  'TAL-20',
  'Brazalete: Sangre de Dragón',
  'aurum-brazalete-sangre-de-dragon',
  'talismanes',
  1480,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Mineral Sagrado (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Mineral Sagrado',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/1_d41d81e5-367b-472d-9290-af78a3a9d0b1.jpg?v=1739469931',
  '{"tagline":"Gemas naturales seleccionadas de Mineral Sagrado (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Mineral Sagrado","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-8192816251130',
  'TAL-21',
  'Brazalete Maestro: Turmalina Sandía',
  'aurum-brazalete-turmalina-sandia',
  'talismanes',
  1680,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Turmalina Negra (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Turmalina Negra',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/5_9338733d-b129-4276-a7b9-45c348bda3e0.jpg?v=1709237063',
  '{"tagline":"Gemas naturales seleccionadas de Turmalina Negra (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Turmalina Negra","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-8151200497914',
  'TAL-22',
  'Brazalete Maestro: Jade Tonalidad Verde Manzano',
  'aurum-brazalete-jade-tonalidad-verde-manzano',
  'talismanes',
  1580,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Jade Nefrita (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Jade Nefrita',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/1_335a3e30-9095-4e93-afed-3b1bbfc1dd0b.jpg?v=1706032756',
  '{"tagline":"Gemas naturales seleccionadas de Jade Nefrita (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Jade Nefrita","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-8027023868154',
  'TAL-23',
  'Brazalete Maestro: Pirita',
  'aurum-brazalete-pirita',
  'talismanes',
  1580,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Pirita Dorada (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Pirita Dorada',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/5_bd7c1c76-cb5b-4429-aea8-d7af3836e175.jpg?v=1739469785',
  '{"tagline":"Gemas naturales seleccionadas de Pirita Dorada (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Pirita Dorada","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7980713148666',
  'TAL-24',
  'Collar 7 Chakras',
  'aurum-collar-7-chakras',
  'talismanes',
  1480,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Mineral Sagrado (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Mineral Sagrado',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/1_6b856479-f277-4e75-9ff2-9a300af4a517.jpg?v=1685553947',
  '{"tagline":"Gemas naturales seleccionadas de Mineral Sagrado (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Mineral Sagrado","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7943728136442',
  'TAL-25',
  'Brazalete Maestro: Citrino',
  'aurum-brazalete-citrino',
  'talismanes',
  1680,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Citrino Dorado (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Citrino Dorado',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/1_75d1ed8d-1c8f-4a1e-a109-078d2def2f4c.jpg?v=1739472002',
  '{"tagline":"Gemas naturales seleccionadas de Citrino Dorado (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Citrino Dorado","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7943726596346',
  'TAL-26',
  'Brazalete Maestro: Turmalina Negra',
  'aurum-brazalete-turmalina-negra',
  'talismanes',
  1680,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Turmalina Negra (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Turmalina Negra',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/5_2fa637a1-3984-4851-963b-de18d39077d3.jpg?v=1679687830',
  '{"tagline":"Gemas naturales seleccionadas de Turmalina Negra (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Turmalina Negra","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7893978087674',
  'TAL-27',
  'Brazalete Maestro: Piedra Luna',
  'aurum-brazalete-piedra-luna',
  'talismanes',
  1680,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Mineral Sagrado (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Mineral Sagrado',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/5_05f82759-1004-4c0f-9894-ac8c08eb2a26.jpg?v=1739469457',
  '{"tagline":"Gemas naturales seleccionadas de Mineral Sagrado (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Mineral Sagrado","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7893970551034',
  'TAL-28',
  'Brazalete Maestro: Jade',
  'aurum-brazalete-jade',
  'talismanes',
  1580,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Jade Nefrita (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Jade Nefrita',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/1_ab50c9a8-a78a-46ef-920d-00dc6a735ffe.jpg?v=1673630694',
  '{"tagline":"Gemas naturales seleccionadas de Jade Nefrita (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Jade Nefrita","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7893962293498',
  'TAL-29',
  'Brazalete Maestro: Aguamarina',
  'aurum-brazalete-aguamarina',
  'talismanes',
  1680,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Mineral Sagrado (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Mineral Sagrado',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/1_9ddbd55f-76df-4463-885f-207109036f97.jpg?v=1673630322',
  '{"tagline":"Gemas naturales seleccionadas de Mineral Sagrado (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Mineral Sagrado","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7893957378298',
  'TAL-30',
  'Brazalete Maestro: Malaquita Premium',
  'aurum-brazalete-malaquita-premium',
  'talismanes',
  1680,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Malaquita Silvestre (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Malaquita Silvestre',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/5_c746b00f-79db-412d-8024-36c322f1944d.jpg?v=1713907088',
  '{"tagline":"Gemas naturales seleccionadas de Malaquita Silvestre (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Malaquita Silvestre","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7840662651130',
  'TAL-31',
  'Brazalete Maestro: Cuarzo Blanco',
  'aurum-brazalete-cuarzo-blanco',
  'talismanes',
  1680,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Cuarzo Rutilado & Cristal (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Cuarzo Rutilado & Cristal',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/5_730b8fbc-a5fc-42ce-a7be-b33c11bd9261.jpg?v=1739471023',
  '{"tagline":"Gemas naturales seleccionadas de Cuarzo Rutilado & Cristal (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Cuarzo Rutilado & Cristal","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7816818163962',
  'TAL-32',
  'Brazalete Maestro: Cuarzo Rosa',
  'aurum-brazalete-cuarzo-rosa',
  'talismanes',
  1680,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Cuarzo Rutilado & Cristal (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Cuarzo Rutilado & Cristal',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/5_4383dc0d-67ba-404b-8a29-17fda6246d03.jpg?v=1751579570',
  '{"tagline":"Gemas naturales seleccionadas de Cuarzo Rutilado & Cristal (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Cuarzo Rutilado & Cristal","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7816797880570',
  'TAL-33',
  'Brazalete Maestro: Amatista',
  'aurum-brazalete-amatista',
  'talismanes',
  1580,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Amatista Sagrada (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Amatista Sagrada',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/Frente.webp?v=1786503330',
  '{"tagline":"Gemas naturales seleccionadas de Amatista Sagrada (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Amatista Sagrada","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7816796078330',
  'TAL-34',
  'Brazalete Maestro: Lapislázuli',
  'aurum-brazalete-lapislazuli',
  'talismanes',
  1680,
  24,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Lapislázuli Real (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Lapislázuli Real',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/1_12a5c814-00a7-4a8d-a161-cc2a501aa183.jpg?v=1666408731',
  '{"tagline":"Gemas naturales seleccionadas de Lapislázuli Real (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Lapislázuli Real","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7816790737146',
  'TAL-35',
  'Brazalete Maestro: Ojo de Tigre Rojo',
  'aurum-brazalete-ojo-de-tigre-rojo',
  'talismanes',
  1580,
  23,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Ojo de Tigre & Halcón (8mm & 10mm). Acabado artesanal de alta durabilidad.',
  'Ojo de Tigre & Halcón',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/1_843d7803-e679-4aaf-9c54-906d259b238e.jpg?v=1666408441',
  '{"tagline":"Gemas naturales seleccionadas de Ojo de Tigre & Halcón (8mm & 10mm). Acabado artesanal de alta durabilidad.","stoneType":"Ojo de Tigre & Halcón","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7755476795642',
  'TAL-36',
  'Brazalete Maestro: Minerales “Triple Protección”',
  'aurum-brazalete-minerales-triple-proteccion',
  'talismanes',
  1680,
  23,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Mineral Sagrado (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Mineral Sagrado',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/1_7465e348-33c7-45d8-86b4-ffa0002f1df9.jpg?v=1663183449',
  '{"tagline":"Gemas naturales seleccionadas de Mineral Sagrado (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Mineral Sagrado","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7718281969914',
  'TAL-37',
  'Brazalete Maestro: Hematita Tonalidad Natural',
  'aurum-brazalete-hematita-tonalidad-natural',
  'talismanes',
  950,
  23,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Hematita Pulida (Geométrica / Flecha). Acabado artesanal de alta durabilidad.',
  'Hematita Pulida',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/1_0265fcec-6f59-44fd-bc97-7e1937afc2bb.jpg?v=1661458947',
  '{"tagline":"Gemas naturales seleccionadas de Hematita Pulida (Geométrica / Flecha). Acabado artesanal de alta durabilidad.","stoneType":"Hematita Pulida","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7685327487226',
  'TAL-38',
  'Brazalete Maestro: Hematita en Esfera y Onix Mate',
  'aurum-brazalete-hematita-en-esfera-y-onix-mate',
  'talismanes',
  950,
  23,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Hematita Pulida (Geométrica / Flecha). Acabado artesanal de alta durabilidad.',
  'Hematita Pulida',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/1_23ee4482-d8f6-477d-a383-bbab782dcb82.jpg?v=1658510446',
  '{"tagline":"Gemas naturales seleccionadas de Hematita Pulida (Geométrica / Flecha). Acabado artesanal de alta durabilidad.","stoneType":"Hematita Pulida","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7590456688890',
  'TAL-39',
  'Brazalete Maestro: Obsidiana Dorada',
  'aurum-brazalete-obsidiana-dorada',
  'talismanes',
  1580,
  23,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Obsidiana Dorada (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Obsidiana Dorada',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/1_f976038e-7630-4de2-ad58-46c927e8d3cd.jpg?v=1666415821',
  '{"tagline":"Gemas naturales seleccionadas de Obsidiana Dorada (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Obsidiana Dorada","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-7578824311034',
  'TAL-40',
  'Brazalete Maestro: 7 Chakras',
  'aurum-brazalete-7-chakras-con-hilo-elastico',
  'talismanes',
  1580,
  23,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Mineral Sagrado (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Mineral Sagrado',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/1_43c84454-6e62-44e0-ad30-b9310dde82ed.jpg?v=1669240021',
  '{"tagline":"Gemas naturales seleccionadas de Mineral Sagrado (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Mineral Sagrado","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-6146747891906',
  'TAL-41',
  'Brazalete Maestro: Ojo De Tigre Fuerza Imponente',
  'aurum-brazalete-ojo-de-tigre',
  'talismanes',
  1580,
  23,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Ojo de Tigre & Halcón (8mm & 10mm). Acabado artesanal de alta durabilidad.',
  'Ojo de Tigre & Halcón',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/files/Frontal.webp?v=1785859032',
  '{"tagline":"Gemas naturales seleccionadas de Ojo de Tigre & Halcón (8mm & 10mm). Acabado artesanal de alta durabilidad.","stoneType":"Ojo de Tigre & Halcón","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'aurum-4835701391440',
  'TAL-42',
  'Brazalete Maestro: Chakras',
  'aurum-brazalete-chacras',
  'talismanes',
  1580,
  23,
  0,
  5,
  TRUE,
  'Gemas naturales seleccionadas de Mineral Sagrado (8mm AAA). Acabado artesanal de alta durabilidad.',
  'Mineral Sagrado',
  'https://cdn.shopify.com/s/files/1/0238/9055/9056/products/Image20220404164100.jpg?v=1649109037',
  '{"tagline":"Gemas naturales seleccionadas de Mineral Sagrado (8mm AAA). Acabado artesanal de alta durabilidad.","stoneType":"Mineral Sagrado","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'duo-transmutacion-amatista-alquimico',
  'DUO-01',
  'Dúo Transmutación: Amatista Profunda & Símbolo Alquímico',
  'duo-transmutacion-amatista-alquimico',
  'duos',
  2490,
  125,
  0,
  12,
  TRUE,
  'Pulsera de amatistas y cuarzo rosa + Canto rodado de río con símbolo alquímico en oro pintado a mano.',
  '',
  '/images/shop/duos/duo-transmutacion-amatista-alquimico.jpg',
  '{"tagline":"Pulsera de amatistas y cuarzo rosa + Canto rodado de río con símbolo alquímico en oro pintado a mano.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'duo-fuego-sagrado-jaspe-rojo-altar-oro',
  'DUO-02',
  'Dúo Fuego Sagrado: Jaspe Rojo & Altar Mitad Oro',
  'duo-fuego-sagrado-jaspe-rojo-altar-oro',
  'duos',
  2490,
  125,
  0,
  12,
  TRUE,
  'Pulsera jaspe rojo y cuarzo en bruto + Canto rodado con acabado acabado solar áureo pintado a mano y consagrado al fuego.',
  '',
  '/images/shop/duos/duo-fuego-sagrado-jaspe-rojo-altar-oro.jpg',
  '{"tagline":"Pulsera jaspe rojo y cuarzo en bruto + Canto rodado con acabado acabado solar áureo pintado a mano y consagrado al fuego.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'duo-vision-oracular-sodalita-espiral-aurea',
  'DUO-03',
  'Dúo Visión Oracular: Sodalita Azul & Espiral Áurea',
  'duo-vision-oracular-sodalita-espiral-aurea',
  'duos',
  2490,
  125,
  0,
  12,
  TRUE,
  'Pulsera sodalita geométrica + Canto rodado oscuro con espiral áurea sagrada pintada a mano.',
  '',
  '/images/shop/duos/duo-vision-oracular-sodalita-espiral-aurea.jpg',
  '{"tagline":"Pulsera sodalita geométrica + Canto rodado oscuro con espiral áurea sagrada pintada a mano.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'duo-alquimia-solar-cornalina-7-chakras',
  'DUO-04',
  'Dúo Alquimia Solar: Cornalina Ámbar & Sello 7 Chakras',
  'duo-alquimia-solar-cornalina-7-chakras',
  'duos',
  2490,
  125,
  0,
  12,
  TRUE,
  'Pulsera cornalina translúcida + Canto rodado con los 7 centros energéticos pintados a mano en oro.',
  '',
  '/images/shop/duos/duo-alquimia-solar-cornalina-7-chakras.jpg',
  '{"tagline":"Pulsera cornalina translúcida + Canto rodado con los 7 centros energéticos pintados a mano en oro.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'duo-bosque-profundo-malaquita-triquetra',
  'DUO-05',
  'Dúo Bosque Profundo: Malaquita Verde & Triquetra Sagrada',
  'duo-bosque-profundo-malaquita-triquetra',
  'duos',
  2490,
  125,
  0,
  12,
  TRUE,
  'Pulsera de malaquita y unakita + Piedra fluvial con triquetra celta pintada a mano en oro.',
  '',
  '/images/shop/duos/duo-bosque-profundo-malaquita-triquetra.jpg',
  '{"tagline":"Pulsera de malaquita y unakita + Piedra fluvial con triquetra celta pintada a mano en oro.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'duo-escudo-telurico-jaspe-dalmata-111',
  'DUO-06',
  'Dúo Escudo Telúrico: Jaspe Dálmata & Código Angelical 111',
  'duo-escudo-telurico-jaspe-dalmata-111',
  'duos',
  2490,
  125,
  0,
  12,
  TRUE,
  'Pulsera jaspe dálmata y ojo de tigre + Canto de río con código sincrónico 111 consagrado al fuego y la luna.',
  '',
  '/images/shop/duos/duo-escudo-telurico-jaspe-dalmata-111.jpg',
  '{"tagline":"Pulsera jaspe dálmata y ojo de tigre + Canto de río con código sincrónico 111 consagrado al fuego y la luna.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'duo-sombra-y-luz-cuentas-oscuras-sol',
  'DUO-07',
  'Dúo Sombra y Luz: Cuentas Oscuras & Sol Primordial',
  'duo-sombra-y-luz-cuentas-oscuras-sol',
  'duos',
  2490,
  125,
  0,
  12,
  TRUE,
  'Pulsera hematita y cuarzo ahumado + Piedra de río con Sol radiante y rayos dorados pintados a mano.',
  '',
  '/images/shop/duos/duo-sombra-y-luz-cuentas-oscuras-sol.jpg',
  '{"tagline":"Pulsera hematita y cuarzo ahumado + Piedra de río con Sol radiante y rayos dorados pintados a mano.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  'duo-luz-lunar-cuarzo-marfil-luna',
  'DUO-08',
  'Dúo Luz Lunar: Cuarzo Marfil & Luna Plateada',
  'duo-luz-lunar-cuarzo-marfil-luna',
  'duos',
  2490,
  125,
  0,
  12,
  TRUE,
  'Pulsera cuarzo marfil y pez dorado + Canto rodado oscuro con Luna y constelaciones pintadas a mano.',
  '',
  '/images/shop/duos/duo-luz-lunar-cuarzo-marfil-luna.jpg',
  '{"tagline":"Pulsera cuarzo marfil y pez dorado + Canto rodado oscuro con Luna y constelaciones pintadas a mano.","stoneType":"","arcanoNumber":null}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();


-- 3. REGISTRO EN EL LIBRO MAYOR DE AUDITORÍA (INVENTORY_MOVEMENTS)
INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-0-el-loco-labradorita-turquesa',
  'initial_seed',
  46,
  0,
  46,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-i-el-mago-onix-lapislazuli',
  'initial_seed',
  46,
  0,
  46,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-ii-la-sacerdotisa-piedra-luna-amatista',
  'initial_seed',
  46,
  0,
  46,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-iii-la-emperatriz-cuarzo-rosa-jade',
  'initial_seed',
  46,
  0,
  46,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-iv-el-emperador-ojo-tigre-hematita',
  'initial_seed',
  46,
  0,
  46,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-v-el-hierofante-lapislazuli-ojo-halcon',
  'initial_seed',
  46,
  0,
  46,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-vi-los-enamorados-rodocrosita-cuarzo-ahumado',
  'initial_seed',
  46,
  0,
  46,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-vii-el-carro-obsidiana-ojo-buey',
  'initial_seed',
  46,
  0,
  46,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-viii-la-fuerza-cornalina-ojo-tigre',
  'initial_seed',
  46,
  0,
  46,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-ix-el-ermitano-cuarzo-ahumado-onix',
  'initial_seed',
  46,
  0,
  46,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-x-la-rueda-pirita-malaquita',
  'initial_seed',
  45,
  0,
  45,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-xi-la-justicia-jaspe-hematita',
  'initial_seed',
  45,
  0,
  45,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-xii-el-colgado-aguamarina-sodalita',
  'initial_seed',
  45,
  0,
  45,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-xiii-la-muerte-obsidiana-turmalina',
  'initial_seed',
  45,
  0,
  45,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-xiv-la-templanza-amatista-cuarzo-cristal',
  'initial_seed',
  45,
  0,
  45,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-xv-el-diablo-obsidiana-lava',
  'initial_seed',
  45,
  0,
  45,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-xvi-la-torre-lava-jaspe-brecha',
  'initial_seed',
  45,
  0,
  45,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-xvii-la-estrella-aguamarina-amazonita',
  'initial_seed',
  45,
  0,
  45,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-xviii-la-luna-piedra-luna-labradorita',
  'initial_seed',
  45,
  0,
  45,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-xix-el-sol-citrino-pirita',
  'initial_seed',
  45,
  0,
  45,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-xx-el-juicio-malaquita-lapislazuli',
  'initial_seed',
  45,
  0,
  45,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'talisman-arcano-xxi-el-mundo-lapislazuli-cuarzo-malaquita',
  'initial_seed',
  45,
  0,
  45,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'joya-01-ojo-de-tigre-corazon-oro',
  'initial_seed',
  100,
  0,
  100,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'joya-02-choker-amatista-geoda-oro',
  'initial_seed',
  100,
  0,
  100,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'joya-03-collar-amatista-turmalina-oro',
  'initial_seed',
  100,
  0,
  100,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'joya-04-pulsera-cornalina-dalmata-tigre',
  'initial_seed',
  100,
  0,
  100,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'joya-05-pulsera-malaquita-unakita-oro',
  'initial_seed',
  100,
  0,
  100,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'joya-06-pulsera-fuego-jaspe-cuarzo-oro',
  'initial_seed',
  100,
  0,
  100,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'joya-07-pulsera-sodalita-bloques-oro',
  'initial_seed',
  100,
  0,
  100,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'joya-08-pulsera-cuarzo-nieve-pez-oro',
  'initial_seed',
  100,
  0,
  100,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'joya-09-pulsera-cornalina-citrino-solar',
  'initial_seed',
  100,
  0,
  100,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'joya-10-pulsera-amazonita-cuarzo-oro',
  'initial_seed',
  100,
  0,
  100,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'pulsera-ambar-trebol-cuadrifolio',
  'initial_seed',
  42,
  0,
  42,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'pulsera-ambar-infinito-sagrado',
  'initial_seed',
  42,
  0,
  42,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'pulsera-ambar-mano-fatima-hamsa',
  'initial_seed',
  42,
  0,
  42,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'pulsera-ojo-tigre-verde-ambar',
  'initial_seed',
  42,
  0,
  42,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'pulsera-ambar-arbol-de-la-vida',
  'initial_seed',
  42,
  0,
  42,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'pulsera-ambar-caricias-maternales',
  'initial_seed',
  42,
  0,
  42,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'pulsera-howlita-blanca-perla-ambar',
  'initial_seed',
  42,
  0,
  42,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'pulsera-ambar-chips-fluviales',
  'initial_seed',
  42,
  0,
  42,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-10315875025146',
  'initial_seed',
  42,
  0,
  42,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-9332230324474',
  'initial_seed',
  42,
  0,
  42,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-4103722139728',
  'initial_seed',
  42,
  0,
  42,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-9331668877562',
  'initial_seed',
  42,
  0,
  42,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7718280069370',
  'initial_seed',
  42,
  0,
  42,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-8743592952058',
  'initial_seed',
  42,
  0,
  42,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-8024831164666',
  'initial_seed',
  42,
  0,
  42,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7980475777274',
  'initial_seed',
  42,
  0,
  42,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7923730153722',
  'initial_seed',
  41,
  0,
  41,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7840660291834',
  'initial_seed',
  41,
  0,
  41,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7799295377658',
  'initial_seed',
  41,
  0,
  41,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7685333713146',
  'initial_seed',
  41,
  0,
  41,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7514339901690',
  'initial_seed',
  41,
  0,
  41,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-6900315488450',
  'initial_seed',
  41,
  0,
  41,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-6146742223042',
  'initial_seed',
  41,
  0,
  41,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-4770983313488',
  'initial_seed',
  41,
  0,
  41,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'quemador-rio-doble-basalto',
  'initial_seed',
  91,
  0,
  91,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'quemador-rio-doble-oro-alquimico',
  'initial_seed',
  91,
  0,
  91,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'quemador-rio-doble-artesanal',
  'initial_seed',
  91,
  0,
  91,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'quemador-rio-doble-purpura-tarot',
  'initial_seed',
  91,
  0,
  91,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'quemador-rio-doble-reiki-simbolos',
  'initial_seed',
  91,
  0,
  91,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'quemador-rio-doble-canto-n14',
  'initial_seed',
  91,
  0,
  91,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'quemador-rio-doble-canto-n15',
  'initial_seed',
  91,
  0,
  91,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'quemador-rio-doble-borgoña',
  'initial_seed',
  91,
  0,
  91,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'quemador-rio-doble-bosque-profundo',
  'initial_seed',
  91,
  0,
  91,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'quemador-rio-doble-terracota',
  'initial_seed',
  91,
  0,
  91,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'quemador-rio-doble-rustica-ancestral',
  'initial_seed',
  90,
  0,
  90,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'trio-piedras-reiki-cho-ku-rei',
  'initial_seed',
  250,
  0,
  250,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'canto-rio-cho-ku-rei-oro',
  'initial_seed',
  250,
  0,
  250,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'piedra-bruja-hagstone-reiki-oro',
  'initial_seed',
  250,
  0,
  250,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'piedra-meditacion-reiki-dorada',
  'initial_seed',
  250,
  0,
  250,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'juego-quemador-piedra-aura-runas',
  'initial_seed',
  250,
  0,
  250,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'juego-quemador-piedra-aura',
  'initial_seed',
  250,
  0,
  250,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'piedra-aura-dorada-ritual',
  'initial_seed',
  250,
  0,
  250,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'piedra-ovalada-runas-dremel',
  'initial_seed',
  250,
  0,
  250,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'piedra-rio-simbolo-solar',
  'initial_seed',
  72,
  0,
  72,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'piedra-colgante-loto-borgoña',
  'initial_seed',
  72,
  0,
  72,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'quemador-rio-pintado-orquidea-dorada',
  'initial_seed',
  72,
  0,
  72,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'piedra-rio-pintada-motivos-sagrados',
  'initial_seed',
  72,
  0,
  72,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'piedra-plana-flor-de-la-vida',
  'initial_seed',
  72,
  0,
  72,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'piedra-blanca-luna-estrellas',
  'initial_seed',
  72,
  0,
  72,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'piedra-triple-luna-fases',
  'initial_seed',
  71,
  0,
  71,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'piedra-sol-cara-dorado',
  'initial_seed',
  71,
  0,
  71,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'piedra-sol-dual-dorado',
  'initial_seed',
  71,
  0,
  71,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'piedra-om-tallado',
  'initial_seed',
  71,
  0,
  71,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'piedra-ojo-turco',
  'initial_seed',
  71,
  0,
  71,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'piedra-ovalada-mandala-loto',
  'initial_seed',
  71,
  0,
  71,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'piedra-7-chakras-puntos',
  'initial_seed',
  71,
  0,
  71,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'piedra-corazon-infinito',
  'initial_seed',
  71,
  0,
  71,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'piedra-natural-11-11',
  'initial_seed',
  334,
  0,
  334,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'piedra-oscura-777-dorado',
  'initial_seed',
  333,
  0,
  333,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'piedra-numero-444',
  'initial_seed',
  333,
  0,
  333,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'bandeja-altar-rio-cenizas-incienso',
  'initial_seed',
  167,
  0,
  167,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'bandeja-altar-piedras-tarot',
  'initial_seed',
  167,
  0,
  167,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'kit-altar-mistico-incienso-flatlay',
  'initial_seed',
  167,
  0,
  167,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'kit-ceremonial-plano-incienso',
  'initial_seed',
  167,
  0,
  167,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'kit-limpia-runas-salvia-palosanto',
  'initial_seed',
  166,
  0,
  166,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'set-incienso-bosque-sagrado',
  'initial_seed',
  166,
  0,
  166,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'pulsera-transmutacion-amatista',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'pulsera-fuego-sagrado-jaspe-rojo',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'pulsera-vision-oracular-sodalita',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'pulsera-alquimia-solar-cornalina',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'pulsera-bosque-profundo-malaquita',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'pulsera-escudo-telurico-jaspe-dalmata',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'pulsera-sombra-y-luz-cuentas-oscuras',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'pulsera-luz-lunar-cuarzo-marfil',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-10315843469562',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-9182449959162',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-9181517316346',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7590458196218',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-8925826121978',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-8868702847226',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-8766441619706',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-8760829214970',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-8630025847034',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-8476277407994',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-8192829030650',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-8192825884922',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-8192816251130',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-8151200497914',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-8027023868154',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7980713148666',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7943728136442',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7943726596346',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7893978087674',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7893970551034',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7893962293498',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7893957378298',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7840662651130',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7816818163962',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7816797880570',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7816796078330',
  'initial_seed',
  24,
  0,
  24,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7816790737146',
  'initial_seed',
  23,
  0,
  23,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7755476795642',
  'initial_seed',
  23,
  0,
  23,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7718281969914',
  'initial_seed',
  23,
  0,
  23,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7685327487226',
  'initial_seed',
  23,
  0,
  23,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7590456688890',
  'initial_seed',
  23,
  0,
  23,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-7578824311034',
  'initial_seed',
  23,
  0,
  23,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-6146747891906',
  'initial_seed',
  23,
  0,
  23,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'aurum-4835701391440',
  'initial_seed',
  23,
  0,
  23,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'duo-transmutacion-amatista-alquimico',
  'initial_seed',
  125,
  0,
  125,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'duo-fuego-sagrado-jaspe-rojo-altar-oro',
  'initial_seed',
  125,
  0,
  125,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'duo-vision-oracular-sodalita-espiral-aurea',
  'initial_seed',
  125,
  0,
  125,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'duo-alquimia-solar-cornalina-7-chakras',
  'initial_seed',
  125,
  0,
  125,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'duo-bosque-profundo-malaquita-triquetra',
  'initial_seed',
  125,
  0,
  125,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'duo-escudo-telurico-jaspe-dalmata-111',
  'initial_seed',
  125,
  0,
  125,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'duo-sombra-y-luz-cuentas-oscuras-sol',
  'initial_seed',
  125,
  0,
  125,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  'duo-luz-lunar-cuarzo-marfil-luna',
  'initial_seed',
  125,
  0,
  125,
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);


-- 4. RE-SINCRONIZAR AUTOMÁTICAMENTE EL STOCK ACTUAL DE CADA COLECCIÓN
UPDATE public.inventory_collections c
SET current_stock = COALESCE((
  SELECT SUM(stock_quantity) 
  FROM public.inventory_items 
  WHERE collection_id = c.id AND is_active = TRUE
), 0),
updated_at = NOW();

COMMIT;

-- VERIFICACIÓN FINAL:
-- SELECT id, name, target_stock, current_stock FROM public.inventory_collections ORDER BY id;
