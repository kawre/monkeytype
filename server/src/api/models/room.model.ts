import { Document, model, Schema, Types } from "mongoose";
import { UserDocument } from "./user.model";

export interface RoomDocument extends Document {
  users: [UserDocument["_id"]];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  state: UserState[];
}

export interface UserState {
  user?: UserDocument["_id"];
  // currentWordIndex?: number;
  wpm?: number;
  progress?: number;
  place?: number;
}

const userStateSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User" },
  // currentWordIndex: { type: Number, default: 0 },
  wpm: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  place: { type: Number, default: 0 },
});

userStateSchema.pre("save", function (next) {
  console.log(this);
  return next();
});

const roomSchema = new Schema(
  {
    users: [{ type: Types.ObjectId, ref: "User" }],
    quote: { type: Types.ObjectId, ref: "Quote" },
    active: { type: Boolean, default: true },
    state: [userStateSchema],
  },
  { timestamps: true }
);

const Room = model<RoomDocument>("Room", roomSchema);

export default Room;
