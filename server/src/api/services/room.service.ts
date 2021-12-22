import { FilterQuery, ObjectId } from "mongoose";
import Room, { RoomDocument } from "../models/room.model";

export const createRoom = async (input: RoomDocument) => {
  try {
    const room = (await Room.create(input)).toJSON();
    return room;
  } catch (e) {
    throw new Error(e);
  }
};

export const findRoom = async (query: FilterQuery<RoomDocument>) => {
  const room = await Room.findOne(query);
  if (!room) return null;

  return room;
};

export const joinRoom = async ({
  roomId,
  userId,
}: {
  roomId: ObjectId;
  userId: ObjectId;
}) => {
  const room = await Room.findById(roomId);
  if (!room) return false;

  room.users.push(userId);
  return true;
};
