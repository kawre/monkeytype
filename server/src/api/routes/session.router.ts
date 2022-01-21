import { Router } from "express";
import { validateBody } from "../../utils/validateBody";
import {
  createSessionHandler,
  deleteSessionHandler,
  getSessionHandler,
  logoutSessionHandler,
} from "../controllers/session.controller";
import { requireUser } from "../middlewares/requireUser";
import { createSessionSchema } from "../validations/session.validation";

const sessions = Router();

// create session
sessions.post("/", validateBody(createSessionSchema), createSessionHandler);

// find session
sessions.get("/", requireUser, getSessionHandler);

// delete session
sessions.delete("/", requireUser, deleteSessionHandler);

// logout session
sessions.post("/logout", requireUser, logoutSessionHandler);

export default sessions;
