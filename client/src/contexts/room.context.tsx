import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useReducer,
  useState,
} from "react";
// Types -------------------------------------------------------------------------

export type State = typeof initState;
export type Stats = typeof initStats;

type RoomState = "countdown" | "playing" | "postmatch";

interface Context {
  state: State;
  dispatch: Dispatch<Partial<State>>;
  stats: Stats;
  setStats: Dispatch<Partial<Stats>>;
  history: History;
  setHistory: Dispatch<SetStateAction<History>>;
}

const initStats = {
  wpm: 0,
  progress: 0,
};

const initState = {
  stage: "countdown" as RoomState,
  time: 0,
  quote: "",
};

type History = {
  time: number;
  wpm: number;
}[];

// Component ---------------------------------------------------------------------
const RoomProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state: State, newState: Partial<State>) => ({
      ...state,
      ...newState,
    }),
    initState
  );
  const [stats, setStats] = useReducer(
    (state: Stats, newState: Partial<Stats>) => ({
      ...state,
      ...newState,
    }),
    initStats
  );
  const [history, setHistory] = useState([] as Context["history"]);

  const value = { state, dispatch, stats, setStats, history, setHistory };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

const RoomContext = createContext<Context>(null!);

export const useRoom = () => {
  return useContext(RoomContext);
};

export default RoomProvider;
