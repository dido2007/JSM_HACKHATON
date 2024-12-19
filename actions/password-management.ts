/**
 * Module Description:
 *
 * Manages user password reset and update processes. Utilizes bcrypt for secure password hashing,
 * zod for validating input schemas, and integrates with custom email utilities for password reset workflows.
 * Supports database interactions through a unified databaseConnector for user and token management.
 */

"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { getUserByEmail } from "@/../data/user-data-access";
import { databaseConnector } from "@/../src/lib/database-connector";
import { sendPasswordResetEmail } from "@/../src/lib/email-service";
import { generatePasswordResetToken } from "@/../src/lib/token-management";
import { getPasswordResetTokenByToken } from "@/../data/token-data-access";
import {
  NewPasswordSchema,
  PasswordResetSchema,
} from "@/../schemas/validation-schemas";

/**
 * Handles the logic for resetting a user's password, including token generation and email notification.
 */
export const resetPassword = async (
  values: z.infer<typeof PasswordResetSchema>
) => {
  const validatedFields = PasswordResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );
  return { success: "Reset email sent!" };
};

/**
 * Processes the new password for a user, verifying the provided token and updating the password.
 */
export const updatePassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedFields.data;
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await databaseConnector.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await databaseConnector.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated!" };
};

/**
 * Documentation generated with GitHub Copilot.
 */
