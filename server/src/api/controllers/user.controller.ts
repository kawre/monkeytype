import { Request, Response } from "express";
import { createUser } from "../services/user.service";

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    console.error(e.message);
    return res.status(409).send(e.message);
  }
};
