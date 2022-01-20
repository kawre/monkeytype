import { NextPage } from "next";
import Link, { LinkProps } from "next/link";
import styled from "styled-components";
import { space, SpaceProps, typography, TypographyProps } from "styled-system";
import { color, ColorProps } from "../types/styled-system.fix";
// Types -------------------------------------------------------------------------

interface Props extends SpaceProps, TypographyProps, ColorProps {
  as?: any;
}

// Component ---------------------------------------------------------------------
const Text: NextPage<Props> = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default Text;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.p<Props>`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: inherit;
  color: inherit;
  font-weight: inherit;
  text-decoration: inherit;

  ${typography}
  ${space}
	${color}
`;

export const Hyperlink = styled(Text)`
  text-decoration: underline;
  transition: 150ms ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.teal[500]};
  }
`;
