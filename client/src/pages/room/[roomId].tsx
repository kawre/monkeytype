import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import Text from "../../components/Text";
import RoomProvider, { useRoom } from "../../contexts/room.context";
import { useSocket } from "../../contexts/socket.context";
import Layout from "../../Layout/Layout";
import { Page } from "../../types/page";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const RoomPage: Page<Props> = () => {
  const { socket } = useSocket();
  const { roomId } = useRouter().query;

  const [wpm, setWpm] = useState(0);
  const [progress, setProgress] = useState(0);
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

    return () => {
      socket.emit("room:leave", roomId);
    };
  }, [roomId]);

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
