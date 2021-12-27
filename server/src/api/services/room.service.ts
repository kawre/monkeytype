import { FilterQuery, UpdateQuery } from "mongoose";
import Room, { RoomDocument } from "../models/room.model";
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

    if (!room || room.users.some((u) => u.toString() === userId))
      throw new Error();

    room.users.push(userId);
    return room.save();
  } catch (e: any) {
    return null;
  }
};

export const findRoomLobby = async (userId: string) => {
  try {
    let room: any = await findRoom({ active: true });
    if (!room) room = await createRoom(userId);

    return room;
  } catch {
    return null;
  }
};
