import { Router } from "express";
import Room from "../models/room.model";

const rooms = Router();

rooms.delete("/cleardb", async (req, res) => {
  await Room.remove({});
  return res.send("ok");
});

export default rooms;
