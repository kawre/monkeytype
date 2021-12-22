import { Document, model, Schema, Types } from "mongoose";
import { UserDocument } from "./user.model";

export interface RoomDocument extends Document {
  users: [UserDocument["_id"]];
  createdAt: Date;
  updatedAt: Date;
}

const roomSchema = new Schema(
  {
    users: [{ type: Types.ObjectId, ref: "User" }],
    quote: { type: Types.ObjectId, ref: "Quote" },
  },
  { timestamps: true }
);

const Room = model<RoomDocument>("Room", roomSchema);

export default Room;
