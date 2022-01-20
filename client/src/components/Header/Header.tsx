import { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";
import { useAuth } from "../../contexts/auth.context";
import Button from "../Button";
import Text from "../Text";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Header: NextPage<Props> = () => {
  const { user } = useAuth();

  return (
    <Wrapper>
      <Link href={"/"}>
        <a>
          <Text lineHeight={1} fontSize={"4xl"}>
            monkeytype
          </Text>
        </a>
      </Link>
      <Div>
        {user ? (
          <>
            <Text>{user.username}</Text>
            <Button variant="ghost">Sign Out</Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <a>
                <Button>Log In</Button>
              </a>
            </Link>
          </>
        )}
      </Div>
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

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
