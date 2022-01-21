import { NextPage } from "next";
import styled from "styled-components";
import { useRoom } from "../../contexts/room.context";
import { UserState } from "../../types/user";
import Text from "../Text";
import Track from "./Track";
// Types -------------------------------------------------------------------------

interface Props {
  users: UserState[];
}

// Component ---------------------------------------------------------------------
const Tracks: NextPage<Props> = ({ users }) => {
  const { state } = useRoom();

  return (
    <Wrapper>
      <Stats>
        <Text>{state.time}</Text>
      </Stats>
      {users.map((u, i) => (
        <Track key={i} user={u} />
      ))}
    </Wrapper>
  );
};

export default Tracks;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;

const Stats = styled.div`
  display: flex;
`;
