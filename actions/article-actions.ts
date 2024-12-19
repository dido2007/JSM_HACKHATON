/**
 * This module contains functions for retrieving articles from the database.
 * @module article-actions
 */

"use server";

import { databaseConnector } from "@/../src/lib/database-connector";

/**
 * Retrieves articles from the database based on the specified category.
 * @param category - The category of the articles to retrieve.
 * @returns A Promise that resolves to an array of articles.
 */
export const getArticlesByCategory = async (category: string) => {
  const article = await databaseConnector.article.findMany({
    where: { category: category },
  });
  return article;
};

/**
 * Retrieves an article from the database based on the specified ID.
 * @param id - The ID of the article to retrieve.
 * @returns A Promise that resolves to the retrieved article.
 */
export const getArticleById = async (id: string) => {
  const article = await databaseConnector.article.findUnique({
    where: { id: id },
  });
  return article;
};

/**
 * Documentation generated with GitHub Copilot.
 */
