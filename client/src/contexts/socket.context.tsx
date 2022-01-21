import { NextPage } from "next";
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useAuth } from "./auth.context";
// Types -------------------------------------------------------------------------

interface Context {
  socket: Socket;
}

const SocketContext = createContext<Context>(null!);

// Component ---------------------------------------------------------------------
const SocketProvider: NextPage = (props) => {
  const [socket, setSocket] = useState({} as Socket);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const skt = io("http://localhost:1337", {
      query: { userId: user._id },
    });

    setSocket(skt);
    return () => {
      skt.disconnect();
    };
  }, [user]);

  const value = { socket };

  return <SocketContext.Provider value={value} {...props} />;
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;
