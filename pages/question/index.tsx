import { NextPage } from "next";
import DefaultLayout from "../../layouts/default";
import PageWithLayoutType from "../../layouts";

const Page: NextPage = () => {
  return <div></div>;
};

(Page as PageWithLayoutType).layout = DefaultLayout;

export default Page;
