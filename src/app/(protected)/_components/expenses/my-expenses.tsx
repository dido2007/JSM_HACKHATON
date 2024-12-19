/**
 *
 * @module MyExpenses
 * @description Component for managing expenses
 */

"use client";

import React from "react";

import {
  Pencil2Icon,
  EyeOpenIcon,
  CrumpledPaperIcon,
  LoopIcon,
  CalendarIcon,
  GearIcon,
} from "@radix-ui/react-icons";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/../src/components/ui/tabs";

import ExpenseTable from "@/../src/app/(protected)/_components/expenses/expense-table";
import AlterExpenses from "@/../src/app/(protected)/_components/expenses/alter-expenses";
import RecurringBillsList from "@/app/(protected)/_components/expenses/recurring-bills-list";
import AlterRecurringBills from "@/../src/app/(protected)/_components/expenses/alter-recurring-bills";
import ExpenseCreationCard from "@/../src/app/(protected)/_components/expenses/expense-creation-card";
import RecurringBillsCreationCard from "@/app/(protected)/_components/expenses/recurring-bills-creation-card";

const MyExpenses = () => {
  return (
    <div className="p-4">
      <Tabs defaultValue="expense creation">
        <TabsList aria-label="Manage your expenses">
          {/* Tabs for one-off expenses. */}
          <TabsTrigger
            value="expense creation"
            className="flex items-center space-x-2 hover:text-green-600"
          >
            <Pencil2Icon className="h-5 w-5" />
            <span>Create New</span>
          </TabsTrigger>
          {/* Tabs listing all expenses (inc. bills). */}
          <TabsTrigger
            value="expense listing"
            className="flex items-center space-x-2 hover:text-green-600"
          >
            <EyeOpenIcon className="h-5 w-5" />
            <span>Show All</span>
          </TabsTrigger>
          {/* Tabs for altering expernses (exl. bills). */}
          <TabsTrigger
            value="expense deletion"
            className="flex items-center space-x-2 hover:text-green-600"
          >
            <GearIcon className="h-5 w-5" />
            <span>Alter Expenses</span>
          </TabsTrigger>
          {/* Tabs for recuring bills. */}
          <TabsTrigger
            value="recurence creation"
            className="flex items-center space-x-2 hover:text-green-600"
          >
            <LoopIcon className="h-5 w-5" />
            <span>Recuring Bills</span>
          </TabsTrigger>
          {/* Tabs listing only recuring bills. */}
          <TabsTrigger
            value="recurence list"
            className="flex items-center space-x-2 hover:text-green-600"
          >
            <CalendarIcon className="h-5 w-5" />
            <span>Recurring Bills List</span>
          </TabsTrigger>
          {/* Tabs for altering bills. */}
          <TabsTrigger
            value="recurence alteration"
            className="flex items-center space-x-2 hover:text-green-600"
          >
            <CrumpledPaperIcon className="h-5 w-5" />
            <span>Alter Bills</span>
          </TabsTrigger>
          {/* Adds actual componenet to tabs. */}
        </TabsList>
        {/* Valuated expenses. */}
        <TabsContent value="expense creation">
          <ExpenseCreationCard />
        </TabsContent>
        <TabsContent value="expense listing">
          <ExpenseTable />
        </TabsContent>
        <TabsContent value="expense deletion">
          <AlterExpenses />
        </TabsContent>
        {/* Bills. */}
        <TabsContent value="recurence creation">
          <RecurringBillsCreationCard />
        </TabsContent>
        <TabsContent value="recurence list">
          <RecurringBillsList />
        </TabsContent>
        <TabsContent value="recurence alteration">
          <AlterRecurringBills />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyExpenses;
