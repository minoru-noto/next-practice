import type { NextPage } from "next";
import DefaultLayout from "../layouts/default";
import PageWithLayoutType from "../layouts/index";

const Page: NextPage = () => {
  return (
    <div>
      <h1>ようこそ!!</h1>
    </div>
  );
};

(Page as PageWithLayoutType).layout = DefaultLayout;

export default Page;
