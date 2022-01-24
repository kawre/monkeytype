import { NextPage } from "next";
import styled from "styled-components";
import Text from "../components/Text";
import { Form as elo } from "formik";
import { useAuth } from "../contexts/auth.context";
import { useRouter } from "next/router";
// Types -------------------------------------------------------------------------

interface Props {
  title: string;
}

// Component ---------------------------------------------------------------------
const FormLayout: NextPage<Props> = ({ children, title }) => {
  const router = useRouter();
  const { user } = useAuth();

  if (user) router.push("/");
  return (
    <Wrapper>
      <Text lineHeight={1} fontSize={"5xl"} fontWeight={600}>
        {title}
      </Text>
      <FormContainer>{children}</FormContainer>
    </Wrapper>
  );
};

export default FormLayout;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  max-width: 500px;
  margin: auto;
`;

const FormContainer = styled.div``;

export const SubmitFooter = styled.div`
  margin-top: 1rem;
`;

export const Form = styled(elo)``;
