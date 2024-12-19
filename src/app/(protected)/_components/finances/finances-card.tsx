/**
 * @module FinancesCard
 * @description A component that displays the summary of finances, including income and date.
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
 * Represents the finances data.
 */
interface Finances {
  id: string;
  date: Date;
  income: number;
}

/**
 * Represents the props for the FinancesCard component.
 */
interface FinancesCardProps {
  finances: Finances;
  className?: string;
}

/**
 * A component that displays the summary of finances, including income and date.
 * @param finances - The finances data.
 * @param className - The optional CSS class name for the component.
 * @returns The FinancesCard component.
 */
export const FinancesCard: React.FC<FinancesCardProps> = ({
  finances,
  className,
}) => {
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  });

  const formattedIncome = formatter.format(finances.income);

  return (
    <Card className={`cursor-pointer hover:bg-green-400 ${className || ""}`}>
      <CardHeader>
        <CardTitle>Finances Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Income: {formattedIncome}</CardDescription>
        <div className="text-sm">
          <strong>Date:</strong> {new Date(finances.date).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancesCard;

/**
 * Documentation generated with GitHub Copilot.
 */
