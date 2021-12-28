import { NextPage } from "next";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Layout: NextPage<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Layout;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 1440px;
  margin: auto;
`;
