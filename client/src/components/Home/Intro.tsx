import { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useSocket } from "../../context/socket.context";
import Button from "../Button";
import Text from "../Text";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Intro: NextPage<Props> = () => {
  const { socket } = useSocket();
  const router = useRouter();

  const findGameHandler = () => {
    socket.emit("room:find");

    socket.on("roomId", (id) => {
      router.push(`/${id}`);
    });
  };

  return (
    <Wrapper>
      <Text fontSize={"xxxl"} fontWeight={600}>
        Start Racing
      </Text>
      <BtnWrap>
        <Button onClick={findGameHandler}>Find Game</Button>
      </BtnWrap>
    </Wrapper>
  );
};

export default Intro;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.subText};
  min-height: 20rem;
  border-radius: ${({ theme }) => theme.rounded.lg};
  padding: 1.5rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnWrap = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 1.5rem;
`;
