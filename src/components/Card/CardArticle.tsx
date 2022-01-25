import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

export type Props = {
  article: {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    category: {
      name: string;
    }[];
    publishedAt: string;
  };
};

export const CardArticle: NextPage<Props> = ({ article }: Props) => {
  const { id, category } = article;
  const title =
    article.title.length > 55
      ? article.title.slice(0, 55) + "..."
      : article.title;
  const date = new Date(article.publishedAt);
  const publishedAt = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()}`;

  const router = useRouter();

  const routeToLink = () => {
    router.push({
      pathname: `/articles/[id]`,
      query: { id: id },
    });
  };

  console.log(article);

  return (
    <div
      className="flex flex-col w-full cursor-pointer rounded-t-[12px]"
      onClick={routeToLink}
    >
      <Image
        src="/image/thum01.png"
        width={1200}
        height={630}
        className="rounded-t-[12px]"
      />
      <div className="w-full flex flex-col bg-background1 shadow-md p-4 rounded-b-[12px]">
        <div className="mb-4">
          <h1>{title}</h1>
        </div>
        <div className="flex flex-row flex-wrap gap-x-2 gap-y-2">
          {category.map((category, index) => {
            return (
              <div key={index} className="bg-gray3 rounded-full px-3 py-1">
                <p className="text-gray1 text-[12px]">{category.name}</p>
              </div>
            );
          })}
        </div>
        <div className="w-full h-[2px] bg-background2 my-2"></div>
        <div className="text-right">
          <p className="text-gray2 text-[14px]">{publishedAt}</p>
        </div>
      </div>
    </div>
  );
};
