import { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";
import Button from "../Button";
import Text from "../Text";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Header: NextPage<Props> = () => {
  return (
    <Wrapper>
      <Link href={"/"}>
        <a>
          <Text lineHeight={1} fontSize={"4xl"}>
            monkeytype
          </Text>
        </a>
      </Link>
      <Button>Log In</Button>
    </Wrapper>
  );
};

export default Header;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding: 3rem 0 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
