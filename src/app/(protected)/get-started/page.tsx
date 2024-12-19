/** Module Description: This module contains the page component for the Get-Started (i.e. tutorial) section of the application. */

/* eslint-disable react/no-unescaped-entities */
import PageWrapper from "@/../src/app/(protected)/_components/ui/page-wrapper";

const GetStartedPage = async () => {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-justify-left my-6">
          Get startted with Savin'IT
        </h1>
        <h3 className="text-md text-gray-400 text-justify-left my-6">
          In this quick tutorial, you'll learn how to use Savin'IT to manage
          your finances.
        </h3>
      </div>

      {/* STEP 1. SET-UP FINANCES */}
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-justify-left my-6">
          Step-1. Set-up your finances
        </h2>
        <p className="text-md text-gray-400 text-justify-left my-6">
          The Configure Finances is the designated section where you are going
          to enter your incomes. All the incomes you enter here will be used to
          calculate your budgets and display relevant informations to in your
          dashboard.
        </p>
        <p>
          To get started, fill out the form card and then click on the "Confirm"
          button to add your first income.
        </p>
        <p>
          You can also edit or delete any previously added your incomes by going
          into the "Alter Existing" tab.
        </p>
        <p>
          You will need to repeat this operation every month to keep your
          finances up to date.
        </p>
      </div>

      {/* STEP 2. SET-UP BUDGETS */}
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-justify-left my-6">
          Step-2. Set-up your budgets
        </h2>
        <p className="text-md text-gray-400 text-justify-left my-6">
          The My Budgets is the designated section where you are going to enter
          your budgets. All the budgets you enter here will be used to calculate
          your budgets and display some relevant informations to be displayed in
          your dashboard.
        </p>
        <p>
          To get started, fill out the form card and then click on the "Confirm"
          button to add your first budget.
        </p>
        <p>
          You can also edit or delete any previously added your budgets by going
          into the "Alter Existing" tab.
        </p>
        <p>
          You will need to repeat this operation every month to keep your
          finances up to date.
        </p>
      </div>

      {/* STEP 3. LOG EXPENSES */}
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-justify-left my-6">
          Step-3. Log your expenses
        </h2>
        <p className="text-md text-gray-400 text-justify-left my-6">
          The My Expenses is the designated section where you are going to enter
          your all of your expenses. All the expenses you enter here will be used
          to calculate your budgets and trends in your dashboard.
        </p>
        <p>
          To get started, fill out the form card and then click on the "Confirm"
          button to add your first expense.
        </p>
        <p>
          You can also edit or delete any previously added your expenses by going
          into the "Alter Existing" tab.
        </p>
        <p>
          You will need to repeat this operation every month to keep your
          finances up to date.
        </p>
        <p className="text-md text-gray-400 text-justify-left my-6">
          The Recurring Bills tab in My Expenses is the designated section where 
          you are going to enter your all upcoming bills. That section is only designed
          to create visual reminders of your upcoming bills thus your bills is paid 
          log it as any other expense :).
        </p>
      </div>
    </PageWrapper>
  );
};

export default GetStartedPage;

/**
 * Documentation generated with GitHub Copilot.
 */
