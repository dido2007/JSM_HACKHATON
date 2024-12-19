/**
 * @fileOverview Authentication configuration using NextAuth.js. This file sets up the authentication
 * system for the application, specifying custom pages for sign-in and error handling, and defining
 * callbacks for authentication events. It leverages the PrismaAdapter for integration with a Prisma-based
 * database schema.
 *
 * Model template adapted from NextAuth.js documentation to fit our use case.
 * @see https://authjs.dev/guides/upgrade-to-v5
 */

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/../auth.config";
import { getUserById } from "@/../data/user-data-access";
import { databaseConnector } from "@/../src/lib/database-connector";
import { getTwoFactorConfirmationByUserId } from "@/../data/token-data-access";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/not-found",
  },
  events: {
    async linkAccount({ user }) {
      await databaseConnector.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in
        await databaseConnector.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(databaseConnector),
  session: { strategy: "jwt" },
  ...authConfig,
});

/**
 * Documentation generated with GitHub Copilot.
 */
