/**
 * @module ExpensesEvolution
 * @description Component that displays a line chart of the evolution of expenses over time.
 */

"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

import { getAllExpenses } from "@/../actions/expense-actions";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ExpenseData {
  month: string;
  total: number;
}

export function ExpensesEvolution() {
  const [data, setData] = useState<ExpenseData[]>([]);
  const { theme } = useTheme(); // Gets current theme tool tip colouring based on theme.

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await getAllExpenses();
      if (response.success && response.expenses) {
        setData(transformData(response.expenses));
      } else {
        console.error(response.error);
        setData([]); // Set to empty if there's an error or no expenses.
      }
    };

    fetchExpenses();
  }, []);

  const transformData = (
    expenses: { date: Date; amount: number }[]
  ): ExpenseData[] => {
    const currentMonth = new Date().getMonth();
    const monthTotals = Array.from({ length: currentMonth + 1 }, () => 0);

    expenses.forEach((expense) => {
      const month = new Date(expense.date).getMonth();
      if (month <= currentMonth) {
        monthTotals[month] += expense.amount;
      }
    });

    return monthTotals.map((total, index) => ({
      month: new Date(2024, index).toLocaleString("default", { month: "long" }),
      total: Math.round(total),
    }));
  };

  const currencyFormatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }); // Formats the currency to GBP – DOES NOT WORK IN ALL BROWSERS...

  return (
    <ResponsiveContainer width="100%" height={100}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="month" hide={true} />
        <YAxis hide={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme === "dark" ? "#333" : "#fff", // Dark or light theme background.
            color: theme === "dark" ? "#fff" : "#000", // Text color based on theme.
          }}
        />
        <Line
          type="linear"
          dataKey="total"
          stroke="#32CD32"
          strokeWidth={5}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ExpensesEvolution;
