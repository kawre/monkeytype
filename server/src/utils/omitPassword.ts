import { FlattenMaps, LeanDocument } from "mongoose";
import { UserDocument } from "../api/models/user.model";
import { omit } from "lodash";

export const omitPassword = (user: FlattenMaps<LeanDocument<UserDocument>>) =>
  omit(user, "password");
