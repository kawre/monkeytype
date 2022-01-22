import { Request, Response } from "express";
import { get } from "lodash";
import { createUser, findUser } from "../services/user.service";

// create user
export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e) {
    return res.status(409).send([e.message]);
  }
};

// find user
export const findUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await findUser(req.body);
    return res.send(user);
  } catch {
    return res.status(404);
  }
};

// me
export const meHandler = async (_: Request, res: Response) => {
  return res.send(get(res.locals, "user", null));
};
