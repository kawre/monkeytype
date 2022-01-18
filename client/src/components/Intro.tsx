import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { useSocket } from "../contexts/socket.context";
import Button from "./Button";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Intro: NextPage<Props> = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { socket } = useSocket();

  const handleFindGame = () => {
    setLoading(true);

    socket.emit("room:find");
    socket.on("room:id", (roomId: string) => {
      router.push(`/room/${roomId}`);
    });

    setLoading(false);
  };

  return (
    <Wrapper>
      <Button loading={loading} onClick={handleFindGame}>
        find game
      </Button>
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
