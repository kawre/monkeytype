import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useRoom } from "../../contexts/room.context";
import { useSocket } from "../../contexts/socket.context";
import { fmtMSS } from "../../utils/fmtMSS";
import Text from "../Text";
// Types -------------------------------------------------------------------------

interface Props {
  quote: string;
}

// Component ---------------------------------------------------------------------
const Panel: NextPage<Props> = ({ quote }) => {
  const { roomId } = useRouter().query;
  const { socket } = useSocket();
  const [idx, setIdx] = useState(0);
  const [words] = useState(quote.split(" "));
  const [input, setInput] = useState("");

  // ref
  const inputRef = useRef<HTMLInputElement>(null);

  const { state, setStats, stats } = useRoom();
  const { time, stage } = state;
  const { wpm } = stats;

  socket.on("room:start", () => {
    if (inputRef.current) inputRef.current.focus();
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    const oldVal = val.slice(0, -1);
    const key = val[val.length - 1];

    if (key === " " && words[idx] === oldVal) {
      val = "";
      setIdx((i) => i + 1);
    }

    e.target.value = val;
    setInput(val);
  };

  // calculate wpm
  useEffect(() => {
    if (stage !== "playing") return;
    const minute = time / 60;
    const correct = words.slice(0, idx === 0 ? idx : idx - 1).join("").length;
    const wpm = Math.round(correct / 5 / minute);
    const progress = Math.round((idx / words.length) * 100);

    if (!Number.isInteger(wpm)) setStats({ wpm: 0, progress });
    else setStats({ wpm, progress });
  }, [time, input, idx]);

  useEffect(() => {
    if (idx === 0) return;
    socket.emit("room:user:state", { state: stats, roomId });
  }, [idx, time, stats]);

  return (
    <>
      <Words>
        {words.map((w, i) => {
          const letters = w.split("");
          const active = i === idx ? true : false;

          return (
            <Word active={active} key={i}>
              {letters.map((l, j) => {
                let state = "";

                if (active && j < input.length) {
                  if (input[j] === l) state = "correct";
                  else state = "incorrect";
                } else if (i < idx) {
                  state = "correct";
                }

                return (
                  <Letter state={state} key={j}>
                    {l}
                  </Letter>
                );
              })}
            </Word>
          );
        })}
      </Words>
      <InputWrapper>
        <Input
          type="text"
          autoFocus={true}
          maxLength={words[idx].length + 10}
          ref={inputRef}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          disabled={stage === "countdown"}
          onChange={handleInput}
        />
        <Blocks>
          <Block>
            <Text mr={1} fontSize={"2xl"}>
              {wpm}
            </Text>
            <Text as={"span"}>WPM</Text>
          </Block>
          <Block>
            <Text fontSize={"2xl"}>
              {fmtMSS(stage === "countdown" ? time : 300 - time)}
            </Text>
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

type LetterType = {
  state?: string;
};

const letterStyle: Record<string, any> = {
  correct: css`
    color: ${({ theme }) => theme.colors.teal[500]};
  `,
  incorrect: css`
    color: ${({ theme }) => theme.colors.red[400]};
  `,
};

const Letter = styled.span<LetterType>`
  border-bottom-style: solid;
  border-bottom-width: 0.1em;
  border-bottom-color: inherit;
  display: inline-block;

  ${({ state = "" }) => letterStyle[state]};
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

  &:disabled {
    cursor: not-allowed;
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
