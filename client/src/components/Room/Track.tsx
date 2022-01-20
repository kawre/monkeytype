import { NextPage } from "next";
import styled from "styled-components";
import { UserState } from "../../types/user";
// Types -------------------------------------------------------------------------

interface Props {
  user: UserState;
}

// Component ---------------------------------------------------------------------
const Track: NextPage<Props> = ({ user }) => {
  return <Wrapper>{user.user.username}</Wrapper>;
};

export default Track;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
