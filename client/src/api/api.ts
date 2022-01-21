import axios from "axios";
import { User } from "../types/user";

export const getMe = async () =>
  await axios.get("/me").then((res) => {
    if (res.data) return res.data as User;
    else return null;
  });

export const createSession = async (input: any) => {
  const { data } = await axios.post("/sessions", input);
  return data;
};

export const useLogout = async () =>
  await axios.post("/sessions/logout").then((res) => res.data);

export const createUser = async (input: any) =>
  await axios.post("/users", input).then((res) => res.data as User);
