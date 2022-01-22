import { NextPage } from "next";
import styled from "styled-components";
import { UserState } from "../../types/user";
import Track from "./Track";
// Types -------------------------------------------------------------------------

interface Props {
  users: UserState[];
}

// Component ---------------------------------------------------------------------
const Tracks: NextPage<Props> = ({ users }) => {
  return (
    <Wrapper>
      {users.map((u, i) => (
        <Track key={i} user={u} />
      ))}
    </Wrapper>
  );
};

export default Tracks;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
