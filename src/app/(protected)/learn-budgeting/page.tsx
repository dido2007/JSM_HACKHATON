/**
 * Module Description: This module is responsible for rendering the Savings Articles page.
 */

/* eslint-disable react/no-unescaped-entities */
import PageWrapper from "@/../src/app/(protected)/_components/ui/page-wrapper";

import { getArticlesByCategory } from "@/../actions/article-actions";
import { ArticleList } from "@/../src/app/(protected)/_components/articles/article-list";

const SavingsArticlesPage = async () => {
  const articles = await getArticlesByCategory("BUDGETING");

  return (
    <PageWrapper>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-justify-left my-6">
          Learnin'IT Budgeting Section
        </h1>
        <ArticleList articles={articles} />
      </div>
    </PageWrapper>
  );
};

export default SavingsArticlesPage;
