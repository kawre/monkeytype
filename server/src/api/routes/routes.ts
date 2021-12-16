import { Express } from "express";
import roomRouter from "./room.routes";
import userRouter from "./user.routes";

export const routes = (app: Express) => {
  // user's routes
  app.use("/api/users", userRouter);

  // room's routes
  app.use("/api/rooms", roomRouter);
};
