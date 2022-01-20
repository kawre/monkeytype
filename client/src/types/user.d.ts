export interface UserState {
  user: {
    _id: string;
    username: string;
  };
  wpm: number;
  progress: number;
  place: number;
}
