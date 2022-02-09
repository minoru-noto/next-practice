import {
  MicroCMSListContent,
  MicroCMSListResponse,
  MicroCMSObjectContent,
  MicroCMSQueries,
} from "microcms-js-sdk";

import { Contents } from "../../types/microCMS/Contents";
import { apiClient } from "../../utils/microCMS/apiClient";

export const getContents = (queries?: MicroCMSQueries) =>
  apiClient.getList<Contents>({ endpoint: "contents", queries });
export const getContent = (queries?: MicroCMSQueries) => (contentId: string) =>
  apiClient.getListDetail<Contents>({
    endpoint: "contents",
    contentId,
    queries,
  });

export const limit = 10;

export async function getGlobalContent(currentPage = 1, categoryId?: string) {
  const filters =
    categoryId === undefined ? "" : `category[equals]${categoryId}`;
  const offset = (currentPage - 1) * limit;

  const [{ contents: contents }] = await Promise.all([
    getContents({ limit, filters, offset }),
  ]);

  if (categoryId === undefined) {
    return {
      contents,
    };
  }

  return {
    contents,
  };
}

export async function getGlobalContents(currentPage = 1) {
  const offset = (currentPage - 1) * limit;
  const orders = "publishedAt";

  // カテゴリーID
  const nextCategoryId: string = "4010hhx1j_g";
  const nuxtCategoryId: string = "h_h78kge89e";

  // カテゴリーで共通項をフィルター
  const [{ contents: nextContents }] = await Promise.all([
    getContents({
      filters: `category[equals]${nextCategoryId}`,
      offset,
      orders,
    }),
  ]);

  const nuxtContents = await getContents({
    filters: `category[equals]${nuxtCategoryId}`,
  });

  //   const contents = [];
  //   await contents.push(nextContents, nuxtContents);

  return {
    nextContents,
  };
}
