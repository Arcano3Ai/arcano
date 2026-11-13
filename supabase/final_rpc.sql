-- ==============================================================================
-- ARCANO — CONCILIACIÓN CANÓNICA FINAL (p_event JSONB)
-- Soportando in_dispute, hold_fulfillment e inventario atómico
-- ==============================================================================

-- 1. Asegurar columnas en orders y webhook_events
ALTER TABLE public.orders 
  ADD COLUMN IF NOT EXISTS hold_fulfillment BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS inventory_committed_at TIMESTAMPTZ;

ALTER TABLE public.webhook_events 
  ADD COLUMN IF NOT EXISTS type TEXT,
  ADD COLUMN IF NOT EXISTS action TEXT;

-- 2. Función canónica RPC
CREATE OR REPLACE FUNCTION public.rpc_sync_order_from_webhook(p_event JSONB)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_request_id        TEXT := p_event->>'request_id';
  v_event_type        TEXT := p_event->>'event_type';
  v_event_action      TEXT := p_event->>'event_action';
  v_data_id           TEXT := p_event->>'data_id';

  v_external_ref      TEXT := p_event->>'external_reference';
  v_mp_order_id       TEXT := p_event->>'mp_order_id';
  v_mp_payment_id     TEXT := p_event->>'mp_payment_id';

  v_mp_status         TEXT := p_event->>'mp_status';
  v_mp_status_detail  TEXT := p_event->>'mp_status_detail';

  v_dispute_type      TEXT := p_event->>'dispute_type';   -- 'claim' | 'chargebacks' | null

  v_order_id          UUID;
  v_prev_status       TEXT;
  v_new_status        TEXT;
  v_prev_hold         BOOLEAN;
  v_new_hold          BOOLEAN;
  v_inventory_commit  BOOLEAN := false;
