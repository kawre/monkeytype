import { Server, Socket } from "socket.io";
import { UserState } from "../models/room.model";
import {
  findAndJoinRoom,
  getRoomState,
  initRoomState,
  updateRoom,
  updateUserState,
} from "../services/room.service";

type Params = {
  userId: string;
  roomId: string;
};

export type Collect = {
  wpm: number;
  progess: number;
};

const roomHandler = (io: Server, socket: Socket) => {
  const { userId, roomId } = socket.handshake.query as Params;
  console.log(userId);

  // start count down
  const startCountDownInterval = () => {
    let s = 10;

    const countdown = setInterval(async () => {
      if (s === 3) {
        updateRoom({ _id: roomId }, { active: false });
      }

      if (s > 0) {
        socket.emit("countdown", s);
        s--;
      } else {
        clearInterval(countdown);
        startRoomInterval();
      }
    }, 1000);
  };

  // start room
  const startRoomInterval = async () => {
    socket.emit("start");

    let s = 0;
    const intervalId = setInterval(() => {
      if (s >= 300) {
        socket.emit("end", true);
        clearInterval(intervalId);
      }
      socket.emit("time", s);
    }, 1000);
  };

  // join room
  const handleJoinRoom = async () => {
    await initRoomState(userId, roomId);
  };

  // find room
  const handleFindRoom = async () => {
    // @ts-ignore
    const { room, isNew } = await findAndJoinRoom(userId);
    if (!room) return socket.emit("error");

    if (isNew) {
      startCountDownInterval();
    }

    socket.emit("roomId", room._id);
    return socket.join(room._id);
  };

  // collect user state
  const collectUserState = async (state: Collect) => {
    await updateUserState(userId, roomId, state);
  };

  // emit room state
  const emitUserState = async () => {
    const state = await getRoomState(roomId);
    socket.emit("state", state);
    // io.sockets.in(roomId).emit("room:state", state);
  };

  socket.on("room:user:state", collectUserState);
  socket.on("room:find", handleFindRoom);
  socket.on("room:join", handleJoinRoom);
};

export default roomHandler;
