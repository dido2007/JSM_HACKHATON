/**
 * @module MyExpensesPage
 * @description Represents the page component for the "My Expenses" section of the Savin'IT application.
 */

/* eslint-disable react/no-unescaped-entities */

import React from "react";

import PageWrapper from "@/../src/app/(protected)/_components/ui/page-wrapper";
import MyExpenses from "@/../src/app/(protected)/_components/expenses/my-expenses";

/**
 * Represents the page component for the "My Expenses" section.
 * @returns {JSX.Element} The rendered MyExpensesPage component.
 */
const MyExpensesPage = () => {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-justify-left my-6 p-4">
          Savin'IT My Expenses Section
        </h1>
        <MyExpenses />
      </div>
    </PageWrapper>
  );
};

export default MyExpensesPage;

/**
 * Documentation generated with GitHub Copilot.
 */
