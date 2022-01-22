import { AxiosResponse } from "axios";
import { createContext, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createSession, createUser, getMe, useLogout } from "../api/api";
import { User } from "../types/user";
// Types -------------------------------------------------------------------------

interface Context {
  login: (input: any) => Promise<void>;
  logout: () => Promise<AxiosResponse<any, any>>;
  user: User;
  register: (input: any) => Promise<User>;
}

const AuthContext = createContext<Context>(null!);

export const useAuth = () => {
  return useContext(AuthContext);
};

// Component ---------------------------------------------------------------------
const AuthProvider: React.FC = (props) => {
  const { data: user, refetch } = useQuery("me", getMe);
  const client = useQueryClient();

  const sessionMutation = useMutation(createSession, {
    onSuccess: async () => {
      await refetch();
    },
  });

  const logoutMutation = useMutation(useLogout, {
    onSuccess: () => {
      client.invalidateQueries("me");
    },
  });

  const registerMutation = useMutation(createUser, {
    onSuccess: async (_, { password, email }) => {
      sessionMutation.mutateAsync({ email, password });
    },
  });

  const value = {
    user,
    login: (input: any) => sessionMutation.mutateAsync(input),
    logout: () => logoutMutation.mutateAsync(),
    register: (input: any) => registerMutation.mutateAsync(input),
  };

  if (user === undefined) return null;
  return <AuthContext.Provider value={value} {...props} />;
};

export default AuthProvider;
