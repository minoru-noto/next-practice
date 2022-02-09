import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import DefaultLayout from "../../layouts/default";
import PageWithLayoutType from "../../layouts";
import {
  title,
  OG_TITLE,
  DESCRIPTION,
  OG_DESCRIPTION,
  description,
  returnTitle,
} from "src/utils/meta";

import { CardArticle } from "../../src/components/Card";
import { Category } from "../../src/types/microCMS/Category";
import { Props as ArticlesProps } from "../../src/components/Card/CardArticle";

import { getGlobalContents } from "../../src/utils/microCMS/getContents";

type Props = {
  articles: ArticlesProps[];
  categories: Category[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { articles, categories } = await getGlobalContents();

  const allArticles = articles.map((article) => ({
    article: {
      id: article.id,
      title: article.title,
      description: article.description,
      thumbnailUrl: article.thumbnail.url,
      category: article.category.map((category) => ({
        name: category.name,
      })),
      publishedAt: article.publishedAt,
    },
  }));

  return {
    props: {
      articles: allArticles,
      categories,
    },
  };
};

const Page: NextPage<Props> = ({ articles, categories }) => {
  const router = useRouter();

  // カテゴリー検索遷移
  const routeToLink = (id: string) => {
    router.push({
      pathname: `/articles/category/[category]`,
      query: { category: id },
    });
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key={OG_TITLE} property={OG_TITLE} content={title} />
        <meta key={DESCRIPTION} name={DESCRIPTION} content={description} />
        <meta
          key={OG_DESCRIPTION}
          property={OG_DESCRIPTION}
          content={description}
        />
      </Head>
      <div className="w-full px-8 pt-8 pb-32 h-full overflow-scroll">
        <div className="max-w-[1080px] w-full mx-auto">
          <div className="mb-4">
            <h1 className="font-semibold text-[18px]">記事一覧</h1>
          </div>
          <div className="grid grid-cols-3 mt-8 gap-x-8 gap-y-8 mb-12 tablet:grid-cols-2 mobile:grid-cols-1">
            {articles.map((article, index) => {
              return <CardArticle key={index} article={article.article} />;
            })}
          </div>
          <div className="mb-4">
            <h1 className="font-semibold text-[18px]">カテゴリー検索</h1>
          </div>
          <div className="w-full flex flex-row gap-x-6 gap-y-4 flex-wrap">
            {categories.map((category, index) => {
              return (
                <div
                  key={index}
                  className="bg-background1 border px-4 py-2 cursor-pointer"
                  onClick={() => routeToLink(category.id)}
                >
                  <p className="text-[14px] ">{category.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

(Page as PageWithLayoutType).layout = DefaultLayout;

export default Page;
