import { Server, Socket } from "socket.io";

const roomHandler = (io: Server, socket: Socket) => {
  const createRoom = (payload: any) => {
    console.log(payload);
  };

  socket.on("room:create", createRoom);
};

export default roomHandler;
