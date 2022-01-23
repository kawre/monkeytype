import { Document, model, Schema, Types } from "mongoose";
import config from "../../config";
import Quote from "./quote.model";
import { UserDocument } from "./user.model";

export interface RoomDocument extends Document {
  users: [UserDocument["_id"]];
  active: boolean;
  createdAt: Date;
  quote: string;
  updatedAt: Date;
  state: {
    users: UserState[];
    room: RoomState;
  };
}

export interface UserState {
  user?: UserDocument["_id"];
  wpm?: number;
  progress?: number;
  place?: number;
}

export interface RoomState {
  stage: string;
  time: number;
}

const userStateSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User" },
    wpm: { type: Number, default: 0 },
    progress: { type: Number, default: 0 },
    place: { type: Number, default: 0 },
  },
  { _id: false }
);

const roomStateSchema = new Schema(
  {
    stage: { type: String, default: "countdown" },
    time: { type: Number, default: config.countdownDuration },
  },
  { _id: false }
);

const roomSchema = new Schema(
  {
    users: [{ type: Types.ObjectId, ref: "User" }],
    quote: { type: Types.ObjectId, ref: "Quote" },
    active: { type: Boolean, default: true },
    state: {
      users: [userStateSchema],
      room: roomStateSchema,
    },
  },
  { timestamps: true }
);

// assign a random quote
roomSchema.pre("save", async function (next) {
  const room = this as RoomDocument;

  if (room.isNew) {
    room.state.room = {} as RoomState;

    const quote = await Quote.aggregate([{ $sample: { size: 1 } }]);
    room.quote = quote[0]._id;
  }

  return next();
});

const Room = model<RoomDocument>("Room", roomSchema);

export default Room;
