import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import Text from "../../components/Text";
import { useSocket } from "../../contexts/socket.context";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const RoomPage: NextPage<Props> = () => {
  const { socket } = useSocket();
  const { roomId } = useRouter().query;
  const [time, setTime] = useState(15);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!roomId) return;
    socket.emit("room:join", roomId);

    socket.on("error", (err) => {
      console.log(err);
    });

    socket.on("room:countdown", (s) => setTime(s));
    socket.on("room:time", (s) => setTime(s));
    socket.on("room:start", () => {
      setTime(0);
      setIsPlaying(true);
    });

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

export default RoomPage;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
