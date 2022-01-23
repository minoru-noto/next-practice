import { NextPage } from "next";
import { Props } from "../src/types/page";
import { Sidebar } from "../src/components/Sidebar";

const DefaultLayout: NextPage<Props> = ({ children }: Props) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default DefaultLayout;
