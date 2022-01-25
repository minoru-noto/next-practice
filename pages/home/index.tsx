import { NextPage } from "next";
import DefaultLayout from "../../layouts/default";
import PageWithLayoutType from "../../layouts";

const Page: NextPage = () => {
  return (
    <div className="w-full px-8 py-8">
      <div>
        {/* TODO: 認証関連にするかどうか */}
        <h1 className="font-semibold">おかえりなさい</h1>
      </div>
    </div>
  );
};

(Page as PageWithLayoutType).layout = DefaultLayout;

export default Page;
