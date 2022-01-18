import { NextPage } from "next";
import { DOMAttributes } from "react";
import { PulseLoader } from "react-spinners";
import styled, { css } from "styled-components";
import { SpaceProps } from "styled-system";
import { theme } from "../styles/theme";
// Types -------------------------------------------------------------------------

interface Props extends SpaceProps, DOMAttributes<HTMLButtonElement> {
  loading?: boolean;
}

// Component ---------------------------------------------------------------------
const Button: NextPage<Props> = ({ children, ...props }) => {
  return (
    <Wrapper {...props}>
      <>
        {children}
        {props.loading && (
          <LoaderContainer>
            <PulseLoader size={12} color={theme.colors.background} />
          </LoaderContainer>
        )}
      </>
    </Wrapper>
  );
};

export default Button;

// Styled ------------------------------------------------------------------------

const LoaderContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  span {
    display: flex;
  }
`;

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
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.colors.teal[400]};
    /* color: ${({ theme }) => theme.colors.neutral[50]}; */
  }

  ${({ loading }) =>
    loading &&
    css`
      color: transparent;
    `};
`;
