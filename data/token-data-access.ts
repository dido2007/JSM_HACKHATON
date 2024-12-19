/**
 * Module Description:
 *
 * Consolidates data access operations for various tokens used in the application,
 * including password reset tokens, two-factor authentication tokens, and email verification tokens.
 * This module simplifies the management of token-related functionalities by providing a unified
 * interface for querying and interacting with token data in the database.
 */

import { databaseConnector } from "@/../src/lib/database-connector";

/**
 * Retrieves a password reset token by its value.
 * Useful for validating a password reset request in authentication flows.
 */
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    return await databaseConnector.passwordResetToken.findUnique({
      where: { token },
    });
  } catch (error) {
    console.error(
      `Error retrieving password reset token by token (${token}):`,
      error
    );
    return null;
  }
};

/**
 * Retrieves a password reset token associated with a user's email address.
 * Allows for checking if a password reset operation is already in progress.
 */
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    return await databaseConnector.passwordResetToken.findFirst({
      where: { email },
    });
  } catch (error) {
    console.error(
      `Error retrieving password reset token by email (${email}):`,
      error
    );
    return null;
  }
};

/**
 * Retrieves a two-factor authentication token by its value.
 * Used in the process of verifying a user's second authentication factor.
 */
export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    return await databaseConnector.twoFactorToken.findUnique({
      where: { token },
    });
  } catch (error) {
    console.error(
      `Error retrieving two-factor token by token (${token}):`,
      error
    );
    return null;
  }
};

/**
 * Retrieves a two-factor authentication token associated with a user's email address.
 * Supports the flow of issuing a new two-factor token when requested.
 */
export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    return await databaseConnector.twoFactorToken.findFirst({
      where: { email },
    });
  } catch (error) {
    console.error(
      `Error retrieving two-factor token by email (${email}):`,
      error
    );
    return null;
  }
};

/**
 * Retrieves a two-factor authentication confirmation record by user ID.
 * Useful for checking if the user has already completed two-factor authentication setup.
 */
export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    return await databaseConnector.twoFactorConfirmation.findUnique({
      where: { userId },
    });
  } catch (error) {
    console.error(
      `Error retrieving two-factor confirmation by user ID (${userId}):`,
      error
    );
    return null;
  }
};

/**
 * Retrieves an email verification token by its value.
 * Essential for validating a user's email address during the account creation or update process.
 */
export const getVerificationTokenByToken = async (token: string) => {
  try {
    return await databaseConnector.verificationToken.findUnique({
      where: { token },
    });
  } catch (error) {
    console.error(
      `Error retrieving verification token by token (${token}):`,
      error
    );
    return null;
  }
};

/**
 * Retrieves an email verification token associated with a user's email address.
 * Facilitates re-sending of the verification email if the user requests it.
 */
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return await databaseConnector.verificationToken.findFirst({
      where: { email },
    });
  } catch (error) {
    console.error(
      `Error retrieving verification token by email (${email}):`,
      error
    );
    return null;
  }
};

/**
 * Documentation generated with GitHub Copilot.
 */
