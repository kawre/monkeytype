import { Router } from "express";
import { validateBody } from "../../utils/validateBody";
import { createUserHandler } from "../controllers/user.controller";
import { createUserSchema } from "../validations/user.validation";

const users = Router();

// create user
users.post("/", validateBody(createUserSchema), createUserHandler);

export default users;
