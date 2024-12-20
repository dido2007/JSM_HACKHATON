/**
 * @module DashboardPage
 * @description This module contains the code for the dashboard page of the application.
 */

/* eslint-disable react/no-unescaped-entities */

import PageWrapper from "../_components/ui/page-wrapper";

import NetworthCard from "@/../src/app/(protected)/_components/dashboard/networth-card";
import RecentExpenses from "@/../src/app/(protected)/_components/dashboard/recent-expenses";
import BudgetOverviewCard from "@/../src/app/(protected)/_components/dashboard/budget-overview-card";
import BudgetProgressList from "@/../src/app/(protected)/_components/dashboard/budget-progress-list";
import NextComingBillCard from "@/../src/app/(protected)/_components/dashboard/next-coming-bill-card";
import BudgetDistributionCard from "@/../src/app/(protected)/_components/dashboard/expense-overview-card";
import ExpensesEvolutionCard from "@/../src/app/(protected)/_components/dashboard/expenses-evolution-card";
import MonthlyLargestExpenseCategory from "@/../src/app/(protected)/_components/dashboard/largest-expense-category-card";

/**
 * Renders the dashboard page.
 * @returns {JSX.Element} The JSX element representing the dashboard page.
 */
const DashboardPage = () => {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-left my-6">My Dashboard</h1>
        {/* SMALLER CARDS SECTION */}
        <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4 items-stretch mb-4">
          <div className="flex-1">
            <MonthlyLargestExpenseCategory />
          </div>
          <div className="flex-1">
            <NextComingBillCard />
          </div>
          <div className="flex-1">
            <NetworthCard />
          </div>
        </div>
        {/* EXPENSES DETAILED SECTION */}
        <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4 items-stretch mb-4">
          <div className="flex-1">
            <BudgetDistributionCard />
          </div>
          <div className="flex-1">
            <RecentExpenses />
          </div>
        </div>
        {/* EXPENSES EVOLUTION LINE CHART */}
        <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4 items-stretch mb-4">
          <div className="flex-1">
            <ExpensesEvolutionCard />
          </div>
        </div>
        {/* BUDGETS SECTION */}
        <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4 items-stretch mb-4">
          <div className="flex-1">
            <BudgetOverviewCard />
          </div>
          <div className="flex-1">
            <BudgetProgressList />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DashboardPage;

/**
 * Documentation generated with GitHub Copilot.
 */