import { NextPage } from "next";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const FormLayout: NextPage<Props> = (props) => {
  return <Wrapper {...props} />;
};

export default FormLayout;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  min-width: 300px;
  margin: auto;

  form {
    display: grid;
    gap: 1rem;
    justify-items: center;
  }
`;
