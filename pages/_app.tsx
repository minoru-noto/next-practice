import "../styles/globals.css";
import { AppLayoutProps, Props } from "../src/types/page";
import { RecoilRoot } from "recoil";

function App({ Component, pageProps }: AppLayoutProps) {
  const Layout = Component.layout || (({ children }: Props) => <>{children}</>);

  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default App;
