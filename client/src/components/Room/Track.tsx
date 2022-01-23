import { motion } from "framer-motion";
import { NextPage } from "next";
import styled from "styled-components";
import { UserState } from "../../types/user";
import Text from "../Text";
// Types -------------------------------------------------------------------------

interface Props {
  user: UserState;
}

// Component ---------------------------------------------------------------------
const Track: NextPage<Props> = ({ user }) => {
  return (
    <Wrapper>
      <Stats>
        <Text>{user.user.username}</Text>
        <Text>{user.wpm}wpm</Text>
      </Stats>
      <Progress>
        <ProgressLine animate={{ width: user.progress + "%" }} />
      </Progress>
    </Wrapper>
  );
};

export default Track;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding: 1rem 0;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  align-items: center;
`;

const Progress = styled.div`
  height: 1rem;
  background-color: ${({ theme }) => theme.colors.neutral[700]};
  position: relative;
`;

const ProgressLine = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.teal[500]};
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;
