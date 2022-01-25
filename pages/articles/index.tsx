import type { GetStaticProps, NextPage } from "next";
import DefaultLayout from "../../layouts/default";
import PageWithLayoutType from "../../layouts";

import { CardArticle } from "../../src/components/Card";
import { Props as ArticlesProps } from "../../src/components/Card/CardArticle";

import { getGlobalContents } from "../../src/utils/microCMS/getContents";

type Props = {
  articles: ArticlesProps[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { articles } = await getGlobalContents();

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
    },
  };
};

const Page: NextPage<Props> = ({ articles }: Props) => {
  console.log(articles);

  return (
    <div className="w-full px-8 py-8">
      <div className="max-w-[1080px] w-full mx-auto">
        <h1 className="font-semibold">記事一覧</h1>
        <div className="grid grid-cols-3 mt-8 gap-x-8 gap-y-8 tablet:grid-cols-2 mobile:grid-cols-1">
          {articles.map((article, index) => {
            return <CardArticle key={index} article={article.article} />;
          })}
        </div>
      </div>
    </div>
  );
};

(Page as PageWithLayoutType).layout = DefaultLayout;

export default Page;
