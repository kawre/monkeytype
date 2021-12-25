import { Express } from "express";
import roomRouter from "./room.router";
import sessionRouter from "./session.router";
import userRouter from "./user.router";

export const routes = (app: Express) => {
  // user routes
  app.use("/api/users", userRouter);

  // room routes
  app.use("/api/rooms", roomRouter);

  // session routes
  app.use("/api/sessions", sessionRouter);
};
