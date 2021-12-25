import { hash } from "bcrypt";
import { Document, model, Schema } from "mongoose";
import config from "../../config";
import { compare } from "bcrypt";

export interface UserDocument extends Document {
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
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
      select: false,
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

// check if given password matches
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  console.log(user);

  return compare(candidatePassword, user.password).catch(() => false);
};

// omit password from user
userSchema.methods.toJSON = function () {
  const obj = this.toObject(); //or var obj = this;
  delete obj.password;
  return obj;
};

const User = model<UserDocument>("User", userSchema);

export default User;
