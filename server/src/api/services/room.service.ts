import { FilterQuery, UpdateQuery } from "mongoose";
import { Collect } from "../handlers/room.handler";
import Quote from "../models/quote.model";
import Room, { RoomDocument, RoomState } from "../models/room.model";
import { UserDocument } from "../models/user.model";

export const createRoom = async (userId: UserDocument["_id"]) => {
  const room = await Room.create({});

  room.users.push(userId);
  room.state.users.push({ user: userId });
  await room.save();

  return room.toJSON();
};

export const findRoom = async (query: FilterQuery<RoomDocument>) => {
  const room = await Room.findOne(query);
  if (!room) return null;
  return room;
};

// update session
export const updateRoom = async (
  query: FilterQuery<RoomDocument>,
  update: UpdateQuery<RoomDocument>
) => {
  return Room.updateOne(query, update);
};

// export const joinRoom = async ({
//   roomId,
//   userId,
// }: {
//   roomId: RoomDocument["_id"];
//   userId: UserDocument["_id"];
// }) => {
//   const room = await Room.findById(roomId);

//   if (
//     !room ||
//     room.users.some((u) => u.toString() === userId) ||
//     room.users.length > 5
//   )
//     throw new Error();

//   room.users.push(userId);
//   return room.save();
// };

export const findAndJoinRoom = async (userId: string) => {
  const room = await findRoom({ active: true });

  if (room) {
    return {
      room,
      isNew: false,
    };
  } else {
    const newRoom = await createRoom(userId);
    return {
      room: newRoom,
      isNew: true,
    };
  }
};

export const joinRoom = async (userId: string, roomId: string) => {
  const room = await Room.findById(roomId);
  if (!room) throw new Error();

  if (!room.users.find((u) => u.toString() === userId)) {
    room.users.push(userId);
    const users = room.state.users;
    users.push({ user: userId });
    await room.save();
  }

  return room.populate("quote");
};

export const getRoomUsersState = async (roomId: string) => {
  const room = await Room.findById(roomId);
  if (!room) return null;

  return room.toJSON().state.users;
};

export const updateUserState = async (
  userId: string,
  roomId: string,
  newState: Collect["state"]
) => {
  const room = await Room.findById(roomId);
  if (!room) return null;
  const i = room.state.users.map((s) => s.user.toString()).indexOf(userId);

  room.state.users[i] = { ...room.state.users[i], ...newState, user: userId };

  await (await room.save()).populate("state.users.user", "username");
  return room.state.users;
};

export const createQuote = async (text: string) => {
  const quote = await Quote.create({ quote: text.trim() });
  return quote.toJSON();
};

export const updateRoomState = async (
  state: Partial<RoomState>,
  roomId: string
) => {
  const room = await Room.findById(roomId);
  if (!room) return;

  const payload = { ...room.toJSON().state.room, ...state };
  room.state.room = payload;

  room.save();
};

export const usersPopulate = async (roomId: string) => {
  const room = await Room.findById(roomId).populate(
    "state.users.user",
    "username"
  );
  if (!room) throw new Error();

  return room.state;
};
