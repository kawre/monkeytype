import { Server, Socket } from "socket.io";
import {
  findAndJoinRoom,
  joinRoom,
  updateRoom,
  updateRoomState,
  updateUserState,
  usersPopulate,
} from "../services/room.service";

type Params = {
  userId: string;
};

export type Collect = {
  state: {
    wpm: number;
    progess: number;
  };
  roomId: string;
};

const roomHandler = (io: Server, socket: Socket) => {
  const { userId } = socket.handshake.query as Params;

  // start count down
  const startCountDownInterval = (roomId: string) => {
    let s = 15;

    const countdown = setInterval(async () => {
      if (s === 3) {
        updateRoom({ _id: roomId }, { active: false });
      }

      if (s > 0) {
        io.to(roomId).emit("room:countdown", s);
        updateRoomState({ time: s }, roomId);
        s--;
      } else {
        clearInterval(countdown);
        startRoomInterval(roomId);
        io.to(roomId).emit("room:start");
        updateRoomState({ stage: "playing", time: 0 }, roomId);
      }
    }, 1000);
  };

  // start room
  const startRoomInterval = (roomId: string) => {
    let s = 1;
    const intervalId = setInterval(async () => {
      io.to(roomId).emit("room:time", s);
      updateRoomState({ time: s }, roomId);

      if (s >= 300) {
        io.to(roomId).emit("room:end");
        updateRoomState({ stage: "postmatch" }, roomId);
        clearInterval(intervalId);
      }

      s++;
      const { users } = await usersPopulate(roomId);
      io.to(roomId).emit("room:users:state", users);
    }, 1000);
  };

  const handleLeaveRoom = async (roomId: string) => {
    try {
      socket.leave(roomId);
      io.to(roomId).emit("room:leave", "user left");
    } catch (e) {
      socket.emit("error", "couldn't perform requested action");
    }
  };

  // join room
  const handleJoinRoom = async (roomId: string) => {
    try {
      await joinRoom(userId, roomId);

      const state = await usersPopulate(roomId);

      socket.join(roomId);
      io.to(roomId).emit("room:state", state);
    } catch {
      socket.emit("error", "couldn't perform requested action");
    }
  };

  // find room
  const handleFindRoom = async () => {
    try {
      const { room, isNew } = await findAndJoinRoom(userId);

      if (isNew) {
        startCountDownInterval(room._id.toString());
      }

      socket.emit("room:id", room._id);
    } catch {
      socket.emit("error", "couldn't perform requested action");
    }
  };

  // collect user state
  const collectUserState = async ({ state, roomId }: Collect) => {
    const curr = await updateUserState(userId, roomId, state);
    io.to(roomId).emit("room:users:state", curr);
  };

  socket.on("room:user:state", collectUserState);
  socket.on("room:find", handleFindRoom);
  socket.on("room:join", handleJoinRoom);
  socket.on("room:leave", handleLeaveRoom);
};

export default roomHandler;
