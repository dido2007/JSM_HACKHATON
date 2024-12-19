"use client";

import React from "react";

import { Article } from "@prisma/client";

import { ArticleList } from "@/../src/app/(protected)/_components/articles/article-list";

interface ArticlesPageProps {
  articles: Article[];
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ articles }) => {
  return (
    <div>
      <ArticleList articles={articles} />
    </div>
  );
};
