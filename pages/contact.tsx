import { NextPage } from "next";
import DefaultLayout from "layouts/default";
import PageWithLayoutType from "layouts";
import { useState } from "react";

const Page: NextPage = () => {
  const [isSend, setIsSend] = useState(false);
  // 入力候補
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = async () => {
    console.log("送信");
    const res = await fetch("/api/contact/contact", { method: "POST" });
    console.log(res);
  };

  return (
    <div className="w-full px-8 py-8">
      {/* 送信前 */}
      {!isSend && (
        <div className="w-full">
          <div className="text-center">
            <h1 className="font-bold text-[22px]">お問い合わせ</h1>
          </div>
          <button onClick={sendEmail}>テスト</button>
          <form action=""></form>
        </div>
      )}
      {/* 送信後 */}
      {isSend && <div></div>}
    </div>
  );
};

(Page as PageWithLayoutType).layout = DefaultLayout;

export default Page;
