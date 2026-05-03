// User-facing error message builder. Never leak DB internals (table names,
// RLS policy names, Postgres error codes) to the toast — log them instead.
//
// Map by Postgres SQLSTATE (https://www.postgresql.org/docs/current/errcodes-appendix.html);
// Supabase passes the code through on err.code.

const FRIENDLY_BY_CODE: Record<string, string> = {
  '42501': "We couldn't complete your request. Please try again or contact us if it persists.", // RLS / insufficient privilege
  '23505': 'An account with these details already exists.', // unique violation
  '23503': "Some referenced data is missing. Please refresh and try again.",  // foreign key violation
  '23502': 'Please fill in all required fields.',  // not-null violation
  '22001': 'One of the values is too long.',       // string truncation
  'PGRST116': "We couldn't find what you were looking for.", // PostgREST no-rows
};

export function friendlyErrorMessage(err: unknown, fallback: string): string {
  // Log the full error for ops/debugging.
  console.error('[error]', err);

  if (err && typeof err === 'object') {
    const code = (err as { code?: string }).code;
    if (code && FRIENDLY_BY_CODE[code]) return FRIENDLY_BY_CODE[code];
  }

  // Never bubble raw err.message — it can include table names, policy names,
  // SQL fragments, etc. Use the caller-supplied fallback instead.
  return fallback;
}
