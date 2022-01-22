import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/auth.context";
import { useSocket } from "../contexts/socket.context";
import Button from "./Button";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Intro: NextPage<Props> = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { socket } = useSocket();

  const handleFindGame = () => {
    setLoading(true);

    socket.emit("room:find");
    socket.on("room:id", (roomId: string) => {
      router.push(`/room/${roomId}`);
      setLoading(false);
    });
  };

  return (
    <Wrapper>
      <BtnWrapper>
        {user ? (
          <Button isLoading={loading} onClick={handleFindGame}>
            find game
          </Button>
        ) : (
          <Link href="/login">
            <a>
              <Button>Log In to play</Button>
            </a>
          </Link>
        )}
      </BtnWrapper>
    </Wrapper>
  );
};

export default Intro;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  height: 22.5rem;
  background-color: ${({ theme }) => theme.colors.neutral[800]};
  border-radius: ${({ theme }) => theme.rounded.xl};
  position: relative;
`;

const BtnWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 2rem;
`;
