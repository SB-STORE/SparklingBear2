-- ============================================================
-- CRITICAL: fix admin privilege escalation
-- ============================================================
-- The previous is_admin() function checked
--   auth.jwt() -> 'user_metadata' ->> 'role' = 'admin'
-- but `user_metadata` is the user-editable JWT claim. Any signed-in
-- customer could run
--   await supabase.auth.updateUser({ data: { role: 'admin' } })
-- and become admin, gaining ALL access on every table via the
-- "Admin all <table>" policies. This is a privilege escalation
-- vulnerability, not a theoretical one.
--
-- The fix: check `app_metadata` instead. `app_metadata` is admin-only
-- (only the service_role / dashboard can write to it).
--
-- Run in Supabase Studio → SQL Editor. Atomic: re-tags existing
-- admins via app_metadata BEFORE replacing the function, so they
-- stay admins through the swap.
-- ============================================================

BEGIN;

-- 1. Re-tag every existing admin user via app_metadata so they don't
--    lose access when the function flips. Idempotent: jsonb concat
--    overwrites the 'role' key if already present.
UPDATE auth.users
SET raw_app_meta_data =
  coalesce(raw_app_meta_data, '{}'::jsonb)
  || jsonb_build_object('role', 'admin')
WHERE raw_user_meta_data ->> 'role' = 'admin'
  AND coalesce(raw_app_meta_data ->> 'role', '') <> 'admin';


-- 2. Replace is_admin() to read from app_metadata.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;


-- 3. Remove the now-dangerous role claim from user_metadata. Not
--    strictly required for security (the function ignores it now)
--    but tidies up so the JWT only has role in one place. Skip if
--    you'd rather keep it for backwards compatibility with any
--    legacy code path.
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data - 'role'
WHERE raw_user_meta_data ->> 'role' = 'admin'
  AND raw_app_meta_data  ->> 'role' = 'admin';

COMMIT;


-- ---------- Sanity check ----------
-- After running, every admin should show NULL in user_metadata_role
-- and 'admin' in app_metadata_role:
--   SELECT id, email,
--          raw_user_meta_data ->> 'role' AS user_metadata_role,
--          raw_app_meta_data  ->> 'role' AS app_metadata_role
--   FROM auth.users
--   WHERE raw_app_meta_data ->> 'role' = 'admin';
--
-- Affected admins must sign out + sign back in for the JWT to refresh
-- with the new app_metadata claim. Until they do, the old JWT has no
-- role in app_metadata and is_admin() returns false. Tell admins
-- before deploying this.
