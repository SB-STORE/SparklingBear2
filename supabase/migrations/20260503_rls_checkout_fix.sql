-- ============================================================
-- RLS hardening: guest-checkout INSERT policies + close orders read leak
-- ============================================================
-- Run this in Supabase Studio → SQL Editor against the live project.
-- Idempotent: drops policies before recreating them.
--
-- Two problems addressed:
--
--   1. Guest checkout was failing with
--      "new row violates row-level security policy for table 'customers'"
--      because the live DB was missing the public-INSERT policies that
--      schema.sql defines. Restored them.
--
--   2. The previous "Public read orders" and "Public read order_items"
--      policies allowed any anon-key holder to read every order in the
--      database. Replaced with:
--        - A SECURITY DEFINER RPC that requires order_number + email.
--          This is what the React confirmation page now calls.
--        - An authenticated-user policy so logged-in users can list
--          their own orders by JWT email.
-- ============================================================


-- ---------- 1. Public INSERT policies (guest checkout) ----------

DROP POLICY IF EXISTS "Public insert customers"  ON customers;
DROP POLICY IF EXISTS "Public insert orders"     ON orders;
DROP POLICY IF EXISTS "Public insert order_items" ON order_items;

CREATE POLICY "Public insert customers"   ON customers   FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert orders"      ON orders      FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert order_items" ON order_items FOR INSERT WITH CHECK (true);


-- ---------- 2. Close the public-read leak on orders ----------

DROP POLICY IF EXISTS "Public read orders"      ON orders;
DROP POLICY IF EXISTS "Public read order_items" ON order_items;

-- Authenticated users see their own orders (matched by JWT email).
DROP POLICY IF EXISTS "Read own orders"       ON orders;
DROP POLICY IF EXISTS "Read own order_items"  ON order_items;

CREATE POLICY "Read own orders"
  ON orders
  FOR SELECT
  USING (
    auth.jwt() ->> 'email' IS NOT NULL
    AND lower(shipping_email) = lower(auth.jwt() ->> 'email')
  );

CREATE POLICY "Read own order_items"
  ON order_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders o
      WHERE o.id = order_items.order_id
        AND auth.jwt() ->> 'email' IS NOT NULL
        AND lower(o.shipping_email) = lower(auth.jwt() ->> 'email')
    )
  );


-- ---------- 3. Email-gated lookup RPC for guest order confirmation ----------
-- SECURITY DEFINER means this runs with the function-owner's privileges,
-- bypassing RLS. The function itself enforces the access check by requiring
-- the caller to know both order_number and shipping_email.

-- The RPC accepts either email or phone (or both). Phone is always
-- collected at checkout; email is optional. Caller must supply at
-- least one and it must match the order. Mismatch returns NULL so we
-- don't leak whether the order_number exists.

DROP FUNCTION IF EXISTS public.get_order_by_number_and_contact(TEXT, TEXT, TEXT);

CREATE OR REPLACE FUNCTION public.get_order_by_number_and_contact(
  p_order_number TEXT,
  p_email        TEXT,
  p_phone        TEXT
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_order  orders%ROWTYPE;
  v_items  jsonb;
  v_email  TEXT := nullif(trim(p_email), '');
  v_phone  TEXT := nullif(trim(p_phone), '');
BEGIN
  IF p_order_number IS NULL OR p_order_number = '' THEN
    RETURN NULL;
  END IF;

  -- Caller must supply at least one identifier so we can't match
  -- accidentally on a NULL = NULL comparison.
  IF v_email IS NULL AND v_phone IS NULL THEN
    RETURN NULL;
  END IF;

  SELECT * INTO v_order
  FROM orders
  WHERE order_number = p_order_number
    AND (
         (v_email IS NOT NULL AND lower(shipping_email) = lower(v_email))
      OR (v_phone IS NOT NULL AND shipping_phone        = v_phone)
    )
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  SELECT coalesce(jsonb_agg(to_jsonb(oi.*)), '[]'::jsonb)
  INTO v_items
  FROM order_items oi
  WHERE oi.order_id = v_order.id;

  RETURN to_jsonb(v_order) || jsonb_build_object('items', v_items);
END;
$$;

REVOKE  ALL    ON FUNCTION public.get_order_by_number_and_contact(TEXT, TEXT, TEXT) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.get_order_by_number_and_contact(TEXT, TEXT, TEXT) TO   anon, authenticated;


-- ---------- 4. Sanity check ----------
-- After running, verify in psql / SQL Editor:
--   SELECT tablename, policyname, cmd
--   FROM pg_policies
--   WHERE tablename IN ('customers','orders','order_items')
--   ORDER BY tablename, policyname;
--
--   SELECT routine_name, security_type
--   FROM information_schema.routines
--   WHERE routine_name = 'get_order_by_number_and_email';
