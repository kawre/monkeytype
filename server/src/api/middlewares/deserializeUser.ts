import { NextFunction, Response, Request } from "express";
import { verifyJwt } from "../../utils/jwt.utils";
import { reIssueAccessToken } from "../services/session.service";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = (req.headers["authorization"] || "").replace(
    /^Bearer\s/,
    ""
  );
  const refreshToken = req.headers["x-refresh"] as string;
  if (accessToken) return next();

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
      const { decoded } = verifyJwt(newAccessToken);
      res.locals.user = decoded;
    }

    return next();
  }

  return next();
};
