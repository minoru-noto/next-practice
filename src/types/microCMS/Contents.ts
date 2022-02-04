import {
  MicroCMSImage,
  MicroCMSListContent,
  MicroCMSListResponse,
} from "microcms-js-sdk";

import { Category } from "./Category";

export type Contents = {
  title: string;
  description: string;
  body: string;
  category: Category & MicroCMSListContent;
  keywords: string;
} & MicroCMSListContent;
