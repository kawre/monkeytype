import User, { UserDocument } from "../models/user.model";

export const createUser = async (input: UserDocument) => {
  try {
    const { password, ...user } = (await User.create(input)).toJSON();
    return user;
  } catch (e) {
    throw new Error(e);
  }
};
