/**
 * This module contains the function for verifying the email address of a user.
 * It checks the token and updates the database accordingly.
 * @module newVerification
 */

"use server";

import { getUserByEmail } from "@/../data/user-data-access";
import { databaseConnector } from "@/../src/lib/database-connector";
import { getVerificationTokenByToken } from "@/../data/token-data-access";

/**
 * Verifies the email address of a user by checking the token and updating the database accordingly.
 *
 * @param {string} token - The token to verify the email address.
 * @returns {Object} An object containing either an error or a success message.
 * @property {string} error - Error message if the verification fails.
 * @property {string} success - Success message if the verification is successful.
 */
export const newVerification = async (token: string) => {
  // Retrieve token from database.
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  // Checks if token has expired.
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  // Retrieves user associated with email from the token.
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  // Updates user's email verification status.
  await databaseConnector.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  // Deletes the token from the database.
  await databaseConnector.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified!" };
};

/**
 * Documentation generated with GitHub Copilot.
 */
