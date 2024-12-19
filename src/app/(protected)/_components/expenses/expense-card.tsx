/**
 * @module ExpenseCard
 * @description A React component that represents an expense card.
 */

"use client";

import React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/../src/components/ui/card";

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
  description: string;
}

interface ExpenseCardProps {
  expense: Expense;
  className?: string;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  expense,
  className,
}) => {
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  });

  const formattedAmount = formatter.format(expense.amount);

  // Function to return emoji based on the category.
  const getCategoryEmoji = (category: string) => {
    const categoryEmojis: { [key: string]: string } = {
      Utilities: "🏠",
      Groceries: "🛒",
      Transport: "🚗",
      Investment: "📈",
      Entertainment: "🎫",
      Dining: "🍽️",
      Shopping: "🛍️",
      Travel: "✈️",
      Health: "🏥",
      Personal: "🙋",
      Other: "📦",
    };
    return categoryEmojis[category] || "🤷"; // Default to "Other" emoji if no match.
  };

  return (
    <Card className={`cursor-pointer hover:bg-green-400 ${className || ""}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{` ${expense.title}`}</CardTitle>
          {getCategoryEmoji(expense.category)}
        </div>
        <div className="text-xs text-gray-500">
          Category: {expense.category}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>Amount: {formattedAmount}</CardDescription>
        <div className="text-sm">
          <strong>Transaction Date:</strong>{" "}
          {new Date(expense.date).toLocaleDateString()}
          <span className="mx-2">|</span>
          <strong>Description</strong> {expense.description}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;
