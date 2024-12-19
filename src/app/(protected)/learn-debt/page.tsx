/** Module Description: This module contains the page component for the Learn Debt section of the application. */

/* eslint-disable react/no-unescaped-entities */
import PageWrapper from "@/../src/app/(protected)/_components/ui/page-wrapper";

import { ArticleList } from "@/../src/app/(protected)/_components/articles/article-list";
import { getArticlesByCategory } from "@/../actions/article-actions";

const SavingsArticlesPage = async () => {
  const articles = await getArticlesByCategory("DEBT_MANAGEMENT");

  return (
    <PageWrapper>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-justify-left my-6">
          Learnin'IT Debt Management Section
        </h1>
        <ArticleList articles={articles} />
      </div>
    </PageWrapper>
  );
};

export default SavingsArticlesPage;

/**
 * Documentation generated with GitHub Copilot.
 */
