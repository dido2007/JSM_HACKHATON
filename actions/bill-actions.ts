/**
 * This module contains functions related to bills actions.
 * These functions handle operations such as retrieving, creating, updating, and deleting expenses.
 */

"use server";

import { getCurrentUser } from "@/../src/lib/session-management";
import { databaseConnector } from "@/../src/lib/database-connector";

/**
 * Creates a new bill.
 * @param bill - The bill object containing the details of the bill to create.
 * @returns The created bill object.
 */
export const createBills = async ({ bill }: { bill: any }) => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorized", success: false };
  }

  if (
    !bill.title ||
    !bill.amount ||
    !bill.category ||
    !bill.date ||
    !bill.endDate ||
    !bill.description ||
    !bill.frequency
  ) {
    return { error: "Invalid fields!", success: false };
  }

  const formattedDate = new Date(bill.date).toISOString();
  const formattedEndDate = new Date(bill.endDate).toISOString();

  const createdBill = await databaseConnector.bills.create({
    data: {
      title: bill.title,
      amount: parseFloat(bill.amount),
      category: bill.category,
      date: formattedDate,
      endDate: formattedEndDate,
      description: bill.description,
      frequency: bill.frequency,
      userId: user.id,
    },
  });

  return {
    success: true,
    bill: createdBill,
  };
};

/**
 * Retrieves all bills for the current user within the current year.
 * @returns An array of bill objects.
 */
export const findBillsById = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorized", success: false };
  }

  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, 0, 1);
  const endDate = new Date(currentYear + 1, 0, 1);

  const bills = await databaseConnector.bills.findMany({
    where: {
      userId: user.id,
      date: {
        gte: startDate,
        lt: endDate,
      },
    },
  });

  return bills;
};

/**
 * Deletes a bill by its ID.
 * @param id - The ID of the bill to delete.
 * @returns A success message if the bill was deleted successfully.
 */
export const deleteBills = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorized", success: false };
  }

  const bill = await databaseConnector.bills.findUnique({
    where: { id: id },
  });

  if (!bill) {
    return { error: "Bill not found!", success: false };
  }

  if (bill.userId !== user.id) {
    return { error: "Unauthorized", success: false };
  }

  await databaseConnector.bills.delete({ where: { id: id } });
  return { success: true };
};

/**
 * Updates an existing bill.
 * @param bill - The updated bill object.
 * @returns The updated bill object.
 */
export const alterBills = async (bill: {
  id: string;
  title: string;
  amount: number;
  date: Date;
  endDate: Date;
  category: string;
  description: string;
  frequency: string;
}) => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorized", success: false };
  }

  const updatedBill = await databaseConnector.bills.update({
    where: { id: bill.id },
    data: {
      title: bill.title,
      amount: bill.amount,
      date: bill.date,
      endDate: bill.endDate,
      category: bill.category,
      description: bill.description,
      frequency: bill.frequency,
    },
  });

  return {
    success: true,
    bill: updatedBill,
  };
};

/**
 * Documentation generated with GitHub Copilot.
 */
