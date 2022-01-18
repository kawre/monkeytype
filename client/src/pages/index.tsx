import type { NextPage } from "next";
import styled from "styled-components";
import Intro from "../components/Intro";
import Layout from "../Layout/Layout";
import Text from "../components/Text";

const Home: NextPage = () => {
  return (
    <Layout title="Home Page">
      <Intro />
    </Layout>
  );
};

export default Home;
