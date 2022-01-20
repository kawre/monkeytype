import { NextPage } from "next";
import styled from "styled-components";
import Text from "../components/Text";
import { Form as elo } from "formik";
// Types -------------------------------------------------------------------------

interface Props {
  title: string;
}

// Component ---------------------------------------------------------------------
const FormLayout: NextPage<Props> = ({ children, title }) => {
  return (
    <Wrapper>
      <Text mb={3} fontSize={"5xl"} fontWeight={600}>
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

export const SubmitFooter = styled.div``;

export const Form = styled(elo)``;