BEGIN
  IF v_request_id IS NULL OR length(v_request_id) = 0 THEN
    RAISE EXCEPTION 'request_id is required';
  END IF;

  -- 1) Idempotencia en primera capa: si ya procesaste este request_id, salir
  BEGIN
    INSERT INTO public.webhook_events (request_id, type, action, data_id, received_at, raw_payload)
    VALUES (v_request_id, v_event_type, v_event_action, v_data_id, NOW(), p_event);
  EXCEPTION
    WHEN unique_violation THEN
      RETURN jsonb_build_object(
        'duplicate', true,
        'request_id', v_request_id
      );
  END;

  -- 2) Resolver order_id bloqueando fila con FOR UPDATE
  IF v_external_ref IS NOT NULL AND length(v_external_ref) > 0 THEN
    SELECT o.id, o.status, o.hold_fulfillment
      INTO v_order_id, v_prev_status, v_prev_hold
    FROM public.orders o
    WHERE o.external_reference = v_external_ref
    FOR UPDATE;
  ELSIF v_mp_order_id IS NOT NULL AND length(v_mp_order_id) > 0 THEN
    SELECT o.id, o.status, o.hold_fulfillment
      INTO v_order_id, v_prev_status, v_prev_hold
    FROM public.mp_orders mo
    JOIN public.orders o ON o.id = mo.order_id
    WHERE mo.mp_order_id = v_mp_order_id
    FOR UPDATE;
  ELSE
    RAISE EXCEPTION 'external_reference or mp_order_id is required';
  END IF;

  IF v_order_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Orden no encontrada');
  END IF;

  -- 3) Upsert espejos Mercado Pago
  IF v_mp_order_id IS NOT NULL AND length(v_mp_order_id) > 0 THEN
    INSERT INTO public.mp_orders (mp_order_id, order_id, mp_status, mp_status_detail, last_synced_at)
    VALUES (v_mp_order_id, v_order_id, NULLIF(v_mp_status,''), NULLIF(v_mp_status_detail,''), NOW())
    ON CONFLICT (mp_order_id) DO UPDATE
      SET mp_status        = COALESCE(EXCLUDED.mp_status, public.mp_orders.mp_status),
          mp_status_detail = COALESCE(EXCLUDED.mp_status_detail, public.mp_orders.mp_status_detail),
          last_synced_at   = NOW();
  END IF;

  IF v_mp_payment_id IS NOT NULL AND length(v_mp_payment_id) > 0 THEN
    INSERT INTO public.mp_payments (mp_payment_id, mp_order_id, amount, status, status_detail, created_at)
    VALUES (v_mp_payment_id, v_mp_order_id, 0, COALESCE(NULLIF(v_mp_status,''), 'approved'), NULLIF(v_mp_status_detail,''), NOW())
    ON CONFLICT (mp_payment_id) DO UPDATE
      SET status        = COALESCE(EXCLUDED.status, public.mp_payments.status),
          status_detail = COALESCE(EXCLUDED.status_detail, public.mp_payments.status_detail);
  END IF;

  -- 4) Máquina de estados refinada
  v_new_status := v_prev_status;
  v_new_hold := COALESCE(v_prev_hold, false);

  -- 4.1) Disputa o Contracargo: congelar fulfillment siempre
  IF v_dispute_type IS NOT NULL AND length(v_dispute_type) > 0 THEN
    v_new_status := 'in_dispute';
    v_new_hold := true;

  ELSE
    -- 4.2) Reembolso
    IF lower(COALESCE(v_mp_status,'')) = 'refunded' THEN
      v_new_status := 'refunded';
      v_new_hold := true;

    -- 4.3) Pagado
    ELSIF lower(COALESCE(v_mp_status,'')) IN ('closed','approved','accredited') THEN
      IF v_prev_status <> 'in_dispute' THEN
        v_new_status := 'paid';
        v_new_hold := false;
      END IF;

    -- 4.4) Expirado
    ELSIF lower(COALESCE(v_mp_status,'')) IN ('expired') OR lower(COALESCE(v_mp_status_detail,'')) IN ('expired') THEN
      IF v_prev_status <> 'in_dispute' THEN
        v_new_status := 'expired';
        v_new_hold := false;
      END IF;

    -- 4.5) Pago Rechazado / Cancelado
    ELSIF lower(COALESCE(v_mp_status,'')) IN ('rejected','failed','canceled','cancelled') THEN
      IF v_prev_status <> 'in_dispute' THEN
        v_new_status := 'payment_failed';
        v_new_hold := false;
      END IF;
    END IF;
  END IF;

  -- 5) Persistir cambio de estado
  IF v_new_status IS DISTINCT FROM v_prev_status
     OR v_new_hold IS DISTINCT FROM v_prev_hold THEN
    UPDATE public.orders
      SET status = v_new_status,
          hold_fulfillment = v_new_hold,
          updated_at = NOW()
    WHERE id = v_order_id;
  END IF;

  -- 6) Commit de inventario (solo una vez si inventory_committed_at es null)
  IF v_new_status = 'paid' THEN
    UPDATE public.orders
      SET inventory_committed_at = NOW(),
          updated_at = NOW()
    WHERE id = v_order_id
      AND inventory_committed_at IS NULL
    RETURNING true INTO v_inventory_commit;

    IF v_inventory_commit THEN
      -- Descontar inventario físico si la tabla y función existen
      FOR v_item IN (SELECT * FROM public.order_items WHERE order_id = v_order_id) LOOP
        IF v_item.item_id IS NOT NULL THEN
          BEGIN
            PERFORM public.rpc_confirm_sale(v_item.item_id, v_item.quantity, v_external_ref);
          EXCEPTION WHEN OTHERS THEN NULL; END;
        END IF;
      END LOOP;
    END IF;
  END IF;

  RETURN jsonb_build_object(
    'duplicate', false,
    'request_id', v_request_id,
    'order_id', v_order_id,
    'external_reference', COALESCE(v_external_ref, ''),
    'previous_status', v_prev_status,
    'new_status', v_new_status,
    'hold_fulfillment', v_new_hold,
    'inventory_committed', v_inventory_commit,
    'mp_order_id', COALESCE(v_mp_order_id, ''),
    'mp_payment_id', COALESCE(v_mp_payment_id, '')
  );
END;
$$;

