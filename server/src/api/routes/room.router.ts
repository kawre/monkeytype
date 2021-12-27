import { Router } from "express";
import { findRoomHandler } from "../controllers/room.controller";
import { requireUser } from "../middlewares/requireUser";
import Room from "../models/room.model";

const rooms = Router();

rooms.delete("/cleardb", async (req, res) => {
  await Room.remove({});
  return res.send("ok");
});

// join room
rooms.get("/", requireUser, findRoomHandler);

export default rooms;
