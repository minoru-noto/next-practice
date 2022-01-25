import { NextPage } from "next";
import DefaultLayout from "../../layouts/default";
import PageWithLayoutType from "../../layouts";

const Page: NextPage = () => {
  return <div>このページは管理者のみアクセス可能です。</div>;
};

(Page as PageWithLayoutType).layout = DefaultLayout;

export default Page;
