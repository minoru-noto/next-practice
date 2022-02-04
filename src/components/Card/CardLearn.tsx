import { NextPage } from "next";

export type Props = {
  contents: {
    [key: number]: {
      content: {
        id: string;
        title: string;
        category: string;
        publishedAt: string;
      };
    }[];
  };
};

export const CardLearn: NextPage<Props> = ({ contents }) => {
  console.log(contents);

  return <div>現在作成中です！！少々お待ちください！</div>;
};
