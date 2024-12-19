/**
 * This module contains the BudgetProgressList component.
 * It displays the budgets for the current month and their progress.
 */

/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import { findBudgetsById } from "@/../actions/budget-actions";
import { getAllExpenses } from "@/../actions/expense-actions";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/../src/components/ui/table";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/../src/components/ui/card";
import { Progress } from "@/../src/components/ui/progress";

interface Budget {
  id: string;
  userId: string;
  title: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  category: string;
}

const BudgetProgressList: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [expenses, setExpenses] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchExpensesAndBudgets = async () => {
      const budgetsResponse = await findBudgetsById();
      const expensesResponse = await getAllExpenses();

      if (
        budgetsResponse &&
        !("error" in budgetsResponse) &&
        expensesResponse &&
        expensesResponse.success
      ) {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const filteredBudgets = budgetsResponse.filter((budget: Budget) => {
          const startDate = new Date(budget.startDate);
          const endDate = new Date(budget.endDate);
          return (
            startDate.getMonth() <= currentMonth &&
            endDate.getMonth() >= currentMonth &&
            startDate.getFullYear() === currentYear &&
            endDate.getFullYear() === currentYear
          );
        });

        // Compute total expenses per category for the current month
        const expensesByCategory: Record<string, number> = {};
        expensesResponse.expenses?.forEach(
          (expense: { category: string; amount: number; date: Date }) => {
            const expenseDate = new Date(expense.date);
            if (
              expenseDate.getMonth() === currentMonth &&
              expenseDate.getFullYear() === currentYear
            ) {
              expensesByCategory[expense.category] =
                (expensesByCategory[expense.category] || 0) + expense.amount;
            }
          }
        );

        setExpenses(expensesByCategory);
        setBudgets(filteredBudgets);
      } else {
        console.error("Failed to fetch data");
      }
    };

    fetchExpensesAndBudgets();
  }, []);

  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  });

  const calculateProgress = (budget: Budget) => {
    const spent = expenses[budget.category] || 0;
    const remaining = budget.amount - spent;
    return Math.max(0, ((budget.amount - remaining) / budget.amount) * 100);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Current Month's Budgets</CardTitle>
          <svg
            width="18"
            height="18"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.85001 7.50043C1.85001 4.37975 4.37963 1.85001 7.50001 1.85001C10.6204 1.85001 13.15 4.37975 13.15 
              7.50043C13.15 10.6211 10.6204 13.1509 7.50001 13.1509C4.37963 13.1509 1.85001 10.6211 1.85001 7.50043ZM7.50001 
              0.850006C3.82728 0.850006 0.850006 3.82753 0.850006 7.50043C0.850006 11.1733 3.82728 14.1509 7.50001 14.1509C11.1727 
              14.1509 14.15 11.1733 14.15 7.50043C14.15 3.82753 11.1727 0.850006 7.50001 0.850006ZM7.00001 8.00001V3.12811C7.16411 
              3.10954 7.33094 3.10001 7.50001 3.10001C9.93006 3.10001 11.9 5.07014 11.9 7.50043C11.9 7.66935 11.8905 7.83604 11.872 
              8.00001H7.00001Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {[
                "Title",
                "Amount",
                "Category",
                "Spent",
                "Remaining",
                "Progress",
              ].map((key) => (
                <TableHead key={key}>{key}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgets.map((budget) => (
              <TableRow key={budget.id} className="hover:bg-green-800">
                <TableCell>{budget.title}</TableCell>
                <TableCell>{formatter.format(budget.amount)}</TableCell>
                <TableCell>{budget.category}</TableCell>
                <TableCell>
                  {formatter.format(expenses[budget.category] || 0)}
                </TableCell>
                <TableCell>
                  
                  {formatter.format(budget.amount - (expenses[budget.category] || 0))}
                </TableCell>
                <TableCell>
                  <Progress value={calculateProgress(budget)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BudgetProgressList;

/**
 * Documentation generated with GitHub Copilot.
 */
