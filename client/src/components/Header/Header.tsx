import { NextPage } from "next";
import Link from "next/link";
import {
  FaCog,
  FaRegUserCircle,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import styled from "styled-components";
import { useAuth } from "../../contexts/auth.context";
import Button from "../Button";
import Icon from "../Icon";
import Text from "../Text";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Header: NextPage<Props> = () => {
  const { user, logout } = useAuth();

  return (
    <Wrapper>
      <Link href={"/"}>
        <a>
          <Logo>monkeytype</Logo>
        </a>
      </Link>
      <Div>
        {user ? (
          <>
            <Button variant="ghost">
              <Icon as={FaCog} />
            </Button>
            <Text mx={2}>|</Text>
            <Button variant="ghost">
              <Icon mr={2} as={FaUserCircle} />
              <Text>{user.username}</Text>
            </Button>
            <Text mx={2}>|</Text>
            <Button variant="ghost" onClick={logout}>
              <Icon mr={2} as={FaSignOutAlt} />
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost">
              <Icon as={FaCog} />
            </Button>
            <Text mx={2}>|</Text>
            <Button variant="ghost">
              <Icon mr={2} as={FaRegUserCircle} />
            </Button>
            <Text mx={2}>|</Text>
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

const Logo = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes["4xl"]};
  line-height: 1;
  user-select: none;
`;

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
