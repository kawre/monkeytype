import { useRouter } from "next/router";
import { ReactElement, useEffect, useReducer, useState } from "react";
import { PulseLoader } from "react-spinners";
import styled from "styled-components";
import Panel from "../../components/Room/Panel";
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
  const { socket } = useSocket();
  const { roomId } = useRouter().query;

  const [users, setUsers] = useState([] as UserState[]);
  const [stats, setStats] = useReducer(
    (state: Stats, newState: Partial<Stats>) => ({
      ...state,
      ...newState,
    }),
    initStats
  );
  const [wpm, setWpm] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState("");

  const { state, dispatch } = useRoom();
  const { time } = state;

  useEffect(() => {
    if (!roomId) return;
    socket.emit("room:join", roomId);

    socket.on("error", (err) => console.log(err));
    socket.on("room:countdown", (s) => dispatch({ time: s }));
    socket.on("room:time", (s) => dispatch({ time: s }));
    socket.on("room:start", () => dispatch({ time: 0, stage: "playing" }));
    socket.on("room:end", () => dispatch({ stage: "postmatch" }));
    socket.on("room:quote", (quote) => setQuote(quote));
    socket.on("room:state", ({ users, room }) => {
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
    <Layout title={`time: ${time} wpm: 52`}>
      <Wrapper>
        <Tracks users={users} />
        <Panel wpm={wpm} quote={quote} />
      </Wrapper>
    </Layout>
  );
};

RoomPage.getLayout = function getLayout(page: ReactElement) {
  return <RoomProvider>{page}</RoomProvider>;
};

export default RoomPage;

const Wrapper = styled.div``;

const initStats = {
  wpm: 0,
  progress: 0,
};

const Center = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

type Stats = typeof initStats;
