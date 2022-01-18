import { Request, Response } from "express";
import { createQuote, createRoom, findRoom } from "../services/room.service";

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

// create quote
export const createQuoteHandler = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const quote = await createQuote(text);
    return res.send({ quote });
  } catch (e) {
    return res.status(400).send(e.message);
  }
};
