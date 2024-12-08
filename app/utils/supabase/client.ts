import { createBrowserClient } from '@supabase/ssr'

/**
 * Creates a Supabase client specifically for browser-side operations.
 *
 * @returns {SupabaseClient} A configured Supabase client instance.
 *
 * @description
 * This function initializes a Supabase client using the following environment variables:
 * - `NEXT_PUBLIC_SUPABASE_URL`: The Supabase project URL.
 * - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The public anonymous API key for the Supabase project.
 *
 * Usage:
 * The returned client can be used to:
 * - Query your Supabase database.
 * - Manage user authentication.
 * - Interact with Supabase storage and other services.
 *
 * Notes:
 * - Ensure that both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
 *   are correctly set in your `.env.local` file.
 */

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

