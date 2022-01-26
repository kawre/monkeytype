import { Server, Socket } from "socket.io";
import config from "../../config";
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
    let s = config.countdownDuration;

    const countdown = setInterval(async () => {
      if (s === 3) {
        updateRoom({ _id: roomId }, { active: false });
      }

      if (s > 0) {
        io.to(roomId).emit("room:time", s);
        updateRoomState({ time: s }, roomId);
      } else {
        clearInterval(countdown);
        startRoomInterval(roomId);
        io.to(roomId).emit("room:start");
        updateRoomState({ time: s }, roomId);
      }

      s--;
    }, 1000);
  };

  // start room
  const startRoomInterval = (roomId: string) => {
    let s = 1;

    const intervalId = setInterval(async () => {
      io.to(roomId).emit("room:time", s);

      if (s >= 30) {
        io.to(roomId).emit("room:end");
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
      const { state, quote } = await joinRoom(userId, roomId);
      const { quote: quoteText } = quote as any;

      socket.join(roomId);
      io.to(roomId).emit("room:state", { state, quote: quoteText });
    } catch {
      socket.emit("error", "Couldn't connect");
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
    console.log(state);
    const curr = await updateUserState(userId, roomId, state);
    io.to(roomId).emit("room:users:state", curr);
  };

  socket.on("room:user:state", collectUserState);
  socket.on("room:find", handleFindRoom);
  socket.on("room:join", handleJoinRoom);
  socket.on("room:leave", handleLeaveRoom);
};

export default roomHandler;
