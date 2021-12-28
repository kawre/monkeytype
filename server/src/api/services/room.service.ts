import { FilterQuery, UpdateQuery } from "mongoose";
import { Collect } from "../handlers/room.handler";
import Room, { RoomDocument, UserState } from "../models/room.model";
import { UserDocument } from "../models/user.model";

export const createRoom = async (userId: UserDocument["_id"]) => {
  try {
    const room = await Room.create({ users: [userId] });
    return room.toJSON();
  } catch (e) {
    throw new Error(e);
  }
};

export const findRoom = async (query: FilterQuery<RoomDocument>) => {
  const room = await Room.findOne(query);
  if (!room) return null;
  return room;
};

// update session
export const updateRoom = (
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
  try {
    const room = await findRoom({ active: true });

    if (room) {
      await joinRoom({ roomId: room._id, userId });
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
  } catch {
    return {
      room: null,
      isNew: false,
    };
  }
};

export const initRoomState = async (userId: string, roomId: string) => {
  const room = await Room.findById(roomId);
  if (!room) return null;
  room.state.push({ user: userId });
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
  state: Collect
) => {
  const room = await Room.findById(roomId);
  if (!room) return null;
  const i = room.state.map((s) => s.user).indexOf(userId);

  room.state[i] = { ...state };

  console.log({ state: room.state[i], userId });

  await room.save();
  return room.state;
};
