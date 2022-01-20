import axios, { AxiosRequestConfig } from "axios";
import { configure } from "axios-hooks";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { BASE_URL } from "../config/config";
import { User } from "../types/user";
// Types -------------------------------------------------------------------------

interface Context {
  login: (input: any) => Promise<void>;
  user: User | null | undefined;
}

const AuthContext = createContext<Context>(null!);

export const useAuth = () => {
  return useContext(AuthContext);
};

// Component ---------------------------------------------------------------------
const AuthProvider: React.FC = (props) => {
  const accessTokenRef = useRef<string>();
  const [tokenExpires, setTokenExpires] = useState<string>();

  const getMe = async () =>
    await axios.get("/me").then((res) => res.data as Context["user"]);

  const { data: user } = useQuery("me", getMe);

  const createSession = async (input: any) => {
    const { data } = await axios.post("/sessions", input);
    return data;
  };

  const loginQuery = useMutation(createSession, {
    onSuccess: ({ accessToken }) => {
      accessTokenRef.current = accessToken;
      // setTokenExpires(data.)
    },
  });

  const login = async (input: any) => {
    await loginQuery.mutateAsync(input);
  };

  const value = {
    user,
    login,
  };

  if (user === undefined) return null;
  return <AuthContext.Provider value={value} {...props} />;
};

export default AuthProvider;
