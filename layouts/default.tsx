import { NextPage } from "next";
import { Props } from "../src/types/page";
import { Sidebar } from "../src/components/Sidebar";
import { Header } from "../src/components/Header";

const DefaultLayout: NextPage<Props> = ({ children }: Props) => {
  return (
    <div className="h-screen flex bg-background1">
      <Sidebar />
      <div className="w-full">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
