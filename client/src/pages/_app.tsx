import axios, { AxiosRequestConfig } from "axios";
import { configure } from "axios-hooks";
import type { AppProps } from "next/app";
import AppWrapper from "../components/AppWrapper";
import { BASE_URL } from "../config/config";
import { Page } from "../types/page";

type AppPropsWithLayout = AppProps & {
  Component: Page;
};

// add authorization token to each request
axios.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    config.baseURL = BASE_URL; // base url for your api.
    config.withCredentials = true;
    return config;
  }
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

// configure axios-hooks to use this instance of axios
configure({ axios });

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <AppWrapper>{getLayout(<Component {...pageProps} />)}</AppWrapper>;
}

export default MyApp;
