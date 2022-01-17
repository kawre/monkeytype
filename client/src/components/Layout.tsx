import { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import Header from "./Header/Header";
// Types -------------------------------------------------------------------------

interface Props {
  title: string;
}

// Component ---------------------------------------------------------------------
const Layout: NextPage<Props> = ({ title, children }) => {
  return (
    <Wrapper>
      <Head>
        <title>monkeytype | {title}</title>
      </Head>
      <Header />
      {children}
    </Wrapper>
  );
};

export default Layout;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  max-width: 1152px;
  margin: auto;
`;
