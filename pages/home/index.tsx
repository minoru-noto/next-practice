import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import DefaultLayout from "../../layouts/default";
import PageWithLayoutType from "../../layouts";

const Page: NextPage = () => {
  const homeWords = [
    "おかえりなさい!!",
    "今日も一日頑張ろう!!",
    "たまにはゆっくりしてもいいよ!!",
    "今日いいことあった？",
    "みんなが休んでるうちに頑張ろ!!",
  ];

  const number = Math.floor(Math.random() * (homeWords.length - 1 + 1));

  const replaceUrl = (src: string) => {
    return src.replace("https://next-practice.imgix.net/", "");
  };

  console.log(homeWords[number]);

  return (
    <div className="max-w-[1280px] mx-auto w-full px-[12px] py-8">
      <div className="mb-12">
        {/* TODO: 認証関連にするかどうか */}
        <h1 className="font-semibold">{homeWords[number]}</h1>
      </div>
      <div className="flex flex-row h-auto gap-x-12">
        <div className="max-w-[800px] flex pc:flex-row tablet:flex-col tablet:gap-y-4 mobile:flex-col mobile:gap-y-4 gap-x-4 w-full">
          {/* 教材一覧 */}
          <div className="pc:max-w-[350px] w-full h-[180px] px-4 py-4 border  bg-background1">
            <div className="flex flex-row justify-between mb-4">
              <h1 className="text-[16px] font-bold">
                発信中の教材を見てみよう！！
              </h1>
              <Link href="/learn">
                <a className="text-[12px] text-primary">教材一覧 {">>"}</a>
              </Link>
            </div>
            <div className="flex flex-row  justify-between">
              <Image
                src={replaceUrl(
                  "https://next-practice.imgix.net/icons/learningcode-img1.jpeg"
                )}
                width={150}
                height={100}
                className="rounded-[12px]"
              />
              <div className="max-w-[150px] py-2 w-full">
                <p className="text-[14px]">
                  現在初学者に向けた教材を発信中です！！
                  <br />
                  ぜひ勉強に活用してください！！
                </p>
              </div>
            </div>
          </div>
          {/* 記事一覧 */}
          <div className="pc:max-w-[350px] w-full h-[180px] px-4 py-4 border  bg-background1">
            <div className="flex flex-row justify-between mb-4">
              <h1 className="text-[16px] font-bold">
                発信中の記事を見てみよう！！
              </h1>
              <Link href="/articles">
                <a className="text-[12px] text-primary">記事一覧 {">>"}</a>
              </Link>
            </div>
            <div className="flex flex-row  justify-between">
              <Image
                src={replaceUrl(
                  "https://next-practice.imgix.net/icons/learningcode-img2.jpeg"
                )}
                width={150}
                height={100}
                className="rounded-[12px]"
              />
              <div className="max-w-[150px] py-2 w-full">
                <p className="text-[14px]">
                  現在初学者に向けた記事を発信中です！！
                  <br />
                  ぜひ勉強に活用してください！！
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* 広告リンク */}
        <div className="flex flex-col gap-y-12 max-w-[300px] w-full mobile:hidden">
          <div className="w-full">
            <a
              href="https://px.a8.net/svt/ejp?a8mat=3H5CY3+8C40Q+3L4M+669JL"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                width="300"
                height="250"
                alt=""
                src="https://www20.a8.net/svt/bgt?aid=210202059014&wid=002&eno=01&mid=s00000016735001037000&mc=1"
              />
            </a>
            <img
              width="1"
              height="1"
              src="https://www15.a8.net/0.gif?a8mat=3H5CY3+8C40Q+3L4M+669JL"
              alt=""
            />
          </div>
          <div className="w-full">
            <a
              href="https://px.a8.net/svt/ejp?a8mat=3H5C5U+8G8JOA+3GWO+60H7L"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                width="336"
                height="280"
                alt=""
                src="https://www28.a8.net/svt/bgt?aid=210201042511&wid=002&eno=01&mid=s00000016188001010000&mc=1"
              />
            </a>
            <img
              width="1"
              height="1"
              src="https://www16.a8.net/0.gif?a8mat=3H5C5U+8G8JOA+3GWO+60H7L"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

(Page as PageWithLayoutType).layout = DefaultLayout;

export default Page;
