import {
  MicroCMSListContent,
  MicroCMSListResponse,
  MicroCMSObjectContent,
  MicroCMSQueries,
} from "microcms-js-sdk";

import { Contents } from "../../types/microCMS/Contents";
import { Article } from "../../types/microCMS/Article";
import { apiClient } from "../../utils/microCMS/apiClient";

export const getContents = (queries?: MicroCMSQueries) =>
  apiClient.getList<Contents>({ endpoint: "contents", queries });
export const getArticles = (queries?: MicroCMSQueries) =>
  apiClient.getList<Article>({ endpoint: "articles", queries });
export const getArticle = (queries?: MicroCMSQueries) => (contentId: string) =>
  apiClient.getListDetail<Article>({
    endpoint: "articles",
    contentId,
    queries,
  });

export const limit = 10;

// export async function getGlobalContents(): Promise<
//   {
//     selectedCategory: null
//   } & ReturnCommonGetGlobalContentsType
// >

// export async function getGlobalContents(
//   currentPage: number,
//   categoryId: string
// ): Promise<
//   {
//     selectedCategory: Category & MicroCMSListContent
//   } & ReturnCommonGetGlobalContentsType
// >

export async function getGlobalContents(currentPage = 1, categoryId?: string) {
  const filters =
    categoryId === undefined ? "" : `category[equals]${categoryId}`;
  const offset = (currentPage - 1) * limit;

  const [{ contents, totalCount }, { contents: articles }] = await Promise.all([
    getContents({ limit, filters, offset }),
    getArticles({ limit, filters, offset }),
  ]);

  // const pagerData = [];
  // const countNum = Math.ceil(totalCount / limit);
  // for (let i = 0; i < countNum; i++) {
  //   pagerData.push(i);
  // }

  if (categoryId === undefined) {
    return {
      currentPage,
      contents,
      articles,
    };
  }

  return {
    currentPage,
    contents,
    articles,
  };
}
