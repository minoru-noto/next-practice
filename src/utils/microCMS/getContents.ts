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

  const [{ contents, totalCount }] = await Promise.all([
    getContents({ limit, filters, offset }),
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
    };
  }

  return {
    currentPage,
    contents,
  };
}
