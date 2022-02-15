import { Router } from "express";
import { createQuoteHandler } from "../controllers/room.controller";
import Quote from "../models/quote.model";
import Room from "../models/room.model";
import Session from "../models/session.model";
import User from "../models/user.model";

const rooms = Router();

rooms.delete("/cleardb", async (_, res) => {
  await Room.deleteMany({});
  await User.deleteMany({});
  await Session.deleteMany({});
  return res.send("ok");
});

rooms.post("/quote", createQuoteHandler);

rooms.get("/quote", async (_, res) => {
  const quotes = await Quote.find();
  return res.send(quotes);
});

export default rooms;
