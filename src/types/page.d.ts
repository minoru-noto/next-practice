import { NextPage } from "next";
import { ReactChild } from "react";
import PageWithLayoutType from "layouts/index";

export type AppLayoutProps = {
  Component: PageWithLayoutType;
  pageProps: NextPage & { children?: ReactChild };
};

export type Props = {
  children: React.ReactNode;
};
