import { Router } from "express";

const rooms = Router();

rooms.get("/", (req, res) => {
  res.send("room");
});

export default rooms;
