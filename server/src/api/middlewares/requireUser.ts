import { NextFunction, Request, Response } from "express";

export const requireUser = (_: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  console.log("locals.user:", user);
  if (!user) return res.sendStatus(403);

  return next();
};
