/**
 * Middleware for handling authentication and routing based on user's authentication status.
 * This middleware utilizes NextAuth for session management and controls access to routes
 * based on the user's login status and route categorization (public, auth, and API auth routes).
 * Adapted from the Clerk documentation for Next.js authentication middleware usage.
 *
 * @see https://clerk.com/docs/references/nextjs/auth-middleware#usage
 */

import NextAuth from "next-auth";

import authConfig from "@/../auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/../routes";

const { auth } = NextAuth(authConfig);

/**
 * Middleware function for handling authentication and authorization.
 *
 * @param req - The request object containing information about the request.
 * @returns A response object or null.
 */
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isLoggedIn) {
    if (isPublicRoute) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return null;
});

// Matcher taken from Clerk documentation for Next.js authentication middleware usage.
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

/**
 * Documentation generated with GitHub Copilot.
 */
