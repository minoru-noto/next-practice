import "../styles/globals.css";
import { AppLayoutProps } from "../src/types/page";
import { Props } from "../src/types/page";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const Layout = Component.layout || (({ children }: Props) => <>{children}</>);

  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
