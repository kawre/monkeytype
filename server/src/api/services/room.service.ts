import { FilterQuery, UpdateQuery } from "mongoose";
import { Collect } from "../handlers/room.handler";
import Room, { RoomDocument } from "../models/room.model";
import Quote from "../models/quote.model";
import { UserDocument } from "../models/user.model";

export const createRoom = async (userId: UserDocument["_id"]) => {
  const room = await Room.create({ users: [userId] });
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

export const joinRoom = async ({
  roomId,
  userId,
}: {
  roomId: RoomDocument["_id"];
  userId: UserDocument["_id"];
}) => {
  try {
    const room = await Room.findById(roomId);

    if (
      !room ||
      room.users.some((u) => u.toString() === userId) ||
      room.users.length > 5
    )
      throw new Error();

    room.users.push(userId);
    return room.save();
  } catch (e: any) {
    return null;
  }
};

export const findAndJoinRoom = async (userId: string) => {
  const room = await findRoom({ active: true });

  if (room) {
    await joinRoom({ roomId: room._id, userId });
    return {
      room,
      isNew: false,
    };
  } else {
    const newRoom = await createRoom(userId);
    console.log({ newRoom });
    return {
      room: newRoom,
      isNew: true,
    };
  }
};

export const initRoomState = async (userId: string, roomId: string) => {
  const room = await Room.findById(roomId);
  if (!room) return;
  room.state.users.push({ user: userId });
  return room.save();
};

export const getRoomState = async (roomId: string) => {
  const room = await Room.findById(roomId);
  if (!room) return null;
  return room.state;
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

  await room.save();
  return room.state;
};

export const createQuote = async (text: string) => {
  const quote = await Quote.create({ quote: text.trim() });
  return quote.toJSON();
};
