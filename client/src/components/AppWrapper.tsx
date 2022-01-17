import { NextPage } from "next";
import { ThemeProvider } from "styled-components";
import SocketProvider from "../contexts/socket.context";
import Globals from "../styles/globals";
import { theme } from "../styles/theme";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const AppWrapper: NextPage<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Globals />
      <>
        <SocketProvider>
          <>{children}</>
        </SocketProvider>
      </>
    </ThemeProvider>
  );
};

export default AppWrapper;
