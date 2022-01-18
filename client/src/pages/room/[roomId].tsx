import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import Text from "../../components/Text";
import RoomProvider, { useRoom } from "../../contexts/room.context";
import { useSocket } from "../../contexts/socket.context";
import Layout from "../../Layout/Layout";
import { theme } from "../../styles/theme";
import { Page } from "../../types/page";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const RoomPage: Page<Props> = () => {
  const { socket } = useSocket();
  const { roomId } = useRouter().query;

  const [users, setUsers] = useState({});
  const [wpm, setWpm] = useState(0);
  const [progress, setProgress] = useState(0);
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);

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
    socket.on("room:state", (state) => {
      dispatch({ ...state });
      setLoading(false);
    });
    socket.on("room:users:state", (state) => {
      console.log(state);
    });

    return () => {
      socket.emit("room:leave", roomId);
    };
  }, [roomId]);

  if (loading)
    return (
      <Layout title="loading...">
        <PulseLoader color={theme.colors.teal[500]} />
      </Layout>
    );

  return (
    <Layout title={`time: ${time} wpm: 52`}>
      <Text>{roomId}</Text>
    </Layout>
  );
};

RoomPage.getLayout = function getLayout(page: ReactElement) {
  return <RoomProvider>{page}</RoomProvider>;
};

export default RoomPage;
