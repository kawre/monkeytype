import { NextPage } from "next";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import SocketProvider from "../context/socket.context";
import Layout from "../Layout/Layout";
import GlobalStyle from "../styles/GlobalStyle";
import { theme } from "../themes/theme";
// Types -------------------------------------------------------------------------

interface Props {}

export const client = new QueryClient();

// Component ---------------------------------------------------------------------
const AppWrapper: NextPage<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={client}>
      <SocketProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Layout>{children}</Layout>
        </ThemeProvider>
      </SocketProvider>
    </QueryClientProvider>
  );
};

export default AppWrapper;
