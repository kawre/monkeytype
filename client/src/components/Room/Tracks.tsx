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

const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 0 1.5rem;
`;
