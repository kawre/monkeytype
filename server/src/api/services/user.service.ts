import { FilterQuery } from "mongoose";
import User, { UserDocument } from "../models/user.model";

// create user
export const createUser = async (input: UserDocument) => {
  try {
    const { password, ...user } = (await User.create(input)).toJSON();
    return user;
  } catch (e) {
    throw new Error(e);
  }
};

// find user
export const findUser = async (query: FilterQuery<UserDocument>) => {
  const user = await User.findOne(query).lean();
  if (!user) return null;

  const { password, ...res } = user;
  return res;
};
