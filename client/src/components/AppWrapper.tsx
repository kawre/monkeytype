import { ThemeProvider } from "styled-components";
import SocketProvider from "../contexts/socket.context";
import Globals from "../styles/globals";
import { theme } from "../styles/theme";
import { Page } from "../types/page";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const AppWrapper: Page<Props> = ({ children }) => {
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
