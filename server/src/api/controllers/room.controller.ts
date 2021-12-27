import { Request, Response } from "express";
import { createRoom, findRoom } from "../services/room.service";

// find room
export const findRoomHandler = async (req: Request, res: Response) => {
  try {
    let room: any = await findRoom({ active: true });
    if (!room) room = await createRoom(res.locals.user._id);
    return res.send({ roomId: room._id });
  } catch {
    return res.sendStatus(404);
  }
};
