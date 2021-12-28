import { useField } from "formik";
import { NextPage } from "next";
import { InputHTMLAttributes } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: "email" | "password" | "confirmPassword" | "username";
}

// Component ---------------------------------------------------------------------
const FormInput: NextPage<Props> = ({ ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <Controller>
      <InputWrap>
        <Input error={!!error} {...field} {...props} />
      </InputWrap>
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

export default FormInput;

// Styled ------------------------------------------------------------------------

const Controller = styled.div`
  width: 100%;
`;

const InputWrap = styled.div`
  padding: 0.75rem 1.5rem;
  border: 2px solid #c6cadb;
  border-radius: ${({ theme }) => theme.rounded.lg};
  background-color: ${({ theme }) => theme.colors.subText};
`;

const Input = styled.input<{ error: boolean }>`
  width: 100%;
  font-weight: 600;
`;

const Error = styled.div``;
