import { Request, Response } from "express";
import config from "../../config";
import { signJwt } from "../../utils/jwt.utils";
import {
  createSession,
  findSession,
  updateSession,
} from "../services/session.service";
import { validatePassword } from "../services/user.service";

// create session
export const createSessionHandler = async (req: Request, res: Response) => {
  // validate user password
  const user = await validatePassword(req.body);
  if (!user) return res.status(401).send("Invalid email or password");

  // create session
  const session = await createSession(
    user._id,
    req.headers["user-agent"] || ""
  );

  // create an access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    "accessTokenPrivateKey",
    { expiresIn: config.accessTokenTtl }
  );

  // create an refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    "refreshTokenPrivateKey",
    { expiresIn: config.refreshTokenTtl }
  );

  return res.send({ accessToken, refreshToken });
};

// find session
export const getSessionHandler = async (_: Request, res: Response) => {
  const user = res.locals.user._id;
  const session = await findSession({ user, valid: true });

  return res.send(session);
};

// delete session
export const deleteSessionHandler = async (_: Request, res: Response) => {
  const sessionId = res.locals.user._id;
  await updateSession(sessionId, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
};
