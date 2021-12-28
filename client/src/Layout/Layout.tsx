import { NextPage } from "next";
import styled from "styled-components";
import Header from "../components/Header/Header";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Layout: NextPage<Props> = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
};

export default Layout;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 1440px;
  padding: 0 5%;
  margin: auto;
`;
