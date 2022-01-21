export interface UserState {
  user: {
    _id: string;
    username: string;
  };
  wpm: number;
  progress: number;
  place: number;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  session: string;
  iat: number;
  exp: number;
}

export type User = IUser | null | undefined;
