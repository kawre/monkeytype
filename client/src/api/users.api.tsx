import { useMutation } from "react-query";
import user from "./axios";

type CreateUser = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const create = async (input: CreateUser) =>
  user.post("/users", input).then((res) => res.data);

export const useCreateUser = () => {
  return useMutation("me", create);
};
