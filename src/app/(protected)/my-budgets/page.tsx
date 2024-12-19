/**
 * Module description: This module contains the MyBudgetsPage component, which is responsible for rendering
 * the My Budgets section of the Savin'IT application.
 */

/* eslint-disable react/no-unescaped-entities */

import React from "react";

import MyBudgets from "@/../src/app/(protected)/_components/budget/my-budgets";
import PageWrapper from "@/../src/app/(protected)/_components/ui/page-wrapper";

const MyBudgetsPage = () => {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-justify-left my-6 p-4">
          Savin'IT My Budgets Section
        </h1>
        <MyBudgets />
      </div>
    </PageWrapper>
  );
};

export default MyBudgetsPage;

/**
 * Documentation generated with GitHub Copilot.
 */
