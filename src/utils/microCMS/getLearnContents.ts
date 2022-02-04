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

export async function getGlobalContents() {
  // カテゴリーID
  const nextCategoryId: string = "4010hhx1j_g";
  const nuxtCategoryId: string = "h_h78kge89e";

  // カテゴリーで共通項をフィルター
  const [{ contents: nextContents }] = await Promise.all([
    getContents({
      filters: `category[equals]${nextCategoryId}`,
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
