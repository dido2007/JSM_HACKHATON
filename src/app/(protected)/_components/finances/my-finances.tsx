/**
 * @module FinancesComponent
 * @description A component with tabs for managing finance (i.e. income).
 */
"use client";

import React from "react";

import { Pencil2Icon, GearIcon } from "@radix-ui/react-icons";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/../src/components/ui/tabs";

import AlterFinances from "@/../src/app/(protected)/_components/finances/alter-finances";
import FinancesCreationCard from "@/../src/app/(protected)/_components/finances/finances-creation-card";

const FinancesComponent = () => {
  return (
    <div className="p-4">
      <Tabs defaultValue="create">
        <TabsList aria-label="Manage your finances">
          <TabsTrigger
            value="create"
            className="flex items-center space-x-2 hover:text-green-600"
          >
            <Pencil2Icon className="h-5 w-5" />
            <span>Create New</span>
          </TabsTrigger>
          <TabsTrigger
            value="alter" // Change this value to match the TabsContent value.
            className="flex items-center space-x-2 hover:text-green-600"
          >
            <GearIcon className="h-5 w-5" />
            <span>Alter Existing</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <FinancesCreationCard />
        </TabsContent>
        <TabsContent value="alter">
          <AlterFinances />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancesComponent;
