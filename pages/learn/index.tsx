import type { GetStaticProps, NextPage } from "next";
import DefaultLayout from "../../layouts/default";
import PageWithLayoutType from "../../layouts";

import { CardLearn } from "src/components/Card";
import { Props as CardLearnProps } from "src/components/Card/CardLearn";
import { getGlobalContents } from "../../src/utils/microCMS/getLearnContents";

type Props = {
  nextContents: CardLearnProps[];
};

export const getStaticProps: GetStaticProps = async () => {
  const { nextContents } = await getGlobalContents();

  const allNextContents = nextContents.map((content) => ({
    content: {
      id: content.id,
      title: content.title,
      category: content.category.name,
      publishedAt: content.publishedAt,
    },
  }));

  return {
    props: {
      nextContents: allNextContents,
    },
  };
};

const Page: NextPage<Props> = ({ nextContents }) => {
  // console.log(nextContents);

  return (
    <div className="w-full h-full px-8 py-8">
      <div className="mb-8">
        <h1 className="font-semibold text-[18px]">教材一覧</h1>
      </div>
      {/* 教材一覧 */}
      <div className="flex flex-row gap-x-12">
        {/* ===== Next.js教材 ===== */}
        <div className="max-w-[400px] bg-background1 rounded-t-[12px] w-full">
          <div className="bg-gray3 px-[16px] rounded-t-[12px] py-[12px]">
            <h1 className="text-[14px] font-bold text-body">
              Next.jsを学んでみよう！！
            </h1>
          </div>
          <div className="flex flex-col">
            {nextContents.map((content, index) => {
              return <CardLearn key={index} content={content.content} />;
            })}
          </div>
        </div>
        {/* ===== Nuxt.js教材 ===== */}
      </div>
    </div>
  );
};

(Page as PageWithLayoutType).layout = DefaultLayout;

export default Page;
