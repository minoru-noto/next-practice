import {
  MicroCMSImage,
  MicroCMSListContent,
  MicroCMSListResponse,
} from "microcms-js-sdk";

import { Category } from "./Category";

export type Article = {
  title: string;
  description: string;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
  body: string;
  category: Category[] & MicroCMSListContent;
  keywords: string;
} & MicroCMSListContent;

export type Articles = Article[];
