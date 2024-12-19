/**
 * @module BudgetList
 * @description A React component that displays a Card list of budgets and allows searching by title or category.
 */

"use client";

import React, { useState, useEffect } from "react";

import { Budget } from "@prisma/client";

import { Input } from "@/../src/components/ui/input";
import { ScrollArea } from "@/../src/components/ui/scroll-area";
import { BudgetCard } from "@/../src/app/(protected)/_components/budget/budget-card";

import { findBudgetsById } from "@/../actions/budget-actions";

const BudgetList: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBudgets = async () => {
      const response = await findBudgetsById();
      // Check if the response has an 'error' property.
      if (response && "error" in response) {
        setError(response.error);
      } else if (Array.isArray(response)) {
        setBudgets(response);
        setError(null);
      }
    };

    loadBudgets();
  }, []);

  const filteredBudgets = budgets
    .filter(
      (budget) =>
        budget.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        budget.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );

  return (
    <div>
      <div className="p-4">
        <Input
          type="text"
          placeholder="Search by title/category"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {error ? (
        <div className="text-red-500 p-4">Error: {error}</div>
      ) : (
        <ScrollArea>
          <div className="flex flex-col gap-4 p-4">
            {filteredBudgets.map((budget) => (
              <BudgetCard key={budget.id} budget={budget} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default BudgetList;
