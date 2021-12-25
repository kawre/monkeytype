import { LeanDocument } from "mongoose";
import { UserDocument } from "../api/models/user.model";

interface Locals {
  user: Omit<LeanDocument<UserDocument>, "password">;
}

declare module "express" {
  export interface Response {
    locals: Locals;
  }
}
