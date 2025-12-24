import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '../../types/database'
import { shouldUseMockSupabase } from '../dev'
import { createTypedDevSupabaseClient } from '../dev/mock-supabase'

/**
 * Creates a Supabase client for browser/client-side use
 *
 * In development mode with missing credentials, returns a mock client
 * that allows the app to run without a real Supabase connection.
 *
 * In production, always uses the real Supabase client.
 */
export function createClient() {
  // Use mock client in development when credentials are missing
  if (shouldUseMockSupabase()) {
    return createTypedDevSupabaseClient()
  }

  // Use real Supabase client when credentials are available
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}