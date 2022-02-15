import { NextPage } from "next";
import Intro from "../components/Intro";
import Layout from "../Layout/Layout";

const Home: NextPage = () => {
  return (
    <Layout title="Home Page">
      <Intro />
    </Layout>
  );
};

export default Home;
