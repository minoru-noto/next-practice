import { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const Header: NextPage = () => {
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
        setCurrentPage("記事");
        break;
      case "/question":
        setCurrentPage("Q&A");
        break;
      default:
        setCurrentPage("");
    }
  };

  useEffect(() => {
    currentPageName();
  }, [currentPathname]);

  return (
    <div className="w-full h-[65px] border-b-2">
      <div className="flex flex-row justify-between items-center">
        <div className="py-4 px-8">
          <h1 className="font-bold text-[22px]">{currentPage}</h1>
        </div>
        <div></div>
      </div>
    </div>
  );
};
