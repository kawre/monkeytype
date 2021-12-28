import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { client } from "../components/AppWrapper";
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

export const useGetMe = () => {
  return useQuery("me", me);
};

export const useCreateSession = () => {
  return useMutation(login, {
    onSuccess: (data: any) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      client.setQueryData("me", data);
    },
  });
};
