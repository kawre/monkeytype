import { NextFunction, Response, Request } from "express";
import { verifyJwt } from "../../utils/jwt.utils";
import { reIssueAccessToken } from "../services/session.service";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = (req.headers["authorization"] || "").split(" ")[1];
  const refreshToken = req.headers["x-refresh"] as string;
  if (!accessToken) return next();

  const { decoded, expired } = verifyJwt(accessToken, "accessTokenPublicKey");

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
      const { decoded } = verifyJwt(newAccessToken, "accessTokenPublicKey");
      res.locals.user = decoded;
    }

    return next();
  }

  return next();
};
