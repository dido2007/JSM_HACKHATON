/**
 * This module contains functions related to budget actions.
 */

"use server";

import { getCurrentUser } from "@/../src/lib/session-management";
import { databaseConnector } from "@/../src/lib/database-connector";

/**
 * Retrieves a budget by its ID.
 * @param id - The ID of the budget.
 * @returns The budget object.
 */
export const getBudgetById = async (id: string) => {
  const budget = await databaseConnector.budget.findUnique({
    where: { id: id },
  });
  return budget;
};

/**
 * Creates a new budget.
 * @param budget - The budget object containing the necessary fields.
 * @returns The created budget object.
 */
export const createBudget = async ({ budget }: { budget: any }) => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorised", success: false };
  }

  if (
    !budget.title ||
    !budget.amount ||
    !budget.category ||
    !budget.startDate ||
    !budget.endDate
  ) {
    return { error: "Invalid fields!", success: false };
  }

  const formattedStartDate = new Date(budget.startDate).toISOString();
  const formattedEndDate = new Date(budget.endDate).toISOString();

  const createdBudget = await databaseConnector.budget.create({
    data: {
      title: budget.title,
      amount: parseFloat(budget.amount),
      category: budget.category,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      userId: user.id,
    },
  });

  return {
    success: true,
    // budget: createdBudget
  };
};

/**
 * Finds budgets by user ID.
 * @returns An array of budgets.
 */
export const findBudgetsById = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorised", success: false };
  }

  const budgets = await databaseConnector.budget.findMany({
    where: { userId: user.id },
  });
  return budgets;
};

/**
 * Deletes a budget by its ID.
 * @param id - The ID of the budget to delete.
 * @returns A success message.
 */
export const deleteBudget = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorised", success: false };
  }

  const budget = await databaseConnector.budget.findUnique({
    where: { id: id },
  });

  if (!budget) {
    return { error: "Budget not found!", success: false };
  }

  if (budget.userId !== user.id) {
    return { error: "Unauthorised", success: false };
  }

  await databaseConnector.budget.delete({ where: { id: id } });
  return { success: true };
};

/**
 * Updates a budget.
 * @param budget - The updated budget object.
 * @returns The updated budget object.
 */
export const alterBudget = async (budget: {
  id: string;
  title: string;
  amount: number;
  category: string;
  startDate: Date;
  endDate: Date;
}) => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorized", success: false };
  }

  // Only update the budget if the current user owns it
  const updatedBudget = await databaseConnector.budget.update({
    where: {
      id: budget.id,
    },
    data: {
      title: budget.title,
      amount: budget.amount,
      category: budget.category,
      startDate: budget.startDate,
      endDate: budget.endDate,
    },
  });

  return {
    success: true,
    budget: updatedBudget,
  };
};
