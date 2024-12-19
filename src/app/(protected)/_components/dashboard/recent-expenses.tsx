/**
 * Module description: This module contains the RecentExpenses component, which displays a card with a table of recent expenses.
 */

"use client";

import React, { useEffect, useState } from "react";
import { findExpensesById } from "@/../actions/expense-actions";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
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

const RecentExpenses = () => {
  const [expenses, setExpenses] = useState<
    {
      id: string;
      userId: string;
      title: string;
      amount: number;
      date: Date;
      category: string;
      description: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const fetchedExpenses = await findExpensesById();
      if (Array.isArray(fetchedExpenses)) {
        const sortedExpenses = fetchedExpenses
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 7);
        setExpenses(sortedExpenses);
      }
    };
    fetchExpenses();
  }, []);

  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  });

  const totalAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const formattedTotalAmount = formatter.format(totalAmount);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Recent Expenses</CardTitle>
          <svg
            width="18"
            height="18"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 5.25C1.91421 5.25 2.25 4.91421 2.25 4.5C2.25 4.08579 1.91421 3.75 1.5 3.75C1.08579 3.75 0.75 
              4.08579 0.75 4.5C0.75 4.91421 1.08579 5.25 1.5 5.25ZM4 4.5C4 4.22386 4.22386 4 4.5 4H13.5C13.7761 4 14 
              4.22386 14 4.5C14 4.77614 13.7761 5 13.5 5H4.5C4.22386 5 4 4.77614 4 4.5ZM4.5 7C4.22386 7 4 7.22386 4 
              7.5C4 7.77614 4.22386 8 4.5 8H13.5C13.7761 8 14 7.77614 14 7.5C14 7.22386 13.7761 7 13.5 7H4.5ZM4.5 
              10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H13.5C13.7761 11 14 10.7761 14 10.5C14 10.2239 
              13.7761 10 13.5 10H4.5ZM2.25 7.5C2.25 7.91421 1.91421 8.25 1.5 8.25C1.08579 8.25 0.75 7.91421 0.75 7.5C0.75 
              7.08579 1.08579 6.75 1.5 6.75C1.91421 6.75 2.25 7.08579 2.25 7.5ZM1.5 11.25C1.91421 11.25 2.25 10.9142 2.25 
              10.5C2.25 10.0858 1.91421 9.75 1.5 9.75C1.08579 9.75 0.75 10.0858 0.75 10.5C0.75 10.9142 1.08579 11.25 1.5 11.25Z"
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
              {["Date", "Title", "Category", "Amount"].map((key) => (
                <TableHead key={key}>{key}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id} className="hover:bg-green-500">
                <TableCell>
                  {new Date(expense.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{formatter.format(expense.amount)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="text-bold font-bold  hover:bg-green-700">
              <TableCell>Total Items</TableCell>
              <TableCell>{expenses.length}</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>{formattedTotalAmount}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentExpenses;
