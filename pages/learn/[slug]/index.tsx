import { GetStaticProps, GetStaticPaths, NextPage } from "next";
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
import DefaultLayout from "layouts/default";
import PageWithLayoutType from "layouts";
import { Contents } from "src/types/microCMS/Contents";
import { processer, createTableOfContents } from "microcms-richedit-processer";
import { getContent } from "src/utils/microCMS/getLearnContents";
import { getGlobalContent } from "src/utils/microCMS/getLearnContents";
import { CardSlugContent } from "src/components/Card";

export const getAllSlugPaths = async () => {
  const { contents } = await getGlobalContent();
  const paths = contents.map((content) => ({
    params: {
      slug: content.id,
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

type Props = {
  contents: Contents;
  toc: {
    id: string;
    name: string;
    text: string;
  }[];
};

const processingDom = async (htmlString: string) => {
  return {
    body: await processer(htmlString, { code: { enabled: true } }),
    toc: createTableOfContents(htmlString, { tags: "h2,h3" }),
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
  preview,
  previewData,
}) => {
  if (params === undefined || typeof params.slug !== "string")
    throw Error("pagesのディレクトリ構造かファイル名が間違っています。");

  const contents = await getContent({
    depth: 2,
    draftKey: preview
      ? (previewData as { [key: string]: string }).draftKey
      : undefined,
  })(params.slug);

  const { toc } = await processingDom(contents.body);

  return {
    props: { contents, toc },
  };
};

const Page: NextPage<Props> = ({ contents, toc }) => {
  const { title, sectionTitle, description, body, keywords } = contents;

  const headTitle = returnTitle(title);
  const headDescription = description;
  const headKeywords = keywords;

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
      </Head>

      <div className="w-full max-w-[1080px] px-[12px] mx-auto py-[24px] h-full overflow-scroll">
        {/* リンク遷移 */}
        <div className="flex flex-row items-center gap-x-2 mb-12">
          <Link href="/learn">
            <a className="text-primary text-[14px]">{sectionTitle}</a>
          </Link>
          <span> {">"}</span>
          <p className="text-[14px]">{title}</p>
        </div>
        {/* メインコンテンツ */}
        <div className="max-w-[800px] w-full">
          <CardSlugContent body={body} />
        </div>
      </div>
    </>
  );
};

(Page as PageWithLayoutType).layout = DefaultLayout;

export default Page;
