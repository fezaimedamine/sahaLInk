import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Creates a Supabase client for server-side operations.
 *
 * @returns {SupabaseClient} A configured Supabase client instance.
 *
 * @description
 * This function initializes a Supabase client using:
 * - `NEXT_PUBLIC_SUPABASE_URL`: The Supabase project URL.
 * - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The public anonymous API key for the Supabase project.
 *
 * The client integrates with the Next.js `cookies` helper for:
 * - Reading cookies via `getAll()`.
 * - Writing cookies via `setAll()`.
 *
 * Usage:
 * - Use this function in server-side contexts (e.g., API routes, middleware).
 * - Useful for securely managing user sessions and performing authenticated database queries.
 *
 * Notes:
 * - Ensure environment variables are properly configured in `.env.local`.
 * - Includes error handling for Server Component scenarios where cookies can't be directly modified.
 */

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}