export { Sidebar } from "./Sidebar";
export { MobileSidebar } from "./MobileSidebar";

type SidebarItems = {
  name: string;
  link: string;
  src: string;
}[];

type SidebarInfoItems = {
  name: string;
  link: string;
}[];

export const sidebarItems: SidebarItems = [
  {
    name: "ホーム",
    link: "/home",
    src: "https://next-practice.imgix.net/icons/home.svg",
  },
  // {
  //   name: "タイムライン",
  //   link: "/timeline",
  //   src: "https://next-practice.imgix.net/icons/time.svg",
  // },
  {
    name: "教材",
    link: "/learn",
    src: "https://next-practice.imgix.net/icons/document.svg",
  },
  {
    name: "記事",
    link: "/articles",
    src: "https://next-practice.imgix.net/icons/articles.svg",
  },
  {
    name: "Q&A",
    link: "/question",
    src: "https://next-practice.imgix.net/icons/question.svg",
  },
];

export const sidebarInfoItems: SidebarInfoItems = [
  {
    name: "お問い合わせ",
    link: "/contact",
  },
  {
    name: "利用規約",
    link: "/toc",
  },
  {
    name: "プライバシーポリシー",
    link: "/privacy",
  },
  {
    name: "特定商取引法に基づく表示",
    link: "/ebizrule",
  },
];
