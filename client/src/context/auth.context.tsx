import { createContext, useContext, useEffect, useState } from "react";
import { useGetMe } from "../api/auth.api";
import { IMe } from "../types/user.types";
// Types -------------------------------------------------------------------------

interface Context {
  me: IMe | null | undefined;
}

const UserContext = createContext<Context>(null!);

// Component ---------------------------------------------------------------------
const UserProvider: React.FC = (props) => {
  const { data: me } = useGetMe();

  const value = { me };

  return <UserContext.Provider value={value} {...props} />;
};

export const useAuth = () => useContext(UserContext);

export default UserProvider;
