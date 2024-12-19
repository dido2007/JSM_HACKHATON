/**
 * @module BudgetCard
 * @description A component that displays a budget card with details such as title, amount, category, start date, and end date.
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

/**
 * Represents a budget object.
 */
interface Budget {
  id: string;
  title: string;
  amount: number;
  category: string;
  startDate: Date;
  endDate: Date;
}

/**
 * Props for the BudgetCard component.
 */
interface BudgetCardProps {
  budget: Budget;
  className?: string;
}

/**
 * A component that displays a budget card.
 * @param {BudgetCardProps} props - The props for the BudgetCard component.
 * @returns {JSX.Element} The rendered BudgetCard component.
 */
export const BudgetCard: React.FC<BudgetCardProps> = ({
  budget,
  className,
}) => {
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedAmount = formatter.format(budget.amount);

  /**
   * Returns an emoji based on the category.
   * @param {string} category - The category of the budget.
   * @returns {string} The emoji corresponding to the category.
   */
  const getCategoryEmoji = (category: string): string => {
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
    return categoryEmojis[category] || "🤷"; // Default to "Other" emoji if no match
  };

  return (
    <Card className={`cursor-pointer hover:bg-green-400 ${className || ""}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{budget.title}</CardTitle>
          {getCategoryEmoji(budget.category)}
        </div>
        <div className="text-xs text-gray-500">Category: {budget.category}</div>
      </CardHeader>
      <CardContent>
        <CardDescription>Amount: {formattedAmount}</CardDescription>
        <div className="text-sm">
          <strong>Start:</strong>{" "}
          {new Date(budget.startDate).toLocaleDateString()}
          <span className="mx-2">|</span>
          <strong>End:</strong> {new Date(budget.endDate).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Documentation generated with GitHub Copilot.
 */
