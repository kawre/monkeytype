import { NextPage } from "next";
import styled from "styled-components";
import LoginForm from "../components/Forms/LoginForm";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const LoginPage: NextPage<Props> = () => {
  return (
    <Wrapper>
      <LoginForm />
    </Wrapper>
  );
};

export default LoginPage;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  display: flex;
  min-height: 60vh;
  justify-content: center;
  align-items: center;
`;
