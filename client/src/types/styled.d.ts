// import original module declarations
import "styled-components";
import { ThemeProps as MyProps } from "../styles/theme";

declare module "styled-components" {
  export interface DefaultTheme extends MyProps {}
}
