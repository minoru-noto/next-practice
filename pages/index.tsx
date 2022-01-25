import type { NextPage } from "next";
import { useRouter } from "next/router";

const Page: NextPage = () => {
  const router = useRouter();

  const routeToLink = () => {
    router.push("/home");
  };

  return (
    <div>
      <p>ようこそ!!</p>
      <div className="cursor-pointer" onClick={routeToLink}>
        <p>学習する</p>
      </div>
    </div>
  );
};

export default Page;
