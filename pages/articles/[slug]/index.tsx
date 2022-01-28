import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import {
  DESCRIPTION,
  OG_DESCRIPTION,
  KEYWORDS,
  OG_IMAGE,
  OG_TITLE,
  returnTitle,
} from "src/utils/meta";
import { processer, createTableOfContents } from "microcms-richedit-processer";
import DefaultLayout from "../../../layouts/default";
import PageWithLayoutType from "../../../layouts";
import { Article } from "../../../src/types/microCMS/Article";
import { CardSlugArticle } from "../../../src/components/Card";

import {
  getArticle,
  getGlobalContents,
} from "../../../src/utils/microCMS/getContents";

export const getAllSlugPaths = async () => {
  const { articles } = await getGlobalContents();
  const paths = articles.map((article) => ({
    params: {
      slug: article.id,
    },
  }));

  return paths;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllSlugPaths();

  return {
    paths,
    fallback: "blocking",
  };
};

const processingDom = async (htmlString: string) => {
  return {
    body: await processer(htmlString, { code: { enabled: true } }),
    toc: createTableOfContents(htmlString, { tags: "h2,h3" }),
  };
};

type Props = {
  article: Article;
  toc: {
    id: string;
    name: string;
    text: string;
  }[];
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
  preview,
  previewData,
}) => {
  if (params === undefined || typeof params.slug !== "string")
    throw Error("pagesのディレクトリ構造かファイル名が間違っています。");

  const article = await getArticle({
    depth: 2,
    draftKey: preview
      ? (previewData as { [key: string]: string }).draftKey
      : undefined,
  })(params.slug);

  const { toc } = await processingDom(article.body);

  return {
    props: { article, toc },
  };
};

const Page: NextPage<Props> = ({ article, toc }) => {
  const headTitle = returnTitle(article.title);
  const headDescription = article.description;
  const headKeywords = article.keywords;

  const { title, thumbnail, body, category } = article;
  const date = new Date(article.publishedAt);
  const publishedAt = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()}`;

  // 目次の高さの自動調整
  // const tocHeight = { height: `${toc.length * 35 + 50}px` };
  const tocHeight = { height: `${toc.length * 50 + 50}px` };

  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta key={OG_TITLE} property={OG_TITLE} content={headTitle} />
        <meta key={KEYWORDS} name={KEYWORDS} content={headKeywords} />
        <meta key={DESCRIPTION} name={DESCRIPTION} content={headDescription} />
        <meta
          key={OG_DESCRIPTION}
          property={OG_DESCRIPTION}
          content={headDescription}
        />
        <meta
          key={OG_IMAGE}
          property={OG_IMAGE}
          content={article.thumbnail.url}
        />
      </Head>
      <div className="w-full px-8 mobile:px-2 pt-12 mb-12 mt-12 h-full overflow-scroll">
        <div className="max-w-[1080px] w-full mx-auto">
          {/* 大見出し */}
          <div className="max-w-[750px] w-full mb-12 px-2">
            <div className="mb-4">
              <h1 className="font-bold text-[24px]">{title}</h1>
            </div>
            <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 mb-3">
              {category.map((c, index) => {
                return (
                  <div key={index} className="bg-gray1 px-2 rounded-full">
                    <p className="text-[12px] text-background1">{c.name}</p>
                  </div>
                );
              })}
            </div>
            <div className="mb-4 flex gap-x-2 items-center">
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18px"
                height="18px"
                className="mt-[1px]"
              >
                <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z" />
              </svg>
              <p className="text-[12px] text-gray2">{publishedAt}</p>
            </div>
            <img
              src={thumbnail.url}
              width={800}
              height={459}
              alt="サムネイル画像"
              className="rounded-[16px]"
            />
          </div>
          {/* 目次 */}
          <div
            style={tocHeight}
            className="flex flex-col gap-y-2 w-full bg-background1 rounded-md px-4 py-4 mb-4 top-0 pc:hidden"
          >
            <div className="mb-2">
              <p className="font-bold text-[18px]">目次</p>
            </div>
            {toc.map((t, index) => {
              return (
                <Link key={index} href={`#${t.id}`}>
                  <a>
                    <div className="cursor-pointer hover:text-gray1">
                      <p
                        className={`${
                          t.name === "h2"
                            ? "font-semibold text-[16px]"
                            : "text-[14px] pl-4"
                        }`}
                      >
                        {t.name === "h2" ? "・" + t.text : t.text}
                      </p>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
          <div className="flex gap-x-4">
            {/* メインコンテンツ */}
            <div className="max-w-[750px] w-full">
              <CardSlugArticle body={body} />
            </div>
            {/* 目次(pc対応) */}
            <div
              style={tocHeight}
              className="flex flex-col gap-y-2  bg-background1 rounded-md px-4 py-4 sticky top-0 tablet:hidden mobile:hidden"
            >
              <div className="mb-2">
                <p className="font-bold text-[18px]">目次</p>
              </div>
              {toc.map((t, index) => {
                return (
                  <Link key={index} href={`#${t.id}`}>
                    <a>
                      <div className="cursor-pointer hover:text-gray1">
                        <p
                          className={`${
                            t.name === "h2"
                              ? "font-semibold text-[16px]"
                              : "text-[14px] pl-2"
                          }`}
                        >
                          {t.name === "h2" ? "・" + t.text : t.text}
                        </p>
                      </div>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

(Page as PageWithLayoutType).layout = DefaultLayout;

export default Page;
