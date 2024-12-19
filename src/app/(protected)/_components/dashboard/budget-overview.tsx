/**
 * This module provides the BudgetOverview component.
 * It displays a pie chart of budget data.
 */

"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

import { findBudgetsById } from "@/../actions/budget-actions";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface BudgetData {
  name: string;
  value: number;
}

export function BudgetOverview() {
  const [data, setData] = useState<BudgetData[]>([]);
  const { theme } = useTheme(); // Gets current theme tool tip colouring based on theme.

  useEffect(() => {
    const fetchBudgets = async () => {
      const response = await findBudgetsById();
      if (Array.isArray(response) && response.length > 0) {
        setData(transformData(response));
      } else {
        console.error("Failed to fetch budgets");
        setData([]);
      }
    };

    fetchBudgets();
  }, []);

  const transformData = (budgets: any[]): BudgetData[] => {
    const currentMonth = new Date().getMonth();
    return budgets
      .filter((budget) => {
        const startDate = new Date(budget.startDate);
        const endDate = new Date(budget.endDate);
        return (
          startDate.getMonth() <= currentMonth &&
          endDate.getMonth() >= currentMonth
        );
      })
      .map((budget) => ({
        name: budget.category,
        value: budget.amount,
      }));
  };
 
  const currencyFormatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }); // Formats the currency to GBP – DOES NOT WORK IN ALL BROWSERS...

  const COLORS = [
    "#32CD32",
    "#3CB371",
    "#228B22",
    "#9ACD32",
    "#6B8E23",
    "#006400",
    "#008080",
    "#8FBC8F",
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%" 
          labelLine={false}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({ value }) => currencyFormatter.format(value)}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => currencyFormatter.format(value)}
          contentStyle={{
            backgroundColor: theme === "dark" ? "#333" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
          }}
        />
        <Legend layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default BudgetOverview;

/**
 * Documentation generated with GitHub Copilot.
 */
