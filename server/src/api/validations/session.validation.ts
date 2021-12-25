import { object, string } from "yup";

export const createSessionSchema = object({
  email: string().email().required(),
  password: string().required(),
});
