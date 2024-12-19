/**
 * Module Description:
 *
 * Handles the generation of various tokens required for authentication processes including
 * two-factor authentication, password reset, and email verification. Ensures old tokens are
 * invalidated before generating new ones.
 */

import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { databaseConnector } from "@/../src/lib/database-connector";
import {
  getTwoFactorTokenByEmail,
  getVerificationTokenByEmail,
  getPasswordResetTokenByEmail,
} from "@/../data/token-data-access";

/**
 * Generates a unique token for Two-Factor Authentication in hex format and updates the database accordingly.
 *
 * @param {string} email - User's email address to associate the token with.
 * @returns The created two-factor authentication token along with its expiration.
 */
export const generateTwoFactorAuthenticationToken = async (email: string) => {
  // Generating a 4-character long hex token
  const token = crypto.randomBytes(2).toString("hex").toUpperCase().slice(0, 4); // 2 bytes => 4 hex chars.
  const expiration = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 min.

  await invalidateExistingToken(
    getTwoFactorTokenByEmail,
    email,
    "twoFactorToken"
  );

  return await databaseConnector.twoFactorToken.create({
    data: { email, token, expires: expiration },
  });
};

/**
 * Generates a unique token for password reset and updates the database accordingly.
 *
 * @param {string} email - User's email address to associate the token with.
 * @returns The created password reset token along with its expiration.
 */
export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expiration = new Date(new Date().getTime() + 60 * 30 * 1000); // 30 min.

  await invalidateExistingToken(
    getPasswordResetTokenByEmail,
    email,
    "passwordResetToken"
  );

  return await databaseConnector.passwordResetToken.create({
    data: { email, token, expires: expiration },
  });
};

/**
 * Generates a unique token for email verification and updates the database accordingly.
 *
 * @param {string} email - User's email address to associate the token with.
 * @returns The created email verification token along with its expiration.
 */
export const generateEmailVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expiration = new Date(new Date().getTime() + 60 * 30 * 1000); // 30 min.

  await invalidateExistingToken(
    getVerificationTokenByEmail,
    email,
    "verificationToken"
  );

  return await databaseConnector.verificationToken.create({
    data: { email, token, expires: expiration },
  });
};

/**
 * Invalidates any existing tokens of the same type for a user before generating a new one.
 *
 * @param {Function} retrievalFunction - Function to retrieve the existing token by email.
 * @param {string} email - Email address to find the existing token for.
 * @param {string} modelName - The model name in the database to delete the token from.
 */
async function invalidateExistingToken(
  retrievalFunction: (email: string) => Promise<any>,
  email: string,
  modelName: string
) {
  const existingToken = await retrievalFunction(email);
  console.log("Existing Token: ", existingToken); // Log the existing token to see what's fetched
  if (existingToken) {
    const deletionResult = await (databaseConnector as any)[modelName].delete({
      where: { id: existingToken.id },
    });
    console.log("Deletion Result: ", deletionResult); // Log the result of the deletion
  }
}

/**
 * Documentation generated with GitHub Copilot.
 */
