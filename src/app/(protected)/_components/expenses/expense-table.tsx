/**
 * @module ExpenseTable
 * @description A React component that displays a table of expenses.
 */

"use client";

import React, { useEffect, useState, useMemo } from "react";

import { Expenses } from "@prisma/client";

import { Input } from "@/../src/components/ui/input";
import { findExpensesById } from "@/../actions/expense-actions";
import { DatePickerWithRange } from "@/../src/components/ui/date-range-picker";

import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from "@/../src/components/ui/table";

type SortDirection = "ascending" | "descending";
type SortKey = keyof Expenses;
type SortConfig = {
  key: SortKey;
  direction: SortDirection;
};

/**
 * ExpenseTable component.
 */
const ExpenseTable: React.FC = () => {
  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<
    { from: Date; to: Date } | undefined
  >();

  useEffect(() => {
    const fetchExpenses = async () => {
      const fetchedExpenses = await findExpensesById();
      if (Array.isArray(fetchedExpenses)) {
        setExpenses(fetchedExpenses);
      }
    };
    fetchExpenses();
  }, []);

  const handleSort = (key: SortKey) => {
    let direction: SortDirection = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    } else {
      direction = "ascending";
    }
    setSortConfig({ key, direction });
  };

  const sortedAndFilteredExpenses = useMemo(() => {
    let result = [...expenses];

    if (dateRange) {
      result = result.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= dateRange.from && expenseDate <= dateRange.to;
      });
    }

    if (searchTerm) {
      result = result.filter((expense) =>
        expense.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [expenses, sortConfig, dateRange, searchTerm]);

  const formatter = new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      <div className="flex items-center space-x-2 mb-4">
        <DatePickerWithRange
          onSelect={(range) => {
            setDateRange(
              range
                ? { from: range.from || new Date(), to: range.to || new Date() }
                : undefined
            );
          }}
        />
        <Input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {["title", "amount", "category", "date", "description"].map(
              (key) => (
                <TableHead key={key} onClick={() => handleSort(key as SortKey)}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  {sortConfig?.key === key &&
                    (sortConfig.direction === "ascending" ? " 🔼" : " 🔽")}
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAndFilteredExpenses.map((expense) => (
            <TableRow
              key={expense.id}
              className="cursor-pointer hover:bg-green-400"
            >
              <TableCell>{expense.title}</TableCell>
              <TableCell>£{formatter.format(expense.amount)}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>
                {new Date(expense.date).toLocaleDateString()}
              </TableCell>
              <TableCell>{expense.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="cursor-pointer hover:bg-green-700 font-bold">
          <TableRow>
            <TableCell>Total Amount</TableCell>
            <TableCell>
              £
              {formatter.format(
                sortedAndFilteredExpenses.reduce(
                  (sum, { amount }) => sum + amount,
                  0
                )
              )}
            </TableCell>
            <TableCell colSpan={3}>
              Total Expenses: {sortedAndFilteredExpenses.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default ExpenseTable;
