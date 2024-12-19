/**
 * Module Description:
 *
 * Manages session-based authentication operations, specifically retrieving user information
 * from the current session. This module acts as a centralised point for session handling
 * within the application, ensuring consistency and reuse.
 */

import { auth } from "@/../auth";

/**
 * Retrieves the current session and returns the session object.
 * This function centralises session retrieval to avoid duplicate calls to the auth service.
 */
async function getCurrentSession() {
  return await auth();
}

/**
 * Retrieves the currently authenticated user from the session.
 */
export const getCurrentUser = async () => {
  const session = await getCurrentSession();
  return session?.user || null;
};

/**
 * Documentation generated with GitHub Copilot.
 */
