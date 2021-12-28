import { createContext, useContext } from "react";
import { useGetMe } from "../api/auth.api";
import { IMe } from "../types/user.types";
// Types -------------------------------------------------------------------------

interface Context {
  me: IMe;
}

const UserContext = createContext<Context>(null!);

// Component ---------------------------------------------------------------------
const UserProvider: React.FC = (props) => {
  const { data } = useGetMe();

  const value = { me: data };

  return <UserContext.Provider value={value} {...props} />;
};

export const useMe = () => useContext(UserContext);

export default UserProvider;
