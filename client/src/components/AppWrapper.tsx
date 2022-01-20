import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import AuthProvider from "../contexts/auth.context";
import SocketProvider from "../contexts/socket.context";
import Globals from "../styles/globals";
import { theme } from "../styles/theme";
import { Page } from "../types/page";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const AppWrapper: Page<Props> = ({ children }) => {
  const client = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <Globals />
      {/*  */}
      <QueryClientProvider client={client}>
        <AuthProvider>
          <SocketProvider>
            <>{children}</>
          </SocketProvider>
        </AuthProvider>
      </QueryClientProvider>
      {/*  */}
    </ThemeProvider>
  );
};

export default AppWrapper;
