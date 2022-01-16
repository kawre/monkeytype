import Head from "next/head";
import tw from "twin.macro";

export default function Home() {
  return (
    <>
      <TailWind>elo</TailWind>
      <p>2</p>
    </>
  );
}

// const Button = styled.div`
//   background: blue;
// `;

const TailWind = tw.button`
  bg-gray-800
`;
