import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { sidebarItems, sidebarInfoItems } from "./index";

type Props = {
  isOpen: boolean;
  routeToLink: (link: string) => void;
};

export const MobileSidebar: NextPage<Props> = ({ isOpen, routeToLink }) => {
  const router = useRouter();
  const currentAsPath = router.asPath;
  const isOpenStyle = isOpen
    ? "translate-x-0 ease-out"
    : "-translate-x-full ease-in";

  const replaceUrl = (src: string) => {
    return src.replace("https://next-practice.imgix.net/", "");
  };

  return (
    <div
      className={`max-w-[250px] h-full border-r-2 py-[24px] w-full flex flex-col fixed left-0 z-10 pc:hidden tablet:hidden bg-background1 transform transition duration-300 ${isOpenStyle}`}
    >
      <div className="px-6 cursor-pointer" onClick={() => routeToLink("/home")}>
        <h1 className="font-bold text-[24px]">
          <Image
            src={replaceUrl("icons/code.png")}
            width={20}
            height={20}
            alt="アイコン画像"
          />
          <span className="ml-2">Learning</span>
          <br />
          <span className="ml-20">Code</span>
        </h1>
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
              }`}
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
              <p className="font-semibold text-[16px]">{item.name}</p>
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
              <div
                key={index}
                className="mx-8 hover:text-gray4 cursor-pointer"
                onClick={() => routeToLink(item.link)}
              >
                <p className="text-[13px] text-gray1">{item.name}</p>
              </div>
            );
          })}
        </div>
      )}
      {/* 区切り線 */}
      <div className="w-[80%] h-[2px] bg-gray3 mx-auto"></div>
    </div>
  );
};
