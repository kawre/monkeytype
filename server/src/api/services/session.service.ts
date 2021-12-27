import { FilterQuery, UpdateQuery } from "mongoose";
import config from "../../config";
import { signJwt, verifyJwt } from "../../utils/jwt.utils";
import Session, { SessionDocument } from "../models/session.model";
import { UserDocument } from "../models/user.model";
import { findUser } from "./user.service";

// create session
export const createSession = async (
  user: UserDocument["_id"],
  userAgent: string
) => {
  const session = await Session.create({ user, userAgent });
  return session.toJSON();
};

// find session
export const findSession = async (query: FilterQuery<SessionDocument>) => {
  return Session.findOne(query).lean();
};

// update session
export const updateSession = (
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) => {
  return Session.updateOne(query, update);
};

// reissue access token
export const reIssueAccessToken = async (refreshToken: string) => {
  const { decoded }: any = verifyJwt(refreshToken, "refreshTokenPublicKey");
  if (!decoded || !decoded.session) return false;

  const session = await Session.findById(decoded.session);
  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });
  if (!user) return false;

  //! crash here
  const accessToken = signJwt(
    { ...user, session: session._id },
    "accessTokenPrivateKey",
    { expiresIn: config.accessTokenTtl }
  );

  return accessToken;
};
