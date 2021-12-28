import { NextPage } from "next";
import styled from "styled-components";
import RegisterForm from "../components/Forms/RegisterForm";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const RegisterPage: NextPage<Props> = () => {
  return (
    <Wrapper>
      <RegisterForm />
    </Wrapper>
  );
};

export default RegisterPage;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  display: flex;
  min-height: 60vh;
  justify-content: center;
  align-items: center;
`;
