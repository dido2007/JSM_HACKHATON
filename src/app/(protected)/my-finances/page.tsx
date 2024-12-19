/**
 * Module description: This module contains the page component for managing finances in the Savin'IT application.
 */

/* eslint-disable react/no-unescaped-entities */

import PageWrapper from "@/../src/app/(protected)/_components/ui/page-wrapper";
import FinancesComponent from "@/../src/app/(protected)/_components/finances/my-finances";

const FinancesPage = async () => {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-justify-left my-6 p-4">
          Savin'IT My Finances
        </h1>
        <FinancesComponent />
      </div>
    </PageWrapper>
  );
};

export default FinancesPage;

/**
 * Documentation generated with GitHub Copilot.
 */
