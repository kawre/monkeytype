import { NextPage } from "next";
import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import { motion } from "framer-motion";
import { DOMAttributes } from "react";
// Types -------------------------------------------------------------------------

interface Props extends SpaceProps, DOMAttributes<HTMLButtonElement> {
  loading?: boolean;
  disabled?: boolean;
}

// Component ---------------------------------------------------------------------
const Button: NextPage<Props> = ({ children, ...props }) => {
  return (
    <Wrapper {...props}>
      <Floating
        initial={{ translateY: "-0.375rem" }}
        whileHover={{ translateY: "-0.625rem" }}
        whileTap={{ translateY: 0 }}
      >
        {/* {children} */}
        {props.loading ? "loading..." : children}
      </Floating>
    </Wrapper>
  );
};

export default Button;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.button<Props>`
  display: flex;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.md};
  background-color: ${({ theme }) => theme.colors.sub};
  color: ${({ theme }) => theme.colors.subText};
  margin-top: 0.375rem;
  border-radius: ${({ theme }) => theme.rounded.lg};
  cursor: pointer;
  user-select: none;

  ${space}
`;

const Floating = styled(motion.span)`
  background-color: ${({ theme }) => theme.colors.main};
  border-radius: inherit;
  padding: 0.5rem 1.5rem;
`;