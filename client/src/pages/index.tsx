import { NextPage } from "next";
import styled from "styled-components";
import Button from "../components/Button";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Home: NextPage<Props> = () => {
  return (
    <Wrapper>
      <Button>Find Game</Button>
    </Wrapper>
  );
};

export default Home;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
