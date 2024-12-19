/**
 * @module ArticleList
 * @description A component that displays a list of articles and allows searching for articles by title or content.
 */

"use client";

import React, { useState } from "react";

import { Article } from "@prisma/client";

import { Input } from "@/../src/components/ui/input";
import { ScrollArea } from "@/../src/components/ui/scroll-area";
import { ArticleCard } from "@/../src/app/(protected)/_components/articles/article-card";

interface ArticleListProps {
  articles: Article[];
}

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = articles
    .filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase())
    )

    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  return (
    <div>
      <div className="p-4">
        <Input
          type="text"
          placeholder="Search articles..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ScrollArea>
        <div className="flex flex-col gap-4 p-4">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

/**
 * Documentation generated with GitHub Copilot.
 */
