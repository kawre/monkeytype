import { createContext, Dispatch, useContext, useReducer } from "react";
// Types -------------------------------------------------------------------------

type State = typeof initialState;

type RoomState = "countdown" | "playing" | "postmatch";

interface Context {
  state: State;
  dispatch: Dispatch<Partial<State>>;
}

const initialState = {
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
    initialState
  );

  const value = { state, dispatch };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

const RoomContext = createContext<Context>(null!);

export const useRoom = () => {
  return useContext(RoomContext);
};

export default RoomProvider;
