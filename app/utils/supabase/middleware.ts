import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Middleware for intercepting requests and managing user authentication.
 *
 * @param {NextRequest} request The incoming HTTP request.
 * @returns {NextResponse} The Next.js response object after authentication check.
 *
 * @description
 * This middleware intercepts the request, checks if the user is authenticated by querying Supabase for the user data.
 * - If the user is authenticated, the request is allowed to proceed.
 * - If the user is not authenticated, they are redirected to the login page.
 *
 * The middleware uses the Supabase client to:
 * - Read cookies to check for an active user session.
 * - Handle user redirection based on authentication state.
 *
 * Usage:
 * - Use this middleware to protect routes that require an authenticated user.
 * - Suitable for handling global authentication checks before accessing protected pages.
 *
 * Notes:
 * - Ensure the Supabase client is properly initialized with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables.
 */

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (
    !user && // No authenticated user
    !request.nextUrl.pathname.startsWith('/login') &&
    request.nextUrl.pathname !== '/' &&
    !['/doctors', '/about', '/contact','/register/doctor','/register/patient','/register'].includes(request.nextUrl.pathname)
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}