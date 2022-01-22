import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import AuthProvider from "../contexts/auth.context";
import SocketProvider from "../contexts/socket.context";
import Globals from "../styles/globals";
import { theme } from "../styles/theme";
import { Page } from "../types/page";
// Types -------------------------------------------------------------------------

interface Props {}

const client = new QueryClient();

// Component ---------------------------------------------------------------------
const AppWrapper: Page<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={theme}>
        <Globals />
        {/*  */}
        <AuthProvider>
          <SocketProvider>
            <>{children}</>
          </SocketProvider>
        </AuthProvider>
        {/*  */}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default AppWrapper;
