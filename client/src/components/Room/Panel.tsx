import { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";
import { useRoom } from "../../contexts/room.context";
import { fmtMSS } from "../../utils/fmtMSS";
import Text from "../Text";
// Types -------------------------------------------------------------------------

interface Props {
  quote: string;
  wpm: number;
}

// Component ---------------------------------------------------------------------
const Panel: NextPage<Props> = ({ quote, wpm }) => {
  const [idx, setIdx] = useState(0);
  const [words] = useState(quote.split(" "));

  const { state } = useRoom();
  const { time } = state;

  return (
    <>
      <Words>
        {words.map((w, i) => {
          const letters = w.split("");
          let active = false;
          if (i === idx) active = true;
          return (
            <Word active={active} key={i}>
              {letters.map((l, j) => {
                return <Letter key={j}>{l}</Letter>;
              })}
            </Word>
          );
        })}
      </Words>
      <InputWrapper>
        <Input
          type="text"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          onChange={(e) => console.log(e)}
        />
        <Blocks>
          <Block>
            <Text mr={1} fontSize={"2xl"}>
              {wpm}
            </Text>
            <Text as={"span"}>WPM</Text>
          </Block>
          <Block>
            <Text fontSize={"2xl"}>{fmtMSS(time)}</Text>
          </Block>
        </Blocks>
      </InputWrapper>
    </>
  );
};

export default Panel;

// Styled ------------------------------------------------------------------------

const Words = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.neutral[800]};
  border-radius: ${({ theme }) => theme.rounded.md};
  color: ${({ theme }) => theme.colors.neutral[100]};
`;

const Word = styled.div<{ active: boolean }>`
  line-height: 1.5rem;
  font-size: 1.5rem;
  margin: 0.37rem;
  user-select: none;

  border-bottom-color: ${({ theme, active }) =>
    active ? theme.colors.teal[500] : "transparent"}; ;
`;

const Letter = styled.span`
  border-bottom-style: solid;
  border-bottom-width: 0.1em;
  border-bottom-color: inherit;
  display: inline-block;
`;

const InputWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 1rem;
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.colors.neutral[800]};
  border: 0.15rem solid ${({ theme }) => theme.colors.neutral[700]};
  border-radius: ${({ theme }) => theme.rounded.md};
  transition: 150ms ease;
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  width: 100%;
  padding: 0.75rem 1.87rem;

  &:focus {
    border-color: ${({ theme }) => theme.colors.teal[500]};
  }
`;

const Blocks = styled.div`
  display: flex;
  gap: 1rem;
`;

const Block = styled.div`
  width: 7rem;
  min-height: 100%;
  font-weight: 500;
  border-radius: ${({ theme }) => theme.rounded.md};
  background-color: ${({ theme }) => theme.colors.neutral[800]};
  display: flex;
  justify-content: center;
  align-items: center;
`;
