/**
 * This module extends the NextAuth module and defines additional types and interfaces.
 * It also modifies the Session interface to include an ExtendedUser type.
 * 
 * @module next-auth
 */

import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  isTwoFactorEnabled: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

/**
 * Documentation generated with GitHub Copilot.
 */
