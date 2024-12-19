/**
 * @module AlterBudgets
 * @description A React Card component that allows users to alter budgets.
 */

"use client";

import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";

import { Budget } from "@prisma/client";
import { Input } from "@/../src/components/ui/input";
import { Button } from "@/../src/components/ui/button";
import { toast } from "@/../src/components/ui/use-toast";
import { ScrollArea } from "@/../src/components/ui/scroll-area";
import { BudgetCard } from "@/../src/app/(protected)/_components/budget/budget-card";
import {
  findBudgetsById,
  deleteBudget,
  alterBudget,
} from "@/../actions/budget-actions";
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
import { DatePickerWithPresets } from "@/../src/components/ui/date-picker-presets";

const AlterBudgets: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [editBudget, setEditBudget] = useState<Budget | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Initialise useForm.
  const formMethods = useForm({
    defaultValues: {
      title: "",
      amount: 0,
      category: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  useEffect(() => {
    const loadBudgets = async () => {
      const response = await findBudgetsById();
      if (response && Array.isArray(response)) {
        setBudgets(response);
        setError(null);
      } else if (response && "error" in response) {
        setError(response.error);
        setBudgets([]);
      }
    };

    loadBudgets();
  }, []);

  const handleSelectBudget = (budget: Budget) => {
    setSelectedBudget(budget);
    setEditBudget({ ...budget });
  };

  const handleInputChange = (field: keyof Budget, value: any) => {
    setEditBudget((prev) => ({
      ...prev!,
      [field]: value,
    }));
  };

  const saveChanges = async () => {
    if (!editBudget) return;

    const response = await alterBudget(editBudget);
    if (response.success) {
      toast({
        title: "🎉 Budget updated successfully!",
      });
      // Reflect the changes in the local state.
      setBudgets((prev) =>
        prev.map((budget) =>
          budget.id === editBudget.id ? editBudget : budget
        )
      );
      setSelectedBudget(null); // Reset selection.
    } else {
      toast({
        title: "😵‍💫 Failed to update budget!",
        description: response.error,
      });
    }
  };

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <div className="p-4">
          <Input
            type="text"
            placeholder="Search by title/category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ScrollArea>
          <div className="flex flex-col gap-4 p-4">
            {budgets
              .filter(
                (budget) =>
                  budget.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  budget.category
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .sort(
                (a, b) =>
                  new Date(b.startDate).getTime() -
                  new Date(a.startDate).getTime()
              )
              .map((budget) => (
                <div
                  key={budget.id}
                  className="flex items-center w-full"
                  onClick={() => handleSelectBudget(budget)}
                >
                  <BudgetCard budget={budget} className="flex-1" />
                </div>
              ))}
          </div>
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        {editBudget && (
          <Card className="m-4">
            <CardHeader>
              <p className="text-3xl font-semibold text-center">
                ✏️ Edit Budget ✏️
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
                  value={editBudget.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Title"
                  className="mb-2"
                />
                <Input
                  type="number"
                  value={editBudget.amount}
                  onChange={(e) =>
                    handleInputChange("amount", parseFloat(e.target.value))
                  }
                  placeholder="Amount"
                  className="mb-2"
                />
                <Select
                  value={editBudget.category}
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
                    value={editBudget.startDate}
                    onChange={(value) => handleInputChange("startDate", value)}
                  />
                  <DatePickerWithPresets
                    value={editBudget.endDate}
                    onChange={(value) => handleInputChange("endDate", value)}
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
                      if (selectedBudget) {
                        const response = await deleteBudget(selectedBudget.id);
                        if (response.success) {
                          setBudgets(
                            budgets.filter((b) => b.id !== selectedBudget.id)
                          );
                          setSelectedBudget(null);
                          toast({
                            title: "👋 Budget deleted successfully!",
                          });
                          formMethods.reset(); // Clear the form
                        } else {
                          toast({
                            title: "😵‍💫 Failed to delete budget",
                          });
                        }
                      }
                    }}
                  >
                    Delete Budget
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

export default AlterBudgets;
