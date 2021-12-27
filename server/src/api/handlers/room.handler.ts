import { Server, Socket } from "socket.io";
import { RoomDocument } from "../models/room.model";
import { findRoomLobby, joinRoom, updateRoom } from "../services/room.service";

const roomHandler = (io: Server, socket: Socket) => {
  const { userId } = socket.handshake.query as { userId: string };

  // start count down
  const startCountDownInterval = (roomId: RoomDocument["_id"]) => {
    let s = 10;

    const countdown = setInterval(async () => {
      if (s === 3) {
        updateRoom({ _id: roomId }, { active: false });
        console.log("room no longer active");
      }

      if (s > 0) {
        console.log(s);
        s--;
      } else {
        clearInterval(countdown);
        // startRoomInterval(roomId);
      }
    }, 1000);
  };

  // room over
  const emitRoomOver = () => {};

  // start room
  const startRoomInterval = async (roomId: string) => {
    let s = 0;
    const intervalId = setInterval(() => {
      if (s < 300) {
        emitRoomState(roomId, {});
      } else {
        emitRoomOver();
        clearInterval(intervalId);
      }
    }, 1000);
  };

  // join room
  const handleJoinRoom = async (roomId: RoomDocument["_id"]) => {
    const room = await joinRoom({ roomId, userId });

    if (!room) socket.emit("roomNotFound");
    else if (room.users.length > 5) socket.emit("tooManyPlayers");
    else socket.join(roomId);
  };

  // new room
  const handleNewRoom = async () => {
    const room = await findRoomLobby(userId);
    const roomId = room._id;

    socket.join(roomId);
    startCountDownInterval(roomId);
  };

  // emit room state
  const emitRoomState = (room: string, state: object) => {
    io.sockets.in(room).emit("room:state", "state");
  };

  socket.on("room:join", handleJoinRoom);
  socket.on("room:new", handleNewRoom);
};

export default roomHandler;
