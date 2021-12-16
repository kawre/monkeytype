import { hash } from "bcrypt";
import { Document, model, Schema } from "mongoose";
import config from "../../config/default";

export interface UserDocument extends Document {
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// hash user password before save to db
userSchema.pre("save", async function (next) {
  const user = this as UserDocument;
  if (!user.isModified("password")) return next();

  user.password = await hash(user.password, config.salt);
  return next();
});

const User = model<UserDocument>("User", userSchema);

export default User;
