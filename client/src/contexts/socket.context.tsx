import { NextPage } from "next";
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
// Types -------------------------------------------------------------------------

interface Context {
  socket: Socket;
}

const SocketContext = createContext<Context>(null!);

// Component ---------------------------------------------------------------------
const SocketProvider: NextPage = (props) => {
  const [socket, setSocket] = useState({} as Socket);

  useEffect(() => {
    setSocket(
      io("http://localhost:1337", {
        query: { userId: "61c9ce314e706a03a5a63f5a" },
      })
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  const value = { socket };

  if (Object.keys(socket).length === 0) return null;
  return <SocketContext.Provider value={value} {...props} />;
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;
