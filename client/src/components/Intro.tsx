import { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useSocket } from "../contexts/socket.context";
import Button from "./Button";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Intro: NextPage<Props> = () => {
  const router = useRouter();
  const { socket } = useSocket();

  const handleFindGame = () => {
    socket.emit("room:find");

    socket.on("roomId", (roomId: string) => {
      router.push(`/room/${roomId}`);
    });
  };

  return (
    <Wrapper>
      <Button onClick={handleFindGame}>find game</Button>
    </Wrapper>
  );
};

export default Intro;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  height: 22.5rem;
  background-color: ${({ theme }) => theme.colors.neutral[800]};
  border-radius: ${({ theme }) => theme.rounded.xl};
`;
