import { NextPage } from "next";
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";
// Types -------------------------------------------------------------------------

interface Context {
  socket: Socket;
}

const SocketContext = createContext<Context>(null!);

// Component ---------------------------------------------------------------------
const SocketProvider: NextPage = (props) => {
  const [socket, setSocket] = useState({} as Socket);

  useEffect(() => {
    setSocket(io(SOCKET_URL));

    return () => {
      socket.disconnect();
    };
  }, []);

  const value = { socket };

  return <SocketContext.Provider value={value} {...props} />;
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;
