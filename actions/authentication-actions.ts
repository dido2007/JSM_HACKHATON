/**
 * Module Description:
 *
 * Handles user authentication processes including signing up, signing in, and signing out.
 * It leverages zod for schema validation to ensure data integrity for authentication actions.
 * This module integrates with the Prisma Client for database interactions, NextAuth for session management,
 * and custom email notification utilities for verification and two-factor authentication processes.
 *
 * zod schema validation expanded and adapted from:
 * @see https://medium.com/@weidagang/zod-schema-validation-made-easy-195f86d82d44
 */

"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { User } from "@prisma/client";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/../auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/../routes";
import { databaseConnector } from "@/../src/lib/database-connector";
import { SignInSchema, SignUpSchema } from "@/../schemas/validation-schemas";

import {
  getUserByEmail,
  getUserByEmailPassword,
} from "@/../data/user-data-access";
import {
  sendVerificationEmail,
  sendTwoFactorAuthenticationEmail,
} from "@/../src/lib/email-service";
import {
  getTwoFactorTokenByEmail,
  getTwoFactorConfirmationByUserId,
} from "@/../data/token-data-access";
import {
  generateEmailVerificationToken,
  generateTwoFactorAuthenticationToken,
} from "@/../src/lib/token-management";

/**
 * Handles the sign-up process, including user creation and sending a verification email.
 * Validates the provided user details against the SignUpSchema.
 */
export const signUpAction = async (values: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await databaseConnector.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateEmailVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);
  return { success: "Confirmation email sent!" };
};

/**
 * Manages the sign-in process, including authentication and two-factor verification if enabled.
 * Validates the provided credentials against the SignInSchema.
 */
export const signInAction = async (
  values: z.infer<typeof SignInSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = SignInSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = (await getUserByEmail(email)) as User | null;
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateEmailVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent!" };
  }

  if (existingUser.isTwoFactorEnabled) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(email);

      if (
        !twoFactorToken ||
        twoFactorToken.token !== code ||
        new Date(twoFactorToken.expires) < new Date()
      ) {
        return { error: "Invalid or expired code!" };
      }

      await databaseConnector.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );
      if (existingConfirmation) {
        await databaseConnector.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await databaseConnector.twoFactorConfirmation.create({
        data: { userId: existingUser.id },
      });
    } else {
      const twoFactorToken = await generateTwoFactorAuthenticationToken(email);
      await sendTwoFactorAuthenticationEmail(
        twoFactorToken.email,
        twoFactorToken.token
      );
      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError && error.type === "CredentialsSignin") {
      return { error: "Invalid credentials!" };
    }
    // Log or handle other errors as needed
    throw error;
  }
};

/**
 * Handles user sign-out by invoking the signOut function from the authentication library.
 */
export const signOutAction = async () => {
  await signOut({ redirectTo: "/" });
};

/**
 * Documentation generated with GitHub Copilot.
 */
