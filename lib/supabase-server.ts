/**
 * Server-only Supabase client factory using the service role key.
 * Centralizes environment access and prevents accidental client-side imports.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let serverClient: SupabaseClient | null = null;

/*
  Returns a singleton Supabase client configured with service role credentials.
  Throws if required environment variables are missing.
*/
export function getSupabaseServerClient(): SupabaseClient {
  if (serverClient) return serverClient;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) throw new Error('Supabase server env vars are missing');

  serverClient = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });

  return serverClient;
}






