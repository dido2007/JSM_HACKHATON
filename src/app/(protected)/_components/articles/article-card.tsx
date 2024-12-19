/**
 * @module ArticleCard
 * @description A component that renders a card for displaying an article.
 */

"use client";

import React from "react";
import Link from "next/link";

import { Article } from "@prisma/client";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/../src/components/ui/card";

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link rel="noopener noreferrer" target="_blank" href={article.linkTo}>
      <Card className="cursor-pointer hover:bg-green-400">
        <CardHeader>
          <CardTitle>{article.title}</CardTitle>
          <div className="text-xs text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString()}
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>
            {article.content.substring(0, 150)}...
          </CardDescription>
          <span className={`badge badge-${article.author}`}>
            {article.author}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
};

/**
 * Documentation generated with GitHub Copilot.
 */
