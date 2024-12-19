/**
 * Module Description:
 *
 * Initialises and exports a singleton PrismaClient instance for database operations.
 * Ensures a single instance is reused throughout the application to optimise resource usage.
 */

import { PrismaClient } from "@prisma/client";

// Extends the global NodeJS namespace to include the PrismaClient instance.
declare global {
  var prismaClientInstance: PrismaClient | undefined;
}

/**
 * The single PrismaClient instance for the application.
 * Reuses an existing global instance if available, otherwise creates a new one.
 * This pattern helps prevent creating numerous connections in a development environment,
 * which can lead to exceeding database connection limits.
 */
export const databaseConnector =
  globalThis.prismaClientInstance || new PrismaClient();

// In non-production environments, attach the PrismaClient instance to the global object to reuse it.
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaClientInstance = databaseConnector;
}

/**
 * Documentation generated with GitHub Copilot.
 */
