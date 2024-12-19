/**
 * @module AlterExpenses
 * @description This module contains the component for altering expenses.
 */

"use client";

import { useForm } from "react-hook-form";
import React, { useState, useEffect, useMemo } from "react";

import { Expenses } from "@prisma/client";
import { Input } from "@/../src/components/ui/input";
import { Button } from "@/../src/components/ui/button";
import { toast } from "@/../src/components/ui/use-toast";
import { ScrollArea } from "@/../src/components/ui/scroll-area";
import { ExpenseCard } from "@/../src/app/(protected)/_components/expenses/expense-card";
import {
  findExpensesById,
  deleteExpenses,
  alterExpense,
} from "@/../actions/expense-actions";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/../src/components/ui/resizable";
import { Card, CardHeader, CardContent } from "@/../src/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/../src/components/ui/select";
import { DatePickerWithRange } from "@/../src/components/ui/date-range-picker";
import { DatePickerWithPresets } from "@/../src/components/ui/date-picker-presets";

/**
 * Component for altering expenses.
 */
const AlterExpenses: React.FC = () => {
  // State variables
  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<Expenses | null>(null);
  const [editExpense, setEditExpense] = useState<Expenses | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<
    { from: Date; to: Date } | undefined
  >(undefined);
  const [error, setError] = useState<string | null>(null);

  // Initialises useForm
  const formMethods = useForm({
    defaultValues: {
      title: "",
      amount: 0,
      category: "",
      startDate: new Date(),
      description: "",
    },
  });

  useEffect(() => {
    const loadBudgets = async () => {
      const response = await findExpensesById();
      if (response && Array.isArray(response)) {
        setExpenses(response);
        setError(null);
      } else if (response && "error" in response) {
        setError(response.error);
        setExpenses([]);
      }
    };

    loadBudgets();
  }, []);

  /**
   * Handles the selection of an expense.
   * @param expense - The selected expense.
   */
  const handleSelectExpense = (expense: Expenses) => {
    setSelectedExpense(expense);
    setEditExpense({ ...expense });
  };

  /**
   * Handles the change of an input field.
   * @param field - The field to be changed.
   * @param value - The new value of the field.
   */
  const handleInputChange = (field: keyof Expenses, value: any) => {
    setEditExpense((prev) => ({
      ...prev!,
      [field]: value,
    }));
  };

  /**
   * Saves the changes made to the expense.
   */
  const saveChanges = async () => {
    if (!editExpense) return;

    const response = await alterExpense(editExpense);
    if (response.success) {
      toast({
        title: "🎉 Expense updated successfully!",
      });
      // Reflect the changes in the local state
      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === editExpense.id ? editExpense : expense
        )
      );
      setSelectedExpense(null); // Reset selection
    } else {
      toast({
        title: "😵‍💫 Failed to update budget!",
        description: response.error,
      });
    }
  };

  // useMemo hook to compute filtered expenses on changes to `expenses` or `dateRange`
  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      if (!dateRange) return true; // Show all if no date range is selected
      const expenseDate = new Date(expense.date);
      return expenseDate >= dateRange.from && expenseDate <= dateRange.to;
    });
  }, [expenses, dateRange]); // Include `dateRange` in the dependency array

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <div className="p-4 flex items-center gap-4">
          <DatePickerWithRange
            onSelect={(range) => {
              if (range && range.from && range.to) {
                setDateRange({
                  from: range.from,
                  to: range.to,
                });
              } else {
                setDateRange(undefined);
              }
            }}
          />
          <Input
            type="text"
            placeholder="Search by title/category/description/amount"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ScrollArea>
          <div className="flex flex-col gap-4 p-4">
            {filteredExpenses
              .filter(
                (expense) =>
                  expense.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  expense.category
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  expense.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  expense.amount.toFixed(2).includes(searchTerm)
              )
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center w-full"
                  onClick={() => handleSelectExpense(expense)}
                >
                  <ExpenseCard expense={expense} className="flex-1" />
                </div>
              ))}
          </div>
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        {editExpense && (
          <Card className="m-4">
            <CardHeader>
              <p className="text-3xl font-semibold text-center">
                ✏️ Edit Expense ✏️
              </p>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveChanges();
                }}
              >
                <Input
                  value={editExpense.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Title"
                  className="mb-2"
                />
                <Input
                  type="number"
                  value={editExpense.amount}
                  onChange={(e) =>
                    handleInputChange("amount", parseFloat(e.target.value))
                  }
                  placeholder="Amount"
                  className="mb-2"
                />
                <Select
                  value={editExpense.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                  aria-label="Category"
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Utilities",
                      "Groceries",
                      "Transport",
                      "Investment",
                      "Entertainment",
                      "Dining",
                      "Shopping",
                      "Travel",
                      "Health",
                      "Personal",
                      "Other",
                    ].map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex space-x-4 justify-center mb-2">
                  <DatePickerWithPresets
                    value={editExpense.date}
                    onChange={(value) => handleInputChange("date", value)}
                  />
                  <Input
                    value={editExpense.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="description"
                    className="mb-2"
                  />
                </div>
                <div className="flex justify-between">
                  <Button type="submit" className="flex-1 mr-2">
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 ml-2 bg-red-500"
                    onClick={async (e) => {
                      e.preventDefault();
                      if (selectedExpense) {
                        const response = await deleteExpenses(
                          selectedExpense.id
                        );
                        if (response.success) {
                          setExpenses(
                            expenses.filter((b) => b.id !== selectedExpense.id)
                          );
                          setSelectedExpense(null);
                          toast({
                            title: "👋 Expense deleted successfully!",
                          });
                          formMethods.reset(); // Clear the form.
                        } else {
                          toast({
                            title: "😵‍💫 Failed to delete expense",
                          });
                        }
                      }
                    }}
                  >
                    Delete Expense
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default AlterExpenses;

/**
 * Documentation generated with GitHub Copilot.
 */
