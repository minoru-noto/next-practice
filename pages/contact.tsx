import { NextPage } from "next";
import DefaultLayout from "layouts/default";
import PageWithLayoutType from "layouts";
import { FormEvent, useState } from "react";

const Page: NextPage = () => {
  const [isSend, setIsSend] = useState(false);
  // 入力候補
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        message: message,
      }),
    });
    if (res.ok) {
      setIsSend(true);
    }
  };

  return (
    <div className="w-full px-8 py-16 h-full overflow-scroll">
      <div className="text-center mb-12">
        <h1 className="font-bold text-[22px]">お問い合わせ</h1>
      </div>
      {/* 送信前 */}
      {!isSend && (
        <div className="w-full max-w-[600px] mx-auto">
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-y-2 mb-10">
              <label className="text-[16px] font-semibold">
                メールアドレス
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 w-full max-w-[600px] h-[35px] px-2"
              />
            </div>

            <div className="flex flex-col gap-y-2 mb-16">
              <label className="text-[16px] font-semibold">
                お問い合わせ内容
              </label>
              <textarea
                className="border-2 w-full max-w-[600px] px-2 py-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
              ></textarea>
            </div>
            <div className="w-[250px] h-[50px] mx-auto">
              <button className="bg-primary text-background1 w-full h-full">
                送信
              </button>
            </div>
          </form>
        </div>
      )}
      {/* 送信後 */}
      {isSend && (
        <div className="text-center">
          <h1>送信完了！！</h1>
        </div>
      )}
    </div>
  );
};

(Page as PageWithLayoutType).layout = DefaultLayout;

export default Page;
