import { NextPage } from "next";
import DefaultLayout from "../../layouts/default";
import PageWithLayoutType from "../../layouts";

const Page: NextPage = () => {
  const homeWords = [
    "おかえりなさい",
    "今日も一日頑張ろう!!",
    "たまにはゆっくりしてもいいよ!!",
    "今日いいことあった？",
    "みんなが休んでるうちに頑張ろ!!",
  ];

  const number = Math.floor(Math.random() * (homeWords.length - 1 + 1));

  console.log(homeWords[number]);

  return (
    <div className="w-full px-8 py-8">
      <div>
        {/* TODO: 認証関連にするかどうか */}
        <h1 className="font-semibold">ユーザーさん、{homeWords[number]}</h1>
      </div>
    </div>
  );
};

(Page as PageWithLayoutType).layout = DefaultLayout;

export default Page;
