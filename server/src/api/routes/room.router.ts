import { Router } from "express";
import { createQuoteHandler } from "../controllers/room.controller";
import Quote from "../models/quote.model";
import Room from "../models/room.model";

const rooms = Router();

rooms.delete("/cleardb", async (req, res) => {
  await Room.deleteMany({});
  return res.send("ok");
});

rooms.post("/quote", createQuoteHandler);

rooms.get("/quote", async (req, res) => {
  const quotes = await Quote.find();
  return res.send(quotes);
});

export default rooms;
