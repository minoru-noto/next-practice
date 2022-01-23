import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";

type SidebarItems = {
  name: string;
  link: string;
  src: string;
}[];

export const Sidebar: NextPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const router = useRouter();
  const currentAsPath = router.asPath;

  const sidebarItems: SidebarItems = [
    { name: "ホーム", link: "/home", src: "/Icons/home.svg" },
    { name: "タイムライン", link: "/", src: "/Icons/time.svg" },
    { name: "教材", link: "/learn", src: "/Icons/document.svg" },
    { name: "Q&A", link: "/question", src: "/Icons/question.svg" },
  ];

  const routeToLink = (link: string) => {
    router.push(link);
  };

  const isToggleFun = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`max-w-[200px] border-r-2 py-[24px] flex flex-col ${
        isOpen ? "w-full" : "w-[80px]"
      }`}
    >
      {/* 区切り線 */}
      <div className="w-[80%] h-[2px] bg-gray3 mx-auto  mt-[80px]"></div>
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
                  currentAsPath === item.link
                    ? "bg-secondary"
                    : "bg-background2"
                }`}
              ></div>
              <Image src={item.src} width={18} height={18} alt="アイコン画像" />
              {isOpen && (
                <p className="font-semibold text-[16px]">{item.name}</p>
              )}
            </div>
          );
        })}
      </div>
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
