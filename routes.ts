/**
 * Module containing route configurations for the application.
 * @module routes
 */

/**
 * Publicly accessible routes.
 * @type {string[]}
 */
export const publicRoutes = ["/", "/new-verification"];

/**
 * Routes used for authentication purposes.
 */
export const authRoutes = [
  "/login",
  "/register",
  "/new-password",
  "/reset-password",
];

/**
 * Routes used for signed-in users.
 */
export const signedRoutes = [
  "/account",
  "/dashboard",
  "/my-budgets",
  "/learn-debt",
  "/my-expenses",
  "/learn-savings",
  "/learn-budgeting",
  "/learn-investment",
  "/get-started",
];

/**
 * API authentication routes.
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in.
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

/**
 * Documentation generated with GitHub Copilot.
 */
