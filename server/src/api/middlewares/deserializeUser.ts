import { NextFunction, Response, Request } from "express";
import { get } from "lodash";
import { verifyJwt } from "../../utils/jwt.utils";
import { reIssueAccessToken } from "../services/session.service";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken =
    get(req, "cookies.accessToken") ||
    get(req, "headers.authorization", "").split(" ")[1];
  const refreshToken =
    get(req, "cookies.refreshToken") || get(req, "headers.x-refresh");

  console.log(accessToken, refreshToken);
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

      res.cookie("accessToken", newAccessToken, {
        maxAge: 900000, // 15m
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false,
      });
    }

    const { decoded } = verifyJwt(
      newAccessToken as string,
      "accessTokenPublicKey"
    );

    res.locals.user = decoded;
    return next();
  }

  return next();
};
