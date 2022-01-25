import type { GetStaticProps, NextPage } from "next";
import DefaultLayout from "../../layouts/default";
import PageWithLayoutType from "../../layouts";

import { Contents } from "../../src/types/microCMS/Contents";
import { getGlobalContents } from "../../src/utils/microCMS/getContents";

type Props = {
  contents: Contents[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { contents } = await getGlobalContents();

  return {
    props: {
      contents: contents,
    },
  };
};

const Page: NextPage<Props> = ({ contents }: Props) => {
  console.log(contents);

  return (
    <div>
      <h1>LEARN</h1>
    </div>
  );
};

(Page as PageWithLayoutType).layout = DefaultLayout;

export default Page;
