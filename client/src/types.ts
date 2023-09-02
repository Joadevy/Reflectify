export type Thought = {
  id: string;
  username: string;
  country: string;
  description: string;
  date: Date;
  likes: string[];
};

export type User = {
  username: string;
  password: string;
  country: string;
};

export type UserClientSide = Pick<User, "username" | "country"> & {
  accessToken: string;
};
