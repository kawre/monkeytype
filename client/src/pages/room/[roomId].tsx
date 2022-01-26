import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import styled from "styled-components";
import Panel from "../../components/Room/Panel";
import Results from "../../components/Room/Results";
import Tracks from "../../components/Room/Tracks";
import RoomProvider, { useRoom } from "../../contexts/room.context";
import { useSocket } from "../../contexts/socket.context";
import Layout from "../../Layout/Layout";
import { theme } from "../../styles/theme";
import { Page } from "../../types/page";
import { UserState } from "../../types/user";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const RoomPage: Page<Props> = () => {
  const router = useRouter();
  const { socket } = useSocket();
  const { roomId } = useRouter().query;

  const [users, setUsers] = useState([] as UserState[]);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState("");

  const { state, dispatch, stats } = useRoom();
  const { time, stage } = state;

  useEffect(() => {
    if (!roomId) return;
    socket.emit("room:join", roomId);

    socket.on("error", (err) => {
      console.log(err);
      router.push("/");
    });
    socket.on("room:time", (s) => dispatch({ time: s }));
    socket.on("room:start", () => dispatch({ time: 0, stage: "playing" }));
    socket.on("room:end", () => dispatch({ stage: "postmatch" }));
    socket.on("room:state", ({ state, quote }) => {
      const { room, users } = state;
      setQuote(quote.quote);
      dispatch({ ...room });
      setUsers(users);
      setLoading(false);
    });
    socket.on("room:users:state", (users) => {
      setUsers(users);
    });

    return () => {
      socket.emit("room:leave", roomId);
    };
  }, [roomId]);

  if (loading)
    return (
      <Layout title="loading...">
        <Center>
          <PulseLoader color={theme.colors.teal[500]} />
        </Center>
      </Layout>
    );

  return (
    <Layout title={`time: ${time} wpm: ${stats.wpm}`}>
      <Wrapper>
        {stage === "postmatch" ? (
          <Results />
        ) : (
          <>
            <Tracks users={users} />
            <Panel quote={quote} />
          </>
        )}
      </Wrapper>
    </Layout>
  );
};

RoomPage.getLayout = function getLayout(page: ReactElement) {
  return <RoomProvider>{page}</RoomProvider>;
};

export default RoomPage;

const Wrapper = styled.div`
  span {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const Center = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
