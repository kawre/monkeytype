import { object, ref, string } from "yup";

export const createUserSchema = object({
  username: string().required(),
  email: string().email().required(),
  password: string().required().min(6),
  confirmPassword: string().oneOf([ref("password"), "Passwords must match"]),
});
