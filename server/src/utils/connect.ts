import mongoose from "mongoose";
import config from "../config/default";

export const connect = async () => {
  try {
    await mongoose.connect(config.dbUri);
    console.log("DB connected");
  } catch {
    console.log("Couldn't connect to db");
    process.exit(1);
  }
};
