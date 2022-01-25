import type { NextPage } from "next";
import DefaultLayout from "../layouts/default";
import PageWithLayoutType from "../layouts";

const Page: NextPage = () => {
  return (
    <div>
      <p className="text-primary text-[22px]">テスト</p>
    </div>
  );
};

(Page as PageWithLayoutType).layout = DefaultLayout;

export default Page;
