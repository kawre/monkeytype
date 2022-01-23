import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useReducer,
  useState,
} from "react";
// Types -------------------------------------------------------------------------

type State = typeof initState;

type RoomState = "countdown" | "playing" | "postmatch";

interface Context {
  state: State;
  dispatch: Dispatch<Partial<State>>;
  stats: Stats;
  setStats: Dispatch<Partial<Stats>>;
}

type Stats = typeof initStats;

const initStats = {
  wpm: 0,
  progress: 0,
};

const initState = {
  stage: "countdown" as RoomState,
  time: 0,
};

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

  const value = { state, dispatch, stats, setStats };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

const RoomContext = createContext<Context>(null!);

export const useRoom = () => {
  return useContext(RoomContext);
};

export default RoomProvider;
