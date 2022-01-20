import { NextPage } from "next";
import styled from "styled-components";
import { space, SpaceProps, typography, TypographyProps } from "styled-system";
import { color, ColorProps } from "../types/styled-system.fix";
// Types -------------------------------------------------------------------------

interface Props extends SpaceProps, TypographyProps, ColorProps {}

// Component ---------------------------------------------------------------------
const Text: NextPage<Props> = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default Text;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.p<Props>`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  ${typography}
  ${space}
	${color}
`;

Wrapper.defaultProps = {
  fontSize: "base",
  textColor: "neutral.50",
};
