import type { AppProps } from "next/app";
import AppWrapper from "../components/AppWrapper";
import { Page } from "../types/page";

type AppPropsWithLayout = AppProps & {
  Component: Page;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <AppWrapper>{getLayout(<Component {...pageProps} />)}</AppWrapper>;
}

export default MyApp;
