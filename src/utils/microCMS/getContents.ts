import {
  MicroCMSListContent,
  MicroCMSListResponse,
  MicroCMSObjectContent,
  MicroCMSQueries,
} from "microcms-js-sdk";

import { Article } from "../../types/microCMS/Article";
import { Category } from "../../types/microCMS/Category";
import { apiClient } from "../../utils/microCMS/apiClient";

export const getArticles = (queries?: MicroCMSQueries) =>
  apiClient.getList<Article>({ endpoint: "articles", queries });
export const getArticle = (queries?: MicroCMSQueries) => (contentId: string) =>
  apiClient.getListDetail<Article>({
    endpoint: "articles",
    contentId,
    queries,
  });
export const getCategories = (queries?: MicroCMSQueries) =>
  apiClient.getList<Category>({ endpoint: "categories", queries });

export const limit = 10;

export async function getGlobalContents(currentPage = 1, categoryId?: string) {
  const filters =
    categoryId === undefined ? "" : `category[equals]${categoryId}`;
  const articlesFilters =
    categoryId === undefined ? "" : `category[contains]${categoryId}`;
  const offset = (currentPage - 1) * limit;

  const [{ contents: articles }, { contents: categories }] = await Promise.all([
    getArticles({ limit, filters: articlesFilters, offset }), // 記事コンテンツ
    getCategories({ limit: 100, fields: "id,name" }),
  ]);

  if (categoryId === undefined) {
    return {
      currentPage,
      articles,
      categories,
    };
  }

  return {
    currentPage,
    articles,
    categories,
  };
}
