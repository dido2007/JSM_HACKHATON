/**
 * Module Description:
 * 
 * Module for handling user account settings.
 * This module provides functions to update various settings of a user's account, such as email and password.
 * It interacts with the authentication module, database connector, and email service to perform the necessary operations.
 * @module account-settings
 */
"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { update } from "@/../auth";
import { getCurrentUser } from "@/../src/lib/session-management";
import { sendVerificationEmail } from "@/../src/lib/email-service";
import { databaseConnector } from "@/../src/lib/database-connector";
import { AccountSettingsSchema } from "@/../schemas/validation-schemas";
import { getUserByEmail, getUserById } from "@/../data/user-data-access";
import { generateEmailVerificationToken } from "@/../src/lib/token-management";

// Function to handle account settings update.
export const settings = async (
  values: z.infer<typeof AccountSettingsSchema>
) => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorised" };
  }

  const databaseConnectorUser = await getUserById(user.id);

  if (!databaseConnectorUser) {
    return { error: "Unauthorised" };
  }

  // Check if email is being updated.
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateEmailVerificationToken(
      values.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification email sent!" };
  }

  // Check if password is being updated.
  if (values.password && values.newPassword && databaseConnectorUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      databaseConnectorUser.password
    );

    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  // Update the user's settings in the database.
  const updatedUser = await databaseConnector.user.update({
    where: { id: databaseConnectorUser.id },
    data: {
      ...values,
    },
  });

  // Update the user's settings in the authentication module.
  update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
    },
  });

  return { success: "Settings Updated!" };
};

/**
 * Documentation generated with GitHub Copilot.
 */
