import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { sidebarItems, sidebarInfoItems } from "./index";

export const Sidebar: NextPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const router = useRouter();
  const currentAsPath = router.asPath;

  const replaceUrl = (src: string) => {
    return src.replace("https://next-practice.imgix.net/", "");
  };

  const routeToLink = (link: string) => {
    router.push(link);
  };

  const isToggleFun = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`max-w-[200px] border-r-2 py-[24px] flex flex-col mobile:hidden ${
        isOpen ? "w-full" : "w-[80px]"
      }`}
    >
      <div className="px-6">
        <Link href="/home">
          <a>
            <h1 className="font-bold text-[24px]">
              <Image
                src={replaceUrl("icons/code.png")}
                width={20}
                height={20}
                alt="アイコン画像"
              />
              <span className={`ml-2 ${!isOpen && "hidden"}`}>Learning</span>
              <br />
              <span className={`ml-20 ${!isOpen && "hidden"}`}>Code</span>
            </h1>
          </a>
        </Link>
      </div>
      {/* 区切り線 */}
      <div className="w-[80%] h-[2px] bg-gray3 mx-auto  mt-[50px]"></div>
      {/* Tabsリスト */}
      <div className="flex flex-col my-[20px]">
        {sidebarItems.map((item, index) => {
          return (
            <div
              key={index}
              className={`px-[24px] py-[12px] hover:text-secondary cursor-pointer flex flex-row gap-x-4 items-center ${
                currentAsPath === item.link && "text-secondary"
              } ${isOpen ? "px-[24px]" : "px-[12px]"}`}
              onClick={() => routeToLink(item.link)}
            >
              <div
                className={`w-[3px] h-[25px] ${
                  currentAsPath === item.link ||
                  currentAsPath.includes(item.link)
                    ? "bg-secondary"
                    : "bg-background2"
                }`}
              ></div>
              <Image
                src={replaceUrl(item.src)}
                width={18}
                height={18}
                alt="アイコン画像"
              />
              {isOpen && (
                <p className="font-semibold text-[16px]">{item.name}</p>
              )}
            </div>
          );
        })}
      </div>
      {/* 区切り線 */}
      <div className="w-[80%] h-[2px] bg-gray3 mx-auto"></div>
      {/* 各種情報 */}
      {isOpen && (
        <div className="my-8 flex flex-col gap-y-2">
          {sidebarInfoItems.map((item, index) => {
            return (
              <Link href={item.link} key={index}>
                <a>
                  <div className="mx-8 hover:text-gray4">
                    <p className="text-[13px] text-gray1">{item.name}</p>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      )}
      {/* 区切り線 */}
      <div className="w-[80%] h-[2px] bg-gray3 mx-auto"></div>
      {/* 開閉ボタン */}
      <div className="flex justify-end mt-auto px-6">
        <div onClick={isToggleFun}>
          {isOpen && <p className="text-[18px] font-bold cursor-pointer">＜</p>}
          {!isOpen && (
            <p className="text-[18px] font-bold cursor-pointer">＞</p>
          )}
        </div>
      </div>
    </div>
  );
};
