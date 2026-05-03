# Follow-up: tighten public read on `orders` / `order_items`

## The problem

`schema.sql` currently defines:

```sql
CREATE POLICY "Public read orders"      ON orders      FOR SELECT USING (true);
CREATE POLICY "Public read order_items" ON order_items FOR SELECT USING (true);
```

Combined with the publicly-known anon key, this means **any visitor can
read every order in the database** with one network call:

```js
supabase.from('orders').select('*')
// ↑ returns the entire orders table
```

Order numbers are sequential (`SB-YYYYMMDD-NNN`), so even if we kept the
policy as `WHERE order_number = $1`, an attacker could enumerate them in
seconds.

## What needs to change

This needs both an RLS change AND a code change — they have to land
together or the order-confirmation flow breaks for guests.

### 1. SQL — replace public read with email-gated RPC

```sql
DROP POLICY IF EXISTS "Public read orders"      ON orders;
DROP POLICY IF EXISTS "Public read order_items" ON order_items;

CREATE OR REPLACE FUNCTION public.get_order_by_number_and_email(
  p_order_number TEXT,
  p_email        TEXT
)
RETURNS TABLE (
  -- copy of orders columns; SECURITY DEFINER means we don't need a SELECT policy
  ...
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT o.*
  FROM orders o
  WHERE o.order_number = p_order_number
    AND lower(o.shipping_email) = lower(p_email)
  LIMIT 1;
$$;

REVOKE  ALL    ON FUNCTION public.get_order_by_number_and_email(TEXT, TEXT) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.get_order_by_number_and_email(TEXT, TEXT) TO   anon, authenticated;

-- And similar for order_items, plus an authenticated-user policy
-- so logged-in users can see their own order list.
CREATE POLICY "Read own orders"
  ON orders
  FOR SELECT
  USING (lower(shipping_email) = lower(coalesce(auth.jwt() ->> 'email','')));
```

### 2. Code — guest must prove the email

After checkout, the order-confirmation page currently navigates to
`/orders/${order.order_number}` and queries by order_number alone. That
won't work once the public-read policy is removed.

Three options, pick one:

- **(a) Pass email through router state.** Cheapest. Confirmation page
  reads `state.email` from `useLocation`, calls
  `supabase.rpc('get_order_by_number_and_email', { p_order_number, p_email })`.
  Reload of the URL won't work without re-entering email — acceptable.

- **(b) Persist `{orderNumber, email}` in `sessionStorage`** on success
  and read it back on the confirmation page. Survives reload but only
  in the same browser session. Probably the right UX trade-off.

- **(c) Issue a one-time view token** alongside the order and put it in
  the URL: `/orders/SB-20260503-001?t=abc123`. Best for shareable
  receipt links (e.g., emailed to customer), worst for impl effort.

## When to do this

Not urgent for a small store with low order volume, but worth
prioritizing before launch / volume grows. The exposure is real.
