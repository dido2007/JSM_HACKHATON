"use client";

import React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/../src/components/ui/card";

interface Bill {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
  endDate: Date;
  description: string;
  frequency: string;
}

interface RecurringBillsCardProps {
  bill: Bill;
  key: string;
  className?: string;
  onClick: () => void;
}

export const RecurringBillsCard: React.FC<RecurringBillsCardProps> = ({
  bill,
  className,
}) => {
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  });

  const formattedAmount = formatter.format(bill.amount);

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
          <CardTitle>{bill.title}</CardTitle>
          {getCategoryEmoji(bill.category)}
        </div>
        <div className="text-xs text-gray-500">Category: {bill.category}</div>
      </CardHeader>
      <CardContent>
        <CardDescription>Amount: {formattedAmount}</CardDescription>
        <CardDescription>
          Frequency: {bill.frequency}
        </CardDescription>
        <div className="text-sm">
          <strong>Start Date:</strong>{" "}
          {new Date(bill.date).toLocaleDateString()}
          <span className="mx-2">|</span>
          <strong>End Date:</strong>{" "}
          {new Date(bill.endDate).toLocaleDateString()}
          <div className="mt-2">
            <strong>Description:</strong> {bill.description}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecurringBillsCard;
