import { NextPage } from "next";
import { createElement, DOMAttributes } from "react";
import { IconType } from "react-icons";
import styled from "styled-components";
import { size, SizeProps, space, SpaceProps } from "styled-system";
// Types -------------------------------------------------------------------------

interface Props extends SizeProps, SpaceProps, DOMAttributes<HTMLDivElement> {}

// Component ---------------------------------------------------------------------
const Icon: NextPage<Props & { as: IconType }> = ({ as, ...props }) => {
  return <Wrapper {...props}>{createElement(as)}</Wrapper>;
};

export default Icon;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div<Props>`
  ${size}
  ${space}


  svg {
    width: 100%;
    height: 100%;
  }
`;

Wrapper.defaultProps = {
  size: "1.5rem",
};
