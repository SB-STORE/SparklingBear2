-- ============================================================
-- RLS fix: restore guest-checkout INSERT policies
-- ============================================================
-- Run this in Supabase Studio → SQL Editor against the live project.
-- Idempotent: drops policies before recreating them.
--
-- Problem:
--   Guest checkout was failing with
--   "new row violates row-level security policy for table 'customers'"
--   because the live DB is missing the public-INSERT policies that
--   schema.sql defines. Either schema.sql was never run, or these
--   policies were dropped later. This restores them.
--
-- Scope:
--   Restores ONLY the broken INSERT policies. The wider concern of
--   "Public read orders" allowing anyone to scrape all orders is
--   intentionally left for a separate change — fixing it requires
--   code changes to the order-lookup flow (callers must prove they
--   know an order's email/phone, not just its number). See
--   FOLLOWUP_rls_orders_read.md for that plan.
-- ============================================================

DROP POLICY IF EXISTS "Public insert customers"  ON customers;
DROP POLICY IF EXISTS "Public insert orders"     ON orders;
DROP POLICY IF EXISTS "Public insert order_items" ON order_items;

CREATE POLICY "Public insert customers"   ON customers   FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert orders"      ON orders      FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert order_items" ON order_items FOR INSERT WITH CHECK (true);


-- Verify after running:
--   SELECT tablename, policyname, cmd
--   FROM pg_policies
--   WHERE tablename IN ('customers','orders','order_items')
--   ORDER BY tablename, policyname;
