import { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

type Props = {
  openHamburgerMenu: () => void;
};

export const Header: NextPage<Props> = ({ openHamburgerMenu }) => {
  const [currentPage, setCurrentPage] = useState<string>("");
  const router = useRouter();
  const currentAsPath = router.asPath;
  const currentPathname = router.pathname;

  const currentPageName = () => {
    switch (currentPathname) {
      case "/home":
        setCurrentPage("ホーム");
        break;
      case "/timeline":
        setCurrentPage("タイムライン");
        break;
      case "/learn":
        setCurrentPage("教材");
        break;
      case "/articles":
      case "/articles/[slug]":
      case "/articles/category/[category]":
        setCurrentPage("記事");
        break;
      case "/question":
        setCurrentPage("Q&A");
        break;
      default:
        setCurrentPage("");
    }
  };

  const replaceUrl = (src: string) => {
    return src.replace("https://next-practice.imgix.net/", "");
  };

  useEffect(() => {
    currentPageName();
  }, [currentPathname]);

  return (
    <div className="w-full h-[65px] border-b-2">
      <div className="flex flex-row justify-between items-center px-8">
        <div className="py-4">
          <h1 className="font-bold text-[22px]">{currentPage}</h1>
        </div>
        <div
          className="pc:hidden tablet:hidden cursor-pointer"
          onClick={openHamburgerMenu}
        >
          <Image
            src={replaceUrl("icons/menu.svg")}
            width={28}
            height={28}
            alt="アイコン画像"
          />
        </div>
      </div>
    </div>
  );
};
