import { NextPage } from "next";
import { useRouter } from "next/router";

export type Props = {
  content: {
    id: string;
    title: string;
    category: string;
    publishedAt: string;
  };
};

export const CardLearn: NextPage<Props> = ({ content }: Props) => {
  const { id, title, category, publishedAt } = content;
  const router = useRouter();

  const routeToLesson = (id: string) => {
    router.push({
      pathname: `/learn/[slug]`,
      query: { slug: id },
    });
  };

  return (
    <>
      <div
        className="px-4 py-2 cursor-pointer group"
        onClick={() => routeToLesson(id)}
      >
        <p className="text-primary-dark text-[14px] group-hover:text-primary-bright1">
          【{category}】{title}
        </p>
      </div>
      <div className="border-b mx-4 last:border-none"></div>
    </>
  );
};
