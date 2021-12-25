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
  const user = await User.findOne(query);
  if (!user) return null;
  return user.toJSON();
};

// validate password
export const validatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({ email });
  if (!user) return false;

  const isValid = await user.comparePassword(password);
  if (!isValid) return false;

  return user.toJSON();
};
