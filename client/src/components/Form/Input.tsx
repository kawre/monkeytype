import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: "username" | "email" | "password" | "confirmPassword";
  label?: string;
}

// Component ---------------------------------------------------------------------
const Input: React.FC<Props> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <Controller>
      <Wrapper error={!!error} {...field} {...props} />
      <Error>
        {error && (
          <>
            <FaExclamationTriangle />
            <span>{error}</span>
          </>
        )}
      </Error>
    </Controller>
  );
};

export default Input;

// Styled ------------------------------------------------------------------------

const Controller = styled.div``;

const Wrapper = styled.input<{ error: boolean }>`
  padding: 0.6rem 1.2rem;
  border: 2px solid transparent;
  width: 100%;
  border-radius: ${({ theme }) => theme.rounded.DEFAULT};
  background-color: ${({ theme }) => theme.colors.neutral[800]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.neutral[50]};
  transition: 150ms ease;

  &:focus {
    /* background: ${({ theme }) => theme.colors.background}; */
    border-color: ${({ theme }) => theme.colors.teal[500]};
  }
`;

const Error = styled.div`
  width: 100%;
  height: 24px;
  font-size: 0.75rem;
  margin-left: 22px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.red[500]};

  svg {
    color: inherit;
    margin-right: 6px;
  }
`;
