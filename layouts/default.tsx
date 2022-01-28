import { NextPage } from "next";
import { useState } from "react";
import { Props } from "../src/types/page";
import { Background } from "src/components/Background";
import { Sidebar, MobileSidebar } from "../src/components/Sidebar";
import { Header } from "../src/components/Header";
import { useRouter } from "next/router";

const DefaultLayout: NextPage<Props> = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const openHamburgerMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeHamburgerMenu = () => {
    setIsOpen(false);
  };

  const router = useRouter();

  const routeToLink = (link: string) => {
    setIsOpen(false);
    router.push(link);
  };

  return (
    <div className="h-screen flex bg-background2">
      <Background isOpen={isOpen} closeHamburgerMenu={closeHamburgerMenu} />
      <Sidebar />
      <MobileSidebar isOpen={isOpen} routeToLink={routeToLink} />
      <div className="w-full flex flex-1 flex-col overflow-hidden">
        <Header openHamburgerMenu={openHamburgerMenu} />
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
