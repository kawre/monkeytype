import { NextFunction, Request, Response } from "express";

export const requireUser = (_: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) res.status(403);

  return next();
};
