import { NextPage } from "next";
import { DOMAttributes } from "react";
import styled from "styled-components";
import { SpaceProps } from "styled-system";
// Types -------------------------------------------------------------------------

interface Props extends SpaceProps, DOMAttributes<HTMLButtonElement> {}

// Component ---------------------------------------------------------------------
const Button: NextPage<Props> = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default Button;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.button<Props>`
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.teal[500]};
  color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.rounded.DEFAULT};
  font-size: ${({ theme }) => theme.fontSizes["base"]};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  user-select: none;
  padding: 0.6rem 1.4rem;
  transition: 150ms ease;
  font-weight: 600;
  text-transform: uppercase;

  &:hover {
    background-color: ${({ theme }) => theme.colors.teal[400]};
    /* color: ${({ theme }) => theme.colors.neutral[50]}; */
  }
`;
