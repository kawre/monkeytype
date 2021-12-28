import { NextPage } from "next";
import styled from "styled-components";
import {
  space,
  SpaceProps,
  TextColorProps,
  typography,
  TypographyProps,
} from "styled-system";
import { color } from "../types/styled-system.fix";
// Types -------------------------------------------------------------------------

interface Props extends TypographyProps, SpaceProps, TextColorProps {
  as?: any;
}

// Component ---------------------------------------------------------------------
const Text: NextPage<Props> = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default Text;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.p<Props>`
  ${typography}
  ${space}
	${color}
`;
