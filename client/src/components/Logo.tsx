import { NextPage } from "next";
import styled from "styled-components";
import { SiSurveymonkey } from "react-icons/si";
import Icon from "./Icon";
import Text from "./Text";
import { useRouter } from "next/router";
import Link from "next/link";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Logo: NextPage<Props> = () => {
  const router = useRouter();

  return (
    <Link href={"/"}>
      <Wrapper>
        <Icon size={"2.5rem"} mr={"0.6rem"} as={SiSurveymonkey} />
        <Text fontSize={"xxl"} fontWeight={500}>
          monkeytype
        </Text>
      </Wrapper>
    </Link>
  );
};

export default Logo;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  display: flex;
  user-select: none;
  align-items: center;
  cursor: pointer;
`;
