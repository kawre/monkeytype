import { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";
import { useMe } from "../../context/me.context";
import Button from "../Button";
import Logo from "../Logo";
import Text from "../Text";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Header: NextPage<Props> = () => {
  const { me } = useMe();
  return (
    <Wrapper>
      <Logo />
      <Entry>
        {me ? (
          <>
            <Text fontWeight={500} fontSize={"lg"}>
              {me.username}
            </Text>
            <Button ml={2}>Log Out</Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <a>
                <Button>Log In</Button>
              </a>
            </Link>
            <Text mx={2}>or</Text>
            <Link href={"/register"}>
              <a>
                <Button>Sign Up</Button>
              </a>
            </Link>
          </>
        )}
      </Entry>
    </Wrapper>
  );
};

export default Header;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;
`;

const Entry = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
