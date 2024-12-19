"use client";

import React, { useEffect, useState } from "react";
import { getAllExpenses } from "@/../actions/expense-actions";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from "recharts";

interface ExpenseData {
  name: string;
  total: number;
}

export function ExpensesOverview() {
  const [data, setData] = useState<ExpenseData[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await getAllExpenses();
      if (response.success && response.expenses) {
        setData(transformData(response.expenses).filter(expense => expense.total > 0));
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
    const monthTotals = Array.from({ length: 12 }, () => 0);
    expenses.forEach((expense) => {
      const month = new Date(expense.date).getMonth();
      monthTotals[month] += expense.amount;
    });

    return monthTotals.map((total, index) => ({
      name: new Date(2024, index, 1).toLocaleString("default", {
        month: "short",
      }),
      total: Math.round(total),
    }));
  };

  return (
    <ResponsiveContainer width="100%" height={335}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          hide={false}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `£${value}`}
        />
        <Bar
          dataKey="total"
          fill="#32CD32"
          radius={[4, 4, 0, 0]}
        >
          <LabelList
            dataKey="total"
            position="top"
            formatter={(value: number) => `£${value}`}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
