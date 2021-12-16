import { NextFunction, Request, Response } from "express";
import { AnyObjectSchema } from "yup";

export const validateBody =
  (schema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validate(req.body);
      return next();
    } catch (e: any) {
      return res.status(400).send(e.errors);
    }
  };
