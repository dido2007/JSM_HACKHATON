/**
 * This module contains functions related to expense actions.
 * These functions handle operations such as retrieving, creating, updating, and deleting expenses.
 */

"use server";

import { getCurrentUser } from "@/../src/lib/session-management";
import { databaseConnector } from "@/../src/lib/database-connector";


/**
 * Creates a new expense.
 * @param expenses - The expense object containing the details of the expense to create.
 * @returns The created expense object.
 */
export const createExpenses = async ({ expenses }: { expenses: any }) => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorised", success: false };
  }

  if (
    !expenses.title ||
    !expenses.amount ||
    !expenses.category ||
    !expenses.date ||
    !expenses.description
  ) {
    return { error: "Invalid fields!", success: false };
  }

  const formattedDate = new Date(expenses.date).toISOString();

  const createdExpenses = await databaseConnector.expenses.create({
    data: {
      title: expenses.title,
      amount: parseFloat(expenses.amount),
      category: expenses.category,
      date: formattedDate,
      description: expenses.description,
      userId: user.id,
    },
  });

  return {
    success: true,
    expenses: createdExpenses,
  };
};

/**
 * Retrieves all expenses for the current user.
 * @returns An array of expense objects.
 */
export const findExpensesById = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorised", success: false };
  }

  const expenses = await databaseConnector.expenses.findMany({
    where: { userId: user.id },
  });
  return expenses;
};

/**
 * Deletes an expense by its ID.
 * @param id - The ID of the expense to delete.
 * @returns A success message if the expense was deleted successfully.
 */
export const deleteExpenses = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorised", success: false };
  }

  const expenses = await databaseConnector.expenses.findUnique({
    where: { id: id },
  });

  if (!expenses) {
    return { error: "Expenses not found!", success: false };
  }

  if (expenses.userId !== user.id) {
    return { error: "Unauthorised", success: false };
  }

  await databaseConnector.expenses.delete({ where: { id: id } });
  return { success: true };
};

/**
 * Updates an existing expense.
 * @param expenses - The updated expense object.
 * @returns The updated expense object.
 */
export const alterExpense = async (expenses: {
  id: string;
  title: string;
  amount: number;
  date: Date;
  category: string;
  description: string;
}) => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorized", success: false };
  }

  // Only update the expense if the current user owns it
  const updatedExpenses = await databaseConnector.expenses.update({
    where: {
      id: expenses.id,
    },
    data: {
      title: expenses.title,
      amount: expenses.amount,
      date: expenses.date,
      category: expenses.category,
      description: expenses.description,
    },
  });

  return {
    success: true,
    expenses: updatedExpenses,
  };
};

// DashboardPage

/**
 * Retrieves all expenses for the current user within the current year.
 * @returns An array of expense objects.
 */
export const getAllExpenses = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorized", success: false };
  }

  const year = new Date().getFullYear();
  const firstDayOfYear = new Date(year, 0, 1); // January 1st of the current year
  const firstDayOfNextYear = new Date(year + 1, 0, 1); // January 1st of the next year

  const expenses = await databaseConnector.expenses.findMany({
    where: {
      userId: user.id,
      date: {
        gte: firstDayOfYear,
        lt: firstDayOfNextYear,
      },
    },
  });

  if (!expenses) {
    return { error: "No expenses found", success: false };
  }

  return { success: true, expenses: expenses };
};

/**
 * Documentation generated with GitHub Copilot.
 */
