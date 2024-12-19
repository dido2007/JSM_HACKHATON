/**
 * This module contains functions related to finances management (i.e. income).
 */

"use server";

import { getCurrentUser } from "@/../src/lib/session-management";
import { databaseConnector } from "@/../src/lib/database-connector";

/**
 * Retrieves the finances associated with the current user.
 * @returns An object containing the finances if found, or an error message if not found.
 */
export const getFinancesById = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorised", success: false };
  }

  const finances = await databaseConnector.finances.findMany({
    where: {
      userId: user.id,
    },
  });

  return finances.length
    ? { success: true, finances }
    : { error: "No finances found", success: false };
};

/**
 * Creates a new finance entry for the current user.
 * @param finances - The details of the finance entry to be created.
 * @returns An object containing the created finance entry if successful, or an error message if not successful.
 */
export const createFinances = async ({ finances }: { finances: any }) => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorised", success: false };
  }

  if (!finances.amount || !finances.startDate) {
    return { error: "Invalid fields!", success: false };
  }

  const formattedStartDate = new Date(finances.startDate).toISOString();

  const createdFinances = await databaseConnector.finances.create({
    data: {
      income: parseFloat(finances.amount), // Changed from finances.income to finances.amount
      date: formattedStartDate,
      userId: user.id,
    },
  });

  return {
    success: true,
    finances: createdFinances,
  };
};

/**
 * Updates an existing finance entry.
 * @param finances - The updated details of the finance entry.
 * @returns An object containing the updated finance entry if successful, or an error message if not successful.
 */
export const alterFinances = async (finances: {
  id: string;
  date: Date;
  income: number;
}) => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorized", success: false };
  }

  // Attempt to update the finances entry if the current user owns it
  try {
    const updatedFinances = await databaseConnector.finances.update({
      where: {
        id: finances.id,
        userId: user.id, // Ensuring that the finance entry belongs to the user
      },
      data: {
        date: finances.date,
        income: finances.income,
      },
    });

    return {
      success: true,
      finances: updatedFinances,
    };
  } catch (error) {
    return { error: "Finance update failed", success: false };
  }
};

/**
 * Deletes a finance entry.
 * @param id - The ID of the finance entry to be deleted.
 * @returns An object indicating the success or failure of the deletion.
 */
export const deleteFinance = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorized", success: false };
  }

  // Attempt to find the finance record before attempting to delete
  const finance = await databaseConnector.finances.findUnique({
    where: { id: id, userId: user.id }, // Ensure only the user's finance is fetched
  });

  if (!finance) {
    return { error: "Finance not found", success: false };
  }

  try {
    await databaseConnector.finances.delete({
      where: { id: id },
    });
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete finance", success: false };
  }
};

/**
 * Documentation generated with GitHub Copilot.
 */
