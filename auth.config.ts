/**
 * Module for configuring authentication in the application.
 * This module exports a default configuration object that specifies the authentication providers and their authorization logic.
 */

import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { SignInSchema } from "@/../schemas/validation-schemas";
import { getUserByEmail } from "@/../data/user-data-access";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !(user as { password: string }).password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            (user as { password: string }).password
          );

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

/**
 * Documentation generated with GitHub Copilot.
 */
