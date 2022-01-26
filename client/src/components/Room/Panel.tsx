import { motion } from "framer-motion";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useReducer, useRef, useState } from "react";
import styled from "styled-components";
import { useRoom } from "../../contexts/room.context";
import { useSocket } from "../../contexts/socket.context";
import { fmtMSS } from "../../utils/fmtMSS";
import Text from "../Text";
// Types -------------------------------------------------------------------------

interface Props {
  quote: string;
}

type Display = typeof initDisplay;

const initDisplay = {
  former: "",
  correct: "",
  current: "",
  incorrect: "",
  next: "",
  coming: "",
};

// Component ---------------------------------------------------------------------
const Panel: NextPage<Props> = ({ quote }) => {
  const { roomId } = useRouter().query;
  const { socket } = useSocket();

  // state
  const [rect, setRect] = useState({ top: 0, left: 0, height: 0 });
  const [idx, setIdx] = useState(0);
  const [words] = useState(quote.split(" "));
  const [wpms, setWpms] = useState(0);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [display, setDisplay] = useReducer(
    (state: Display, newState: Partial<Display>) => ({
      ...state,
      ...newState,
    }),
    initDisplay
  );

  // ref
  const inputRef = useRef<HTMLInputElement>(null);
  const currRef = useRef<HTMLSpanElement>(null);

  const { state, setStats, stats, setHistory } = useRoom();
  const { time, stage } = state;

  socket.on("room:start", () => {
    if (inputRef.current) inputRef.current.focus();
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    const oldVal = val.slice(0, -1);
    const key = val[val.length - 1];

    if (words[idx].length === val.length && idx + 1 === words.length) {
      // setIdx(words.length);
      return;
    }

    if (key === " ") {
      if (words[idx] === oldVal) {
        val = "";
        setIdx((i) => i + 1);
      }
    }

    e.target.value = val;
    setInput(val);
  };

  const handleResize = () => {
    if (!currRef.current) return;
    const { top, height, left } = currRef.current.getBoundingClientRect();
    setRect({ top, left, height });
  };

  // caret position
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [display]);

  // calculate wpm
  useEffect(() => {
    if (stage !== "playing") return;

    const quoteLen = words.join("").length;
    const correctLen = words.slice(0, idx).join("").length;
    const progress = Math.round((correctLen / quoteLen) * 100);

    const mins = (time + 1) / 60;
    const chars = correctLen + display.correct.trim().length;

    const wpm = chars / 5 / mins;
    console.log({ chars, mins, wpm });

    setStats({ wpm, progress });
  }, [time, display]);

  useEffect(() => {
    setWpms(Math.round(stats.wpm));
  }, [time]);

  useEffect(() => {
    if (stage !== "playing") return;
    socket.emit("room:user:state", {
      state: { ...stats, wpm: wpms },
      roomId,
    });
  }, [stats.progress, wpms]);

  useEffect(() => {
    const elo = words[idx].slice(0, input.length);
    let errAt = 0;

    if (elo !== input) {
      for (let i = 0; i < input.length; i++) {
        if (input[i] !== elo[i]) {
          errAt = i + 1;
          break;
        }
      }

      setError(true);
    } else {
      setError(false);
    }

    let overflow = 0;
    if (input.length > words[idx].length) {
      overflow = input.length - words[idx].length;
    }

    const display = {
      former: words.slice(0, idx).join(" ") + " ",
      correct: words[idx].slice(0, errAt ? errAt - 1 : input.length),
      current: words[idx][input.length] || "",
      incorrect:
        words[idx].slice(errAt - 1, input.length) +
        (" " + words.slice(idx + 1).join(" ")).slice(0, overflow),
      next: words[idx].slice(input.length + 1),
      coming: (" " + words.slice(idx + 1).join(" ")).slice(overflow),
    };

    setDisplay(display);
  }, [input]);

  useEffect(() => {
    if (stage !== "playing" || time === 0) return;
    const payload = { time, wpm: Math.round(stats.wpm) };
    setHistory((prev) => [...prev, payload]);
  }, [time]);

  return (
    <>
      <GameWrapper>
        <Game>
          <Caret
            error={error}
            animate={rect}
            transition={{ duration: 0.1, ease: "linear" }}
          />
          <Former>{display.former}</Former>
          <Correct>{display.correct}</Correct>
          {error && <Incorrect>{display.incorrect}</Incorrect>}
          <Current ref={currRef}>{display.current}</Current>
          <Coming>{display.next}</Coming>
          <Coming>{display.coming}</Coming>
        </Game>
      </GameWrapper>
      <ControlPanel>
        <Input
          error={error}
          type="text"
          autoFocus={true}
          maxLength={words[idx].length + 8}
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
              {wpms}
            </Text>
            <Text as={"span"}>WPM</Text>
          </Block>
          <Block>
            <Text fontSize={"2xl"}>
              {fmtMSS(stage === "countdown" ? time : 300 - time)}
            </Text>
          </Block>
        </Blocks>
      </ControlPanel>
    </>
  );
};

export default Panel;

// Styled ------------------------------------------------------------------------

const GameWrapper = styled.div`
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.neutral[800]};
  border-radius: ${({ theme }) => theme.rounded.md};
`;

const Game = styled.div`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  color: ${({ theme }) => theme.colors.neutral[100]};
  user-select: none;
`;

const Incorrect = styled.span`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.red[400]};
`;

const Former = styled.span`
  color: ${({ theme }) => theme.colors.teal[500]};
`;

const Current = styled.span``;

const Caret = styled(motion.div)<{ error: boolean }>`
  position: absolute;
  width: 0.1875rem;
  opacity: 0.8;
  background-color: ${({ theme, error }) =>
    error ? theme.colors.red[400] : theme.colors.teal[500]};
  border-radius: ${({ theme }) => theme.rounded["md"]};
`;

const Correct = styled.span`
  color: ${({ theme }) => theme.colors.teal[500]};
`;

const Coming = styled.span``;

const ControlPanel = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Input = styled.input<{ error: boolean }>`
  width: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.colors.neutral[800]};
  border: 0.15rem solid ${({ theme }) => theme.colors.neutral[700]};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  padding: 0.75rem 1.5rem;
  transition: 100ms ease;
  border-radius: ${({ theme }) => theme.rounded.md};
  overflow: hidden;

  &:focus {
    border-color: ${({ theme, error }) =>
      error ? theme.colors.red[400] : theme.colors.teal[500]};
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
