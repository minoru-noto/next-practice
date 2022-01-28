import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { useRouter } from "next/router";
import DefaultLayout from "layouts/default";
import PageWithLayoutType from "layouts";

import { CardArticle } from "src/components/Card";
import { Category } from "src/types/microCMS/Category";
import { Props as ArticlesProps } from "src/components/Card/CardArticle";

import {
  getCategories,
  getGlobalContents,
} from "src/utils/microCMS/getContents";

export const getAllCategoryPagePaths = async () => {
  const { contents: categories } = await getCategories();
  const paths = categories.map((category) => ({
    params: {
      category: category.id,
    },
  }));

  return paths;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllCategoryPagePaths();

  return {
    paths,
    fallback: false,
  };
};

type Props = {
  articles: ArticlesProps[];
  categories: Category[];
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (params === undefined || typeof params.category !== "string") {
    throw Error("pagesの、ディレクトリ構造かファイル名が間違っています。");
  }

  const { articles, categories } = await getGlobalContents(
    undefined,
    params.category
  );

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
    <div className="w-full px-8 pt-8 pb-32 h-full overflow-scroll">
      {/* カテゴリー記事が存在しない場合 */}
      {articles.length === 0 && (
        <div>
          <div className="mb-4">
            <h1>検索したカテゴリー記事は現在存在しません...</h1>
          </div>
          <div className="mb-4">
            <h1 className="font-semibold text-[18px]">カテゴリー検索</h1>
          </div>
          <div className="flex flex-row gap-x-6 gap-y-4 flex-wrap">
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
      )}
      {/* カテゴリー記事が存在する場合 */}
      {articles.length > 0 && (
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
          <div className="flex flex-row gap-x-6 gap-y-4 flex-wrap">
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
      )}
    </div>
  );
};

(Page as PageWithLayoutType).layout = DefaultLayout;

export default Page;
