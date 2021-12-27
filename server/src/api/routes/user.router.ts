import { Router } from "express";
import { validateBody } from "../../utils/validateBody";
import {
  createUserHandler,
  findUserHandler,
  meHandler,
} from "../controllers/user.controller";
import { createUserSchema } from "../validations/user.validation";

const users = Router();

// create user
users.post("/", validateBody(createUserSchema), createUserHandler);

// me
users.get("/me", meHandler);

// find user
users.get("/", findUserHandler);

export default users;
