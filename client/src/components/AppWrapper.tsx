import { NextPage } from "next";
import { ThemeProvider } from "styled-components";
import Layout from "../Layout/Layout";
import GlobalStyle from "../styles/GlobalStyle";
import { theme } from "../themes/theme";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const AppWrapper: NextPage<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>{children}</Layout>
    </ThemeProvider>
  );
};

export default AppWrapper;
