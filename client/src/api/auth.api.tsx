import axios from "axios";
import { useMutation, useQuery } from "react-query";
import session from "./axios";

type Login = {
  email: string;
  password: string;
};

export const me = () => session.get("/me").then((res) => res.data);

const login = (me: Login) => {
  return session
    .post("/sessions", me)
    .catch((err) => err.response)
    .then((res) => res.data);
};

export const useCreateSession = () => {
  return useMutation(login);
};
