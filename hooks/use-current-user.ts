/**
 * A custom hook to get the current user from the session.
 * @module useCurrentUser
 */

import { useSession } from "next-auth/react";

/**
 * Retrieves the current user from the session.
 * @returns {object | undefined} The current user object, or undefined if no user is logged in.
 */
export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
};

/**
 * Documentation generated with GitHub Copilot.
 */
