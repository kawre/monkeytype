import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import styled from "styled-components";
import Icon from "../Icon";
import { AnimatePresence, motion } from "framer-motion";
import Text from "../Text";
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
      <AnimatePresence>
        {error && (
          <Error
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <ErrorMessage>
              <Icon mr={1} size={16} as={FaExclamationTriangle} />
              <Text>{error}</Text>
            </ErrorMessage>
          </Error>
        )}
      </AnimatePresence>
      <Wrapper error={!!error} {...field} {...props} />
    </Controller>
  );
};

export default Input;

// Styled ------------------------------------------------------------------------

const Controller = styled.div`
  position: relative;
  margin-top: 0.5rem;
`;

const Wrapper = styled.input<{ error: boolean }>`
  padding: 0.6rem 1.2rem;
  border: 2px solid transparent;
  width: 100%;
  border-radius: ${({ theme }) => theme.rounded.DEFAULT};
  background-color: ${({ theme }) => theme.colors.neutral[800]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.neutral[50]};
  transition: 150ms ease;
  margin-top: 1.5rem;

  &:focus {
    border-color: ${({ theme }) => theme.colors.teal[500]};
  }
`;

const Error = styled(motion.div)`
  height: 80%;
  width: 100%;
  top: 0;
  z-index: -1;
  position: absolute;
  border-radius: ${({ theme }) => theme.rounded.DEFAULT};
  background-color: ${({ theme }) => theme.colors.red[400]};
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.background};
  font-weight: 500;
  padding: 0 1.2rem;
  height: 1.5rem;
  width: 100%;
  display: flex;
  align-items: center;
`;
