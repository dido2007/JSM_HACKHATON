/**
 * @module MyBudgets
 * @description A Card component with Tabs that allows users to manage their budgets.
 */

"use client";

import React from "react";

import {
  Pencil2Icon,
  EyeOpenIcon,
  CrumpledPaperIcon,
} from "@radix-ui/react-icons";

import BudgetList from "@/../src/app/(protected)/_components/budget/budget-list";
import AlterBudgets from "@/../src/app/(protected)/_components/budget/alter-budgets";
import BudgetCreationCard from "@/../src/app/(protected)/_components/budget/budget-creation-card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/../src/components/ui/tabs";

const MyBudgets = () => {
  return (
    <div className="p-4">
      <Tabs defaultValue="create">
        <TabsList aria-label="Manage your budgets">
          <TabsTrigger
            value="create"
            className="flex items-center space-x-2 hover:text-green-600"
          >
            <Pencil2Icon className="h-5 w-5" />
            <span>Create New</span>
          </TabsTrigger>
          <TabsTrigger
            value="list"
            className="flex items-center space-x-2 hover:text-green-600"
          >
            <EyeOpenIcon className="h-5 w-5" />
            <span>Show All</span>
          </TabsTrigger>
          <TabsTrigger
            value="delete"
            className="flex items-center space-x-2 hover:text-green-600"
          >
            <CrumpledPaperIcon className="h-5 w-5" />
            <span>Alter Existing</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <BudgetCreationCard />
        </TabsContent>
        <TabsContent value="list">
          <BudgetList />
        </TabsContent>
        <TabsContent value="delete">
          <AlterBudgets />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyBudgets;
