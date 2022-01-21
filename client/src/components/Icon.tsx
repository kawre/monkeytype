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
  display: flex;
  color: inherit;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }

  ${size}
  ${space}
`;

Wrapper.defaultProps = {
  size: 22,
};
