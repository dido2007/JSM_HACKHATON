/**
 * Module Description:
 *
 * Facilitates data access operations for user entities in the database.
 * Offers functions to retrieve user details by email or ID, with error handling to ensure robustness.
 */

import bcrypt from "bcryptjs";
import { databaseConnector } from "@/../src/lib/database-connector";

/**
 * Retrieves a user entity based on the provided email address.
 * Returns the user object if found, otherwise returns null to safely indicate no result.
 */
export const getUserByEmail = async (email: string) => {
  try {
    const user = await databaseConnector.user.findUnique({ where: { email } });

    return user;
  } catch (error) {
    console.error(`Error retrieving user by email (${email}):, error`);
    return null;
  }
};

export const getUserByEmailPassword = async (
  email: string,
  password: string
) => {
  try {
    const user = await databaseConnector.user.findUnique({ where: { email } });

    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password ?? ""
    );

    if (!isPasswordValid) {
      return null;
    }
    return user;
  } catch (error) {
    console.error(`Error retrieving user by email (${email}):, error`);
    return null;
  }
};

/**
 * Retrieves a user entity based on the provided user ID.
 * Returns the user object if found, otherwise returns null to safely indicate no result.
 */
export const getUserById = async (id: string) => {
  try {
    const user = await databaseConnector.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    console.error(`Error retrieving user by ID (${id}):`, error);
    return null;
  }
};

/**
 * Documentation generated with GitHub Copilot.
 */
