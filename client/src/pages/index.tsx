import { NextPage } from "next";
import styled from "styled-components";
import Button from "../components/Button";
import Intro from "../components/Home/Intro";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Home: NextPage<Props> = () => {
  return (
    <Wrapper>
      <Intro />
    </Wrapper>
  );
};

export default Home;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
